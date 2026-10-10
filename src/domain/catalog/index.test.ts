import { describe, expect, it } from 'vitest';
import { catalog as clientCatalog } from '@/domain/catalog/catalog.client';
import { catalog, catalogSchema, getProductBySlug, getPublishedProducts } from '@/domain/catalog';

describe('catalog', () => {
  it('client catalog matches Zod-validated catalog', () => {
    expect(clientCatalog).toEqual(catalog);
  });

  it('parses and exposes published products', () => {
    expect(catalogSchema.parse(catalog).length).toBeGreaterThan(0);
    expect(getPublishedProducts().every((p) => p.published)).toBe(true);
  });

  it('resolves slug', () => {
    const p = getProductBySlug('olio-extravergine-biologico');
    expect(p?.name).toMatch(/Olio/i);
  });
});
