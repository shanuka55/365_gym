import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import PageSeo from "@/components/PageSeo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatMembershipPrice } from "@/lib/muhaisnahPlans";

type SessionResult = {
  paid: boolean;
  status: string;
  paymentStatus: string;
  plan?: string;
  baseAmount?: number;
  vatAmount?: number;
  totalPaid?: number;
  currency?: string;
  customerEmail?: string | null;
  reference?: string;
};

const CheckoutReturn = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [result, setResult] = useState<SessionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError("A checkout session reference is required.");
      return;
    }
    const controller = new AbortController();
    fetch(`/api/stripe/session?session_id=${encodeURIComponent(sessionId)}`, { signal: controller.signal })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Payment status could not be verified.");
        setResult(data);
      })
      .catch((requestError: Error) => {
        if (requestError.name !== "AbortError") setError(requestError.message);
      });
    return () => controller.abort();
  }, [sessionId]);

  const money = (amount?: number) =>
    typeof amount === "number" && result?.currency
      ? formatMembershipPrice(amount, result.currency)
      : "—";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10 text-foreground">
      <PageSeo title="Payment Status | 365 Fitness" description="Your 365 Fitness membership payment status." canonical="https://www.365fitness.ae/checkout/return" noIndex />
      <Card className="w-full max-w-2xl p-6 sm:p-10">
        {!result && !error && (
          <div className="py-12 text-center"><Clock3 className="mx-auto mb-4 h-12 w-12 animate-pulse text-primary" /><h1 className="text-2xl font-bold">Verifying payment…</h1></div>
        )}
        {error && (
          <div className="text-center"><XCircle className="mx-auto mb-4 h-14 w-14 text-destructive" /><h1 className="text-2xl font-bold">Unable to verify payment</h1><p className="mt-3 text-muted-foreground">{error}</p></div>
        )}
        {result && !result.paid && (
          <div className="text-center"><Clock3 className="mx-auto mb-4 h-14 w-14 text-primary" /><h1 className="text-2xl font-bold">Payment not completed</h1><p className="mt-3 text-muted-foreground">Stripe reports this session as {result.status} with payment status {result.paymentStatus}.</p></div>
        )}
        {result?.paid && (
          <>
            <div className="text-center"><CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-primary" /><p className="text-sm font-bold uppercase tracking-widest text-primary">Payment successful</p><h1 className="mt-2 text-3xl font-black">Welcome to 365 Fitness</h1></div>
            <dl className="mt-8 divide-y divide-border rounded-xl border border-border px-4">
              {[['Membership plan', result.plan], ['Base amount', money(result.baseAmount)], ['VAT amount', money(result.vatAmount)], ['Total paid', money(result.totalPaid)], ['Customer email', result.customerEmail || 'Not provided'], ['Stripe session reference', result.reference]].map(([label, value]) => (
                <div key={label} className="flex flex-col justify-between gap-1 py-3 text-sm sm:flex-row"><dt className="text-muted-foreground">{label}</dt><dd className="break-all font-semibold sm:text-right">{value}</dd></div>
              ))}
            </dl>
          </>
        )}
        {(result || error) && <Button asChild className="mt-8 w-full"><Link to="/locations/muhaisnah-first">Back to Muhaisnah</Link></Button>}
      </Card>
    </div>
  );
};

export default CheckoutReturn;

