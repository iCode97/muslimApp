<script setup lang="ts">
/**
 * Adhkar — recited routines (morning, evening, after prayer, …) with
 * counters. Card mode: one dhikr at a time, tap anywhere on the card to
 * count, auto-advance when its count is reached. List mode: all items with
 * their counters. Progress persists per day (useAdhkar).
 *
 * Deep link: /adhkar?set=morning|evening|after-prayer|… — without a query the
 * set is picked by time of day (morning from Fajr until Asr, evening after).
 */
import {
  ADHKAR_SETS,
  adhkarSetKey,
  getAdhkarSet,
  isAdhkarSetId,
  type AdhkarSetId,
  type Dhikr,
} from '~/data/adhkar'
import { firstOpenDhikr, nextOpenDhikr, suggestAdhkarSet } from '~/utils/adhkar'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const adhkar = useAdhkar()
const haptics = useHaptics()
const confirm = useConfirm()
const prayerTimes = usePrayerTimes()

useHead({ title: () => t('adhkar.title') })

const AUTO_ADVANCE_MS = 550

function querySet(): AdhkarSetId | null {
  const q = route.query.set
  return isAdhkarSetId(q) ? q : null
}

// SSR renders the queried set (or morning); the time-of-day choice happens on mount.
const selectedId = ref<AdhkarSetId>(querySet() ?? 'morning')
const set = computed(() => getAdhkarSet(selectedId.value) ?? ADHKAR_SETS[0]!)
const items = computed(() => set.value.items)
const counts = computed(() => adhkar.countsFor(selectedId.value))
const progress = computed(() => adhkar.progressFor(selectedId.value))
const setName = (id: AdhkarSetId) => t(`adhkar.sets.${adhkarSetKey(id)}`)

const currentIndex = ref(0)
const reviewing = ref(false) // browsing a completed set instead of the completion screen
const announcement = ref('')
let advanceTimer: ReturnType<typeof setTimeout> | undefined

const currentItem = computed<Dhikr>(() => items.value[Math.min(currentIndex.value, items.value.length - 1)]!)
const mode = computed(() => adhkar.prefs.value.mode)
const showTransliteration = computed({
  get: () => adhkar.prefs.value.showTransliteration,
  set: v => adhkar.setPref('showTransliteration', v),
})
const showTranslation = computed({
  get: () => adhkar.prefs.value.showTranslation,
  set: v => adhkar.setPref('showTranslation', v),
})
const showCompletion = computed(() => mode.value === 'card' && progress.value.complete && !reviewing.value)

const streakSet = computed(() =>
  selectedId.value === 'morning' || selectedId.value === 'evening' ? selectedId.value : null,
)
const streak = computed(() => (streakSet.value ? adhkar.streak(streakSet.value) : 0))
const otherSet = computed<AdhkarSetId | null>(() =>
  selectedId.value === 'morning' ? 'evening' : selectedId.value === 'evening' ? 'morning' : null,
)

function resetPosition() {
  clearTimeout(advanceTimer)
  reviewing.value = false
  const idx = firstOpenDhikr(items.value, counts.value)
  currentIndex.value = idx >= 0 ? idx : 0
}

function selectSet(id: AdhkarSetId) {
  haptics.light()
  if (id !== selectedId.value) {
    selectedId.value = id
    resetPosition()
  }
  if (route.query.set !== id) router.replace({ query: { ...route.query, set: id } })
}

// Follow deep links while the page is open (e.g. a reminder notification).
watch(() => route.query.set, () => {
  const q = querySet()
  if (q && q !== selectedId.value) {
    selectedId.value = q
    resetPosition()
  }
})

function counterLabel(item: Dhikr): string {
  return t('adhkar.counterAria', { count: adhkar.countOf(selectedId.value, item), total: item.repeat })
}

function countItem(item: Dhikr, index: number) {
  const before = adhkar.countOf(selectedId.value, item)
  if (before >= item.repeat) {
    // Already complete: in card mode a tap moves on to the next open item.
    if (mode.value === 'card') advance(index)
    return
  }
  const result = adhkar.increment(selectedId.value, item)
  if (result.setCompleted) {
    haptics.success()
    announcement.value = t('adhkar.completeAnnounce', { name: setName(selectedId.value) })
  }
  else if (result.itemCompleted) {
    haptics.success()
    announcement.value = t('adhkar.itemDoneAnnounce')
  }
  else {
    haptics.medium()
  }

  if (mode.value === 'card' && (result.itemCompleted || result.setCompleted)) {
    clearTimeout(advanceTimer)
    advanceTimer = setTimeout(() => advance(index), AUTO_ADVANCE_MS)
  }
}

