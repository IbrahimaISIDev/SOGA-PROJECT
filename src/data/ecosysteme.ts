export type CategoriePartenaire =
  | "Industrie pétrolière & gazière"
  | "Énergies renouvelables"
  | "Institutions financières"
  | "Universités & centres de recherche"
  | "Agences gouvernementales";

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
    nom: "Petrosen",
    categorie: "Industrie pétrolière & gazière",
    logo: null,
    description: "Société nationale des pétroles du Sénégal",
  },
  {
    id: "pt02",
    nom: "TotalEnergies Sénégal",
    categorie: "Industrie pétrolière & gazière",
    logo: null,
  },
  {
    id: "pt03",
    nom: "BP Sénégal",
    categorie: "Industrie pétrolière & gazière",
    logo: null,
  },
  {
    id: "pt04",
    nom: "Contenu provisoire",
    categorie: "Énergies renouvelables",
    logo: null,
  },
  {
    id: "pt05",
    nom: "Contenu provisoire",
    categorie: "Institutions financières",
    logo: null,
  },
  {
    id: "pt06",
    nom: "Contenu provisoire",
    categorie: "Universités & centres de recherche",
    logo: null,
  },
  {
    id: "pt07",
    nom: "Ministère du Pétrole et des Énergies",
    categorie: "Agences gouvernementales",
    logo: null,
  },
  {
    id: "pt08",
    nom: "CRSE",
    categorie: "Agences gouvernementales",
    logo: null,
    description: "Commission de Régulation du Secteur de l'Électricité",
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
