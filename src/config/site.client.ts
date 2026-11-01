/**
 * Impostazioni sito per componenti client (React islands) — solo bundle JSON,
 * senza validazione Zod (evita bundle pesante e errori di hydration).
 */
import bundleJson from '@/generated/cms/bundle.json';
import type { CmsBundle } from '@/cms/types';
import { DEFAULT_PRODUCTION_SITE_URL } from '@/config/siteUrl';

const bundle = bundleJson as CmsBundle;

function resolvePublicSiteUrl(): string {
  if (typeof import.meta !== 'undefined' && import.meta.env?.SITE) {
    return String(import.meta.env.SITE).replace(/\/$/, '');
  }
  return DEFAULT_PRODUCTION_SITE_URL;
}

export const siteClientConfig = {
  ...bundle.site,
  url: resolvePublicSiteUrl(),
} as const;
