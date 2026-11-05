/**
 * Handlers for Receipt Object Storage.
 *
 * Durable in-India storage of receipt image files, kept out of the database and served to
 * authorised roles via time-limited signed URLs (or, on the local fallback, through the
 * `/file` route below, which applies the same role check instead of a public static path).
 * Both routes are guarded globally (see `AuthModule`).
 */
import { Controller, Get, Param, Post, Req, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import type { Response } from "express";
import type { Request } from "express";

import type { AuthenticatedUser } from "../auth/jwt.strategy";
import { Roles } from "../auth/roles.decorator";
import { ObjectStoreService } from "./object-store.service";

type AuthedRequest = Request & { user: AuthenticatedUser };

@Controller()
export class ObjectStoreController {
  constructor(private readonly objectStore: ObjectStoreService) {}

  /** Upload a receipt image (type and size validated); stored in S3 or, locally, on disk. */
  @Roles("employee")
  @Post("/claims/:id/receipts")
  @UseInterceptors(FileInterceptor("file"))
  postClaimsByIdReceipts(
    @Param("id") id: string,
    @UploadedFile() file: Express.Multer.File | undefined,
    @Req() req: AuthedRequest,
  ) {
    return this.objectStore.uploadReceipt(id, req.user, file);
  }

  /** Signed, time-limited URL to view a receipt (authorised roles only). */
  @Roles("employee", "manager", "finance", "admin")
  @Get("/claims/:id/receipts/:receiptId/url")
  getClaimsByIdReceiptsByReceiptidUrl(
    @Param("id") id: string,
    @Param("receiptId") receiptId: string,
    @Req() req: AuthedRequest,
  ) {
    return this.objectStore.getSignedUrl(id, receiptId, req.user);
  }

  /** Local-fallback bytes, behind the same role check as everything else -- never public. */
  @Roles("employee", "manager", "finance", "admin")
  @Get("/claims/:id/receipts/:receiptId/file")
  async getClaimsByIdReceiptsByReceiptidFile(
    @Param("id") id: string,
    @Param("receiptId") receiptId: string,
    @Req() req: AuthedRequest,
    @Res() res: Response,
  ): Promise<void> {
    const file = await this.objectStore.downloadReceipt(id, receiptId, req.user);
    res.set({
      "Content-Type": file.contentType,
      "Content-Disposition": `inline; filename="${file.filename}"`,
    });
    res.send(file.buffer);
  }
}
