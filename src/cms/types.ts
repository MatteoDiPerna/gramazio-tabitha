import type { Product } from '@/domain/catalog/catalog.schema';

/** Snapshot CMS consumato dal sito (generato da sync o snapshot repo). */
export type CmsSiteSnapshot = {
  name: string;
  shortName: string;
  description: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  email: string;
  ordersEmail: string;
  whatsappE164: string;
  legal: {
    businessName: string;
    vatNumber: string;
    pec: string;
    ateco: string;
  };
  contactPerson: string;
  phoneDisplay: string;
  phoneTel: string;
  orderDisclaimer: string;
  nav: Array<
    | { kind: 'link'; href: string; label: string }
    | {
        kind: 'group';
        label: string;
        menuId: string;
        links: Array<{ href: string; label: string }>;
      }
  >;
  footerInfoLinks: Array<{ href: string; label: string }>;
};

export type FaqItemSnapshot = {
  id: string;
  question: string;
  answerHtml: string;
};

export type ChiSiamoSectionSnapshot = {
  id: string;
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  image?: { src: string; alt: string };
};

export type CmsEditorialSnapshot = {
  homeAbout: Record<string, unknown>;
  homeBannerDivider: Record<string, unknown>;
  homeServicesSection: Record<string, unknown>;
  homeGallerySection: Record<string, unknown>;
  homeOilFactsSection: Record<string, unknown>;
  homeQuoteDivider: Record<string, unknown>;
  homeReviewsSection: Record<string, unknown>;
  chiSiamoIntro: Record<string, unknown>;
  chiSiamoSections: ChiSiamoSectionSnapshot[];
  chiSiamoCta: Record<string, unknown>;
  catalogPageIntro: Record<string, unknown>;
  contactsPageIntro: Record<string, unknown>;
  faqIntro: string;
  faqItems: FaqItemSnapshot[];
  homeMediaPaths: Record<string, string>;
  staticPageHeroes: Record<string, { title: string; lead: string; image: string }>;
  legal: {
    privacy: { noticeHtml: string; bodyHtml: string; lastReviewedAt: string | null };
    cookie: { noticeHtml: string; bodyHtml: string; lastReviewedAt: string | null };
    noteLegali: { noticeHtml: string; bodyHtml: string; lastReviewedAt: string | null };
  };
};

export type CmsCatalogSnapshot = Product[];

export type CmsBundle = {
  version: 1;
  syncedAt: string | null;
  source: 'repo-snapshot' | 'sanity';
  catalog: CmsCatalogSnapshot;
  site: CmsSiteSnapshot;
  editorial: CmsEditorialSnapshot;
};
