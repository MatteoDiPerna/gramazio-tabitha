/** Importi in centesimi (integer) per evitare errori floating point. */
export function formatEuros(cents: number): string {
  const value = cents / 100;
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
}

export function lineTotalCents(unitPriceCents: number, qty: number): number {
  return unitPriceCents * qty;
}

export function sumCents(values: number[]): number {
  return values.reduce((acc, n) => acc + n, 0);
}
