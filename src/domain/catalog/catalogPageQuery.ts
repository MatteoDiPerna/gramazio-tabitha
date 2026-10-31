import { catalogCategories, isCatalogCategory, type CatalogCategoryId } from '@/domain/catalog/catalogCategories';
import type { CatalogSort } from '@/domain/catalog/query';

export function parseCatalogQuery(search: string): {
  category: CatalogCategoryId | null;
  sort: CatalogSort;
} {
  const query = search.includes('?') ? search.slice(search.indexOf('?') + 1) : search.replace(/^\?/, '');
  const params = new URLSearchParams(query);
  const rawCategory = params.get('categoria');
  const category = isCatalogCategory(rawCategory) ? rawCategory : null;
  const sort: CatalogSort = params.get('ordina') === 'category' ? 'category' : 'name';
  return { category, sort };
}

export type CatalogGridItem = {
  category: CatalogCategoryId;
  name: string;
  searchText: string;
};

export function normalizeCatalogSearch(value: string): string {
  return value
    .trim()
    .toLocaleLowerCase('it')
    .normalize('NFD')
    .replace(/\p{M}/gu, '');
}

export function matchesSearch(item: CatalogGridItem, query: string): boolean {
  const q = normalizeCatalogSearch(query);
  if (!q) return true;
  return normalizeCatalogSearch(item.searchText).includes(q);
}

const categoryOrder = new Map(catalogCategories.map((c, i) => [c.id, i]));

export function compareCatalogGridItems(a: CatalogGridItem, b: CatalogGridItem, sort: CatalogSort): number {
  if (sort === 'category') {
    const ca = categoryOrder.get(a.category) ?? 99;
    const cb = categoryOrder.get(b.category) ?? 99;
    if (ca !== cb) return ca - cb;
  }
  return a.name.localeCompare(b.name, 'it');
}

export function matchesCategory(item: CatalogGridItem, category: CatalogCategoryId | null): boolean {
  return category == null || item.category === category;
}

export function buildCatalogHref(category: CatalogCategoryId | null, sort: CatalogSort): string {
  const params = new URLSearchParams();
  if (category) params.set('categoria', category);
  if (sort !== 'name') params.set('ordina', sort);
  const q = params.toString();
  return q ? `/catalogo?${q}` : '/catalogo';
}
