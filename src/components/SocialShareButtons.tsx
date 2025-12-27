import { Facebook, Instagram, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialShareButtonsProps {
  title: string;
  url?: string;
}

const SocialShareButtons = ({ title, url }: SocialShareButtonsProps) => {
  const shareUrl = url || window.location.href;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      '_blank',
      'width=600,height=400'
    );
  };

  const handleInstagramShare = () => {
    // Instagram doesn't have direct share URL, so we copy to clipboard
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied! Share it on Instagram');
  };

  const handleTikTokShare = () => {
    // TikTok doesn't have direct web share, copy to clipboard
    navigator.clipboard.writeText(`${title} - ${shareUrl}`);
    alert('Link copied! Share it on TikTok');
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground font-bold">Share:</span>
      <Button
        variant="outline"
        size="icon"
        onClick={handleFacebookShare}
        className="bg-secondary hover:bg-primary transition-all duration-300 hover:shadow-glow border-0"
      >
        <Facebook className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleInstagramShare}
        className="bg-secondary hover:bg-primary transition-all duration-300 hover:shadow-glow border-0"
      >
        <Instagram className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleTikTokShare}
        className="bg-secondary hover:bg-primary transition-all duration-300 hover:shadow-glow border-0"
      >
        <Video className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SocialShareButtons;
