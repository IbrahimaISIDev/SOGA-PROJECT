import type { Metadata, Viewport } from "next";
import { Source_Serif_4, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/layout/CookieBanner";
import BackToTop from "@/components/ui/BackToTop";
import ThemeScript from "@/components/layout/ThemeScript";
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
    "École supérieure professionnelle spécialisée dans les métiers de l'énergie, du management et de l'industrie. Campus à Dakar, Ziguinchor et Saint-Louis.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    siteName: "SOGA — Senegal Oil and Gas Academy",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F4EF" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0C0E" },
  ],
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
  address: institution.campuses.map((c) => ({
    "@type": "PostalAddress",
    addressLocality: c.ville,
    streetAddress: c.adresse,
    addressCountry: "SN",
  })),
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
        <ThemeScript />
        <JsonLd data={organizationJsonLd} />
        {children}
        <CookieBanner />
        <BackToTop />
      </body>
    </html>
  );
}
