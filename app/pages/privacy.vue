<script setup lang="ts">
/**
 * Privacy notice (Datenschutzerklärung) + "delete all local data".
 *
 * The statements on this page are verified against the code:
 *  - local storage:   all `muslimapp-*` localStorage keys, IndexedDB `muslimapp-quran-offline`
 *  - third parties:   app/utils/quran.ts, app/composables/useLocation.ts, app/utils/mosques.ts
 *  - Aladhan proxy:   server/utils/aladhan.ts (only whitelisted params are forwarded)
 *  - Web Push:        shared/push/types.ts (PushRecord), shared/push/dispatch.ts (SENT_RETENTION_MS = 3 days)
 *  - fonts:           self-hosted in public/fonts
 * Keep this page in sync when the app starts sending or storing something new.
 */
const { t } = useI18n()
const confirm = useConfirm()
const reset = useDataReset()

/**
 * OPERATOR DETAILS — to be filled in by whoever runs this deployment.
 * Empty values render as a clearly marked placeholder on the page.
 * (Do not invent data here; also provide a legal notice / imprint as required in your jurisdiction.)
 */
const OPERATOR = {
  name: '',
  address: '',
  email: '',
  phone: '',
  hosting: '',
}

const operatorRows = computed(() => [
  { id: 'name', label: t('privacy.controller.name'), value: OPERATOR.name },
  { id: 'address', label: t('privacy.controller.address'), value: OPERATOR.address },
  { id: 'email', label: t('privacy.controller.email'), value: OPERATOR.email },
  { id: 'phone', label: t('privacy.controller.phone'), value: OPERATOR.phone },
  { id: 'hosting', label: t('privacy.controller.hosting'), value: OPERATOR.hosting },
])
const operatorIncomplete = computed(() => operatorRows.value.some(r => r.id !== 'phone' && !r.value))

interface Section {
  id: string
  /** paragraph keys rendered before the list (privacy.<id>.<key>) */
  before?: string[]
  /** number of list items li1..liN */
  li?: number
  /** paragraph keys rendered after the list */
  after?: string[]
  /** small trailing note (privacy.<id>.note) */
  note?: boolean
}

// Rendered in this order; `delete` has a custom block (button) in the template.
const sections: Section[] = [
  { id: 'local', before: ['p1'], li: 4, note: true },
  { id: 'noTracking', before: ['p1'] },
  { id: 'fonts', before: ['p1'] },
  { id: 'thirdParty', before: ['p1'], li: 5 },
  { id: 'aladhan', before: ['p1', 'p2'] },
  { id: 'location', before: ['p1'] },
  { id: 'push', before: ['p1'], li: 5, after: ['p2'], note: true },
  { id: 'backup', before: ['p1'] },
  { id: 'delete' },
  { id: 'rights', before: ['p1'] },
  { id: 'changes', before: ['p1'] },
]

const deleteState = ref<'idle' | 'working'>('idle')

async function onDeleteAll() {
  const ok = await confirm({
    title: t('privacy.delete.confirmTitle'),
    message: t('privacy.delete.confirm'),
    confirmLabel: t('privacy.delete.confirmLabel'),
    danger: true,
  })
  if (!ok) return
  deleteState.value = 'working'
  await reset.deleteAllLocalData()
  deleteState.value = 'idle'
}

useSeoMeta({
  title: () => `${t('privacy.title')} — MuslimApp`,
  description: () => t('privacy.tldr'),
  ogTitle: () => `${t('privacy.title')} — MuslimApp`,
  ogDescription: () => t('privacy.tldr'),
})
</script>

