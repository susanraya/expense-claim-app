<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-11-04

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- Azure
- GCP

## Decision Outcome

Chosen option: AWS, because AWS Mumbai (ap-south-1) hosts the API, RDS PostgreSQL and S3 receipt bucket in one in-country region, satisfying DPDP data residency and pairing natively with S3.

## Consequences

Single-provider lock-in, accepted for the simplicity of one provider in one India region.
<!-- sdlc:auto:end adr -->