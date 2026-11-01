import { siteClientConfig } from '@/config/site.client';
import { formatEuros, lineTotalCents, sumCents } from '@/domain/order/money';

export type OrderLine = {
  name: string;
  format: string;
  qty: number;
  unitPriceCents: number | null;
};

function formatUnitPrice(cents: number | null): string {
  if (cents == null) return 'Prezzo da confermare';
  return formatEuros(cents);
}

function formatSubtotal(cents: number | null, qty: number): string {
  if (cents == null) return 'Subtotale da confermare';
  return formatEuros(lineTotalCents(cents, qty));
}

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
    return `- ${line.name} (${line.format}) × ${line.qty} — ${formatUnitPrice(line.unitPriceCents)} cad. — subtot. ${formatSubtotal(line.unitPriceCents, line.qty)}`;
  });

  const pricedLines = lines.filter((l) => l.unitPriceCents != null);
  const totalCents =
    pricedLines.length > 0
      ? sumCents(
          pricedLines.map((l) => lineTotalCents(l.unitPriceCents!, l.qty)),
        )
      : null;
  const totalLine =
    totalCents != null
      ? `Totale indicativo prodotti: ${formatEuros(totalCents)}`
      : 'Totale indicativo prodotti: da confermare (prezzi non in listino)';

  const parts = [
    `Richiesta ordine — ${siteClientConfig.name}`,
    '',
    'Prodotti:',
    ...productLines,
    '',
    totalLine,
    "Spedizione e pagamento: da concordare con l'azienda.",
    '',
    `Note: ${customer.notes?.trim() || '—'}`,
    `Nome: ${customer.name?.trim() || '—'}`,
    `Telefono: ${customer.phone?.trim() || '—'}`,
    `Consegna: ${customer.deliveryAddress?.trim() || '—'}`,
    '',
    "Inviato dal sito web. La richiesta sarà confermata secondo le condizioni commerciali dell'azienda.",
  ];

  return parts.join('\n');
}
