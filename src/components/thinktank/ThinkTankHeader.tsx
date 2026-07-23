"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const TT_GREEN = "#1E6F5C";
const TT_GREEN_LIGHT = "#3ea08a";

const ttNav = [
  { label: "Publications", href: "/think-tank/publications" },
  { label: "Nos experts", href: "/think-tank/experts" },
  { label: "Thématiques", href: "/think-tank/thematiques" },
];

export default function ThinkTankHeader({
  activeSection,
}: {
  activeSection?: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const headerBg = scrolled
    ? "bg-soga-black/95 backdrop-blur-md border-b border-soga-graphite"
    : "bg-transparent";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}
        role="banner"
      >
        <div className="container-soga">
          <div
            className="flex items-center justify-between transition-all duration-300"
            style={{ height: scrolled ? "56px" : "72px" }}
          >
            {/* Brand */}
            <Link
              href="/"
              className="text-eyebrow text-[14px] font-semibold tracking-widest text-white flex items-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{ outlineColor: TT_GREEN }}
            >
              SOGA
              <span className="font-normal" style={{ color: TT_GREEN_LIGHT }}>
                · Think Tank
              </span>
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Navigation Think Tank" className="hidden md:flex items-center gap-6">
              {ttNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[14px] font-medium transition-colors"
                  style={{
                    color:
                      activeSection === item.label
                        ? TT_GREEN_LIGHT
                        : "rgba(246,244,239,0.8)",
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/"
                className="text-[14px] text-white/40 hover:text-white/70 transition-colors"
              >
                Retour au site SOGA
              </Link>
            </nav>

            {/* Lang + mobile */}
            <div className="flex items-center gap-4">
              <button
                className="hidden md:block text-eyebrow text-[12px] min-h-[44px] flex items-center gap-1"
                style={{ color: TT_GREEN_LIGHT }}
                aria-label="Changer la langue"
              >
                FR / EN
              </button>
              <button
                className="md:hidden flex flex-col gap-1.5 p-2 min-h-[44px] min-w-[44px] items-center justify-center text-white"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                <span className={`block w-5 h-0.5 bg-current transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
                <span className={`block w-5 h-0.5 bg-current transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
                <span className={`block w-5 h-0.5 bg-current transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu Think Tank"
        className={`fixed inset-0 z-40 bg-soga-black flex flex-col transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="flex items-center justify-between px-5 h-16 border-b"
          style={{ borderColor: TT_GREEN + "40" }}
        >
          <Link
            href="/"
            className="text-eyebrow text-[14px] font-semibold tracking-widest text-white"
            onClick={() => setMobileOpen(false)}
          >
            SOGA{" "}
            <span className="font-normal" style={{ color: TT_GREEN_LIGHT }}>
              · Think Tank
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Fermer le menu"
            className="text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden>
              <path
                d="M6 6l12 12M6 18L18 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <nav aria-label="Navigation mobile Think Tank" className="flex-1 px-5 py-8 space-y-2">
          {ttNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-3 text-[17px] text-white font-medium border-b min-h-[44px] flex items-center"
              style={{ borderColor: TT_GREEN + "30" }}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/"
            className="block py-3 text-[15px] text-white/50 min-h-[44px] flex items-center"
            onClick={() => setMobileOpen(false)}
          >
            ← Retour au site SOGA
          </Link>
        </nav>
      </div>
    </>
  );
}
