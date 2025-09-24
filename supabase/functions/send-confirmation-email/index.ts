import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ConfirmationEmailRequest {
  email: string;
  location?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, location }: ConfirmationEmailRequest = await req.json();

    console.log(`Attempting to send confirmation email to: ${email}`);
    console.log(`User location: ${location || 'Unknown'}`);
    
    // Check if API key is available
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Email service not configured" 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("API key found, attempting to send email...");
    console.log("Using from address: noreply@basics-db.ch");

    const emailResponse = await resend.emails.send({
      from: "SnapFare <noreply@basics-db.ch>",
      to: [email],
      subject: "Willkommen bei SnapFare! 🎉",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Willkommen bei SnapFare</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 32px; font-weight: bold; margin: 0; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">SnapFare</h1>
              <p style="color: #e0f2fe; font-size: 16px; margin: 10px 0 0 0;">Vollautomatisierte Schnäppchenjagd</p>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #1e293b; font-size: 24px; font-weight: 600; margin: 0 0 20px 0;">Willkommen an Bord! 🚀</h2>
              
              <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Vielen Dank für deine Anmeldung bei SnapFare! Du bist jetzt offiziell dabei und gehörst zu den ersten, die von unserer kostenlosen vollautomatisierten Flugdeal-Revolution profitieren werden.
              </p>
              
              <div style="background: linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%); border-radius: 8px; padding: 25px; margin: 25px 0;">
                <h3 style="color: #047857; font-size: 18px; font-weight: 600; margin: 0 0 15px 0;">Was passiert als nächstes?</h3>
                <ul style="color: #374151; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                  <li style="margin-bottom: 8px;">🔍 Wir schicken dir alle zwei Wochen einen Newsletter mit den besten Deals</li>
                  <li style="margin-bottom: 8px;">📱 Du erhältst eine persönliche Einladung sobald die personalisierte Flugsuche verfügbar ist</li>
                  <li style="margin-bottom: 8px;">🎯 Als Premium-Nutzer bekommst du zudem Business- und Meilendeals ab der Schweiz</li>
                  <li>💰 Spare dir ab Tag 1 hunderte Franken bei deinen Flugbuchungen</li>
                </ul>
              </div>
              
              ${location ? `
              <p style="color: #64748b; font-size: 14px; margin: 20px 0;">
                📍 Deine Region: ${location}
              </p>
              ` : ''}
              
              <div style="background-color: #f8fafc; border-radius: 8px; padding: 25px; margin: 30px 0; text-align: center;">
                <h3 style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">Halte Ausschau nach dem SnapFare Newsletter!</h3>
                <p style="color: #64748b; font-size: 14px; margin: 0;">Wir melden uns bald mit weiteren exklusiven Updates und deinem persönlichen Zugang.</p>
              </div>
              
              <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 25px 0 0 0;">
                Bis bald und vielen Dank für dein Vertrauen!<br>
                <strong style="color: #1e293b;">Das SnapFare Team</strong>
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 12px; margin: 0 0 10px 0;">
                Du erhältst diese E-Mail, weil du dich für die SnapFare Warteliste angemeldet hast.
              </p>
              <p style="color: #94a3b8; font-size: 11px; margin: 0;">
                © 2025 SnapFare. Alle Rechte vorbehalten.
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-confirmation-email function:", error);
    console.error("Error details:", {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    
    // Log specific Resend error details if available
    if (error.cause) {
      console.error("Error cause:", error.cause);
    }
    if (error.response) {
      console.error("Error response:", error.response);
    }
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Unknown error occurred",
        details: error.name || "Unknown error type"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
