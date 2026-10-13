import { resolvePublicImage } from '@/domain/media/resolvePublicImage';

/** Path sotto `public/` senza estensione — il primo file trovato (webp, jpg, …) viene usato in build. */
export const homeMediaPaths = {
  heroBanner: 'images/home/hero-banner',
  stripChiSiamo: 'images/home/strip-chi-siamo',
  stripTerritorio: 'images/home/strip-territorio',
  aboutPhoto: 'images/home/olive',
  bannerDivider: 'images/home/ulivi_1',
} as const;

export const homeMedia = {
  heroBanner: resolvePublicImage(homeMediaPaths.heroBanner, null),
  stripChiSiamo: resolvePublicImage(homeMediaPaths.stripChiSiamo, null),
  stripTerritorio: resolvePublicImage(homeMediaPaths.stripTerritorio, null),
  aboutPhoto: resolvePublicImage(homeMediaPaths.aboutPhoto, '/images/home/olive.jpg'),
  bannerDivider: resolvePublicImage(homeMediaPaths.bannerDivider, '/images/home/ulivi_1.jpg'),
};
