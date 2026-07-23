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
  description: string;
  debouches: string[];
  semestres: {
    numero: number;
    titre: string;
    ues: string[];
  }[];
}

export const formations: Formation[] = [
  {
    id: "f01",
    slug: "genie-petrolier",
    code: "GP-LP",
    titre: "Génie Pétrolier",
    pole: "technique",
    niveau: "Licence Pro",
    mode: "Temps plein",
    duree: "3 ans",
    rentree: "Octobre 2025",
    placesLimitees: true,
    capacite: 30,
    description:
      "Formation d'excellence couvrant l'exploration, le forage, la production et la gestion des réservoirs pétroliers. Socle technique rigoureux ancré dans le contexte ouest-africain.",
    debouches: [
      "Ingénieur reservoir",
      "Technicien de forage",
      "Géologue pétrolier",
      "Ingénieur de production",
    ],
    semestres: [
      {
        numero: 1,
        titre: "Fondamentaux scientifiques",
        ues: ["Géologie de base", "Mathématiques appliquées", "Chimie des fluides"],
      },
      {
        numero: 2,
        titre: "Exploration et géophysique",
        ues: ["Sismique réflexion", "Pétrophysique", "Cartographie géologique"],
      },
      {
        numero: 3,
        titre: "Forage et complétion",
        ues: ["Techniques de forage", "Fluides de forage", "Sécurité puits"],
      },
      {
        numero: 4,
        titre: "Production et réservoirs",
        ues: ["Ingénierie de réservoirs", "Optimisation de production", "EOR"],
      },
      {
        numero: 5,
        titre: "HSE & Réglementation",
        ues: ["Normes HSE", "Droit pétrolier", "Code pétrolier sénégalais"],
      },
      {
        numero: 6,
        titre: "Projet de fin d'études",
        ues: ["Stage industrie 4 mois", "Mémoire de licence", "Soutenance"],
      },
    ],
  },
  {
    id: "f02",
    slug: "genie-gaz",
    code: "GG-LP",
    titre: "Génie du Gaz",
    pole: "technique",
    niveau: "Licence Pro",
    mode: "Temps plein",
    duree: "3 ans",
    rentree: "Octobre 2025",
    placesLimitees: true,
    capacite: 25,
    description:
      "Spécialisation sur les filières GNL, gaz naturel et transport par pipeline. Préparation aux standards internationaux du secteur gazier en plein essor au Sénégal.",
    debouches: [
      "Ingénieur procédés gaz",
      "Technicien GNL",
      "Opérateur pipeline",
      "Inspecteur HSE gaz",
    ],
    semestres: [
      { numero: 1, titre: "Fondamentaux gaziers", ues: ["Chimie des gaz", "Thermodynamique", "Sécurité industrielle"] },
      { numero: 2, titre: "Transport et distribution", ues: ["Réseaux de pipelines", "Compression", "Instrumentation gaz"] },
      { numero: 3, titre: "GNL & Traitements", ues: ["Liquéfaction", "Traitement du gaz naturel", "Stockage GNL"] },
      { numero: 4, titre: "HSE & Réglementation gaz", ues: ["Normes gaz", "Environnement", "Réglementation CEDEAO"] },
      { numero: 5, titre: "Projets gaziers", ues: ["Montage de projet", "Économie gazière", "Gestion contractuelle"] },
      { numero: 6, titre: "Stage & Mémoire", ues: ["Stage 4 mois", "Mémoire de licence", "Soutenance"] },
    ],
  },
  {
    id: "f03",
    slug: "energies-renouvelables",
    code: "ER-LP",
    titre: "Énergies Renouvelables et Transition Énergétique",
    pole: "technique",
    niveau: "Licence Pro",
    mode: "Temps plein",
    duree: "3 ans",
    rentree: "Octobre 2025",
    placesLimitees: false,
    description:
      "Hybridation solaire/éolien, stockage, réseaux intelligents et intégration des ENR dans les systèmes électriques ouest-africains.",
    debouches: [
      "Ingénieur énergie solaire",
      "Consultant transition énergétique",
      "Chef de projet ENR",
    ],
    semestres: [
      { numero: 1, titre: "Physique de l'énergie", ues: ["Électrotechnique", "Ressources solaires & éoliennes", "Mathématiques"] },
      { numero: 2, titre: "Systèmes photovoltaïques", ues: ["Dimensionnement PV", "Onduleurs", "Raccordement réseau"] },
      { numero: 3, titre: "Éolien & Hybridation", ues: ["Éoliennes", "Systèmes hybrides", "Stockage batterie"] },
      { numero: 4, titre: "Réseaux intelligents", ues: ["Smart grids", "Effacement de charge", "Outils de simulation"] },
      { numero: 5, titre: "Transition & Politiques", ues: ["Marchés de l'énergie", "Financement ENR", "Cadre CEDEAO ENR"] },
      { numero: 6, titre: "Stage & Mémoire", ues: ["Stage 4 mois", "Mémoire de licence", "Soutenance"] },
    ],
  },
  {
    id: "f04",
    slug: "maintenance-industrielle",
    code: "MI-BTS",
    titre: "Maintenance Industrielle Pétrochimique",
    pole: "technique",
    niveau: "BTS",
    mode: "Temps plein",
    duree: "2 ans",
    rentree: "Octobre 2025",
    placesLimitees: false,
    description:
      "Maintenance préventive et curative des équipements de raffinerie, d'unités de traitement et de stations de pompage.",
    debouches: ["Technicien de maintenance", "Inspecteur équipements", "Chef d'équipe maintenance"],
    semestres: [
      { numero: 1, titre: "Bases de la maintenance", ues: ["Mécanique industrielle", "Électricité industrielle", "Pneumatique/hydraulique"] },
      { numero: 2, titre: "Équipements pétroChimiques", ues: ["Pompes & compresseurs", "Échangeurs", "Vannes & robinetterie"] },
      { numero: 3, titre: "Maintenance préventive", ues: ["Analyse vibratoire", "Thermographie IR", "GMAO"] },
      { numero: 4, titre: "Stage & Projet", ues: ["Stage 3 mois", "Rapport de stage", "Soutenance BTS"] },
    ],
  },
  {
    id: "f05",
    slug: "hse-environnement",
    code: "HSE-BTS",
    titre: "Hygiène, Sécurité, Environnement (HSE)",
    pole: "technique",
    niveau: "BTS",
    mode: "Temps plein",
    duree: "2 ans",
    rentree: "Octobre 2025",
    placesLimitees: false,
    description:
      "Formation aux normes HSE internationales (ISO 45001, ISO 14001) appliquées aux industries pétrolière, gazière et minière.",
    debouches: [
      "Responsable HSE",
      "Auditeur environnemental",
      "Technicien sécurité industrielle",
    ],
    semestres: [
      { numero: 1, titre: "Fondamentaux HSE", ues: ["Droit du travail", "Analyse des risques", "Ergonomie"] },
      { numero: 2, titre: "Sécurité industrielle", ues: ["Prévention incendie", "Équipements de protection", "Plans d'urgence"] },
      { numero: 3, titre: "Environnement", ues: ["ISO 14001", "Évaluation d'impact environnemental", "Traitement des déchets"] },
      { numero: 4, titre: "Stage & Projet HSE", ues: ["Stage 3 mois", "Rapport de stage", "Soutenance BTS"] },
    ],
  },
  {
    id: "f06",
    slug: "management-projets-energetiques",
    code: "MPE-MP",
    titre: "Management des Projets Énergétiques",
    pole: "managerial",
    niveau: "Master Pro",
    mode: "Alternance",
    duree: "2 ans",
    rentree: "Octobre 2025",
    placesLimitees: true,
    capacite: 20,
    description:
      "Formation executive couvrant le pilotage de projets complexes dans l'industrie énergétique : structuration financière, gestion des risques, négociation internationale.",
    debouches: [
      "Chef de projet senior",
      "Directeur de projet énergie",
      "Consultant stratégie",
      "Project Manager O&G",
    ],
    semestres: [
      { numero: 1, titre: "Management de projet avancé", ues: ["PMBoK / Prince2", "Planification", "Gestion des risques"] },
      { numero: 2, titre: "Finance & Structuration", ues: ["Montage financier", "Contractualisation", "Due diligence"] },
      { numero: 3, titre: "Alternance & Projets terrain", ues: ["Mission en entreprise", "Études de cas", "Négociation internationale"] },
      { numero: 4, titre: "Leadership & Mémoire", ues: ["Gestion d'équipes multiculturelles", "Thèse professionnelle", "Soutenance Master"] },
    ],
  },
  {
    id: "f07",
    slug: "economie-droit-petrole",
    code: "EDP-LP",
    titre: "Économie et Droit du Pétrole",
    pole: "managerial",
    niveau: "Licence Pro",
    mode: "Temps plein",
    duree: "3 ans",
    rentree: "Octobre 2025",
    placesLimitees: false,
    description:
      "Analyse économique des marchés énergétiques, contrats pétroliers (PSA, Joint-ventures), fiscalité et cadre réglementaire sénégalais et OHADA.",
    debouches: [
      "Juriste pétrolier",
      "Économiste énergie",
      "Négociateur contrats",
      "Analyste politique énergétique",
    ],
    semestres: [],
  },
  {
    id: "f08",
    slug: "logistique-supply-chain",
    code: "LSC-DTS",
    titre: "Logistique et Supply Chain Pétrolière",
    pole: "managerial",
    niveau: "DTS",
    mode: "Temps plein",
    duree: "2 ans",
    rentree: "Octobre 2025",
    placesLimitees: false,
    description:
      "Gestion de la chaîne d'approvisionnement dans l'industrie pétrolière : achats, logistique offshore/onshore, gestion des stocks critiques.",
    debouches: [
      "Responsable supply chain",
      "Acheteur industriel",
      "Coordinateur logistique offshore",
    ],
    semestres: [
      { numero: 1, titre: "Fondamentaux de la logistique", ues: ["Supply chain management", "Transport international", "Achats industriels"] },
      { numero: 2, titre: "Logistique pétrolière", ues: ["Logistique offshore", "Gestion des stocks critiques", "Douanes & commerce"] },
    ],
  },
];

export const formationsCourtes: {
  id: string;
  titre: string;
  duree: string;
  domaine: string;
  description: string;
}[] = [
  {
    id: "fc01",
    titre: "Lecture de Plans et Schémas P&ID",
    duree: "5 jours",
    domaine: "Technique",
    description: "Déchiffrage et interprétation des plans de tuyauterie et d'instrumentation.",
  },
  {
    id: "fc02",
    titre: "Gestion de Chantier Pétrolier",
    duree: "3 jours",
    domaine: "Management",
    description: "Coordination d'équipes multiculturelles sur site de forage ou de production.",
  },
  {
    id: "fc03",
    titre: "Initiation au Code Pétrolier Sénégalais",
    duree: "2 jours",
    domaine: "Juridique",
    description: "Tour d'horizon de la réglementation sénégalaise et des contrats de partage de production.",
  },
  {
    id: "fc04",
    titre: "Sécurité Offshore — BOSIET",
    duree: "4 jours",
    domaine: "HSE",
    description: "Basic Offshore Safety Induction and Emergency Training — norme OPITO.",
  },
];
