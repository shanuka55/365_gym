export const muhaisnahPlanSlugs = ["monthly", "3-months", "6-months", "12-months"] as const;

export type MuhaisnahPlanSlug = (typeof muhaisnahPlanSlugs)[number];

export const isMuhaisnahPlanSlug = (value: string | null): value is MuhaisnahPlanSlug =>
  value !== null && (muhaisnahPlanSlugs as readonly string[]).includes(value);

export const muhaisnahPlanLabels: Record<MuhaisnahPlanSlug, string> = {
  monthly: "Monthly",
  "3-months": "3 Months",
  "6-months": "6 Months",
  "12-months": "12 Months",
};

export type MembershipPrice = {
  slug: MuhaisnahPlanSlug;
  label: string;
  unitAmount: number;
  currency: string;
};

export const formatMembershipPrice = (unitAmount: number, currency: string) =>
  new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(unitAmount / 100);

