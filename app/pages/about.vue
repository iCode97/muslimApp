<script setup lang="ts">
/**
 * About & Sources page.
 * Documents data sources, API providers, and content origins for transparency.
 */
const { t } = useI18n()

const hadithSources = [
  'Sahih al-Bukhari',
  'Sahih Muslim',
  'Sunan Abu Dawud',
  'Jami at-Tirmidhi',
  'Sunan an-Nasa\'i',
  'Muwatta Malik',
]

const duaSources = [
  'Koran',
  'Sahih al-Bukhari',
  'Sahih Muslim',
  'Sunan Abu Dawud',
  'Hisnul Muslim',
]
</script>

<template>
  <div class="px-4 pt-6 pb-8 space-y-6 max-w-lg mx-auto">
    <header>
      <h1 class="text-2xl font-semibold">{{ t('about.title') }}</h1>
      <p class="text-sm text-themed-muted mt-1">{{ t('about.subtitle') }}</p>
    </header>

    <!-- App Info -->
    <section class="space-y-2">
      <h3 class="text-xs font-medium text-themed-muted uppercase tracking-wider px-1">
        {{ t('about.appSection') }}
      </h3>
      <GlassCard>
        <div class="space-y-2">
          <p class="font-medium text-sm">{{ t('about.appVersion') }}</p>
          <p class="text-xs text-themed-muted leading-relaxed">{{ t('about.appDescription') }}</p>
        </div>
      </GlassCard>
    </section>

    <!-- Koran -->
    <section class="space-y-2">
      <h3 class="text-xs font-medium text-themed-muted uppercase tracking-wider px-1">
        {{ t('about.quranSection') }}
      </h3>
      <GlassCard>
        <div class="space-y-3">
          <p class="text-xs text-themed-faint">{{ t('about.quranApi') }}</p>

          <div class="space-y-2.5">
            <div class="flex justify-between items-start gap-4">
              <span class="text-xs text-themed-muted shrink-0">{{ t('about.quranArabicLabel') }}</span>
              <span class="text-xs text-themed-secondary text-right">{{ t('about.quranArabicVal') }}</span>
            </div>
            <div class="flex justify-between items-start gap-4">
              <span class="text-xs text-themed-muted shrink-0">{{ t('about.quranTrLabel') }}</span>
              <span class="text-xs text-themed-secondary text-right">{{ t('about.quranTrVal') }}</span>
            </div>
            <div class="flex justify-between items-start gap-4">
              <span class="text-xs text-themed-muted shrink-0">{{ t('about.quranDeLabel') }}</span>
              <span class="text-xs text-themed-secondary text-right">{{ t('about.quranDeVal') }}</span>
            </div>
            <div class="flex justify-between items-start gap-4">
              <span class="text-xs text-themed-muted shrink-0">{{ t('about.quranEnLabel') }}</span>
              <span class="text-xs text-themed-secondary text-right">{{ t('about.quranEnVal') }}</span>
            </div>
          </div>

          <p class="text-[11px] text-themed-faint border-t border-[var(--glass-border)] pt-2.5 leading-relaxed">
            {{ t('about.quranNote') }}
          </p>
        </div>
      </GlassCard>
    </section>

    <!-- Hadithe -->
    <section class="space-y-2">
      <h3 class="text-xs font-medium text-themed-muted uppercase tracking-wider px-1">
        {{ t('about.hadithSection') }}
      </h3>
      <GlassCard>
        <div class="space-y-3">
          <p class="text-sm font-medium">{{ t('about.hadithCount') }}</p>

          <div>
            <p class="text-xs text-themed-muted mb-2">{{ t('about.hadithSourcesLabel') }}:</p>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="src in hadithSources"
                :key="src"
                class="text-[11px] px-2.5 py-1 rounded-full glass-subtle text-themed-secondary"
              >
                {{ src }}
              </span>
            </div>
          </div>

          <p class="text-[11px] text-themed-faint border-t border-[var(--glass-border)] pt-2.5 leading-relaxed">
            {{ t('about.hadithNote') }}
          </p>
        </div>
      </GlassCard>
    </section>

    <!-- Bittgebete -->
    <section class="space-y-2">
      <h3 class="text-xs font-medium text-themed-muted uppercase tracking-wider px-1">
        {{ t('about.duaSection') }}
      </h3>
      <GlassCard>
        <div class="space-y-3">
          <p class="text-sm font-medium">{{ t('about.duaCount') }}</p>

          <div>
            <p class="text-xs text-themed-muted mb-2">{{ t('about.duaSourcesLabel') }}:</p>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="src in duaSources"
                :key="src"
                class="text-[11px] px-2.5 py-1 rounded-full glass-subtle text-themed-secondary"
              >
                {{ src }}
              </span>
            </div>
          </div>

          <p class="text-[11px] text-themed-faint border-t border-[var(--glass-border)] pt-2.5 leading-relaxed">
            {{ t('about.duaNote') }}
          </p>
        </div>
      </GlassCard>
    </section>

    <!-- Gebetszeiten -->
    <section class="space-y-2">
      <h3 class="text-xs font-medium text-themed-muted uppercase tracking-wider px-1">
        {{ t('about.prayerSection') }}
      </h3>
      <GlassCard>
        <div class="space-y-3">
          <p class="text-xs text-themed-faint">{{ t('about.prayerApi') }}</p>

          <div class="space-y-2.5">
            <div class="flex justify-between items-start gap-4">
              <span class="text-xs text-themed-muted shrink-0">{{ t('about.prayerDefaultLabel') }}</span>
              <span class="text-xs text-themed-secondary text-right">{{ t('about.prayerDefaultVal') }}</span>
            </div>
            <div class="flex justify-between items-start gap-4">
              <span class="text-xs text-themed-muted shrink-0">{{ t('about.prayerMethodsLabel') }}</span>
              <span class="text-xs text-themed-secondary text-right">{{ t('about.prayerMethodsVal') }}</span>
            </div>
          </div>

          <p class="text-[11px] text-themed-faint border-t border-[var(--glass-border)] pt-2.5 leading-relaxed">
            {{ t('about.prayerNote') }}
          </p>
        </div>
      </GlassCard>
    </section>

    <!-- Islamischer Kalender -->
    <section class="space-y-2">
      <h3 class="text-xs font-medium text-themed-muted uppercase tracking-wider px-1">
        {{ t('about.calendarSection') }}
      </h3>
      <GlassCard>
        <div class="space-y-3">
          <p class="text-xs text-themed-faint">{{ t('about.calendarApi') }}</p>

          <div class="space-y-2.5">
            <div class="flex justify-between items-start gap-4">
              <span class="text-xs text-themed-muted shrink-0">{{ t('about.calendarHolidaysLabel') }}</span>
              <span class="text-xs text-themed-secondary text-right">{{ t('about.calendarHolidaysVal') }}</span>
            </div>
            <div class="flex justify-between items-start gap-4">
              <span class="text-xs text-themed-muted shrink-0">{{ t('about.calendarTraditionLabel') }}</span>
              <span class="text-xs text-themed-secondary text-right">{{ t('about.calendarTraditionVal') }}</span>
            </div>
          </div>

          <p class="text-[11px] text-themed-faint border-t border-[var(--glass-border)] pt-2.5 leading-relaxed">
            {{ t('about.calendarNote') }}
          </p>
        </div>
      </GlassCard>
    </section>

    <!-- Standort -->
    <section class="space-y-2">
      <h3 class="text-xs font-medium text-themed-muted uppercase tracking-wider px-1">
        {{ t('about.locationSection') }}
      </h3>
      <GlassCard>
        <div class="space-y-3">
          <p class="text-xs text-themed-faint">OpenStreetMap Nominatim</p>

          <div class="space-y-2.5">
            <div class="flex justify-between items-start gap-4">
              <span class="text-xs text-themed-muted shrink-0">{{ t('about.locationPurposeLabel') }}</span>
              <span class="text-xs text-themed-secondary text-right">{{ t('about.locationPurposeVal') }}</span>
            </div>
            <div class="flex justify-between items-start gap-4">
              <span class="text-xs text-themed-muted shrink-0">{{ t('about.locationStorageLabel') }}</span>
              <span class="text-xs text-themed-secondary text-right">{{ t('about.locationStorageVal') }}</span>
            </div>
          </div>
        </div>
      </GlassCard>
    </section>

    <!-- Hinweis -->
    <section class="space-y-2">
      <h3 class="text-xs font-medium text-themed-muted uppercase tracking-wider px-1">
        {{ t('about.disclaimerSection') }}
      </h3>
      <GlassCard variant="subtle">
        <p class="text-xs text-themed-muted leading-relaxed">
          {{ t('about.disclaimerText') }}
        </p>
      </GlassCard>
    </section>

    <!-- Technologie -->
    <section class="space-y-2">
      <h3 class="text-xs font-medium text-themed-muted uppercase tracking-wider px-1">
        {{ t('about.techSection') }}
      </h3>
      <GlassCard variant="subtle">
        <p class="text-xs text-themed-faint">{{ t('about.techStack') }}</p>
      </GlassCard>
    </section>
  </div>
</template>
