<script setup lang="ts">
/**
 * More page — Hub for additional tools and settings.
 * Houses Tasbih, Qibla, Dua, and Settings access.
 */
const { t } = useI18n()
const pwa = usePWA()

const tools = [
  { path: '/tasbih', icon: '📿', labelKey: 'more.tasbih', descKey: 'more.tasbihDesc' },
  { path: '/qibla', icon: '🧭', labelKey: 'more.qibla', descKey: 'more.qiblaDesc' },
  { path: '/dua', icon: '🤲', labelKey: 'more.dua', descKey: 'more.duaDesc' },
  { path: '/hadith', icon: '📜', labelKey: 'more.hadith', descKey: 'more.hadithDesc' },
  { path: '/names', icon: '✨', labelKey: 'more.names', descKey: 'more.namesDesc' },
  { path: '/guide', icon: '📘', labelKey: 'more.guide', descKey: 'more.guideDesc' },
]
</script>

<template>
  <div class="app-container pt-6 space-y-5">
    <header>
      <h1 class="text-2xl font-semibold">
        {{ t('more.title') }}
      </h1>
      <p class="text-sm text-themed-muted mt-1">
        {{ t('more.subtitle') }}
      </p>
    </header>

    <!-- PWA Install Banner -->
    <Transition name="slide">
      <GlassCard v-if="pwa.canInstall.value" variant="primary">
        <div class="flex items-center gap-4">
          <span class="text-3xl">📲</span>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-sm">{{ t('more.installApp') }}</p>
            <p class="text-xs text-themed-muted mt-0.5">{{ t('more.installDesc') }}</p>
          </div>
          <button
            class="px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-sm font-medium whitespace-nowrap"
            @click="pwa.install()"
          >
            {{ t('more.install') }}
          </button>
        </div>
      </GlassCard>
    </Transition>

    <!-- Tools Grid -->
    <div class="space-y-3">
      <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
        {{ t('more.tools') }}
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <NuxtLink
          v-for="tool in tools"
          :key="tool.path"
          :to="tool.soon ? '' : tool.path"
          :class="[
            'block',
            tool.soon ? 'pointer-events-none opacity-50' : ''
          ]"
        >
          <GlassCard>
            <div class="flex items-center gap-4">
              <span class="text-2xl">{{ tool.icon }}</span>
              <div class="flex-1 min-w-0">
                <p class="font-medium text-sm">
                  {{ t(tool.labelKey) }}
                  <span v-if="tool.soon" class="ml-2 text-[10px] text-themed-faint glass-subtle px-2 py-0.5 rounded-full">
                    {{ t('more.comingSoon') }}
                  </span>
                </p>
                <p class="text-xs text-themed-muted mt-0.5">{{ t(tool.descKey) }}</p>
              </div>
              <span class="text-themed-faint">›</span>
            </div>
          </GlassCard>
        </NuxtLink>
      </div>
    </div>

    <!-- Settings + About -->
    <div class="space-y-3">
      <h3 class="text-sm font-medium text-themed-muted uppercase tracking-wider">
        {{ t('more.settingsSection') }}
      </h3>
      <NuxtLink to="/settings">
        <GlassCard>
          <div class="flex items-center gap-4">
            <span class="text-2xl">⚙️</span>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-sm">{{ t('settings.title') }}</p>
              <p class="text-xs text-themed-muted mt-0.5">{{ t('more.settingsDesc') }}</p>
            </div>
            <span class="text-themed-faint">›</span>
          </div>
        </GlassCard>
      </NuxtLink>
      <NuxtLink to="/about">
        <GlassCard>
          <div class="flex items-center gap-4">
            <span class="text-2xl">📋</span>
            <div class="flex-1 min-w-0">
              <p class="font-medium text-sm">{{ t('more.about') }}</p>
              <p class="text-xs text-themed-muted mt-0.5">{{ t('more.aboutDesc') }}</p>
            </div>
            <span class="text-themed-faint">›</span>
          </div>
        </GlassCard>
      </NuxtLink>
    </div>
  </div>
</template>

