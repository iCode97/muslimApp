<script setup lang="ts">
/**
 * Favorites — all hearted Quran verses, stored locally.
 * Shows Arabic + the translation matching the app language, links to the surah.
 */

const { t, locale } = useI18n()
const favorites = useFavorites()

onMounted(() => favorites.load())

// Preferred translation resource ID per app locale
const LOCALE_TRANSLATION: Record<string, number> = { tr: 52, de: 27, en: 20 }

function translationFor(fav: { translations: { id: number, text: string }[] }): string {
  const preferred = LOCALE_TRANSLATION[locale.value] ?? 20
  return fav.translations.find(tr => tr.id === preferred)?.text
    ?? fav.translations[0]?.text
    ?? ''
}

const dateFormat = computed(() => new Intl.DateTimeFormat(locale.value, { dateStyle: 'medium' }))
</script>

<template>
  <div class="app-container pt-6 pb-8 space-y-5 max-w-3xl mx-auto">
    <header>
      <h1 class="text-2xl font-semibold">
        {{ t('favorites.title') }}
      </h1>
      <p class="text-sm text-themed-muted mt-1">
        {{ t('favorites.subtitle') }}
      </p>
    </header>

    <!-- Empty state -->
    <GlassCard v-if="favorites.count.value === 0" variant="subtle">
      <div class="text-center py-8 space-y-3">
        <span class="text-4xl">🤍</span>
        <p class="text-sm text-themed-secondary">{{ t('favorites.empty') }}</p>
        <p class="text-xs text-themed-faint">{{ t('favorites.emptyHint') }}</p>
        <NuxtLink to="/quran">
          <GlassButton variant="primary" size="sm" class="mt-2">
            {{ t('quran.title') }} →
          </GlassButton>
        </NuxtLink>
      </div>
    </GlassCard>

    <!-- Favorite verses -->
    <div v-else class="space-y-3">
      <GlassCard
        v-for="fav in favorites.favorites.value"
        :key="fav.verseKey"
        class="animate-fade-in"
      >
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <NuxtLink
              :to="`/quran/${fav.surahId}`"
              class="text-xs font-semibold text-[var(--color-primary-light)] hover:underline"
            >
              {{ t('quran.verse') }} {{ fav.verseKey }} →
            </NuxtLink>
            <button
              class="text-themed-faint hover:text-red-400 transition-colors"
              :aria-label="t('favorites.remove')"
              @click="favorites.remove(fav.verseKey)"
            >
              <AppIcon name="close" :size="16" />
            </button>
          </div>

          <p
            class="font-arabic text-xl leading-loose text-themed text-right"
            dir="rtl"
            lang="ar"
          >
            {{ fav.textUthmani }}
          </p>

          <p v-if="translationFor(fav)" class="text-sm text-themed-secondary leading-relaxed pt-2 border-t border-[var(--glass-border)]">
            {{ translationFor(fav) }}
          </p>

          <p class="text-[10px] text-themed-faint">
            ♥ {{ dateFormat.format(fav.savedAt) }}
          </p>
        </div>
      </GlassCard>
    </div>
  </div>
</template>
