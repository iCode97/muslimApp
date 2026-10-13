<script setup lang="ts">
/**
 * Bottom sheet with the explanation of a holiday and/or the recommended
 * fasting days that fall on a date. Opened from the list, the countdown and
 * the calendar grid.
 */
import { FASTING_INFO, pickLocalized, type FastingKind } from '~/data/holiday-info'
import type { Holiday } from '~/composables/useHolidays'

const props = withDefaults(defineProps<{
  open: boolean
  holiday?: Holiday | null
  fastingKinds?: FastingKind[]
  /** Hijri date line, e.g. "10. Muharram 1448". */
  hijriLabel?: string
  /** Gregorian date line, shown for days without a holiday. */
  dateLabel?: string
}>(), {
  holiday: null,
  fastingKinds: () => [],
  hijriLabel: undefined,
  dateLabel: undefined,
})

const emit = defineEmits<{ 'update:open': [value: boolean] }>()

const { t, locale } = useI18n()
const haptics = useHaptics()
const { getHolidayName, getHolidayDescription, getHolidayInfo, exportHolidayIcs } = useHolidays()

const exportNote = ref<string | null>(null)
let noteTimer: ReturnType<typeof setTimeout> | undefined
onBeforeUnmount(() => clearTimeout(noteTimer))
watch(() => props.open, () => (exportNote.value = null))

const title = computed(() => {
  if (props.holiday) return getHolidayName(props.holiday)
  return props.fastingKinds.length === 1
    ? t(`calendar.fasting.${props.fastingKinds[0]}`)
    : t('calendar.fastingDayTitle')
})
// A lone fasting block would repeat the sheet title
const showBlockTitle = computed(() => !!props.holiday || props.fastingKinds.length > 1)
const info = computed(() => (props.holiday ? getHolidayInfo(props.holiday) : undefined))
const isKandil = computed(() => !!props.holiday && (props.holiday.type === 'kandil' || props.holiday.isKandil))

const fastingBlocks = computed(() =>
  props.fastingKinds.map(kind => ({
    kind,
    title: t(`calendar.fasting.${kind}`),
    text: pickLocalized(FASTING_INFO[kind], locale.value),
    source: FASTING_INFO[kind].source,
  })),
)

function addToCalendar() {
  if (!props.holiday) return
  haptics.light()
  const ok = exportHolidayIcs(props.holiday)
  exportNote.value = ok ? t('calendar.exportDone') : t('calendar.exportUnavailable')
  clearTimeout(noteTimer)
  noteTimer = setTimeout(() => (exportNote.value = null), 4000)
}
</script>

<template>
  <BottomSheet :open="open" :title="title" @update:open="emit('update:open', $event)">
    <div class="space-y-4 pb-1">
      <!-- Holiday header: date + description -->
      <div v-if="holiday" class="flex items-start gap-3">
        <span class="text-3xl shrink-0" aria-hidden="true">{{ holiday.icon }}</span>
        <div class="min-w-0">
          <p v-if="holiday.gregorianDate" class="text-sm font-medium text-themed">
            {{ holiday.gregorianDate }}
          </p>
          <p v-if="hijriLabel" class="text-xs text-themed-muted">
            {{ hijriLabel }}
          </p>
          <p class="text-xs text-themed-faint mt-0.5" dir="auto">
            {{ getHolidayDescription(holiday) }}
          </p>
        </div>
      </div>

      <p v-else-if="dateLabel || hijriLabel" class="text-xs text-themed-muted">
        {{ [dateLabel, hijriLabel].filter(Boolean).join(' · ') }}
      </p>

      <!-- Meaning & practices -->
      <section v-if="info" class="space-y-1.5">
        <p class="text-sm text-themed-secondary leading-relaxed" dir="auto">
          {{ info.text }}
        </p>
        <p class="text-[11px] text-themed-faint">
          {{ t('calendar.source', { source: info.source }) }}
        </p>
        <p v-if="isKandil" class="text-xs text-themed-muted leading-relaxed">
          {{ t('calendar.kandilNote') }}
        </p>
      </section>

      <!-- Recommended fasting days on this date -->
      <section
        v-for="block in fastingBlocks"
        :key="block.kind"
        class="space-y-1.5 rounded-2xl glass-subtle p-3"
      >
        <h3 v-if="showBlockTitle" class="text-sm font-semibold text-themed">
          {{ block.title }}
        </h3>
        <p class="text-sm text-themed-secondary leading-relaxed" dir="auto">
          {{ block.text }}
        </p>
        <p class="text-[11px] text-themed-faint">
          {{ t('calendar.source', { source: block.source }) }}
        </p>
      </section>

      <p class="text-xs text-themed-muted leading-relaxed">
        {{ t('calendar.dateNote') }}
      </p>

      <LearnDraftBadge />

      <div v-if="holiday" class="space-y-2">
        <GlassButton
          variant="primary"
          class="w-full"
          :disabled="!holiday.gregorianIso"
          @click="addToCalendar"
        >
          <AppIcon name="calendar" :size="18" class="me-2" />
          {{ t('calendar.addToCalendar') }}
        </GlassButton>
        <p v-if="exportNote" role="status" class="text-xs text-themed-muted text-center">
          {{ exportNote }}
        </p>
      </div>
    </div>
  </BottomSheet>
</template>
