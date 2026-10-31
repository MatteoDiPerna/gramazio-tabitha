import { getEditorial } from '@/cms/editorial';

const e = getEditorial();

export const homeAbout = e.homeAbout as typeof e.homeAbout & {
  eyebrow: string;
  title: string;
  paragraphs: readonly string[];
  highlights: readonly { title: string; text: string }[];
};

export const homeBannerDivider = e.homeBannerDivider as { title: string };
export const homeServicesSection = e.homeServicesSection as typeof e.homeServicesSection;
export const homeGallerySection = e.homeGallerySection as typeof e.homeGallerySection;
export const homeOilFactsSection = e.homeOilFactsSection as typeof e.homeOilFactsSection;
export const homeQuoteDivider = e.homeQuoteDivider as { quote: string; attribution: string };
export const homeReviewsSection = e.homeReviewsSection as typeof e.homeReviewsSection;
