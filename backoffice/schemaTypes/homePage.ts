import { defineField, defineType } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({ name: 'homeAbout', title: 'Sezione Chi siamo (home)', type: 'object', fields: aboutFields() }),
    defineField({ name: 'homeBannerDivider', title: 'Banner intermedio', type: 'object', fields: [{ name: 'title', type: 'string', title: 'Titolo' }] }),
    defineField({ name: 'homeServicesSection', title: 'Servizi', type: 'object', fields: servicesFields() }),
    defineField({ name: 'homeGallerySection', title: 'Galleria', type: 'object', fields: galleryFields() }),
    defineField({ name: 'homeOilFactsSection', title: 'Fatto olio EVO', type: 'object', fields: oilFactsFields() }),
    defineField({ name: 'homeQuoteDivider', title: 'Citazione', type: 'object', fields: [{ name: 'quote', type: 'text' }, { name: 'attribution', type: 'string' }] }),
    defineField({ name: 'homeReviewsSection', title: 'Recensioni', type: 'object', fields: reviewsFields() }),
  ],
});

function aboutFields() {
  return [
    { name: 'eyebrow', type: 'string', title: 'Occhiello' },
    { name: 'title', type: 'string', title: 'Titolo' },
    { name: 'paragraphs', type: 'array', of: [{ type: 'text' }], title: 'Paragrafi' },
    {
      name: 'highlights',
      type: 'array',
      of: [{ type: 'object', fields: [{ name: 'title', type: 'string' }, { name: 'text', type: 'text' }] }],
    },
  ];
}

function servicesFields() {
  return [
    { name: 'eyebrow', type: 'string' },
    { name: 'title', type: 'string' },
    {
      name: 'items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string' },
          { name: 'description', type: 'text' },
          { name: 'href', type: 'string' },
        ],
      }],
    },
  ];
}

function galleryFields() {
  return [
    { name: 'eyebrow', type: 'string' },
    { name: 'title', type: 'string' },
    {
      name: 'slides',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'src', type: 'string', title: 'Path immagine (/images/...)' },
          { name: 'caption', type: 'string' },
          { name: 'alt', type: 'string' },
        ],
      }],
    },
  ];
}

function oilFactsFields() {
  return [
    { name: 'eyebrow', type: 'string' },
    { name: 'title', type: 'string' },
    {
      name: 'steps',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'num', type: 'string' },
          { name: 'title', type: 'string' },
          { name: 'bodyHtml', type: 'text', title: 'Testo HTML' },
        ],
      }],
    },
  ];
}

function reviewsFields() {
  return [
    { name: 'eyebrow', type: 'string' },
    { name: 'title', type: 'string' },
    { name: 'disclaimer', type: 'text' },
    {
      name: 'items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', type: 'string' },
          { name: 'place', type: 'string' },
          { name: 'text', type: 'text' },
          { name: 'rating', type: 'number' },
        ],
      }],
    },
  ];
}
