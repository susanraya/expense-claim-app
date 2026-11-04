<!-- sdlc:auto:start adr -->
# ADR-0001: Use Svelte for Frontend

Status: Accepted  
Date: 2026-11-04

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- Svelte
- React
- Vue

## Decision Outcome

Chosen option: Svelte, because Svelte 5 builds the responsive web UI, including phone-browser camera capture via the standard file input with capture attribute and client-side RBAC-aware navigation.

## Consequences

Smaller ecosystem than React, but ample for this lightweight app and yields a small, fast bundle well suited to mobile browsers.
<!-- sdlc:auto:end adr -->