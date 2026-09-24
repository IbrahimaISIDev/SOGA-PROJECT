# Guide de déploiement Vercel

## Architecture de déploiement

Ce projet utilise une architecture monorepo avec deux interfaces accessibles sur le même domaine :

- **Site public** : `https://sogasenegal.com`
- **Interface admin** : `https://sogasenegal.com/admin`
- **Backend API** : `https://api.sogasenegal.com` (à déployer séparément)

## Déploiement sur Vercel

### 1. Déployer le site principal

1. Connectez-vous à [Vercel](https://vercel.com)
2. Cliquez sur "Add New Project"
3. Importez le repo GitHub : `IbrahimaISIDev/SOGA-PROJECT`
4. Configurez le projet :
   - **Framework Preset**: Next.js
   - **Root Directory**: `/` (ou `/frontend`)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Ajoutez les variables d'environnement :
   - `RESEND_API_KEY`: Votre clé API Resend
   - `RESEND_FROM_EMAIL`: Adresse d'expédition email
   - `CONTACT_EMAIL_TO`: Adresse de réception des emails
6. Cliquez sur "Deploy"

### 2. Configuration de l'interface admin

L'interface admin est déjà configurée pour être servie sur le chemin `/admin` grâce au fichier `vercel.json`.

Les fichiers de configuration incluent :
- `vercel.json` : Redirige les requêtes `/admin` vers le dossier admin
- `admin/vite.config.ts` : Configure le base path `/admin/` pour Vite

### 3. Variables d'environnement pour l'admin

Dans le dossier `admin`, créez un fichier `.env.production` :

```env
VITE_API_URL=https://api.sogasenegal.com/api
```

Ou ajoutez cette variable dans les settings Vercel du projet.

### 4. Déploiement du backend API

Le backend doit être déployé séparément sur un service comme Railway, Render ou Heroku.

**Exemple avec Railway :**

1. Connectez-vous à [Railway](https://railway.app)
2. Créez un nouveau projet
3. Importez le repo GitHub : `IbrahimaISIDev/soga-backend`
4. Configurez les variables d'environnement :
   - `DATABASE_URL`: URL de connexion PostgreSQL
   - `JWT_SECRET`: Clé secrète pour JWT
   - `JWT_EXPIRES_IN`: Expiration du token (ex: `7d`)
   - `ALLOWED_ORIGINS`: `https://sogasenegal.com,https://www.sogasenegal.com`
   - `PORT`: `3001`
5. Déployez le projet

## Structure finale en production

```
https://sogasenegal.com          → Site public Next.js
https://sogasenegal.com/admin    → Interface admin React/Vite
https://api.sogasenegal.com     → Backend API Express.js
```

## Configuration DNS

Configurez votre DNS pour pointer vers Vercel :

```
A    @        → Vercel's IP addresses
CNAME www     → Vercel's domain
CNAME api     → Railway/Render domain (pour le backend)
```

## Mise à jour du contenu

Pour mettre à jour le contenu du site :

1. Modifiez les fichiers dans `content/`
2. Commit et push sur GitHub
3. Vercel déploiera automatiquement les changements

Pour mettre à jour via l'interface admin :

1. Accédez à `https://sogasenegal.com/admin`
2. Connectez-vous avec les identifiants admin
3. Modifiez le contenu via l'interface
4. Les changements sont sauvegardés dans la base de données PostgreSQL

## Sécurité

- L'interface admin est protégée par authentification JWT
- Configurez `ALLOWED_ORIGINS` dans le backend pour restreindre les origines autorisées
- Utilisez des variables d'environnement fortes pour `JWT_SECRET`
- Activez HTTPS en production (automatique avec Vercel)

## Monitoring

- Vercel fournit des logs et analytics pour le frontend
- Railway/Render fournit des logs pour le backend
- Configurez des alertes pour les erreurs et temps de réponse
