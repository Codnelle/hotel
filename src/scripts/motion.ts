import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export type MotionApi = {
  stop: () => void;
  start: () => void;
  scrollTo: (y: number) => void;
};

// Slow, ease-out only. Nothing bounces.
const EASE = 'power2.out';
const START = 'top 86%';

export function initMotion(reduce: boolean): MotionApi {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: EASE });

  /* Smooth scroll (off for reduced motion) ------------------------- */
  let lenis: Lenis | null = null;
  if (!reduce) {
    lenis = new Lenis({ duration: 1.25, anchors: true, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis!.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  const onEnter = (el: Element, fn: () => void) =>
    ScrollTrigger.create({ trigger: el, start: START, once: true, onEnter: fn });

  /* Opening: phrases surface from the mist, then the mist lifts ---- */
  const intro = document.querySelector<HTMLElement>('[data-intro]');
  const introOn = !!intro && document.documentElement.classList.contains('intro-on');
  let introDelay = 0;
  if (intro && introOn) {
    const lines = intro.querySelectorAll('[data-intro-line]');
    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.classList.remove('intro-on');
        lenis?.start();
        try {
          sessionStorage.setItem('intro-seen', '1');
        } catch {}
      },
    });
    lenis?.stop();
    lines.forEach((line) => {
      tl.fromTo(line, { opacity: 0, filter: 'blur(14px)', y: 18 }, { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.1, ease: 'power2.out' })
        .to(line, { opacity: 0, filter: 'blur(10px)', y: -12, duration: 0.8, ease: 'power2.in' }, '+=0.45');
    });
    tl.to(intro, { opacity: 0, duration: 1.3, ease: 'power2.out' });
    introDelay = tl.duration() - 1;
    // Any intent to move on speeds the opening up.
    const hurry = () => tl.timeScale(5);
    ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach((t) => window.addEventListener(t, hurry, { once: true, passive: true }));
  }

  // Delay things in the first viewport so they follow the mist veil (and the opening).
  const firstScreen = (el: Element) => el.getBoundingClientRect().top < window.innerHeight;
  const lead = (el: Element) => (firstScreen(el) ? 0.5 + introDelay : 0);

  /* Images: fade up from mist -------------------------------------- */
  gsap.utils.toArray<HTMLElement>('[data-reveal="image"]').forEach((el) => {
    const from = reduce ? { opacity: 0 } : { opacity: 0, filter: 'blur(8px)', scale: 1.025 };
    const to = reduce
      ? { opacity: 1, duration: 1 }
      : { opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.6, clearProps: 'filter,scale' };
    gsap.set(el, from);
    onEnter(el, () => gsap.to(el, { ...to, delay: lead(el) }));
  });

  /* Headlines: line by line ---------------------------------------- */
  gsap.utils.toArray<HTMLElement>('[data-reveal="lines"]').forEach((el) => {
    const lines = el.querySelectorAll('.line');
    gsap.set(lines, reduce ? { opacity: 0 } : { opacity: 0, y: 26 });
    onEnter(el, () =>
      gsap.to(lines, { opacity: 1, y: 0, duration: reduce ? 1 : 1.5, stagger: 0.24, delay: lead(el) + 0.1 }),
    );
  });

  /* Simple fades + staggered groups -------------------------------- */
  gsap.utils.toArray<HTMLElement>('[data-reveal="fade"]').forEach((el) => {
    gsap.set(el, reduce ? { opacity: 0 } : { opacity: 0, y: 18 });
    onEnter(el, () => gsap.to(el, { opacity: 1, y: 0, duration: reduce ? 1 : 1.6, delay: lead(el) + 0.25 }));
  });
  gsap.utils.toArray<HTMLElement>('[data-reveal="stagger"]').forEach((el) => {
    const kids = Array.from(el.children);
    gsap.set(kids, reduce ? { opacity: 0 } : { opacity: 0, y: 18 });
    onEnter(el, () =>
      gsap.to(kids, { opacity: 1, y: 0, duration: reduce ? 1 : 1.6, stagger: 0.35, delay: lead(el) }),
    );
  });

  /* Hand-drawn ridge lines ----------------------------------------- */
  gsap.utils.toArray<SVGPathElement>('[data-draw]').forEach((path, i) => {
    if (reduce) return;
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    onEnter(path.ownerSVGElement ?? path, () =>
      gsap.to(path, { strokeDashoffset: 0, duration: 2.8, ease: 'power1.inOut', delay: 0.2 + i * 0.35 }),
    );
  });

  if (!reduce) {
    /* Clouds: scroll-linked horizontal parallax ---------------------- */
    gsap.utils.toArray<HTMLElement>('[data-cloud]').forEach((el) => {
      const speed = Number(el.dataset.speed ?? 10);
      const host = el.closest('section, footer, header, [data-cloud-host]') ?? el.parentElement!;
      gsap.fromTo(
        el,
        { xPercent: -speed / 2, yPercent: Math.abs(speed) / 6 },
        {
          xPercent: speed / 2,
          yPercent: -Math.abs(speed) / 6,
          ease: 'none',
          scrollTrigger: { trigger: host, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        },
      );
    });

    /* Rooms: slow horizontal drift on wider screens ----------------- */
    const mm = gsap.matchMedia();
    mm.add('(min-width: 48rem)', () => {
      gsap.utils.toArray<HTMLElement>('[data-drift-row]').forEach((row) => {
        row.classList.add('is-drifting');
        const track = row.firstElementChild as HTMLElement;
        const dist = () => Math.max(0, track.offsetWidth - row.clientWidth);
        gsap.fromTo(
          track,
          { x: 0 },
          {
            x: () => -dist(),
            ease: 'none',
            scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: 1.4, invalidateOnRefresh: true },
          },
        );
        return () => row.classList.remove('is-drifting');
      });
    });

    /* Gentle image parallax inside frames ---------------------------- */
    gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
      gsap.fromTo(
        el,
        { yPercent: -6 },
        { yPercent: 6, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.5 } },
      );
    });
  }

  /* Story: a climb. Pictures rise out of mist; the altimeter counts up */
  document.querySelectorAll<HTMLElement>('[data-story]').forEach((story) => {
    // Each picture lifts out of the mist as it scrolls into view.
    story.querySelectorAll<HTMLElement>('[data-mist]').forEach((el) => {
      const img = el.querySelector('img, .ph');
      if (reduce) return;
      const st = { trigger: el, start: 'top 92%', end: 'top 30%', scrub: 1 };
      gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)', '--mist-o': 1 }, { clipPath: 'inset(0% 0% 0% 0%)', '--mist-o': 0, ease: 'none', scrollTrigger: st });
      if (img) gsap.fromTo(img, { scale: 1.18, filter: 'blur(6px)' }, { scale: 1, filter: 'blur(0px)', ease: 'none', scrollTrigger: st });
    });

    // The altimeter: interpolates between each chapter's altitude as you read.
    const body = story.querySelector<HTMLElement>('[data-story-body]');
    const meter = story.querySelector<HTMLElement>('[data-altimeter]');
    const value = story.querySelector<HTMLElement>('[data-alt-value]');
    const fill = story.querySelector<HTMLElement>('[data-alt-fill]');
    const ticks = Array.from(story.querySelectorAll<HTMLElement>('[data-alt-tick]'));
    const chapters = Array.from(story.querySelectorAll<HTMLElement>('[data-chapter]'));
    if (!body || !value || !fill || !chapters.length) return;
    const alts = chapters.map((c) => Number(c.dataset.altitude));
    const lo = Math.min(...alts);
    const hi = Math.max(...alts);
    const show = (alt: number) => {
      value.textContent = (Math.round(alt / 10) * 10).toLocaleString('en-IN');
      fill.style.transform = `scaleY(${(alt - lo) / (hi - lo || 1)})`;
      ticks.forEach((t, k) => t.classList.toggle('is-passed', alt >= alts[k] - 1));
    };
    show(lo);
    chapters.forEach((c, i) => {
      const from = alts[Math.max(0, i - 1)];
      const to = alts[i];
      ScrollTrigger.create({
        trigger: c,
        start: 'top 85%',
        end: 'top 35%',
        scrub: true,
        onUpdate: (self) => show(from + (to - from) * self.progress),
      });
    });
    // Light numerals while the full-screen cloud chapter is behind the altimeter.
    if (meter) {
      story.querySelectorAll<HTMLElement>('[data-chapter-full]').forEach((full) =>
        ScrollTrigger.create({ trigger: full, start: 'top 40%', end: 'bottom 60%', toggleClass: { targets: meter, className: 'is-on-dark' } }),
      );
    }
  });

  /* Statements: words light up one by one as you read down ---------- */
  document.querySelectorAll<HTMLElement>('[data-scrub-words]').forEach((el) => {
    const words = el.querySelectorAll('.w');
    if (reduce) return;
    // Starts as the line enters from below, so the dimming is never seen happening.
    gsap.fromTo(
      words,
      { opacity: 0.14 },
      { opacity: 1, ease: 'none', stagger: 0.08, immediateRender: false, scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom 45%', scrub: 0.6 } },
    );
  });

  /* Loose images drift at their own pace ----------------------------- */
  if (!reduce) {
    gsap.utils.toArray<HTMLElement>('[data-drift]').forEach((el) => {
      const s = Number(el.dataset.drift ?? 1);
      gsap.fromTo(el, { y: 70 * s }, { y: -70 * s, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
    });
  }

  /* Dusk: the valley lights come on as night falls ------------------ */
  document.querySelectorAll<HTMLElement>('[data-dusk]').forEach((el) =>
    ScrollTrigger.create({ trigger: el, start: 'top 35%', toggleClass: { targets: el, className: 'is-lit' } }),
  );

  if (!reduce) {
    /* Hero: as you leave, the photo leans in, the words lift into the mist */
    const hero = document.querySelector<HTMLElement>('.hero');
    if (hero) {
      const tl = gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 } });
      tl.to(hero.querySelector('.hero-poster'), { scale: 1.12, ease: 'none' }, 0)
        .to(hero.querySelector('.hero-copy'), { yPercent: -35, opacity: 0, filter: 'blur(6px)', ease: 'none' }, 0)
        .to(hero.querySelector('.clouds'), { yPercent: -30, ease: 'none' }, 0);
    }

    /* Vista: a small window of cloud opens out to fill the screen ---- */
    document.querySelectorAll<HTMLElement>('[data-vista]').forEach((vista) => {
      const frame = vista.querySelector<HTMLElement>('[data-vista-frame]')!;
      const mobile = window.matchMedia('(max-width: 47.99rem)').matches;
      const st = { trigger: vista, start: 'top bottom', end: 'top top', scrub: 1 };
      gsap.fromTo(frame, { '--vy': mobile ? '10%' : '14%', '--vx': mobile ? '7%' : '22%' }, { '--vy': '0%', '--vx': '0%', ease: 'none', scrollTrigger: st });
      gsap.fromTo(vista.querySelector('[data-vista-img]'), { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: st });
      gsap.fromTo(
        vista.querySelector('[data-vista-copy]'),
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, ease: 'none', scrollTrigger: { trigger: vista, start: 'top 55%', end: 'top 5%', scrub: 1 } },
      );
    });
  }

  // Fonts can shift layout; recalc once they're in.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  return {
    stop: () => lenis?.stop(),
    start: () => lenis?.start(),
    scrollTo: (y) => (lenis ? lenis.scrollTo(y) : window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' })),
  };
}
