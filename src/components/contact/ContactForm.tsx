"use client";

import { useState } from "react";

const MOTIFS = [
  { value: "admissions", label: "Admissions" },
  { value: "partenariat", label: "Partenariat" },
  { value: "presse", label: "Presse" },
  { value: "autre", label: "Autre" },
];

type Fields = { nom: string; email: string; motif: string; message: string };
type Errs = Partial<Record<keyof Fields, string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(d: Fields): Errs {
  const e: Errs = {};
  if (!d.nom.trim()) e.nom = "Ce champ est requis.";
  if (!d.email.trim()) e.email = "Ce champ est requis.";
  else if (!emailRe.test(d.email)) e.email = "Adresse e-mail invalide.";
  if (!d.motif) e.motif = "Veuillez sélectionner un motif.";
  if (!d.message.trim()) e.message = "Ce champ est requis.";
  else if (d.message.trim().length < 10) e.message = "Message trop court (10 caractères minimum).";
  return e;
}

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fields, setFields] = useState<Fields>({ nom: "", email: "", motif: "", message: "" });
  const [errors, setErrors] = useState<Errs>({});
  const [touched, setTouched] = useState<Set<keyof Fields>>(new Set());

  const set =
    (k: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const val = e.target.value;
      const next = { ...fields, [k]: val };
      setFields(next);
      if (touched.has(k)) setErrors(validate(next));
    };

  const blur = (k: keyof Fields) => () => {
    setTouched((prev) => new Set([...prev, k]));
    setErrors(validate(fields));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(new Set(["nom", "email", "motif", "message"] as Array<keyof Fields>));
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error("request-failed");
      setSent(true);
    } catch {
      setSubmitError("Une erreur est survenue. Veuillez réessayer dans quelques instants.");
    } finally {
      setSubmitting(false);
    }
  };

  const hasErr = (k: keyof Fields) => touched.has(k) && !!errors[k];

  const inputCls = (k: keyof Fields, extra = "") =>
    `w-full px-4 py-3 border text-[15px] text-soga-ink bg-white focus:outline-none focus:ring-2 transition-colors ${extra} ${
      hasErr(k)
        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
        : "border-soga-line focus:border-soga-gold focus:ring-soga-gold/20"
    }`;

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-4 py-6">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "rgba(201,150,44,0.12)" }}
          aria-hidden="true"
        >
          <span className="text-soga-gold">✓</span>
        </div>
        <h2 className="text-h3 text-soga-ink">Message envoyé !</h2>
        <p className="text-body text-soga-muted">
          Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.
        </p>
        <button
          onClick={() => setSent(false)}
          className="text-small font-medium text-soga-gold-deep underline underline-offset-4 hover:text-soga-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Nom */}
      <div>
        <label htmlFor="c-nom" className="text-small font-semibold text-soga-ink block mb-2">
          Nom complet <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="c-nom"
          type="text"
          value={fields.nom}
          onChange={set("nom")}
          onBlur={blur("nom")}
          aria-required="true"
          aria-invalid={hasErr("nom")}
          aria-describedby={hasErr("nom") ? "c-err-nom" : undefined}
          className={inputCls("nom")}
          placeholder="Prénom et nom"
        />
        {hasErr("nom") && (
          <p id="c-err-nom" className="text-[12px] text-red-600 mt-1.5" role="alert">
            {errors.nom}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="c-email" className="text-small font-semibold text-soga-ink block mb-2">
          Email <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="c-email"
          type="email"
          value={fields.email}
          onChange={set("email")}
          onBlur={blur("email")}
          aria-required="true"
          aria-invalid={hasErr("email")}
          aria-describedby={hasErr("email") ? "c-err-email" : undefined}
          className={inputCls("email")}
          placeholder="vous@exemple.com"
        />
        {hasErr("email") && (
          <p id="c-err-email" className="text-[12px] text-red-600 mt-1.5" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Motif */}
      <div>
        <label htmlFor="c-motif" className="text-small font-semibold text-soga-ink block mb-2">
          Motif <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <select
          id="c-motif"
          value={fields.motif}
          onChange={set("motif")}
          onBlur={blur("motif")}
          aria-required="true"
          aria-invalid={hasErr("motif")}
          aria-describedby={hasErr("motif") ? "c-err-motif" : undefined}
          className={inputCls("motif")}
        >
          <option value="">Sélectionnez un motif</option>
          {MOTIFS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
        {hasErr("motif") && (
          <p id="c-err-motif" className="text-[12px] text-red-600 mt-1.5" role="alert">
            {errors.motif}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="c-message" className="text-small font-semibold text-soga-ink block mb-2">
          Message <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="c-message"
          rows={5}
          value={fields.message}
          onChange={set("message")}
          onBlur={blur("message")}
          aria-required="true"
          aria-invalid={hasErr("message")}
          aria-describedby={hasErr("message") ? "c-err-message" : undefined}
          className={inputCls("message", "resize-y")}
          placeholder="Votre message..."
        />
        {hasErr("message") && (
          <p id="c-err-message" className="text-[12px] text-red-600 mt-1.5" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {submitError && (
        <p className="text-[13px] text-red-600" role="alert">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="px-6 py-3.5 text-[15px] font-semibold text-soga-ink hover:opacity-80 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soga-gold min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ backgroundColor: "#C9962C" }}
      >
        {submitting ? "Envoi en cours…" : "Envoyer le message"}
      </button>
    </form>
  );
}
