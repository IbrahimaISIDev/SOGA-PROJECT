import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import ScrollReveal from "@/components/home/ScrollReveal";
import DevenirPartenaireForm from "@/components/ecosysteme/DevenirPartenaireForm";

export const metadata: Metadata = {
  title: "Devenir partenaire — SOGA",
  description:
    "Ministères, universités, entreprises, ONG — soumettez votre demande de partenariat avec la Senegal Oil and Gas Academy.",
};

const AVANTAGES = [
  {
    titre: "Accueil de stagiaires",
    desc: "Intégrez des étudiants SOGA dans vos équipes pour des stages opérationnels.",
  },
  {
    titre: "Interventions pédagogiques",
    desc: "Participez aux enseignements et conférences de vos experts en amphithéâtre.",
  },
  {
    titre: "Accès aux publications",
    desc: "Bénéficiez des travaux de recherche du Think Tank SOGA en avant-première.",
  },
  {
    titre: "Recrutement prioritaire",
    desc: "Accédez aux profils de nos diplômés avant leur mise sur le marché.",
  },
];

export default function DevenirPartenairePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHeader
          eyebrow="Écosystème"
          title="Devenir partenaire"
          subtitle="Ministères, universités, entreprises, ONG — construisons ensemble les compétences énergétiques de demain."
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Écosystème", href: "/ecosysteme" },
            { label: "Devenir partenaire" },
          ]}
        />

        {/* Avantages */}
        <section aria-labelledby="avantages-title" className="section-gap bg-soga-sand">
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-muted mb-4">CE QUE VOUS Y GAGNEZ</p>
            </ScrollReveal>
            <ScrollReveal delay={60}>
              <h2 id="avantages-title" className="text-h2 text-soga-ink mb-10">
                Les bénéfices du partenariat
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {AVANTAGES.map((a, i) => (
                <ScrollReveal key={a.titre} delay={i * 60}>
                  <div className="border-t-2 border-soga-gold pt-4">
                    <h3 className="font-display font-semibold text-[16px] text-soga-ink mb-2">
                      {a.titre}
                    </h3>
                    <p className="text-small text-soga-muted leading-relaxed">{a.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Formulaire */}
        <section aria-labelledby="form-title" className="section-gap bg-soga-sand">
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-muted mb-4">FORMULAIRE</p>
              <h2 id="form-title" className="text-h2 text-soga-ink mb-10">
                Soumettre une demande
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={60}>
              <DevenirPartenaireForm />
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
