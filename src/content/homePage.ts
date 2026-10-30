/** Copy e dati strutturati per le sezioni della homepage. */

export const homeAbout = {
  eyebrow: 'Carpino · Gargano · FG',
  title: 'Azienda Agricola Gramazio Tabitha',
  paragraphs: [
    'Produzione agricola artigianale nel cuore del Gargano: olio extravergine biologico e specialità del territorio, dalla fava di Carpino alle conserve di stagione.',
    'Le olive e i legumi vengono curati rispettando i ritmi naturali, con attenzione alla qualità del frutto e alla tracciabilità della filiera.',
    'Gli oli dell’azienda sono ottenuti da cultivar del territorio, con lavorazioni che privilegiano la spremitura a freddo e la conservazione corretta del prodotto finito.',
  ],
  highlights: [
    {
      title: 'Olio extravergine biologico',
      text: 'Estrazione a freddo e origine controllata dal campo alla bottiglia.',
    },
    {
      title: 'Temperatura di lavorazione',
      text: 'Processi meccanici che non superano i 27 °C, come per un vero EVO di qualità.',
    },
  ],
} as const;

export const homeBannerDivider = {
  title: 'Il nostro olio extravergine biologico',
} as const;

export const homeServicesSection = {
  eyebrow: 'Cosa facciamo',
  title: 'I servizi dell’azienda',
  items: [
    {
      title: 'Vendita olio EVO bio',
      description:
        'Olio extravergine biologico di produzione propria, ottenuto da olive selezionate e spremute a freddo, disponibile nei formati indicati in catalogo.',
      href: '/catalogo?categoria=olio',
    },
    {
      title: 'Legumi e specialità locali',
      description:
        'Fava di Carpino, conserve e prodotti agricoli del Gargano, con stagionalità e disponibilità da confermare al momento dell’ordine.',
      href: '/catalogo?categoria=legumi',
    },
    {
      title: 'Ordini diretti con l’azienda',
      description:
        'Componi il carrello sul sito e invia la richiesta via email o telefono: ti ricontattiamo per disponibilità, spedizione e pagamento.',
      href: '/carrello',
    },
  ],
} as const;

export const homeGallerySection = {
  eyebrow: 'Alcune foto dell’azienda',
  title: 'Il territorio',
  slides: [
    {
      src: '/images/home/ulivi_2.jpg',
      caption: 'Gli oliveti',
      alt: 'Oliveto nel territorio del Gargano',
    },
    {
      src: '/images/home/ulivi_3.jpg',
      caption: 'Cura del frutto',
      alt: 'Ulivi e paesaggio agricolo',
    },
    {
      src: '/images/home/olive.jpg',
      caption: 'Le olive',
      alt: 'Olive su ulivo nel Gargano',
    },
    {
      src: '/images/home/fiera_2.jpg',
      caption: 'In fiera',
      alt: 'Stand dell’azienda in fiera',
    },
  ],
} as const;

export const homeOilFactsSection = {
  eyebrow: 'Informazioni, caratteristiche',
  title: 'L’olio extravergine di oliva',
  steps: [
    {
      num: '01',
      title: 'Il prodotto di qualità',
      bodyHtml:
        'La spremitura a freddo aiuta a preservare aroma, polifenoli e qualità organolettiche. ' +
        '<strong>Un buon EVO si riconosce al profumo di oliva fresca, al gusto equilibrato e a un’acidità libera contenuta.</strong>',
    },
    {
      num: '02',
      title: 'Riconoscere l’extravergine',
      bodyHtml:
        'In etichetta cercare diciture come «extravergine» e, quando applicabile, «estratto a freddo» o «biologico». ' +
        'Significa olio ottenuto solo da olive, con estrazione meccanica e senza riscaldamenti eccessivi in lavorazione.',
    },
    {
      num: '03',
      title: 'Dal frutto al prodotto',
      bodyHtml:
        'Dalla raccolta al confezionamento passano lavaggio, molitura, estrazione e separazione dell’olio. ' +
        'Ogni fase incide su profumo, colore e shelf life del prodotto finito.',
    },
    {
      num: '04',
      title: 'Conservazione',
      bodyHtml:
        'Tenere l’olio al riparo da luce e calore, preferibilmente in bottiglia scura e luogo fresco. ' +
        'Consumarlo entro i termini indicati in etichetta per gustarlo al meglio.',
    },
  ],
} as const;

export const homeQuoteDivider = {
  quote: '… e su gli olivi, su i fratelli olivi che fan di santità pallidi i clivi…',
  attribution: 'Gabriele d’Annunzio — La sera fiesolana',
} as const;

export const homeReviewsSection = {
  eyebrow: 'Testimonianze',
  title: 'Dicono di noi',
  /** Placeholder finché non arrivano recensioni verificabili dal cliente */
  disclaimer:
    'Esempi di feedback tipico: sostituire con recensioni reali o rimuovere la sezione dopo approvazione.',
  items: [
    {
      name: 'Marco R.',
      place: 'Foggia',
      text: 'Olio profumato e genuino: si sente il territorio. Ordine semplice e risposta rapida dell’azienda.',
      rating: 5,
    },
    {
      name: 'Giulia P.',
      place: 'Bari',
      text: 'Abbiamo provato anche la fava di Carpino: qualità eccellente. Consigliatissimi per chi cerca prodotti locali.',
      rating: 5,
    },
    {
      name: 'Antonio L.',
      place: 'Roma',
      text: 'Spedizione puntuale e imballo curato. L’EVO bio è diventato il nostro olio quotidiano in cucina.',
      rating: 5,
    },
  ],
} as const;
