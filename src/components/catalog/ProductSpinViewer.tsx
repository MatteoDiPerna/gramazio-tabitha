import { useCallback, useEffect, useRef, useState } from 'react';
import {
  PRODUCT_SPIN_FRAME_COUNT,
  PRODUCT_SPIN_PX_PER_TURN,
  productSpinPhysics,
  spinDisplayFrameIndex,
  spinRotationFromPointerDelta,
  spinVelocityAfterFriction,
  wrapSpinRotation,
} from '@/domain/catalog/productSpin';

const TAP_MAX_MOVE_PX = 10;
const VELOCITY_SAMPLE_MS = 48;
const ZOOM_MIN = 1;
const ZOOM_MAX = 2.5;
const ZOOM_STEP = 0.35;

interface ProductSpinViewerProps {
  slug: string;
  alt: string;
  fallbackSrc: string;
  frameUrls: string[];
  productHref?: string;
  className?: string;
  /** Controlli zoom e frecce (solo product card). */
  showMediaControls?: boolean;
}

function clampZoom(value: number): number {
  return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, value));
}

function panLimits(zoom: number, width: number, height: number): { x: number; y: number } {
  const maxX = ((zoom - 1) * width) / 2;
  const maxY = ((zoom - 1) * height) / 2;
  return { x: maxX, y: maxY };
}

function clampPan(x: number, y: number, zoom: number, width: number, height: number) {
  const { x: maxX, y: maxY } = panLimits(zoom, width, height);
  return {
    x: Math.min(maxX, Math.max(-maxX, x)),
    y: Math.min(maxY, Math.max(-maxY, y)),
  };
}

