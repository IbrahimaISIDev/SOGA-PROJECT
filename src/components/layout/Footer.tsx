import Link from "next/link";
import { StratigraphicSeparator } from "@/components/signature/StratigraphicColumn";
import NewsletterForm from "./NewsletterForm";

const footerLinks = {
  formations: [
    { label: "Génie Pétrolier", href: "/formations/genie-petrolier" },
    { label: "Génie du Gaz", href: "/formations/genie-gaz" },
    { label: "Énergies Renouvelables", href: "/formations/energies-renouvelables" },
    { label: "Management des Projets", href: "/formations/management-projets-energetiques" },
    { label: "Formations courtes", href: "/formations/courtes" },
  ],
  institution: [
    { label: "À propos", href: "/institution" },
    { label: "Vision & Valeurs", href: "/institution/vision" },
    { label: "Gouvernance & Équipe", href: "/institution/equipe" },
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
    { label: "Frais & Bourses", href: "/admissions/frais-bourses" },
    { label: "Admissions internationales", href: "/admissions/internationales" },
    { label: "Actualités", href: "/actualites" },
    { label: "Partenariats", href: "/ecosysteme" },
    { label: "Contact", href: "/contact" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-soga-black text-white" role="contentinfo">
      <div className="container-soga pt-16 pb-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-14">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="text-eyebrow text-[14px] font-semibold tracking-widest text-white block mb-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
            >
              SOGA
            </Link>
            <p className="text-small text-white/60 leading-relaxed mb-6">
              Senegal Oil and Gas Academy<br />
              L&apos;école supérieure dédiée aux métiers du pétrole, du gaz et des énergies durables.
            </p>
            <div className="space-y-1 text-small text-white/60">
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
              <p>Dakar, Sénégal</p>
            </div>
          </div>

          {/* Formations */}
          <FooterColumn title="Formations" links={footerLinks.formations} />

          {/* Institution + Think Tank */}
          <div className="space-y-8">
            <FooterColumn title="Institution" links={footerLinks.institution} />
            <FooterColumn title="Think Tank" links={footerLinks.thinktank} />
          </div>

          {/* Pratique + Newsletter */}
          <div className="space-y-8">
            <FooterColumn title="Pratique" links={footerLinks.pratique} />

            {/* Newsletter */}
            <div>
              <p className="text-eyebrow text-soga-gold mb-3">Newsletter</p>
              <p className="text-small text-white/60 mb-3">
                Actualités, publications et événements SOGA.
              </p>
              <NewsletterForm />
            </div>
          </div>
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
          <li key={link.href}>
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
