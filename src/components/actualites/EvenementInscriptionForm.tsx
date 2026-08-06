"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";

interface Props {
  titre: string;
  inscriptionOuverte: boolean;
}

export default function EvenementInscriptionForm({ titre, inscriptionOuverte }: Props) {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!inscriptionOuverte) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom || !email) return;

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/evenement-inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, email, titre }),
      });
      if (!res.ok) throw new Error("request-failed");
      setSubmitted(true);
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <aside
      className="lg:sticky lg:top-20 h-fit rounded-md border border-soga-line bg-soga-surface p-6"
      aria-label="Formulaire d'inscription"
    >
      {submitted ? (
        <div className="text-center py-4">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "rgba(201,150,44,0.12)" }}
            aria-hidden="true"
          >
            <span className="text-soga-gold text-lg">✓</span>
          </div>
          <h2 className="font-display font-semibold text-[18px] text-soga-ink mb-2">
            Inscription confirmée !
          </h2>
          <p className="text-small text-soga-muted">
            Vous recevrez une confirmation par e-mail avec les détails pratiques.
          </p>
        </div>
      ) : (
        <>
          <h2 className="font-display font-semibold text-[18px] text-soga-ink mb-5">
            S&apos;inscrire à l&apos;événement
          </h2>
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <Input
              label="Nom complet"
              id="insc-nom"
              required
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Aminata Diallo"
            />
            <Input
              label="Adresse e-mail"
              id="insc-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.com"
            />
            <input type="hidden" value={titre} readOnly aria-hidden />
            {error && (
              <p className="text-[12px] text-red-600" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 text-[15px] font-semibold text-soga-ink transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soga-gold min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#C9962C" }}
            >
              {submitting ? "Envoi en cours…" : "Confirmer mon inscription"}
            </button>
          </form>
          <p className="text-eyebrow text-soga-muted mt-4 text-center text-[10px]">
            Inscription gratuite · Confirmation par e-mail
          </p>
        </>
      )}
    </aside>
  );
}
