# API Reference

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start endpoints -->
| Method | Path | Handler | Source | Summary |
|---|---|---|---|---|
| GET | /approvals/finance-queue | getApprovalsFinanceQueue | `backend/src/api/api.controller.ts:157` | Manager-approved claims pending final finance approval. |
| GET | /approvals/manager-queue | getApprovalsManagerQueue | `backend/src/api/api.controller.ts:150` | Manager's team claims pending manager approval. |
| POST | /auth/login | postAuthLogin | `backend/src/api/api.controller.ts:40` | Authenticate with email/password; returns JWT. Failure returns a generic error. |
| POST | /auth/logout | postAuthLogout | `backend/src/api/api.controller.ts:48` | End the current session: the presented token is rejected from here on. |
| GET | /categories | getCategories | `backend/src/api/api.controller.ts:94` | List categories with optional limits; active ones selectable on claims. |
| POST | /categories | postCategories | `backend/src/api/api.controller.ts:101` | Create an expense category (Admin only). |
| PATCH | /categories/{id} | patchCategoriesById | `backend/src/api/api.controller.ts:108` | Edit name, limit or deactivate a category without affecting existing claims (Admin only). |
| GET | /claims | getClaims | `backend/src/api/api.controller.ts:185` | Finance view of all claims, filterable by status, employee, category or date. |
| POST | /claims | postClaims | `backend/src/api/api.controller.ts:115` | Create a draft claim with amount (INR), date, category and description. |
| GET | /claims/export | getClaimsExport | `backend/src/api/api.controller.ts:192` | Export the filtered claims list as a CSV file. |
| GET | /claims/mine | getClaimsMine | `backend/src/api/api.controller.ts:136` | Employee's own claims with status. |
| GET | /claims/{id} | getClaimsById | `backend/src/api/api.controller.ts:143` | Full claim detail including receipts and audit history (owner or authorised approver/finance). |
| PATCH | /claims/{id} | patchClaimsById | `backend/src/api/api.controller.ts:122` | Edit a draft or returned claim before resubmission. |
| POST | /claims/{id}/approve | postClaimsByIdApprove | `backend/src/api/api.controller.ts:164` | Approve at the current stage (manager advances to finance; finance makes finance-approved). |
| POST | /claims/{id}/receipts | postClaimsByIdReceipts | `backend/src/object-store/object-store.controller.ts:38` | Upload a receipt image (type and size validated); stored in S3 or, locally, on disk. |
| GET | /claims/{id}/receipts/{receiptId}/file | getClaimsByIdReceiptsByReceiptidFile | `backend/src/object-store/object-store.controller.ts:61` | Local-fallback bytes, behind the same role check as everything else -- never public. |
| GET | /claims/{id}/receipts/{receiptId}/url | getClaimsByIdReceiptsByReceiptidUrl | `backend/src/object-store/object-store.controller.ts:50` | Signed, time-limited URL to view a receipt (authorised roles only). |
| POST | /claims/{id}/reimburse | postClaimsByIdReimburse | `backend/src/api/api.controller.ts:178` | Mark a finance-approved claim reimbursed (recording only, no payment). |
| POST | /claims/{id}/reject | postClaimsByIdReject | `backend/src/api/api.controller.ts:171` | Reject with a required reason; returns claim to employee. |
| POST | /claims/{id}/submit | postClaimsByIdSubmit | `backend/src/api/api.controller.ts:129` | Submit a claim; applies category limit check and sets pending manager approval. Blocked if no manager assigned. |
| GET | /health | health | `backend/src/health.controller.ts:9` | — |
| GET | /me | getMe | `backend/src/api/api.controller.ts:55` | Current user profile and role. |
| POST | /me/privacy-notice/ack | postMePrivacyNoticeAck | `backend/src/api/api.controller.ts:61` | Record acknowledgement of the DPDP privacy notice shown at onboarding. |
| GET | /privacy-notice | getPrivacyNotice | `backend/src/api/api.controller.ts:67` | Return the privacy notice content, viewable again anytime. |
| GET | /users | getUsers | `backend/src/api/api.controller.ts:74` | List users (Admin only). |
| POST | /users | postUsers | `backend/src/api/api.controller.ts:81` | Create a user with email and role (Admin only). |
| PATCH | /users/{id} | patchUsersById | `backend/src/api/api.controller.ts:88` | Edit role, manager assignment or deactivate a user (Admin only). |
<!-- sdlc:auto:end endpoints -->

<!-- sdlc:auto:start drift -->
**Code only:**

- GET /claims/{id}/receipts/{receiptId}/file
<!-- sdlc:auto:end drift -->

<!-- sdlc:auto:start source -->
Generated from commit `29ad01b`
<!-- sdlc:auto:end source -->
