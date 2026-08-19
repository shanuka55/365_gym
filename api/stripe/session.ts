import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getPlanDefinition, isPlanSlug } from "../_lib/plans.js";
import { getStripe, StripeConfigurationError } from "../_lib/stripe.js";

export default async function handler(request: VercelRequest, response: VercelResponse) {
  response.setHeader("Cache-Control", "private, no-store");
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const sessionId = Array.isArray(request.query.session_id)
    ? request.query.session_id[0]
    : request.query.session_id;

  if (!sessionId || !sessionId.startsWith("cs_")) {
    return response.status(400).json({ error: "Invalid checkout session reference." });
  }

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    const plan = session.metadata?.plan;
    const metadataIsValid = session.metadata?.branch === "muhaisnah"
      && isPlanSlug(plan)
      && session.metadata?.price_lookup_key === getPlanDefinition(plan).lookupKey;

    if (!metadataIsValid) {
      return response.status(400).json({ error: "This checkout session is not a valid Muhaisnah membership payment." });
    }

    const paid = session.status === "complete" && session.payment_status === "paid";
    return response.status(200).json({
      paid,
      status: session.status,
      paymentStatus: session.payment_status,
      ...(paid
        ? {
            plan: getPlanDefinition(plan).label,
            baseAmount: session.amount_subtotal,
            vatAmount: session.total_details?.amount_tax ?? 0,
            totalPaid: session.amount_total,
            currency: session.currency,
            customerEmail: session.customer_details?.email ?? null,
            reference: session.id,
          }
        : {}),
    });
  } catch (error) {
    const message = error instanceof StripeConfigurationError
      ? error.message
      : "Checkout status could not be retrieved.";
    return response.status(503).json({ error: message });
  }
}
