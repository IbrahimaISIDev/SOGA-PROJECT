import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import ScrollReveal from "@/components/home/ScrollReveal";
import { StratigraphicSeparator } from "@/components/signature/StratigraphicColumn";
import { partenaires, temoignages, type CategoriePartenaire } from "@/data/ecosysteme";

export const metadata = {
  title: "Écosystème SOGA",
};

const categories: CategoriePartenaire[] = [
  "Industrie pétrolière & gazière",
  "Énergies renouvelables",
  "Institutions financières",
  "Universités & centres de recherche",
  "Agences gouvernementales",
];

export default function EcosystemePage() {
  return (
    <>
      <Header variant="dark" />
      <main id="main-content">
        <PageHeader
          eyebrow="ÉCOSYSTÈME"
          title="Partenaires & Alumni"
          subtitle="Un réseau d'excellence au service de l'insertion professionnelle."
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Écosystème" },
          ]}
        />

        {/* Partenaires par catégorie */}
        {categories.map((cat, ci) => {
          const filtered = partenaires.filter((p) => p.categorie === cat);
          if (!filtered.length) return null;
          return (
            <section key={cat} aria-labelledby={`cat-${ci}`} className="section-gap bg-soga-sand">
              <div className="container-soga">
                <ScrollReveal>
                  <p className="text-eyebrow text-soga-muted mb-2">{`0${ci + 1}`}</p>
                  <h2 id={`cat-${ci}`} className="text-h2 text-soga-ink mb-8">{cat}</h2>
                </ScrollReveal>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {filtered.map((p, i) => (
                    <ScrollReveal key={p.id} delay={i * 50}>
                      <div className="aspect-[3/2] bg-white border border-soga-line rounded-md flex items-center justify-center p-4">
                        {p.logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.logo} alt={`Logo ${p.nom}`} className="max-h-12 max-w-full object-contain" />
                        ) : (
                          <div className="text-center">
                            <p className="text-small font-medium text-soga-ink">{p.nom}</p>
                            {p.description && (
                              <p className="text-eyebrow text-soga-muted mt-1">{p.description}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
                {ci < categories.length - 1 && (
                  <StratigraphicSeparator className="mt-16" />
                )}
              </div>
            </section>
          );
        })}

        {/* Témoignages alumni */}
        <section aria-labelledby="temoignages-title" className="section-gap bg-soga-black">
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-gold mb-4">ALUMNI</p>
              <h2 id="temoignages-title" className="text-h2 text-white mb-10">
                Ils ont étudié à SOGA.
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {temoignages.map((t, i) => (
                <ScrollReveal key={t.id} delay={i * 80}>
                  <figure className="bg-soga-graphite rounded-md p-6 border border-soga-graphite">
                    <blockquote>
                      <p className="text-lead text-white/80 italic">&ldquo;{t.texte}&rdquo;</p>
                    </blockquote>
                    <figcaption className="mt-5 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-soga-black shrink-0">
                        {t.photo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={t.photo} alt={t.auteur} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full placeholder-block" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white text-small">{t.auteur}</p>
                        <p className="text-eyebrow text-soga-muted">{t.titre} · {t.promotion}</p>
                      </div>
                    </figcaption>
                  </figure>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Devenir partenaire */}
        <section aria-labelledby="partenariat-title" className="section-gap bg-soga-petrol text-center">
          <div className="container-soga max-w-2xl mx-auto">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-gold mb-4">REJOIGNEZ L&apos;ÉCOSYSTÈME</p>
              <h2 id="partenariat-title" className="text-h2 text-white mb-6">
                Devenir partenaire de SOGA.
              </h2>
              <p className="text-lead text-white/70 mb-8">
                Accueillez des stagiaires, participez aux programmes pédagogiques, accédez aux
                publications du Think Tank et contribuez à former les professionnels de l&apos;énergie africaine.
              </p>
              <a
                href="mailto:direction@senegaloilandgasacademy.com"
                className="inline-flex items-center gap-2 px-8 py-4 border border-soga-gold text-soga-gold-light text-[15px] font-medium hover:bg-soga-graphite transition-colors min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
              >
                Nous contacter
              </a>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
