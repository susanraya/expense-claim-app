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
| [Architecture](architecture/README.md) | 11 entries |
| [Development](development/README.md) | 11 entries |
| [Testing](testing/README.md) | 1 entry |
| [Deployment](deployment/README.md) | 1 entry |
| [Maintenance](maintenance/README.md) | 1 entry |
| [Data model](architecture/data-model.md) | generated |
| [API (OpenAPI)](architecture/api/openapi.yaml) | generated |
| [Decisions (ADRs)](architecture/adr/README.md) | 4 decisions |
| [Sprint plan](development/sprint-plan.md) | 6 sprints |
| [Developer guide](development/developer-guide.md) | generated |
| [API reference](development/api-reference.md) | 27 routes |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 57 tests |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 19 requirements |
| [Changelog](CHANGELOG.md) | 2 versions |
<!-- sdlc:auto:end contents -->

## Open gaps

<!-- sdlc:auto:start open-gaps -->
### Requirements

- DPDP data-principal rights (access, correction, erasure, grievance redressal) not addressed by any requirement.
- DPDP breach-notification duties and CERT-In 6-hour reporting / 180-day log retention not addressed by any requirement or design.
- Significant Data Fiduciary applicability (India DPO, audits, DPIA) not assessed.
- Accessibility (RPwD Act 2016 / GIGW-WCAG alignment) not addressed by any requirement.

### Development

- Epics themselves (EPIC-001..EPIC-009) carry no point estimate or role assignment -- only child stories are scoped.
- Plan has no sprint start/end dates.
- Dev run input reports only the parent story US-001 as delivered; no individual confirmation is given for sub-tasks US-001-T1, US-001-T2, or US-001-T3.
- Discrepancy: overall dev run status is 'completed' but delivery evidence covers only 3 of 19 planned stories -- unclear whether the remaining work was actually finished, is in progress, or wasn't started.
- No delivery status for US-003 through US-018 or for any sub-tasks under US-007, US-008, US-012, and US-017.

### Testing

- Testing phase has not started; no test coverage exists yet against the 50 acceptance criteria defined in requirements.

### Deployment

- Deployment phase has not started; it is unconfirmed whether the approved AWS ap-south-1 architecture has actually been provisioned.

### Maintenance

- Maintenance phase has no records yet, consistent with the application not having a recorded deployment.
<!-- sdlc:auto:end open-gaps -->
