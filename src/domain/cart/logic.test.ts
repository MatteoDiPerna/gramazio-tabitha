import { describe, expect, it } from 'vitest';
import type { Product } from '@/domain/catalog/catalog.schema';
import {
  addLine,
  cartItemCount,
  computeCartTotals,
  createCartLine,
  removeLine,
  setLineQty,
  syncCartWithCatalog,
} from '@/domain/cart/logic';
import type { CartLine } from '@/domain/cart/types';

const sampleProduct: Product = {
  id: 'olio-evo-bio',
  slug: 'olio-extravergine-biologico',
  name: 'Olio EVO Bio',
  shortDescription: 'Test',
  category: 'olio',
  image: { src: '/x.svg', alt: 'x' },
  variants: [
    { id: '500ml', label: '500 ml', priceCents: 1200, unit: 'ml', unitAmount: 500 },
  ],
  published: true,
  available: true,
};

describe('cart logic', () => {
  it('creates and merges lines', () => {
    const line = createCartLine(sampleProduct, '500ml', 2);
    expect(line).not.toBeNull();
    let lines = addLine([], line!);
    lines = addLine(lines, { ...line!, qty: 1 });
    expect(lines[0].qty).toBe(3);
    expect(cartItemCount(lines)).toBe(3);
  });

  it('computes totals with mixed null prices', () => {
    const lines: CartLine[] = [
      {
        productId: 'a',
        variantId: 'v1',
        name: 'A',
        format: '1L',
        unitPriceCents: 1000,
        qty: 2,
      },
      {
        productId: 'b',
        variantId: 'v1',
        name: 'B',
        format: '—',
        unitPriceCents: null,
        qty: 1,
      },
    ];
    const t = computeCartTotals(lines);
    expect(t.totalCents).toBe(2000);
    expect(t.hasUnknownPrices).toBe(true);
  });

  it('updates and removes qty', () => {
    const line = createCartLine(sampleProduct, '500ml', 1)!;
    let lines = addLine([], line);
    lines = setLineQty(lines, 'olio-evo-bio', '500ml', 5);
    expect(lines[0].qty).toBe(5);
    lines = removeLine(lines, 'olio-evo-bio', '500ml');
    expect(lines).toHaveLength(0);
  });

  it('syncs from catalog', () => {
    const lines: CartLine[] = [
      {
        productId: 'olio-evo-bio',
        variantId: '500ml',
        name: 'Old name',
        format: 'old',
        unitPriceCents: 999,
        qty: 1,
      },
    ];
    const synced = syncCartWithCatalog(lines, [sampleProduct]);
    expect(synced[0].name).toBe('Olio EVO Bio');
    expect(synced[0].unitPriceCents).toBe(1200);
  });
});
