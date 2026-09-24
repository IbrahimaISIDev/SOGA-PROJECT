import Image from "next/image";
import Link from "next/link";
import { StratigraphicSeparator } from "@/components/signature/StratigraphicColumn";
import NewsletterForm from "./NewsletterForm";

const footerLinks = {
  formations: [
    { label: "Filières techniques", href: "/formations" },
    { label: "Filières managériales", href: "/formations" },
    { label: "Formations courtes", href: "/formations/courtes" },
    { label: "Catalogue complet", href: "/formations" },
  ],
  institution: [
    { label: "À propos", href: "/institution" },
    { label: "Vision & Valeurs", href: "/institution/vision" },
    { label: "La Fondatrice", href: "/institution/fondatrice" },
    { label: "Notre Équipe", href: "/institution/equipe" },
    { label: "Campus", href: "/institution/campus" },
  ],
  thinktank: [
    { label: "Accueil Think Tank", href: "/think-tank" },
    { label: "Publications", href: "/think-tank/publications" },
    { label: "Experts", href: "/think-tank/experts" },
    { label: "Thématiques", href: "/think-tank/thematiques" },
  ],
  pratique: [
    { label: "Admissions", href: "/admissions" },
    { label: "Déposer ma candidature", href: "/admissions/candidature" },
    { label: "Actualités", href: "/actualites" },
    { label: "Partenariats", href: "/ecosysteme/partenariats" },
    { label: "Devenir partenaire", href: "/ecosysteme/devenir-partenaire" },
    { label: "Contact", href: "/contact" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-soga-black text-white" role="contentinfo">
      <div className="container-soga pt-16 pb-8">
        {/* Top grid — 4 cols matching design proportions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 lg:gap-8 mb-14">

          {/* Col 1 — Brand + contacts + newsletter */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-eyebrow text-[14px] font-semibold tracking-widest text-white mb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
            >
              <Image src="/media/icon-soga.png" alt="" width={28} height={25} className="h-6 w-auto" />
              SOGA
            </Link>
            <p className="text-small text-white/60 leading-relaxed mb-4">
              SOGA<br />
              Sénégal
            </p>
            <div className="space-y-1 text-small text-white/60 mb-8">
              <p>
                <a
                  href="mailto:direction@senegaloilandgasacademy.com"
                  className="hover:text-soga-gold-light transition-colors"
                >
                  direction@senegaloilandgasacademy.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+221772631663"
                  className="hover:text-soga-gold-light transition-colors"
                >
                  +221 77 263 16 63
                </a>
              </p>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex items-center gap-4 mb-8">
              <a
                href="https://www.facebook.com/p/Senegal-Oil-and-Gas-Academy-100063936999659/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SOGA sur Facebook"
                className="text-white/60 hover:text-soga-gold-light transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
                </svg>
              </a>
              <a
                href="https://sn.linkedin.com/company/senegaloilandgasacademy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SOGA sur LinkedIn"
                className="text-white/60 hover:text-soga-gold-light transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
                </svg>
              </a>
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-eyebrow text-soga-gold mb-2">NEWSLETTER</p>
              <NewsletterForm />
            </div>
          </div>

          {/* Col 2 — Formations */}
          <FooterColumn title="Formations" links={footerLinks.formations} />

          {/* Col 3 — Institution + Think Tank */}
          <div className="space-y-8">
            <FooterColumn title="Institution" links={footerLinks.institution} />
            <FooterColumn title="Think Tank" links={footerLinks.thinktank} />
          </div>

          {/* Col 4 — Pratique */}
          <FooterColumn title="Pratique" links={footerLinks.pratique} />
        </div>

        <StratigraphicSeparator className="mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-small text-white/50">
            © {year} Senegal Oil and Gas Academy. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <Link
              href="/mentions-legales"
              className="text-small text-white/50 hover:text-white/70 transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              href="/mentions-legales#cookies"
              className="text-small text-white/50 hover:text-white/70 transition-colors"
            >
              Cookies
            </Link>
            <Link
              href="/contact"
              className="text-small text-white/50 hover:text-white/70 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-eyebrow text-soga-gold mb-3">{title}</p>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <Link
              href={link.href}
              className="text-small text-white/60 hover:text-white transition-colors block py-0.5"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
