import type { EnquiryBranch } from "@/lib/whatsapp";
import naturalsPartnerCover from "@/assets/naturals-partner-cover.webp";

export type PartnerOffer = {
  id: string;
  eligibleBranches: { id: EnquiryBranch; label: string }[];
  title: string;
  description: string;
  reference: string;
  eligibility: string;
  verification: "referral-code" | "active-membership";
  discount?: string;
  plans?: { code: string; duration: string; price: number }[];
};

export type PartnerCompany = {
  id: string;
  name: string;
  location: string;
  logo?: string;
  cover?: { src: string; alt: string };
  offers: PartnerOffer[];
};

const deira = { id: "deira", label: "365 Fitness Deira Muraqqabat" } as const;

// Add companies here; each offer lists its eligible branches and prices or discount.
// Branch IDs use the shared WhatsApp helper's branch registry.
export const partnerCompanies: PartnerCompany[] = [{
  id: "naturals-reef-mall",
  name: "Naturals Salon",
  location: "Reef Mall",
  cover: { src: naturalsPartnerCover, alt: "Two fitness partners at the gym in violet light" },
  offers: [
  {
    id: "naturals-gym",
    eligibleBranches: [deira],
    title: "Gym membership for Naturals Salon customers",
    description: "Naturals Salon, Reef Mall customers can enjoy these membership prices at 365 Fitness Deira Muraqqabat.",
    reference: "PARTNER-NATURALS-GYM",
    verification: "referral-code",
    eligibility: "Available to Naturals Salon, Reef Mall customers at 365 Fitness Deira Muraqqabat.",
    plans: [
      { code: "1M", duration: "1 month", price: 150 },
      { code: "3M", duration: "3 months", price: 400 },
      { code: "6M", duration: "6 months", price: 600 },
      { code: "12M", duration: "1 year", price: 1000 },
    ],
  },
  {
    id: "naturals-salon",
    eligibleBranches: [deira],
    title: "50% off at Naturals Salon, Reef Mall",
    description: "365 Fitness Deira members get 50% off at Naturals Salon, Reef Mall.",
    reference: "PARTNER-NATURALS-SALON-50OFF",
    verification: "active-membership",
    eligibility: "Available to 365 Fitness Deira members at Naturals Salon, Reef Mall.",
    discount: "50% off",
  },
  ],
}];
