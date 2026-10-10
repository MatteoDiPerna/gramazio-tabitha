import type { Product, ProductVariant } from '@/domain/catalog/catalog.schema';
import { formatEuros } from '@/domain/order/money';

export function formatVariantPrice(variant: ProductVariant): string {
  if (variant.priceCents == null) return 'Prezzo su richiesta';
  return formatEuros(variant.priceCents);
}

export function pricePerLiter(variant: ProductVariant): string | null {
  if (variant.priceCents == null || !variant.unitAmount || variant.unit !== 'ml') {
    return null;
  }
  const liters = variant.unitAmount / 1000;
  if (liters <= 0) return null;
  const centsPerLiter = Math.round(variant.priceCents / liters);
  return `${formatEuros(centsPerLiter)}/L`;
}

export function productAvailabilityLabel(product: Product): string {
  if (!product.available) return 'Disponibilità da confermare';
  return 'Disponibile';
}
