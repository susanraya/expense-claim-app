import { expect, test } from "@playwright/test";

const VALID_EMAIL = "employee@example.com";
const VALID_PASSWORD = "Password123!";

test("[AC-001] sign in with valid credentials lands on My claims", async ({ page }) => {
  await page.goto("/sign-in");
  await page.getByLabel("Email").fill(VALID_EMAIL);
  await page.getByLabel("Password").fill(VALID_PASSWORD);
  await page.getByRole("button", { name: /sign in/i }).click();

  await expect(page.getByRole("heading", { name: "My claims" })).toBeVisible({ timeout: 10_000 });
  await expect(page).toHaveURL(/\/my-claims/);
});

test("[AC-002] wrong password shows the generic error and stays on sign-in", async ({ page }) => {
  await page.goto("/sign-in");
  await page.getByLabel("Email").fill(VALID_EMAIL);
  await page.getByLabel("Password").fill("not-the-password");
  await page.getByRole("button", { name: /sign in/i }).click();

  const alert = page.getByRole("alert");
  await expect(alert).toBeVisible();
  await expect(alert).toContainText(/incorrect/i);
  // Generic: it must not name which field was wrong.
  await expect(alert).not.toContainText(/email is incorrect/i);
  await expect(alert).not.toContainText(/password is incorrect/i);
  await expect(page).toHaveURL(/\/sign-in/);
});

test("[AC-003] sign out returns to sign-in, and a protected URL then redirects back", async ({
  page,
}) => {
  await page.goto("/sign-in");
  await page.getByLabel("Email").fill(VALID_EMAIL);
  await page.getByLabel("Password").fill(VALID_PASSWORD);
  await page.getByRole("button", { name: /sign in/i }).click();
  await expect(page).toHaveURL(/\/my-claims/, { timeout: 10_000 });

  await page.getByRole("link", { name: /sign out/i }).click();
  await expect(page).toHaveURL(/\/sign-in/);

  await page.goto("/my-claims");
  await expect(page).toHaveURL(/\/sign-in/);
});
