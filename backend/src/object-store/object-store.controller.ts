/**
 * Handlers for Receipt Object Storage.
 *
 * Durable in-India storage of receipt image files, kept out of the database and served to authorised roles via time-limited signed URLs.
 *
 * Every handler is a stub returning a placeholder. The shape comes from the approved
 * API spec; the behaviour does not exist yet. Both routes are guarded globally (see
 * `AuthModule`).
 */
import { Controller, Get, Post } from "@nestjs/common";

import { Roles } from "../auth/roles.decorator";
import { notImplemented } from "../stubs";

@Controller()
export class ObjectStoreController {
  /** Upload a receipt image (type and size validated); stored in S3. */
  @Roles("employee")
  @Post("/claims/:id/receipts")
  postClaimsByIdReceipts(): Record<string, string> {
    return notImplemented("POST /claims/{id}/receipts");
  }

  /** Signed, time-limited URL to view a receipt (authorised roles only). */
  @Roles("employee", "manager", "finance", "admin")
  @Get("/claims/:id/receipts/:receiptId/url")
  getClaimsByIdReceiptsByReceiptidUrl(): Record<string, string> {
    return notImplemented("GET /claims/{id}/receipts/{receiptId}/url");
  }
}
