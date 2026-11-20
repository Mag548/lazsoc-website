import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-scrub video: replace /public/media/laz-tour.mp4 with real footage.
 * On a missing file, a photo-based animated storyboard remains visible.
 * Encode video with frequent keyframes (see README) for good seeking quality.
 */
export default function FilmChapter({ reducedMotion }) {
  const section = useRef(null);
  const stage = useRef(null);
  const video = useRef(null);
  const progress = useRef(null);
  const picture = useRef(null);
  const [hasVideo, setHasVideo] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useLayoutEffect(() => {
    if (reducedMotion || !section.current || !stage.current) return;
    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: section.current,
        start: 'top top',
        end: '+=190%',
        pin: stage.current,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: ({ progress: p }) => {
          if (progress.current) progress.current.style.transform = `scaleX(${Math.max(0.012, p)})`;
          if (video.current && video.current.readyState >= 2 && video.current.duration > 0) {
            const target = Math.min(video.current.duration - 0.06, video.current.duration * p);
            if (Number.isFinite(target) && Math.abs(video.current.currentTime - target) > 0.055) {
              try { video.current.currentTime = target; } catch { /* seeking not ready */ }
            }
          }
          if (picture.current) {
            picture.current.style.transform = `scale(${1.04 + p * 0.16}) translateY(${p * -2}%)`;
          }
        },
      });
      return () => trigger.kill();
    }, section);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section className="film" id="experience" ref={section} aria-label="Lazaridis experience film">
      <div className="film__stage" ref={stage}>
        <div className="film__picture" ref={picture} aria-hidden="true" />
        <video ref={video} className={`film__video${hasVideo && !videoFailed ? ' film__video--ready' : ''}`} muted playsInline preload="auto" onLoadedMetadata={() => { setHasVideo(true); ScrollTrigger.refresh(); }} onError={() => setVideoFailed(true)} aria-label="Campus footage scrubbed by scrolling">
          <source src="/media/laz-tour.mp4" type="video/mp4" />
        </video>
        <div className="film__veil" />
        <div className="film__topline"><span>CHAPTER 02 / LIFE AT LAZ</span><span>{hasVideo && !videoFailed ? 'SCROLL TO PLAY' : 'SCROLL THROUGH THE STORY'}</span></div>
        <div className="film__content">
          <span className="section-kicker section-kicker--light">/ LIVE. LEARN. LEAD.</span>
          <h2>More than<br /><em>a building.</em></h2>
          <p>It’s the conversations between classes. The teams that become friends. The opportunities you didn’t know existed.</p>
        </div>
        <div className="film__bottom"><span>LAZARIDIS HALL · WATERLOO, ON</span><span>{hasVideo && !videoFailed ? 'A FILM CONTROLLED BY YOU' : 'REPLACE /media/laz-tour.mp4 TO ENABLE VIDEO'}</span></div>
        <div className="film__progress"><div ref={progress} /></div>
      </div>
    </section>
  );
}
