import { homeMedia } from '@/config/home.media';

const heroBanner = homeMedia.heroBanner ?? '/images/home/hero-banner.png';

/** Immagini banner per pagina — path sotto `public/`. */
export const pageHeroImages = {
  default: heroBanner,
  catalogo: homeMedia.bannerDivider ?? heroBanner,
  chiSiamo: homeMedia.aboutPhoto ?? '/images/home/olive.jpg',
  contatti: heroBanner,
  faq: '/images/home/ulivi_2.jpg',
  carrello: '/images/home/ulivi_3.jpg',
  legal: heroBanner,
} as const;

/** Titolo e sottotitolo breve (banner centrato) per pagine statiche. */
export const staticPageHeroes = {
  catalogo: {
    title: 'Catalogo',
    lead: 'Scopri olio bio e specialità del Gargano',
    image: pageHeroImages.catalogo,
  },
  chiSiamo: {
    title: 'Chi siamo',
    lead: 'Tradizione agricola e territorio a Carpino',
    image: pageHeroImages.chiSiamo,
  },
  contatti: {
    title: 'Contatti',
    lead: 'Parla con noi per ordini e informazioni',
    image: pageHeroImages.contatti,
  },
  faq: {
    title: 'Ordini e spedizioni',
    lead: 'Risposte rapide sulle domande più frequenti',
    image: pageHeroImages.faq,
  },
  carrello: {
    title: 'Riepilogo ordine',
    lead: 'Invia la richiesta — nessuna registrazione',
    image: pageHeroImages.carrello,
  },
  privacy: {
    title: 'Informativa privacy',
    lead: 'Trattamento dei dati personali',
    image: pageHeroImages.legal,
  },
  cookie: {
    title: 'Cookie',
    lead: 'Uso dei cookie su questo sito',
    image: pageHeroImages.legal,
  },
  noteLegali: {
    title: 'Note legali',
    lead: 'Informazioni legali sul sito',
    image: pageHeroImages.legal,
  },
} as const;

export type StaticPageHeroId = keyof typeof staticPageHeroes;
