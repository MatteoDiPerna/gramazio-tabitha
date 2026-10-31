/**
 * Scarica contenuti da Sanity e scrive src/generated/cms/bundle.json.
 * Senza SANITY_PROJECT_ID + SANITY_API_TOKEN esce 0 (no-op).
 */
import { mkdirSync, writeFileSync, createWriteStream, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { buildLegacyBundle } from '../../src/cms/legacyBundle.ts';
import { catalogSchema } from '../../src/domain/catalog/catalog.schema.ts';
import type { CmsBundle, CmsEditorialSnapshot } from '../../src/cms/types.ts';
import { loadCmsEnv } from './loadDotenv.ts';

loadCmsEnv();

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.log('cms:sync — Sanity non configurato: skip.');
  process.exit(0);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const urlFor = (source: unknown) =>
  imageUrlBuilder(client as unknown as SanityClient)
    .image(source as Parameters<ReturnType<typeof imageUrlBuilder>['image']>[0])
    .auto('format')
    .quality(85);

type SanityImage = { asset?: { _ref: string }; alt?: string };

async function downloadToPublic(publicPath: string, url: string) {
  const rel = publicPath.replace(/^\//, '');
  const disk = join(process.cwd(), 'public', rel);
  mkdirSync(dirname(disk), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download fallito ${url}: ${res.status}`);
  await pipeline(res.body!, createWriteStream(disk));
  return publicPath;
}

async function mapProductImage(slug: string, image: SanityImage | undefined, altFallback: string) {
  const fallback = { src: `/images/products/${slug}.jpg`, alt: altFallback };
  if (!image?.asset?._ref) return fallback;
  const remoteUrl = urlFor(image).width(1400).url();
  const localPath = `/images/products/${slug}.jpg`;
  try {
    await downloadToPublic(localPath, remoteUrl);
    return { src: localPath, alt: image.alt ?? altFallback };
  } catch {
    return { src: remoteUrl, alt: image.alt ?? altFallback };
  }
}

const QUERY = `{
  "products": *[_type == "product"] | order(name asc),
  "site": *[_type == "siteSettings"][0],
  "home": *[_type == "homePage"][0],
  "about": *[_type == "aboutPage"][0],
  "catalogIntro": *[_type == "catalogPageIntro"][0],
  "faq": *[_type == "faqPage"][0],
  "contacts": *[_type == "contactsPageIntro"][0],
  "heroes": *[_type == "pageHeroes"][0],
  "homeMedia": *[_type == "homeMediaPaths"][0],
  "legalPrivacy": *[_type == "legalPage" && pageId == "privacy"][0],
  "legalCookie": *[_type == "legalPage" && pageId == "cookie"][0],
  "legalNote": *[_type == "legalPage" && pageId == "note-legali"][0]
}`;

function mapLegal(
  doc: Record<string, unknown> | null,
  fallback: CmsEditorialSnapshot['legal']['privacy'],
) {
  if (!doc) return fallback;
  return {
    noticeHtml: String(doc.noticeHtml ?? fallback.noticeHtml),
    bodyHtml: String(doc.bodyHtml ?? fallback.bodyHtml),
    lastReviewedAt: doc.lastReviewedAt ? String(doc.lastReviewedAt) : null,
  };
}

function mapHome(h: Record<string, unknown>) {
  return {
    homeAbout: h.homeAbout,
    homeBannerDivider: h.homeBannerDivider,
    homeServicesSection: h.homeServicesSection,
    homeGallerySection: h.homeGallerySection,
    homeOilFactsSection: h.homeOilFactsSection,
    homeQuoteDivider: h.homeQuoteDivider,
    homeReviewsSection: h.homeReviewsSection,
  };
}

function mapAbout(a: Record<string, unknown>) {
  return {
    chiSiamoIntro: a.intro,
    chiSiamoSections: a.sections ?? [],
    chiSiamoCta: a.cta,
  };
}

async function main() {
  const data = await client.fetch(QUERY);
  const legacy = buildLegacyBundle();

  if (!data?.site) {
    console.warn('cms:sync — nessun siteSettings in Sanity. Skip.');
    process.exit(0);
  }

  const catalog = await Promise.all(
    (data.products ?? []).map(async (p: Record<string, unknown>) => {
      const slug =
        typeof p.slug === 'object' && p.slug !== null && 'current' in p.slug
          ? String((p.slug as { current: string }).current)
          : String(p.slug);
      const image = await mapProductImage(slug, p.image as SanityImage, String(p.name ?? slug));
      return {
        id: String(p.productId ?? p._id),
        slug,
        name: String(p.name),
        shortDescription: String(p.shortDescription),
        description: p.description ? String(p.description) : undefined,
        category: p.category,
        image,
        variants: (p.variants as CmsBundle['catalog'][0]['variants']) ?? [],
        published: Boolean(p.published),
        available: Boolean(p.available),
        badges: p.badges,
        seasonalNote: p.seasonalNote ? String(p.seasonalNote) : undefined,
        productInfo: p.productInfo as CmsBundle['catalog'][0]['productInfo'],
      };
    }),
  );

  catalogSchema.parse(catalog);

  const site = data.site;
  const editorial: CmsEditorialSnapshot = {
    ...legacy.editorial,
    ...(data.home ? mapHome(data.home) : {}),
    ...(data.about ? mapAbout(data.about) : {}),
    ...(data.catalogIntro ? { catalogPageIntro: data.catalogIntro.intro ?? data.catalogIntro } : {}),
    ...(data.faq ? { faqIntro: data.faq.intro, faqItems: data.faq.items ?? [] } : {}),
    ...(data.contacts ? { contactsPageIntro: data.contacts } : {}),
    ...(data.heroes ? { staticPageHeroes: data.heroes.heroes ?? data.heroes } : {}),
    ...(data.homeMedia ? { homeMediaPaths: data.homeMedia.paths ?? data.homeMedia } : {}),
    legal: {
      privacy: mapLegal(data.legalPrivacy, legacy.editorial.legal.privacy),
      cookie: mapLegal(data.legalCookie, legacy.editorial.legal.cookie),
      noteLegali: mapLegal(data.legalNote, legacy.editorial.legal.noteLegali),
    },
  };

  const bundle: CmsBundle = {
    version: 1,
    syncedAt: new Date().toISOString(),
    source: 'sanity',
    catalog,
    site: {
      name: site.name,
      shortName: site.shortName,
      description: site.description,
      address: site.address,
      email: site.email,
      ordersEmail: site.ordersEmail,
      whatsappE164: site.whatsappE164,
      legal: site.legal,
      contactPerson: site.contactPerson,
      phoneDisplay: site.phoneDisplay,
      phoneTel: site.phoneTel,
      orderDisclaimer: site.orderDisclaimer,
      nav: site.nav ?? legacy.site.nav,
      footerInfoLinks: site.footerInfoLinks ?? legacy.site.footerInfoLinks,
    },
    editorial,
  };

  const outDir = join(process.cwd(), 'src/generated/cms');
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'bundle.json'), `${JSON.stringify(bundle, null, 2)}\n`);
  console.log(`cms:sync — bundle aggiornato (${catalog.length} prodotti).`);

  const hook = process.env.VERCEL_DEPLOY_HOOK;
  if (process.env.CMS_TRIGGER_DEPLOY === '1' && hook) {
    await fetch(hook, { method: 'POST' });
    console.log('cms:sync — deploy hook Vercel invocato.');
  }
}

main().catch((err) => {
  console.error('cms:sync — errore:', err);
  process.exit(1);
});
