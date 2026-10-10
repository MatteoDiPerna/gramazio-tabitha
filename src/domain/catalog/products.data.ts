/** Dati prodotti — allineare a docs/listino.md. Immagini: public/images/. */
export const rawCatalog = [
  {
    id: 'olio-evo-bio',
    slug: 'olio-extravergine-biologico',
    name: 'Olio extravergine di oliva biologico',
    shortDescription:
      'Olio EVO biologico da cultivar autoctone, nel rispetto dei cicli naturali.',
    description:
      'Olio extravergine biologico da cultivar autoctone. Listino prodotti v1 confermato — vedi docs/listino.md.',
    category: 'olio' as const,
    image: {
      src: '/images/placeholder-product.svg',
      alt: 'Lattina di olio extravergine di oliva biologico Nine',
    },
    variants: [{ id: 'standard', label: 'Formato da concordare', priceCents: null }],
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
      src: '/images/placeholder-product.svg',
      alt: 'Confezione di Fava di Carpino Presidio Slow Food',
    },
    variants: [{ id: 'standard', label: 'Formato da concordare', priceCents: null }],
    published: true,
    available: true,
    badges: ['slow-food'] as const,
  },
  {
    id: 'la-favetta',
    slug: 'la-favetta',
    name: 'La Favetta',
    shortDescription: "Prodotto dell'azienda agricola — listino v1.",
    category: 'legumi' as const,
    image: {
      src: '/images/placeholder-product.svg',
      alt: 'Confezione La Favetta, fave spezzate di Carpino',
    },
    variants: [{ id: 'standard', label: 'Formato da concordare', priceCents: null }],
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
      src: '/images/placeholder-product.svg',
      alt: 'Vaso di patè di fave con Fava di Carpino',
    },
    variants: [{ id: 'standard', label: 'Formato da concordare', priceCents: null }],
    published: true,
    available: true,
  },
];
