import { useState, useEffect } from 'react';
import { Plane, Clock, Target, Bell, CreditCard, Shield, User, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userLocation, setUserLocation] = useState<string>('');

  useEffect(() => {
    // Try to get user's location
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

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ 
          email: email.trim().toLowerCase(),
          location: userLocation 
        }]);

      if (error) {
        console.error('Waitlist error:', error);
        throw error;
      }
      
      // Send confirmation email
      try {
        await supabase.functions.invoke('send-confirmation-email', {
          body: { 
            email: email.trim().toLowerCase(),
            location: userLocation 
          }
        });
      } catch (emailError) {
        console.error('Email sending error (non-blocking):', emailError);
        // Don't block the success flow if email fails
      }
      
      toast({
        title: "Erfolgreich angemeldet! 🎉",
        description: "Du hast es geschafft - wir werden dir bald weitere Informationen zukommen lassen.",
      });
      
      setEmail('');
    } catch (error) {
      console.error('Error joining waitlist:', error);
      toast({
        title: "Fehler beim Anmelden",
        description: "Bitte versuche es noch einmal. Falls das Problem bestehen bleibt, kontaktiere uns.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Echtzeit-Deal-Radar",
      description: "Scannt minütlich das Internet nach Flugdeals und benachrichtigt dich sofort."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Preference-Match-Engine",
      description: "Gleicht automatisch Heimatflughafen, Budget, Reisefenster und Wetter mit jedem Deal ab."
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Smart-Alert System",
      description: "Eine einzige Push-Nachricht statt Spam-Flut – nur bei perfekten Matches."
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "1-Tap-Buchung",
      description: "Agent füllt alle Formulare aus, reserviert den Sitzplatz und zahlt automatisch."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Price-Guard Monitor",
      description: "Überwacht Tarife nach der Buchung und fordert automatisch Erstattungen bei Preisstürzen an."
    },
    {
      icon: <User className="w-8 h-8" />,
      title: "Post-Trip-Assistent",
      description: "Erledigt Umbuchungen, Visa-Checks und Check-in-Links – vollautomatisch und stressfrei."
    }
  ];

  const benefits = [
    "Flugdeals direkt in deine Inbox",
    "Preisüberwachung deiner Lieblingsdeals",
    "Automatisierter Buchungsprozess ohne Stress",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 lg:pb-32">
          {/* Premium Button */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8">
            <a href="/premium" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300">
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
              Deine <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">vollautomatisierte</span><br />
              Schnäppchenjagd
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
              SnapFare scannt minütlich das Netz und liefert dir sofort jeden Flugdeal aufs Handy. Vollautomatisch, ohne Stress, ohne Preisprünge.
            </p>
            
            {/* Waitlist Form */}
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
              <p className="text-xs sm:text-sm text-gray-400 mt-3">
                Kostenlos anmelden! Kein Spam, versprochen!
              </p>
            </form>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4 text-xs sm:text-sm px-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/5 rounded-lg p-3">
                  <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300 text-left">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-4">
              So funktioniert die <span className="text-green-400">Automatisierung</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Sechs intelligente Module arbeiten rund um die Uhr für dich und den besten Deal.
            </p>
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
      <div className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-900 to-slate-800">
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
              <p className="text-sm sm:text-base text-gray-300">Du erhältst eine Push-Nachricht mit Countdown und allen Details</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-white font-bold text-lg sm:text-xl">3</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">1-Tap-Buchung</h3>
              <p className="text-sm sm:text-base text-gray-300">Agent bucht automatisch, du zahlst mit Zahlungsmittel deiner Wahl</p>
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
      <div className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Bereit für stressfreie Schnäppchen?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-10">
            Melde dich jetzt an und sei einer der ersten, die SnapFare nutzen können.
          </p>
          
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
                    Warteliste beitreten <Plane className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">SnapFare</span>
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

export default Index;
