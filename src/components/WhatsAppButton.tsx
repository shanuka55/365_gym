import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { enquiryBranches, generalEnquiryUrl, type EnquiryBranch } from "@/lib/whatsapp";

type WhatsAppButtonProps = {
  branch?: EnquiryBranch;
  chooseBranch?: boolean;
};

const WhatsAppButton = ({ branch, chooseBranch = false }: WhatsAppButtonProps) => {
  const [chooserOpen, setChooserOpen] = useState(false);
  const openEnquiry = (selectedBranch: EnquiryBranch) => {
    const message = "Hi 365 Fitness! I'd like to know more about membership options.";
    window.open(generalEnquiryUrl(selectedBranch, message), "_blank");
    setChooserOpen(false);
  };
  const handleClick = () => {
    if (chooseBranch && !branch) setChooserOpen(!chooserOpen);
    else openEnquiry(branch ?? "deira");
  };

  return (
    <>
      {chooserOpen && (
        <div className="fixed bottom-28 right-8 z-50 max-w-xs rounded-xl border border-border bg-card p-4 shadow-lg" role="group" aria-label="General membership enquiries">
          <p className="mb-3 font-bold">General membership enquiries</p>
          <p className="mb-3 text-sm">Choose a branch to chat on WhatsApp.</p>
          {Object.entries(enquiryBranches).map(([key, value]) => (
            <button key={key} type="button" onClick={() => openEnquiry(key as EnquiryBranch)} className="mb-2 block w-full rounded border border-border p-2 text-left hover:text-primary">
              {value.label}
            </button>
          ))}
          <button type="button" onClick={() => setChooserOpen(false)} className="text-sm underline">Close branch chooser</button>
        </div>
      )}
      <button
        type="button"
        onClick={handleClick}
        className="fixed bottom-8 right-8 z-50 bg-primary hover:bg-primary/90 text-primary-foreground p-4 rounded-full shadow-glow-lg hover:shadow-glow animate-pulse-glow transition-all duration-300 hover:scale-110 group"
        aria-label={chooseBranch || branch ? "General membership enquiries on WhatsApp" : "Contact us on WhatsApp"}
        aria-expanded={chooseBranch && !branch ? chooserOpen : undefined}
      >
        <MessageCircle className="h-7 w-7 group-hover:rotate-12 transition-transform duration-300" />
      
        {/* Ripple Effect */}
        <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
      </button>
    </>
  );
};

export default WhatsAppButton;
