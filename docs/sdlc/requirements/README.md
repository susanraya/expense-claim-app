# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-SCOPE · approved · source: requirements:scope

Lightweight-scope expense claim web app for a single India-based company (<100 employees): claim creation, receipt upload, sequential Manager->Finance approval, admin configuration, INR-only claims.

Requirements v1. Product-owner-approved stack: NestJS 11 (backend), AWS Mumbai region (cloud, for DPDP residency, paired with S3), PostgreSQL 16 (database, transactional consistency for claim status), Svelte 5 (frontend). Approved services: Amazon S3 (saas, receipt storage, env AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY/AWS_REGION/S3_BUCKET) and SendGrid (saas, status emails, env SENDGRID_API_KEY). Required API keys: AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY, S3_BUCKET, SENDGRID_API_KEY. Out of scope: OCR/AI receipt extraction; direct HR/payroll/accounting integration or in-app disbursement; native iOS/Android app (responsive web instead). Capabilities in scope: claim creation (amount/date/category/description), receipt image upload, employee sign-in, employee claims/status dashboard, category list setup, INR as sole currency. NFR-009: system is sized for a single company under ~100 employees.

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004, EPIC-005, EPIC-006, EPIC-007, EPIC-008, EPIC-009, NFR-009

### REQ-EPIC-001 · approved · source: requirements:EPIC-001

Email/password sign-in with role-based access so Employees, Managers, Finance and Admin each see only the functions appropriate to their role.

US-001 (critical): valid credentials sign the employee in and open their claims dashboard (AC-001); incorrect email or password is denied with a generic error that does not reveal which field was wrong (AC-002, NFR-001); signing out ends the session, requiring re-sign-in (AC-003, NFR-002). US-002 (high): Employees cannot reach admin/approval functions even by direct URL (AC-004, NFR-003 -- enforced on every route); Managers can approve for their team but not configure categories/users (AC-005); Finance/Admin can access finance review, export and admin configuration (AC-006). Stated assumption: no SSO/MFA at this scope (NFR-010, accepted risk).

**Related:** US-001, US-002, AC-001, AC-002, AC-003, AC-004, AC-005, AC-006, NFR-001, NFR-002, NFR-003, NFR-010

### REQ-EPIC-002 · approved · source: requirements:EPIC-002

Admin (or Finance acting as admin) manages user accounts, roles, and each employee's single approving manager.

US-003 (high): Admin creates/edits/deactivates user accounts and assigns role Employee/Manager/Finance/Admin (AC-007); deactivating a departed employee blocks sign-in while preserving historical claims (AC-008); non-Admins are refused access to user management (AC-009). US-004 (high): Admin assigns exactly one approving manager per employee, who becomes the first-stage approver (AC-010); an employee with no manager assigned is prevented from submitting a claim or flagged for missing approver (AC-011). Stated assumption: each employee has exactly one manager, reporting structure managed in-app.

**Related:** US-003, US-004, AC-007, AC-008, AC-009, AC-010, AC-011

### REQ-EPIC-003 · approved · source: requirements:EPIC-003

Admin configures the expense category list and an optional per-category INR spending limit used to flag/block claims at submission.

US-005 (high): Admin creates and maintains categories, which become selectable on claim creation (AC-012); editing/deactivating a category updates the selectable list without affecting existing claims already using it (AC-013). US-006 (high): Admin sets an optional per-claim limit in INR per category, applied to future claims (AC-014); categories with no limit configured skip the limit check entirely (AC-015).

**Related:** US-005, US-006, AC-012, AC-013, AC-014, AC-015

### REQ-EPIC-004 · approved · source: requirements:EPIC-004

Employees create INR expense claims (amount, date, category, description), attach receipt images (including phone-camera capture), and over-limit claims are flagged or blocked at submission.

US-007 (critical): a valid amount/date/category/description creates a submittable claim (AC-016); a missing required field blocks submission with the field highlighted (AC-017); amount is recorded in INR only, no currency selector offered (AC-018); successful submission sets status to pending manager approval with confirmation (AC-019). US-008 (critical): one or more receipt images attach to a claim as proof (AC-020); phone-browser camera capture is supported (AC-021, NFR-008); images are stored as attachments only -- never read for amount/date/merchant, matching the OCR/AI-extraction out-of-scope note (AC-022); unsupported file types or over-size files are rejected with a clear message (AC-023, NFR-006). US-009 (high): claims exceeding a configured category limit are flagged or blocked at submission with the limit disclosed (AC-024); claims within limit, or in categories with no limit, proceed normally (AC-025).

