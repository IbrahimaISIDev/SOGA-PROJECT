import { readCollection, readDoc } from "@/lib/content";

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

interface InstitutionDoc {
  nom: string;
  sigle: string;
  tagline: string;
  adresse: string;
  email: string;
  telephone: string;
  mission: string[];
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

const institutionDoc = readDoc<InstitutionDoc>("institution", "institution");
const equipe = readCollection<MembreEquipe>("equipe");

export const institution = {
  ...institutionDoc,
  equipe,
};
