/**
 * The baseline tests the scaffold ships with.
 *
 * The platform installs this tree and runs `npm test` against it, so there has to be
 * something green to run before an agent has written anything.
 */
import type { INestApplication } from "@nestjs/common";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { createApp } from "../src/app";

describe("health", () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createApp({ logger: false });
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("reports ok", async () => {
    // A failure here means the app does not import or does not start.
    const response = await request(app.getHttpServer()).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});
