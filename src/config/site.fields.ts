/**
 * Valori sito serializzabili (seed / migrazione CMS). L'URL pubblico resta da env in site.config.ts.
 */
export const siteFields = {
  name: 'Azienda Agricola Gramazio Tabitha',
  shortName: 'Gramazio Tabitha',
  description:
    'Olio extravergine biologico e prodotti agricoli da Carpino (FG), Gargano.',
  address: {
    street: 'Via Matteotti, 54',
    city: 'Carpino',
    province: 'FG',
    postalCode: '71010',
    country: 'IT',
  },
  email: 'francescocannarozzi@virgilio.it',
  ordersEmail: 'francescocannarozzi@virgilio.it',
  whatsappE164: '393299147756',
  legal: {
    businessName: 'Gramazio Tabitha',
    vatNumber: '04192910711',
    pec: 'tabithagramazio@pec.it',
    ateco: '01.26 — Coltivazione di frutti oleosi',
  },
  contactPerson: 'Francesco Cannarozzi',
  phoneDisplay: '+39 333 412 5391',
  phoneTel: '+393334125391',
  orderDisclaimer:
    "Inviando la richiesta d'ordine dichiari di aver letto l'informativa privacy. " +
    "La richiesta non costituisce ordine confermato: l'azienda ti ricontatterà per disponibilità, " +
    'spedizione e pagamento.',
  nav: [
    { kind: 'link' as const, href: '/catalogo', label: 'Prodotti' },
    {
      kind: 'group' as const,
      label: 'Azienda',
      menuId: 'nav-azienda',
      links: [
        { href: '/chi-siamo', label: 'Chi siamo' },
        { href: '/faq', label: 'Ordini e spedizioni' },
      ],
    },
    { kind: 'link' as const, href: '/contatti', label: 'Contatti' },
  ],
  footerInfoLinks: [
    { href: '/faq', label: 'Ordini e spedizioni' },
    { href: '/privacy', label: 'Privacy' },
    { href: '/cookie', label: 'Cookie' },
    { href: '/note-legali', label: 'Note legali' },
  ],
};
