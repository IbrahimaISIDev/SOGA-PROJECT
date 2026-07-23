import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ScrollReveal from "@/components/home/ScrollReveal";
import { StratigraphicSeparator } from "@/components/signature/StratigraphicColumn";
import { CardFormation, CardActualite } from "@/components/ui/Card";
import { formations } from "@/data/formations";
import { articles } from "@/data/actualites";
import { institution } from "@/data/institution";

export default function HomePage() {
  const featuredFormations = formations.slice(0, 3);
  const featuredArticles = articles.slice(0, 3);

  return (
    <>
      <Header variant="dark" />
      <main id="main-content">
        {/* ── Hero ─────────────────────────────────────────── */}
        <HeroSection />

        {/* ── Mission ──────────────────────────────────────── */}
        <section aria-labelledby="mission-title" className="section-gap bg-soga-sand">
          <div className="container-soga">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <ScrollReveal>
                <p className="text-eyebrow text-soga-muted mb-4">01 · NOTRE MISSION</p>
                <h2 id="mission-title" className="text-h2 text-soga-ink mb-6">
                  Former les bâtisseurs de l&apos;énergie africaine.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={80}>
                <div className="space-y-4">
                  {institution.mission.map((point, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="shrink-0 w-0.5 bg-soga-gold self-stretch" aria-hidden />
                      <p className="text-body text-soga-muted">{point}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Link
                    href="/institution"
                    className="text-[15px] font-medium text-soga-gold-deep underline underline-offset-4 decoration-soga-line hover:decoration-soga-gold transition-colors"
                  >
                    En savoir plus sur l&apos;institution →
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <StratigraphicSeparator className="mx-16 md:mx-24" />

        {/* ── Formations ───────────────────────────────────── */}
        <section aria-labelledby="formations-title" className="section-gap bg-soga-sand">
          <div className="container-soga">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-eyebrow text-soga-muted mb-3">02 · NOS FORMATIONS</p>
                  <h2 id="formations-title" className="text-h2 text-soga-ink">
                    8 filières, du DTS au Master Pro.
                  </h2>
                </div>
                <Link
                  href="/formations"
                  className="hidden md:block text-[15px] font-medium text-soga-gold-deep underline underline-offset-4 decoration-soga-line hover:decoration-soga-gold transition-colors"
                >
                  Voir tout le catalogue →
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredFormations.map((f, i) => (
                <ScrollReveal key={f.id} delay={i * 60}>
                  <CardFormation formation={f} />
                </ScrollReveal>
              ))}
            </div>

            <div className="mt-8 md:hidden text-center">
              <Link
                href="/formations"
                className="text-[15px] font-medium text-soga-gold-deep underline underline-offset-4 decoration-soga-line hover:decoration-soga-gold transition-colors"
              >
                Voir tout le catalogue →
              </Link>
            </div>
          </div>
        </section>

        <StratigraphicSeparator className="mx-16 md:mx-24" />

        {/* ── Chiffres clés ────────────────────────────────── */}
        <section aria-labelledby="chiffres-title" className="section-gap bg-soga-black">
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-gold mb-4">03 · EN CHIFFRES</p>
              <h2 id="chiffres-title" className="text-h2 text-white mb-12">
                L&apos;excellence en données.
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
              {institution.chiffres.map((c, i) => (
                <ScrollReveal key={c.libelle} delay={i * 60}>
                  <div className="flex flex-col gap-2">
                    <span className="font-display text-[56px] text-soga-gold-light leading-none">
                      {c.valeur}
                    </span>
                    <div className="w-8 h-0.5 bg-soga-gold" />
                    <span className="text-eyebrow text-white/60">{c.libelle}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <StratigraphicSeparator className="mx-16 md:mx-24" />

        {/* ── Think Tank teaser ────────────────────────────── */}
        <section aria-labelledby="thinktank-title" className="section-gap bg-soga-petrol">
          <div className="container-soga">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal>
                <p className="text-eyebrow mb-4" style={{ color: "#1E6F5C" }}>
                  04 · THINK TANK
                </p>
                <h2 id="thinktank-title" className="text-h2 text-white mb-6">
                  La recherche au service de la politique énergétique africaine.
                </h2>
                <p className="text-lead text-white/70 mb-8">
                  Le Think Tank SOGA produit des analyses indépendantes, des notes de politique
                  publique et des rapports sectoriels sur les enjeux énergétiques africains.
                </p>
                <Link
                  href="/think-tank"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#1E6F5C] text-white text-[15px] font-medium hover:bg-[#1E6F5C]/20 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1E6F5C] focus-visible:outline-offset-2 min-h-[44px]"
                >
                  Explorer le Think Tank
                </Link>
              </ScrollReveal>

              <ScrollReveal delay={80}>
                <div className="bg-soga-black/30 border border-white/10 p-6 rounded-md">
                  <p className="text-small text-white/50 mb-2">Dernière publication</p>
                  <h3 className="text-h3 text-white mb-3">
                    Scénarios de transition énergétique pour le Sénégal à l&apos;horizon 2035
                  </h3>
                  <p className="text-small text-white/60 mb-5">
                    Analyse prospective des trajectoires énergétiques sénégalaises combinant
                    exploitation des hydrocarbures et développement accéléré des ENR.
                  </p>
                  <Link
                    href="/think-tank/publications/transition-energetique-senegal-2035"
                    className="text-[14px] font-medium hover:opacity-80 transition-opacity"
                    style={{ color: "#1E6F5C" }}
                  >
                    Lire le rapport →
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <StratigraphicSeparator className="mx-16 md:mx-24" />

        {/* ── Actualités ───────────────────────────────────── */}
        <section aria-labelledby="actu-title" className="section-gap bg-soga-sand">
          <div className="container-soga">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-eyebrow text-soga-muted mb-3">05 · ACTUALITÉS</p>
                  <h2 id="actu-title" className="text-h2 text-soga-ink">
                    Dernières nouvelles de SOGA.
                  </h2>
                </div>
                <Link
                  href="/actualites"
                  className="hidden md:block text-[15px] font-medium text-soga-gold-deep underline underline-offset-4 decoration-soga-line hover:decoration-soga-gold transition-colors"
                >
                  Toutes les actualités →
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((a, i) => (
                <ScrollReveal key={a.id} delay={i * 60}>
                  <CardActualite article={a} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Admissions ───────────────────────────────── */}
        <section
          aria-labelledby="admissions-cta-title"
          className="section-gap bg-soga-black text-center"
        >
          <div className="container-soga max-w-2xl mx-auto">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-gold mb-4">REJOIGNEZ SOGA</p>
              <h2 id="admissions-cta-title" className="text-h2 text-white mb-6">
                Candidatures ouvertes — Promotion 2025.
              </h2>
              <p className="text-lead text-white/70 mb-10">
                Rentrée en octobre 2025. Dossiers acceptés jusqu&apos;au 30 septembre.
              </p>
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 px-8 py-4 bg-soga-black text-soga-gold-light border border-soga-gold text-[15px] font-medium hover:bg-soga-graphite transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 min-h-[44px]"
              >
                Déposer ma candidature
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
