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

export const partenaires: Partenaire[] = [
  {
    id: "pt01",
    nom: "Ministère du Pétrole et des Énergies",
    categorie: "Ministères sectoriels",
    logo: null,
  },
  {
    id: "pt02",
    nom: "CRSE",
    categorie: "Ministères sectoriels",
    logo: null,
    description: "Commission de Régulation du Secteur de l'Électricité",
  },
  {
    id: "pt03",
    nom: "Contenu provisoire",
    categorie: "Ministères sectoriels",
    logo: null,
    description: "Ministère partenaire — à confirmer",
  },
  {
    id: "pt04",
    nom: "Contenu provisoire",
    categorie: "Ministères sectoriels",
    logo: null,
    description: "Agence partenaire — à confirmer",
  },
  {
    id: "pt05",
    nom: "Contenu provisoire",
    categorie: "Universités & écoles d'ingénieurs",
    logo: null,
    description: "Institution académique — à confirmer",
  },
  {
    id: "pt06",
    nom: "Contenu provisoire",
    categorie: "Universités & écoles d'ingénieurs",
    logo: null,
    description: "École d'ingénieurs — à confirmer",
  },
  {
    id: "pt07",
    nom: "Contenu provisoire",
    categorie: "Universités & écoles d'ingénieurs",
    logo: null,
    description: "Centre de recherche — à confirmer",
  },
  {
    id: "pt08",
    nom: "Petrosen",
    categorie: "Entreprises pétrolières & gazières",
    logo: null,
    description: "Société nationale des pétroles du Sénégal",
  },
  {
    id: "pt09",
    nom: "TotalEnergies Sénégal",
    categorie: "Entreprises pétrolières & gazières",
    logo: null,
  },
  {
    id: "pt10",
    nom: "BP Sénégal",
    categorie: "Entreprises pétrolières & gazières",
    logo: null,
  },
  {
    id: "pt11",
    nom: "Contenu provisoire",
    categorie: "Entreprises pétrolières & gazières",
    logo: null,
    description: "Partenaire industriel — à confirmer",
  },
  {
    id: "pt12",
    nom: "Contenu provisoire",
    categorie: "ONG & bailleurs internationaux",
    logo: null,
    description: "Bailleur international — à confirmer",
  },
  {
    id: "pt13",
    nom: "Contenu provisoire",
    categorie: "ONG & bailleurs internationaux",
    logo: null,
    description: "ONG partenaire — à confirmer",
  },
  {
    id: "pt14",
    nom: "Contenu provisoire",
    categorie: "Énergies renouvelables",
    logo: null,
    description: "Acteur des énergies renouvelables — à confirmer",
  },
];

export const temoignages: Temoignage[] = [
  {
    id: "t01",
    auteur: "Contenu provisoire",
    titre: "Ingénieur de production",
    promotion: "Promotion 2024",
    texte:
      "Contenu provisoire — témoignage à intégrer dès réception de la validation du diplômé concerné.",
    photo: null,
  },
  {
    id: "t02",
    auteur: "Contenu provisoire",
    titre: "Consultante énergie",
    promotion: "Promotion 2023",
    texte:
      "Contenu provisoire — témoignage à intégrer dès réception de la validation de la diplômée concernée.",
    photo: null,
  },
];

export const categoriesPartenaires: CategoriePartenaire[] = [
  "Ministères sectoriels",
  "Universités & écoles d'ingénieurs",
  "Entreprises pétrolières & gazières",
  "ONG & bailleurs internationaux",
  "Énergies renouvelables",
];
