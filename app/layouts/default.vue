<script setup lang="ts">
const { t } = useI18n()
const nav = useNavigation()
const onboarding = useOnboarding()
const haptics = useHaptics()
const favoriteTools = useFavoriteTools()
const knowledge = useKnowledgeLevel()

onMounted(() => {
  // Migrates the legacy mobile-nav key into favorites on first run
  favoriteTools.load()
  knowledge.load()
  onboarding.checkFirstRun()
})
</script>

<template>
  <div class="min-h-[100dvh] flex flex-col md:flex-row">
    <!-- Desktop Sidebar — slim icon rail, expands on hover -->
    <aside class="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 sidebar-modern safe-top z-50">
      <!-- App branding -->
      <div class="flex items-center gap-3 px-5 pt-7 pb-5">
        <span class="text-xl text-[var(--color-primary-light)] flex-shrink-0">☪</span>
        <div class="sidebar-brand-text">
          <h2 class="text-base font-semibold text-[var(--color-primary-light)] leading-tight">MuslimApp</h2>
          <p class="text-[10px] text-themed-faint">{{ t('app.tagline') }}</p>
        </div>
      </div>

      <!-- Primary nav -->
      <nav class="flex-1 px-3 space-y-1 overflow-y-auto no-scrollbar" :aria-label="t('nav.mainLabel')">
        <NuxtLink
          v-for="item in nav.desktopPrimaryItems"
          :key="item.id"
          :to="item.path"
          :aria-current="nav.isActive(item.path) ? 'page' : undefined"
          :class="[
            'flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-200',
            nav.isActive(item.path)
              ? 'glass-primary text-[var(--color-primary-light)]'
              : 'text-themed-secondary hover:text-themed hover:bg-[var(--glass-bg-subtle)]',
          ]"
          @click="haptics.tap()"
        >
          <AppIcon :name="item.icon" :size="20" class="flex-shrink-0" />
          <span class="text-sm font-medium sidebar-label">{{ t(item.label) }}</span>
        </NuxtLink>

        <!-- Divider -->
        <div class="my-3 mx-2 border-t border-[var(--glass-border)]" />

        <!-- Tools -->
        <NuxtLink
          v-for="item in nav.desktopToolsItems"
          :key="item.id"
          :to="item.path"
          :aria-current="nav.isActive(item.path) ? 'page' : undefined"
          :class="[
            'flex items-center gap-3 px-3 py-2 rounded-2xl transition-all duration-200',
            nav.isActive(item.path)
              ? 'glass-primary text-[var(--color-primary-light)]'
              : 'text-themed-secondary hover:text-themed hover:bg-[var(--glass-bg-subtle)]',
          ]"
          @click="haptics.tap()"
        >
          <AppIcon :name="item.icon" :size="18" class="flex-shrink-0" />
          <span class="text-sm sidebar-label">{{ t(item.label) }}</span>
        </NuxtLink>
      </nav>

      <!-- Footer: Settings + About -->
      <nav class="px-3 pb-4 space-y-1" :aria-label="t('nav.footerLabel')">
        <div class="mb-2 mx-2 border-t border-[var(--glass-border)]" />
        <NuxtLink
          v-for="item in nav.desktopFooterItems"
          :key="item.id"
          :to="item.path"
          :aria-current="nav.isActive(item.path) ? 'page' : undefined"
          :class="[
            'flex items-center gap-3 px-3 py-2 rounded-2xl transition-all duration-200',
            nav.isActive(item.path)
              ? 'glass-primary text-[var(--color-primary-light)]'
              : 'text-themed-faint hover:text-themed-secondary hover:bg-[var(--glass-bg-subtle)]',
          ]"
          @click="haptics.tap()"
        >
          <AppIcon :name="item.icon" :size="18" class="flex-shrink-0" />
          <span class="text-sm sidebar-label">{{ t(item.label) }}</span>
        </NuxtLink>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 pb-28 md:pb-6 md:ml-[4.5rem] safe-top">
      <slot />
    </main>

    <!-- Mobile Bottom Navigation — fixed 5 tabs, iOS 26 Liquid Glass Pill -->
    <div class="md:hidden liquid-nav">
      <nav class="liquid-nav-pill" :aria-label="t('nav.mainLabel')">
        <ul class="flex items-stretch">
          <li
            v-for="tab in nav.mobileTabs"
            :key="tab.id"
            class="flex-1 min-w-0 flex"
          >
            <NuxtLink
              :to="tab.path"
              :aria-current="nav.isTabActive(tab) ? 'page' : undefined"
              :class="[
                'liquid-nav-item',
                nav.isTabActive(tab)
                  ? 'liquid-nav-item--active text-[var(--color-primary-light)]'
                  : 'text-[var(--nav-inactive)]',
              ]"
              @click="haptics.tap()"
            >
              <AppIcon :name="tab.icon" :size="22" />
              <span class="liquid-nav-label">{{ t(tab.label) }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>

    <!-- First-run Onboarding Wizard -->
    <OnboardingWizard />
  </div>
</template>
