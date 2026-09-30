export const enquiryBranches = {
  deira: { label: "Deira Muraqqabat (Main Branch)", phone: "971547120925" },
  muhaisnah: { label: "Muhaisnah First", phone: "971547120927" },
} as const;

export type EnquiryBranch = keyof typeof enquiryBranches;

export const generalEnquiryUrl = (branch: EnquiryBranch, message?: string) =>
  `https://wa.me/${enquiryBranches[branch].phone}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

// Free trials intentionally go to the central team, regardless of selected branch.
export const freeTrialUrl = (message: string) =>
  `https://wa.me/971524160054?text=${encodeURIComponent(message)}`;
