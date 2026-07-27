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

## Contenu — éditer via TinaCMS

Le contenu du site (formations, actualités, événements, partenaires,
témoignages, équipe, publications, experts, thématiques, informations
institutionnelles) vit dans des fichiers JSON sous `content/`, un fichier
par élément (`content/formations/genie-petrolier.json`, etc.). Les fichiers
`src/data/*.ts` ne contiennent plus les données elles-mêmes : ils les lisent
depuis `content/` (via `src/lib/content.ts`) et exposent exactement les
mêmes types qu'avant — aucun composant du site n'a eu besoin de changer.

Le schéma (quels champs, quels types, quelles options) est défini une seule
fois dans `tina/config.ts`.

### Éditer en local (sans compte)

```bash
npm run cms:dev
```

Ouvre le site normalement sur [http://localhost:3000](http://localhost:3000)
et l'interface d'édition sur
[http://localhost:3000/admin/index.html](http://localhost:3000/admin/index.html).
En local, les modifications sont enregistrées directement dans les fichiers
`content/*.json` de votre copie du dépôt — à committer ensuite comme
n'importe quel changement de code.

### Éditer sur le site déployé (TinaCloud)

Pour qu'une personne non-technique puisse éditer le contenu du site en ligne
(sur `/admin`), sans avoir Node ni le dépôt en local :

1. Créer un compte gratuit sur [tina.io](https://tina.io) et y connecter ce
   dépôt GitHub.
2. Récupérer le `Client ID` et le `Token` fournis par TinaCloud.
3. Les renseigner comme variables d'environnement sur la plateforme
   d'hébergement (et dans `.env.local` en local si besoin) :
   `NEXT_PUBLIC_TINA_CLIENT_ID` et `TINA_TOKEN` (voir `.env.example`).
4. Le build de production doit générer l'interface d'admin avant de
   construire le site : `npm run cms:build` au lieu de `npm run build`
   (à configurer comme commande de build sur la plateforme d'hébergement).

Sans ces variables, le site continue de fonctionner normalement
(`npm run dev` / `npm run build` / `npm run start` restent inchangés et ne
nécessitent aucun compte) — seule l'édition en ligne sur le site déployé
est indisponible tant que TinaCloud n'est pas connecté.

### Photos, logos, portraits, brochures

Chaque champ visuel (`image`, `portrait`, `logo`, `photo`, `brochureUrl`)
est optionnel — tant qu'il est vide, la page correspondante affiche
automatiquement un bloc placeholder (« Photo provisoire », etc.) ou masque
l'élément (ex. le bouton de téléchargement de brochure). Les images
envoyées depuis l'admin Tina sont stockées dans `public/uploads/`.

## CI

Un workflow GitHub Actions (`.github/workflows/ci.yml`) exécute le
typecheck, le lint et le build sur chaque push vers `main` et chaque
pull request.
