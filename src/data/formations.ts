import { readCollection } from "@/lib/content";

export type Niveau = "DTS" | "BTS" | "Licence Pro" | "Master Pro";
export type Mode = "Temps plein" | "Alternance";
export type Pole = "technique" | "managerial" | "courte";

export interface Formation {
  id: string;
  slug: string;
  code: string;
  titre: string;
  pole: Pole;
  niveau: Niveau;
  mode: Mode;
  duree: string;
  rentree: string;
  placesLimitees: boolean;
  capacite?: number;
  /** Chemin public vers la brochure PDF (ex. "/brochures/genie-petrolier.pdf"), ou null si aucune n'est disponible. */
  brochureUrl: string | null;
  description: string;
  debouches: string[];
  semestres: {
    numero: number;
    titre: string;
    ues: string[];
  }[];
}

export const formations: Formation[] = readCollection<Formation>("formations");

export interface FormationCourte {
  id: string;
  titre: string;
  duree: string;
  domaine: string;
  description: string;
}

export const formationsCourtes: FormationCourte[] = readCollection<FormationCourte>("formations-courtes");
