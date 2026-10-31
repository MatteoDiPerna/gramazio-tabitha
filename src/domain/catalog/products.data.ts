/**
 * Dati prodotti — allineare a docs/listino.md.
 * Immagini: public/images/products/{slug}.jpg (o .webp).
 * Prezzi indicativi listino v1 (IVA incl. quando confermato dall'azienda).
 */
export const rawCatalog = [
  {
    id: 'olio-evo-bio',
    slug: 'olio-extravergine-biologico',
    name: 'Olio extravergine di oliva biologico',
    shortDescription:
      'Olio EVO biologico da cultivar autoctone, nel rispetto dei cicli naturali.',
    description:
      'Olio extravergine biologico da cultivar autoctone. Listino prodotti v1 confermato — vedi docs/listino.md.',
    productInfo: {
      storage:
        'Conservare al riparo da luce e fonti di calore, in contenitore ben chiuso. Consumare preferibilmente entro i termini indicati in etichetta.',
    },
    category: 'olio' as const,
    image: {
      src: '/images/products/olio-extravergine-biologico.jpg',
      alt: 'Lattina di olio extravergine di oliva biologico Nine',
    },
    variants: [
      {
        id: '500ml',
        label: '500 ml',
        priceCents: 1290,
        unit: 'ml',
        unitAmount: 500,
      },
      {
        id: '750ml',
        label: '750 ml',
        priceCents: 1790,
        unit: 'ml',
        unitAmount: 750,
      },
    ],
    published: true,
    available: true,
    badges: ['bio'] as const,
  },
  {
    id: 'fava-carpino',
    slug: 'fava-di-carpino',
    name: 'Fava di Carpino',
    shortDescription: 'Legume del territorio, citato in relazione al patrimonio Slow Food.',
    category: 'legumi' as const,
    image: {
      src: '/images/products/fava-di-carpino.jpg',
      alt: 'Confezione di Fava di Carpino Presidio Slow Food',
    },
    variants: [{ id: 'standard', label: 'Confezione da concordare', priceCents: 850 }],
    published: true,
    available: true,
    badges: ['slow-food'] as const,
    seasonalNote:
      'Disponibilità legata alla campagna agricola — confermata al momento dell’ordine.',
  },
  {
    id: 'la-favetta',
    slug: 'la-favetta',
    name: 'La Favetta',
    shortDescription: "Prodotto dell'azienda agricola — listino v1.",
    category: 'legumi' as const,
    image: {
      src: '/images/products/la-favetta.jpg',
      alt: 'Confezione La Favetta, fave spezzate di Carpino',
    },
    variants: [{ id: 'standard', label: 'Confezione da concordare', priceCents: 750 }],
    published: true,
    available: true,
  },
  {
    id: 'pate-fave',
    slug: 'pate-di-fave',
    name: 'Patè di fave',
    shortDescription: 'Condimento a base di fave — scheda commerciale da completare.',
    category: 'condimenti' as const,
    image: {
      src: '/images/products/pate-di-fave.jpg',
      alt: 'Vaso di patè di fave con Fava di Carpino',
    },
    variants: [{ id: 'standard', label: 'Vaso da concordare', priceCents: 690 }],
    published: true,
    available: true,
  },
];
