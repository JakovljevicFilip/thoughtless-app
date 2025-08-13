# Thoughtless APP

Thoughtless APP is the frontend service for the Thoughtless application.  
It is built using Quasar and runs in a Dockerized environment.

---

## 🚀 Local Setup

These instructions will get your local development environment up and running.

### 1. Clone the repository

```bash
git clone git@github.com:JakovljevicFilip/thoughtless-app.git
cd thoughtless-app
```

### 2. Copy the environment file

```bash
cp .env.example .env
```

### 3. Start the containers and install dependencies

```bash
docker network inspect thoughtless >/dev/null 2>&1 || docker network create thoughtless
docker compose -f docker-compose.local.yml up --build
```

### 4. Access the Quasar container (optional)

```bash
docker compose -f docker-compose.local.yml exec quasar bash
```

The app should now be running at:  
[http://localhost:9000](http://localhost:9000)

---

## 🌐 Server Setup

These steps are for deploying Thoughtless APP on a remote server.

### 1. Clone the repository

```bash
git clone git@github.com:JakovljevicFilip/thoughtless-app.git
cd thoughtless-app
```

### 2. Copy the environment file

```bash
cp .env.example .env
```

> **⚠️ Reminder:** Open `.env` and set the proper values for your production environment before starting the app.

### 3. Start the containers

```bash
docker network inspect thoughtless >/dev/null 2>&1 || docker network create thoughtless
docker compose -f docker-compose.prod.yml up -d --build
```

### 4. Access the Quasar container (optional)

```bash
docker compose -f docker-compose.prod.yml exec quasar bash
```

The app should now be running on your configured production domain or IP.