**Related:** US-007, US-008, US-009, AC-016, AC-017, AC-018, AC-019, AC-020, AC-021, AC-022, AC-023, AC-024, AC-025, NFR-006, NFR-008

### REQ-EPIC-005 · approved · source: requirements:EPIC-005

Employees view their own claims and status on a dashboard, see rejection reasons, and can resubmit returned claims.

US-010 (high): dashboard shows only the signed-in employee's own claims (NFR-004) with amount, date, category and status such as pending manager, pending finance, approved/reimbursed, or rejected (AC-026); opening a claim shows full details, attached receipts and status history (AC-027). US-011 (medium): a rejected claim shows the reason and who rejected it (AC-028); editing and resubmitting re-enters the workflow starting at manager approval (AC-029).

**Related:** US-010, US-011, AC-026, AC-027, AC-028, AC-029, NFR-004

### REQ-EPIC-006 · approved · source: requirements:EPIC-006

Claims flow strictly sequentially Employee -> Manager -> Finance; a rejection at either stage returns the claim to the employee with a required reason.

US-012 (critical): Manager's queue shows only their own team's pending claims with details/receipts (AC-030); approval advances the claim to Finance (AC-031); rejection requires a reason and returns the claim to the employee without advancing (AC-032); a rejection without a reason is not accepted (AC-033). US-013 (critical): Finance queue shows only manager-approved claims (AC-034); claims still pending manager approval never appear in the Finance queue, enforcing strict sequencing (AC-037); Finance approval makes the claim finance-approved and reimbursement-eligible (AC-035); Finance rejection with reason returns the claim to the employee (AC-036).

**Related:** US-012, US-013, AC-030, AC-031, AC-032, AC-033, AC-034, AC-035, AC-036, AC-037

### REQ-EPIC-007 · approved · source: requirements:EPIC-007

Finance records reimbursement (no in-app payment), views/filters/exports claims, and every claim keeps a full audit trail.

US-014 (high): Finance marks a finance-approved claim reimbursed, visible to the employee (AC-038); this records status only -- the app never initiates payment (AC-039), matching the out-of-scope note on in-app disbursement. US-015 (high): Finance views all claims with key details, filterable by status/employee/category/date (AC-040), and can export the listed claims to a file such as CSV (AC-041). US-016 (medium): every submission, approval, rejection or reimbursement writes an audit entry with action, actor, timestamp and comment/reason (AC-042); the full chronological history is viewable on the claim (AC-043).

**Related:** US-014, US-015, US-016, AC-038, AC-039, AC-040, AC-041, AC-042, AC-043

### REQ-EPIC-008 · approved · source: requirements:EPIC-008

Email notifications keep managers, Finance and employees informed as a claim's status changes.

US-017 (medium): the assigned manager is emailed when a claim enters their queue (AC-044); Finance is emailed when a claim advances, and the employee is emailed on approval, rejection or reimbursement (AC-045); rejection emails include the rejection reason (AC-046).

**Related:** US-017, AC-044, AC-045, AC-046

### REQ-EPIC-009 · approved · source: requirements:EPIC-009

DPDP-aligned privacy notice at onboarding and India-region data residency for all employee personal data and receipts.

DPDP Act 2023: notice obligation -- US-018 (high) shows a privacy notice explaining what personal data/receipts are processed and why on first access (AC-047), re-accessible later from within the app (AC-048); processing relies on the employment/legitimate-use basis, so no consent-manager or consent-withdrawal flow is built (NFR-011, explicit accepted risk). DPDP Act: data residency -- US-019 (high) requires personal data and receipt images held in an India region for both database and object storage (AC-049, NFR-007); receipt files in object storage are restricted to authorised roles (AC-050, NFR-005).

**Related:** US-018, US-019, AC-047, AC-048, AC-049, AC-050, NFR-005, NFR-007, NFR-011

- ⚠ DPDP data-principal rights (access, correction, erasure, grievance redressal) not addressed by any requirement.
- ⚠ DPDP breach-notification duties and CERT-In 6-hour reporting / 180-day log retention not addressed by any requirement or design.
- ⚠ Significant Data Fiduciary applicability (India DPO, audits, DPIA) not assessed.
- ⚠ Accessibility (RPwD Act 2016 / GIGW-WCAG alignment) not addressed by any requirement.
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v1  
**Delivery scope:** lightweight  
**Approved:** 2026-11-04

