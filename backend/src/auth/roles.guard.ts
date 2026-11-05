import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { IS_PUBLIC_KEY } from "./public.decorator";
import { ROLES_KEY } from "./roles.decorator";
import type { AuthenticatedUser } from "./jwt.strategy";

/** Applied globally alongside `JwtAuthGuard`: a route with `@Roles(...)` rejects anyone else. */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles || roles.length === 0) return true;

    const user = context.switchToHttp().getRequest<{ user?: AuthenticatedUser }>().user;
    if (!user || !roles.includes(user.role)) {
      throw new ForbiddenException("You do not have permission to access this resource.");
    }
    return true;
  }
}
