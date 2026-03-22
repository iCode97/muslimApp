<script setup lang="ts">
/**
 * Quran — Surah overview with search and reading progress.
 */

const { t } = useI18n()

const activeTab = ref<'surahs' | 'search'>('surahs')
</script>

<template>
  <div class="px-4 pt-6 space-y-4 max-w-lg mx-auto">
    <header>
      <h1 class="text-2xl font-semibold">
        {{ t('quran.title') }}
      </h1>
      <p class="text-sm text-white/50 mt-1">
        114 {{ t('quran.surahs') }} · Arabisch · Türkisch · Deutsch
      </p>
    </header>

    <!-- Reading Progress / Bookmark -->
    <ReadingProgress />

    <!-- Tab Switch -->
    <div class="flex gap-2">
      <GlassButton
        :variant="activeTab === 'surahs' ? 'primary' : 'default'"
        size="sm"
        @click="activeTab = 'surahs'"
      >
        📖 {{ t('quran.surahs') }}
      </GlassButton>
      <GlassButton
        :variant="activeTab === 'search' ? 'primary' : 'default'"
        size="sm"
        @click="activeTab = 'search'"
      >
        🔍 Suche
      </GlassButton>
    </div>

    <!-- Content -->
    <SurahList v-if="activeTab === 'surahs'" />
    <QuranSearch v-else />
  </div>
</template>
