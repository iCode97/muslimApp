<script setup lang="ts">
const { t } = useI18n()
const nav = useNavigation()
const onboarding = useOnboarding()
const haptics = useHaptics()

onMounted(() => {
  nav.loadMobileNav()
  onboarding.checkFirstRun()
})

// Drag-and-drop reordering of the mobile nav items
const navDnd = useDragReorder({
  getId: (id: string) => id,
  onReorder: (fromId, toId) => nav.reorderMobileNav(fromId, toId),
})

// Items currently selected for the mobile nav, in display order
const selectedMobileItems = computed(() =>
  nav.mobileNavIds.value
    .map(id => nav.mobileChoosableItems.value.find(i => i.id === id))
    .filter((i): i is NonNullable<typeof i> => !!i)
)
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
      <nav class="flex-1 px-3 space-y-1 overflow-y-auto no-scrollbar">
        <NuxtLink
          v-for="item in nav.desktopPrimaryItems"
          :key="item.id"
          :to="item.path"
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
      <div class="px-3 pb-4 space-y-1">
        <div class="mb-2 mx-2 border-t border-[var(--glass-border)]" />
        <NuxtLink
          v-for="item in nav.desktopFooterItems"
          :key="item.id"
          :to="item.path"
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
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 pb-28 md:pb-6 md:ml-[4.5rem] safe-top">
      <slot />
    </main>

    <!-- Mobile Bottom Navigation — iOS 26 Liquid Glass Pill -->
    <div class="md:hidden liquid-nav">
      <!-- Edit button -->
      <div class="flex justify-center mb-1.5">
        <button
          :class="[
            'px-3 py-1 rounded-full text-[10px] font-medium transition-all duration-200',
            nav.isEditingMobileNav.value
              ? 'bg-[var(--color-primary)] text-white'
              : 'text-transparent',
          ]"
          @click="nav.isEditingMobileNav.value = !nav.isEditingMobileNav.value"
        >
          {{ nav.isEditingMobileNav.value ? t('nav.editNavDone') : '' }}
        </button>
      </div>

      <!-- Nav editor panel (slides up above pill) -->
      <Transition name="slide">
        <div v-if="nav.isEditingMobileNav.value" class="liquid-nav-editor mb-2">
          <div class="glass-strong rounded-2xl p-3 max-w-[22rem] mx-auto space-y-3">
            <div class="flex items-center justify-between">
              <p class="text-[11px] text-themed-muted">{{ t('nav.editNavHint') }}</p>
              <button
                class="text-[10px] text-themed-faint hover:text-themed-secondary"
                @click="nav.resetMobileNav()"
              >
                {{ t('nav.editNavReset') }}
              </button>
            </div>

            <!-- Selected items in order — drag to reorder -->
            <div v-if="selectedMobileItems.length > 0" class="space-y-1">
              <p class="text-[10px] text-themed-faint uppercase tracking-wider">
                {{ t('nav.editNavOrder') }}
              </p>
              <div class="flex flex-wrap gap-1.5">
                <div
                  v-for="item in selectedMobileItems"
                  :key="item.id"
                  :draggable="true"
                  :class="[
                    'flex items-center gap-1.5 px-2 py-1.5 rounded-lg glass-primary text-[10px] text-[var(--color-primary-light)] transition-all cursor-grab active:cursor-grabbing',
                    navDnd.dragOverId.value === item.id ? 'ring-2 ring-[var(--color-primary-light)] scale-[1.03]' : '',
                    navDnd.draggingId.value === item.id ? 'opacity-50' : '',
                  ]"
                  @dragstart="navDnd.handlers(item.id).dragstart($event)"
                  @dragover="navDnd.handlers(item.id).dragover($event)"
                  @dragleave="navDnd.handlers(item.id).dragleave()"
                  @drop="navDnd.handlers(item.id).drop($event)"
                  @dragend="navDnd.handlers(item.id).dragend()"
                >
                  <span class="text-themed-faint">⋮⋮</span>
                  <AppIcon :name="item.icon" :size="14" />
                  <span class="leading-tight">{{ t(item.label) }}</span>
                </div>
              </div>
            </div>

            <!-- Choosable grid -->
            <div class="grid grid-cols-4 gap-1.5">
              <button
                v-for="item in nav.mobileChoosableItems.value"
                :key="item.id"
                :class="[
                  'flex flex-col items-center gap-0.5 py-2 px-1 rounded-xl transition-all text-[10px]',
                  item.selected
                    ? 'glass-primary text-[var(--color-primary-light)]'
                    : 'glass-subtle text-themed-faint',
                  !item.selected && nav.mobileNavIds.value.length >= nav.maxMobileItems
                    ? 'opacity-40 pointer-events-none'
                    : '',
                ]"
                @click="haptics.light(); nav.toggleMobileNavItem(item.id)"
              >
                <AppIcon :name="item.icon" :size="18" />
                <span class="leading-tight">{{ t(item.label) }}</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- The pill nav bar -->
      <nav class="liquid-nav-pill">
        <div class="flex items-center">
          <NuxtLink
            v-for="item in nav.mobileNavItems.value"
            :key="item.id"
            :to="item.path"
            :class="[
              'liquid-nav-item',
              nav.isActive(item.path)
                ? 'liquid-nav-item--active text-[var(--color-primary-light)]'
                : 'text-[var(--nav-inactive)]',
            ]"
            @click="haptics.tap()"
          >
            <AppIcon :name="item.icon" :size="22" />
            <span class="text-[10px] font-medium leading-tight">
              {{ t(item.label) }}
            </span>
          </NuxtLink>

          <!-- Edit nav button (small ••• icon) -->
          <button
            :class="[
              'liquid-nav-item',
              nav.isEditingMobileNav.value
                ? 'text-[var(--color-primary-light)]'
                : 'text-[var(--nav-inactive)]',
            ]"
            @click="haptics.light(); nav.isEditingMobileNav.value = !nav.isEditingMobileNav.value"
          >
            <AppIcon name="more" :size="20" />
          </button>
        </div>
      </nav>
    </div>

    <!-- First-run Onboarding Wizard -->
    <OnboardingWizard />
  </div>
</template>
