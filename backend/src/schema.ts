/**
 * Drizzle tables.
 *
 * The approved data model for the expense claim app: users (with the manager chain for
 * approval routing), expense categories and their optional limits, claims and their
 * lifecycle, receipt metadata (the files themselves live in object storage, never here),
 * and the per-claim audit trail. `db()` creates every table exported from this module the
 * first time it connects; it never alters or drops one, so a later change to a column
 * here needs a real migration, not a re-run.
 */
import {
  boolean,
  date,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email").notNull(),
  passwordHash: varchar("password_hash").notNull(),
  fullName: varchar("full_name").notNull(),
  role: varchar("role").notNull(),
  managerId: uuid("manager_id").references((): AnyPgColumn => users.id),
  isActive: boolean("is_active").notNull().default(true),
  privacyNoticeAckAt: timestamp("privacy_notice_ack_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name").notNull(),
  limitAmount: numeric("limit_amount", { precision: 12, scale: 2 }),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const claims = pgTable("claims", {
  id: uuid("id").defaultRandom().primaryKey(),
  employeeId: uuid("employee_id")
    .notNull()
    .references(() => users.id),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => categories.id),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency").notNull().default("INR"),
  expenseDate: date("expense_date").notNull(),
  description: text("description").notNull(),
  status: varchar("status").notNull(),
  overLimitFlag: boolean("over_limit_flag").notNull().default(false),
  lastRejectionReason: text("last_rejection_reason"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const receipts = pgTable("receipts", {
  id: uuid("id").defaultRandom().primaryKey(),
  claimId: uuid("claim_id")
    .notNull()
    .references(() => claims.id),
  s3Key: varchar("s3_key").notNull(),
  fileName: varchar("file_name").notNull(),
  contentType: varchar("content_type").notNull(),
  sizeBytes: integer("size_bytes").notNull(),
  uploadedAt: timestamp("uploaded_at", { withTimezone: true }).notNull().defaultNow(),
});

export const claimAudit = pgTable("claim_audit", {
  id: uuid("id").defaultRandom().primaryKey(),
  claimId: uuid("claim_id")
    .notNull()
    .references(() => claims.id),
  actorUserId: uuid("actor_user_id")
    .notNull()
    .references(() => users.id),
  action: varchar("action").notNull(),
  fromStatus: varchar("from_status"),
  toStatus: varchar("to_status"),
  comment: text("comment"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
