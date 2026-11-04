import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // GEMINI_API_KEY has no VITE_ prefix, so it is never bundled into the site.
  // In development the proxy below adds it to requests, like the Pages Function does in production.
  const env = loadEnv(mode, import.meta.dirname, '')
  const geminiProxy = {
    '/api/gemini': {
      target: 'https://generativelanguage.googleapis.com',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api\/gemini/, ''),
      headers: { 'x-goog-api-key': env.GEMINI_API_KEY || '' },
    },
  }

  return {
    plugins: [
      tailwindcss(),
      react()
    ],
    server: { proxy: geminiProxy },
    preview: { proxy: geminiProxy },
  }
})
