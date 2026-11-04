# expense claim app — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
expense claim application where you upload reciept and claim the expenses

**Documentation version:** v3
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v1 approved |
| [Architecture](architecture/README.md) | 13 entries |
| [Development](development/README.md) | 17 entries |
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
| [Changelog](CHANGELOG.md) | 3 versions |
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

- No explicit field mapping backlog items to sprint numbers was provided; sprint-to-epic groupings below are inferred from matching sprint goal wording to epic/story titles.
- No start/end dates for the plan or individual sprints were given.
- No execution/completion status (in-progress, done, blocked) was provided for any item.
- Item-to-sprint assignment is inferred from goal text, not an explicit field.
- No completion/test status reported for US-001, US-002 or their subtasks.
- No acceptance-criteria detail beyond the story title was provided.
- No completion/test status reported for US-003 or US-004.
- No completion/test status reported for US-005 or US-006.
- No completion/test status reported for US-007, US-008, US-009 or their subtasks.
- No completion/test status reported for US-010 or US-011.
- No completion/test status reported for US-012 or US-013.
- No subtasks were listed for US-013, unlike comparable stories; unclear if this is intentional or incomplete breakdown.
- No completion/test status reported for US-014, US-015 or US-016.
- No detail on export format (CSV/PDF/etc.) was provided.
- No completion/test status reported for US-017 or its subtasks.
- No detail on specific email trigger conditions (which status transitions) or templates was provided.
- No completion/test status reported for US-018 or US-019.
- The epic name references DPDP (India's Digital Personal Data Protection Act) but no domain/compliance skill input was supplied defining its specific controls; only the privacy-notice and data-residency stories are traceable from the given input. A human should confirm whether other DPDP obligations (e.g. consent withdrawal, data subject access/erasure requests, breach notification) are addressed elsewhere, as none appear in this backlog.
- Cannot confirm which, if any, stories or tasks have actually been implemented.
- No linkage to a code repository, CI build, or test suite was provided for this phase.

### Testing

- Testing phase has not started; no test coverage or results exist to document.

### Deployment

- No deployment recorded yet; nothing to document about release history or environments.

### Maintenance

- No maintenance phase activity recorded yet; the application has not been deployed.
<!-- sdlc:auto:end open-gaps -->
