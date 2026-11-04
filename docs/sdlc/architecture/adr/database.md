<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL for Database

Status: Accepted  
Date: 2026-11-04

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL
- MySQL
- SQLite

## Decision Outcome

Chosen option: PostgreSQL, because PostgreSQL 16 holds users, categories, claims, receipts metadata and the audit trail with transactional consistency so a claim cannot be both reimbursed and rejected, hosted on RDS in Mumbai for residency.

## Consequences

Heavier than SQLite, but the relational integrity and India-region hosting are exactly what the claim lifecycle and DPDP residency need; volume is modest.
<!-- sdlc:auto:end adr -->