import { catalogSchema, type Product } from '@/domain/catalog/catalog.schema';
import { rawCatalog } from '@/domain/catalog/products.data';

export { catalogSchema } from '@/domain/catalog/catalog.schema';
export type { Product, ProductVariant } from '@/domain/catalog/catalog.schema';
export { catalogCategories, isCatalogCategory } from '@/domain/catalog/catalogCategories';
export type { CatalogCategoryId } from '@/domain/catalog/catalogCategories';

export const catalog: Product[] = catalogSchema.parse(rawCatalog);

export function getPublishedProducts(): Product[] {
  return catalog.filter((p) => p.published);
}

export function getProductBySlug(slug: string): Product | undefined {
  return catalog.find((p) => p.slug === slug && p.published);
}

export function getProductById(id: string): Product | undefined {
  return catalog.find((p) => p.id === id);
}
