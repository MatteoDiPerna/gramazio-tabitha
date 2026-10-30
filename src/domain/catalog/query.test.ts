import { describe, expect, it } from 'vitest';
import type { Product } from '@/domain/catalog/catalog.schema';
import {
  catalogHasIncompletePricing,
  catalogMetaDescription,
  getRelatedProducts,
  sortPublishedProducts,
} from '@/domain/catalog/query';

const base = (overrides: Partial<Product>): Product => ({
  id: 'a',
  slug: 'a',
  name: 'Zeta',
  shortDescription: 's',
  category: 'olio',
  image: { src: '/x.svg', alt: 'x' },
  variants: [{ id: 'v', label: '1L', priceCents: null }],
  published: true,
  available: true,
  ...overrides,
});

describe('catalog query', () => {
  it('sorts by name', () => {
    const sorted = sortPublishedProducts([
      base({ id: '1', name: 'Beta', slug: 'b' }),
      base({ id: '2', name: 'Alfa', slug: 'a' }),
    ]);
    expect(sorted.map((p) => p.name)).toEqual(['Alfa', 'Beta']);
  });

  it('finds related in same category', () => {
    const current = base({ id: '1', slug: 'one', category: 'legumi' });
    const related = getRelatedProducts(
      current,
      [
        current,
        base({ id: '2', slug: 'two', category: 'legumi', name: 'Other' }),
        base({ id: '3', slug: 'three', category: 'olio', name: 'Oil' }),
      ],
      2,
    );
    expect(related).toHaveLength(1);
    expect(related[0]?.slug).toBe('two');
  });

  it('detects incomplete pricing', () => {
    expect(catalogHasIncompletePricing([base({})])).toBe(true);
    expect(
      catalogHasIncompletePricing([
        base({ variants: [{ id: 'v', label: '1L', priceCents: 1200 }] }),
      ]),
    ).toBe(false);
  });

  it('builds category meta description', () => {
    expect(catalogMetaDescription('olio')).toMatch(/Olio extravergine/i);
    expect(catalogMetaDescription(null)).toMatch(/Catalogo prodotti/i);
  });
});
