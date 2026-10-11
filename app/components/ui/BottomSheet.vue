<script setup lang="ts">
/**
 * BottomSheet — native-style modal surface that slides up from the bottom on
 * mobile and centers as a dialog on desktop. Dismisses on backdrop click,
 * Escape key, or drag-down gesture.
 *
 * Usage:
 *   <BottomSheet v-model:open="isOpen" title="Location">
 *     ...content
 *   </BottomSheet>
 */

interface Props {
  open: boolean
  title?: string
  /** If true, dismissing via backdrop/drag is disabled. */
  persistent?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  persistent: false,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  'close': []
}>()

const { t } = useI18n()
const haptics = useHaptics()
const uid = useId()
const titleId = `${uid}-title`
let previouslyFocused: HTMLElement | null = null
const panelRef = ref<HTMLDivElement | null>(null)
const dragStartY = ref<number | null>(null)
const dragOffset = ref(0)
const isDragging = ref(false)

function close() {
  if (props.persistent) return
  haptics.light()
  emit('update:open', false)
  emit('close')
}

function onBackdropClick() {
  close()
}

// Lock body scroll while open; move focus into the sheet and restore it on close.
watch(() => props.open, async (open) => {
  if (!import.meta.client) return
  if (open) {
    previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    document.body.style.overflow = 'hidden'
    await nextTick()
    panelRef.value?.focus({ preventScroll: true })
  } else {
    document.body.style.overflow = ''
    dragOffset.value = 0
    isDragging.value = false
    previouslyFocused?.focus?.({ preventScroll: true })
    previouslyFocused = null
  }
})

function onKeydown(event: KeyboardEvent) {
  if (!props.open) return
  if (event.key === 'Escape') {
    close()
    return
  }
  // Focus trap: keep Tab inside the panel
  if (event.key === 'Tab' && panelRef.value) {
    const items = Array.from(panelRef.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ))
    if (items.length === 0) {
      event.preventDefault()
      return
    }
    const first = items[0]!
    const last = items[items.length - 1]!
    const active = document.activeElement
    if (event.shiftKey && (active === first || active === panelRef.value)) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && active === last) {
      event.preventDefault()
      first.focus()
    }
  }
}

onMounted(() => {
  if (import.meta.client) window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('keydown', onKeydown)
    document.body.style.overflow = ''
  }
})

// Drag-to-dismiss (touch handle only).
function onHandlePointerDown(event: PointerEvent) {
  if (props.persistent) return
  if (event.pointerType !== 'touch') return
  dragStartY.value = event.clientY
  isDragging.value = true
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
}

function onHandlePointerMove(event: PointerEvent) {
  if (!isDragging.value || dragStartY.value === null) return
  const dy = event.clientY - dragStartY.value
  dragOffset.value = Math.max(0, dy)
}

function onHandlePointerEnd() {
  if (!isDragging.value) return
  isDragging.value = false
  const panelHeight = panelRef.value?.getBoundingClientRect().height ?? 400
  if (dragOffset.value > panelHeight * 0.3) {
    close()
  } else {
    dragOffset.value = 0
  }
  dragStartY.value = null
}
</script>

<template>
  <Teleport to="body">
    <Transition name="sheet">
      <div v-if="open" class="sheet-backdrop" @click="onBackdropClick" />
    </Transition>
    <Transition name="sheet">
      <div v-if="open" class="sheet-container" @click.self="onBackdropClick">
        <div
          ref="panelRef"
          class="sheet-panel"
          :style="{ transform: dragOffset > 0 ? `translateY(${dragOffset}px)` : undefined, transition: isDragging ? 'none' : undefined }"
          role="dialog"
          aria-modal="true"
          tabindex="-1"
          :aria-labelledby="title ? titleId : undefined"
        >
          <div
            v-if="!persistent"
            aria-hidden="true"
            class="sheet-handle md:hidden"
            @pointerdown="onHandlePointerDown"
            @pointermove="onHandlePointerMove"
            @pointerup="onHandlePointerEnd"
            @pointercancel="onHandlePointerEnd"
          />

          <div v-if="title || $slots.header" class="flex items-center justify-between pt-1 pb-3">
            <slot name="header">
              <h2 :id="titleId" class="text-base font-semibold text-themed">{{ title }}</h2>
            </slot>
            <button
              v-if="!persistent"
              type="button"
              class="w-8 h-8 flex items-center justify-center rounded-full glass-subtle text-themed-muted hover:text-themed transition-colors"
              :aria-label="t('a11y.close')"
              @click="close"
            >
              <AppIcon name="close" :size="16" />
            </button>
          </div>

          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
