/// <reference types="multer" />
import { randomUUID } from "node:crypto";

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { eq } from "drizzle-orm";

import type { AuthenticatedUser } from "../auth/jwt.strategy";
import { db } from "../db";
import { claims, receipts, users } from "../schema";
import { StorageService } from "./storage.service";

/** Content types a receipt image or scan may be. */
const ALLOWED_CONTENT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "application/pdf",
]);

const MAX_SIZE_BYTES = 10 * 1024 * 1024; // NFR-009: single small company, no need for more.

/** NFR-005: a receipt link is only ever valid for a short window. */
const URL_EXPIRY_SECONDS = 15 * 60;

export interface UploadedReceipt {
  id: string;
  filename: string;
  content_type: string;
  size: number;
}

export interface SignedReceiptUrl {
  url: string;
  expires_at: string;
}

export interface ReceiptFile {
  buffer: Buffer;
  contentType: string;
  filename: string;
}

@Injectable()
export class ObjectStoreService {
  constructor(private readonly storage: StorageService) {}

  async uploadReceipt(
    claimId: string,
    user: AuthenticatedUser,
    file: Express.Multer.File | undefined,
  ): Promise<UploadedReceipt> {
    const claim = await this.authorize(claimId, user);
    if (!file) {
      throw new BadRequestException("A receipt file is required.");
    }
    if (!ALLOWED_CONTENT_TYPES.has(file.mimetype)) {
      throw new BadRequestException("Unsupported file type.");
    }
    if (file.size > MAX_SIZE_BYTES) {
      throw new BadRequestException("File exceeds the maximum allowed size.");
    }

    const id = randomUUID();
    const key = this.storage.newKey(claim.id, file.originalname);
    await this.storage.put(key, file.buffer, file.mimetype);

    const database = await db();
    await database.insert(receipts).values({
      id,
      claimId: claim.id,
      s3Key: key,
      fileName: file.originalname,
      contentType: file.mimetype,
      sizeBytes: file.size,
      uploadedAt: new Date(),
    });

    return { id, filename: file.originalname, content_type: file.mimetype, size: file.size };
  }

  async getSignedUrl(
    claimId: string,
    receiptId: string,
    user: AuthenticatedUser,
  ): Promise<SignedReceiptUrl> {
    const claim = await this.authorize(claimId, user);
    const receipt = await this.findReceipt(claim.id, receiptId);
    const expiresAt = new Date(Date.now() + URL_EXPIRY_SECONDS * 1000);

    const url = this.storage.isS3()
      ? await this.storage.getSignedUrl(receipt.s3Key, URL_EXPIRY_SECONDS)
      : `/claims/${claim.id}/receipts/${receipt.id}/file`;

    return { url, expires_at: expiresAt.toISOString() };
  }

  /** Local-fallback only: bytes served through this route, never a public static path. */
  async downloadReceipt(
    claimId: string,
    receiptId: string,
    user: AuthenticatedUser,
  ): Promise<ReceiptFile> {
    const claim = await this.authorize(claimId, user);
    const receipt = await this.findReceipt(claim.id, receiptId);
    const buffer = await this.storage.get(receipt.s3Key);
    return { buffer, contentType: receipt.contentType, filename: receipt.fileName };
  }

  /** Claim owner, that employee's manager, or Finance/Admin; everyone else is refused. */
  private async authorize(
    claimId: string,
    user: AuthenticatedUser,
  ): Promise<typeof claims.$inferSelect> {
    const database = await db();
    const [claim] = await database.select().from(claims).where(eq(claims.id, claimId)).limit(1);
    if (!claim) {
      throw new NotFoundException("Claim not found.");
    }

    if (user.role === "finance" || user.role === "admin") return claim;
    if (user.role === "employee" && claim.employeeId === user.id) return claim;
    if (user.role === "manager") {
      const [owner] = await database
        .select()
        .from(users)
        .where(eq(users.id, claim.employeeId))
        .limit(1);
      if (owner?.managerId === user.id) return claim;
    }
    throw new ForbiddenException("You do not have permission to access this receipt.");
  }

  private async findReceipt(
    claimId: string,
    receiptId: string,
  ): Promise<typeof receipts.$inferSelect> {
    const database = await db();
    const [receipt] = await database
      .select()
      .from(receipts)
      .where(eq(receipts.id, receiptId))
      .limit(1);
    if (!receipt || receipt.claimId !== claimId) {
      throw new NotFoundException("Receipt not found.");
    }
    return receipt;
  }
}
