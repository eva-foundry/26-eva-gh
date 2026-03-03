import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    // Add pool and isolate settings to help with environment issues
    pool: 'forks',
    isolate: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'test/',
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/*.stories.ts',
        'dist/',
        '.storybook/',
        'storybook-static/'
      ],
      include: ['src/**/*.ts'],
      all: true,
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100
      }
    }
  }
});
