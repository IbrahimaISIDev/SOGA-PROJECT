import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import ScrollReveal from "@/components/home/ScrollReveal";
import { StratigraphicSeparator } from "@/components/signature/StratigraphicColumn";
import { CardMembre } from "@/components/ui/Card";
import { institution } from "@/data/institution";

export const metadata = {
  title: "Institution — À propos",
};

export default function InstitutionPage() {
  return (
    <>
      <Header variant="dark" />
      <main id="main-content">
        <PageHeader
          eyebrow="À PROPOS"
          title="Qui sommes-nous"
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Institution", href: "/institution" },
            { label: "À propos" },
          ]}
        />

        {/* Mission */}
        <section aria-labelledby="mission-title" className="section-gap bg-soga-sand">
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-muted mb-4">MISSION</p>
              <h2 id="mission-title" className="text-h2 text-soga-ink mb-10">
                Notre raison d&apos;être.
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {institution.mission.map((point, i) => (
                <ScrollReveal key={i} delay={i * 50}>
                  <div className="flex gap-4 items-start">
                    <span className="text-eyebrow text-soga-gold mt-1 shrink-0">
                      0{i + 1}
                    </span>
                    <p className="text-body text-soga-ink">{point}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <StratigraphicSeparator className="mx-16 md:mx-24" />

        {/* Vision */}
        <section aria-labelledby="vision-title" className="section-gap bg-soga-black">
          <div className="container-soga max-w-3xl">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-gold mb-4">VISION</p>
              <h2 id="vision-title" className="text-h2 text-white mb-6">
                Notre ambition à l&apos;horizon 2030.
              </h2>
              <p className="text-lead text-white/80">{institution.vision}</p>
            </ScrollReveal>
          </div>
        </section>

        <StratigraphicSeparator className="mx-16 md:mx-24" />

        {/* Valeurs */}
        <section aria-labelledby="valeurs-title" className="section-gap bg-soga-sand">
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-muted mb-4">VALEURS</p>
              <h2 id="valeurs-title" className="text-h2 text-soga-ink mb-10">
                Les principes qui nous guident.
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {institution.valeurs.map((valeur, i) => (
                <ScrollReveal key={valeur.titre} delay={i * 60}>
                  <div className="border-t-2 border-soga-gold pt-5">
                    <h3 className="text-h3 text-soga-ink mb-3">{valeur.titre}</h3>
                    <p className="text-body text-soga-muted">{valeur.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <StratigraphicSeparator className="mx-16 md:mx-24" />

        {/* Mot de la fondatrice */}
        <section aria-labelledby="fondatrice-title" className="section-gap bg-soga-petrol">
          <div className="container-soga">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              <div>
                <div className="aspect-[3/4] rounded-md overflow-hidden">
                  <div className="w-full h-full placeholder-block flex items-end p-4">
                    <span className="text-eyebrow text-soga-line/60">Portrait provisoire</span>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="font-medium text-white">{institution.fondatrice.nom}</p>
                  <p className="text-small text-white/60">{institution.fondatrice.titre}</p>
                </div>
              </div>
              <div className="lg:col-span-2">
                <p className="text-eyebrow text-white/50 mb-4">MOT DE LA FONDATRICE</p>
                <h2 id="fondatrice-title" className="text-h2 text-white mb-8">
                  Un message de la direction.
                </h2>
                <p className="text-lead text-white/70">{institution.fondatrice.citation}</p>
              </div>
            </div>
          </div>
        </section>

        <StratigraphicSeparator className="mx-16 md:mx-24" />

        {/* Équipe */}
        <section aria-labelledby="equipe-title" className="section-gap bg-soga-sand">
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-muted mb-4">GOUVERNANCE & ÉQUIPE</p>
              <h2 id="equipe-title" className="text-h2 text-soga-ink mb-10">
                Nos équipes.
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {institution.equipe.map((membre, i) => (
                <ScrollReveal key={membre.id} delay={i * 60}>
                  <CardMembre membre={membre} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Campus */}
        <section aria-labelledby="campus-title" className="section-gap bg-soga-black">
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-gold mb-4">CAMPUS</p>
              <h2 id="campus-title" className="text-h2 text-white mb-6">
                Nos infrastructures à Dakar.
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <ScrollReveal delay={60}>
                <p className="text-lead text-white/70 mb-8">
                  {institution.campus.description}
                </p>
                <ul className="space-y-3">
                  {institution.campus.infrastructures.map((infra) => (
                    <li key={infra.titre} className="flex gap-3 items-start">
                      <span className="text-soga-gold shrink-0 mt-1" aria-hidden>—</span>
                      <span className="text-body text-white/80">{infra.titre}</span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
              <ScrollReveal delay={120}>
                <div className="aspect-[4/3] rounded-md overflow-hidden">
                  <div className="w-full h-full placeholder-block flex items-end p-6">
                    <span className="text-eyebrow text-soga-line/60">Photo campus provisoire</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
