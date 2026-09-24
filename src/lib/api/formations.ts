import { readCollection } from "@/lib/content";
import type { Formation } from "@/data/formations";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function mapFormation(api: any): Formation {
  return {
    id: api.id,
    slug: api.slug,
    code: api.codeFiliere,
    titre: api.titre,
    pole: api.pole,
    niveau: api.niveau,
    mode: api.rythme,
    duree: api.duree,
    rentree: api.rentree || "",
    placesLimitees: api.placesLimitees || false,
    capacite: api.capacite ?? undefined,
    brochureUrl: api.brochureUrl || null,
    image: api.image || null,
    description: api.description || "",
    objectifs: api.objectifs || "",
    conditionsAdmission: api.conditionsAdmission || "",
    publicConcerne: api.publicConcerne || "",
    debouches: api.debouches || [],
    semestres: api.semestres || [],
  };
}

let staticFallback: Formation[] | null = null;
function getStaticFallback(): Formation[] {
  if (!staticFallback) staticFallback = readCollection<Formation>("formations");
  return staticFallback;
}

/**
 * Reads from the backend API when NEXT_PUBLIC_API_URL is configured, falling
 * back to the static content/formations/*.json files (the pre-backend source
 * of truth) if the API is unreachable or misconfigured — the public site
 * must keep working even if the VPS backend is down.
 */
export async function getFormations(): Promise<Formation[]> {
  if (!API_URL) return getStaticFallback();
  try {
    const res = await fetch(`${API_URL}/formations?published=true&limit=100`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    const json = await res.json();
    if (!json?.success || !Array.isArray(json.data)) {
      throw new Error("Unexpected API response shape");
    }
    return json.data.map(mapFormation);
  } catch (err) {
    console.error("[formations] API unavailable, falling back to static content:", err);
    return getStaticFallback();
  }
}

export async function getFormationBySlug(slug: string): Promise<Formation | null> {
  const all = await getFormations();
  return all.find((f) => f.slug === slug) ?? null;
}
