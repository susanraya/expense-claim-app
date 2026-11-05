import { render, screen, fireEvent, waitFor } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import SignIn from "./SignIn.svelte";
import { go } from "../lib/router.svelte";
import { getSessionToken, clearSessionToken } from "../lib/api";
import { session } from "../lib/session.svelte";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("SignIn", () => {
  beforeEach(() => {
    clearSessionToken();
    session.user = null;
    go("/sign-in", true);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    clearSessionToken();
    session.user = null;
  });

  it("[AC-001] submits email+password, stores the token, and navigates to /my-claims on success", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({
        token: "tok-123",
        user: { id: "u1", email: "a@quorq.ai", full_name: "Arjun Mehta", role: "Employee" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    render(SignIn);

    await fireEvent.input(screen.getByLabelText("Email"), { target: { value: "a@quorq.ai" } });
    await fireEvent.input(screen.getByLabelText("Password"), { target: { value: "secret" } });
    await fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toContain("/auth/login");
    expect(JSON.parse(init.body as string)).toEqual({ email: "a@quorq.ai", password: "secret" });

    await waitFor(() => expect(getSessionToken()).toBe("tok-123"));
    await waitFor(() => expect(location.pathname).toBe("/my-claims"), { timeout: 2000 });
  });

  it("[AC-002] shows one generic error with no field indication on a failed login", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ message: "nope" }, 401));
    vi.stubGlobal("fetch", fetchMock);

    render(SignIn);

    await fireEvent.input(screen.getByLabelText("Email"), { target: { value: "a@quorq.ai" } });
    await fireEvent.input(screen.getByLabelText("Password"), { target: { value: "wrong" } });
    await fireEvent.click(screen.getByRole("button", { name: "Sign in" }));

    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toContain("Email or password is incorrect");
    expect(alert.textContent?.toLowerCase()).not.toContain("deactivat");
    expect(alert.textContent?.toLowerCase()).not.toContain("email is");
    expect(alert.textContent?.toLowerCase()).not.toContain("password is wrong");
    expect(getSessionToken()).toBeNull();
  });

  it("does not show hard-coded demo credentials", () => {
    render(SignIn);
    expect(document.body.textContent).not.toContain("claims2026");
    expect(document.body.textContent).not.toContain("Demo accounts");
  });
});
