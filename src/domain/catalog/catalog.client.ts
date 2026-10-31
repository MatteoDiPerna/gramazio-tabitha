import type { Product } from '@/domain/catalog/catalog.schema';
import bundleJson from '@/generated/cms/bundle.json';

/**
 * Catalogo per componenti React (islands). Stessi dati del bundle CMS,
 * senza Zod/fs nel browser.
 */
export const catalog: Product[] = (bundleJson as { catalog: Product[] }).catalog;
