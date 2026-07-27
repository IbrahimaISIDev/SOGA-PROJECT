import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Badge from "@/components/ui/Badge";
import { StratigraphicSeparator } from "@/components/signature/StratigraphicColumn";
import SemesterTimeline, { SemesterList } from "@/components/formations/SemesterTimeline";
import { formations } from "@/data/formations";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";
import { institution } from "@/data/institution";

export function generateStaticParams() {
  return formations.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const formation = formations.find((f) => f.slug === slug);
  if (!formation) return {};
  return {
    title: `${formation.titre} — ${formation.niveau}`,
    description: formation.description,
  };
}

const poleLabel: Record<string, string> = {
  technique: "Pôle Technique",
  managerial: "Pôle Managérial",
  courte: "Formations courtes",
};

export default async function FicheFormation({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const formation = formations.find((f) => f.slug === slug);
  if (!formation) notFound();

  const autresFormations = formations
    .filter((f) => f.slug !== formation.slug && f.pole === formation.pole)
    .slice(0, 3);

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: formation.titre,
    description: formation.description,
    url: `${SITE_URL}/formations/${formation.slug}`,
    educationalCredentialAwarded: formation.niveau,
    provider: {
      "@type": "EducationalOrganization",
      name: institution.nom,
      sameAs: SITE_URL,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: formation.mode,
      courseWorkload: formation.duree,
    },
  };

  return (
    <>
      <JsonLd data={courseJsonLd} />
      <Header variant="dark" />
      <main id="main-content">
        {/* ── Hero header ──────────────────────────────────── */}
        <div className="bg-soga-black text-white pt-24 pb-12 md:pt-32 md:pb-16">
          <div className="container-soga">
            {/* Breadcrumb */}
            <nav aria-label="Fil d'Ariane" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-eyebrow text-white/40">
                <li>
                  <Link href="/" className="hover:text-white/70 transition-colors">
                    Accueil
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/formations" className="hover:text-white/70 transition-colors">
                    Formations
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link
                    href={`/formations?pole=${formation.pole}`}
                    className="hover:text-white/70 transition-colors"
                  >
                    {poleLabel[formation.pole]}
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-white/70">
                  {formation.titre}
                </li>
              </ol>
            </nav>

            {/* Niveau badge */}
            <div className="mb-4">
              <span className="inline-block text-eyebrow text-[11px] px-2.5 py-1 bg-soga-gold text-soga-black font-semibold">
                {formation.niveau}
              </span>
            </div>

            <h1 className="text-h1 text-white mb-3">{formation.titre}</h1>
            <p className="text-eyebrow text-soga-gold-light mb-6">{formation.code}</p>
            <p className="text-lead text-white/70 max-w-2xl mb-8">{formation.description}</p>

            {/* Metadata grid */}
            <dl className="flex flex-wrap gap-x-10 gap-y-4 mb-10">
              {[
                { label: "DURÉE", value: formation.duree },
                { label: "RYTHME", value: formation.mode },
                { label: "LANGUE", value: "Français" },
                { label: "RENTRÉE", value: formation.rentree },
                { label: "LIEU", value: "Dakar" },
                ...(formation.placesLimitees && formation.capacite
                  ? [{ label: "CAPACITÉ", value: `${formation.capacite} places` }]
                  : []),
              ].map(({ label, value }) => (
                <div key={label}>
                  <dt className="text-eyebrow text-white/40 mb-1">{label}</dt>
                  <dd className="text-[15px] text-white">{value}</dd>
                </div>
              ))}
            </dl>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 px-6 py-3 bg-soga-gold text-soga-black text-[15px] font-semibold hover:bg-soga-gold-light transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold-light focus-visible:outline-offset-2 min-h-[44px]"
              >
                Candidater
              </Link>
              {formation.brochureUrl && (
                <a
                  href={formation.brochureUrl}
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-white border border-white/40 text-[15px] font-medium hover:border-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 min-h-[44px]"
                >
                  Télécharger la brochure PDF
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ── Body — 2-column layout ────────────────────────── */}
        <div className="container-soga section-gap">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-14">
            {/* ── Left column ─────────────────────────────── */}
            <div className="space-y-12">
              {/* Présentation */}
              <section aria-labelledby="presentation-title">
                <h2
                  id="presentation-title"
                  className="text-h3 text-soga-ink pb-4 mb-6 border-b border-soga-line"
                >
                  Présentation
                </h2>
                <p className="text-body text-soga-ink leading-relaxed">{formation.description}</p>
              </section>

              <StratigraphicSeparator />

              {/* Programme semestriel */}
              <section aria-labelledby="programme-title">
                <h2
                  id="programme-title"
                  className="text-h3 text-soga-ink pb-4 mb-6 border-b border-soga-line"
                >
                  Programme, semestre par semestre
                </h2>
                {/* Desktop: timeline interactive */}
                <div className="hidden md:block">
                  <SemesterTimeline semestres={formation.semestres} />
                </div>
                {/* Mobile: list */}
                <div className="md:hidden">
                  <SemesterList semestres={formation.semestres} />
                </div>
              </section>

              <StratigraphicSeparator />

              {/* Débouchés */}
              <section aria-labelledby="debouches-title">
                <h2
                  id="debouches-title"
                  className="text-h3 text-soga-ink pb-4 mb-6 border-b border-soga-line"
                >
                  Débouchés professionnels
                </h2>
                <div className="flex flex-wrap gap-3">
                  {formation.debouches.map((d) => (
                    <span
                      key={d}
                      className="px-4 py-2 bg-soga-sand border border-soga-line text-[14px] text-soga-ink"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </section>

              <StratigraphicSeparator />

              {/* Équipements & laboratoires */}
              <section aria-labelledby="equipements-title">
                <h2
                  id="equipements-title"
                  className="text-h3 text-soga-ink pb-4 mb-6 border-b border-soga-line"
                >
                  Équipements & laboratoires
                </h2>
                <div className="aspect-[16/7] bg-soga-graphite rounded-md overflow-hidden mb-6">
                  <div className="w-full h-full placeholder-block flex items-end p-6">
                    <span className="text-eyebrow text-soga-line/60">
                      Photo laboratoire — Contenu provisoire
                    </span>
                  </div>
                </div>
                <p className="text-body text-soga-muted">
                  Les étudiants accèdent aux équipements du campus SOGA et aux installations
                  de nos partenaires industriels dans le cadre des stages intégrés.
                </p>
              </section>
            </div>

            {/* ── Right sticky sidebar ─────────────────────── */}
            <aside
              className="lg:sticky lg:top-20 h-fit border border-soga-line rounded-md bg-white p-6 space-y-5"
              aria-label="Récapitulatif de la formation"
            >
              <h2 className="text-h3 text-[18px] text-soga-ink pb-4 border-b border-soga-line">
                Récapitulatif
              </h2>

              <dl className="space-y-3 text-small pb-5 border-b border-soga-line">
                {[
                  { label: "Niveau", value: formation.niveau },
                  { label: "Durée", value: formation.duree },
                  { label: "Mode", value: formation.mode },
                  { label: "Rentrée", value: formation.rentree },
                  { label: "Frais de formation", value: "Sur demande" },
                  { label: "Date limite de dépôt", value: "15 sept. 2025" },
                  { label: "Lieu", value: "Dakar, Sénégal" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-4">
                    <dt className="text-soga-muted">{label}</dt>
                    <dd className="text-soga-ink font-medium text-right">{value}</dd>
                  </div>
                ))}
              </dl>

              {formation.placesLimitees && (
                <Badge variant="places" className="w-full justify-center py-2">
                  Places limitées — {formation.capacite ?? ""} candidats max.
                </Badge>
              )}

              <Link
                href="/admissions"
                className="block w-full text-center px-5 py-3 bg-soga-gold text-soga-black text-[14px] font-semibold hover:bg-soga-gold-light transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 min-h-[44px]"
              >
                Candidater à cette formation
              </Link>
              <button className="block w-full text-center px-5 py-3 bg-white text-soga-ink border border-soga-ink text-[14px] font-medium hover:border-soga-gold hover:text-soga-gold-deep transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 min-h-[44px]">
                Parler à un conseiller
              </button>

              {/* Contact direct */}
              <div className="pt-4 border-t border-soga-line">
                <p className="text-eyebrow text-soga-muted mb-2">CONTACT ADMISSIONS</p>
                <a
                  href="mailto:direction@senegaloilandgasacademy.com"
                  className="text-small text-soga-gold-deep hover:underline underline-offset-4 break-all"
                >
                  direction@senegaloilandgasacademy.com
                </a>
                <p className="text-small text-soga-muted mt-1">+221 78 103 23 70</p>
              </div>
            </aside>
          </div>
        </div>

        {/* ── Autres formations du même pôle ─────────────── */}
        {autresFormations.length > 0 && (
          <>
            <StratigraphicSeparator className="mx-16 md:mx-24" />
            <section
              aria-labelledby="autres-title"
              className="section-gap bg-soga-sand"
            >
              <div className="container-soga">
                <p className="text-eyebrow text-soga-muted mb-3">
                  {poleLabel[formation.pole].toUpperCase()} — AUTRES FORMATIONS
                </p>
                <h2 id="autres-title" className="text-h2 text-soga-ink mb-8">
                  À explorer aussi.
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {autresFormations.map((f) => (
                    <Link
                      key={f.id}
                      href={`/formations/${f.slug}`}
                      className="group block p-5 bg-white border border-soga-line rounded-md hover:border-soga-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
                    >
                      <p className="text-eyebrow text-soga-muted mb-2">{f.code}</p>
                      <h3 className="text-[17px] font-medium text-soga-ink line-clamp-2 mb-3 group-hover:text-soga-gold-deep transition-colors">
                        {f.titre}
                      </h3>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="niveau">{f.niveau}</Badge>
                        <Badge variant="duree">{f.duree}</Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
