"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

const institutionNav = [
  { label: "Vision & Valeurs", href: "/institution/vision" },
  { label: "La Fondatrice", href: "/institution/fondatrice" },
  { label: "Notre Équipe", href: "/institution/equipe" },
  { label: "Le Campus", href: "/institution/campus" },
];

const ecosystemeNav = [
  { label: "Partenariats", href: "/ecosysteme/partenariats" },
  { label: "Entreprises & Recrutement", href: "/ecosysteme/entreprises" },
  { label: "Devenir partenaire", href: "/ecosysteme/devenir-partenaire" },
  { label: "Alumni", href: "/ecosysteme/alumni" },
];

const mainNav = [
  { label: "Formations", href: "/formations", hasMega: true, megaKey: "formations" },
  { label: "Think Tank", href: "/think-tank", hasMega: true, megaKey: "thinktank" },
  { label: "Institution", href: "/institution", hasMega: true, megaKey: "institution" },
  { label: "Actualités", href: "/actualites" },
  { label: "Admissions", href: "/admissions" },
  { label: "Écosystème", href: "/ecosysteme", hasMega: true, megaKey: "ecosysteme" },
];

function getMobileSubItems(megaKey: string) {
  if (megaKey === "formations") return formationsNav;
  if (megaKey === "institution") return [{ label: "", items: institutionNav }];
  if (megaKey === "ecosysteme") return [{ label: "", items: ecosystemeNav }];
  return [{ label: "", items: thinkTankNav }];
}