**Capabilities in scope:** Expense claim creation with amount, date, category and description, Receipt image upload as claim proof, Employee sign-in, Employee's own claims and status dashboard, Expense category list setup, Indian Rupees as the single claim currency

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | NestJS | — |
| cloud | AWS | You need everything hosted inside India for DPDP data residency; AWS's Mumbai region keeps the app, database and receipt files in-country. It is also the platform default and pairs directly with S3 for your receipt storage, so the whole system sits with one provider in one region. |
| database | PostgreSQL | Claims, approvals, categories, limits, users and the per-claim audit trail are all structured records that must stay consistent — a claim can't be both reimbursed and rejected. PostgreSQL enforces that reliably and comfortably handles the modest volume of under 100 employees, while keeping your data in one India-hosted store to meet the residency assumption. |
| frontend | Svelte | — |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: Authentication & Access Control

Email/password sign-in with role-based access so that Employees, Managers, Finance and Admin only see the functions appropriate to their role. Assumption: authentication is email/password with role-based access control; no SSO/MFA at this scope.

### US-001: Employee sign-in

**Priority:** critical

> As a employee, I want to sign in to the expense application with my email and password, so that I can securely access my own expense claims.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | I am a registered employee with valid credentials | I enter my correct email and password and submit | I am signed in and taken to my claims dashboard |
| AC-002 | I am on the sign-in page | I enter an incorrect email or password | I am denied access and shown an error without revealing which field was wrong |
| AC-003 | I have signed in | I choose to sign out | my session is ended and I must sign in again to access the app |

### US-002: Role-based access enforcement

**Priority:** high

> As a company, I want each user to see only the functions their role permits, so that employees, managers, finance and admin access only what is appropriate.

| ID | Given | When | Then |
|---|---|---|---|
| AC-004 | I am signed in as an Employee | I attempt to open an admin or approval function via its URL | access is refused and I remain limited to employee functions |
| AC-005 | I am signed in as a Manager | I view the app | I can access approval functions for my team but not category/user configuration |
| AC-006 | I am signed in with the Finance/Admin role | I view the app | I can access finance review, export and admin configuration functions |

## EPIC-002: User & Role Administration

An Admin (which may be fulfilled by Finance) manages user accounts, assigns roles and sets each employee's approving manager. Assumption: a separate Admin role exists or Finance acts as admin; each employee has exactly one assigned manager who approves their claims, with reporting structure managed within the app.

### US-003: Manage users and roles

**Priority:** high

> As a an Admin, I want to create, edit and deactivate user accounts and assign roles, so that only current staff can access the app with the correct permissions.

| ID | Given | When | Then |
|---|---|---|---|
| AC-007 | I am signed in as an Admin | I create a new user with an email and assign a role of Employee, Manager, Finance or Admin | the user account is created with that role and can sign in |
| AC-008 | an employee has left the company | I deactivate their account | they can no longer sign in but their historical claims remain intact |
| AC-009 | I am not an Admin | I attempt to open user management | access is refused |

### US-004: Assign approving manager to each employee

**Priority:** high

> As a an Admin, I want to assign one approving manager to each employee, so that submitted claims route to the correct approver.

| ID | Given | When | Then |
|---|---|---|---|
| AC-010 | I am editing an employee's account | I assign a manager from the list of manager users | that manager becomes the first-stage approver for the employee's claims. Assumption: each employee has exactly one assigned manager. |
| AC-011 | an employee has no manager assigned | the employee attempts to submit a claim | the system prevents submission or flags that no approver is configured |

## EPIC-003: Expense Category & Limit Configuration

An Admin sets up the list of expense categories and an optional per-category spending limit used to flag or block over-limit claims at submission. Assumption: configuration is performed by Admin or Finance acting as admin.

### US-005: Set up expense categories

**Priority:** high

> As a an Admin, I want to create and maintain the list of expense categories, so that employees choose from an approved set when claiming.

| ID | Given | When | Then |
|---|---|---|---|
| AC-012 | I am signed in as an Admin | I add a new expense category with a name | the category becomes available for selection when creating a claim |
| AC-013 | a category is no longer used | I deactivate or edit the category | it is updated in the selectable list without affecting existing claims that already use it |

### US-006: Configure per-category spending limits

**Priority:** high

> As a an Admin, I want to set a spending limit for each expense category, so that the app can flag or block claims that exceed policy.

| ID | Given | When | Then |
|---|---|---|---|
| AC-014 | I am editing an expense category | I set a per-claim limit amount in INR | that limit is saved and applied to future claims in that category |
| AC-015 | a category has no limit configured | an employee submits a claim in that category | no limit check is applied and the claim proceeds normally |

## EPIC-004: Expense Claim Creation & Receipt Upload

