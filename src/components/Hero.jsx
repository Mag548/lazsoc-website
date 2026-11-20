import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RoofTrace from './RoofTrace';

gsap.registerPlugin(ScrollTrigger);

const images = ['/media/laz-hero.jpg?v=traced', '/media/hero-fallback.svg'];
const PHOTO = { width: 682, height: 1024, alignY: 0.42 };

function coverFrame(width, height) {
  const scale = Math.max(width / PHOTO.width, height / PHOTO.height);
  const frameWidth = PHOTO.width * scale;
  const frameHeight = PHOTO.height * scale;
  return {
    position: 'absolute',
    left: (width - frameWidth) * 0.5,
    top: (height - frameHeight) * PHOTO.alignY,
    width: frameWidth,
    height: frameHeight,
  };
}

export default function Hero({ reducedMotion }) {
  const root = useRef(null);
  const stage = useRef(null);
  const photo = useRef(null);
  const lead = useRef(null);
  const kicker = useRef(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [frame, setFrame] = useState(null);

  useLayoutEffect(() => {
    const element = photo.current;
    if (!element) return undefined;
    const fit = () => {
      const width = element.clientWidth;
      const height = element.clientHeight;
      if (!width || !height) return;
      const next = coverFrame(width, height);
      setFrame((current) => {
        if (!current) return next;
        const same = ['left', 'top', 'width', 'height'].every((key) => Math.abs(current[key] - next[key]) < 0.5);
        return same ? current : next;
      });
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!root.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(lead.current.querySelectorAll('.hero-word'),
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.15, stagger: 0.14, ease: 'power4.out', delay: 0.72 }
      );
      gsap.fromTo(kicker.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 1.45 });
      gsap.set(photo.current, { filter: 'brightness(1) saturate(1)' });
      const journey = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=210%',
          scrub: 0.85,
          pin: stage.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      journey
        .to(photo.current, { scale: 1.15, filter: 'brightness(.61) saturate(.70)', duration: 1 }, 0)
        .to(lead.current, { yPercent: -12, opacity: 0.18, duration: 0.48 }, 0.26)
        .to('.hero__scroll', { opacity: 0, duration: 0.2 }, 0)
        .to('.hero__handoff', { opacity: 1, y: 0, duration: 0.2 }, 0.75);
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section className="hero" id="top" ref={root} aria-label="LazSoc introduction">
      <div className="hero__stage" ref={stage}>
        <div className="hero__image-wrap" ref={photo}>
          <img className="hero__image" style={frame ?? undefined} src={images[imageIndex]} alt="Lazaridis Hall atrium and geometric glass ceiling" onError={() => setImageIndex((i) => Math.min(i + 1, images.length - 1))} />
          <div className="hero__image-shade" />
          {frame && imageIndex === 0 && <RoofTrace reducedMotion={reducedMotion} style={frame} />}
        </div>
        <div className="hero__line hero__line--left" />
        <div className="hero__line hero__line--right" />
        <div className="hero__content" ref={lead}>
          <div className="hero__eyebrow"><span className="eyebrow-line" /> THE LAZARIDIS STUDENTS' SOCIETY</div>
          <h1><span className="hero__line-text"><span className="hero-word">welcome to</span></span><span className="hero__line-text"><span className="hero-word hero-word--italics">lazsoc</span></span></h1>
          <div className="hero__intro" ref={kicker}><span>Built on ambition.</span><span>Powered by community.</span></div>
        </div>
        <div className="hero__scroll"><span>SCROLL TO EXPLORE</span><div className="hero__scroll-mark"><div /></div><span>01 — 04</span></div>
        <div className="hero__handoff" aria-hidden="true"><span>ONE COMMUNITY.</span><strong>ENDLESS POSSIBILITY.</strong></div>
        <span className="hero__photo-credit">LAZARIDIS HALL / WATERLOO, ON</span>
      </div>
    </section>
  );
}
