import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/home/ScrollReveal";
import { StratigraphicSeparator } from "@/components/signature/StratigraphicColumn";
import { publications, thematiques, experts } from "@/data/thinktank";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Think Tank SOGA",
};

const TT_GREEN = "#1E6F5C";

export default function ThinkTankPage() {
  return (
    <>
      <Header variant="dark" />
      <main id="main-content">
        {/* Hero Think Tank — accent vert exclusif */}
        <div className="pt-24 pb-16 md:pt-32 md:pb-20 bg-soga-black">
          <div className="container-soga">
            <nav aria-label="Fil d'Ariane" className="mb-6">
              <ol className="flex items-center gap-2 text-eyebrow text-white/40">
                <li><Link href="/" className="hover:text-white/70 transition-colors">Accueil</Link></li>
                <li aria-hidden>/</li>
                <li aria-current="page">Think Tank</li>
              </ol>
            </nav>
            <p className="text-eyebrow mb-4" style={{ color: TT_GREEN }}>
              THINK TANK SOGA
            </p>
            <h1 className="text-h1 text-white mb-6">
              La recherche appliquée au service<br />
              de l&apos;énergie africaine.
            </h1>
            <p className="text-lead text-white/70 max-w-2xl">
              Analyses indépendantes, notes de politique publique et rapports sectoriels sur
              les enjeux énergétiques, juridiques et économiques du continent africain.
            </p>
          </div>
        </div>

        <StratigraphicSeparator className="mx-16 md:mx-24" />

        {/* Thématiques */}
        <section aria-labelledby="thematiques-title" className="section-gap bg-soga-sand">
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-muted mb-4">THÉMATIQUES</p>
              <h2 id="thematiques-title" className="text-h2 text-soga-ink mb-10">
                Nos axes de recherche.
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {thematiques.map((t, i) => (
                <ScrollReveal key={t} delay={i * 50}>
                  <div
                    className="border-l-2 pl-5 py-3"
                    style={{ borderColor: TT_GREEN }}
                  >
                    <p className="text-body font-medium text-soga-ink">{t}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <StratigraphicSeparator className="mx-16 md:mx-24" />

        {/* Publications */}
        <section aria-labelledby="publications-title" className="section-gap bg-soga-sand">
          <div className="container-soga">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-eyebrow text-soga-muted mb-3">PUBLICATIONS</p>
                  <h2 id="publications-title" className="text-h2 text-soga-ink">
                    Nos dernières publications.
                  </h2>
                </div>
                <Link
                  href="/think-tank/publications"
                  className="hidden md:block text-[15px] font-medium underline underline-offset-4 decoration-soga-line transition-colors"
                  style={{ color: TT_GREEN }}
                >
                  Toutes les publications →
                </Link>
              </div>
            </ScrollReveal>
            <div className="space-y-4">
              {publications.map((pub, i) => (
                <ScrollReveal key={pub.id} delay={i * 50}>
                  <Link
                    href={`/think-tank/publications/${pub.slug}`}
                    className="group flex flex-col md:flex-row gap-5 p-6 bg-soga-surface border border-soga-line rounded-md hover:border-soga-transition transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{ "--tw-ring-color": TT_GREEN } as React.CSSProperties}
                  >
                    <div className="md:w-24 shrink-0">
                      <span
                        className="text-eyebrow text-[11px] px-2 py-1 rounded-sm border"
                        style={{ color: TT_GREEN, borderColor: TT_GREEN + "40", backgroundColor: TT_GREEN + "10" }}
                      >
                        {pub.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-small text-soga-muted mb-2">
                        {pub.thematique} · {new Date(pub.date).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                      </p>
                      <h3 className="text-h3 text-[18px] line-clamp-2 text-soga-ink mb-2 transition-colors" style={{ "--hover-color": TT_GREEN } as React.CSSProperties}>
                        {pub.titre}
                      </h3>
                      <p className="text-small text-soga-muted line-clamp-3">{pub.resume}</p>
                    </div>
                    {pub.telechargeable && (
                      <div className="md:w-32 shrink-0 flex items-start">
                        <span className="text-small font-medium" style={{ color: TT_GREEN }}>
                          Télécharger ↓
                        </span>
                      </div>
                    )}
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <StratigraphicSeparator className="mx-16 md:mx-24" />

        {/* Experts */}
        <section aria-labelledby="experts-title" className="section-gap bg-soga-black">
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow mb-4" style={{ color: TT_GREEN }}>EXPERTS</p>
              <h2 id="experts-title" className="text-h2 text-white mb-10">
                Notre équipe de recherche.
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {experts.map((expert, i) => (
                <ScrollReveal key={expert.id} delay={i * 60}>
                  <div className="flex gap-5 items-start">
                    <div className="relative w-16 h-16 rounded-sm overflow-hidden shrink-0 bg-soga-graphite">
                      {expert.portrait ? (
                        <Image src={expert.portrait} alt={`Portrait de ${expert.nom}`} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full placeholder-block" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-white">{expert.nom}</p>
                      <p className="text-small text-white/60 mt-0.5">{expert.titre}</p>
                      <span
                        className="text-eyebrow text-[11px] mt-2 inline-block"
                        style={{ color: TT_GREEN }}
                      >
                        {expert.specialite}
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
