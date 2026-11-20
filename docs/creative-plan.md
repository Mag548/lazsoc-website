# LazSoc creative plan — First edition

## North star

**“A place to become.”** Turn the iconic geometry of Lazaridis Hall into an identity system: the roof is drawn, a gold Laurier-inspired maple leaf breaks away, and the audience follows it into the building and the people inside.

## Art direction

- **Style:** cinematic institutional editorial; Awwwards-inspired by scroll choreography and large typography, not by copying an existing website.
- **Palette:** deep blue-black `#0c1017`, warm ivory `#f5f0e6`, soft metal gold `#d7b572`.
- **Typography:** Manrope for large expressive statements; DM Sans for editorial UI; Georgia italic for contrasting human warmth.
- **Image language:** one strong architectural image rather than a collage. Large negative space and directional light. Later: licensed student event photography.
- **Motion:** meaningful, quiet and premium. Draw and leaf should feel like one uninterrupted shot.

## The 4-chapter journey

| Chapter | Experience | Technical approach | State |
|---|---|---|---|
| 01 — Arrival | Photo of ceiling appears; lattice traces itself over ~2.3s; title reveals | SVG `stroke-dashoffset`, GSAP timeline | Implemented with approximate geometry; needs original photo tracing |
| 01b — Leaf | Warm maple leaf drifts, rotates and falls as viewer scrolls; scroll reversal works | Pinned ScrollTrigger scrub | Implemented |
| 02 — Into Laz | Space transitions to cinematic atrium footage whose timeline follows scrolling | Pinned ScrollTrigger / video seek | Implemented with film fallback; real video pending |
| 03 — Community | Big typography, student opportunities, minimal motion | ScrollTrigger entrance | Implemented with conceptual copy |
| 04 — Invitation | End card invites the visitor to the real LazSoc platform | CTA to lazsoc.ca | Implemented |

## Motion specification

- Intro trace lasts ~2.3s; centered stagger ~19ms per line; trace dimmed after completion for legibility.
- Leaf moves on a long (~210% viewport) scroll; x translation swings and rotation simulate changing air currents.
- Hero and film are pinned separately. No autoplay footage; user controls position through scroll.
- Smooth-wheel motion is handled by one Lenis instance synced to GSAP ticker on desktop only.
- Reduced-motion devices get static page chapters without pins or moving leaf.

## Milestones

**Phase A — concept MVP (this package)**
Working sections, visual identity, SVG trace, leaf, scroll-controlled video component, responsive foundations.

**Phase B — asset fidelity**
Integrate the exact hero photo, hand-trace roof beam intersections, add approved LazSoc leaf icon, capture film footage, tune colour grade and cinematic transition.

**Phase C — club ecosystem**
Real clubs directory, search, event content/links, team pages, partner banners, applications and contact information. Design with content source and accessibility in mind.

**Phase D — release**
Lighthouse and browser QA, reduced-motion auditing, copyright/accessibility review, CMS integration, deployment and domain preparation.

## Success criteria

1. Hero clearly shows the correct ceiling and convincingly draws **the photographed roof**, not merely a generic grid.
2. Leaf motion tracks scroll forward and backward with no visible jumps.
3. Film progresses smoothly and can reverse; mobile fallback remains pleasant.
4. Main content is readable and navigable without JS motion, and on a phone.
5. Team can independently edit assets and content in Codex or VS Code.
