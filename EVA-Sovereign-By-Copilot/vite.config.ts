import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        'esdc-demo': resolve(__dirname, 'apps/esdc-demo/index.html'),
        'dev-kit-demo': resolve(__dirname, 'apps/dev-kit-demo/index.html'),
      },
    },
  },
  server: {
    port: 5173,
    open: '/apps/esdc-demo/index.html',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'packages/eva-sovereign-ui-wc/src'),
    },
  },
});
