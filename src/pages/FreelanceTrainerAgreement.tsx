import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, ClipboardPenLine } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const SPECIALIZATIONS = [
    "Strength & Conditioning",
    "Weight Loss",
    "Muscle Building",
    "Functional Training",
    "Crossfit",
    "Yoga",
    "Pilates",
    "Rehabilitation",
    "Sports Specific Training",
    "Nutrition Coaching",
    "Online Coaching",
    "Group Fitness",
    "Other",
];

const AGREEMENT_TERMS = [
    {
        title: "1. Freelance Trainer Responsibilities",
        items: [
            {
                label: "1.1 Professional Conduct",
                text: "Freelance trainers must maintain professional conduct at all times and adhere to all 365 Fitness facility rules and regulations.",
            },
            {
                label: "1.2 Qualifications",
                text: "Trainers must possess valid fitness certifications and any relevant professional qualifications as required by UAE regulations.",
            },
            {
                label: "1.3 Client Safety",
                text: "Trainers are responsible for ensuring safe training practices and providing appropriate modifications for clients based on their fitness level and any health conditions.",
            },
            {
                label: "1.4 Professional Insurance",
                text: "It is highly recommended that freelance trainers carry professional liability insurance to cover any potential incidents.",
            },
        ],
    },
    {
        title: "2. Code of Conduct",
        items: [
            {
                label: "2.1 Respectful Behavior",
                text: "Trainers must treat members, staff, and fellow trainers with respect, courtesy, and professionalism at all times.",
            },
            {
                label: "2.2 Prohibited Behavior",
                text: "Trainers must not engage in discriminatory, harassing, or inappropriate behavior. Any violation may result in immediate termination of the agreement.",
            },
            {
                label: "2.3 Facility Respect",
                text: "Trainers must treat 365 Fitness facilities and equipment with proper care and must report any damage or maintenance issues immediately.",
            },
        ],
    },
    {
        title: "3. Payment Terms and Rates",
        items: [
            {
                label: "3.1 Session Rate",
                text: "The agreed-upon session rate is provided by the trainer and is subject to negotiation with clients. 365 Fitness does not involve itself in payment arrangements between trainers and clients.",
            },
            {
                label: "3.2 Independent Contractor Status",
                text: "Trainers are independent contractors and are responsible for their own taxes, insurance, and all employment-related benefits.",
            },
            {
                label: "3.3 Payment Responsibility",
                text: "Clients are responsible for direct payment to the trainer. 365 Fitness does not process payments or act as an intermediary.",
            },
        ],
    },
    {
        title: "4. Client Confidentiality",
        items: [
            {
                label: "4.1 Client Privacy",
                text: "Trainers must maintain strict confidentiality regarding client information, fitness goals, health conditions, and personal data.",
            },
            {
                label: "4.2 Data Protection",
                text: "Trainers must comply with all applicable data protection laws and regulations, including the UAE Personal Data Protection Law.",
            },
            {
                label: "4.3 No Solicitation",
                text: "Trainers must not solicit clients outside 365 Fitness facilities or redirect members to external facilities without notifying 365 Fitness management.",
            },
        ],
    },
    {
        title: "5. Health and Liability",
        items: [
            {
                label: "5.1 Medical Clearance",
                text: "Trainers must ensure clients obtain medical clearance before commencing any fitness program, especially for clients with existing health conditions.",
            },
            {
                label: "5.2 Health Screening",
                text: "Trainers should conduct appropriate fitness assessments and health screenings before designing training programs.",
            },
            {
                label: "5.3 Liability Waiver",
                text: "Trainers acknowledge that fitness training carries inherent risks and 365 Fitness shall not be held liable for any injuries or incidents that occur during training sessions.",
            },
            {
                label: "5.4 Emergency Response",
                text: "Trainers are required to be trained in basic first aid and CPR. In case of emergency, trainers must immediately notify 365 Fitness staff and emergency services.",
            },
        ],
    },
    {
        title: "6. Facility Access and Hours",
        items: [
            {
                label: "6.1 Access Authorization",
                text: "Access to 365 Fitness facilities is provided solely for the purpose of conducting training sessions with members. Access times must be communicated to management.",
            },
            {
                label: "6.2 Operating Hours",
                text: "Trainers must only conduct sessions during facility operating hours unless prior written approval is obtained from management.",
            },
            {
                label: "6.3 Facility Closure",
                text: "Trainers must cease operations immediately upon notification of facility closure, maintenance, or any emergency situation.",
            },
        ],
    },
    {
        title: "7. Equipment and Facility Use",
        items: [
            {
                label: "7.1 Equipment Usage",
                text: "Trainers must use facility equipment in accordance with manufacturer guidelines and 365 Fitness policies.",
            },
            {
                label: "7.2 Equipment Damage",
                text: "Any damage to equipment caused by trainer negligence will result in charges for repair or replacement. Trainers are financially liable for damages.",
            },
            {
                label: "7.3 Cleanliness",
                text: "Trainers must maintain cleanliness standards and properly sanitize equipment after use.",
            },
        ],
    },
    {
        title: "8. Termination and Dispute Resolution",
        items: [
            {
                label: "8.1 Termination Rights",
                text: "365 Fitness reserves the right to terminate this agreement at any time without cause or with cause, including breach of these terms.",
            },
            {
                label: "8.2 Dispute Resolution",
                text: "Any disputes arising from this agreement shall be governed by UAE law and resolved through amicable discussion or legal proceedings in Dubai courts.",
            },
            {
                label: "8.3 No Exclusivity",
                text: "This agreement does not grant trainers exclusive rights to 365 Fitness facilities. Multiple trainers may operate simultaneously.",
            },
        ],
    },
    {
        title: "9. Compliance and Regulations",
        items: [
            {
                label: "9.1 Legal Compliance",
                text: "Trainers must comply with all UAE federal and emirate laws, including employment laws, health and safety regulations, and licensing requirements.",
            },
            {
                label: "9.2 Visa and Residency",
                text: "Trainers must maintain valid visa status and all required legal documentation to work in the UAE.",
            },
            {
                label: "9.3 Professional Licenses",
                text: "Trainers must maintain all required professional certifications and licenses current and valid.",
            },
        ],
    },
];

