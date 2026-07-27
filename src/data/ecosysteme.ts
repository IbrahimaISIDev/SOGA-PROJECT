import { readCollection } from "@/lib/content";

export type CategoriePartenaire =
  | "Ministères sectoriels"
  | "Universités & écoles d'ingénieurs"
  | "Entreprises pétrolières & gazières"
  | "ONG & bailleurs internationaux"
  | "Énergies renouvelables";

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
  "Ministères sectoriels",
  "Universités & écoles d'ingénieurs",
  "Entreprises pétrolières & gazières",
  "ONG & bailleurs internationaux",
  "Énergies renouvelables",
];
