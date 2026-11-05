/**
 * AC-049, AC-050, NFR-003, NFR-005: receipt upload, short-lived signed URLs, and role
 * restrictions to the claim owner, that employee's manager, and Finance/Admin.
 */
import { randomUUID } from "node:crypto";

import type { INestApplication } from "@nestjs/common";
import { eq } from "drizzle-orm";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { createApp } from "../app";
import { SEED_PASSWORD } from "../auth/seed";
import { db } from "../db";
import { categories, claims, users } from "../schema";

describe("receipt storage", () => {
  let app: INestApplication;
  let claimId: string;

  beforeAll(async () => {
    app = await createApp({ logger: false });
    await app.init();

    const database = await db();
    const [category] = await database
      .insert(categories)
      .values({ id: randomUUID(), name: "Travel", isActive: true, createdAt: new Date() })
      .returning();
    const [employee] = await database
      .select()
      .from(users)
      .where(eq(users.email, "employee@example.com"))
      .limit(1);
    const [claim] = await database
      .insert(claims)
      .values({
        id: randomUUID(),
        employeeId: employee.id,
        categoryId: category.id,
        amount: "100.00",
        currency: "INR",
        expenseDate: "2026-01-01",
        description: "Taxi",
        status: "draft",
        overLimitFlag: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    claimId = claim.id;

    const [admin] = await database
      .select()
      .from(users)
      .where(eq(users.email, "admin@example.com"))
      .limit(1);
    await database.insert(users).values({
      id: randomUUID(),
      email: "other-employee@example.com",
      passwordHash: admin.passwordHash,
      fullName: "Oscar Other",
      role: "employee",
      isActive: true,
      tokenVersion: 0,
      createdAt: new Date(),
    });
  });

  afterAll(async () => {
    await app.close();
  });

  async function tokenFor(email: string): Promise<string> {
    const res = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ email, password: SEED_PASSWORD });
    return res.body.token as string;
  }

  async function upload(token: string, filename = "receipt.png", bytes = "fake-image-bytes") {
    return request(app.getHttpServer())
      .post(`/claims/${claimId}/receipts`)
      .set("Authorization", `Bearer ${token}`)
      .attach("file", Buffer.from(bytes), { filename, contentType: "image/png" });
  }

  it("test_ac050_uploads_a_receipt_and_records_metadata", async () => {
    const token = await tokenFor("employee@example.com");

    const res = await upload(token);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      filename: "receipt.png",
      content_type: "image/png",
      size: Buffer.from("fake-image-bytes").length,
    });
    expect(typeof res.body.id).toBe("string");
  });

  it("test_ac050_rejects_unsupported_content_type", async () => {
    const token = await tokenFor("employee@example.com");

    const res = await request(app.getHttpServer())
      .post(`/claims/${claimId}/receipts`)
      .set("Authorization", `Bearer ${token}`)
      .attach("file", Buffer.from("not an image"), {
        filename: "virus.exe",
        contentType: "application/x-msdownload",
      });

    expect(res.status).toBe(400);
  });

  it("test_ac050_rejects_oversized_file", async () => {
    const token = await tokenFor("employee@example.com");
    const big = Buffer.alloc(11 * 1024 * 1024, 1);

    const res = await request(app.getHttpServer())
      .post(`/claims/${claimId}/receipts`)
      .set("Authorization", `Bearer ${token}`)
      .attach("file", big, { filename: "big.png", contentType: "image/png" });

    expect(res.status).toBe(400);
  });

  it("test_nfr003_non_authorised_roles_get_403_on_both_routes", async () => {
    const otherToken = await tokenFor("other-employee@example.com");

    const uploadRes = await upload(otherToken, "forbidden.png");
    expect(uploadRes.status).toBe(403);

    const employeeToken = await tokenFor("employee@example.com");
    const owned = await upload(employeeToken, "owned.png");

    const urlRes = await request(app.getHttpServer())
      .get(`/claims/${claimId}/receipts/${owned.body.id}/url`)
      .set("Authorization", `Bearer ${otherToken}`);
    expect(urlRes.status).toBe(403);
  });

  it("test_ac050_nfr005_returns_a_short_lived_url_for_owner_manager_finance_admin", async () => {
    const employeeToken = await tokenFor("employee@example.com");
    const owned = await upload(employeeToken, "shared.png");
    const receiptId = owned.body.id as string;

    for (const email of [
      "employee@example.com",
      "manager@example.com",
      "finance@example.com",
      "admin@example.com",
    ]) {
      const token = await tokenFor(email);
      const res = await request(app.getHttpServer())
        .get(`/claims/${claimId}/receipts/${receiptId}/url`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status, `${email} should be authorised`).toBe(200);
      expect(typeof res.body.url).toBe("string");
      const minutesLeft = (new Date(res.body.expires_at).getTime() - Date.now()) / 60000;
      expect(minutesLeft).toBeGreaterThan(0);
      expect(minutesLeft).toBeLessThanOrEqual(15);
    }
  });

  it("test_local_fallback_serves_bytes_through_a_role_checked_route", async () => {
    const employeeToken = await tokenFor("employee@example.com");
    const owned = await upload(employeeToken, "local.png", "hello-local-bytes");
    const receiptId = owned.body.id as string;

    const urlRes = await request(app.getHttpServer())
      .get(`/claims/${claimId}/receipts/${receiptId}/url`)
      .set("Authorization", `Bearer ${employeeToken}`);
    expect(urlRes.body.url).toBe(`/claims/${claimId}/receipts/${receiptId}/file`);

    const fileRes = await request(app.getHttpServer())
      .get(urlRes.body.url)
      .set("Authorization", `Bearer ${employeeToken}`);
    expect(fileRes.status).toBe(200);
    expect(fileRes.body.toString()).toBe("hello-local-bytes");

    const otherToken = await tokenFor("other-employee@example.com");
    const forbidden = await request(app.getHttpServer())
      .get(urlRes.body.url)
      .set("Authorization", `Bearer ${otherToken}`);
    expect(forbidden.status).toBe(403);
  });
});
