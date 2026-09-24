import { readCollection } from "@/lib/content";
import type { Thematique, Publication, Expert } from "@/data/thinktank";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function mapThematique(api: any): Thematique {
  return {
    id: api.id,
    titre: api.nom,
    description: api.description || "",
  };
}

function mapPublication(api: any): Publication {
  return {
    id: api.id,
    slug: api.slug,
    type: api.type || "rapport",
    titre: api.titre,
    auteurs: api.auteurs || [],
    date: api.date,
    thematique: api.thematique || "",
    resume: api.description || "",
    image: api.image || null,
    telechargeable: api.telechargeable ?? false,
  };
}

function mapExpert(api: any): Expert {
  return {
    id: api.id,
    nom: api.nom,
    titre: api.titre || "",
    institution: api.institution || "",
    specialite: api.specialite || "",
    portrait: api.image || null,
  };
}

let staticThematiquesFallback: Thematique[] | null = null;
let staticPublicationsFallback: Publication[] | null = null;
let staticExpertsFallback: Expert[] | null = null;

export async function getThematiquesListe(): Promise<Thematique[]> {
  if (!API_URL) {
    return (staticThematiquesFallback ??= readCollection<Thematique>("thematiques"));
  }
  try {
    const res = await fetch(`${API_URL}/thematiques?published=true&limit=100`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    const json = await res.json();
    if (!json?.success || !Array.isArray(json.data)) throw new Error("Unexpected API response shape");
    return json.data.map(mapThematique);
  } catch (err) {
    console.error("[thematiques] API unavailable, falling back to static content:", err);
    return (staticThematiquesFallback ??= readCollection<Thematique>("thematiques"));
  }
}

export async function getPublications(): Promise<Publication[]> {
  if (!API_URL) {
    return (staticPublicationsFallback ??= readCollection<Publication>("publications"));
  }
  try {
    const res = await fetch(`${API_URL}/publications?published=true&limit=100`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    const json = await res.json();
    if (!json?.success || !Array.isArray(json.data)) throw new Error("Unexpected API response shape");
    return json.data.map(mapPublication);
  } catch (err) {
    console.error("[publications] API unavailable, falling back to static content:", err);
    return (staticPublicationsFallback ??= readCollection<Publication>("publications"));
  }
}

export async function getPublicationBySlug(slug: string): Promise<Publication | null> {
  const all = await getPublications();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getExperts(): Promise<Expert[]> {
  if (!API_URL) {
    return (staticExpertsFallback ??= readCollection<Expert>("experts"));
  }
  try {
    const res = await fetch(`${API_URL}/experts?published=true&limit=100`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    const json = await res.json();
    if (!json?.success || !Array.isArray(json.data)) throw new Error("Unexpected API response shape");
    return json.data.map(mapExpert);
  } catch (err) {
    console.error("[experts] API unavailable, falling back to static content:", err);
    return (staticExpertsFallback ??= readCollection<Expert>("experts"));
  }
}
