import type { Product } from '@/domain/catalog/catalog.schema';
import { resolvePublicImage } from '@/domain/media/resolvePublicImage';

/** Solo build/SSR — non importare da componenti React client. */
export function resolveProductImageSrc(product: Product): string {
  return (
    resolvePublicImage(`images/products/${product.slug}`, product.image.src) ?? product.image.src
  );
}
