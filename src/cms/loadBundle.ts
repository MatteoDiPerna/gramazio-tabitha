import { catalogSchema } from '@/domain/catalog/catalog.schema';
import bundleJson from '@/generated/cms/bundle.json';
import type { CmsBundle } from '@/cms/types';

const bundle = bundleJson as CmsBundle;
catalogSchema.parse(bundle.catalog);

/** Bundle CMS validato (Zod catalogo). Generato da cms:snapshot / cms:sync. */
export function getCmsBundle(): CmsBundle {
  return bundle;
}

export function resetCmsBundleCache(): void {
  /* bundle statico importato a build — cache non necessaria */
}
