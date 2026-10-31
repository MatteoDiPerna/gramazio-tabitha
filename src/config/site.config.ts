/**
 * Configurazione centralizzata — dati da CMS (bundle.json) + URL da ambiente build.
 * Non inserire segreti o credenziali.
 */
import { getCmsBundle } from '@/cms/loadBundle';
import { DEFAULT_PRODUCTION_SITE_URL } from '@/config/siteUrl';

function resolvePublicSiteUrl(): string {
  if (typeof import.meta !== 'undefined' && import.meta.env?.SITE) {
    return String(import.meta.env.SITE).replace(/\/$/, '');
  }
  return DEFAULT_PRODUCTION_SITE_URL;
}

const cmsSite = getCmsBundle().site;

export const siteConfig = {
  ...cmsSite,
  url: resolvePublicSiteUrl(),
} as const;

export type SiteConfig = typeof siteConfig;

export type NavLinkItem = Extract<(typeof siteConfig.nav)[number], { kind: 'link' }>;
export type NavGroupItem = Extract<(typeof siteConfig.nav)[number], { kind: 'group' }>;

/** Voce attiva in base al pathname (catalogo include le schede prodotto). */
export function isNavHrefActive(href: string, pathname: string): boolean {
  if (href === '/catalogo') {
    return pathname.startsWith('/catalogo') || pathname.startsWith('/prodotti');
  }
  return pathname.startsWith(href);
}
