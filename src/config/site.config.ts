/**
 * Configurazione centralizzata — aggiornare qui contatti e testi commerciali.
 * Non inserire segreti o credenziali.
 */
export const siteConfig = {
  name: 'Azienda Agricola Gramazio Tabitha',
  shortName: 'Gramazio Tabitha',
  description:
    'Olio extravergine biologico e prodotti agricoli da Carpino (FG), Gargano.',
  url: 'https://example.com', // TODO: dominio produzione (F14)

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
} as const;

export type SiteConfig = typeof siteConfig;
