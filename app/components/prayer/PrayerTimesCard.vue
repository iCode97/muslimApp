<script setup lang="ts">
const { t } = useI18n()
const prayerTimes = usePrayerTimes()

const prayers = computed(() => prayerTimes.data.value?.prayers ?? [])
const tomorrowPrayers = computed(() => prayerTimes.data.value?.tomorrowPrayers ?? [])
const nextPrayerName = computed(() => prayerTimes.data.value?.nextPrayer?.name ?? null)
const isNextDayActive = computed(() => prayerTimes.data.value?.nextPrayer?.isNextDay ?? false)

const showTomorrow = computed(() => tomorrowPrayers.value.length > 0)

// Tomorrow: only Fajr visible by default, rest expandable
const tomorrowFajr = computed(() => tomorrowPrayers.value.find(p => p.name === 'Fajr') || null)
const tomorrowRest = computed(() => tomorrowPrayers.value.filter(p => p.name !== 'Fajr'))
const showAllTomorrow = ref(false)
</script>

<template>
  <GlassCard variant="default" padding="sm">
    <div class="flex items-center justify-between px-4 pt-2 pb-1">
      <h2 class="text-sm font-semibold text-themed-muted uppercase tracking-wider">
        {{ t('dashboard.allPrayers') }}
      </h2>
      <span class="text-xs text-themed-faint">{{ t('prayer.diyanet') }}</span>
    </div>

    <div v-if="prayerTimes.loading.value" class="py-2">
      <SkeletonLoader variant="prayer-row" :rows="6" />
    </div>

    <div v-else-if="prayerTimes.error.value" class="px-4 py-6 text-center">
      <p class="text-[var(--color-danger)] text-sm">{{ prayerTimes.error.value }}</p>
    </div>

    <div v-else>
      <!-- Today's prayers -->
      <div class="space-y-0.5">
        <PrayerTimeRow
          v-for="(prayer, index) in prayers"
          :key="prayer.name"
          :name="prayer.name"
          :time="prayer.time"
          :passed="prayer.passed"
          :is-next="!isNextDayActive && prayer.name === nextPrayerName"
          :class="['animate-fade-in', `stagger-${index + 1}`]"
        />
      </div>

      <!-- Tomorrow section -->
      <div v-if="showTomorrow" class="mt-3">
        <!-- Divider -->
        <div class="flex items-center gap-2 px-4 py-2">
          <div class="flex-1 h-px bg-[var(--glass-border)]" />
          <span class="text-xs font-medium text-[var(--color-gold)] flex items-center gap-1">
            <span>☀️</span>
            <span>{{ t('prayer.tomorrow') }}</span>
          </span>
          <div class="flex-1 h-px bg-[var(--glass-border)]" />
        </div>

        <!-- Tomorrow Fajr (always visible) -->
        <PrayerTimeRow
          v-if="tomorrowFajr"
          :name="tomorrowFajr.name"
          :time="tomorrowFajr.time"
          :passed="false"
          :is-next="isNextDayActive && tomorrowFajr.name === nextPrayerName"
          :is-next-day="true"
          class="animate-fade-in stagger-1"
        />

        <!-- Expand toggle -->
        <button
          v-if="tomorrowRest.length > 0"
          class="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-themed-muted hover:text-themed-secondary transition-colors"
          @click="showAllTomorrow = !showAllTomorrow"
        >
          <span>{{ showAllTomorrow ? '▲' : '▼' }}</span>
          <span>{{ showAllTomorrow ? t('prayer.showLess') : t('prayer.showMore') }}</span>
        </button>

        <!-- Remaining tomorrow prayers (collapsible) -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          leave-active-class="transition-all duration-200 ease-in"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-96"
          leave-from-class="opacity-100 max-h-96"
          leave-to-class="opacity-0 max-h-0"
        >
          <div v-if="showAllTomorrow" class="space-y-0.5 overflow-hidden">
            <PrayerTimeRow
              v-for="(prayer, index) in tomorrowRest"
              :key="`tomorrow-${prayer.name}`"
              :name="prayer.name"
              :time="prayer.time"
              :passed="false"
              :is-next="false"
              :is-next-day="true"
              :class="['animate-fade-in', `stagger-${index + 1}`]"
            />
          </div>
        </Transition>
      </div>
    </div>
  </GlassCard>
</template>
