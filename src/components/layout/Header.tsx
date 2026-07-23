"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

const formationsNav = [
  {
    label: "Pôle Technique",
    items: [
      { label: "Génie Pétrolier", href: "/formations/genie-petrolier" },
      { label: "Génie du Gaz", href: "/formations/genie-gaz" },
      { label: "Énergies Renouvelables", href: "/formations/energies-renouvelables" },
      { label: "Maintenance Industrielle", href: "/formations/maintenance-industrielle" },
      { label: "Hygiène, Sécurité, Environnement", href: "/formations/hse-environnement" },
    ],
  },
  {
    label: "Pôle Managérial",
    items: [
      { label: "Management des Projets Énergétiques", href: "/formations/management-projets-energetiques" },
      { label: "Économie et Droit du Pétrole", href: "/formations/economie-droit-petrole" },
      { label: "Logistique & Supply Chain", href: "/formations/logistique-supply-chain" },
    ],
  },
  {
    label: "Formations courtes",
    items: [
      { label: "Catalogue des formations courtes", href: "/formations/courtes" },
    ],
  },
];

const thinkTankNav = [
  { label: "Accueil Think Tank", href: "/think-tank" },
  { label: "Publications", href: "/think-tank/publications" },
  { label: "Experts", href: "/think-tank/experts" },
  { label: "Thématiques", href: "/think-tank/thematiques" },
];

const mainNav = [
  { label: "Formations", href: "/formations", hasMega: true, megaKey: "formations" },
  { label: "Think Tank", href: "/think-tank", hasMega: true, megaKey: "thinktank" },
  { label: "Institution", href: "/institution" },
  { label: "Actualités", href: "/actualites" },
  { label: "Admissions", href: "/admissions" },
  { label: "Écosystème", href: "/ecosysteme" },
];

