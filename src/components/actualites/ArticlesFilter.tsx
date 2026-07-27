"use client";

import { useState } from "react";
import ScrollReveal from "@/components/home/ScrollReveal";
import { CardActualite } from "@/components/ui/Card";
import type { Article } from "@/data/actualites";

export default function ArticlesFilter({
  articles,
  categories,
}: {
  articles: Article[];
  categories: readonly string[];
}) {
  const [categorieActive, setCategorieActive] = useState<string>("Toutes");

  const articlesFiltres =
    categorieActive === "Toutes"
      ? articles
      : articles.filter((a) => a.categorie === categorieActive);

  return (
    <>
      {/* Filter chips */}
      <ScrollReveal delay={60}>
        <div
          className="flex flex-wrap gap-2 pb-6 mb-6 border-b border-soga-line"
          role="group"
          aria-label="Filtrer par catégorie"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategorieActive(cat)}
              aria-pressed={categorieActive === cat}
              className={`text-eyebrow text-[12px] px-4 py-2 border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soga-gold min-h-[36px] ${
                categorieActive === cat
                  ? "bg-soga-ink text-soga-gold-light border-soga-ink"
                  : "bg-white text-soga-graphite border-soga-line hover:border-soga-gold"
              }`}
            >
              {cat}
            </button>
          ))}
          <span
            key={articlesFiltres.length}
            className="text-eyebrow text-soga-muted self-center ml-auto text-[11px] animate-count-pop"
          >
            {articlesFiltres.length} RÉSULTAT{articlesFiltres.length > 1 ? "S" : ""}
          </span>
        </div>
      </ScrollReveal>

      {articlesFiltres.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articlesFiltres.map((a, i) => (
            <ScrollReveal key={a.id} delay={i * 60}>
              <CardActualite article={a} />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-eyebrow text-soga-muted">
            Aucun article dans cette catégorie pour le moment.
          </p>
        </div>
      )}
    </>
  );
}
