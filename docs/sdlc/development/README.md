# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEV-PLAN-v1 · approved · source: plan:v1

Development plan version 1 is approved, organized into 6 sprints of capacity 20 each, spanning authentication/access control through to audit trail and notifications.

Sprint goals as stated: Sprint 1 - Stand up authentication, role-based access control and India-region hosting. Sprint 2 - Admin configuration: users, manager assignment, categories and limits, plus privacy notice. Sprint 3 - Employees can create claims, attach receipts, and have over-limit claims flagged. Sprint 4 - Employees track claim status and managers can approve or reject team claims. Sprint 5 - Finance gives final approval, records reimbursement, and can view/export claims. Sprint 6 - Full audit trail and email notifications complete the claim lifecycle.

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005, EPIC-006, EPIC-007, EPIC-008, EPIC-009

- ⚠ No explicit field mapping backlog items to sprint numbers was provided; sprint-to-epic groupings below are inferred from matching sprint goal wording to epic/story titles.
- ⚠ No start/end dates for the plan or individual sprints were given.
- ⚠ No execution/completion status (in-progress, done, blocked) was provided for any item.

### SPRINT-1 · approved · source: plan:Sprint 1

Sprint 1 goal: stand up authentication, role-based access control, and India-region hosting.

Capacity 20. Thematically aligns with EPIC-001 (US-001 Employee sign-in, US-002 Role-based access enforcement) and US-019 (Store data within India), based on goal wording.

**Related:** EPIC-001, US-001, US-002, US-019

- ⚠ Item-to-sprint assignment is inferred from goal text, not an explicit field.

### SPRINT-2 · approved · source: plan:Sprint 2

Sprint 2 goal: admin configuration of users, manager assignment, categories and limits, plus privacy notice.

Capacity 20. Thematically aligns with EPIC-002 (US-003 Manage users and roles, US-004 Assign approving manager), EPIC-003 (US-005 Set up expense categories, US-006 Configure per-category spending limits), and US-018 (Privacy notice at onboarding).

**Related:** EPIC-002, EPIC-003, US-003, US-004, US-005, US-006, US-018

- ⚠ Item-to-sprint assignment is inferred from goal text, not an explicit field.

### SPRINT-3 · approved · source: plan:Sprint 3

Sprint 3 goal: employees can create claims, attach receipts, and have over-limit claims flagged.

Capacity 20. Thematically aligns with EPIC-004 (US-007 Create and submit an expense claim, US-008 Upload receipt images as proof, US-009 Over-limit claim flagging at submission).

**Related:** EPIC-004, US-007, US-008, US-009

- ⚠ Item-to-sprint assignment is inferred from goal text, not an explicit field.

### SPRINT-4 · approved · source: plan:Sprint 4

Sprint 4 goal: employees track claim status and managers can approve or reject team claims.

Capacity 20. Thematically aligns with EPIC-005 (US-010 View my claims and their status, US-011 See rejection reason and resubmit) and US-012 (Manager approves or rejects team claims, part of EPIC-006).

**Related:** EPIC-005, US-010, US-011, US-012

- ⚠ Item-to-sprint assignment is inferred from goal text, not an explicit field.

### SPRINT-5 · approved · source: plan:Sprint 5

Sprint 5 goal: finance gives final approval, records reimbursement, and can view/export claims.

Capacity 20. Thematically aligns with US-013 (Finance gives final approval, part of EPIC-006) and EPIC-007 items US-014 (Mark a claim as reimbursed), US-015 (View and export claims list).

**Related:** US-013, US-014, US-015

- ⚠ Item-to-sprint assignment is inferred from goal text, not an explicit field.

### SPRINT-6 · approved · source: plan:Sprint 6

Sprint 6 goal: full audit trail and email notifications complete the claim lifecycle.

Capacity 20. Thematically aligns with US-016 (Claim audit trail, EPIC-007) and US-017 (Email notifications on status changes, EPIC-008).

**Related:** US-016, US-017

- ⚠ Item-to-sprint assignment is inferred from goal text, not an explicit field.

### EPIC-001 · draft · source: plan:EPIC-001

Authentication & Access Control epic covers employee sign-in and role-based access enforcement.

US-001 Employee sign-in (8 pts, backend-agent): subtasks are US-001-T1 implement auth endpoints with hashed passwords and session/token issuance (backend-agent), US-001-T2 build sign-in and sign-out UI (frontend-agent), US-001-T3 add session expiry/guard middleware (security-agent). US-002 Role-based access enforcement (5 pts, backend-agent).

**Related:** US-001, US-002, SPRINT-1

- ⚠ No completion/test status reported for US-001, US-002 or their subtasks.
- ⚠ No acceptance-criteria detail beyond the story title was provided.

### EPIC-002 · draft · source: plan:EPIC-002

User & Role Administration epic covers managing users/roles and assigning each employee's approving manager.

US-003 Manage users and roles (5 pts, backend-agent). US-004 Assign approving manager to each employee (3 pts, backend-agent) -- this assignment is a precondition referenced later by US-007-T3 (claim submission blocked without a configured manager).

**Related:** US-003, US-004, SPRINT-2

- ⚠ No completion/test status reported for US-003 or US-004.

### EPIC-003 · draft · source: plan:EPIC-003

Expense Category & Limit Configuration epic covers setting up expense categories and per-category spending limits.

US-005 Set up expense categories (3 pts, backend-agent). US-006 Configure per-category spending limits (2 pts, backend-agent) -- limits configured here are consumed later by US-009's over-limit flagging logic.

