import { readCollection } from "@/lib/content";
import type { Partenaire, Temoignage, CategoriePartenaire } from "@/data/ecosysteme";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function mapPartenaire(api: any): Partenaire {
  return {
    id: api.id,
    nom: api.nom,
    categorie: (api.categorie || "") as CategoriePartenaire,
    logo: api.logo || null,
    description: api.description || "",
  };
}

function mapTemoignage(api: any): Temoignage {
  return {
    id: api.id,
    auteur: api.nom,
    titre: api.role || "",
    promotion: api.promotion || "",
    texte: api.contenu,
    photo: api.image || null,
  };
}

let staticPartenairesFallback: Partenaire[] | null = null;
let staticTemoignagesFallback: Temoignage[] | null = null;

export async function getPartenaires(): Promise<Partenaire[]> {
  if (!API_URL) {
    return (staticPartenairesFallback ??= readCollection<Partenaire>("partenaires"));
  }
  try {
    const res = await fetch(`${API_URL}/partenaires?published=true&limit=100`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    const json = await res.json();
    if (!json?.success || !Array.isArray(json.data)) throw new Error("Unexpected API response shape");
    return json.data.map(mapPartenaire);
  } catch (err) {
    console.error("[partenaires] API unavailable, falling back to static content:", err);
    return (staticPartenairesFallback ??= readCollection<Partenaire>("partenaires"));
  }
}

export async function getTemoignages(): Promise<Temoignage[]> {
  if (!API_URL) {
    return (staticTemoignagesFallback ??= readCollection<Temoignage>("temoignages"));
  }
  try {
    const res = await fetch(`${API_URL}/temoignages?published=true&limit=100`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    const json = await res.json();
    if (!json?.success || !Array.isArray(json.data)) throw new Error("Unexpected API response shape");
    return json.data.map(mapTemoignage);
  } catch (err) {
    console.error("[temoignages] API unavailable, falling back to static content:", err);
    return (staticTemoignagesFallback ??= readCollection<Temoignage>("temoignages"));
  }
}
