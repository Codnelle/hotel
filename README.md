# [Hotel Name], Kalimpong

Astro + Tailwind 4, static output. GSAP/ScrollTrigger for motion, Lenis for smooth scroll.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
```

- **All copy** lives in `src/content/site.ts`: hotel name, contact details, booking URL, WhatsApp number, rooms and rates.
- **Design tokens** are in `src/styles/global.css` (`@theme`). Marigold is used only for Book buttons.
- **Photos:** see `public/images/README.md`. **Video:** see `public/video/README.md`.
- **Motion:** `src/scripts/motion.ts`. With reduced motion turned on, smooth scroll, cloud drift and blur are switched off and only simple fades remain.
