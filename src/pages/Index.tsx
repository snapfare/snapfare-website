import { useState, useEffect } from 'react';
import { Plane, Clock, Target, Bell, CreditCard, Shield, User, ArrowRight, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

type Deal = {
  id: string;
  from: string;
  to: string;
  airline: string;
  aircraft: string;
  travelClass: string;
  baggage: string;
  dates: string;
  price: string;     // z.B. "CHF 430"
  image: string;
};

const Index = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userLocation, setUserLocation] = useState<string>('');

  // Modal state + ausgewählter Deal
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  // >>> HIER deine Deals – alles, was du änderst, spiegelt sich automatisch im Pop-up wider
  const deals: Deal[] = [
    {
      id: "SYD",
      from: "Zürich",
      to: "Sydney",
      airline: "Turkish Airlines",
      aircraft: "Airbus A350",
      travelClass: "Economy",
      baggage: "23 kg",
      dates: "Winter 2025/26",
      price: "CHF 850",
      image:
        "https://media.istockphoto.com/id/892808186/photo/sydney.jpg?b=1&s=170667a&w=0&k=20&c=ReC5-ifFV2q2Wvui520DjptF9RVMfoMjum7xObtS62w=",
    },
    {
      id: "SHJ",
      from: "Zürich",
      to: "Dubai",
      airline: "Turkish Airlines",
      aircraft: "Boeing B737",
      travelClass: "Economy",
      baggage: "8 kg",
      dates: "November – Dezember 2025",
      price: "CHF 220",
      image:
        "https://images.unsplash.com/photo-1542544499-bce9dc3bb4e8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9",
    },
    {
      id: "PUJ",
      from: "Zürich",
      to: "Punta Cana",
      airline: "Condor",
      aircraft: "Airbus A330neo",
      travelClass: "Economy",
      baggage: "8 kg",
      dates: "November – Juni 2026",
      price: "CHF 600",
      image:
        "https://media.istockphoto.com/id/1315005752/photo/paradise-tropical-island-nature-background-top-aerial-drone-view-of-beautiful-beach-with.jpg?b=1&s=170667a&w=0&k=20&c=T6OsJaP3n2vaXld7xbgIconb6RKQouF96zsMmIt5r-M=",
    },
  ];

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setUserLocation(`${data.city}, ${data.country_name}`);
      } catch (error) {
        console.log('Could not get location:', error);
        setUserLocation('Unknown');
      }
    };

    getUserLocation();
  }, []);

  const openDealModal = (deal: Deal) => {
    setSelectedDeal(deal);
    setIsDealModalOpen(true);
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);

    try {
      const dealLabel =
        selectedDeal
          ? `${selectedDeal.from} → ${selectedDeal.to} (${selectedDeal.airline}) – ${selectedDeal.price}`
          : null;

      const { error } = await supabase
        .from('waitlist')
        .insert([
          {
            email: email.trim().toLowerCase(),
            location: userLocation,
            // source_deal: dealLabel, // <-- Optional: Spalte vorher mit ALTER TABLE anlegen
          }
        ]);

      if (error) {
        console.error('Waitlist error:', error);
        throw error;
      }

      try {
        await supabase.functions.invoke('send-confirmation-email', {
          body: {
            email: email.trim().toLowerCase(),
            location: userLocation,
            // source_deal: dealLabel, // <-- Optional
          }
        });
      } catch (emailError) {
        console.error('Email sending error (non-blocking):', emailError);
      }

      toast({
        title: 'Erfolgreich angemeldet! 🎉',
        description: 'Du hast es geschafft - wir werden dir bald weitere Informationen zukommen lassen.'
      });

      setEmail('');
      setIsDealModalOpen(false);
    } catch (error) {
      console.error('Error joining waitlist:', error);
      toast({
        title: 'Fehler beim Anmelden',
        description: 'Bitte versuche es noch einmal. Falls das Problem bestehen bleibt, kontaktiere uns.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Echtzeit-Deal-Radar',
      description: 'Scannt minütlich das Internet nach Flugdeals und benachrichtigt dich sofort.'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Preference-Match-Engine',
      description: 'Gleicht automatisch Heimatflughafen, Budget, Reisefenster und Wetter mit jedem Deal ab.'
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: 'Smart-Alert System',
      description: 'Eine einzige Push-Nachricht statt Spam-Flut – nur bei perfekten Matches.'
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: '1-Tap-Buchung',
      description: 'SnapFare füllt alle Formulare aus, reserviert den Sitzplatz und zahlt automatisch.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Price-Guard Monitor',
      description: 'Überwacht Tarife nach der Buchung und fordert automatisch Erstattungen bei Preisstürzen an.'
    },
    {
      icon: <User className="w-8 h-8" />,
      title: 'Post-Trip-Assistent',
      description: 'Erledigt Umbuchungen, Visa-Checks und Check-in-Links – vollautomatisch und stressfrei.'
    }
  ];

  return (
    <div className="bg-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-0">
          {/* Premium Button */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8">
            <a
              href="/premium"
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300"
            >
              Premium
            </a>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4 sm:mb-6 lg:mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                SnapFare
              </h1>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
              Deine <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">vollautomatisierte</span>
              <br />
              Schnäppchenjagd
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
              SnapFare scannt minütlich das Netz und liefert dir sofort jeden Flugdeal aufs Handy. Vollautomatisch, ohne Stress, ohne Preisprünge.
            </p>

            {/* Waitlist Form (Top) */}
            <form onSubmit={handleWaitlistSubmit} className="max-w-md mx-auto mb-8 sm:mb-12 px-4">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Input
                  type="email"
                  placeholder="Deine E-Mail-Adresse"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 text-base"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 h-12 px-6 sm:px-8 text-sm sm:text-base whitespace-nowrap"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      Jetzt anmelden! <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 mt-3">Kostenlos anmelden! Kein Spam, versprochen!</p>
            </form>

            {/* Flight Deals Section */}
            <div className="max-w-5xl mx-auto px-4">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
                Melde dich jetzt an, um alle <span className="text-green-400">Flugdeals</span> der letzten Woche via Email zu erhalten!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10 md:mb-14 lg:mb-16">
                {deals.map((deal) => (
                  <div
                    key={deal.id}
                    onClick={() => openDealModal(deal)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Deal öffnen: ${deal.from} nach ${deal.to}`}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openDealModal(deal)}
                    className="bg-white/10 border border-white/20 rounded-lg p-0 flex flex-col hover:bg-white/15 transition-all duration-300 overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <div className="relative h-40 sm:h-44 w-full">
                      <img src={deal.image} className="object-cover w-full h-full" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-center gap-3 mb-4">
                          <span className="text-xl font-bold text-white">{deal.from}</span>
                          <ArrowRight className="h-6 w-6 text-green-400" />
                          <span className="text-xl font-bold text-white">{deal.to}</span>
                        </div>

                        <div className="text-center mb-4">
                          <div className="text-xm font-semibold text-white">{deal.airline}</div>
                          <div className="text-xm text-gray-300">✈️Flugzeug: {deal.aircraft}</div>
                          <div className="text-xm text-gray-300">💳Reiseklasse: {deal.travelClass}</div>
                          <div className="text-xm text-gray-300">🧳Gepäck: {deal.baggage}</div>
                        </div>

                        <div className="text-center mb-3">
                          <div className="text-xm font-semibold text-white">Mögliche Reisedaten:</div>
                          <div className="text-sm text-white">{deal.dates}</div>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-xs text-gray-400 mb-1">Preis pro Person</div>
                        <div className="text-3xl font-bold text-green-400">{deal.price}</div>
                        <div className="text-xs text-gray-400">inkl. Steuern & Gebühren</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Deal Modal (Popup) */}
              <Dialog open={isDealModalOpen} onOpenChange={setIsDealModalOpen}>
                <DialogContent className="bg-slate-900 text-white border border-white/20">
                  <DialogHeader>
                    <DialogTitle>Hol dir den Link zu folgendem Flugdeal:</DialogTitle>
                    <DialogDescription className="text-gray-300">
                      {selectedDeal && (
                        <span className="block mt-1">
                          {selectedDeal.from} → {selectedDeal.to} ({selectedDeal.airline}) – {selectedDeal.price}
                        </span>
                      )}
                    </DialogDescription>
                  </DialogHeader>

                  <p className="text-gray-300">
                    Melde dich kurz an – wir schicken dir den Direktlink zum Deal sowie weitere Deals alle zwei Wochen.
                  </p>

                  <form onSubmit={handleWaitlistSubmit} className="mt-4 flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      placeholder="Deine E-Mail-Adresse"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 text-base"
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 h-12 px-6 sm:px-8"
                    >
                      {isSubmitting ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      ) : (
                        <>Link zusenden</>
                      )}
                    </Button>
                  </form>

                  <DialogFooter>
                    <p className="text-xs text-gray-400">Kein Spam. Abmeldung jederzeit möglich.</p>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Features Section */}
            <div className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-800 to-slate-900 relative left-1/2 right-1/2 -mx-[50vw] w-screen">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-4">
                    So funktioniert die{' '}
                    <p>
                      <span className="text-green-400">bevorstehende Automatisierung</span>
                    </p>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {features.map((feature, index) => (
                    <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group">
                      <CardContent className="p-6 sm:p-8">
                        <div className="text-green-400 mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                          {feature.icon}
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">{feature.title}</h3>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{feature.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Process Section */}
            <div className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative left-1/2 right-1/2 -mx-[50vw] w-screen">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-4">
                    Von Deal zu Boarding Pass in <span className="text-blue-400">3 Minuten</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <span className="text-white font-bold text-lg sm:text-xl">1</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Deal erkannt</h3>
                    <p className="text-sm sm:text-base text-gray-300">SnapFare findet einen perfekten Match für deine Präferenzen</p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <span className="text-white font-bold text-lg sm:text-xl">2</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Smart-Alert</h3>
                    <p className="text-sm sm:text-base text-gray-300">Du erhältst eine Push-Nachricht mit allen benötigten Details</p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <span className="text-white font-bold text-lg sm:text-xl">3</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">1-Tap-Buchung</h3>
                    <p className="text-sm sm:text-base text-gray-300">SnapFare bucht automatisch, du zahlst mit Zahlungsmittel deiner Wahl</p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <span className="text-white font-bold text-lg sm:text-xl">4</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Automatik läuft</h3>
                    <p className="text-sm sm:text-base text-gray-300">Price-Guard und Post-Trip-Assistent übernehmen den Rest</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-green-500/10 to-blue-500/10 relative left-1/2 right-1/2 -mx-[50vw] w-screen">
              <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">Bereit für stressfreie Schnäppchen?</h2>
                <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-10">Melde dich jetzt an und sei einer der ersten, die SnapFare nutzen können.</p>

                <form onSubmit={handleWaitlistSubmit} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Input
                      type="email"
                      placeholder="Deine E-Mail-Adresse"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 text-base"
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 h-12 px-6 sm:px-8 text-sm sm:text-base whitespace-nowrap"
                    >
                      {isSubmitting ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      ) : (
                        <>
                          Anmelden! <Plane className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Footer */}
            <footer className="bg-slate-900 py-8 sm:py-12 relative left-1/2 right-1/2 -mx-[50vw] w-screen">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-3 mb-4 md:mb-0">
                    <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                      SnapFare
                    </span>
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

                    <p className="text-gray-400 text-xs sm:text-sm">© 2025 SnapFare. Alle Rechte vorbehalten.</p>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>

      {/* Floating "Found a bug?" CTA */}
      <a
        href="mailto:contact@basics-db.ch?subject=Found%20a%20bug%3F%20Get%20hired%21"
        aria-label="Found a bug? Get hired! Email us"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full group"
        rel="noopener noreferrer"
      >
        <div className="flex items-center gap-2 rounded-full px-4 py-2 bg-white/10 border border-white/20 backdrop-blur shadow-lg hover:bg-white/15 hover:border-white/30 transition-all">
          <Bug className="h-4 w-4 text-green-400 group-hover:rotate-12 transition-transform" />
          <span className="text-xs sm:text-sm text-white leading-tight">
            <span className="font-semibold">Found a bug?</span>{' '}
            <span className="text-gray-300">Get hired!</span>
          </span>
        </div>
      </a>
    </div>
  );
};

export default Index;
