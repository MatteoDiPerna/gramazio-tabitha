import { catalogCategories } from '@/domain/catalog/catalogCategories';
import {
  buildCatalogHref,
  compareCatalogGridItems,
  matchesCategory,
  parseCatalogQuery,
  type CatalogGridItem,
} from '@/domain/catalog/catalogPageQuery';

type CatalogPageConfig = {
  defaultHeroTitle: string;
  defaultPageTitle: string;
  allIntro: { title: string; body: string };
  byCategory: Record<string, { title: string; body: string; heroTitle: string }>;
};

function readConfig(): CatalogPageConfig | null {
  const el = document.getElementById('catalog-page-config');
  if (!el?.textContent) return null;
  try {
    return JSON.parse(el.textContent) as CatalogPageConfig;
  } catch {
    return null;
  }
}

function gridItemFromElement(li: HTMLElement): CatalogGridItem | null {
  const category = li.dataset.catalogCategory;
  const name = li.dataset.catalogName;
  if (!category || !name) return null;
  return { category: category as CatalogGridItem['category'], name };
}

function setLinkActive(link: HTMLAnchorElement, active: boolean) {
  link.classList.toggle('is-active', active);
  if (active) link.setAttribute('aria-current', link.classList.contains('catalog-toolbar__sort-link') ? 'true' : 'page');
  else link.removeAttribute('aria-current');
}

function updateIntro(root: HTMLElement, config: CatalogPageConfig, category: string | null) {
  const intro = root.querySelector('[data-catalog-intro]');
  if (!intro) return;

  if (category && config.byCategory[category]) {
    const { body } = config.byCategory[category];
    intro.innerHTML = `<p class="catalog-intro__body">${escapeHtml(body)}</p>`;
    return;
  }

  const { title, body } = config.allIntro;
  intro.innerHTML = `
    <header class="section-head section-head--center">
      <p class="section-head__eyebrow">Catalogo</p>
      <h2 class="section-head__title">${escapeHtml(title)}</h2>
      <p class="section-ornament section-ornament--center" aria-hidden="true"></p>
      <p class="section-head__lead">${escapeHtml(body)}</p>
    </header>`;
}

function updateHero(config: CatalogPageConfig, category: string | null) {
  const titleEl = document.getElementById('page-hero-title');
  if (!titleEl) return;
  const heroTitle =
    category && config.byCategory[category]?.heroTitle
      ? config.byCategory[category].heroTitle
      : config.defaultHeroTitle;
  titleEl.textContent = heroTitle;

  const suffix = ' | Gramazio Tabitha';
  document.title =
    category && config.byCategory[category]?.heroTitle
      ? `Catalogo — ${config.byCategory[category].heroTitle}${suffix}`
      : `${config.defaultPageTitle}${suffix}`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function applyCatalogPageState() {
  const root = document.querySelector('[data-catalog-page]');
  const grid = root?.querySelector('[data-catalog-grid]');
  if (!(root instanceof HTMLElement) || !(grid instanceof HTMLElement)) return;

  const config = readConfig();
  const { category, sort } = parseCatalogQuery(window.location.search);

  const items = [...grid.querySelectorAll<HTMLElement>('[data-catalog-product]')];
  const visible: HTMLElement[] = [];

  for (const li of items) {
    const item = gridItemFromElement(li);
    const show = item != null && matchesCategory(item, category);
    li.hidden = !show;
    if (show) visible.push(li);
  }

  visible.sort((a, b) => {
    const ia = gridItemFromElement(a);
    const ib = gridItemFromElement(b);
    if (!ia || !ib) return 0;
    return compareCatalogGridItems(ia, ib, sort);
  });
  for (const li of visible) grid.appendChild(li);

  const count = visible.length;
  const countEl = root.querySelector('[data-catalog-count]');
  if (countEl) {
    countEl.textContent = count === 1 ? '1 prodotto' : `${count} prodotti`;
  }

  const emptyEl = root.querySelector('[data-catalog-empty]');
  const noticeEl = root.querySelector('[data-catalog-pricing-notice]');
  if (emptyEl instanceof HTMLElement) {
    emptyEl.hidden = count > 0;
  }
  grid.hidden = count === 0;

  if (noticeEl instanceof HTMLElement) {
    const anyIncomplete = visible.some((li) => li.dataset.catalogPricingIncomplete === 'true');
    noticeEl.hidden = !anyIncomplete;
  }

  root.querySelectorAll<HTMLAnchorElement>('.catalog-nav__link').forEach((link) => {
    const href = link.getAttribute('href') ?? '';
    const linkQuery = parseCatalogQuery(href.includes('?') ? href.slice(href.indexOf('?')) : '');
    setLinkActive(link, linkQuery.category === category);
  });

  root.querySelectorAll<HTMLAnchorElement>('.catalog-toolbar__sort-link').forEach((link) => {
    const href = link.getAttribute('href') ?? '';
    const linkQuery = parseCatalogQuery(href.includes('?') ? href.slice(href.indexOf('?')) : '');
    setLinkActive(link, linkQuery.sort === sort && linkQuery.category === category);
  });

  const select = root.querySelector<HTMLSelectElement>('[data-catalog-nav-select]');
  if (select) {
    const target = buildCatalogHref(category, sort);
    select.value = [...select.options].some((o) => o.value === target) ? target : select.value;
  }

  if (config) {
    updateIntro(root, config, category);
    updateHero(config, category);
  }
}

function isCatalogFilterLink(anchor: HTMLAnchorElement): boolean {
  try {
    const url = new URL(anchor.href, window.location.href);
    return url.pathname.replace(/\/$/, '') === '/catalogo';
  } catch {
    return false;
  }
}

function bindCatalogPageNavigation() {
  const root = document.querySelector('[data-catalog-page]');
  if (!(root instanceof HTMLElement) || root.dataset.catalogNavBound === 'true') return;
  root.dataset.catalogNavBound = 'true';

  root.addEventListener(
    'click',
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest('a.catalog-nav__link, a.catalog-toolbar__sort-link');
      if (!(link instanceof HTMLAnchorElement) || !isCatalogFilterLink(link)) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank')
        return;

      event.preventDefault();
      event.stopImmediatePropagation();
      const url = new URL(link.href, window.location.href);
      window.history.pushState({}, '', `${url.pathname}${url.search}`);
      applyCatalogPageState();
    },
    true,
  );

  root.querySelectorAll<HTMLSelectElement>('[data-catalog-nav-select]').forEach((select) => {
    if (select.dataset.bound === 'true') return;
    select.dataset.bound = 'true';
    select.addEventListener('change', () => {
      const value = select.value;
      if (!value) return;
      const url = new URL(value, window.location.href);
      window.history.pushState({}, '', `${url.pathname}${url.search}`);
      applyCatalogPageState();
    });
  });
}

export function initCatalogPage() {
  applyCatalogPageState();
  bindCatalogPageNavigation();
}

if (typeof window !== 'undefined') {
  const boot = () => initCatalogPage();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
  document.addEventListener('astro:page-load', () => {
    const root = document.querySelector('[data-catalog-page]');
    if (root instanceof HTMLElement) {
      delete root.dataset.catalogNavBound;
    }
    initCatalogPage();
  });
  window.addEventListener('popstate', applyCatalogPageState);
}
