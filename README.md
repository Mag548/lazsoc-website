# LazSoc — cinematic website concept

A working, editable **React + Vite + GSAP + Lenis** first version of a premium LazSoc landing page. Inspired by Awwwards-level editorial direction and motion, but with an original composition.

## Open in Codex / VS Code

1. Download and unzip `lazsoc-codex-starter.zip`.
2. Open the unzipped `lazsoc-prototype` folder in **Codex**, VS Code, or your terminal. If using Codex with GitHub, first push this folder to a repository, then select that repository in Codex.
3. In the project terminal run:

```bash
npm install
npm run dev
```

4. Open the local URL Vite prints (normally `http://localhost:5173`).
5. For a production compile run `npm run build`; the static site will appear in `dist/`. Deploy this directory to Vercel or Netlify.

## What works now

- Intro animation: ceiling lattice SVG paths are drawn sequentially with GSAP on page load.
- Scroll-driven leaf: a golden maple leaf drifts, rotates and descends as the user scrolls through a pinned hero. Reverses as scrolling reverses.
- Editorial, responsive sections: About, Experience, Community and footer.
- Scroll-scrub film chapter: place a real MP4 in the expected path and the scroll controls playback frame position; otherwise a designed background animates as a fallback.
- Smooth scrolling on desktop with Lenis (disabled on mobile and reduced-motion preferences).
- Accessible navigation, semantic markup and reduced motion support.

## IMPORTANT: Put your original photo into the project

Your image shared in chat did **not** arrive as a locally accessible image file in this environment, so the project uses an original **local SVG concept illustration** until you add it.

To use your exact uploaded photo:

1. Name your image `laz-hero.jpg` (if it is PNG, convert to JPG or change the source path in `src/components/Hero.jsx`).
2. Put it in `public/media/laz-hero.jpg`.
3. Refresh the site. The `<img>` in `src/components/Hero.jsx` will automatically use it.
4. Adjust the drawing paths in `src/components/RoofTrace.jsx` to precisely follow the roof beams. This prototype uses a perspective-lattice *approximation*; pixel-accurate tracing requires the final image's original dimensions.

## Add the cinematic footage

Export a **silent, short** 8–20-second 1080p or 720p video; name it `laz-tour.mp4` and put it in `public/media/laz-tour.mp4`.

For smooth seeking, H.264 with a short keyframe interval is recommended. For example (edit file names as needed):

```bash
ffmpeg -i source.mp4 -an -vf "scale=1280:-2,fps=30" -c:v libx264 -crf 21 -preset medium -pix_fmt yuv420p -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart public/media/laz-tour.mp4
```

The source can be a walkthrough, shoot that moves from the glass ceiling toward the atrium, or an edited campus montage. For demanding mobile devices, a pre-extracted WebP/JPEG image-sequence solution may perform better than arbitrary MP4 seeking.

## Layout / code structure

```text
src/
  App.jsx                      Main page, section structure, Lenis setup
  main.jsx                     React entry point
  styles.css                   Typography, styles, responsive rules
  components/
    Header.jsx                 Navbar + mobile menu
    Hero.jsx                   Pinned hero / falling leaf
    RoofTrace.jsx              SVG path drawing on boot
    MapleLeaf.jsx              Custom vector leaf
    FilmChapter.jsx            Video scroll-scrubbing + visual fallback
    Reveal.jsx                 Scroll-triggered section entrances
public/
  favicon.svg
  media/
    hero-fallback.svg          Local architectural illustration
    film-poster.svg            Fallback visual for film chapter
    laz-hero.jpg               ADD YOUR ORIGINAL PHOTO HERE
    laz-tour.mp4               ADD YOUR VIDEO HERE

docs/
  creative-plan.md            Full creative direction + phased roadmap
  CODEX_PROMPTS.md            Next-step prompts for Codex
```

## Production checklist

- Replace prototype illustration and video with **cleared-for-use** LazSoc/Laurier media.
- Match roof SVG paths to the final image (do not assume current SVG geometry is pixel-accurate).
- Verify club brand/logo styles with the LazSoc team; current wordmark is a concept mark.
- Add CMS or data source for real events, teams and clubs.
- Compress images, encode video for seeking, consider CDN delivery and test mobile Safari.
- Keyboard/contrast audit, Lighthouse tests, and QA across devices.
- Use relative links for actual pages once a routing strategy is chosen.

This is a *working prototype*, not an approved official LazSoc deployment.
