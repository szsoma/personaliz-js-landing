import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [svelte(), mdx(), sitemap()],
  site: 'https://shiftyjs.com',
  server: { port: 3000 },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
    },
  },
});
