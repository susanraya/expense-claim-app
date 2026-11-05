/**
 * Receipt storage: one module, two backends.
 *
 * When `S3_BUCKET` is set, receipts go to that bucket in `AWS_REGION` (India, per
 * deployment config) via the AWS SDK's default credentials -- no keys, endpoints or
 * profiles are wired up here. When it is unset (tests, a laptop), receipts go to
 * `MEDIA_ROOT` on disk and are served back through an authenticated API route, never a
 * public static path.
 */
import { randomBytes } from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { Injectable } from "@nestjs/common";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl as presignS3Url } from "@aws-sdk/s3-request-presigner";

@Injectable()
export class StorageService {
  private s3Client?: S3Client;

  /** `true` once `S3_BUCKET` is set; otherwise every call below uses `MEDIA_ROOT`. */
  isS3(): boolean {
    return Boolean(process.env.S3_BUCKET);
  }

  async put(key: string, body: Buffer, contentType: string): Promise<void> {
    if (this.isS3()) {
      await this.client().send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET,
          Key: key,
          Body: body,
          ContentType: contentType,
        }),
      );
      return;
    }
    const filePath = this.localPath(key);
    await mkdir(join(filePath, ".."), { recursive: true });
    await writeFile(filePath, body);
  }

  /** Local-fallback only: reads the bytes back for the authenticated download route. */
  async get(key: string): Promise<Buffer> {
    return readFile(this.localPath(key));
  }

  async remove(key: string): Promise<void> {
    if (this.isS3()) return; // objects are left for the bucket's own lifecycle rules
    await rm(this.localPath(key), { force: true });
  }

  /** S3 only: a presigned, time-limited URL. The local fallback has no such URL to sign. */
  async getSignedUrl(key: string, expiresInSeconds: number): Promise<string> {
    const command = new GetObjectCommand({ Bucket: process.env.S3_BUCKET, Key: key });
    return presignS3Url(this.client(), command, { expiresIn: expiresInSeconds });
  }

  /** A storage key with no path traversal and no guessable structure. */
  newKey(claimId: string, fileName: string): string {
    const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    return `claims/${claimId}/receipts/${randomBytes(16).toString("hex")}-${safeName}`;
  }

  private client(): S3Client {
    // No explicit keys, endpoint or region override beyond AWS_REGION: the SDK's default
    // credential chain already works in this project's own account.
    this.s3Client ??= new S3Client({ region: process.env.AWS_REGION });
    return this.s3Client;
  }

  private localPath(key: string): string {
    const root = process.env.MEDIA_ROOT ?? join(tmpdir(), "quorq-receipts");
    return join(root, key);
  }
}
