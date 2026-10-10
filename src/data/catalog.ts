import { catalogSchema, type Product } from './catalog.schema';

/** Placeholder immagini — sostituire con foto reali (F01.02). */
const rawCatalog = [
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
      alt: 'Placeholder confezione olio extravergine biologico',
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
      alt: 'Placeholder fava di Carpino',
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
    shortDescription: 'Prodotto dell\'azienda agricola — listino v1.',
    category: 'legumi' as const,
    image: {
      src: '/images/placeholder-product.svg',
      alt: 'Placeholder La Favetta',
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
      alt: 'Placeholder patè di fave',
    },
    variants: [{ id: 'standard', label: 'Formato da concordare', priceCents: null }],
    published: true,
    available: true,
  },
];

export const catalog: Product[] = catalogSchema.parse(rawCatalog);

export function getPublishedProducts(): Product[] {
  return catalog.filter((p) => p.published);
}

export function getProductBySlug(slug: string): Product | undefined {
  return catalog.find((p) => p.slug === slug && p.published);
}

export function getProductById(id: string): Product | undefined {
  return catalog.find((p) => p.id === id);
}
