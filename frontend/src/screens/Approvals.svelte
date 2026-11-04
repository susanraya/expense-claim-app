<script>
  /* eslint-disable @typescript-eslint/no-unused-vars -- generated imports, matched generously */
  import { Avatar, Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Empty, Icon, Label, Separator, Switch, TBody, TD, TH, THead, TR, Table, Textarea } from "@/lib/ui";
  import { brand } from "@/lib/brand";
  import { useNavigate } from "@/lib/navigate";

  const navigate = useNavigate();

  // ---------- signed-in user (role scope drives what this screen allows) ----------
  const me = {
    full_name: 'Susan Raya',
    email: 'susan.raya@quorq.ai',
    role: 'Finance',
    team_size: 4
  };

  // ---------- surface tokens derived from the brand roles ----------
  const surface = 'rgba(255,255,255,0.035)';
  const surfaceUp = 'rgba(255,255,255,0.065)';
  const hairline = 'rgba(233,237,233,0.12)';
  const hairlineSoft = 'rgba(233,237,233,0.07)';
  const warn = '#c9a66b';     // policy warning only
  const danger = '#c98f82';   // rejection / error only

  const ringStyle = `--tw-ring-color:${brand.accentColor};--tw-ring-offset-color:${brand.backgroundColor}`;
  const ring = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-[6px]';

  const inr = (n) => '₹' + new Intl.NumberFormat('en-IN').format(n);

  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function stamp() {
    const d = new Date();
    const p = (x) => String(x).padStart(2, '0');
    return `${p(d.getDate())} ${MONTHS[d.getMonth()]} ${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
  }

  const STATUS = {
    pending_manager:  { label: 'Pending manager',      icon: 'Clock',       tone: 'neutral' },
    pending_finance:  { label: 'Pending finance',      icon: 'Clock',       tone: 'accent'  },
    finance_approved: { label: 'Finance approved',     icon: 'Check',       tone: 'accent'  },
    reimbursed:       { label: 'Reimbursed',           icon: 'CheckCircle', tone: 'accent'  },
    rejected:         { label: 'Returned to employee', icon: 'X',           tone: 'danger'  }
  };

  // ---------- queue data ----------
  let claims = $state([
    {
      id: 'CLM-1053', employee: 'Nandini Pillai', email: 'nandini.pillai@quorq.ai',
      category: 'Training & Conferences', limit: 25000, amount: 18000,
      expense_date: '04 Nov 2026', submitted: '04 Nov 2026', submitted_time: '18:40',
      status: 'pending_manager', over_limit: false,
      description: 'Conference pass — Product Leaders Summit, Bengaluru',
      receipt: { file_name: 'conference-invoice.png', content_type: 'PNG', size: '2.1 MB', uploaded: '04 Nov 2026 18:38' },
      audit: [{ at: '04 Nov 2026 18:40', actor: 'Nandini Pillai', action: 'Submitted', from: 'Draft', to: 'Pending manager', comment: 'Pass is non-refundable after 08 Nov.' }]
    },
    {
      id: 'CLM-1051', employee: 'Rahul Shetty', email: 'rahul.shetty@quorq.ai',
      category: 'Client Entertainment', limit: 10000, amount: 12400,
      expense_date: '03 Nov 2026', submitted: '04 Nov 2026', submitted_time: '09:18',
      status: 'pending_manager', over_limit: true,
      description: 'Client dinner with Marico procurement team (4 guests)',
      receipt: { file_name: 'dinner-tajwest-03nov.jpg', content_type: 'JPEG', size: '1.8 MB', uploaded: '04 Nov 2026 09:16' },
      audit: [{ at: '04 Nov 2026 09:18', actor: 'Rahul Shetty', action: 'Submitted', from: 'Draft', to: 'Pending manager', comment: '' }]
    },
    {
      id: 'CLM-1049', employee: 'Farah Qureshi', email: 'farah.qureshi@quorq.ai',
      category: 'Travel', limit: 5000, amount: 3280,
      expense_date: '31 Oct 2026', submitted: '02 Nov 2026', submitted_time: '20:05',
      status: 'pending_manager', over_limit: false,
      description: 'Ola rides to the Andheri office, 29–31 Oct',
      receipt: { file_name: 'ola-31oct.jpg', content_type: 'JPEG', size: '740 KB', uploaded: '02 Nov 2026 20:03' },
      audit: [{ at: '02 Nov 2026 20:05', actor: 'Farah Qureshi', action: 'Submitted', from: 'Draft', to: 'Pending manager', comment: '' }]
    },
    {
      id: 'CLM-1047', employee: 'Vikram Iyer', email: 'vikram.iyer@quorq.ai',
      category: 'Office Supplies', limit: null, amount: 1150,
      expense_date: '29 Oct 2026', submitted: '30 Oct 2026', submitted_time: '12:44',
      status: 'pending_manager', over_limit: false,
      description: 'Whiteboard markers and A4 reams for the 7th floor',
      receipt: { file_name: 'stationery-29oct.jpg', content_type: 'JPEG', size: '612 KB', uploaded: '30 Oct 2026 12:42' },
      audit: [{ at: '30 Oct 2026 12:44', actor: 'Vikram Iyer', action: 'Submitted', from: 'Draft', to: 'Pending manager', comment: 'Replacing supplies used in the QBR workshop.' }]
    },
    {
      id: 'CLM-1042', employee: 'Anita Desai', email: 'anita.desai@quorq.ai',
      category: 'Travel', limit: 5000, amount: 6500,
      expense_date: '02 Nov 2026', submitted: '02 Nov 2026', submitted_time: '10:12',
      status: 'pending_finance', over_limit: true,
      description: 'Client visit — airport taxi and hotel',
      receipt: { file_name: 'taxi-02nov.jpg', content_type: 'JPEG', size: '1.4 MB', uploaded: '02 Nov 2026 10:11' },
      audit: [
        { at: '02 Nov 2026 10:12', actor: 'Anita Desai', action: 'Submitted', from: 'Draft', to: 'Pending manager', comment: '' },
        { at: '04 Nov 2026 11:05', actor: 'Priya Nair', action: 'Approved', from: 'Pending manager', to: 'Pending finance', comment: 'Trip was pre-approved — hotel rate was the lowest available that night.' }
      ]
    },
    {
      id: 'CLM-1038', employee: 'Joseph Mathew', email: 'joseph.mathew@quorq.ai',
      category: 'Meals', limit: 1200, amount: 890,
      expense_date: '30 Oct 2026', submitted: '31 Oct 2026', submitted_time: '09:30',
      status: 'pending_finance', over_limit: false,
      description: 'Team lunch during the month-end close',
      receipt: { file_name: 'cafe-bill-30oct.jpg', content_type: 'JPEG', size: '908 KB', uploaded: '31 Oct 2026 09:28' },
      audit: [
        { at: '31 Oct 2026 09:30', actor: 'Joseph Mathew', action: 'Submitted', from: 'Draft', to: 'Pending manager', comment: '' },
        { at: '03 Nov 2026 16:20', actor: 'Priya Nair', action: 'Approved', from: 'Pending manager', to: 'Pending finance', comment: '' }
      ]
    },
    {
      id: 'CLM-1031', employee: 'Sana Kulkarni', email: 'sana.kulkarni@quorq.ai',
      category: 'Travel', limit: 5000, amount: 4250,
      expense_date: '27 Oct 2026', submitted: '28 Oct 2026', submitted_time: '08:15',
      status: 'finance_approved', over_limit: false,
      description: 'IndiGo 6E-532 Mumbai–Chennai, audit visit',
      receipt: { file_name: 'indigo-boarding.jpg', content_type: 'JPEG', size: '1.1 MB', uploaded: '28 Oct 2026 08:13' },
      audit: [
        { at: '28 Oct 2026 08:15', actor: 'Sana Kulkarni', action: 'Submitted', from: 'Draft', to: 'Pending manager', comment: '' },
        { at: '29 Oct 2026 10:02', actor: 'Priya Nair', action: 'Approved', from: 'Pending manager', to: 'Pending finance', comment: '' },
        { at: '03 Nov 2026 15:02', actor: 'Susan Raya', action: 'Approved', from: 'Pending finance', to: 'Finance approved', comment: 'Boarding pass matches the booking reference.' }
      ]
    },
    {
      id: 'CLM-1029', employee: 'Arjun Menon', email: 'arjun.menon@quorq.ai',
      category: 'Internet & Phone', limit: 2000, amount: 1499,
      expense_date: '25 Oct 2026', submitted: '26 Oct 2026', submitted_time: '19:50',
      status: 'finance_approved', over_limit: false,
      description: 'October broadband bill — work-from-home allowance',
      receipt: { file_name: 'airtel-oct-bill.png', content_type: 'PNG', size: '480 KB', uploaded: '26 Oct 2026 19:49' },
      audit: [
        { at: '26 Oct 2026 19:50', actor: 'Arjun Menon', action: 'Submitted', from: 'Draft', to: 'Pending manager', comment: '' },
        { at: '27 Oct 2026 09:40', actor: 'Deepak Rao', action: 'Approved', from: 'Pending manager', to: 'Pending finance', comment: '' },
        { at: '02 Nov 2026 11:30', actor: 'Susan Raya', action: 'Approved', from: 'Pending finance', to: 'Finance approved', comment: '' }
      ]
    },
    {
      id: 'CLM-1026', employee: 'Divya Ramesh', email: 'divya.ramesh@quorq.ai',
      category: 'Client Entertainment', limit: 10000, amount: 7800,
      expense_date: '22 Oct 2026', submitted: '23 Oct 2026', submitted_time: '21:12',
      status: 'finance_approved', over_limit: false,
      description: 'Dinner with the Zerodha partnership team',
      receipt: { file_name: 'barbeque-nation-bill.jpg', content_type: 'JPEG', size: '1.6 MB', uploaded: '23 Oct 2026 21:10' },
      audit: [
        { at: '23 Oct 2026 21:12', actor: 'Divya Ramesh', action: 'Submitted', from: 'Draft', to: 'Pending manager', comment: '' },
        { at: '24 Oct 2026 12:18', actor: 'Deepak Rao', action: 'Approved', from: 'Pending manager', to: 'Pending finance', comment: 'Within the entertainment cap.' },
        { at: '30 Oct 2026 17:45', actor: 'Susan Raya', action: 'Approved', from: 'Pending finance', to: 'Finance approved', comment: '' }
      ]
    }
  ]);

  const TABS = [
    { key: 'manager',   wf: 'i-1-0-0', label: 'Manager queue',    status: 'pending_manager' },
    { key: 'finance',   wf: 'i-1-0-1', label: 'Finance queue',    status: 'pending_finance' },
    { key: 'reimburse', wf: 'i-1-0-2', label: 'Finance approved, awaiting reimbursement', status: 'finance_approved' }
  ];

  let tab = $state('finance');
  let selectedId = $state('CLM-1042');
  let comment = $state('');
  let formError = $state('');
  let flash = $state(null);
  let auditIn = $state(true);
  let tabEls = {};

  const activeTab = $derived(TABS.find((t) => t.key === tab));
  const queue = $derived(claims.filter((c) => c.status === activeTab.status));
  const selected = $derived(queue.find((c) => c.id === selectedId) ?? null);
  const counts = $derived(Object.fromEntries(TABS.map((t) => [t.key, claims.filter((c) => c.status === t.status).length])));

  const canApprove = $derived(!!selected && (selected.status === 'pending_manager' || selected.status === 'pending_finance'));
  const canReject = $derived(canApprove);
  const canReimburse = $derived(!!selected && selected.status === 'finance_approved');

  // keep a valid selection as the queue changes under the reviewer
  $effect(() => {
    if (queue.length === 0) {
      if (selectedId !== null) selectedId = null;
    } else if (!queue.some((c) => c.id === selectedId)) {
      selectedId = queue[0].id;
    }
  });

  let lastSel = 'CLM-1042';
  $effect(() => {
    if (selectedId !== lastSel) {
      lastSel = selectedId;
      comment = '';
      formError = '';
    }
  });

  function pushAudit(claim, action, from, to, note) {
    claim.audit = [...claim.audit, { at: stamp(), actor: me.full_name, action, from, to, comment: note }];
    auditIn = false;
  }
  $effect(() => {
    if (!auditIn) auditIn = true;
  });

  function select(id) {
    selectedId = id;
  }

  function approve() {
    if (!selected || !canApprove) return;
    const c = selected;
    const from = c.status;
    const to = from === 'pending_manager' ? 'pending_finance' : 'finance_approved';
    pushAudit(c, 'Approved', STATUS[from].label, STATUS[to].label, comment.trim());
    c.status = to;
    flash = {
      tone: 'success',
      text: to === 'pending_finance'
        ? `${c.id} approved. It has moved to the Finance queue for final review.`
        : `${c.id} is finance approved. Record the payment once it leaves the bank.`
    };
    comment = '';
    formError = '';
  }

  function reject() {
    if (!selected || !canReject) return;
    if (!comment.trim()) {
      formError = 'A rejection goes back to the employee with your words on it. Say what needs fixing first.';
      return;
    }
    const c = selected;
    const from = c.status;
    pushAudit(c, 'Rejected', STATUS[from].label, STATUS.rejected.label, comment.trim());
    c.status = 'rejected';
    c.last_rejection_reason = comment.trim();
    flash = { tone: 'danger', text: `${c.id} returned to ${c.employee} with your reason. They can correct and resubmit.` };
    comment = '';
    formError = '';
  }

  function reimburse() {
    if (!selected || !canReimburse) return;
    const c = selected;
    pushAudit(c, 'Marked reimbursed', STATUS.finance_approved.label, STATUS.reimbursed.label, comment.trim());
    c.status = 'reimbursed';
    flash = { tone: 'success', text: `${c.id} marked reimbursed — ${inr(c.amount)} recorded. No payment was sent from here; the transfer happens in your bank.` };
    comment = '';
    formError = '';
  }

  function onTabKeydown(e) {
    const i = TABS.findIndex((t) => t.key === tab);
    let n = null;
    if (e.key === 'ArrowRight') n = (i + 1) % TABS.length;
    else if (e.key === 'ArrowLeft') n = (i - 1 + TABS.length) % TABS.length;
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = TABS.length - 1;
    if (n === null) return;
    e.preventDefault();
    tab = TABS[n].key;
    flash = null;
    tabEls[TABS[n].key]?.focus();
  }

  const stages = $derived(
    selected
      ? [
          { name: 'Employee', done: true },
          { name: 'Manager', done: selected.status !== 'pending_manager' },
          { name: 'Finance', done: selected.status === 'finance_approved' || selected.status === 'reimbursed' }
        ]
      : []
  );

  const emptyCopy = {
    manager: { title: 'Your team has nothing waiting', description: 'Every claim from the four people reporting to you has been dealt with. New submissions land here the moment they are sent.' },
    finance: { title: 'The Finance queue is clear', description: 'Each manager-approved claim has had its final review. Claims only appear here after a manager has approved them.' },
    reimburse: { title: 'Nothing is awaiting reimbursement', description: 'Finance-approved claims rest here until you record that the payment has been arranged.' }
  };
</script>

<div class="min-h-full" style="background-color:{brand.backgroundColor}; color:{brand.primaryColor}; font-family:{brand.fontBody};">
  <div class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

    <!-- Row 1 — page title -->
    <header data-wf="b-0-0" class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-[11px] uppercase tracking-[0.18em]" style="color:{brand.neutralColor};">Reimbursements</p>
        <h1 class="mt-2 text-[32px] leading-tight sm:text-[40px]" style="font-family:{brand.fontHeading}; color:{brand.primaryColor};">
          Approvals
        </h1>
        <p class="mt-3 max-w-[64ch] text-sm leading-relaxed" style="color:{brand.neutralColor};">
          Signed in as {me.full_name} · {me.role}. You see claims from the {me.team_size} people who report to you and every
          claim sitting at the Finance stage. Category and user setup stays with an Admin — ask IT&nbsp;Ops to change it.
        </p>
      </div>
      <div class="flex items-center gap-2 text-xs" style="color:{brand.neutralColor};">
        <span class="inline-block h-1.5 w-1.5 rounded-full" style="background-color:{brand.accentColor};" aria-hidden="true"></span>
        <span style="font-variant-numeric: tabular-nums;">Queue synced 05 Nov 2026, 09:41</span>
      </div>
    </header>

    <!-- Row 2 — queue tabs -->
    <div
      data-wf="b-1-0"
      role="tablist"
      aria-label="Approval queues"
      onkeydown={onTabKeydown}
      class="mt-8 flex gap-1 overflow-x-auto border-b pb-px"
      style="border-color:{hairline};"
    >
      {#each TABS as t (t.key)}
        <button
          data-wf={t.wf}
          bind:this={tabEls[t.key]}
          role="tab"
          id={'tab-' + t.key}
          aria-selected={tab === t.key}
          aria-controls={'panel-' + tab}
          tabindex={tab === t.key ? 0 : -1}
          onclick={() => { tab = t.key; flash = null; }}
          class="{ring} relative min-h-[44px] whitespace-nowrap px-4 py-3 text-left text-sm motion-safe:transition-colors motion-reduce:transition-none"
          style="{ringStyle}; color:{tab === t.key ? brand.primaryColor : brand.neutralColor}; box-shadow:{tab === t.key ? `inset 0 -2px 0 0 ${brand.accentColor}` : 'none'};"
        >
          <span>{t.label}</span>
          <span
            class="ml-2 inline-flex min-w-[22px] justify-center rounded-full border px-1.5 py-0.5 text-[11px]"
            style="font-variant-numeric: tabular-nums; border-color:{hairline}; color:{tab === t.key ? brand.accentColor : brand.neutralColor}; background-color:{tab === t.key ? 'rgba(143,174,139,0.1)' : 'transparent'};"
          >{counts[t.key]}</span>
        </button>
      {/each}
    </div>

    <!-- Row 3 — queue table -->
    <section
      data-wf="b-2-0"
      id={'panel-' + tab}
      role="tabpanel"
      aria-labelledby={'tab-' + tab}
      tabindex="-1"
      class="{ring} mt-6 overflow-hidden border"
      style="{ringStyle}; border-color:{hairline}; background-color:{surface}; border-radius:{brand.radius};"
    >
      {#if queue.length === 0}
        <div class="px-6 py-12">
          <Empty title={emptyCopy[tab].title} description={emptyCopy[tab].description}>
            {#snippet action()}
              <Button
                onclick={() => navigate('claims')}
                class="{ring} min-h-[44px] border px-4 text-sm"
                style="{ringStyle}; background-color:transparent; border-color:{hairline}; color:{brand.primaryColor}; border-radius:{brand.radius};"
              >
                <Icon name="FileText" class="mr-2 h-4 w-4" aria-hidden="true" />
                Browse all claims
              </Button>
            {/snippet}
          </Empty>
        </div>
      {:else}
        <div class="overflow-x-auto">
          <Table class="w-full text-sm" style="font-variant-numeric: tabular-nums;">
            <caption class="sr-only">{activeTab.label} — {queue.length} claims. Choose a claim to review it below.</caption>
            <THead>
              <TR style="border-color:{hairline};">
                <TH data-wf="i-2-0-0" class="px-4 py-3 text-left text-[11px] font-normal uppercase tracking-[0.14em]" style="color:{brand.neutralColor};">Claim</TH>
                <TH data-wf="i-2-0-1" class="px-4 py-3 text-left text-[11px] font-normal uppercase tracking-[0.14em]" style="color:{brand.neutralColor};">Employee</TH>
                <TH data-wf="i-2-0-2" class="hidden px-4 py-3 text-left text-[11px] font-normal uppercase tracking-[0.14em] md:table-cell" style="color:{brand.neutralColor};">Expense date</TH>
                <TH data-wf="i-2-0-3" class="hidden px-4 py-3 text-left text-[11px] font-normal uppercase tracking-[0.14em] sm:table-cell" style="color:{brand.neutralColor};">Category</TH>
                <TH data-wf="i-2-0-4" class="px-4 py-3 text-right text-[11px] font-normal uppercase tracking-[0.14em]" style="color:{brand.neutralColor};">Amount (INR)</TH>
                <TH data-wf="i-2-0-5" class="hidden px-4 py-3 text-left text-[11px] font-normal uppercase tracking-[0.14em] lg:table-cell" style="color:{brand.neutralColor};">Submitted</TH>
                <TH data-wf="i-2-0-6" class="px-4 py-3 text-left text-[11px] font-normal uppercase tracking-[0.14em]" style="color:{brand.neutralColor};">Status</TH>
              </TR>
            </THead>
            <TBody>
              {#each queue as c (c.id)}
                <TR
                  onclick={() => select(c.id)}
                  class="cursor-pointer border-t motion-safe:transition-colors motion-reduce:transition-none"
                  style="border-color:{hairlineSoft}; background-color:{selectedId === c.id ? surfaceUp : 'transparent'}; box-shadow:{selectedId === c.id ? `inset 2px 0 0 0 ${brand.accentColor}` : 'none'};"
                >
                  <TD class="px-4 py-3 align-middle">
                    <button
                      onclick={(e) => { e.stopPropagation(); select(c.id); }}
                      aria-current={selectedId === c.id ? 'true' : undefined}
                      class="{ring} min-h-[44px] text-left text-[15px] tracking-wide"
                      style="{ringStyle}; font-family:{brand.fontHeading}; color:{brand.accentColor};"
                    >
                      {c.id}
                      <span class="sr-only">— open for review</span>
                    </button>
                    {#if c.over_limit}
                      <span class="ml-2 inline-flex items-center gap-1 align-middle text-[11px]" style="color:{warn};">
                        <Icon name="AlertCircle" class="h-3.5 w-3.5" aria-hidden="true" />
                        Over limit
                      </span>
                    {/if}
                  </TD>
                  <TD class="px-4 py-3 align-middle">
                    <span class="flex items-center gap-2.5">
                      <Avatar name={c.employee} class="h-7 w-7 shrink-0" />
                      <span style="color:{brand.primaryColor};">{c.employee}</span>
                    </span>
                  </TD>
                  <TD class="hidden px-4 py-3 align-middle md:table-cell" style="color:{brand.neutralColor};">{c.expense_date}</TD>
                  <TD class="hidden px-4 py-3 align-middle sm:table-cell" style="color:{brand.neutralColor};">{c.category}</TD>
                  <TD class="px-4 py-3 text-right align-middle" style="color:{brand.primaryColor};">{inr(c.amount)}</TD>
                  <TD class="hidden px-4 py-3 align-middle lg:table-cell" style="color:{brand.neutralColor};">
                    {c.submitted} <span class="opacity-70">{c.submitted_time}</span>
                  </TD>
                  <TD class="px-4 py-3 align-middle">
                    <span class="flex items-center justify-between gap-2">
                      <Badge
                        class="inline-flex items-center gap-1.5 whitespace-nowrap border px-2 py-1 text-[11px]"
                        style="border-radius:{brand.radius}; background-color:transparent; border-color:{STATUS[c.status].tone === 'accent' ? 'rgba(143,174,139,0.35)' : hairline}; color:{STATUS[c.status].tone === 'accent' ? brand.accentColor : brand.neutralColor};"
                      >
                        <Icon name={STATUS[c.status].icon} class="h-3.5 w-3.5" aria-hidden="true" />
                        {STATUS[c.status].label}
                      </Badge>
                      <button
                        onclick={(e) => { e.stopPropagation(); navigate('claim-detail'); }}
                        aria-label={'Open the full record for ' + c.id}
                        class="{ring} flex h-11 w-11 items-center justify-center motion-safe:transition-colors motion-reduce:transition-none"
                        style="{ringStyle}; color:{brand.neutralColor};"
                      >
                        <Icon name="ChevronRight" class="h-4 w-4" aria-hidden="true" />
                      </button>
                    </span>
                  </TD>
                </TR>
              {/each}
            </TBody>
          </Table>
        </div>
      {/if}
    </section>

    {#if flash}
      <div
        class="mt-6 flex items-start gap-3 border px-4 py-3 motion-safe:transition-opacity motion-reduce:transition-none"
        role="status"
        style="border-radius:{brand.radius}; border-color:{flash.tone === 'success' ? 'rgba(143,174,139,0.4)' : 'rgba(201,143,130,0.4)'}; background-color:{surface};"
      >
        <Icon name={flash.tone === 'success' ? 'CheckCircle' : 'AlertCircle'} class="mt-0.5 h-4 w-4 shrink-0" style="color:{flash.tone === 'success' ? brand.accentColor : danger};" aria-hidden="true" />
        <p class="flex-1 text-sm leading-relaxed" style="color:{brand.primaryColor};">{flash.text}</p>
      </div>
    {/if}

    <!-- Row 4 — selected claim + receipt -->
    <div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
      <Card
        data-wf="b-3-0"
        class="border lg:col-span-7"
        style="border-color:{hairline}; background-color:{surface}; border-radius:{brand.radius};"
      >
        {#if selected}
          <CardHeader class="border-b px-6 py-5" style="border-color:{hairlineSoft};">
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle class="text-[26px] leading-none" style="font-family:{brand.fontHeading}; color:{brand.accentColor}; font-variant-numeric: tabular-nums;">
                  {selected.id}
                </CardTitle>
                <CardDescription class="mt-2 text-sm" style="color:{brand.neutralColor};">
                  {selected.employee} · {selected.email}
                </CardDescription>
              </div>
              <Button
                onclick={() => navigate('claim-detail')}
                class="{ring} min-h-[44px] border px-3 text-xs uppercase tracking-[0.12em]"
                style="{ringStyle}; background-color:transparent; border-color:{hairline}; color:{brand.primaryColor}; border-radius:{brand.radius};"
              >
                Full record
                <Icon name="ArrowRight" class="ml-2 h-3.5 w-3.5" aria-hidden="true" />
              </Button>
            </div>
          </CardHeader>

          <CardContent class="px-6 py-6">
            <div class="flex flex-wrap items-end gap-x-10 gap-y-6">
              <div>
                <p class="text-[11px] uppercase tracking-[0.16em]" style="color:{brand.neutralColor};">Amount claimed</p>
                <p class="mt-1 text-[36px] leading-none" style="font-family:{brand.fontHeading}; color:{brand.accentColor}; font-variant-numeric: tabular-nums;">
                  {inr(selected.amount)}
                </p>
              </div>
              <dl class="grid flex-1 grid-cols-2 gap-x-8 gap-y-4 text-sm sm:grid-cols-3">
                <div>
                  <dt class="text-[11px] uppercase tracking-[0.16em]" style="color:{brand.neutralColor};">Expense date</dt>
                  <dd class="mt-1" style="color:{brand.primaryColor}; font-variant-numeric: tabular-nums;">{selected.expense_date}</dd>
                </div>
                <div>
                  <dt class="text-[11px] uppercase tracking-[0.16em]" style="color:{brand.neutralColor};">Category</dt>
                  <dd class="mt-1" style="color:{brand.primaryColor};">{selected.category}</dd>
                </div>
                <div>
                  <dt class="text-[11px] uppercase tracking-[0.16em]" style="color:{brand.neutralColor};">Submitted</dt>
                  <dd class="mt-1" style="color:{brand.primaryColor}; font-variant-numeric: tabular-nums;">{selected.submitted} {selected.submitted_time}</dd>
                </div>
              </dl>
            </div>

            {#if selected.over_limit}
              <p class="mt-5 flex items-start gap-2 border px-3 py-2.5 text-sm" style="border-radius:{brand.radius}; border-color:rgba(201,166,107,0.4); color:{warn};">
                <Icon name="AlertCircle" class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Over limit — {selected.category} is capped at {inr(selected.limit)} per claim. This is {inr(selected.amount - selected.limit)} above it.</span>
              </p>
            {:else if selected.limit}
              <p class="mt-5 flex items-center gap-2 text-sm" style="color:{brand.neutralColor};">
                <Icon name="Check" class="h-4 w-4" style="color:{brand.accentColor};" aria-hidden="true" />
                Within the {inr(selected.limit)} cap for {selected.category}.
              </p>
            {:else}
              <p class="mt-5 flex items-center gap-2 text-sm" style="color:{brand.neutralColor};">
                <Icon name="Check" class="h-4 w-4" style="color:{brand.accentColor};" aria-hidden="true" />
                No limit is configured for {selected.category}, so no policy check applied.
              </p>
            {/if}

            <blockquote class="mt-6 border-l pl-4 text-[17px] italic leading-relaxed" style="border-color:{brand.accentColor}; font-family:{brand.fontHeading}; color:{brand.primaryColor};">
              “{selected.description}”
            </blockquote>

            <div class="mt-6 flex items-center gap-3 text-xs" aria-label="Approval stage">
              {#each stages as s, i}
                {#if i > 0}
                  <span class="h-px w-6" style="background-color:{hairline};" aria-hidden="true"></span>
                {/if}
                <span class="inline-flex items-center gap-1.5 uppercase tracking-[0.12em]" style="color:{s.done ? brand.accentColor : brand.neutralColor};">
                  <Icon name={s.done ? 'CheckCircle' : 'Clock'} class="h-3.5 w-3.5" aria-hidden="true" />
                  {s.name}{s.done ? '' : ' — pending'}
                </span>
              {/each}
            </div>
          </CardContent>
        {:else}
          <CardContent class="px-6 py-14 text-center">
            <h2 class="text-[22px]" style="font-family:{brand.fontHeading}; color:{brand.primaryColor};">No claim open</h2>
            <p class="mx-auto mt-2 max-w-[46ch] text-sm leading-relaxed" style="color:{brand.neutralColor};">
              This queue is empty, so there is nothing to read. Switch to another queue above, or look through every claim on record.
            </p>
          </CardContent>
        {/if}
      </Card>

      <Card
        data-wf="b-3-1"
        class="border lg:col-span-5"
        style="border-color:{hairline}; background-color:{surface}; border-radius:{brand.radius};"
      >
        <CardContent class="flex h-full flex-col px-6 py-6">
          <h2 class="text-[11px] uppercase tracking-[0.16em]" style="color:{brand.neutralColor};">Receipt attached</h2>
          {#if selected}
            <div class="mt-4 flex flex-1 items-center justify-center py-2">
              <svg viewBox="0 0 220 270" class="h-[230px] w-auto" role="img" aria-label={'Receipt image preview for ' + selected.receipt.file_name}>
                <path
                  d="M20 16 H200 V236 L190 248 L180 236 L170 248 L160 236 L150 248 L140 236 L130 248 L120 236 L110 248 L100 236 L90 248 L80 236 L70 248 L60 236 L50 248 L40 236 L30 248 L20 236 Z"
                  fill="rgba(255,255,255,0.055)" stroke={hairline} stroke-width="1" />
                <line x1="38" y1="48" x2="182" y2="48" stroke={brand.accentColor} stroke-width="1" />
                <rect x="38" y="62" width="96" height="7" rx="1" fill="rgba(233,237,233,0.4)" />
                <rect x="38" y="80" width="62" height="5" rx="1" fill="rgba(233,237,233,0.2)" />
                <rect x="38" y="104" width="110" height="5" rx="1" fill="rgba(233,237,233,0.2)" />
                <rect x="162" y="104" width="20" height="5" rx="1" fill="rgba(233,237,233,0.28)" />
                <rect x="38" y="122" width="88" height="5" rx="1" fill="rgba(233,237,233,0.2)" />
                <rect x="158" y="122" width="24" height="5" rx="1" fill="rgba(233,237,233,0.28)" />
                <rect x="38" y="140" width="100" height="5" rx="1" fill="rgba(233,237,233,0.2)" />
                <rect x="166" y="140" width="16" height="5" rx="1" fill="rgba(233,237,233,0.28)" />
                <line x1="38" y1="162" x2="182" y2="162" stroke={hairline} stroke-width="1" stroke-dasharray="3 4" />
                <rect x="38" y="176" width="52" height="9" rx="1" fill="rgba(143,174,139,0.55)" />
                <rect x="140" y="176" width="42" height="9" rx="1" fill="rgba(143,174,139,0.55)" />
                <rect x="38" y="202" width="144" height="4" rx="1" fill="rgba(233,237,233,0.12)" />
                <rect x="38" y="212" width="120" height="4" rx="1" fill="rgba(233,237,233,0.12)" />
              </svg>
            </div>
            <Separator class="my-4" style="background-color:{hairlineSoft};" />
            <p class="text-sm" style="color:{brand.primaryColor};">{selected.receipt.file_name}</p>
            <p class="mt-1.5 text-xs leading-relaxed" style="color:{brand.neutralColor}; font-variant-numeric: tabular-nums;">
              {selected.receipt.content_type} · {selected.receipt.size} · uploaded {selected.receipt.uploaded} · 1 of 1
            </p>
          {:else}
            <div class="flex flex-1 flex-col items-center justify-center py-10 text-center">
              <Icon name="FileText" class="h-6 w-6" style="color:{brand.neutralColor};" aria-hidden="true" />
              <p class="mt-3 max-w-[32ch] text-sm leading-relaxed" style="color:{brand.neutralColor};">
                A receipt appears here once a claim is open for review.
              </p>
            </div>
          {/if}
        </CardContent>
      </Card>
    </div>

    <!-- Row 5 — comment / rejection reason -->
    <div data-wf="b-4-0" class="mt-6">
      <Label for="decision-comment" class="text-[11px] uppercase tracking-[0.16em]" style="color:{brand.neutralColor};">
        Comment / rejection reason
      </Label>
      <p id="decision-comment-help" class="mt-1.5 text-sm" style="color:{brand.neutralColor};">
        Required to reject; optional on an approval. Whatever you write is kept on the claim's audit trail and emailed to {selected ? selected.employee.split(' ')[0] : 'the employee'}.
      </p>
      <Textarea
        id="decision-comment"
        bind:value={comment}
        rows="3"
        disabled={!selected}
        aria-describedby={formError ? 'decision-comment-help decision-comment-error' : 'decision-comment-help'}
        aria-invalid={formError ? 'true' : undefined}
        placeholder="e.g. Hotel is above the Travel cap — please split the taxi and the room into two claims."
        class="{ring} mt-3 w-full border px-3 py-3 text-sm leading-relaxed disabled:opacity-50"
        style="{ringStyle}; border-color:{formError ? danger : hairline}; background-color:{surface}; color:{brand.primaryColor}; border-radius:{brand.radius};"
      />
      {#if formError}
        <p id="decision-comment-error" class="mt-2 flex items-start gap-2 text-sm" style="color:{danger};">
          <Icon name="AlertCircle" class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {formError}
        </p>
      {/if}
    </div>

    <!-- Row 6 — decisions -->
    <div class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-12">
      <Button
        data-wf="b-5-0"
        onclick={approve}
        disabled={!canApprove}
        class="{ring} min-h-[48px] w-full px-4 text-sm font-medium motion-safe:transition-opacity motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-40 sm:col-span-3"
        style="{ringStyle}; background-color:{brand.accentColor}; color:{brand.backgroundColor}; border-radius:{brand.radius};"
      >
        <Icon name="Check" class="mr-2 h-4 w-4" aria-hidden="true" />
        Approve
      </Button>
      <Button
        data-wf="b-5-1"
        onclick={reject}
        disabled={!canReject}
        class="{ring} min-h-[48px] w-full border px-4 text-sm motion-safe:transition-colors motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-40 sm:col-span-3"
        style="{ringStyle}; background-color:transparent; border-color:rgba(201,143,130,0.45); color:{danger}; border-radius:{brand.radius};"
      >
        <Icon name="X" class="mr-2 h-4 w-4" aria-hidden="true" />
        Reject
      </Button>
      <Button
        data-wf="b-5-2"
        onclick={reimburse}
        disabled={!canReimburse}
        class="{ring} min-h-[48px] w-full border px-4 text-sm motion-safe:transition-colors motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-40 sm:col-span-4"
        style="{ringStyle}; background-color:transparent; border-color:{hairline}; color:{brand.primaryColor}; border-radius:{brand.radius};"
      >
        <Icon name="CheckCircle" class="mr-2 h-4 w-4" aria-hidden="true" />
        Mark as reimbursed
      </Button>
    </div>

    <p class="mt-3 max-w-[72ch] text-xs leading-relaxed" style="color:{brand.neutralColor};">
      {#if !selected}
        Decisions open up once a claim from this queue is selected.
      {:else if selected.status === 'pending_manager'}
        As the approving manager you move this to Finance or send it back. Reimbursement is recorded by Finance only, after final approval.
      {:else if selected.status === 'pending_finance'}
        Final Finance review. Approving makes {selected.id} eligible for reimbursement; reimbursement is then recorded separately.
      {:else}
        {selected.id} has cleared both stages, so approve and reject are closed. Marking it reimbursed records the payment — nothing is transferred from this app.
      {/if}
    </p>

    <!-- Row 7 — audit trail -->
    <section data-wf="b-6-0" class="mt-10">
      <h2 class="text-[22px]" style="font-family:{brand.fontHeading}; color:{brand.primaryColor};">
        Audit trail{selected ? ' for ' + selected.id : ''}
      </h2>
      <p class="mt-1.5 text-sm" style="color:{brand.neutralColor};">
        Every status change, with who made it and when. Entries cannot be edited or removed.
      </p>

      <div class="mt-4 border" style="border-color:{hairline}; background-color:{surface}; border-radius:{brand.radius};">
        {#if selected}
          <ol class="divide-y" style="border-color:{hairlineSoft};">
            {#each selected.audit as entry, i (entry.at + entry.action + i)}
              <li
                class="flex flex-col gap-1.5 px-5 py-4 motion-safe:transition-all motion-safe:duration-500 motion-reduce:transition-none sm:flex-row sm:items-baseline sm:gap-5"
                style="opacity:{i === selected.audit.length - 1 && !auditIn ? '0' : '1'}; transform:translateY({i === selected.audit.length - 1 && !auditIn ? '6px' : '0'});"
              >
                <span class="shrink-0 text-xs" style="color:{brand.neutralColor}; font-variant-numeric: tabular-nums;">{entry.at}</span>
                <span class="flex-1">
                  <span class="text-sm" style="color:{brand.primaryColor};">
                    {entry.actor}
                    <span style="color:{brand.neutralColor};"> · </span>
                    <span style="color:{entry.action === 'Rejected' ? danger : brand.accentColor};">{entry.action}</span>
                    <span style="color:{brand.neutralColor};"> · {entry.from} → {entry.to}</span>
                  </span>
                  {#if entry.comment}
                    <span class="mt-1.5 block text-sm italic leading-relaxed" style="font-family:{brand.fontHeading}; color:{brand.neutralColor};">“{entry.comment}”</span>
                  {/if}
                </span>
              </li>
            {/each}
          </ol>
        {:else}
          <p class="px-5 py-8 text-sm" style="color:{brand.neutralColor};">
            Open a claim to read its history. Audit entries stay on the claim for seven years, whichever queue it ends up in.
          </p>
        {/if}
      </div>
    </section>
  </div>
</div>
