import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageSquare, Calculator, Zap } from 'lucide-react';
import { BUSINESS_DATA } from '../constants/businessData';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Scroll to top and close drawer if clicking current route
  const handleHomeClick = () => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    if (location.pathname === path) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="site-header">
      <div className="container header-container">
        {/* Left: SE Logo + Business Name */}
        <Link to="/" className="brand-link" aria-label="Shreenathji Electrical Home" onClick={handleHomeClick}>
          <img
            src="/se-logo-clean.png"
            alt="SHREENATHJI ELECTRICAL Logo"
            className="brand-logo-img"
          />
          <div className="brand-text-wrap">
            <span className="brand-title-shreenathji">{BUSINESS_DATA.brandNameFirst}</span>
            <span className="brand-title-electrical">{BUSINESS_DATA.brandNameSecond}</span>
          </div>
        </Link>

        {/* Desktop Navigation (REVIEWS ARE COMPLETELY EXCLUDED) */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={handleHomeClick}>
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `nav-link ${isActive || location.pathname === '/panels' || location.pathname === '/product' ? 'active' : ''}`
            }
            onClick={() => handleNavClick('/products')}
          >
            Products
          </NavLink>
          <NavLink to="/gallery" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => handleNavClick('/gallery')}>
            Gallery
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => handleNavClick('/services')}>
            Services
          </NavLink>
          <NavLink to="/about-us" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => handleNavClick('/about-us')}>
            About Us
          </NavLink>
          <NavLink to="/store" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => handleNavClick('/store')}>
            Store
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => handleNavClick('/contact')}>
            Contact Us
          </NavLink>
          <Link to="/power-requirement" className="nav-cta-btn" onClick={() => handleNavClick('/power-requirement')}>
            Power Requirement
          </Link>
        </nav>

        {/* Mobile Header Actions (Power Requirement CTA + Menu Toggle) */}
        <div className="mobile-header-actions">
          <Link
            to="/power-requirement"
            className="mobile-header-power-btn"
            aria-label="Power Requirement"
          >
            <Calculator size={15} />
            <span className="mobile-header-power-text">Power Requirement</span>
          </Link>
          <button
            className="hamburger-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Mobile Menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu size={26} />
          </button>
        </div>
      </div>

      {/* Mobile Backdrop Overlay */}
      <div
        className={`mobile-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Slide-Over Drawer */}
      <aside className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`} aria-label="Mobile Navigation">
        <div className="mobile-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src="/se-logo-clean.png"
              alt="SHREENATHJI ELECTRICAL Logo"
              style={{ height: '46px', width: 'auto', objectFit: 'contain' }}
            />
            <div className="brand-text-wrap">
              <span className="brand-title-shreenathji" style={{ fontSize: '1.25rem' }}>{BUSINESS_DATA.brandNameFirst}</span>
              <span className="brand-title-electrical" style={{ fontSize: '0.92rem' }}>{BUSINESS_DATA.brandNameSecond}</span>
            </div>
          </div>
          <button
            className="close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Mobile Menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile Nav Links */}
        <nav className="mobile-nav-list">
          <NavLink to="/" end className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`} onClick={handleHomeClick}>
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `mobile-nav-item ${isActive || location.pathname === '/panels' || location.pathname === '/product' ? 'active' : ''}`
            }
            onClick={() => handleNavClick('/products')}
          >
            Products
          </NavLink>
          <NavLink to="/gallery" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`} onClick={() => handleNavClick('/gallery')}>
            Gallery
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`} onClick={() => handleNavClick('/services')}>
            Services
          </NavLink>
          <NavLink to="/about-us" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`} onClick={() => handleNavClick('/about-us')}>
            About Us
          </NavLink>
          <NavLink to="/store" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`} onClick={() => handleNavClick('/store')}>
            Store
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`} onClick={() => handleNavClick('/contact')}>
            Contact Us
          </NavLink>
          <NavLink
            to="/power-requirement"
            className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
            style={{ color: 'var(--brand-orange)', fontWeight: 800 }}
            onClick={() => handleNavClick('/power-requirement')}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} /> Power Requirement
            </span>
            <span style={{ fontSize: '0.72rem', background: 'var(--brand-orange)', color: '#FFFFFF', padding: '2px 8px', borderRadius: '999px' }}>
              CALCULATOR
            </span>
          </NavLink>
        </nav>

        {/* Mobile Drawer Featured Power Requirement CTA */}
        <div style={{ padding: '0 20px 16px 20px' }}>
          <Link
            to="/power-requirement"
            className="btn btn-primary"
            style={{ width: '100%', gap: '8px', minHeight: '44px', fontSize: '0.85rem' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Calculator size={18} />
            POWER REQUIREMENT
          </Link>
        </div>

        {/* Mobile Contact Information Section */}
        <div className="mobile-drawer-footer">
          <a href={`tel:${BUSINESS_DATA.phone}`} className="mobile-contact-card call">
            <div className="contact-icon">
              <Phone size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', textTransform: 'uppercase' }}>Call Us</div>
              <div style={{ fontWeight: '700' }}>{BUSINESS_DATA.phone}</div>
            </div>
          </a>

          <a
            href={BUSINESS_DATA.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-contact-card whatsapp"
          >
            <div className="contact-icon">
              <MessageSquare size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#16A34A', textTransform: 'uppercase' }}>WhatsApp</div>
              <div style={{ fontWeight: '700' }}>{BUSINESS_DATA.whatsapp}</div>
            </div>
          </a>
        </div>
      </aside>
    </header>
  );
}
