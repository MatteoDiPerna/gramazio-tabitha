// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

/** Allineare a `siteConfig.url` in src/config/site.config.ts (F14) */
const SITE = process.env.SITE_URL ?? 'https://example.com';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [react(), sitemap()],
});
