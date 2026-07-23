"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import ScrollReveal from "@/components/home/ScrollReveal";
import { StratigraphicSeparator } from "@/components/signature/StratigraphicColumn";
import { Input, Select, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const ETAPES = [
  { num: 1, titre: "Vos informations" },
  { num: 2, titre: "Formation souhaitée" },
  { num: 3, titre: "Parcours académique" },
  { num: 4, titre: "Documents" },
  { num: 5, titre: "Révision & envoi" },
];

const PROCESSUS = [
  { num: "01", titre: "Candidature en ligne", desc: "Remplissez le formulaire et joignez vos documents." },
  { num: "02", titre: "Étude du dossier", desc: "Notre comité examine votre dossier sous 10 jours ouvrés." },
  { num: "03", titre: "Entretien de motivation", desc: "Un entretien avec l'équipe pédagogique (présentiel ou visio)." },
  { num: "04", titre: "Décision d'admission", desc: "Vous recevez une réponse par e-mail avec les modalités d'inscription." },
  { num: "05", titre: "Inscription définitive", desc: "Réglez les frais d'inscription et confirmez votre place." },
];

const formationsOptions = [
  { value: "genie-petrolier", label: "Génie Pétrolier — Licence Pro" },
  { value: "genie-gaz", label: "Génie du Gaz — Licence Pro" },
  { value: "energies-renouvelables", label: "Énergies Renouvelables — Licence Pro" },
  { value: "maintenance-industrielle", label: "Maintenance Industrielle — BTS" },
  { value: "hse-environnement", label: "HSE — BTS" },
  { value: "management-projets-energetiques", label: "Management des Projets Énergétiques — Master Pro" },
  { value: "economie-droit-petrole", label: "Économie et Droit du Pétrole — Licence Pro" },
  { value: "logistique-supply-chain", label: "Logistique & Supply Chain — DTS" },
];

export default function AdmissionsPage() {
  const [etape, setEtape] = useState(1);

  return (
    <>
      <Header variant="dark" />
      <main id="main-content">
        <PageHeader
          eyebrow="ADMISSIONS"
          title="Rejoindre SOGA"
          subtitle="Candidatures ouvertes pour la rentrée d'octobre 2025."
          breadcrumbs={[
            { label: "Accueil", href: "/" },
            { label: "Admissions" },
          ]}
        />

        {/* Processus */}
        <section aria-labelledby="processus-title" className="section-gap bg-soga-sand">
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-muted mb-4">PROCESSUS</p>
              <h2 id="processus-title" className="text-h2 text-soga-ink mb-12">
                Comment candidater ?
              </h2>
            </ScrollReveal>
            <ol className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
              {PROCESSUS.map((step, i) => (
                <ScrollReveal key={step.num} delay={i * 60}>
                  <li className="flex flex-col gap-3">
                    <span className="font-display text-[40px] text-soga-gold-light leading-none opacity-60">
                      {step.num}
                    </span>
                    <h3 className="text-h3 text-[18px] text-soga-ink">{step.titre}</h3>
                    <p className="text-small text-soga-muted">{step.desc}</p>
                  </li>
                </ScrollReveal>
              ))}
            </ol>
          </div>
        </section>

        <StratigraphicSeparator className="mx-16 md:mx-24" />

        {/* Assistant de candidature 5 étapes */}
        <section aria-labelledby="formulaire-title" className="section-gap bg-soga-sand">
          <div className="container-soga max-w-3xl">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-muted mb-4">DOSSIER DE CANDIDATURE</p>
              <h2 id="formulaire-title" className="text-h2 text-soga-ink mb-8">
                Déposez votre candidature.
              </h2>
            </ScrollReveal>

            {/* Stepper */}
            <div className="flex items-center gap-0 mb-10 overflow-x-auto" role="list" aria-label="Étapes de la candidature">
              {ETAPES.map((e, i) => (
                <div key={e.num} className="flex items-center shrink-0" role="listitem">
                  <button
                    onClick={() => setEtape(e.num)}
                    className={`flex flex-col items-center gap-1 px-3 min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 ${
                      etape === e.num ? "opacity-100" : "opacity-50 hover:opacity-75"
                    }`}
                    aria-current={etape === e.num ? "step" : undefined}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-medium border-2 transition-colors ${
                        etape >= e.num
                          ? "bg-soga-black border-soga-gold text-soga-gold-light"
                          : "bg-white border-soga-line text-soga-muted"
                      }`}
                    >
                      {e.num}
                    </div>
                    <span className="text-[11px] text-soga-muted hidden sm:block whitespace-nowrap">
                      {e.titre}
                    </span>
                  </button>
                  {i < ETAPES.length - 1 && (
                    <div
                      className={`h-0.5 w-8 mx-1 transition-colors ${
                        etape > e.num ? "bg-soga-gold" : "bg-soga-line"
                      }`}
                      aria-hidden
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Form panels */}
            <div className="bg-white border border-soga-line rounded-md p-6 md:p-8 space-y-6">
              {etape === 1 && (
                <fieldset>
                  <legend className="text-h3 text-soga-ink mb-6">Vos informations personnelles</legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input label="Prénom" required placeholder="Ex : Aminata" />
                    <Input label="Nom" required placeholder="Ex : Diallo" />
                    <Input label="Date de naissance" type="date" required />
                    <Input label="Nationalité" required placeholder="Ex : Sénégalaise" />
                    <Input label="Adresse e-mail" type="email" required placeholder="vous@exemple.com" className="md:col-span-2" />
                    <Input label="Téléphone" type="tel" required placeholder="+221 7X XXX XX XX" className="md:col-span-2" />
                  </div>
                </fieldset>
              )}

              {etape === 2 && (
                <fieldset>
                  <legend className="text-h3 text-soga-ink mb-6">Formation souhaitée</legend>
                  <div className="space-y-5">
                    <Select
                      label="Filière choisie"
                      required
                      options={formationsOptions}
                      placeholder="Sélectionnez une filière"
                    />
                    <Select
                      label="Mode de formation"
                      required
                      options={[
                        { value: "temps-plein", label: "Temps plein" },
                        { value: "alternance", label: "Alternance" },
                      ]}
                      placeholder="Sélectionnez un mode"
                    />
                    <Textarea
                      label="Lettre de motivation"
                      required
                      rows={6}
                      placeholder="Expliquez vos motivations pour rejoindre SOGA et cette filière..."
                      hint="500 à 800 mots recommandés"
                    />
                  </div>
                </fieldset>
              )}

              {etape === 3 && (
                <fieldset>
                  <legend className="text-h3 text-soga-ink mb-6">Parcours académique</legend>
                  <div className="space-y-5">
                    <Select
                      label="Dernier diplôme obtenu"
                      required
                      options={[
                        { value: "bac", label: "Baccalauréat" },
                        { value: "bts", label: "BTS / DTS" },
                        { value: "licence", label: "Licence" },
                        { value: "master", label: "Master" },
                        { value: "autre", label: "Autre" },
                      ]}
                      placeholder="Sélectionnez"
                    />
                    <Input label="Établissement obtenu" required placeholder="Nom de l'établissement" />
                    <Input label="Année d'obtention" required type="number" placeholder="2024" />
                    <Textarea
                      label="Expériences professionnelles (si applicable)"
                      rows={4}
                      placeholder="Listez vos expériences pertinentes..."
                    />
                  </div>
                </fieldset>
              )}

              {etape === 4 && (
                <fieldset>
                  <legend className="text-h3 text-soga-ink mb-6">Pièces justificatives</legend>
                  <div className="space-y-5">
                    {[
                      { label: "Relevé de notes du dernier diplôme", required: true },
                      { label: "Diplôme ou attestation de réussite", required: true },
                      { label: "Pièce d'identité (CNI ou passeport)", required: true },
                      { label: "CV (si applicable)", required: false },
                    ].map((doc) => (
                      <div key={doc.label}>
                        <label className="text-small font-medium text-soga-ink block mb-2">
                          {doc.label}
                          {doc.required && <span className="text-red-500 ml-0.5">*</span>}
                        </label>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          required={doc.required}
                          className="block w-full text-small text-soga-muted file:mr-4 file:py-2 file:px-4 file:border file:border-soga-line file:text-soga-ink file:bg-soga-sand file:text-[13px] file:cursor-pointer hover:file:border-soga-gold transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                </fieldset>
              )}

              {etape === 5 && (
                <div>
                  <h3 className="text-h3 text-soga-ink mb-4">Récapitulatif</h3>
                  <p className="text-body text-soga-muted mb-6">
                    Vérifiez vos informations avant de soumettre votre candidature. Vous recevrez
                    une confirmation par e-mail dans les 24h.
                  </p>
                  <div className="bg-soga-sand rounded-md p-5 border border-soga-line">
                    <p className="text-small text-soga-muted">
                      Contenu provisoire — le récapitulatif affichera les données saisies lors de l&apos;intégration backend.
                    </p>
                  </div>
                  <div className="mt-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" required className="mt-1" />
                      <span className="text-small text-soga-ink">
                        J&apos;atteste que les informations fournies sont exactes et j&apos;accepte les
                        conditions d&apos;utilisation de SOGA.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-6 border-t border-soga-line">
                <Button
                  variant="secondary"
                  onClick={() => setEtape(Math.max(1, etape - 1))}
                  disabled={etape === 1}
                >
                  Précédent
                </Button>
                {etape < 5 ? (
                  <Button
                    variant="primary"
                    onClick={() => setEtape(Math.min(5, etape + 1))}
                  >
                    Continuer
                  </Button>
                ) : (
                  <Button variant="primary">
                    Soumettre ma candidature
                  </Button>
                )}
              </div>
            </div>

            {/* Save draft */}
            <p className="text-small text-soga-muted text-center mt-4">
              Votre progression est sauvegardée automatiquement.{" "}
              <button className="underline underline-offset-2 hover:text-soga-gold-deep transition-colors">
                Reprendre plus tard
              </button>
            </p>
          </div>
        </section>

        <StratigraphicSeparator className="mx-16 md:mx-24" />

        {/* Frais & Bourses */}
        <section aria-labelledby="frais-title" className="section-gap bg-soga-black">
          <div className="container-soga">
            <ScrollReveal>
              <p className="text-eyebrow text-soga-gold mb-4">FRAIS & BOURSES</p>
              <h2 id="frais-title" className="text-h2 text-white mb-6">
                Financer sa formation.
              </h2>
              <p className="text-lead text-white/70 max-w-xl mb-8">
                Des dispositifs d&apos;aides financières sont disponibles pour les candidats méritants.
                Contactez-nous pour en savoir plus.
              </p>
              <div className="bg-soga-graphite p-6 rounded-md inline-block">
                <p className="text-small text-soga-muted">
                  Contenu provisoire — les montants exacts seront communiqués dès validation par la direction.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
