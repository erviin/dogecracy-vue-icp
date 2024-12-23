/// <reference types="vitest" />
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import environment from 'vite-plugin-environment';
import vue from '@vitejs/plugin-vue';
import dotenv from 'dotenv';
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'

dotenv.config({ path: '../../.env' });

export default defineConfig({
  build: {
    emptyOutDir: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
        exclude: ['@dfinity/ledger-icrc']

  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4943',
        changeOrigin: true,
      },
    },
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [
    vue(),
    environment('all', { prefix: 'CANISTER_' }),
    environment('all', { prefix: 'DFX_' }),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: 'src/setupTests.js',
  },
  resolve: {
    alias: [
      { find: 'declarations', replacement: fileURLToPath(new URL('../declarations', import.meta.url)) },
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
    dedupe: ['@dfinity/agent'],
  }
});
