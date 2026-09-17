import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export default function Header() {
  const location = useLocation();
  const navLinksRef = useRef(null);
  const mobileToggleRef = useRef(null);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/process', label: 'How It Works' },
    { path: '/guarantee', label: 'Guarantee' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    const toggle = mobileToggleRef.current;
    const navLinks = navLinksRef.current;
    if (!toggle || !navLinks) return;

    const handleToggle = () => {
      navLinks.classList.toggle('active');
      const isOpen = navLinks.classList.contains('active');
      toggle.textContent = isOpen ? '✕' : '☰';
      document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    };
    toggle.addEventListener('click', handleToggle);

    const links = navLinks.querySelectorAll('a');
    const closeMenu = () => {
      navLinks.classList.remove('active');
      toggle.textContent = '☰';
      document.body.style.overflow = 'auto';
    };
    links.forEach(l => l.addEventListener('click', closeMenu));

    return () => {
      toggle.removeEventListener('click', handleToggle);
      links.forEach(l => l.removeEventListener('click', closeMenu));
    };
  }, []);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="site-header">
      <div className="container">
        <nav className="navbar" aria-label="Main Navigation">
          <Link to="/" className="nav-brand" aria-label="PrismLine Home">
            <div className="brand-emblem-wrap">
              <img src="/assets/images/logo-emblem.svg" alt="PrismLine Emblem" className="brand-emblem-icon" />
            </div>
            <div className="brand-title-wrap">
              <span>PRIS<span className="brand-m">M</span>LINE</span>
            </div>
          </Link>

          <ul className="nav-links" ref={navLinksRef}>
            {navItems.map(({ path, label }) => (
              <li key={path}>
                <Link to={path} className={isActive(path) ? 'active' : ''}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <a href="tel:9952934596" className="nav-phone-link">
              <span>📞</span> +91 99529 34596
            </a>
            <Link to="/contact" className="btn-hero-primary">
              Start a Project &searr;
            </Link>
            <button className="mobile-toggle" aria-label="Toggle menu" ref={mobileToggleRef}>
              ☰
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
