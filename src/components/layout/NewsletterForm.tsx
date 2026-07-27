"use client";

import { useState } from "react";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Veuillez saisir votre adresse e-mail.");
      return;
    }
    if (!emailRe.test(email)) {
      setError("Adresse e-mail invalide.");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("request-failed");
      setSubmitted(true);
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <p className="text-small text-soga-gold-light">
        Merci ! Vous recevrez bientôt nos actualités.
      </p>
    );
  }

  return (
    <form
      className="space-y-2"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Inscription à la newsletter"
    >
      <div className="flex gap-2">
        <label htmlFor="footer-email" className="sr-only">
          Votre adresse e-mail
        </label>
        <input
          id="footer-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          placeholder="votre@email.com"
          aria-required="true"
          aria-invalid={!!error}
          aria-describedby={error ? "footer-email-err" : undefined}
          className={`flex-1 min-w-0 px-3 py-2 bg-soga-graphite text-white text-[14px] placeholder:text-white/40 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 border ${
            error ? "border-red-400" : "border-soga-graphite"
          }`}
        />
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-soga-gold text-soga-black text-[13px] font-medium rounded-sm hover:bg-soga-gold-light transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "…" : "OK"}
        </button>
      </div>
      {error && (
        <p id="footer-email-err" className="text-[12px] text-red-400" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
