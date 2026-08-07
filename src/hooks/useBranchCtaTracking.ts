import { useEffect } from "react";

type BranchCtaTrackingOptions = {
  branch: "deira" | "muhaisnah";
  phone: string;
  mapUrl: string;
};

const useBranchCtaTracking = ({ branch, phone, mapUrl }: BranchCtaTrackingOptions) => {
  useEffect(() => {
    const trackBranchCta = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const eventName = link.href.includes(`wa.me/${phone}`)
        ? `${branch}_whatsapp_click`
        : link.href.startsWith(`tel:+${phone}`)
          ? `${branch}_call_click`
          : link.href === mapUrl
            ? `${branch}_directions_click`
            : null;

      if (eventName) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: eventName, branch });
      }
    };

    document.addEventListener("click", trackBranchCta);
    return () => document.removeEventListener("click", trackBranchCta);
  }, [branch, mapUrl, phone]);
};

export default useBranchCtaTracking;
