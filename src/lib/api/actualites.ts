import { readCollection } from "@/lib/content";
import type { Article, Evenement } from "@/data/actualites";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function mapArticle(api: any): Article {
  return {
    id: api.id,
    slug: api.slug,
    type: "actualite",
    titre: api.titre,
    extrait: api.resume || "",
    date: api.date,
    categorie: api.categorie || "",
    image: api.image || null,
    contenu: api.contenu ? api.contenu.split("\n\n") : undefined,
  };
}

function mapEvenement(api: any): Evenement {
  return {
    id: api.id,
    slug: api.slug,
    titre: api.titre,
    date: api.date,
    heure: api.heure || "",
    lieu: api.lieu || "",
    type: api.type || "",
    description: api.description || "",
    inscriptionOuverte: api.inscriptionOuverte ?? true,
    image: api.image || null,
    placesLimitees: api.placesLimitees ?? false,
  };
}

let staticFallback: Article[] | null = null;
function getStaticFallback(): Article[] {
  if (!staticFallback) staticFallback = readCollection<Article>("articles");
  return staticFallback;
}

let staticEvenementsFallback: Evenement[] | null = null;
function getStaticEvenementsFallback(): Evenement[] {
  if (!staticEvenementsFallback) staticEvenementsFallback = readCollection<Evenement>("evenements");
  return staticEvenementsFallback;
}

/**
 * Reads from the backend API when NEXT_PUBLIC_API_URL is configured, falling
 * back to the static content/articles/*.json files if the API is
 * unreachable or misconfigured — see src/lib/api/formations.ts for the same
 * pattern, applied here first.
 */
export async function getArticles(): Promise<Article[]> {
  if (!API_URL) return getStaticFallback();
  try {
    const res = await fetch(`${API_URL}/articles?published=true&limit=100`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    const json = await res.json();
    if (!json?.success || !Array.isArray(json.data)) {
      throw new Error("Unexpected API response shape");
    }
    return json.data.map(mapArticle);
  } catch (err) {
    console.error("[articles] API unavailable, falling back to static content:", err);
    return getStaticFallback();
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const all = await getArticles();
  return all.find((a) => a.slug === slug) ?? null;
}

export async function getEvenements(): Promise<Evenement[]> {
  if (!API_URL) return getStaticEvenementsFallback();
  try {
    const res = await fetch(`${API_URL}/evenements?published=true&limit=100`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    const json = await res.json();
    if (!json?.success || !Array.isArray(json.data)) {
      throw new Error("Unexpected API response shape");
    }
    return json.data.map(mapEvenement);
  } catch (err) {
    console.error("[evenements] API unavailable, falling back to static content:", err);
    return getStaticEvenementsFallback();
  }
}

export async function getEvenementBySlug(slug: string): Promise<Evenement | null> {
  const all = await getEvenements();
  return all.find((e) => e.slug === slug) ?? null;
}
