# Tests

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start summary -->
57 tests · Passed 51 · Failed 0 · Skipped 0 · Not run 6

Acceptance criteria covered: 8/50 · passing: 3/50
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start tests -->
## Sprint 1

### US-001: Employee sign-in

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| AC-001 | auth > test_ac001_login_returns_jwt_and_user | Unit | Passed | `backend/src/auth/auth.integration.test.ts` |
| AC-002 | auth > test_ac002_deactivated_account_returns_same_generic_401 | Unit | Passed | `backend/src/auth/auth.integration.test.ts` |
| AC-002 | auth > test_ac002_unknown_email_returns_same_generic_401 | Unit | Passed | `backend/src/auth/auth.integration.test.ts` |
| AC-002 | auth > test_ac002_wrong_password_returns_generic_401 | Unit | Passed | `backend/src/auth/auth.integration.test.ts` |
| AC-003 | auth > test_ac003_logout_invalidates_the_presented_token | Unit | Passed | `backend/src/auth/auth.integration.test.ts` |
| AC-004 | auth > test_ac004_every_route_except_login_requires_a_token | Unit | Passed | `backend/src/auth/auth.integration.test.ts` |
| AC-005 | auth > test_ac005_admin_route_accepts_admin_role | Unit | Passed | `backend/src/auth/auth.integration.test.ts` |
| AC-006 | auth > test_ac006_direct_url_access_outside_role_returns_403 | Unit | Passed | `backend/src/auth/auth.integration.test.ts` |
| — | auth > test_me_requires_a_valid_token | Unit | Passed | `backend/src/auth/auth.integration.test.ts` |
| — | auth > test_me_returns_profile_fields | Unit | Passed | `backend/src/auth/auth.integration.test.ts` |
| — | auth > test_role_matrix_admin_write_routes | Unit | Passed | `backend/src/auth/auth.integration.test.ts` |
| — | auth > test_role_matrix_employee_own_claim_routes | Unit | Passed | `backend/src/auth/auth.integration.test.ts` |
| — | auth > test_role_matrix_finance_routes | Unit | Passed | `backend/src/auth/auth.integration.test.ts` |
| — | auth > test_role_matrix_manager_queue | Unit | Passed | `backend/src/auth/auth.integration.test.ts` |
| AC-001 | auth > [AC-001] valid credentials return a token and the user payload | Unit | Passed | `backend/tests/auth.test.ts` |
| AC-002 | auth > [AC-002][NFR-001] a deactivated account returns 401 with the same generic message | Unit | Passed | `backend/tests/auth.test.ts` |
| AC-002 | auth > [AC-002][NFR-001] an invalid email returns 401 with the generic message | Unit | Passed | `backend/tests/auth.test.ts` |
| AC-002 | auth > [AC-002][NFR-001] an invalid password returns 401 with the same generic message | Unit | Passed | `backend/tests/auth.test.ts` |
| AC-003 | auth > [AC-003][NFR-002] a token presented after logout is refused on GET /me | Unit | Passed | `backend/tests/auth.test.ts` |
| AC-004 | rbac > [AC-004] Employee gets 403 on manager-queue, finance-queue, /users and category writes | Unit | Passed | `backend/tests/rbac.test.ts` |
| AC-005 | rbac > [AC-005] Manager gets 200 on the manager queue and 403 on /users and category writes | Unit | Passed | `backend/tests/rbac.test.ts` |
| AC-006 | rbac > [AC-006] Finance/Admin gets 200 on the finance queue, /claims and /claims/export | Unit | Passed | `backend/tests/rbac.test.ts` |
| — | rbac > [NFR-003] every non-login route returns 401 with no Authorization header | Unit | Passed | `backend/tests/rbac.test.ts` |
| AC-003 | App > [AC-003] signing out calls logout, clears the token, and returns to /sign-in | Unit | Passed | `frontend/src/App.test.ts` |
| AC-004 | App > [AC-004] an Employee sees only My claims in the menu | Unit | Passed | `frontend/src/App.test.ts` |
| AC-005 | App > [AC-005] a Manager also sees Approvals | Unit | Passed | `frontend/src/App.test.ts` |
| AC-006 | App > [AC-006] direct navigation to a disallowed path shows an access-refused view | Unit | Passed | `frontend/src/App.test.ts` |
| — | App > [NFR-002] redirects to /sign-in when visiting a protected path without a token | Unit | Passed | `frontend/src/App.test.ts` |
| — | App > renders a screen inside the app shell and shows its menu | Unit | Passed | `frontend/src/App.test.ts` |
| AC-001 | SignIn > [AC-001] submits email+password, stores the token, and navigates to /my-claims on success | Unit | Passed | `frontend/src/screens/SignIn.test.ts` |
| AC-002 | SignIn > [AC-002] shows one generic error with no field indication on a failed login | Unit | Passed | `frontend/src/screens/SignIn.test.ts` |
| — | SignIn > does not show hard-coded demo credentials | Unit | Passed | `frontend/src/screens/SignIn.test.ts` |
| AC-001 | [AC-001] sign in with valid credentials lands on My claims | E2E | Not run yet | `frontend/e2e/auth.spec.ts` |
| AC-002 | [AC-002] wrong password shows the generic error and stays on sign-in | E2E | Not run yet | `frontend/e2e/auth.spec.ts` |
| AC-003 | [AC-003] sign out returns to sign-in, and a protected URL then redirects back | E2E | Not run yet | `frontend/e2e/auth.spec.ts` |
| AC-004 | [AC-004] an Employee navigating directly to /approvals and /administration sees access refused | E2E | Not run yet | `frontend/e2e/rbac.spec.ts` |
| AC-006 | [AC-006] a Finance/Admin user can reach both /approvals and /administration | E2E | Not run yet | `frontend/e2e/rbac.spec.ts` |

