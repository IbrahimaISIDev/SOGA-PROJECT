import Image from "next/image";
import Link from "next/link";
import StratigraphicColumn from "@/components/signature/StratigraphicColumn";

export default function HeroSection() {
  const titleLines = ["L’Académie de"];

  return (
    <section
      className="relative bg-soga-black overflow-hidden pt-32 pb-20 md:pt-40 md:pb-24 lg:min-h-screen lg:flex lg:items-center lg:pb-20"
      aria-label="Page d’accueil SOGA"
    >
      {/* Ambient background — same photo, blurred and darkened, purely decorative */}
      <div className="absolute inset-0 scale-110" aria-hidden>
        <Image
          src="/media/hero-assemblee-nationale.jpg"
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: "50% 30%", filter: "blur(28px) brightness(0.45) saturate(0.9)" }}
        />
      </div>
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #0B0C0E 0%, rgba(11,12,14,0.75) 35%, rgba(11,12,14,0.88) 100%)" }}
        aria-hidden
      />

      {/* Stratigraphic column — left edge */}
      <div className="absolute left-0 top-0 bottom-0 flex items-stretch z-10" aria-hidden>
        <StratigraphicColumn variant="hero" className="self-stretch" />
      </div>

      <div className="relative z-10 container-soga w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <div>
            {/* Eyebrow */}
            <div className="mb-5 hero-fade-up">
              <p className="text-eyebrow" style={{ color: "#F0C868" }}>
                SENEGAL OIL AND GAS ACADEMY
              </p>
            </div>

            {/* H1 */}
            <h1
              className="font-display font-semibold text-white mb-7 overflow-hidden"
              style={{ fontSize: "clamp(40px, 4.4vw, 68px)", lineHeight: 1.05, letterSpacing: "-0.01em" }}
            >
              {titleLines.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <span
                    className="block hero-clip-up"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    {line}
                  </span>
                </span>
              ))}
              <span className="block overflow-hidden">
                <span
                  className="block hero-clip-up"
                  style={{ animationDelay: "160ms", color: "#C9962C" }}
                >
                  Toutes les Énergies.
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-lead max-w-[520px] mb-10 hero-fade-up"
              style={{ color: "#D8D4C8", animationDelay: "260ms" }}
            >
              École supérieure professionnelle spécialisée dans les métiers de l&apos;énergie, du management et de l&apos;industrie — sur les campus de Dakar, Ziguinchor et Saint-Louis.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-4 hero-fade-up"
              style={{ animationDelay: "340ms" }}
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

          {/* Photo panel */}
          <div className="hero-fade-up" style={{ animationDelay: "180ms" }}>
            <div
              className="relative aspect-[4/3] rounded-md overflow-hidden border"
              style={{ borderColor: "rgba(201,150,44,0.3)" }}
            >
              <Image
                src="/media/hero-assemblee-nationale.jpg"
                alt="Étudiants de la Senegal Oil and Gas Academy devant l'Assemblée Nationale du Sénégal, lors d'une visite pédagogique"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
                style={{ objectPosition: "50% 30%" }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }}
                aria-hidden
              />
            </div>
            <p className="text-eyebrow mt-4" style={{ color: "rgba(246,244,239,0.4)", fontSize: "11px" }}>
              Étudiants SOGA · Visite de l&apos;Assemblée Nationale, juillet 2026
            </p>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hidden lg:block absolute bottom-8 z-10" style={{ left: "clamp(20px, 6vw, 88px)" }}>
        <p
          className="text-eyebrow hero-fade-up"
          style={{ color: "#8a8a8a", animationDelay: "600ms" }}
          aria-hidden
        >
          FAIRE DÉFILER ↓
        </p>
      </div>
    </section>
  );
}
