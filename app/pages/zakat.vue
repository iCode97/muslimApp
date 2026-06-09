<script setup lang="ts">
/**
 * Zakat Calculator — fully offline.
 * Assets (cash, gold, silver, other) minus debts, compared against the
 * nisab threshold (85g gold / 595g silver, basis selectable), 2.5% rate.
 */

import { NISAB_GOLD_GRAMS, NISAB_SILVER_GRAMS } from '~/composables/useZakat'

const { t, locale } = useI18n()
const zakat = useZakat()

onMounted(() => zakat.load())

function onInput(field: keyof typeof zakat.inputs.value, event: Event) {
  const raw = (event.target as HTMLInputElement).value
  const num = Number.parseFloat(raw)
  ;(zakat.inputs.value as Record<string, unknown>)[field] = Number.isFinite(num) && num >= 0 ? num : 0
  zakat.save()
}

function setBasis(basis: 'gold' | 'silver') {
  zakat.inputs.value.basis = basis
  zakat.save()
}

const numberFormat = computed(() => new Intl.NumberFormat(locale.value, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}))

function fmt(value: number): string {
  return `${numberFormat.value.format(value)} ${zakat.inputs.value.currency}`
}

const assetFields = [
  { key: 'cash', labelKey: 'zakat.cash', icon: '💵' },
  { key: 'goldGrams', labelKey: 'zakat.goldGrams', icon: '🥇', unit: 'g' },
  { key: 'silverGrams', labelKey: 'zakat.silverGrams', icon: '🥈', unit: 'g' },
  { key: 'otherAssets', labelKey: 'zakat.otherAssets', icon: '📈' },
  { key: 'debts', labelKey: 'zakat.debts', icon: '➖' },
] as const
</script>

<template>
  <div class="app-container pt-6 pb-8 space-y-5 max-w-3xl mx-auto">
    <header>
      <h1 class="text-2xl font-semibold">
        {{ t('zakat.title') }}
      </h1>
      <p class="text-sm text-themed-muted mt-1">
        {{ t('zakat.subtitle') }}
      </p>
    </header>

    <!-- Result -->
    <GlassCard :variant="zakat.isDue.value ? 'primary' : 'default'">
      <div class="text-center space-y-2 py-2">
        <p class="text-sm text-themed-muted">{{ t('zakat.zakatDue') }}</p>
        <p class="text-4xl font-bold tabular-nums">
          {{ fmt(zakat.zakatAmount.value) }}
        </p>
        <p v-if="!zakat.nisabKnown.value" class="text-xs text-themed-faint">
          {{ t('zakat.enterPrices') }}
        </p>
        <p v-else-if="zakat.isDue.value" class="text-xs text-[var(--color-primary-light)]">
          ✓ {{ t('zakat.due') }}
        </p>
        <p v-else class="text-xs text-themed-faint">
          {{ t('zakat.notDue') }}
        </p>
      </div>
    </GlassCard>

    <!-- Nisab basis -->
    <GlassCard>
      <div class="space-y-3">
        <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
          {{ t('zakat.nisabBasis') }}
        </h3>
        <div class="flex gap-2">
          <button
            v-for="basis in (['gold', 'silver'] as const)"
            :key="basis"
            :class="[
              'flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all duration-200',
              zakat.inputs.value.basis === basis
                ? 'bg-[var(--color-primary)] text-white'
                : 'glass-subtle text-themed-secondary hover:text-themed',
            ]"
            @click="setBasis(basis)"
          >
            {{ basis === 'gold' ? '🥇' : '🥈' }}
            {{ t(`zakat.${basis}`) }}
            <span class="block text-[10px] opacity-75">
              {{ basis === 'gold' ? NISAB_GOLD_GRAMS : NISAB_SILVER_GRAMS }} g
            </span>
          </button>
        </div>
        <p v-if="zakat.nisabKnown.value" class="text-xs text-themed-faint">
          {{ t('zakat.nisab') }}: {{ fmt(zakat.nisab.value) }}
        </p>
      </div>
    </GlassCard>

    <!-- Metal prices -->
    <GlassCard>
      <div class="space-y-3">
        <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
          {{ t('zakat.prices') }}
        </h3>
        <div class="grid grid-cols-2 gap-3">
          <label class="space-y-1">
            <span class="text-xs text-themed-muted">🥇 {{ t('zakat.goldPrice') }}</span>
            <input
              type="number"
              min="0"
              step="0.01"
              inputmode="decimal"
              :value="zakat.inputs.value.goldPricePerGram || ''"
              :placeholder="`0.00 ${zakat.inputs.value.currency}/g`"
              class="w-full glass-subtle rounded-xl px-3 py-2.5 text-sm text-themed bg-transparent outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 tabular-nums"
              @input="onInput('goldPricePerGram', $event)"
            >
          </label>
          <label class="space-y-1">
            <span class="text-xs text-themed-muted">🥈 {{ t('zakat.silverPrice') }}</span>
            <input
              type="number"
              min="0"
              step="0.01"
              inputmode="decimal"
              :value="zakat.inputs.value.silverPricePerGram || ''"
              :placeholder="`0.00 ${zakat.inputs.value.currency}/g`"
              class="w-full glass-subtle rounded-xl px-3 py-2.5 text-sm text-themed bg-transparent outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 tabular-nums"
              @input="onInput('silverPricePerGram', $event)"
            >
          </label>
        </div>
      </div>
    </GlassCard>

    <!-- Assets & debts -->
    <GlassCard>
      <div class="space-y-3">
        <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
          {{ t('zakat.assets') }}
        </h3>
        <div class="space-y-2">
          <label
            v-for="field in assetFields"
            :key="field.key"
            class="flex items-center gap-3 glass-subtle rounded-xl px-3 py-2"
          >
            <span class="text-lg">{{ field.icon }}</span>
            <span class="flex-1 text-sm text-themed-secondary">{{ t(field.labelKey) }}</span>
            <input
              type="number"
              min="0"
              step="0.01"
              inputmode="decimal"
              :value="zakat.inputs.value[field.key] || ''"
              placeholder="0"
              class="w-28 text-right bg-transparent outline-none text-sm text-themed tabular-nums"
              @input="onInput(field.key, $event)"
            >
            <span class="text-xs text-themed-faint w-5">
              {{ 'unit' in field ? field.unit : zakat.inputs.value.currency }}
            </span>
          </label>
        </div>

        <!-- Summary rows -->
        <div class="space-y-1.5 pt-2 border-t border-[var(--glass-border)] text-sm">
          <div class="flex justify-between text-themed-secondary">
            <span>{{ t('zakat.total') }}</span>
            <span class="tabular-nums">{{ fmt(zakat.totalAssets.value) }}</span>
          </div>
          <div class="flex justify-between font-medium text-themed">
            <span>{{ t('zakat.netWealth') }}</span>
            <span class="tabular-nums">{{ fmt(zakat.netWealth.value) }}</span>
          </div>
        </div>

        <button
          class="text-xs text-themed-faint hover:text-red-400 transition-colors"
          @click="zakat.reset()"
        >
          {{ t('common.reset') }}
        </button>
      </div>
    </GlassCard>

    <!-- Disclaimer -->
    <GlassCard variant="subtle">
      <p class="text-xs text-themed-faint leading-relaxed">
        ⚠️ {{ t('zakat.disclaimer') }}
      </p>
    </GlassCard>
  </div>
</template>
