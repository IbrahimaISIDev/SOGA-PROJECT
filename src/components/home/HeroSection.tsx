import Image from "next/image";
import Link from "next/link";
import StratigraphicColumn from "@/components/signature/StratigraphicColumn";

export default function HeroSection() {
  const titleLines = ["L’Académie de"];

  return (
    <section
      className="relative min-h-screen flex flex-col justify-end bg-soga-black overflow-hidden"
      aria-label="Page d’accueil SOGA"
    >
      {/* Étudiants SOGA en visite pédagogique à l'Assemblée Nationale, juillet 2026 */}
      <Image
        src="/media/hero-assemblee-nationale.jpg"
        alt="Étudiants de la Senegal Oil and Gas Academy devant l'Assemblée Nationale du Sénégal, lors d'une visite pédagogique"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{
          objectPosition: "50% 30%",
          filter: "brightness(0.72) contrast(0.9) saturate(0.85)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,12,14,0.55) 0%, rgba(11,12,14,0.35) 30%, rgba(11,12,14,0.78) 70%, #0B0C0E 100%)",
        }}
        aria-hidden
      />

      {/* Stratigraphic column — left edge */}
      <div className="absolute left-0 top-0 bottom-0 flex items-stretch z-10" aria-hidden>
        <StratigraphicColumn variant="hero" className="self-stretch" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 container-soga pb-20 md:pb-28">
        {/* Eyebrow */}
        <div className="mb-5 hero-fade-up">
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
          className="text-lead max-w-[560px] mb-10 hero-fade-up"
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

      {/* Photo credit */}
      <p
        className="absolute bottom-8 right-6 md:right-16 z-10 text-eyebrow hero-fade-up"
        style={{ color: "rgba(246,244,239,0.4)", fontSize: "10px", animationDelay: "500ms" }}
      >
        Étudiants SOGA · Assemblée Nationale, juillet 2026
      </p>

      {/* Scroll hint */}
      <div className="hidden md:block absolute bottom-8 z-10" style={{ left: "clamp(20px, 6vw, 88px)" }}>
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
