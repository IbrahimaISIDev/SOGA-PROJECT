"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import ScrollReveal from "@/components/home/ScrollReveal";
import { Input, Select, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ContactPage() {
  return (
    <>
      <Header variant="dark" />
      <main id="main-content">
        <PageHeader
          eyebrow="CONTACT"
          title="Nous contacter"
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Contact" },
          ]}
        />

        <section className="section-gap bg-soga-sand">
          <div className="container-soga">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Infos */}
              <ScrollReveal>
                <h2 className="text-h2 text-soga-ink mb-8">Coordonnées</h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-eyebrow text-soga-muted mb-1">ADRESSE</p>
                    <p className="text-body text-soga-ink">Dakar, Sénégal</p>
                  </div>
                  <div>
                    <p className="text-eyebrow text-soga-muted mb-1">E-MAIL</p>
                    <a
                      href="mailto:direction@senegaloilandgasacademy.com"
                      className="text-body text-soga-gold-deep hover:underline underline-offset-4"
                    >
                      direction@senegaloilandgasacademy.com
                    </a>
                  </div>
                  <div>
                    <p className="text-eyebrow text-soga-muted mb-1">TÉLÉPHONE</p>
                    <a
                      href="tel:+221781032370"
                      className="text-body text-soga-ink hover:text-soga-gold-deep transition-colors"
                    >
                      +221 78 103 23 70
                    </a>
                  </div>
                </div>

                {/* Carte placeholder */}
                <div className="mt-10 aspect-[4/3] bg-soga-graphite rounded-md overflow-hidden">
                  <div className="w-full h-full placeholder-block-light flex items-center justify-center">
                    <span className="text-eyebrow text-soga-muted">Carte — Contenu provisoire</span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Formulaire */}
              <ScrollReveal delay={80}>
                <h2 className="text-h2 text-soga-ink mb-8">Envoyer un message</h2>
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Prénom" required placeholder="Votre prénom" />
                    <Input label="Nom" required placeholder="Votre nom" />
                  </div>
                  <Input label="E-mail" type="email" required placeholder="vous@exemple.com" />
                  <Select
                    label="Objet"
                    required
                    options={[
                      { value: "admissions", label: "Admissions" },
                      { value: "formations", label: "Informations sur les formations" },
                      { value: "partenariat", label: "Partenariat" },
                      { value: "presse", label: "Presse" },
                      { value: "autre", label: "Autre" },
                    ]}
                    placeholder="Sélectionnez un objet"
                  />
                  <Textarea
                    label="Message"
                    required
                    rows={5}
                    placeholder="Votre message..."
                  />
                  <Button variant="primary" size="lg" className="w-full justify-center" type="submit">
                    Envoyer le message
                  </Button>
                </form>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
