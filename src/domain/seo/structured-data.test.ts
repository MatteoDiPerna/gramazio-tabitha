import { describe, expect, it } from 'vitest';
import type { Product } from '@/domain/catalog/catalog.schema';
import { buildProductJsonLd, jsonLdGraph } from '@/domain/seo/structured-data';

const product: Product = {
  id: 'test',
  slug: 'test-product',
  name: 'Test',
  shortDescription: 'Desc',
  category: 'olio',
  image: { src: '/images/x.svg', alt: 'x' },
  variants: [{ id: 'v1', label: '500 ml', priceCents: null }],
  published: true,
  available: false,
};

describe('structured-data', () => {
  it('omits offers without price', () => {
    const node = buildProductJsonLd(product);
    expect(node.offers).toBeUndefined();
  });

  it('includes offers when price set', () => {
    const priced = {
      ...product,
      variants: [{ id: 'v1', label: '500 ml', priceCents: 1500 }],
      available: true,
    };
    const node = buildProductJsonLd(priced);
    expect(node.offers).toMatchObject({ price: '15.00', priceCurrency: 'EUR' });
  });

  it('serializes graph', () => {
    const json = jsonLdGraph({ '@type': 'Thing', name: 'A' });
    expect(JSON.parse(json)['@graph']).toHaveLength(1);
  });
});
