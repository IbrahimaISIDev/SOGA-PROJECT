import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Espace Alumni — SOGA",
  description:
    "L'espace alumni SOGA — réseau des diplômés, prochainement disponible.",
};

export default function AlumniPage() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="min-h-[70vh] flex flex-col items-center justify-center bg-soga-sand px-6 text-center"
      >
        <span
          className="text-eyebrow text-[11px] px-3 py-1.5 mb-8 inline-block"
          style={{ backgroundColor: "var(--soga-line)", color: "var(--soga-muted)" }}
        >
          PHASE FUTURE
        </span>

        <h1 className="font-display font-semibold text-soga-ink mb-4"
          style={{ fontSize: "clamp(28px,5vw,40px)" }}
        >
          Espace alumni
        </h1>

        <p className="text-lead text-soga-muted max-w-md mb-10">
          La plateforme dédiée au réseau des diplômés SOGA est en cours de
          développement. Laissez-nous votre e-mail pour être informé du lancement.
        </p>

        <AlumniNotifyForm />

        <div className="mt-8">
          <a
            href="/ecosysteme"
            className="text-small text-soga-muted hover:text-soga-gold-deep transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
          >
            ← Retour à l&apos;écosystème
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}

/* Inline client form — small enough to co-locate */
import AlumniNotifyForm from "@/components/ecosysteme/AlumniNotifyForm";
