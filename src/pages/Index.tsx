import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Zap, Target, Bell, CreditCard, Shield, Plane } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Deine <span className="bg-text-gradient bg-clip-text text-transparent">vollautomatisierte</span><br />
            Schnäppchenjagd
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            SnapFare scannt minütlich das Netz und liefert dir sofort jeden Flugdeal aufs Handy. 
            Vollautomatisch, ohne Stress, ohne Preisprünge.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto mb-8">
            <Input 
              type="email" 
              placeholder="Deine E-Mail-Adresse" 
              className="bg-card border-border text-foreground"
            />
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 whitespace-nowrap">
              Jetzt anmelden!
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Kostenlos anmelden! Kein Spam, versprochen!
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">
            Nie wieder stundenlang nach Deals suchen
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Automatische Preisüberwachung</h3>
              <p className="text-muted-foreground">3-Minuten-Routine statt Schnäppchenjagd-Stress</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Keine verpassten Gelegenheiten</h3>
              <p className="text-muted-foreground">Vollautomatische Abwicklung</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Smart Alerts</h3>
              <p className="text-muted-foreground">Nur relevante Deals, keine Spam-Flut</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">
            So funktioniert die Automatisierung
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Sechs intelligente Module arbeiten rund um die Uhr für dich und den besten Deal.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Echtzeit-Deal-Radar</h3>
              <p className="text-muted-foreground">Scannt minütlich das Internet nach Flugdeals und benachrichtigt dich sofort.</p>
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Preference-Match-Engine</h3>
              <p className="text-muted-foreground">Gleicht automatisch Heimatflughafen, Budget, Reisefenster und Wetter mit jedem Deal ab.</p>
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Smart-Alert System</h3>
              <p className="text-muted-foreground">Eine einzige Push-Nachricht statt Spam-Flut – nur bei perfekten Matches.</p>
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-3 text-foreground">1-Tap-Buchung</h3>
              <p className="text-muted-foreground">Agent füllt alle Formulare aus, reserviert den Sitzplatz und zahlt automatisch.</p>
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Price-Guard Monitor</h3>
              <p className="text-muted-foreground">Überwacht Tarife nach der Buchung und fordert automatisch Erstattungen bei Preisstürzen an.</p>
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Post-Trip-Assistent</h3>
              <p className="text-muted-foreground">Erledigt Umbuchungen, Visa-Checks und Check-in-Links – vollautomatisch und stressfrei.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">
            Von Deal zu Boarding Pass in 3 Minuten
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Deal erkannt</h3>
              <p className="text-muted-foreground text-sm">SnapFare findet einen perfekten Match für deine Präferenzen</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Smart-Alert</h3>
              <p className="text-muted-foreground text-sm">Du erhältst eine Push-Nachricht mit Countdown und allen Details</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">1-Tap-Buchung</h3>
              <p className="text-muted-foreground text-sm">Agent bucht automatisch, du zahlst mit Zahlungsmittel deiner Wahl</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Automatik läuft</h3>
              <p className="text-muted-foreground text-sm">Price-Guard und Post-Trip-Assistent übernehmen den Rest</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Bereit für stressfreie Schnäppchen?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Melde dich jetzt an und sei einer der ersten, die SnapFare nutzen können.
          </p>
          
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
            Warteliste beitreten <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
