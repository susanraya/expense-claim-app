<script module lang="ts">
  import type { Component } from "svelte";

  import SignIn from "./screens/SignIn.svelte";
  import MyClaims from "./screens/MyClaims.svelte";
  import ClaimDetail from "./screens/ClaimDetail.svelte";
  import Approvals from "./screens/Approvals.svelte";
  import Claims from "./screens/Claims.svelte";
  import Administration from "./screens/Administration.svelte";
  import type { Role } from "./lib/session.svelte";

  // Screens marked bare (shown before sign-in, or hidden from the menu) render on their own.
  export const routes: Array<{ path: string; component: Component; bare?: boolean }> = [
    { path: "/sign-in", component: SignIn, bare: true },
    { path: "/my-claims", component: MyClaims },
    { path: "/claim-detail", component: ClaimDetail },
    { path: "/approvals", component: Approvals },
    { path: "/claims", component: Claims },
    { path: "/administration", component: Administration },
  ];
  // Where an unknown path lands.
  export const fallback = "/sign-in";

  // What each role may reach, cumulative: a Manager gets everything an Employee gets plus
  // Approvals; Finance and Admin get everything a Manager gets plus All claims and
  // Administration. This is UX gating only -- the API enforces the same rules server-side.
  export const ROLE_PATHS: Record<Role, string[]> = {
    Employee: ["/my-claims", "/claim-detail"],
    Manager: ["/my-claims", "/claim-detail", "/approvals"],
    Finance: ["/my-claims", "/claim-detail", "/approvals", "/claims", "/administration"],
    Admin: ["/my-claims", "/claim-detail", "/approvals", "/claims", "/administration"],
  };
</script>

<script lang="ts">
  import { go, location, matches } from "./lib/router.svelte";
  import { Icon } from "./lib/ui";
  import { session, loadMe, logout } from "./lib/session.svelte";
  import { getSessionToken, onUnauthorized } from "./lib/api";

  // A 401/403 from any call means the session is no longer good: drop it and send the
  // user back to sign in, from wherever they were.
  onUnauthorized(() => {
    session.user = null;
    go("/sign-in", true);
  });

  const current = $derived(routes.find((route) => matches(route.path, location.path)));
  const allowedPaths = $derived(session.user ? (ROLE_PATHS[session.user.role] ?? []) : []);
  const allowed = $derived(!!current && allowedPaths.includes(current.path));

  let requestedMe = false;

  $effect(() => {
    if (!current) {
      go(fallback, true);
      return;
    }
    if (current.bare) return;
    if (!getSessionToken()) {
      go("/sign-in", true);
      return;
    }
    if (!session.user && !requestedMe) {
      requestedMe = true;
      loadMe();
    }
  });

  function linkClass(path: string): string {
    const active = path === "/" ? location.path === "/" : location.path.startsWith(path);
    return [
      "flex items-center gap-2 rounded-[var(--brand-radius)] px-3 py-2 text-sm font-medium transition-colors",
      active ? "bg-[var(--brand-hover)] text-[var(--brand-fg)]" : "text-[var(--brand-fg-muted)]",
    ].join(" ");
  }

  function follow(event: MouseEvent, path: string): void {
    event.preventDefault();
    go(path);
  }

  async function signOut(event: MouseEvent): Promise<void> {
    event.preventDefault();
    await logout();
    go("/sign-in", true);
  }
</script>

{#if current?.bare}
  <current.component />
{:else if current}
  <div class="flex min-h-screen flex-col">
    <header
      class="border-b"
      style="background-color: var(--brand-surface); border-color: var(--brand-border)"
    >
      <div class="flex items-center gap-6 px-6 py-2">
        <p class="shrink-0 text-sm font-semibold" style="font-family: var(--brand-font-heading)">
          Expense Claims
        </p>
        {#if session.user}
          <nav aria-label="App menu" class="flex flex-wrap items-center gap-1">
            <a
              href="/my-claims"
              class={linkClass("/my-claims")}
              onclick={(event) => follow(event, "/my-claims")}
            >
              <Icon name="Home" size={16} />
              My claims
            </a>
            {#if allowedPaths.includes("/approvals")}
              <a
                href="/approvals"
                class={linkClass("/approvals")}
                onclick={(event) => follow(event, "/approvals")}
              >
                <Icon name="Check" size={16} />
                Approvals
              </a>
            {/if}
            {#if allowedPaths.includes("/claims")}
              <a
                href="/claims"
                class={linkClass("/claims")}
                onclick={(event) => follow(event, "/claims")}
              >
                <Icon name="Filter" size={16} />
                All claims
              </a>
            {/if}
            {#if allowedPaths.includes("/administration")}
              <a
                href="/administration"
                class={linkClass("/administration")}
                onclick={(event) => follow(event, "/administration")}
              >
                <Icon name="Settings" size={16} />
                Administration
              </a>
            {/if}
            <a href="/sign-in" class={linkClass("/sign-in")} onclick={signOut}>
              <Icon name="User" size={16} />
              Sign out
            </a>
          </nav>
        {/if}
      </div>
    </header>
    <main class="flex-1 overflow-auto">
      {#if session.user && allowed}
        <current.component />
      {:else if session.user}
        <div role="alert" class="mx-auto max-w-xl px-6 py-16 text-center">
          <h1
            class="text-2xl font-semibold"
            style="color: var(--brand-fg); font-family: var(--brand-font-heading)"
          >
            Access refused
          </h1>
          <p class="mt-3 text-sm" style="color: var(--brand-fg-muted)">
            Your role, {session.user.role}, does not have access to this page.
          </p>
        </div>
      {/if}
    </main>
  </div>
{/if}
