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
      '@annotation-tool': path.resolve(__dirname, './src/annotation-tool'),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: true,
  },
})
