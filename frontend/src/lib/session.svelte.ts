/**
 * Who is signed in, kept in client state. `login` and `loadMe` are the only ways this
 * fills in; `logout` and a 401/403 from `apiFetch` (wired up in App.svelte) are the only
 * ways it empties. Screens read `session.user` to know the current role; nothing here
 * decides what a role may do server-side -- that stays enforced by the API.
 */
import { apiFetch, clearSessionToken, setSessionToken } from "./api";

export type Role = "Employee" | "Manager" | "Finance" | "Admin";

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: Role;
}

export const session = $state<{ user: User | null }>({ user: null });

/** POST /auth/login. Stores the token and the signed-in user, or throws on failure. */
export async function login(email: string, password: string): Promise<User> {
  const result = await apiFetch<{ token: string; user: User }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setSessionToken(result.token);
  session.user = result.user;
  return result.user;
}

/** GET /me. Refreshes the current user from the token already stored, if any. */
export async function loadMe(): Promise<User | null> {
  try {
    const user = await apiFetch<User>("/me");
    session.user = user;
    return user;
  } catch {
    session.user = null;
    return null;
  }
}

/** POST /auth/logout, then clear the session regardless of whether the call succeeded. */
export async function logout(): Promise<void> {
  try {
    await apiFetch("/auth/logout", { method: "POST" });
  } catch {
    // The session ends locally either way.
  }
  clearSessionToken();
  session.user = null;
}
