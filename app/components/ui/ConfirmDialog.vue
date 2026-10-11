<script setup lang="ts">
/**
 * ConfirmDialog — accessible modal driven by useConfirm().
 * Mounted once, app-wide, by app/plugins/confirm.client.ts (do NOT add it to app.vue as well).
 *
 * a11y: role="alertdialog", aria-modal, labelled + described, focus trapped in the
 * dialog, Esc cancels, focus is restored to the previously focused element on close.
 */
const { t } = useI18n()
const { state, accept, cancel } = useConfirmState()

const uid = useId()
const titleId = `${uid}-title`
const descId = `${uid}-desc`

const panelRef = ref<HTMLElement | null>(null)
const cancelRef = ref<HTMLButtonElement | null>(null)
const confirmRef = ref<HTMLButtonElement | null>(null)

let previouslyFocused: HTMLElement | null = null
let previousOverflow = ''

const title = computed(() => state.options.title || t('common.confirmTitle'))
const confirmLabel = computed(() => state.options.confirmLabel || t('common.confirm'))
const cancelLabel = computed(() => state.options.cancelLabel || t('common.cancel'))

watch(() => state.open, async (open) => {
  if (!import.meta.client) return
  if (open) {
    previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    await nextTick()
    // For destructive actions start on "cancel" so Enter/Space can't confirm by accident.
    ;(state.options.danger ? cancelRef.value : confirmRef.value)?.focus()
  }
  else {
    document.body.style.overflow = previousOverflow
    previouslyFocused?.focus?.()
    previouslyFocused = null
  }
})

function focusables(): HTMLElement[] {
  return Array.from(panelRef.value?.querySelectorAll<HTMLElement>('button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') ?? [])
}

function onKeydown(event: KeyboardEvent) {
  if (!state.open) return
  if (event.key === 'Escape') {
    event.preventDefault()
    event.stopPropagation()
    cancel()
    return
  }
  if (event.key !== 'Tab') return
  const items = focusables()
  if (items.length === 0) return
  const first = items[0]!
  const last = items[items.length - 1]!
  const active = document.activeElement
  if (event.shiftKey && (active === first || !panelRef.value?.contains(active))) {
    event.preventDefault()
    last.focus()
  }
  else if (!event.shiftKey && (active === last || !panelRef.value?.contains(active))) {
    event.preventDefault()
    first.focus()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown, true))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown, true)
  if (state.open) document.body.style.overflow = previousOverflow
})
</script>

<template>
  <Teleport to="body">
    <Transition name="sheet">
      <div v-if="state.open" class="sheet-backdrop" aria-hidden="true" @click="cancel" />
    </Transition>
    <Transition name="confirm">
      <div
        v-if="state.open"
        class="confirm-container"
        @click.self="cancel"
      >
        <div
          ref="panelRef"
          class="confirm-panel space-y-4"
          role="alertdialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          :aria-describedby="descId"
        >
          <h2 :id="titleId" class="text-base font-semibold text-themed">
            {{ title }}
          </h2>
          <p :id="descId" class="text-sm text-themed-secondary leading-relaxed">
            {{ state.options.message }}
          </p>
          <div class="flex gap-2 justify-end pt-1">
            <button
              ref="cancelRef"
              type="button"
              class="px-4 py-2.5 rounded-xl text-sm font-medium glass hover:brightness-110 transition-all active:scale-[0.97]"
              @click="cancel"
            >
              {{ cancelLabel }}
            </button>
            <button
              ref="confirmRef"
              type="button"
              :class="[
                'px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-all active:scale-[0.97] hover:brightness-110',
                state.options.danger ? 'bg-[var(--color-danger)]' : 'bg-[var(--color-primary)]',
              ]"
              @click="accept"
            >
              {{ confirmLabel }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
