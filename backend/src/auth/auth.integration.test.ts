import { randomUUID } from "node:crypto";

import type { INestApplication } from "@nestjs/common";
import bcrypt from "bcrypt";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { createApp } from "../app";
import { db } from "../db";
import { users } from "../schema";
import { SEED_PASSWORD } from "./seed";

describe("auth", () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createApp({ logger: false });
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  async function login(email: string, password = SEED_PASSWORD) {
    return request(app.getHttpServer()).post("/auth/login").send({ email, password });
  }

  async function tokenFor(email: string): Promise<string> {
    const res = await login(email);
    return res.body.token as string;
  }

  it("test_ac001_login_returns_jwt_and_user", async () => {
    const res = await login("admin@example.com");

    expect(res.status).toBe(200);
    expect(typeof res.body.token).toBe("string");
    expect(res.body.user).toMatchObject({
      email: "admin@example.com",
      full_name: "Alex Admin",
      role: "admin",
    });
    expect(typeof res.body.user.id).toBe("string");
  });

  it("test_ac002_wrong_password_returns_generic_401", async () => {
    const res = await login("admin@example.com", "wrong-password");

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid email or password.");
  });

  it("test_ac002_unknown_email_returns_same_generic_401", async () => {
    const res = await login("nobody@example.com", "whatever");

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid email or password.");
  });

  it("test_ac002_deactivated_account_returns_same_generic_401", async () => {
    const database = await db();
    const passwordHash = await bcrypt.hash("some-password", 10);
    await database.insert(users).values({
      id: randomUUID(),
      email: "deactivated@example.com",
      passwordHash,
      fullName: "Dana Deactivated",
      role: "employee",
      isActive: false,
      tokenVersion: 0,
      createdAt: new Date(),
    });

    const res = await login("deactivated@example.com", "some-password");

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid email or password.");
  });

  it("test_ac003_logout_invalidates_the_presented_token", async () => {
    const token = await tokenFor("employee@example.com");

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

  it("test_me_returns_profile_fields", async () => {
    const token = await tokenFor("manager@example.com");

    const res = await request(app.getHttpServer())
      .get("/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      email: "manager@example.com",
      full_name: "Mia Manager",
      role: "manager",
    });
  });

  it("test_me_requires_a_valid_token", async () => {
    const res = await request(app.getHttpServer()).get("/me");

    expect(res.status).toBe(401);
  });

  it("test_ac004_every_route_except_login_requires_a_token", async () => {
    const res = await request(app.getHttpServer()).get("/users");

    expect(res.status).toBe(401);
  });

  it("test_ac005_admin_route_accepts_admin_role", async () => {
    const token = await tokenFor("admin@example.com");

    const res = await request(app.getHttpServer())
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
  });

  it("test_ac006_direct_url_access_outside_role_returns_403", async () => {
    const token = await tokenFor("employee@example.com");

    const res = await request(app.getHttpServer())
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(403);
  });

  it("test_role_matrix_manager_queue", async () => {
    const managerToken = await tokenFor("manager@example.com");
    const employeeToken = await tokenFor("employee@example.com");

    const asManager = await request(app.getHttpServer())
      .get("/approvals/manager-queue")
      .set("Authorization", `Bearer ${managerToken}`);
    const asEmployee = await request(app.getHttpServer())
      .get("/approvals/manager-queue")
      .set("Authorization", `Bearer ${employeeToken}`);

    expect(asManager.status).toBe(200);
    expect(asEmployee.status).toBe(403);
  });

  it("test_role_matrix_finance_routes", async () => {
    const financeToken = await tokenFor("finance@example.com");
    const managerToken = await tokenFor("manager@example.com");

    const queue = await request(app.getHttpServer())
      .get("/approvals/finance-queue")
      .set("Authorization", `Bearer ${financeToken}`);
    const claims = await request(app.getHttpServer())
      .get("/claims")
      .set("Authorization", `Bearer ${financeToken}`);
    const csvExport = await request(app.getHttpServer())
      .get("/claims/export")
      .set("Authorization", `Bearer ${financeToken}`);
    const forbidden = await request(app.getHttpServer())
      .get("/approvals/finance-queue")
      .set("Authorization", `Bearer ${managerToken}`);

    expect(queue.status).toBe(200);
    expect(claims.status).toBe(200);
    expect(csvExport.status).toBe(200);
    expect(forbidden.status).toBe(403);
  });

  it("test_role_matrix_admin_write_routes", async () => {
    const adminToken = await tokenFor("admin@example.com");

    const postUsers = await request(app.getHttpServer())
      .post("/users")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({});
    const postCategories = await request(app.getHttpServer())
      .post("/categories")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({});

    expect(postUsers.status).toBe(201);
    expect(postCategories.status).toBe(201);
  });

  it("test_role_matrix_employee_own_claim_routes", async () => {
    const employeeToken = await tokenFor("employee@example.com");
    const financeToken = await tokenFor("finance@example.com");

    const mine = await request(app.getHttpServer())
      .get("/claims/mine")
      .set("Authorization", `Bearer ${employeeToken}`);
    const forbidden = await request(app.getHttpServer())
      .get("/claims/mine")
      .set("Authorization", `Bearer ${financeToken}`);

    expect(mine.status).toBe(200);
    expect(forbidden.status).toBe(403);
  });
});
