import { describe, expect, it } from 'vitest';
import {
  buildCatalogHref,
  compareCatalogGridItems,
  matchesCategory,
  parseCatalogQuery,
} from '@/domain/catalog/catalogPageQuery';

describe('parseCatalogQuery', () => {
  it('parses category and sort', () => {
    expect(parseCatalogQuery('?categoria=olio&ordina=category')).toEqual({
      category: 'olio',
      sort: 'category',
    });
  });

  it('ignores invalid category', () => {
    expect(parseCatalogQuery('?categoria=unknown')).toEqual({ category: null, sort: 'name' });
  });
});

describe('compareCatalogGridItems', () => {
  const a = { category: 'legumi' as const, name: 'Zeta' };
  const b = { category: 'olio' as const, name: 'Alpha' };

  it('sorts by name', () => {
    expect(compareCatalogGridItems(a, b, 'name')).toBeGreaterThan(0);
  });

  it('sorts by category then name', () => {
    expect(compareCatalogGridItems(a, b, 'category')).toBeGreaterThan(0);
  });
});

describe('matchesCategory', () => {
  it('matches all when category null', () => {
    expect(matchesCategory({ category: 'olio', name: 'x' }, null)).toBe(true);
  });

  it('filters by category', () => {
    expect(matchesCategory({ category: 'olio', name: 'x' }, 'legumi')).toBe(false);
  });
});

describe('buildCatalogHref', () => {
  it('builds query string', () => {
    expect(buildCatalogHref('olio', 'category')).toBe('/catalogo?categoria=olio&ordina=category');
    expect(buildCatalogHref(null, 'name')).toBe('/catalogo');
  });
});
