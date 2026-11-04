# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEV-SPRINT-1 · draft · source: plan:Sprint 1

Sprint 1 goal: stand up authentication, role-based access control and India-region hosting (capacity 20 points).

Plan v1, approved at plan level. Goal text: 'Stand up authentication, role-based access control and India-region hosting.'

**Related:** EPIC-001, US-019

- ⚠ Input does not explicitly map backlog items to this sprint; EPIC-001/US-019 association is inferred only from the goal wording, not an explicit item-sprint field.

### DEV-SPRINT-2 · draft · source: plan:Sprint 2

Sprint 2 goal: Admin configuration (users, manager assignment, categories, limits) plus privacy notice (capacity 20 points).

Plan v1, approved at plan level. Goal text: 'Admin configuration: users, manager assignment, categories and limits, plus privacy notice.'

**Related:** EPIC-002, EPIC-003, US-018

- ⚠ Item-to-sprint mapping inferred from goal wording only; not an explicit field in the input.

### DEV-SPRINT-3 · draft · source: plan:Sprint 3

Sprint 3 goal: employees can create claims, attach receipts, and have over-limit claims flagged (capacity 20 points).

Plan v1, approved at plan level. Goal text: 'Employees can create claims, attach receipts, and have over-limit claims flagged.'

**Related:** US-007, US-008, US-009

- ⚠ Item-to-sprint mapping inferred from goal wording only; not an explicit field in the input.

### DEV-SPRINT-4 · draft · source: plan:Sprint 4

Sprint 4 goal: employees track claim status and managers can approve or reject team claims (capacity 20 points).

Plan v1, approved at plan level. Goal text: 'Employees track claim status and managers can approve or reject team claims.'

**Related:** US-010, US-011, US-012

- ⚠ Item-to-sprint mapping inferred from goal wording only; not an explicit field in the input.

### DEV-SPRINT-5 · draft · source: plan:Sprint 5

Sprint 5 goal: Finance gives final approval, records reimbursement, and can view/export claims (capacity 20 points).

Plan v1, approved at plan level. Goal text: 'Finance gives final approval, records reimbursement, and can view/export claims.'

**Related:** US-013, US-014, US-015

- ⚠ Item-to-sprint mapping inferred from goal wording only; not an explicit field in the input.

### DEV-SPRINT-6 · draft · source: plan:Sprint 6

Sprint 6 goal: full audit trail and email notifications complete the claim lifecycle (capacity 20 points).

Plan v1, approved at plan level. Goal text: 'Full audit trail and email notifications complete the claim lifecycle.'

**Related:** US-016, US-017

- ⚠ Item-to-sprint mapping inferred from goal wording only; not an explicit field in the input.

### DEV-EPIC-001 · draft · source: plan:EPIC-001,US-001,US-001-T1,US-001-T2,US-001-T3,US-002

Planned backlog for Authentication & Access Control: 13 points across US-001 and US-002.

US-001 (8 pts, backend-agent): auth endpoints with hashed passwords and token issuance (T1, backend-agent); sign-in/sign-out UI (T2, frontend-agent); session expiry/guard middleware (T3, security-agent). US-002 (5 pts, backend-agent): role-based access enforcement.

**Related:** REQ-EPIC-001, US-001, US-002

- ⚠ No completion status, code artifacts, or test evidence provided; cannot confirm whether this work was actually built.

### DEV-EPIC-002 · draft · source: plan:EPIC-002,US-003,US-004

Planned backlog for User & Role Administration: 8 points across US-003 and US-004.

US-003 (5 pts, backend-agent): manage users and roles. US-004 (3 pts, backend-agent): assign approving manager to each employee.

**Related:** REQ-EPIC-002, US-003, US-004

- ⚠ No completion status, code artifacts, or test evidence provided; cannot confirm whether this work was actually built.

### DEV-EPIC-003 · draft · source: plan:EPIC-003,US-005,US-006

Planned backlog for Expense Category & Limit Configuration: 5 points across US-005 and US-006.

