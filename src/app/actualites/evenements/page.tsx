import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import { evenements } from "@/data/actualites";

export const metadata: Metadata = {
  title: "Agenda des événements — SOGA",
  description:
    "Retrouvez tous les événements à venir de la Senegal Oil and Gas Academy : journées portes ouvertes, conférences, cérémonies.",
};

export default function AgendaPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHeader
          eyebrow="Actualités"
          title="Agenda des événements"
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Actualités", href: "/actualites" },
            { label: "Agenda" },
          ]}
        />

        {/* Event list — table style */}
        <section aria-labelledby="agenda-list-title" className="section-gap bg-soga-sand">
          <div className="container-soga">
            <h2 id="agenda-list-title" className="sr-only">
              Liste des événements
            </h2>

            <div
              className="flex flex-col"
              style={{ gap: "1px", backgroundColor: "#E2DED5" }}
            >
              {evenements.map((ev) => {
                const date = new Date(ev.date);
                const jour = date.toLocaleDateString("fr-FR", { day: "2-digit" });
                const mois = date
                  .toLocaleDateString("fr-FR", { month: "short" })
                  .toUpperCase()
                  .replace(".", "");

                return (
                  <article
                    key={ev.id}
                    className="bg-white grid items-center gap-4 md:gap-6 px-5 py-5 md:px-8 md:py-6"
                    style={{
                      gridTemplateColumns: "80px 1fr",
                      gridTemplateRows: "auto",
                    }}
                    aria-label={ev.titre}
                  >
                    {/* Date block */}
                    <div className="text-center">
                      <p className="text-eyebrow text-soga-gold-deep text-[11px]">{mois}</p>
                      <p className="font-display font-semibold text-[28px] text-soga-ink leading-none mt-0.5">
                        {jour}
                      </p>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-eyebrow text-soga-muted text-[10px] mb-1">
                          {ev.type.toUpperCase()}
                        </p>
                        <h3 className="font-display font-semibold text-[17px] text-soga-ink leading-snug">
                          {ev.titre}
                        </h3>
                        <p className="text-small text-soga-muted mt-1">
                          {ev.heure} · {ev.lieu}
                        </p>
                      </div>

                      <div className="shrink-0">
                        {ev.inscriptionOuverte ? (
                          <Link
                            href={`/actualites/evenements/${ev.slug}`}
                            className="inline-flex items-center gap-1 text-[14px] font-semibold text-soga-gold-deep hover:text-soga-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 min-h-[44px] px-2"
                          >
                            S&apos;inscrire →
                          </Link>
                        ) : (
                          <Link
                            href={`/actualites/evenements/${ev.slug}`}
                            className="inline-flex items-center gap-1 text-[14px] text-soga-muted hover:text-soga-gold-deep transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 min-h-[44px] px-2"
                          >
                            Voir →
                          </Link>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
