import type { Metadata } from "next";
import Link from "next/link";
import ThinkTankHeader from "@/components/thinktank/ThinkTankHeader";
import Footer from "@/components/layout/Footer";
import { thematiquesListe, publications } from "@/data/thinktank";

export const metadata: Metadata = {
  title: "Thématiques de Recherche — SOGA Think Tank",
  description:
    "Les axes de recherche du Think Tank SOGA : gouvernance, transition énergétique, contenu local et leadership.",
};

const TT_GREEN = "#1E6F5C";
const TT_GREEN_LIGHT = "#3ea08a";
const TT_BG = "#16181C";
const TT_BORDER = "#2a2d33";

export default function ThematiquesPage() {
  return (
    <>
      <ThinkTankHeader activeSection="Thématiques" />
      <main
        id="main-content"
        className="min-h-screen"
        style={{ backgroundColor: "#0B0C0E", color: "#F6F4EF" }}
      >
        {/* Page header */}
        <div
          className="border-b pt-28 pb-12"
          style={{ borderColor: TT_BORDER }}
        >
          <div className="container-soga">
            <p
              className="text-eyebrow mb-4"
              style={{ color: TT_GREEN_LIGHT }}
            >
              THINK TANK · SOGA
            </p>
            <h1 className="text-h1 text-white mb-4">Thématiques</h1>
            <p className="text-lead max-w-xl" style={{ color: "rgba(246,244,239,0.55)" }}>
              Quatre axes de recherche prioritaires, au croisement des enjeux
              énergétiques, économiques et sociaux du continent africain.
            </p>
          </div>
        </div>

        {/* 2×2 grid */}
        <section
          aria-labelledby="thematiques-heading"
          className="container-soga py-16"
        >
          <h2 id="thematiques-heading" className="sr-only">
            Nos thématiques de recherche
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {thematiquesListe.map((th, i) => (
              <article
                key={th.id}
                className="rounded-sm border p-8 flex flex-col gap-6"
                style={{ backgroundColor: TT_BG, borderColor: TT_BORDER }}
                aria-label={th.titre}
              >
                {/* Green accent bar */}
                <div
                  className="w-8 shrink-0"
                  style={{
                    height: "2px",
                    backgroundColor: TT_GREEN,
                  }}
                  aria-hidden="true"
                />

                {/* Number */}
                <p
                  className="font-mono text-[11px] font-semibold"
                  style={{ color: `${TT_GREEN_LIGHT}60` }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>

                {/* Title */}
                <h3
                  className="font-display font-semibold leading-snug"
                  style={{ fontSize: "22px", color: "#F6F4EF" }}
                >
                  {th.titre}
                </h3>

                {/* Description */}
                <p
                  className="text-[14px] leading-relaxed"
                  style={{ color: "rgba(246,244,239,0.5)" }}
                >
                  {th.description}
                </p>

                {/* Publications count for this thematique */}
                {(() => {
                  const count = publications.filter(
                    (p) =>
                      p.thematique
                        .toLowerCase()
                        .includes(th.titre.toLowerCase().split("&")[0].trim().toLowerCase()) ||
                      th.titre
                        .toLowerCase()
                        .includes(p.thematique.toLowerCase().split("&")[0].trim().toLowerCase())
                  ).length;
                  return count > 0 ? (
                    <Link
                      href="/think-tank/publications"
                      className="mt-auto text-small font-medium transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 self-start"
                      style={{ color: TT_GREEN_LIGHT, outlineColor: TT_GREEN }}
                    >
                      {count} publication{count > 1 ? "s" : ""} →
                    </Link>
                  ) : (
                    <p
                      className="mt-auto text-eyebrow text-[11px]"
                      style={{ color: `${TT_GREEN}60` }}
                    >
                      TRAVAUX À VENIR
                    </p>
                  );
                })()}
              </article>
            ))}
          </div>
        </section>

        {/* CTA publications */}
        <div
          className="border-t"
          style={{ borderColor: TT_BORDER }}
        >
          <div className="container-soga py-14 flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
            <p className="text-lead text-white">
              Consulter toutes nos publications
            </p>
            <Link
              href="/think-tank/publications"
              className="shrink-0 px-6 py-3.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 min-h-[44px] inline-flex items-center"
              style={{ backgroundColor: TT_GREEN, outlineColor: TT_GREEN }}
            >
              Voir les publications →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
