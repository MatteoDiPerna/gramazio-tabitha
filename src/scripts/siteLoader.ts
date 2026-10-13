const LOADER_ID = 'site-loader';

let refCount = 0;

function getLoader(): HTMLElement | null {
  return document.getElementById(LOADER_ID);
}

export function showSiteLoader(): void {
  refCount += 1;
  const el = getLoader();
  el?.classList.remove('is-hidden');
  el?.setAttribute('aria-busy', 'true');
  document.documentElement.classList.add('site-is-loading');
}

export function hideSiteLoader(): void {
  refCount = Math.max(0, refCount - 1);
  if (refCount > 0) return;
  const el = getLoader();
  el?.classList.add('is-hidden');
  el?.setAttribute('aria-busy', 'false');
  document.documentElement.classList.remove('site-is-loading');
}

/** Mostra il loader per almeno `minMs` mentre `task` è in esecuzione. */
export async function runWithSiteLoader<T>(task: () => Promise<T>, minMs = 400): Promise<T> {
  showSiteLoader();
  const started = performance.now();
  try {
    return await task();
  } finally {
    const elapsed = performance.now() - started;
    const wait = Math.max(0, minMs - elapsed);
    window.setTimeout(() => hideSiteLoader(), wait);
  }
}

function isSameOriginNavLink(anchor: HTMLAnchorElement): boolean {
  const href = anchor.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return false;
  }
  try {
    const url = new URL(href, window.location.href);
    return url.origin === window.location.origin;
  } catch {
    return false;
  }
}

function bindLongActionTriggers(): void {
  document.addEventListener(
    'submit',
    (event) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement)) return;
      if (!form.hasAttribute('data-site-loader')) return;
      showSiteLoader();
    },
    true,
  );

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const trigger = target.closest('[data-site-loader]');
    if (!(trigger instanceof HTMLElement)) return;
    if (trigger instanceof HTMLAnchorElement && isSameOriginNavLink(trigger)) return;
    showSiteLoader();
  });
}

let listenersBound = false;
let initialLoadFinished = false;

export function initSiteLoader(): void {
  if (!listenersBound) {
    listenersBound = true;
    document.addEventListener('astro:before-preparation', () => showSiteLoader());
    document.addEventListener('astro:after-swap', () => hideSiteLoader());
    bindLongActionTriggers();
    window.siteLoader = {
      show: showSiteLoader,
      hide: hideSiteLoader,
      run: runWithSiteLoader,
    };
  }

  if (initialLoadFinished) return;
  initialLoadFinished = true;

  const finishInitialLoad = () => {
    window.setTimeout(() => hideSiteLoader(), 80);
  };

  if (document.readyState === 'complete') {
    finishInitialLoad();
  } else {
    window.addEventListener('load', finishInitialLoad, { once: true });
  }
}

declare global {
  interface Window {
    siteLoader?: {
      show: () => void;
      hide: () => void;
      run: <T>(task: () => Promise<T>, minMs?: number) => Promise<T>;
    };
  }
}
