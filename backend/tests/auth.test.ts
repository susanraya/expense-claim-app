/**
 * AC-001, AC-002, AC-003, NFR-001, NFR-002: sign-in, generic failure message, and
 * logout ending the session. Runs against the live app and PostgreSQL from DATABASE_URL.
 */
import { randomUUID } from "node:crypto";

import type { INestApplication } from "@nestjs/common";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { createApp } from "../src/app";
import { db } from "../src/db";
import { users } from "../src/schema";
import { SEED_PASSWORD } from "../src/auth/seed";

const GENERIC_MESSAGE = "Invalid email or password.";

describe("auth", () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createApp({ logger: false });
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  function login(email: string, password = SEED_PASSWORD) {
    return request(app.getHttpServer()).post("/auth/login").send({ email, password });
  }

  it("[AC-001] valid credentials return a token and the user payload", async () => {
    const res = await login("admin@example.com");

    expect(res.status).toBe(200);
    expect(typeof res.body.token).toBe("string");
    expect(res.body.token.length).toBeGreaterThan(0);
    expect(res.body.user).toMatchObject({
      email: "admin@example.com",
      full_name: "Alex Admin",
      role: "admin",
    });
    expect(typeof res.body.user.id).toBe("string");
  });

  it("[AC-002][NFR-001] an invalid email returns 401 with the generic message", async () => {
    const res = await login("no-such-user@example.com", "whatever");

    expect(res.status).toBe(401);
    expect(res.body.message).toBe(GENERIC_MESSAGE);
  });

  it("[AC-002][NFR-001] an invalid password returns 401 with the same generic message", async () => {
    const res = await login("admin@example.com", "wrong-password");

    expect(res.status).toBe(401);
    expect(res.body.message).toBe(GENERIC_MESSAGE);
  });

  it("[AC-002][NFR-001] a deactivated account returns 401 with the same generic message", async () => {
    const database = await db();
    const passwordHash = await bcrypt.hash("correct-password", 10);
    const email = `deactivated-${randomUUID()}@example.com`;
    await database.insert(users).values({
      id: randomUUID(),
      email,
      passwordHash,
      fullName: "Dana Deactivated",
      role: "employee",
      isActive: false,
      tokenVersion: 0,
      createdAt: new Date(),
    });

    try {
      const res = await login(email, "correct-password");

      expect(res.status).toBe(401);
      expect(res.body.message).toBe(GENERIC_MESSAGE);
    } finally {
      await database.delete(users).where(eq(users.email, email));
    }
  });

  it("[AC-003][NFR-002] a token presented after logout is refused on GET /me", async () => {
    const loginRes = await login("employee@example.com");
    const token = loginRes.body.token as string;

    const meBefore = await request(app.getHttpServer())
      .get("/me")
      .set("Authorization", `Bearer ${token}`);
    expect(meBefore.status).toBe(200);

    const logoutRes = await request(app.getHttpServer())
      .post("/auth/logout")
      .set("Authorization", `Bearer ${token}`);
    expect(logoutRes.status).toBe(204);

    const meAfter = await request(app.getHttpServer())
      .get("/me")
      .set("Authorization", `Bearer ${token}`);
    expect(meAfter.status).toBe(401);
  });
});
