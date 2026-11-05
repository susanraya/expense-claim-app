<script>
   
  import {
    Badge,
    Button,
    Empty,
    Icon,
    Input,
    Label,
    Select,
    TBody,
    TD,
    TH,
    THead,
    TR,
    Table,
  } from "@/lib/ui";
  import { brand } from "@/lib/brand";
  import { useNavigate } from "@/lib/navigate";

  const navigate = useNavigate();

  /* ---------- palette helpers: every colour traced back to the brand roles ---------- */
  function tint(hex, a) {
    const h = hex.replace("#", "");
    const full =
      h.length === 3
        ? h
            .split("")
            .map((c) => c + c)
            .join("")
        : h;
    const n = parseInt(full, 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
  }
  const hair = tint(brand.primaryColor, 0.12);
  const hairSoft = tint(brand.primaryColor, 0.08);
  const panel = tint(brand.primaryColor, 0.035);
  const panelHi = tint(brand.primaryColor, 0.06);
  const ring = `--tw-ring-color: ${brand.accentColor}; --tw-ring-offset-color: ${brand.backgroundColor}`;

  /* ---------- who is signed in (US-002: finance + admin only) ---------- */
  const session = { full_name: "Meera Krishnan", role: "finance" };
  const canView = session.role === "finance" || session.role === "admin";

  /* ---------- reference data ---------- */
  const categories = [
    { id: "c-air", name: "Travel — Air", limit_amount: null },
    { id: "c-local", name: "Travel — Local", limit_amount: 1500 },
    { id: "c-stay", name: "Accommodation", limit_amount: 6000 },
    { id: "c-meals", name: "Client Meals", limit_amount: 2500 },
    { id: "c-office", name: "Office Supplies", limit_amount: null },
    { id: "c-telecom", name: "Internet & Telecom", limit_amount: 2000 },
    { id: "c-training", name: "Training", limit_amount: null },
    { id: "c-fuel", name: "Fuel & Mileage", limit_amount: 5000 },
  ];

  const employees = [
    { id: "u-arjun", full_name: "Arjun Mehta" },
    { id: "u-priya", full_name: "Priya Nair" },
    { id: "u-rahul", full_name: "Rahul Deshpande" },
    { id: "u-sneha", full_name: "Sneha Iyer" },
    { id: "u-vikram", full_name: "Vikram Chawla" },
    { id: "u-fatima", full_name: "Fatima Sheikh" },
    { id: "u-karthik", full_name: "Karthik Raman" },
    { id: "u-ananya", full_name: "Ananya Bose" },
    { id: "u-imran", full_name: "Imran Qureshi" },
    { id: "u-divya", full_name: "Divya Pillai" },
  ];

  const claims = [
    {
      id: "EXP-2026-0431",
      employee_id: "u-arjun",
      category_id: "c-air",
      amount: 18450,
      expense_date: "2026-10-02",
      status: "reimbursed",
      over_limit_flag: false,
      updated_at: "2026-10-21",
      updated_time: "16:04",
    },
    {
      id: "EXP-2026-0437",
      employee_id: "u-priya",
      category_id: "c-meals",
      amount: 3120,
      expense_date: "2026-10-03",
      status: "rejected",
      over_limit_flag: true,
      updated_at: "2026-10-09",
      updated_time: "11:12",
    },
    {
      id: "EXP-2026-0442",
      employee_id: "u-rahul",
      category_id: "c-stay",
      amount: 7400,
      expense_date: "2026-10-05",
      status: "reimbursed",
      over_limit_flag: true,
      updated_at: "2026-10-24",
      updated_time: "09:38",
    },
    {
      id: "EXP-2026-0450",
      employee_id: "u-sneha",
      category_id: "c-telecom",
      amount: 1299,
      expense_date: "2026-10-07",
      status: "finance_approved",
      over_limit_flag: false,
      updated_at: "2026-11-02",
      updated_time: "10:15",
    },
    {
      id: "EXP-2026-0455",
      employee_id: "u-vikram",
      category_id: "c-fuel",
      amount: 2680,
      expense_date: "2026-10-08",
      status: "pending_finance",
      over_limit_flag: false,
      updated_at: "2026-10-30",
      updated_time: "18:21",
    },
    {
      id: "EXP-2026-0461",
      employee_id: "u-fatima",
      category_id: "c-local",
      amount: 1850,
      expense_date: "2026-10-09",
      status: "pending_finance",
      over_limit_flag: true,
      updated_at: "2026-10-31",
      updated_time: "08:46",
    },
    {
      id: "EXP-2026-0468",
      employee_id: "u-karthik",
      category_id: "c-office",
      amount: 940,
      expense_date: "2026-10-12",
      status: "reimbursed",
      over_limit_flag: false,
      updated_at: "2026-10-28",
      updated_time: "14:02",
    },
    {
      id: "EXP-2026-0473",
      employee_id: "u-ananya",
      category_id: "c-training",
      amount: 24000,
      expense_date: "2026-10-13",
      status: "pending_finance",
      over_limit_flag: false,
      updated_at: "2026-11-01",
      updated_time: "12:35",
    },
    {
      id: "EXP-2026-0479",
      employee_id: "u-imran",
      category_id: "c-meals",
      amount: 2250,
      expense_date: "2026-10-14",
      status: "finance_approved",
      over_limit_flag: false,
      updated_at: "2026-11-03",
      updated_time: "09:05",
    },
    {
      id: "EXP-2026-0484",
      employee_id: "u-divya",
      category_id: "c-air",
      amount: 11280,
      expense_date: "2026-10-15",
      status: "rejected",
      over_limit_flag: false,
      updated_at: "2026-10-20",
      updated_time: "17:40",
    },
    {
      id: "EXP-2026-0490",
      employee_id: "u-arjun",
      category_id: "c-stay",
      amount: 5600,
      expense_date: "2026-10-16",
      status: "pending_manager",
      over_limit_flag: false,
      updated_at: "2026-10-17",
      updated_time: "10:28",
    },
    {
      id: "EXP-2026-0495",
      employee_id: "u-priya",
      category_id: "c-fuel",
      amount: 3410,
      expense_date: "2026-10-19",
      status: "pending_finance",
      over_limit_flag: false,
      updated_at: "2026-10-27",
      updated_time: "15:19",
    },
    {
      id: "EXP-2026-0502",
      employee_id: "u-sneha",
      category_id: "c-meals",
      amount: 4780,
      expense_date: "2026-10-20",
      status: "pending_finance",
      over_limit_flag: true,
      updated_at: "2026-11-02",
      updated_time: "19:03",
    },
    {
      id: "EXP-2026-0508",
      employee_id: "u-rahul",
      category_id: "c-office",
      amount: 1560,
      expense_date: "2026-10-21",
      status: "finance_approved",
      over_limit_flag: false,
      updated_at: "2026-11-04",
      updated_time: "11:47",
    },
    {
      id: "EXP-2026-0514",
      employee_id: "u-vikram",
      category_id: "c-local",
      amount: 720,
      expense_date: "2026-10-22",
      status: "reimbursed",
      over_limit_flag: false,
      updated_at: "2026-11-03",
      updated_time: "13:22",
    },
    {
      id: "EXP-2026-0519",
      employee_id: "u-ananya",
      category_id: "c-telecom",
      amount: 1499,
      expense_date: "2026-10-23",
      status: "pending_manager",
      over_limit_flag: false,
      updated_at: "2026-10-24",
      updated_time: "08:11",
    },
    {
      id: "EXP-2026-0523",
      employee_id: "u-imran",
      category_id: "c-air",
      amount: 9340,
      expense_date: "2026-10-26",
      status: "pending_finance",
      over_limit_flag: false,
      updated_at: "2026-11-01",
      updated_time: "16:58",
    },
    {
      id: "EXP-2026-0530",
      employee_id: "u-fatima",
      category_id: "c-training",
      amount: 18500,
      expense_date: "2026-10-27",
      status: "pending_finance",
      over_limit_flag: false,
      updated_at: "2026-11-04",
      updated_time: "09:51",
    },
    {
      id: "EXP-2026-0536",
      employee_id: "u-divya",
      category_id: "c-office",
      amount: 2180,
      expense_date: "2026-10-29",
      status: "rejected",
      over_limit_flag: false,
      updated_at: "2026-10-30",
      updated_time: "12:09",
    },
    {
      id: "EXP-2026-0541",
      employee_id: "u-karthik",
      category_id: "c-stay",
      amount: 6850,
      expense_date: "2026-10-30",
      status: "pending_manager",
      over_limit_flag: true,
      updated_at: "2026-10-31",
      updated_time: "10:44",
    },
    {
      id: "EXP-2026-0548",
      employee_id: "u-priya",
      category_id: "c-local",
      amount: 1120,
      expense_date: "2026-11-02",
      status: "pending_finance",
      over_limit_flag: false,
      updated_at: "2026-11-04",
      updated_time: "07:58",
    },
    {
      id: "EXP-2026-0552",
      employee_id: "u-arjun",
      category_id: "c-meals",
      amount: 1980,
      expense_date: "2026-11-03",
      status: "pending_manager",
      over_limit_flag: false,
      updated_at: "2026-11-03",
      updated_time: "20:16",
    },
    {
      id: "EXP-2026-0557",
      employee_id: "u-sneha",
      category_id: "c-fuel",
      amount: 4250,
      expense_date: "2026-11-04",
      status: "pending_finance",
      over_limit_flag: false,
      updated_at: "2026-11-05",
      updated_time: "08:30",
    },
  ];

  const statusMeta = {
    pending_manager: { label: "Pending manager", icon: "Clock", dot: brand.neutralColor },
    pending_finance: { label: "Pending finance", icon: "Clock", dot: brand.accentColor },
    finance_approved: { label: "Finance approved", icon: "Check", dot: brand.accentColor },
    reimbursed: { label: "Reimbursed", icon: "CheckCircle", dot: brand.primaryColor },
    rejected: { label: "Rejected", icon: "X", dot: tint(brand.primaryColor, 0.4) },
  };

  const statusOptions = [
    { value: "all", label: "All statuses" },
    { value: "pending_manager", label: "Pending manager" },
    { value: "pending_finance", label: "Pending finance" },
    { value: "finance_approved", label: "Finance approved" },
    { value: "reimbursed", label: "Reimbursed" },
    { value: "rejected", label: "Rejected" },
  ];
  const employeeOptions = [{ value: "all", label: "All employees" }].concat(
    employees.map((e) => ({ value: e.id, label: e.full_name })),
  );
  const categoryOptions = [{ value: "all", label: "All categories" }].concat(
    categories.map((c) => ({ value: c.id, label: c.name })),
  );

  /* ---------- formatting ---------- */
  const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  function inr(n) {
    const s = Math.round(n).toString();
    if (s.length <= 3) return s;
    const last3 = s.slice(-3);
    const rest = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    return rest + "," + last3;
  }
  function fmtDate(iso) {
    if (!iso) return "—";
    const p = iso.split("-");
    return `${p[2]} ${MONTHS[Number(p[1]) - 1]} ${p[0]}`;
  }
  const nameOf = (id) => (employees.find((e) => e.id === id) || {}).full_name || "Unknown";
  const catOf = (id) =>
    categories.find((c) => c.id === id) || { name: "Uncategorised", limit_amount: null };
  function overBy(c) {
    const lim = catOf(c.category_id).limit_amount;
    return lim ? c.amount - lim : 0;
  }

  /* ---------- filter state ---------- */
  let fStatus = $state("pending_finance");
  let fEmployee = $state("all");
  let fCategory = $state("all");
  let fFrom = $state("2026-10-01");
  let fTo = $state("2026-11-05");

  let loaded = $state(false);
  let exporting = $state(false);
  let exportedFile = $state(null);
  let exportTimer = null;

  $effect(() => {
    const t = setTimeout(() => (loaded = true), 450);
    return () => clearTimeout(t);
  });
  $effect(() => () => clearTimeout(exportTimer));

  const rangeInvalid = $derived(!!fFrom && !!fTo && fFrom > fTo);

  const filtered = $derived(
    rangeInvalid
      ? []
      : claims
          .filter((c) => (fStatus === "all" ? true : c.status === fStatus))
          .filter((c) => (fEmployee === "all" ? true : c.employee_id === fEmployee))
          .filter((c) => (fCategory === "all" ? true : c.category_id === fCategory))
          .filter((c) => (fFrom ? c.expense_date >= fFrom : true))
          .filter((c) => (fTo ? c.expense_date <= fTo : true))
          .slice()
          .sort((a, b) => (a.expense_date < b.expense_date ? 1 : -1)),
  );
  const total = $derived(filtered.reduce((s, c) => s + c.amount, 0));
  const overLimitCount = $derived(filtered.filter((c) => c.over_limit_flag).length);
  const statusLabel = $derived(
    (statusOptions.find((o) => o.value === fStatus) || {}).label || "All statuses",
  );

  /* clearing stale export notice whenever the view changes */
  $effect(() => {
    // Referenced only so Svelte tracks them as this effect's reactive dependencies.
    JSON.stringify([fStatus, fEmployee, fCategory, fFrom, fTo]);
    exportedFile = null;
  });

  function resetFilters() {
    fStatus = "pending_finance";
    fEmployee = "all";
    fCategory = "all";
    fFrom = "2026-10-01";
    fTo = "2026-11-05";
  }
  function swapDates() {
    const a = fFrom;
    fFrom = fTo;
    fTo = a;
  }
  function exportCsv() {
    if (rangeInvalid || exporting || filtered.length === 0) return;
    exporting = true;
    exportedFile = null;
    clearTimeout(exportTimer);
    exportTimer = setTimeout(() => {
      exporting = false;
      exportedFile = {
        name: `claims_${fStatus === "all" ? "all-statuses" : fStatus.replace(/_/g, "-")}_${fFrom}_to_${fTo}.csv`,
        rows: filtered.length,
        at: "11:52 IST",
      };
    }, 900);
  }
</script>

<div
  class="min-h-full w-full px-5 py-8 sm:px-8 lg:px-12 lg:py-12"
  style="background-color: {brand.backgroundColor}; color: {brand.primaryColor}; font-family: {brand.fontBody}"
>
  {#if !canView}
    <!-- permission denied (US-002) -->
    <div class="mx-auto max-w-2xl">
      <h1 class="text-3xl font-semibold" style="font-family: {brand.fontHeading}">All claims</h1>
      <div
        class="mt-6 border p-8"
        style="border-color: {hair}; background-color: {panel}; border-radius: {brand.radius}"
      >
        <div class="flex items-start gap-4">
          <Icon name="AlertCircle" class="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <div>
            <h2 class="text-xl" style="font-family: {brand.fontHeading}">Finance access only</h2>
            <p class="mt-3 max-w-prose text-sm leading-relaxed" style="color: {brand.neutralColor}">
              The company-wide claims ledger is open to the Finance and Admin roles. You are signed
              in as
              {session.full_name} (Manager), so you can review your own team's claims instead. To get
              ledger access, ask an Admin in People Ops to change your role.
            </p>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <div class="mx-auto max-w-[1180px]">
      <!-- Row 1 -->
      <div class="grid grid-cols-12 items-end gap-6">
        <header class="col-span-12 md:col-span-8" data-wf="b-0-0">
          <p class="text-[11px] uppercase tracking-[0.22em]" style="color: {brand.accentColor}">
            Finance ledger · FY 2026–27
          </p>
          <h1
            class="mt-3 text-4xl leading-tight sm:text-[40px]"
            style="font-family: {brand.fontHeading}"
          >
            All claims
          </h1>
          <div class="mt-4 h-px w-16" style="background-color: {brand.accentColor}"></div>
          <p class="mt-4 max-w-[62ch] text-sm leading-relaxed" style="color: {brand.neutralColor}">
            Every claim raised across the company, in Indian Rupees. Narrow the view, check the
            over-limit flags, then take the CSV into the reconciliation sheet.
          </p>
        </header>

        <div class="col-span-12 flex flex-col items-start gap-2 md:col-span-4 md:items-end">
          <Button
            data-wf="b-0-1"
            class="inline-flex h-11 min-w-[168px] items-center justify-center gap-2 px-5 text-sm font-medium transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-45"
            style="background-color: {brand.accentColor}; color: {brand.backgroundColor}; border-radius: {brand.radius}; {ring}"
            disabled={exporting || rangeInvalid || filtered.length === 0}
            onclick={exportCsv}
          >
            {#if exporting}
              <span
                class="h-2 w-2 rounded-full animate-pulse motion-reduce:animate-none"
                style="background-color: {brand.backgroundColor}"
                aria-hidden="true"
              ></span>
              <span>Preparing CSV…</span>
            {:else}
              <Icon name="Download" class="h-4 w-4" aria-hidden="true" />
              <span>Export CSV</span>
            {/if}
          </Button>

          <p
            class="text-xs leading-relaxed md:text-right"
            style="color: {brand.neutralColor}"
            aria-live="polite"
          >
            {#if exporting}
              Building {filtered.length} rows…
            {:else if exportedFile}
              <span class="inline-flex items-center gap-1.5" style="color: {brand.primaryColor}">
                <Icon name="CheckCircle" class="h-3.5 w-3.5" aria-hidden="true" />
                <span class="tabular-nums">{exportedFile.name}</span>
              </span>
              <br />{exportedFile.rows} rows · saved {exportedFile.at}
            {:else if rangeInvalid}
              Export paused until the date range is valid.
            {:else if filtered.length === 0}
              Nothing to export in this view.
            {:else}
              Exports the {filtered.length} claims below, with audit timestamps.
            {/if}
          </p>
        </div>
      </div>

      <!-- Row 2: filters -->
      <section
        data-wf="b-1-0"
        class="mt-8 border p-5 sm:p-6"
        style="border-color: {hair}; background-color: {panel}; border-radius: {brand.radius}"
        aria-labelledby="filters-heading"
      >
        <div class="flex items-center gap-2">
          <Icon name="Filter" class="h-4 w-4" aria-hidden="true" />
          <h2
            id="filters-heading"
            class="text-[11px] uppercase tracking-[0.22em]"
            style="color: {brand.neutralColor}"
          >
            Filters
          </h2>
        </div>

        <div class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <Label
              for="f-status"
              class="mb-2 block text-[11px] uppercase tracking-[0.16em]"
              style="color: {brand.neutralColor}">Status</Label
            >
            <Select
              id="f-status"
              data-wf="i-1-0-0"
              bind:value={fStatus}
              options={statusOptions}
              class="h-11 w-full border px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style="background-color: {panelHi}; border-color: {hair}; color: {brand.primaryColor}; border-radius: {brand.radius}; {ring}"
            />
          </div>
          <div>
            <Label
              for="f-employee"
              class="mb-2 block text-[11px] uppercase tracking-[0.16em]"
              style="color: {brand.neutralColor}">Employee</Label
            >
            <Select
              id="f-employee"
              data-wf="i-1-0-1"
              bind:value={fEmployee}
              options={employeeOptions}
              class="h-11 w-full border px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style="background-color: {panelHi}; border-color: {hair}; color: {brand.primaryColor}; border-radius: {brand.radius}; {ring}"
            />
          </div>
          <div>
            <Label
              for="f-category"
              class="mb-2 block text-[11px] uppercase tracking-[0.16em]"
              style="color: {brand.neutralColor}">Category</Label
            >
            <Select
              id="f-category"
              data-wf="i-1-0-2"
              bind:value={fCategory}
              options={categoryOptions}
              class="h-11 w-full border px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style="background-color: {panelHi}; border-color: {hair}; color: {brand.primaryColor}; border-radius: {brand.radius}; {ring}"
            />
          </div>
          <div>
            <Label
              for="f-from"
              class="mb-2 block text-[11px] uppercase tracking-[0.16em]"
              style="color: {brand.neutralColor}">Date from</Label
            >
            <Input
              id="f-from"
              data-wf="i-1-0-3"
              type="date"
              bind:value={fFrom}
              class="h-11 w-full border px-3 text-sm tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style="background-color: {panelHi}; border-color: {rangeInvalid
                ? brand.accentColor
                : hair}; color: {brand.primaryColor}; border-radius: {brand.radius}; color-scheme: dark; {ring}"
            />
          </div>
          <div>
            <Label
              for="f-to"
              class="mb-2 block text-[11px] uppercase tracking-[0.16em]"
              style="color: {brand.neutralColor}">Date to</Label
            >
            <Input
              id="f-to"
              data-wf="i-1-0-4"
              type="date"
              bind:value={fTo}
              class="h-11 w-full border px-3 text-sm tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style="background-color: {panelHi}; border-color: {rangeInvalid
                ? brand.accentColor
                : hair}; color: {brand.primaryColor}; border-radius: {brand.radius}; color-scheme: dark; {ring}"
            />
          </div>
        </div>
      </section>

      <!-- Row 3: ledger band -->
      <div
        data-wf="b-2-0"
        class="mt-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-y py-5 pl-4"
        style="border-color: {hair}; box-shadow: inset 2px 0 0 0 {brand.accentColor}"
      >
        <p class="text-xl tabular-nums sm:text-2xl" style="font-family: {brand.fontHeading}">
          {#if rangeInvalid}
            <span style="color: {brand.neutralColor}">Range not readable</span>
          {:else}
            {filtered.length} claims
            <span style="color: {brand.neutralColor}"> · </span>
            Total <span style="color: {brand.accentColor}">₹{inr(total)}</span>
          {/if}
        </p>
        <p class="flex items-center gap-2 text-xs tabular-nums" style="color: {brand.neutralColor}">
          <Icon name="Clock" class="h-3.5 w-3.5" aria-hidden="true" />
          <span>Ledger synced 11:48 IST · {overLimitCount} flagged over limit</span>
        </p>
      </div>

      <!-- Row 4: table -->
      <section
        data-wf="b-3-0"
        class="mt-6 border"
        style="border-color: {hair}; background-color: {panel}; border-radius: {brand.radius}"
        aria-labelledby="ledger-heading"
      >
        <h2 id="ledger-heading" class="sr-only">Claims matching the current filters</h2>

        {#if rangeInvalid}
          <div class="p-10">
            <div class="mx-auto flex max-w-xl items-start gap-4">
              <Icon
                name="AlertCircle"
                class="mt-0.5 h-5 w-5 shrink-0"
                style="color: {brand.accentColor}"
                aria-hidden="true"
              />
              <div>
                <h3 class="text-lg" style="font-family: {brand.fontHeading}">
                  That date range runs backwards
                </h3>
                <p class="mt-2 text-sm leading-relaxed" style="color: {brand.neutralColor}">
                  Date from is {fmtDate(fFrom)} and date to is {fmtDate(fTo)}, so the ledger has
                  nothing to read between them. Your other filters are kept.
                </p>
                <Button
                  class="mt-5 h-11 border bg-transparent px-5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style="border-color: {hair}; color: {brand.primaryColor}; border-radius: {brand.radius}; {ring}"
                  onclick={swapDates}
                >
                  Swap the two dates
                </Button>
              </div>
            </div>
          </div>
        {:else}
          <div class="overflow-x-auto">
            <Table
              class="w-full min-w-[980px] border-collapse text-sm"
              style="font-variant-numeric: tabular-nums"
            >
              <THead>
                <TR style="border-bottom: 1px solid {hair}">
                  <TH
                    data-wf="i-3-0-0"
                    class="px-5 py-4 text-left text-[11px] font-normal uppercase tracking-[0.16em]"
                    style="color: {brand.neutralColor}">Claim</TH
                  >
                  <TH
                    data-wf="i-3-0-1"
                    class="px-5 py-4 text-left text-[11px] font-normal uppercase tracking-[0.16em]"
                    style="color: {brand.neutralColor}">Employee</TH
                  >
                  <TH
                    data-wf="i-3-0-2"
                    class="px-5 py-4 text-left text-[11px] font-normal uppercase tracking-[0.16em]"
                    style="color: {brand.neutralColor}">Expense date</TH
                  >
                  <TH
                    data-wf="i-3-0-3"
                    class="px-5 py-4 text-left text-[11px] font-normal uppercase tracking-[0.16em]"
                    style="color: {brand.neutralColor}">Category</TH
                  >
                  <TH
                    data-wf="i-3-0-4"
                    class="px-5 py-4 text-right text-[11px] font-normal uppercase tracking-[0.16em]"
                    style="color: {brand.neutralColor}">Amount (INR)</TH
                  >
                  <TH
                    data-wf="i-3-0-5"
                    class="px-5 py-4 text-left text-[11px] font-normal uppercase tracking-[0.16em]"
                    style="color: {brand.neutralColor}">Over limit</TH
                  >
                  <TH
                    data-wf="i-3-0-6"
                    class="px-5 py-4 text-left text-[11px] font-normal uppercase tracking-[0.16em]"
                    style="color: {brand.neutralColor}">Status</TH
                  >
                  <TH
                    data-wf="i-3-0-7"
                    class="px-5 py-4 text-left text-[11px] font-normal uppercase tracking-[0.16em]"
                    style="color: {brand.neutralColor}">Last updated</TH
                  >
                </TR>
              </THead>
              <TBody>
                {#if !loaded}
                  {#each [1, 2, 3, 4, 5, 6] as n (n)}
                    <TR style="border-bottom: 1px solid {hairSoft}">
                      {#each [1, 2, 3, 4, 5, 6, 7, 8] as col (col)}
                        <TD class="px-5 py-5">
                          <span
                            class="block h-3 animate-pulse rounded motion-reduce:animate-none"
                            style="background-color: {panelHi}; width: {col === 1
                              ? 70
                              : col === 5
                                ? 50
                                : 60}%"
                          ></span>
                        </TD>
                      {/each}
                    </TR>
                  {/each}
                {:else if filtered.length > 0}
                  {#each filtered as c (c.id)}
                    <TR
                      class="cursor-pointer transition-colors duration-150 hover:bg-white/5"
                      style="border-bottom: 1px solid {hairSoft}"
                      onclick={() => navigate("claim-detail")}
                    >
                      <TD class="px-5 py-4">
                        <button
                          type="button"
                          class="rounded text-sm tracking-wide underline-offset-4 transition-colors duration-150 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                          style="font-family: {brand.fontHeading}; color: {brand.accentColor}; {ring}"
                          aria-label={`Open claim ${c.id} from ${nameOf(c.employee_id)}`}
                          onclick={(e) => {
                            e.stopPropagation();
                            navigate("claim-detail");
                          }}
                        >
                          {c.id}
                        </button>
                      </TD>
                      <TD class="px-5 py-4">{nameOf(c.employee_id)}</TD>
                      <TD class="px-5 py-4 tabular-nums" style="color: {brand.neutralColor}"
                        >{fmtDate(c.expense_date)}</TD
                      >
                      <TD class="px-5 py-4">{catOf(c.category_id).name}</TD>
                      <TD class="px-5 py-4 text-right tabular-nums">₹{inr(c.amount)}</TD>
                      <TD class="px-5 py-4">
                        {#if c.over_limit_flag}
                          <Badge
                            class="inline-flex items-center gap-1.5 border px-2 py-1 text-[11px] tabular-nums"
                            style="border-color: {tint(
                              brand.accentColor,
                              0.5,
                            )}; background-color: {tint(
                              brand.accentColor,
                              0.1,
                            )}; color: {brand.primaryColor}; border-radius: {brand.radius}"
                          >
                            <Icon name="AlertCircle" class="h-3.5 w-3.5" aria-hidden="true" />
                            Over by ₹{inr(overBy(c))}
                          </Badge>
                        {:else}
                          <span aria-hidden="true" style="color: {brand.neutralColor}">—</span>
                          <span class="sr-only">Within limit</span>
                        {/if}
                      </TD>
                      <TD class="px-5 py-4">
                        <span class="inline-flex items-center gap-2 whitespace-nowrap">
                          <span
                            class="h-1.5 w-1.5 rounded-full"
                            style="background-color: {statusMeta[c.status].dot}"
                            aria-hidden="true"
                          ></span>
                          <Icon
                            name={statusMeta[c.status].icon}
                            class="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                          <span>{statusMeta[c.status].label}</span>
                        </span>
                      </TD>
                      <TD class="px-5 py-4 tabular-nums" style="color: {brand.neutralColor}">
                        {fmtDate(c.updated_at)} · {c.updated_time}
                      </TD>
                    </TR>
                  {/each}
                {/if}
              </TBody>
            </Table>
          </div>

          {#if loaded && filtered.length === 0}
            <div class="px-6 py-12">
              {#if claims.length === 0}
                <Empty
                  title="The ledger is still empty"
                  description="No employee has submitted a claim yet. As soon as the first claim clears manager approval it will appear here for finance review."
                >
                  {#snippet action()}
                    <Button
                      class="h-11 px-5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      style="background-color: {brand.accentColor}; color: {brand.backgroundColor}; border-radius: {brand.radius}; {ring}"
                      onclick={() => navigate("administration")}
                    >
                      Review categories and users
                    </Button>
                  {/snippet}
                </Empty>
              {:else}
                <Empty
                  title="No claims in this view"
                  description={`Nothing matches ${statusLabel.toLowerCase()} between ${fmtDate(fFrom)} and ${fmtDate(fTo)} with the employee and category you picked. Widen the dates or drop one filter.`}
                >
                  {#snippet action()}
                    <Button
                      class="h-11 border bg-transparent px-5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      style="border-color: {hair}; color: {brand.primaryColor}; border-radius: {brand.radius}; {ring}"
                      onclick={resetFilters}
                    >
                      Reset to pending finance
                    </Button>
                  {/snippet}
                </Empty>
              {/if}
            </div>
          {/if}
        {/if}
      </section>

      <p class="mt-6 text-xs leading-relaxed" style="color: {brand.neutralColor}">
        Claims and receipt files are held in the Mumbai region. Exported CSVs carry personal data —
        handle them under the company retention policy.
      </p>
    </div>
  {/if}
</div>
