# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1

Stand up authentication, role-based access control and India-region hosting

Capacity: 20 points · Committed: 16

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Employee sign-in | 8 | backend-agent | — |
| ↳ US-001-T1 | Task | Implement auth endpoints with hashed passwords and session/token issuance | — | backend-agent | — |
| ↳ US-001-T2 | Task | Build sign-in and sign-out UI | — | frontend-agent | — |
| ↳ US-001-T3 | Task | Add session expiry/guard middleware | — | security-agent | — |
| US-002 | Story | Role-based access enforcement | 5 | backend-agent | US-001 |
| US-019 | Story | Store data within India | 3 | devops-agent | — |

## Sprint 2: Sprint 2

Admin configuration: users, manager assignment, categories and limits, plus privacy notice

Capacity: 20 points · Committed: 16

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-003 | Story | Manage users and roles | 5 | backend-agent | US-002 |
| US-004 | Story | Assign approving manager to each employee | 3 | backend-agent | US-003 |
| US-005 | Story | Set up expense categories | 3 | backend-agent | US-002 |
| US-006 | Story | Configure per-category spending limits | 2 | backend-agent | US-005 |
| US-018 | Story | Privacy notice at onboarding | 3 | frontend-agent | US-001 |

## Sprint 3: Sprint 3

Employees can create claims, attach receipts, and have over-limit claims flagged

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-007 | Story | Create and submit an expense claim | 8 | backend-agent | US-004, US-005 |
| ↳ US-007-T1 | Task | Implement claim create/update/submit endpoints | — | backend-agent | — |
| ↳ US-007-T2 | Task | Build claim entry form | — | frontend-agent | — |
| ↳ US-007-T3 | Task | Block submission when no approving manager is configured | — | backend-agent | — |
| US-008 | Story | Upload receipt images as proof | 8 | integration-agent | US-007 |
| ↳ US-008-T1 | Task | Implement S3 upload integration and receipt endpoints | — | integration-agent | — |
| ↳ US-008-T2 | Task | Build receipt upload UI with phone camera capture | — | frontend-agent | — |
| ↳ US-008-T3 | Task | Validate file type and size with clear rejection messaging | — | backend-agent | — |
| US-009 | Story | Over-limit claim flagging at submission | 3 | backend-agent | US-006, US-007 |

## Sprint 4: Sprint 4

Employees track claim status and managers can approve or reject team claims

Capacity: 20 points · Committed: 16

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-010 | Story | View my claims and their status | 5 | frontend-agent | US-007 |
| US-011 | Story | See rejection reason and resubmit | 3 | frontend-agent | US-010, US-012 |
| US-012 | Story | Manager approves or rejects team claims | 8 | backend-agent | US-007, US-004 |
| ↳ US-012-T1 | Task | Implement manager queue and approve/reject endpoints | — | backend-agent | — |
| ↳ US-012-T2 | Task | Build manager approval queue UI | — | frontend-agent | — |
| ↳ US-012-T3 | Task | Record status-change audit entries on approve/reject | — | backend-agent | — |

## Sprint 5: Sprint 5

Finance gives final approval, records reimbursement, and can view/export claims

Capacity: 20 points · Committed: 12

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-013 | Story | Finance gives final approval | 5 | backend-agent | US-012 |
| US-014 | Story | Mark a claim as reimbursed | 2 | backend-agent | US-013 |
| US-015 | Story | View and export claims list | 5 | backend-agent | US-013 |

## Sprint 6: Sprint 6

Full audit trail and email notifications complete the claim lifecycle

Capacity: 20 points · Committed: 13

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-016 | Story | Claim audit trail | 5 | backend-agent | US-012, US-013 |
| US-017 | Story | Email notifications on status changes | 8 | integration-agent | US-007, US-012, US-013 |
| ↳ US-017-T1 | Task | Implement SendGrid email service wrapper | — | integration-agent | — |
| ↳ US-017-T2 | Task | Trigger manager and finance notification emails | — | backend-agent | — |
| ↳ US-017-T3 | Task | Trigger employee notification emails | — | backend-agent | — |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->
