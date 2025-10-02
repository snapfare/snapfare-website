import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const TWINT_LINK = "https://go.twint.ch/1/e/tw?tw=acq.gLWaSc6qS9WXTyve02qU3TYzXh6aJj-WV-OoE_J4WpK9fVqgx8XwDgLVcKKthvDk.&amount=49.00&trxInfo=SNAPFARE_PREMIUM_1Y"; // <-- deinen echten TWINT-Link einsetzen

const Premium = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleUpgrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      // Optional: schnelle Client-Validierung
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!isEmail) {
        toast?.({
          title: "Ungültige E-Mail",
          description: "Bitte gib eine gültige E-Mail-Adresse ein.",
          variant: "destructive",
        });
        return;
      }

      // 1) E-Mail an Supabase Function schicken (z.B. Logging/Zuordnung)
      const response = await fetch(
        "https://wwoowwnjrepokmjgxhlw.functions.supabase.co/create-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        // Wenn dein Backend down ist, gehen wir dennoch weiter zu TWINT (Fallback)
        console.warn(`Supabase returned ${response.status}, using TWINT fallback.`);
        window.location.href = TWINT_LINK;
        return;
      }

      const data = await response.json();

      // 2) Bevorzugt die vom Backend gelieferte payUrl (falls sie auf TWINT/Payment zeigt)
      if (data?.payUrl && typeof data.payUrl === "string") {
        window.location.href = data.payUrl;
        return;
      }

      // 3) Fallback: direkter TWINT-Link
      window.location.href = TWINT_LINK;
    } catch (error) {
      console.error("Upgrade error:", error);
      // Hard Fallback: auch bei Fehlern trotzdem zu TWINT, damit der User zahlen kann
      window.location.href = TWINT_LINK;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      
      <main className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                SnapFare Premium
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Profitiere mit SnapFare Premium von noch mehr Deals und verpasse nie wieder Meilendeals, Business auf der Langstrecke oder Error Fares!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-white">Free</h3>
                <div className="text-4xl font-bold text-white mb-2">CHF 0</div>
                <p className="text-gray-300">Pro Jahr</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Newsletter mit den besten Reisedeals</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Exklusive Meilendeals</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Kostenloser Zugang zur personalisierten Flugsuche (soon)</span>
                </li>
              </ul>
              
              <Button variant="secondary" className="w-full bg-white/10 text-gray-300 border-white/20" disabled>
                Aktueller Plan
              </Button>
            </div>

            {/* Premium Plan */}
            <div className="bg-white/5 border-2 border-green-400 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  Beliebt
                </div>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-white">Premium</h3>
                <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-2">CHF 49</div>
                <p className="text-gray-300">Pro Jahr</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Newsletter mit den besten Reisedeals</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Exklusive Meilendeals</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Kostenloser Zugang zur personalisierten Flugsuche (soon)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Personalisierte Live-Benachrichtigungen (soon)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Business- und Meilendeals auf Langstrecke</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Direktbuchung Deals (soon)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Zugang zur exklusiven SnapFare Community</span>
                </li>
              </ul>
              
              <form onSubmit={handleUpgrade} className="space-y-4">
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Button 
                  type="submit"
                  disabled={isSubmitting || !email}
                  variant="twint"
                  className="w-full h-14 py-4 transition-all duration-300 hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-3 text-base"
                >
                  <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                    <path d="M20 2L35 11V29L20 38L5 29V11L20 2Z" fill="currentColor"/>
                    <path d="M20 8L29 13V27L20 32L11 27V13L20 8Z" fill="#FF0090"/>
                    <circle cx="20" cy="20" r="4" fill="currentColor"/>
                  </svg>
                  {isSubmitting ? "In Verarbeitung..." : "Mit TWINT bezahlen"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <a href="/" className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">SnapFare</a>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center">
              <div className="flex gap-6 text-sm">
                <a href="/impressum" className="text-gray-400 hover:text-white transition-colors">
                  Impressum
                </a>
                <a href="/datenschutz" className="text-gray-400 hover:text-white transition-colors">
                  Datenschutzerklärung
                </a>
              </div>
              
              <p className="text-gray-400 text-xs sm:text-sm">
                © 2025 SnapFare. Alle Rechte vorbehalten.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Premium;
