/**
 * AC-004, AC-005, AC-006, NFR-003: role-based access across the seeded roles, and that
 * every guarded route rejects a request with no Authorization header.
 */
import type { INestApplication } from "@nestjs/common";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { createApp } from "../src/app";
import { SEED_PASSWORD } from "../src/auth/seed";

describe("rbac", () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createApp({ logger: false });
    await app.init();
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

  function withAuth(method: "get" | "post", path: string, token: string) {
    return request(app.getHttpServer())
      [method](path)
      .set("Authorization", `Bearer ${token}`)
      .send({});
  }

  it("[AC-004] Employee gets 403 on manager-queue, finance-queue, /users and category writes", async () => {
    const employee = await tokenFor("employee@example.com");

    expect((await withAuth("get", "/approvals/manager-queue", employee)).status).toBe(403);
    expect((await withAuth("get", "/approvals/finance-queue", employee)).status).toBe(403);
    expect((await withAuth("get", "/users", employee)).status).toBe(403);
    expect((await withAuth("post", "/categories", employee)).status).toBe(403);
    expect((await withAuth("post", "/users", employee)).status).toBe(403);
  });

  it("[AC-005] Manager gets 200 on the manager queue and 403 on /users and category writes", async () => {
    const manager = await tokenFor("manager@example.com");

    expect((await withAuth("get", "/approvals/manager-queue", manager)).status).toBe(200);
    expect((await withAuth("get", "/users", manager)).status).toBe(403);
    expect((await withAuth("post", "/categories", manager)).status).toBe(403);
  });

  it("[AC-006] Finance/Admin gets 200 on the finance queue, /claims and /claims/export", async () => {
    const finance = await tokenFor("finance@example.com");
    const admin = await tokenFor("admin@example.com");

    expect((await withAuth("get", "/approvals/finance-queue", finance)).status).toBe(200);
    expect((await withAuth("get", "/claims", finance)).status).toBe(200);
    expect((await withAuth("get", "/claims/export", finance)).status).toBe(200);

    expect((await withAuth("get", "/approvals/finance-queue", admin)).status).toBe(200);
    expect((await withAuth("get", "/claims", admin)).status).toBe(200);
    expect((await withAuth("get", "/claims/export", admin)).status).toBe(200);
  });

  it("[NFR-003] every non-login route returns 401 with no Authorization header", async () => {
    const routes: Array<["get" | "post", string]> = [
      ["get", "/me"],
      ["post", "/auth/logout"],
      ["get", "/users"],
      ["post", "/users"],
      ["get", "/categories"],
      ["post", "/categories"],
      ["post", "/claims"],
      ["get", "/claims/mine"],
      ["get", "/approvals/manager-queue"],
      ["get", "/approvals/finance-queue"],
      ["get", "/claims"],
      ["get", "/claims/export"],
    ];

    for (const [method, path] of routes) {
      const res = await request(app.getHttpServer())[method](path).send({});
      expect(res.status, `${method.toUpperCase()} ${path} should require auth`).toBe(401);
    }
  });
});
