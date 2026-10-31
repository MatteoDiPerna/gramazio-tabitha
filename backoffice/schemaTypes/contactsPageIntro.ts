import { defineField, defineType } from 'sanity';

export const contactsPageIntro = defineType({
  name: 'contactsPageIntro',
  title: 'Pagina contatti (testi)',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Titolo intro' }),
    defineField({ name: 'body', type: 'text', title: 'Testo', rows: 4 }),
    defineField({ name: 'referentLabel', type: 'string', title: 'Etichetta referente' }),
    defineField({ name: 'referentName', type: 'string', title: 'Nome referente (fallback)' }),
    defineField({ name: 'ordersHint', type: 'text', title: 'Hint ordini (HTML)' }),
  ],
});