### US-019: Store data within India

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| AC-050 | receipt storage > test_ac050_nfr005_returns_a_short_lived_url_for_owner_manager_finance_admin | Unit | Passed | `backend/src/object-store/object-store.integration.test.ts` |
| AC-050 | receipt storage > test_ac050_rejects_oversized_file | Unit | Passed | `backend/src/object-store/object-store.integration.test.ts` |
| AC-050 | receipt storage > test_ac050_rejects_unsupported_content_type | Unit | Passed | `backend/src/object-store/object-store.integration.test.ts` |
| AC-050 | receipt storage > test_ac050_uploads_a_receipt_and_records_metadata | Unit | Passed | `backend/src/object-store/object-store.integration.test.ts` |
| — | receipt storage > test_local_fallback_serves_bytes_through_a_role_checked_route | Unit | Passed | `backend/src/object-store/object-store.integration.test.ts` |
| — | receipt storage > test_nfr003_non_authorised_roles_get_403_on_both_routes | Unit | Passed | `backend/src/object-store/object-store.integration.test.ts` |
| AC-050 | [AC-050][NFR-005] receipt access > [AC-050] rejects a disallowed content type | Unit | Passed | `backend/tests/receipt-access.test.ts` |
| AC-050 | [AC-050][NFR-005] receipt access > [AC-050] rejects an oversized file | Unit | Passed | `backend/tests/receipt-access.test.ts` |
| AC-050 | [AC-050][NFR-005] receipt access > [AC-050] stores a valid image receipt | Unit | Passed | `backend/tests/receipt-access.test.ts` |
| AC-050 | [AC-050][NFR-005] receipt access > [AC-050][NFR-005] a non-owner Employee gets 403 on upload and on the signed-URL route | Unit | Passed | `backend/tests/receipt-access.test.ts` |
| AC-050 | [AC-050][NFR-005] receipt access > [AC-050][NFR-005] the owner, their manager, and Finance/Admin all succeed on the signed-URL route | Unit | Passed | `backend/tests/receipt-access.test.ts` |
| AC-050 | [AC-050][NFR-005] receipt access > [NFR-005] returns a signed URL with an expiry of 15 minutes or less | Unit | Passed | `backend/tests/receipt-access.test.ts` |
| AC-049 | [AC-049] MEDIA_ROOT fallback when S3_BUCKET is unset > writes the file under MEDIA_ROOT and serves it back through the API, not a public path | Unit | Passed | `backend/tests/storage.test.ts` |
| AC-049 | [AC-049][NFR-007] storage backend configuration > creates the S3 client from S3_BUCKET/AWS_REGION only, with no hard-coded keys or endpoint | Unit | Passed | `backend/tests/storage.test.ts` |
| AC-049 | [AC-049][NFR-007] storage backend configuration > documents AWS_REGION as an India region (ap-south-1) for Receipt Storage | Unit | Passed | `backend/tests/storage.test.ts` |

## Project setup

| Criteria | Test | Level | Result | File |
|---|---|---|---|---|
| — | createStatements > creates only tables that do not exist yet | Unit | Passed | `backend/tests/database.test.ts` |
| — | databaseUrl > drops the driver part the platform writes | Unit | Passed | `backend/tests/database.test.ts` |
| — | databaseUrl > refuses to guess when no database is set | Unit | Passed | `backend/tests/database.test.ts` |
| — | health > reports ok | Unit | Passed | `backend/tests/health.test.ts` |
| — | the app loads | E2E | Not run yet | `frontend/e2e/example.spec.ts` |
<!-- sdlc:auto:end tests -->
