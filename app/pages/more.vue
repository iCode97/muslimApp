<script setup lang="ts">
/**
 * More page — hub for tools and app pages.
 * - Favorites row (quick access, up to 6 pinned tools, touch-friendly reorder)
 * - "Werkzeuge" section with a star toggle per tool
 * - "App" section: Settings + About are always reachable here
 */
import { TOOL_ITEMS, APP_ITEMS } from '~/composables/useNavigation'

const { t } = useI18n()
const pwa = usePWA()
const haptics = useHaptics()
const favorites = useFavoriteTools()

useHead({ title: () => t('more.title') })

const editing = ref(false)
const limitHint = ref(false)
let hintTimer: ReturnType<typeof setTimeout> | undefined

onMounted(() => favorites.load())
onBeforeUnmount(() => clearTimeout(hintTimer))

function toggleFavorite(id: string) {
  haptics.light()
  const ok = favorites.toggle(id)
  if (!ok) {
    limitHint.value = true
    clearTimeout(hintTimer)
    hintTimer = setTimeout(() => (limitHint.value = false), 3000)
  }
}

function move(id: string, dir: 'up' | 'down') {
  haptics.light()
  favorites.move(id, dir)
}

function removeFavorite(id: string) {
  haptics.light()
  favorites.remove(id)
}

// Leave edit mode automatically once the last favorite is gone
watch(() => favorites.items.value.length, (n) => {
  if (n === 0) editing.value = false
})
</script>

