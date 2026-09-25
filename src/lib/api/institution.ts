import { staticInstitutionDoc, type InstitutionDoc } from "@/data/institution";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function mapInstitution(api: any): InstitutionDoc {
  return {
    nom: api.nom,
    sigle: api.sigle || "",
    tagline: api.tagline || "",
    presentation: api.presentation || "",
    historique: api.historique || "",
    adresse: api.adresse || "",
    email: api.email || "",
    telephone: api.telephone || "",
    horaires: api.horaires || "",
    reseauxSociaux: {
      facebook: api.facebook || null,
      linkedin: api.linkedin || null,
      instagram: api.instagram || null,
      youtube: api.youtube || null,
      twitter: api.twitter || null,
    },
    campuses: api.campuses || [],
    mission: api.mission || "",
    vision: api.vision || "",
    valeurs: api.valeurs || [],
    chiffres: api.chiffres || [],
    fondatrice: api.fondatrice || {
      nom: "",
      titre: "",
      qualifications: "",
      citation: "",
      biographie: [],
      portrait: null,
    },
    organigramme: api.organigramme || [],
    campus: api.campusInfo || { description: "", infrastructures: [], photos: [] },
  };
}

let cached: InstitutionDoc | null = null;

/**
 * Reads from the backend API when NEXT_PUBLIC_API_URL is configured, falling
 * back to the static content/institution/institution.json doc if the API is
 * unreachable or misconfigured — same pattern as src/lib/api/formations.ts.
 */
export async function getInstitution(): Promise<InstitutionDoc> {
  if (!API_URL) return staticInstitutionDoc;
  try {
    const res = await fetch(`${API_URL}/institution`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    const json = await res.json();
    if (!json?.success || !json.data) throw new Error("Unexpected API response shape");
    return (cached = mapInstitution(json.data));
  } catch (err) {
    console.error("[institution] API unavailable, falling back to static content:", err);
    return cached ?? staticInstitutionDoc;
  }
}