function advance(from: number) {
  clearTimeout(advanceTimer)
  if (progress.value.complete) {
    if (reviewing.value && from < items.value.length - 1) currentIndex.value = from + 1
    return
  }
  const next = nextOpenDhikr(items.value, counts.value, from)
  if (next >= 0) currentIndex.value = next
}

function tapCard() {
  countItem(currentItem.value, currentIndex.value)
}

function go(delta: number) {
  clearTimeout(advanceTimer)
  haptics.tap()
  const next = currentIndex.value + delta
  if (next >= 0 && next < items.value.length) currentIndex.value = next
}

function setMode(next: 'card' | 'list') {
  haptics.light()
  adhkar.setPref('mode', next)
  if (next === 'card') resetPosition()
}

async function resetSet() {
  if (progress.value.doneReps > 0) {
    const ok = await confirm({ message: t('adhkar.resetConfirm'), confirmLabel: t('common.reset'), danger: true })
    if (!ok) return
  }
  adhkar.resetSet(selectedId.value)
  resetPosition()
  announcement.value = t('adhkar.resetDone')
}

function reviewItems() {
  reviewing.value = true
  currentIndex.value = 0
}

function onVisibility() {
  if (document.visibilityState === 'visible') adhkar.ensureToday()
}

onMounted(() => {
  adhkar.load()
  if (!querySet()) {
    const prayers = prayerTimes.data.value?.prayers ?? []
    const fajr = prayers.find(p => p.name === 'Fajr')?.timestamp
    const asr = prayers.find(p => p.name === 'Asr')?.timestamp
    selectedId.value = suggestAdhkarSet(new Date(), { fajr, asr })
  }
  resetPosition()
  document.addEventListener('visibilitychange', onVisibility)
})

onUnmounted(() => {
  clearTimeout(advanceTimer)
  document.removeEventListener('visibilitychange', onVisibility)
})
</script>

