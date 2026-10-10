export type CartLine = {
  productId: string;
  variantId: string;
  name: string;
  format: string;
  unitPriceCents: number | null;
  qty: number;
};

export type CartCustomer = {
  notes: string;
  name: string;
  phone: string;
  deliveryAddress: string;
};

export type PersistedCart = {
  version: number;
  lines: CartLine[];
};

export const CART_STORAGE_VERSION = 1;
export const CART_STORAGE_KEY = 'gramazio-tabitha-cart';
