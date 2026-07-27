import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import { StratigraphicSeparator } from "@/components/signature/StratigraphicColumn";
import CatalogueFilter from "@/components/formations/CatalogueFilter";
import { formations } from "@/data/formations";

export default function CatalogueFormations() {
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

        <CatalogueFilter formations={formations} />

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
