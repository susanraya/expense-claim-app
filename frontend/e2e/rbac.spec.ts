import { expect, test } from "@playwright/test";

const PASSWORD = "Password123!";

async function signIn(page: import("@playwright/test").Page, email: string): Promise<void> {
  await page.goto("/sign-in");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(PASSWORD);
  await page.getByRole("button", { name: /sign in/i }).click();
  await expect(page).toHaveURL(/\/my-claims/, { timeout: 10_000 });
}

test("[AC-004] an Employee navigating directly to /approvals and /administration sees access refused", async ({
  page,
}) => {
  await signIn(page, "employee@example.com");

  await page.goto("/approvals");
  await expect(page.getByRole("heading", { name: /access refused/i })).toBeVisible();

  await page.goto("/administration");
  await expect(page.getByRole("heading", { name: /access refused/i })).toBeVisible();
});

test("[AC-006] a Finance/Admin user can reach both /approvals and /administration", async ({
  page,
}) => {
  await signIn(page, "finance@example.com");

  await page.goto("/approvals");
  await expect(page.getByRole("heading", { name: /access refused/i })).not.toBeVisible();

  await page.goto("/administration");
  await expect(page.getByRole("heading", { name: /access refused/i })).not.toBeVisible();
});