<template>
  <div class="app-container pt-6 space-y-6">
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
          <span class="text-3xl" aria-hidden="true">📲</span>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-sm">{{ t('more.installApp') }}</p>
            <p class="text-xs text-themed-muted mt-0.5">{{ t('more.installDesc') }}</p>
          </div>
          <button
            class="px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-sm font-medium whitespace-nowrap focus-ring"
            @click="pwa.install()"
          >
            {{ t('more.install') }}
          </button>
        </div>
      </GlassCard>
    </Transition>

    <!-- Favorites quick-access row -->
    <section aria-labelledby="fav-heading" class="space-y-3">
      <div class="flex items-center justify-between gap-3">
        <h2 id="fav-heading" class="text-sm font-medium text-themed-muted uppercase tracking-wider">
          {{ t('more.favoritesTitle') }}
        </h2>
        <button
          v-if="favorites.items.value.length > 0"
          class="text-xs px-3 py-1.5 rounded-full focus-ring transition-colors"
          :class="editing ? 'bg-[var(--color-primary)] text-white' : 'glass-subtle text-themed-secondary'"
          :aria-pressed="editing"
          @click="haptics.light(); editing = !editing"
        >
          {{ editing ? t('more.favoritesDone') : t('more.favoritesEdit') }}
        </button>
      </div>

      <!-- Empty state -->
      <GlassCard v-if="favorites.items.value.length === 0" variant="subtle">
        <p class="text-sm text-themed-muted flex items-start gap-2">
          <AppIcon name="star" :size="18" class="flex-shrink-0 mt-0.5" />
          <span>{{ t('more.favoritesEmpty', { max: favorites.maxFavorites }) }}</span>
        </p>
      </GlassCard>

      <!-- Quick access grid (normal mode) -->
      <ul v-else-if="!editing" class="grid grid-cols-3 gap-2.5">
        <li v-for="item in favorites.items.value" :key="item.id">
          <NuxtLink
            :to="item.path"
            class="glass rounded-2xl flex flex-col items-center justify-center gap-1.5 px-1 py-3 min-h-[5rem] text-center transition-transform active:scale-[0.97] focus-ring"
            @click="haptics.tap()"
          >
            <AppIcon :name="item.icon" :size="24" class="text-[var(--color-primary-light)]" />
            <span class="text-xs font-medium leading-tight w-full truncate px-1">{{ t(item.label) }}</span>
          </NuxtLink>
        </li>
      </ul>

      <!-- Edit mode: up/down/remove — no drag-and-drop needed -->
      <ul v-else class="space-y-2">
        <li
          v-for="(item, idx) in favorites.items.value"
          :key="item.id"
          class="glass rounded-2xl flex items-center gap-2 ps-3 pe-2 py-2"
        >
          <AppIcon :name="item.icon" :size="20" class="text-[var(--color-primary-light)] flex-shrink-0" />
          <span class="flex-1 min-w-0 text-sm font-medium truncate">{{ t(item.label) }}</span>
          <button
            class="icon-btn"
            :disabled="idx === 0"
            :aria-label="t('more.moveUp', { name: t(item.label) })"
            @click="move(item.id, 'up')"
          >
            <AppIcon name="chevronUp" :size="20" />
          </button>
          <button
            class="icon-btn"
            :disabled="idx === favorites.items.value.length - 1"
            :aria-label="t('more.moveDown', { name: t(item.label) })"
            @click="move(item.id, 'down')"
          >
            <AppIcon name="chevronDown" :size="20" />
          </button>
          <button
            class="icon-btn text-[var(--color-danger)]"
            :aria-label="t('more.removeFavorite', { name: t(item.label) })"
            @click="removeFavorite(item.id)"
          >
            <AppIcon name="close" :size="20" />
          </button>
        </li>
      </ul>

      <p v-if="limitHint" role="status" class="text-xs text-[var(--color-danger)]">
        {{ t('more.favoritesFull', { max: favorites.maxFavorites }) }}
      </p>
    </section>

    <!-- Tools -->
    <section aria-labelledby="tools-heading" class="space-y-3">
      <h2 id="tools-heading" class="text-sm font-medium text-themed-muted uppercase tracking-wider">
        {{ t('more.tools') }}
      </h2>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <li v-for="tool in TOOL_ITEMS" :key="tool.id" class="glass rounded-2xl flex items-stretch">
          <NuxtLink
            :to="tool.path"
            class="flex-1 min-w-0 flex items-center gap-4 p-4 rounded-2xl focus-ring"
            @click="haptics.tap()"
          >
            <span class="icon-tile" aria-hidden="true">
              <AppIcon :name="tool.icon" :size="22" />
            </span>
            <span class="flex-1 min-w-0">
              <span class="block font-medium text-sm">{{ t(tool.label) }}</span>
              <span class="block text-xs text-themed-muted mt-0.5">{{ t(tool.desc) }}</span>
            </span>
          </NuxtLink>
          <button
            class="icon-btn self-center me-2"
            :class="favorites.isFavorite(tool.id) ? 'text-[var(--color-gold)]' : 'text-themed-faint'"
            :aria-pressed="favorites.isFavorite(tool.id)"
            :aria-label="favorites.isFavorite(tool.id)
              ? t('more.removeFavorite', { name: t(tool.label) })
              : t('more.addFavorite', { name: t(tool.label) })"
            @click="toggleFavorite(tool.id)"
          >
            <AppIcon :name="favorites.isFavorite(tool.id) ? 'starFilled' : 'star'" :size="22" />
          </button>
        </li>
      </ul>
    </section>

    <!-- App: Settings + About (always reachable) -->
    <section aria-labelledby="app-heading" class="space-y-3">
      <h2 id="app-heading" class="text-sm font-medium text-themed-muted uppercase tracking-wider">
        {{ t('more.appSection') }}
      </h2>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <li v-for="item in APP_ITEMS" :key="item.id" class="glass rounded-2xl">
          <NuxtLink
            :to="item.path"
            class="flex items-center gap-4 p-4 rounded-2xl focus-ring"
            @click="haptics.tap()"
          >
            <span class="icon-tile" aria-hidden="true">
              <AppIcon :name="item.icon" :size="22" />
            </span>
            <span class="flex-1 min-w-0">
              <span class="block font-medium text-sm">{{ t(item.label) }}</span>
              <span class="block text-xs text-themed-muted mt-0.5">{{ t(item.desc) }}</span>
            </span>
            <AppIcon name="chevronRight" :size="18" class="text-themed-faint flex-shrink-0" />
          </NuxtLink>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.icon-tile {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  border-radius: 0.875rem;
  background: var(--glass-bg-subtle);
  border: 1px solid var(--glass-border);
  color: var(--color-primary-light);
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  flex-shrink: 0;
  border-radius: 9999px;
  transition: background-color 0.2s ease, opacity 0.2s ease;
}
.icon-btn:hover:not(:disabled) {
  background: var(--glass-bg-subtle);
}
.icon-btn:disabled {
  opacity: 0.3;
}

.focus-ring:focus-visible,
.icon-btn:focus-visible {
  outline: 2px solid var(--color-primary-light);
  outline-offset: 2px;
}
</style>
