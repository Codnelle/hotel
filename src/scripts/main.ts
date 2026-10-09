import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initMotion, type MotionApi } from './motion';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const motion: MotionApi = initMotion(reduce);
(window as unknown as { __motion: boolean }).__motion = true;

/* ------------------------------------------------------------------ */
/* Mist veil: every page opens pale, then lifts                       */
/* ------------------------------------------------------------------ */
const veil = document.querySelector<HTMLElement>('[data-veil]');
requestAnimationFrame(() => veil?.classList.add('is-lifted'));
window.addEventListener('pageshow', (e) => {
  if (e.persisted) veil?.classList.add('is-lifted');
});

/* ------------------------------------------------------------------ */
/* Header: tint once scrolled, tuck away on the way down              */
/* ------------------------------------------------------------------ */
const header = document.querySelector<HTMLElement>('[data-header]');
let lastY = window.scrollY;
const onScroll = () => {
  const y = window.scrollY;
  header?.classList.toggle('is-scrolled', y > 40);
  const hide = y > 640 && y > lastY + 2 && !header?.contains(document.activeElement);
  if (hide) header?.classList.add('is-hidden');
  else if (y < lastY - 2 || y < 640) header?.classList.remove('is-hidden');
  lastY = y;
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// The floating mobile pill steps aside when the footer's own Book button is on screen.
const pill = document.querySelector<HTMLElement>('[data-float-pill]');
const siteFooter = document.querySelector('footer');
if (pill && siteFooter && 'IntersectionObserver' in window) {
  new IntersectionObserver(([e]) => {
    pill.classList.toggle('is-away', e.isIntersecting);
  }, { rootMargin: '0px 0px -20% 0px' }).observe(siteFooter);
}

/* ------------------------------------------------------------------ */
/* Sheets: menu + booking panel (native <dialog> for focus + Esc)     */
/* ------------------------------------------------------------------ */
const menu = document.getElementById('menu') as HTMLDialogElement | null;
const booking = document.getElementById('booking') as HTMLDialogElement | null;
const menuButtons = document.querySelectorAll<HTMLButtonElement>('[data-open-menu]');
const CLOSE_MS = reduce ? 450 : 900;

function lock(on: boolean) {
  document.documentElement.style.overflow = on ? 'hidden' : '';
  if (on) motion.stop();
  else motion.start();
}

function open(d: HTMLDialogElement | null) {
  if (!d || d.open) return;
  d.showModal();
  lock(true);
  if (d === menu) menuButtons.forEach((b) => b.setAttribute('aria-expanded', 'true'));
  requestAnimationFrame(() => requestAnimationFrame(() => d.classList.add('is-open')));
}

function close(d: HTMLDialogElement | null, instant = false) {
  if (!d || !d.open) return;
  d.classList.remove('is-open');
  if (d === menu) menuButtons.forEach((b) => b.setAttribute('aria-expanded', 'false'));
  const finish = () => {
    if (d.classList.contains('is-open')) return; // re-opened meanwhile
    d.close();
    if (!menu?.open && !booking?.open) lock(false);
  };
  if (instant) finish();
  else window.setTimeout(finish, CLOSE_MS);
}

for (const d of [menu, booking]) {
  if (!d) continue;
  d.addEventListener('cancel', (e) => {
    e.preventDefault();
    close(d);
  });
  d.addEventListener('click', (e) => {
    if (e.target === d) close(d); // backdrop
    if ((e.target as Element).closest('[data-close]')) close(d);
  });
}

menuButtons.forEach((b) => b.addEventListener('click', () => open(menu)));

document.addEventListener('click', (e) => {
  const t = (e.target as Element).closest('[data-open-booking]');
  if (!t) return;
  e.preventDefault();
  if (menu?.open) close(menu, true);
  open(booking);
});

// Links inside the menu that point at the current page just close it.
menu?.querySelectorAll<HTMLAnchorElement>('a[href^="/"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    if (a.pathname.replace(/\/$/, '') === location.pathname.replace(/\/$/, '')) {
      e.preventDefault();
      close(menu);
      motion.scrollTo(0);
    }
  });
});

