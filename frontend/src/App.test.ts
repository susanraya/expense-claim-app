import { render, screen, waitFor } from "@testing-library/svelte";
import { tick } from "svelte";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import App from "./App.svelte";
import { go } from "./lib/router.svelte";
import { setSessionToken, clearSessionToken } from "./lib/api";
import { session } from "./lib/session.svelte";

function employee() {
  return { id: "u1", email: "e@quorq.ai", full_name: "Anita Desai", role: "Employee" as const };
}
function manager() {
  return { id: "u2", email: "m@quorq.ai", full_name: "Priya Nair", role: "Manager" as const };
}

describe("App", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 204 })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    clearSessionToken();
    session.user = null;
  });

  it("renders a screen inside the app shell and shows its menu", async () => {
    setSessionToken("tok");
    session.user = employee();
    go("/my-claims");
    const { container } = render(App);
    await tick();
    expect(container.textContent).toContain("My claims");
  });

  it("[NFR-002] redirects to /sign-in when visiting a protected path without a token", async () => {
    clearSessionToken();
    session.user = null;
    go("/my-claims");
    render(App);
    await waitFor(() => expect(location.pathname).toBe("/sign-in"));
  });

  it("[AC-004] an Employee sees only My claims in the menu", async () => {
    setSessionToken("tok");
    session.user = employee();
    go("/my-claims");
    render(App);
    await tick();
    const nav = screen.getByRole("navigation", { name: "App menu" });
    expect(nav.textContent).toContain("My claims");
    expect(nav.textContent).not.toContain("Approvals");
    expect(nav.textContent).not.toContain("All claims");
    expect(nav.textContent).not.toContain("Administration");
  });

  it("[AC-005] a Manager also sees Approvals", async () => {
    setSessionToken("tok");
    session.user = manager();
    go("/my-claims");
    render(App);
    await tick();
    const nav = screen.getByRole("navigation", { name: "App menu" });
    expect(nav.textContent).toContain("Approvals");
    expect(nav.textContent).not.toContain("All claims");
    expect(nav.textContent).not.toContain("Administration");
  });

  it("[AC-006] direct navigation to a disallowed path shows an access-refused view", async () => {
    setSessionToken("tok");
    session.user = employee();
    go("/administration");
    render(App);
    await tick();
    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toContain("Access refused");
  });

  it("[AC-003] signing out calls logout, clears the token, and returns to /sign-in", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal("fetch", fetchMock);
    setSessionToken("tok");
    session.user = employee();
    go("/my-claims");
    render(App);
    await tick();

    const signOut = screen.getByRole("link", { name: /Sign out/i });
    signOut.click();

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining("/auth/logout"),
        expect.objectContaining({ method: "POST" }),
      ),
    );
    await waitFor(() => expect(location.pathname).toBe("/sign-in"));
    expect(session.user).toBeNull();
  });
});
