<!-- sdlc:auto:start adr -->
# ADR-0002: Use NestJS for Backend

Status: Accepted  
Date: 2026-11-04

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- NestJS
- Express
- Fastify

## Decision Outcome

Chosen option: NestJS, because NestJS 11 structures the API into modules (auth, claims, approvals, categories, users, notifications) with guards enforcing JWT and role-based access on every route.

## Consequences

More framework structure than a bare Express app, but the module/guard model directly matches the RBAC and workflow requirements.
<!-- sdlc:auto:end adr -->