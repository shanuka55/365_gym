import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getStripe } from "../_lib/stripe.js";

export const config = {
  api: { bodyParser: false },
};

const readRawBody = async (request: VercelRequest) => {
  const chunks: Buffer[] = [];
  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
};

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers["stripe-signature"];
  if (!webhookSecret || typeof signature !== "string") {
    return response.status(400).json({ error: "Webhook configuration or signature is missing." });
  }

  try {
    const event = getStripe().webhooks.constructEvent(await readRawBody(request), signature, webhookSecret);

    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
      case "checkout.session.async_payment_failed":
        // Stripe is currently the system of record. No fulfilment side effect is
        // performed here, so replayed event IDs remain safely idempotent.
        break;
      default:
        break;
    }

    return response.status(200).json({ received: true });
  } catch {
    return response.status(400).json({ error: "Invalid webhook signature." });
  }
}

