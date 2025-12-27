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
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const joinNowSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  phone: z.string().trim().regex(/^[0-9+\s()-]+$/, "Invalid phone number"),
  email: z.string().trim().email("Invalid email address").max(255, "Email is too long"),
  branch: z.string().min(1, "Please select a branch"),
  membershipType: z.string().min(1, "Please select a membership type"),
  notes: z.string().max(500, "Notes are too long").optional(),
  consent: z.boolean().refine(val => val === true, "You must agree to be contacted"),
});

interface JoinNowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BRANCHES = [
  "Deira Muraqqabat (Main Branch)",
  "Muhaisnah First",
];

const MEMBERSHIP_TYPES = [
  "Monthly Plan",
  "Annual Plan",
  "Corporate Plan",
];

const JoinNowModal = ({ isOpen, onClose }: JoinNowModalProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    branch: "",
    membershipType: "",
    notes: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const validation = joinNowSchema.safeParse(formData);
    
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
      // Send email via edge function
      const { data, error } = await supabase.functions.invoke('send-free-trial-email', {
        body: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          preferredLocation: `${formData.branch} - ${formData.membershipType}`,
        },
      });

      if (error) {
        console.error("Error sending email:", error);
        throw error;
      }

      console.log("Email sent successfully:", data);

      // Show success message
      toast({
        title: "Membership Request Sent! 🎉",
        description: "Thanks for choosing 365 Fitness! We've received your request and will contact you shortly.",
        duration: 5000,
      });

      // Reset form and close
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        branch: "",
        membershipType: "",
        notes: "",
        consent: false,
      });
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-card border border-primary/20 rounded-lg shadow-glow-lg p-6 animate-scale-in max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-foreground mb-2">Join 365 Fitness</h2>
        <p className="text-muted-foreground mb-6">
          Start your fitness journey with us today!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Label htmlFor="membershipType">Membership Type *</Label>
            <Select value={formData.membershipType} onValueChange={(value) => setFormData({ ...formData, membershipType: value })}>
              <SelectTrigger id="membershipType" className="bg-background">
                <SelectValue placeholder="Select membership type" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border z-[150]">
                {MEMBERSHIP_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="branch">Preferred Branch *</Label>
            <Select value={formData.branch} onValueChange={(value) => setFormData({ ...formData, branch: value })}>
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
              placeholder="Any specific goals or questions?"
              rows={3}
            />
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="consent"
              checked={formData.consent}
              onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
            />
            <Label htmlFor="consent" className="text-sm leading-tight cursor-pointer">
              I agree to be contacted via WhatsApp, Phone, or Email regarding my membership.
            </Label>
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Join Now"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default JoinNowModal;
