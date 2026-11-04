# expense claim app — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
expense claim application where you upload reciept and claim the expenses

**Documentation version:** v1
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v1 approved |
| [Architecture](architecture/README.md) | 11 entries |
| [Development](development/README.md) | 15 entries |
| [Testing](testing/README.md) | 1 entry |
| [Deployment](deployment/README.md) | 1 entry |
| [Maintenance](maintenance/README.md) | 1 entry |
| [Data model](architecture/data-model.md) | generated |
| [API (OpenAPI)](architecture/api/openapi.yaml) | generated |
| [Decisions (ADRs)](architecture/adr/README.md) | 4 decisions |
| [Sprint plan](development/sprint-plan.md) | 6 sprints |
| [Developer guide](development/developer-guide.md) | not generated yet |
| [API reference](development/api-reference.md) | 0 routes |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 0 tests |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 19 requirements |
| [Changelog](CHANGELOG.md) | 1 version |
<!-- sdlc:auto:end contents -->

## Open gaps

<!-- sdlc:auto:start open-gaps -->
### Requirements

- DPDP data-principal rights (access, correction, erasure, grievance redressal) not addressed by any requirement.
- DPDP breach-notification duties and CERT-In 6-hour reporting / 180-day log retention not addressed by any requirement or design.
- Significant Data Fiduciary applicability (India DPO, audits, DPIA) not assessed.
- Accessibility (RPwD Act 2016 / GIGW-WCAG alignment) not addressed by any requirement.

### Development

- Input does not explicitly map backlog items to this sprint; EPIC-001/US-019 association is inferred only from the goal wording, not an explicit item-sprint field.
- Item-to-sprint mapping inferred from goal wording only; not an explicit field in the input.
- No completion status, code artifacts, or test evidence provided; cannot confirm whether this work was actually built.
- No completion status, code artifacts, or test evidence provided; cannot confirm whether this work was actually built -- includes the India-hosting item itself.

### Testing

- Testing phase has not started; no test coverage exists yet against the 50 acceptance criteria defined in requirements.

### Deployment

- Deployment phase has not started; it is unconfirmed whether the approved AWS ap-south-1 architecture has actually been provisioned.

### Maintenance

- Maintenance phase has no records yet, consistent with the application not having a recorded deployment.
<!-- sdlc:auto:end open-gaps -->
