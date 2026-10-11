<script setup lang="ts">
/**
 * UpdatePrompt — small glass toast for service worker lifecycle events:
 *  - "new version available" (waiting SW) with Update + dismiss
 *  - "ready to work offline" hint, shown once per device, auto-hides
 * Client-only; mounted in app.vue.
 */
const { t } = useI18n()
const pwa = usePWA()

const OFFLINE_HINT_KEY = 'muslimapp-pwa-offline-hint-shown'
const OFFLINE_HINT_MS = 6000

const updating = ref(false)
const showOfflineHint = ref(false)
let offlineTimer: ReturnType<typeof setTimeout> | undefined

function readFlag(): boolean {
  try {
    return localStorage.getItem(OFFLINE_HINT_KEY) === '1'
  } catch {
    return false
  }
}

function writeFlag() {
  try {
    localStorage.setItem(OFFLINE_HINT_KEY, '1')
  } catch { /* storage unavailable — hint may show again, harmless */ }
}

watch(() => pwa.offlineReady.value, (ready) => {
  if (!ready) return
  pwa.dismissOfflineReady()
  if (readFlag()) return
  writeFlag()
  showOfflineHint.value = true
  clearTimeout(offlineTimer)
  offlineTimer = setTimeout(() => { showOfflineHint.value = false }, OFFLINE_HINT_MS)
}, { immediate: true })

onBeforeUnmount(() => clearTimeout(offlineTimer))

async function update() {
  if (updating.value) return
  updating.value = true
  try {
    await pwa.updateServiceWorker()
  } catch {
    updating.value = false
  }
}

function closeOfflineHint() {
  clearTimeout(offlineTimer)
  showOfflineHint.value = false
}
</script>

<template>
  <div class="pwa-toast-region" aria-live="polite">
    <Transition name="pwa-toast">
      <div
        v-if="pwa.needRefresh.value"
        key="update"
        role="status"
        class="pwa-toast glass-strong"
      >
        <span class="pwa-toast-dot" aria-hidden="true" />
        <p class="flex-1 text-sm font-medium text-themed">
          {{ t('pwa.updateAvailable') }}
        </p>
        <button
          type="button"
          class="pwa-toast-action glass-primary"
          :disabled="updating"
          @click="update"
        >
          {{ updating ? t('pwa.updating') : t('pwa.update') }}
        </button>
        <button
          type="button"
          class="pwa-toast-close text-themed-muted"
          :aria-label="t('pwa.dismiss')"
          @click="pwa.dismissUpdate()"
        >
          <AppIcon name="close" :size="16" />
        </button>
      </div>

      <div
        v-else-if="showOfflineHint"
        key="offline"
        role="status"
        class="pwa-toast glass-strong"
      >
        <AppIcon name="check" :size="16" class="text-[var(--color-primary-light)] flex-shrink-0" />
        <p class="flex-1 text-sm text-themed-secondary">
          {{ t('pwa.offlineReady') }}
        </p>
        <button
          type="button"
          class="pwa-toast-close text-themed-muted"
          :aria-label="t('pwa.dismiss')"
          @click="closeOfflineHint"
        >
          <AppIcon name="close" :size="16" />
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.pwa-toast-region {
  position: fixed;
  left: 0;
  right: 0;
  top: calc(env(safe-area-inset-top, 0px) + 12px);
  z-index: 70;
  display: flex;
  justify-content: center;
  padding: 0 16px;
  pointer-events: none;
}

.pwa-toast {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 420px;
  padding: 10px 10px 10px 14px;
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.pwa-toast-dot {
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  border-radius: 9999px;
  background: var(--color-primary-light);
  box-shadow: 0 0 10px var(--color-primary-glow);
}

.pwa-toast-action {
  flex-shrink: 0;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 0.8125rem;
  font-weight: 600;
  white-space: nowrap;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.pwa-toast-action:active {
  transform: scale(0.97);
}

.pwa-toast-action:disabled {
  opacity: 0.6;
}

.pwa-toast-close {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  transition: background-color 0.15s ease;
}

.pwa-toast-close:hover {
  background: var(--glass-bg-subtle);
}

.pwa-toast-enter-active,
.pwa-toast-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.pwa-toast-enter-from,
.pwa-toast-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

@media (prefers-reduced-motion: reduce) {
  .pwa-toast-enter-active,
  .pwa-toast-leave-active {
    transition: opacity 0.15s ease;
  }

  .pwa-toast-enter-from,
  .pwa-toast-leave-to {
    transform: none;
  }
}
</style>
