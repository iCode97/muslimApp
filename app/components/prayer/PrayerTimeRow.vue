<script setup lang="ts">
interface Props {
  name: string
  time: string
  passed: boolean
  isNext: boolean
}

const props = defineProps<Props>()

const { t } = useI18n()
const prayerTimes = usePrayerTimes()

const displayName = computed(() => {
  return t(prayerTimes.PRAYER_I18N[props.name] ?? props.name)
})

// Icons for each prayer
const icons: Record<string, string> = {
  Fajr: '\u{1F319}',       // crescent moon
  Sunrise: '\u{1F305}',    // sunrise
  Dhuhr: '\u{2600}\u{FE0F}', // sun
  Asr: '\u{1F324}\u{FE0F}',  // sun behind cloud
  Maghrib: '\u{1F307}',    // sunset
  Isha: '\u{1F30C}',       // milky way
}
</script>

<template>
  <div
    :class="[
      'flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-300',
      isNext ? 'glass-primary' : '',
      passed && !isNext ? 'opacity-40' : '',
    ]"
  >
    <div class="flex items-center gap-3">
      <span class="text-lg w-7 text-center">{{ icons[props.name] || '' }}</span>
      <span :class="['font-medium', isNext ? 'text-[var(--color-primary-light)]' : '']">
        {{ displayName }}
      </span>
    </div>

    <div class="flex items-center gap-2">
      <span
        :class="[
          'tabular-nums font-medium',
          isNext ? 'text-white text-lg' : 'text-white/70',
        ]"
      >
        {{ time }}
      </span>
      <span
        v-if="isNext"
        class="w-2 h-2 rounded-full bg-[var(--color-primary-light)] animate-pulse"
      />
    </div>
  </div>
</template>
