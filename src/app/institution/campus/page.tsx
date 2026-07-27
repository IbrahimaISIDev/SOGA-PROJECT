import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/home/ScrollReveal";
import { StratigraphicSeparator } from "@/components/signature/StratigraphicColumn";
import { institution } from "@/data/institution";

export const metadata: Metadata = {
  title: "Campus — SOGA",
  description: institution.campus.description,
};

export default function CampusPage() {
  const { campus } = institution;

  return (
    <>
      <Header />
      <main id="main-content">
        {/* Hero plein-bleed */}
        <div className="relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
          <div className="absolute inset-0 placeholder-block" aria-hidden="true" />
          {/* Gradient overlay: transparent → dark bottom */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(11,12,14,0.1) 0%, rgba(11,12,14,0.85) 100%)",
            }}
            aria-hidden="true"
          />
          {/* Title bottom-left */}
          <div className="absolute bottom-0 left-0 right-0 container-soga pb-10">
            <nav aria-label="Fil d'Ariane" className="mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-eyebrow text-white/40">
                <li>
                  <Link href="/" className="hover:text-white/60 transition-colors">
                    Accueil
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/institution" className="hover:text-white/60 transition-colors">
                    Institution
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-soga-gold">
                  Campus
                </li>
              </ol>
            </nav>
            <p className="text-eyebrow text-soga-gold mb-3">INSTITUTION</p>
            <h1 className="text-h1 text-white">Notre Campus</h1>
          </div>
        </div>

        {/* Description */}
        <section className="section-gap bg-soga-ink">
          <div className="container-soga max-w-3xl">
            <ScrollReveal>
              <p className="text-lead text-white/80 leading-relaxed">{campus.description}</p>
            </ScrollReveal>
          </div>
        </section>

        <StratigraphicSeparator />

        {/* Infrastructure cards */}
        <section aria-labelledby="infra-title" className="section-gap bg-soga-ink">
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-gold mb-6">INFRASTRUCTURES</p>
            </ScrollReveal>
            <ScrollReveal delay={60}>
              <h2 id="infra-title" className="text-h2 text-white mb-12">
                Nos équipements
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {campus.infrastructures.map((infra, i) => (
                <ScrollReveal key={infra.titre} delay={i * 70}>
                  <article
                    className="relative border overflow-hidden"
                    style={{ borderColor: "rgba(255,255,255,0.1)" }}
                    aria-label={infra.titre}
                  >
                    {/* Photo / placeholder */}
                    <div
                      className="aspect-[16/9] placeholder-block"
                      aria-hidden="true"
                    />

                    {/* Content */}
                    <div
                      className="p-6"
                      style={{ backgroundColor: "#16181C" }}
                    >
                      {infra.enPlanification && (
                        <span
                          className="text-eyebrow text-[10px] px-2.5 py-1 mb-3 inline-block font-semibold"
                          style={{
                            backgroundColor: "rgba(201,150,44,0.12)",
                            color: "#C9962C",
                            border: "1px solid rgba(201,150,44,0.2)",
                          }}
                        >
                          EN PLANIFICATION
                        </span>
                      )}
                      <h3 className="text-white font-semibold text-[17px] mb-2 leading-snug">
                        {infra.titre}
                      </h3>
                      <p className="text-small text-white/50 leading-relaxed">{infra.detail}</p>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery placeholder */}
        <section aria-labelledby="gallery-title" className="section-gap bg-soga-ink">
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-gold mb-6">GALERIE</p>
            </ScrollReveal>
            <ScrollReveal delay={60}>
              <h2 id="gallery-title" className="text-h2 text-white mb-8">
                Visite virtuelle
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div
                className="aspect-[21/9] placeholder-block-light flex items-center justify-center"
                aria-label="Galerie photos à venir"
              >
                <p className="text-eyebrow text-soga-graphite">Galerie photos à venir</p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
