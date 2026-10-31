export type ChiSiamoSectionSeed = {
  id: string;
  eyebrow?: string;
  title: string;
  paragraphs: readonly string[];
  image?: { src: string; alt: string };
};

export const chiSiamoIntro = {
  title: 'Radici nel Gargano',
  lead: 'Produzione agricola artigianale a Carpino, tra oliveti e coltivazioni tipiche del territorio.',
} as const;

export const chiSiamoSections: ChiSiamoSectionSeed[] = [
  {
    id: 'approccio',
    eyebrow: 'Il nostro modo di lavorare',
    title: 'Approccio produttivo',
    paragraphs: [
      'Nelle informazioni pubbliche legate alla partecipazione a eventi sul territorio viene sottolineata una produzione sostenibile: olio biologico da cultivar autoctone, nel rispetto dei cicli naturali.',
      'Olive e legumi vengono curati privilegiando la qualità del frutto e la tracciabilità dalla coltivazione al confezionamento.',
    ],
    image: {
      src: '/images/home/ulivi_2.jpg',
      alt: 'Oliveto nel territorio del Gargano',
    },
  },
  {
    id: 'territorio',
    eyebrow: 'Carpino · Gargano',
    title: 'Territorio e prodotti',
    paragraphs: [
      'Carpino e il Gargano offrono un contesto unico per olio e legumi tipici, tra cui la fava di Carpino, parte del patrimonio enogastronomico citato nelle fonti disponibili.',
      'L’azienda propone olio extravergine biologico e specialità agricole che raccontano il legame con questa area.',
    ],
    image: {
      src: '/images/home/olive.jpg',
      alt: 'Olive su ulivo nel Gargano',
    },
  },
  {
    id: 'prodotti',
    title: 'Cosa trovi in catalogo',
    paragraphs: [
      'Olio EVO bio, legumi del territorio e condimenti a base di prodotti propri. Formati, prezzi e disponibilità sono indicati in scheda e possono essere aggiornati quando il listino ufficiale è completo.',
    ],
  },
  {
    id: 'trasparenza',
    title: 'Trasparenza',
    paragraphs: [
      'Testi, certificazioni e immagini definitive saranno aggiornati con materiali approvati dall’azienda. Non pubblichiamo claim non documentati.',
      'Per visite in azienda, ordini o approfondimenti commerciali, contattaci dalla pagina Contatti o componi una richiesta dal catalogo.',
    ],
  },
];

export const chiSiamoCta = {
  catalogLabel: 'Sfoglia il catalogo',
  contactLabel: 'Contattaci',
} as const;
