"use client";

import { useState } from "react";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { isValidEmail } from "@/lib/validators";

const MOTIFS = [
  { value: "admissions", label: "Admissions" },
  { value: "partenariat", label: "Partenariat" },
  { value: "presse", label: "Presse" },
  { value: "autre", label: "Autre" },
];

type Fields = { nom: string; email: string; motif: string; message: string };
type Errs = Partial<Record<keyof Fields, string>>;

function validate(d: Fields): Errs {
  const e: Errs = {};
  if (!d.nom.trim()) e.nom = "Ce champ est requis.";
  if (!d.email.trim()) e.email = "Ce champ est requis.";
  else if (!isValidEmail(d.email)) e.email = "Adresse e-mail invalide.";
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
      <Input
        label="Nom complet"
        id="c-nom"
        required
        value={fields.nom}
        onChange={set("nom")}
        onBlur={blur("nom")}
        placeholder="Prénom et nom"
        state={hasErr("nom") ? "error" : "default"}
        message={hasErr("nom") ? errors.nom : undefined}
      />

      <Input
        label="Email"
        id="c-email"
        type="email"
        required
        value={fields.email}
        onChange={set("email")}
        onBlur={blur("email")}
        placeholder="vous@exemple.com"
        state={hasErr("email") ? "error" : "default"}
        message={hasErr("email") ? errors.email : undefined}
      />

      <Select
        label="Motif"
        id="c-motif"
        required
        value={fields.motif}
        onChange={set("motif")}
        onBlur={blur("motif")}
        placeholder="Sélectionnez un motif"
        options={MOTIFS}
        state={hasErr("motif") ? "error" : "default"}
        message={hasErr("motif") ? errors.motif : undefined}
      />

      <Textarea
        label="Message"
        id="c-message"
        rows={5}
        required
        value={fields.message}
        onChange={set("message")}
        onBlur={blur("message")}
        placeholder="Votre message..."
        state={hasErr("message") ? "error" : "default"}
        message={hasErr("message") ? errors.message : undefined}
      />

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
