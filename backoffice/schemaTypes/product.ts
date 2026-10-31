import { defineField, defineType } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Prodotto',
  type: 'document',
  fields: [
    defineField({
      name: 'productId',
      title: 'ID interno (stabile)',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'name', title: 'Nome', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'shortDescription',
      title: 'Descrizione breve',
      type: 'text',
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({ name: 'description', title: 'Descrizione lunga', type: 'text', rows: 5 }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Olio', value: 'olio' },
          { title: 'Legumi', value: 'legumi' },
          { title: 'Condimenti', value: 'condimenti' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Immagine principale',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Testo alternativo', type: 'string', validation: (r) => r.required() }],
    }),
    defineField({
      name: 'variants',
      title: 'Formati e prezzi',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'variant',
          fields: [
            { name: 'id', title: 'ID variante', type: 'string', validation: (r) => r.required() },
            { name: 'label', title: 'Etichetta', type: 'string', validation: (r) => r.required() },
            {
              name: 'priceCents',
              title: 'Prezzo (centesimi EUR)',
              description: 'Lascia vuoto per «Prezzo su richiesta»',
              type: 'number',
            },
            { name: 'unit', title: 'Unità (es. ml)', type: 'string' },
            { name: 'unitAmount', title: 'Quantità unità', type: 'number' },
          ],
          preview: {
            select: { title: 'label', subtitle: 'priceCents' },
          },
        },
      ],
      validation: (r) => r.min(1),
    }),
    defineField({ name: 'published', title: 'Pubblicato sul sito', type: 'boolean', initialValue: true }),
    defineField({
      name: 'available',
      title: 'Ordinabile',
      description: 'Se disattivo, scheda visibile ma non aggiungibile al carrello',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'badges',
      title: 'Badge',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Bio', value: 'bio' },
          { title: 'Slow Food', value: 'slow-food' },
        ],
      },
    }),
    defineField({ name: 'seasonalNote', title: 'Nota stagionalità', type: 'text', rows: 2 }),
    defineField({
      name: 'productInfo',
      title: 'Informazioni prodotto',
      type: 'object',
      fields: [
        { name: 'ingredients', title: 'Ingredienti', type: 'text', rows: 2 },
        { name: 'storage', title: 'Conservazione', type: 'text', rows: 2 },
        { name: 'allergens', title: 'Allergeni', type: 'text', rows: 2 },
      ],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'image' },
  },
});
