import { readCollection } from "@/lib/content";
import type { MembreEquipe } from "@/data/institution";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function mapMembre(api: any): MembreEquipe {
  return {
    id: api.id,
    slug: api.slug || api.id,
    nom: api.nom,
    titre: api.role || "",
    direction: (api.direction || "pedagogique") as MembreEquipe["direction"],
    specialite: api.specialite || "",
    biographie: api.bio || "",
    filieres: api.filieres || [],
    portrait: api.image || null,
  };
}

let staticFallback: MembreEquipe[] | null = null;
function getStaticFallback(): MembreEquipe[] {
  if (!staticFallback) staticFallback = readCollection<MembreEquipe>("equipe");
  return staticFallback;
}

export async function getEquipe(): Promise<MembreEquipe[]> {
  if (!API_URL) return getStaticFallback();
  try {
    const res = await fetch(`${API_URL}/equipe?published=true&limit=100`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    const json = await res.json();
    if (!json?.success || !Array.isArray(json.data)) throw new Error("Unexpected API response shape");
    return json.data.map(mapMembre);
  } catch (err) {
    console.error("[equipe] API unavailable, falling back to static content:", err);
    return getStaticFallback();
  }
}
