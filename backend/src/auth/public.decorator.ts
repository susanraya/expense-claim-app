import { SetMetadata } from "@nestjs/common";

/** Marks a route as not requiring a token. Only POST /auth/login uses it. */
export const IS_PUBLIC_KEY = "isPublic";
export const Public = (): ReturnType<typeof SetMetadata> => SetMetadata(IS_PUBLIC_KEY, true);
