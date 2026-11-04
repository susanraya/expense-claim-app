<script>
  /* eslint-disable @typescript-eslint/no-unused-vars -- generated imports, matched generously */
  import { Button, Empty, Icon, Switch, TBody, TD, TH, THead, TR, Table } from "@/lib/ui";
  import { brand } from "@/lib/brand";
  import { useNavigate } from "@/lib/navigate";

  const navigate = useNavigate();

  const hairline = 'rgba(255,255,255,0.10)';
  const hairlineSoft = 'rgba(255,255,255,0.06)';
  const surface = `color-mix(in srgb, white 4%, ${brand.backgroundColor})`;
  const surfaceHi = `color-mix(in srgb, white 7%, ${brand.backgroundColor})`;
  const accentSoft = `color-mix(in srgb, ${brand.accentColor} 14%, transparent)`;
  const accentLine = `color-mix(in srgb, ${brand.accentColor} 45%, transparent)`;
  const ringStyle = `--tw-ring-color:${brand.accentColor}; --tw-ring-offset-color:${brand.backgroundColor}; outline-color:${brand.accentColor}`;
  const focusRing = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-[6px]';

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function fmtDate(iso) {
    const [y, m, d] = iso.split('-');
    return `${d} ${months[Number(m) - 1]} ${y}`;
  }
  function inr(n) {
    return '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // Signed-in employee context (GET /me)
  const me = {
    full_name: 'Susan Raya',
    email: 'susan.raya@quorq.ai',
    role: 'Employee',
    manager: 'Rohit Deshpande',
    privacy_notice_ack_at: null
  };

  // GET /claims/mine
  const claims = [
    { id: 'c-188', ref: 'EXP-2026-0188', expense_date: '2026-11-04', category: 'Travel — Airfare', amount: 18450, description: 'Mumbai → Bengaluru, Vistara UK-864', receipts: 2, status: 'pending_manager', over_limit_flag: false, note: 'With Rohit Deshpande since 4 Nov' },
    { id: 'c-186', ref: 'EXP-2026-0186', expense_date: '2026-11-03', category: 'Client entertainment', amount: 6120, description: 'Dinner — Kotak Securities, Trident BKC', receipts: 1, status: 'pending_manager', over_limit_flag: true, note: 'Category limit ₹5,000.00' },
    { id: 'c-184', ref: 'EXP-2026-0184', expense_date: '2026-11-01', category: 'Local conveyance', amount: 742, description: 'Cabs — Powai office to Lower Parel', receipts: 1, status: 'pending_manager', over_limit_flag: false, note: 'With Rohit Deshpande since 1 Nov' },
    { id: 'c-179', ref: 'EXP-2026-0179', expense_date: '2026-10-29', category: 'Accommodation', amount: 11800, description: 'Lemon Tree Whitefield, 2 nights', receipts: 3, status: 'pending_finance', over_limit_flag: false, note: 'Manager approved 30 Oct' },
    { id: 'c-175', ref: 'EXP-2026-0175', expense_date: '2026-10-27', category: 'Office supplies', amount: 2340.5, description: 'Standing desk riser and cable tray', receipts: 1, status: 'pending_finance', over_limit_flag: false, note: 'Manager approved 28 Oct' },
    { id: 'c-171', ref: 'EXP-2026-0171', expense_date: '2026-10-24', category: 'Travel — Rail', amount: 9275, description: 'Rajdhani 12951, Mumbai → Delhi, 2A', receipts: 2, status: 'approved', over_limit_flag: false, note: 'Finance approved 26 Oct' },
    { id: 'c-168', ref: 'EXP-2026-0168', expense_date: '2026-10-22', category: 'Meals', amount: 1480, description: 'Team lunch — quarterly planning', receipts: 1, status: 'approved', over_limit_flag: false, note: 'Finance approved 24 Oct' },
    { id: 'c-166', ref: 'EXP-2026-0166', expense_date: '2026-10-20', category: 'Internet & phone', amount: 999, description: 'Jio Fiber, October broadband', receipts: 1, status: 'approved', over_limit_flag: false, note: 'Finance approved 23 Oct' },
    { id: 'c-162', ref: 'EXP-2026-0162', expense_date: '2026-10-17', category: 'Local conveyance', amount: 1260, description: 'Auto and metro, client visits', receipts: 2, status: 'approved', over_limit_flag: false, note: 'Finance approved 21 Oct' },
    { id: 'c-158', ref: 'EXP-2026-0158', expense_date: '2026-10-14', category: 'Training', amount: 24000, description: 'IndiaFOSS workshop pass', receipts: 1, status: 'approved', over_limit_flag: true, note: 'Over limit — approved with note' },
    { id: 'c-153', ref: 'EXP-2026-0153', expense_date: '2026-10-10', category: 'Meals', amount: 3615, description: 'Offsite dinner, Andheri East', receipts: 2, status: 'approved', over_limit_flag: false, note: 'Finance approved 13 Oct' },
    { id: 'c-149', ref: 'EXP-2026-0149', expense_date: '2026-10-07', category: 'Client entertainment', amount: 7900, description: 'Dinner — Nexus Infra, Bandra', receipts: 1, status: 'rejected', over_limit_flag: true, note: 'Returned 10 Oct — reason on claim' },
    { id: 'c-144', ref: 'EXP-2026-0144', expense_date: '2026-10-03', category: 'Accommodation', amount: 13250, description: 'Hyatt Centric Juhu, 1 night', receipts: 2, status: 'reimbursed', over_limit_flag: false, note: 'Paid 18 Oct — salary account' },
    { id: 'c-139', ref: 'EXP-2026-0139', expense_date: '2026-09-30', category: 'Travel — Airfare', amount: 5480, description: 'IndiGo 6E-5231, Pune return', receipts: 1, status: 'reimbursed', over_limit_flag: false, note: 'Paid 12 Oct — salary account' }
  ];

  const statusMeta = {
    pending_manager: { label: 'Pending manager', icon: 'Clock', stage: 1 },
    pending_finance: { label: 'Pending finance', icon: 'Clock', stage: 2 },
    approved: { label: 'Approved', icon: 'Check', stage: 3 },
    rejected: { label: 'Rejected', icon: 'X', stage: 1 },
    reimbursed: { label: 'Reimbursed', icon: 'CheckCircle', stage: 3 }
  };

  const tabDefs = [
    { key: 'all', label: 'All', wf: 'i-1-0-0' },
    { key: 'pending_manager', label: 'Pending manager', wf: 'i-1-0-1' },
    { key: 'pending_finance', label: 'Pending finance', wf: 'i-1-0-2' },
    { key: 'approved', label: 'Approved', wf: 'i-1-0-3' },
    { key: 'rejected', label: 'Rejected', wf: 'i-1-0-4' },
    { key: 'reimbursed', label: 'Reimbursed', wf: 'i-1-0-5' }
  ];

  let activeTab = $state('all');
  let tabEls = $state([]);
  let panelIn = $state(true);
  let showPrivacy = $state(me.privacy_notice_ack_at === null);
  let privacyIn = $state(false);
  let ackAt = $state(me.privacy_notice_ack_at);
  let ackBtn = $state(null);

  const counts = $derived(
    tabDefs.reduce((acc, t) => {
      acc[t.key] = t.key === 'all' ? claims.length : claims.filter((c) => c.status === t.key).length;
      return acc;
    }, {})
  );
  const filtered = $derived(activeTab === 'all' ? claims : claims.filter((c) => c.status === activeTab));
  const filteredTotal = $derived(filtered.reduce((sum, c) => sum + c.amount, 0));
  const activeLabel = $derived(tabDefs.find((t) => t.key === activeTab)?.label ?? 'All');

  $effect(() => {
    activeTab;
    panelIn = false;
    const t = setTimeout(() => (panelIn = true), 20);
    return () => clearTimeout(t);
  });

  $effect(() => {
    if (showPrivacy) {
      const t = setTimeout(() => {
        privacyIn = true;
        ackBtn?.focus();
      }, 20);
      return () => clearTimeout(t);
    }
    privacyIn = false;
  });

  function selectTab(key) {
    activeTab = key;
  }

  function onTabKeydown(event, index) {
    let next = null;
    if (event.key === 'ArrowRight') next = (index + 1) % tabDefs.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + tabDefs.length) % tabDefs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabDefs.length - 1;
    if (next === null) return;
    event.preventDefault();
    activeTab = tabDefs[next].key;
    tabEls[next]?.focus();
  }

  function openPrivacy() {
    showPrivacy = true;
  }
  function closePrivacy() {
    showPrivacy = false;
  }
  function acknowledge() {
    ackAt = '2026-11-05T09:44:00+05:30';
    showPrivacy = false;
  }
  function onWindowKeydown(event) {
    if (event.key === 'Escape' && showPrivacy) closePrivacy();
  }
