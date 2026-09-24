"use client";

import { useState } from "react";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { isValidEmail } from "@/lib/validators";

const TYPES = [
  { value: "entreprise", label: "Entreprise" },
  { value: "academique", label: "Institution académique" },
  { value: "ong", label: "ONG / bailleur" },
  { value: "ministere", label: "Ministère" },
];

type Fields = { org: string; type: string; contact: string; email: string; objet: string };
type Errs = Partial<Record<keyof Fields, string>>;

function validate(d: Fields): Errs {
  const e: Errs = {};
  if (!d.org.trim()) e.org = "Ce champ est requis.";
  if (!d.type) e.type = "Veuillez sélectionner un type.";
  if (!d.contact.trim()) e.contact = "Ce champ est requis.";
  if (!d.email.trim()) e.email = "Ce champ est requis.";
  else if (!isValidEmail(d.email)) e.email = "Adresse e-mail invalide.";
  if (!d.objet.trim()) e.objet = "Ce champ est requis.";
  else if (d.objet.trim().length < 20) e.objet = "Description trop courte (20 caractères minimum).";
  return e;
}

export default function DevenirPartenaireForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fields, setFields] = useState<Fields>({ org: "", type: "", contact: "", email: "", objet: "" });
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
    setTouched(new Set(["org", "type", "contact", "email", "objet"] as Array<keyof Fields>));
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/devenir-partenaire", {
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
      <div className="flex flex-col items-start gap-4 py-8">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "rgba(201,150,44,0.12)" }}
          aria-hidden="true"
        >
          <span className="text-soga-gold">✓</span>
        </div>
        <h2 className="text-h3 text-soga-ink">Demande envoyée !</h2>
        <p className="text-body text-soga-muted">
          Notre équipe partenariats vous contactera dans les meilleurs délais.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Organisation"
          id="dp-org"
          required
          placeholder="Nom de votre organisation"
          value={fields.org}
          onChange={set("org")}
          onBlur={blur("org")}
          state={hasErr("org") ? "error" : "default"}
          message={hasErr("org") ? errors.org : undefined}
        />

        <Select
          label="Type de partenariat"
          id="dp-type"
          required
          placeholder="Sélectionnez"
          options={TYPES}
          value={fields.type}
          onChange={set("type")}
          onBlur={blur("type")}
          state={hasErr("type") ? "error" : "default"}
          message={hasErr("type") ? errors.type : undefined}
        />

        <Input
          label="Personne contact"
          id="dp-contact"
          required
          placeholder="Nom et prénom"
          value={fields.contact}
          onChange={set("contact")}
          onBlur={blur("contact")}
          state={hasErr("contact") ? "error" : "default"}
          message={hasErr("contact") ? errors.contact : undefined}
        />
        <Input
          label="Email professionnel"
          id="dp-email"
          type="email"
          required
          placeholder="contact@organisation.com"
          value={fields.email}
          onChange={set("email")}
          onBlur={blur("email")}
          state={hasErr("email") ? "error" : "default"}
          message={hasErr("email") ? errors.email : undefined}
        />
      </div>

      <Textarea
        label="Objet du partenariat"
        id="dp-objet"
        rows={4}
        required
        placeholder="Décrivez l'objet de votre demande de partenariat..."
        value={fields.objet}
        onChange={set("objet")}
        onBlur={blur("objet")}
        state={hasErr("objet") ? "error" : "default"}
        message={hasErr("objet") ? errors.objet : undefined}
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
        {submitting ? "Envoi en cours…" : "Envoyer la demande"}
      </button>
    </form>
  );
}
