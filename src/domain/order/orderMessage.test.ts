import { describe, expect, it } from 'vitest';
import { buildMailtoUrl } from '@/domain/order/mailto';
import { buildOrderMessage } from '@/domain/order/orderMessage';
import { buildWhatsAppUrl } from '@/domain/order/whatsapp';

describe('buildOrderMessage', () => {
  it('includes products, totals and customer fields', () => {
    const body = buildOrderMessage(
      [
        {
          name: 'Olio EVO Bio',
          format: '500 ml',
          qty: 2,
          unitPriceCents: 1250,
        },
      ],
      { name: 'Mario', notes: 'Consegna mattina' },
    );
    expect(body).toContain('Olio EVO Bio');
    expect(body).toContain('× 2');
    expect(body).toContain('Mario');
    expect(body).toContain('Consegna mattina');
    expect(body).toMatch(/Totale indicativo prodotti:/);
  });

  it('handles null unit prices in message', () => {
    const body = buildOrderMessage(
      [{ name: 'Patè di Fave', format: '180 g', qty: 1, unitPriceCents: null }],
      { notes: 'Per favore' },
    );
    expect(body).toContain('Prezzo da confermare');
    expect(body).toContain('da confermare');
  });

  it('encodes accents in whatsapp url', () => {
    const msg = buildOrderMessage(
      [{ name: 'Patè di Fave', format: '180 g', qty: 1, unitPriceCents: 500 }],
      { notes: 'Per favore' },
    );
    const url = buildWhatsAppUrl(msg);
    expect(url).not.toBeNull();
    expect(url).toContain(encodeURIComponent('Patè'));
    expect(url).toContain('wa.me/393299147756');
  });
});

describe('buildMailtoUrl', () => {
  it('builds mailto with subject and body', () => {
    const url = buildMailtoUrl('Test oggetto', 'Corpo con àèé');
    expect(url.startsWith('mailto:')).toBe(true);
    expect(url).toContain(encodeURIComponent('Test oggetto'));
    expect(url).toContain(encodeURIComponent('àèé'));
  });
});
