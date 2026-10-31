import { defineField, defineType } from 'sanity';

function heroObject(name: string, title: string) {
  return {
    name,
    title,
    type: 'object',
    fields: [
      { name: 'title', type: 'string', title: 'Titolo' },
      { name: 'lead', type: 'string', title: 'Sottotitolo' },
      { name: 'image', type: 'string', title: 'Path immagine' },
    ],
  };
}

export const pageHeroes = defineType({
  name: 'pageHeroes',
  title: 'Banner pagine',
  type: 'document',
  fields: [
    defineField({
      name: 'heroes',
      title: 'Hero pagine',
      type: 'object',
      fields: [
        heroObject('catalogo', 'Catalogo'),
        heroObject('chiSiamo', 'Chi siamo'),
        heroObject('contatti', 'Contatti'),
        heroObject('faq', 'FAQ'),
        heroObject('carrello', 'Carrello'),
        heroObject('privacy', 'Privacy'),
        heroObject('cookie', 'Cookie'),
        heroObject('noteLegali', 'Note legali'),
      ],
    }),
  ],
});
