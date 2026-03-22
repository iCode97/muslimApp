<script setup lang="ts">
const { t, locale, setLocale, locales } = useI18n()
const { location } = useLocation()
const theme = useTheme()

// Available locales from config
const availableLocales = computed(() => {
  return (locales.value as Array<{ code: string, name: string }>).map(l => ({
    code: l.code,
    name: l.name,
  }))
})

function switchLocale(code: string) {
  setLocale(code)
  if (import.meta.client) {
    localStorage.setItem('muslimapp-locale', code)
  }
}

function switchTheme(mode: 'dark' | 'light' | 'system') {
  theme.setTheme(mode)
}
</script>

<template>
  <div class="px-4 pt-6 space-y-5 max-w-lg mx-auto">
    <header>
      <h1 class="text-2xl font-semibold">
        {{ t('settings.title') }}
      </h1>
    </header>

    <!-- Theme -->
    <GlassCard>
      <div class="space-y-3">
        <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
          {{ t('settings.theme') }}
        </h3>
        <div class="flex gap-2">
          <button
            v-for="mode in (['dark', 'light', 'system'] as const)"
            :key="mode"
            :class="[
              'flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all duration-200',
              theme.mode.value === mode
                ? 'bg-[var(--color-primary)] text-white'
                : 'glass-subtle text-themed-secondary hover:text-themed',
            ]"
            @click="switchTheme(mode)"
          >
            {{ mode === 'dark' ? '🌙' : mode === 'light' ? '☀️' : '💻' }}
            {{ t(`settings.theme${mode.charAt(0).toUpperCase() + mode.slice(1)}`) }}
          </button>
        </div>
      </div>
    </GlassCard>

    <!-- Language -->
    <GlassCard>
      <div class="space-y-3">
        <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
          {{ t('settings.language') }}
        </h3>
        <div class="flex gap-2">
          <button
            v-for="loc in availableLocales"
            :key="loc.code"
            :class="[
              'flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all duration-200',
              locale === loc.code
                ? 'bg-[var(--color-primary)] text-white'
                : 'glass-subtle text-themed-secondary hover:text-themed',
            ]"
            @click="switchLocale(loc.code)"
          >
            {{ loc.code === 'de' ? '🇩🇪' : loc.code === 'tr' ? '🇹🇷' : '🇬🇧' }}
            {{ loc.name }}
          </button>
        </div>
      </div>
    </GlassCard>

    <!-- Location -->
    <GlassCard>
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
          {{ t('settings.location') }}
        </h3>
        <p v-if="location" class="text-themed-secondary">
          📍 {{ location.displayName || `${location.city}, ${location.country}` }}
        </p>
        <p v-else class="text-themed-muted italic text-sm">
          {{ t('settings.noLocation') }}
        </p>
        <p v-if="location" class="text-xs text-themed-faint">
          {{ location.latitude.toFixed(4) }}°N, {{ location.longitude.toFixed(4) }}°E
        </p>
      </div>
    </GlassCard>

    <!-- Calculation Method -->
    <GlassCard>
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
          {{ t('settings.calculationMethod') }}
        </h3>
        <p class="text-themed-secondary">
          🕌 Diyanet İşleri Başkanlığı (Method 13)
        </p>
        <p class="text-xs text-themed-faint">
          {{ t('settings.moreMethodsLater') }}
        </p>
      </div>
    </GlassCard>

    <!-- About -->
    <GlassCard variant="subtle">
      <div class="space-y-2">
        <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
          {{ t('settings.about') }}
        </h3>
        <p class="text-themed-muted text-sm">
          MuslimApp v0.4.0 — Phase 4
        </p>
        <p class="text-themed-faint text-xs">
          {{ t('settings.apiInfo') }}
        </p>
      </div>
    </GlassCard>
  </div>
</template>
