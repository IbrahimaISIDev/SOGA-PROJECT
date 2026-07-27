import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import ScrollReveal from "@/components/home/ScrollReveal";
import { StratigraphicSeparator } from "@/components/signature/StratigraphicColumn";
import { partenaires, categoriesPartenaires } from "@/data/ecosysteme";

export const metadata: Metadata = {
  title: "Partenariats stratégiques — SOGA",
  description:
    "Les partenaires institutionnels, industriels et académiques de la Senegal Oil and Gas Academy.",
};

export default function PartenariatsPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHeader
          eyebrow="Écosystème"
          title="Partenariats stratégiques"
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Écosystème", href: "/ecosysteme" },
            { label: "Partenariats stratégiques" },
          ]}
        />

        <div className="section-gap bg-soga-sand">
          <div className="container-soga flex flex-col gap-14">
            {categoriesPartenaires
              .map((cat) => ({
                cat,
                /* Seuls les partenaires réels sont affichés — masqués tant
                   que "Contenu provisoire" n'a pas été remplacé par un vrai
                   nom. */
                filtered: partenaires.filter(
                  (p) => p.categorie === cat && p.nom !== "Contenu provisoire"
                ),
              }))
              .filter(({ filtered }) => filtered.length > 0)
              .map(({ cat, filtered }, ci, visibles) => {
              return (
                <section key={cat} aria-labelledby={`cat-${ci}`}>
                  <ScrollReveal>
                    <p
                      id={`cat-${ci}`}
                      className="text-eyebrow text-soga-gold-deep mb-5"
                    >
                      {cat.toUpperCase()}
                    </p>
                  </ScrollReveal>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {filtered.map((p, i) => (
                      <ScrollReveal key={p.id} delay={i * 50}>
                        <div
                          className="border border-soga-line flex flex-col items-center justify-center gap-2 p-5 text-center"
                          style={{ height: "64px", backgroundColor: "#F0EDE3" }}
                          aria-label={p.nom}
                        >
                          {p.logo ? (
                            <Image
                              src={p.logo}
                              alt={p.nom}
                              width={160}
                              height={32}
                              className="max-h-8 max-w-full w-auto h-auto object-contain"
                            />
                          ) : (
                            <>
                              <p className="text-small font-medium text-soga-ink leading-tight">
                                {p.nom}
                              </p>
                              {p.description && (
                                <p className="text-eyebrow text-soga-muted text-[9px] leading-tight line-clamp-1">
                                  {p.description}
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                  {ci < visibles.length - 1 && (
                    <StratigraphicSeparator className="mt-10 opacity-50" />
                  )}
                </section>
              );
            })}

            <ScrollReveal>
              <p className="text-eyebrow text-soga-muted text-center">
                LOGOS PROVISOIRES — À FOURNIR PAR LE CLIENT
              </p>
            </ScrollReveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
