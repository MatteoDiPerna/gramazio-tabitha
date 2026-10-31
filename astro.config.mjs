// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

/** Allineato a `src/config/siteUrl.ts` */
const DEFAULT_PRODUCTION_SITE_URL = 'https://gramazio-tabitha.netlify.app';

const SITE = process.env.SITE_URL ?? DEFAULT_PRODUCTION_SITE_URL;

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [react(), sitemap()],
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    optimizeDeps: {
      include: ['react', 'react/jsx-runtime', 'react-dom/client'],
    },
  },
});
