import { Controller, Get } from "@nestjs/common";

import { Public } from "./auth/public.decorator";

/** Liveness probe, and the only handler here that is not a stub. */
@Controller()
export class HealthController {
  @Public()
  @Get("health")
  health(): { status: string } {
    return { status: "ok" };
  }
}
