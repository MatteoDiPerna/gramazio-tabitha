import { defineField, defineType } from 'sanity';

export const faqPage = defineType({
  name: 'faqPage',
  title: 'FAQ ordini e spedizioni',
  type: 'document',
  fields: [
    defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 2 }),
    defineField({
      name: 'items',
      title: 'Domande',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'string', title: 'ID anchor (slug)' },
            { name: 'question', type: 'string', title: 'Domanda' },
            { name: 'answerHtml', type: 'text', title: 'Risposta (HTML limitato)', rows: 4 },
          ],
        },
      ],
    }),
  ],
});
