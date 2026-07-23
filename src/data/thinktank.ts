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

export const thematiques = [
  "Gouvernance des ressources naturelles",
  "Transition énergétique & climat",
  "Contenu local & emploi",
  "Financement des projets énergétiques",
  "Droit pétrolier & fiscal",
  "Géopolitique de l'énergie en Afrique de l'Ouest",
];

export const publications: Publication[] = [
  {
    id: "p01",
    slug: "transition-energetique-senegal-2035",
    type: "rapport",
    titre: "Scénarios de transition énergétique pour le Sénégal à l'horizon 2035",
    auteurs: ["Think Tank SOGA"],
    date: "2025-04-20",
    thematique: "Transition énergétique & climat",
    resume:
      "Analyse prospective des trajectoires énergétiques sénégalaises combinant exploitation des hydrocarbures et développement accéléré des énergies renouvelables. Recommandations pour un mix énergétique souverain et durable.",
    image: null,
    telechargeable: true,
  },
  {
    id: "p02",
    slug: "contenu-local-petrole-senegal",
    type: "note",
    titre: "Contenu local dans l'industrie pétrolière sénégalaise : état des lieux et leviers",
    auteurs: ["Think Tank SOGA"],
    date: "2025-02-10",
    thematique: "Contenu local & emploi",
    resume:
      "Note d'analyse sur les dispositions du Code pétrolier sénégalais en matière de contenu local et leur application effective dans les projets GTA et Sangomar.",
    image: null,
    telechargeable: true,
  },
  {
    id: "p03",
    slug: "gouvernance-fonds-petrolier",
    type: "rapport",
    titre: "Gouvernance du fonds souverain pétrolier : leçons d'Afrique et perspectives sénégalaises",
    auteurs: ["Think Tank SOGA"],
    date: "2024-11-05",
    thematique: "Gouvernance des ressources naturelles",
    resume:
      "Étude comparative des fonds souverains africains (Ghana, Nigeria, Angola) et recommandations pour la structuration du fonds sénégalais.",
    image: null,
    telechargeable: true,
  },
  {
    id: "p04",
    slug: "financement-projets-ener-afrique",
    type: "note",
    titre: "Financement des projets énergétiques en Afrique de l'Ouest : panorama 2024",
    auteurs: ["Think Tank SOGA"],
    date: "2024-09-18",
    thematique: "Financement des projets énergétiques",
    resume:
      "Tour d'horizon des mécanismes de financement disponibles (obligations vertes, blended finance, DFI) pour les projets énergétiques en Afrique subsaharienne.",
    image: null,
    telechargeable: false,
  },
];

export const experts: Expert[] = [
  {
    id: "ex01",
    nom: "Contenu provisoire",
    titre: "Directeur de recherche",
    institution: "SOGA Think Tank",
    specialite: "Économie de l'énergie",
    portrait: null,
  },
  {
    id: "ex02",
    nom: "Contenu provisoire",
    titre: "Chercheur associé",
    institution: "SOGA Think Tank",
    specialite: "Droit pétrolier",
    portrait: null,
  },
  {
    id: "ex03",
    nom: "Contenu provisoire",
    titre: "Chercheure associée",
    institution: "SOGA Think Tank",
    specialite: "Transition énergétique",
    portrait: null,
  },
];
