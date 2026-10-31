/**
 * Import una tantum: seed legacy → Sanity (richiede SANITY_* + token scrittura).
 */
import { createClient } from '@sanity/client';
import { buildLegacyBundle } from '../../src/cms/legacyBundle.ts';
import { loadCmsEnv } from './loadDotenv.ts';

loadCmsEnv();

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    'Mancano SANITY_PROJECT_ID e/o SANITY_API_TOKEN.\n' +
      '  • Crea `.env` nella root del repo (vedi `.env.example`)\n' +
      '  • SANITY_PROJECT_ID = stesso valore di SANITY_STUDIO_PROJECT_ID in backoffice/.env\n' +
      '  • SANITY_API_TOKEN = token Editor su sanity.io/manage → API → Tokens\n' +
      '  (Il project ID può essere letto anche da backoffice/.env; il token va nella root.)',
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function main() {
  const bundle = buildLegacyBundle();
  const e = bundle.editorial;

  const tx = client.transaction();

  tx.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    ...bundle.site,
  });

  tx.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    homeAbout: e.homeAbout,
    homeBannerDivider: e.homeBannerDivider,
    homeServicesSection: e.homeServicesSection,
    homeGallerySection: e.homeGallerySection,
    homeOilFactsSection: e.homeOilFactsSection,
    homeQuoteDivider: e.homeQuoteDivider,
    homeReviewsSection: e.homeReviewsSection,
  });

  tx.createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',
    intro: e.chiSiamoIntro,
    sections: e.chiSiamoSections,
    cta: e.chiSiamoCta,
  });

  tx.createOrReplace({
    _id: 'catalogPageIntro',
    _type: 'catalogPageIntro',
    intro: e.catalogPageIntro,
  });

  tx.createOrReplace({
    _id: 'faqPage',
    _type: 'faqPage',
    intro: e.faqIntro,
    items: e.faqItems,
  });

  tx.createOrReplace({
    _id: 'contactsPageIntro',
    _type: 'contactsPageIntro',
    ...e.contactsPageIntro,
  });

  tx.createOrReplace({
    _id: 'pageHeroes',
    _type: 'pageHeroes',
    heroes: e.staticPageHeroes,
  });

  tx.createOrReplace({
    _id: 'homeMediaPaths',
    _type: 'homeMediaPaths',
    paths: e.homeMediaPaths,
  });

  for (const [pageId, legal] of [
    ['privacy', e.legal.privacy],
    ['cookie', e.legal.cookie],
    ['note-legali', e.legal.noteLegali],
  ] as const) {
    tx.createOrReplace({
      _id: `legalPage-${pageId}`,
      _type: 'legalPage',
      pageId,
      noticeHtml: legal.noticeHtml,
      bodyHtml: legal.bodyHtml,
      lastReviewedAt: legal.lastReviewedAt,
    });
  }

  for (const p of bundle.catalog) {
    tx.createOrReplace({
      _id: `product-${p.id}`,
      _type: 'product',
      productId: p.id,
      slug: { _type: 'slug', current: p.slug },
      name: p.name,
      shortDescription: p.shortDescription,
      description: p.description,
      category: p.category,
      variants: p.variants.map((v) => ({
        ...v,
        priceCents: v.priceCents ?? undefined,
      })),
      published: p.published,
      available: p.available,
      badges: p.badges,
      seasonalNote: p.seasonalNote,
      productInfo: p.productInfo,
    });
  }

  await tx.commit();
  console.log(`Import completato: ${bundle.catalog.length} prodotti + impostazioni. Pubblica i documenti in Studio.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
