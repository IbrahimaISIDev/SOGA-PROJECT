import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ScrollReveal from "@/components/home/ScrollReveal";
import { formations } from "@/data/formations";
import { articles, evenements } from "@/data/actualites";
import { institution } from "@/data/institution";
import { publications } from "@/data/thinktank";

const HOME_STATS = [
  { valeur: "14", libelle: "filières techniques & managériales" },
  { valeur: "3", libelle: "campus — Dakar, Ziguinchor, Saint-Louis" },
  { valeur: "2018", libelle: "année de création de SOGA" },
  { valeur: "2", libelle: "accréditations — ANAQ-Sup, AUF" },
];

const METHODE_PILLIERS = [
  {
    titre: "Pédagogie par la pratique",
    texte:
      "Compétences visées avant contenu théorique — chaque module se termine par un cas réel.",
  },
  {
    titre: "Bancs didactiques & simulateurs",
    texte:
      "Équipements industriels réels en laboratoire — électrotechnique, instrumentation, QHSE.",
  },
  {
    titre: "Stages en entreprise",
    texte: "Immersions professionnelles chaque année, dès la première année de cycle.",
  },
  {
    titre: "Experts du secteur",
    texte:
      "Interventions régulières de professionnels en poste dans l'énergie, le management et l'industrie.",
  },
];

const TEMOIGNAGES = [
  {
    citation:
      "« Les bancs didactiques nous mettent face aux mêmes équipements qu'on trouve sur un site de production. »",
    auteur: "Témoignage provisoire",
    role: "Étudiante, Technicien Spécialisé en Instrumentation Oil & Gas",
  },
  {
    citation:
      "« Ce que je retiens : ici, on ne nous prépare pas à un examen, on nous prépare à un poste. »",
    auteur: "Témoignage provisoire",
    role: "Étudiant, BTS Hygiène, Sécurité, Environnement",
  },
  {
    citation:
      "« Un partenariat qui répond à un vrai besoin de compétences locales sur nos sites. »",
    auteur: "Témoignage provisoire",
    role: "Partenaire entreprise",
  },
];

/* Ne garder que les témoignages réels — masqué tant que rien n'a
   remplacé le texte "Témoignage provisoire" fourni par un vrai nom. */
const TEMOIGNAGES_REELS = TEMOIGNAGES.filter((t) => t.auteur !== "Témoignage provisoire");

const POLE_TECHNIQUE = [
  "Technicien Spécialisé en Exploration Production",
  "Technicien Spécialisé en Raffinage et Pétrochimie",
  "Technicien Spécialisé en Instrumentation Oil & Gas",
  "BTS Électrotechnique",
  "BTS Hygiène, Sécurité, Environnement",
  "BTS Maintenance des Engins Lourds",
];

const POLE_MANAGERIAL = [
  "Licence Sciences pour l'Ingénieur",
  "Licence Business Management",
  "Licence Logistique et Transports Internationaux",
  "Master Économie de l'Électricité, de l'Énergie et des Transports",
];

const FORMATIONS_PHARES_IDS = ["f01", "f04", "f08", "f10", "f12", "f14"];

function getLevelBadgeLabel(niveau: string) {
  return niveau.toUpperCase();
}

