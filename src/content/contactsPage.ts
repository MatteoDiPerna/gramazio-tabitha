import { siteConfig } from '@/config/site.config';

/** Copy pagina contatti — recapiti da site.config.ts */
export const contactsPageIntro = {
  title: 'Siamo a Carpino, nel Gargano',
  body:
    `Per ordini, disponibilità e spedizioni puoi usare il catalogo e il riepilogo ordine online, ` +
    `oppure contattare direttamente ${siteConfig.contactPerson}. Rispondiamo il prima possibile in orario lavorativo.`,
  referentLabel: 'Referente',
  referentName: siteConfig.contactPerson,
  ordersHint: `Ordini via sito: <a href="/carrello">riepilogo ordine</a> · Email ordini: <a href="mailto:${siteConfig.ordersEmail}">${siteConfig.ordersEmail}</a>`,
} as const;
