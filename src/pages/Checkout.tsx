import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ArrowLeft, LockKeyhole, ShieldCheck } from "lucide-react";
import PageSeo from "@/components/PageSeo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMembershipPrices } from "@/hooks/useMembershipPrices";
import {
  formatMembershipPrice,
  isMuhaisnahPlanSlug,
  muhaisnahPlanLabels,
  type MuhaisnahPlanSlug,
} from "@/lib/muhaisnahPlans";

const publishableKey = import.meta.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;
const sessionRequests = new Map<MuhaisnahPlanSlug, Promise<string>>();

const requestClientSecret = (plan: MuhaisnahPlanSlug) => {
  const existing = sessionRequests.get(plan);
  if (existing) return existing;

  const request = fetch("/api/stripe/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan }),
  }).then(async (response) => {
    const data = await response.json();
    if (!response.ok || !data.clientSecret) {
      throw new Error(data.error || "Checkout could not be started.");
    }
    return data.clientSecret as string;
  });
  sessionRequests.set(plan, request);
  return request;
};

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const planParam = searchParams.get("plan");
  const validPlan = isMuhaisnahPlanSlug(planParam) ? planParam : null;
  const { prices, loading: priceLoading, error: priceError } = useMembershipPrices();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  useEffect(() => {
    if (!validPlan || !stripePromise) return;
    let active = true;
    requestClientSecret(validPlan)
      .then((secret) => active && setClientSecret(secret))
      .catch((error: Error) => active && setCheckoutError(error.message));
    return () => { active = false; };
  }, [validPlan]);

  const selectedPrice = prices.find((price) => price.slug === validPlan);
  const configurationError = !publishableKey ? "Stripe payments are not configured." : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageSeo title="Secure Membership Checkout | 365 Fitness" description="Secure online payment for a 365 Fitness Muhaisnah membership." canonical="https://www.365fitness.ae/checkout" noIndex />
      <header className="border-b border-border bg-black/90">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/locations/muhaisnah-first" aria-label="Back to 365 Fitness Muhaisnah">
            <img src="/logo.png" alt="365 Fitness" className="h-12 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold text-white/70 sm:text-sm">
            <LockKeyhole className="h-4 w-4 text-primary" /> Secure Stripe checkout
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-6 sm:py-10">
        {!validPlan ? (
          <Card className="mx-auto max-w-xl p-6 text-center sm:p-10">
            <h1 className="mb-3 text-2xl font-bold">Invalid membership plan</h1>
            <p className="mb-6 text-muted-foreground">Choose one of the Muhaisnah membership packages to continue.</p>
            <Button asChild><Link to="/locations/muhaisnah-first">View memberships</Link></Button>
          </Card>
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[320px_1fr]">
            <Card className="p-5 lg:sticky lg:top-6">
              <Link to="/locations/muhaisnah-first" className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                <ArrowLeft className="h-4 w-4" /> Back to Muhaisnah
              </Link>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Selected membership</p>
              <h1 className="mt-2 text-3xl font-black">{muhaisnahPlanLabels[validPlan]}</h1>
              <div className="my-5 border-y border-border py-5">
                <p className="text-sm text-muted-foreground">Base price</p>
                <p className="mt-1 text-3xl font-black text-primary">
                  {priceLoading ? "Loading…" : selectedPrice ? formatMembershipPrice(selectedPrice.unitAmount, selectedPrice.currency) : "Unavailable"}
                </p>
                <p className="mt-2 text-sm font-semibold">5% VAT will be added at checkout</p>
              </div>
              <div className="flex gap-3 text-sm text-muted-foreground">
                <ShieldCheck className="h-5 w-5 flex-none text-primary" />
                <p>Your payment details are securely handled by Stripe and are not stored by 365 Fitness.</p>
              </div>
              {priceError && <p className="mt-4 text-sm text-destructive">{priceError}</p>}
            </Card>

            <Card className="min-h-[480px] overflow-hidden bg-white p-2 text-black sm:p-4">
              {(configurationError || checkoutError) ? (
                <div className="flex min-h-[440px] items-center justify-center p-6 text-center">
                  <div>
                    <h2 className="text-xl font-bold">Checkout unavailable</h2>
                    <p className="mt-2 text-gray-600">{configurationError || checkoutError}</p>
                  </div>
                </div>
              ) : !clientSecret || !stripePromise ? (
                <div className="flex min-h-[440px] items-center justify-center text-gray-600">Loading secure checkout…</div>
              ) : (
                <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
                  <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
              )}
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Checkout;

