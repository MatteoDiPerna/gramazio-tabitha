import { rawCatalog } from '@/domain/catalog/products.data';
import { siteFields } from '@/config/site.fields';
import { resolvePublicImage } from '@/domain/media/resolvePublicImage';
import * as home from '@/content/seeds/homePage.seed';
import * as chi from '@/content/seeds/chiSiamo.seed';
import * as faq from '@/content/seeds/faq.seed';
import { catalogPageIntro } from '@/content/seeds/catalogPage.seed';
import { contactsPageIntro } from '@/content/seeds/contactsPage.seed';
import { homeMediaPaths } from '@/content/seeds/homeMedia.seed';
import type { CmsBundle } from '@/cms/types';

const LEGAL = {
  privacy: {
    noticeHtml:
      '<strong>Bozza tecnica.</strong> Testo da sostituire con informativa redatta dal titolare del trattamento e/o professionista qualificato (GDPR).',
    bodyHtml: `<p>Attraverso questo sito puoi contattare l'azienda e inviare richieste d'ordine. I dati che inserisci volontariamente (nome, telefono, note, indirizzo) servono a comporre il messaggio d'ordine e a gestire la richiesta commerciale.</p>
<p>Per esercitare i diritti previsti dal Regolamento UE 2016/679 o per chiarimenti, usa i contatti nella pagina <a href="/contatti">Contatti</a>.</p>`,
    lastReviewedAt: null,
  },
  cookie: {
    noticeHtml:
      '<strong>Bozza tecnica.</strong> Aggiornare se verranno introdotti strumenti di analitica o embed di terze parti.',
    bodyHtml: `<p>In questa fase il sito utilizza prevalentemente cookie tecnici necessari al funzionamento (ad esempio preferenze locali del carrello in memoria del browser). Non utilizziamo cookie di profilazione senza consenso esplicito.</p>`,
    lastReviewedAt: null,
  },
  noteLegali: {
    noticeHtml:
      '<strong>Testi legali.</strong> Privacy e cookie restano bozze tecniche da revisione professionale; i dati anagrafici sotto sono quelli comunicati per il sito.',
    bodyHtml: `<h2>Prezzi e ordini</h2>
<p>I prezzi indicati sul sito, quando presenti, hanno valore <strong>indicativo</strong> fino a conferma scritta dell'ordine da parte dell'azienda. L'invio di una richiesta d'ordine non costituisce contratto di vendita.</p>
<p>Per l'informativa sul trattamento dei dati personali vedi la pagina <a href="/privacy">Privacy</a>.</p>`,
    lastReviewedAt: null,
  },
} as const;

function buildStaticPageHeroes() {
  const heroBanner = resolvePublicImage(homeMediaPaths.heroBanner, null) ?? '/images/home/hero-banner.png';
  const bannerDivider = resolvePublicImage(homeMediaPaths.bannerDivider, '/images/home/ulivi_1.jpg');
  const aboutPhoto = resolvePublicImage(homeMediaPaths.aboutPhoto, '/images/home/olive.jpg');
  return {
    catalogo: {
      title: 'Catalogo',
      lead: 'Scopri olio bio e specialità del Gargano',
      image: bannerDivider ?? heroBanner,
    },
    chiSiamo: {
      title: 'Chi siamo',
      lead: 'Tradizione agricola e territorio a Carpino',
      image: aboutPhoto ?? '/images/home/olive.jpg',
    },
    contatti: {
      title: 'Contatti',
      lead: 'Parla con noi per ordini e informazioni',
      image: heroBanner,
    },
    faq: {
      title: 'Ordini e spedizioni',
      lead: 'Risposte rapide sulle domande più frequenti',
      image: '/images/home/ulivi_2.jpg',
    },
    carrello: {
      title: 'Riepilogo ordine',
      lead: 'Invia la richiesta — nessuna registrazione',
      image: '/images/home/ulivi_3.jpg',
    },
    privacy: {
      title: 'Informativa privacy',
      lead: 'Trattamento dei dati personali',
      image: heroBanner,
    },
    cookie: {
      title: 'Cookie',
      lead: 'Uso dei cookie su questo sito',
      image: heroBanner,
    },
    noteLegali: {
      title: 'Note legali',
      lead: 'Informazioni legali sul sito',
      image: heroBanner,
    },
  };
}

/** Bundle equivalente ai sorgenti seed (bootstrap senza Sanity). */
export function buildLegacyBundle(): CmsBundle {
  return {
    version: 1,
    syncedAt: null,
    source: 'repo-snapshot',
    catalog: rawCatalog as CmsBundle['catalog'],
    site: {
      name: siteFields.name,
      shortName: siteFields.shortName,
      description: siteFields.description,
      address: { ...siteFields.address },
      email: siteFields.email,
      ordersEmail: siteFields.ordersEmail,
      whatsappE164: siteFields.whatsappE164,
      legal: { ...siteFields.legal },
      contactPerson: siteFields.contactPerson,
      phoneDisplay: siteFields.phoneDisplay,
      phoneTel: siteFields.phoneTel,
      orderDisclaimer: siteFields.orderDisclaimer,
      nav: JSON.parse(JSON.stringify(siteFields.nav)),
      footerInfoLinks: [...siteFields.footerInfoLinks],
    },
    editorial: {
      homeAbout: home.homeAbout,
      homeBannerDivider: home.homeBannerDivider,
      homeServicesSection: home.homeServicesSection,
      homeGallerySection: home.homeGallerySection,
      homeOilFactsSection: home.homeOilFactsSection,
      homeQuoteDivider: home.homeQuoteDivider,
      homeReviewsSection: home.homeReviewsSection,
      chiSiamoIntro: chi.chiSiamoIntro,
      chiSiamoSections: [...chi.chiSiamoSections],
      chiSiamoCta: chi.chiSiamoCta,
      catalogPageIntro,
      contactsPageIntro,
      faqIntro: faq.faqIntro,
      faqItems: [...faq.faqItems],
      homeMediaPaths: { ...homeMediaPaths },
      staticPageHeroes: buildStaticPageHeroes(),
      legal: LEGAL,
    },
  };
}
