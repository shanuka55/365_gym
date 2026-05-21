import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const resendApiKey = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface MembershipAgreementRequest {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  emiratesId: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  branch: string;
  membershipType: string;
  startDate: string;
  medicalNotes?: string | null;
  signature: string;
  acceptsTerms: boolean;
  acceptsHealthDeclaration: boolean;
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

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const agreement: MembershipAgreementRequest = await req.json();

    const emailPayload = {
      from: "365 Fitness <noreply@365fitness.ae>",
      to: ["info@365fitness.ae"],
      subject: `New Membership Agreement - ${agreement.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 720px; margin: 0 auto;">
          <h1 style="color: #ffcc00; background: #0a1628; padding: 20px; text-align: center;">
            365 Fitness - New Membership Agreement
          </h1>
          <div style="padding: 20px; background: #f5f5f5;">
            <p style="margin-top: 0; color: #333;">
              A new digital membership agreement has been submitted and saved in Supabase.
            </p>
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
              ${tableRow("Branch", agreement.branch)}
              ${tableRow("Membership Type", agreement.membershipType)}
              ${tableRow("Membership Start Date", agreement.startDate)}
              ${tableRow("Medical Notes / Injuries", agreement.medicalNotes)}
              ${tableRow("Digital Signature", agreement.signature)}
              ${tableRow("Accepted Agreement Terms", agreement.acceptsTerms ? "Yes" : "No")}
              ${tableRow("Accepted Health Declaration", agreement.acceptsHealthDeclaration ? "Yes" : "No")}
            </table>
          </div>
          <div style="background: #0a1628; color: white; padding: 15px; text-align: center; margin-top: 20px;">
            <p style="margin: 0;">365 Fitness</p>
          </div>
        </div>
      `,
    };

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      throw new Error(`Resend API error: ${emailResponse.status} - ${errorData}`);
    }

    const emailResult = await emailResponse.json();

    return new Response(JSON.stringify({ success: true, emailResult }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-membership-agreement-email function:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    );
  }
};

serve(handler);
