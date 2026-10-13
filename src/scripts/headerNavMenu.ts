const DESKTOP_MQ = '(min-width: 768px)';

function closeDisclosures(except?: Element | null) {
  document.querySelectorAll('[data-nav-disclosure].is-open').forEach((root) => {
    if (except && root === except) return;
    root.classList.remove('is-open');
    const trigger = root.querySelector<HTMLElement>('[data-nav-disclosure-trigger]');
    trigger?.setAttribute('aria-expanded', 'false');
  });
}

function syncDisclosureAria() {
  const desktop = window.matchMedia(DESKTOP_MQ).matches;
  document.querySelectorAll<HTMLElement>('[data-nav-disclosure-trigger]').forEach((trigger) => {
    if (!desktop) {
      trigger.setAttribute('aria-expanded', 'true');
      return;
    }
    const root = trigger.closest('[data-nav-disclosure]');
    trigger.setAttribute('aria-expanded', root?.classList.contains('is-open') ? 'true' : 'false');
  });
}

export function initHeaderNavMenu() {
  syncDisclosureAria();

  if (document.documentElement.dataset.navMenuMqBound !== 'true') {
    document.documentElement.dataset.navMenuMqBound = 'true';
    window.matchMedia(DESKTOP_MQ).addEventListener('change', syncDisclosureAria);
  }

  document.querySelectorAll<HTMLElement>('[data-nav-disclosure]').forEach((root) => {
    if (root.dataset.navMenuBound === 'true') return;
    root.dataset.navMenuBound = 'true';

    const trigger = root.querySelector<HTMLElement>('[data-nav-disclosure-trigger]');
    if (!trigger) return;

    trigger.addEventListener('click', (event) => {
      if (!window.matchMedia(DESKTOP_MQ).matches) return;

      event.preventDefault();
      event.stopPropagation();
      const willOpen = !root.classList.contains('is-open');
      closeDisclosures(willOpen ? root : null);
      root.classList.toggle('is-open', willOpen);
      syncDisclosureAria();
    });
  });

  if (document.documentElement.dataset.navMenuDocBound !== 'true') {
    document.documentElement.dataset.navMenuDocBound = 'true';

    document.addEventListener('click', () => closeDisclosures());
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeDisclosures();
    });
  }
}
