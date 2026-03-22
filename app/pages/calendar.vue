<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="px-4 pt-6 space-y-5 max-w-lg mx-auto">
    <header>
      <h1 class="text-2xl font-semibold">
        {{ t('calendar.title') }}
      </h1>
    </header>

    <GlassCard variant="default" padding="lg">
      <div class="text-center py-8 space-y-3">
        <p class="text-4xl">📅</p>
        <p class="text-white/50 text-sm">
          Islamischer Kalender & Feiertage werden in Phase 3 implementiert.
        </p>
        <p class="text-white/30 text-xs">
          Hijri-Kalender, Feiertage, Kandil-Nächte & Countdowns
        </p>
      </div>
    </GlassCard>
  </div>
</template>
