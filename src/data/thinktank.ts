import { readCollection } from "@/lib/content";

export interface Publication {
  id: string;
  slug: string;
  type: "rapport" | "note" | "article" | "tribune";
  titre: string;
  auteurs: string[];
  date: string;
  thematique: string;
  resume: string;
  image: string | null;
  telechargeable: boolean;
}

export interface Expert {
  id: string;
  nom: string;
  titre: string;
  institution: string;
  specialite: string;
  portrait: string | null;
}

export interface Thematique {
  id: string;
  titre: string;
  description: string;
}

export const thematiquesListe: Thematique[] = readCollection<Thematique>("thematiques");

export const thematiques = [
  "Gouvernance des ressources naturelles",
  "Transition énergétique & climat",
  "Contenu local & emploi",
  "Financement des projets énergétiques",
  "Droit pétrolier & fiscal",
  "Géopolitique de l'énergie en Afrique de l'Ouest",
];

export const publications: Publication[] = readCollection<Publication>("publications");

export const experts: Expert[] = readCollection<Expert>("experts");
