import type { VercelRequest, VercelResponse } from "@vercel/node";
import { randomUUID } from "node:crypto";
import { getPlanDefinition, getPlanPrice, isPlanSlug, type PlanSlug } from "../_lib/plans.js";
import { resolveSiteOrigin } from "../_lib/site-origin.js";
import { getConfiguredStripeMode, getStripe } from "../_lib/stripe.js";

type StripeLikeError = {
  name?: unknown;
  type?: unknown;
  code?: unknown;
  param?: unknown;
  message?: unknown;
  requestId?: unknown;
  raw?: { requestId?: unknown };
};

class CheckoutValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CheckoutValidationError";
  }
}

const safeString = (value: unknown) => typeof value === "string" ? value : null;

const sanitizeErrorMessage = (error: unknown) => {
  const message = error instanceof Error ? error.message : "Checkout Session creation failed.";

  return message
    .replace(/[\r\n\t]+/g, " ")
    .replace(/https?:\/\/\S+/gi, "[url]")
    .replace(/\b(?:txr|price|prod|cs|pi|pm|cus|ch|sub|sk|rk|whsec)_[A-Za-z0-9_]+\b/g, "[redacted]")
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, "[email]")
    .slice(0, 300);
};

const logCheckoutFailure = ({
  error,
  errorId,
  plan,
  lookupKey,
  originHostname,
  stripeMode,
}: {
  error: unknown;
  errorId: string;
  plan: PlanSlug | null;
  lookupKey: string | null;
  originHostname: string | null;
  stripeMode: "sandbox" | "live" | "unknown";
}) => {
  const stripeError = error as StripeLikeError;

  console.error("stripe_checkout_session_creation_failed", {
    errorId,
    errorType: safeString(stripeError.type) ?? safeString(stripeError.name) ?? typeof error,
    stripeCode: safeString(stripeError.code),
    stripeParam: safeString(stripeError.param),
    message: sanitizeErrorMessage(error),
    plan,
    lookupKey,
    originHostname,
    hasStripeSecret: Boolean(process.env.STRIPE_SECRET_KEY),
    hasTaxRate: Boolean(process.env.STRIPE_UAE_TAX_RATE_ID),
    stripeRequestId: safeString(stripeError.requestId) ?? safeString(stripeError.raw?.requestId),
    stripeMode,
  });
};

export default async function handler(request: VercelRequest, response: VercelResponse) {
  response.setHeader("Cache-Control", "private, no-store");
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const errorId = randomUUID();
  let plan: PlanSlug | null = null;
  let lookupKey: string | null = null;
  let originHostname: string | null = null;
  let stripeMode: "sandbox" | "live" | "unknown" = "unknown";

  try {
    const requestedPlan = request.body?.plan;
    if (!isPlanSlug(requestedPlan)) {
      throw new CheckoutValidationError("The membership plan slug is missing or invalid.");
    }

    plan = requestedPlan;
    lookupKey = getPlanDefinition(plan).lookupKey;
    const taxRateId = process.env.STRIPE_UAE_TAX_RATE_ID;
    if (!taxRateId) {
      throw new CheckoutValidationError("The Stripe UAE Tax Rate is not configured.");
    }

    const siteUrl = resolveSiteOrigin(request);
    originHostname = new URL(siteUrl).hostname;
    const stripe = getStripe();
    const configuredLivemode = getConfiguredStripeMode();
    stripeMode = configuredLivemode ? "live" : "sandbox";
    const selectedPlan = await getPlanPrice(plan, { logValidationFailure: false });
    const taxRate = await stripe.taxRates.retrieve(taxRateId);

    if (
      taxRate.active !== true
      || taxRate.inclusive !== false
      || taxRate.percentage !== 5
      || taxRate.livemode !== configuredLivemode
    ) {
      throw new CheckoutValidationError("The configured Stripe Tax Rate is not an active, exclusive 5% rate in the current Stripe mode.");
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "embedded_page",
      customer_creation: "always",
      phone_number_collection: { enabled: true },
      billing_address_collection: "required",
      submit_type: "pay",
      return_url: `${siteUrl}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
      line_items: [
        {
          price: selectedPlan.price.id,
          quantity: 1,
          tax_rates: [taxRateId],
        },
      ],
      metadata: {
        branch: "muhaisnah",
        plan,
        price_lookup_key: selectedPlan.lookupKey,
      },
    });

    if (!session.client_secret) {
      throw new CheckoutValidationError("Stripe did not return a Checkout Session client secret.");
    }

    return response.status(200).json({ clientSecret: session.client_secret });
  } catch (error) {
    logCheckoutFailure({ error, errorId, plan, lookupKey, originHostname, stripeMode });
    const status = error instanceof CheckoutValidationError && plan === null ? 400 : 503;
    return response.status(status).json({
      error: "Checkout could not be started. Please try again.",
      errorId,
    });
  }
}
