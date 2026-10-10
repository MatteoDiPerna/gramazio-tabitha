import { siteConfig } from '@/config/site.config';

export function getSiteOrigin(): string {
  const fromEnv =
    typeof import.meta.env !== 'undefined' && import.meta.env.SITE
      ? String(import.meta.env.SITE)
      : '';
  const base = (fromEnv || siteConfig.url).replace(/\/$/, '');
  return base;
}

export function absoluteUrl(path: string): string {
  const origin = getSiteOrigin();
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${origin}${normalized}`;
}
