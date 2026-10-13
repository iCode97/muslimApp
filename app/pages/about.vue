<script setup lang="ts">
/**
 * About & Sources page.
 * Documents data sources, API providers, and content origins for transparency.
 */
import { HADITHS } from '~/data/hadiths'
import { DUAS, DUA_CATEGORIES } from '~/data/duas'
import { ALLAH_NAMES } from '~/data/allah-names'
import { SEERAH_CHAPTERS } from '~/data/seerah'
import { SURAH_NAMES_DE } from '~/data/surah-names-de'
import { PRAYER_METHODS } from '~/data/prayer-methods'

const { t } = useI18n()

// All counts are derived from the data, never hardcoded.
const stats = computed(() => ({
  surahs: Object.keys(SURAH_NAMES_DE).length,
  hadiths: HADITHS.length,
  duas: DUAS.length,
  duaCategories: DUA_CATEGORIES.length,
  names: ALLAH_NAMES.length,
  seerah: SEERAH_CHAPTERS.length,
  methods: PRAYER_METHODS.length,
}))

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
  <div class="app-container pt-6 pb-8 space-y-6">
    <header>
      <h1 class="text-2xl font-semibold">{{ t('about.title') }}</h1>
      <p class="text-sm text-themed-muted mt-1">{{ t('about.subtitle') }}</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- App Info -->
    <section class="space-y-2">
      <h2 class="text-xs font-medium text-themed-muted uppercase tracking-wider px-1">
        {{ t('about.appSection') }}
      </h2>
      <GlassCard>
        <div class="space-y-2">
          <p class="font-medium text-sm">{{ t('about.appVersion', { version: APP_VERSION }) }}</p>
          <p class="text-xs text-themed-muted leading-relaxed">{{ t('about.appDescription') }}</p>
        </div>
      </GlassCard>
    </section>

    <!-- Inhalte im Überblick -->
    <section class="space-y-2">
      <h2 class="text-xs font-medium text-themed-muted uppercase tracking-wider px-1">
        {{ t('about.contentSection') }}
      </h2>
      <GlassCard>
        <ul class="flex flex-wrap gap-1.5">
          <li class="text-[11px] px-2.5 py-1 rounded-full glass-subtle text-themed-secondary">{{ t('about.statSurahs', { count: stats.surahs }) }}</li>
          <li class="text-[11px] px-2.5 py-1 rounded-full glass-subtle text-themed-secondary">{{ t('about.statHadiths', { count: stats.hadiths }) }}</li>
          <li class="text-[11px] px-2.5 py-1 rounded-full glass-subtle text-themed-secondary">{{ t('about.statDuas', { count: stats.duas }) }}</li>
          <li class="text-[11px] px-2.5 py-1 rounded-full glass-subtle text-themed-secondary">{{ t('about.statNames', { count: stats.names }) }}</li>
          <li class="text-[11px] px-2.5 py-1 rounded-full glass-subtle text-themed-secondary">{{ t('about.statSeerah', { count: stats.seerah }) }}</li>
        </ul>
      </GlassCard>
    </section>

    <!-- Koran -->
    <section class="space-y-2">
      <h2 class="text-xs font-medium text-themed-muted uppercase tracking-wider px-1">
        {{ t('about.quranSection') }}
      </h2>
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
      <h2 class="text-xs font-medium text-themed-muted uppercase tracking-wider px-1">
        {{ t('about.hadithSection') }}
      </h2>
      <GlassCard>
        <div class="space-y-3">
          <p class="text-sm font-medium">{{ t('about.hadithCount', { count: stats.hadiths }) }}</p>

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
      <h2 class="text-xs font-medium text-themed-muted uppercase tracking-wider px-1">
        {{ t('about.duaSection') }}
      </h2>
      <GlassCard>
        <div class="space-y-3">
          <p class="text-sm font-medium">{{ t('about.duaCount', { count: stats.duas, categories: stats.duaCategories }) }}</p>

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
      <h2 class="text-xs font-medium text-themed-muted uppercase tracking-wider px-1">
        {{ t('about.prayerSection') }}
      </h2>
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
              <span class="text-xs text-themed-secondary text-right">{{ t('about.prayerMethodsVal', { count: stats.methods }) }}</span>
            </div>
          </div>

          <p class="text-[11px] text-themed-faint border-t border-[var(--glass-border)] pt-2.5 leading-relaxed">
            {{ t('about.prayerNote') }}
          </p>
        </div>
      </GlassCard>
    </section>

    <!-- Karten & Orte -->
    <section class="space-y-2">
      <h2 class="text-xs font-medium text-themed-muted uppercase tracking-wider px-1">
        {{ t('about.mapsSection') }}
      </h2>
      <GlassCard>
        <div class="space-y-2.5">
          <p class="text-xs text-themed-muted leading-relaxed">{{ t('about.mapsBody') }}</p>
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            class="block text-[11px] text-themed-faint underline-offset-2 hover:underline"
          >{{ t('about.mapsAttribution') }}</a>
        </div>
      </GlassCard>
    </section>

    <!-- Islamischer Kalender -->
    <section class="space-y-2">
      <h2 class="text-xs font-medium text-themed-muted uppercase tracking-wider px-1">
        {{ t('about.calendarSection') }}
      </h2>
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
      <h2 class="text-xs font-medium text-themed-muted uppercase tracking-wider px-1">
        {{ t('about.locationSection') }}
      </h2>
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

    <!-- Push-Benachrichtigungen (Datenschutz) -->
    <section class="space-y-2">
      <h2 class="text-xs font-medium text-themed-muted uppercase tracking-wider px-1">
        {{ t('push.aboutTitle') }}
      </h2>
      <GlassCard variant="subtle">
        <p class="text-xs text-themed-muted leading-relaxed">
          {{ t('push.aboutText') }}
        </p>
      </GlassCard>
    </section>

    <!-- Hinweis -->
    <section class="space-y-2">
      <h2 class="text-xs font-medium text-themed-muted uppercase tracking-wider px-1">
        {{ t('about.disclaimerSection') }}
      </h2>
      <GlassCard variant="subtle">
        <p class="text-xs text-themed-muted leading-relaxed">
          {{ t('about.disclaimerText') }}
        </p>
      </GlassCard>
    </section>

    <!-- Technologie -->
    <section class="space-y-2 md:col-span-2">
      <h2 class="text-xs font-medium text-themed-muted uppercase tracking-wider px-1">
        {{ t('about.techSection') }}
      </h2>
      <GlassCard variant="subtle">
        <p class="text-xs text-themed-faint">{{ t('about.techStack') }}</p>
      </GlassCard>
    </section>
    </div><!-- end grid -->
  </div>
</template>
