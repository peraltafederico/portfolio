import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import cloudflare from '@astrojs/cloudflare'

export default defineConfig({
  site: 'https://federicoperalta.com',
  integrations: [],
  adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()],
  },
})