export function ProductSpinViewer({
  slug,
  alt,
  fallbackSrc,
  frameUrls,
  productHref,
  className,
  showMediaControls = false,
}: ProductSpinViewerProps) {
  const hasSpin = frameUrls.length === PRODUCT_SPIN_FRAME_COUNT;
  const [rotation, setRotation] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [zoom, setZoom] = useState(ZOOM_MIN);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const rotationRef = useRef(0);
  const zoomRef = useRef(ZOOM_MIN);
  const panRef = useRef({ x: 0, y: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    startRotation: number;
    startPanX: number;
    startPanY: number;
    mode: 'rotate' | 'pan';
  } | null>(null);
  const preventNavRef = useRef(false);
  const inertiaRef = useRef<number | null>(null);
  const velocityRef = useRef(0);
  const sampleRef = useRef<{ x: number; t: number } | null>(null);
  const setRotationLive = useCallback((value: number) => {
    rotationRef.current = value;
    setRotation(value);
  }, []);

  const setZoomLive = useCallback((value: number) => {
    const next = clampZoom(value);
    zoomRef.current = next;
    setZoom(next);
    if (next <= ZOOM_MIN) {
      panRef.current = { x: 0, y: 0 };
      setPan({ x: 0, y: 0 });
    } else {
      const el = viewportRef.current;
      if (el) {
        const clamped = clampPan(panRef.current.x, panRef.current.y, next, el.clientWidth, el.clientHeight);
        panRef.current = clamped;
        setPan(clamped);
      }
    }
  }, []);

  const setPanLive = useCallback((x: number, y: number) => {
    const el = viewportRef.current;
    const clamped = el
      ? clampPan(x, y, zoomRef.current, el.clientWidth, el.clientHeight)
      : { x, y };
    panRef.current = clamped;
    setPan(clamped);
  }, []);

  const stopInertia = useCallback(() => {
    if (inertiaRef.current !== null) {
      cancelAnimationFrame(inertiaRef.current);
      inertiaRef.current = null;
    }
  }, []);

  const snapRotationToFrame = useCallback(() => {
    const index = spinDisplayFrameIndex(rotationRef.current);
    setRotationLive(index);
  }, [setRotationLive]);

  const startInertia = useCallback(
    (initialVelocity: number) => {
      stopInertia();
      let velocity = initialVelocity;
      let last = performance.now();

      const tick = (now: number) => {
        const dt = now - last;
        last = now;
        if (dt <= 0) {
          inertiaRef.current = requestAnimationFrame(tick);
          return;
        }

        const nextRotation = rotationRef.current + velocity * dt;
        setRotationLive(nextRotation);

        const nextVelocity = spinVelocityAfterFriction(velocity);
        if (nextVelocity === null) {
          inertiaRef.current = null;
          snapRotationToFrame();
          return;
        }
        velocity = nextVelocity;
        inertiaRef.current = requestAnimationFrame(tick);
      };

      if (Math.abs(initialVelocity) >= productSpinPhysics.minVelocity) {
        inertiaRef.current = requestAnimationFrame(tick);
      } else {
        snapRotationToFrame();
      }
    },
    [setRotationLive, snapRotationToFrame, stopInertia],
  );

  const stepRotation = useCallback(
    (direction: 1 | -1) => {
      stopInertia();
      preventNavRef.current = true;
      const next = wrapSpinRotation(rotationRef.current + direction);
      setRotationLive(next);
    },
    [setRotationLive, stopInertia],
  );

  useEffect(() => {
    if (!hasSpin) return;
    let cancelled = false;
    void Promise.all(
      frameUrls.map(
        (src) =>
          new Promise<void>((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => reject(new Error(src));
            img.src = src;
          }),
      ),
    )
      .then(() => {
        if (!cancelled) setLoaded(true);
      })
      .catch(() => {
        if (!cancelled) setLoaded(false);
      });
    return () => {
      cancelled = true;
      stopInertia();
    };
  }, [frameUrls, hasSpin, stopInertia]);

  const interactive = hasSpin && loaded;
  const frameIndex = interactive ? spinDisplayFrameIndex(rotation) : 0;
  const isZoomed = zoom > ZOOM_MIN + 0.001;

  const trackVelocity = useCallback((clientX: number) => {
    const now = performance.now();
    const sample = sampleRef.current;
    if (sample && now - sample.t > 0) {
      const dt = Math.min(now - sample.t, VELOCITY_SAMPLE_MS);
      const dx = clientX - sample.x;
      const instant = -(dx / dt) * (PRODUCT_SPIN_FRAME_COUNT / PRODUCT_SPIN_PX_PER_TURN);
      velocityRef.current = velocityRef.current * 0.35 + instant * 0.65;
    }
    sampleRef.current = { x: clientX, t: now };
  }, []);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!interactive) return;
      if ((event.target as HTMLElement).closest('.product-spin__control')) return;
      stopInertia();
      event.currentTarget.setPointerCapture(event.pointerId);
      preventNavRef.current = false;
      velocityRef.current = 0;
      sampleRef.current = { x: event.clientX, t: performance.now() };
      dragRef.current = {
        startX: event.clientX,
        startY: event.clientY,
        startRotation: rotationRef.current,
        startPanX: panRef.current.x,
        startPanY: panRef.current.y,
        mode: isZoomed ? 'pan' : 'rotate',
      };
    },
    [interactive, isZoomed, stopInertia],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag) return;
      const deltaX = event.clientX - drag.startX;
      const deltaY = event.clientY - drag.startY;

      if (Math.abs(deltaX) > TAP_MAX_MOVE_PX || Math.abs(deltaY) > TAP_MAX_MOVE_PX) {
        preventNavRef.current = true;
      }

      if (drag.mode === 'pan') {
        setPanLive(drag.startPanX + deltaX, drag.startPanY + deltaY);
        return;
      }

      trackVelocity(event.clientX);
      setRotationLive(spinRotationFromPointerDelta(drag.startRotation, deltaX));
    },
    [setPanLive, setRotationLive, trackVelocity],
  );

  const onPointerUp = useCallback(() => {
    const wasDragging = dragRef.current !== null;
    const mode = dragRef.current?.mode;
    dragRef.current = null;
    sampleRef.current = null;
    if (!wasDragging || !interactive) return;
    if (mode === 'rotate') {
      startInertia(velocityRef.current);
    }
  }, [interactive, startInertia]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el || !showMediaControls || !interactive) return;

    const onWheelNative = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      preventNavRef.current = true;
      const delta = event.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
      setZoomLive(zoomRef.current + delta);
    };

    el.addEventListener('wheel', onWheelNative, { passive: false });
    return () => el.removeEventListener('wheel', onWheelNative);
  }, [interactive, setZoomLive, showMediaControls]);

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if ((event.target as HTMLElement).closest('.product-spin__control')) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (!productHref) return;
      if (preventNavRef.current) {
        event.preventDefault();
        preventNavRef.current = false;
        return;
      }
      window.location.assign(productHref);
    },
    [productHref],
  );

  const onControlPointerDown = (event: React.PointerEvent) => {
    event.stopPropagation();
    preventNavRef.current = true;
  };

  return (
    <div
      className={[
        'product-spin',
        interactive ? 'product-spin--interactive' : '',
        showMediaControls ? 'product-spin--with-controls' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      data-product-slug={slug}
      onClick={onClick}
      role={interactive ? 'group' : undefined}
      aria-label={interactive ? alt : undefined}
    >
      <div
        ref={viewportRef}
        className="product-spin__viewport"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        tabIndex={interactive ? 0 : undefined}
        onKeyDown={(event) => {
          if (!interactive) return;
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            stepRotation(1);
          }
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            stepRotation(-1);
          }
          if (showMediaControls && (event.key === '+' || event.key === '=')) {
            event.preventDefault();
            setZoomLive(zoomRef.current + ZOOM_STEP);
          }
          if (showMediaControls && event.key === '-') {
            event.preventDefault();
            setZoomLive(zoomRef.current - ZOOM_STEP);
          }
        }}
      >
        <div
          className="product-spin__transform"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          }}
        >
          {interactive ? (
            <img
              className="product-spin__frame"
              src={frameUrls[frameIndex]}
              alt={alt}
              width={400}
              height={400}
              draggable={false}
              decoding="sync"
            />
          ) : (
            <img
              className="product-spin__frame"
              src={fallbackSrc}
              alt={alt}
              width={400}
              height={400}
              loading="lazy"
              draggable={false}
            />
          )}
        </div>
      </div>

      {interactive && showMediaControls && (
        <div className="product-spin__controls" aria-label="Controlli immagine prodotto">
          <div className="product-spin__controls-group">
            <button
              type="button"
              className="product-spin__control"
              aria-label="Ruota il prodotto verso sinistra"
              onPointerDown={onControlPointerDown}
              onClick={(e) => {
                e.stopPropagation();
                stepRotation(1);
              }}
            >
              ‹
            </button>
            <button
              type="button"
              className="product-spin__control"
              aria-label="Ruota il prodotto verso destra"
              onPointerDown={onControlPointerDown}
              onClick={(e) => {
                e.stopPropagation();
                stepRotation(-1);
              }}
            >
              ›
            </button>
          </div>
          <div className="product-spin__controls-group">
            <button
              type="button"
              className="product-spin__control"
              aria-label="Zoom indietro"
              disabled={zoom <= ZOOM_MIN}
              onPointerDown={onControlPointerDown}
              onClick={(e) => {
                e.stopPropagation();
                setZoomLive(zoomRef.current - ZOOM_STEP);
              }}
            >
              −
            </button>
            <button
              type="button"
              className="product-spin__control"
              aria-label="Zoom avanti"
              disabled={zoom >= ZOOM_MAX}
              onPointerDown={onControlPointerDown}
              onClick={(e) => {
                e.stopPropagation();
                setZoomLive(zoomRef.current + ZOOM_STEP);
              }}
            >
              +
            </button>
          </div>
        </div>
      )}

      {interactive && !showMediaControls && (
        <span className="product-spin__hint" aria-hidden="true">
          Ruota
        </span>
      )}

      <style>{`
        .product-spin {
          position: relative;
          width: 100%;
          height: 100%;
          touch-action: pan-y;
        }
        .product-spin--interactive .product-spin__viewport {
          touch-action: none;
          cursor: grab;
        }
        .product-spin--interactive .product-spin__viewport:active {
          cursor: grabbing;
        }
        .product-spin__viewport {
          width: 100%;
          height: 100%;
          overflow: hidden;
          outline: none;
        }
        .product-spin--with-controls .product-spin__viewport {
          overscroll-behavior: contain;
        }
        .product-spin__transform {
          width: 100%;
          height: 100%;
          transform-origin: center center;
          will-change: transform;
        }
        .product-spin__frame {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          user-select: none;
          -webkit-user-drag: none;
          image-rendering: auto;
          backface-visibility: hidden;
        }
        .product-spin__controls {
          position: absolute;
          inset: auto 0.5rem 0.5rem 0.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          pointer-events: none;
        }
        .product-spin__controls-group {
          display: flex;
          gap: 0.25rem;
          pointer-events: auto;
        }
        .product-spin__control {
          display: grid;
          place-items: center;
          min-width: 2rem;
          height: 2rem;
          padding: 0 0.35rem;
          border: 1px solid var(--color-border, #e8e8e4);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.92);
          color: var(--color-primary, #2d5016);
          font-size: 1.125rem;
          line-height: 1;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
        }
        .product-spin__control:hover:not(:disabled) {
          background: #fff;
        }
        .product-spin__control:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
        .product-spin__hint {
          position: absolute;
          right: 0.5rem;
          bottom: 0.5rem;
          font-size: 0.6875rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 0.2rem 0.45rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.88);
          color: var(--color-text-muted, #5c5c5c);
          border: 1px solid var(--color-border, #e8e8e4);
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