<template>
  <div class="app-container pt-6 pb-8 space-y-6">
    <header>
      <h1 class="text-2xl font-semibold">{{ t('privacy.title') }}</h1>
      <p class="text-sm text-themed-muted mt-1">{{ t('privacy.subtitle') }}</p>
    </header>

    <!-- TL;DR -->
    <GlassCard variant="primary">
      <h2 class="text-sm font-semibold mb-1.5">{{ t('privacy.tldrTitle') }}</h2>
      <p class="text-sm leading-relaxed">{{ t('privacy.tldr') }}</p>
    </GlassCard>

    <!-- Verantwortlicher / operator placeholder -->
    <section class="space-y-2" aria-labelledby="privacy-controller">
      <h2 id="privacy-controller" class="text-xs font-medium text-themed-muted uppercase tracking-wider px-1">
        {{ t('privacy.controller.title') }}
      </h2>
      <GlassCard :class="operatorIncomplete ? 'ring-1 ring-dashed ring-[var(--color-gold)]' : ''">
        <div class="space-y-3">
          <p class="text-xs text-themed-muted leading-relaxed">{{ t('privacy.controller.p1') }}</p>
          <p
            v-if="operatorIncomplete"
            data-testid="operator-placeholder"
            class="text-xs leading-relaxed rounded-lg px-3 py-2 bg-[var(--glass-bg-subtle)] border border-dashed border-[var(--color-gold)]"
          >
            <span class="font-semibold uppercase tracking-wider text-[var(--color-gold)]">{{ t('privacy.controller.placeholderTag') }}</span>
            <span class="block mt-1 text-themed-secondary">{{ t('privacy.controller.placeholderNote') }}</span>
          </p>
          <dl class="space-y-2">
            <div v-for="row in operatorRows" :key="row.id" class="flex justify-between items-start gap-4">
              <dt class="text-xs text-themed-muted shrink-0">{{ row.label }}</dt>
              <dd
                class="text-xs text-end"
                :class="row.value ? 'text-themed-secondary' : 'text-[var(--color-gold)]'"
              >
                {{ row.value || t('privacy.controller.value') }}
              </dd>
            </div>
          </dl>
        </div>
      </GlassCard>
    </section>

    <section
      v-for="s in sections"
      :key="s.id"
      class="space-y-2"
      :aria-labelledby="`privacy-${s.id}`"
    >
      <h2 :id="`privacy-${s.id}`" class="text-xs font-medium text-themed-muted uppercase tracking-wider px-1">
        {{ t(`privacy.${s.id}.title`) }}
      </h2>
      <GlassCard>
        <div class="space-y-3">
          <p v-for="k in s.before" :key="k" class="text-xs text-themed-secondary leading-relaxed">{{ t(`privacy.${s.id}.${k}`) }}</p>
          <ul v-if="s.li" class="list-disc ps-5 space-y-1.5 text-xs text-themed-muted leading-relaxed marker:text-themed-faint">
            <li v-for="n in s.li" :key="n">{{ t(`privacy.${s.id}.li${n}`) }}</li>
          </ul>
          <p v-for="k in s.after" :key="k" class="text-xs text-themed-secondary leading-relaxed">{{ t(`privacy.${s.id}.${k}`) }}</p>
          <p v-if="s.note" class="text-[11px] text-themed-faint border-t border-[var(--glass-border)] pt-2.5 leading-relaxed">
            {{ t(`privacy.${s.id}.note`) }}
          </p>

          <!-- Delete all local data -->
          <template v-if="s.id === 'delete'">
            <p class="text-xs text-themed-secondary leading-relaxed">{{ t('privacy.delete.p1') }}</p>
            <ul class="list-disc ps-5 space-y-1.5 text-xs text-themed-muted leading-relaxed marker:text-themed-faint">
              <li>{{ t('privacy.delete.li1') }}</li>
              <li>{{ t('privacy.delete.li2') }}</li>
              <li>{{ t('privacy.delete.li3') }}</li>
            </ul>
            <p class="text-xs text-themed-secondary leading-relaxed">{{ t('privacy.delete.p2') }}</p>
            <button
              type="button"
              data-testid="delete-all-data"
              class="w-full px-4 py-3 rounded-xl text-sm font-medium border border-[var(--color-danger)] text-[var(--color-danger)] hover:bg-[var(--color-danger)] hover:text-white transition-colors disabled:opacity-50 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-danger)]"
              :disabled="deleteState === 'working'"
              @click="onDeleteAll"
            >
              {{ deleteState === 'working' ? t('privacy.delete.working') : t('privacy.delete.button') }}
            </button>
            <p v-if="reset.failed.value" role="alert" class="text-xs text-[var(--color-danger)]">
              {{ t('privacy.delete.error') }}
            </p>
          </template>
        </div>
      </GlassCard>
    </section>
  </div>
</template>
