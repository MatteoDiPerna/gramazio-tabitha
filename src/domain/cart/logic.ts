import type { Product } from '@/domain/catalog/catalog.schema';
import { lineTotalCents, sumCents } from '@/domain/order/money';
import type { CartLine } from '@/domain/cart/types';

export function cartLineKey(productId: string, variantId: string): string {
  return `${productId}:${variantId}`;
}

export function canAddProductToCart(product: Product): boolean {
  return product.published;
}

export function createCartLine(
  product: Product,
  variantId: string,
  qty: number,
): CartLine | null {
  if (!canAddProductToCart(product) || qty < 1) return null;
  const variant = product.variants.find((v) => v.id === variantId);
  if (!variant) return null;

  return {
    productId: product.id,
    variantId: variant.id,
    name: product.name,
    format: variant.label,
    unitPriceCents: variant.priceCents,
    qty,
  };
}

export function addLine(lines: CartLine[], line: CartLine): CartLine[] {
  const key = cartLineKey(line.productId, line.variantId);
  const existing = lines.find(
    (l) => cartLineKey(l.productId, l.variantId) === key,
  );
  if (!existing) return [...lines, line];
  return lines.map((l) =>
    cartLineKey(l.productId, l.variantId) === key
      ? { ...l, qty: l.qty + line.qty }
      : l,
  );
}

export function setLineQty(
  lines: CartLine[],
  productId: string,
  variantId: string,
  qty: number,
): CartLine[] {
  if (qty <= 0) {
    return removeLine(lines, productId, variantId);
  }
  return lines.map((l) =>
    l.productId === productId && l.variantId === variantId ? { ...l, qty } : l,
  );
}

export function removeLine(
  lines: CartLine[],
  productId: string,
  variantId: string,
): CartLine[] {
  return lines.filter(
    (l) => !(l.productId === productId && l.variantId === variantId),
  );
}

export function cartItemCount(lines: CartLine[]): number {
  return lines.reduce((acc, l) => acc + l.qty, 0);
}

export type CartTotals = {
  totalCents: number | null;
  hasUnknownPrices: boolean;
  lineSubtotals: Map<string, number | null>;
};

export function computeCartTotals(lines: CartLine[]): CartTotals {
  const lineSubtotals = new Map<string, number | null>();
  let hasUnknownPrices = false;
  const known: number[] = [];

  for (const line of lines) {
    const key = cartLineKey(line.productId, line.variantId);
    if (line.unitPriceCents == null) {
      hasUnknownPrices = true;
      lineSubtotals.set(key, null);
    } else {
      const sub = lineTotalCents(line.unitPriceCents, line.qty);
      lineSubtotals.set(key, sub);
      known.push(sub);
    }
  }

  return {
    totalCents: known.length ? sumCents(known) : null,
    hasUnknownPrices,
    lineSubtotals,
  };
}

/** Allinea prezzi e testi al catalogo; rimuove prodotti non più pubblicati. */
export function syncCartWithCatalog(
  lines: CartLine[],
  products: Product[],
): CartLine[] {
  const byId = new Map(products.map((p) => [p.id, p]));
  return lines
    .map((line) => {
      const product = byId.get(line.productId);
      if (!product || !product.published) return null;
      const variant = product.variants.find((v) => v.id === line.variantId);
      if (!variant) return null;
      return {
        ...line,
        name: product.name,
        format: variant.label,
        unitPriceCents: variant.priceCents,
      };
    })
    .filter((l): l is CartLine => l !== null);
}

export function toOrderLines(lines: CartLine[]): {
  name: string;
  format: string;
  qty: number;
  unitPriceCents: number | null;
}[] {
  return lines.map((l) => ({
    name: l.name,
    format: l.format,
    qty: l.qty,
    unitPriceCents: l.unitPriceCents,
  }));
}
