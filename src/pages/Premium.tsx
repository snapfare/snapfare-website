import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const Premium = () => {
  const handleTwintPayment = () => {
    // Hier würde der TWINT Business Zahlungslink aufgerufen werden
    window.open("https://pay.payrexx.com/YOUR_TWINT_LINK", "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-text-gradient bg-clip-text text-transparent">
                SnapFare Premium
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Unlock die vollständige Power von SnapFare und verpasse nie wieder einen Deal
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-foreground">Free</h3>
                <div className="text-4xl font-bold text-foreground mb-2">CHF 0</div>
                <p className="text-muted-foreground">Pro Monat</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Wöchentlicher Newsletter mit Top-Deals</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Grundlegende Deal-Alerts</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Community-Zugang</span>
                </li>
              </ul>
              
              <Button variant="secondary" className="w-full" disabled>
                Aktueller Plan
              </Button>
            </div>

            {/* Premium Plan */}
            <div className="bg-card border-2 border-primary rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  Beliebt
                </div>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-foreground">Premium</h3>
                <div className="text-4xl font-bold bg-text-gradient bg-clip-text text-transparent mb-2">CHF 29</div>
                <p className="text-muted-foreground">Pro Monat</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Alles aus Free</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Echtzeit-Deal-Radar</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Preference-Match-Engine</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Smart-Alert System</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">1-Tap-Buchung</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Price-Guard Monitor</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Post-Trip-Assistent</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary" />
                  <span className="text-foreground">Prioritäts-Support</span>
                </li>
              </ul>
              
              <Button 
                onClick={handleTwintPayment}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 shadow-glow transition-all duration-300 hover:shadow-lg"
              >
                Jetzt mit TWINT bezahlen
              </Button>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="bg-card border border-border rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Warum SnapFare Premium?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Mit Premium sparst du nicht nur Zeit bei der Dealsuche, sondern auch Hunderte von Franken pro Jahr durch unsere intelligente Automatisierung. Die Investition von CHF 29 pro Monat zahlt sich bereits beim ersten gefundenen Deal aus.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Premium;