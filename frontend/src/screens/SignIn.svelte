<script>
  import { Button, Icon, Input, Label } from "@/lib/ui";
  import { brand } from "@/lib/brand";
  import { useNavigate } from "@/lib/navigate";
  import { login } from "@/lib/session.svelte";

  const navigate = useNavigate();

  const HAIRLINE = "1px solid rgba(255,255,255,0.10)";

  const labelStyle = `color: ${brand.neutralColor}; letter-spacing: 0.18em;`;
  const fieldStyle = `border: ${HAIRLINE}; border-radius: ${brand.radius}; height: 46px; background-color: rgba(0,0,0,0.25); color: ${brand.primaryColor}; --tw-ring-color: ${brand.accentColor}; --tw-ring-offset-color: ${brand.backgroundColor};`;
  const fieldErrorStyle = `border: 1px solid ${brand.accentColor}; border-radius: ${brand.radius}; height: 46px; background-color: rgba(0,0,0,0.25); color: ${brand.primaryColor}; --tw-ring-color: ${brand.accentColor}; --tw-ring-offset-color: ${brand.backgroundColor};`;

  let email = $state("");
  let password = $state("");
  let emailError = $state("");
  let passwordError = $state("");
  let authError = $state(false);
  let status = $state("idle"); // idle | checking | signed-in
  let signedInAs = $state(null);
  let noticeIn = $state(false);
  let timer;

  const busy = $derived(status === "checking" || status === "signed-in");

  $effect(() => {
    if (authError || status === "signed-in") {
      const frame = requestAnimationFrame(() => (noticeIn = true));
      return () => cancelAnimationFrame(frame);
    }
    noticeIn = false;
  });

  $effect(() => () => clearTimeout(timer));

  async function handleSubmit(event) {
    event.preventDefault();
    if (busy) return;

    emailError = !email.trim()
      ? "Enter your work email address."
      : !email.includes("@")
        ? "That does not look like an email address."
        : "";
    passwordError = password ? "" : "Enter your password.";

    if (emailError || passwordError) {
      authError = false;
      return;
    }

    authError = false;
    status = "checking";
    try {
      const user = await login(email.trim(), password);
      signedInAs = user;
      status = "signed-in";
      timer = setTimeout(() => navigate("my-claims"), 900);
    } catch {
      status = "idle";
      authError = true;
    }
  }
</script>

<div
  class="flex min-h-screen items-center justify-center px-6 py-12"
  style="color: {brand.primaryColor}; font-family: {brand.fontBody}; background-color: {brand.backgroundColor};"
