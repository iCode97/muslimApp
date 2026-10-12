<script setup lang="ts">
/**
 * Small Gregorian <-> Hijri date converter. Uses the existing Aladhan proxy routes;
 * one request per tap on "Convert" (no requests while typing).
 */
import { todayIso } from '~/utils/hijri-dates'

const { t } = useI18n()
const haptics = useHaptics()
const {
  hijriMonths, getMonthName, getMonthInfo, gregorianToHijri, hijriToGregorian, formatGregorian,
} = useHolidays()

type Mode = 'toHijri' | 'toGregorian'
const mode = ref<Mode>('toHijri')

const gregorian = ref('')
const hDay = ref('1')
const hMonth = ref('1')
const hYear = ref('')

const busy = ref(false)
const failed = ref(false)
const result = ref<string | null>(null)

onMounted(() => {
  gregorian.value = todayIso()
})

function reset() {
  result.value = null
  failed.value = false
}
watch(mode, reset)

const hijriValid = computed(() => {
  const d = Number(hDay.value)
  const y = Number(hYear.value)
  return Number.isInteger(d) && d >= 1 && d <= 30 && Number.isInteger(y) && y >= 1300 && y <= 1600
})
const canConvert = computed(() =>
  mode.value === 'toHijri' ? /^\d{4}-\d{2}-\d{2}$/.test(gregorian.value) : hijriValid.value,
)

function formatHijri(p: { day: number, month: number, year: number }): string {
  const info = getMonthInfo(p.month)
  return `${p.day}. ${info ? getMonthName(info) : p.month} ${p.year} AH`
}

async function convert() {
  if (!canConvert.value || busy.value) return
  haptics.light()
  busy.value = true
  reset()
  try {
    if (mode.value === 'toHijri') {
      result.value = formatHijri(await gregorianToHijri(gregorian.value))
    }
    else {
      result.value = formatGregorian(
        await hijriToGregorian(Number(hDay.value), Number(hMonth.value), Number(hYear.value)),
      )
    }
  }
  catch {
    failed.value = true
  }
  finally {
    busy.value = false
  }
}

const modes: Array<{ id: Mode, label: string }> = [
  { id: 'toHijri', label: 'calendar.converter.toHijri' },
  { id: 'toGregorian', label: 'calendar.converter.toGregorian' },
]
</script>

<template>
  <GlassCard variant="default" padding="md">
    <h2 class="text-sm font-semibold text-themed-muted uppercase tracking-wider">
      {{ t('calendar.converter.title') }}
    </h2>

    <!-- Direction -->
    <div role="group" :aria-label="t('calendar.converter.title')" class="mt-3 grid grid-cols-2 gap-2">
      <button
        v-for="m in modes"
        :key="m.id"
        type="button"
        :aria-pressed="mode === m.id"
        :class="[
          'min-h-[2.75rem] rounded-xl px-3 text-xs font-medium transition-all',
          mode === m.id ? 'bg-[var(--color-primary)] text-white' : 'glass-subtle text-themed-secondary',
        ]"
        @click="mode = m.id"
      >
        {{ t(m.label) }}
      </button>
    </div>

    <form class="mt-4 space-y-3" @submit.prevent="convert">
      <!-- Gregorian -> Hijri -->
      <template v-if="mode === 'toHijri'">
        <label class="block space-y-1">
          <span class="text-xs text-themed-muted">{{ t('calendar.converter.gregorianDate') }}</span>
          <input
            v-model="gregorian"
            type="date"
            min="1900-01-01"
            max="2100-12-31"
            class="field"
            @input="reset"
          >
        </label>
      </template>

      <!-- Hijri -> Gregorian -->
      <template v-else>
        <div class="grid grid-cols-[4.5rem_1fr_5.5rem] gap-2">
          <label class="block space-y-1">
            <span class="text-xs text-themed-muted">{{ t('calendar.converter.day') }}</span>
            <input v-model="hDay" type="number" inputmode="numeric" min="1" max="30" class="field" @input="reset">
          </label>
          <label class="block space-y-1 min-w-0">
            <span class="text-xs text-themed-muted">{{ t('calendar.converter.month') }}</span>
            <select v-model="hMonth" class="field" @change="reset">
              <option v-for="m in hijriMonths" :key="m.number" :value="String(m.number)">
                {{ m.number }}. {{ getMonthName(m) }}
              </option>
            </select>
          </label>
          <label class="block space-y-1">
            <span class="text-xs text-themed-muted">{{ t('calendar.converter.year') }}</span>
            <input
              v-model="hYear"
              type="number"
              inputmode="numeric"
              min="1300"
              max="1600"
              placeholder="1448"
              class="field"
              @input="reset"
            >
          </label>
        </div>
        <p v-if="hYear && !hijriValid" class="text-xs text-[var(--color-danger)]" role="alert">
          {{ t('calendar.converter.invalid') }}
        </p>
      </template>

      <GlassButton variant="primary" class="w-full" :disabled="!canConvert || busy" @click="convert">
        {{ busy ? t('calendar.converter.converting') : t('calendar.converter.convert') }}
      </GlassButton>
    </form>

    <div aria-live="polite" class="mt-3">
      <div v-if="result" class="rounded-xl glass-subtle p-3 text-center">
        <p class="text-xs text-themed-muted">{{ t('calendar.converter.result') }}</p>
        <p class="mt-0.5 text-base font-semibold text-themed">{{ result }}</p>
      </div>
      <p v-else-if="failed" class="text-sm text-[var(--color-danger)]" role="alert">
        {{ t('calendar.converter.error') }}
      </p>
    </div>

    <p class="mt-3 text-[11px] text-themed-faint leading-relaxed">
      {{ t('calendar.dateNote') }}
    </p>
  </GlassCard>
</template>

<style scoped>
.field {
  width: 100%;
  min-height: 2.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.75rem;
  background: var(--glass-bg-subtle);
  border: 1px solid var(--glass-border);
  color: var(--color-text);
  font-size: 1rem; /* >= 16px: prevents iOS zoom on focus */
  outline: none;
}
.field:focus-visible {
  outline: 2px solid var(--color-primary-light);
  outline-offset: 1px;
}
</style>
