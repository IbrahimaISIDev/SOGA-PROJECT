import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/home/ScrollReveal";
import { StratigraphicSeparator } from "@/components/signature/StratigraphicColumn";
import { articles } from "@/data/actualites";
import ReadingProgress from "@/components/ui/ReadingProgress";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";
import { institution } from "@/data/institution";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.titre} — SOGA`,
    description: article.extrait,
  };
}

export default async function ArticleDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const dateFormatted = new Date(article.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const articlesLies = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  const wordCount = [article.extrait, ...(article.contenu ?? [])].join(" ").trim().split(/\s+/).length;
  const readingMins = Math.max(1, Math.round(wordCount / 200));

  const pageUrl = `${SITE_URL}/actualites/${article.slug}`;
  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(article.titre)}`,
    email: `mailto:?subject=${encodeURIComponent(article.titre)}&body=${encodeURIComponent(pageUrl)}`,
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.titre,
    description: article.extrait,
    datePublished: article.date,
    articleSection: article.categorie,
    url: pageUrl,
    mainEntityOfPage: pageUrl,
    ...(article.image ? { image: `${SITE_URL}${article.image}` } : {}),
    author: { "@type": "EducationalOrganization", name: institution.nom, url: SITE_URL },
    publisher: { "@type": "EducationalOrganization", name: institution.nom, url: SITE_URL },
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <ReadingProgress />
      <Header />
      <main id="main-content" className="bg-soga-sand min-h-screen">
        {/* Breadcrumb */}
        <div
          className="border-b border-soga-line"
          style={{ backgroundColor: "var(--soga-sand)" }}
        >
          <div className="container-soga py-4">
            <nav aria-label="Fil d'Ariane">
              <ol className="flex flex-wrap items-center gap-2 text-eyebrow text-soga-muted">
                <li>
                  <Link href="/" className="hover:text-soga-gold-deep transition-colors">
                    Accueil
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/actualites" className="hover:text-soga-gold-deep transition-colors">
                    Actualités
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li
                  aria-current="page"
                  className="text-soga-gold-deep line-clamp-1 max-w-[240px]"
                >
                  {article.titre}
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container-soga py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-16 items-start">
            {/* ── Article ──────────────────────────────────── */}
            <article>
              {/* Meta eyebrow */}
              <ScrollReveal>
                <p className="text-eyebrow text-soga-gold-deep mb-4">
                  {article.categorie.toUpperCase()} · {dateFormatted.toUpperCase()} · {readingMins} MIN DE LECTURE
                </p>
              </ScrollReveal>

              <ScrollReveal delay={60}>
                <h1 className="text-h1 text-soga-ink mb-8 leading-[1.2]">
                  {article.titre}
                </h1>
              </ScrollReveal>

              {/* Hero image */}
              <ScrollReveal delay={100}>
                <div className="relative aspect-[16/7] mb-8 overflow-hidden">
                  {article.image ? (
                    <Image src={article.image} alt="" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full placeholder-block flex items-end p-5">
                      <span className="text-eyebrow text-soga-line/60">
                        Visuel provisoire
                      </span>
                    </div>
                  )}
                </div>
              </ScrollReveal>

              {/* Lead (extrait en serif) */}
              <ScrollReveal delay={120}>
                <p className="font-display text-[19px] font-medium leading-relaxed text-soga-ink mb-6 pb-6 border-b border-soga-line">
                  {article.extrait}
                </p>
              </ScrollReveal>

              {/* Body */}
              <div className="space-y-5">
                {article.contenu && article.contenu.length > 0 ? (
                  article.contenu.map((para, i) => (
                    <ScrollReveal key={i} delay={i * 40}>
                      <p className="text-body text-soga-ink/80 leading-[1.75]">{para}</p>
                    </ScrollReveal>
                  ))
                ) : (
                  <ScrollReveal>
                    <p className="text-body text-soga-muted leading-[1.75]">
                      Contenu provisoire — le texte intégral sera intégré dès réception
                      de l&apos;article final de la rédaction SOGA.
                    </p>
                  </ScrollReveal>
                )}
              </div>

              {/* Articles liés */}
              {articlesLies.length > 0 && (
                <>
                  <StratigraphicSeparator className="my-12 opacity-40" />
                  <section aria-labelledby="lies-title">
                    <p
                      id="lies-title"
                      className="text-eyebrow text-soga-gold-deep mb-6"
                    >
                      ARTICLES LIÉS
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {articlesLies.map((a) => (
                        <Link
                          key={a.id}
                          href={`/actualites/${a.slug}`}
                          className="group block border border-soga-line rounded-md p-4 bg-soga-surface hover:border-soga-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
                        >
                          <p className="text-eyebrow text-soga-muted mb-2 text-[10px]">
                            {a.categorie.toUpperCase()}
                          </p>
                          <h3 className="font-display font-semibold text-[14px] leading-snug text-soga-ink line-clamp-2 group-hover:text-soga-gold-deep transition-colors">
                            {a.titre}
                          </h3>
                        </Link>
                      ))}
                    </div>
                  </section>
                </>
              )}
            </article>

            {/* ── Sidebar ──────────────────────────────────── */}
            <aside
              className="lg:sticky lg:top-20 h-fit hidden lg:block"
              aria-label="Sommaire de l'article"
            >
              <p className="text-eyebrow text-soga-muted mb-4">SOMMAIRE</p>
              <nav>
                <ul
                  className="space-y-0 border-l-2 border-soga-gold pl-3"
                  style={{ lineHeight: "2.2" }}
                >
                  <li>
                    <a
                      href="#"
                      className="text-[14px] text-soga-gold-deep hover:text-soga-gold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
                    >
                      {article.categorie}
                    </a>
                  </li>
                  {article.contenu && article.contenu.slice(0, 3).map((_, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-[14px] text-soga-muted hover:text-soga-gold-deep transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
                      >
                        {i === 0 ? "Contexte" : i === 1 ? "Détails" : "Perspectives"}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-8 pt-6 border-t border-soga-line">
                <p className="text-eyebrow text-soga-muted mb-3">PARTAGER</p>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "LinkedIn", href: shareLinks.linkedin },
                    { label: "X (Twitter)", href: shareLinks.twitter },
                    { label: "E-mail", href: shareLinks.email },
                  ].map((r) => (
                    <a
                      key={r.label}
                      href={r.href}
                      target={r.label !== "E-mail" ? "_blank" : undefined}
                      rel={r.label !== "E-mail" ? "noopener noreferrer" : undefined}
                      className="text-small text-soga-muted hover:text-soga-gold-deep transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
                    >
                      {r.label} →
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-soga-line">
                <Link
                  href="/actualites"
                  className="text-small text-soga-muted hover:text-soga-gold-deep transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-soga-gold focus-visible:outline-offset-2"
                >
                  ← Toutes les actualités
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