const trainerAgreementSchema = z.object({
    fullName: z.string().trim().min(2, "Full name is required").max(120, "Full name is too long"),
    email: z.string().trim().email("Valid email is required").max(255, "Email is too long"),
    phone: z.string().trim().regex(/^[0-9+\s()-]+$/, "Valid phone number is required").max(30, "Phone number is too long"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    emiratesId: z.string().trim().min(5, "Emirates ID or ID number is required").max(50, "ID number is too long"),
    address: z.string().trim().min(5, "Address is required").max(300, "Address is too long"),
    emergencyContactName: z.string().trim().min(2, "Emergency contact name is required").max(120, "Emergency contact name is too long"),
    emergencyContactPhone: z.string().trim().regex(/^[0-9+\s()-]+$/, "Valid emergency contact phone is required").max(30, "Emergency phone is too long"),
    bankName: z.string().trim().optional(),
    accountHolderName: z.string().trim().optional(),
    iban: z.string().trim().optional(),
    specializations: z.array(z.string()).min(1, "Please select at least one specialization"),
    experienceYears: z.string().min(1, "Years of experience is required"),
    availableTimes: z.string().trim().max(500, "Available times description is too long").optional(),
    bio: z.string().trim().max(800, "Bio is too long").optional(),
    qualifications: z.array(z.string()).optional(),
    ratePerSession: z.string().regex(/^\d+(\.\d{1,2})?$/, "Valid rate is required").optional(),
    signature: z.string().trim().min(2, "Please type your full name as signature").max(120, "Signature is too long"),
    acceptsTerms: z.boolean().refine((value) => value, "You must accept the agreement terms"),
    acceptsConfidentiality: z.boolean().refine((value) => value, "You must accept the confidentiality agreement"),
    acceptsLiability: z.boolean().refine((value) => value, "You must accept the liability waiver"),
});

type TrainerAgreementFormData = z.infer<typeof trainerAgreementSchema>;

const initialFormData: TrainerAgreementFormData = {
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    emiratesId: "",
    address: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    bankName: "",
    accountHolderName: "",
    iban: "",
    specializations: [],
    experienceYears: "",
    availableTimes: "",
    bio: "",
    qualifications: [],
    ratePerSession: "",
    signature: "",
    acceptsTerms: false,
    acceptsConfidentiality: false,
    acceptsLiability: false,
};

const FreelanceTrainerAgreement = () => {
    const [formData, setFormData] = useState<TrainerAgreementFormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const updateField = <Key extends keyof TrainerAgreementFormData>(
        key: Key,
        value: TrainerAgreementFormData[Key],
    ) => {
        setFormData((current) => ({ ...current, [key]: value }));
    };

    const toggleSpecialization = (spec: string) => {
        updateField(
            "specializations",
            formData.specializations.includes(spec)
                ? formData.specializations.filter((s) => s !== spec)
                : [...formData.specializations, spec],
        );
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const validation = trainerAgreementSchema.safeParse({
            ...formData,
            experienceYears: formData.experienceYears ? parseInt(formData.experienceYears) : NaN,
            ratePerSession: formData.ratePerSession ? parseFloat(formData.ratePerSession) : undefined,
        });

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
            const agreementId = crypto.randomUUID();
            const submittedAt = new Date().toISOString();
            const payload = {
                id: agreementId,
                full_name: validation.data.fullName,
                email: validation.data.email,
                phone: validation.data.phone,
                date_of_birth: validation.data.dateOfBirth,
                emirates_id: validation.data.emiratesId,
                address: validation.data.address,
                emergency_contact_name: validation.data.emergencyContactName,
                emergency_contact_phone: validation.data.emergencyContactPhone,
                bank_name: validation.data.bankName || "",
                account_holder_name: validation.data.accountHolderName || "",
                iban: validation.data.iban || "",
                specializations: validation.data.specializations.join(","),
                experience_years: validation.data.experienceYears,
                available_times: validation.data.availableTimes || null,
                bio: validation.data.bio || null,
                qualifications: validation.data.qualifications?.join(",") || null,
                rate_per_session: validation.data.ratePerSession || null,
                signature: validation.data.signature,
                accepts_terms: validation.data.acceptsTerms,
                accepts_confidentiality: validation.data.acceptsConfidentiality,
                accepts_liability: validation.data.acceptsLiability,
                user_agent: window.navigator.userAgent,
            };

            const { error } = await supabase
                .from("freelance_trainer_agreements")
                .insert(payload);

            if (error) {
                throw error;
            }

            const { error: emailError } = await supabase.functions.invoke(
                "send-freelance-trainer-agreement-email",
                {
                    body: {
                        id: agreementId,
                        fullName: validation.data.fullName,
                        email: validation.data.email,
                        phone: validation.data.phone,
                        dateOfBirth: validation.data.dateOfBirth,
                        emiratesId: validation.data.emiratesId,
                        address: validation.data.address,
                        emergencyContactName: validation.data.emergencyContactName,
                        emergencyContactPhone: validation.data.emergencyContactPhone,
                        bankName: validation.data.bankName || "",
                        accountHolderName: validation.data.accountHolderName || "",
                        iban: validation.data.iban || "",
                        specializations: validation.data.specializations,
                        experienceYears: validation.data.experienceYears,
                        availableTimes: validation.data.availableTimes || null,
                        bio: validation.data.bio || null,
                        qualifications: validation.data.qualifications || null,
                        ratePerSession: validation.data.ratePerSession || null,
                        signature: validation.data.signature,
                        acceptsTerms: validation.data.acceptsTerms,
                        acceptsConfidentiality: validation.data.acceptsConfidentiality,
                        acceptsLiability: validation.data.acceptsLiability,
                        submittedAt,
                    },
                },
            );

            if (emailError) {
                console.error("Trainer agreement email failed:", emailError);
            }

            toast({
                title: "Agreement Submitted",
                description: emailError
                    ? "Thank you. Your freelance trainer agreement has been saved. 365 Fitness will review it shortly."
                    : "Thank you. Your freelance trainer agreement has been saved and emailed to 365 Fitness.",
            });

            setFormData(initialFormData);
            setIsSubmitted(true);
        } catch (error) {
            console.error("Trainer agreement submission failed:", error);
            toast({
                title: "Submission Failed",
                description: "Please try again or contact 365 Fitness directly.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main>
                    <section className="relative pt-36 pb-16 bg-[#07111f] overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,204,0,0.16),transparent_34%),linear-gradient(135deg,rgba(255,204,0,0.08),transparent_50%)]" />
                        <div className="relative container mx-auto px-4">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-bold uppercase tracking-wide text-green-500 mb-6">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Agreement Submitted
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black text-foreground mb-5">
                                    Thank You!
                                </h1>
                                <p className="text-lg md:text-xl text-muted-foreground mb-6">
                                    Your freelance trainer agreement has been successfully submitted. Our team will review your application and contact you within 2-3 business days.
                                </p>
                                <div className="space-y-3">
                                    <p className="text-foreground">
                                        In the meantime, if you have any questions, please reach out to us:
                                    </p>
                                    <p className="text-lg font-semibold text-primary">
                                        📧 info@365fitness.ae
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
                <WhatsAppButton />
            </div>
        );
    }

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
                                Freelance Trainer Agreement
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-5">
                                365 Fitness <span className="text-primary">Freelance Trainer Agreement</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                                Complete this form to join 365 Fitness as a freelance personal trainer. Once submitted, your details and digital signature are securely recorded.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-background">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <form onSubmit={handleSubmit} className="space-y-12">
                            {/* Personal Information */}
                            <div className="space-y-6 border-b border-border pb-8">
                                <h2 className="text-2xl font-bold text-foreground">Personal Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">Full Name *</Label>
                                        <Input
                                            id="fullName"
                                            placeholder="Your full name"
                                            value={formData.fullName}
                                            onChange={(e) => updateField("fullName", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="your.email@example.com"
                                            value={formData.email}
                                            onChange={(e) => updateField("email", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone / WhatsApp *</Label>
                                        <Input
                                            id="phone"
                                            placeholder="+971501234567"
                                            value={formData.phone}
                                            onChange={(e) => updateField("phone", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                                        <Input
                                            id="dateOfBirth"
                                            type="date"
                                            value={formData.dateOfBirth}
                                            onChange={(e) => updateField("dateOfBirth", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="emiratesId">Emirates ID / ID Number *</Label>
                                        <Input
                                            id="emiratesId"
                                            placeholder="1234567890123"
                                            value={formData.emiratesId}
                                            onChange={(e) => updateField("emiratesId", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Address *</Label>
                                        <Input
                                            id="address"
                                            placeholder="Your full address"
                                            value={formData.address}
                                            onChange={(e) => updateField("address", e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Emergency Contact */}
                            <div className="space-y-6 border-b border-border pb-8">
                                <h2 className="text-2xl font-bold text-foreground">Emergency Contact</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="emergencyContactName">Emergency Contact Name *</Label>
                                        <Input
                                            id="emergencyContactName"
                                            placeholder="Contact person name"
                                            value={formData.emergencyContactName}
                                            onChange={(e) => updateField("emergencyContactName", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="emergencyContactPhone">Emergency Contact Phone *</Label>
                                        <Input
                                            id="emergencyContactPhone"
                                            placeholder="+971501234567"
                                            value={formData.emergencyContactPhone}
                                            onChange={(e) => updateField("emergencyContactPhone", e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Professional Information */}
                            <div className="space-y-6 border-b border-border pb-8">
                                <h2 className="text-2xl font-bold text-foreground">Professional Information</h2>
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <Label>Specializations *</Label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {SPECIALIZATIONS.map((spec) => (
                                                <div key={spec} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={spec}
                                                        checked={formData.specializations.includes(spec)}
                                                        onCheckedChange={() => toggleSpecialization(spec)}
                                                    />
                                                    <Label htmlFor={spec} className="font-normal cursor-pointer">
                                                        {spec}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="experienceYears">Years of Experience *</Label>
                                        <Input
                                            id="experienceYears"
                                            type="number"
                                            min="0"
                                            max="70"
                                            placeholder="5"
                                            value={formData.experienceYears}
                                            onChange={(e) => updateField("experienceYears", e.target.value)}
                                        />
                                    </div>


                                </div>
                            </div>

                            {/* Agreement Terms */}
                            <div className="space-y-8 border-b border-border pb-8">
                                <h2 className="text-2xl font-bold text-foreground">Agreement Terms & Conditions</h2>

                                {AGREEMENT_TERMS.map((section, idx) => (
                                    <div key={idx} className="space-y-4">
                                        <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
                                        <div className="space-y-3">
                                            {section.items.map((item, itemIdx) => (
                                                <div key={itemIdx} className="bg-muted/30 rounded-lg p-4">
                                                    <p className="font-semibold text-foreground text-sm">{item.label}</p>
                                                    <p className="text-sm text-muted-foreground mt-2">{item.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Signature & Acceptance */}
                            <div className="space-y-6 border-b border-border pb-8">
                                <h2 className="text-2xl font-bold text-foreground">Signature & Acceptance</h2>

                                <div className="space-y-2">
                                    <Label htmlFor="signature">Digital Signature (Type your full name) *</Label>
                                    <Input
                                        id="signature"
                                        placeholder="Your full name"
                                        value={formData.signature}
                                        onChange={(e) => updateField("signature", e.target.value)}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        By typing your name, you digitally sign this agreement.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <Checkbox
                                            id="acceptsTerms"
                                            checked={formData.acceptsTerms}
                                            onCheckedChange={(checked) => updateField("acceptsTerms", checked as boolean)}
                                        />
                                        <Label
                                            htmlFor="acceptsTerms"
                                            className="text-sm font-normal cursor-pointer leading-relaxed"
                                        >
                                            I have read and agree to the Freelance Trainer Agreement terms and conditions *
                                        </Label>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <Checkbox
                                            id="acceptsConfidentiality"
                                            checked={formData.acceptsConfidentiality}
                                            onCheckedChange={(checked) => updateField("acceptsConfidentiality", checked as boolean)}
                                        />
                                        <Label
                                            htmlFor="acceptsConfidentiality"
                                            className="text-sm font-normal cursor-pointer leading-relaxed"
                                        >
                                            I agree to maintain strict confidentiality regarding client information and 365 Fitness business practices *
                                        </Label>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <Checkbox
                                            id="acceptsLiability"
                                            checked={formData.acceptsLiability}
                                            onCheckedChange={(checked) => updateField("acceptsLiability", checked as boolean)}
                                        />
                                        <Label
                                            htmlFor="acceptsLiability"
                                            className="text-sm font-normal cursor-pointer leading-relaxed"
                                        >
                                            I acknowledge that fitness training carries inherent risks and agree to the liability waiver as outlined in the agreement *
                                        </Label>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex gap-4">
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="flex-1"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Submitting..." : "Submit Agreement"}
                                </Button>
                            </div>

                            <p className="text-xs text-muted-foreground text-center">
                                All information is securely stored and encrypted. We respect your privacy.
                            </p>
                        </form>
                    </div>
                </section>
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default FreelanceTrainerAgreement;
