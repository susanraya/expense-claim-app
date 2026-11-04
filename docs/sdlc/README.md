# expense claim app — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
expense claim application where you upload reciept and claim the expenses

**Documentation version:** v2
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v1 approved |
| [Architecture](architecture/README.md) | 13 entries |
| [Development](development/README.md) | 1 entry |
| [Testing](testing/README.md) | 1 entry |
| [Deployment](deployment/README.md) | 1 entry |
| [Maintenance](maintenance/README.md) | 1 entry |
| [Data model](architecture/data-model.md) | generated |
| [API (OpenAPI)](architecture/api/openapi.yaml) | generated |
| [Decisions (ADRs)](architecture/adr/README.md) | 4 decisions |
| [Sprint plan](development/sprint-plan.md) | 6 sprints |
| [Developer guide](development/developer-guide.md) | generated |
| [API reference](development/api-reference.md) | 1 route |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 0 tests |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 19 requirements |
| [Changelog](CHANGELOG.md) | 2 versions |
<!-- sdlc:auto:end contents -->

## Open gaps

<!-- sdlc:auto:start open-gaps -->
### Requirements

- No date is recorded for when this stack/version was approved.
- AC-024 does not specify whether over-limit claims are flagged (soft warning) or hard-blocked -- policy choice left open for design.
- No requirement covers data-principal rights (access, correction, erasure, grievance redressal) required under DPDP -- confirm whether these are needed and how they will be served.
- No requirement addresses whether this app/company qualifies as a Significant Data Fiduciary (extra duties: India-based DPO, audits, impact assessments) -- needs confirmation.
- No requirement addresses sector-specific data-localisation rules (RBI/SEBI/IRDAI) -- likely not applicable since this is an internal expense tool, not a payment/financial product, but should be confirmed.

### Architecture

- No explicit mapping provided between this architecture and requirement IDs US-001..019; traceability to specific user stories cannot be confirmed from this input alone.
- No date or author/approver name given for the v1 approval.
- SendGrid is a non-Indian SaaS notification provider; architecture claims personal data and receipts are kept inside India for DPDP residency, but email notifications (containing employee names/emails and claim status) are routed through SendGrid, which is not stated to have in-India data processing -- potential residency conflict to confirm.
- SendGrid is a third-party SaaS outside the stated AWS-Mumbai boundary; whether it offers in-India data processing/residency guarantees for the personal data in these emails (names, emails, claim amounts/status) is not addressed in the input and should be confirmed against the DPDP residency goal stated in the overall architecture summary.
- The input states over-limit claims are 'flagged or blocked' without specifying the rule that decides which outcome applies -- needs clarification.
- SendGrid is the only deployment node outside the AWS Mumbai boundary -- see residency flag on ARCH-COMP-EMAIL.

### Development

- Development phase has not started; no tickets, code, or build artifacts exist to document.

### Testing

- Testing phase has not started; no test coverage or results exist to document.

### Deployment

- No deployment recorded yet; nothing to document about release history or environments.

### Maintenance

- No maintenance phase activity recorded yet; the application has not been deployed.
<!-- sdlc:auto:end open-gaps -->
