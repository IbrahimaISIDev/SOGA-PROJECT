import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ThinkTankHeader from "@/components/thinktank/ThinkTankHeader";
import Footer from "@/components/layout/Footer";
import { StratigraphicSeparator } from "@/components/signature/StratigraphicColumn";
import PublicationSidebar from "@/components/thinktank/PublicationSidebar";
import PublicationRelatedLinks from "@/components/thinktank/PublicationRelatedLinks";
import CopyButton from "@/components/thinktank/CopyButton";
import { publications } from "@/data/thinktank";
import ReadingProgress from "@/components/ui/ReadingProgress";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";
import { institution } from "@/data/institution";

const TT_GREEN = "#1E6F5C";
const TT_GREEN_LIGHT = "#3ea08a";
const TT_BG_CARD = "#16181C";
const TT_BORDER = "#2a2d33";

export function generateStaticParams() {
  return publications.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pub = publications.find((p) => p.slug === slug);
  if (!pub) return {};
  return {
    title: `${pub.titre} — Think Tank SOGA`,
    description: pub.resume,
  };
}

export default async function FichePublication({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pub = publications.find((p) => p.slug === slug);
  if (!pub) notFound();

  const autresPublications = publications
    .filter((p) => p.slug !== pub.slug)
    .slice(0, 3);

  const dateFormatted = new Date(pub.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const citation = `${pub.auteurs.join(", ")} (${new Date(pub.date).getFullYear()}). ${pub.titre}. SOGA Think Tank.`;

  const pages = (pub as { pages?: number }).pages;
  const readingMins = pages
    ? `${pages} pages`
    : `${Math.max(1, Math.round((pub.resume ?? "").split(/\s+/).length / 200))} min`;

  const pageUrl = `${SITE_URL}/think-tank/publications/${pub.slug}`;
  const publicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: pub.titre,
    description: pub.resume,
    datePublished: pub.date,
    about: pub.thematique,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    isAccessibleForFree: pub.telechargeable,
    ...(pub.image ? { image: `${SITE_URL}${pub.image}` } : {}),
    author: pub.auteurs.map((nom) => ({ "@type": "Organization", name: nom })),
    publisher: { "@type": "EducationalOrganization", name: institution.nom, url: SITE_URL },
  };

  return (
    <>
      <JsonLd data={publicationJsonLd} />
      <ReadingProgress />
      <ThinkTankHeader activeSection="Publications" />
      <main
        id="main-content"
        className="min-h-screen"
        style={{ backgroundColor: "#0B0C0E", color: "#F6F4EF" }}
      >
        <div className="container-soga pt-24 pb-16 md:pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-14">
            {/* ── Article ──────────────────────────────────── */}
            <article>
              {/* Breadcrumb */}
              <nav aria-label="Fil d'Ariane" className="mb-8">
                <ol className="flex flex-wrap items-center gap-2 text-eyebrow text-white/40">
                  <li>
                    <Link href="/think-tank" className="hover:text-white/60 transition-colors">
                      Think Tank
                    </Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li>
                    <Link
                      href="/think-tank/publications"
                      className="hover:text-white/60 transition-colors"
                      style={{ color: TT_GREEN_LIGHT + "aa" }}
                    >
                      Publications
                    </Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li aria-current="page" className="line-clamp-1" style={{ color: TT_GREEN_LIGHT }}>
                    {pub.thematique}
                  </li>
                </ol>
              </nav>

              {/* Type badge */}
              <div className="mb-5">
                <span
                  className="text-eyebrow text-[11px] px-3 py-1.5 font-semibold"
                  style={{ backgroundColor: TT_GREEN, color: "#F6F4EF" }}
                >
                  {pub.type.toUpperCase()}
                </span>
              </div>

              <h1 className="text-h1 text-white mb-5">{pub.titre}</h1>

              <p className="text-eyebrow text-white/40 mb-10 leading-relaxed">
                {pub.auteurs.join(", ")} · {dateFormatted} ·{" "}
                THÉMATIQUE : {pub.thematique.toUpperCase()} · {readingMins.toUpperCase()}
              </p>

              {/* Image */}
              <div className="relative aspect-[16/7] mb-10 overflow-hidden">
                {pub.image ? (
                  <Image src={pub.image} alt="" fill className="object-cover" />
                ) : (
                  <div
                    className="w-full h-full placeholder-block flex items-end p-6"
                    style={{ opacity: 0.4 }}
                  >
                    <span className="text-eyebrow text-white/40">Visuel provisoire</span>
                  </div>
                )}
              </div>

              {/* Résumé serif */}
              <div
                className="font-display text-[20px] leading-relaxed mb-6 pb-6 border-b"
                style={{ color: "#D8D4C8", borderColor: TT_BORDER }}
              >
                <span className="font-semibold" style={{ color: TT_GREEN_LIGHT }}>
                  Résumé —{" "}
                </span>
                {pub.resume}
              </div>

              {/* Body placeholder */}
              <div
                className="text-[15px] leading-relaxed mb-10 space-y-4"
                style={{ color: "#B8B4A8" }}
              >
                <p>
                  Ce document examine en détail les dynamiques à l&apos;œuvre dans le secteur
                  énergétique africain et propose un cadre d&apos;analyse applicable aux décideurs
                  publics et aux opérateurs privés du secteur.
                </p>
                <p>
                  <span
                    className="text-eyebrow block mb-2"
                    style={{ color: "rgba(246,244,239,0.3)" }}
                  >
                    — Contenu provisoire —
                  </span>
                  Le corps du texte intégral sera intégré dès réception du document final
                  du Think Tank. Cette fiche présente la structure et les métadonnées
                  de la publication en attendant le contenu éditorial complet.
                </p>
              </div>

              {/* Citation block */}
              <div
                className="rounded-sm p-5 mb-10 border"
                style={{ backgroundColor: TT_BG_CARD, borderColor: TT_BORDER }}
              >
                <p className="text-eyebrow mb-3" style={{ color: TT_GREEN_LIGHT }}>
                  CITER CETTE PUBLICATION
                </p>
                <code
                  className="font-mono text-[13px] leading-relaxed block"
                  style={{ color: "#B8B4A8" }}
                >
                  {citation}
                </code>
                <CopyButton text={citation} />
              </div>

              <StratigraphicSeparator className="opacity-20" />

              {/* À lire aussi */}
              {autresPublications.length > 0 && (
                <section aria-labelledby="autres-pub-title" className="mt-12">
                  <h2 id="autres-pub-title" className="text-h3 text-white mb-6">
                    À lire aussi
                  </h2>
                  <PublicationRelatedLinks publications={autresPublications} />
                </section>
              )}
            </article>

            {/* ── Sidebar (client) ─────────────────────────── */}
            <PublicationSidebar
              auteurs={pub.auteurs}
              dateFormatted={dateFormatted}
              thematique={pub.thematique}
              type={pub.type}
              telechargeable={pub.telechargeable}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
