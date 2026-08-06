import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { StratigraphicSeparator } from "@/components/signature/StratigraphicColumn";
import { institution } from "@/data/institution";

const equipeReelle = institution.equipe.filter((m) => m.nom !== "Contenu provisoire");

export function generateStaticParams() {
  return equipeReelle.map((m) => ({ id: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const membre = equipeReelle.find((m) => m.slug === id);
  if (!membre) return {};
  return {
    title: `${membre.nom} — Équipe SOGA`,
    description: `${membre.titre} — ${membre.specialite}`,
  };
}

export default async function FicheMembre({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const membre = equipeReelle.find((m) => m.slug === id);
  if (!membre) notFound();

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-soga-ink">
        {/* Breadcrumb */}
        <div className="container-soga pt-28 pb-4">
          <nav aria-label="Fil d'Ariane">
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
              <li>
                <Link href="/institution/equipe" className="hover:text-white/60 transition-colors">
                  Équipe
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-soga-gold">
                {membre.nom}
              </li>
            </ol>
          </nav>
        </div>

        <div className="container-soga py-12">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-14 items-start">
            {/* Portrait column */}
            <div className="flex flex-col items-center lg:items-start gap-6">
              <div
                className="relative w-[220px] h-[220px] lg:w-[280px] lg:h-[280px] rounded-full overflow-hidden placeholder-block mx-auto lg:mx-0 flex items-center justify-center"
                aria-hidden="true"
              >
                {membre.portrait ? (
                  <Image
                    src={membre.portrait}
                    alt={membre.nom}
                    fill
                    sizes="(min-width: 1024px) 280px, 220px"
                    className="object-cover"
                  />
                ) : null}
              </div>

              <div className="text-center lg:text-left">
                <h1 className="text-h2 text-white mb-2">{membre.nom}</h1>
                <p className="text-eyebrow text-soga-gold mb-1">{membre.specialite.toUpperCase()}</p>
                <p className="text-small text-white/50">{membre.titre}</p>
              </div>

              {/* Filieres */}
              {membre.filieres.length > 0 && (
                <div className="w-full">
                  <p className="text-eyebrow text-white/30 mb-3 text-center lg:text-left">
                    FILIÈRES ENSEIGNÉES
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    {membre.filieres.map((f) => (
                      <span
                        key={f}
                        className="text-small px-3 py-1.5 font-medium"
                        style={{
                          backgroundColor: "rgba(13,43,62,0.6)",
                          color: "#C9962C",
                          border: "1px solid rgba(201,150,44,0.25)",
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <Link
                href="/institution/equipe"
                className="text-small text-white/40 hover:text-white/60 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soga-gold mt-2"
              >
                ← Retour à l&apos;équipe
              </Link>
            </div>

            {/* Bio column */}
            <div>
              <p className="text-eyebrow text-soga-gold mb-8">BIOGRAPHIE</p>
              <div className="space-y-5">
                <p className="text-body text-white/75 leading-relaxed">{membre.biographie}</p>
              </div>

              <StratigraphicSeparator className="my-12 opacity-30" />

              {/* Direction badge */}
              <div>
                <p className="text-eyebrow text-white/30 mb-3">DIRECTION</p>
                <span
                  className="text-small px-4 py-2 inline-block"
                  style={{
                    backgroundColor: "rgba(13,43,62,0.5)",
                    color: "#C9962C",
                    border: "1px solid rgba(201,150,44,0.2)",
                  }}
                >
                  {membre.direction.charAt(0).toUpperCase() + membre.direction.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
