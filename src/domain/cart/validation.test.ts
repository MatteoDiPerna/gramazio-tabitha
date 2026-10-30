import { describe, expect, it } from 'vitest';
import { cartContactValidationError, isValidPhone } from '@/domain/cart/validation';

describe('cart validation', () => {
  it('accepts empty phone', () => {
    expect(isValidPhone('')).toBe(true);
    expect(cartContactValidationError('')).toBeNull();
  });

  it('rejects too short phone', () => {
    expect(isValidPhone('12345')).toBe(false);
    expect(cartContactValidationError('12345')).toMatch(/valido/i);
  });

  it('accepts normalized italian mobile', () => {
    expect(isValidPhone('+39 333 1234567')).toBe(true);
  });
});
