import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import { formationsCourtes } from "@/data/formations";

export const metadata: Metadata = {
  title: "Formations courtes",
  description:
    "Modules de perfectionnement professionnel ciblés — de 2 à 5 jours — sur les métiers du pétrole, du gaz et des énergies durables.",
};

const DOMAINE_COLORS: Record<string, string> = {
  Technique: "#0D2B3E",
  Management: "#3d4148",
  Juridique: "#8C6516",
  HSE: "#1E6F5C",
};

export default function FormationsCourtes() {
  const byDomaine = formationsCourtes.reduce<
    Record<string, typeof formationsCourtes>
  >((acc, f) => {
    if (!acc[f.domaine]) acc[f.domaine] = [];
    acc[f.domaine].push(f);
    return acc;
  }, {});

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHeader
          eyebrow="FORMATIONS COURTES"
          title="Perfectionnement professionnel ciblé"
          subtitle="Des modules de 2 à 5 jours pour approfondir une compétence précise, ancrés dans les standards industriels internationaux."
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Formations", href: "/formations" },
            { label: "Formations courtes" },
          ]}
        />

        {/* ── Intro strip ──────────────────────────────────── */}
        <section aria-label="À qui s'adressent ces formations" className="bg-soga-sand border-b border-soga-line">
          <div className="container-soga py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  titre: "Professionnels en poste",
                  texte: "Actualiser ses compétences ou se spécialiser rapidement, sans quitter son emploi.",
                },
                {
                  titre: "Diplômés récents",
                  texte: "Compléter une formation initiale par un module reconnu par l'industrie.",
                },
                {
                  titre: "Entreprises",
                  texte: "Former vos équipes sur site ou dans nos locaux — devis sur demande.",
                },
              ].map((item) => (
                <div
                  key={item.titre}
                  className="border-t-2 pt-4"
                  style={{ borderColor: "#C9962C" }}
                >
                  <h2
                    className="font-display font-semibold text-soga-ink mb-2"
                    style={{ fontSize: "17px" }}
                  >
                    {item.titre}
                  </h2>
                  <p className="text-[14px] text-soga-muted leading-relaxed">{item.texte}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Catalogue ────────────────────────────────────── */}
        <section aria-labelledby="catalogue-title" className="section-gap bg-soga-sand">
          <div className="container-soga">
            <h2 id="catalogue-title" className="sr-only">
              Catalogue des formations courtes
            </h2>

            {/* All modules — simple grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {formationsCourtes.map((f) => {
                const badgeBg = DOMAINE_COLORS[f.domaine] ?? "#3d4148";
                return (
                  <div
                    key={f.id}
                    className="bg-white border border-soga-line rounded-lg p-6 flex flex-col gap-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className="text-eyebrow text-white px-2 py-1 rounded shrink-0"
                        style={{ backgroundColor: badgeBg, fontSize: "11px" }}
                      >
                        {f.domaine.toUpperCase()}
                      </span>
                      <span
                        className="text-eyebrow shrink-0"
                        style={{ color: "#8C6516", fontSize: "11px" }}
                      >
                        {f.duree.toUpperCase()}
                      </span>
                    </div>
                    <h3
                      className="font-display font-semibold text-soga-ink leading-snug"
                      style={{ fontSize: "18px" }}
                    >
                      {f.titre}
                    </h3>
                    <p className="text-[14px] text-soga-muted leading-relaxed flex-1">
                      {f.description}
                    </p>
                    <Link
                      href="/contact"
                      className="text-[14px] font-semibold text-soga-gold-deep border-b border-soga-gold-deep hover:border-soga-gold hover:text-soga-gold transition-colors w-fit focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
                    >
                      Renseignements →
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* By domaine summary */}
            <div className="mt-16 border-t border-soga-line pt-12">
              <p className="text-eyebrow text-soga-gold-deep mb-6">PAR DOMAINE</p>
              <div className="flex flex-wrap gap-4">
                {Object.entries(byDomaine).map(([domaine, modules]) => (
                  <div
                    key={domaine}
                    className="flex items-center gap-2 px-4 py-2 border border-soga-line bg-white rounded"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: DOMAINE_COLORS[domaine] ?? "#3d4148" }}
                      aria-hidden
                    />
                    <span className="text-[14px] font-medium text-soga-ink">{domaine}</span>
                    <span className="text-eyebrow text-soga-muted" style={{ fontSize: "11px" }}>
                      {modules.length} module{modules.length > 1 ? "s" : ""}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA formation sur mesure ─────────────────────── */}
        <section
          aria-labelledby="intra-title"
          className="section-gap"
          style={{ backgroundColor: "#0B0C0E" }}
        >
          <div className="container-soga max-w-3xl">
            <p className="text-eyebrow text-soga-gold mb-4">FORMATION INTRA-ENTREPRISE</p>
            <h2
              id="intra-title"
              className="font-display font-semibold text-white mb-6"
              style={{ fontSize: "clamp(26px,2.5vw,36px)" }}
            >
              Un programme sur mesure pour votre équipe
            </h2>
            <p className="text-lead mb-8" style={{ color: "#D8D4C8" }}>
              SOGA conçoit des formations courtes adaptées aux besoins spécifiques de votre
              organisation — dispensées sur vos sites ou dans nos laboratoires à Dakar.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 text-[15px] font-semibold transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 min-h-[44px]"
              style={{ backgroundColor: "#C9962C", color: "#0B0C0E" }}
            >
              Demander un devis
            </Link>
          </div>
        </section>

        {/* ── Retour catalogue ──────────────────────────────── */}
        <div className="container-soga py-8 bg-soga-sand">
          <Link
            href="/formations"
            className="text-[14px] font-semibold text-soga-gold-deep border-b border-soga-gold-deep hover:border-soga-gold hover:text-soga-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
          >
            ← Voir toutes les formations diplômantes
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
