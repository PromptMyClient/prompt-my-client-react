import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'prompt-my-client-react': path.resolve(__dirname, '../package/src'),
    },
  },
  server: {
    watch: {
      // Watch the package source for changes
      ignored: ['!../package/src/**'],
    },
  },
})
