"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import StratigraphicColumn from "@/components/signature/StratigraphicColumn";

const STATS = [
  { valeur: "8", libelle: "Filières spécialisées" },
  { valeur: "40+", libelle: "Partenaires industriels" },
  { valeur: "95%", libelle: "Taux d'insertion" },
  { valeur: "3", libelle: "Pôles d'expertise" },
];

function useCountUp(target: number, enabled: boolean, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(target);
      return;
    }
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, enabled, duration]);
  return count;
}

function StatItem({ valeur, libelle, enabled }: { valeur: string; libelle: string; enabled: boolean }) {
  const numericPart = parseInt(valeur.replace(/\D/g, ""), 10);
  const suffix = valeur.replace(/\d/g, "");
  const count = useCountUp(numericPart || 0, enabled);

  return (
    <div className="flex flex-col gap-1">
      <span className="text-display text-[40px] md:text-[56px] font-display text-soga-gold-light leading-none">
        {numericPart ? `${count}${suffix}` : valeur}
      </span>
      <span className="text-eyebrow text-white/60">{libelle}</span>
    </div>
  );
}

export default function HeroSection() {
  const [titleRevealed, setTitleRevealed] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setTitleRevealed(true);
      setStatsVisible(true);
      return;
    }
    const timer = setTimeout(() => setTitleRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const titleLines = ["Former l'élite africaine", "de l'énergie. Ici,"];

  return (
    <section
      className="relative min-h-screen flex flex-col justify-end bg-soga-black overflow-hidden"
      aria-label="Hero — SOGA"
    >
      {/* Background placeholder */}
      <div className="absolute inset-0 placeholder-block opacity-30" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-soga-black via-soga-black/70 to-transparent" aria-hidden />

      {/* Provisional label */}
      <div className="absolute top-0 left-0 right-0 z-10 px-4 pt-3">
        <p className="text-eyebrow text-soga-muted">
          PHOTO / VIDÉO PROVISOIRE — À REMPLACER
        </p>
      </div>

      {/* Stratigraphic column — left edge */}
      <div className="absolute left-0 top-0 bottom-0 flex items-stretch z-10" aria-hidden>
        <StratigraphicColumn variant="hero" className="self-stretch" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 container-soga pb-16 md:pb-24">
        {/* Eyebrow */}
        <div
          className="mb-8 transition-all duration-500"
          style={{
            opacity: titleRevealed ? 1 : 0,
            transform: titleRevealed ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <p className="text-eyebrow text-white/60">
            SENEGAL OIL AND GAS ACADEMY · DAKAR
          </p>
        </div>

        {/* Title — line by line reveal */}
        <h1 className="text-display text-white mb-4 overflow-hidden">
          {titleLines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <span
                className="block transition-all"
                style={{
                  transitionDuration: "400ms",
                  transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                  transitionDelay: `${i * 80}ms`,
                  clipPath: titleRevealed ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
                  transform: titleRevealed ? "translateY(0)" : "translateY(100%)",
                }}
              >
                {line}
              </span>
            </span>
          ))}
          {/* Gold word */}
          <span className="block overflow-hidden">
            <span
              className="block transition-all"
              style={{
                transitionDuration: "400ms",
                transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                transitionDelay: "160ms",
                clipPath: titleRevealed ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
                transform: titleRevealed ? "translateY(0)" : "translateY(100%)",
              }}
            >
              <span className="text-soga-gold">au Sénégal.</span>
            </span>
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          className="text-lead text-white/70 max-w-xl mb-10 transition-all duration-500"
          style={{
            transitionDelay: "280ms",
            opacity: titleRevealed ? 1 : 0,
            transform: titleRevealed ? "translateY(0)" : "translateY(12px)",
          }}
        >
          L&apos;académie supérieure dédiée aux métiers du pétrole, du gaz et des énergies durables,
          formant des professionnels capables de relever les défis énergétiques africains.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap gap-4 transition-all duration-500"
          style={{
            transitionDelay: "360ms",
            opacity: titleRevealed ? 1 : 0,
            transform: titleRevealed ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <Link
            href="/formations"
            className="inline-flex items-center gap-2 px-6 py-3 bg-soga-black text-soga-gold-light border border-soga-gold text-[15px] font-medium hover:bg-soga-graphite transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 min-h-[44px]"
          >
            Découvrir nos formations
          </Link>
          <Link
            href="/admissions"
            className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-white border border-white/30 text-[15px] font-medium hover:border-white hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 min-h-[44px]"
          >
            Candidater pour 2025
          </Link>
        </div>
      </div>

      {/* Stats bar */}
      <div
        ref={statsRef}
        className="relative z-10 bg-soga-graphite/80 backdrop-blur-sm border-t border-soga-graphite"
      >
        <div className="container-soga py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <StatItem
                key={stat.libelle}
                valeur={stat.valeur}
                libelle={stat.libelle}
                enabled={statsVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
