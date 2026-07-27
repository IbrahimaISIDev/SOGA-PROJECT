import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import ScrollReveal from "@/components/home/ScrollReveal";
import { StratigraphicSeparator } from "@/components/signature/StratigraphicColumn";

export const metadata: Metadata = {
  title: "Admissions — SOGA",
  description:
    "Processus et conditions d'admission à la Senegal Oil and Gas Academy. Quatre étapes, du dépôt de dossier à l'intégration.",
};

const PROCESSUS = [
  {
    num: "01",
    titre: "Dépôt de candidature",
    desc: "En ligne, via l'assistant de candidature. Dossier complet requis.",
  },
  {
    num: "02",
    titre: "Étude du dossier",
    desc: "Vérification des pièces et du parcours scolaire sous 10 jours ouvrés.",
  },
  {
    num: "03",
    titre: "Entretien",
    desc: "Sur convocation, en présentiel ou à distance pour les filières supérieures.",
  },
  {
    num: "04",
    titre: "Admission & inscription",
    desc: "Confirmation par e-mail et règlement des frais d'inscription.",
  },
];

const CONDITIONS = [
  {
    niveau: "DTS / BTS",
    pre: "Baccalauréat toutes séries, dossier scolaire.",
  },
  {
    niveau: "Licence Pro",
    pre: "DTS / BTS validé ou équivalent reconnu.",
  },
  {
    niveau: "Master Pro",
    pre: "Licence validée, entretien de motivation.",
  },
];

export default function AdmissionsPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHeader
          eyebrow="ADMISSIONS"
          title="Processus & conditions d'admission"
          subtitle="Quatre étapes, du dépôt de dossier à l'intégration."
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Admissions" },
          ]}
        />

        {/* Processus — 4 steps */}
        <section aria-labelledby="processus-title" className="section-gap bg-soga-sand">
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-muted mb-6">PROCESSUS</p>
            </ScrollReveal>
            <ScrollReveal delay={60}>
              <h2 id="processus-title" className="text-h2 text-soga-ink mb-12">
                Comment candidater ?
              </h2>
            </ScrollReveal>
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROCESSUS.map((step, i) => (
                <ScrollReveal key={step.num} delay={i * 70}>
                  <li className="border-t-2 border-soga-gold pt-4">
                    <p className="text-eyebrow text-soga-gold-deep mb-3">{step.num}</p>
                    <h3 className="font-display font-semibold text-[18px] text-soga-ink mb-2 leading-snug">
                      {step.titre}
                    </h3>
                    <p className="text-small text-soga-muted leading-relaxed">{step.desc}</p>
                  </li>
                </ScrollReveal>
              ))}
            </ol>
          </div>
        </section>

        <StratigraphicSeparator className="mx-16 md:mx-24" />

        {/* Conditions */}
        <section
          aria-labelledby="conditions-title"
          className="section-gap"
          style={{ backgroundColor: "#F0EDE3" }}
        >
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-gold-deep mb-6">CONDITIONS D&apos;ADMISSION</p>
            </ScrollReveal>
            <ScrollReveal delay={60}>
              <h2 id="conditions-title" className="text-h2 text-soga-ink mb-10">
                Prérequis par niveau
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {CONDITIONS.map((c, i) => (
                <ScrollReveal key={c.niveau} delay={i * 70}>
                  <article className="bg-white border border-soga-line rounded-md p-5">
                    <h3 className="font-display font-semibold text-[16px] text-soga-ink mb-2">
                      {c.niveau}
                    </h3>
                    <p className="text-small text-soga-graphite leading-relaxed">{c.pre}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-gap bg-soga-ink">
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-gold mb-4">CANDIDATURE</p>
              <h2 className="text-h2 text-white mb-6">Prêt à rejoindre SOGA ?</h2>
              <p className="text-lead text-white/70 mb-10 max-w-xl">
                Déposez votre dossier en ligne en moins de 15 minutes. Votre
                progression est sauvegardée automatiquement.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/admissions/candidature"
                  className="inline-flex items-center gap-2 px-7 py-4 text-[15px] font-semibold text-soga-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soga-gold min-h-[44px] transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#C9962C" }}
                >
                  Déposer ma candidature
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center text-[15px] font-semibold text-soga-gold-light border-b border-soga-gold-deep pb-0.5 hover:text-soga-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 min-h-[44px]"
                >
                  Poser une question →
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Frais & Bourses */}
        <section aria-labelledby="frais-title" className="section-gap bg-soga-sand">
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-muted mb-4">FRAIS & BOURSES</p>
              <h2 id="frais-title" className="text-h2 text-soga-ink mb-6">
                Financer sa formation.
              </h2>
              <p className="text-lead text-soga-graphite max-w-xl mb-8">
                Des dispositifs d&apos;aides financières sont disponibles pour les
                candidats méritants. Contactez-nous pour connaître les conditions
                d&apos;attribution.
              </p>
              <div
                className="inline-block border border-soga-line rounded-md p-5"
                style={{ backgroundColor: "rgba(201,150,44,0.05)" }}
              >
                <p className="text-small text-soga-muted">
                  Contenu provisoire — les montants exacts seront communiqués dès
                  validation par la direction.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
