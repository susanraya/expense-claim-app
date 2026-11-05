import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { eq } from "drizzle-orm";
import { ExtractJwt, Strategy } from "passport-jwt";

import { db } from "../db";
import { users } from "../schema";
import type { JwtPayload } from "./auth.service";

export interface AuthenticatedUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY ?? "dev-secret",
    });
  }

  /** Re-checked on every request: a deactivated user or one who signed out never passes. */
  async validate(payload: JwtPayload): Promise<AuthenticatedUser> {
    const database = await db();
    const [user] = await database.select().from(users).where(eq(users.id, payload.sub)).limit(1);
    if (!user || !user.isActive || user.tokenVersion !== payload.tokenVersion) {
      throw new UnauthorizedException("Invalid or expired session.");
    }
    return { id: user.id, email: user.email, fullName: user.fullName, role: user.role };
  }
}
