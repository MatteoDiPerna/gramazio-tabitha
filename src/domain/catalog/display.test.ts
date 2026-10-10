import { describe, expect, it } from 'vitest';
import { formatVariantPrice, pricePerLiter } from '@/domain/catalog/display';

describe('catalogDisplay', () => {
  it('shows request price when cents null', () => {
    expect(formatVariantPrice({ id: 'x', label: '500 ml', priceCents: null })).toBe(
      'Prezzo su richiesta',
    );
  });

  it('computes per liter for ml variants', () => {
    const label = pricePerLiter({
      id: 'x',
      label: '500 ml',
      priceCents: 1000,
      unit: 'ml',
      unitAmount: 500,
    });
    expect(label).toMatch(/\/L/);
  });
});
