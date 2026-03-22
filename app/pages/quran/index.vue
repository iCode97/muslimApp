<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="px-4 pt-6 space-y-5 max-w-lg mx-auto">
    <header>
      <h1 class="text-2xl font-semibold">
        {{ t('quran.title') }}
      </h1>
      <p class="text-sm text-white/50 mt-1">
        114 {{ t('quran.surahs') }}
      </p>
    </header>

    <GlassCard variant="default" padding="lg">
      <div class="text-center py-8 space-y-3">
        <p class="text-4xl">📖</p>
        <p class="text-white/50 text-sm">
          Koran-Reader wird in Phase 2 implementiert.
        </p>
        <p class="text-white/30 text-xs">
          Arabisch (Uthmani) + Elmalili Hamdi (TR) + Bubenheim (DE)
        </p>
      </div>
    </GlassCard>
  </div>
</template>
