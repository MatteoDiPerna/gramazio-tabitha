import { getEditorial } from '@/cms/editorial';
import { siteConfig } from '@/config/site.config';

const base = getEditorial().contactsPageIntro as {
  title: string;
  body: string;
  referentLabel: string;
  referentName: string;
  ordersHint: string;
};

/** Copy pagina contatti — recapiti ordini aggiornati da site.config (CMS). */
export const contactsPageIntro = {
  ...base,
  referentName: siteConfig.contactPerson,
  ordersHint: `Ordini via sito: <a href="/carrello">riepilogo ordine</a> · Email ordini: <a href="mailto:${siteConfig.ordersEmail}">${siteConfig.ordersEmail}</a>`,
} as const;
