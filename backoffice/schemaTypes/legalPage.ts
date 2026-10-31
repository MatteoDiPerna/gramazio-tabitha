import { defineField, defineType } from 'sanity';

export const legalPage = defineType({
  name: 'legalPage',
  title: 'Pagina legale',
  type: 'document',
  fields: [
    defineField({
      name: 'pageId',
      title: 'Pagina',
      type: 'string',
      options: {
        list: [
          { title: 'Privacy', value: 'privacy' },
          { title: 'Cookie', value: 'cookie' },
          { title: 'Note legali', value: 'note-legali' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'noticeHtml',
      title: 'Avviso (HTML)',
      description: 'Banner giallo — revisione legale consigliata',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'bodyHtml',
      title: 'Corpo pagina (HTML)',
      type: 'text',
      rows: 12,
    }),
    defineField({
      name: 'lastReviewedAt',
      title: 'Data ultima revisione',
      type: 'date',
    }),
  ],
});
