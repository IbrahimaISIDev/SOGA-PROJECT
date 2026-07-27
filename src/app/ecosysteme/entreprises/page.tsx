import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import ScrollReveal from "@/components/home/ScrollReveal";
import { StratigraphicSeparator } from "@/components/signature/StratigraphicColumn";

export const metadata: Metadata = {
  title: "Entreprises & recrutement — SOGA",
  description:
    "Déposez une offre de stage ou d'emploi, ou recrutez directement les diplômés de la Senegal Oil and Gas Academy.",
};

export default function EntreprisesPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHeader
          eyebrow="Écosystème"
          title="Entreprises & recrutement"
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Écosystème", href: "/ecosysteme" },
            { label: "Entreprises & recrutement" },
          ]}
        />

        {/* 2 cards */}
        <section
          aria-labelledby="entreprises-title"
          className="section-gap bg-soga-sand"
        >
          <div className="container-soga">
            <ScrollReveal>
              <h2 id="entreprises-title" className="sr-only">
                Services recruteurs
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
              {/* Déposer une offre */}
              <ScrollReveal delay={0}>
                <article className="bg-white border border-soga-line rounded-md p-8 flex flex-col gap-5">
                  <div>
                    <p className="text-eyebrow text-soga-muted mb-3">STAGES & EMPLOIS</p>
                    <h3 className="font-display font-semibold text-[22px] text-soga-ink mb-3 leading-snug">
                      Déposer une offre
                    </h3>
                    <p className="text-body text-soga-muted leading-relaxed">
                      Publiez une offre de stage ou d&apos;emploi visible par l&apos;ensemble
                      de nos étudiants et diplômés. Notre service carrières diffuse les
                      opportunités pertinentes selon le profil et la filière.
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="self-start inline-flex items-center gap-2 px-6 py-3 text-[14px] font-semibold text-white hover:opacity-80 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 min-h-[44px]"
                    style={{ backgroundColor: "#0D2B3E" }}
                  >
                    Publier une offre
                  </Link>
                </article>
              </ScrollReveal>

              {/* Recruter nos diplômés */}
              <ScrollReveal delay={80}>
                <article className="bg-white border border-soga-line rounded-md p-8 flex flex-col gap-5">
                  <div>
                    <p className="text-eyebrow text-soga-muted mb-3">DIPLÔMÉS</p>
                    <h3 className="font-display font-semibold text-[22px] text-soga-ink mb-3 leading-snug">
                      Recruter nos diplômés
                    </h3>
                    <p className="text-body text-soga-muted leading-relaxed">
                      Accédez directement aux profils de nos diplômés du DTS au Master Pro.
                      Le service carrières organise des rencontres employeurs sur le campus
                      et vous accompagne dans vos recherches de profils.
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="self-start inline-flex items-center gap-2 px-6 py-3 text-[14px] font-semibold text-soga-ink border border-soga-ink hover:bg-soga-ink/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 min-h-[44px]"
                  >
                    Contacter le service carrières
                  </Link>
                </article>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <StratigraphicSeparator className="mx-16 md:mx-24" />

        {/* Taux d'insertion */}
        <section aria-labelledby="stats-title" className="section-gap bg-soga-sand">
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-muted mb-4">EN CHIFFRES</p>
              <h2 id="stats-title" className="text-h2 text-soga-ink mb-10">
                Nos diplômés sur le marché
              </h2>
            </ScrollReveal>
            <div className="flex flex-wrap gap-12">
              {[
                { val: "95%", lib: "Taux d'insertion" },
                { val: "< 3 mois", lib: "Délai moyen d'embauche" },
                { val: "40+", lib: "Entreprises partenaires" },
              ].map((s, i) => (
                <ScrollReveal key={s.lib} delay={i * 70}>
                  <div>
                    <p
                      className="font-display font-semibold leading-none mb-2"
                      style={{ fontSize: "clamp(32px,5vw,48px)", color: "#C9962C" }}
                    >
                      {s.val}
                    </p>
                    <p className="text-small text-soga-muted">{s.lib}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
