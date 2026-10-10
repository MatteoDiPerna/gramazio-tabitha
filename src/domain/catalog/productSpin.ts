export const PRODUCT_SPIN_FRAME_COUNT = 8;

/** Pixel di trascinamento orizzontale per un giro completo (360°). */
export const PRODUCT_SPIN_PX_PER_TURN = 320;

const FRICTION = 0.94;
const MIN_VELOCITY = 0.002;

/** Path pubblici delle frame 360° (`/images/products/{slug}/360/00.jpg` …). */
export function productSpinFrameUrls(slug: string): string[] {
  return Array.from({ length: PRODUCT_SPIN_FRAME_COUNT }, (_, i) => {
    const id = String(i).padStart(2, '0');
    return `/images/products/${slug}/360/${id}.jpg`;
  });
}

/** Rotazione continua in «unità frame» (0 … FRAME_COUNT), con wrap. */
export function wrapSpinRotation(rotation: number): number {
  const n = PRODUCT_SPIN_FRAME_COUNT;
  return ((rotation % n) + n) % n;
}

export function spinRotationFromPointerDelta(
  startRotation: number,
  deltaX: number,
  pxPerTurn = PRODUCT_SPIN_PX_PER_TURN,
): number {
  const n = PRODUCT_SPIN_FRAME_COUNT;
  const delta = -(deltaX / pxPerTurn) * n;
  return startRotation + delta;
}

/** Frame nitido da mostrare (una sola immagine, niente sovrapposizioni). */
export function spinDisplayFrameIndex(rotation: number): number {
  const wrapped = wrapSpinRotation(rotation);
  return Math.floor(wrapped + 0.5) % PRODUCT_SPIN_FRAME_COUNT;
}

/** Velocità (unità frame/ms) dopo attrito; null se ferma. */
export function spinVelocityAfterFriction(velocity: number): number | null {
  const next = velocity * FRICTION;
  if (Math.abs(next) < MIN_VELOCITY) return null;
  return next;
}

export const productSpinPhysics = {
  friction: FRICTION,
  minVelocity: MIN_VELOCITY,
} as const;
