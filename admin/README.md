# SOGA Admin Interface

Interface admin React pour la gestion du contenu SOGA Senegal.

## Stack Technique

- **Framework** : React 18.x
- **Build tool** : Vite 5.x
- **Routing** : React Router 6.x
- **State management** : React Query (TanStack Query)
- **HTTP Client** : Axios
- **Styling** : TailwindCSS
- **Icons** : Lucide React

## Installation

### Prérequis

- Node.js 20.x LTS
- npm ou yarn

### Étapes

1. Installer les dépendances :
```bash
cd frontend/admin
npm install
```

2. Configurer les variables d'environnement :
```bash
# Créer .env.local
echo "VITE_API_URL=http://localhost:3000/api" > .env.local
```

3. Lancer le serveur de développement :
```bash
npm run dev
```

L'interface sera accessible sur `http://localhost:5173`

## Build pour production

```bash
npm run build
```

Les fichiers build seront dans le dossier `dist/`.

## Fonctionnalités

### Authentification
- Login avec email et mot de passe
- Gestion du token JWT
- Auto-logout sur expiration

### Collections
- Formations
- Articles
- Événements
- Partenaires
- Témoignages
- Équipe
- Experts
- Publications
- Thématiques
- Institution (singleton)

### Actions CRUD
- Liste avec pagination
- Création
- Modification
- Suppression (avec confirmation)
- Toggle published/unpublished

## Structure du projet

```
admin/
├── src/
│   ├── components/
│   │   ├── Layout.tsx
│   │   └── CRUDList.tsx
│   ├── lib/
│   │   └── api.ts
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Formations.tsx
│   │   ├── Articles.tsx
│   │   ├── Evenements.tsx
│   │   ├── Partenaires.tsx
│   │   ├── Temoignages.tsx
│   │   ├── Equipe.tsx
│   │   ├── Experts.tsx
│   │   ├── Publications.tsx
│   │   ├── Thematiques.tsx
│   │   └── Institution.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Développement

### Ajouter une nouvelle collection

1. Créer une nouvelle page dans `src/pages/` :
```tsx
import CRUDList from '../components/CRUDList';

export default function NouvelleCollection() {
  return (
    <CRUDList
      endpoint="nouvelle-collection"
      title="Nouvelle Collection"
      columns={[
        { key: 'nom', label: 'Nom' },
        { key: 'published', label: 'Publié' },
      ]}
    />
  );
}
```

2. Ajouter la route dans `src/App.tsx` :
```tsx
<Route path="nouvelle-collection" element={<NouvelleCollection />} />
```

3. Ajouter le lien dans `src/components/Layout.tsx` :
```tsx
{ path: '/nouvelle-collection', label: 'Nouvelle Collection', icon: '📌' },
```

## Personnalisation

### Couleurs
Modifier `tailwind.config.js` pour personnaliser les couleurs.

### Logo
Remplacer le logo dans `src/components/Layout.tsx`.

### Thème
Modifier les classes Tailwind dans les composants pour adapter le thème.

## Support

Pour toute question ou problème, consultez le cahier des charges technique : `CAHIER_DES_CHARGES_BACKEND.md`