Employees create expense claims by manually entering amount (INR), date, category and description, and uploading one or more receipt images as proof. On submission the claim is checked against configured category limits. Assumption: claims are in INR only (no multi-currency); the app stores receipts as attachments only and does not auto-extract data from them; delivered as a responsive web app with receipt capture via phone browser.

### US-007: Create and submit an expense claim

**Priority:** critical

> As a an employee, I want to enter the amount, date, category and description of an expense and submit it, so that I can request reimbursement for money I spent.

| ID | Given | When | Then |
|---|---|---|---|
| AC-016 | I am signed in as an employee | I enter a valid amount in INR, a date, select a category and provide a description | the claim is created and I can submit it for approval |
| AC-017 | I am creating a claim | I leave a required field (amount, date or category) blank | the system prevents submission and highlights the missing field |
| AC-018 | I enter an amount | I submit the claim | the amount is recorded in Indian Rupees as the single currency with no currency selection offered |
| AC-019 | I have submitted a claim | the submission succeeds | the claim status is set to pending manager approval and I receive confirmation |

### US-008: Upload receipt images as proof

**Priority:** critical

> As a an employee, I want to attach one or more receipt images to my claim, including capturing them via my phone browser, so that I provide proof of the expense.

| ID | Given | When | Then |
|---|---|---|---|
| AC-020 | I am creating or editing a claim | I upload one or more receipt image files | the images are attached to the claim and stored as proof |
| AC-021 | I am using my phone's web browser | I choose to add a receipt | I can capture a photo via the browser camera and attach it to the claim |
| AC-022 | I attach a receipt image | the claim is saved | the app stores the image as an attachment only and does not read the amount, date or merchant from it |
| AC-023 | I upload a file that is not a supported image type or exceeds the size limit | I attempt to attach it | the upload is rejected with a clear message |

### US-009: Over-limit claim flagging at submission

**Priority:** high

> As a an employee, I want to be warned or blocked when my claim exceeds the category spending limit, so that I understand and respect the company expense policy.

| ID | Given | When | Then |
|---|---|---|---|
| AC-024 | the selected category has a configured limit | I submit a claim whose amount exceeds that limit | the claim is flagged as over-limit or blocked per the configured policy and I am informed of the limit |
| AC-025 | the selected category has a configured limit | I submit a claim whose amount is within the limit | the claim is accepted without an over-limit flag |

## EPIC-005: Employee Claims Dashboard

Employees can view the list and status of their own claims and the reason for any rejection, and resubmit returned claims.

### US-010: View my claims and their status

**Priority:** high

> As a an employee, I want to see a dashboard of my own claims with their current status, so that I know where each claim is in the approval process.

| ID | Given | When | Then |
|---|---|---|---|
| AC-026 | I am signed in as an employee | I open my claims dashboard | I see only my own claims with their amount, date, category and current status (e.g. pending manager, pending finance, approved/reimbursed, rejected) |
| AC-027 | I am viewing my dashboard | I open a specific claim | I see its full details, attached receipts and status history |

### US-011: See rejection reason and resubmit

**Priority:** medium

> As a an employee, I want to see why a claim was rejected and correct and resubmit it, so that I can fix issues and still get reimbursed.

| ID | Given | When | Then |
|---|---|---|---|
| AC-028 | a manager or finance has rejected my claim with a reason | I open the claim | I see the rejection reason and who rejected it |
| AC-029 | my claim was rejected and returned to me | I edit the claim and resubmit | the claim re-enters the workflow starting at manager approval |

## EPIC-006: Sequential Approval Workflow

Claims flow sequentially Employee → Manager → Finance. The manager approves or rejects, then Finance gives final approval; a rejection at any stage returns the claim to the employee with a reason. Assumption: the workflow is strictly sequential and any rejection returns the claim to the employee.

### US-012: Manager approves or rejects team claims

**Priority:** critical

> As a a manager, I want to review and approve or reject claims submitted by my team, so that only legitimate expenses advance to Finance.

| ID | Given | When | Then |
|---|---|---|---|
| AC-030 | I am a manager with claims awaiting my approval | I open my approval queue | I see the claims of employees assigned to me that are pending manager approval, with their details and receipts |
| AC-031 | I am reviewing a pending claim | I approve it | the claim advances to the Finance approval stage |
| AC-032 | I am reviewing a pending claim | I reject it and enter a reason | the claim is returned to the employee with that reason and does not proceed to Finance |
| AC-033 | I attempt to reject a claim | I do not provide a reason | the rejection is not accepted until a reason is entered |

### US-013: Finance gives final approval

**Priority:** critical

