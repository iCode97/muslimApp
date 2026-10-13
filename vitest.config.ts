import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

const app = fileURLToPath(new URL('./app', import.meta.url))

// Plain Vitest (no Nuxt runtime). Nuxt auto-imports used by composables/components
// are stubbed in tests/unit/setup.ts.
export default defineConfig({
  resolve: {
    alias: {
      '~': app,
      '@': app,
    },
  },
  plugins: [
    vue(),
    {
      // Nuxt compile-time flags (import.meta.client/server) are not defined under plain Vitest.
      name: 'nuxt-import-meta-flags',
      transform(code: string, id: string) {
        if (!id.includes('/app/') || !code.includes('import.meta.')) return null
        return code.replace(/import\.meta\.client\b/g, 'true').replace(/import\.meta\.server\b/g, 'false')
      },
    },
  ],
  test: {
    environment: 'happy-dom',
    include: ['tests/unit/**/*.test.ts'],
    setupFiles: ['tests/unit/setup.ts'],
    globals: false,
  },
})
