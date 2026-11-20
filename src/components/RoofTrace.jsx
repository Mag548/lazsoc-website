import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { roofStrokes, roofViewBox } from '../data/roofSketch';

gsap.registerPlugin(DrawSVGPlugin);

const CROWN_X = 682;
const CROWN_Y = 760;

function endpoints(d) {
  const nums = d.match(/-?\d*\.?\d+/g).map(Number);
  return {
    x1: nums[0],
    y1: nums[1],
    x2: nums[nums.length - 2],
    y2: nums[nums.length - 1],
  };
}

function strokeMeta(stroke, element) {
  const { x1, y1, x2, y2 } = endpoints(stroke.d);
  const x = (x1 + x2) / 2;
  const y = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const family = stroke.group !== 'diagonal-lattice' ? null : (dx * dy >= 0 ? 'a' : 'b');
  const along = family === 'b' ? x - y : x + y;
  const across = family === 'b' ? x + y : x - y;
  return {
    el: element,
    group: stroke.group,
    family,
    x,
    y,
    x1,
    y1,
    x2,
    y2,
    along,
    across,
    along1: family === 'b' ? x1 - y1 : x1 + y1,
    along2: family === 'b' ? x2 - y2 : x2 + y2,
    dist: Math.hypot(x - CROWN_X, y - CROWN_Y),
  };
}

function byDistance(items) {
  return [...items].sort((a, b) => a.dist - b.dist);
}

function threads(items, bin) {
  const bins = new Map();
  items.forEach((item) => {
    const key = Math.round(item.across / bin);
    if (!bins.has(key)) bins.set(key, []);
    bins.get(key).push(item);
  });
  const rows = [...bins.values()];
  const middle = (rows.length - 1) / 2;
  return rows
    .map((segs, index) => ({ segs, rank: Math.abs(index - middle), reverse: index % 2 === 1 }))
    .sort((a, b) => a.rank - b.rank);
}

export default function RoofTrace({ reducedMotion = false, style }) {
  const svg = useRef(null);

  useLayoutEffect(() => {
    const root = svg.current;
    if (!root) return undefined;

    const paths = root.querySelectorAll('.trace-line');
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(paths, { drawSVG: '100%' });
        gsap.set(root, { opacity: 0.7 });
        return;
      }

      const strokes = roofStrokes.map((stroke) => strokeMeta(stroke, root.querySelector(`#${stroke.id}`)));
      const ribs = strokes.filter((stroke) => stroke.group === 'cross-ribs');
      const rays = strokes.filter((stroke) => stroke.group === 'foreground-rays');
      const leanA = strokes.filter((stroke) => stroke.family === 'a');
      const leanB = strokes.filter((stroke) => stroke.family === 'b');

      gsap.set(paths, { drawSVG: '0%' });
      gsap.set(root, { opacity: 0 });

      const timeline = gsap.timeline();
      timeline.to(root, { opacity: 1, duration: 0.45, ease: 'power1.out' }, 0);

      byDistance(ribs).forEach((stroke, index, list) => {
        const spread = list.length > 1 ? (index / (list.length - 1)) * 0.95 : 0;
        timeline.fromTo(stroke.el, { drawSVG: '50% 50%' }, {
          drawSVG: '0% 100%',
          duration: 0.85,
          ease: 'power2.out',
        }, 0.08 + spread);
      });

      const weave = (items, at) => {
        threads(items, 52).forEach((thread, threadIndex) => {
          const segs = [...thread.segs].sort((a, b) => a.along - b.along);
          if (thread.reverse) segs.reverse();
          segs.forEach((stroke, segIndex) => {
            const lowFirst = stroke.along1 <= stroke.along2;
            const reverse = lowFirst === thread.reverse;
            timeline.fromTo(stroke.el, {
              drawSVG: reverse ? '100% 100%' : '0%',
            }, {
              drawSVG: reverse ? '0% 100%' : '100%',
              duration: 0.62,
              ease: 'sine.inOut',
            }, at + threadIndex * 0.042 + segIndex * 0.07);
          });
        });
      };

      weave(leanA, 0.42);
      weave(leanB, 0.74);

      byDistance(rays).reverse().forEach((stroke, index) => {
        const fromTop = stroke.y2 < stroke.y1;
        timeline.fromTo(stroke.el, {
          drawSVG: fromTop ? '100% 100%' : '0%',
        }, {
          drawSVG: fromTop ? '0% 100%' : '100%',
          duration: 0.7,
          ease: 'power2.inOut',
        }, 1.25 + index * 0.04);
      });

      timeline.to(root, { opacity: 0.84, duration: 0.7, ease: 'power1.inOut' }, 2.45);
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <svg
      ref={svg}
      className="roof-trace"
      style={style}
      viewBox={`0 0 ${roofViewBox.width} ${roofViewBox.height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {roofStrokes.map((stroke) => (
        <path key={stroke.id} id={stroke.id} className="trace-line" d={stroke.d} />
      ))}
    </svg>
  );
}
