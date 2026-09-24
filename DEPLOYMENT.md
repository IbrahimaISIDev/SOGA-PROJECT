# Guide de déploiement

## Architecture de déploiement

- **Site public + interface admin** : `https://sogasenegal.com` et `https://sogasenegal.com/admin`
  — un seul déploiement Vercel (ce dépôt, `frontend/`). L'admin est intégré nativement
  en Next.js, pas de sous-domaine ni de déploiement séparé.
- **Backend API** : `https://cms.sogasenegal.com` — conteneur Docker sur le VPS existant,
  derrière le Caddy partagé qui sert déjà les autres projets sur cette machine.

```
https://sogasenegal.com          → Site public + /admin (Next.js, Vercel)
https://cms.sogasenegal.com      → Backend API (Express/Prisma/Postgres, VPS/Docker)
```

## Dépôts GitHub

- **Frontend (site public + admin)** : https://github.com/IbrahimaISIDev/SOGA-PROJECT.git
- **Backend** : https://github.com/IbrahimaISIDev/soga-backend.git

Le dépôt `soga-admin` (ancienne interface admin Vite/React séparée) n'est plus utilisé
pour le déploiement — l'admin vit maintenant dans `frontend/src/app/admin`.

## Déploiement du frontend (Vercel)

Projet Vercel existant, déploiement automatique à chaque push sur la branche principale.

### Variable d'environnement à configurer sur Vercel

- `NEXT_PUBLIC_API_URL` = `https://cms.sogasenegal.com/api`

## Déploiement du backend (VPS, Docker + Caddy)

Le backend tourne en conteneur sur le VPS partagé (même machine que shaolin, bserp,
agripont, etc.), routé par le Caddy déjà en place sur cette machine — pas de Nginx/PM2/
Postgres installés au niveau système, tout passe par Docker Compose.

### Structure sur le VPS

```
~/soga-backend/
├── Dockerfile
├── docker-compose.prod.yml
├── .env.production        # non versionné — voir .env.production.example
└── ...
```

### Premier déploiement

```bash
# Depuis la machine locale : synchroniser le code (ou cloner le repo directement sur le VPS)
rsync -avz --exclude node_modules --exclude dist --exclude .git \
  --exclude uploads/* --exclude '.env*' \
  backend/ ibrahimadev@<VPS_IP>:~/soga-backend/

# Sur le VPS : créer backend/.env.production (voir .env.production.example
# pour la liste des variables — JWT_SECRET et POSTGRES_PASSWORD doivent être
# générés aléatoirement, ex. `openssl rand -hex 32`)

cd ~/soga-backend
docker compose -f docker-compose.prod.yml --env-file .env.production -p soga-backend up -d --build
docker compose -f docker-compose.prod.yml --env-file .env.production -p soga-backend exec api npx prisma migrate deploy
docker compose -f docker-compose.prod.yml --env-file .env.production -p soga-backend exec api npx tsx prisma/seed.ts
```

### Routage Caddy

Ajouter `~/infra/caddy/sites/soga.caddy` sur le VPS :

```caddyfile
cms.sogasenegal.com {
    reverse_proxy soga-api:3000
}
```

Puis recharger le Caddy partagé :

```bash
docker exec caddy-caddy-1 caddy reload --config /etc/caddy/Caddyfile
```

Caddy provisionne automatiquement le certificat Let's Encrypt dès que le DNS pointe
vers le VPS — aucune manipulation Certbot manuelle nécessaire.

### DNS requis

Un seul enregistrement, en plus de ceux déjà en place pour `sogasenegal.com`/`www` (Vercel) :

```
Type: A
Name: cms
Content: <IP du VPS>
Proxy: DNS only (pas de proxy Cloudflare — Caddy a besoin d'atteindre le serveur
       directement pour valider le certificat)
```

### Mises à jour ultérieures

```bash
# Resynchroniser le code, puis :
docker compose -f docker-compose.prod.yml --env-file .env.production -p soga-backend up -d --build
docker compose -f docker-compose.prod.yml --env-file .env.production -p soga-backend exec api npx prisma migrate deploy
```

## Mise à jour du contenu

Via l'interface admin :

1. Accéder à `https://sogasenegal.com/admin`
2. Se connecter avec les identifiants admin
3. Modifier le contenu — sauvegardé directement dans PostgreSQL sur le VPS

## Sécurité

- L'interface admin est protégée par authentification JWT
- `ALLOWED_ORIGINS` (backend) restreint les origines autorisées à `sogasenegal.com`/`www`
- Le conteneur Postgres n'expose aucun port vers l'extérieur du VPS (réseau Docker interne uniquement)
- HTTPS automatique (Vercel pour le frontend, Caddy/Let's Encrypt pour l'API)
