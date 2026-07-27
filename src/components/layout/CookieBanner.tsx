"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";

const CONSENT_KEY = "soga-cookie-consent";
const SSR_SENTINEL = "__ssr__";

function subscribe() {
  return () => {};
}

function getSnapshot(): string | null {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

function getServerSnapshot(): string {
  return SSR_SENTINEL;
}

export default function CookieBanner() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [dismissed, setDismissed] = useState(false);

  const visible = consent === null && !dismissed;

  const dismiss = (choice: "accepted" | "refused") => {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      /* storage unavailable */
    }
    setDismissed(true);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentement aux cookies"
      aria-live="polite"
      className="fixed bottom-6 left-0 right-0 z-50 px-5 md:px-14 lg:px-[88px]"
    >
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-md px-6 py-5"
        style={{
          backgroundColor: "#0B0C0E",
          boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        }}
      >
        <p className="text-[14px] leading-relaxed" style={{ color: "#D8D4C8" }}>
          Ce site utilise des cookies strictement nécessaires à son fonctionnement technique.{" "}
          <Link
            href="/mentions-legales#cookies"
            className="font-medium hover:underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ color: "#F0C868", outlineColor: "#F0C868" }}
          >
            En savoir plus
          </Link>
        </p>

        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => dismiss("refused")}
            className="px-4 py-2 text-[13px] font-semibold border transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white min-h-[36px]"
            style={{ borderColor: "#F6F4EF", color: "#F6F4EF" }}
          >
            Refuser
          </button>
          <button
            onClick={() => dismiss("accepted")}
            className="px-4 py-2 text-[13px] font-semibold transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soga-gold min-h-[36px]"
            style={{ backgroundColor: "#C9962C", color: "#0B0C0E" }}
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
