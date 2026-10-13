const SCROLL_THRESHOLD_PX = 12;

function getHeader(): HTMLElement | null {
  return document.querySelector('.header');
}

function hasPhotoHero(): boolean {
  return Boolean(document.querySelector('main .page-hero--photo'));
}

function isMobileNavOpen(): boolean {
  return document.getElementById('site-nav')?.classList.contains('is-open') ?? false;
}

function applyHeaderState(): void {
  const header = getHeader();
  if (!header) return;

  const overlay = hasPhotoHero();
  header.classList.toggle('header--overlay', overlay);

  const solid = !overlay || window.scrollY > SCROLL_THRESHOLD_PX || isMobileNavOpen();
  header.classList.toggle('header--solid', solid);
}

let scrollListenerAttached = false;

export function initHeaderScroll(): void {
  applyHeaderState();

  if (!scrollListenerAttached) {
    window.addEventListener('scroll', applyHeaderState, { passive: true });
    scrollListenerAttached = true;
  }
}
