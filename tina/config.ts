import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      // ── Formations ──────────────────────────────────────────
      {
        name: "formation",
        label: "Formations",
        path: "content/formations",
        format: "json",
        fields: [
          { type: "string", name: "itemId", label: "Identifiant interne (ordre affichage, ex. f01)", required: true },
          { type: "string", name: "slug", label: "Slug (URL)", required: true },
          { type: "string", name: "code", label: "Code filière", required: true },
          { type: "string", name: "titre", label: "Titre", isTitle: true, required: true },
          {
            type: "string",
            name: "pole",
            label: "Pôle",
            options: ["technique", "managerial", "courte"],
            required: true,
          },
          {
            type: "string",
            name: "niveau",
            label: "Niveau",
            options: ["DTS", "BTS", "Licence Pro", "Master Pro"],
            required: true,
          },
          {
            type: "string",
            name: "mode",
            label: "Rythme",
            options: ["Temps plein", "Alternance"],
            required: true,
          },
          { type: "string", name: "duree", label: "Durée", required: true },
          { type: "string", name: "rentree", label: "Rentrée", required: true },
          { type: "boolean", name: "placesLimitees", label: "Places limitées" },
          { type: "number", name: "capacite", label: "Capacité (places)" },
          { type: "string", name: "brochureUrl", label: "Brochure PDF (chemin public)" },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
          { type: "string", name: "debouches", label: "Débouchés", list: true },
          {
            type: "object",
            name: "semestres",
            label: "Semestres",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.titre }) },
            fields: [
              { type: "number", name: "numero", label: "Numéro", required: true },
              { type: "string", name: "titre", label: "Titre du semestre", required: true },
              { type: "string", name: "ues", label: "Unités d'enseignement", list: true },
            ],
          },
        ],
      },
      // ── Formations courtes ──────────────────────────────────
      {
        name: "formationCourte",
        label: "Formations courtes",
        path: "content/formations-courtes",
        format: "json",
        fields: [
          { type: "string", name: "itemId", label: "Identifiant interne (ordre affichage, ex. f01)", required: true },
          { type: "string", name: "titre", label: "Titre", isTitle: true, required: true },
          { type: "string", name: "duree", label: "Durée", required: true },
          { type: "string", name: "domaine", label: "Domaine", required: true },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
        ],
      },
      // ── Actualités ───────────────────────────────────────────
      {
        name: "article",
        label: "Actualités",
        path: "content/articles",
        format: "json",
        fields: [
          { type: "string", name: "itemId", label: "Identifiant interne (ordre affichage, ex. f01)", required: true },
          { type: "string", name: "slug", label: "Slug (URL)", required: true },
          {
            type: "string",
            name: "type",
            label: "Type",
            options: ["actualite", "evenement", "communique"],
            required: true,
          },
          { type: "string", name: "titre", label: "Titre", isTitle: true, required: true },
          { type: "string", name: "extrait", label: "Extrait", ui: { component: "textarea" }, required: true },
          { type: "datetime", name: "date", label: "Date", required: true },
          { type: "string", name: "categorie", label: "Catégorie", required: true },
          { type: "image", name: "image", label: "Image" },
          { type: "string", name: "contenu", label: "Contenu (un paragraphe par ligne)", list: true },
        ],
      },
      // ── Événements ───────────────────────────────────────────
      {
        name: "evenement",
        label: "Événements",
        path: "content/evenements",
        format: "json",
        fields: [
          { type: "string", name: "itemId", label: "Identifiant interne (ordre affichage, ex. f01)", required: true },
          { type: "string", name: "slug", label: "Slug (URL)", required: true },
          { type: "string", name: "titre", label: "Titre", isTitle: true, required: true },
          { type: "datetime", name: "date", label: "Date", required: true },
          { type: "string", name: "heure", label: "Horaire", required: true },
          { type: "string", name: "lieu", label: "Lieu", required: true },
          { type: "string", name: "type", label: "Type d'événement", required: true },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
          { type: "boolean", name: "inscriptionOuverte", label: "Inscription ouverte" },
          { type: "image", name: "image", label: "Image" },
          { type: "boolean", name: "placesLimitees", label: "Places limitées" },
        ],
      },
      // ── Partenaires ──────────────────────────────────────────
      {
        name: "partenaire",
        label: "Partenaires",
        path: "content/partenaires",
        format: "json",
        fields: [
          { type: "string", name: "itemId", label: "Identifiant interne (ordre affichage, ex. f01)", required: true },
          { type: "string", name: "nom", label: "Nom", isTitle: true, required: true },
          {
            type: "string",
            name: "categorie",
            label: "Catégorie",
            options: [
              "Ministères sectoriels",
              "Universités & écoles d'ingénieurs",
              "Entreprises pétrolières & gazières",
              "ONG & bailleurs internationaux",
              "Énergies renouvelables",
            ],
            required: true,
          },
          { type: "image", name: "logo", label: "Logo" },
          { type: "string", name: "description", label: "Description" },
        ],
      },
      // ── Témoignages ──────────────────────────────────────────
      {
        name: "temoignage",
        label: "Témoignages alumni",
        path: "content/temoignages",
        format: "json",
        fields: [
          { type: "string", name: "itemId", label: "Identifiant interne (ordre affichage, ex. f01)", required: true },
          { type: "string", name: "auteur", label: "Auteur", isTitle: true, required: true },
          { type: "string", name: "titre", label: "Titre / poste", required: true },
          { type: "string", name: "promotion", label: "Promotion", required: true },
          { type: "string", name: "texte", label: "Témoignage", ui: { component: "textarea" }, required: true },
          { type: "image", name: "photo", label: "Photo" },
        ],
      },
      // ── Équipe ───────────────────────────────────────────────
      {
        name: "membreEquipe",
        label: "Équipe",
        path: "content/equipe",
        format: "json",
        fields: [
          { type: "string", name: "itemId", label: "Identifiant interne (ordre affichage, ex. f01)", required: true },
          { type: "string", name: "slug", label: "Slug (URL)", required: true },
          { type: "string", name: "nom", label: "Nom", isTitle: true, required: true },
          { type: "string", name: "titre", label: "Fonction", required: true },
          {
            type: "string",
            name: "direction",
            label: "Direction",
            options: ["fondation", "pedagogique", "administrative", "thinktank", "admissions"],
            required: true,
          },
          { type: "string", name: "specialite", label: "Spécialité", required: true },
          { type: "string", name: "biographie", label: "Biographie", ui: { component: "textarea" }, required: true },
          { type: "string", name: "filieres", label: "Filières associées", list: true },
          { type: "image", name: "portrait", label: "Portrait" },
        ],
      },
      // ── Think Tank — Publications ────────────────────────────
      {
        name: "publication",
        label: "Publications Think Tank",
        path: "content/publications",
        format: "json",
        fields: [
          { type: "string", name: "itemId", label: "Identifiant interne (ordre affichage, ex. f01)", required: true },
          { type: "string", name: "slug", label: "Slug (URL)", required: true },
          {
            type: "string",
            name: "type",
            label: "Type",
            options: ["rapport", "note", "article", "tribune"],
            required: true,
          },
          { type: "string", name: "titre", label: "Titre", isTitle: true, required: true },
          { type: "string", name: "auteurs", label: "Auteurs", list: true },
          { type: "datetime", name: "date", label: "Date", required: true },
          { type: "string", name: "thematique", label: "Thématique", required: true },
          { type: "string", name: "resume", label: "Résumé", ui: { component: "textarea" }, required: true },
          { type: "image", name: "image", label: "Image" },
          { type: "boolean", name: "telechargeable", label: "Téléchargeable" },
        ],
      },
      // ── Think Tank — Experts ─────────────────────────────────
      {
        name: "expert",
        label: "Experts Think Tank",
        path: "content/experts",
        format: "json",
        fields: [
          { type: "string", name: "itemId", label: "Identifiant interne (ordre affichage, ex. f01)", required: true },
          { type: "string", name: "nom", label: "Nom", isTitle: true, required: true },
          { type: "string", name: "titre", label: "Fonction", required: true },
          { type: "string", name: "institution", label: "Institution", required: true },
          { type: "string", name: "specialite", label: "Spécialité", required: true },
          { type: "image", name: "portrait", label: "Portrait" },
        ],
      },
      // ── Think Tank — Thématiques ─────────────────────────────
      {
        name: "thematiqueItem",
        label: "Thématiques Think Tank",
        path: "content/thematiques",
        format: "json",
        fields: [
          { type: "string", name: "itemId", label: "Identifiant interne (ordre affichage, ex. f01)", required: true },
          { type: "string", name: "titre", label: "Titre", isTitle: true, required: true },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
        ],
      },
      // ── Institution (document unique) ───────────────────────
      {
        name: "institution",
        label: "Institution",
        path: "content/institution",
        format: "json",
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { type: "string", name: "nom", label: "Nom complet", required: true },
          { type: "string", name: "sigle", label: "Sigle", required: true },
          { type: "string", name: "tagline", label: "Tagline", required: true },
          { type: "string", name: "adresse", label: "Adresse", required: true },
          { type: "string", name: "email", label: "Email", required: true },
          { type: "string", name: "telephone", label: "Téléphone", required: true },
          { type: "string", name: "mission", label: "Mission (une phrase par ligne)", list: true },
          { type: "string", name: "vision", label: "Vision", ui: { component: "textarea" }, required: true },
          {
            type: "object",
            name: "valeurs",
            label: "Valeurs",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.titre }) },
            fields: [
              { type: "string", name: "titre", label: "Titre", required: true },
              { type: "string", name: "sousTitre", label: "Sous-titre", required: true },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "chiffres",
            label: "Chiffres clés",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.libelle }) },
            fields: [
              { type: "string", name: "valeur", label: "Valeur", required: true },
              { type: "string", name: "libelle", label: "Libellé", required: true },
            ],
          },
          {
            type: "object",
            name: "fondatrice",
            label: "Fondatrice",
            fields: [
              { type: "string", name: "nom", label: "Nom", required: true },
              { type: "string", name: "titre", label: "Titre", required: true },
              { type: "string", name: "qualifications", label: "Qualifications", required: true },
              { type: "string", name: "citation", label: "Citation", ui: { component: "textarea" }, required: true },
              { type: "string", name: "biographie", label: "Biographie (un paragraphe par ligne)", list: true },
              { type: "image", name: "portrait", label: "Portrait" },
            ],
          },
          {
            type: "object",
            name: "organigramme",
            label: "Organigramme",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label }) },
            fields: [
              { type: "string", name: "label", label: "Intitulé", required: true },
              { type: "number", name: "niveau", label: "Niveau hiérarchique", required: true },
              { type: "boolean", name: "accent", label: "Mise en avant" },
            ],
          },
          {
            type: "object",
            name: "campus",
            label: "Campus",
            fields: [
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" }, required: true },
              {
                type: "object",
                name: "infrastructures",
                label: "Infrastructures",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.titre }) },
                fields: [
                  { type: "string", name: "titre", label: "Titre", required: true },
                  { type: "string", name: "detail", label: "Détail", required: true },
                  { type: "boolean", name: "enPlanification", label: "En planification" },
                  { type: "image", name: "photo", label: "Photo" },
                ],
              },
              { type: "image", name: "photos", label: "Photos du campus", list: true },
            ],
          },
        ],
      },
    ],
  },
});
