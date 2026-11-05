/**
 * Handlers for API.
 *
 * Endpoints the approved API spec declares without naming a component that owns them.
 *
 * Every handler is a stub returning a placeholder, except the auth routes (login, logout,
 * me) which this packet implements. The shape of the rest comes from the approved API
 * spec; the behaviour does not exist yet. Every route here is guarded globally (see
 * `AuthModule`) except `POST /auth/login`; routes marked `@Roles(...)` additionally need
 * one of those roles.
 */
import { Body, Controller, Get, HttpCode, Patch, Post, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import type { Request } from "express";

import { AuthService, type AuthUser } from "../auth/auth.service";
import type { AuthenticatedUser } from "../auth/jwt.strategy";
import { LoginDto } from "../auth/dto/login.dto";
import { Public } from "../auth/public.decorator";
import { Roles } from "../auth/roles.decorator";
import { notImplemented } from "../stubs";

type AuthedRequest = Request & { user: AuthenticatedUser };

@Controller()
export class ApiController {
  constructor(private readonly auth: AuthService) {}

  /** Authenticate with email/password; returns JWT. Failure returns a generic error. */
  @Public()
  @Post("/auth/login")
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  postAuthLogin(@Body() body: LoginDto): Promise<{ token: string; user: AuthUser }> {
    return this.auth.login(body.email, body.password);
  }

  /** End the current session: the presented token is rejected from here on. */
  @Post("/auth/logout")
  @HttpCode(204)
  async postAuthLogout(@Req() req: AuthedRequest): Promise<void> {
    await this.auth.logout(req.user.id);
  }

  /** Current user profile and role. */
  @Get("/me")
  getMe(@Req() req: AuthedRequest): Promise<AuthUser> {
    return this.auth.me(req.user.id);
  }

  /** Record acknowledgement of the DPDP privacy notice shown at onboarding. */
  @Post("/me/privacy-notice/ack")
  postMePrivacyNoticeAck(): Record<string, string> {
    return notImplemented("POST /me/privacy-notice/ack");
  }

  /** Return the privacy notice content, viewable again anytime. */
  @Get("/privacy-notice")
  getPrivacyNotice(): Record<string, string> {
    return notImplemented("GET /privacy-notice");
  }

  /** List users (Admin only). */
  @Roles("admin")
  @Get("/users")
  getUsers(): Record<string, string> {
    return notImplemented("GET /users");
  }

  /** Create a user with email and role (Admin only). */
  @Roles("admin")
  @Post("/users")
  postUsers(): Record<string, string> {
    return notImplemented("POST /users");
  }

  /** Edit role, manager assignment or deactivate a user (Admin only). */
  @Roles("admin")
  @Patch("/users/:id")
  patchUsersById(): Record<string, string> {
    return notImplemented("PATCH /users/{id}");
  }

  /** List categories with optional limits; active ones selectable on claims. */
  @Get("/categories")
  getCategories(): Record<string, string> {
    return notImplemented("GET /categories");
  }

  /** Create an expense category (Admin only). */
  @Roles("admin")
  @Post("/categories")
  postCategories(): Record<string, string> {
    return notImplemented("POST /categories");
  }

  /** Edit name, limit or deactivate a category without affecting existing claims (Admin only). */
  @Roles("admin")
  @Patch("/categories/:id")
  patchCategoriesById(): Record<string, string> {
    return notImplemented("PATCH /categories/{id}");
  }

  /** Create a draft claim with amount (INR), date, category and description. */
  @Roles("employee")
  @Post("/claims")
  postClaims(): Record<string, string> {
    return notImplemented("POST /claims");
  }

  /** Edit a draft or returned claim before resubmission. */
  @Roles("employee")
  @Patch("/claims/:id")
  patchClaimsById(): Record<string, string> {
    return notImplemented("PATCH /claims/{id}");
  }

  /** Submit a claim; applies category limit check and sets pending manager approval. Blocked if no manager assigned. */
  @Roles("employee")
  @Post("/claims/:id/submit")
  postClaimsByIdSubmit(): Record<string, string> {
    return notImplemented("POST /claims/{id}/submit");
  }

  /** Employee's own claims with status. */
  @Roles("employee")
  @Get("/claims/mine")
  getClaimsMine(): Record<string, string> {
    return notImplemented("GET /claims/mine");
  }

  /** Full claim detail including receipts and audit history (owner or authorised approver/finance). */
  @Roles("employee", "manager", "finance", "admin")
  @Get("/claims/:id")
  getClaimsById(): Record<string, string> {
    return notImplemented("GET /claims/{id}");
  }

  /** Manager's team claims pending manager approval. */
  @Roles("manager")
  @Get("/approvals/manager-queue")
  getApprovalsManagerQueue(): Record<string, string> {
    return notImplemented("GET /approvals/manager-queue");
  }

  /** Manager-approved claims pending final finance approval. */
  @Roles("finance", "admin")
  @Get("/approvals/finance-queue")
  getApprovalsFinanceQueue(): Record<string, string> {
    return notImplemented("GET /approvals/finance-queue");
  }

  /** Approve at the current stage (manager advances to finance; finance makes finance-approved). */
  @Roles("manager", "finance", "admin")
  @Post("/claims/:id/approve")
  postClaimsByIdApprove(): Record<string, string> {
    return notImplemented("POST /claims/{id}/approve");
  }

  /** Reject with a required reason; returns claim to employee. */
  @Roles("manager", "finance", "admin")
  @Post("/claims/:id/reject")
  postClaimsByIdReject(): Record<string, string> {
    return notImplemented("POST /claims/{id}/reject");
  }

  /** Mark a finance-approved claim reimbursed (recording only, no payment). */
  @Roles("finance", "admin")
  @Post("/claims/:id/reimburse")
  postClaimsByIdReimburse(): Record<string, string> {
    return notImplemented("POST /claims/{id}/reimburse");
  }

  /** Finance view of all claims, filterable by status, employee, category or date. */
  @Roles("finance", "admin")
  @Get("/claims")
  getClaims(): Record<string, string> {
    return notImplemented("GET /claims");
  }

  /** Export the filtered claims list as a CSV file. */
  @Roles("finance", "admin")
  @Get("/claims/export")
  getClaimsExport(): Record<string, string> {
    return notImplemented("GET /claims/export");
  }
}
