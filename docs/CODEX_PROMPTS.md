# Codex work queue: copy-paste prompts

Use these **in order**, with the code project opened in Codex.

## Prompt 1 — pixel-match the user's photograph

> Work in the existing React/Vite/GSAP LazSoc project. The original Lazaridis Hall atrium photograph is in `public/media/laz-hero.jpg`. Inspect its actual dimensions and content, then **replace the approximate lattice** in `src/components/RoofTrace.jsx` with manually calibrated SVG paths following the visible ceiling trusses and intersections in the photo. Match the browser's `object-fit: cover` and `object-position` crop at desktop and mobile widths. Animate stroke dash offsets with a refined draw order that reveals the roof from a central ridge outward in 1.8–2.8 seconds. Preserve the photo unmodified. Do not draw on walls, people, or other non-roof regions. Keep overlays crisp, subtle and accessible. Validate across 375px, 768px and 1440px. Run the production build and fix warnings.

## Prompt 2 — refined leaf choreography and transition

> Preserve the current design. Improve the maple-leaf animation in `Hero.jsx` so it follows a smooth curved Bézier-like path, with gentle rotation/roll, small changes in scale and physically plausible easing. Keep the entire leaf animation tied to ScrollTrigger progress, reversible on scroll up, and reduce-motion aware. End with a visually seamless match-cut into the beginning of the film section, not a hard page change. Test resize and refresh with pinned sections. Favor GSAP ScrollTrigger; do not install three different scroll libraries.

## Prompt 3 — real footage and mobile performance

> A real video is at `public/media/laz-tour.mp4`. Upgrade the existing `FilmChapter.jsx` video scroll-scrubbing for consistent frame responsiveness in Chrome, Safari and iOS. Add a loaded-metadata initial seek, duration bounds, safe cleanup, appropriate poster fallback and perceptual smoothness. Measure responsiveness, preload conservatively, and if frame seeking is weak, implement an alternative frame-sequence loader on mobile. Do not assume the video exists without checking. Maintain the visual experience when the file is absent.

## Prompt 4 — real LazSoc content

> Use `https://lazsoc.ca/` as a reference for information architecture but do not copy copyrighted assets wholesale. Replace placeholder content with accurate, approved LazSoc club/program/event descriptions. Create pages for Teams, Clubs, Events, Partners and Contact using accessible navigation. Clearly mark unknown content as pending; never invent sponsors, event dates or links. Keep visual harmony with the original editorial, gold-on-ivory art direction. Add keyboard-friendly interactions and test layout on mobile.

## Prompt 5 — polish and deployment

> Conduct a production readiness review. Improve Lighthouse performance, mobile responsiveness, image loading, reduced-motion handling, accessibility, menu behaviour, hash navigation, GSAP cleanup, SEO, and metadata. Remove debug styles, verify no console errors, and produce a Vercel deployment guide. Do not claim official LazSoc authorization; identify any licensing or approval requirements.
