import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Header from './components/Header';
import Hero from './components/Hero';
import FallingLeaf from './components/FallingLeaf';
import FilmChapter from './components/FilmChapter';
import Reveal from './components/Reveal';

gsap.registerPlugin(ScrollTrigger);

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

function useSmoothScroll(disabled) {
  useEffect(() => {
    if (disabled || window.innerWidth < 768) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.9, touchMultiplier: 1 });
    const update = (time) => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(update); lenis.destroy(); };
  }, [disabled]);
}

function Intro({ reducedMotion }) {
  return (
    <section className="intro section-padding" id="about">
      <div className="intro__top"><span className="section-kicker">ABOUT</span><span className="intro__coordinate">43°28′N 80°31′W</span></div>
      <div className="intro__body">
        <Reveal reducedMotion={reducedMotion}><h2>Not just a place<br />to <em>study.</em><span className="asterisk">✳</span></h2></Reveal>
        <Reveal className="intro__aside" delay={0.12} reducedMotion={reducedMotion}>
          <div className="intro__number">01<span>/04</span></div>
          <p>We’re the Lazaridis Students’ Society. A community of students creating experiences, connections, and opportunities beyond the classroom.</p>
          <a className="text-link" href="https://lazsoc.ca/about/team" target="_blank" rel="noreferrer">Get to know LazSoc <span>↗</span></a>
        </Reveal>
      </div>
      <div className="intro__bottom"><span>THIS IS YOUR COMMUNITY.</span><span>THIS IS YOUR MOMENT.</span></div>
    </section>
  );
}

const pillars = [
  { n: '01', title: 'Find your people.', tag: 'COMMUNITY', body: 'Where classmates become collaborators, teammates, and lifelong friends.' },
  { n: '02', title: 'Make your mark.', tag: 'OPPORTUNITY', body: 'Build skills and leadership through student-led clubs and initiatives.' },
  { n: '03', title: 'Go beyond.', tag: 'EXPERIENCE', body: 'Find the events and ideas that make your university story your own.' },
];

function Community({ reducedMotion }) {
  return (
    <section className="community section-padding" id="involved">
      <div className="community__top"><span className="section-kicker">GET INVOLVED</span><span>BUILT BY STUDENTS, FOR STUDENTS.</span></div>
      <Reveal reducedMotion={reducedMotion}><h2>Different paths.<br /><em>One Laz.</em></h2></Reveal>
      <div className="pillar-list">
        {pillars.map((p) => (
          <Reveal key={p.n} reducedMotion={reducedMotion}>
            <article className="pillar">
              <div className="pillar__number">{p.n}</div>
              <div className="pillar__title"><h3>{p.title}</h3><span className="pillar__tag">{p.tag}</span></div>
              <p>{p.body}</p><span className="pillar__arrow" aria-hidden="true">↗</span>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Shop({ reducedMotion }) {
  return (
    <section className="intro section-padding" id="shop">
      <div className="intro__top"><span className="section-kicker">SHOP</span><span>LAZSOC</span></div>
      <div className="intro__body">
        <Reveal reducedMotion={reducedMotion}><h2>Take a piece<br />of <em>Laz</em><span className="asterisk">✳</span></h2></Reveal>
        <Reveal className="intro__aside" delay={0.12} reducedMotion={reducedMotion}>
          <p>Merch and event tickets are released through the Lazaridis Students’ Society.</p>
          <a className="text-link" href="https://lazsoc.ca/" target="_blank" rel="noreferrer">Visit LazSoc <span>↗</span></a>
        </Reveal>
      </div>
    </section>
  );
}

function Resources({ reducedMotion }) {
  return (
    <section className="community section-padding" id="resources">
      <div className="community__top"><span className="section-kicker">RESOURCES</span><span>FOR LAZARIDIS STUDENTS.</span></div>
      <Reveal reducedMotion={reducedMotion}><h2>What you need,<br /><em>when you need it.</em></h2></Reveal>
      <Reveal reducedMotion={reducedMotion}>
        <p className="resource-note">Guides, forms, and contacts live with LazSoc. Use the society site for the current material.</p>
        <a className="text-link" href="https://lazsoc.ca/" target="_blank" rel="noreferrer">Open resources <span>↗</span></a>
      </Reveal>
    </section>
  );
}

function Finale({ reducedMotion }) {
  return (
    <footer className="finale" id="connect">
      <div className="finale__outer section-padding">
        <div className="finale__top"><span className="section-kicker section-kicker--light">04 / YOUR NEXT CHAPTER</span><span>THE LAZARIDIS STUDENTS' SOCIETY</span></div>
        <Reveal reducedMotion={reducedMotion}>
          <div className="finale__headline">Your story<br /><em>starts here<span>.</span></em></div>
          <a className="finale__button" href="https://lazsoc.ca/" target="_blank" rel="noreferrer">Explore LazSoc <span>↗</span></a>
        </Reveal>
      </div>
      <div className="finale__bottom"><span>© {new Date().getFullYear()} LAZSOC · CONCEPT PROTOTYPE</span><a href="#top">BACK TO TOP ↑</a><span>DESIGNED TO MOVE YOU.</span></div>
    </footer>
  );
}

export default function App() {
  const reducedMotion = useReducedMotion();
  useSmoothScroll(reducedMotion);
  return (
    <>
      <Header />
      <FallingLeaf reducedMotion={reducedMotion} />
      <main>
        <Hero reducedMotion={reducedMotion} />
        <Intro reducedMotion={reducedMotion} />
        <FilmChapter reducedMotion={reducedMotion} />
        <Community reducedMotion={reducedMotion} />
        <Shop reducedMotion={reducedMotion} />
        <Resources reducedMotion={reducedMotion} />
      </main>
      <Finale reducedMotion={reducedMotion} />
    </>
  );
}
