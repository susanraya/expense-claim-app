<script>
  /* eslint-disable @typescript-eslint/no-unused-vars -- generated imports, matched generously */
  import { Button, Card, CardContent, Empty, Icon, Input, Label, Select, Textarea } from "@/lib/ui";
  import { brand } from "@/lib/brand";
  import { useNavigate } from "@/lib/navigate";

  const navigate = useNavigate();

  // ——— Velvet tokens, derived from the brand roles ———
  const surface = 'rgba(255, 255, 255, 0.035)';      // panel, one step above the canvas
  const surfaceHi = 'rgba(255, 255, 255, 0.06)';     // inset rows
  const hairline = 'rgba(233, 237, 233, 0.12)';      // 1px structure
  const hairlineSoft = 'rgba(233, 237, 233, 0.08)';
  const alertTone = '#c08552';                        // warm copper — the Velvet metal, used only for policy + rejection

  const inr = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 });
  const money = (n) => '₹' + inr.format(n);

  const categories = [
    { id: 'cat-travel', name: 'Travel', limit_amount: 5000, is_active: true },
    { id: 'cat-accom', name: 'Accommodation', limit_amount: 8000, is_active: true },
    { id: 'cat-meals', name: 'Meals & Entertainment', limit_amount: 2500, is_active: true },
    { id: 'cat-convey', name: 'Local Conveyance', limit_amount: 1000, is_active: true },
    { id: 'cat-client', name: 'Client Hospitality', limit_amount: 3000, is_active: true },
    { id: 'cat-train', name: 'Training & Conferences', limit_amount: 15000, is_active: true },
    { id: 'cat-telecom', name: 'Telecom & Internet', limit_amount: 1500, is_active: true },
    { id: 'cat-office', name: 'Office Supplies', limit_amount: null, is_active: true }
  ];

  const categoryOptions = [
    { value: '', label: 'Choose a category…' },
    ...categories.filter((c) => c.is_active).map((c) => ({ value: c.id, label: c.name }))
  ];

  const INITIAL = {
    amount: '6500',
    expense_date: '2026-11-02',
    category_id: 'cat-travel',
    description:
      'Airport taxi from Pune station and one night at Hotel Sahyadri for the Mahindra vendor audit on 2 Nov.'
  };

  // ——— Claim state ———
  let amount = $state(INITIAL.amount);
  let expenseDate = $state(INITIAL.expense_date);
  let categoryId = $state(INITIAL.category_id);
  let description = $state(INITIAL.description);

  let receipts = $state([
    {
      id: 'rcp-8801',
      file_name: 'taxi-02nov.jpg',
      content_type: 'image/jpeg',
      size_bytes: 245760,
      uploaded_at: '02 Nov 2026 10:09'
    },
    {
      id: 'rcp-8802',
      file_name: 'hotel-bill.png',
      content_type: 'image/png',
      size_bytes: 1258291,
      uploaded_at: '02 Nov 2026 10:11'
    }
  ]);

  let audit = $state([
    {
      id: 'aud-01',
      stamp: '02 Nov 2026 10:12',
      actor: 'Anita Desai',
      action: 'Submitted',
      from_status: 'Draft',
      to_status: 'Pending manager',
      comment: ''
    },
    {
      id: 'aud-02',
      stamp: '03 Nov 2026 09:40',
      actor: 'Priya Nair',
      action: 'Rejected',
      from_status: 'Pending manager',
      to_status: 'Rejected',
      comment: 'Receipt total does not match'
    }
  ]);

  let status = $state('Rejected');
  let submittedLabel = $state('Submitted 02 Nov 2026');
  let rejectionVisible = $state(true);

  // ——— UI state ———
  let errors = $state({});
  let submitting = $state(false);
  let savingDraft = $state(false);
  let savedAt = $state(null);
  let receiptsTouched = $state(false);
  let attaching = $state(null); // 'upload' | 'camera' | null
  let attachError = $state('');
  let confirmRemoveId = $state(null);
  let flash = $state('');

  let uploadCursor = 0;
  let cameraCursor = 0;
  const pickerQueue = [
    { file_name: 'fuel-04nov.jpg', content_type: 'image/jpeg', size_bytes: 523264 },
    { file_name: 'parking-slip-pune.png', content_type: 'image/png', size_bytes: 184320 },
    { file_name: 'expense-summary.pdf', content_type: 'application/pdf', size_bytes: 2201600 },
    { file_name: 'hotel-folio-scan.jpg', content_type: 'image/jpeg', size_bytes: 6501171 }
  ];
  const cameraQueue = [
    { file_name: 'camera-05nov-1042.jpg', content_type: 'image/jpeg', size_bytes: 880640 },
    { file_name: 'camera-05nov-1043.jpg', content_type: 'image/jpeg', size_bytes: 1047552 }
  ];

  let timers = [];
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));
  $effect(() => () => timers.forEach(clearTimeout));

  // ——— Derived ———
  const selectedCategory = $derived(categories.find((c) => c.id === categoryId) || null);
  const amountNumber = $derived(Number(String(amount).replace(/[^0-9.]/g, '')));
  const amountValid = $derived(!Number.isNaN(amountNumber) && amountNumber > 0);
  const limit = $derived(selectedCategory ? selectedCategory.limit_amount : null);
  const overLimit = $derived(amountValid && limit !== null && amountNumber > limit);
  const dirty = $derived(
    amount !== INITIAL.amount ||
      expenseDate !== INITIAL.expense_date ||
      categoryId !== INITIAL.category_id ||
      description !== INITIAL.description ||
      receiptsTouched
  );

  const fmtSize = (b) => (b >= 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.round(b / 1024) + ' KB');
  const fmtDate = (iso) => {
    if (!iso) return '—';
    const d = new Date(iso + 'T00:00:00');
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };
  const clockNow = () =>
    new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });

  function validate() {
    const next = {};
    if (!String(amount).trim()) next.amount = 'Enter the amount you spent, in rupees.';
    else if (!amountValid) next.amount = 'Amount must be a number greater than zero.';
    if (!expenseDate) next.expense_date = 'Pick the date the expense was incurred.';
    if (!categoryId) next.category_id = 'Choose the category this expense belongs to.';
    if (receipts.length === 0) next.receipts = 'Attach at least one receipt image as proof.';
    errors = next;
    return Object.keys(next).length === 0;
  }

  function attach(kind) {
    if (attaching) return;
    attachError = '';
    attaching = kind;
    const file =
      kind === 'camera'
        ? cameraQueue[cameraCursor++ % cameraQueue.length]
        : pickerQueue[uploadCursor++ % pickerQueue.length];

    later(() => {
      attaching = null;
      const okType = file.content_type === 'image/jpeg' || file.content_type === 'image/png';
      if (!okType) {
        attachError = `${file.file_name} isn’t an image. Attach a JPG or PNG of the receipt — the claim keeps your entries.`;
        return;
      }
      if (file.size_bytes > 5 * 1048576) {
        attachError = `${file.file_name} is ${fmtSize(file.size_bytes)}. The limit is 5 MB per file — retake it at a lower resolution.`;
        return;
      }
      receipts = [
        ...receipts,
        { ...file, id: 'rcp-' + (8803 + receipts.length), uploaded_at: `05 Nov 2026 ${clockNow()}` }
      ];
      receiptsTouched = true;
      errors = { ...errors, receipts: undefined };
    }, 650);
  }

  function removeReceipt(id) {
    receipts = receipts.filter((r) => r.id !== id);
    confirmRemoveId = null;
    receiptsTouched = true;
  }

  function saveDraft() {
    if (savingDraft) return;
    savingDraft = true;
    flash = '';
    later(() => {
      savingDraft = false;
      savedAt = clockNow();
    }, 600);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;
    if (!validate()) {
      flash = '';
      return;
    }
    submitting = true;
    later(() => {
      audit = [
        ...audit,
        {
          id: 'aud-03',
          stamp: `05 Nov 2026 ${clockNow()}`,
          actor: 'Anita Desai',
          action: 'Resubmitted',
          from_status: 'Rejected',
          to_status: 'Pending manager',
          comment: overLimit ? 'Over-limit flag applied' : ''
        }
      ];
      status = 'Pending manager';
      submittedLabel = 'Resubmitted 05 Nov 2026';
      rejectionVisible = false;
      submitting = false;
      savedAt = null;
      flash = 'Claim CLM-1042 is back with Priya Nair for approval. Taking you to your claims…';
      later(() => navigate('my-claims'), 1100);
    }, 750);
  }

  const statusTone = $derived(
    status === 'Rejected'
      ? { fg: alertTone, bd: 'rgba(192, 133, 82, 0.45)', bg: 'rgba(192, 133, 82, 0.1)', icon: 'AlertCircle' }
      : { fg: brand.accentColor, bd: 'rgba(143, 174, 139, 0.45)', bg: 'rgba(143, 174, 139, 0.1)', icon: 'Clock' }
  );
