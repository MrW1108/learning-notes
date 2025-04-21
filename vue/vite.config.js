import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    hmr: {
      // 启用 HMR
      overlay: true
    }
  }
}) 