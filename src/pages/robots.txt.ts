import type { APIRoute } from 'astro';
import { getSiteOrigin } from '../lib/seo/urls';

export const GET: APIRoute = () => {
  const site = getSiteOrigin();
  const body = `User-agent: *
Allow: /

Sitemap: ${site}/sitemap-index.xml
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
