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
              className="text-eyebrow text-[14px] font-semibold tracking-widest text-white block mb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
            >
              SOGA
            </Link>
            <p className="text-small text-white/60 leading-relaxed mb-4">
              Senegal Oil and Gas Academy<br />
              Dakar, Sénégal
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
                  href="tel:+221781032370"
                  className="hover:text-soga-gold-light transition-colors"
                >
                  +221 78 103 23 70
                </a>
              </p>
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
          <p className="text-small text-white/40">
            © {year} Senegal Oil and Gas Academy. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <Link
              href="/mentions-legales"
              className="text-small text-white/40 hover:text-white/70 transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              href="/mentions-legales#cookies"
              className="text-small text-white/40 hover:text-white/70 transition-colors"
            >
              Cookies
            </Link>
            <Link
              href="/contact"
              className="text-small text-white/40 hover:text-white/70 transition-colors"
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
