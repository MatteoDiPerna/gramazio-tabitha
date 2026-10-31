import type { StructureBuilder } from 'sanity/structure';

const singleton = (S: StructureBuilder, type: string, title: string, id: string) =>
  S.listItem()
    .title(title)
    .id(id)
    .child(S.document().schemaType(type).documentId(id));

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Gestione sito')
    .items([
      S.listItem()
        .title('Catalogo prodotti')
        .child(S.documentTypeList('product').title('Prodotti')),
      S.divider(),
      singleton(S, 'siteSettings', 'Contatti e impostazioni', 'siteSettings'),
      singleton(S, 'homePage', 'Homepage', 'homePage'),
      singleton(S, 'aboutPage', 'Chi siamo', 'aboutPage'),
      singleton(S, 'catalogPageIntro', 'Intro catalogo', 'catalogPageIntro'),
      singleton(S, 'faqPage', 'FAQ', 'faqPage'),
      singleton(S, 'contactsPageIntro', 'Testi contatti', 'contactsPageIntro'),
      singleton(S, 'pageHeroes', 'Banner pagine', 'pageHeroes'),
      singleton(S, 'homeMediaPaths', 'Media home (path)', 'homeMediaPaths'),
      S.divider(),
      S.listItem()
        .title('Pagine legali')
        .child(
          S.documentTypeList('legalPage')
            .title('Legali')
            .filter('_type == "legalPage"'),
        ),
    ]);
