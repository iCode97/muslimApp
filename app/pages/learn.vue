<script setup lang="ts">
/**
 * Learn hub — structured by knowledge level:
 *   🌱 Entdecken (newcomers/converts) · 🌿 Praktizieren (daily practice) · 🌳 Vertiefen (advanced)
 * The section matching the user's chosen level is highlighted.
 */
import type { KnowledgeLevel } from '~/composables/useKnowledgeLevel'

const { t } = useI18n()
const haptics = useHaptics()
const knowledge = useKnowledgeLevel()

useHead({ title: () => t('learn.title') })

onMounted(() => knowledge.load())

interface LearnItem {
  path: string
  icon: string
  label: string
  desc: string
}

interface UpcomingItem {
  id: string
  icon: string
}

interface LearnSection {
  level: KnowledgeLevel
  emoji: string
  items: LearnItem[]
  upcoming: UpcomingItem[]
}

const sections: LearnSection[] = [
  {
    level: 'discover',
    emoji: '🌱',
    items: [
      { path: '/guide', icon: 'guide', label: 'nav.guide', desc: 'more.guideDesc' },
      { path: '/names', icon: 'names', label: 'nav.names', desc: 'more.namesDesc' },
    ],
    upcoming: [
      { id: 'basics', icon: 'learn' },
      { id: 'newMuslim', icon: 'heart' },
      { id: 'glossary', icon: 'hadith' },
    ],
  },
  {
    level: 'practice',
    emoji: '🌿',
    items: [
      { path: '/dua', icon: 'dua', label: 'nav.dua', desc: 'more.duaDesc' },
      { path: '/quran', icon: 'quran', label: 'nav.quran', desc: 'learn.quranDesc' },
    ],
    upcoming: [
      { id: 'fiqh', icon: 'prayer' },
      { id: 'faq', icon: 'about' },
    ],
  },
  {
    level: 'deepen',
    emoji: '🌳',
    items: [
      { path: '/hadith', icon: 'hadith', label: 'nav.hadith', desc: 'more.hadithDesc' },
      { path: '/seerah', icon: 'seerah', label: 'nav.seerah', desc: 'more.seerahDesc' },
    ],
    upcoming: [
      { id: 'aqida', icon: 'names' },
    ],
  },
]

function selectLevel(id: KnowledgeLevel) {
  haptics.light()
  // Tapping the active level again clears the choice
  knowledge.setLevel(knowledge.level.value === id ? null : id)
}
</script>

<template>
  <div class="app-container pt-6 space-y-6">
    <header>
      <h1 class="text-2xl font-semibold">
        {{ t('learn.title') }}
      </h1>
      <p class="text-sm text-themed-muted mt-1">
        {{ t('learn.subtitle') }}
      </p>
    </header>

    <!-- Level selector -->
    <section aria-labelledby="level-heading" class="space-y-2">
      <h2 id="level-heading" class="text-sm font-medium text-themed-muted uppercase tracking-wider">
        {{ t('learn.levelHeading') }}
      </h2>
      <div class="grid grid-cols-3 gap-2" role="group" :aria-label="t('learn.levelHeading')">
        <button
          v-for="s in sections"
          :key="s.level"
          type="button"
          :aria-pressed="knowledge.level.value === s.level"
          :class="[
            'flex flex-col items-center gap-1 rounded-2xl px-1 py-3 min-h-[4.5rem] text-center transition-all active:scale-[0.97] focus-ring',
            knowledge.level.value === s.level
              ? 'glass-primary text-[var(--color-primary-light)]'
              : 'glass-subtle text-themed-secondary',
          ]"
          @click="selectLevel(s.level)"
        >
          <span class="text-xl" aria-hidden="true">{{ s.emoji }}</span>
          <span class="text-xs font-medium leading-tight">{{ t(`knowledge.${s.level}`) }}</span>
        </button>
      </div>
      <p class="text-xs text-themed-faint">
        {{ knowledge.level.value ? t(`knowledge.${knowledge.level.value}Desc`) : t('learn.levelHint') }}
      </p>
    </section>

    <!-- Sections -->
    <section
      v-for="s in sections"
      :key="s.level"
      :aria-labelledby="`learn-${s.level}`"
      :class="[
        'learn-section space-y-3',
        knowledge.level.value === s.level ? 'learn-section--active' : '',
      ]"
    >
      <div class="flex items-start gap-3">
        <span class="text-2xl leading-none mt-0.5" aria-hidden="true">{{ s.emoji }}</span>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <h2 :id="`learn-${s.level}`" class="text-lg font-semibold">
              {{ t(`knowledge.${s.level}`) }}
            </h2>
            <span
              v-if="knowledge.level.value === s.level"
              class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[var(--color-primary)] text-white"
            >
              {{ t('learn.yourLevel') }}
            </span>
          </div>
          <p class="text-xs text-themed-muted mt-0.5">{{ t(`knowledge.${s.level}Desc`) }}</p>
        </div>
      </div>

      <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <li v-for="item in s.items" :key="item.path" class="glass rounded-2xl">
          <NuxtLink
            :to="item.path"
            class="flex items-center gap-4 p-4 rounded-2xl focus-ring"
            @click="haptics.tap()"
          >
            <span class="icon-tile" aria-hidden="true">
              <AppIcon :name="item.icon" :size="22" />
            </span>
            <span class="flex-1 min-w-0">
              <span class="block font-medium text-sm">{{ t(item.label) }}</span>
              <span class="block text-xs text-themed-muted mt-0.5">{{ t(item.desc) }}</span>
            </span>
            <AppIcon name="chevronRight" :size="18" class="text-themed-faint flex-shrink-0" />
          </NuxtLink>
        </li>

        <!-- Upcoming learning paths (placeholders) -->
        <li
          v-for="up in s.upcoming"
          :key="up.id"
          class="glass-subtle rounded-2xl border border-dashed border-[var(--glass-border-strong)]"
        >
          <div class="flex items-center gap-4 p-4 opacity-80" aria-disabled="true">
            <span class="icon-tile icon-tile--muted" aria-hidden="true">
              <AppIcon :name="up.icon" :size="22" />
            </span>
            <span class="flex-1 min-w-0">
              <span class="flex items-center gap-2 flex-wrap">
                <span class="font-medium text-sm">{{ t(`learn.upcoming.${up.id}`) }}</span>
                <span class="text-[10px] text-themed-secondary glass-subtle px-2 py-0.5 rounded-full">
                  {{ t('learn.comingSoon') }}
                </span>
              </span>
              <span class="block text-xs text-themed-muted mt-0.5">{{ t(`learn.upcoming.${up.id}Desc`) }}</span>
            </span>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.icon-tile {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: 0.875rem;
  background: var(--glass-bg-subtle);
  border: 1px solid var(--glass-border);
  color: var(--color-primary-light);
}
.icon-tile--muted {
  color: var(--color-text-muted);
}

.learn-section {
  padding: 0.75rem;
  margin: 0 -0.75rem;
  border: 1px solid transparent;
  border-radius: 1.5rem;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
.learn-section--active {
  background: linear-gradient(135deg, rgba(45, 106, 79, 0.14), rgba(64, 145, 108, 0.04));
  border: 1px solid rgba(45, 106, 79, 0.35);
}

.focus-ring:focus-visible {
  outline: 2px solid var(--color-primary-light);
  outline-offset: 2px;
}
</style>
