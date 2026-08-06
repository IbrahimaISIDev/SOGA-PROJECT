"use client";

import { useRef } from "react";
import Link from "next/link";
import StratigraphicColumn from "@/components/signature/StratigraphicColumn";
import { useRevealOnMount } from "@/hooks/useRevealOnMount";

export default function HeroSection() {
  const revealed = useRevealOnMount(80);
  const scrollRef = useRef<HTMLDivElement>(null);

  const titleLines = ["L’Académie de"];

  return (
    <section
      className="relative min-h-screen flex flex-col justify-end bg-soga-black overflow-hidden"
      aria-label="Page d’accueil SOGA"
    >
      {/* Placeholder background, in place of the real hero photo/video */}
      <div className="absolute inset-0 placeholder-block" aria-hidden />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, #0B0C0E 0%, #0B0C0E 20%, rgba(11,12,14,0.55) 60%, transparent 100%)" }}
        aria-hidden
      />
      {/* Provisional label */}
      <p
        className="absolute top-4 left-[88px] text-eyebrow z-10"
        style={{ color: "#F0C868", fontSize: "11px", backgroundColor: "rgba(0,0,0,0.45)", padding: "4px 8px" }}
        aria-hidden
      >
        PHOTO / VIDÉO PROVISOIRE — À REMPLACER
      </p>

      {/* Stratigraphic column — left edge */}
      <div className="absolute left-0 top-0 bottom-0 flex items-stretch z-10" aria-hidden>
        <StratigraphicColumn variant="hero" className="self-stretch" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 container-soga pb-20 md:pb-28">
        {/* Eyebrow */}
        <div
          className="mb-5 transition-all duration-500"
          style={{ opacity: revealed ? 1 : 0, transform: revealed ? "none" : "translateY(12px)" }}
        >
          <p className="text-eyebrow" style={{ color: "#F0C868" }}>
            SENEGAL OIL AND GAS ACADEMY
          </p>
        </div>

        {/* H1 */}
        <h1
          className="font-display font-semibold text-white mb-7 overflow-hidden"
          style={{ fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 1.05, letterSpacing: "-0.01em" }}
        >
          {titleLines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <span
                className="block transition-all"
                style={{
                  transitionDuration: "420ms",
                  transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                  transitionDelay: `${i * 80}ms`,
                  clipPath: revealed ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
                  transform: revealed ? "none" : "translateY(100%)",
                }}
              >
                {line}
              </span>
            </span>
          ))}
          <span className="block overflow-hidden">
            <span
              className="block transition-all"
              style={{
                transitionDuration: "420ms",
                transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
                transitionDelay: "160ms",
                clipPath: revealed ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
                transform: revealed ? "none" : "translateY(100%)",
                color: "#C9962C",
              }}
            >
              Toutes les Énergies.
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lead max-w-[560px] mb-10 transition-all duration-500"
          style={{
            color: "#D8D4C8",
            transitionDelay: "260ms",
            opacity: revealed ? 1 : 0,
            transform: revealed ? "none" : "translateY(12px)",
          }}
        >
          École supérieure professionnelle spécialisée dans les métiers de l&apos;énergie, du management et de l&apos;industrie — sur les campus de Dakar, Ziguinchor et Saint-Louis.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 transition-all duration-500"
          style={{
            transitionDelay: "340ms",
            opacity: revealed ? 1 : 0,
            transform: revealed ? "none" : "translateY(12px)",
          }}
        >
          <Link
            href="/formations"
            className="inline-flex items-center justify-center px-7 py-4 text-[15px] font-semibold transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 min-h-[44px]"
            style={{ backgroundColor: "#C9962C", color: "#0B0C0E" }}
          >
            Découvrir nos formations
          </Link>
          <Link
            href="/admissions"
            className="inline-flex items-center justify-center px-7 py-4 text-[15px] font-semibold border transition-colors hover:border-soga-gold hover:text-soga-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 min-h-[44px]"
            style={{ borderColor: "#F6F4EF", color: "#F6F4EF", backgroundColor: "transparent" }}
          >
            Candidater →
          </Link>
        </div>
      </div>

      {/* Scroll hint */}
      <div ref={scrollRef} className="absolute bottom-8 z-10" style={{ left: "clamp(20px, 6vw, 88px)" }}>
        <p
          className="text-eyebrow transition-all duration-700"
          style={{
            color: "#8a8a8a",
            transitionDelay: "600ms",
            opacity: revealed ? 1 : 0,
          }}
          aria-hidden
        >
          FAIRE DÉFILER ↓
        </p>
      </div>
    </section>
  );
}