</script>

<svelte:window onkeydown={onWindowKeydown} />

<div
  class="min-h-full px-5 py-8 sm:px-8 lg:px-12 lg:py-12"
  style="background-color:{brand.backgroundColor}; color:{brand.primaryColor}; font-family:{brand.fontBody}"
>
  <div class="mx-auto max-w-6xl">

    <!-- Row 1 -->
    <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div data-wf="b-0-0" class="sm:w-8/12">
        <p class="text-[11px] uppercase tracking-[0.24em]" style="color:{brand.neutralColor}">
          Expense reimbursement · INR
        </p>
        <h1
          class="mt-3 text-[34px] leading-tight sm:text-[40px]"
          style="font-family:{brand.fontHeading}; color:{brand.primaryColor}"
        >
          My claims
        </h1>
        <p class="mt-3 max-w-[60ch] text-sm leading-relaxed" style="color:{brand.neutralColor}">
          Everything you have submitted, and where each claim has reached. Approver for your claims is
          {me.manager}.
        </p>
        <div class="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span
            class="inline-flex items-center gap-1.5 border px-2.5 py-1 text-[11px] uppercase tracking-[0.16em]"
            style="border-color:{hairline}; border-radius:{brand.radius}; color:{brand.neutralColor}"
          >
            <Icon name="User" class="h-3.5 w-3.5" aria-hidden="true" />
            Employee access
          </span>
          <span class="text-xs" style="color:{brand.neutralColor}">
            Approvals and administration are not part of your role.
          </span>
        </div>
      </div>

      <div data-wf="b-0-1" class="sm:w-4/12 sm:flex sm:justify-end">
        <Button
          onclick={() => navigate('claim-detail')}
          class="{focusRing} inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90 sm:w-auto motion-reduce:transition-none"
          style="{ringStyle}; background-color:{brand.accentColor}; color:{brand.backgroundColor}; border-radius:{brand.radius}"
        >
          <Icon name="Plus" class="h-4 w-4" aria-hidden="true" />
          New claim
        </Button>
      </div>
    </div>

    <div class="mt-8 h-px w-full" style="background-color:{accentLine}"></div>

    <!-- Row 2 -->
    <div data-wf="b-1-0" class="mt-6">
      <h2 class="sr-only">Filter claims by status</h2>
      <div
        role="tablist"
        aria-label="Filter claims by status"
        class="-mx-1 flex flex-wrap items-center gap-1 overflow-x-auto px-1 pb-1"
      >
        {#each tabDefs as tab, i}
          <button
            data-wf={tab.wf}
            bind:this={tabEls[i]}
            role="tab"
            id="tab-{tab.key}"
            type="button"
            aria-selected={activeTab === tab.key}
            aria-controls="claims-panel"
            tabindex={activeTab === tab.key ? 0 : -1}
            onclick={() => selectTab(tab.key)}
            onkeydown={(e) => onTabKeydown(e, i)}
            class="{focusRing} inline-flex min-h-[44px] items-center gap-2 border px-4 text-sm transition-colors motion-reduce:transition-none"
            style="{ringStyle}; border-radius:{brand.radius}; border-color:{activeTab === tab.key
              ? accentLine
              : hairlineSoft}; background-color:{activeTab === tab.key ? accentSoft : 'transparent'}; color:{activeTab ===
            tab.key
              ? brand.primaryColor
              : brand.neutralColor}"
          >
            <span>{tab.label}</span>
            <span
              class="text-xs"
              style="font-variant-numeric: tabular-nums; color:{activeTab === tab.key ? brand.accentColor : brand.neutralColor}"
            >
              ({counts[tab.key]})
            </span>
          </button>
        {/each}
      </div>
    </div>

    <!-- Row 3 -->
    <section
      data-wf="b-2-0"
      id="claims-panel"
      role="tabpanel"
      aria-labelledby="tab-{activeTab}"
      class="mt-5 border transition-opacity duration-200 motion-reduce:transition-none"
      style="border-color:{hairline}; background-color:{surface}; border-radius:{brand.radius}; opacity:{panelIn ? 1 : 0}"
    >
      <h2 class="sr-only">{activeLabel} claims</h2>

      {#if filtered.length > 0}
        <div class="overflow-x-auto">
          <Table class="w-full border-collapse text-left" style="font-variant-numeric: tabular-nums">
            <THead>
              <TR style="border-bottom:1px solid {hairline}">
                <TH
                  data-wf="i-2-0-0"
                  class="px-5 py-4 text-[11px] font-medium uppercase tracking-[0.18em]"
                  style="color:{brand.neutralColor}">Claim</TH>
                <TH
                  data-wf="i-2-0-1"
                  class="whitespace-nowrap px-5 py-4 text-[11px] font-medium uppercase tracking-[0.18em]"
                  style="color:{brand.neutralColor}">Expense date</TH>
                <TH
                  data-wf="i-2-0-2"
                  class="hidden px-5 py-4 text-[11px] font-medium uppercase tracking-[0.18em] md:table-cell"
                  style="color:{brand.neutralColor}">Category</TH>
                <TH
                  data-wf="i-2-0-3"
                  class="whitespace-nowrap px-5 py-4 text-right text-[11px] font-medium uppercase tracking-[0.18em]"
                  style="color:{brand.neutralColor}">Amount (INR)</TH>
                <TH
                  data-wf="i-2-0-4"
                  class="hidden px-5 py-4 text-[11px] font-medium uppercase tracking-[0.18em] sm:table-cell"
                  style="color:{brand.neutralColor}">Receipts</TH>
                <TH
                  data-wf="i-2-0-5"
                  class="px-5 py-4 text-[11px] font-medium uppercase tracking-[0.18em]"
                  style="color:{brand.neutralColor}">Status</TH>
              </TR>
            </THead>
            <TBody>
              {#each filtered as claim (claim.id)}
                <TR
                  onclick={() => navigate('claim-detail')}
                  class="cursor-pointer align-top transition-colors hover:bg-white/[0.035] motion-reduce:transition-none"
                  style="border-bottom:1px solid {hairlineSoft}"
                >
                  <TD class="px-5 py-4">
                    <button
                      type="button"
                      onclick={() => navigate('claim-detail')}
                      class="{focusRing} flex flex-col items-start text-left"
                      style={ringStyle}
                      aria-label="Open claim {claim.ref}, {claim.description}"
                    >
                      <span
                        class="text-[12px] tracking-[0.14em]"
                        style="color:{brand.accentColor}; font-variant-numeric: tabular-nums"
                      >{claim.ref}</span>
                      <span class="mt-1 max-w-[34ch] text-sm leading-snug" style="color:{brand.primaryColor}"
                        >{claim.description}</span>
                      <span class="mt-1 text-xs md:hidden" style="color:{brand.neutralColor}">{claim.category}</span>
                      {#if claim.over_limit_flag}
                        <span
                          class="mt-2 inline-flex items-center gap-1.5 border px-2 py-0.5 text-[10px] uppercase tracking-[0.16em]"
                          style="border-color:{hairline}; border-radius:{brand.radius}; color:{brand.primaryColor}"
                        >
                          <Icon name="AlertCircle" class="h-3 w-3" aria-hidden="true" />
                          Over limit
                        </span>
                      {/if}
                    </button>
                  </TD>
                  <TD class="whitespace-nowrap px-5 py-4 text-sm" style="color:{brand.primaryColor}"
                    >{fmtDate(claim.expense_date)}</TD>
                  <TD class="hidden px-5 py-4 text-sm md:table-cell" style="color:{brand.neutralColor}"
                    >{claim.category}</TD>
                  <TD
                    class="whitespace-nowrap px-5 py-4 text-right text-sm"
                    style="color:{brand.primaryColor}; font-variant-numeric: tabular-nums">{inr(claim.amount)}</TD>
                  <TD class="hidden px-5 py-4 sm:table-cell">
                    <span class="inline-flex items-center gap-2 text-sm" style="color:{brand.neutralColor}">
                      <Icon name="FileText" class="h-4 w-4" aria-hidden="true" />
                      <span style="font-variant-numeric: tabular-nums">{claim.receipts}</span>
                      <span class="sr-only">receipts attached</span>
                    </span>
                  </TD>
                  <TD class="px-5 py-4">
                    <span
                      class="inline-flex items-center gap-1.5 border px-2.5 py-1 text-xs"
                      style="border-radius:{brand.radius};
                        border-color:{claim.status === 'approved' || claim.status === 'reimbursed' ? accentLine : hairline};
                        background-color:{claim.status === 'approved' || claim.status === 'reimbursed' ? accentSoft : 'transparent'};
                        color:{claim.status === 'approved' || claim.status === 'reimbursed' ? brand.accentColor : brand.primaryColor}"
                    >
                      <Icon name={statusMeta[claim.status].icon} class="h-3.5 w-3.5" aria-hidden="true" />
                      {statusMeta[claim.status].label}
                    </span>
                    <span class="mt-2 flex items-center gap-1" aria-hidden="true">
                      {#each [1, 2, 3] as seg}
                        <span
                          class="h-[2px] w-5"
                          style="background-color:{claim.status !== 'rejected' && seg <= statusMeta[claim.status].stage
                            ? brand.accentColor
                            : hairline}"
                        ></span>
                      {/each}
                    </span>
                    <span class="mt-2 block text-[11px]" style="color:{brand.neutralColor}">{claim.note}</span>
                  </TD>
                </TR>
              {/each}
            </TBody>
          </Table>
        </div>

        <div
          class="flex flex-col gap-2 px-5 py-4 text-xs sm:flex-row sm:items-center sm:justify-between"
          style="border-top:1px solid {hairline}; color:{brand.neutralColor}"
        >
          <p>
            {filtered.length}
            {filtered.length === 1 ? 'claim' : 'claims'} in {activeLabel.toLowerCase()} · total
            <span style="color:{brand.accentColor}; font-variant-numeric: tabular-nums">{inr(filteredTotal)}</span>
          </p>
          <p class="inline-flex items-center gap-2">
            <span class="h-1.5 w-1.5 rounded-full" style="background-color:{brand.accentColor}" aria-hidden="true"></span>
            Synced 09:42 IST, 5 Nov 2026
          </p>
        </div>
      {:else if claims.length === 0}
        <div class="px-5 py-12">
          <Empty
            title="No claims yet"
            description="When you spend on company business, log the amount, date and category, attach the receipt photo and send it to {me.manager} for approval."
          >
            {#snippet action()}
              <Button
                onclick={() => navigate('claim-detail')}
                class="{focusRing} inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold"
                style="{ringStyle}; background-color:{brand.accentColor}; color:{brand.backgroundColor}; border-radius:{brand.radius}"
              >
                <Icon name="Plus" class="h-4 w-4" aria-hidden="true" />
                Create your first claim
              </Button>
            {/snippet}
          </Empty>
        </div>
      {:else}
        <div class="px-5 py-12">
          <Empty
            title="Nothing sitting at {activeLabel.toLowerCase()}"
            description="You have {claims.length} claims in total, but none at this stage right now. Switch to All to see everything you have submitted."
          >
            {#snippet action()}
              <Button
                onclick={() => selectTab('all')}
                class="{focusRing} inline-flex items-center gap-2 border px-4 py-2.5 text-sm"
                style="{ringStyle}; border-color:{hairline}; color:{brand.primaryColor}; background-color:transparent; border-radius:{brand.radius}"
              >
                Show all claims
              </Button>
            {/snippet}
          </Empty>
        </div>
      {/if}
    </section>

    <!-- Row 4 -->
    <div class="mt-6 flex flex-col gap-2 sm:w-4/12">
      <button
        data-wf="b-3-0"
        type="button"
        onclick={openPrivacy}
        class="{focusRing} inline-flex min-h-[44px] w-fit items-center gap-2 text-sm underline underline-offset-4 transition-opacity hover:opacity-80 motion-reduce:transition-none"
        style="{ringStyle}; color:{brand.accentColor}"
      >
        <Icon name="FileText" class="h-4 w-4" aria-hidden="true" />
        Privacy notice
      </button>
      <p class="text-xs" style="color:{brand.neutralColor}">
        {#if ackAt}
          Acknowledged 5 Nov 2026, 09:44 IST. Open it again any time.
        {:else}
          Not yet acknowledged — please read how your data and receipts are handled.
        {/if}
      </p>
    </div>
  </div>
</div>

<!-- Row 5 — privacy notice dialog -->
{#if showPrivacy}
  <div data-wf="b-4-0" class="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
    <button
      type="button"
      aria-label="Close privacy notice"
      onclick={closePrivacy}
      class="absolute inset-0 h-full w-full cursor-default transition-opacity duration-200 motion-reduce:transition-none"
      style="background-color: rgba(6,12,9,0.74); opacity:{privacyIn ? 1 : 0}"
    ></button>

    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-title"
      aria-describedby="privacy-body"
      class="relative w-full max-w-xl border p-6 shadow-2xl transition-all duration-200 sm:p-8 motion-reduce:transition-none"
      style="border-color:{hairline}; background-color:{surfaceHi}; border-radius:{brand.radius}; color:{brand.primaryColor};
        opacity:{privacyIn ? 1 : 0}; transform: translateY({privacyIn ? '0' : '8px'})"
    >
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-[11px] uppercase tracking-[0.24em]" style="color:{brand.neutralColor}">
            DPDP Act · employment basis
          </p>
          <h2 id="privacy-title" class="mt-2 text-2xl" style="font-family:{brand.fontHeading}">Privacy notice</h2>
        </div>
        <button
          type="button"
          aria-label="Close privacy notice"
          onclick={closePrivacy}
          class="{focusRing} inline-flex h-11 w-11 items-center justify-center border transition-colors hover:bg-white/[0.05] motion-reduce:transition-none"
          style="{ringStyle}; border-color:{hairline}; color:{brand.neutralColor}; border-radius:{brand.radius}"
        >
          <Icon name="X" class="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div class="my-6 h-px w-full" style="background-color:{accentLine}"></div>

      <div class="flex flex-col gap-6 sm:flex-row sm:items-end">
        <p
          data-wf="b-5-0"
          id="privacy-body"
          class="text-sm leading-relaxed sm:w-9/12"
          style="color:{brand.primaryColor}"
        >
          We process your name, work email and the receipt images you upload to administer expense
          reimbursement, on the employment basis under the DPDP Act. All data and receipt files are stored in
          India.
        </p>
        <div data-wf="b-5-1" class="sm:w-3/12">
          <Button
            bind:this={ackBtn}
            onclick={acknowledge}
            class="{focusRing} inline-flex w-full items-center justify-center gap-2 px-4 py-3 text-sm font-semibold transition-opacity hover:opacity-90 motion-reduce:transition-none"
            style="{ringStyle}; background-color:{brand.accentColor}; color:{brand.backgroundColor}; border-radius:{brand.radius}"
          >
            <Icon name="Check" class="h-4 w-4" aria-hidden="true" />
            I understand
          </Button>
        </div>
      </div>

      <p class="mt-6 text-xs leading-relaxed" style="color:{brand.neutralColor}">
        Signed in as {me.full_name} ({me.email}). Receipts stay visible to you, {me.manager} and Finance only.
      </p>
    </div>
  </div>
{/if}
