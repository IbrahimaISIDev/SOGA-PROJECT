"use client";

import { useState } from "react";

export default function AlumniNotifyForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/alumni-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("request-failed");
      setSent(true);
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <p className="text-body text-soga-gold-deep font-medium">
        ✓ Vous serez informé dès le lancement.
      </p>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="alumni-email" className="sr-only">
          Adresse e-mail
        </label>
        <input
          id="alumni-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.com"
          className="flex-1 px-4 py-3 border border-soga-line text-[15px] text-soga-ink bg-white focus:border-soga-gold focus:outline-none focus:ring-2 focus:ring-soga-gold/20 transition-colors"
        />
        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-3 text-[14px] font-semibold text-white hover:opacity-80 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soga-gold min-h-[44px] whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#0D2B3E" }}
        >
          {submitting ? "Envoi…" : "Être informé du lancement"}
        </button>
      </form>
      {error && (
        <p className="text-[12px] text-red-600 mt-2" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
