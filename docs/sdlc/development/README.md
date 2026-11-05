# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### PLAN-001 · approved · source: plan:v1

Approved development plan (version 1), 6 sprints at 20-point capacity each, covering the full expense-claim lifecycle from authentication through audit trail and notifications.

Plan status: approved, version 1. 6 sprints, each capacity 20 points. Sprint 1: auth, RBAC, India-region hosting. Sprint 2: admin configuration (users, manager assignment, categories, limits) plus privacy notice. Sprint 3: claim creation, receipt upload, over-limit flagging. Sprint 4: employee status tracking and manager approval. Sprint 5: finance final approval, reimbursement recording, reporting/export. Sprint 6: audit trail and email notifications. Epics: EPIC-001 Authentication & Access Control, EPIC-002 User & Role Administration, EPIC-003 Expense Category & Limit Configuration, EPIC-004 Expense Claim Creation & Receipt Upload, EPIC-005 Employee Claims Dashboard, EPIC-006 Sequential Approval Workflow, EPIC-007 Reimbursement Recording/Reporting & Audit, EPIC-008 Notifications, EPIC-009 Data Protection & Residency (DPDP). All 19 stories are scoped with points and assigned agent role (backend-agent, frontend-agent, integration-agent, security-agent, devops-agent); several stories are broken into explicit tasks (see per-sprint entries).

**Related:** US-001, US-002, US-003, US-004, US-005, US-006, US-007, US-008, US-009, US-010, US-011, US-012, US-013, US-014, US-015, US-016, US-017, US-018, US-019

- ⚠ Epics themselves (EPIC-001..EPIC-009) carry no point estimate or role assignment -- only child stories are scoped.
- ⚠ Plan has no sprint start/end dates.

### PLAN-SPRINT-1 · approved · source: plan:Sprint 1

Sprint 1 stands up authentication, role-based access control, and India-region data hosting.

Goal: Stand up authentication, role-based access control and India-region hosting. Capacity: 20 points. Items: US-001 Employee sign-in (8pts, backend-agent) with tasks US-001-T1 Implement auth endpoints with hashed passwords and session/token issuance (backend-agent), US-001-T2 Build sign-in and sign-out UI (frontend-agent), US-001-T3 Add session expiry/guard middleware (security-agent); US-002 Role-based access enforcement (5pts, backend-agent); US-019 Store data within India (3pts, devops-agent). Associated epics: EPIC-001 Authentication & Access Control, EPIC-009 Data Protection & Residency (DPDP).

**Related:** US-001, US-002, US-019

### PLAN-SPRINT-2 · approved · source: plan:Sprint 2

Sprint 2 covers admin configuration -- user/role management, manager assignment, expense categories and limits -- plus the onboarding privacy notice.

Goal: Admin configuration: users, manager assignment, categories and limits, plus privacy notice. Capacity: 20 points. Items: US-003 Manage users and roles (5pts, backend-agent); US-004 Assign approving manager to each employee (3pts, backend-agent); US-005 Set up expense categories (3pts, backend-agent); US-006 Configure per-category spending limits (2pts, backend-agent); US-018 Privacy notice at onboarding (3pts, frontend-agent). Associated epics: EPIC-002 User & Role Administration, EPIC-003 Expense Category & Limit Configuration, EPIC-009 Data Protection & Residency (DPDP).

**Related:** US-003, US-004, US-005, US-006, US-018

### PLAN-SPRINT-3 · approved · source: plan:Sprint 3

Sprint 3 lets employees create claims, attach receipts, and triggers automatic over-limit flagging.

Goal: Employees can create claims, attach receipts, and have over-limit claims flagged. Capacity: 20 points. Items: US-007 Create and submit an expense claim (8pts, backend-agent) with tasks US-007-T1 Implement claim create/update/submit endpoints (backend-agent), US-007-T2 Build claim entry form (frontend-agent), US-007-T3 Block submission when no approving manager is configured (backend-agent); US-008 Upload receipt images as proof (8pts, integration-agent) with tasks US-008-T1 Implement S3 upload integration and receipt endpoints (integration-agent), US-008-T2 Build receipt upload UI with phone camera capture (frontend-agent), US-008-T3 Validate file type and size with clear rejection messaging (backend-agent); US-009 Over-limit claim flagging at submission (3pts, backend-agent). Associated epic: EPIC-004 Expense Claim Creation & Receipt Upload.

**Related:** US-007, US-008, US-009

### PLAN-SPRINT-4 · approved · source: plan:Sprint 4

Sprint 4 gives employees claim-status visibility and lets managers approve or reject their team's claims.