export default function HomePage() {
  const formationsPhares = FORMATIONS_PHARES_IDS.map(
    (id) => formations.find((f) => f.id === id)!
  ).filter(Boolean);

  const featuredArticles = articles.slice(0, 3);
  const nextEvent = evenements[0];
  const pub1 = publications[0];
  const pub2 = publications[1];

  return (
    <>
      <Header variant="dark" />
      <main id="main-content">
        {/* ── Hero ──────────────────────────────────────────── */}
        <HeroSection />

        {/* ── Stats band ────────────────────────────────────── */}
        <section aria-label="Chiffres clés SOGA" className="bg-soga-cream border-b border-soga-line">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-soga-line">
            {HOME_STATS.map((s) => (
              <div key={s.libelle} className="py-12 px-10">
                <ScrollReveal>
                  <p
                    className="font-display font-semibold leading-none"
                    style={{ fontSize: "44px", color: "#8C6516" }}
                  >
                    {s.valeur}
                  </p>
                  <p className="text-[14px] mt-2" style={{ color: "#3a3a3a" }}>
                    {s.libelle}
                  </p>
                </ScrollReveal>
              </div>
            ))}
          </div>
          <p className="text-eyebrow px-10 pb-5 pt-1" style={{ color: "#B0ADA4" }} aria-hidden>
            SENEGAL OIL AND GAS ACADEMY
          </p>
        </section>

        {/* ── Notre Projet ──────────────────────────────────── */}
        <section aria-labelledby="projet-title" className="section-gap bg-soga-sand">
          <div className="container-soga grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-gold-deep">NOTRE PROJET</p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <p
                id="projet-title"
                className="font-display font-medium text-soga-ink mb-6"
                style={{ fontSize: "clamp(24px,2.5vw,32px)", lineHeight: 1.3 }}
              >
                SOGA forme des techniciens, ingénieurs et managers immédiatement opérationnels
                dans les secteurs de l&apos;énergie, du management et de l&apos;industrie — et
                prépare le lancement d&apos;un Think Tank sur les politiques énergétiques
                africaines.
              </p>
              <Link
                href="/institution"
                className="text-[15px] font-semibold text-soga-gold-deep border-b border-soga-gold-deep hover:border-soga-gold hover:text-soga-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
              >
                Notre histoire →
              </Link>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Deux Pôles ────────────────────────────────────── */}
        <section aria-label="Les deux pôles de formation" className="grid grid-cols-1 md:grid-cols-2">
          <div
            className="relative overflow-hidden text-white"
            style={{ minHeight: "560px", backgroundColor: "#0D2B3E", padding: "56px" }}
          >
            <div className="absolute inset-0 placeholder-block" style={{ opacity: 0.5 }} aria-hidden />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <p className="text-eyebrow mb-4" style={{ color: "#F0C868" }}>
                  PÔLE TECHNIQUE &amp; TECHNOLOGIQUE
                </p>
                <h2
                  className="font-display font-semibold mb-6"
                  style={{ fontSize: "clamp(22px,2vw,32px)", lineHeight: 1.25 }}
                >
                  Métiers de terrain, laboratoires, équipements réels
                </h2>
                <ul
                  className="mb-8 space-y-0"
                  style={{ fontSize: "15px", lineHeight: 2.1, color: "#D8D4C8", listStyle: "none", padding: 0 }}
                >
                  {POLE_TECHNIQUE.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
              <Link
                href="/formations"
                className="text-[15px] font-semibold border-b transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 w-fit"
                style={{ color: "#F0C868", borderColor: "#F0C868", outlineColor: "#F0C868" }}
              >
                Voir les filières techniques →
              </Link>
            </div>
          </div>

          <div
            className="relative overflow-hidden text-white"
            style={{ minHeight: "560px", backgroundColor: "#16181C", padding: "56px" }}
          >
            <div className="absolute inset-0 placeholder-block" style={{ opacity: 0.5 }} aria-hidden />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <p className="text-eyebrow mb-4" style={{ color: "#F0C868" }}>
                  PÔLE MANAGÉRIAL &amp; TRANSITION
                </p>
                <h2
                  className="font-display font-semibold mb-6"
                  style={{ fontSize: "clamp(22px,2vw,32px)", lineHeight: 1.25 }}
                >
                  Piloter l&apos;industrie, penser la transition
                </h2>
                <ul
                  className="mb-8 space-y-0"
                  style={{ fontSize: "15px", lineHeight: 2.1, color: "#D8D4C8", listStyle: "none", padding: 0 }}
                >
                  {POLE_MANAGERIAL.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
              <Link
                href="/formations"
                className="text-[15px] font-semibold border-b transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 w-fit"
                style={{ color: "#F0C868", borderColor: "#F0C868", outlineColor: "#F0C868" }}
              >
                Voir les filières managériales →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Formations Phares ─────────────────────────────── */}
        <section aria-labelledby="formations-title" className="section-gap bg-soga-sand">
          <div className="container-soga">
            <ScrollReveal>
              <div className="flex items-baseline justify-between mb-12">
                <div>
                  <p className="text-eyebrow text-soga-gold-deep mb-3">FORMATIONS PHARES</p>
                  <h2
                    id="formations-title"
                    className="font-display font-semibold text-soga-ink"
                    style={{ fontSize: "clamp(28px,2.8vw,40px)" }}
                  >
                    Six filières, une même exigence
                  </h2>
                </div>
                <Link
                  href="/formations"
                  className="hidden md:block text-[15px] font-semibold text-soga-gold-deep border-b border-soga-gold-deep hover:border-soga-gold hover:text-soga-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
                >
                  Catalogue complet →
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formationsPhares.map((f, i) => (
                <ScrollReveal key={f.id} delay={i * 50}>
                  <Link
                    href={`/formations/${f.slug}`}
                    className="group block border border-soga-line rounded-lg overflow-hidden bg-soga-surface hover:shadow-md transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold"
                  >
                    <div className="relative h-[170px]">
                      <div className="absolute inset-0 placeholder-block" />
                      <div
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{ backgroundColor: "#C9962C" }}
                      />
                    </div>
                    <div className="p-5">
                      <span
                        className="text-eyebrow text-white px-2 py-1 rounded"
                        style={{ backgroundColor: "#0D2B3E", fontSize: "11px" }}
                      >
                        {getLevelBadgeLabel(f.niveau)}
                      </span>
                      <h3
                        className="font-display font-semibold text-soga-ink mt-3 mb-2 leading-snug"
                        style={{ fontSize: "19px" }}
                      >
                        {f.titre}
                      </h3>
                      <p className="text-[13px] text-soga-muted">
                        {f.duree} · Rentrée {f.rentree}
                      </p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <div className="mt-6 md:hidden">
              <Link
                href="/formations"
                className="text-[15px] font-semibold text-soga-gold-deep border-b border-soga-gold-deep"
              >
                Catalogue complet →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Méthode SOGA ──────────────────────────────────── */}
        <section
          aria-labelledby="methode-title"
          className="section-gap"
          style={{ backgroundColor: "var(--soga-sand-alt)" }}
        >
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-gold-deep mb-3">LA MÉTHODE SOGA</p>
              <h2
                id="methode-title"
                className="font-display font-semibold text-soga-ink mb-14 max-w-[700px]"
                style={{ fontSize: "clamp(28px,2.8vw,40px)" }}
              >
                Apprendre par la pratique, dès le premier semestre
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {METHODE_PILLIERS.map((p, i) => (
                <ScrollReveal key={p.titre} delay={i * 60}>
                  <div className="border-t-2 pt-5" style={{ borderColor: "#C9962C" }}>
                    <h3
                      className="font-display font-semibold text-soga-ink mb-3"
                      style={{ fontSize: "19px" }}
                    >
                      {p.titre}
                    </h3>
                    <p className="text-[14px] leading-[1.6]" style={{ color: "#3a3a3a" }}>
                      {p.texte}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Think Tank Band ───────────────────────────────── */}
        <section
          aria-labelledby="thinktank-title"
          className="section-gap relative"
          style={{ backgroundColor: "#0B0C0E" }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-1.5"
            style={{ backgroundColor: "#1E6F5C" }}
            aria-hidden
          />
          <div className="container-soga">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-14">
              <div>
                <p className="text-eyebrow mb-3" style={{ color: "#3ea08a" }}>
                  THINK TANK ÉNERGIE &amp; TRANSITION
                </p>
                <h2
                  id="thinktank-title"
                  className="font-display font-semibold text-white"
                  style={{ fontSize: "clamp(26px,2.5vw,36px)", maxWidth: "600px" }}
                >
                  Penser les politiques énergétiques africaines
                </h2>
              </div>
              <Link
                href="/think-tank"
                className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 text-[15px] font-semibold border transition-colors hover:bg-[#1E6F5C]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 min-h-[44px]"
                style={{ borderColor: "#1E6F5C", color: "#3ea08a", outlineColor: "#1E6F5C" }}
              >
                Explorer le Think Tank →
              </Link>
            </div>

            {pub1 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[pub1, pub2].filter(Boolean).map((pub) => (
                  <Link
                    key={pub!.slug}
                    href={`/think-tank/publications/${pub!.slug}`}
                    className="block border rounded-lg p-6 transition-colors hover:bg-[#1E6F5C]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{ borderColor: "#1E6F5C", outlineColor: "#1E6F5C" }}
                  >
                    <span
                      className="text-eyebrow text-white px-2 py-1 rounded inline-block mb-4"
                      style={{ backgroundColor: "#1E6F5C", fontSize: "11px" }}
                    >
                      {pub!.type.toUpperCase()}
                    </span>
                    <h3
                      className="font-display font-semibold text-white mb-3 leading-snug"
                      style={{ fontSize: "19px" }}
                    >
                      {pub!.titre}
                    </h3>
                    <p className="text-eyebrow" style={{ color: "#7a9a92", fontSize: "11px" }}>
                      {pub!.auteurs.join(", ").toUpperCase()}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-body text-white/50">
                Le Think Tank SOGA est en cours de lancement — premières publications à venir.
              </p>
            )}
          </div>
        </section>

        {/* ── Mot de la Fondatrice ──────────────────────────── */}
        <section aria-labelledby="fondatrice-quote" className="section-gap bg-soga-sand">
          <div className="container-soga grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 items-center">
            <ScrollReveal>
              <div
                className="rounded-sm overflow-hidden placeholder-block"
                style={{ height: "460px" }}
                aria-hidden
              />
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <p className="text-eyebrow text-soga-gold-deep mb-6">MOT DE LA FONDATRICE</p>
              <blockquote
                id="fondatrice-quote"
                className="font-display font-medium text-soga-ink mb-7"
                style={{ fontSize: "clamp(22px,2.2vw,34px)", lineHeight: 1.35 }}
              >
                {institution.fondatrice.citation}
              </blockquote>
              <p className="font-semibold text-soga-ink text-[16px]">{institution.fondatrice.nom}</p>
              <p className="text-[14px] text-soga-muted mb-5">
                Fondatrice, {institution.fondatrice.qualifications}
              </p>
              <Link
                href="/institution/fondatrice"
                className="text-[15px] font-semibold text-soga-gold-deep border-b border-soga-gold-deep hover:border-soga-gold hover:text-soga-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
              >
                Lire le message complet →
              </Link>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Actualités & Événements ───────────────────────── */}
        {(featuredArticles.length > 0 || nextEvent) && (
        <section aria-labelledby="actu-title" className="section-gap bg-soga-sand">
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-gold-deep mb-3">ACTUALITÉS &amp; ÉVÉNEMENTS</p>
              <h2
                id="actu-title"
                className="font-display font-semibold text-soga-ink mb-12"
                style={{ fontSize: "clamp(28px,2.8vw,36px)" }}
              >
                Ce qui se passe à SOGA
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredArticles.map((a, i) => (
                <ScrollReveal key={a.id} delay={i * 50}>
                  <Link
                    href={`/actualites/${a.slug}`}
                    className="group block border border-soga-line rounded-lg overflow-hidden bg-soga-surface hover:shadow-md transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold"
                  >
                    <div className="relative h-[130px]">
                      <div className="absolute inset-0 placeholder-block" />
                    </div>
                    <div className="p-4">
                      <p className="text-eyebrow text-soga-gold-deep mb-2">
                        {new Date(a.date)
                          .toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                          .toUpperCase()}
                      </p>
                      <h3
                        className="font-display font-semibold text-soga-ink leading-snug"
                        style={{ fontSize: "16px" }}
                      >
                        {a.titre}
                      </h3>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}

              {nextEvent && (
                <ScrollReveal delay={150}>
                  <Link
                    href={`/actualites/evenements/${nextEvent.slug}`}
                    className="group block border rounded-lg overflow-hidden bg-soga-surface hover:shadow-md transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold"
                    style={{ borderColor: "#C9962C" }}
                  >
                    <div
                      className="h-[130px] flex flex-col items-center justify-center border-b border-soga-line"
                      style={{ backgroundColor: "var(--soga-sand)" }}
                    >
                      <p className="text-eyebrow text-soga-gold-deep">
                        {new Date(nextEvent.date)
                          .toLocaleDateString("fr-FR", { month: "short" })
                          .toUpperCase()}
                      </p>
                      <p
                        className="font-display font-semibold text-soga-ink leading-none mt-1"
                        style={{ fontSize: "32px" }}
                      >
                        {new Date(nextEvent.date).getDate()}
                      </p>
                    </div>
                    <div className="p-4">
                      <span
                        className="text-eyebrow text-soga-black px-2 py-1 rounded inline-block mb-2"
                        style={{ backgroundColor: "#C9962C", fontSize: "10px" }}
                      >
                        PROCHAIN ÉVÉNEMENT
                      </span>
                      <h3
                        className="font-display font-semibold text-soga-ink leading-snug mt-1"
                        style={{ fontSize: "16px" }}
                      >
                        {nextEvent.titre}
                      </h3>
                    </div>
                  </Link>
                </ScrollReveal>
              )}
            </div>

            <div className="mt-10">
              <Link
                href="/actualites"
                className="text-[15px] font-semibold text-soga-gold-deep border-b border-soga-gold-deep hover:border-soga-gold hover:text-soga-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
              >
                Toutes les actualités →
              </Link>
            </div>
          </div>
        </section>
        )}

        {/* ── Témoignages ───────────────────────────────────── */}
        {/* Masqué tant qu'aucun témoignage réel n'est disponible — voir
            TEMOIGNAGES_REELS ci-dessus. Les logos partenaires ne sont pas
            encore prêts non plus (aucune donnée réelle à afficher), donc
            cette section entière reste masquée pour l'instant plutôt que
            de montrer des blocs vides étiquetés "contenu provisoire". */}
        {TEMOIGNAGES_REELS.length > 0 && (
          <section
            aria-labelledby="temoignages-title"
            className="section-gap"
            style={{ backgroundColor: "var(--soga-sand-alt)" }}
          >
            <div className="container-soga">
              <ScrollReveal>
                <p className="text-eyebrow text-soga-gold-deep mb-3">TÉMOIGNAGES</p>
                <h2
                  id="temoignages-title"
                  className="font-display font-semibold text-soga-ink mb-12"
                  style={{ fontSize: "clamp(28px,2.8vw,36px)" }}
                >
                  Ceux qui construisent SOGA
                </h2>
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TEMOIGNAGES_REELS.map((t, i) => (
                  <ScrollReveal key={t.role} delay={i * 60}>
                    <div className="bg-soga-surface border border-soga-line rounded-lg p-7">
                      <p
                        className="font-display italic text-soga-ink mb-5"
                        style={{ fontSize: "18px", lineHeight: 1.5 }}
                      >
                        {t.citation}
                      </p>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full shrink-0"
                          style={{ backgroundColor: "var(--soga-line)" }}
                          aria-hidden
                        />
                        <div>
                          <p className="font-semibold text-soga-ink text-[14px]">{t.auteur}</p>
                          <p className="text-[13px] text-soga-muted">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA Final ─────────────────────────────────────── */}
        <section
          aria-labelledby="cta-title"
          className="section-gap text-center"
          style={{ backgroundColor: "#0B0C0E" }}
        >
          <div className="container-soga">
            <ScrollReveal>
              <h2
                id="cta-title"
                className="font-display font-semibold text-white mb-3"
                style={{ fontSize: "clamp(28px,2.8vw,36px)" }}
              >
                Les inscriptions sont ouvertes
              </h2>
              <p className="mb-8" style={{ color: "#B8B4A8", fontSize: "16px" }}>
                Rentrée octobre 2025 — sur les campus de Dakar, Ziguinchor et Saint-Louis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-7">
                <Link
                  href="/admissions/candidature"
                  className="inline-flex items-center justify-center px-7 py-4 text-[15px] font-semibold transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 min-h-[44px]"
                  style={{ backgroundColor: "#C9962C", color: "#0B0C0E" }}
                >
                  Déposer ma candidature
                </Link>
                <Link
                  href="/formations"
                  className="inline-flex items-center justify-center px-7 py-4 text-[15px] font-semibold border transition-colors hover:border-soga-gold hover:text-soga-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 min-h-[44px]"
                  style={{ borderColor: "#F6F4EF", color: "#F6F4EF" }}
                >
                  Voir toutes les filières
                </Link>
              </div>
              <p className="text-eyebrow" style={{ color: "#6B6B6B" }}>
                {institution.email} · {institution.telephone}
              </p>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
