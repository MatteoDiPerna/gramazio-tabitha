const CART_FORM_KEY = 'gramazio-tabitha-cart-form-v1';

export type CartFormDraft = {
  notes: string;
  name: string;
  phone: string;
  deliveryAddress: string;
};

const emptyDraft = (): CartFormDraft => ({
  notes: '',
  name: '',
  phone: '',
  deliveryAddress: '',
});

export function loadCartFormDraft(): CartFormDraft {
  if (typeof sessionStorage === 'undefined') return emptyDraft();
  try {
    const raw = sessionStorage.getItem(CART_FORM_KEY);
    if (!raw) return emptyDraft();
    const parsed = JSON.parse(raw) as Partial<CartFormDraft>;
    return {
      notes: typeof parsed.notes === 'string' ? parsed.notes : '',
      name: typeof parsed.name === 'string' ? parsed.name : '',
      phone: typeof parsed.phone === 'string' ? parsed.phone : '',
      deliveryAddress:
        typeof parsed.deliveryAddress === 'string' ? parsed.deliveryAddress : '',
    };
  } catch {
    return emptyDraft();
  }
}

export function saveCartFormDraft(draft: CartFormDraft): void {
  if (typeof sessionStorage === 'undefined') return;
  sessionStorage.setItem(CART_FORM_KEY, JSON.stringify(draft));
}

export function clearCartFormDraft(): void {
  if (typeof sessionStorage === 'undefined') return;
  sessionStorage.removeItem(CART_FORM_KEY);
}
