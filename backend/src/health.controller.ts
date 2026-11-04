import { Controller, Get } from "@nestjs/common";

/** Liveness probe, and the only handler here that is not a stub. */
@Controller()
export class HealthController {
  @Get("health")
  health(): { status: string } {
    return { status: "ok" };
  }
}
