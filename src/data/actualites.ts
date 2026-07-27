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
    contenu: [
      "Les candidatures pour l'ensemble des filières techniques et managériales de SOGA sont désormais ouvertes. La rentrée est prévue en octobre 2025, à Dakar.",
      "Les candidats peuvent déposer leur dossier directement en ligne via l'assistant de candidature, disponible en français et en anglais. Un entretien de motivation est prévu pour les filières Licence Pro et Master Pro.",
      "Les pièces à fournir incluent le dernier relevé de notes, le diplôme ou attestation de réussite, une pièce d'identité valide et une lettre de motivation. Le comité d'admission rend sa décision sous 10 jours ouvrés après réception du dossier complet.",
    ],
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
    contenu: [
      "Un protocole d'accord stratégique a été signé entre la Senegal Oil and Gas Academy et la Société des Pétroles du Sénégal (Petrosen), formalisant une collaboration académique et industrielle de long terme.",
      "Ce partenariat ouvre la voie à des stages opérationnels intégrés dans les cursus SOGA, à des interventions régulières de professionnels Petrosen en amphithéâtre, ainsi qu'à des projets de recherche appliquée conduits conjointement par le Think Tank SOGA et les équipes de Petrosen.",
      "Il s'inscrit dans la stratégie de SOGA d'ancrer ses formations dans la réalité industrielle sénégalaise, en rapprochant monde académique et acteurs de terrain du secteur pétrolier.",
    ],
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
    contenu: [
      "Le Think Tank de la Senegal Oil and Gas Academy publie son premier rapport de fond : une analyse prospective des scénarios de transition énergétique pour le Sénégal à l'horizon 2035.",
      "Ce rapport examine les trajectoires possibles d'un mix énergétique sénégalais alliant exploitation des ressources hydrocarbures récemment découvertes et développement accéléré des énergies renouvelables. Il propose des recommandations concrètes à destination des décideurs publics et des opérateurs du secteur.",
      "Le document est disponible en téléchargement libre sur la plateforme du Think Tank SOGA et sera présenté lors d'une conférence ouverte au public en septembre 2025.",
    ],
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
    contenu: [
      "Le Secrétaire d'État à l'Énergie a effectué une visite officielle du campus de la Senegal Oil and Gas Academy le 10 mars 2025. Accompagné d'une délégation technique, il a pu découvrir les laboratoires et les équipements pédagogiques de l'institution.",
      "Cette visite souligne l'intérêt des autorités publiques pour le rôle que SOGA entend jouer dans la formation des cadres nationaux du secteur pétrolier. La directrice générale, Dr. Aïssatou Cissoko, a présenté la vision pédagogique de l'académie et les perspectives d'expansion des filières.",
    ],
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
    placesLimitees: true,
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
    placesLimitees: false,
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
    placesLimitees: false,
  },
];
