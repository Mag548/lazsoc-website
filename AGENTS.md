# Codex instructions for this repository

You are developing an original, production-minded cinematic website for the Lazaridis Students' Society (LazSoc). Favor legibility, truthful content, accessible motion, clean component boundaries and good mobile performance over gratuitous effects.

## Stack
- React 19 + Vite
- GSAP ScrollTrigger for scene timelines, SVG path drawing and scroll-based interactions
- One Lenis instance for desktop wheel smoothing, integrated into the GSAP ticker; avoid additional conflicting smooth-scroll libraries
- Plain CSS with responsive rules; no extra UI library unless explicitly requested

## Primary requirements
1. The user's exact photo should be `public/media/laz-hero.jpg`. If present, animate the geometry **in that photograph**. Don't overlay an unrelated lattice and claim it matches the roof.
2. Animate the leaf's position, rotation, opacity and scale based on scroll progress. The leaf should reverse when scrolling backward.
3. Scroll should control real campus footage at `public/media/laz-tour.mp4`. Always provide a pleasant missing-video fallback.
4. Preserve reduced-motion, mobile fallbacks, semantic navigation and keyboard accessibility.
5. Do not invent real event dates, statistics, sponsors, or official club approvals.
6. Only use media and marks with appropriate permission for official publication; the current wordmark/leaf is a concept.

## Quality bar
- Run `npm run build` after changes.
- Test key 375, 768, 1440 and 1920px viewports; exercise forward/backward scrubbing and resize.
- Keep GSAP contexts scoped and reverted on component cleanup; prevent duplicate scroll triggers in React Strict Mode.
- Avoid autoplay video as a substitute for actual scroll scrubbing.
- Prefer purposeful animations inspired by premium interactive sites; do not imitate another site's exact layout or assets.

## Files to read first
- `README.md`
- `docs/creative-plan.md`
- `docs/CODEX_PROMPTS.md`
