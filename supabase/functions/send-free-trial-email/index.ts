import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const resend_api_key = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface FreeTrialRequest {
  name: string;
  email: string;
  phone: string;
  preferredLocation?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, preferredLocation }: FreeTrialRequest = await req.json();

    console.log("Processing free trial request for:", { name, email, phone, preferredLocation });

    // Send email to the three specified addresses using Resend API
    const recipients = [
      "info@365fitness.ae",
      "vinodtharuka@gmail.com",
      "engrkhch1@gmail.com"
    ];

    const emailPayload = {
      from: "365 Fitness <noreply@365fitness.ae>",
      to: recipients,
      subject: "New Free Trial Request - 365 Fitness",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FFCC00; background: #0a1628; padding: 20px; text-align: center;">
            365 Fitness - New Free Trial Request
          </h1>
          <div style="padding: 20px; background: #f5f5f5;">
            <h2 style="color: #0a1628;">Customer Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${phone}</td>
              </tr>
              ${preferredLocation ? `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Preferred Location:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${preferredLocation}</td>
              </tr>
              ` : ''}
            </table>
            <p style="margin-top: 20px; color: #666;">
              Please follow up with this customer within 24 hours to schedule their free trial session.
            </p>
          </div>
          <div style="background: #0a1628; color: white; padding: 15px; text-align: center; margin-top: 20px;">
            <p style="margin: 0;">© 2025 365 Fitness. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resend_api_key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Resend API error: ${emailResponse.status} - ${errorData}`);
    }

    const emailResult = await emailResponse.json();
    console.log("Email sent successfully:", emailResult);

    return new Response(JSON.stringify({ 
      success: true,
      message: "Free trial request submitted successfully" 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-free-trial-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