export default function Header({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isDark = variant === "dark" && !scrolled;
  const headerBg = scrolled
    ? "bg-soga-black/95 backdrop-blur-md border-b border-soga-graphite shadow-menu"
    : variant === "dark"
    ? "bg-transparent"
    : "bg-white border-b border-soga-line";

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}
        role="banner"
      >
        <div className="container-soga">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-14" : "h-18"}`} style={{ height: scrolled ? "56px" : "72px" }}>
            {/* Logo */}
            <Link
              href="/"
              className={`text-eyebrow text-[14px] font-semibold tracking-widest transition-colors ${isDark || scrolled ? "text-white" : "text-soga-ink"} focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2`}
              aria-label="SOGA — Retour à l'accueil"
            >
              SOGA
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Navigation principale" className="hidden lg:flex items-center gap-6">
              {mainNav.map((item) => (
                <div key={item.label} className="relative">
                  <button
                    className={`text-[14px] font-medium nav-underline transition-colors px-1 py-1 min-h-[44px] flex items-center ${
                      isDark || scrolled ? "text-white/90 hover:text-white" : "text-soga-ink"
                    }`}
                    onClick={() =>
                      item.hasMega
                        ? setOpenMega(openMega === item.megaKey ? null : (item.megaKey ?? null))
                        : setOpenMega(null)
                    }
                    aria-expanded={item.hasMega ? openMega === item.megaKey : undefined}
                    aria-haspopup={item.hasMega ? "true" : undefined}
                  >
                    {item.label}
                    {item.hasMega && (
                      <svg
                        className={`ml-1 w-3 h-3 transition-transform ${openMega === item.megaKey ? "rotate-180" : ""}`}
                        viewBox="0 0 12 8"
                        fill="none"
                        aria-hidden
                      >
                        <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Lang switcher */}
              <button
                className={`text-eyebrow text-[12px] px-2 py-1 min-h-[44px] flex items-center gap-1 transition-colors ${
                  isDark || scrolled ? "text-white/70 hover:text-white" : "text-soga-muted hover:text-soga-ink"
                }`}
                aria-label="Changer la langue"
              >
                <span aria-current="true">FR</span>
                <span className="opacity-40">/</span>
                <span>EN</span>
              </button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => (window.location.href = "/admissions")}
              >
                Candidater
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              className={`lg:hidden flex flex-col gap-1.5 p-2 min-h-[44px] min-w-[44px] items-center justify-center transition-colors ${
                isDark || scrolled ? "text-white" : "text-soga-ink"
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-controls="mobile-menu"
            >
              <span className={`block w-5 h-0.5 bg-current transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block w-5 h-0.5 bg-current transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-current transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mega-menu — Formations */}
        {openMega === "formations" && (
          <div
            className="absolute top-full left-0 right-0 bg-soga-black/98 backdrop-blur-md border-t border-soga-graphite shadow-menu"
            onMouseLeave={() => setOpenMega(null)}
          >
            <div className="container-soga py-8">
              <div className="grid grid-cols-3 gap-8">
                {formationsNav.map((col) => (
                  <div key={col.label}>
                    <p className="text-eyebrow text-soga-gold mb-4">{col.label}</p>
                    <ul className="space-y-2">
                      {col.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="text-[14px] text-white/80 hover:text-soga-gold-light transition-colors block py-1"
                            onClick={() => setOpenMega(null)}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-soga-graphite">
                <Link
                  href="/formations"
                  className="text-[14px] text-soga-gold-light hover:text-soga-gold transition-colors font-medium"
                  onClick={() => setOpenMega(null)}
                >
                  Voir tout le catalogue des formations →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Mega-menu — Think Tank */}
        {openMega === "thinktank" && (
          <div
            className="absolute top-full left-0 right-0 bg-soga-black/98 backdrop-blur-md border-t border-soga-graphite shadow-menu"
            onMouseLeave={() => setOpenMega(null)}
          >
            <div className="container-soga py-8">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-eyebrow text-[#1E6F5C] mb-4">Think Tank SOGA</p>
                  <ul className="space-y-2">
                    {thinkTankNav.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-[14px] text-white/80 hover:text-[#1E6F5C] transition-colors block py-1"
                          onClick={() => setOpenMega(null)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-eyebrow text-soga-muted mb-4">Dernière publication</p>
                  <div className="bg-soga-graphite rounded-md p-4">
                    <p className="text-small text-soga-muted mb-1">Rapport · Avril 2025</p>
                    <p className="text-[14px] text-white font-medium leading-snug">
                      Scénarios de transition énergétique pour le Sénégal à l&apos;horizon 2035
                    </p>
                    <Link
                      href="/think-tank/publications/transition-energetique-senegal-2035"
                      className="text-[13px] text-[#1E6F5C] hover:text-green-400 mt-3 block transition-colors"
                      onClick={() => setOpenMega(null)}
                    >
                      Lire la publication →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Click-outside close */}
        {openMega && (
          <button
            className="fixed inset-0 z-[-1]"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpenMega(null)}
          />
        )}
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Menu de navigation"
        aria-modal="true"
        className={`fixed inset-0 z-40 bg-soga-black flex flex-col transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-soga-graphite">
          <Link
            href="/"
            className="text-eyebrow text-[14px] font-semibold tracking-widest text-white"
            onClick={() => setMobileOpen(false)}
          >
            SOGA
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Fermer le menu"
            className="text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden>
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav aria-label="Navigation mobile" className="flex-1 overflow-y-auto px-5 py-6">
          <ul className="space-y-1">
            {mainNav.map((item) => (
              <li key={item.label}>
                {item.hasMega ? (
                  <div>
                    <button
                      className="w-full flex items-center justify-between py-3 text-[17px] text-white font-medium border-b border-soga-graphite min-h-[44px]"
                      onClick={() =>
                        setMobileAccordion(
                          mobileAccordion === item.megaKey ? null : (item.megaKey ?? null)
                        )
                      }
                      aria-expanded={mobileAccordion === item.megaKey}
                    >
                      {item.label}
                      <svg
                        className={`w-4 h-4 transition-transform ${mobileAccordion === item.megaKey ? "rotate-180" : ""}`}
                        viewBox="0 0 16 10"
                        fill="none"
                        aria-hidden
                      >
                        <path d="M1 1l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                    {mobileAccordion === item.megaKey && (
                      <div className="py-2 pl-4 space-y-1">
                        {(item.megaKey === "formations" ? formationsNav : [{ label: "", items: thinkTankNav }]).map(
                          (col) => (
                            <div key={col.label}>
                              {col.label && (
                                <p className="text-eyebrow text-soga-muted py-2">{col.label}</p>
                              )}
                              {col.items.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  className="block py-2 text-[15px] text-white/80 hover:text-soga-gold-light transition-colors min-h-[44px] flex items-center"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-3 text-[17px] text-white font-medium border-b border-soga-graphite min-h-[44px] flex items-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-5 py-6 border-t border-soga-graphite flex flex-col gap-3">
          <Button variant="primary" size="lg" className="w-full justify-center">
            Candidater
          </Button>
          <button className="text-eyebrow text-soga-muted text-[12px] tracking-widest">
            FR / EN
          </button>
        </div>
      </div>
    </>
  );
}
