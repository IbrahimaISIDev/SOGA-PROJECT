# SOGA — Senegal Oil and Gas Academy

Site institutionnel de la Senegal Oil and Gas Academy, une école supérieure
dédiée aux métiers du pétrole, du gaz et des énergies durables, basée à
Dakar. Le site présente les formations, les admissions, l'écosystème de
partenaires, le Think Tank de l'académie et l'institution elle-même.

## Stack technique

- [Next.js](https://nextjs.org) 16 (App Router, Turbopack)
- [React](https://react.dev) 19
- [TypeScript](https://www.typescriptlang.org) en mode strict
- [Tailwind CSS](https://tailwindcss.com) 4
- [Resend](https://resend.com) pour l'envoi des emails déclenchés par les formulaires

## Démarrage

```bash
npm install
npm run dev
```

Le site est servi sur [http://localhost:3000](http://localhost:3000).

## Variables d'environnement

Copier `.env.example` vers `.env.local` et renseigner les valeurs :

```bash
cp .env.example .env.local
```

| Variable | Rôle |
| --- | --- |
| `RESEND_API_KEY` | Clé API [Resend](https://resend.com). Sans elle, les formulaires fonctionnent toujours mais l'envoi d'email est simulé (journalisé côté serveur uniquement). |
| `RESEND_FROM_EMAIL` | Adresse d'expédition — doit provenir d'un domaine vérifié dans Resend, ou de l'adresse bac à sable `onboarding@resend.dev` en attendant la vérification. |
| `CONTACT_EMAIL_TO` | Adresse qui reçoit les notifications de formulaires. |

## Scripts

| Commande | Effet |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Sert le build de production |
| `npm run lint` | ESLint (flat config, `eslint-config-next`) |

## Structure du projet

```
src/
  app/            Routes (App Router) — pages publiques et routes API (src/app/api)
  components/     Composants React, organisés par domaine (layout, home, ui, ...)
  data/           Contenu structuré du site (formations, actualités, écosystème, ...)
  hooks/          Hooks partagés (ex. animations d'apparition respectueuses de prefers-reduced-motion)
  lib/            Utilitaires serveur (envoi d'email, validations)
```

## Contenu — comment ajouter une photo, un logo ou une brochure

Il n'y a pas d'interface d'administration : tout le contenu du site vit dans
les fichiers TypeScript de `src/data/` (formations, actualités, écosystème,
institution, think tank). Chaque champ visuel (`image`, `portrait`, `logo`,
`photo`, `brochureUrl`) est typé `string | null` — tant qu'il vaut `null`,
la page correspondante affiche automatiquement un bloc placeholder
(« Photo provisoire », etc.) ou masque l'élément (ex. le bouton de
téléchargement de brochure). Fournir une vraie valeur suffit à faire
disparaître le placeholder, sans toucher au code des composants.

Pour ajouter un fichier :

1. Déposer l'image ou le PDF dans `public/` (créer le sous-dossier si besoin,
   par exemple `public/images/partenaires/` ou `public/brochures/`).
2. Dans le fichier de données concerné (`src/data/*.ts`), remplacer `null`
   par le chemin public du fichier — ex. `brochureUrl: "/brochures/genie-petrolier.pdf"`.
3. Committer et déployer. Une modification de `src/data/` prend effet au
   prochain build ; il n'y a pas de mise à jour à chaud en production.

## CI

Un workflow GitHub Actions (`.github/workflows/ci.yml`) exécute le
typecheck, le lint et le build sur chaque push vers `main` et chaque
pull request.
