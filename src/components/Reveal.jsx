import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
export default function Reveal({ children, className = '', reducedMotion = false, delay = 0 }) {
  const element = useRef(null);
  useLayoutEffect(() => {
    if (reducedMotion || !element.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(element.current, { y: 48, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.05, delay, ease: 'power3.out',
        scrollTrigger: { trigger: element.current, start: 'top 90%', once: true },
      });
    }, element);
    return () => ctx.revert();
  }, [reducedMotion, delay]);
  return <div className={className} ref={element}>{children}</div>;
}
