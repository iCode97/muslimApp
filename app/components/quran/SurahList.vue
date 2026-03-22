<script setup lang="ts">
const { t } = useI18n()
const quran = useQuran()

const searchQuery = ref('')

const filteredSurahs = computed(() => {
  if (!searchQuery.value.trim()) return quran.surahs.value

  const q = searchQuery.value.toLowerCase()
  return quran.surahs.value.filter(s =>
    s.nameSimple.toLowerCase().includes(q)
    || s.nameArabic.includes(q)
    || s.translatedName.toLowerCase().includes(q)
    || String(s.id).includes(q),
  )
})

onMounted(() => {
  quran.fetchSurahs()
})
</script>

<template>
  <div class="space-y-4">
    <!-- Search -->
    <GlassInput
      v-model="searchQuery"
      :placeholder="t('quran.search')"
      icon="🔍"
    />

    <!-- Loading -->
    <div v-if="quran.loading.value && quran.surahs.value.length === 0" class="py-12">
      <LoadingSpinner />
    </div>

    <!-- Error -->
    <div v-else-if="quran.error.value" class="text-center py-8">
      <p class="text-[var(--color-danger)] text-sm">{{ quran.error.value }}</p>
    </div>

    <!-- Surah List -->
    <div v-else class="space-y-2">
      <NuxtLink
        v-for="surah in filteredSurahs"
        :key="surah.id"
        :to="`/quran/${surah.id}`"
        class="block"
      >
        <div class="glass flex items-center gap-4 px-4 py-3 hover:bg-white/10 transition-all duration-200 active:scale-[0.98]">
          <!-- Number -->
          <div class="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 text-[var(--color-primary-light)] font-semibold text-sm shrink-0">
            {{ surah.id }}
          </div>

          <!-- Name & Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <span class="font-medium text-white/90 truncate">
                {{ surah.nameSimple }}
              </span>
              <span class="font-arabic text-xl text-white/70 shrink-0 ml-2">
                {{ surah.nameArabic }}
              </span>
            </div>
            <div class="flex items-center gap-2 text-xs text-white/40 mt-0.5">
              <span>{{ surah.translatedName }}</span>
              <span>·</span>
              <span>{{ surah.versesCount }} {{ t('quran.verses') }}</span>
              <span>·</span>
              <span>{{ surah.revelationPlace === 'makkah' ? 'Mekka' : 'Medina' }}</span>
            </div>
          </div>
        </div>
      </NuxtLink>

      <!-- No results -->
      <div v-if="filteredSurahs.length === 0 && searchQuery" class="text-center py-8">
        <p class="text-white/40 text-sm">Keine Suren gefunden für "{{ searchQuery }}"</p>
      </div>
    </div>
  </div>
</template>
