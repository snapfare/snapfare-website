import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

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
        <body style="margin:0;padding:0;background-color:#f8fafc;">
          <div style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background:linear-gradient(135deg,#10b981 0%, #3b82f6 100%);padding:40px 30px;text-align:center;">
              <h1 style="color:#ffffff;font-size:32px;font-weight:bold;margin:0;text-shadow:0 2px 4px rgba(0,0,0,0.1);">SnapFare</h1>
              <p style="color:#e0f2fe;font-size:16px;margin:10px 0 0 0;">Vollautomatisierte Schnäppchenjagd</p>
            </div>

            <!-- Main Content -->
            <div style="padding:40px 30px;">
              <!-- Title + Intro (centered as gewünscht) -->
              <h2 style="color:#1e293b;font-size:24px;font-weight:600;margin:0 0 20px 0;text-align:center;">Willkommen an Bord! 🚀</h2>
              <p style="color:#475569;font-size:16px;line-height:1.6;margin:0 0 20px 0;text-align:center;">
                Vielen Dank für deine Anmeldung bei SnapFare! Du bist jetzt offiziell dabei und erhältst mit diesem Mail deine ersten Flugdeals.
              </p>

              <!-- Info Box: Was passiert als nächstes? -->
              <div style="background:linear-gradient(135deg,#f0fdf4 0%, #eff6ff 100%);border-radius:8px;padding:25px;margin:25px 0;">
                <h3 style="color:#047857;font-size:18px;font-weight:600;margin:0 0 15px 0;text-align:center;">Was passiert als nächstes?</h3>
                <ul style="color:#374151;font-size:14px;line-height:1.6;margin:0;padding-left:20px;">
                  <li style="margin-bottom:8px;">🔍 Wir schicken dir alle zwei Wochen einen Newsletter mit den besten Deals</li>
                  <li style="margin-bottom:8px;">📱 Du erhältst eine persönliche Einladung sobald die personalisierte Flugsuche verfügbar ist</li>
                  <li style="margin-bottom:8px;">🎯 Als Premium-Nutzer bekommst du zudem Business- und Meilendeals ab der Schweiz</li>
                  <li>💰 Spare dir ab Tag 1 hunderte Franken bei deinen Flugbuchungen</li>
                </ul>
              </div>

              <!-- NEW: Aktuelle Deals Box -->
              <div style="background:linear-gradient(135deg,#f8fafc 0%, #eef2ff 100%);border:1px solid #e2e8f0;border-radius:8px;padding:24px;margin:28px 0;">
                <h3 style="color:#1e293b;font-size:18px;font-weight:700;margin:0 0 14px 0;text-align:center;">Die aktuellen Flugdeals für dich</h3>
                <p style="color:#64748b;font-size:13px;line-height:1.6;margin:0 0 18px 0;text-align:center;">
                  Preise und Verfügbarkeiten können sich schnell ändern.
                </p>

                <!-- Deals Wrapper Table (für E-Mail-Clients robust) -->
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tbody>

                    <!-- ===================== DEAL 1 ===================== -->
                    <tr><td style="padding:10px 0;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                             style="width:100%;border-radius:14px;background:#ffffff;border:1px solid #e2e8f0;box-shadow:0 1px 2px rgba(0,0,0,0.03);text-align:center;">
                        <tr>
                          <td style="padding:20px 16px;">
                            <img src="https://wallpapercave.com/wp/wp1916912.jpg"
                                 width="160" height="100" alt="Zürich → Bangkok"
                                 style="display:block;margin:0 auto;border-radius:12px;width:160px;height:100px;object-fit:cover;border:1px solid #e5e7eb;">
                            <div style="margin-top:12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:18px;line-height:24px;color:#1f2937;font-weight:800;">
                              Zürich (ZRH) →<br>Bangkok (BKK)
                            </div>
                            <div style="margin-top:4px;font-size:13px;line-height:18px;color:#6b7280;">
                              Oman Air
                            </div>
                            <div style="margin-top:10px;font-size:13px;line-height:20px;color:#334155;">🧳 Gepäck: 8&nbsp;kg&nbsp;+&nbsp;23&nbsp;kg (für 30 CHF)</div>
                            <div style="margin-top:4px;font-size:13px;line-height:20px;color:#334155;">✈️ Flugzeug: B787</div>
                            <div style="margin-top:4px;font-size:13px;line-height:20px;color:#334155;">💳 Meilen: <strong>FlyingBlue</strong> ~1'200–3'000</div>
                            <div style="margin-top:8px;font-size:12px;line-height:18px;color:#64748b;">
                              Mögliche Reisedaten:<br>12.–26. Nov · 05.–19. Jan · 02.–16. Feb (Weiterleitung Oman Air)
                            </div>
                            <div style="margin-top:14px;font-size:22px;line-height:26px;color:#0ea5e9;font-weight:900;">ab CHF 360</div>
                            <a href="https://skyscanner.pxf.io/xLKBxd" target="_blank"
                               style="display:inline-block;background:#2264f5;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;padding:10px 18px;border-radius:12px;border:1px solid #1d4ed8;">
                              Deal ansehen
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td></tr>

                    <!-- ===================== DEAL 2 ===================== -->
                    <tr><td style="padding:10px 0;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                             style="width:100%;border-radius:14px;background:#ffffff;border:1px solid #e2e8f0;box-shadow:0 1px 2px rgba(0,0,0,0.03);text-align:center;">
                        <tr>
                          <td style="padding:20px 16px;">
                            <img src="https://wallpapercave.com/wp/wp11562885.jpg"
                                 width="160" height="100" alt="Zürich → New York"
                                 style="display:block;margin:0 auto;border-radius:12px;width:160px;height:100px;object-fit:cover;border:1px solid #e5e7eb;">
                            <div style="margin-top:12px;font-size:18px;line-height:24px;color:#1f2937;font-weight:800;">
                              Zürich (ZRH) →<br>New York (JFK)
                            </div>
                            <div style="margin-top:4px;font-size:13px;line-height:18px;color:#6b7280;">
                              Condor (oder SAS)
                            </div>
                            <div style="margin-top:10px;font-size:13px;line-height:20px;color:#334155;">🧳 Gepäck: 8&nbsp;kg + 23&nbsp;kg (75 CHF Aufpreis)</div>
                            <div style="margin-top:4px;font-size:13px;line-height:20px;color:#334155;">✈️ Flugzeug: A330</div>
                            <div style="margin-top:4px;font-size:13px;line-height:20px;color:#334155;">💳 Meilen: <strong>Emirates</strong> ~9'600</div>
                            <div style="margin-top:8px;font-size:12px;line-height:18px;color:#64748b;">
                              Mögliche Reisedaten:<br>Winter 2025/2026, speziell November
                            </div>
                            <div style="margin-top:14px;font-size:22px;line-height:26px;color:#0ea5e9;font-weight:900;">ab CHF 290</div>
                            <a href="https://skyscanner.pxf.io/WyebxM" target="_blank"
                               style="display:inline-block;background:#2264f5;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;padding:10px 18px;border-radius:12px;border:1px solid #1d4ed8;">
                              Deal ansehen
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td></tr>

                    <!-- ===================== DEAL 3 ===================== -->
                    <tr><td style="padding:10px 0;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                             style="width:100%;border-radius:14px;background:#ffffff;border:1px solid #e2e8f0;box-shadow:0 1px 2px rgba(0,0,0,0.03);text-align:center;">
                        <tr>
                          <td style="padding:20px 16px;">
                            <img src="https://static.independent.co.uk/2023/07/12/14/newFile-6.jpg"
                                 width="160" height="100" alt="Zürich → Lissabon"
                                 style="display:block;margin:0 auto;border-radius:12px;width:160px;height:100px;object-fit:cover;border:1px solid #e5e7eb;">
                            <div style="margin-top:12px;font-size:18px;line-height:24px;color:#1f2937;font-weight:800;">
                              Zürich (ZRH) →<br>Lissabon (LIS)
                            </div>
                            <div style="margin-top:4px;font-size:13px;line-height:18px;color:#6b7280;">
                              easyJet
                            </div>
                            <div style="margin-top:10px;font-size:13px;line-height:20px;color:#334155;">🧳 Gepäck: 8&nbsp;kg</div>
                            <div style="margin-top:4px;font-size:13px;line-height:20px;color:#334155;">✈️ Flugzeug: A320/A321</div>
                            <div style="margin-top:4px;font-size:13px;line-height:20px;color:#334155;">💳 Meilen: — (No-Miles-Tarif)</div>
                            <div style="margin-top:8px;font-size:12px;line-height:18px;color:#64748b;">
                              Mögliche Reisedaten:<br>Oktober 2025 – März 2026
                            </div>
                            <div style="margin-top:14px;font-size:22px;line-height:26px;color:#0ea5e9;font-weight:900;">ab CHF 70</div>
                            <a href="https://skyscanner.pxf.io/gOnm3v" target="_blank"
                               style="display:inline-block;background:#2264f5;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;padding:10px 18px;border-radius:12px;border:1px solid #1d4ed8;">
                              Deal ansehen
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td></tr>

                    <!-- ===================== DEAL 4 ===================== -->
                    <tr><td style="padding:10px 0;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                             style="width:100%;border-radius:14px;background:#ffffff;border:1px solid #e2e8f0;box-shadow:0 1px 2px rgba(0,0,0,0.03);text-align:center;">
                        <tr>
                          <td style="padding:20px 16px;">
                            <img src="https://mediafiles.reiseuhu.de/wp-content/uploads/2019/05/prag-tipps8.jpg"
                                 width="160" height="100" alt="Basel → Prag"
                                 style="display:block;margin:0 auto;border-radius:12px;width:160px;height:100px;object-fit:cover;border:1px solid #e5e7eb;">
                            <div style="margin-top:12px;font-size:18px;line-height:24px;color:#1f2937;font-weight:800;">
                              Basel (BSL) →<br>Prag (PRG)
                            </div>
                            <div style="margin-top:4px;font-size:13px;line-height:18px;color:#6b7280;">
                              easyJet
                            </div>
                            <div style="margin-top:10px;font-size:13px;line-height:20px;color:#334155;">🧳 Gepäck: 8&nbsp;kg</div>
                            <div style="margin-top:4px;font-size:13px;line-height:20px;color:#334155;">✈️ Flugzeug: A319/A320</div>
                            <div style="margin-top:4px;font-size:13px;line-height:20px;color:#334155;">💳 Meilen: — (No-Miles-Tarif)</div>
                            <div style="margin-top:8px;font-size:12px;line-height:18px;color:#64748b;">
                              Mögliche Reisedaten:<br>Dezember 2025 – März 2026
                            </div>
                            <div style="margin-top:14px;font-size:22px;line-height:26px;color:#0ea5e9;font-weight:900;">ab CHF 55</div>
                            <a href="https://skyscanner.pxf.io/4G7z6r" target="_blank"
                               style="display:inline-block;background:#2264f5;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;padding:10px 18px;border-radius:12px;border:1px solid #1d4ed8;">
                              Deal ansehen
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td></tr>

                    <!-- ===================== DEAL 5 ===================== -->
                    <tr><td style="padding:10px 0;">
                      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                             style="width:100%;border-radius:14px;background:#ffffff;border:1px solid #e2e8f0;box-shadow:0 1px 2px rgba(0,0,0,0.03);text-align:center;">
                        <tr>
                          <td style="padding:20px 16px;">
                            <img src="https://cdn.generationvoyage.fr/2020/11/guide-voyage-miami-1.jpg"
                                 width="160" height="100" alt="Zürich → Miami"
                                 style="display:block;margin:0 auto;border-radius:12px;width:160px;height:100px;object-fit:cover;border:1px solid #e5e7eb;">
                            <div style="margin-top:12px;font-size:18px;line-height:24px;color:#1f2937;font-weight:800;">
                              Zürich (ZRH) →<br>Miami (MIA)
                            </div>
                            <div style="margin-top:4px;font-size:13px;line-height:18px;color:#6b7280;">
                              Swiss
                            </div>
                            <div style="margin-top:10px;font-size:13px;line-height:20px;color:#334155;">🧳 Gepäck: 8&nbsp;kg&nbsp;+&nbsp;23&nbsp;kg (kleiner Aufpreis)</div>
                            <div style="margin-top:4px;font-size:13px;line-height:20px;color:#334155;">✈️ Flugzeug: B777/A330</div>
                            <div style="margin-top:4px;font-size:13px;line-height:20px;color:#334155;">💳 Meilen: <strong>Miles&amp;More</strong> ~700–1'100</div>
                            <div style="margin-top:8px;font-size:12px;line-height:18px;color:#64748b;">
                              Mögliche Reisedaten:<br>November 2025 – März 2026
                            </div>
                            <div style="margin-top:14px;font-size:22px;line-height:26px;color:#0ea5e9;font-weight:900;">CHF 400</div>
                            <a href="https://skyscanner.pxf.io/POQJjX" target="_blank"
                               style="display:inline-block;background:#2264f5;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;padding:10px 18px;border-radius:12px;border:1px solid #1d4ed8;">
                              Deal ansehen
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td></tr>

                  </tbody>
                </table>
              </div>

              <!-- Closing (centered as gewünscht) -->
              <p style="color:#475569;font-size:16px;line-height:1.6;margin:25px 0 0 0;text-align:center;">
                Bis bald und vielen Dank für dein Vertrauen!<br>
                <strong style="color:#1e293b;">Das SnapFare Team</strong>
              </p>
            </div>

            <!-- Footer -->
            <div style="background-color:#f8fafc;padding:30px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="color:#64748b;font-size:12px;margin:0 0 10px 0;">
                Du erhältst diese E-Mail, weil du dich bei SnapFare angemeldet hast.
              </p>
              <p style="color:#94a3b8;font-size:11px;margin:0;">
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
    if (error.cause) console.error("Error cause:", error.cause);
    if (error.response) console.error("Error response:", error.response);
    
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
