import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, ClipboardPenLine, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const BRANCHES = [
  "Deira Muraqqabat",
  "Muhaisnah First",
];

const MEMBERSHIP_TYPES = [
  "Monthly Plan",
  "Annual Plan",
  "Corporate Plan",
  "Personal Training",
  "Group Classes",
  "Online Coaching",
];

const AGREEMENT_TERMS = [
  {
    title: "1. Membership and Access",
    items: [
      {
        label: "1.1 Membership",
        text: "Access to 365 Fitness facilities and services requires a valid membership. Membership options, fees, and terms are outlined in separate membership agreements.",
      },
      {
        label: "1.2 Age Requirement",
        text: "Users must be at least 18 years old to sign up for membership or use the Services. Minors must be accompanied by a legal guardian or have written consent to use the Services.",
      },
      {
        label: "1.3 Access Control",
        text: "365 Fitness reserves the right to deny or revoke access to the facilities or Services for any reason, including but not limited to violation of these Terms, inappropriate behavior, or failure to comply with club rules.",
      },
    ],
  },
  {
    title: "2. Use of Facilities and Equipment",
    items: [
      {
        label: "2.1 Facility Rules",
        text: "Members must adhere to all posted club rules and regulations while using 365 Fitness facilities. This includes but is not limited to proper attire, equipment usage, and hygiene standards.",
      },
      {
        label: "2.2 Equipment Usage",
        text: "Members are responsible for using gym equipment safely and appropriately. Failure to do so may result in injury or damage to property, for which 365 Fitness is not liable. Members who misuse equipment and cause damage will be charged a fee for repairs or replacement.",
      },
      {
        label: "2.3 Personal Belongings",
        text: "365 Fitness is not responsible for lost or stolen personal belongings. Members are encouraged to secure their valuables in provided lockers.",
      },
      {
        label: "2.4 Gym Equipment Misuse",
        text: "Any misuse of gym equipment, whether intentional or accidental, resulting in damage will incur a fee for repair or replacement of the equipment. Members are financially responsible for any damages they cause.",
      },
      {
        label: "2.5 Games Inside the Gym",
        text: "365 Fitness allows games within designated areas in the gym. However, any disruptive behavior caused by such activities is prohibited. Games should not interfere with gym equipment or other members' use of the facilities.",
      },
      {
        label: "2.6 Seating Area Time Limit",
        text: "Members are not permitted to remain seated in the designated seating areas for more than 30 minutes to ensure availability for other members. This ensures a fair and efficient use of the facility for all members.",
      },
    ],
  },
  {
    title: "3. Health and Safety",
    items: [
      {
        label: "3.1 Physical Condition",
        text: "Members should consult with a medical professional before beginning any exercise program. 365 Fitness staff are not medical professionals and cannot provide medical advice.",
      },
      {
        label: "3.2 Personal Safety",
        text: "Members are responsible for their own safety while using 365 Fitness facilities. In case of injury or medical emergency, members should seek assistance immediately.",
      },
      {
        label: "3.3 Cleanliness",
        text: "Members are expected to maintain personal hygiene and cleanliness while using 365 Fitness facilities. Towels and sanitation stations are provided for this purpose.",
      },
    ],
  },
  {
    title: "4. Payments and Fees",
    items: [
      {
        label: "4.1 Membership Fees",
        text: "Membership fees are outlined in the membership agreement and are subject to change with notice.",
      },
      {
        label: "4.2 Payment Methods",
        text: "Members must provide valid payment information and authorize recurring payments for membership dues. Failure to pay may result in suspension or termination of membership.",
      },
      {
        label: "4.3 Refunds",
        text: "Membership fees are non-refundable except as required by law or as outlined in the membership agreement.",
      },
    ],
  },
  {
    title: "5. Conduct and Discipline",
    items: [
      {
        label: "5.1 Respectful Behavior",
        text: "Members must treat staff and fellow members with respect and courtesy. Discriminatory, harassing, or otherwise inappropriate behavior will not be tolerated.",
      },
      {
        label: "5.2 Disciplinary Action",
        text: "365 Fitness reserves the right to suspend or terminate membership for violations of these Terms or club rules, at its sole discretion.",
      },
    ],
  },
  {
    title: "6. Privacy Policy",
    items: [
      {
        label: "6.1 Personal Information",
        text: "365 Fitness collects and processes personal information in accordance with its Privacy Policy, available on the club's website.",
      },
      {
        label: "6.2 Communication",
        text: "By signing up for membership, you agree to receive communications from 365 Fitness, including promotional offers and updates related to the Services.",
      },
    ],
  },
  {
    title: "7. Amendments and Modifications",
    items: [
      {
        label: "7.1 Changes to Terms",
        text: "365 Fitness reserves the right to modify or update these Terms at any time. Notice of such changes will be provided through the club's website or via email to members.",
      },
      {
        label: "7.2 Continued Use",
        text: "Your continued use of the Services after any modifications to these Terms constitutes acceptance of the updated Terms.",
      },
    ],
  },
  {
    title: "8. Governing Law and Jurisdiction",
    items: [
      {
        label: "8.1 Governing Law",
        text: "These Terms are governed by the laws of UAE, without regard to its conflict of laws principles.",
      },
      {
        label: "8.2 Jurisdiction",
        text: "Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.",
      },
    ],
  },
  {
    title: "9. Pregnancy Training and Participation",
    items: [
      {
        label: "9.1 Medical Clearance",
        text: "Pregnant members must obtain approval from a qualified medical professional before participating in any fitness activities, classes, or personal training sessions at 365 Fitness.",
      },
      {
        label: "9.2 Personal Responsibility",
        text: "Pregnant members participate in all activities at their own risk and are responsible for monitoring their physical condition during exercise.",
      },
      {
        label: "9.3 Trainer Limitations",
        text: "365 Fitness trainers and staff are not medical professionals and cannot provide medical advice, diagnosis, or treatment related to pregnancy.",
      },
      {
        label: "9.4 Exercise Modifications",
        text: "Pregnant members must follow all safety instructions and modifications provided by trainers. Certain exercises or equipment may be restricted for safety reasons.",
      },
      {
        label: "9.5 Emergency Situations",
        text: "If a pregnant member experiences dizziness, pain, bleeding, breathing difficulty, or any medical discomfort during exercise, they must stop immediately and seek medical attention.",
      },
      {
        label: "9.6 Liability Waiver",
        text: "365 Fitness shall not be held responsible for any injury, health complication, or medical issue related to participation in fitness activities during pregnancy.",
      },
    ],
  },
  {
    title: "10. Children Under 14 Policy",
    items: [
      {
        label: "10.1 Parent or Guardian Consent",
        text: "Children under the age of 14 may only access designated programs or classes with written consent from a parent or legal guardian.",
      },
      {
        label: "10.2 Supervision Requirement",
        text: "Children under 14 must be supervised by a parent, guardian, or authorized coach at all times while inside the facility.",
      },
      {
        label: "10.3 Restricted Areas",
        text: "Children under 14 are not permitted to use heavy gym equipment, free weights, or restricted training areas unless specifically authorized by 365 Fitness staff.",
      },
      {
        label: "10.4 Safety Responsibility",
        text: "Parents or guardians are fully responsible for the child's safety, behavior, and conduct while on the premises.",
      },
      {
        label: "10.5 Appropriate Behavior",
        text: "Children must follow all gym rules and behave respectfully toward staff, members, and equipment. Disruptive or unsafe behavior may result in removal from the facility.",
      },
      {
        label: "10.6 Injury and Liability",
        text: "Participation in physical activity carries inherent risks. 365 Fitness shall not be liable for injuries sustained by children during participation in gym activities, classes, or programs.",
      },
      {
        label: "10.7 Damage to Property",
        text: "Parents or guardians are financially responsible for any damage caused by the child to gym property or equipment.",
      },
    ],
  },
];

const agreementSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required").max(120, "Full name is too long"),
  email: z.string().trim().email("Valid email is required").max(255, "Email is too long"),
  phone: z.string().trim().regex(/^[0-9+\s()-]+$/, "Valid phone number is required").max(30, "Phone number is too long"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  emiratesId: z.string().trim().min(5, "Emirates ID or ID number is required").max(50, "ID number is too long"),
  address: z.string().trim().min(5, "Address is required").max(300, "Address is too long"),
  emergencyContactName: z.string().trim().min(2, "Emergency contact name is required").max(120, "Emergency contact name is too long"),
  emergencyContactPhone: z.string().trim().regex(/^[0-9+\s()-]+$/, "Valid emergency contact phone is required").max(30, "Emergency phone is too long"),
  branch: z.string().min(1, "Please select a branch"),
  membershipType: z.string().min(1, "Please select a membership type"),
  startDate: z.string().min(1, "Start date is required"),
  medicalNotes: z.string().trim().max(800, "Medical notes are too long").optional(),
  signature: z.string().trim().min(2, "Please type your full name as signature").max(120, "Signature is too long"),
  acceptsTerms: z.boolean().refine((value) => value, "You must accept the membership agreement"),
  acceptsHealthDeclaration: z.boolean().refine((value) => value, "You must accept the health declaration"),
});

