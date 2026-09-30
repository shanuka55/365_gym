import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { enquiryBranches, freeTrialUrl, type EnquiryBranch } from "@/lib/whatsapp";

const freeTrialSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  phone: z.string().trim().regex(/^[0-9+\s()-]+$/, "Invalid phone number"),
  email: z.string().trim().email("Invalid email address").max(255, "Email is too long"),
  branch: z.string().min(1, "Please select a branch"),
  notes: z.string().max(500, "Notes are too long").optional(),
  consent: z.boolean().refine(val => val === true, "You must agree to be contacted"),
});

interface FreePassModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBranch?: EnquiryBranch;
  interest?: string;
  articleUrl?: string;
}

const BRANCHES = [
  "Deira Muraqqabat (Main Branch)",
  "Muhaisnah First",
];

const FreePassModal = ({ isOpen, onClose, initialBranch, interest, articleUrl }: FreePassModalProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    branch: initialBranch ? enquiryBranches[initialBranch].label : "",
    notes: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [handoffUrl, setHandoffUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const validation = freeTrialSchema.safeParse(formData);

    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast({
        title: "Validation Error",
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Build WhatsApp message
      const waMessage = `New Free Trial Request\n` +
        `Name: ${formData.fullName}\n` +
        `Phone: ${formData.phone}\n` +
        `Email: ${formData.email}\n` +
        `Branch: ${formData.branch}\n` +
        (interest ? `Interest: ${interest}\n` : "") +
        (articleUrl ? `Article: ${articleUrl}\n` : "") +
        `${formData.notes ? `Notes: ${formData.notes}` : ''}`.trim();

      const waUrl = freeTrialUrl(waMessage);
      setHandoffUrl(waUrl);

      // Try to open WhatsApp
      window.open(waUrl, "_blank", "noopener,noreferrer");

      toast({
        title: "Free Pass Request Ready",
        description: "Continue in WhatsApp and send your message to complete your request.",
        duration: 5000,
      });

    } catch (error) {
      console.error("Error opening WhatsApp:", error);
      toast({
        title: "Error",
        description: "Couldn't open WhatsApp. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="free-pass-title" className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-card border border-primary/20 rounded-lg shadow-glow-lg p-6 animate-scale-in max-h-[90vh] overflow-y-auto">
        <button
          aria-label="Close free pass request"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 id="free-pass-title" className="text-2xl font-bold text-foreground mb-2">Get Your Free Pass</h2>
        <p className="text-muted-foreground mb-6">
          Fill in your details, then send your request in WhatsApp to our free-trial team.
        </p>

        {interest && <p className="mb-2 text-sm">Interest: {interest}</p>}
        {articleUrl && <p className="mb-4 break-words text-sm">Article: {articleUrl}</p>}
        <form onSubmit={handleSubmit} onChange={() => setHandoffUrl(null)} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+971 50 123 4567"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="branch">Preferred Branch *</Label>
            <Select value={formData.branch} onValueChange={(value) => { setFormData({ ...formData, branch: value }); setHandoffUrl(null); }}>
              <SelectTrigger id="branch" className="bg-background">
                <SelectValue placeholder="Select a branch" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border z-[150]">
                {BRANCHES.map((branch) => (
                  <SelectItem key={branch} value={branch}>
                    {branch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any questions or special requests?"
              rows={3}
            />
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="consent"
              checked={formData.consent}
              onCheckedChange={(checked) => { setFormData({ ...formData, consent: checked as boolean }); setHandoffUrl(null); }}
            />
            <Label htmlFor="consent" className="text-sm leading-tight cursor-pointer">
              I agree to be contacted via WhatsApp, Phone, or Email regarding my Free Pass request.
            </Label>
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Free Pass Request"}
          </Button>
          {handoffUrl && (
            <div role="status" className="rounded border border-border p-3 text-sm">
              <p>Continue in WhatsApp and send your message to complete your request.</p>
              <a href={handoffUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-primary underline">Open free-trial request in WhatsApp</a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FreePassModal;
