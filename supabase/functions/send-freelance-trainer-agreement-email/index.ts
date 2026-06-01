import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const resendApiKey = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
};

interface FreelanceTrainerAgreementRequest {
    id?: string;
    fullName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    emiratesId: string;
    address: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    bankName: string;
    accountHolderName: string;
    iban: string;
    specializations: string[];
    experienceYears: number;
    availableTimes?: string;
    bio?: string;
    qualifications?: string[];
    ratePerSession?: number;
    signature: string;
    acceptsTerms: boolean;
    acceptsConfidentiality: boolean;
    acceptsLiability: boolean;
    submittedAt?: string;
}

const escapeHtml = (value: unknown) =>
    String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

const tableRow = (label: string, value: unknown) => `
  <tr>
    <td style="padding: 10px; border-bottom: 1px solid #ddd; width: 38%;"><strong>${escapeHtml(label)}:</strong></td>
    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${escapeHtml(value || "N/A")}</td>
  </tr>
`;

const agreementTable = (agreement: FreelanceTrainerAgreementRequest) => `
  <table style="width: 100%; border-collapse: collapse; background: #ffffff;">
    ${tableRow("Agreement ID", agreement.id)}
    ${tableRow("Submitted At", agreement.submittedAt)}
    ${tableRow("Full Name", agreement.fullName)}
    ${tableRow("Email", agreement.email)}
    ${tableRow("Phone / WhatsApp", agreement.phone)}
    ${tableRow("Date of Birth", agreement.dateOfBirth)}
    ${tableRow("Emirates ID / ID Number", agreement.emiratesId)}
    ${tableRow("Address", agreement.address)}
    ${tableRow("Emergency Contact Name", agreement.emergencyContactName)}
    ${tableRow("Emergency Contact Phone", agreement.emergencyContactPhone)}
    ${tableRow("Bank Name", agreement.bankName)}
    ${tableRow("Account Holder Name", agreement.accountHolderName)}
    ${tableRow("IBAN", agreement.iban)}
    ${tableRow("Specializations", Array.isArray(agreement.specializations) ? agreement.specializations.join(", ") : agreement.specializations)}
    ${tableRow("Years of Experience", agreement.experienceYears)}
    ${tableRow("Available Times", agreement.availableTimes)}
    ${tableRow("Bio", agreement.bio)}
    ${tableRow("Qualifications", Array.isArray(agreement.qualifications) ? agreement.qualifications.join(", ") : agreement.qualifications)}
    ${tableRow("Rate per Session (AED)", agreement.ratePerSession)}
    ${tableRow("Digital Signature", agreement.signature)}
    ${tableRow("Accepted Agreement Terms", agreement.acceptsTerms ? "Yes" : "No")}
    ${tableRow("Accepted Confidentiality Agreement", agreement.acceptsConfidentiality ? "Yes" : "No")}
    ${tableRow("Accepted Liability Waiver", agreement.acceptsLiability ? "Yes" : "No")}
  </table>
`;

const emailShell = (title: string, content: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 720px; margin: 0 auto;">
    <h1 style="color: #ffcc00; background: #0a1628; padding: 20px; text-align: center;">
      ${escapeHtml(title)}
    </h1>
    <div style="padding: 20px; background: #f5f5f5;">
      ${content}
    </div>
    <div style="background: #0a1628; color: white; padding: 15px; text-align: center; margin-top: 20px;">
      <p style="margin: 0;">365 Fitness</p>
    </div>
  </div>
`;

const sendEmail = async (payload: Record<string, unknown>) => {
    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Resend API error: ${response.status} - ${errorData}`);
    }

    return response.json();
};

const handler = async (req: Request): Promise<Response> => {
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        if (!resendApiKey) {
            throw new Error("RESEND_API_KEY is not configured");
        }

        const agreement: FreelanceTrainerAgreementRequest = await req.json();

        const adminEmailPayload = {
            from: "365 Fitness <noreply@365fitness.ae>",
            to: ["info@365fitness.ae"],
            reply_to: agreement.email,
            subject: `New Freelance Trainer Agreement - ${agreement.fullName}`,
            html: emailShell(
                "365 Fitness - Freelance Trainer Agreement Submission",
                `
          <p style="margin-top: 0; color: #333;">
            ${escapeHtml(agreement.fullName)} has submitted a freelance trainer agreement. The submission has been saved in Supabase.
          </p>
          ${agreementTable(agreement)}
        `,
            ),
        };

        const trainerEmailPayload = {
            from: "365 Fitness <noreply@365fitness.ae>",
            to: [agreement.email],
            reply_to: "info@365fitness.ae",
            subject: "Your 365 Fitness Freelance Trainer Agreement Submission Confirmation",
            html: emailShell(
                "Your 365 Fitness Freelance Trainer Agreement",
                `
          <p style="margin-top: 0; color: #333;">
            Dear ${escapeHtml(agreement.fullName)},
          </p>
          <p style="color: #333;">
            Thank you for submitting your freelance trainer agreement to 365 Fitness. A copy of your submitted agreement details is below.
          </p>
          ${agreementTable(agreement)}
          <p style="color: #333;">
            Our team will review your application and contact you within 2-3 business days with next steps.
          </p>
          <p style="color: #333; margin-bottom: 0;">
            If any detail is incorrect, please contact us at info@365fitness.ae.
          </p>
        `,
            ),
        };

        const [adminEmailResult, trainerEmailResult] = await Promise.all([
            sendEmail(adminEmailPayload),
            sendEmail(trainerEmailPayload),
        ]);

        console.log("Emails sent successfully:", { adminEmailResult, trainerEmailResult });

        return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error) {
        console.error("Error sending trainer agreement emails:", error);
        return new Response(
            JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 500,
            },
        );
    }
};

serve(handler);
