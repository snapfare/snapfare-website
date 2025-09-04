import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Impressum = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
              <h1 className="text-4xl font-bold mb-4 bg-text-gradient bg-clip-text text-transparent">
                Impressum
              </h1>
              <p className="text-muted-foreground text-sm mb-8">
                Dieses Impressum erfüllt die Anforderungen der Anbieterkennzeichnung im elektronischen Geschäftsverkehr in der Schweiz (UWG).*
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Verantwortlich</h2>
                <div className="text-foreground leading-relaxed">
                  <p className="font-semibold">SnapFare / Basics-DB (Einzelfirma)</p>
                  <p>Dominic Bachmann</p>
                  <p>Musterstrasse 12</p>
                  <p>8000 Zürich</p>
                  <p>Schweiz</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Kontakt</h2>
                <p className="text-foreground">
                  E-Mail: <a href="mailto:contact@snapfare.ch" className="text-primary hover:text-primary/80 transition-colors">contact@snapfare.ch</a>
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Unternehmensangaben</h2>
                <div className="text-foreground">
                  <p>Handelsregistereintrag: [Nummer/Amtsstelle einsetzen]</p>
                  <p>UID: CHE-[einsetzen]</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Haftung & Inhalte</h2>
                <p className="text-foreground leading-relaxed">
                  Alle Inhalte wurden mit grösstmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität übernehmen wir keine Gewähr. Verlinkte Inhalte Dritter liegen ausserhalb unseres Verantwortungsbereichs.
                </p>
              </section>

              <p className="text-muted-foreground text-sm">
                * Hinweise zur Impressumspflicht in der Schweiz finden sich u. a. bei aktivMind/onlaw; für E-Commerce-Angebote sind klare Identitäts- und Kontaktangaben erforderlich (UWG Art. 3).
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Impressum;