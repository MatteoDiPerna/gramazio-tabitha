import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Impostazioni sito',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nome azienda', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'shortName', title: 'Nome breve', type: 'string' }),
    defineField({ name: 'description', title: 'Descrizione SEO', type: 'text', rows: 2 }),
    defineField({
      name: 'address',
      title: 'Indirizzo',
      type: 'object',
      fields: [
        { name: 'street', type: 'string', title: 'Via' },
        { name: 'city', type: 'string', title: 'Città' },
        { name: 'province', type: 'string', title: 'Provincia' },
        { name: 'postalCode', type: 'string', title: 'CAP' },
        { name: 'country', type: 'string', title: 'Paese' },
      ],
    }),
    defineField({ name: 'email', title: 'Email contatto', type: 'string' }),
    defineField({ name: 'ordersEmail', title: 'Email ordini', type: 'string' }),
    defineField({
      name: 'whatsappE164',
      title: 'WhatsApp (E.164 senza +)',
      type: 'string',
    }),
    defineField({ name: 'contactPerson', title: 'Referente', type: 'string' }),
    defineField({ name: 'phoneDisplay', title: 'Telefono (visualizzato)', type: 'string' }),
    defineField({ name: 'phoneTel', title: 'Telefono (tel: link)', type: 'string' }),
    defineField({
      name: 'orderDisclaimer',
      title: 'Disclaimer carrello',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'legal',
      title: 'Dati legali',
      type: 'object',
      fields: [
        { name: 'businessName', type: 'string', title: 'Ragione sociale' },
        { name: 'vatNumber', type: 'string', title: 'P.IVA' },
        { name: 'pec', type: 'string', title: 'PEC' },
        { name: 'ateco', type: 'string', title: 'ATECO' },
      ],
    }),
    defineField({
      name: 'nav',
      title: 'Menu header',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navLink',
          fields: [
            { name: 'kind', type: 'string', initialValue: 'link', hidden: true },
            { name: 'href', type: 'string', title: 'URL' },
            { name: 'label', type: 'string', title: 'Etichetta' },
          ],
        },
        {
          type: 'object',
          name: 'navGroup',
          fields: [
            { name: 'kind', type: 'string', initialValue: 'group', hidden: true },
            { name: 'label', type: 'string', title: 'Etichetta menu' },
            { name: 'menuId', type: 'string', title: 'ID menu' },
            {
              name: 'links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'href', type: 'string' },
                    { name: 'label', type: 'string' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'footerInfoLinks',
      title: 'Link footer',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'href', type: 'string' },
            { name: 'label', type: 'string' },
          ],
        },
      ],
    }),
  ],
});
