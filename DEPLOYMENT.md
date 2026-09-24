# Guide de déploiement Vercel

## Architecture de déploiement

Ce projet utilise une architecture monorepo avec deux interfaces accessibles sur le même domaine :

- **Site public** : `https://sogasenegal.com` (déjà déployé)
- **Interface admin** : `https://sogasenegal.com/admin` (à ajouter)
- **Backend API** : `https://api.sogasenegal.com` (à déployer séparément)

## Mise à jour du déploiement existant

Le site public Next.js est déjà déployé sur Vercel. Pour ajouter l'interface admin sur le chemin `/admin` :

### 1. Mettre à jour le projet Vercel existant

1. Connectez-vous à [Vercel](https://vercel.com)
2. Ouvrez le projet SOGA-PROJECT existant
3. Les fichiers de configuration sont déjà ajoutés :
   - `vercel.json` : Redirige `/admin` vers le dossier admin
   - `admin/vite.config.ts` : Configure le base path `/admin/`
4. Vercel déploiera automatiquement les changements au prochain push

### 2. Variables d'environnement pour l'admin

Ajoutez la variable d'environnement dans les settings Vercel du projet existant :

- `VITE_API_URL`: URL du backend API en production (ex: `https://api.sogasenegal.com/api`)

Ou créez un fichier `admin/.env.production` :

```env
VITE_API_URL=https://api.sogasenegal.com/api
```

### 3. Déploiement du backend API

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
