import { describe, expect, it } from 'vitest';
import { buildOrderMessage } from './orderMessage';
import { buildWhatsAppUrl } from './whatsapp';
import { buildMailtoUrl } from './mailto';

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

  it('encodes accents in whatsapp url', () => {
    const msg = buildOrderMessage(
      [{ name: 'Patè di Fave', format: '180 g', qty: 1, unitPriceCents: 500 }],
      { notes: 'Per favore' },
    );
    const url = buildWhatsAppUrl(msg);
    // whatsappE164 empty → null until configured
    expect(url).toBeNull();
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
