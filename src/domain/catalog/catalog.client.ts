import type { Product } from '@/domain/catalog/catalog.schema';
import { rawCatalog } from '@/domain/catalog/products.data';

/**
 * Catalogo per componenti React (islands). Stessi dati di `catalog` in index.ts,
 * validati lì con Zod — senza importare Zod nel browser (evita errori Vite optimizeDeps).
 */
export const catalog: Product[] = rawCatalog as Product[];
