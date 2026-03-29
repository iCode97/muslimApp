<script setup lang="ts">
/**
 * Prayer Learning Guide — Step-by-step Wudu and Salah instructions.
 */
import { GUIDE_SECTIONS, PRAYER_RAKA_INFO, type PrayerStep } from '~/data/prayer-guide'

const { t, locale } = useI18n()

const activeSection = ref<string>('wudu')

const currentSection = computed(() =>
  GUIDE_SECTIONS.find(s => s.id === activeSection.value) || GUIDE_SECTIONS[0],
)

function getInstruction(step: PrayerStep): string {
  return step.instruction[locale.value as keyof typeof step.instruction] || step.instruction.en
}

function getTranslation(step: PrayerStep): string {
  return step.translations[locale.value as keyof typeof step.translations] || step.translations.en
}
</script>

<template>
  <div class="app-container pt-6 space-y-5">
    <!-- Header -->
    <header class="animate-fade-in">
      <h1 class="text-2xl font-semibold">
        {{ t('guide.title') }}
      </h1>
      <p class="text-sm text-themed-muted mt-1">
        {{ t('guide.subtitle') }}
      </p>
    </header>

    <!-- Section tabs -->
    <div class="flex gap-2 animate-fade-in stagger-1">
      <button
        v-for="section in GUIDE_SECTIONS"
        :key="section.id"
        :class="[
          'flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200',
          activeSection === section.id
            ? 'bg-[var(--color-primary)] text-white'
            : 'glass-subtle text-themed-secondary hover:text-themed',
        ]"
        @click="activeSection = section.id"
      >
        {{ section.icon }} {{ t(section.titleKey) }}
      </button>
    </div>

    <!-- Section description -->
    <p class="text-sm text-themed-muted animate-fade-in stagger-2">
      {{ t(currentSection.descKey) }}
    </p>

    <!-- Steps -->
    <div class="space-y-4">
      <div
        v-for="(step, idx) in currentSection.steps"
        :key="step.id"
        :class="['animate-fade-in', `stagger-${Math.min(idx + 2, 6)}`]"
      >
        <GlassCard>
          <div class="space-y-3">
            <!-- Step header -->
            <div class="flex items-center gap-3">
              <span class="w-10 h-10 flex items-center justify-center rounded-full glass-subtle text-xl">
                {{ step.position }}
              </span>
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <span class="text-xs text-themed-faint">{{ t('guide.step') }} {{ step.id }}</span>
                  <span
                    v-if="step.repetitions"
                    class="text-[10px] text-[var(--color-primary-light)] glass-subtle px-2 py-0.5 rounded-full"
                  >
                    {{ step.repetitions }}×
                  </span>
                </div>
                <p class="text-sm text-themed-secondary leading-relaxed mt-0.5">
                  {{ getInstruction(step) }}
                </p>
              </div>
            </div>

            <!-- Arabic text -->
            <div v-if="step.arabicText" class="pt-2 border-t border-[var(--glass-border)] space-y-2">
              <p class="font-arabic text-xl text-right text-[var(--color-gold)] leading-[2.2]" dir="rtl">
                {{ step.arabicText }}
              </p>
              <p v-if="step.transliteration" class="text-sm text-themed-muted italic">
                {{ step.transliteration }}
              </p>
              <p v-if="getTranslation(step)" class="text-xs text-themed-secondary leading-relaxed">
                {{ getTranslation(step) }}
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>

    <!-- Raka info table (only in salah section) -->
    <div v-if="activeSection === 'salah'" class="space-y-3 animate-fade-in">
      <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
        {{ t('guide.rakaOverview') }}
      </h3>
      <GlassCard>
        <div class="space-y-2">
          <div
            v-for="info in PRAYER_RAKA_INFO"
            :key="info.nameKey"
            class="flex items-center justify-between py-2 border-b border-[var(--glass-border)] last:border-b-0"
          >
            <span class="text-sm font-medium text-themed">{{ t(info.nameKey) }}</span>
            <div class="flex gap-3 text-xs">
              <span v-if="info.sunnahBefore" class="text-themed-muted">
                {{ info.sunnahBefore }} {{ t('guide.sunnahBefore') }}
              </span>
              <span class="text-[var(--color-primary-light)] font-semibold">
                {{ info.fard }} {{ t('guide.fard') }}
              </span>
              <span v-if="info.sunnahAfter" class="text-themed-muted">
                {{ info.sunnahAfter }} {{ t('guide.sunnahAfter') }}
              </span>
              <span v-if="'witr' in info" class="text-[var(--color-gold)]">
                {{ info.witr }} Witr
              </span>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  </div>
</template>
