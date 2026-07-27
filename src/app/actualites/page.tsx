import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import ScrollReveal from "@/components/home/ScrollReveal";
import { StratigraphicSeparator } from "@/components/signature/StratigraphicColumn";
import { CardEvenement } from "@/components/ui/Card";
import ArticlesFilter from "@/components/actualites/ArticlesFilter";
import { articles, evenements, categories } from "@/data/actualites";
import Link from "next/link";

export default function ActualitesPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHeader
          eyebrow="ACTUALITÉS & MÉDIAS"
          title="Toutes les actualités SOGA"
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Actualités" },
          ]}
        />

        {/* Articles */}
        <section aria-labelledby="articles-title" className="section-gap bg-soga-sand">
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-muted mb-3">ARTICLES & COMMUNIQUÉS</p>
              <h2 id="articles-title" className="text-h2 text-soga-ink mb-8">
                Dernières nouvelles.
              </h2>
            </ScrollReveal>

            <ArticlesFilter articles={articles} categories={categories} />
          </div>
        </section>

        <StratigraphicSeparator className="mx-16 md:mx-24" />

        {/* Agenda */}
        <section aria-labelledby="agenda-title" className="section-gap bg-soga-sand">
          <div className="container-soga">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-eyebrow text-soga-muted mb-3">AGENDA</p>
                  <h2 id="agenda-title" className="text-h2 text-soga-ink">
                    Prochains événements.
                  </h2>
                </div>
                <Link
                  href="/actualites/evenements"
                  className="hidden sm:inline-flex items-center gap-1 text-small font-medium text-soga-gold-deep hover:text-soga-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
                >
                  Voir l&apos;agenda complet →
                </Link>
              </div>
            </ScrollReveal>
            <div className="max-w-2xl space-y-4">
              {evenements.map((e, i) => (
                <ScrollReveal key={e.id} delay={i * 60}>
                  <CardEvenement evenement={e} />
                </ScrollReveal>
              ))}
            </div>
            <div className="mt-6 sm:hidden">
              <Link
                href="/actualites/evenements"
                className="text-small font-medium text-soga-gold-deep hover:text-soga-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
              >
                Voir l&apos;agenda complet →
              </Link>
            </div>
          </div>
        </section>

        {/* Espace presse */}
        <section aria-labelledby="presse-title" className="section-gap bg-soga-black">
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-gold mb-4">ESPACE PRESSE</p>
              <h2 id="presse-title" className="text-h2 text-white mb-6">
                Contact médias.
              </h2>
              <p className="text-lead text-white/70 mb-8 max-w-xl">
                Pour toute demande d&apos;interview, communiqué ou dossier de presse,
                contactez notre équipe communication.
              </p>
              <a
                href="mailto:direction@senegaloilandgasacademy.com"
                className="inline-flex items-center gap-2 px-6 py-3 border border-soga-gold text-soga-gold-light text-[15px] font-medium hover:bg-soga-graphite transition-colors min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
              >
                Contacter la presse
              </a>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
