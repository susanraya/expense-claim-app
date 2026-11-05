/**
 * AC-049, NFR-007: the S3 backend is built only from S3_BUCKET/AWS_REGION with no
 * hard-coded keys or endpoint, that region is documented as an India region, and with
 * S3_BUCKET unset a receipt is written under MEDIA_ROOT and read back through the API
 * rather than a public path.
 */
import { randomUUID } from "node:crypto";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import type { INestApplication } from "@nestjs/common";
import { eq } from "drizzle-orm";
import request from "supertest";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

import { createApp } from "../src/app";
import { SEED_PASSWORD } from "../src/auth/seed";
import { db } from "../src/db";
import { categories, claims, users } from "../src/schema";

describe("[AC-049][NFR-007] storage backend configuration", () => {
  it("creates the S3 client from S3_BUCKET/AWS_REGION only, with no hard-coded keys or endpoint", async () => {
    const source = await readFile(
      join(__dirname, "..", "src", "object-store", "storage.service.ts"),
      "utf8",
    );

    expect(source).toMatch(/Bucket:\s*process\.env\.S3_BUCKET/);
    expect(source).toMatch(/region:\s*process\.env\.AWS_REGION/);
    expect(source).not.toMatch(/endpoint\s*:/i);
    expect(source).not.toMatch(/AKIA[0-9A-Z]{16}/);
    expect(source).not.toMatch(/accessKeyId|secretAccessKey|credentials\s*:/);
  });

  it("documents AWS_REGION as an India region (ap-south-1) for Receipt Storage", async () => {
    const guide = await readFile(
      join(__dirname, "..", "..", "docs", "sdlc", "deployment", "deployment-guide.md"),
      "utf8",
    );

    const receiptRow = guide
      .split("\n")
      .find((line) => line.includes("Receipt Storage") && line.includes("S3"));

    expect(receiptRow, "no Receipt Storage / S3 row found in the deployment guide").toBeTruthy();
    expect(receiptRow).toMatch(/ap-south-1/);
  });
});

describe("[AC-049] MEDIA_ROOT fallback when S3_BUCKET is unset", () => {
  let app: INestApplication;
  let claimId: string;
  let mediaRoot: string;
  let savedBucket: string | undefined;
  let savedMediaRoot: string | undefined;

  beforeAll(async () => {
    savedBucket = process.env.S3_BUCKET;
    savedMediaRoot = process.env.MEDIA_ROOT;
    mediaRoot = await mkdtemp(join(tmpdir(), "quorq-media-root-"));
    delete process.env.S3_BUCKET;
    process.env.MEDIA_ROOT = mediaRoot;

    app = await createApp({ logger: false });
    await app.init();

    const database = await db();
    const [category] = await database
      .insert(categories)
      .values({ id: randomUUID(), name: "Storage Test", isActive: true, createdAt: new Date() })
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
        amount: "50.00",
        currency: "INR",
        expenseDate: "2026-01-01",
        description: "Media root fallback",
        status: "draft",
        overLimitFlag: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    claimId = claim.id;
  });

  afterAll(async () => {
    await app.close();
    await rm(mediaRoot, { recursive: true, force: true });
    if (savedBucket === undefined) delete process.env.S3_BUCKET;
    else process.env.S3_BUCKET = savedBucket;
    if (savedMediaRoot === undefined) delete process.env.MEDIA_ROOT;
    else process.env.MEDIA_ROOT = savedMediaRoot;
  });

  async function tokenFor(email: string): Promise<string> {
    const res = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ email, password: SEED_PASSWORD });
    return res.body.token as string;
  }

  it("writes the file under MEDIA_ROOT and serves it back through the API, not a public path", async () => {
    const token = await tokenFor("employee@example.com");

    const upload = await request(app.getHttpServer())
      .post(`/claims/${claimId}/receipts`)
      .set("Authorization", `Bearer ${token}`)
      .attach("file", Buffer.from("media-root-bytes"), {
        filename: "mediaroot.png",
        contentType: "image/png",
      });
    expect(upload.status).toBe(201);
    const receiptId = upload.body.id as string;

    const urlRes = await request(app.getHttpServer())
      .get(`/claims/${claimId}/receipts/${receiptId}/url`)
      .set("Authorization", `Bearer ${token}`);
    expect(urlRes.status).toBe(200);
    // Local fallback: an authenticated API route, not a bucket URL or a static /public path.
    expect(urlRes.body.url).toBe(`/claims/${claimId}/receipts/${receiptId}/file`);
    expect(urlRes.body.url).not.toMatch(/^https?:\/\//);

    const fileRes = await request(app.getHttpServer())
      .get(urlRes.body.url)
      .set("Authorization", `Bearer ${token}`);
    expect(fileRes.status).toBe(200);
    expect(fileRes.body.toString()).toBe("media-root-bytes");

    // The bytes genuinely landed under MEDIA_ROOT on disk (not merely served from memory).
    const { readdir } = await import("node:fs/promises");
    async function findFile(dir: string): Promise<string | undefined> {
      const entries = await readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
          const found = await findFile(full);
          if (found) return found;
        } else if (entry.name.includes("mediaroot.png")) {
          return full;
        }
      }
      return undefined;
    }
    const onDisk = await findFile(mediaRoot);
    expect(onDisk, "expected the receipt to be written under MEDIA_ROOT").toBeTruthy();
    expect((await readFile(onDisk as string)).toString()).toBe("media-root-bytes");

    // No unauthenticated access: the file route is not a public path.
    const anon = await request(app.getHttpServer()).get(urlRes.body.url);
    expect(anon.status).toBe(401);
  });
});
