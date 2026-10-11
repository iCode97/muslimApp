<script setup lang="ts">
/**
 * Custom error page (404 + generic errors). Replaces the English Nuxt default.
 * Rendered outside app.vue, so the theme has to be initialised here as well.
 */
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const { t } = useI18n()
const theme = useTheme()

onMounted(() => theme.init())

const is404 = computed(() => props.error?.statusCode === 404)
const title = computed(() => (is404.value ? t('error.notFoundTitle') : t('error.genericTitle')))
const body = computed(() => (is404.value ? t('error.notFoundBody') : t('error.genericBody')))

useHead({ title: () => `${title.value} — MuslimApp` })

function goHome() {
  clearError({ redirect: '/' })
}

function retry() {
  reloadNuxtApp({ persistState: false })
}
</script>

<template>
  <main class="error-page" role="main">
    <div class="glass-strong error-card">
      <p class="error-emoji" aria-hidden="true">{{ is404 ? '🧭' : '🌙' }}</p>
      <p class="error-code" aria-hidden="true">{{ error?.statusCode || 500 }}</p>
      <h1 class="text-xl font-semibold">{{ title }}</h1>
      <p class="text-sm text-themed-muted leading-relaxed">{{ body }}</p>

      <div class="error-actions">
        <button type="button" class="error-btn error-btn--primary" @click="goHome">
          {{ t('error.backHome') }}
        </button>
        <button v-if="!is404" type="button" class="error-btn error-btn--secondary" @click="retry">
          {{ t('error.retry') }}
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.error-page {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(1.5rem + env(safe-area-inset-top, 0px)) 1rem calc(1.5rem + env(safe-area-inset-bottom, 0px));
  color: var(--color-text);
}

.error-card {
  width: 100%;
  max-width: 24rem;
  padding: 2rem 1.5rem;
  border-radius: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.error-emoji {
  font-size: 2.5rem;
  line-height: 1;
}

.error-code {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--color-primary-light);
}

.error-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.error-btn {
  width: 100%;
  min-height: 2.75rem;
  padding: 0.625rem 1rem;
  border-radius: 0.875rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.error-btn:active {
  transform: scale(0.98);
}
.error-btn:focus-visible {
  outline: 2px solid var(--color-primary-light);
  outline-offset: 2px;
}
.error-btn--primary {
  background: var(--color-primary);
  color: #fff;
}
.error-btn--primary:hover {
  opacity: 0.9;
}
.error-btn--secondary {
  background: var(--glass-bg-subtle);
  border: 1px solid var(--glass-border);
  color: var(--color-text-secondary);
}
</style>
