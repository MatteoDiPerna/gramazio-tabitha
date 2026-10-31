import { getEditorial } from '@/cms/editorial';
import type { CatalogCategoryId } from '@/domain/catalog/catalogCategories';

const e = getEditorial();

export const catalogPageIntro = e.catalogPageIntro as {
  all: { title: string; body: string };
  byCategory: Record<CatalogCategoryId, { title: string; body: string }>;
};