<template>
  <div class="app-container pt-6 space-y-5 pb-6">
    <!-- Header -->
    <header class="animate-fade-in">
      <h1 class="text-2xl font-semibold">{{ t('adhkar.title') }}</h1>
      <p class="text-sm text-themed-muted mt-1">{{ t('adhkar.subtitle') }}</p>
    </header>

    <!-- Set chips -->
    <div
      role="group"
      :aria-label="t('adhkar.setsLabel')"
      class="flex gap-2 overflow-x-auto pb-2 no-scrollbar animate-fade-in stagger-1"
    >
      <button
        v-for="s in ADHKAR_SETS"
        :key="s.id"
        type="button"
        :aria-pressed="selectedId === s.id"
        :class="[
          'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all',
          selectedId === s.id ? 'bg-[var(--color-primary)] text-white' : 'glass-subtle text-themed-secondary',
        ]"
        @click="selectSet(s.id)"
      >
        <AppIcon :name="s.icon" :size="14" />
        {{ setName(s.id) }}
        <AppIcon
          v-if="adhkar.progressFor(s.id).complete"
          name="check"
          :size="12"
          :stroke="2.4"
        />
      </button>
    </div>

    <p class="text-sm text-themed-muted -mt-2">{{ t(`adhkar.setDesc.${adhkarSetKey(selectedId)}`) }}</p>

    <!-- Progress -->
    <ProgressBar
      :label="t('adhkar.progressLabel', { name: setName(selectedId) })"
      :current="progress.doneItems"
      :total="progress.totalItems"
      :percent="progress.percent"
    />

    <!-- View options -->
    <div class="flex items-center justify-between gap-3 flex-wrap">
      <div role="group" :aria-label="t('adhkar.viewMode')" class="glass-subtle rounded-full p-1 flex">
        <button
          type="button"
          :aria-pressed="mode === 'card'"
          :class="['px-3 py-1 rounded-full text-xs font-medium transition-all', mode === 'card' ? 'bg-[var(--color-primary)] text-white' : 'text-themed-secondary']"
          @click="setMode('card')"
        >
          {{ t('adhkar.modeCard') }}
        </button>
        <button
          type="button"
          :aria-pressed="mode === 'list'"
          :class="['px-3 py-1 rounded-full text-xs font-medium transition-all', mode === 'list' ? 'bg-[var(--color-primary)] text-white' : 'text-themed-secondary']"
          @click="setMode('list')"
        >
          {{ t('adhkar.modeList') }}
        </button>
      </div>
      <div class="flex items-center gap-4">
        <label class="flex items-center gap-2 text-xs text-themed-secondary">
          <span id="adhkar-translit-label">{{ t('adhkar.showTransliteration') }}</span>
          <ToggleSwitch v-model="showTransliteration" size="sm" aria-labelledby="adhkar-translit-label" />
        </label>
        <label class="flex items-center gap-2 text-xs text-themed-secondary">
          <span id="adhkar-translation-label">{{ t('adhkar.showTranslation') }}</span>
          <ToggleSwitch v-model="showTranslation" size="sm" aria-labelledby="adhkar-translation-label" />
        </label>
      </div>
    </div>

    <!-- Screen-reader announcements -->
    <p class="sr-only" role="status" aria-live="polite">{{ announcement }}</p>

    <!-- Completion screen -->
    <GlassCard v-if="showCompletion" variant="primary" padding="lg" class="text-center animate-fade-in">
      <div class="space-y-3">
        <span class="inline-flex text-[var(--color-primary-light)]" aria-hidden="true">
          <AppIcon name="checkCircle" :size="48" />
        </span>
        <h2 class="text-xl font-semibold">{{ t('adhkar.completeTitle', { name: setName(selectedId) }) }}</h2>
        <p class="text-sm text-themed-secondary">{{ t('adhkar.completeBody') }}</p>
        <p v-if="streakSet && streak > 0" class="text-sm text-[var(--color-gold)] font-medium">
          <span aria-hidden="true">🔥</span> {{ t('adhkar.streak', { n: streak }, streak) }}
        </p>
        <div class="flex flex-col sm:flex-row gap-2 justify-center pt-2">
          <button
            v-if="otherSet"
            type="button"
            class="px-4 py-2.5 rounded-xl bg-[var(--color-primary)] text-white text-sm font-medium"
            @click="selectSet(otherSet)"
          >
            {{ t('adhkar.goToSet', { name: setName(otherSet) }) }}
          </button>
          <button type="button" class="px-4 py-2.5 rounded-xl glass-subtle text-sm" @click="reviewItems">
            {{ t('adhkar.review') }}
          </button>
          <button type="button" class="px-4 py-2.5 rounded-xl glass-subtle text-sm text-themed-muted" @click="resetSet">
            {{ t('common.reset') }}
          </button>
        </div>
      </div>
    </GlassCard>

    <!-- Card (reading) mode -->
    <section v-else-if="mode === 'card'" :aria-label="setName(selectedId)" class="space-y-3">
      <div
        :key="currentItem.id"
        class="glass-strong rounded-3xl p-5 cursor-pointer select-none animate-fade-in"
        @click="tapCard"
      >
        <AdhkarItemBody
          :item="currentItem"
          :position="t('adhkar.position', { current: currentIndex + 1, total: items.length })"
          :show-transliteration="showTransliteration"
          :show-translation="showTranslation"
        />
        <div class="flex flex-col items-center gap-2 pt-5">
          <AdhkarCounter
            :count="adhkar.countOf(selectedId, currentItem)"
            :total="currentItem.repeat"
            :label="counterLabel(currentItem)"
            @count="tapCard"
          />
          <p class="text-[11px] text-themed-faint" aria-hidden="true">{{ t('adhkar.tapHint') }}</p>
        </div>
      </div>

      <nav :aria-label="t('adhkar.navLabel')" class="flex items-center justify-between gap-3">
        <button
          type="button"
          class="flex items-center gap-1 px-3 py-2 rounded-xl glass-subtle text-sm disabled:opacity-30"
          :disabled="currentIndex === 0"
          @click="go(-1)"
        >
          <AppIcon name="arrowLeft" :size="16" /> {{ t('adhkar.prev') }}
        </button>
        <span class="text-xs text-themed-faint tabular-nums" aria-hidden="true">{{ currentIndex + 1 }} / {{ items.length }}</span>
        <button
          type="button"
          class="flex items-center gap-1 px-3 py-2 rounded-xl glass-subtle text-sm disabled:opacity-30"
          :disabled="currentIndex >= items.length - 1"
          @click="go(1)"
        >
          {{ t('adhkar.next') }} <AppIcon name="arrowRight" :size="16" />
        </button>
      </nav>
    </section>

    <!-- List mode -->
    <ol v-else class="space-y-3 list-none p-0">
      <li v-for="(item, idx) in items" :key="item.id">
        <GlassCard>
          <AdhkarItemBody
            :item="item"
            :position="t('adhkar.position', { current: idx + 1, total: items.length })"
            :show-transliteration="showTransliteration"
            :show-translation="showTranslation"
            size="md"
          />
          <div class="flex justify-end pt-3">
            <AdhkarCounter
              size="sm"
              :count="adhkar.countOf(selectedId, item)"
              :total="item.repeat"
              :label="counterLabel(item)"
              @count="countItem(item, idx)"
            />
          </div>
        </GlassCard>
      </li>
    </ol>

    <!-- Reset -->
    <div v-if="!showCompletion" class="flex justify-center">
      <button
        type="button"
        class="text-xs text-themed-faint hover:text-[var(--color-danger)] transition-colors px-3 py-2"
        @click="resetSet"
      >
        {{ t('common.reset') }}
      </button>
    </div>

    <LearnDraftBadge />
  </div>
</template>
