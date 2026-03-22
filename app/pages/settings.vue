<script setup lang="ts">
const { t } = useI18n()
const { location } = useLocation()
</script>

<template>
  <div class="px-4 pt-6 space-y-5 max-w-lg mx-auto">
    <header>
      <h1 class="text-2xl font-semibold">
        {{ t('settings.title') }}
      </h1>
    </header>

    <!-- Location -->
    <GlassCard>
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-white/60 uppercase tracking-wider">
          {{ t('settings.location') }}
        </h3>
        <p v-if="location" class="text-white/80">
          📍 {{ location.city }}, {{ location.country }}
        </p>
        <p v-else class="text-white/40 italic text-sm">
          Kein Standort festgelegt
        </p>
        <p v-if="location" class="text-xs text-white/30">
          {{ location.latitude.toFixed(4) }}°N, {{ location.longitude.toFixed(4) }}°E
        </p>
      </div>
    </GlassCard>

    <!-- Calculation Method -->
    <GlassCard>
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-white/60 uppercase tracking-wider">
          {{ t('settings.calculationMethod') }}
        </h3>
        <p class="text-white/80">
          🕌 Diyanet Isleri Baskanligi (Method 13)
        </p>
        <p class="text-xs text-white/30">
          Weitere Methoden in einer zukünftigen Version
        </p>
      </div>
    </GlassCard>

    <!-- Language -->
    <GlassCard>
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-white/60 uppercase tracking-wider">
          {{ t('settings.language') }}
        </h3>
        <p class="text-white/80">
          🌐 Deutsch
        </p>
        <p class="text-xs text-white/30">
          Türkisch & Englisch in einer zukünftigen Version
        </p>
      </div>
    </GlassCard>

    <!-- About -->
    <GlassCard variant="subtle">
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-white/60 uppercase tracking-wider">
          {{ t('settings.about') }}
        </h3>
        <p class="text-white/50 text-sm">
          MuslimApp v0.1.0 — Phase 1 (MVP)
        </p>
        <p class="text-white/30 text-xs">
          Gebetszeiten via Aladhan API • Koran via quran.com API
        </p>
      </div>
    </GlassCard>
  </div>
</template>
