import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import ScrollReveal from "@/components/home/ScrollReveal";
import { StratigraphicSeparator } from "@/components/signature/StratigraphicColumn";
import { institution } from "@/data/institution";

export const metadata: Metadata = {
  title: `Mot de la Fondatrice — SOGA`,
  description: `${institution.fondatrice.nom}, ${institution.fondatrice.titre} de la Senegal Oil and Gas Academy.`,
};

export default function FondatricePage() {
  const { fondatrice } = institution;

  return (
    <>
      <Header />
      <main id="main-content">
        <PageHeader
          eyebrow="Institution"
          title="Mot de la Fondatrice"
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Institution", href: "/institution" },
            { label: "Mot de la Fondatrice" },
          ]}
        />

        <section className="section-gap bg-soga-black">
          <div className="container-soga">
            <div className="grid grid-cols-1 lg:grid-cols-[440px_1fr] gap-14 lg:gap-20 items-start">
              {/* Portrait */}
              <ScrollReveal>
                <div className="flex flex-col items-center lg:items-start gap-5">
                  <div
                    className="relative w-[280px] h-[280px] lg:w-[360px] lg:h-[360px] rounded-full overflow-hidden placeholder-block mx-auto lg:mx-0 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {fondatrice.portrait ? (
                      <Image
                        src={fondatrice.portrait}
                        alt={fondatrice.nom}
                        fill
                        sizes="(min-width: 1024px) 360px, 280px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-eyebrow text-white/30 text-center px-4">
                        Portrait à venir
                      </span>
                    )}
                  </div>
                  <div className="text-center lg:text-left">
                    <p className="text-white font-semibold text-[17px]">{fondatrice.nom}</p>
                    <p className="text-eyebrow text-soga-gold mt-1">{fondatrice.qualifications}</p>
                    <p className="text-small text-white/50 mt-0.5">{fondatrice.titre}</p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Content */}
              <div>
                {/* Citation */}
                <ScrollReveal delay={60}>
                  <blockquote className="mb-10">
                    <p
                      className="font-display text-[clamp(20px,2.8vw,30px)] font-semibold leading-[1.3] text-white italic"
                    >
                      {fondatrice.citation}
                    </p>
                    <footer className="mt-5">
                      <cite className="not-italic text-eyebrow text-soga-gold">
                        — {fondatrice.nom}, {fondatrice.titre}
                      </cite>
                    </footer>
                  </blockquote>
                </ScrollReveal>

                <StratigraphicSeparator className="mb-10 opacity-30" />

                {/* Bio */}
                <div className="space-y-5">
                  {fondatrice.biographie.map((para, i) => (
                    <ScrollReveal key={i} delay={80 + i * 60}>
                      <p className="text-body text-white/75 leading-relaxed">{para}</p>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
