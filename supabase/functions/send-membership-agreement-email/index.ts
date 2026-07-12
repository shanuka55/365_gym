import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const resendApiKey = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const adminRecipients = [
  "info@365fitness.ae",
  "ahmad.365fitness@gmail.com",
  "engrkhch1@gmail.com",
];

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

const displayValue = (value: unknown) => escapeHtml(value || "N/A");

const tableRow = (label: string, value: unknown) => `
  <tr>
    <td style="padding: 13px 16px; border-bottom: 1px solid #e8edf3; width: 36%; color: #4b5563; font-size: 13px; font-weight: 700; background: #fbfcfe;">
      ${escapeHtml(label)}
    </td>
    <td style="padding: 13px 16px; border-bottom: 1px solid #e8edf3; color: #111827; font-size: 14px; line-height: 1.5;">
      ${displayValue(value)}
    </td>
  </tr>
`;

const summaryCard = (label: string, value: unknown) => `
  <td style="width: 50%; padding: 0 6px 12px 0;">
    <div style="background: #f8fafc; border: 1px solid #e3e8ef; border-radius: 12px; padding: 16px; min-height: 66px;">
      <div style="color: #64748b; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .04em;">${escapeHtml(label)}</div>
      <div style="color: #0a1628; font-size: 17px; font-weight: 800; margin-top: 7px;">${displayValue(value)}</div>
    </div>
  </td>
`;

const signatureCertificate = (agreement: MembershipAgreementRequest) => `
  <div style="margin-top: 18px; border: 1px solid #d7dee8; border-radius: 14px; overflow: hidden; background: #ffffff;">
    <div style="padding: 14px 18px; background: #07111f; color: #ffcc00; font-size: 14px; font-weight: 900; letter-spacing: .04em; text-transform: uppercase;">
      Digital Signature Certificate
    </div>
    <table style="width: 100%; border-collapse: collapse;">
      ${tableRow("Signed By", agreement.signature)}
      ${tableRow("Agreement Holder", agreement.fullName)}
      ${tableRow("Agreement Reference", agreement.id)}
      ${tableRow("Signed Timestamp", agreement.submittedAt)}
    </table>
  </div>
`;

const agreementNotice = (agreementType: string) => `
  <div style="margin-top: 20px; padding: 18px; background: #fff8d8; border: 1px solid #f0d35b; border-radius: 12px;">
    <div style="color: #0a1628; font-size: 16px; font-weight: 800; margin-bottom: 8px;">Digital Agreement Confirmation</div>
    <div style="color: #374151; font-size: 14px; line-height: 1.6;">
      This email is a copy of the signed 365 Fitness ${escapeHtml(agreementType)}. The submission was digitally signed and securely saved in Supabase.
    </div>
  </div>
`;

const agreementTable = (agreement: MembershipAgreementRequest) => `
  <div style="margin-bottom: 18px; padding: 14px 18px; background: #0a1628; border-radius: 12px;">
    <div style="color: #ffcc00; font-size: 12px; font-weight: 900; letter-spacing: .12em; text-transform: uppercase;">Official Digital Record</div>
    <div style="color: #ffffff; font-size: 15px; margin-top: 6px;">Membership Agreement submitted through 365fitness.ae</div>
  </div>
  <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 0 0 8px;">
    <tr>
      ${summaryCard("Member", agreement.fullName)}
      ${summaryCard("Agreement", agreement.membershipType)}
    </tr>
    <tr>
      ${summaryCard("Branch", agreement.branch)}
      ${summaryCard("Signed", agreement.submittedAt)}
    </tr>
  </table>
  <div style="background: #ffffff; border: 1px solid #e3e8ef; border-radius: 14px; overflow: hidden; margin-top: 8px;">
    <div style="padding: 16px 18px; background: #f8fafc; border-bottom: 1px solid #e3e8ef;">
      <div style="font-size: 16px; color: #0a1628; font-weight: 900;">Signed Membership Agreement Details</div>
    </div>
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
  ${signatureCertificate(agreement)}
  ${agreementNotice("Membership Agreement")}
`;

const emailShell = (title: string, preview: string, content: string) => `
  <div style="margin: 0; padding: 0; background: #eef2f7; font-family: Arial, Helvetica, sans-serif;">
    <div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">${escapeHtml(preview)}</div>
    <div style="max-width: 760px; margin: 0 auto; padding: 28px 14px;">
      <div style="background: #07111f; border-radius: 18px 18px 0 0; padding: 28px 30px; text-align: center;">
        <div style="color: #ffcc00; font-size: 13px; font-weight: 900; letter-spacing: .14em; text-transform: uppercase;">365 Fitness</div>
        <h1 style="margin: 10px 0 0; color: #ffffff; font-size: 24px; line-height: 1.25; font-weight: 900;">${escapeHtml(title)}</h1>
        <div style="margin-top: 14px; display: inline-block; padding: 7px 12px; border-radius: 999px; background: #ffcc00; color: #07111f; font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: .05em;">Signed Agreement Copy</div>
      </div>
      <div style="background: #ffffff; border: 1px solid #e3e8ef; border-top: 0; border-radius: 0 0 18px 18px; padding: 28px;">
        ${content}
      </div>
      <div style="text-align: center; color: #6b7280; font-size: 12px; padding: 18px 8px 0;">
        365 Fitness Gym LLC &bull; Dubai, UAE &bull; info@365fitness.ae
      </div>
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
      to: adminRecipients,
      reply_to: agreement.email,
      subject: `Signed Membership Agreement - ${agreement.fullName}`,
      html: emailShell(
        "365 Fitness - Signed Membership Agreement",
        `${agreement.fullName} signed a 365 Fitness membership agreement.`,
        `
          <p style="margin-top: 0; color: #111827; font-size: 15px; line-height: 1.6;">
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
      subject: "Your Signed 365 Fitness Membership Agreement",
      html: emailShell(
        "Your 365 Fitness Membership Agreement Copy",
        "Thank you for signing your 365 Fitness membership agreement.",
        `
          <p style="margin-top: 0; color: #111827; font-size: 15px; line-height: 1.6;">
            Dear ${escapeHtml(agreement.fullName)},
          </p>
          <p style="color: #374151; font-size: 15px; line-height: 1.6;">
            Thank you for signing your 365 Fitness membership agreement. A copy of your submitted agreement details is below.
          </p>
          ${agreementTable(agreement)}
          <p style="color: #374151; font-size: 14px; line-height: 1.6; margin: 20px 0 0;">
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
  } catch (error: unknown) {
    console.error("Error in send-membership-agreement-email function:", error);
    const message = error instanceof Error ? error.message : "Unexpected error";

    return new Response(
      JSON.stringify({
        success: false,
        error: message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    );
  }
};

serve(handler);
