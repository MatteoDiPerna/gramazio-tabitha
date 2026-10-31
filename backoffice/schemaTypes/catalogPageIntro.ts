import { defineField, defineType } from 'sanity';

export const catalogPageIntro = defineType({
  name: 'catalogPageIntro',
  title: 'Intro catalogo',
  type: 'document',
  fields: [
    defineField({
      name: 'intro',
      title: 'Testi intro',
      type: 'object',
      fields: [
        {
          name: 'all',
          type: 'object',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'body', type: 'text' },
          ],
        },
        {
          name: 'byCategory',
          type: 'object',
          fields: [
            { name: 'olio', type: 'object', fields: [{ name: 'title', type: 'string' }, { name: 'body', type: 'text' }] },
            { name: 'legumi', type: 'object', fields: [{ name: 'title', type: 'string' }, { name: 'body', type: 'text' }] },
            { name: 'condimenti', type: 'object', fields: [{ name: 'title', type: 'string' }, { name: 'body', type: 'text' }] },
          ],
        },
      ],
    }),
  ],
});
