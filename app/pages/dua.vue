<script setup lang="ts">
/**
 * Dua (Supplications) page.
 * Shows duas categorized by occasion with Arabic, transliteration, and translation.
 */
import { DUAS, DUA_CATEGORIES, type Dua } from '~/data/duas'

const { t, locale } = useI18n()

const selectedCategory = ref<string>('all')

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

    <!-- Category filter -->
    <div class="flex gap-2 overflow-x-auto pb-2 no-scrollbar animate-fade-in stagger-1">
      <button
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
        :class="[
          'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all',
          selectedCategory === cat
            ? 'bg-[var(--color-primary)] text-white'
            : 'glass-subtle text-themed-secondary'
        ]"
        @click="selectedCategory = cat"
      >
        {{ categoryIcons[cat] }} {{ t(`dua.cat_${cat}`) }}
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
            class="w-full text-left space-y-3"
            @click="toggleDua(dua.id)"
          >
            <!-- Category badge -->
            <div class="flex items-center justify-between">
              <span class="text-xs text-themed-faint glass-subtle px-2 py-0.5 rounded-full">
                {{ categoryIcons[dua.category] }} {{ t(`dua.cat_${dua.category}`) }}
              </span>
              <span v-if="dua.source" class="text-[10px] text-themed-faint">
                {{ dua.source }}
              </span>
            </div>

            <!-- Arabic text -->
            <p class="font-arabic text-xl text-right leading-[2.2] text-themed" dir="rtl">
              {{ dua.arabic }}
            </p>

            <!-- Expanded content -->
            <Transition name="expand">
              <div v-if="expandedIds.has(dua.id)" class="space-y-3 pt-2 border-t border-[var(--glass-border)]">
                <!-- Transliteration -->
                <p class="text-sm text-[var(--color-gold)] italic leading-relaxed">
                  {{ dua.transliteration }}
                </p>

                <!-- Translation -->
                <p class="text-sm text-themed-secondary leading-relaxed">
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

