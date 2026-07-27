import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import ScrollReveal from "@/components/home/ScrollReveal";
import ContactForm from "@/components/contact/ContactForm";
import { institution } from "@/data/institution";

export const metadata: Metadata = {
  title: "Contact — SOGA",
  description:
    "Contactez la Senegal Oil and Gas Academy : admissions, partenariats, presse ou toute autre demande.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <PageHeader
          eyebrow="CONTACT"
          title="Contact"
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Contact" },
          ]}
        />

        <section className="section-gap bg-soga-sand">
          <div className="container-soga">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
              {/* ── Formulaire (gauche) ─────────────────────── */}
              <ScrollReveal>
                <p className="text-eyebrow text-soga-gold-deep mb-6">ÉCRIVEZ-NOUS</p>
                <ContactForm />
              </ScrollReveal>

              {/* ── Coordonnées + carte (droite) ────────────── */}
              <ScrollReveal delay={80}>
                <p className="text-eyebrow text-soga-gold-deep mb-6">COORDONNÉES</p>

                <address className="not-italic space-y-5 mb-10">
                  <div>
                    <p className="text-small font-semibold text-soga-ink mb-1">Adresse</p>
                    <p className="text-body text-soga-graphite">{institution.adresse}</p>
                  </div>
                  <div>
                    <p className="text-small font-semibold text-soga-ink mb-1">E-mail</p>
                    <a
                      href={`mailto:${institution.email}`}
                      className="text-body text-soga-gold-deep hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
                    >
                      {institution.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-small font-semibold text-soga-ink mb-1">Téléphone</p>
                    <a
                      href={`tel:${institution.telephone.replace(/\s/g, "")}`}
                      className="text-body text-soga-graphite hover:text-soga-gold-deep transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
                    >
                      {institution.telephone}
                    </a>
                  </div>
                </address>

                <div className="mb-8">
                  <p className="text-eyebrow text-soga-gold-deep mb-3">HORAIRES</p>
                  <p className="text-body text-soga-graphite">
                    Lundi – Vendredi · 8h30 – 17h30
                  </p>
                </div>

                {/* Map placeholder */}
                <div
                  className="overflow-hidden"
                  style={{ height: "220px" }}
                  aria-label="Carte de localisation — à venir"
                >
                  <div className="w-full h-full placeholder-block flex items-end p-4">
                    <span className="text-eyebrow text-soga-line/50 text-[10px]">
                      CARTE — PLACEHOLDER GOOGLE MAPS
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Autres contacts */}
        <section aria-labelledby="autres-contacts-title" className="section-gap bg-soga-ink">
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-gold mb-6">SERVICES</p>
              <h2 id="autres-contacts-title" className="text-h2 text-white mb-10">
                Autres contacts
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  label: "Admissions",
                  desc: "Candidatures, dossiers, entretiens.",
                  email: institution.email,
                },
                {
                  label: "Partenariats",
                  desc: "Accueil de stagiaires, collaborations industrielles.",
                  email: institution.email,
                },
                {
                  label: "Presse",
                  desc: "Demandes d'interview et dossier de presse.",
                  email: institution.email,
                },
              ].map((s, i) => (
                <ScrollReveal key={s.label} delay={i * 70}>
                  <div
                    className="border p-6"
                    style={{ borderColor: "rgba(255,255,255,0.1)" }}
                  >
                    <p className="text-eyebrow text-soga-gold mb-2">{s.label.toUpperCase()}</p>
                    <p className="text-small text-white/60 mb-4 leading-relaxed">{s.desc}</p>
                    <a
                      href={`mailto:${s.email}`}
                      className="text-small font-medium text-soga-gold-light hover:text-soga-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
                    >
                      {s.email}
                    </a>
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
