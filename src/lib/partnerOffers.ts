import type { PartnerCompany, PartnerOffer } from "@/data/partnerOffers";
import { generalEnquiryUrl, type EnquiryBranch } from "@/lib/whatsapp";

export const formatPartnerPrice = (price: number) => `AED ${price.toLocaleString("en-US")}`;
export const referralCodePattern = "NAT-[A-Z0-9]{8}";
export const normalizeReferralCode = (code: string) => code.trim().toUpperCase();
// This checks formatting only. Reception must verify the actual referral.
export const hasReferralCodeFormat = (code: string) => new RegExp(`^${referralCodePattern}$`).test(normalizeReferralCode(code));

export function partnerOfferWhatsAppUrl(partner: PartnerCompany, offer: PartnerOffer, branchId: EnquiryBranch, planCode: string, name: string, phone: string, referralCode = "") {
  if (!partner.offers.includes(offer)) throw new Error("Select an offer from this company.");
  const branch = offer.eligibleBranches.find((item) => item.id === branchId);
  if (!branch) throw new Error("Select an eligible gym branch.");
  const plan = offer.plans?.find((item) => item.code === planCode);
  if (offer.plans && !plan) throw new Error("Select a membership duration.");
  if (offer.verification === "referral-code" && !hasReferralCodeFormat(referralCode)) {
    throw new Error("Enter a referral code in the format NAT-XXXXXXXX using letters or digits.");
  }
  const message = [
    "Source: Website Partner Offers",
    `Partner: ${partner.name}, ${partner.location}`,
    `Branch: ${branch.label}`,
    `Offer: ${offer.title}`,
    plan ? `Membership: ${plan.duration} — ${formatPartnerPrice(plan.price)}` : `Discount: ${offer.discount}`,
    `Customer name: ${name.trim()}`,
    `Customer phone: ${phone.trim()}`,
    ...(offer.verification === "referral-code" ? [
      `Partner referral code: ${normalizeReferralCode(referralCode)}`,
      "Verification status: Pending reception review",
    ] : []),
    `Offer reference: ${offer.reference}${plan ? `-${plan.code}` : ""}`,
  ].join("\n");
  return generalEnquiryUrl(branch.id, message);
}
