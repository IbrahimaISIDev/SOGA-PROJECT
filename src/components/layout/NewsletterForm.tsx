"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
      className="flex gap-2"
      onSubmit={handleSubmit}
      aria-label="Inscription à la newsletter"
    >
      <label htmlFor="footer-email" className="sr-only">
        Votre adresse e-mail
      </label>
      <input
        id="footer-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="votre@email.com"
        required
        className="flex-1 min-w-0 px-3 py-2 bg-soga-graphite border border-soga-graphite text-white text-[14px] placeholder:text-white/40 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-soga-gold text-soga-black text-[13px] font-medium rounded-sm hover:bg-soga-gold-light transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 min-h-[44px]"
      >
        OK
      </button>
    </form>
  );
}
