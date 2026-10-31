import { catalogSchema, type Product } from '@/domain/catalog/catalog.schema';
import { getCmsBundle } from '@/cms/loadBundle';

export { catalogSchema } from '@/domain/catalog/catalog.schema';
export type { Product, ProductVariant } from '@/domain/catalog/catalog.schema';
export { catalogCategories, isCatalogCategory } from '@/domain/catalog/catalogCategories';
export type { CatalogCategoryId } from '@/domain/catalog/catalogCategories';

export const catalog: Product[] = catalogSchema.parse(getCmsBundle().catalog);

export function getPublishedProducts(): Product[] {
  return catalog.filter((p) => p.published);
}

export function getProductBySlug(slug: string): Product | undefined {
  return catalog.find((p) => p.slug === slug && p.published);
}

export function getProductById(id: string): Product | undefined {
  return catalog.find((p) => p.id === id);
}

export {
  sortPublishedProducts,
  getRelatedProducts,
  catalogHasIncompletePricing,
  catalogMetaDescription,
} from '@/domain/catalog/query';
export type { CatalogSort } from '@/domain/catalog/query';
