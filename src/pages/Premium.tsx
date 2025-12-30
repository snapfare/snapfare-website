import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import twintButton from "@/assets/twint-button.svg";

const TWINT_LINK =
  "https://go.twint.ch/1/e/tw?tw=acq.gLWaSc6qS9WXTyve02qU3TYzXh6aJj-WV-OoE_J4WpK9fVqgx8XwDgLVcKKthvDk.&amount=49.00&trxInfo=BLACKFRIDAY_PREMIUM_1Y";

const Premium = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleUpgrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!isEmail) {
        toast?.({
          title: "Ungültige E-Mail",
          description: "Bitte gib eine gültige E-Mail-Adresse ein.",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch(
        "https://wwoowwnjrepokmjgxhlw.functions.supabase.co/create-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        window.location.href = TWINT_LINK;
        return;
      }

      const data = await response.json();

      if (data?.payUrl && typeof data.payUrl === "string") {
        window.location.href = data.payUrl;
        return;
      }

      window.location.href = TWINT_LINK;
    } catch (error) {
      window.location.href = TWINT_LINK;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <main className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-white">Free</h3>
                <div className="text-4xl font-bold text-white mb-2">
                  CHF 0
                </div>
                <p className="text-gray-300">Pro Jahr</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">
                    Newsletter mit den besten Reisedeals
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">
                    Exklusive Meilendeals
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">
                    Kostenloser Zugang zur personalisierten Flugsuche (soon)
                  </span>
                </li>
              </ul>

              <Button
                variant="secondary"
                className="w-full bg-white/10 text-gray-300 border-white/20"
                disabled
              >
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
                <div className="flex justify-center mb-2">
                  <span className="bg-green-400 text-black text-xs font-semibold px-3 py-1 rounded-full">
                    Neujahr 2026
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-2 text-white">
                  Premium
                </h3>

                <div className="flex flex-col justify-center items-center mb-2">
                  <span className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                    CHF 49
                  </span>
                  <p className="text-gray-300 text-sm">Pro Jahr</p>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">
                    Newsletter mit den besten Reisedeals
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">
                    Exklusive Meilendeals
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">
                    Kostenloser Zugang zur personalisierten Flugsuche (soon)
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">
                    Personalisierte Live-Benachrichtigungen (soon)
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">
                    Business- und Meilendeals auf Langstrecke
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">
                    Direktbuchung Deals (soon)
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">
                    Zugang zur exklusiven SnapFare Community
                  </span>
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
                <button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="w-full h-[58px] flex justify-center items-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:opacity-90"
                  style={{ background: "transparent", border: "none" }}
                >
                  <img
                    src={twintButton}
                    alt="Mit TWINT bezahlen"
                    className="w-auto h-[58px]"
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Premium;