>
  <main
    class="w-full max-w-md p-10"
    style="background-color: rgba(255,255,255,0.04); border: {HAIRLINE}; border-radius: {brand.radius};"
  >
    <p class="text-xs uppercase" style={labelStyle}>Quorq &middot; Expense Claims</p>

    <h1
      data-wf="b-0-0"
      class="mt-3 text-3xl leading-tight"
      style="font-family: {brand.fontHeading};"
    >
      Sign in to Expense Claims
    </h1>
    <div
      aria-hidden="true"
      class="mt-3 h-px w-12"
      style="background-color: {brand.accentColor};"
    ></div>

    <p data-wf="b-1-0" class="mt-4 text-sm leading-relaxed" style="color: {brand.neutralColor};">
      Use your work email address and password. Contact your admin if your account has been
      deactivated.
    </p>

    <form data-wf="b-2-0" class="mt-8 space-y-5" onsubmit={handleSubmit} novalidate>
      <div class="space-y-2">
        <Label for="vl-email" class="block text-xs uppercase" style={labelStyle}>Email</Label>
        <Input
          id="vl-email"
          data-wf="i-2-0-0"
          type="email"
          autocomplete="email"
          inputmode="email"
          placeholder="arjun.mehta@quorq.ai"
          bind:value={email}
          disabled={busy}
          aria-invalid={emailError ? "true" : "false"}
          aria-describedby={emailError ? "vl-email-error" : undefined}
          class="w-full px-3 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60"
          style={emailError ? fieldErrorStyle : fieldStyle}
        />
        {#if emailError}
          <p
            id="vl-email-error"
            class="flex items-start gap-2 text-xs"
            style="color: {brand.accentColor};"
          >
            <Icon
              name="AlertCircle"
              class="h-3.5 w-3.5 shrink-0 translate-y-px"
              aria-hidden="true"
            />
            <span>{emailError}</span>
          </p>
        {/if}
      </div>

      <div class="space-y-2">
        <Label for="vl-password" class="block text-xs uppercase" style={labelStyle}>Password</Label>
        <Input
          id="vl-password"
          data-wf="i-2-0-1"
          type="password"
          autocomplete="current-password"
          bind:value={password}
          disabled={busy}
          aria-invalid={passwordError ? "true" : "false"}
          aria-describedby={passwordError ? "vl-password-error" : undefined}
          class="w-full px-3 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60"
          style={passwordError ? fieldErrorStyle : fieldStyle}
        />
        {#if passwordError}
          <p
            id="vl-password-error"
            class="flex items-start gap-2 text-xs"
            style="color: {brand.accentColor};"
          >
            <Icon
              name="AlertCircle"
              class="h-3.5 w-3.5 shrink-0 translate-y-px"
              aria-hidden="true"
            />
            <span>{passwordError}</span>
          </p>
        {/if}
      </div>

      {#if authError}
        <div
          data-wf="b-3-0"
          role="alert"
          class="flex items-start gap-3 p-4 transition-all duration-200 motion-reduce:transition-none {noticeIn
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-1'}"
          style="border: 1px solid {brand.accentColor}; border-radius: {brand.radius}; background-color: rgba(0,0,0,0.25);"
        >
          <Icon
            name="AlertCircle"
            class="h-4 w-4 shrink-0 translate-y-px"
            style="color: {brand.accentColor};"
            aria-hidden="true"
          />
          <div class="space-y-1">
            <p class="text-sm" style="color: {brand.primaryColor};">
              Email or password is incorrect.
            </p>
            <p class="text-xs leading-relaxed" style="color: {brand.neutralColor};">
              Nothing you typed was lost &mdash; correct it and sign in again.
            </p>
          </div>
        </div>
      {/if}

      {#if status === "signed-in" && signedInAs}
        <div
          role="status"
          class="flex items-start gap-3 p-4 transition-all duration-200 motion-reduce:transition-none {noticeIn
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-1'}"
          style="border: {HAIRLINE}; border-radius: {brand.radius}; background-color: rgba(0,0,0,0.25);"
        >
          <Icon
            name="CheckCircle"
            class="h-4 w-4 shrink-0 translate-y-px"
            style="color: {brand.accentColor};"
            aria-hidden="true"
          />
          <div class="space-y-1">
            <p class="text-sm" style="color: {brand.primaryColor};">
              Signed in as {signedInAs.full_name} &middot; {signedInAs.role}
            </p>
            <p class="text-xs leading-relaxed" style="color: {brand.neutralColor};">
              Opening the claims and functions your role permits&hellip;
            </p>
          </div>
        </div>
      {/if}

      <Button
        data-wf="b-4-0"
        type="submit"
        disabled={busy}
        class="flex h-12 w-full items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.25em] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        style="background-color: {brand.accentColor}; color: {brand.backgroundColor}; border-radius: {brand.radius}; --tw-ring-color: {brand.accentColor}; --tw-ring-offset-color: {brand.backgroundColor};"
      >
        {#if status === "checking"}
          <Icon
            name="Clock"
            class="h-4 w-4 animate-pulse motion-reduce:animate-none"
            aria-hidden="true"
          />
          <span>Checking credentials</span>
        {:else if status === "signed-in"}
          <Icon name="ArrowRight" class="h-4 w-4" aria-hidden="true" />
          <span>Opening my claims</span>
        {:else}
          <span>Sign in</span>
        {/if}
      </Button>
    </form>

    <p class="mt-8 text-xs uppercase leading-relaxed" style={labelStyle}>
      Claims in INR &middot; Receipts stored in India
    </p>
  </main>
</div>
