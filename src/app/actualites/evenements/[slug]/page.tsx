import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EvenementInscriptionForm from "@/components/actualites/EvenementInscriptionForm";
import { evenements } from "@/data/actualites";

export function generateStaticParams() {
  return evenements.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ev = evenements.find((e) => e.slug === slug);
  if (!ev) return {};
  return {
    title: `${ev.titre} — SOGA`,
    description: ev.description,
  };
}

export default async function FicheEvenement({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ev = evenements.find((e) => e.slug === slug);
  if (!ev) notFound();

  const date = new Date(ev.date);
  const dateFormatted = date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Header />
      <main id="main-content" className="bg-soga-sand min-h-screen">
        {/* Full-bleed hero */}
        <div className="relative h-[340px] md:h-[400px] overflow-hidden">
          {/* Image / placeholder */}
          <div
            className="absolute inset-0 placeholder-block"
            aria-hidden="true"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(11,12,14,0.15) 0%, rgba(11,12,14,0.80) 100%)",
            }}
            aria-hidden="true"
          />

          {/* Content at bottom */}
          <div className="absolute inset-0 flex flex-col justify-end container-soga pb-10">
            <nav aria-label="Fil d'Ariane" className="mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-eyebrow text-white/40">
                <li>
                  <Link href="/" className="hover:text-white/60 transition-colors">
                    Accueil
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/actualites" className="hover:text-white/60 transition-colors">
                    Actualités
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <Link
                  href="/actualites/evenements"
                  className="hover:text-white/60 transition-colors text-soga-gold/70"
                >
                  Agenda
                </Link>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-soga-gold line-clamp-1">
                  {ev.titre}
                </li>
              </ol>
            </nav>
            <p className="text-eyebrow text-soga-gold mb-3">
              {ev.type.toUpperCase()}
            </p>
            <h1 className="text-h1 text-white max-w-3xl">{ev.titre}</h1>
          </div>
        </div>

        {/* Body — 2 col */}
        <div className="container-soga py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 lg:gap-14 items-start">
            {/* Left — details + description */}
            <div>
              {/* Meta row */}
              <dl className="flex flex-wrap gap-8 mb-8 pb-8 border-b border-soga-line">
                <div>
                  <dt className="text-eyebrow text-soga-muted mb-1">DATE</dt>
                  <dd className="text-[15px] text-soga-ink font-medium">{dateFormatted}</dd>
                </div>
                <div>
                  <dt className="text-eyebrow text-soga-muted mb-1">HEURE</dt>
                  <dd className="text-[15px] text-soga-ink">{ev.heure}</dd>
                </div>
                <div>
                  <dt className="text-eyebrow text-soga-muted mb-1">LIEU</dt>
                  <dd className="text-[15px] text-soga-ink">{ev.lieu}</dd>
                </div>
                {ev.placesLimitees && (
                  <div>
                    <dt className="text-eyebrow text-soga-muted mb-1">PLACES</dt>
                    <dd
                      className="text-[15px] font-medium"
                      style={{ color: "#b91c1c" }}
                    >
                      Limitées
                    </dd>
                  </div>
                )}
              </dl>

              {/* Description */}
              <p className="text-lead text-soga-ink/80 leading-relaxed mb-8">
                {ev.description}
              </p>

              {!ev.inscriptionOuverte && (
                <div
                  className="inline-flex items-center gap-2 px-4 py-3 text-small font-medium"
                  style={{
                    backgroundColor: "rgba(201,150,44,0.08)",
                    border: "1px solid rgba(201,150,44,0.25)",
                    color: "#8C6516",
                  }}
                >
                  Les inscriptions ne sont pas ouvertes pour cet événement.
                </div>
              )}
            </div>

            {/* Right — inscription form (client) */}
            <EvenementInscriptionForm
              titre={ev.titre}
              inscriptionOuverte={ev.inscriptionOuverte}
            />
          </div>
        </div>

        {/* Back link */}
        <div className="container-soga pb-12">
          <Link
            href="/actualites/evenements"
            className="text-small text-soga-muted hover:text-soga-gold-deep transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
          >
            ← Voir tous les événements
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