</script>

<div
  class="min-h-full w-full pb-20"
  style="background-color: {brand.backgroundColor}; color: {brand.primaryColor}; font-family: {brand.fontBody};"
>
  <div class="mx-auto w-full max-w-6xl px-5 sm:px-8 pt-8">
    <!-- Row 1 -->
    <div class="grid grid-cols-12 items-center gap-4">
      <div class="col-span-12 md:col-span-6">
        <button
          data-wf="b-0-0"
          type="button"
          onclick={() => navigate('my-claims')}
          class="inline-flex min-h-[44px] items-center gap-2 rounded px-2 -ml-2 text-sm transition-colors duration-150 hover:opacity-100 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style="color: {brand.neutralColor}; outline-color: {brand.accentColor};"
        >
          <Icon name="ArrowLeft" class="h-4 w-4" aria-hidden="true" />
          <span>Back to my claims</span>
        </button>
      </div>
      <div data-wf="b-0-1" class="col-span-12 md:col-span-6 md:text-right">
        <span
          class="inline-flex items-center gap-2 rounded border px-3 py-1.5 text-xs uppercase tracking-[0.14em]"
          style="border-color: {statusTone.bd}; background-color: {statusTone.bg}; color: {statusTone.fg}; border-radius: {brand.radius};"
        >
          <Icon name={statusTone.icon} class="h-3.5 w-3.5" aria-hidden="true" />
          Status: {status}
        </span>
        <span class="ml-2 text-xs" style="color: {brand.neutralColor}; font-variant-numeric: tabular-nums;"
          >· {submittedLabel}</span
        >
      </div>
    </div>

    <!-- Row 2 -->
    <div class="mt-6 grid grid-cols-12">
      <div class="col-span-12">
        <p class="text-[11px] uppercase tracking-[0.22em]" style="color: {brand.neutralColor};">
          Expense claim · Anita Desai
        </p>
        <h1
          data-wf="b-1-0"
          class="mt-2 text-[34px] leading-tight sm:text-[40px]"
          style="font-family: {brand.fontHeading}; font-variant-numeric: tabular-nums;"
        >
          Claim <span style="color: {brand.accentColor};">CLM-1042</span>
        </h1>
        <div class="mt-5 h-px w-full" style="background-color: {hairline};"></div>
      </div>
    </div>

    {#if flash}
      <div
        class="mt-6 flex items-start gap-3 rounded border px-4 py-3 text-sm"
        style="border-color: rgba(143, 174, 139, 0.4); background-color: rgba(143, 174, 139, 0.1); border-radius: {brand.radius}; color: {brand.primaryColor};"
        role="status"
        aria-live="polite"
      >
        <Icon name="CheckCircle" class="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" style="color: {brand.accentColor};" />
        <span>{flash}</span>
      </div>
    {/if}

    <!-- Row 3 -->
    {#if rejectionVisible}
      <Card
        data-wf="b-2-0"
        class="mt-6 border"
        style="background-color: rgba(192, 133, 82, 0.08); border-color: rgba(192, 133, 82, 0.34); border-radius: {brand.radius};"
      >
        <CardContent class="flex items-start gap-4 p-6">
          <Icon name="AlertCircle" class="h-5 w-5 mt-0.5 shrink-0" aria-hidden="true" style="color: {alertTone};" />
          <div class="min-w-0">
            <h2 class="text-lg" style="font-family: {brand.fontHeading}; color: {brand.primaryColor};">
              Returned to you for correction
            </h2>
            <p class="mt-2 text-sm leading-relaxed" style="color: {brand.primaryColor}; max-width: 68ch;">
              Rejected by Priya Nair (Manager) on 03 Nov 2026 — “Receipt total does not match the claimed
              amount.”
            </p>
            <p class="mt-2 text-sm" style="color: {brand.neutralColor}; max-width: 68ch;">
              Fix the details below and resubmit. The claim restarts at manager approval with Priya.
            </p>
          </div>
        </CardContent>
      </Card>
    {/if}

    <form id="claim-form" onsubmit={handleSubmit} novalidate>
      <!-- Row 4 -->
      <div class="mt-8 grid grid-cols-12 gap-6">
        <!-- Claim details -->
        <div data-wf="b-3-0" class="col-span-12 lg:col-span-7">
          <Card
            class="border h-full"
            style="background-color: {surface}; border-color: {hairline}; border-radius: {brand.radius};"
          >
            <CardContent class="p-6 sm:p-7">
              <h2 class="text-xl" style="font-family: {brand.fontHeading};">Claim details</h2>
              <p class="mt-1 text-sm" style="color: {brand.neutralColor};">
                All claims are recorded in Indian Rupees.
              </p>

              <div class="my-6 h-px w-full" style="background-color: {hairlineSoft};"></div>

              <!-- Amount: the focal field -->
              <div>
                <Label
                  for="amount"
                  class="text-[11px] uppercase tracking-[0.18em]"
                  style="color: {brand.neutralColor};">Amount in INR (₹)</Label
                >
                <div class="mt-2 flex items-baseline gap-3">
                  <span
                    class="text-3xl leading-none"
                    style="font-family: {brand.fontHeading}; color: {brand.accentColor};"
                    aria-hidden="true">₹</span
                  >
                  <Input
                    data-wf="i-3-0-0"
                    id="amount"
                    inputmode="decimal"
                    bind:value={amount}
                    aria-invalid={errors.amount ? 'true' : 'false'}
                    aria-describedby={errors.amount ? 'amount-error' : 'amount-hint'}
                    class="w-full border-0 border-b bg-transparent px-0 py-1 text-3xl focus:outline-none focus-visible:outline-none"
                    style="font-family: {brand.fontHeading}; color: {brand.primaryColor}; border-color: {errors
                      .amount
                      ? alertTone
                      : hairline}; border-radius: 0; font-variant-numeric: tabular-nums; box-shadow: none;"
                  />
                </div>
                {#if errors.amount}
                  <p id="amount-error" class="mt-2 flex items-center gap-2 text-sm" style="color: {alertTone};">
                    <Icon name="AlertCircle" class="h-3.5 w-3.5" aria-hidden="true" />{errors.amount}
                  </p>
                {:else}
                  <p id="amount-hint" class="mt-2 text-xs" style="color: {brand.neutralColor};">
                    Enter the total you paid, as shown on the receipt.
                  </p>
                {/if}
              </div>

              <div class="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Label
                    for="expense-date"
                    class="text-[11px] uppercase tracking-[0.18em]"
                    style="color: {brand.neutralColor};">Expense date</Label
                  >
                  <Input
                    data-wf="i-3-0-1"
                    id="expense-date"
                    type="date"
                    bind:value={expenseDate}
                    aria-invalid={errors.expense_date ? 'true' : 'false'}
                    aria-describedby={errors.expense_date ? 'date-error' : undefined}
                    class="mt-2 w-full border px-3 py-2.5 text-sm focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style="background-color: {surfaceHi}; border-color: {errors.expense_date
                      ? alertTone
                      : hairline}; color: {brand.primaryColor}; border-radius: {brand.radius}; outline-color: {brand.accentColor}; font-variant-numeric: tabular-nums; color-scheme: dark;"
                  />
                  {#if errors.expense_date}
                    <p id="date-error" class="mt-2 text-sm" style="color: {alertTone};">{errors.expense_date}</p>
                  {:else}
                    <p class="mt-2 text-xs" style="color: {brand.neutralColor};">{fmtDate(expenseDate)}</p>
                  {/if}
                </div>

                <div>
                  <Label
                    for="category"
                    class="text-[11px] uppercase tracking-[0.18em]"
                    style="color: {brand.neutralColor};">Category</Label
                  >
                  <Select
                    data-wf="i-3-0-2"
                    id="category"
                    bind:value={categoryId}
                    options={categoryOptions}
                    aria-invalid={errors.category_id ? 'true' : 'false'}
                    aria-describedby={errors.category_id ? 'category-error' : 'category-hint'}
                    class="mt-2 w-full border px-3 py-2.5 text-sm focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    style="background-color: {surfaceHi}; border-color: {errors.category_id
                      ? alertTone
                      : hairline}; color: {brand.primaryColor}; border-radius: {brand.radius}; outline-color: {brand.accentColor};"
                  />
                  {#if errors.category_id}
                    <p id="category-error" class="mt-2 text-sm" style="color: {alertTone};">
                      {errors.category_id}
                    </p>
                  {:else}
                    <p id="category-hint" class="mt-2 text-xs" style="color: {brand.neutralColor}; font-variant-numeric: tabular-nums;">
                      {limit === null ? 'No per-claim limit set' : `Per-claim limit ${money(limit)}`}
                    </p>
                  {/if}
                </div>
              </div>

              <div class="mt-7">
                <Label
                  for="description"
                  class="text-[11px] uppercase tracking-[0.18em]"
                  style="color: {brand.neutralColor};">Description</Label
                >
                <Textarea
                  data-wf="i-3-0-3"
                  id="description"
                  rows="4"
                  bind:value={description}
                  placeholder="What was the expense for, and who was it with?"
                  class="mt-2 w-full border px-3 py-2.5 text-sm leading-relaxed focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style="background-color: {surfaceHi}; border-color: {hairline}; color: {brand.primaryColor}; border-radius: {brand.radius}; outline-color: {brand.accentColor};"
                />
                <p class="mt-2 text-xs" style="color: {brand.neutralColor};">
                  Priya reads this first — name the trip, client or purpose.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <!-- Attached receipts -->
        <div data-wf="b-3-1" class="col-span-12 lg:col-span-5">
          <Card
            class="border h-full"
            style="background-color: {surface}; border-color: {hairline}; border-radius: {brand.radius};"
          >
            <CardContent class="p-6 sm:p-7">
              <h2 class="text-xl" style="font-family: {brand.fontHeading}; font-variant-numeric: tabular-nums;">
                Attached receipts ({receipts.length})
              </h2>
              <p class="mt-1 text-sm" style="color: {brand.neutralColor};">
                Stored in India and visible to your approvers only.
              </p>

              <div class="my-5 h-px w-full" style="background-color: {hairlineSoft};"></div>

              {#if receipts.length === 0}
                <Empty
                  title="No receipts attached"
                  description="A claim needs at least one JPG or PNG receipt as proof before Priya can approve it."
                >
                  {#snippet action()}
                    <Button
                      type="button"
                      onclick={() => attach('upload')}
                      class="inline-flex min-h-[44px] items-center gap-2 px-4 text-sm focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                      style="background-color: transparent; border: 1px solid {hairline}; color: {brand.primaryColor}; border-radius: {brand.radius}; outline-color: {brand.accentColor};"
                    >
                      <Icon name="Upload" class="h-4 w-4" aria-hidden="true" /> Upload receipt
                    </Button>
                  {/snippet}
                </Empty>
              {:else}
                <ul class="divide-y" style="border-color: {hairlineSoft};">
                  {#each receipts as r, i (r.id)}
                    <li
                      data-wf={i === 0 ? 'i-3-1-0' : i === 1 ? 'i-3-1-1' : undefined}
                      class="flex items-center gap-3 py-3 first:pt-0"
                      style="border-color: {hairlineSoft}; animation: none;"
                    >
                      <span
                        class="flex h-9 w-9 shrink-0 items-center justify-center rounded border"
                        style="border-color: {hairline}; background-color: {surfaceHi}; border-radius: {brand.radius};"
                      >
                        <Icon name="FileText" class="h-4 w-4" aria-hidden="true" style="color: {brand.accentColor};" />
                      </span>
                      <span class="min-w-0 flex-1">
                        <span class="block truncate text-sm" style="color: {brand.primaryColor};">{r.file_name}</span>
                        <span class="block text-xs" style="color: {brand.neutralColor}; font-variant-numeric: tabular-nums;"
                          >{fmtSize(r.size_bytes)} · added {r.uploaded_at}</span
                        >
                      </span>
                      {#if confirmRemoveId === r.id}
                        <span class="flex items-center gap-2">
                          <Button
                            type="button"
                            onclick={() => removeReceipt(r.id)}
                            class="min-h-[36px] px-3 text-xs focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                            style="background-color: rgba(192, 133, 82, 0.16); border: 1px solid rgba(192, 133, 82, 0.45); color: {alertTone}; border-radius: {brand.radius}; outline-color: {alertTone};"
                          >Remove</Button>
                          <Button
                            type="button"
                            onclick={() => (confirmRemoveId = null)}
                            class="min-h-[36px] px-3 text-xs focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                            style="background-color: transparent; border: 1px solid {hairline}; color: {brand.neutralColor}; border-radius: {brand.radius}; outline-color: {brand.accentColor};"
                          >Keep</Button>
                        </span>
                      {:else}
                        <Button
                          type="button"
                          aria-label={`Remove receipt ${r.file_name}`}
                          onclick={() => (confirmRemoveId = r.id)}
                          class="flex h-9 w-9 shrink-0 items-center justify-center focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                          style="background-color: transparent; border: 1px solid {hairlineSoft}; color: {brand.neutralColor}; border-radius: {brand.radius}; outline-color: {brand.accentColor};"
                        >
                          <Icon name="Trash" class="h-4 w-4" aria-hidden="true" />
                        </Button>
                      {/if}
                    </li>
                  {/each}
                  {#if attaching}
                    <li class="flex items-center gap-3 py-3 text-sm" style="color: {brand.neutralColor};">
                      <span
                        class="flex h-9 w-9 shrink-0 items-center justify-center rounded border"
                        style="border-color: {hairline}; border-radius: {brand.radius};"
                      >
                        <Icon name="Clock" class="h-4 w-4" aria-hidden="true" />
                      </span>
                      {attaching === 'camera' ? 'Capturing photo…' : 'Attaching receipt…'}
                    </li>
                  {/if}
                </ul>
              {/if}

              <p class="sr-only" role="status" aria-live="polite">
                {receipts.length} receipts attached
              </p>

              {#if errors.receipts}
                <p class="mt-4 flex items-center gap-2 text-sm" style="color: {alertTone};">
                  <Icon name="AlertCircle" class="h-3.5 w-3.5" aria-hidden="true" />{errors.receipts}
                </p>
              {/if}
              {#if attachError}
                <p
                  class="mt-4 flex items-start gap-2 rounded border px-3 py-2 text-sm"
                  role="alert"
                  style="border-color: rgba(192, 133, 82, 0.4); background-color: rgba(192, 133, 82, 0.1); color: {brand.primaryColor}; border-radius: {brand.radius};"
                >
                  <Icon name="X" class="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" style="color: {alertTone};" />
                  {attachError}
                </p>
              {/if}
            </CardContent>
          </Card>
        </div>
      </div>

      <!-- Row 5 -->
      <div class="mt-5 grid grid-cols-12 items-center gap-4">
        <div class="col-span-6 sm:col-span-4 lg:col-span-3">
          <Button
            data-wf="b-4-0"
            type="button"
            disabled={attaching !== null}
            onclick={() => attach('upload')}
            class="inline-flex w-full min-h-[44px] items-center justify-center gap-2 px-4 text-sm transition-colors duration-150 disabled:opacity-50 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style="background-color: {surfaceHi}; border: 1px solid {hairline}; color: {brand.primaryColor}; border-radius: {brand.radius}; outline-color: {brand.accentColor};"
          >
            <Icon name="Upload" class="h-4 w-4" aria-hidden="true" />
            {attaching === 'upload' ? 'Attaching…' : 'Upload receipt'}
          </Button>
        </div>
        <div class="col-span-6 sm:col-span-4 lg:col-span-3">
          <Button
            data-wf="b-4-1"
            type="button"
            disabled={attaching !== null}
            onclick={() => attach('camera')}
            class="inline-flex w-full min-h-[44px] items-center justify-center gap-2 px-4 text-sm transition-colors duration-150 disabled:opacity-50 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style="background-color: {surfaceHi}; border: 1px solid {hairline}; color: {brand.primaryColor}; border-radius: {brand.radius}; outline-color: {brand.accentColor};"
          >
            <Icon name="Plus" class="h-4 w-4" aria-hidden="true" />
            {attaching === 'camera' ? 'Capturing…' : 'Take photo'}
          </Button>
        </div>
        <p
          data-wf="b-4-2"
          class="col-span-12 lg:col-span-6 text-xs leading-relaxed"
          style="color: {brand.neutralColor}; max-width: 72ch;"
        >
          JPG or PNG only, up to 5 MB per file. Receipts are stored as proof; no data is read from them.
        </p>
      </div>

      <!-- Row 6 -->
      <div class="mt-6 grid grid-cols-12">
        <div data-wf="b-5-0" class="col-span-12">
          {#if overLimit}
            <p
              class="flex items-start gap-3 border-l-2 py-3 pl-4 pr-4 text-sm leading-relaxed"
              style="border-color: {alertTone}; background-color: rgba(192, 133, 82, 0.07); color: {brand.primaryColor}; font-variant-numeric: tabular-nums;"
              aria-live="polite"
            >
              <Icon name="AlertCircle" class="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" style="color: {alertTone};" />
              <span
                ><strong class="font-normal" style="color: {alertTone};">Over limit.</strong>
                {money(amountNumber)} exceeds the {money(limit)} per-claim limit for {selectedCategory.name}. The
                claim will be submitted with an over-limit flag.</span
              >
            </p>
          {:else if selectedCategory && limit !== null && amountValid}
            <p
              class="flex items-start gap-3 border-l-2 py-3 pl-4 pr-4 text-sm leading-relaxed"
              style="border-color: {brand.accentColor}; background-color: rgba(143, 174, 139, 0.07); color: {brand.primaryColor}; font-variant-numeric: tabular-nums;"
              aria-live="polite"
            >
              <Icon name="Check" class="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" style="color: {brand.accentColor};" />
              <span>Within policy. {money(amountNumber)} is inside the {money(limit)} per-claim limit for {selectedCategory.name}.</span>
            </p>
          {:else if selectedCategory && limit === null}
            <p class="py-2 pl-4 text-sm border-l-2" style="border-color: {hairline}; color: {brand.neutralColor};">
              {selectedCategory.name} has no per-claim limit configured, so no limit check applies.
            </p>
          {:else}
            <p class="py-2 pl-4 text-sm border-l-2" style="border-color: {hairline}; color: {brand.neutralColor};">
              Choose a category and enter an amount to see the policy check.
            </p>
          {/if}
        </div>
      </div>

      <!-- Row 7 -->
      <div class="mt-10 grid grid-cols-12">
        <div data-wf="b-6-0" class="col-span-12">
          <h2 class="text-xl" style="font-family: {brand.fontHeading};">Status history</h2>
          <p class="mt-1 text-sm" style="color: {brand.neutralColor};">
            Every decision on this claim, in order, with the comment that came with it.
          </p>
          <div class="mt-4 border" style="border-color: {hairline}; border-radius: {brand.radius}; background-color: {surface};">
            <ol class="divide-y" style="border-color: {hairlineSoft};">
              {#each audit as entry, i (entry.id)}
                <li
                  data-wf={i === 0 ? 'i-6-0-0' : i === 1 ? 'i-6-0-1' : undefined}
                  class="grid grid-cols-1 gap-2 px-5 py-4 sm:grid-cols-12 sm:items-baseline sm:gap-4"
                  style="border-color: {hairlineSoft};"
                >
                  <span
                    class="sm:col-span-3 text-xs"
                    style="color: {brand.neutralColor}; font-variant-numeric: tabular-nums;">{entry.stamp}</span
                  >
                  <span class="sm:col-span-3 text-sm" style="color: {brand.primaryColor};">{entry.actor}</span>
                  <span class="sm:col-span-2 text-sm">
                    <span
                      class="inline-flex items-center gap-1.5"
                      style="color: {entry.action === 'Rejected' ? alertTone : brand.accentColor};"
                    >
                      <Icon
                        name={entry.action === 'Rejected' ? 'X' : 'Check'}
                        class="h-3.5 w-3.5"
                        aria-hidden="true"
                      />{entry.action}
                    </span>
                  </span>
                  <span class="sm:col-span-4 text-sm" style="color: {brand.neutralColor};">
                    {entry.from_status} → {entry.to_status}{entry.comment ? ` · “${entry.comment}”` : ''}
                  </span>
                </li>
              {/each}
            </ol>
          </div>
        </div>
      </div>

      <!-- Row 8 -->
      <div class="mt-8 grid grid-cols-12 items-center gap-4">
        <div class="col-span-12 sm:col-span-4 lg:col-span-3">
          <Button
            data-wf="b-7-0"
            type="button"
            disabled={savingDraft || submitting}
            onclick={saveDraft}
            class="inline-flex w-full min-h-[48px] items-center justify-center gap-2 px-5 text-sm transition-colors duration-150 disabled:opacity-50 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style="background-color: transparent; border: 1px solid {hairline}; color: {brand.primaryColor}; border-radius: {brand.radius}; outline-color: {brand.accentColor};"
          >
            {savingDraft ? 'Saving…' : 'Save draft'}
          </Button>
        </div>
        <div class="col-span-12 sm:col-span-5 lg:col-span-4">
          <Button
            data-wf="b-7-1"
            type="submit"
            form="claim-form"
            disabled={submitting}
            class="inline-flex w-full min-h-[48px] items-center justify-center gap-2 px-5 text-sm font-medium transition-opacity duration-150 disabled:opacity-60 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style="background-color: {brand.accentColor}; border: 1px solid {brand.accentColor}; color: {brand.backgroundColor}; border-radius: {brand.radius}; outline-color: {brand.primaryColor};"
          >
            {#if submitting}
              <Icon name="Clock" class="h-4 w-4" aria-hidden="true" /> Submitting…
            {:else}
              <Icon name="Check" class="h-4 w-4" aria-hidden="true" /> Submit claim for approval
            {/if}
          </Button>
        </div>
        <div class="col-span-12 lg:col-span-5 text-xs" style="color: {brand.neutralColor};" aria-live="polite">
          {#if dirty}
            Unsaved changes on this claim.
          {:else if savedAt}
            <span style="font-variant-numeric: tabular-nums;">Draft saved at {savedAt} · nothing sent to Priya yet.</span>
          {:else}
            Resubmitting sends this claim back to Priya Nair for manager approval.
          {/if}
        </div>
      </div>

      {#if Object.keys(errors).filter((k) => errors[k]).length > 0}
        <p class="mt-4 text-sm" role="alert" style="color: {alertTone};">
          This claim can’t be submitted yet — the highlighted fields above need attention. Your entries have
          been kept.
        </p>
      {/if}
    </form>
  </div>
</div>
