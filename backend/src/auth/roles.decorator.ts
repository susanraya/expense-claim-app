import { SetMetadata } from "@nestjs/common";

/** The roles a route accepts; `RolesGuard` reads this. No decorator means any authenticated user. */
export const ROLES_KEY = "roles";
export const Roles = (...roles: string[]): ReturnType<typeof SetMetadata> =>
  SetMetadata(ROLES_KEY, roles);
