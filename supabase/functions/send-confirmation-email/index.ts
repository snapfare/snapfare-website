// send-confirmation-email.ts
// Updated: 2025-10-29 — Edge-safe Resend via fetch + Deno.serve

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ConfirmationEmailRequest {
  email: string;
  location?: string;
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

function buildHtml(): string {
  // ---- Your LIGHT THEME email (unchanged content; only moved into a function) ----
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
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
      <h2 style="color:#1e293b;font-size:24px;font-weight:600;margin:0 0 20px 0;text-align:center;">Willkommen an Bord! 🚀</h2>
      <p style="color:#475569;font-size:16px;line-height:1.6;margin:0 0 20px 0;text-align:center;">
        Vielen Dank für deine Anmeldung bei SnapFare! Du bist jetzt offiziell dabei und erhältst mit diesem Mail deine ersten Flugdeals.
      </p>

      <!-- Info Box -->
      <div style="background:linear-gradient(135deg,#f0fdf4 0%, #eff6ff 100%);border-radius:8px;padding:25px;margin:25px 0;">
        <h3 style="color:#047857;font-size:18px;font-weight:600;margin:0 0 15px 0;text-align:center;">Was passiert als nächstes?</h3>
        <ul style="color:#374151;font-size:14px;line-height:1.6;margin:0;padding-left:20px;">
          <li style="margin-bottom:8px;">🔍 Wir schicken dir alle zwei Wochen einen Newsletter mit den besten Deals</li>
          <li style="margin-bottom:8px;">📱 Du erhältst eine persönliche Einladung sobald die personalisierte Flugsuche verfügbar ist</li>
          <li style="margin-bottom:8px;">🎯 Als Premium-Nutzer bekommst du zudem Business- und Meilendeals ab der Schweiz</li>
          <li>💰 Spare dir ab Tag 1 hunderte Franken bei deinen Flugbuchungen</li>
        </ul>
      </div>

      <!-- Aktuelle Deals Box (Light) -->
      <div style="background:linear-gradient(135deg,#f8fafc 0%, #ffffff 100%);border:1px solid #e2e8f0;border-radius:12px;padding:0;margin:28px 0;">
        <div style="padding:24px 24px 0 24px;text-align:center;">
          <h3 style="color:#1f2937;font-size:18px;font-weight:700;margin:0 0 8px 0;">Die aktuellen Flugdeals für dich</h3>
          <p style="color:#64748b;font-size:13px;line-height:1.6;margin:0 0 10px 0;">Preise und Verfügbarkeiten können sich schnell ändern.</p>
        </div>

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tbody>

          <!-- ===================== DEAL 1 ===================== -->
          <tr><td style="padding:10px 16px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                   style="width:100%;border-radius:14px;background:#ffffff;border:1px solid #e2e8f0;box-shadow:0 1px 2px rgba(0,0,0,0.03);text-align:center;">
              <tr><td style="padding:20px 16px;">
                <img src="https://media.istockphoto.com/id/892808186/photo/sydney.jpg?b=1&s=170667a&w=0&k=20&c=ReC5-ifFV2q2Wvui520DjptF9RVMfoMjum7xObtS62w=" width="160" height="100" alt="Zürich → Sydney"
                     style="display:block;margin:0 auto;border-radius:12px;width:160px;height:100px;object-fit:cover;border:1px solid #e5e7eb;">
                <div style="margin-top:12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;font-size:18px;line-height:24px;color:#1f2937;font-weight:800;">
                  Zürich (ZRH) →<br>Sydney (SYD)
                </div>
                <div style="margin-top:4px;font-size:13px;line-height:18px;color:#6b7280;">Turkish Airlines (beste Economy!)</div>
                <div style="margin-top:10px;font-size:13px;line-height:20px;color:#334155;">🧳 Gepäck: 8&nbsp;kg&nbsp;+&nbsp;23&nbsp;kg</div>
                <div style="margin-top:4px;font-size:13px;line-height:20px;color:#334155;">✈️ Flugzeug: A350 (alle Langstrecken)</div>
                <div style="margin-top:4px;font-size:13px;line-height:20px;color:#334155;">💳 Meilen: <strong>Miles&amp;More</strong> ~5'100</div>
                <div style="margin-top:8px;font-size:12px;line-height:18px;color:#64748b;">Mögliche Reisedaten:<br>Winter 2025/26</div>
                <div style="margin-top:14px;font-size:22px;line-height:26px;color:#0ea5e9;font-weight:900;">ab CHF 850</div>
                <a href="https://skyscanner.pxf.io/e1Yaaz" target="_blank"
                   style="display:inline-block;background:#2264f5;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;padding:10px 18px;border-radius:12px;border:1px solid #1d4ed8;">Deal ansehen</a>
              </td></tr>
            </table>
          </td></tr>

          <!-- ===================== DEAL 2 ===================== -->
          <tr><td style="padding:10px 16px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                   style="width:100%;border-radius:14px;background:#ffffff;border:1px solid #e2e8f0;box-shadow:0 1px 2px rgba(0,0,0,0.03);text-align:center;">
              <tr><td style="padding:20px 16px;">
                <img src="https://images.unsplash.com/photo-1542544499-bce9dc3bb4e8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9"
                     width="160" height="100" alt="Zürich → Dubai (SHJ)"
                     style="display:block;margin:0 auto;border-radius:12px;width:160px;height:100px;object-fit:cover;border:1px solid #e5e7eb;">
                <div style="margin-top:12px;font-size:18px;line-height:24px;color:#1f2937;font-weight:800;">Zürich (ZRH) →<br>Dubai (SHJ)</div>
                <div style="margin-top:4px;font-size:13px;line-height:18px;color:#6b7280;">Turkish Airlines</div>
                <div style="margin-top:10px;font-size:13px;line-height:20px;color:#334155;">🧳 Gepäck: 8&nbsp;kg + 23 kg (Aufpreis 50 CHF)</div>
                <div style="margin-top:4px;font-size:13px;line-height:20px;color:#334155;">✈️ Flugzeug: B737 (MAX)</div>
                <div style="margin-top:4px;font-size:13px;line-height:20px;color:#334155;">💳 Meilen: <strong>Miles&amp;Smiles</strong> Keine Meilen</div>
                <div style="margin-top:8px;font-size:12px;line-height:18px;color:#64748b;">Mögliche Reisedaten:<br>November - Dezember 2025</div>
                <div style="margin-top:14px;font-size:22px;line-height:26px;color:#0ea5e9;font-weight:900;">ab CHF 220</div>
                <a href="https://skyscanner.pxf.io/4GX2Kn" target="_blank"
                   style="display:inline-block;background:#2264f5;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;padding:10px 18px;border-radius:12px;border:1px solid #1d4ed8;">Deal ansehen</a>
              </td></tr>
            </table>
          </td></tr>

          <!-- ===================== DEAL 3 ===================== -->
          <tr><td style="padding:10px 16px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                   style="width:100%;border-radius:14px;background:#ffffff;border:1px solid #e2e8f0;box-shadow:0 1px 2px rgba(0,0,0,0.03);text-align:center;">
              <tr><td style="padding:20px 16px;">
                <img src="https://media.istockphoto.com/id/1315005752/photo/paradise-tropical-island-nature-background-top-aerial-drone-view-of-beautiful-beach-with.jpg?b=1&s=170667a&w=0&k=20&c=T6OsJaP3n2vaXld7xbgIconb6RKQouF96zsMmIt5r-M="
                     width="160" height="100" alt="Zürich → Punta Cana"
                     style="display:block;margin:0 auto;border-radius:12px;width:160px;height:100px;object-fit:cover;border:1px solid #e5e7eb;">
                <div style="margin-top:12px;font-size:18px;line-height:24px;color:#1f2937;font-weight:800;">Zürich (ZRH) →<br>Punta Cana (PUJ)</div>
                <div style="margin-top:4px;font-size:13px;line-height:18px;color:#6b7280;">Condor (kurzer Zwischenstopp)</div>
                <div style="margin-top:10px;font-size:13px;line-height:20px;color:#334155;">🧳 Gepäck: 8&nbsp;kg + 23 kg (Aufpreis 100 CHF)</div>
                <div style="margin-top:4px;font-size:13px;line-height:20px;color:#334155;">✈️ Flugzeug: A330neo</div>
                <div style="margin-top:4px;font-size:13px;line-height:20px;color:#334155;">💳 Meilen: <strong>Alaska Mileage Plan</strong> 2'400 Meilen</div>
                <div style="margin-top:8px;font-size:12px;line-height:18px;color:#64748b;">Mögliche Reisedaten:<br>November 2025 - Juni 2026</div>
                <div style="margin-top:14px;font-size:22px;line-height:26px;color:#0ea5e9;font-weight:900;">ab CHF 600</div>
                <a href="https://skyscanner.pxf.io/55oKx2" target="_blank"
                   style="display:inline-block;background:#2264f5;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;padding:10px 18px;border-radius:12px;border:1px solid #1d4ed8;">Deal ansehen</a>
              </td></tr>
            </table>
          </td></tr>

          <!-- ===================== DEAL 4 ===================== -->
          <tr><td style="padding:10px 16px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                   style="width:100%;border-radius:14px;background:#ffffff;border:1px solid #e2e8f0;box-shadow:0 1px 2px rgba(0,0,0,0.03);text-align:center;">
              <tr><td style="padding:20px 16px;">
                <img src="https://media.istockphoto.com/photos/aerial-view-of-valletta-city-capital-of-malta-country-sunset-evening-picture-id1190937298?b=1&k=20&m=1190937298&s=170667a&w=0&h=olexpnCuDa8R9zjJQ4GfT1zFARowCaiwlZws5lNAIJ4="
                     width="160" height="100" alt="Zürich → Malta"
                     style="display:block;margin:0 auto;border-radius:12px;width:160px;height:100px;object-fit:cover;border:1px solid #e5e7eb;">
                <div style="margin-top:12px;font-size:18px;line-height:24px;color:#1f2937;font-weight:800;">Zürich (ZRH) →<br>Malta (MLA)</div>
                <div style="margin-top:4px;font-size:13px;line-height:18px;color:#6b7280;">Swiss</div>
                <div style="margin-top:10px;font-size:13px;line-height:20px;color:#334155;">🧳 Gepäck: 8&nbsp;kg</div>
                <div style="margin-top:4px;font-size:13px;line-height:20px;color:#334155;">✈️ Flugzeug: A220</div>
                <div style="margin-top:4px;font-size:13px;line-height:20px;color:#334155;">💳 Meilen: <strong>Miles&amp;More</strong> 300 Meilen</div>
                <div style="margin-top:8px;font-size:12px;line-height:18px;color:#64748b;">Mögliche Reisedaten:<br>Bis und mit August 2026</div>
                <div style="margin-top:14px;font-size:22px;line-height:26px;color:#0ea5e9;font-weight:900;">ab CHF 130</div>
                <a href="https://skyscanner.pxf.io/kOYVr3" target="_blank"
                   style="display:inline-block;background:#2264f5;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;padding:10px 18px;border-radius:12px;border:1px solid #1d4ed8;">Deal ansehen</a>
              </td></tr>
            </table>
          </td></tr>

          <!-- ===================== DEAL 5 ===================== -->
          <tr><td style="padding:10px 16px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
                   style="width:100%;border-radius:14px;background:#ffffff;border:1px solid #e2e8f0;box-shadow:0 1px 2px rgba(0,0,0,0.03);text-align:center;">
              <tr><td style="padding:20px 16px;">
                <img src="https://plus.unsplash.com/premium_photo-1690522331003-a5d7cff78f3a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGV4YXN8ZW58MHx8MHx8fDA%3D"
                     width="160" height="100" alt="Zürich → Dallas"
                     style="display:block;margin:0 auto;border-radius:12px;width:160px;height:100px;object-fit:cover;border:1px solid #e5e7eb;">
                <div style="margin-top:12px;font-size:18px;line-height:24px;color:#1f2937;font-weight:800;">Zürich (ZRH) →<br>Dallas (DFW)</div>
                <div style="margin-top:4px;font-size:13px;line-height:18px;color:#6b7280;">British Airways / American</div>
                <div style="margin-top:10px;font-size:13px;line-height:20px;color:#334155;">🧳 Gepäck: 8&nbsp;kg&nbsp;+&nbsp;23&nbsp;kg (für 130 CHF)</div>
                <div style="margin-top:4px;font-size:13px;line-height:20px;color:#334155;">✈️ Flugzeug: B787/B777</div>
                <div style="margin-top:4px;font-size:13px;line-height:20px;color:#334155;">💳 Meilen: <strong>BA Avios</strong> ~600</div>
                <div style="margin-top:8px;font-size:12px;line-height:18px;color:#64748b;">Mögliche Reisedaten:<br>Bis und mit Juni 2026</div>
                <div style="margin-top:14px;font-size:22px;line-height:26px;color:#0ea5e9;font-weight:900;">ab CHF 420</div>
                <a href="https://skyscanner.pxf.io/raYRY5" target="_blank"
                   style="display:inline-block;background:#2264f5;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;padding:10px 18px;border-radius:12px;border:1px solid #1d4ed8;">Deal ansehen</a>
              </td></tr>
            </table>
          </td></tr>

        </tbody></table>
      </div>

      <p style="color:#475569;font-size:16px;line-height:1.6;margin:25px 0 0 0;text-align:center;">
        Bis bald und vielen Dank für dein Vertrauen!<br>
        <strong style="color:#1e293b;">Das SnapFare Team</strong>
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color:#f8fafc;padding:30px;text-align:center;border-top:1px solid #e2e8f0;">
      <p style="color:#64748b;font-size:12px;margin:0 0 10px 0;">Du erhältst diese E-Mail, weil du dich bei SnapFare angemeldet hast.</p>
      <p style="color:#94a3b8;font-size:11px;margin:0;">© 2025 SnapFare. Alle Rechte vorbehalten.</p>
    </div>

  </div>
</body>
</html>`;
  // ---- end email ----
}

async function sendWithResend(apiKey: string, to: string, html: string) {
  const payload = {
    from: "SnapFare <noreply@basics-db.ch>",
    to: [to],
    subject: "Willkommen bei SnapFare! 🎉",
    html,
  };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let data: unknown;
  try { data = JSON.parse(text); } catch { data = text; }

  if (!res.ok) {
    throw new Error(typeof data === "string" ? data : JSON.stringify(data));
  }
  return data;
}

// Edge-native server (no std import needed)
Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { email, location }: ConfirmationEmailRequest = await req.json();

    if (!email || typeof email !== "string" || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ success: false, error: "Invalid or missing 'email'." }, 400);
    }

    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) return json({ success: false, error: "Email service not configured" }, 500);

    console.log(`[send-confirmation-email] to=${email} loc=${location ?? "Unknown"}`);

    const html = buildHtml();
    const data = await sendWithResend(apiKey, email, html);

    return json({ success: true, data }, 200);
  } catch (error: any) {
    console.error("Error in send-confirmation-email:", error?.message ?? error);
    return json({
      success: false,
      error: error?.message ?? "Unknown error occurred",
      details: error?.name ?? "Error",
    }, 500);
  }
});
