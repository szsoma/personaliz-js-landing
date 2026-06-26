import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [svelte(), sitemap()],
  site: 'https://shiftyjs.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
