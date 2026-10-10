import { formatEuros, lineTotalCents, sumCents } from './money';
import { siteConfig } from '../config/site.config';

export type OrderLine = {
  name: string;
  format: string;
  qty: number;
  unitPriceCents: number;
};

export type OrderCustomer = {
  notes?: string;
  name?: string;
  phone?: string;
  deliveryAddress?: string;
};

export function buildOrderMessage(
  lines: OrderLine[],
  customer: OrderCustomer = {},
): string {
  const productLines = lines.map((line) => {
    const sub = lineTotalCents(line.unitPriceCents, line.qty);
    return `- ${line.name} (${line.format}) × ${line.qty} — ${formatEuros(line.unitPriceCents)} cad. — subtot. ${formatEuros(sub)}`;
  });

  const totalCents = sumCents(
    lines.map((l) => lineTotalCents(l.unitPriceCents, l.qty)),
  );

  const parts = [
    `Richiesta ordine — ${siteConfig.name}`,
    '',
    'Prodotti:',
    ...productLines,
    '',
    `Totale indicativo prodotti: ${formatEuros(totalCents)}`,
    'Spedizione e pagamento: da concordare con l\'azienda.',
    '',
    `Note: ${customer.notes?.trim() || '—'}`,
    `Nome: ${customer.name?.trim() || '—'}`,
    `Telefono: ${customer.phone?.trim() || '—'}`,
    `Consegna: ${customer.deliveryAddress?.trim() || '—'}`,
    '',
    'Inviato dal sito web. La richiesta sarà confermata secondo le condizioni commerciali dell\'azienda.',
  ];

  return parts.join('\n');
}
