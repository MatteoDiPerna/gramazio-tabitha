import type { Product } from './catalog.schema';

export const catalogCategories = [
  { id: 'olio', label: 'Olio' },
  { id: 'legumi', label: 'Legumi' },
  { id: 'condimenti', label: 'Condimenti' },
] as const satisfies ReadonlyArray<{ id: Product['category']; label: string }>;

export type CatalogCategoryId = (typeof catalogCategories)[number]['id'];

export function isCatalogCategory(value: string | null): value is CatalogCategoryId {
  return catalogCategories.some((c) => c.id === value);
}
