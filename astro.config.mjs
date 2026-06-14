import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://marginapp.in',
  integrations: [tailwind()],
  server: {
    port: 3006,
  },
});