US-005 (3 pts, backend-agent): set up expense categories. US-006 (2 pts, backend-agent): configure per-category spending limits.

**Related:** REQ-EPIC-003, US-005, US-006

- ⚠ No completion status, code artifacts, or test evidence provided; cannot confirm whether this work was actually built.

### DEV-EPIC-004 · draft · source: plan:EPIC-004,US-007,US-007-T1..T3,US-008,US-008-T1..T3,US-009

Planned backlog for Expense Claim Creation & Receipt Upload: 19 points across US-007, US-008 and US-009.

US-007 (8 pts, backend-agent): claim create/update/submit endpoints (T1, backend-agent); claim entry form (T2, frontend-agent); block submission with no approving manager (T3, backend-agent). US-008 (8 pts, integration-agent): S3 upload integration and receipt endpoints (T1, integration-agent); receipt upload UI with phone camera capture (T2, frontend-agent); file type/size validation with rejection messaging (T3, backend-agent). US-009 (3 pts, backend-agent): over-limit claim flagging at submission.

**Related:** REQ-EPIC-004, US-007, US-008, US-009

- ⚠ No completion status, code artifacts, or test evidence provided; cannot confirm whether this work was actually built.

### DEV-EPIC-005 · draft · source: plan:EPIC-005,US-010,US-011

Planned backlog for Employee Claims Dashboard: 8 points across US-010 and US-011.

US-010 (5 pts, frontend-agent): view my claims and their status. US-011 (3 pts, frontend-agent): see rejection reason and resubmit.

**Related:** REQ-EPIC-005, US-010, US-011

- ⚠ No completion status, code artifacts, or test evidence provided; cannot confirm whether this work was actually built.

### DEV-EPIC-006 · draft · source: plan:EPIC-006,US-012,US-012-T1..T3,US-013

Planned backlog for Sequential Approval Workflow: 13 points across US-012 and US-013.

US-012 (8 pts, backend-agent): manager queue and approve/reject endpoints (T1, backend-agent); manager approval queue UI (T2, frontend-agent); status-change audit entries on approve/reject (T3, backend-agent). US-013 (5 pts, backend-agent): Finance gives final approval.

**Related:** REQ-EPIC-006, US-012, US-013

- ⚠ No completion status, code artifacts, or test evidence provided; cannot confirm whether this work was actually built.

### DEV-EPIC-007 · draft · source: plan:EPIC-007,US-014,US-015,US-016

Planned backlog for Reimbursement Recording, Reporting & Audit: 12 points across US-014, US-015 and US-016.

US-014 (2 pts, backend-agent): mark a claim as reimbursed. US-015 (5 pts, backend-agent): view and export claims list. US-016 (5 pts, backend-agent): claim audit trail.

**Related:** REQ-EPIC-007, US-014, US-015, US-016

- ⚠ No completion status, code artifacts, or test evidence provided; cannot confirm whether this work was actually built.

### DEV-EPIC-008 · draft · source: plan:EPIC-008,US-017,US-017-T1..T3

Planned backlog for Notifications: 8 points on US-017.

US-017 (8 pts, integration-agent): SendGrid email service wrapper (T1, integration-agent); trigger manager/finance notification emails (T2, backend-agent); trigger employee notification emails (T3, backend-agent).

**Related:** REQ-EPIC-008, US-017

- ⚠ No completion status, code artifacts, or test evidence provided; cannot confirm whether this work was actually built.

### DEV-EPIC-009 · draft · source: plan:EPIC-009,US-018,US-019

Planned backlog for Data Protection & Residency (DPDP): 6 points across US-018 and US-019.

US-018 (3 pts, frontend-agent): privacy notice at onboarding. US-019 (3 pts, devops-agent): store data within India.

**Related:** REQ-EPIC-009, US-018, US-019

- ⚠ No completion status, code artifacts, or test evidence provided; cannot confirm whether this work was actually built -- includes the India-hosting item itself.
<!-- sdlc:auto:end narrative -->
