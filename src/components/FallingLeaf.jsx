import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const fall = [
  { x: 0.58, y: 0.12, r: -18, s: 0.86 },
  { x: 0.4, y: 0.28, r: 22, s: 0.96 },
  { x: 0.68, y: 0.44, r: -46, s: 1.02 },
  { x: 0.32, y: 0.6, r: 84, s: 0.9 },
  { x: 0.64, y: 0.76, r: 148, s: 1.04 },
  { x: 0.46, y: 0.93, r: 214, s: 0.92 },
];

function pose(progress) {
  const span = fall.length - 1;
  const scaled = Math.min(span, Math.max(0, progress * span));
  const index = Math.min(span - 1, Math.floor(scaled));
  const t = scaled - index;
  const from = fall[index];
  const to = fall[index + 1];
  const mix = (key) => from[key] + (to[key] - from[key]) * t;
  return {
    x: mix('x') * window.innerWidth,
    y: mix('y') * window.innerHeight,
    rotation: mix('r'),
    scale: mix('s'),
    opacity: 1,
  };
}

export default function FallingLeaf({ reducedMotion }) {
  const leaf = useRef(null);

  useLayoutEffect(() => {
    if (reducedMotion || !leaf.current) return undefined;
    const ctx = gsap.context(() => {
      const progress = { value: 0 };
      gsap.set(leaf.current, pose(0));
      gsap.to(progress, {
        value: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
        onUpdate: () => gsap.set(leaf.current, pose(progress.value)),
      });
    }, leaf);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div className="hero__leaf" ref={leaf} aria-hidden="true">
      <img src="/media/laz-leaf.png" alt="" />
    </div>
  );
}
