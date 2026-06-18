import { useState } from 'react';
import './bloodbank.css';

function Navbar({
  brand = 'BloodBank',
  links = [
    { label: 'Home', href: '#home' },
    { label: 'Blood Stock', href: '#blood-stock' },
    { label: 'Donate', href: '#donor-form' },
    { label: 'Contact', href: '#contact' },
  ],
  onAction,
  actionLabel = 'Emergency Request',
}) {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <header className="bb-nav">
      <div className="bb-shell bb-nav__inner">
        <a className="bb-brand" href="#home" onClick={handleLinkClick}>
          <span className="bb-brand__mark">B</span>
          <span className="bb-brand__meta">
            <span className="bb-brand__name">{brand}</span>
            <span className="bb-brand__tag">Blood donation and request portal</span>
          </span>
        </a>

        <button
          className="bb-nav__toggle"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          <span />
        </button>

        <nav className={`bb-nav__menu ${open ? 'bb-nav__menu--open' : ''}`} aria-label="Primary navigation">
          <div className="bb-nav__links">
            {links.map((link) => (
              <a className="bb-nav__link" href={link.href} key={link.label} onClick={handleLinkClick}>
                {link.label}
              </a>
            ))}
          </div>
          <button className="bb-button bb-button--primary" type="button" onClick={onAction}>
            {actionLabel}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
