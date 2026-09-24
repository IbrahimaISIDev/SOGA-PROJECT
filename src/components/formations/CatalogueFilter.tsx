"use client";

import { useState } from "react";
import Link from "next/link";
import { CardFormation } from "@/components/ui/Card";
import type { Formation, Niveau, Mode } from "@/data/formations";

type Filtre = "Tous" | Niveau | Mode;

const filtres: Filtre[] = [
  "Tous",
  "Technicien Spécialisé",
  "BTS",
  "Licence",
  "Master",
  "Temps plein",
  "Alternance",
];

export default function CatalogueFilter({ formations }: { formations: Formation[] }) {
  const [filtre, setFiltre] = useState<Filtre>("Tous");

  const filtered = formations.filter((f) => {
    if (filtre === "Tous") return true;
    if (filtre === "Temps plein" || filtre === "Alternance") return f.mode === filtre;
    return f.niveau === filtre;
  });

  return (
    <>
      {/* Filters */}
      <div className="bg-soga-sand border-b border-soga-line sticky top-14 z-30">
        <div className="container-soga">
          <div
            className="flex gap-2 overflow-x-auto py-4 scrollbar-none"
            role="group"
            aria-label="Filtrer les formations"
          >
            {filtres.map((f) => (
              <button
                key={f}
                onClick={() => setFiltre(f)}
                className={`shrink-0 px-4 py-2 text-[14px] font-medium border transition-colors min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 ${
                  filtre === f
                    ? "bg-soga-black text-white border-soga-black"
                    : "bg-soga-surface text-soga-ink border-soga-line hover:border-soga-gold"
                }`}
                aria-pressed={filtre === f}
              >
                {f}
              </button>
            ))}
            <Link
              href="/formations/courtes"
              className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 text-[14px] font-medium border border-soga-line bg-soga-surface text-soga-ink hover:border-soga-gold transition-colors min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
            >
              Formations courtes <span className="text-soga-gold-deep text-[12px]">↗</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section aria-live="polite" aria-label="Formations filtrées" className="section-gap bg-soga-sand">
        <div className="container-soga">
          {filtered.length === 0 ? (
            <p className="text-body text-soga-muted text-center py-16">
              Aucune formation ne correspond à ce filtre.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((f) => (
                <CardFormation key={f.id} formation={f} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
