import { defineField, defineType } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Chi siamo',
  type: 'document',
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Titolo' },
        { name: 'lead', type: 'text', title: 'Sottotitolo' },
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Sezioni',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'string', title: 'ID anchor' },
            { name: 'eyebrow', type: 'string' },
            { name: 'title', type: 'string' },
            { name: 'paragraphs', type: 'array', of: [{ type: 'text' }] },
            {
              name: 'image',
              type: 'object',
              fields: [
                { name: 'src', type: 'string' },
                { name: 'alt', type: 'string' },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'object',
      fields: [
        { name: 'catalogLabel', type: 'string' },
        { name: 'contactLabel', type: 'string' },
      ],
    }),
  ],
});
