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

const haptics = useHaptics()
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

// Lock body scroll while open.
watch(() => props.open, (open) => {
  if (!import.meta.client) return
  if (open) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
    dragOffset.value = 0
    isDragging.value = false
  }
})

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.open) {
    close()
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
        >
          <div
            v-if="!persistent"
            class="sheet-handle md:hidden"
            @pointerdown="onHandlePointerDown"
            @pointermove="onHandlePointerMove"
            @pointerup="onHandlePointerEnd"
            @pointercancel="onHandlePointerEnd"
          />

          <div v-if="title || $slots.header" class="flex items-center justify-between pt-1 pb-3">
            <slot name="header">
              <h3 class="text-base font-semibold text-themed">{{ title }}</h3>
            </slot>
            <button
              v-if="!persistent"
              class="w-8 h-8 flex items-center justify-center rounded-full glass-subtle text-themed-muted hover:text-themed transition-colors"
              :aria-label="'Close'"
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
