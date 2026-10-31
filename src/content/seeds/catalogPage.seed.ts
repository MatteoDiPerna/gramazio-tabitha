import type { CatalogCategoryId } from '@/domain/catalog/catalogCategories';

export const catalogPageIntro = {
  all: {
    title: 'I nostri prodotti',
    body: 'Olio extravergine biologico, legumi tipici e condimenti dal Gargano. Sfoglia per categoria o apri la scheda per formati, prezzi e disponibilità.',
  },
  byCategory: {
    olio: {
      title: 'Olio extravergine biologico',
      body: 'EVO da cultivar del territorio, lavorato con attenzione alla qualità del frutto. I formati e i prezzi ufficiali saranno pubblicati appena confermati.',
    },
    legumi: {
      title: 'Legumi e specialità locali',
      body: 'Dalla fava di Carpino alle preparazioni dell’azienda: controlla disponibilità e formato in ogni scheda prima di inviare l’ordine.',
    },
    condimenti: {
      title: 'Condimenti e conserve',
      body: 'Preparazioni a base di prodotti agricoli propri. Per ingredienti e conservazione fai riferimento alle informazioni in scheda prodotto.',
    },
  } satisfies Record<CatalogCategoryId, { title: string; body: string }>,
} as const;
