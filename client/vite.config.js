import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const localApiUrl = process.env.VITE_DEV_API_URL || 'http://localhost:5000'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: localApiUrl,
        changeOrigin: true
      },
      '/uploads': {
        target: localApiUrl,
        changeOrigin: true
      }
    }
  }
})
