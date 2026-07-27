"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { formations } from "@/data/formations";

const ETAPES = [
  { num: 1, titre: "Identité" },
  { num: 2, titre: "Parcours scolaire" },
  { num: 3, titre: "Choix de formation" },
  { num: 4, titre: "Documents" },
  { num: 5, titre: "Récapitulatif" },
];

const DIPLOMES = [
  { value: "bac", label: "Baccalauréat" },
  { value: "bts", label: "BTS / DTS" },
  { value: "licence", label: "Licence" },
  { value: "master", label: "Master" },
  { value: "autre", label: "Autre" },
];

const RYTHMES = [
  { value: "temps-plein", label: "Temps plein" },
  { value: "alternance", label: "Alternance" },
];

const DOCUMENTS = [
  { label: "Relevé de notes du dernier diplôme", required: true },
  { label: "Diplôme ou attestation de réussite", required: true },
  { label: "Pièce d'identité (CNI ou passeport)", required: true },
  { label: "CV (si applicable)", required: false },
];

export default function CandidaturePage() {
  const [etape, setEtape] = useState(1);
  const [formationChoisie, setFormationChoisie] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);
  const stepRef = useRef<HTMLDivElement>(null);

  const validateStep = (): boolean => {
    const inputs = stepRef.current?.querySelectorAll<HTMLInputElement | HTMLSelectElement>("[required]") ?? [];
    const empty = Array.from(inputs).find((el) => {
      if (el instanceof HTMLInputElement && el.type === "checkbox") return !el.checked;
      return !el.value.trim();
    });
    if (empty) {
      setStepError("Veuillez remplir tous les champs obligatoires avant de continuer.");
      (empty as HTMLElement).focus();
      return false;
    }
    if (etape === 3 && !formationChoisie) {
      setStepError("Veuillez sélectionner une filière avant de continuer.");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setStepError(null);
    if (!validateStep()) return;
    setEtape((e) => Math.min(ETAPES.length, e + 1));
  };

  const handleSubmitFinal = () => {
    setStepError(null);
    if (!validateStep()) return;
    setSubmitted(true);
  };

  const handlePrev = () => {
    setStepError(null);
    setEtape((e) => Math.max(1, e - 1));
  };

  if (submitted) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-soga-sand px-6"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <div className="max-w-md text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "rgba(201,150,44,0.12)" }}
            aria-hidden="true"
          >
            <span className="text-soga-gold text-2xl">✓</span>
          </div>
          <h1 className="font-display font-semibold text-[28px] text-soga-ink mb-3">
            Candidature soumise !
          </h1>
          <p className="text-body text-soga-muted mb-8">
            Votre dossier a été enregistré. Vous recevrez une confirmation par
            e-mail dans les 24h. Notre comité vous répondra sous 10 jours ouvrés.
          </p>
          <Link
            href="/admissions"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-[15px] font-semibold text-soga-ink hover:opacity-80 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 min-h-[44px]"
            style={{ backgroundColor: "#C9962C" }}
          >
            Retour aux admissions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col bg-soga-sand"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {/* Minimal header */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-6 md:px-16 h-14 bg-soga-black"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <Link
          href="/"
          className="text-white font-bold tracking-wide text-[15px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
        >
          SOGA
        </Link>
        <span className="text-eyebrow text-white/40 text-[11px] hidden sm:block">
          CANDIDATURE EN COURS
        </span>
        <Link
          href="/admissions"
          className="text-[14px] text-white/60 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
        >
          Quitter
        </Link>
      </header>

      <main id="main-content" className="flex-1 max-w-3xl w-full mx-auto px-5 md:px-8 py-10">
        {/* Progress bars */}
        <div
          className="flex gap-1.5 mb-8"
          role="progressbar"
          aria-valuenow={etape}
          aria-valuemin={1}
          aria-valuemax={ETAPES.length}
          aria-label={`Étape ${etape} sur ${ETAPES.length}`}
        >
          {ETAPES.map((e) => (
            <div
              key={e.num}
              className="flex-1 rounded-sm transition-colors duration-300"
              style={{
                height: "6px",
                backgroundColor: e.num <= etape ? "#C9962C" : "#E2DED5",
              }}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Step label */}
        <p className="text-eyebrow text-soga-gold-deep mb-2">
          ÉTAPE {etape} / {ETAPES.length}
        </p>
        <h1 className="font-display font-semibold text-[clamp(24px,4vw,34px)] text-soga-ink mb-10">
          {ETAPES[etape - 1].titre}
        </h1>

        {/* ── Step panels ─────────────────────────────────── */}
        <div ref={stepRef}>

        {etape === 1 && (
          <fieldset className="border-0 p-0 m-0">
            <legend className="sr-only">Identité</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <Field label="Prénom" id="prenom" required placeholder="Ex : Aminata" />
              <Field label="Nom" id="nom" required placeholder="Ex : Diallo" />
              <Field
                label="Date de naissance"
                id="naissance"
                type="date"
                required
              />
              <Field
                label="Nationalité"
                id="nationalite"
                required
                placeholder="Ex : Sénégalaise"
              />
              <Field
                label="Adresse e-mail"
                id="email"
                type="email"
                required
                placeholder="vous@exemple.com"
                className="sm:col-span-2"
              />
              <Field
                label="Téléphone"
                id="tel"
                type="tel"
                required
                placeholder="+221 7X XXX XX XX"
                className="sm:col-span-2"
              />
            </div>
          </fieldset>
        )}

        {etape === 2 && (
          <fieldset className="border-0 p-0 m-0">
            <legend className="sr-only">Parcours scolaire</legend>
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="diplome"
                    className="text-small font-medium text-soga-ink block mb-1.5"
                  >
                    Dernier diplôme obtenu <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="diplome"
                    required
                    className="w-full px-4 py-3 border border-soga-line text-[14px] text-soga-ink bg-white focus:border-soga-gold focus:outline-none focus:ring-2 focus:ring-soga-gold/20 transition-colors"
                  >
                    <option value="">Sélectionnez</option>
                    {DIPLOMES.map((d) => (
                      <option key={d.value} value={d.value}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>
                <Field
                  label="Année d'obtention"
                  id="annee"
                  type="number"
                  required
                  placeholder="2024"
                />
              </div>
              <Field
                label="Établissement"
                id="etablissement"
                placeholder="Nom de l'établissement"
              />
              <Field
                label="Mention / moyenne"
                id="mention"
                placeholder="Ex. Assez bien — 13,5/20"
                hint="Optionnel — renforce votre dossier"
              />
            </div>
          </fieldset>
        )}

        {etape === 3 && (
          <fieldset className="border-0 p-0 m-0">
            <legend className="sr-only">Choix de formation</legend>
            <div className="space-y-8">
              {/* Visual card grid */}
              <div>
                <p className="text-small font-medium text-soga-ink mb-3">
                  Filière souhaitée <span className="text-red-500">*</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {formations.map((f) => (
                    <button
                      key={f.slug}
                      type="button"
                      onClick={() => setFormationChoisie(f.slug)}
                      aria-pressed={formationChoisie === f.slug}
                      className="text-left rounded-md p-4 border-2 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
                      style={{
                        borderColor:
                          formationChoisie === f.slug ? "#C9962C" : "#E2DED5",
                        backgroundColor:
                          formationChoisie === f.slug
                            ? "rgba(201,150,44,0.06)"
                            : "#fff",
                      }}
                    >
                      <span
                        className="text-eyebrow text-[10px] px-1.5 py-0.5 font-semibold mb-2 inline-block"
                        style={{ backgroundColor: "#0D2B3E", color: "#fff" }}
                      >
                        {f.niveau}
                      </span>
                      <p className="font-display font-semibold text-[14px] text-soga-ink leading-snug mt-2">
                        {f.titre}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Rythme */}
              <div>
                <label
                  htmlFor="rythme"
                  className="text-small font-medium text-soga-ink block mb-1.5"
                >
                  Rythme souhaité
                </label>
                <select
                  id="rythme"
                  className="w-full max-w-xs px-4 py-3 border border-soga-line text-[14px] text-soga-ink bg-white focus:border-soga-gold focus:outline-none focus:ring-2 focus:ring-soga-gold/20 transition-colors"
                >
                  {RYTHMES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Vœu secondaire */}
              <div>
                <label
                  htmlFor="voeu2"
                  className="text-small font-medium text-soga-ink block mb-1.5"
                >
                  Vœu secondaire{" "}
                  <span className="text-soga-muted font-normal">(optionnel)</span>
                </label>
                <select
                  id="voeu2"
                  className="w-full max-w-xs px-4 py-3 border border-soga-line text-[14px] text-soga-ink bg-white focus:border-soga-gold focus:outline-none focus:ring-2 focus:ring-soga-gold/20 transition-colors"
                >
                  <option value="">— Aucun —</option>
                  {formations.map((f) => (
                    <option key={f.slug} value={f.slug}>
                      {f.titre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>
        )}

        {etape === 4 && (
          <fieldset className="border-0 p-0 m-0">
            <legend className="sr-only">Pièces justificatives</legend>
            <div className="space-y-5">
              {DOCUMENTS.map((doc) => (
                <div key={doc.label}>
                  <label className="text-small font-medium text-soga-ink block mb-1.5">
                    {doc.label}
                    {doc.required && (
                      <span className="text-red-500 ml-0.5">*</span>
                    )}
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    required={doc.required}
                    className="block w-full text-small text-soga-muted file:mr-4 file:py-2.5 file:px-4 file:border file:border-soga-line file:text-soga-ink file:bg-soga-sand file:text-[13px] file:cursor-pointer hover:file:border-soga-gold transition-colors"
                  />
                  <p className="text-eyebrow text-soga-muted mt-1 text-[10px]">
                    PDF, JPG ou PNG · 5 Mo max
                  </p>
                </div>
              ))}
            </div>
          </fieldset>
        )}

        {etape === 5 && (
          <div>
            <div
              className="rounded-md border border-soga-line p-5 mb-8"
              style={{ backgroundColor: "rgba(201,150,44,0.04)" }}
            >
              <p className="text-eyebrow text-soga-muted mb-3">RÉCAPITULATIF</p>
              <p className="text-small text-soga-muted">
                Vérifiez vos informations avant de soumettre votre candidature. Vous
                recevrez une confirmation par e-mail dans les 24h.
              </p>
              {formationChoisie && (
                <p className="text-body text-soga-ink mt-4">
                  Formation sélectionnée :{" "}
                  <strong>
                    {formations.find((f) => f.slug === formationChoisie)?.titre}
                  </strong>
                </p>
              )}
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" required className="mt-1 w-4 h-4" />
              <span className="text-small text-soga-ink leading-relaxed">
                J&apos;atteste que les informations fournies sont exactes et
                j&apos;accepte les conditions d&apos;utilisation de SOGA.
              </span>
            </label>
          </div>
        )}

        </div>{/* end stepRef */}

        {/* Step error */}
        {stepError && (
          <div
            role="alert"
            className="flex items-start gap-3 px-4 py-3 mt-6 border border-red-200 bg-red-50 text-[13px] text-red-700"
          >
            <span aria-hidden="true" className="shrink-0 mt-0.5">⚠</span>
            {stepError}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-10 mt-10 border-t border-soga-line">
          <button
            type="button"
            onClick={handlePrev}
            disabled={etape === 1}
            className="px-6 py-3 text-[14px] font-semibold border border-soga-ink text-soga-ink disabled:opacity-30 disabled:cursor-not-allowed hover:bg-soga-ink/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 min-h-[44px]"
          >
            ← Précédent
          </button>

          {etape < ETAPES.length ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-3 text-[14px] font-semibold text-soga-ink transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 min-h-[44px]"
              style={{ backgroundColor: "#C9962C" }}
            >
              Continuer →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmitFinal}
              className="px-6 py-3 text-[14px] font-semibold text-soga-ink transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 min-h-[44px]"
              style={{ backgroundColor: "#C9962C" }}
            >
              Soumettre ma candidature
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

/* ── Field helper ─────────────────────────────────── */
function Field({
  label,
  id,
  type = "text",
  required,
  placeholder,
  hint,
  className = "",
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="text-small font-medium text-soga-ink block mb-1.5"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-soga-line text-[14px] text-soga-ink bg-white focus:border-soga-gold focus:outline-none focus:ring-2 focus:ring-soga-gold/20 transition-colors"
      />
      {hint && (
        <p className="text-eyebrow text-soga-muted mt-1.5 text-[10px]">{hint}</p>
      )}
    </div>
  );
}
