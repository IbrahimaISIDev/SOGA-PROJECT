import { readDoc } from "@/lib/content";

export interface MembreEquipe {
  id: string;
  slug: string;
  nom: string;
  titre: string;
  direction: "fondation" | "pedagogique" | "administrative" | "thinktank" | "admissions";
  specialite: string;
  biographie: string;
  filieres: string[];
  portrait: string | null;
}

export interface InstitutionDoc {
  nom: string;
  sigle: string;
  tagline: string;
  presentation: string;
  historique: string;
  adresse: string;
  email: string;
  telephone: string;
  horaires: string;
  reseauxSociaux: {
    facebook: string | null;
    linkedin: string | null;
    instagram: string | null;
    youtube: string | null;
    twitter: string | null;
  };
  campuses: {
    ville: string;
    adresse: string;
  }[];
  mission: string;
  vision: string;
  valeurs: {
    titre: string;
    sousTitre: string;
    description: string;
  }[];
  chiffres: {
    valeur: string;
    libelle: string;
  }[];
  fondatrice: {
    nom: string;
    titre: string;
    qualifications: string;
    citation: string;
    biographie: string[];
    portrait: string | null;
  };
  organigramme: {
    label: string;
    niveau: number;
    accent: boolean;
  }[];
  campus: {
    description: string;
    infrastructures: {
      titre: string;
      detail: string;
      enPlanification: boolean;
      photo: string | null;
    }[];
    photos: string[];
  };
}

/**
 * Static fallback only — pages should read institution data via
 * getInstitution() in @/lib/api/institution, which fetches the backend API
 * (falling back to this static doc if it's unreachable). Kept here, not
 * exported alongside the type, so nothing accidentally imports the stale
 * synchronous version.
 */
export const staticInstitutionDoc = readDoc<InstitutionDoc>("institution", "institution");
