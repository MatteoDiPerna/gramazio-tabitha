/** Validazione leggera campi carrello prima di aprire WA / email. */

export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 0) return true;
  return digits.length >= 9 && digits.length <= 15;
}

export function cartContactValidationError(phone: string): string | null {
  if (!phone.trim()) return null;
  if (!isValidPhone(phone)) {
    return 'Inserisci un numero di telefono valido (almeno 9 cifre) o lascia il campo vuoto.';
  }
  return null;
}
