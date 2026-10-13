<script setup lang="ts">
/**
 * Dua (Supplications) page.
 * Shows duas categorized by occasion with Arabic, transliteration, and translation.
 */
import { DUAS, DUA_CATEGORIES, type Dua } from '~/data/duas'

const { t, locale } = useI18n()
const route = useRoute()

const initialCat = typeof route.query.cat === 'string' && (DUA_CATEGORIES as readonly string[]).includes(route.query.cat)
  ? route.query.cat
  : 'all'

const selectedCategory = ref<string>(initialCat)

const filteredDuas = computed(() => {
  if (selectedCategory.value === 'all') return DUAS
  return DUAS.filter(d => d.category === selectedCategory.value)
})

// Expanded duas (to show transliteration + translation)
const expandedIds = ref<Set<number>>(new Set())

function toggleDua(id: number) {
  if (expandedIds.value.has(id)) {
    expandedIds.value.delete(id)
  } else {
    expandedIds.value.add(id)
  }
  // Force reactivity
  expandedIds.value = new Set(expandedIds.value)
}

function getTranslation(dua: Dua): string {
  return dua.translations[locale.value as keyof typeof dua.translations] || dua.translations.en
}

const categoryIcons: Record<string, string> = {
  morning: '🌅',
  evening: '🌙',
  sleep: '🛏️',
  prayer: '🕌',
  food: '🍽️',
  travel: '✈️',
  protection: '🛡️',
  forgiveness: '🤲',
  general: '💫',
  healing: '🏥',
  parents: '👨‍👩‍👧',
  anxiety: '🕊️',
  gratitude: '🙏',
}
</script>

<template>
  <div class="app-container pt-6 space-y-5">
    <!-- Header -->
    <header class="animate-fade-in">
      <h1 class="text-2xl font-semibold">
        {{ t('dua.title') }}
      </h1>
      <p class="text-sm text-themed-muted mt-1">
        {{ t('dua.subtitle') }}
      </p>
    </header>

    <!-- Adhkar (daily routines with counter) -->
    <NuxtLink
      to="/adhkar"
      class="glass-primary rounded-2xl flex items-center gap-4 p-4 animate-fade-in transition-transform active:scale-[0.99]"
    >
      <span class="w-10 h-10 rounded-xl glass-subtle flex items-center justify-center flex-shrink-0 text-[var(--color-primary-light)]" aria-hidden="true">
        <AppIcon name="adhkar" :size="22" />
      </span>
      <span class="flex-1 min-w-0">
        <span class="block font-medium text-sm">{{ t('adhkar.duaLinkTitle') }}</span>
        <span class="block text-xs text-themed-muted mt-0.5">{{ t('adhkar.duaLinkDesc') }}</span>
      </span>
      <AppIcon name="chevronRight" :size="18" class="text-themed-faint flex-shrink-0" />
    </NuxtLink>

    <!-- Category filter -->
    <div
      role="group"
      :aria-label="t('a11y.categories')"
      class="flex gap-2 overflow-x-auto pb-2 no-scrollbar animate-fade-in stagger-1"
    >
      <button
        type="button"
        :aria-pressed="selectedCategory === 'all'"
        :class="[
          'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all',
          selectedCategory === 'all'
            ? 'bg-[var(--color-primary)] text-white'
            : 'glass-subtle text-themed-secondary'
        ]"
        @click="selectedCategory = 'all'"
      >
        {{ t('dua.all') }}
      </button>
      <button
        v-for="cat in DUA_CATEGORIES"
        :key="cat"
        type="button"
        :aria-pressed="selectedCategory === cat"
        :class="[
          'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all',
          selectedCategory === cat
            ? 'bg-[var(--color-primary)] text-white'
            : 'glass-subtle text-themed-secondary'
        ]"
        @click="selectedCategory = cat"
      >
        <span aria-hidden="true">{{ categoryIcons[cat] }}</span> {{ t(`dua.cat_${cat}`) }}
      </button>
    </div>

    <!-- Duas list -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div
        v-for="dua in filteredDuas"
        :key="dua.id"
        class="animate-fade-in"
      >
        <GlassCard>
          <button
            type="button"
            class="w-full text-start space-y-3"
            :aria-expanded="expandedIds.has(dua.id)"
            @click="toggleDua(dua.id)"
          >
            <!-- Category badge -->
            <div class="flex items-center justify-between">
              <span class="text-xs text-themed-faint glass-subtle px-2 py-0.5 rounded-full">
                <span aria-hidden="true">{{ categoryIcons[dua.category] }}</span> {{ t(`dua.cat_${dua.category}`) }}
              </span>
              <span v-if="dua.source" class="text-[10px] text-themed-faint">
                {{ dua.source }}
              </span>
            </div>

            <!-- Arabic text -->
            <p class="font-arabic text-xl text-end leading-[2.2] text-themed" dir="rtl" lang="ar">
              {{ dua.arabic }}
            </p>

            <!-- Expanded content -->
            <Transition name="expand">
              <div v-if="expandedIds.has(dua.id)" class="space-y-3 pt-2 border-t border-[var(--glass-border)]">
                <!-- Transliteration -->
                <p class="text-sm text-[var(--color-gold)] italic leading-relaxed" dir="ltr">
                  {{ dua.transliteration }}
                </p>

                <!-- Translation -->
                <p class="text-sm text-themed-secondary leading-relaxed" dir="auto">
                  {{ getTranslation(dua) }}
                </p>
              </div>
            </Transition>

            <!-- Expand hint -->
            <p v-if="!expandedIds.has(dua.id)" class="text-xs text-themed-faint text-center">
              {{ t('dua.tapToExpand') }}
            </p>
          </button>
        </GlassCard>
      </div>
    </div>

    <!-- Count -->
    <p class="text-center text-xs text-themed-faint pb-4">
      {{ filteredDuas.length }} {{ t('dua.duas') }}
    </p>
  </div>
</template>

