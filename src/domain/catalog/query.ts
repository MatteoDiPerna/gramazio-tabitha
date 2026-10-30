import type { Product } from '@/domain/catalog/catalog.schema';
import type { CatalogCategoryId } from '@/domain/catalog/catalogCategories';
import { catalogCategories } from '@/domain/catalog/catalogCategories';

export type CatalogSort = 'name' | 'category';

export function sortPublishedProducts(
  products: Product[],
  sort: CatalogSort = 'name',
): Product[] {
  const copy = [...products];
  if (sort === 'category') {
    const order = new Map(catalogCategories.map((c, i) => [c.id, i]));
    copy.sort((a, b) => {
      const ca = order.get(a.category) ?? 99;
      const cb = order.get(b.category) ?? 99;
      if (ca !== cb) return ca - cb;
      return a.name.localeCompare(b.name, 'it');
    });
    return copy;
  }
  copy.sort((a, b) => a.name.localeCompare(b.name, 'it'));
  return copy;
}

export function getRelatedProducts(product: Product, all: Product[], limit = 3): Product[] {
  return all
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export function catalogHasIncompletePricing(products: Product[]): boolean {
  return products.some((p) => p.variants.every((v) => v.priceCents == null));
}

const categoryDescriptions: Record<CatalogCategoryId, string> = {
  olio:
    'Olio extravergine biologico e formati EVO di produzione propria. Prezzi e disponibilità aggiornati non appena confermati in listino.',
  legumi:
    'Legumi del Gargano, tra cui la fava di Carpino e specialità locali. Controlla formato e disponibilità in scheda prodotto.',
  condimenti:
    'Condimenti e conserve a base di prodotti agricoli dell’azienda. Ingredienti e formati in scheda.',
};

export function catalogMetaDescription(activeCategory: CatalogCategoryId | null): string {
  if (activeCategory) {
    const label = catalogCategories.find((c) => c.id === activeCategory)?.label;
    return categoryDescriptions[activeCategory] ?? `Catalogo ${label ?? activeCategory} — Gramazio Tabitha.`;
  }
  return "Catalogo prodotti dell'Azienda Agricola Gramazio Tabitha: olio EVO bio, legumi e condimenti del Gargano.";
}
