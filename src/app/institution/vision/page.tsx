import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import ScrollReveal from "@/components/home/ScrollReveal";
import { StratigraphicSeparator } from "@/components/signature/StratigraphicColumn";
import { institution } from "@/data/institution";

export const metadata: Metadata = {
  title: "Vision & Mission — SOGA",
  description: institution.vision,
};

export default function VisionMissionPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHeader
          eyebrow="Institution"
          title="Vision & Mission"
          subtitle="Les principes fondateurs qui guident l'action de SOGA."
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Institution", href: "/institution" },
            { label: "Vision & Mission" },
          ]}
        />

        {/* Vision */}
        <section
          aria-labelledby="vision-title"
          className="section-gap"
          style={{ backgroundColor: "#0D2B3E" }}
        >
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-gold mb-6">NOTRE VISION</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2
                id="vision-title"
                className="font-display text-[clamp(22px,3.5vw,40px)] leading-[1.2] font-semibold text-white max-w-3xl"
              >
                {institution.vision}
              </h2>
            </ScrollReveal>
          </div>
        </section>

        <StratigraphicSeparator />

        {/* Mission */}
        <section aria-labelledby="mission-title" className="section-gap bg-soga-ink">
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-gold mb-6">NOTRE MISSION</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 id="mission-title" className="text-h2 text-white mb-12">
                Ce que nous faisons — et pourquoi
              </h2>
            </ScrollReveal>

            <ol className="space-y-6 max-w-2xl">
              {institution.mission.map((item, i) => (
                <ScrollReveal key={i} delay={i * 60}>
                  <li className="flex gap-5 items-start">
                    <span
                      className="font-mono text-[11px] font-semibold shrink-0 mt-1 w-6 text-center"
                      style={{ color: "#C9962C" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-body text-white/80 leading-relaxed">{item}</p>
                  </li>
                </ScrollReveal>
              ))}
            </ol>
          </div>
        </section>

        <StratigraphicSeparator />

        {/* Valeurs */}
        <section
          aria-labelledby="valeurs-title"
          className="section-gap"
          style={{ backgroundColor: "#F0EDE3" }}
        >
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-gold-deep mb-6">NOS VALEURS</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 id="valeurs-title" className="text-h2 text-soga-ink mb-12">
                Les valeurs qui nous définissent
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {institution.valeurs.map((valeur, i) => (
                <ScrollReveal key={valeur.titre} delay={i * 70}>
                  <article
                    className="border border-soga-ink/20 bg-white p-6 h-full"
                    aria-label={valeur.titre}
                  >
                    <h3 className="text-h3 text-soga-ink mb-1">{valeur.titre}</h3>
                    <p className="text-eyebrow text-soga-gold-deep mb-4 text-[11px]">
                      {valeur.sousTitre.toUpperCase()}
                    </p>
                    <p className="text-small text-soga-graphite leading-relaxed">
                      {valeur.description}
                    </p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-gap bg-soga-ink">
          <div className="container-soga flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <p className="text-lead text-white">
              Découvrir l&apos;équipe qui porte cette vision
            </p>
            <Link
              href="/institution/equipe"
              className="inline-flex items-center gap-2 px-6 py-3 text-[15px] font-semibold text-soga-gold-light border border-soga-gold hover:bg-soga-graphite transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soga-gold min-h-[44px]"
            >
              Notre équipe →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
