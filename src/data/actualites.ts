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
  contenu?: string;
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
}

export const articles: Article[] = [
  {
    id: "a01",
    slug: "ouverture-candidatures-2025",
    type: "actualite",
    titre: "Ouverture des candidatures — Promotion 2025",
    extrait:
      "SOGA ouvre ses candidatures pour la rentrée d'octobre 2025. Huit filières disponibles du DTS au Master Pro dans les métiers du pétrole, du gaz et des énergies durables.",
    date: "2025-06-01",
    categorie: "Admissions",
    image: null,
  },
  {
    id: "a02",
    slug: "partenariat-petrosen",
    type: "actualite",
    titre: "SOGA signe un accord de partenariat avec Petrosen",
    extrait:
      "Un protocole d'accord stratégique entre SOGA et Petrosen ouvre la voie à des stages intégrés, des interventions de professionnels et des projets de recherche conjoints.",
    date: "2025-05-15",
    categorie: "Partenariats",
    image: null,
  },
  {
    id: "a03",
    slug: "think-tank-rapport-transition",
    type: "actualite",
    titre: "Le Think Tank SOGA publie son rapport sur la transition énergétique sénégalaise",
    extrait:
      "Premier rapport de fond du Think Tank SOGA : analyse des scénarios de transition énergétique pour le Sénégal à l'horizon 2035, avec recommandations politiques.",
    date: "2025-04-20",
    categorie: "Think Tank",
    image: null,
  },
  {
    id: "a04",
    slug: "visite-ministere",
    type: "communique",
    titre: "Visite du Ministère de l'Énergie au campus SOGA",
    extrait:
      "Le Secrétaire d'État à l'Énergie a effectué une visite officielle du campus SOGA, soulignant le rôle de l'académie dans la formation des cadres du secteur pétrolier national.",
    date: "2025-03-10",
    categorie: "Institutionnel",
    image: null,
  },
];

export const evenements: Evenement[] = [
  {
    id: "e01",
    slug: "journee-portes-ouvertes-juillet-2025",
    titre: "Journée Portes Ouvertes — Juillet 2025",
    date: "2025-07-19",
    heure: "09:00 – 17:00",
    lieu: "Campus SOGA, Dakar",
    type: "Portes ouvertes",
    description:
      "Rencontrez nos équipes pédagogiques, visitez les installations et assistez aux présentations de nos 8 filières. Inscription gratuite, places limitées.",
    inscriptionOuverte: true,
    image: null,
  },
  {
    id: "e02",
    slug: "conference-gaz-naturel-afrique",
    titre: "Conférence : Le gaz naturel et l'avenir énergétique africain",
    date: "2025-09-12",
    heure: "14:00 – 18:00",
    lieu: "Amphithéâtre SOGA, Dakar",
    type: "Conférence",
    description:
      "Experts industriels et chercheurs débattent du rôle du gaz naturel dans la transition énergétique africaine. Intervenants de Petrosen, Total Énergies et BP.",
    inscriptionOuverte: true,
    image: null,
  },
  {
    id: "e03",
    slug: "rentree-academique-octobre-2025",
    titre: "Rentrée académique 2025 — Cérémonie officielle",
    date: "2025-10-06",
    heure: "10:00 – 12:30",
    lieu: "Campus SOGA, Dakar",
    type: "Institutionnel",
    description:
      "Cérémonie d'accueil de la promotion 2025. En présence des partenaires industriels et des autorités académiques.",
    inscriptionOuverte: false,
    image: null,
  },
];
