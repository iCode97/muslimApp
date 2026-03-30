<script setup lang="ts">
/**
 * 99 Names of Allah (Asma ul-Husna)
 * Browseable list with search, category filter, and expandable details.
 */
import { ALLAH_NAMES, NAME_CATEGORIES, type AllahName } from '~/data/allah-names'

const { t, locale } = useI18n()
const progress = useProgress('names', ALLAH_NAMES.length)

const searchQuery = ref('')
const selectedCategory = ref<string>('all')

onMounted(() => progress.load())

const filteredNames = computed(() => {
  let result = ALLAH_NAMES

  if (selectedCategory.value !== 'all') {
    result = result.filter(n => n.category === selectedCategory.value)
  }

  if (searchQuery.value.trim().length >= 1) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(n =>
      n.transliteration.toLowerCase().includes(q)
      || n.arabic.includes(searchQuery.value)
      || getMeaning(n).toLowerCase().includes(q)
      || String(n.id).includes(q),
    )
  }

  return result
})

function getMeaning(name: AllahName): string {
  return name.meanings[locale.value as keyof typeof name.meanings] || name.meanings.en
}

const categoryIcons: Record<string, string> = {
  majesty: '👑',
  mercy: '💚',
  power: '⚡',
  knowledge: '📖',
  creation: '🌿',
  justice: '⚖️',
  protection: '🛡️',
  uniqueness: '✨',
}
</script>

<template>
  <div class="app-container pt-6 space-y-5">
    <!-- Header -->
    <header class="animate-fade-in">
      <h1 class="text-2xl font-semibold">
        {{ t('names.title') }}
      </h1>
      <p class="text-sm text-themed-muted mt-1">
        {{ t('names.subtitle') }}
      </p>
    </header>

    <!-- Progress -->
    <ProgressBar
      :label="t('common.progress')"
      :current="progress.summary.value.read"
      :total="progress.summary.value.total"
      :percent="progress.summary.value.percent"
      :show-reset="true"
      class="animate-fade-in stagger-1"
      @reset="progress.resetAll()"
    />

    <!-- Search -->
    <div class="animate-fade-in stagger-2">
      <GlassInput
        v-model="searchQuery"
        :placeholder="t('names.search')"
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
        {{ t('names.all') }} (99)
      </button>
      <button
        v-for="cat in NAME_CATEGORIES"
        :key="cat"
        :class="[
          'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all',
          selectedCategory === cat
            ? 'bg-[var(--color-primary)] text-white'
            : 'glass-subtle text-themed-secondary'
        ]"
        @click="selectedCategory = cat"
      >
        {{ categoryIcons[cat] }} {{ t(`names.cat_${cat}`) }}
      </button>
    </div>

    <!-- Names grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      <div
        v-for="name in filteredNames"
        :key="name.id"
        class="animate-fade-in"
      >
        <GlassCard>
          <div class="space-y-2">
            <!-- Number + Category -->
            <div class="flex items-center justify-between">
              <button
                :class="[
                  'w-8 h-8 flex items-center justify-center rounded-lg font-semibold text-xs transition-colors',
                  progress.isRead(name.id)
                    ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary-light)]'
                    : 'bg-white/5 text-[var(--color-primary-light)]'
                ]"
                @click="progress.toggleRead(name.id)"
              >
                <span v-if="progress.isRead(name.id)">✓</span>
                <span v-else>{{ name.id }}</span>
              </button>
              <span class="text-[10px] text-themed-faint glass-subtle px-2 py-0.5 rounded-full">
                {{ categoryIcons[name.category] }} {{ t(`names.cat_${name.category}`) }}
              </span>
            </div>

            <!-- Arabic name -->
            <p class="font-arabic text-2xl text-center text-[var(--color-gold)] leading-relaxed" dir="rtl">
              {{ name.arabic }}
            </p>

            <!-- Transliteration -->
            <p class="text-sm text-themed-secondary text-center font-medium">
              {{ name.transliteration }}
            </p>

            <!-- Meaning -->
            <p class="text-xs text-themed-muted text-center">
              {{ getMeaning(name) }}
            </p>
          </div>
        </GlassCard>
      </div>
    </div>

    <!-- Count -->
    <p class="text-center text-xs text-themed-faint pb-4">
      {{ filteredNames.length }} {{ t('names.names') }}
    </p>
  </div>
</template>