/* ------------------------------------------------------------------ */
/* Booking form: sensible date bounds                                 */
/* ------------------------------------------------------------------ */
const iso = (d: Date) => {
  const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return z.toISOString().slice(0, 10);
};
const arrival = document.querySelector<HTMLInputElement>('[data-arrival]');
const departure = document.querySelector<HTMLInputElement>('[data-departure]');
if (arrival && departure) {
  const today = new Date();
  const tomorrow = new Date(today.getTime() + 864e5);
  arrival.min = iso(today);
  departure.min = iso(tomorrow);
  arrival.addEventListener('change', () => {
    if (!arrival.value) return;
    const next = new Date(arrival.value + 'T12:00:00');
    next.setDate(next.getDate() + 1);
    departure.min = iso(next);
    if (!departure.value || departure.value <= arrival.value) departure.value = iso(next);
  });
}

/* ------------------------------------------------------------------ */
/* Hero video: only on decent connections, never with reduced motion  */
/* ------------------------------------------------------------------ */
const video = document.querySelector<HTMLVideoElement>('[data-hero-video]');
if (video) {
  type NetInfo = { saveData?: boolean; effectiveType?: string };
  const conn = (navigator as Navigator & { connection?: NetInfo }).connection;
  const slow = !!conn && (conn.saveData || /(^|-)2g|3g/.test(conn.effectiveType ?? ''));
  if (!reduce && !slow) {
    const { mp4, webm } = video.dataset;
    if (webm) video.insertAdjacentHTML('beforeend', `<source src="${webm}" type="video/webm">`);
    if (mp4) video.insertAdjacentHTML('beforeend', `<source src="${mp4}" type="video/mp4">`);
    video.addEventListener('playing', () => video.classList.add('is-playing'), { once: true });
    video.load();
    video.play().catch(() => {});
  }
}

/* ------------------------------------------------------------------ */
/* Places: open a row for its note; a photo follows the cursor        */
/* ------------------------------------------------------------------ */
document.querySelectorAll<HTMLElement>('[data-places]').forEach((list) => {
  const rows = Array.from(list.querySelectorAll<HTMLElement>('[data-place]'));
  rows.forEach((row) => {
    const btn = row.querySelector<HTMLButtonElement>('[data-place-toggle]')!;
    const panel = row.querySelector<HTMLElement>('[data-place-panel]')!;
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', String(open));
      if (open) {
        panel.hidden = false;
        panel.animate(
          reduce ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }],
          { duration: reduce ? 400 : 1000, easing: 'cubic-bezier(.22,.61,.36,1)' },
        );
      } else {
        panel.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400, easing: 'ease-out' }).onfinish = () => (panel.hidden = true);
      }
      ScrollTrigger.refresh();
    });
  });

  const preview = list.querySelector<HTMLElement>('[data-place-preview]');
  if (!preview || !window.matchMedia('(hover: hover) and (min-width: 48rem)').matches) return;
  const shots = Array.from(preview.querySelectorAll<HTMLElement>('[data-preview]'));
  let x = 0, y = 0, cx = 0, cy = 0, raf = 0;
  const loop = () => {
    // Ease toward the cursor so the picture drifts rather than snaps.
    cx += (x - cx) * (reduce ? 1 : 0.09);
    cy += (y - cy) * (reduce ? 1 : 0.09);
    preview.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
    raf = requestAnimationFrame(loop);
  };
  rows.forEach((row, i) => {
    row.addEventListener('mouseenter', (e) => {
      x = cx = e.clientX + 140;
      y = cy = e.clientY;
      shots.forEach((s, j) => s.classList.toggle('is-on', j === i));
      preview.classList.add('is-on');
      cancelAnimationFrame(raf);
      loop();
    });
  });
  list.addEventListener('mousemove', (e) => {
    x = e.clientX + 140;
    y = e.clientY;
  });
  list.addEventListener('mouseleave', () => {
    preview.classList.remove('is-on');
    window.setTimeout(() => cancelAnimationFrame(raf), 700);
  });
});
