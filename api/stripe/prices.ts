import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getAllPlanPrices, toPublicPlanPrice } from "../_lib/plans.js";

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed." });
  }

  try {
    const prices = (await getAllPlanPrices()).map(toPublicPlanPrice);
    response.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=60");
    return response.status(200).json({ prices });
  } catch {
    return response.status(503).json({ error: "Membership pricing is temporarily unavailable." });
  }
}