Goal: Employees track claim status and managers can approve or reject team claims. Capacity: 20 points. Items: US-010 View my claims and their status (5pts, frontend-agent); US-011 See rejection reason and resubmit (3pts, frontend-agent); US-012 Manager approves or rejects team claims (8pts, backend-agent) with tasks US-012-T1 Implement manager queue and approve/reject endpoints (backend-agent), US-012-T2 Build manager approval queue UI (frontend-agent), US-012-T3 Record status-change audit entries on approve/reject (backend-agent). Associated epics: EPIC-005 Employee Claims Dashboard, EPIC-006 Sequential Approval Workflow.

**Related:** US-010, US-011, US-012

### PLAN-SPRINT-5 · approved · source: plan:Sprint 5

Sprint 5 adds finance's final approval step, reimbursement recording, and claims list viewing/export.

Goal: Finance gives final approval, records reimbursement, and can view/export claims. Capacity: 20 points. Items: US-013 Finance gives final approval (5pts, backend-agent); US-014 Mark a claim as reimbursed (2pts, backend-agent); US-015 View and export claims list (5pts, backend-agent). Associated epic: EPIC-007 Reimbursement Recording, Reporting & Audit (partial -- continues in Sprint 6).

**Related:** US-013, US-014, US-015

### PLAN-SPRINT-6 · approved · source: plan:Sprint 6

Sprint 6 completes the claim lifecycle with a full audit trail and email notifications.

Goal: Full audit trail and email notifications complete the claim lifecycle. Capacity: 20 points. Items: US-016 Claim audit trail (5pts, backend-agent); US-017 Email notifications on status changes (8pts, integration-agent) with tasks US-017-T1 Implement SendGrid email service wrapper (integration-agent), US-017-T2 Trigger manager and finance notification emails (backend-agent), US-017-T3 Trigger employee notification emails (backend-agent). Associated epics: EPIC-007 Reimbursement Recording, Reporting & Audit (remainder), EPIC-008 Notifications.

**Related:** US-016, US-017

### DEV-US-001 · approved · source: dev:US-001

Employee sign-in story delivered and committed.

Ticket US-001 (Employee sign-in) status=delivered, commit 44754f4329469c630e11a7b22462dd4d8000b8e1. Per the sprint plan this story covers auth endpoints with hashed passwords and session/token issuance, sign-in/sign-out UI, and session expiry/guard middleware (tasks US-001-T1/T2/T3).

**Related:** US-001, PLAN-SPRINT-1

- ⚠ Dev run input reports only the parent story US-001 as delivered; no individual confirmation is given for sub-tasks US-001-T1, US-001-T2, or US-001-T3.

### DEV-US-002 · approved · source: dev:US-002

Role-based access enforcement story delivered and committed.

Ticket US-002 (Role-based access enforcement) status=delivered, commit 44754f4329469c630e11a7b22462dd4d8000b8e1 -- the same commit hash reported for US-001, indicating both were delivered together.

**Related:** US-002, PLAN-SPRINT-1

### DEV-US-019 · approved · source: dev:US-019

India data-residency story delivered and committed.

Ticket US-019 (Store data within India) status=delivered, commit 33ce2cc1c7882d28b5201f1d8976daaeec7c2bdd.

**Related:** US-019, PLAN-SPRINT-1

### DEV-RUN-001 · draft · source: dev:run-status

Development run is reported as overall 'completed', but ticket-level delivery evidence is provided for only 3 of the 19 planned stories.

Development run status: completed. Ticket-level records were supplied only for US-001, US-002, and US-019 (all delivered, Sprint 1 scope). No ticket records were provided for the 16 remaining stories spanning Sprints 2-6: US-003-US-006 (admin configuration, Sprint 2), US-007-US-009 (claim creation/receipts, Sprint 3), US-010-US-012 (employee dashboard/manager approval, Sprint 4), US-013-US-015 (finance approval/reimbursement/reporting, Sprint 5), US-016-US-017 (audit trail/notifications, Sprint 6), nor US-018 (privacy notice, Sprint 2). No task-level items (e.g., US-007-T1/T2/T3, US-008-T1/T2/T3, US-012-T1/T2/T3, US-017-T1/T2/T3) were reported either.

**Related:** US-003, US-004, US-005, US-006, US-007, US-008, US-009, US-010, US-011, US-012, US-013, US-014, US-015, US-016, US-017, US-018

- ⚠ Discrepancy: overall dev run status is 'completed' but delivery evidence covers only 3 of 19 planned stories -- unclear whether the remaining work was actually finished, is in progress, or wasn't started.
- ⚠ No delivery status for US-003 through US-018 or for any sub-tasks under US-007, US-008, US-012, and US-017.
<!-- sdlc:auto:end narrative -->
