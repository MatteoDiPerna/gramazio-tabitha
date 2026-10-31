import type { Product } from '@/domain/catalog/catalog.schema';
import type { FaqItem } from '@/content/faq';
import { siteConfig } from '@/config/site.config';
import { absoluteUrl } from '@/domain/seo/urls';

type JsonLd = Record<string, unknown>;

export function buildOrganizationJsonLd(): JsonLd {
  const { address } = siteConfig;
  return {
    '@type': 'Organization',
    '@id': `${absoluteUrl('/')}#organization`,
    name: siteConfig.name,
    url: absoluteUrl('/'),
    email: siteConfig.email,
    telephone: siteConfig.phoneDisplay,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      postalCode: address.postalCode,
      addressRegion: address.province,
      addressCountry: address.country,
    },
  };
}

export function buildLocalBusinessJsonLd(): JsonLd {
  const org = buildOrganizationJsonLd();
  return {
    ...org,
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${absoluteUrl('/')}#localbusiness`,
  };
}

export function buildProductJsonLd(product: Product, imagePath?: string): JsonLd {
  const variant = product.variants[0];
  const imageSrc = imagePath ?? product.image.src;
  const data: JsonLd = {
    '@type': 'Product',
    '@id': `${absoluteUrl(`/prodotti/${product.slug}`)}#product`,
    name: product.name,
    description: product.shortDescription,
    image: absoluteUrl(imageSrc),
    url: absoluteUrl(`/prodotti/${product.slug}`),
  };

  if (variant.priceCents != null) {
    data.offers = {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: (variant.priceCents / 100).toFixed(2),
      availability: product.available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/PreOrder',
      url: absoluteUrl(`/prodotti/${product.slug}`),
    };
  }

  return data;
}

export function buildFaqPageJsonLd(items: FaqItem[]): JsonLd {
  return {
    '@type': 'FAQPage',
    '@id': `${absoluteUrl('/faq')}#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripHtml(item.answerHtml),
      },
    })),
  };
}

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/\s+\n/g, '\n')
    .trim();
}

export function jsonLdGraph(...nodes: JsonLd[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': nodes,
  });
}
