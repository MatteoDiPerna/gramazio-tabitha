import {
  CART_STORAGE_KEY,
  CART_STORAGE_VERSION,
  type CartLine,
  type PersistedCart,
} from './types';

export function loadCartLines(): CartLine[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as PersistedCart;
    if (parsed.version !== CART_STORAGE_VERSION || !Array.isArray(parsed.lines)) {
      return [];
    }
    return parsed.lines.filter(
      (l) =>
        l &&
        typeof l.productId === 'string' &&
        typeof l.variantId === 'string' &&
        typeof l.qty === 'number' &&
        l.qty > 0,
    );
  } catch {
    return [];
  }
}

export function saveCartLines(lines: CartLine[]): void {
  if (typeof localStorage === 'undefined') return;
  const payload: PersistedCart = {
    version: CART_STORAGE_VERSION,
    lines,
  };
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(payload));
  window.dispatchEvent(new CustomEvent('cart-updated'));
}
