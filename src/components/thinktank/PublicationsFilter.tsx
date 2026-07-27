"use client";

import { useState } from "react";
import Link from "next/link";
import type { Publication } from "@/data/thinktank";

const TT_GREEN = "#1E6F5C";
const TT_GREEN_LIGHT = "#3ea08a";

export default function PublicationsFilter({
  publications,
  thematiques,
}: {
  publications: Publication[];
  thematiques: string[];
}) {
  const [activeThematique, setActiveThematique] = useState<string>("Toutes");
  const [activeType, setActiveType] = useState<string>("Tous");

  const types = ["Tous", "rapport", "note", "article", "tribune"];

  const filtered = publications.filter((p) => {
    const matchThematique =
      activeThematique === "Toutes" || p.thematique === activeThematique;
    const matchType = activeType === "Tous" || p.type === activeType;
    return matchThematique && matchType;
  });

  return (
    <>
      {/* Filters */}
      <div
        className="sticky top-14 z-30 border-b"
        style={{ backgroundColor: "#0B0C0E", borderColor: "#2a2d33" }}
      >
        <div className="container-soga">
          <div className="flex flex-wrap gap-4 py-4">
            {/* Type filter */}
            <div
              className="flex gap-2 overflow-x-auto"
              role="group"
              aria-label="Filtrer par type"
            >
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveType(t)}
                  className="shrink-0 px-3 py-1.5 text-[13px] font-medium border transition-colors min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    borderColor: activeType === t ? TT_GREEN : "#2a2d33",
                    color: activeType === t ? TT_GREEN_LIGHT : "rgba(246,244,239,0.6)",
                    backgroundColor: activeType === t ? TT_GREEN + "15" : "transparent",
                    outlineColor: TT_GREEN,
                  }}
                  aria-pressed={activeType === t}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>
          {/* Thématiques filter */}
          <div
            className="flex gap-2 pb-4 overflow-x-auto"
            role="group"
            aria-label="Filtrer par thématique"
          >
            {["Toutes", ...thematiques].map((t) => (
              <button
                key={t}
                onClick={() => setActiveThematique(t)}
                className="shrink-0 text-[12px] whitespace-nowrap px-3 py-1.5 min-h-[36px] transition-colors"
                style={{
                  color:
                    activeThematique === t
                      ? TT_GREEN_LIGHT
                      : "rgba(246,244,239,0.4)",
                  textDecoration:
                    activeThematique === t ? "underline" : "none",
                  textUnderlineOffset: "3px",
                }}
                aria-pressed={activeThematique === t}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Publications list */}
      <section
        aria-live="polite"
        aria-label="Publications filtrées"
        className="container-soga py-12"
      >
        {filtered.length === 0 ? (
          <p className="text-lead text-white/40 text-center py-20">
            Aucune publication ne correspond à ces filtres.
          </p>
        ) : (
          <div className="space-y-4">
            {filtered.map((pub) => (
              <Link
                key={pub.id}
                href={`/think-tank/publications/${pub.slug}`}
                className="group flex flex-col md:flex-row gap-5 p-6 border rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  borderColor: "#2a2d33",
                  backgroundColor: "#16181C",
                  outlineColor: TT_GREEN,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = TT_GREEN + "60";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#2a2d33";
                }}
              >
                {/* Type badge */}
                <div className="md:w-28 shrink-0 pt-0.5">
                  <span
                    className="text-eyebrow text-[11px] px-2.5 py-1 font-semibold"
                    style={{
                      backgroundColor: TT_GREEN,
                      color: "#F6F4EF",
                    }}
                  >
                    {pub.type.toUpperCase()}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-small mb-2" style={{ color: TT_GREEN_LIGHT }}>
                    {pub.thematique} ·{" "}
                    {new Date(pub.date).toLocaleDateString("fr-FR", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <h2 className="text-[18px] font-display font-medium text-white line-clamp-2 mb-2 group-hover:text-white/90 transition-colors">
                    {pub.titre}
                  </h2>
                  <p className="text-small text-white/50 line-clamp-3">{pub.resume}</p>
                </div>

                {/* Download cta */}
                {pub.telechargeable && (
                  <div className="md:w-36 shrink-0 flex md:flex-col items-start md:justify-start gap-2">
                    <span
                      className="text-small font-medium"
                      style={{ color: TT_GREEN_LIGHT }}
                    >
                      Télécharger ↓
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
