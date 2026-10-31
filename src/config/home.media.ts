import { getEditorial } from '@/cms/editorial';
import { resolvePublicImage } from '@/domain/media/resolvePublicImage';

const paths = getEditorial().homeMediaPaths;

/** Path sotto `public/` senza estensione — il primo file trovato (webp, jpg, …) viene usato in build. */
export const homeMediaPaths = paths;

export const homeMedia = {
  heroBanner: resolvePublicImage(paths.heroBanner, null),
  stripChiSiamo: resolvePublicImage(paths.stripChiSiamo, null),
  stripTerritorio: resolvePublicImage(paths.stripTerritorio, null),
  aboutPhoto: resolvePublicImage(paths.aboutPhoto, '/images/home/olive.jpg'),
  bannerDivider: resolvePublicImage(paths.bannerDivider, '/images/home/ulivi_1.jpg'),
};
