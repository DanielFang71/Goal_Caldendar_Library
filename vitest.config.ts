import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary'],
      // Only enforce coverage on our core TypeScript source.
      include: ['src/calendar.ts', 'src/fill.ts'],
      exclude: ['src/legacy-calendar-proto.js'],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
  },
})
