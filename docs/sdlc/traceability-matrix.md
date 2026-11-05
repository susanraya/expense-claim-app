# Traceability Matrix

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start legend -->
Built from recorded links, not written by a model: requirement key → plan item (`source_stable_key`) → development ticket (`stable_key`) → the ticket's test steps → the last live deployment that started after the work finished. **AC tests** counts the story's acceptance criteria that have a test case, and those whose test cases all passed in the latest finished E2E run.
<!-- sdlc:auto:end legend -->

<!-- sdlc:auto:start matrix -->
| Requirement | Epic | Title | Plan items | Sprint | Design | Code | Commits | Ticket | Tests | AC tests | Deployed |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-001 | EPIC-001 | Employee sign-in | US-001, US-001-T1, US-001-T2, US-001-T3 | 1 | GET /me, POST /auth/login, POST /auth/logout, api_backend, database, users, web_app | backend/package.json, backend/src/api/api.controller.ts, backend/src/api/api.module.ts, backend/src/app.module.ts, backend/src/auth/auth.integration.test.ts +22 more | 44754f4 | delivered | not run | 3/3 tested · 0/3 passing | — |
| US-002 | EPIC-001 | Role-based access enforcement | US-002 | 1 | api_backend, users, web_app | — | 44754f4 | delivered | not run | 3/3 tested · 1/3 passing | — |
| US-003 | EPIC-002 | Manage users and roles | US-003 | 2 | GET /users, PATCH /users/{id}, POST /users, api_backend, database, users, web_app | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-004 | EPIC-002 | Assign approving manager to each employee | US-004 | 2 | PATCH /users/{id}, api_backend, database, users, web_app | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-005 | EPIC-003 | Set up expense categories | US-005 | 2 | GET /categories, PATCH /categories/{id}, POST /categories, api_backend, categories, database, web_app | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-006 | EPIC-003 | Configure per-category spending limits | US-006 | 2 | PATCH /categories/{id}, api_backend, categories, database | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-007 | EPIC-004 | Create and submit an expense claim | US-007, US-007-T1, US-007-T2, US-007-T3 | 3 | PATCH /claims/{id}, POST /claims, POST /claims/{id}/submit, api_backend, categories, claims, database, web_app | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-008 | EPIC-004 | Upload receipt images as proof | US-008, US-008-T1, US-008-T2, US-008-T3 | 3 | GET /claims/{id}/receipts/{receiptId}/url, POST /claims/{id}/receipts, api_backend, object_store, receipts, web_app | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-009 | EPIC-004 | Over-limit claim flagging at submission | US-009 | 3 | POST /claims/{id}/submit, api_backend, categories, claims, database | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-010 | EPIC-005 | View my claims and their status | US-010 | 4 | GET /claims/mine, GET /claims/{id}, api_backend, claim_audit, claims, receipts, web_app | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-011 | EPIC-005 | See rejection reason and resubmit | US-011 | 4 | GET /claims/{id}, PATCH /claims/{id}, POST /claims/{id}/submit, api_backend, claim_audit, claims, web_app | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-012 | EPIC-006 | Manager approves or rejects team claims | US-012, US-012-T1, US-012-T2, US-012-T3 | 4 | GET /approvals/manager-queue, POST /claims/{id}/approve, POST /claims/{id}/reject, api_backend, claim_audit, claims, database, web_app | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-013 | EPIC-006 | Finance gives final approval | US-013 | 5 | GET /approvals/finance-queue, POST /claims/{id}/approve, POST /claims/{id}/reject, api_backend, claim_audit, claims, web_app | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-014 | EPIC-007 | Mark a claim as reimbursed | US-014 | 5 | POST /claims/{id}/reimburse, api_backend, claim_audit, claims, database | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-015 | EPIC-007 | View and export claims list | US-015 | 5 | GET /claims, GET /claims/export, api_backend, claims, web_app | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-016 | EPIC-007 | Claim audit trail | US-016 | 6 | GET /claims/{id}, api_backend, claim_audit, database, web_app | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-017 | EPIC-008 | Email notifications on status changes | US-017, US-017-T1, US-017-T2, US-017-T3 | 6 | api_backend, claims, email_service, users | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-018 | EPIC-009 | Privacy notice at onboarding | US-018 | 2 | GET /privacy-notice, POST /me/privacy-notice/ack, api_backend, users, web_app | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-019 | EPIC-009 | Store data within India | US-019 | 1 | database, object_store | backend/package.json, backend/src/object-store/object-store.controller.ts, backend/src/object-store/object-store.integration.test.ts, backend/src/object-store/object-store.module.ts, backend/src/object-store/object-store.service.ts +4 more | 33ce2cc | delivered | not run | 2/2 tested · 2/2 passing | — |
<!-- sdlc:auto:end matrix -->
