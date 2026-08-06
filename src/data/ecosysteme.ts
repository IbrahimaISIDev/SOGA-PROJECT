import { readCollection } from "@/lib/content";

export type CategoriePartenaire =
  | "Accréditation & qualité académique"
  | "Institutions publiques & appui à la formation";

export interface Partenaire {
  id: string;
  nom: string;
  categorie: CategoriePartenaire;
  logo: string | null;
  description?: string;
}

export interface Temoignage {
  id: string;
  auteur: string;
  titre: string;
  promotion: string;
  texte: string;
  photo: string | null;
}

export const partenaires: Partenaire[] = readCollection<Partenaire>("partenaires");

export const temoignages: Temoignage[] = readCollection<Temoignage>("temoignages");

export const categoriesPartenaires: CategoriePartenaire[] = [
  "Accréditation & qualité académique",
  "Institutions publiques & appui à la formation",
];
