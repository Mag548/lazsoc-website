import { useEffect, useState } from 'react';

const links = [
  ['#top', 'Home'],
  ['#about', 'about'],
  ['#involved', 'get involved'],
  ['#shop', 'shop'],
  ['#resources', 'resources'],
];

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="LazSoc home">
      <svg className="brand__symbol" viewBox="0 0 44 44" aria-hidden="true">
        <path d="M22 3 17 15 9 10l3 11-9 2 9 8-3 8 12-5 1 7 2-7 11 5-3-8 9-8-9-2 3-11-8 5Z" fill="currentColor" />
        <path d="M22 22v20" stroke="#12141b" strokeWidth="1.5" />
      </svg>
      <span>laz<span className="brand__accent">soc</span><small>STUDENTS' SOCIETY</small></span>
    </a>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);
  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <Brand />
      <nav className={`site-header__nav${menuOpen ? ' site-header__nav--open' : ''}`} aria-label="Main navigation">
        {links.map(([href, title]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{title}</a>)}
      </nav>
      <div className="site-header__actions">
        <a className="nav-cta" href="https://lazsoc.ca/" target="_blank" rel="noreferrer">Current LazSoc site <span>↗</span></a>
        <button className={`menu-toggle${menuOpen ? ' menu-toggle--open' : ''}`} type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}>
          <span /><span />
        </button>
      </div>
    </header>
  );
}