**Related:** US-005, US-006, US-009, SPRINT-2

- ⚠ No completion/test status reported for US-005 or US-006.

### EPIC-004 · draft · source: plan:EPIC-004

Expense Claim Creation & Receipt Upload epic covers creating/submitting claims, attaching receipt images, and flagging over-limit claims.

US-007 Create and submit an expense claim (8 pts, backend-agent): US-007-T1 implement claim create/update/submit endpoints (backend-agent), US-007-T2 build claim entry form (frontend-agent), US-007-T3 block submission when no approving manager is configured (backend-agent, depends on US-004). US-008 Upload receipt images as proof (8 pts, integration-agent): US-008-T1 implement S3 upload integration and receipt endpoints (integration-agent), US-008-T2 build receipt upload UI with phone camera capture (frontend-agent), US-008-T3 validate file type and size with clear rejection messaging (backend-agent). US-009 Over-limit claim flagging at submission (3 pts, backend-agent, depends on US-006 category limits).

**Related:** US-007, US-008, US-009, US-004, US-006, SPRINT-3

- ⚠ No completion/test status reported for US-007, US-008, US-009 or their subtasks.

### EPIC-005 · draft · source: plan:EPIC-005

Employee Claims Dashboard epic covers employees viewing their claims' status and viewing/resubmitting rejected claims.

US-010 View my claims and their status (5 pts, frontend-agent). US-011 See rejection reason and resubmit (3 pts, frontend-agent) -- depends on rejection data produced by US-012's manager reject flow.

**Related:** US-010, US-011, US-012, SPRINT-4

- ⚠ No completion/test status reported for US-010 or US-011.

### EPIC-006 · draft · source: plan:EPIC-006

Sequential Approval Workflow epic covers manager approve/reject of team claims followed by finance final approval.

US-012 Manager approves or rejects team claims (8 pts, backend-agent): US-012-T1 implement manager queue and approve/reject endpoints (backend-agent), US-012-T2 build manager approval queue UI (frontend-agent), US-012-T3 record status-change audit entries on approve/reject (backend-agent, feeds US-016 audit trail). US-013 Finance gives final approval (5 pts, backend-agent) -- no subtasks listed. Goal wording places US-012 in Sprint 4 and US-013 in Sprint 5, i.e. this epic spans two sprints.

**Related:** US-012, US-013, US-016, SPRINT-4, SPRINT-5

- ⚠ No completion/test status reported for US-012 or US-013.
- ⚠ No subtasks were listed for US-013, unlike comparable stories; unclear if this is intentional or incomplete breakdown.

### EPIC-007 · draft · source: plan:EPIC-007

Reimbursement Recording, Reporting & Audit epic covers marking claims reimbursed, exporting claims data, and maintaining a full audit trail.

US-014 Mark a claim as reimbursed (2 pts, backend-agent). US-015 View and export claims list (5 pts, backend-agent). US-016 Claim audit trail (5 pts, backend-agent) -- builds on audit entries recorded by US-012-T3. Goal wording places US-014/US-015 in Sprint 5 and US-016 in Sprint 6, i.e. this epic spans two sprints.

**Related:** US-014, US-015, US-016, US-012, SPRINT-5, SPRINT-6

- ⚠ No completion/test status reported for US-014, US-015 or US-016.
- ⚠ No detail on export format (CSV/PDF/etc.) was provided.

### EPIC-008 · draft · source: plan:EPIC-008

Notifications epic covers emailing employees, managers and finance when a claim's status changes.

US-017 Email notifications on status changes (8 pts, integration-agent): US-017-T1 implement SendGrid email service wrapper (integration-agent), US-017-T2 trigger manager and finance notification emails (backend-agent), US-017-T3 trigger employee notification emails (backend-agent).

**Related:** US-017, SPRINT-6

- ⚠ No completion/test status reported for US-017 or its subtasks.
- ⚠ No detail on specific email trigger conditions (which status transitions) or templates was provided.

### EPIC-009 · draft · source: plan:EPIC-009

Data Protection & Residency epic, explicitly labeled DPDP in the plan, covers a user-facing privacy notice and India-only data storage.

US-018 Privacy notice at onboarding (3 pts, frontend-agent) -- goal wording places this in Sprint 2. US-019 Store data within India (3 pts, devops-agent) -- goal wording places this in Sprint 1 ('India-region hosting').

**Related:** US-018, US-019, SPRINT-1, SPRINT-2

- ⚠ No completion/test status reported for US-018 or US-019.
- ⚠ The epic name references DPDP (India's Digital Personal Data Protection Act) but no domain/compliance skill input was supplied defining its specific controls; only the privacy-notice and data-residency stories are traceable from the given input. A human should confirm whether other DPDP obligations (e.g. consent withdrawal, data subject access/erasure requests, breach notification) are addressed elsewhere, as none appear in this backlog.

### DEV-STATUS-GAP · draft · source: plan:v1

The development phase input is a backlog/sprint plan only; it contains no evidence of actual coding progress.

No ticket status (in-progress/done/blocked), code commits, pull requests, build results, or QA sign-off were included in the input. Only story/task definitions, point estimates, and assigned agent roles are available.

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005, EPIC-006, EPIC-007, EPIC-008, EPIC-009

- ⚠ Cannot confirm which, if any, stories or tasks have actually been implemented.
- ⚠ No linkage to a code repository, CI build, or test suite was provided for this phase.
<!-- sdlc:auto:end narrative -->
