import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      vue(),
      vueDevTools(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: parseInt(env.VITE_PORT),
      cors: true,
      // proxy: {
      //   '/api/Auth': {
      //     target: 'http://localhost:8080',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api\/Auth/, '')
      //   },
      //   '/api/Token': {
      //     target: 'http://localhost:8080',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api\/Token/, '')
      //   },
      //   '/api/UserData': {
      //     target: 'http://localhost:8000',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api\/UserData/, '')
      //   },
      //   '/api/SteamCrawler': {
      //     target: 'http://localhost:8000',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api\/SteamCrawler/, '')
      //   },
      //   '/api/Games': {
      //     target: 'http://localhost:8000',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api\/Games/, '')
      //   },
      // }
  }
  }
})
