import { Injectable, OnModuleInit, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

import { db } from "../db";
import { users } from "../schema";
import { seedUsers } from "./seed";

export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

export interface JwtPayload {
  sub: string;
  role: string;
  tokenVersion: number;
}

/** A failed sign-in always says the same thing, whichever field was actually wrong. */
const INVALID_CREDENTIALS = "Invalid email or password.";

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(private readonly jwt: JwtService) {}

  async onModuleInit(): Promise<void> {
    const database = await db();
    await seedUsers(database);
  }

  async login(email: string, password: string): Promise<{ token: string; user: AuthUser }> {
    const database = await db();
    const normalizedEmail = email.trim().toLowerCase();
    const [user] = await database
      .select()
      .from(users)
      .where(eq(users.email, normalizedEmail))
      .limit(1);
    if (!user || !user.isActive) {
      throw new UnauthorizedException(INVALID_CREDENTIALS);
    }
    const matches = await bcrypt.compare(password, user.passwordHash);
    if (!matches) {
      throw new UnauthorizedException(INVALID_CREDENTIALS);
    }
    const token = this.jwt.sign({
      sub: user.id,
      role: user.role,
      tokenVersion: user.tokenVersion,
    } satisfies JwtPayload);
    return { token, user: toAuthUser(user) };
  }

  /** Bumps the user's token version: every token signed before this no longer verifies. */
  async logout(userId: string): Promise<void> {
    const database = await db();
    const [user] = await database.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user) return;
    await database
      .update(users)
      .set({ tokenVersion: user.tokenVersion + 1 })
      .where(eq(users.id, userId));
  }

  async me(userId: string): Promise<AuthUser> {
    const database = await db();
    const [user] = await database.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user) {
      throw new UnauthorizedException("Invalid or expired session.");
    }
    return toAuthUser(user);
  }
}

function toAuthUser(user: typeof users.$inferSelect): AuthUser {
  return { id: user.id, email: user.email, full_name: user.fullName, role: user.role };
}
