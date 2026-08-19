import type Stripe from "stripe";
import { getConfiguredStripeMode, getStripe } from "./stripe.js";

export const PLAN_SLUGS = ["monthly", "3-months", "6-months", "12-months"] as const;

export type PlanSlug = (typeof PLAN_SLUGS)[number];

type PlanDefinition = {
  label: string;
  lookupKey: string;
};

const PLAN_ALLOWLIST: Record<PlanSlug, PlanDefinition> = {
  monthly: { label: "Monthly", lookupKey: "muhaisnah_monthly" },
  "3-months": { label: "3 Months", lookupKey: "muhaisnah_3_months" },
  "6-months": { label: "6 Months", lookupKey: "muhaisnah_6_months" },
  "12-months": { label: "12 Months", lookupKey: "muhaisnah_12_months" },
};

const EXPECTED_LOOKUP_KEYS = PLAN_SLUGS.map((slug) => PLAN_ALLOWLIST[slug].lookupKey);

export const isPlanSlug = (value: unknown): value is PlanSlug =>
  typeof value === "string" && Object.prototype.hasOwnProperty.call(PLAN_ALLOWLIST, value);

export const getPlanDefinition = (slug: PlanSlug) => PLAN_ALLOWLIST[slug];

export type PublicPlanPrice = {
  slug: PlanSlug;
  label: string;
  unitAmount: number;
  currency: string;
};

type ResolvedPlan = PublicPlanPrice & {
  price: Stripe.Price;
  lookupKey: string;
};

const PRICE_CACHE_TTL_MS = 5 * 60 * 1000;
let priceCache: { expiresAt: number; prices: ResolvedPlan[] } | undefined;

const logPriceValidationFailure = (returnedPrices: Stripe.Price[], missingLookupKeys: string[]) => {
  console.error("Stripe membership Price validation failed.", {
    expectedLookupKeys: EXPECTED_LOOKUP_KEYS,
    returnedLookupKeys: returnedPrices.map((price) => price.lookup_key),
    missingLookupKeys,
    returnedPrices: returnedPrices.map((price) => ({
      lookupKey: price.lookup_key,
      currency: price.currency,
      active: price.active,
      type: price.type,
      livemode: price.livemode,
    })),
  });
};

const loadPrices = async (shouldLogValidationFailure: boolean): Promise<ResolvedPlan[]> => {
  const stripe = getStripe();
  const configuredLivemode = getConfiguredStripeMode();
  const result = await stripe.prices.list({
    lookup_keys: EXPECTED_LOOKUP_KEYS,
    active: true,
    limit: 100,
  });
  const pricesByLookupKey = new Map<string, Stripe.Price>();

  for (const price of result.data) {
    if (price.lookup_key) {
      pricesByLookupKey.set(price.lookup_key, price);
    }
  }

  const missingLookupKeys = EXPECTED_LOOKUP_KEYS.filter((lookupKey) => !pricesByLookupKey.has(lookupKey));
  const hasInvalidPrice = result.data.some((price) =>
    !price.lookup_key
    || !EXPECTED_LOOKUP_KEYS.includes(price.lookup_key)
    || price.active !== true
    || price.currency !== "aed"
    || price.type !== "one_time"
    || !Number.isInteger(price.unit_amount)
    || (price.unit_amount ?? 0) <= 0
    || price.livemode !== configuredLivemode,
  );

  if (missingLookupKeys.length > 0 || hasInvalidPrice) {
    if (shouldLogValidationFailure) {
      logPriceValidationFailure(result.data, missingLookupKeys);
    }
    throw new Error("Stripe membership Price validation failed.");
  }

  return PLAN_SLUGS.map((slug) => {
    const definition = PLAN_ALLOWLIST[slug];
    const price = pricesByLookupKey.get(definition.lookupKey);

    if (!price || price.unit_amount === null) {
      if (shouldLogValidationFailure) {
        logPriceValidationFailure(result.data, [definition.lookupKey]);
      }
      throw new Error("Stripe membership Price validation failed.");
    }

    return {
      slug,
      label: definition.label,
      lookupKey: definition.lookupKey,
      unitAmount: price.unit_amount,
      currency: price.currency,
      price,
    };
  });
};

export const getAllPlanPrices = async ({ logValidationFailure = true } = {}) => {
  if (priceCache && priceCache.expiresAt > Date.now()) {
    return priceCache.prices;
  }

  const prices = await loadPrices(logValidationFailure);
  priceCache = { prices, expiresAt: Date.now() + PRICE_CACHE_TTL_MS };
  return prices;
};

export const getPlanPrice = async (slug: PlanSlug, options?: { logValidationFailure?: boolean }) => {
  const prices = await getAllPlanPrices(options);
  const plan = prices.find((candidate) => candidate.slug === slug);

  if (!plan) {
    throw new Error("The selected membership price is unavailable.");
  }

  return plan;
};

export const toPublicPlanPrice = ({ slug, label, unitAmount, currency }: ResolvedPlan): PublicPlanPrice => ({
  slug,
  label,
  unitAmount,
  currency,
});
