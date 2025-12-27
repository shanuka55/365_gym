import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const handleClick = () => {
    const message = "Hi 365 Fitness! I'd like to know more about membership options.";
    window.open(`https://wa.me/97143375022?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-50 bg-primary hover:bg-primary/90 text-primary-foreground p-4 rounded-full shadow-glow-lg hover:shadow-glow animate-pulse-glow transition-all duration-300 hover:scale-110 group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 group-hover:rotate-12 transition-transform duration-300" />
      
      {/* Ripple Effect */}
      <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
    </button>
  );
};

export default WhatsAppButton;
