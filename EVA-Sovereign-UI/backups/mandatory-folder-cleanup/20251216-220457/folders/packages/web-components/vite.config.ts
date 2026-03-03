import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'EVASovereignUI',
      formats: ['es', 'umd'],
      fileName: (format) => `eva-sovereign-ui.${format}.js`
    },
    rollupOptions: {
      external: ['lit'],
      output: {
        globals: {
          lit: 'Lit'
        }
      }
    },
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true
      },
      format: {
        comments: false // Remove comments
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'test/',
        '**/*.test.ts',
        '**/*.spec.ts',
        'dist/',
        '.storybook/',
        'stories/'
      ],
      include: ['src/**/*.ts'],
      all: true,
      lines: 100,
      functions: 100,
      branches: 100,
      statements: 100
    }
  }
});