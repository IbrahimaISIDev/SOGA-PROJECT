import type { Metadata } from "next";
import Image from "next/image";
import ThinkTankHeader from "@/components/thinktank/ThinkTankHeader";
import Footer from "@/components/layout/Footer";
import { experts } from "@/data/thinktank";

export const metadata: Metadata = {
  title: "Nos Experts — SOGA Think Tank",
  description:
    "Les chercheurs et experts du Think Tank de la Senegal Oil and Gas Academy.",
};

const TT_GREEN = "#1E6F5C";
const TT_GREEN_LIGHT = "#3ea08a";
const TT_BG_CARD = "#16181C";
const TT_BORDER = "#2a2d33";

export default function ExpertsPage() {
  return (
    <>
      <ThinkTankHeader activeSection="Nos experts" />
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
            <h1 className="text-h1 text-white mb-4">Nos experts</h1>
            <p className="text-lead max-w-xl" style={{ color: "rgba(246,244,239,0.55)" }}>
              Chercheurs, praticiens et académiciens engagés dans la production de
              connaissances sur l&apos;énergie et les ressources naturelles africaines.
            </p>
          </div>
        </div>

        {/* Experts grid */}
        <div className="container-soga py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {experts.map((expert) => (
              <article
                key={expert.id}
                className="rounded-sm border p-6 flex flex-col items-center text-center"
                style={{ backgroundColor: TT_BG_CARD, borderColor: TT_BORDER }}
                aria-label={expert.nom}
              >
                {/* Portrait */}
                <div
                  className="relative w-[88px] h-[88px] rounded-full overflow-hidden mb-5 flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: "#1a1d21",
                    border: `1px solid ${TT_BORDER}`,
                  }}
                  aria-hidden="true"
                >
                  {expert.portrait ? (
                    <Image src={expert.portrait} alt="" fill sizes="88px" className="object-cover" />
                  ) : (
                    <span className="text-[10px]" style={{ color: "rgba(246,244,239,0.15)" }}>
                      ·
                    </span>
                  )}
                </div>

                {/* Specialite eyebrow en vert */}
                <p
                  className="text-eyebrow text-[11px] mb-2"
                  style={{ color: TT_GREEN_LIGHT }}
                >
                  {expert.specialite.toUpperCase()}
                </p>

                {/* Nom */}
                <h2
                  className="font-semibold text-[16px] leading-snug mb-1"
                  style={{ color: "#F6F4EF" }}
                >
                  {expert.nom}
                </h2>

                {/* Titre */}
                <p
                  className="text-small leading-snug mb-1"
                  style={{ color: "rgba(246,244,239,0.5)" }}
                >
                  {expert.titre}
                </p>

                {/* Institution */}
                <p
                  className="text-eyebrow text-[10px]"
                  style={{ color: `${TT_GREEN}99` }}
                >
                  {expert.institution.toUpperCase()}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div
          className="border-t"
          style={{ borderColor: TT_BORDER }}
        >
          <div className="container-soga py-14 flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
            <div>
              <p className="text-eyebrow mb-2" style={{ color: TT_GREEN_LIGHT }}>
                COLLABORER
              </p>
              <p className="text-lead text-white">
                Vous souhaitez contribuer à nos travaux de recherche ?
              </p>
            </div>
            <a
              href="/contact"
              className="shrink-0 px-6 py-3.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 min-h-[44px] inline-flex items-center"
              style={{ backgroundColor: TT_GREEN, outlineColor: TT_GREEN }}
            >
              Nous contacter
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
