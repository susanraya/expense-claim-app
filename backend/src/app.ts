import type { INestApplication, NestApplicationOptions } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

/** The configured app, not yet listening: `main.ts` serves it, the tests call it. */
export async function createApp(options?: NestApplicationOptions): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule, options);

  // The SPA runs on a different origin than the API, so the browser refuses its calls
  // unless that origin is allowed here. In development that is the Vite dev server;
  // when deployed, the platform injects the frontend's real URL as ALLOWED_ORIGINS.
  const devOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];
  const allowed = (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  app.enableCors({ origin: allowed.length ? allowed : devOrigins, credentials: true });
  return app;
}
