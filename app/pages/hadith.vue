<script setup lang="ts">
/**
 * Hadith collection page.
 * Curated hadiths with Arabic text and translations, categorized.
 */
import { HADITHS, HADITH_CATEGORIES, type Hadith } from '~/data/hadiths'

const { t, locale } = useI18n()

const selectedCategory = ref<string>('all')
const searchQuery = ref('')

const filteredHadiths = computed(() => {
  let result = HADITHS

  if (selectedCategory.value !== 'all') {
    result = result.filter(h => h.category === selectedCategory.value)
  }

  if (searchQuery.value.trim().length >= 2) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(h => {
      const translation = h.translations[locale.value as keyof typeof h.translations] || h.translations.en
      return (
        translation.toLowerCase().includes(q) ||
        h.arabic.includes(searchQuery.value) ||
        h.narrator?.toLowerCase().includes(q) ||
        h.source.toLowerCase().includes(q)
      )
    })
  }

  return result
})

// Expanded hadiths (to show full details)
const expandedIds = ref<Set<number>>(new Set())

function toggleHadith(id: number) {
  if (expandedIds.value.has(id)) {
    expandedIds.value.delete(id)
  } else {
    expandedIds.value.add(id)
  }
  expandedIds.value = new Set(expandedIds.value)
}

function getTranslation(hadith: Hadith): string {
  return hadith.translations[locale.value as keyof typeof hadith.translations] || hadith.translations.en
}

const categoryIcons: Record<string, string> = {
  faith: '☪',
  character: '💎',
  prayer: '🕌',
  knowledge: '📚',
  community: '🤝',
  daily: '🏡',
  mercy: '💛',
  deeds: '✨',
}
</script>

<template>
  <div class="px-4 pt-6 space-y-5 max-w-lg mx-auto">
    <!-- Header -->
    <header class="animate-fade-in">
      <h1 class="text-2xl font-semibold">
        {{ t('hadith.title') }}
      </h1>
      <p class="text-sm text-themed-muted mt-1">
        {{ t('hadith.subtitle') }}
      </p>
    </header>

    <!-- Search -->
    <div class="animate-fade-in stagger-1">
      <GlassInput
        v-model="searchQuery"
        :placeholder="t('hadith.search')"
        icon="🔍"
      />
    </div>

    <!-- Category filter -->
    <div class="flex gap-2 overflow-x-auto pb-2 no-scrollbar animate-fade-in stagger-2">
      <button
        :class="[
          'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all',
          selectedCategory === 'all'
            ? 'bg-[var(--color-primary)] text-white'
            : 'glass-subtle text-themed-secondary'
        ]"
        @click="selectedCategory = 'all'"
      >
        {{ t('hadith.all') }}
      </button>
      <button
        v-for="cat in HADITH_CATEGORIES"
        :key="cat"
        :class="[
          'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all',
          selectedCategory === cat
            ? 'bg-[var(--color-primary)] text-white'
            : 'glass-subtle text-themed-secondary'
        ]"
        @click="selectedCategory = cat"
      >
        {{ categoryIcons[cat] }} {{ t(`hadith.cat_${cat}`) }}
      </button>
    </div>

    <!-- Hadith list -->
    <div class="space-y-3">
      <div
        v-for="hadith in filteredHadiths"
        :key="hadith.id"
        class="animate-fade-in"
      >
        <GlassCard>
          <button
            class="w-full text-left space-y-3"
            @click="toggleHadith(hadith.id)"
          >
            <!-- Category + Source -->
            <div class="flex items-center justify-between">
              <span class="text-xs text-themed-faint glass-subtle px-2 py-0.5 rounded-full">
                {{ categoryIcons[hadith.category] }} {{ t(`hadith.cat_${hadith.category}`) }}
              </span>
              <span class="text-[10px] text-themed-faint">
                {{ hadith.source }}
              </span>
            </div>

            <!-- Arabic text -->
            <p class="font-arabic text-xl text-right leading-[2.2] text-themed" dir="rtl">
              {{ hadith.arabic }}
            </p>

            <!-- Translation (always visible) -->
            <p class="text-sm text-themed-secondary leading-relaxed">
              {{ getTranslation(hadith) }}
            </p>

            <!-- Expanded: narrator + all translations -->
            <Transition name="expand">
              <div v-if="expandedIds.has(hadith.id)" class="space-y-2 pt-2 border-t border-[var(--glass-border)]">
                <!-- Narrator -->
                <p v-if="hadith.narrator" class="text-xs text-[var(--color-gold)]">
                  {{ t('hadith.narrator') }}: {{ hadith.narrator }}
                </p>

                <!-- Other translations -->
                <div v-for="lang in ['de', 'en', 'tr'].filter(l => l !== locale)" :key="lang">
                  <p class="text-[10px] text-themed-faint uppercase">
                    {{ lang === 'de' ? 'Deutsch' : lang === 'en' ? 'English' : 'Türkçe' }}
                  </p>
                  <p class="text-xs text-themed-muted leading-relaxed">
                    {{ hadith.translations[lang as keyof typeof hadith.translations] }}
                  </p>
                </div>
              </div>
            </Transition>
          </button>
        </GlassCard>
      </div>
    </div>

    <!-- Count -->
    <p v-if="filteredHadiths.length > 0" class="text-center text-xs text-themed-faint pb-4">
      {{ filteredHadiths.length }} {{ t('hadith.hadiths') }}
    </p>
    <p v-else class="text-center text-sm text-themed-muted py-8">
      {{ t('hadith.noResults') }}
    </p>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.25s ease;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
