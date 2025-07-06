## 🚀 Technologies Utilisées

### Backend

- **AdonisJS 6** - Framework Node.js moderne avec TypeScript
- **Lucid ORM** - ORM pour la gestion de la base de données
- **PostgreSQL** - Base de données relationnelle robuste
- **TypeScript** - Langage de programmation typé
- **Authentication** - Système d'authentification intégré

### Frontend

- **Nuxt 3** - Framework Vue.js moderne avec SSR
- **Vue 3** - Framework JavaScript progressif
- **TypeScript** - Support TypeScript complet
- **Tailwind CSS** - Framework CSS utilitaire
- **Pinia** - Gestion d'état moderne pour Vue

### Infrastructure

- **Docker** - Conteneurisation de l'application
- **Yarn** - Gestionnaire de paquets
- **ESLint** - Linting du code

## 📁 Structure du Projet

```
edumapper/
├── backend/                 # API AdonisJS
│   ├── app/
│   │   ├── controllers/     # Contrôleurs API
│   │   ├── models/         # Modèles de données
│   │   └── middleware/     # Middleware d'authentification
│   ├── database/
│   │   └── migrations/     # Migrations de base de données
│   └── config/             # Configuration AdonisJS
├── frontend/               # Application Nuxt 3
│   ├── components/         # Composants Vue réutilisables
│   ├── pages/             # Pages de l'application
│   ├── composables/       # Composables Vue
│   ├── store/             # Stores Pinia
│   └── middleware/        # Middleware d'authentification
```

## 🛠️ Installation et Configuration

### Prérequis

- Node.js 18+
- Yarn
- Docker (optionnel)

### Installation

1. **Cloner le repository**

```bash
git clone <repository-url>
cd edumapper
```

2. **Installer les dépendances du backend**

```bash
cd backend
yarn install
```

3. **Configurer la base de données**

```bash
# Copier le fichier d'environnement
cp .env.example .env

# Lancer les migrations
yarn migration:run
```

4. **Installer les dépendances du frontend**

```bash
cd ../frontend
yarn install
```

## 🚀 Démarrage

### Développement

1. **Démarrer le backend**

```bash
cd backend
yarn dev
```

Le serveur API sera disponible sur `http://localhost:3333`

2. **Démarrer le frontend**

```bash
cd frontend
yarn dev
```

L'application sera disponible sur `http://localhost:3000`

### Production avec Docker

```bash
# Construire et démarrer avec Docker Compose
docker-compose up --build
```

## 📊 Fonctionnalités

### Authentification

- Système de connexion/inscription
- Gestion des sessions utilisateur
- Middleware d'authentification

### Gestion des Écoles

- Affichage des écoles disponibles
- Détails des formations par école
- Système de choix et de réservation

### Interface Utilisateur

- Design moderne et responsive
- Navigation intuitive
- Composants réutilisables
- Gestion d'état avec Pinia

## 🔧 Scripts Utiles

### Backend

```bash
# Lancer en mode développement
yarn dev

# Lancer les tests
yarn test

# Générer une migration
yarn make:migration

# Lancer les migrations
yarn migration:run
```

### Frontend

```bash
# Lancer en mode développement
yarn dev

# Build pour production
yarn build

# Lancer en mode production
yarn start
```

## 🗄️ Base de Données

Le projet utilise POSTGRESQL avec les tables suivantes :

- `users` - Utilisateurs de l'application
- `schools` - Écoles et leurs informations
