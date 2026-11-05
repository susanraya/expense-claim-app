# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `29ad01b` · model `claude-sonnet-5`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
This is the generated codebase for an expense claim app: employees upload receipts and submit expense claims that flow through manager and finance approval. It is split into two independently-run apps in one repo: `frontend/` is an approved Vite + Svelte 5 UI that currently renders seeded sample data, and `backend/` is a NestJS 11 (TypeScript) API with its data model (Drizzle ORM over PostgreSQL), JWT auth, role-based guards, and an S3-backed receipt object store already in place; most business-logic route handlers are stubs ('not implemented') except login/logout/me and receipt upload/download, which are implemented. The two are not yet wired together — the frontend's API client exists but screens still use seeded data.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js 22+ (matches backend Dockerfile base image)
- npm
- Docker and Docker Compose (for the PostgreSQL database via docker-compose.yml)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. Clone the repository
2. Copy the environment template: `cp .env.example .env` and fill in values (see ENVIRONMENT.md)
3. Start the database: `docker compose up -d db`
4. Install and run the backend: `cd backend && npm install`
5. Set `DATABASE_URL` to point at the compose database (e.g. `postgresql://app:app@localhost:5432/app`) or leave unset to use the automatic in-memory PostgreSQL fallback
6. Install and run the frontend: `cd frontend && npm install`
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| backend dev | `cd backend && npm run dev` | Starts the NestJS API with watch mode (nest start --watch) on PORT (default 8000) |
| backend build | `cd backend && npm run build` | Compiles the backend with tsc per tsconfig.build.json into dist/ |
| backend start | `cd backend && npm start` | Runs the compiled backend: node dist/main.js |
| frontend dev | `cd frontend && npm run dev` | Starts the Vite dev server for the Svelte app |
| frontend build | `cd frontend && npm run build` | Bundles the frontend with Vite (no typecheck) |
| frontend preview | `cd frontend && npm run preview` | Serves the built frontend locally |
| db up | `docker compose up -d db` | Starts the PostgreSQL 16 container defined in docker-compose.yml |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `backend/` | NestJS API service (TypeScript): auth, object storage, DB schema, and feature endpoints |
| `backend/src/auth/` | JWT auth module: login/logout, strategy, guards, roles/public decorators, seeding |
| `backend/src/api/` | Root API module/controller holding one handler per endpoint from the approved API spec (mostly stubs) |
| `backend/src/object-store/` | Receipt file upload/download/signed-URL service and controller (S3 or local fallback) |
| `backend/tests/` | Vitest test suites for auth, health, rbac, storage, database, receipt access |
| `frontend/` | Vite + Svelte 5 single-page app, the approved UI design |
| `frontend/src/screens/` | One Svelte component per approved screen (SignIn, MyClaims, ClaimDetail, Approvals, Claims, Administration) |
| `frontend/src/lib/` | App shell support: API client (api.ts), router, session state, brand tokens, and the ui/ component library |
| `frontend/e2e/` | Playwright end-to-end specs (auth, rbac, example) |
| `.devcontainer/` | VS Code devcontainer configuration |
| `.quorq/` | Platform metadata (handoff/prepared state) for the Quorq AI SDLC platform |
| `docker-compose.yml` | Local PostgreSQL 16 service definition |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Backend: one NestJS module per API component, one controller method per declared endpoint; unimplemented handlers return a placeholder via stubs.ts's notImplemented()
- Route authorization via @Roles(...) decorator checked by a global RolesGuard; @Public() opts a route out of the global JwtAuthGuard (only POST /auth/login is public)
- Database tables defined once in backend/src/schema.ts using Drizzle ORM; db() lazily connects and creates tables with CREATE TABLE IF NOT EXISTS, never alters/drops — real migrations needed for schema changes
- No DATABASE_URL -> backend falls back to an in-memory PGlite Postgres (used by e2e runs), data is not persisted
- Frontend screens are plain Svelte 5 components (using runes like $derived/$effect) under src/screens/, routed via src/lib/router.svelte.ts and gated client-side by role in App.svelte's ROLE_PATHS (server also enforces via @Roles)
- Shared UI primitives live in frontend/src/lib/ui/ and are the vocabulary screens are built from
- Frontend API access is centralized in src/lib/api.ts (apiFetch, token storage, 401/403 handling) but screens do not yet call it — they render seeded sample data
- Formatting/linting enforced via ESLint + Prettier configs in both backend/ and frontend/
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| backend test | `cd backend && npm test` | Runs backend Vitest suite (vitest run --passWithNoTests) |
| backend lint | `cd backend && npm run lint` | ESLint over the backend source |
| backend typecheck | `cd backend && npm run typecheck` | tsc --noEmit type checking |
| frontend test | `cd frontend && npm test` | Runs Vitest component tests (Testing Library for Svelte) colocated with components |
| frontend lint | `cd frontend && npm run lint` | ESLint over the frontend app; used as a gate during development |
| frontend typecheck | `cd frontend && npm run typecheck` | svelte-check over the TypeScript in the Svelte components |
| frontend e2e install | `cd frontend && npm run test:e2e:install` | Installs the Chromium browser Playwright needs |
| frontend e2e | `cd frontend && npm run test:e2e` | Runs Playwright acceptance tests from e2e/; without E2E_BASE_URL it builds and serves both backend and frontend locally first |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| Backend starts but data disappears between restarts | DATABASE_URL is not set, so backend/src/db.ts falls back to an in-memory PGlite Postgres. Set DATABASE_URL (e.g. to the docker-compose db) for persistence. |
| Frontend calls to the API fail with CORS errors | The backend only allows http://localhost:5173 and http://127.0.0.1:5173 by default (see app.ts); set ALLOWED_ORIGINS to your frontend's origin if running elsewhere. |
| Screens show sample data instead of real API responses | This is expected per the current state of the repo: frontend/src/lib/api.ts exists but screens haven't been wired to it yet — this is the documented next step, not a bug. |
| `npm run test:e2e` fails to launch a browser | Run `npm run test:e2e:install` first to fetch the Chromium binary Playwright needs. |
| Backend endpoints return a placeholder instead of real behavior | Most routes in backend/src/api/api.controller.ts are intentional stubs (notImplemented); only /auth/login, /auth/logout, /me, and the receipt upload/download/url routes are implemented. |
<!-- sdlc:auto:end troubleshooting -->
