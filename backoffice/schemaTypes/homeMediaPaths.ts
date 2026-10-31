import { defineField, defineType } from 'sanity';

export const homeMediaPaths = defineType({
  name: 'homeMediaPaths',
  title: 'Path media home',
  type: 'document',
  fields: [
    defineField({
      name: 'paths',
      title: 'Path (senza estensione, sotto public/)',
      type: 'object',
      fields: [
        { name: 'heroBanner', type: 'string', title: 'Hero banner' },
        { name: 'stripChiSiamo', type: 'string' },
        { name: 'stripTerritorio', type: 'string' },
        { name: 'aboutPhoto', type: 'string' },
        { name: 'bannerDivider', type: 'string' },
      ],
    }),
  ],
});