type AgreementFormData = z.infer<typeof agreementSchema>;

const initialFormData: AgreementFormData = {
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  emiratesId: "",
  address: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  branch: "",
  membershipType: "",
  startDate: "",
  medicalNotes: "",
  signature: "",
  acceptsTerms: false,
  acceptsHealthDeclaration: false,
};

const MembershipAgreement = () => {
  const [formData, setFormData] = useState<AgreementFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = <Key extends keyof AgreementFormData>(
    key: Key,
    value: AgreementFormData[Key],
  ) => {
    setFormData((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validation = agreementSchema.safeParse(formData);

    if (!validation.success) {
      toast({
        title: "Missing Information",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        full_name: validation.data.fullName,
        email: validation.data.email,
        phone: validation.data.phone,
        date_of_birth: validation.data.dateOfBirth,
        emirates_id: validation.data.emiratesId,
        address: validation.data.address,
        emergency_contact_name: validation.data.emergencyContactName,
        emergency_contact_phone: validation.data.emergencyContactPhone,
        branch: validation.data.branch,
        membership_type: validation.data.membershipType,
        start_date: validation.data.startDate,
        medical_notes: validation.data.medicalNotes || null,
        signature: validation.data.signature,
        accepts_terms: validation.data.acceptsTerms,
        accepts_health_declaration: validation.data.acceptsHealthDeclaration,
        user_agent: window.navigator.userAgent,
      };

      const { error } = await supabase
        .from("membership_agreements")
        .insert(payload);

      if (error) {
        throw error;
      }

      toast({
        title: "Agreement Submitted",
        description: "Thank you. Your signed membership agreement has been saved.",
      });

      setFormData(initialFormData);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Membership agreement submission failed:", error);
      toast({
        title: "Submission Failed",
        description: "Please try again or contact 365 Fitness directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative pt-36 pb-16 bg-[#07111f] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,204,0,0.16),transparent_34%),linear-gradient(135deg,rgba(255,204,0,0.08),transparent_50%)]" />
          <div className="relative container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-bold uppercase tracking-wide text-primary mb-6">
                <ClipboardPenLine className="h-4 w-4" />
                Digital Membership Agreement
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-foreground mb-5">
                365 Fitness <span className="text-primary">Membership Agreement</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                Complete this form after receiving your agreement link. Once submitted, your details and digital signature are securely recorded.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 bg-background">
          <div className="container mx-auto px-4">
            {isSubmitted ? (
              <div className="max-w-2xl mx-auto bg-card border border-primary/30 rounded-lg p-8 text-center shadow-glow">
                <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-5" />
                <h2 className="text-3xl font-bold text-foreground mb-3">Agreement Saved</h2>
                <p className="text-muted-foreground mb-6">
                  Thank you. Your signed membership agreement has been submitted to 365 Fitness.
                </p>
                <Button variant="hero" onClick={() => setIsSubmitted(false)}>
                  Submit Another Agreement
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
                <div className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-glow-lg">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                    Member <span className="text-primary">Details</span>
                  </h2>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input id="fullName" value={formData.fullName} onChange={(e) => updateField("fullName", e.target.value)} required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone / WhatsApp *</Label>
                      <Input id="phone" type="tel" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="+971 50 123 4567" required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} required />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input id="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={(e) => updateField("dateOfBirth", e.target.value)} required />
                    </div>
                    <div>
                      <Label htmlFor="emiratesId">Emirates ID / ID Number *</Label>
                      <Input id="emiratesId" value={formData.emiratesId} onChange={(e) => updateField("emiratesId", e.target.value)} required />
                    </div>
                    <div>
                      <Label htmlFor="startDate">Membership Start Date *</Label>
                      <Input id="startDate" type="date" value={formData.startDate} onChange={(e) => updateField("startDate", e.target.value)} required />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Address *</Label>
                      <Textarea id="address" value={formData.address} onChange={(e) => updateField("address", e.target.value)} rows={3} required />
                    </div>
                  </div>

                  <div className="mt-9">
                    <h3 className="text-xl font-bold text-foreground mb-5">Emergency Contact</h3>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <Label htmlFor="emergencyContactName">Contact Name *</Label>
                        <Input id="emergencyContactName" value={formData.emergencyContactName} onChange={(e) => updateField("emergencyContactName", e.target.value)} required />
                      </div>
                      <div>
                        <Label htmlFor="emergencyContactPhone">Contact Phone *</Label>
                        <Input id="emergencyContactPhone" type="tel" value={formData.emergencyContactPhone} onChange={(e) => updateField("emergencyContactPhone", e.target.value)} required />
                      </div>
                    </div>
                  </div>

                  <div className="mt-9">
                    <h3 className="text-xl font-bold text-foreground mb-5">Membership Information</h3>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <Label htmlFor="branch">Branch *</Label>
                        <Select value={formData.branch} onValueChange={(value) => updateField("branch", value)}>
                          <SelectTrigger id="branch" className="bg-background">
                            <SelectValue placeholder="Select branch" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border-border">
                            {BRANCHES.map((branch) => (
                              <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="membershipType">Membership Type *</Label>
                        <Select value={formData.membershipType} onValueChange={(value) => updateField("membershipType", value)}>
                          <SelectTrigger id="membershipType" className="bg-background">
                            <SelectValue placeholder="Select membership" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border-border">
                            {MEMBERSHIP_TYPES.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="medicalNotes">Medical Notes / Injuries</Label>
                        <Textarea
                          id="medicalNotes"
                          value={formData.medicalNotes}
                          onChange={(e) => updateField("medicalNotes", e.target.value)}
                          placeholder="Write any medical condition, injury, or leave blank if none."
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <aside className="lg:sticky lg:top-28 space-y-6">
                  <div className="bg-card border border-border rounded-lg p-6 shadow-glow">
                    <div className="flex items-center gap-3 mb-4">
                      <ShieldCheck className="h-6 w-6 text-primary" />
                      <h2 className="text-xl font-bold text-foreground">Agreement Terms</h2>
                    </div>
                    <div className="max-h-[520px] space-y-6 overflow-y-auto pr-2 text-sm text-muted-foreground leading-relaxed">
                      {AGREEMENT_TERMS.map((section) => (
                        <section key={section.title} className="space-y-3">
                          <h3 className="text-base font-bold text-foreground">{section.title}</h3>
                          <div className="space-y-3">
                            {section.items.map((item) => (
                              <p key={item.label}>
                                <span className="font-bold text-foreground">{item.label}: </span>
                                {item.text}
                              </p>
                            ))}
                          </div>
                        </section>
                      ))}
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-6 shadow-glow">
                    <div className="space-y-5">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="acceptsTerms"
                          checked={formData.acceptsTerms}
                          onCheckedChange={(checked) => updateField("acceptsTerms", checked === true)}
                        />
                        <Label htmlFor="acceptsTerms" className="text-sm leading-relaxed cursor-pointer">
                          I have read and accept the 365 Fitness membership agreement.
                        </Label>
                      </div>
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="acceptsHealthDeclaration"
                          checked={formData.acceptsHealthDeclaration}
                          onCheckedChange={(checked) => updateField("acceptsHealthDeclaration", checked === true)}
                        />
                        <Label htmlFor="acceptsHealthDeclaration" className="text-sm leading-relaxed cursor-pointer">
                          I confirm I am fit to train or have medical approval to exercise.
                        </Label>
                      </div>
                      <div>
                        <Label htmlFor="signature">Digital Signature *</Label>
                        <Input
                          id="signature"
                          value={formData.signature}
                          onChange={(e) => updateField("signature", e.target.value)}
                          placeholder="Type your full name"
                          required
                        />
                      </div>
                      <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Sign & Submit"}
                      </Button>
                    </div>
                  </div>
                </aside>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default MembershipAgreement;
