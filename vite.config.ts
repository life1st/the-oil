import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
// import { analyzer } from 'vite-bundle-analyzer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // analyzer(),
  ],
  css: {
    preprocessorOptions: {
      scss: {}
    }
  },
  resolve: {
    alias: [
      { find: '@', replacement: '/src' }
    ]
  },
  server: {
    host: '0.0.0.0'
  },
  base: '/fuel/',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html'],
    },
  },
})