> As a a Finance user, I want to give final approval to manager-approved claims or reject them, so that only properly approved claims are marked for reimbursement.

| ID | Given | When | Then |
|---|---|---|---|
| AC-034 | a claim has been approved by the manager | I open the Finance approval queue | I see the claim pending final Finance approval |
| AC-035 | I am reviewing a manager-approved claim | I approve it | the claim becomes finance-approved and eligible to be marked reimbursed |
| AC-036 | I am reviewing a manager-approved claim | I reject it with a reason | the claim is returned to the employee with that reason |
| AC-037 | a claim is still pending manager approval | I view the Finance queue | it does not appear, because the workflow is strictly sequential |

## EPIC-007: Reimbursement Recording, Reporting & Audit

Finance marks approved claims as reimbursed (recording only — payment happens outside the app), can view and export the list of claims, and each claim keeps an audit trail of status changes and approver comments. Assumption: payment is recorded only, with no in-app disbursement and no payroll/accounting export; export is a simple file such as CSV.

### US-014: Mark a claim as reimbursed

**Priority:** high

> As a a Finance user, I want to mark a finance-approved claim as reimbursed, so that the claim status reflects that payment has been arranged outside the app.

| ID | Given | When | Then |
|---|---|---|---|
| AC-038 | a claim is finance-approved | I mark it as reimbursed | its status changes to reimbursed and this is visible to the employee |
| AC-039 | I mark a claim reimbursed | the status is updated | no payment is initiated by the app, as actual disbursement happens outside the app |

### US-015: View and export claims list

**Priority:** high

> As a a Finance user, I want to view and export the list of claims, so that I can reconcile and report expenses outside the app.

| ID | Given | When | Then |
|---|---|---|---|
| AC-040 | I am signed in as Finance | I open the claims list | I can view all claims with their key details and filter by status, employee, category or date |
| AC-041 | I am viewing the claims list | I choose to export | I receive a file (e.g. CSV) containing the listed claims and their key fields |

### US-016: Claim audit trail

**Priority:** medium

> As a a Finance user or Admin, I want each claim to keep an audit trail of status changes and approver comments, so that there is an accountable record of every decision.

| ID | Given | When | Then |
|---|---|---|---|
| AC-042 | a claim moves through submission, approval, rejection or reimbursement | each action occurs | the audit trail records the action, the user who performed it, the timestamp and any comment or reason |
| AC-043 | I open a claim | I view its history | I see the full chronological audit trail of status changes and comments |

## EPIC-008: Notifications

Users receive email notifications when the status of a claim relevant to them changes. Assumption: notifications are delivered by email for claim status changes.

### US-017: Email notifications on status changes

**Priority:** medium

> As a a user, I want to be notified by email when a claim relevant to me changes status, so that I can act promptly without constantly checking the app.

| ID | Given | When | Then |
|---|---|---|---|
| AC-044 | an employee submits a claim | it enters the manager's queue | the assigned manager receives an email notification |
| AC-045 | a manager approves a claim | it advances to Finance | Finance is notified and, on final actions, the employee is notified of approval, rejection or reimbursement |
| AC-046 | a claim is rejected | it is returned to the employee | the employee receives an email including the rejection reason |

## EPIC-009: Data Protection & Residency (DPDP)

Employee personal data and receipts are processed under the DPDP Act employment/legitimate-use basis, with a privacy notice shown at onboarding and data stored within India. Assumption: no consent-manager flow is built since processing is for employment purposes; the app is hosted in an India region for data residency.

### US-018: Privacy notice at onboarding

**Priority:** high

> As a a company, I want to show employees a privacy notice when they first access the app, so that we meet DPDP notice obligations for employment-purpose processing.

| ID | Given | When | Then |
|---|---|---|---|
| AC-047 | a new user signs in for the first time | the app loads | a privacy notice explaining what personal data and receipts are processed and why is presented |
| AC-048 | the privacy notice is displayed | the user reviews it | the notice is accessible again later from within the app. Assumption: processing relies on the employment/legitimate-use basis so no consent-manager or withdrawal flow is provided. |

### US-019: Store data within India

**Priority:** high

> As a a company, I want employee data and receipt files stored within India, so that the app aligns with data residency expectations under Indian law.

| ID | Given | When | Then |
|---|---|---|---|
| AC-049 | the app is deployed | personal data and receipt images are stored | they are held in infrastructure located in an India region (database and object storage) |
| AC-050 | receipt files are uploaded | they are saved | they are stored in object storage located within India and access is restricted to authorised roles |
<!-- sdlc:auto:end epics -->
