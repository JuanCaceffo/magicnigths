/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, '/src/assets'),
      '@components': path.resolve(__dirname, '/src/components'),
      '@services': path.resolve(__dirname, '/src/services'),
      '@pages': path.resolve(__dirname, '/src/pages'),
      '@models': path.resolve(__dirname, '/src/models'),
      '@hooks': path.resolve(__dirname, '/src/hooks'),
      '@interfaces': path.resolve(__dirname, '/src/models/interfaces'),
      '@helpers': path.resolve(__dirname, '/src/models/helpers'),
      '@styles': path.resolve(__dirname, '/src/styles'),
    },
  },
  test: {
    globals: true,
    setupFiles: ['./setupTests.ts'], // Separate file for test setup
    globalSetup: ['./globalSetup.ts'],
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'json-summary'],
    },
  },
})
