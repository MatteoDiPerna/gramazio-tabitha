import { getEditorial } from '@/cms/editorial';
import type { FaqItemSnapshot } from '@/cms/types';

export type FaqItem = FaqItemSnapshot;

const e = getEditorial();

export const faqIntro = e.faqIntro;
export const faqItems: FaqItem[] = e.faqItems;
