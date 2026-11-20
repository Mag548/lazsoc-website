# LazSoc — cinematic website concept

A working **React 19 + Vite + GSAP + Lenis** prototype of a one-page LazSoc site. Scroll drives the page: the Lazaridis Hall roof is drawn over a real photograph, a maple leaf falls through a pinned hero, and a film chapter seeks campus footage from scroll position. There is no backend, router, or CMS. This is a concept prototype, not an approved official LazSoc deployment.

Repository: https://github.com/Mag548/lazsoc-website

## Run it

```bash
git clone https://github.com/Mag548/lazsoc-website.git
cd lazsoc-website
npm install
npm run dev
```

Open the local URL Vite prints (normally `http://localhost:5173`).

```bash
npm run build    # static site in dist/
npm run preview  # serve that build locally
```

`dist/` can be deployed to Vercel or Netlify. `node_modules/` and `dist/` are gitignored.

## What works now

- Hero photo at `public/media/laz-hero.jpg`. If that file fails to load, the page falls back to `public/media/hero-fallback.svg`.
- Roof drawing: SVG paths in `src/data/roofSketch.js` are drawn on load with GSAP DrawSVG, aligned to the photograph and positioned with the same cover crop as the image.
- Scroll-driven leaf: `public/media/laz-leaf.png` drifts, rotates, and scales with scroll, and reverses when scrolling back up. It is hidden when reduced motion is on.
- Pinned hero and film chapters. The film seeks `public/media/laz-tour.mp4` from scroll progress. That video is not in the repo yet; without it, a designed still stays in place. Nothing autoplays.
- Editorial sections: About, Get involved, Shop, and Resources, plus a closing invitation that links to [lazsoc.ca](https://lazsoc.ca/).
- Desktop wheel smoothing with one Lenis instance, synced to the GSAP ticker. Lenis is off below 768px and when `prefers-reduced-motion` is set.
- Semantic markup, a keyboard-reachable nav, and a mobile menu.

## Add the campus film

Export a silent 8–20 second 1080p or 720p video as `public/media/laz-tour.mp4`. Short keyframe intervals make scroll seeking smoother:

```bash
ffmpeg -i source.mp4 -an -vf "scale=1280:-2,fps=30" -c:v libx264 -crf 21 -preset medium -pix_fmt yuv420p -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart public/media/laz-tour.mp4
```

A walkthrough from the glass ceiling into the atrium, or a short campus montage, both fit the chapter. On low-powered phones, a WebP or JPEG frame sequence can seek more reliably than an MP4.

## Layout

```text
src/
  App.jsx                      Page sections and Lenis setup
  main.jsx                     React entry
  styles.css                   Layout, type, and responsive rules
  data/roofSketch.js           Roof paths traced to the hero photo
  components/
    Header.jsx                 Nav and mobile menu
    Hero.jsx                   Pinned hero and photo crop
    RoofTrace.jsx              SVG roof draw on load
    FallingLeaf.jsx            Scroll-scrubbed leaf
    MapleLeaf.jsx              Unused vector leaf
    FilmChapter.jsx            Scroll-scrubbed video and still fallback
    Reveal.jsx                 Section entrance motion
public/
  favicon.svg
  media/
    laz-hero.jpg               Hero photograph
    laz-leaf.png               Falling leaf
    hero-fallback.svg          Used if the hero photo fails
    film-poster.svg            Film-chapter still
    laz-tour.mp4               Add the campus video here
docs/
  creative-plan.md             Direction and phased roadmap
  CODEX_PROMPTS.md             Follow-up build prompts
```

Stack details: plain CSS (no UI library), JavaScript rather than TypeScript, GSAP ScrollTrigger for pins and scrubbing, and DrawSVG for the roof. `motion` is installed and unused. Fonts are Manrope and DM Sans from Google Fonts. The wordmark and leaf are concept marks.

## Still to do

- Add cleared campus footage at `public/media/laz-tour.mp4`.
- Confirm the roof paths in `src/data/roofSketch.js` against the final crop at phone, tablet, and desktop widths.
- Confirm brand and logo use with LazSoc before any public launch.
- Replace conceptual copy with approved club, event, and team content. Do not invent dates, statistics, sponsors, or approvals.
- Add a content source once real events, teams, and clubs need to be edited outside the code.
- Run a keyboard, contrast, Lighthouse, and mobile Safari pass, and compress media before launch.
