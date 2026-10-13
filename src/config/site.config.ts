/**
 * Configurazione centralizzata — aggiornare qui contatti e testi commerciali.
 * Non inserire segreti o credenziali.
 */
function resolvePublicSiteUrl(): string {
  if (typeof import.meta !== 'undefined' && import.meta.env?.SITE) {
    return String(import.meta.env.SITE).replace(/\/$/, '');
  }
  return 'https://example.com';
}

export const siteConfig = {
  name: 'Azienda Agricola Gramazio Tabitha',
  shortName: 'Gramazio Tabitha',
  description:
    'Olio extravergine biologico e prodotti agricoli da Carpino (FG), Gargano.',
  /** In produzione preferire SITE_URL in build; fallback manual per dev */
  url: resolvePublicSiteUrl(),

  address: {
    street: 'Via Matteotti, 54',
    city: 'Carpino',
    province: 'FG',
    postalCode: '71010',
    country: 'IT',
  },

  /** Email ordini e contatto — verificata su Cibovagare; confermare con l'azienda */
  email: 'francescocannarozzi@virgilio.it',
  ordersEmail: 'francescocannarozzi@virgilio.it',

  /** E.164 senza + — placeholder: confermare che sia WhatsApp (F08.01) */
  whatsappE164: '' as string,

  phoneDisplay: '+39 333 412 5391',
  phoneTel: '+393334125391',

  orderDisclaimer:
    'Inviando la richiesta d\'ordine dichiari di aver letto l\'informativa privacy. ' +
    'La richiesta non costituisce ordine confermato: l\'azienda ti ricontatterà per disponibilità, ' +
    'spedizione e pagamento.',

  /** Menu header: Prodotti · Azienda (sotto-menu) · Contatti */
  nav: [
    { kind: 'link', href: '/catalogo', label: 'Prodotti' },
    {
      kind: 'group',
      label: 'Azienda',
      menuId: 'nav-azienda',
      links: [
        { href: '/chi-siamo', label: 'Chi siamo' },
        { href: '/faq', label: 'Ordini e spedizioni' },
      ],
    },
    { kind: 'link', href: '/contatti', label: 'Contatti' },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

export type NavLinkItem = Extract<(typeof siteConfig.nav)[number], { kind: 'link' }>;
export type NavGroupItem = Extract<(typeof siteConfig.nav)[number], { kind: 'group' }>;

/** Voce attiva in base al pathname (catalogo include le schede prodotto). */
export function isNavHrefActive(href: string, pathname: string): boolean {
  if (href === '/catalogo') {
    return pathname.startsWith('/catalogo') || pathname.startsWith('/prodotti');
  }
  return pathname.startsWith(href);
}
