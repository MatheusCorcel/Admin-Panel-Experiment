import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      // Disable autoCodeSplitting - it generates wrong import paths for routes
      // with underscores (e.g. $routineId_.edit, _authenticated), causing "Failed
      // to fetch dynamically imported module" errors
      autoCodeSplitting: false,
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    allowedHosts: ['.ngrok-free.dev'],
    watch: {
      // iCloud Drive continuously touches .icloud placeholder files and syncs
      // file metadata, which triggers Vite's watcher and causes spurious reloads.
      // Ignore all non-src paths aggressively to avoid chokidar scan overload.
      ignored: (path: string) =>
        path.includes('/.icloud') ||
        path.includes('/.DS_Store') ||
        (!path.includes('/admin-panel/src') &&
          !path.includes('/admin-panel/index.html') &&
          !path.includes('/admin-panel/vite.config')),
    },
  },
})
