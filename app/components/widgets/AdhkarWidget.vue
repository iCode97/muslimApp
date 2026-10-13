<script setup lang="ts">
/**
 * Dashboard widget — today's morning/evening adhkar status, streaks and a
 * call to action for the set that fits the current time of day.
 */
import { adhkarSetKey } from '~/data/adhkar'
import { ADHKAR_STREAK_SET_IDS, suggestAdhkarSet, type AdhkarStreakSetId } from '~/utils/adhkar'

const { t } = useI18n()
const adhkar = useAdhkar()
const prayerTimes = usePrayerTimes()

const suggested = ref<AdhkarStreakSetId>('morning')
const mounted = ref(false)

onMounted(() => {
  adhkar.load()
  const prayers = prayerTimes.data.value?.prayers ?? []
  suggested.value = suggestAdhkarSet(new Date(), {
    fajr: prayers.find(p => p.name === 'Fajr')?.timestamp,
    asr: prayers.find(p => p.name === 'Asr')?.timestamp,
  })
  mounted.value = true
})

const name = (id: AdhkarStreakSetId) => t(`adhkar.sets.${adhkarSetKey(id)}`)

const rows = computed(() =>
  ADHKAR_STREAK_SET_IDS.map((id) => {
    const p = adhkar.progressFor(id)
    return { id, progress: p, done: p.complete, streak: mounted.value ? adhkar.streak(id) : 0 }
  }),
)

const allDone = computed(() => rows.value.every(r => r.done))

/** Suggested set first; if it's done, fall back to the other open one. */
const ctaSet = computed<AdhkarStreakSetId>(() => {
  const s = rows.value.find(r => r.id === suggested.value)
  if (s && !s.done) return s.id
  return rows.value.find(r => !r.done)?.id ?? suggested.value
})
const ctaStarted = computed(() => (rows.value.find(r => r.id === ctaSet.value)?.progress.doneReps ?? 0) > 0)
</script>

<template>
  <GlassCard class="h-full">
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
          {{ t('adhkar.widgetName') }}
        </h3>
        <NuxtLink to="/adhkar" class="text-xs text-themed-faint hover:text-themed-secondary transition-colors">
          {{ t('widgets.openFull') }} ›
        </NuxtLink>
      </div>

      <ul class="grid grid-cols-2 gap-2">
        <li v-for="row in rows" :key="row.id">
          <NuxtLink
            :to="`/adhkar?set=${row.id}`"
            :class="[
              'flex items-center gap-2 rounded-xl px-3 py-2 transition-colors',
              row.done ? 'glass-primary' : 'glass-subtle',
            ]"
          >
            <AppIcon :name="row.id === 'morning' ? 'sun' : 'moon'" :size="18" class="text-[var(--color-gold)] flex-shrink-0" />
            <span class="flex-1 min-w-0">
              <span class="block text-sm font-medium truncate">{{ name(row.id) }}</span>
              <span class="block text-[11px] text-themed-muted">
                <template v-if="row.done">{{ t('adhkar.widgetDone') }}</template>
                <template v-else-if="row.progress.doneReps > 0">{{ t('adhkar.widgetProgress', { done: row.progress.doneItems, total: row.progress.totalItems }) }}</template>
                <template v-else>{{ t('adhkar.widgetOpen') }}</template>
                <template v-if="row.streak > 0"> · <span aria-hidden="true">🔥</span>{{ t('adhkar.widgetStreak', { n: row.streak }) }}</template>
              </span>
            </span>
            <AppIcon v-if="row.done" name="check" :size="16" :stroke="2.4" class="text-[var(--color-primary-light)] flex-shrink-0" />
          </NuxtLink>
        </li>
      </ul>

      <p v-if="allDone" class="text-xs text-themed-secondary text-center pt-1">
        {{ t('adhkar.widgetAllDone') }}
      </p>
      <NuxtLink
        v-else
        :to="`/adhkar?set=${ctaSet}`"
        class="block w-full text-center px-4 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-medium"
      >
        {{ ctaStarted ? t('adhkar.widgetContinue', { name: name(ctaSet) }) : t('adhkar.widgetStart', { name: name(ctaSet) }) }}
      </NuxtLink>
    </div>
  </GlassCard>
</template>
