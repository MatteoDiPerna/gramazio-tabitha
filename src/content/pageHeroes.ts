import { getEditorial } from '@/cms/editorial';

export const staticPageHeroes = getEditorial().staticPageHeroes;

export type StaticPageHeroId = keyof typeof staticPageHeroes;

/** Immagini banner derivate dagli hero statici (compatibilità). */
export const pageHeroImages = {
  default: staticPageHeroes.contatti.image,
  catalogo: staticPageHeroes.catalogo.image,
  chiSiamo: staticPageHeroes.chiSiamo.image,
  contatti: staticPageHeroes.contatti.image,
  faq: staticPageHeroes.faq.image,
  carrello: staticPageHeroes.carrello.image,
  legal: staticPageHeroes.privacy.image,
} as const;
