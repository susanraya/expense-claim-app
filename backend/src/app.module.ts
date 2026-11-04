/**
 * The root module of the API for expense claim app.
 *
 * Generated from the approved architecture: one feature module per component that owns
 * endpoints, each with a controller holding one handler per endpoint the API spec
 * declares. Every generated handler is a stub that returns a placeholder, so the service
 * starts and passes its tests before a single handler is implemented.
 */
import { Module } from "@nestjs/common";

import { HealthController } from "./health.controller";

@Module({
  imports: [],
  controllers: [HealthController],
})
export class AppModule {}
