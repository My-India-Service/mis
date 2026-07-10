import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/blogs', label: 'Blog' },
    { to: '/events', label: 'Events' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className={`site-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-inner">
          <Link to="/" className="navbar-brand">
            <img src="/images/logo_my_india_2.png" alt="My India Service" />
          </Link>

          <button
            type="button"
            className="navbar-toggler"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>

          <nav className={`navbar-links ${menuOpen ? 'open' : ''}`}>
            {links.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link to="/book-call" className="navbar-cta" onClick={() => setMenuOpen(false)}>
              Book a Call
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
