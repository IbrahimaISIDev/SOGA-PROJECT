"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import { CardFormation } from "@/components/ui/Card";
import { StratigraphicSeparator } from "@/components/signature/StratigraphicColumn";
import { formations, type Niveau, type Mode } from "@/data/formations";

type Filtre = "Tous" | Niveau | Mode | "Formation courte";

const filtres: Filtre[] = ["Tous", "DTS", "BTS", "Licence Pro", "Master Pro", "Formation courte", "Temps plein", "Alternance"];

export default function CatalogueFormations() {
  const [filtre, setFiltre] = useState<Filtre>("Tous");

  const filtered = formations.filter((f) => {
    if (filtre === "Tous") return true;
    if (filtre === "Formation courte") return f.pole === "courte";
    if (filtre === "Temps plein" || filtre === "Alternance") return f.mode === filtre;
    return f.niveau === filtre;
  });

  return (
    <>
      <Header variant="dark" />
      <main id="main-content">
        <PageHeader
          eyebrow="FORMATIONS"
          title="Catalogue des formations"
          subtitle="8 filières techniques et managériales, du DTS au Master Pro."
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Formations", href: "/formations" },
            { label: "Catalogue" },
          ]}
        />

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
                      : "bg-white text-soga-ink border-soga-line hover:border-soga-gold"
                  }`}
                  aria-pressed={filtre === f}
                >
                  {f}
                </button>
              ))}
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

        <StratigraphicSeparator className="mx-16 md:mx-24" />

        {/* Méthodologie teaser */}
        <section aria-labelledby="methodo-title" className="section-gap bg-soga-black">
          <div className="container-soga max-w-3xl">
            <p className="text-eyebrow text-soga-gold mb-4">MÉTHODOLOGIE</p>
            <h2 id="methodo-title" className="text-h2 text-white mb-6">
              Une pédagogie ancrée dans l&apos;industrie.
            </h2>
            <p className="text-lead text-white/70">
              Alternance systématique entre cours magistraux, travaux pratiques sur simulateurs et
              immersions en entreprise. Chaque filière inclut un stage professionnel de 4 à 6 mois
              chez l&apos;un de nos partenaires industriels.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
