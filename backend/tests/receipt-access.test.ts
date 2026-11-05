/**
 * AC-050, NFR-005: receipt upload validation, short-lived signed URLs, and role
 * restriction to the claim owner, that employee's manager, and Finance/Admin.
 */
import { randomUUID } from "node:crypto";

import type { INestApplication } from "@nestjs/common";
import { eq } from "drizzle-orm";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { createApp } from "../src/app";
import { SEED_PASSWORD } from "../src/auth/seed";
import { db } from "../src/db";
import { categories, claims, users } from "../src/schema";

describe("[AC-050][NFR-005] receipt access", () => {
  let app: INestApplication;
  let claimId: string;

  beforeAll(async () => {
    app = await createApp({ logger: false });
    await app.init();

    const database = await db();
    const [category] = await database
      .insert(categories)
      .values({
        id: randomUUID(),
        name: "Receipt Access Test",
        isActive: true,
        createdAt: new Date(),
      })
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
        amount: "75.00",
        currency: "INR",
        expenseDate: "2026-01-01",
        description: "Receipt access test claim",
        status: "draft",
        overLimitFlag: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    claimId = claim.id;

    const existingOther = await database
      .select()
      .from(users)
      .where(eq(users.email, "other-employee-ra@example.com"))
      .limit(1);
    if (existingOther.length === 0) {
      const [admin] = await database
        .select()
        .from(users)
        .where(eq(users.email, "admin@example.com"))
        .limit(1);
      await database.insert(users).values({
        id: randomUUID(),
        email: "other-employee-ra@example.com",
        passwordHash: admin.passwordHash,
        fullName: "Olive Other",
        role: "employee",
        isActive: true,
        tokenVersion: 0,
        createdAt: new Date(),
      });
    }
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

  function uploadAs(
    token: string,
    filename: string,
    bytes = "receipt-bytes",
    contentType = "image/png",
  ) {
    return request(app.getHttpServer())
      .post(`/claims/${claimId}/receipts`)
      .set("Authorization", `Bearer ${token}`)
      .attach("file", Buffer.from(bytes), { filename, contentType });
  }

  it("[AC-050] stores a valid image receipt", async () => {
    const token = await tokenFor("employee@example.com");

    const res = await uploadAs(token, "valid.png");

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      filename: "valid.png",
      content_type: "image/png",
      size: Buffer.from("receipt-bytes").length,
    });
    expect(typeof res.body.id).toBe("string");
  });

  it("[AC-050] rejects a disallowed content type", async () => {
    const token = await tokenFor("employee@example.com");

    const res = await request(app.getHttpServer())
      .post(`/claims/${claimId}/receipts`)
      .set("Authorization", `Bearer ${token}`)
      .attach("file", Buffer.from("bad content"), {
        filename: "malware.exe",
        contentType: "application/x-msdownload",
      });

    expect(res.status).toBe(400);
  });

  it("[AC-050] rejects an oversized file", async () => {
    const token = await tokenFor("employee@example.com");
    const oversized = Buffer.alloc(11 * 1024 * 1024, 1);

    const res = await request(app.getHttpServer())
      .post(`/claims/${claimId}/receipts`)
      .set("Authorization", `Bearer ${token}`)
      .attach("file", oversized, { filename: "oversized.png", contentType: "image/png" });

    expect(res.status).toBe(400);
  });

  it("[NFR-005] returns a signed URL with an expiry of 15 minutes or less", async () => {
    const token = await tokenFor("employee@example.com");
    const uploaded = await uploadAs(token, "for-url.png");
    const receiptId = uploaded.body.id as string;

    const res = await request(app.getHttpServer())
      .get(`/claims/${claimId}/receipts/${receiptId}/url`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(typeof res.body.url).toBe("string");
    const minutesLeft = (new Date(res.body.expires_at).getTime() - Date.now()) / 60000;
    expect(minutesLeft).toBeGreaterThan(0);
    expect(minutesLeft).toBeLessThanOrEqual(15);
  });

  it("[AC-050][NFR-005] a non-owner Employee gets 403 on upload and on the signed-URL route", async () => {
    const ownerToken = await tokenFor("employee@example.com");
    const owned = await uploadAs(ownerToken, "owned-by-employee.png");
    const otherToken = await tokenFor("other-employee-ra@example.com");

    const uploadRes = await uploadAs(otherToken, "forbidden-upload.png");
    expect(uploadRes.status).toBe(403);

    const urlRes = await request(app.getHttpServer())
      .get(`/claims/${claimId}/receipts/${owned.body.id}/url`)
      .set("Authorization", `Bearer ${otherToken}`);
    expect(urlRes.status).toBe(403);
  });

  it("[AC-050][NFR-005] the owner, their manager, and Finance/Admin all succeed on the signed-URL route", async () => {
    const ownerToken = await tokenFor("employee@example.com");
    const owned = await uploadAs(ownerToken, "shared-for-roles.png");
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
    }
  });
});
