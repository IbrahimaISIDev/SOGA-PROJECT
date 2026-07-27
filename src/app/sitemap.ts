import type { MetadataRoute } from "next";
import { formations } from "@/data/formations";
import { articles, evenements } from "@/data/actualites";
import { publications } from "@/data/thinktank";
import { SITE_URL as BASE } from "@/lib/site";

const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                                          lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/formations`,                          lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/formations/courtes`,                  lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/admissions`,                          lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/actualites`,                          lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/actualites/evenements`,               lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/think-tank`,                          lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/think-tank/publications`,             lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/think-tank/thematiques`,              lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/think-tank/experts`,                  lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/institution`,                         lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/institution/fondatrice`,              lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
    { url: `${BASE}/institution/equipe`,                  lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/institution/vision`,                  lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
    { url: `${BASE}/institution/campus`,                  lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
    { url: `${BASE}/ecosysteme`,                          lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/ecosysteme/partenariats`,             lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/ecosysteme/entreprises`,              lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/ecosysteme/alumni`,                   lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/ecosysteme/devenir-partenaire`,       lastModified: now, changeFrequency: "yearly",  priority: 0.5 },
    { url: `${BASE}/contact`,                             lastModified: now, changeFrequency: "yearly",  priority: 0.5 },
    { url: `${BASE}/mentions-legales`,                    lastModified: now, changeFrequency: "yearly",  priority: 0.2 },
  ];

  const formationRoutes: MetadataRoute.Sitemap = formations.map((f) => ({
    url: `${BASE}/formations/${f.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE}/actualites/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "never",
    priority: 0.7,
  }));

  const evenementRoutes: MetadataRoute.Sitemap = evenements.map((e) => ({
    url: `${BASE}/actualites/evenements/${e.slug}`,
    lastModified: now,
    changeFrequency: "never" as const,
    priority: 0.6,
  }));

  const publicationRoutes: MetadataRoute.Sitemap = publications.map((p) => ({
    url: `${BASE}/think-tank/publications/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "never",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...formationRoutes,
    ...articleRoutes,
    ...evenementRoutes,
    ...publicationRoutes,
  ];
}
