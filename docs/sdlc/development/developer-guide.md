# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `33785b8` · model `claude-sonnet-5`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
This is a generated expense-claim application with two independent apps in one repo: a Svelte 5 + Vite frontend containing the approved, reviewed screens (currently rendering seeded sample data, not yet wired to the API), and a NestJS 11 + TypeScript backend that currently ships only a health check because no backend architecture had been approved yet. The backend uses Drizzle ORM against PostgreSQL 16, connecting lazily on first use and falling back to an in-memory PGlite database when no DATABASE_URL is set, so it can run end-to-end with zero external services for local dev and tests.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js 22+ (matches backend/Dockerfile's node:22-slim base)
- npm
- Docker and Docker Compose (for the local PostgreSQL 16 instance in docker-compose.yml)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. Clone the repository
2. Copy .env.example to .env and fill in any values your local setup needs
3. (Optional) Start a local Postgres instance: docker compose up -d db (from repo root; uses user/pass/db 'app' on port 5432)
4. cd frontend && npm install
5. cd backend && npm install
6. Run the backend: cd backend && npm run dev (listens on http://0.0.0.0:8000 by default, or set HOST/PORT)
7. Run the frontend: cd frontend && npm run dev (Vite dev server, defaults to port 5173)
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| frontend dev | `cd frontend && npm run dev` | Starts the Vite dev server for the Svelte SPA |
| frontend build | `cd frontend && npm run build` | Bundles the app with Vite (does not typecheck) |
| frontend preview | `cd frontend && npm run preview` | Serves the built frontend locally |
| frontend typecheck | `cd frontend && npm run typecheck` | Runs svelte-check over the TypeScript in the Svelte components |
| backend dev | `cd backend && npm run dev` | Starts the NestJS API with watch mode (nest start --watch) |
| backend build | `cd backend && npm run build` | Compiles the backend with tsc to dist/ |
| backend start | `cd backend && npm run start` | Runs the compiled backend (node dist/main.js), same entrypoint as the Docker image |
| db up | `docker compose up -d db` | Starts a local PostgreSQL 16 container for the backend to connect to via DATABASE_URL |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `.devcontainer` | VS Code/Codespaces devcontainer configuration for a consistent dev environment |
| `.quorq` | Platform metadata (handoff.json) used by the Quorq AI SDLC platform |
| `backend` | NestJS 11 TypeScript API service: currently only a health check, plus Drizzle/PostgreSQL wiring ready for feature modules |
| `backend/src` | App entry point (main.ts), app bootstrap (app.ts), root module (app.module.ts), health controller, lazy DB connection (db.ts), Drizzle schema (schema.ts), and stub handlers (stubs.ts) |
| `backend/tests` | Vitest tests covering the health endpoint and database bootstrap |
| `frontend` | Svelte 5 + Vite SPA containing the approved, reviewed UI screens, currently running on seeded sample data |
| `frontend/src` | App entry point (main.ts), global styles (index.css), API client/router helpers in lib/, and the shared UI component library in lib/ui/ |
| `frontend/e2e` | Playwright end-to-end specs run against a locally built app or a deployed URL via E2E_BASE_URL |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Backend: one feature module per API component, each with a controller holding one handler per declared endpoint; all generated handlers are stubs returning placeholders until implemented
- Backend: Drizzle ORM tables are declared in src/schema.ts; db() auto-creates any missing table on first connection and never alters or drops existing ones -- no migration tooling is wired in yet
- Backend: the database connects lazily (on first db() call), not at process startup, so health checks and tests pass with no database present
- Backend: falls back to an in-memory PGlite Postgres when DATABASE_URL is unset (used by tests and the e2e suite); production Docker image removes this dependency entirely
- Frontend: shared UI primitives live in src/lib/ui/ as individual PascalCase Svelte components (Button.svelte, Card.svelte, etc.) with a barrel export in index.ts
- Frontend: API access is centralized in src/lib/api.ts via apiFetch(), which attaches a bearer token (session token if set, else the baked-in API secret) and is the designated seam for wiring screens to real endpoints
- Frontend: VITE_API_BASE_URL / VITE_API_SECRET_KEY are build-time env vars baked in by the platform for deployed environments
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| frontend unit tests | `cd frontend && npm test` | Runs Vitest component tests (Testing Library for Svelte) located beside the components they cover |
| frontend e2e tests | `cd frontend && npm run test:e2e:install && npm run test:e2e` | Installs the Chromium browser then runs Playwright specs in frontend/e2e; builds and serves the frontend and backend locally unless E2E_BASE_URL is set |
| frontend lint | `cd frontend && npm run lint` | Runs ESLint over the whole frontend app (the gate the platform enforces) |
| backend unit tests | `cd backend && npm test` | Runs Vitest tests for the health endpoint and database bootstrap |
| backend lint | `cd backend && npm run lint` | Runs ESLint over the backend source |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| Backend logs 'DATABASE_URL is not set: using an in-memory PostgreSQL that keeps nothing' and data disappears on restart | This is expected without a DATABASE_URL. Run 'docker compose up -d db' and set DATABASE_URL to point at it (e.g. postgres://app:app@localhost:5432/app) for persistent data |
| Frontend calls to the backend fail with a CORS error in the browser console | Run the frontend on its default dev port (5173) which backend/src/app.ts allows by default, or set ALLOWED_ORIGINS on the backend to include your frontend's origin |
| Playwright e2e tests fail to start the backend | Ensure 'cd backend && npm install' has been run first; the webServer config builds and runs the backend with 'npm run build && node dist/main.js' on port 8000 automatically |
| 'npm run build' succeeds but TypeScript errors are hidden in the frontend | Vite's build does not typecheck; run 'cd frontend && npm run typecheck' separately to catch TypeScript issues via svelte-check |
<!-- sdlc:auto:end troubleshooting -->
