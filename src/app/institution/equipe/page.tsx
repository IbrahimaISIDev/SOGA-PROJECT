import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import ScrollReveal from "@/components/home/ScrollReveal";
import { StratigraphicSeparator } from "@/components/signature/StratigraphicColumn";
import { institution } from "@/data/institution";

export const metadata: Metadata = {
  title: "Gouvernance & Équipe — SOGA",
  description:
    "Découvrez l'équipe dirigeante et les membres de la Senegal Oil and Gas Academy.",
};

export default function EquipePage() {
  const { organigramme, fondatrice } = institution;
  const equipe = institution.equipe.filter((m) => m.nom !== "Contenu provisoire");

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHeader
          eyebrow="Institution"
          title="Gouvernance & Équipe"
          subtitle="Les femmes et hommes qui construisent SOGA."
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Institution", href: "/institution" },
            { label: "Équipe" },
          ]}
          variant="dark"
        />

        {/* Organigramme */}
        <section
          aria-labelledby="orga-title"
          className="section-gap"
          style={{ backgroundColor: "#0D2B3E" }}
        >
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-gold mb-6">STRUCTURE</p>
            </ScrollReveal>
            <ScrollReveal delay={60}>
              <h2 id="orga-title" className="text-h2 text-white mb-14">
                Organigramme
              </h2>
            </ScrollReveal>

            {/* Fondatrice */}
            <div className="flex flex-col items-center gap-0">
              <ScrollReveal>
                <div
                  className="px-8 py-4 border-2 text-center min-w-[260px]"
                  style={{ borderColor: "#C9962C", backgroundColor: "rgba(201,150,44,0.08)" }}
                >
                  <p className="text-eyebrow text-soga-gold mb-1">FONDATRICE</p>
                  <p className="text-white font-semibold text-[15px]">{fondatrice.nom}</p>
                  <p className="text-small text-white/50 mt-0.5">{fondatrice.titre}</p>
                </div>
              </ScrollReveal>

              {/* Vertical connector */}
              <div className="w-px h-10 bg-white/20" aria-hidden="true" />

              {/* Directions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 relative w-full max-w-3xl">
                {/* Horizontal bar */}
                <div
                  className="absolute top-0 left-1/6 right-1/6 h-px bg-white/20 hidden sm:block"
                  aria-hidden="true"
                />
                {organigramme
                  .filter((o) => o.niveau === 1)
                  .map((org, i) => (
                    <div key={org.label} className="flex flex-col items-center">
                      <div
                        className="w-px h-10 bg-white/20"
                        aria-hidden="true"
                        style={{ marginTop: i === 1 ? 0 : 0 }}
                      />
                      <ScrollReveal delay={i * 80}>
                        <div
                          className="px-6 py-3.5 border text-center min-w-[200px]"
                          style={{
                            borderColor: "rgba(255,255,255,0.15)",
                            backgroundColor: "rgba(255,255,255,0.04)",
                          }}
                        >
                          <p className="text-white/80 text-[14px] font-medium">{org.label}</p>
                        </div>
                      </ScrollReveal>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>

        <StratigraphicSeparator />

        {/* Équipe grid */}
        <section aria-labelledby="team-title" className="section-gap bg-soga-black">
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-gold mb-6">L&apos;ÉQUIPE</p>
            </ScrollReveal>
            <ScrollReveal delay={60}>
              <h2 id="team-title" className="text-h2 text-white mb-12">
                Nos membres
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Fondatrice card */}
              <ScrollReveal delay={0}>
                <article className="group text-center">
                  <div
                    className="relative w-[88px] h-[88px] rounded-full overflow-hidden mx-auto mb-4 placeholder-block flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {fondatrice.portrait ? (
                      <Image src={fondatrice.portrait} alt="" fill sizes="88px" className="object-cover" />
                    ) : null}
                  </div>
                  <p className="text-eyebrow text-soga-gold mb-1 text-[11px]">FONDATRICE</p>
                  <Link
                    href="/institution/fondatrice"
                    className="text-white font-semibold text-[15px] hover:text-white/70 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soga-gold"
                  >
                    {fondatrice.nom}
                  </Link>
                  <p className="text-small text-white/50 mt-1">{fondatrice.qualifications}</p>
                </article>
              </ScrollReveal>

              {/* Team members */}
              {equipe.length === 0 && (
                <article className="text-center sm:col-span-2 lg:col-span-3 flex items-center justify-center">
                  <p className="text-small text-white/40">
                    La composition complète de l&apos;équipe sera publiée prochainement.
                  </p>
                </article>
              )}
              {equipe.map((membre, i) => (
                <ScrollReveal key={membre.id} delay={(i + 1) * 70}>
                  <article className="group text-center">
                    <div
                      className="relative w-[88px] h-[88px] rounded-full overflow-hidden mx-auto mb-4 placeholder-block flex items-center justify-center"
                      aria-hidden="true"
                    >
                      {membre.portrait ? (
                        <Image src={membre.portrait} alt="" fill sizes="88px" className="object-cover" />
                      ) : null}
                    </div>
                    <p className="text-eyebrow text-soga-gold mb-1 text-[11px]">
                      {membre.specialite.toUpperCase()}
                    </p>
                    <Link
                      href={`/institution/equipe/${membre.slug}`}
                      className="text-white font-semibold text-[15px] hover:text-white/70 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soga-gold"
                    >
                      {membre.nom}
                    </Link>
                    <p className="text-small text-white/50 mt-1">{membre.titre}</p>
                  </article>
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
