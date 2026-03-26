<script setup lang="ts">
/**
 * Tasbih Quick widget — compact counter for the dashboard.
 * Shows current mode with a tap-to-increment button.
 */
const { t } = useI18n()
const tasbih = useTasbih()

onMounted(() => {
  tasbih.loadState()
})

const isPulsing = ref(false)
function handleTap() {
  tasbih.increment()
  isPulsing.value = true
  setTimeout(() => { isPulsing.value = false }, 100)
}
</script>

<template>
  <GlassCard>
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
          {{ t('tasbih.title') }}
        </h3>
        <NuxtLink to="/tasbih" class="text-xs text-[var(--color-primary-light)]">
          {{ t('widgets.openFull') }} ›
        </NuxtLink>
      </div>

      <div class="flex items-center gap-4">
        <!-- Current dhikr -->
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate">
            {{ t(tasbih.currentMode.value.i18nKey) }}
          </p>
          <p v-if="tasbih.currentMode.value.arabic" class="font-arabic text-base text-[var(--color-gold)] truncate" dir="rtl">
            {{ tasbih.currentMode.value.arabic }}
          </p>
        </div>

        <!-- Tap counter -->
        <button
          :class="[
            'w-16 h-16 rounded-full glass-strong flex flex-col items-center justify-center',
            'active:scale-90 transition-transform duration-100 select-none',
            isPulsing ? 'scale-90' : '',
          ]"
          @click="handleTap"
        >
          <span class="text-xl font-semibold tabular-nums">{{ tasbih.state.value.count }}</span>
          <span v-if="tasbih.currentMode.value.target" class="text-[10px] text-themed-faint">
            /{{ tasbih.currentMode.value.target }}
          </span>
        </button>
      </div>
    </div>
  </GlassCard>
</template>
