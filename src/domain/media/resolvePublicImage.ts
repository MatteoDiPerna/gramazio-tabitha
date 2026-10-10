import { existsSync } from 'node:fs';
import { join } from 'node:path';

const IMAGE_EXTENSIONS = ['webp', 'jpg', 'jpeg', 'png', 'svg'] as const;

/**
 * Restituisce il path pubblico (`/images/...`) del primo file trovato sotto `public/`
 * con basename `relativePath` (senza estensione). Utile per asset opzionali del cliente.
 */
export function resolvePublicImage(
  relativePathWithoutExt: string,
  fallback: string | null,
): string | null {
  const normalized = relativePathWithoutExt.replace(/^\/+/, '').replace(/\\/g, '/');
  const publicRoot = join(process.cwd(), 'public');

  for (const ext of IMAGE_EXTENSIONS) {
    const diskPath = join(publicRoot, `${normalized}.${ext}`);
    if (existsSync(diskPath)) {
      return `/${normalized}.${ext}`;
    }
  }

  return fallback;
}
