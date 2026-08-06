import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import ScrollReveal from "@/components/home/ScrollReveal";
import { StratigraphicSeparator } from "@/components/signature/StratigraphicColumn";
import { partenaires, temoignages } from "@/data/ecosysteme";

export const metadata: Metadata = {
  title: "Écosystème SOGA",
  description:
    "Partenaires institutionnels, industriels, alumni et opportunités de recrutement de la Senegal Oil and Gas Academy.",
};

const SECTIONS = [
  {
    titre: "Partenariats stratégiques",
    desc: "Institutions d'accréditation académique et organismes publics d'appui à la formation.",
    href: "/ecosysteme/partenariats",
    cta: "Voir nos partenaires →",
  },
  {
    titre: "Entreprises & recrutement",
    desc: "Déposez une offre ou recrutez directement nos diplômés qualifiés.",
    href: "/ecosysteme/entreprises",
    cta: "Espace recruteurs →",
  },
  {
    titre: "Devenir partenaire",
    desc: "Construisons ensemble les compétences énergétiques de demain.",
    href: "/ecosysteme/devenir-partenaire",
    cta: "Soumettre une demande →",
  },
  {
    titre: "Espace alumni",
    desc: "Réseau des diplômés SOGA — prochainement disponible.",
    href: "/ecosysteme/alumni",
    cta: "Être informé →",
    futur: true,
  },
];

export default function EcosystemePage() {
  /* Afficher 4 partenaires en vitrine */
  const vitrine = partenaires.filter((p) => p.nom !== "Contenu provisoire").slice(0, 4);
  /* Ne garder que les témoignages réels — masqué tant qu'aucun n'a
     remplacé le texte "Contenu provisoire" fourni par un vrai récit. */
  const temoignagesReels = temoignages.filter((t) => t.auteur !== "Contenu provisoire");

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHeader
          eyebrow="ÉCOSYSTÈME"
          title="Partenaires & Alumni"
          subtitle="Un réseau d'excellence au service de l'insertion professionnelle."
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Écosystème" },
          ]}
        />

        {/* Hub cards */}
        <section aria-labelledby="hub-title" className="section-gap bg-soga-sand">
          <div className="container-soga">
            <ScrollReveal>
              <h2 id="hub-title" className="sr-only">Sections de l&apos;écosystème</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {SECTIONS.map((s, i) => (
                <ScrollReveal key={s.href} delay={i * 60}>
                  <Link
                    href={s.href}
                    className="group flex flex-col gap-4 p-6 bg-white border border-soga-line hover:border-soga-gold transition-colors h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
                  >
                    {s.futur && (
                      <span
                        className="text-eyebrow text-[10px] px-2 py-1 self-start"
                        style={{ backgroundColor: "#E2DED5", color: "#6B6B6B" }}
                      >
                        PHASE FUTURE
                      </span>
                    )}
                    <h3 className="font-display font-semibold text-[17px] text-soga-ink group-hover:text-soga-gold-deep transition-colors leading-snug">
                      {s.titre}
                    </h3>
                    <p className="text-small text-soga-muted leading-relaxed flex-1">{s.desc}</p>
                    <span className="text-small font-medium text-soga-gold-deep group-hover:text-soga-gold transition-colors">
                      {s.cta}
                    </span>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <StratigraphicSeparator className="mx-16 md:mx-24" />

        {/* Vitrine partenaires */}
        {vitrine.length > 0 && (
          <section aria-labelledby="partenaires-vitrine" className="section-gap bg-soga-sand">
            <div className="container-soga">
              <ScrollReveal>
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <p className="text-eyebrow text-soga-muted mb-2">PARTENAIRES</p>
                    <h2 id="partenaires-vitrine" className="text-h2 text-soga-ink">
                      Ils nous font confiance.
                    </h2>
                  </div>
                  <Link
                    href="/ecosysteme/partenariats"
                    className="hidden sm:inline-flex items-center text-small font-medium text-soga-gold-deep hover:text-soga-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
                  >
                    Tous les partenaires →
                  </Link>
                </div>
              </ScrollReveal>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {vitrine.map((p, i) => (
                  <ScrollReveal key={p.id} delay={i * 50}>
                    <div
                      className="border border-soga-line flex items-center justify-center p-5"
                      style={{ height: "64px", backgroundColor: "#F0EDE3" }}
                      aria-label={p.nom}
                    >
                      {p.logo ? (
                        <Image
                          src={p.logo}
                          alt={p.nom}
                          width={160}
                          height={32}
                          className="max-h-8 max-w-full w-auto h-auto object-contain"
                        />
                      ) : (
                        <p className="text-small font-medium text-soga-ink text-center leading-tight">
                          {p.nom}
                        </p>
                      )}
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {temoignagesReels.length > 0 && (
          <>
            <StratigraphicSeparator className="mx-16 md:mx-24" />

            {/* Témoignages alumni */}
            <section aria-labelledby="temoignages-title" className="section-gap bg-soga-black">
              <div className="container-soga">
                <ScrollReveal>
                  <p className="text-eyebrow text-soga-gold mb-4">ALUMNI</p>
                  <h2 id="temoignages-title" className="text-h2 text-white mb-10">
                    Ils ont étudié à SOGA.
                  </h2>
                </ScrollReveal>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {temoignagesReels.map((t, i) => (
                    <ScrollReveal key={t.id} delay={i * 80}>
                      <figure
                        className="border p-6"
                        style={{ backgroundColor: "#16181C", borderColor: "#2a2d33" }}
                      >
                        <blockquote>
                          <p className="text-lead text-white/75 italic leading-relaxed">
                            &ldquo;{t.texte}&rdquo;
                          </p>
                        </blockquote>
                        <figcaption className="mt-6 flex items-center gap-4">
                          <div
                            className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 placeholder-block"
                            aria-hidden="true"
                          >
                            {t.photo && (
                              <Image src={t.photo} alt={t.auteur} fill sizes="40px" className="object-cover" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-white text-small">{t.auteur}</p>
                            <p className="text-eyebrow text-white/40 text-[10px]">
                              {t.titre} · {t.promotion}
                            </p>
                          </div>
                        </figcaption>
                      </figure>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* CTA devenir partenaire */}
        <section
          aria-labelledby="partenariat-cta-title"
          className="section-gap text-center"
          style={{ backgroundColor: "#0D2B3E" }}
        >
          <div className="container-soga max-w-2xl mx-auto">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-gold mb-4">REJOIGNEZ L&apos;ÉCOSYSTÈME</p>
              <h2 id="partenariat-cta-title" className="text-h2 text-white mb-6">
                Devenir partenaire de SOGA.
              </h2>
              <p className="text-lead text-white/70 mb-8">
                Accueillez des stagiaires, participez aux programmes pédagogiques, accédez aux
                publications du Think Tank et contribuez à former les professionnels de
                l&apos;énergie africaine.
              </p>
              <Link
                href="/ecosysteme/devenir-partenaire"
                className="inline-flex items-center gap-2 px-8 py-4 border border-soga-gold text-soga-gold-light text-[15px] font-medium hover:bg-soga-graphite transition-colors min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
              >
                Soumettre une demande de partenariat
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
