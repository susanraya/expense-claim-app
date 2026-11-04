<script>
  /* eslint-disable @typescript-eslint/no-unused-vars -- generated imports, matched generously */
  import { Avatar, Badge, Button, Checkbox, Empty, Icon, Input, Label, Select, Switch, TBody, TD, TH, THead, TR, Table } from "@/lib/ui";
  import { brand } from "@/lib/brand";

  /* ---------- surface tokens (derived from brand roles) ---------- */
  const accent = brand.accentColor;
  const ink = brand.primaryColor;
  const muted = brand.neutralColor;
  const canvas = brand.backgroundColor;
  const surface = '#1b2823';
  const surfaceDeep = '#15201b';
  const hair = 'rgba(233, 237, 233, 0.11)';
  const hairSoft = 'rgba(233, 237, 233, 0.07)';
  const r = brand.radius;

  const fieldStyle = `background-color:${surfaceDeep}; border:1px solid ${hair}; color:${ink}; border-radius:${r};`;
  const panelStyle = `background-color:${surface}; border:1px solid ${hair}; border-radius:${r};`;
  const focusCls = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  const focusVars = `--tw-ring-color:${accent}; --tw-ring-offset-color:${canvas};`;
  const rowHover = 'hover:bg-white/[0.035] motion-reduce:transition-none transition-colors duration-200';
  const labelCls = 'text-[11px] font-semibold uppercase tracking-[0.14em]';

  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function fmtDate(iso) {
    const p = iso.split('-');
    return p[2] + ' ' + MONTHS[Number(p[1]) - 1] + ' ' + p[0];
  }
  function fmtINR(n) {
    return '₹' + Number(n).toLocaleString('en-IN');
  }

  /* ---------- session ---------- */
  const currentUserId = 'USR-0124';
  const signedInRole = 'Admin';

  /* ---------- data ---------- */
  let users = $state([
    { id: 'USR-0107', full_name: 'Kavita Iyer', email: 'kavita.iyer@quorq.ai', role: 'Finance', manager_id: null, is_active: true, created_at: '2025-02-03' },
    { id: 'USR-0112', full_name: 'Rohit Mehra', email: 'rohit.mehra@quorq.ai', role: 'Manager', manager_id: 'USR-0107', is_active: true, created_at: '2025-02-17' },
    { id: 'USR-0118', full_name: 'Deepak Rao', email: 'deepak.rao@quorq.ai', role: 'Manager', manager_id: 'USR-0107', is_active: true, created_at: '2025-03-04' },
    { id: 'USR-0124', full_name: 'Susan Raya', email: 'susan.raya@quorq.ai', role: 'Admin', manager_id: null, is_active: true, created_at: '2025-03-21' },
    { id: 'USR-0131', full_name: 'Anita Desai', email: 'anita.desai@quorq.ai', role: 'Employee', manager_id: 'USR-0112', is_active: true, created_at: '2025-05-09' },
    { id: 'USR-0136', full_name: 'Farhan Qureshi', email: 'farhan.qureshi@quorq.ai', role: 'Employee', manager_id: 'USR-0118', is_active: true, created_at: '2025-06-18' },
    { id: 'USR-0140', full_name: 'Priya Nair', email: 'priya.nair@quorq.ai', role: 'Employee', manager_id: null, is_active: true, created_at: '2025-08-26' },
    { id: 'USR-0143', full_name: 'Arjun Pillai', email: 'arjun.pillai@quorq.ai', role: 'Employee', manager_id: 'USR-0112', is_active: true, created_at: '2025-09-15' },
    { id: 'USR-0147', full_name: 'Meera Krishnan', email: 'meera.krishnan@quorq.ai', role: 'Employee', manager_id: 'USR-0118', is_active: false, created_at: '2025-10-02' },
    { id: 'USR-0151', full_name: 'Vikram Shetty', email: 'vikram.shetty@quorq.ai', role: 'Employee', manager_id: 'USR-0112', is_active: false, created_at: '2025-10-28' }
  ]);

  let categories = $state([
    { id: 'CAT-01', name: 'Domestic Air Travel', limit_amount: 25000, is_active: true, created_at: '2025-02-05' },
    { id: 'CAT-02', name: 'Local Conveyance', limit_amount: 1500, is_active: true, created_at: '2025-02-05' },
    { id: 'CAT-03', name: 'Hotel & Lodging', limit_amount: 8000, is_active: true, created_at: '2025-02-05' },
    { id: 'CAT-04', name: 'Meals & Entertainment', limit_amount: 2500, is_active: true, created_at: '2025-03-11' },
    { id: 'CAT-05', name: 'Office Supplies', limit_amount: null, is_active: true, created_at: '2025-04-02' },
    { id: 'CAT-06', name: 'Mobile & Internet', limit_amount: 1200, is_active: true, created_at: '2025-06-23' },
    { id: 'CAT-07', name: 'Client Gifting', limit_amount: 5000, is_active: false, created_at: '2025-07-30' },
    { id: 'CAT-08', name: 'Training & Certification', limit_amount: null, is_active: true, created_at: '2025-09-08' }
  ]);

  /* categories approved on the FY26 expense policy but not yet in the list */
  const categoryBacklog = [
    { name: 'Parking & Tolls', limit_amount: 800 },
    { name: 'Visa & Immigration Fees', limit_amount: 7500 },
    { name: 'Team Offsite', limit_amount: null }
  ];
  let backlogIndex = $state(0);
  let addingCategory = $state(false);

  /* claims already filed per employee — shown when deactivating */
  const claimCounts = {
    'USR-0131': 14, 'USR-0136': 9, 'USR-0140': 3, 'USR-0143': 11,
    'USR-0147': 22, 'USR-0151': 6, 'USR-0112': 2, 'USR-0118': 1
  };

  /* ---------- screen state ---------- */
  let tab = $state('users');
  let userQuery = $state('');
  let highlightId = $state(null);
  let toast = $state(null);
  let saving = $state(false);
  let timers = [];

  $effect(() => () => timers.forEach(clearTimeout));

  /* user dialog */
  let userModalOpen = $state(false);
  let userModalIn = $state(false);
  let editingUserId = $state(null);
  let confirmDeactivate = $state(false);
  let uForm = $state({ full_name: '', email: '', role: 'Employee', manager_id: '', is_active: true });
  let uErrors = $state({});

  const roleOptions = [
    { value: 'Employee', label: 'Employee' },
    { value: 'Manager', label: 'Manager' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Admin', label: 'Admin' }
  ];

  const managers = $derived(users.filter((u) => u.role === 'Manager' && u.is_active));
  const managerOptions = $derived([
    { value: '', label: 'Not assigned' },
    ...managers.map((m) => ({ value: m.id, label: m.full_name + ' · ' + m.email }))
  ]);

  const filteredUsers = $derived(
    users.filter((u) => {
      const q = userQuery.trim().toLowerCase();
      if (!q) return true;
      return u.full_name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    })
  );
  const activeCount = $derived(users.filter((u) => u.is_active).length);
  const editingUser = $derived(users.find((u) => u.id === editingUserId) || null);
  const noApproverWarning = $derived(uForm.role === 'Employee' && !uForm.manager_id);
  const isDeactivating = $derived(!!editingUser && editingUser.is_active && !uForm.is_active);
  const editingSelf = $derived(editingUserId === currentUserId);
  const backlogEmpty = $derived(backlogIndex >= categoryBacklog.length);

  function managerName(id) {
    const m = users.find((u) => u.id === id);
    return m ? m.full_name : null;
  }
  function initials(name) {
    return name.split(' ').map((p) => p[0]).join('').slice(0, 2);
  }
  function flash(id, message) {
    toast = { message, id: Math.random() };
    highlightId = id;
    timers.push(setTimeout(() => { if (highlightId === id) highlightId = null; }, 2400));
    timers.push(setTimeout(() => { toast = null; }, 6000));
  }

  /* ---------- user dialog handlers ---------- */
  function openAddUser() {
    editingUserId = null;
    uForm = { full_name: '', email: '', role: 'Employee', manager_id: '', is_active: true };
    uErrors = {};
    confirmDeactivate = false;
    userModalOpen = true;
  }
  function openEditUser(u) {
    editingUserId = u.id;
    uForm = { full_name: u.full_name, email: u.email, role: u.role, manager_id: u.manager_id || '', is_active: u.is_active };
    uErrors = {};
    confirmDeactivate = false;
    userModalOpen = true;
  }
  function closeUserModal() {
    userModalOpen = false;
    saving = false;
  }
  function saveUser(e) {
    e.preventDefault();
    const errs = {};
    const name = uForm.full_name.trim();
    const email = uForm.email.trim().toLowerCase();
    if (!name) errs.full_name = 'Enter the full name as it should appear on claims.';
    if (!email) errs.email = 'A work email is needed — it is how this person signs in.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'That address is missing an @ or a domain.';
    else if (users.some((u) => u.email === email && u.id !== editingUserId)) errs.email = 'Another account already uses this address.';
    if (isDeactivating && !confirmDeactivate) errs.confirm = 'Tick the box to confirm this account loses access.';
    uErrors = errs;
    if (Object.keys(errs).length) return;

    saving = true;
    timers.push(setTimeout(() => {
      if (editingUserId) {
        const id = editingUserId;
        users = users.map((u) =>
          u.id === id ? { ...u, full_name: name, email, role: uForm.role, manager_id: uForm.manager_id || null, is_active: uForm.is_active } : u
        );
        const approver = managerName(uForm.manager_id);
        flash(id, name + ' saved — ' + uForm.role + (approver ? ', approved by ' + approver : '') + (uForm.is_active ? '.' : '. Sign-in is now blocked.'));
      } else {
        const next = Math.max(...users.map((u) => parseInt(u.id.slice(4), 10))) + 3;
        const id = 'USR-' + String(next).padStart(4, '0');
        users = [
          ...users,
          { id, full_name: name, email, role: uForm.role, manager_id: uForm.manager_id || null, is_active: uForm.is_active, created_at: '2026-11-05' }
        ];
        flash(id, name + ' added as ' + uForm.role + '. They can sign in with this email.');
      }
      saving = false;
      userModalOpen = false;
    }, 600));
  }

  /* ---------- category handler ---------- */
  function addCategory() {
    if (backlogEmpty || addingCategory) return;
    addingCategory = true;
    timers.push(setTimeout(() => {
      const item = categoryBacklog[backlogIndex];
      const next = Math.max(...categories.map((c) => parseInt(c.id.slice(4), 10))) + 1;
      const id = 'CAT-' + String(next).padStart(2, '0');
      categories = [...categories, { id, name: item.name, limit_amount: item.limit_amount, is_active: true, created_at: '2026-11-05' }];
      backlogIndex += 1;
      addingCategory = false;
      flash(id, item.name + ' added — ' + (item.limit_amount === null ? 'no per-claim limit.' : 'limit ' + fmtINR(item.limit_amount) + ' per claim.'));
    }, 500));
  }

  /* ---------- dialog entrance + focus ---------- */
  $effect(() => {
    if (userModalOpen) {
      const f = requestAnimationFrame(() => {
        userModalIn = true;
        const el = typeof document !== 'undefined' ? document.getElementById('user-full-name') : null;
        if (el) el.focus();
      });
      return () => cancelAnimationFrame(f);
    }
    userModalIn = false;
  });

  function onKeydown(e) {
    if (e.key === 'Escape') {
      if (userModalOpen) closeUserModal();
    }
  }
</script>

<svelte:window onkeydown={onKeydown} />

<div class="min-h-full" style="background-color:{canvas}; color:{ink}; font-family:{brand.fontBody};">
  <div class="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8 sm:py-12">

    {#if signedInRole !== 'Admin'}
      <!-- permission-denied state (AC-009) -->
      <section class="p-8" style={panelStyle}>
        <h1 class="text-3xl" style="font-family:{brand.fontHeading};">Administration</h1>
        <p class="mt-4 max-w-prose text-sm leading-6" style="color:{muted};">
          User accounts and expense categories are managed by Admins only. Ask Susan Raya (susan.raya@quorq.ai) to make the change,
          or to grant you the Admin role.
        </p>
      </section>
    {:else}

      <!-- b-0-0 page title -->
      <header data-wf="b-0-0">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p class="{labelCls}" style="color:{accent};">Quorq Expenses · Configuration</p>
            <h1 class="mt-3 text-[34px] leading-tight sm:text-[40px]" style="font-family:{brand.fontHeading};">Administration</h1>
            <p class="mt-3 max-w-[62ch] text-sm leading-6" style="color:{muted};">
              Accounts, roles and approving managers for the people who file claims — and the category list those claims are filed against.
            </p>
          </div>
          <p class="flex items-center gap-2 pb-1 text-xs" style="color:{muted};">
            <Icon name="Clock" class="h-3.5 w-3.5" aria-hidden="true" />
            <span>Directory synced 09:42 IST</span>
          </p>
        </div>
        <div class="mt-6 flex" aria-hidden="true">
          <span class="block h-px w-20" style="background-color:{accent};"></span>
          <span class="block h-px flex-1" style="background-color:{hair};"></span>
        </div>
      </header>

      <!-- b-1-0 tabs -->
      <div data-wf="b-1-0" class="mt-8">
        <div role="tablist" aria-label="Administration sections" class="flex gap-8 border-b" style="border-color:{hair};">
          <button
            data-wf="i-1-0-0"
            role="tab"
            id="tab-users"
            type="button"
            aria-selected={tab === 'users'}
            aria-controls="panel-users"
            tabindex={tab === 'users' ? 0 : -1}
            class="-mb-px border-b pb-3 text-sm transition-colors duration-200 motion-reduce:transition-none {focusCls}"
            style="{focusVars} border-color:{tab === 'users' ? accent : 'transparent'}; color:{tab === 'users' ? ink : muted}; font-weight:{tab === 'users' ? 600 : 400};"
            onclick={() => (tab = 'users')}
          >Users</button>
          <button
            data-wf="i-1-0-1"
            role="tab"
            id="tab-categories"
            type="button"
            aria-selected={tab === 'categories'}
            aria-controls="panel-categories"
            tabindex={tab === 'categories' ? 0 : -1}
            class="-mb-px border-b pb-3 text-sm transition-colors duration-200 motion-reduce:transition-none {focusCls}"
            style="{focusVars} border-color:{tab === 'categories' ? accent : 'transparent'}; color:{tab === 'categories' ? ink : muted}; font-weight:{tab === 'categories' ? 600 : 400};"
            onclick={() => (tab = 'categories')}
          >Expense categories</button>
        </div>
      </div>

      {#if tab === 'users'}
        <section id="panel-users" role="tabpanel" aria-labelledby="tab-users" tabindex="-1" class="mt-8 focus:outline-none">
          <h2 class="sr-only">User accounts</h2>

          <div class="grid grid-cols-12 items-end gap-4">
            <!-- b-2-0 search -->
            <div data-wf="b-2-0" class="col-span-12 sm:col-span-8">
              <Label for="user-search" class={labelCls} style="color:{muted};">Search users</Label>
              <div class="relative mt-2">
                <Icon name="Search" class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style="color:{muted};" aria-hidden="true" />
                <Input id="user-search" type="search" bind:value={userQuery} placeholder="Search users by name or email"
                  class="h-11 w-full pl-10 pr-3 text-sm {focusCls}" style="{fieldStyle} {focusVars}" />
              </div>
            </div>
            <!-- b-2-1 add user -->
            <div class="col-span-12 flex sm:col-span-4 sm:justify-end">
              <Button data-wf="b-2-1" onclick={openAddUser}
                class="inline-flex h-11 w-full items-center justify-center gap-2 px-5 text-sm font-semibold transition-opacity duration-200 hover:opacity-90 motion-reduce:transition-none sm:w-auto {focusCls}"
                style="{focusVars} background-color:{accent}; color:{canvas}; border-radius:{r};">
                <Icon name="Plus" class="h-4 w-4" aria-hidden="true" />
                Add user
              </Button>
            </div>
          </div>

          <p class="mt-5 text-xs" style="color:{muted}; font-variant-numeric: tabular-nums;">
            {filteredUsers.length} of {users.length} accounts shown · {activeCount} active · {users.length - activeCount} deactivated
          </p>

          <!-- b-3-0 users table -->
          <div data-wf="b-3-0" class="mt-4 overflow-hidden" style={panelStyle}>
            {#if filteredUsers.length === 0}
              <div class="px-6 py-14">
                <Empty title="No account matches “{userQuery}”" description="Try part of a first name, or the email domain — accounts here include employees, managers, finance and admins.">
                  {#snippet action()}
                    <Button onclick={() => (userQuery = '')}
                      class="inline-flex h-10 items-center gap-2 px-4 text-sm {focusCls}"
                      style="{focusVars} background-color:transparent; border:1px solid {hair}; color:{ink}; border-radius:{r};">
                      <Icon name="X" class="h-4 w-4" aria-hidden="true" />
                      Clear search
                    </Button>
                  {/snippet}
                </Empty>
              </div>
            {:else}
              <div class="overflow-x-auto">
                <Table class="w-full text-sm" style="font-variant-numeric: tabular-nums;">
                  <THead>
                    <TR style="border-bottom:1px solid {hair};">
                      <TH data-wf="i-3-0-0" class="px-5 py-3 text-left {labelCls}" style="color:{muted};">Full name</TH>
                      <TH data-wf="i-3-0-1" class="px-5 py-3 text-left {labelCls}" style="color:{muted};">Email</TH>
                      <TH data-wf="i-3-0-2" class="px-5 py-3 text-left {labelCls}" style="color:{muted};">Role</TH>
                      <TH data-wf="i-3-0-3" class="px-5 py-3 text-left {labelCls}" style="color:{muted};">Approving manager</TH>
                      <TH data-wf="i-3-0-4" class="px-5 py-3 text-left {labelCls}" style="color:{muted};">Active</TH>
                      <TH data-wf="i-3-0-5" class="px-5 py-3 text-left {labelCls}" style="color:{muted};">Created</TH>
                      <TH class="px-5 py-3 text-right {labelCls}" style="color:{muted};"><span class="sr-only">Actions</span></TH>
                    </TR>
                  </THead>
                  <TBody>
                    {#each filteredUsers as u (u.id)}
                      <TR class={rowHover} style="border-bottom:1px solid {hairSoft}; background-color:{highlightId === u.id ? 'rgba(143,174,139,0.12)' : 'transparent'};">
                        <TD class="px-5 py-4 align-middle">
                          <div class="flex items-center gap-3">
                            <Avatar name={u.full_name} class="h-8 w-8 shrink-0 text-[11px]" />
                            <div class="min-w-0">
                              <p class="truncate font-medium" style="color:{u.is_active ? ink : muted};">
                                {u.full_name}{#if u.id === currentUserId}<span class="ml-2 text-[11px]" style="color:{muted};">(you)</span>{/if}
                              </p>
                              <p class="text-[11px] tracking-[0.08em]" style="color:{accent};">{u.id}</p>
                            </div>
                          </div>
                        </TD>
                        <TD class="px-5 py-4 align-middle" style="color:{muted};">{u.email}</TD>
                        <TD class="px-5 py-4 align-middle">
                          <Badge class="inline-flex items-center px-2.5 py-1 text-[11px] font-medium tracking-wide"
                            style="background-color:rgba(233,237,233,0.05); border:1px solid {u.role === 'Admin' || u.role === 'Finance' ? 'rgba(143,174,139,0.45)' : hair}; color:{ink}; border-radius:{r};">
                            {u.role}
                          </Badge>
                        </TD>
                        <TD class="px-5 py-4 align-middle">
                          {#if u.manager_id}
                            <span style="color:{ink};">{managerName(u.manager_id)}</span>
                          {:else if u.role === 'Employee'}
                            <span class="inline-flex items-center gap-1.5" style="color:{muted};">
                              <Icon name="AlertCircle" class="h-3.5 w-3.5" aria-hidden="true" />
                              Not assigned
                            </span>
                          {:else}
                            <span style="color:{muted};">—</span>
                          {/if}
                        </TD>
                        <TD class="px-5 py-4 align-middle">
                          {#if u.is_active}
                            <span class="inline-flex items-center gap-1.5" style="color:{accent};">
                              <Icon name="CheckCircle" class="h-3.5 w-3.5" aria-hidden="true" />Active
                            </span>
                          {:else}
                            <span class="inline-flex items-center gap-1.5" style="color:{muted};">
                              <Icon name="X" class="h-3.5 w-3.5" aria-hidden="true" />Deactivated
                            </span>
                          {/if}
                        </TD>
                        <TD class="px-5 py-4 align-middle" style="color:{muted};">{fmtDate(u.created_at)}</TD>
                        <TD class="px-5 py-4 text-right align-middle">
                          <Button onclick={() => openEditUser(u)}
                            class="inline-flex h-9 items-center gap-2 px-3 text-xs transition-colors duration-200 hover:bg-white/[0.05] motion-reduce:transition-none {focusCls}"
                            style="{focusVars} background-color:transparent; border:1px solid {hair}; color:{ink}; border-radius:{r};">
                            <Icon name="Edit" class="h-3.5 w-3.5" aria-hidden="true" />
                            Edit<span class="sr-only"> {u.full_name}</span>
                          </Button>
                        </TD>
                      </TR>
                    {/each}
                  </TBody>
                </Table>
              </div>
            {/if}
          </div>

          <p class="mt-4 max-w-[76ch] text-xs leading-5" style="color:{muted};">
            Deactivating an account blocks sign-in and keeps every claim that person already filed.
          </p>
        </section>

        <!-- b-4-0 user dialog -->
        {#if userModalOpen}
          <div class="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-8" style="background-color:rgba(8,14,11,0.74);">
            <div
              data-wf="b-4-0"
              role="dialog"
              aria-modal="true"
              aria-labelledby="user-modal-title"
              class="mx-auto w-full max-w-3xl transition-all duration-200 motion-reduce:transition-none {userModalIn ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}"
              style="background-color:{surface}; border:1px solid {hair}; border-radius:{r}; box-shadow:0 24px 60px rgba(0,0,0,0.45);"
            >
              <div class="flex items-start justify-between gap-6 px-7 pt-7">
                <div>
                  <p class="{labelCls}" style="color:{accent};">{editingUser ? 'User account · ' + editingUser.id : 'New user account'}</p>
                  <h2 id="user-modal-title" class="mt-2 text-2xl" style="font-family:{brand.fontHeading};">
                    {editingUser ? 'Edit user — ' + editingUser.full_name : 'Add user'}
                  </h2>
                </div>
              </div>

              <div class="mt-6 h-px w-full" style="background-color:{hair};"></div>

              <form data-wf="b-5-0" onsubmit={saveUser} class="grid grid-cols-12 gap-7 px-7 py-7" novalidate>
                <div class="col-span-12 lg:col-span-9">
                  {#if Object.keys(uErrors).length > 0}
                    <div role="alert" class="mb-6 flex gap-3 px-4 py-3" style="background-color:rgba(233,237,233,0.04); border:1px solid rgba(143,174,139,0.45); border-radius:{r};">
                      <Icon name="AlertCircle" class="mt-0.5 h-4 w-4 shrink-0" style="color:{accent};" aria-hidden="true" />
                      <p class="text-sm leading-6" style="color:{ink};">
                        This account was not saved — {Object.keys(uErrors).length === 1 ? 'one field needs' : Object.keys(uErrors).length + ' fields need'} a correction. Everything you typed is still here.
                      </p>
                    </div>
                  {/if}

                  <div class="grid gap-6 sm:grid-cols-2">
                    <div>
                      <Label for="user-full-name" class={labelCls} style="color:{muted};">Full name</Label>
                      <Input data-wf="i-5-0-0" id="user-full-name" bind:value={uForm.full_name} placeholder="Anita Desai"
                        aria-invalid={uErrors.full_name ? 'true' : 'false'} aria-describedby={uErrors.full_name ? 'err-full-name' : undefined}
                        class="mt-2 h-11 w-full px-3 text-sm {focusCls}" style="{fieldStyle} {focusVars} border-color:{uErrors.full_name ? accent : hair};" />
                      {#if uErrors.full_name}<p id="err-full-name" class="mt-2 text-xs" style="color:{accent};">{uErrors.full_name}</p>{/if}
                    </div>
                    <div>
                      <Label for="user-email" class={labelCls} style="color:{muted};">Email</Label>
                      <Input data-wf="i-5-0-1" id="user-email" type="email" bind:value={uForm.email} placeholder="anita.desai@quorq.ai"
                        aria-invalid={uErrors.email ? 'true' : 'false'} aria-describedby={uErrors.email ? 'err-email' : 'hint-email'}
                        class="mt-2 h-11 w-full px-3 text-sm {focusCls}" style="{fieldStyle} {focusVars} border-color:{uErrors.email ? accent : hair};" />
                      {#if uErrors.email}
                        <p id="err-email" class="mt-2 text-xs" style="color:{accent};">{uErrors.email}</p>
                      {:else}
                        <p id="hint-email" class="mt-2 text-xs" style="color:{muted};">This is the address they sign in with.</p>
                      {/if}
                    </div>
                    <div>
                      <Label for="user-role" class={labelCls} style="color:{muted};">Role</Label>
                      <Select data-wf="i-5-0-2" id="user-role" bind:value={uForm.role} options={roleOptions} disabled={editingSelf}
                        aria-describedby="hint-role"
                        class="mt-2 h-11 w-full px-3 text-sm {focusCls}" style="{fieldStyle} {focusVars} opacity:{editingSelf ? 0.55 : 1};" />
                      <p id="hint-role" class="mt-2 text-xs" style="color:{muted};">
                        {#if editingSelf}
                          You cannot change your own role — ask another Admin.
                        {:else}
                          Employee files claims · Manager approves first · Finance approves and reimburses · Admin configures.
                        {/if}
                      </p>
                    </div>
                    <div>
                      <Label for="user-manager" class={labelCls} style="color:{muted};">Approving manager</Label>
                      <Select data-wf="i-5-0-3" id="user-manager" bind:value={uForm.manager_id} options={managerOptions}
                        aria-describedby="hint-manager"
                        class="mt-2 h-11 w-full px-3 text-sm {focusCls}" style="{fieldStyle} {focusVars}" />
                      <p id="hint-manager" class="mt-2 text-xs" style="color:{muted};">Only active Manager accounts can be first-stage approvers.</p>
                    </div>
                  </div>

                  {#if noApproverWarning}
                    <div class="mt-6 flex gap-3 px-4 py-3" style="background-color:rgba(233,237,233,0.04); border:1px solid {hair}; border-radius:{r};">
                      <Icon name="AlertCircle" class="mt-0.5 h-4 w-4 shrink-0" style="color:{accent};" aria-hidden="true" />
                      <p class="text-xs leading-6" style="color:{ink};">
                        No approver configured. This employee can draft claims but will be blocked at submission until a manager is assigned.
                      </p>
                    </div>
                  {/if}

                  <div class="mt-6 flex items-start justify-between gap-6 px-4 py-4" style="border:1px solid {hair}; border-radius:{r};">
                    <div>
                      <Label for="user-active" class="text-sm font-medium" style="color:{ink};">Account active</Label>
                      <p class="mt-1 max-w-[46ch] text-xs leading-5" style="color:{muted};">
                        {#if uForm.is_active}
                          Can sign in and file claims.
                        {:else}
                          Sign-in blocked. Historical claims stay intact and visible to Finance.
                        {/if}
                      </p>
                    </div>
                    <Switch data-wf="i-5-0-4" id="user-active" bind:checked={uForm.is_active} class={focusCls} style={focusVars} />
                  </div>

                  {#if isDeactivating}
                    <div class="mt-4 px-4 py-4" style="background-color:rgba(233,237,233,0.04); border:1px solid rgba(143,174,139,0.45); border-radius:{r};">
                      <p class="text-sm font-medium" style="color:{ink};">Confirm deactivation</p>
                      <p class="mt-1 text-xs leading-6" style="color:{muted}; font-variant-numeric: tabular-nums;">
                        {editingUser.full_name} loses access immediately. Their {claimCounts[editingUser.id] || 0} filed claims remain in the records.
                      </p>
                      <div class="mt-3 flex items-center gap-3">
                        <Checkbox id="confirm-deactivate" bind:checked={confirmDeactivate} class={focusCls} style={focusVars} />
                        <Label for="confirm-deactivate" class="text-xs" style="color:{ink};">I understand this account can no longer sign in.</Label>
                      </div>
                      {#if uErrors.confirm}<p class="mt-2 text-xs" style="color:{accent};">{uErrors.confirm}</p>{/if}
                    </div>
                  {/if}
                </div>

                <div class="col-span-12 lg:col-span-3">
                  <Button data-wf="b-5-1" type="submit" disabled={saving}
                    class="inline-flex h-11 w-full items-center justify-center gap-2 px-4 text-sm font-semibold transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none {focusCls}"
                    style="{focusVars} background-color:{accent}; color:{canvas}; border-radius:{r};">
                    {#if saving}
                      <Icon name="Clock" class="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                      Saving…
                    {:else}
                      <Icon name="Check" class="h-4 w-4" aria-hidden="true" />
                      Save user
                    {/if}
                  </Button>
                  <Button type="button" onclick={closeUserModal}
                    class="mt-3 inline-flex h-11 w-full items-center justify-center px-4 text-sm transition-colors duration-200 hover:bg-white/[0.05] motion-reduce:transition-none {focusCls}"
                    style="{focusVars} background-color:transparent; border:1px solid {hair}; color:{ink}; border-radius:{r};">
                    Cancel
                  </Button>
                  <p class="mt-4 text-xs leading-5" style="color:{muted};">
                    Changes apply the next time this person signs in.
                  </p>
                </div>
              </form>
            </div>
          </div>
        {/if}
      {:else}
        <section id="panel-categories" role="tabpanel" aria-labelledby="tab-categories" tabindex="-1" class="mt-8 focus:outline-none">
          <div class="grid grid-cols-12 items-end gap-4">
            <div class="col-span-12 sm:col-span-8">
              <h2 class="text-2xl" style="font-family:{brand.fontHeading};">Expense categories</h2>
              <p class="mt-2 text-sm" style="color:{muted}; font-variant-numeric: tabular-nums;">
                {categories.filter((c) => c.is_active).length} selectable on new claims · {categories.filter((c) => c.limit_amount !== null).length} with a per-claim limit
              </p>
            </div>
            <!-- b-6-0 add category -->
            <div class="col-span-12 flex flex-col sm:col-span-4 sm:items-end">
              <Button data-wf="b-6-0" onclick={addCategory} disabled={addingCategory || backlogEmpty}
                class="inline-flex h-11 w-full items-center justify-center gap-2 px-5 text-sm font-semibold transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none sm:w-auto {focusCls}"
                style="{focusVars} background-color:{accent}; color:{canvas}; border-radius:{r};">
                {#if addingCategory}
                  <Icon name="Clock" class="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                  Adding…
                {:else}
                  <Icon name="Plus" class="h-4 w-4" aria-hidden="true" />
                  Add category
                {/if}
              </Button>
              {#if backlogEmpty}
                <p class="mt-2 max-w-[34ch] text-xs leading-5 sm:text-right" style="color:{muted};">
                  Every category on the FY26 expense policy is now in the list.
                </p>
              {:else}
                <p class="mt-2 max-w-[34ch] text-xs leading-5 sm:text-right" style="color:{muted};">
                  Next on the FY26 policy: {categoryBacklog[backlogIndex].name}.
                </p>
              {/if}
            </div>
          </div>

          <!-- b-7-0 categories table -->
          <div data-wf="b-7-0" class="mt-6 overflow-hidden" style={panelStyle}>
            {#if categories.length === 0}
              <div class="px-6 py-14">
                <Empty title="No categories yet" description="Employees cannot file a claim until at least one category exists. Start with the ones you reimburse most — travel, conveyance, meals.">
                  {#snippet action()}
                    <Button onclick={addCategory}
                      class="inline-flex h-10 items-center gap-2 px-4 text-sm font-semibold {focusCls}"
                      style="{focusVars} background-color:{accent}; color:{canvas}; border-radius:{r};">
                      <Icon name="Plus" class="h-4 w-4" aria-hidden="true" />
                      Add the first category
                    </Button>
                  {/snippet}
                </Empty>
              </div>
            {:else}
              <div class="overflow-x-auto">
                <Table class="w-full text-sm" style="font-variant-numeric: tabular-nums;">
                  <THead>
                    <TR style="border-bottom:1px solid {hair};">
                      <TH data-wf="i-7-0-0" class="px-5 py-3 text-left {labelCls}" style="color:{muted};">Name</TH>
                      <TH data-wf="i-7-0-1" class="px-5 py-3 text-right {labelCls}" style="color:{muted};">Per-claim limit (INR)</TH>
                      <TH data-wf="i-7-0-2" class="px-5 py-3 text-left {labelCls}" style="color:{muted};">Active</TH>
                      <TH data-wf="i-7-0-3" class="px-5 py-3 text-left {labelCls}" style="color:{muted};">Created</TH>
                    </TR>
                  </THead>
                  <TBody>
                    {#each categories as c (c.id)}
                      <TR class={rowHover} style="border-bottom:1px solid {hairSoft}; background-color:{highlightId === c.id ? 'rgba(143,174,139,0.12)' : 'transparent'};">
                        <TD class="px-5 py-4 align-middle">
                          <p class="font-medium" style="color:{c.is_active ? ink : muted};">{c.name}</p>
                          <p class="text-[11px] tracking-[0.08em]" style="color:{accent};">{c.id}</p>
                        </TD>
                        <TD class="px-5 py-4 text-right align-middle">
                          {#if c.limit_amount === null}
                            <span style="color:{muted};">No limit</span>
                          {:else}
                            <span class="text-base" style="color:{ink};">{fmtINR(c.limit_amount)}</span>
                          {/if}
                        </TD>
                        <TD class="px-5 py-4 align-middle">
                          {#if c.is_active}
                            <span class="inline-flex items-center gap-1.5" style="color:{accent};">
                              <Icon name="CheckCircle" class="h-3.5 w-3.5" aria-hidden="true" />Active
                            </span>
                          {:else}
                            <span class="inline-flex items-center gap-1.5" style="color:{muted};">
                              <Icon name="X" class="h-3.5 w-3.5" aria-hidden="true" />Inactive
                            </span>
                          {/if}
                        </TD>
                        <TD class="px-5 py-4 align-middle" style="color:{muted};">{fmtDate(c.created_at)}</TD>
                      </TR>
                    {/each}
                  </TBody>
                </Table>
              </div>
            {/if}
          </div>

          <!-- b-8-0 helper text -->
          <p data-wf="b-8-0" class="mt-5 max-w-[76ch] text-xs leading-6" style="color:{muted};">
            Leave the per-claim limit empty for no limit check. Editing a category does not change claims already using it.
          </p>
        </section>
      {/if}
    {/if}
  </div>

  <!-- success toast -->
  {#if toast}
    {#key toast.id}
      <div role="status" aria-live="polite"
        class="fixed bottom-6 right-6 z-[60] flex max-w-sm items-start gap-3 px-4 py-3"
        style="background-color:{surface}; border:1px solid rgba(143,174,139,0.45); border-radius:{r}; box-shadow:0 18px 40px rgba(0,0,0,0.45);">
        <Icon name="CheckCircle" class="mt-0.5 h-4 w-4 shrink-0" style="color:{accent};" aria-hidden="true" />
        <p class="text-sm leading-6" style="color:{ink};">{toast.message}</p>
      </div>
    {/key}
  {/if}
</div>
