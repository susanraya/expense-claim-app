<script module lang="ts">
  import type { Component } from "svelte";

  import SignIn from "./screens/SignIn.svelte";
  import MyClaims from "./screens/MyClaims.svelte";
  import ClaimDetail from "./screens/ClaimDetail.svelte";
  import Approvals from "./screens/Approvals.svelte";
  import Claims from "./screens/Claims.svelte";
  import Administration from "./screens/Administration.svelte";

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
</script>

<script lang="ts">
  import { go, location, matches } from "./lib/router.svelte";
  import { Icon } from "./lib/ui";

  const current = $derived(routes.find((route) => matches(route.path, location.path)));

  $effect(() => {
    if (!current) go(fallback, true);
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
        <nav aria-label="App menu" class="flex flex-wrap items-center gap-1">
          <a href="/my-claims" class={linkClass("/my-claims")} onclick={(event) => follow(event, "/my-claims")}>
            <Icon name="Home" size={16} />
            My claims
          </a>
          <a href="/approvals" class={linkClass("/approvals")} onclick={(event) => follow(event, "/approvals")}>
            <Icon name="Check" size={16} />
            Approvals
          </a>
          <a href="/claims" class={linkClass("/claims")} onclick={(event) => follow(event, "/claims")}>
            <Icon name="Filter" size={16} />
            All claims
          </a>
          <a href="/administration" class={linkClass("/administration")} onclick={(event) => follow(event, "/administration")}>
            <Icon name="Settings" size={16} />
            Administration
          </a>
          <a href="/sign-in" class={linkClass("/sign-in")} onclick={(event) => follow(event, "/sign-in")}>
            <Icon name="User" size={16} />
            Sign out
          </a>
        </nav>
      </div>
    </header>
    <main class="flex-1 overflow-auto">
      <current.component />
    </main>
  </div>
{/if}
