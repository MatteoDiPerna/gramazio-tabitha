import type { Product } from '@/domain/catalog/catalog.schema';
import { lineTotalCents, sumCents } from '@/domain/order/money';
import type { CartLine } from '@/domain/cart/types';

export const CART_QTY_MIN = 1;
export const CART_QTY_MAX = 10;

export function clampCartQty(qty: number): number {
  const n = Math.floor(Number(qty));
  if (!Number.isFinite(n)) return CART_QTY_MIN;
  return Math.min(CART_QTY_MAX, Math.max(CART_QTY_MIN, n));
}

export function cartLineKey(productId: string, variantId: string): string {
  return `${productId}:${variantId}`;
}

export function canAddProductToCart(product: Product): boolean {
  return product.published && product.available;
}

export function createCartLine(
  product: Product,
  variantId: string,
  qty: number,
): CartLine | null {
  const safeQty = clampCartQty(qty);
  if (!canAddProductToCart(product) || safeQty < CART_QTY_MIN) return null;
  const variant = product.variants.find((v) => v.id === variantId);
  if (!variant) return null;

  return {
    productId: product.id,
    variantId: variant.id,
    name: product.name,
    format: variant.label,
    unitPriceCents: variant.priceCents,
    qty: safeQty,
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
      ? { ...l, qty: clampCartQty(l.qty + line.qty) }
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
  const safeQty = clampCartQty(qty);
  return lines.map((l) =>
    l.productId === productId && l.variantId === variantId ? { ...l, qty: safeQty } : l,
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
        qty: clampCartQty(line.qty),
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
