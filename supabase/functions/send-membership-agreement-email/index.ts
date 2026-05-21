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

const agreementTable = (agreement: MembershipAgreementRequest) => `
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

    const agreement: MembershipAgreementRequest = await req.json();

    const adminEmailPayload = {
      from: "365 Fitness <noreply@365fitness.ae>",
      to: ["info@365fitness.ae"],
      reply_to: agreement.email,
      subject: `New Signed Membership Agreement - ${agreement.fullName}`,
      html: emailShell(
        "365 Fitness - Signed Membership Agreement",
        `
          <p style="margin-top: 0; color: #333;">
            ${escapeHtml(agreement.fullName)} has signed a digital membership agreement. The agreement has been saved in Supabase.
          </p>
          ${agreementTable(agreement)}
        `,
      ),
    };

    const memberEmailPayload = {
      from: "365 Fitness <noreply@365fitness.ae>",
      to: [agreement.email],
      reply_to: "info@365fitness.ae",
      subject: "Your 365 Fitness Membership Agreement Copy",
      html: emailShell(
        "Your 365 Fitness Membership Agreement Copy",
        `
          <p style="margin-top: 0; color: #333;">
            Dear ${escapeHtml(agreement.fullName)},
          </p>
          <p style="color: #333;">
            Thank you for signing your 365 Fitness membership agreement. A copy of your submitted agreement details is below.
          </p>
          ${agreementTable(agreement)}
          <p style="color: #333; margin-bottom: 0;">
            If any detail is incorrect, please contact us at info@365fitness.ae.
          </p>
        `,
      ),
    };

    const [adminEmailResult, memberEmailResult] = await Promise.all([
      sendEmail(adminEmailPayload),
      sendEmail(memberEmailPayload),
    ]);

    return new Response(JSON.stringify({ success: true, adminEmailResult, memberEmailResult }), {
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
