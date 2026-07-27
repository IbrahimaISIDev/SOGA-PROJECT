import type { Metadata } from "next";
import { Source_Serif_4, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/layout/CookieBanner";
import BackToTop from "@/components/ui/BackToTop";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";
import { institution } from "@/data/institution";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "SOGA — Senegal Oil and Gas Academy",
    template: "%s | SOGA",
  },
  description:
    "L'académie supérieure dédiée aux métiers du pétrole, du gaz et des énergies durables. Former l'élite africaine de l'énergie, ici, au Sénégal.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    siteName: "SOGA — Senegal Oil and Gas Academy",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    site: "@SOGA_Dakar",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: institution.nom,
  alternateName: institution.sigle,
  description: institution.vision,
  url: SITE_URL,
  email: institution.email,
  telephone: institution.telephone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dakar",
    addressCountry: "SN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${sourceSerif.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body className="min-h-screen flex flex-col font-sans text-soga-ink bg-soga-sand">
        <JsonLd data={organizationJsonLd} />
        {children}
        <CookieBanner />
        <BackToTop />
      </body>
    </html>
  );
}
