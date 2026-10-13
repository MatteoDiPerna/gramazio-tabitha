const AUTO_MS = 5000;

function scrollStep(track: HTMLElement): number {
  const slide = track.querySelector('.home-gallery__slide');
  if (!slide) return 320;
  const list = track.querySelector('.home-gallery__list');
  const gap = list ? parseFloat(getComputedStyle(list).gap) || 0 : 0;
  return slide.getBoundingClientRect().width + gap;
}

function advance(track: HTMLElement): void {
  const step = scrollStep(track);
  const max = track.scrollWidth - track.clientWidth;
  if (max <= 0) return;

  const next = track.scrollLeft + step;
  if (next >= max - 2) {
    track.scrollTo({ left: 0, behavior: 'smooth' });
  } else {
    track.scrollBy({ left: step, behavior: 'smooth' });
  }
}

export function initHomeGallery(root: ParentNode = document): void {
  const track = root.querySelector<HTMLElement>('[data-home-gallery]');
  if (!track || track.dataset.galleryReady === 'true') return;
  track.dataset.galleryReady = 'true';

  let autoTimer: number | undefined;
  let resumeTimer: number | undefined;
  let isDragging = false;
  let dragStartX = 0;
  let dragScrollLeft = 0;

  const stopAuto = () => {
    if (autoTimer !== undefined) {
      window.clearInterval(autoTimer);
      autoTimer = undefined;
    }
  };

  const startAuto = () => {
    stopAuto();
    autoTimer = window.setInterval(() => {
      if (!track.isConnected) {
        stopAuto();
        return;
      }
      if (!isDragging) advance(track);
    }, AUTO_MS);
  };

  const pauseAutoTemporarily = () => {
    stopAuto();
    if (resumeTimer !== undefined) window.clearTimeout(resumeTimer);
    resumeTimer = window.setTimeout(startAuto, AUTO_MS);
  };

  track.addEventListener('mousedown', (event) => {
    isDragging = true;
    track.classList.add('is-dragging');
    dragStartX = event.pageX;
    dragScrollLeft = track.scrollLeft;
    pauseAutoTemporarily();
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('is-dragging');
  });

  track.addEventListener('mousemove', (event) => {
    if (!isDragging) return;
    event.preventDefault();
    const delta = event.pageX - dragStartX;
    track.scrollLeft = dragScrollLeft - delta;
  });

  track.addEventListener(
    'touchstart',
    () => {
      pauseAutoTemporarily();
    },
    { passive: true },
  );

  track.addEventListener(
    'wheel',
    () => {
      pauseAutoTemporarily();
    },
    { passive: true },
  );

  startAuto();
}

export function initAllHomeGalleries(): void {
  initHomeGallery(document);
}
