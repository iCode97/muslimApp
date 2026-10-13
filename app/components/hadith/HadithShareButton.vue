<script setup lang="ts">
/**
 * Share one hadith: Web Share API (text + source + deep link) with a clipboard fallback.
 * Emits `toast` with a localized message when the fallback copy succeeds or fails.
 */
import type { Hadith } from '~/data/hadiths'

const props = defineProps<{
  hadith: Hadith
  /** Translation in the current locale. */
  text: string
}>()

const emit = defineEmits<{ toast: [message: string] }>()

const { t } = useI18n()
const haptics = useHaptics()

function buildText(url: string): string {
  const narrator = props.hadith.narrator ? ` (${t('hadith.narrator')}: ${props.hadith.narrator})` : ''
  return `${props.hadith.arabic}\n\n„${props.text}“\n— ${props.hadith.source}${narrator}\n\n${url}`
}

async function copy(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  }
  catch { /* fall through to legacy copy */ }
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    ta.remove()
    return ok
  }
  catch {
    return false
  }
}

async function share() {
  haptics.light()
  const url = `${window.location.origin}/hadith?id=${props.hadith.id}`
  const text = buildText(url)
  if (typeof navigator.share === 'function') {
    try {
      await navigator.share({ title: `${t('hadith.title')} · ${props.hadith.source}`, text })
      return
    }
    catch (err) {
      // User dismissed the share sheet — nothing to do.
      if (err instanceof DOMException && err.name === 'AbortError') return
      // Otherwise fall back to copying.
    }
  }
  const ok = await copy(text)
  emit('toast', ok ? t('hadith.copied') : t('hadith.copyFailed'))
}
</script>

<template>
  <button
    type="button"
    class="share-btn inline-flex items-center justify-center w-8 h-8 rounded-full text-themed-muted hover:text-themed transition-colors"
    :aria-label="t('hadith.shareAria', { source: hadith.source })"
    :title="t('hadith.share')"
    @click.stop="share"
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  </button>
</template>

<style scoped>
.share-btn:focus-visible {
  outline: 2px solid var(--color-primary-light);
  outline-offset: 2px;
}
</style>
