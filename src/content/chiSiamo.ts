import { getEditorial } from '@/cms/editorial';
import type { ChiSiamoSectionSnapshot } from '@/cms/types';

const e = getEditorial();

export type ChiSiamoSection = ChiSiamoSectionSnapshot;

export const chiSiamoIntro = e.chiSiamoIntro as { title: string; lead: string };
export const chiSiamoSections: ChiSiamoSection[] = e.chiSiamoSections;
export const chiSiamoCta = e.chiSiamoCta as { catalogLabel: string; contactLabel: string };
