import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
// Simplified Vitest config for unit tests; Storybook/browser tests can be added via a separate project config.

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['packages/eva-sovereign-ui-wc/src/components/ui/**/*.ts'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/*.test.ts', '**/*.spec.ts', '**/tests/**'],
      thresholds: {
        lines: 0,
        functions: 0,
        branches: 0,
        statements: 0
      }
    },
    // Additional projects (e.g., Storybook/browser tests) can be added later
          exclude: [
            '**/node_modules/**',
            '**/dist/**',
            // Exclude Playwright suites from Vitest unit run
            'tests/browser-compatibility/**',
            'tests/performance/**',
            'tests/accessibility/**',
            'tests/visual-regression/**'
          ],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './packages/eva-sovereign-ui-wc/src')
      ,
      'tests': resolve(__dirname, './tests')
    }
  }
});