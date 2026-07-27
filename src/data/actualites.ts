import { readCollection } from "@/lib/content";

export type TypeContenu = "actualite" | "evenement" | "communique";

export interface Article {
  id: string;
  slug: string;
  type: TypeContenu;
  titre: string;
  extrait: string;
  date: string;
  categorie: string;
  image: string | null;
  contenu?: string[];
}

export interface Evenement {
  id: string;
  slug: string;
  titre: string;
  date: string;
  heure: string;
  lieu: string;
  type: string;
  description: string;
  inscriptionOuverte: boolean;
  image: string | null;
  placesLimitees?: boolean;
}

export const categories = [
  "Toutes",
  "Admissions",
  "Partenariats",
  "Think Tank",
  "Campus",
  "Institutionnel",
] as const;

export const articles: Article[] = readCollection<Article>("articles");

export const evenements: Evenement[] = readCollection<Evenement>("evenements");
