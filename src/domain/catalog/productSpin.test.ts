import { describe, expect, it } from 'vitest';
import {
  PRODUCT_SPIN_FRAME_COUNT,
  spinDisplayFrameIndex,
  spinRotationFromPointerDelta,
  wrapSpinRotation,
} from '@/domain/catalog/productSpin';

describe('productSpin', () => {
  it('wraps rotation into frame range', () => {
    expect(wrapSpinRotation(0)).toBe(0);
    expect(wrapSpinRotation(8)).toBe(0);
    expect(wrapSpinRotation(-1)).toBe(7);
  });

  it('maps horizontal drag to continuous rotation', () => {
    const fullTurn = spinRotationFromPointerDelta(0, -320, 320);
    expect(fullTurn).toBeCloseTo(PRODUCT_SPIN_FRAME_COUNT);
  });

  it('picks a single sharp frame from continuous rotation', () => {
    expect(spinDisplayFrameIndex(1.25)).toBe(1);
    expect(spinDisplayFrameIndex(1.75)).toBe(2);
    expect(spinDisplayFrameIndex(7.6)).toBe(0);
  });
});
