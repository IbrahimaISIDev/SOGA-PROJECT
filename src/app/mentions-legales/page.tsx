import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { institution } from "@/data/institution";

export const metadata: Metadata = {
  title: "Mentions légales — SOGA",
  description:
    "Mentions légales, politique de confidentialité et cookies de la Senegal Oil and Gas Academy.",
};

const SECTIONS = [
  {
    id: "editeur",
    titre: "Éditeur du site",
    contenu: [
      <>
        <strong>Dénomination sociale :</strong> Senegal Oil and Gas Academy (SOGA)
      </>,
      <>
        <strong>Siège social :</strong> Dakar, Sénégal
      </>,
      <>
        <strong>Directrice de publication :</strong> Dr. Aïssatou Cissoko
      </>,
      <>
        <strong>Contact :</strong>{" "}
        <a
          href="mailto:direction@senegaloilandgasacademy.com"
          className="text-soga-gold-deep hover:underline underline-offset-2"
        >
          {institution.email}
        </a>{" "}
        — {institution.telephone}
      </>,
    ],
  },
  {
    id: "hebergement",
    titre: "Hébergement",
    contenu: [
      <>
        Les informations relatives à l&apos;hébergeur seront complétées dès mise en
        production du site.
      </>,
    ],
  },
  {
    id: "propriete-intellectuelle",
    titre: "Propriété intellectuelle",
    contenu: [
      <>
        L&apos;ensemble du contenu de ce site — textes, visuels, publications, marques
        et logos — est la propriété exclusive de SOGA ou de ses partenaires autorisés.
        Toute reproduction, même partielle, est strictement interdite sans autorisation
        écrite préalable de SOGA.
      </>,
      <>
        Les publications du Think Tank SOGA sont protégées par le droit d&apos;auteur.
        Leur citation doit mentionner la source et l&apos;auteur.
      </>,
    ],
  },
  {
    id: "donnees-personnelles",
    titre: "Données personnelles",
    contenu: [
      <>
        Les données collectées via les formulaires de ce site (candidature, contact,
        inscription aux événements) sont traitées par SOGA dans le cadre de ses
        activités pédagogiques et institutionnelles. Elles ne sont pas cédées à des
        tiers à des fins commerciales.
      </>,
      <>
        Conformément à la réglementation en vigueur, vous disposez d&apos;un droit
        d&apos;accès, de rectification et de suppression de vos données. Pour exercer
        ces droits, contactez{" "}
        <a
          href="mailto:direction@senegaloilandgasacademy.com"
          className="text-soga-gold-deep hover:underline underline-offset-2"
        >
          {institution.email}
        </a>
        .
      </>,
    ],
  },
  {
    id: "cookies",
    titre: "Cookies",
    contenu: [
      <>
        Ce site utilise uniquement des cookies strictement nécessaires à son
        fonctionnement technique. Aucun cookie de mesure d&apos;audience, publicitaire
        ou de traçage commercial n&apos;est déposé sur votre terminal.
      </>,
      <>
        Une bannière est affichée lors de votre première visite pour vous en informer.
        Votre choix est mémorisé localement sur votre appareil et n&apos;affecte pas la
        navigation sur le site.
      </>,
    ],
  },
  {
    id: "liens",
    titre: "Liens hypertextes",
    contenu: [
      <>
        SOGA décline toute responsabilité quant au contenu des sites tiers accessibles
        via des liens figurant sur ce site. La présence d&apos;un lien ne constitue pas
        une validation des contenus liés.
      </>,
    ],
  },
];

export default function MentionsLegalesPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="bg-soga-sand min-h-screen">
        <div className="container-soga py-16 md:py-24">
          <div className="max-w-[820px]">
            {/* Breadcrumb */}
            <nav aria-label="Fil d'Ariane" className="mb-10">
              <ol className="flex flex-wrap items-center gap-2 text-eyebrow text-soga-muted">
                <li>
                  <Link href="/" className="hover:text-soga-gold-deep transition-colors">
                    Accueil
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-soga-gold-deep">
                  Mentions légales
                </li>
              </ol>
            </nav>

            <h1 className="font-display font-semibold text-soga-ink mb-10"
              style={{ fontSize: "clamp(24px,4vw,36px)" }}
            >
              Mentions légales
            </h1>

            {/* Jump nav */}
            <nav
              aria-label="Sommaire"
              className="mb-12 p-5 border border-soga-line bg-white"
            >
              <p className="text-eyebrow text-soga-muted mb-3">SOMMAIRE</p>
              <ul className="space-y-1">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-small text-soga-gold-deep hover:underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
                    >
                      {s.titre}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Sections */}
            <div
              className="space-y-10 text-[15px] leading-[1.9]"
              style={{ color: "#3a3a3a" }}
            >
              {SECTIONS.map((s) => (
                <section key={s.id} id={s.id} aria-labelledby={`h-${s.id}`}>
                  <h2
                    id={`h-${s.id}`}
                    className="font-display font-semibold text-soga-ink mb-4 pb-2 border-b border-soga-line"
                    style={{ fontSize: "18px" }}
                  >
                    {s.titre}
                  </h2>
                  <div className="space-y-3">
                    {s.contenu.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <p className="text-eyebrow text-soga-muted mt-14">
              Dernière mise à jour : juillet 2025
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
