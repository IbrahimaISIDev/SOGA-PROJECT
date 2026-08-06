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
                <article className="bg-soga-surface border border-soga-line rounded-md p-8 flex flex-col gap-5">
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
                <article className="bg-soga-surface border border-soga-line rounded-md p-8 flex flex-col gap-5">
                  <div>
                    <p className="text-eyebrow text-soga-muted mb-3">DIPLÔMÉS</p>
                    <h3 className="font-display font-semibold text-[22px] text-soga-ink mb-3 leading-snug">
                      Recruter nos diplômés
                    </h3>
                    <p className="text-body text-soga-muted leading-relaxed">
                      Accédez directement aux profils de nos diplômés, du Technicien Spécialisé
                      au Master. Le service carrières organise des rencontres employeurs sur le
                      campus et vous accompagne dans vos recherches de profils.
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

        {/* Pourquoi recruter nos diplômés */}
        <section aria-labelledby="pourquoi-title" className="section-gap bg-soga-sand">
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-muted mb-4">POURQUOI RECRUTER NOS DIPLÔMÉS</p>
              <h2 id="pourquoi-title" className="text-h2 text-soga-ink mb-10">
                Une pédagogie ancrée dans le terrain
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              {[
                {
                  titre: "Accréditée",
                  texte: "Formations habilitées par l'ANAQ-Sup et accréditées par l'AUF.",
                },
                {
                  titre: "Pédagogie par la pratique",
                  texte: "Bancs didactiques, simulateurs et équipements industriels réels.",
                },
                {
                  titre: "14 filières",
                  texte: "Du Technicien Spécialisé au Master, dans l'énergie, le management et l'industrie.",
                },
              ].map((s, i) => (
                <ScrollReveal key={s.titre} delay={i * 70}>
                  <div className="border-t-2 border-soga-gold pt-4">
                    <p className="font-display font-semibold text-soga-ink text-[18px] mb-2">
                      {s.titre}
                    </p>
                    <p className="text-small text-soga-muted">{s.texte}</p>
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
