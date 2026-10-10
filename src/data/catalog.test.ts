import { describe, expect, it } from 'vitest';
import { catalog, getPublishedProducts, getProductBySlug } from './catalog';
import { catalogSchema } from './catalog.schema';

describe('catalog', () => {
  it('parses and exposes published products', () => {
    expect(catalogSchema.parse(catalog).length).toBeGreaterThan(0);
    expect(getPublishedProducts().every((p) => p.published)).toBe(true);
  });

  it('resolves slug', () => {
    const p = getProductBySlug('olio-extravergine-biologico');
    expect(p?.name).toMatch(/Olio/i);
  });
});