export default function Header({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Close mobile menu on route change — adjusted during render rather
     than in an effect, since it's state derived from a prop change. */
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setOpenMega(null);
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* Close mega-menu / mobile menu on Escape */
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      setOpenMega(null);
      setMobileOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  /* Cleanup timers */
  useEffect(() => () => {
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  /* Hover intent helpers */
  function hoverOpen(key: string) {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    openTimerRef.current = setTimeout(() => setOpenMega(key), 140);
  }
  function hoverClose() {
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    closeTimerRef.current = setTimeout(() => setOpenMega(null), 220);
  }
  function hoverKeepOpen() {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }

  /* Active path detection */
  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  const isDark = variant === "dark" && !scrolled;
  const headerBg = scrolled
    ? "bg-soga-black/95 backdrop-blur-md border-b border-soga-graphite shadow-menu"
    : variant === "dark"
    ? "bg-transparent"
    : "bg-white border-b border-soga-line";

  const linkColor = isDark || scrolled
    ? "text-white/90 hover:text-white"
    : "text-soga-ink hover:text-soga-ink";

  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-soga-black focus:text-soga-gold focus:text-[13px] focus:font-semibold focus:rounded focus:shadow-lg"
      >
        Aller au contenu principal
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}
        role="banner"
      >
        <div className="container-soga">
          <div
            className="flex items-center justify-between transition-all duration-300"
            style={{ height: scrolled ? "56px" : "72px" }}
          >
            {/* Logo */}
            <Link
              href="/"
              className={`text-eyebrow text-[14px] font-semibold tracking-widest transition-colors ${
                isDark || scrolled ? "text-white" : "text-soga-ink"
              } focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2`}
              aria-label="SOGA — Retour à l'accueil"
            >
              SOGA
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Navigation principale" className="hidden lg:flex items-center gap-6">
              {mainNav.map((item) =>
                item.hasMega ? (
                  /* Mega-menu trigger */
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => hoverOpen(item.megaKey!)}
                    onMouseLeave={hoverClose}
                  >
                    <button
                      className={`text-[14px] font-medium nav-underline transition-colors px-1 min-h-[44px] flex items-center gap-1 ${linkColor} ${
                        isActive(item.href) ? "nav-active" : ""
                      }`}
                      onClick={() =>
                        setOpenMega(openMega === item.megaKey ? null : item.megaKey!)
                      }
                      aria-expanded={openMega === item.megaKey}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <svg
                        className={`w-3 h-3 transition-transform duration-200 ${
                          openMega === item.megaKey ? "rotate-180" : ""
                        }`}
                        viewBox="0 0 12 8"
                        fill="none"
                        aria-hidden
                      >
                        <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  /* Direct link */
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-[14px] font-medium nav-underline transition-colors px-1 min-h-[44px] flex items-center ${linkColor} ${
                      isActive(item.href) ? "nav-active" : ""
                    } focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2`}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-4">
              <Button as="a" href="/admissions/candidature" variant="primary" size="sm">
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
              <span className={`block w-5 h-0.5 bg-current transition-transform duration-200 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block w-5 h-0.5 bg-current transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-current transition-transform duration-200 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        {/* ── Mega-menu — Formations ──────────────────────── */}
        {openMega === "formations" && (
          <div
            className="absolute top-full left-0 right-0 bg-soga-black/98 backdrop-blur-md border-t border-soga-graphite shadow-menu"
            onMouseEnter={hoverKeepOpen}
            onMouseLeave={hoverClose}
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
                            className="text-[14px] text-white/80 hover:text-soga-gold-light transition-colors block py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
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

        {/* ── Mega-menu — Think Tank ──────────────────────── */}
        {openMega === "thinktank" && (
          <div
            className="absolute top-full left-0 right-0 bg-soga-black/98 backdrop-blur-md border-t border-soga-graphite shadow-menu"
            onMouseEnter={hoverKeepOpen}
            onMouseLeave={hoverClose}
          >
            <div className="container-soga py-8">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-eyebrow mb-4" style={{ color: "#1E6F5C" }}>Think Tank SOGA</p>
                  <ul className="space-y-2">
                    {thinkTankNav.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-[14px] text-white/80 hover:text-[#3ea08a] transition-colors block py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1E6F5C] focus-visible:outline-offset-2"
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
                    <p className="text-small text-soga-muted mb-1">Rapport · 2025</p>
                    <p className="text-[14px] text-white font-medium leading-snug">
                      Scénarios de transition énergétique pour le Sénégal à l&apos;horizon 2035
                    </p>
                    <Link
                      href="/think-tank/publications/transition-energetique-senegal-2035"
                      className="text-[13px] mt-3 block transition-colors hover:opacity-80"
                      style={{ color: "#3ea08a" }}
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

        {/* ── Mega-menu — Institution ─────────────────────── */}
        {openMega === "institution" && (
          <div
            className="absolute top-full left-0 right-0 bg-soga-black/98 backdrop-blur-md border-t border-soga-graphite shadow-menu"
            onMouseEnter={hoverKeepOpen}
            onMouseLeave={hoverClose}
          >
            <div className="container-soga py-8">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-eyebrow text-soga-gold mb-4">L&apos;Institution</p>
                  <ul className="space-y-2">
                    {institutionNav.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-[14px] text-white/80 hover:text-soga-gold-light transition-colors block py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
                          onClick={() => setOpenMega(null)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-end">
                  <Link
                    href="/institution"
                    className="text-[14px] text-soga-gold-light hover:text-soga-gold transition-colors font-medium"
                    onClick={() => setOpenMega(null)}
                  >
                    Accueil Institution →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Mega-menu — Écosystème ──────────────────────── */}
        {openMega === "ecosysteme" && (
          <div
            className="absolute top-full left-0 right-0 bg-soga-black/98 backdrop-blur-md border-t border-soga-graphite shadow-menu"
            onMouseEnter={hoverKeepOpen}
            onMouseLeave={hoverClose}
          >
            <div className="container-soga py-8">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-eyebrow text-soga-gold mb-4">Écosystème SOGA</p>
                  <ul className="space-y-2">
                    {ecosystemeNav.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-[14px] text-white/80 hover:text-soga-gold-light transition-colors block py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
                          onClick={() => setOpenMega(null)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-end">
                  <Link
                    href="/ecosysteme"
                    className="text-[14px] text-soga-gold-light hover:text-soga-gold transition-colors font-medium"
                    onClick={() => setOpenMega(null)}
                  >
                    Accueil Écosystème →
                  </Link>
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

      {/* ── Mobile menu ─────────────────────────────────── */}
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
                      className={`w-full flex items-center justify-between py-3 text-[17px] font-medium border-b border-soga-graphite min-h-[44px] ${
                        isActive(item.href) ? "text-soga-gold-light" : "text-white"
                      }`}
                      onClick={() =>
                        setMobileAccordion(
                          mobileAccordion === item.megaKey ? null : item.megaKey!
                        )
                      }
                      aria-expanded={mobileAccordion === item.megaKey}
                    >
                      {item.label}
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          mobileAccordion === item.megaKey ? "rotate-180" : ""
                        }`}
                        viewBox="0 0 16 10"
                        fill="none"
                        aria-hidden
                      >
                        <path d="M1 1l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                    {mobileAccordion === item.megaKey && (
                      <div className="py-2 pl-4 space-y-1">
                        {getMobileSubItems(item.megaKey!).map((col) => (
                          <div key={col.label}>
                            {col.label && (
                              <p className="text-eyebrow text-soga-muted py-2">{col.label}</p>
                            )}
                            {col.items.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className={`flex items-center py-2 text-[15px] transition-colors min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 ${
                                  isActive(sub.href)
                                    ? "text-soga-gold-light"
                                    : "text-white/80 hover:text-soga-gold-light"
                                }`}
                                onClick={() => setMobileOpen(false)}
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center py-3 text-[17px] font-medium border-b border-soga-graphite min-h-[44px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2 ${
                      isActive(item.href) ? "text-soga-gold-light" : "text-white"
                    }`}
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
          <Button
            as="a"
            href="/admissions/candidature"
            variant="primary"
            size="lg"
            className="w-full justify-center"
            onClick={() => setMobileOpen(false)}
          >
            Candidater
          </Button>
        </div>
      </div>
    </>
  );
}
