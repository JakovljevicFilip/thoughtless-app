## Thoughtless

From first spark to fully formed project – your entry point for capturing ideas on the fly.

## Based on the Platform repository

This application is based on the shared Platform frontend repository: https://github.com/JakovljevicFilip/platform-fe

## Product Overview

Thoughtless is for people who come up with ideas, notes, and mental reminders but don’t have time to act on them right away.

It makes it easy to capture ideas in the moment. Stay focused on what matters now and come back later when you have time to work on them.

Thoughtless treats ideas as something to be explored, not stored forever. It encourages a simple, healthy cycle:

- Capture an idea quickly, without friction.
- Keep it active and visible for a limited time.
- Review, refine, or discard it before it expires.
- Let go of what no longer matters so the important ideas stand out.

The application supports this with clear limits and rules. It:

- Controls how many active ideas you can have.
- Controls how many discarded ideas you can keep.
- Defines how long an idea stays relevant.
- Signals when an idea is getting close to expiry.

These guardrails help you:

- Avoid endless lists and note-hoarding.
- Stay focused on a small number of meaningful ideas.
- Build a habit of regularly revisiting and curating what you keep.
- Reduce the stress that comes from unstructured, ever‑growing lists.

Thoughtless works like a simple personal assistant for your ideas. It keeps them safe, focused, and easy to manage.

## Key Concepts

- **Active thoughts** – Recently captured thoughts that stay visible only for a limited time. There is a cap on how many active thoughts can be kept at the same time.
- **Discarded thoughts** – A holding place for removed active thoughts. A limited number are preserved so they can be restored if discarded by accident.

## Getting started

The following instructions are intended for developers who want to run or integrate Thoughtless.

### Prerequisites

- For Docker-based setup:
  - Docker and Docker Compose
- For local (non-Docker) setup:
  - Node.js (see the `engines` field in `package.json`)
  - npm or Yarn

### Setup

#### 1. Clone the repository

```bash
git clone https://github.com/JakovljevicFilip/thoughtless-app.git
cd thoughtless-app
```

#### 2. Environment configuration

Create a local environment file based on the example:

```bash
cp .env.example .env
```

Adjust any values in `.env` as needed for the target environment.

#### 3. Docker setup

From the project root, build and start the stack:

```bash
docker compose up --build
```

This starts the frontend container and exposes the application on port `9001` (default: `http://localhost:9001`).

To stop and remove the containers:

```bash
docker compose down
```

Remove containers:

```bash
docker compose down -v
```

If you also ran the Android APK process, clean up that separate compose stack too:

```bash
docker compose -f docker-compose.android.yml down -v
```

### 3. Run locally

Install dependencies:

```bash
npm install
# or
yarn
```

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The development server runs in watch mode and reloads on file changes.
