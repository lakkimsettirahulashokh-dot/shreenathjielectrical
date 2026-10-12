import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, MessageSquare, ChevronRight, Clock } from 'lucide-react';
import { BUSINESS_DATA } from '../constants/businessData';

// Official Instagram SVG Icon
function InstagramIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

// Official WhatsApp SVG Icon
function WhatsAppIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.201.3-.778.978-.954 1.179-.176.2-.351.226-.652.075s-1.272-.469-2.424-1.496c-.896-.799-1.501-1.786-1.677-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.201-.301.301-.502.101-.2.05-.376-.025-.527-.075-.15-.678-1.633-.929-2.237-.245-.588-.493-.508-.678-.518-.176-.009-.376-.011-.577-.011-.201 0-.527.075-.803.376s-1.054 1.029-1.054 2.509 1.079 2.911 1.229 3.112c.15.201 2.124 3.243 5.145 4.549.718.311 1.279.497 1.716.636.722.23 1.379.197 1.9.119.58-.088 1.78-.727 2.031-1.429.251-.702.251-1.304.176-1.43-.075-.125-.276-.201-.577-.351zM12.04 2C6.516 2 2.028 6.488 2.028 12.012c0 1.839.497 3.565 1.364 5.062L2 22l5.067-1.328a9.96 9.96 0 0 0 4.973 1.34h.004c5.524 0 10.012-4.488 10.012-10.012A9.97 9.97 0 0 0 12.04 2zm0 18.288h-.003a8.27 8.27 0 0 1-4.218-1.157l-.302-.18-3.136.822.837-3.057-.197-.314a8.267 8.267 0 0 1-1.267-4.39c0-4.57 3.719-8.289 8.289-8.289a8.26 8.26 0 0 1 5.861 2.428 8.26 8.26 0 0 1 2.428 5.861c0 4.571-3.719 8.289-8.289 8.289z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Business Brand & Overview */}
          <div className="footer-col">
            <Link 
              to="/" 
              className="brand-link footer-brand-link"
              style={{ 
                textDecoration: 'none', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '14px', 
                marginBottom: '16px' 
              }} 
              aria-label="Shreenathji Electrical Home"
            >
              <img
                src="/se-logo-footer-white.png"
                alt="SHREENATHJI ELECTRICAL"
                className="footer-logo-img"
                style={{
                  height: '48px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
              <div 
                className="brand-text-wrap" 
                style={{ 
                  display: 'inline-flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  width: 'fit-content' 
                }}
              >
                <span 
                  className="brand-title-shreenathji" 
                  style={{ 
                    color: '#FFFFFF', 
                    fontSize: '1.35rem', 
                    fontWeight: 900,
                    textAlign: 'center', 
                    display: 'block', 
                    width: '100%',
                    lineHeight: 1.15
                  }}
                >
                  {BUSINESS_DATA.brandNameFirst}
                </span>
                <span 
                  className="brand-title-electrical" 
                  style={{ 
                    color: 'var(--brand-orange)',
                    fontSize: '1.0rem', 
                    fontWeight: 800,
                    letterSpacing: '2.5px',
                    textIndent: '2.5px',
                    textAlign: 'center', 
                    display: 'block', 
                    width: '100%',
                    lineHeight: 1.15
                  }}
                >
                  {BUSINESS_DATA.brandNameSecond}
                </span>
              </div>
            </Link>
            <p style={{ color: '#FFA46B', fontWeight: '600', fontSize: '0.95rem', marginBottom: '18px', lineHeight: '1.4' }}>
              {BUSINESS_DATA.tagline}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: '#B4C2D1' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: 'var(--brand-orange)', flexShrink: 0, marginTop: '3px' }} />
                <span>{BUSINESS_DATA.fullAddress}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Clock size={18} style={{ color: 'var(--brand-orange)', flexShrink: 0 }} />
                <span>{BUSINESS_DATA.businessHours}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Phone size={18} style={{ color: 'var(--brand-orange)', flexShrink: 0 }} />
                <a href={`tel:${BUSINESS_DATA.phone}`} style={{ color: '#FFFFFF', fontWeight: '600' }}>
                  {BUSINESS_DATA.phone}
                </a>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Mail size={18} style={{ color: 'var(--brand-orange)', flexShrink: 0 }} />
                <a href={`mailto:${BUSINESS_DATA.email}`} style={{ color: '#FFFFFF' }}>
                  {BUSINESS_DATA.email}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">QUICK LINKS</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item">
                <Link to="/">
                  <ChevronRight size={14} style={{ color: 'var(--brand-orange)' }} /> Home
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/products">
                  <ChevronRight size={14} style={{ color: 'var(--brand-orange)' }} /> Products
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/gallery">
                  <ChevronRight size={14} style={{ color: 'var(--brand-orange)' }} /> Gallery
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/services">
                  <ChevronRight size={14} style={{ color: 'var(--brand-orange)' }} /> Services
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/power-requirement">
                  <ChevronRight size={14} style={{ color: 'var(--brand-orange)' }} /> Power Requirement
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/about-us">
                  <ChevronRight size={14} style={{ color: 'var(--brand-orange)' }} /> About Us
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/store">
                  <ChevronRight size={14} style={{ color: 'var(--brand-orange)' }} /> Store
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/contact">
                  <ChevronRight size={14} style={{ color: 'var(--brand-orange)' }} /> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Us with Instagram and WhatsApp Icons */}
          <div className="footer-col">
            <h4 className="footer-col-title">CONTACT US</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <a
                href={`tel:${BUSINESS_DATA.phone}`}
                className="footer-call-action-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'linear-gradient(135deg, rgba(243, 112, 33, 0.16) 0%, rgba(255, 255, 255, 0.05) 100%)',
                  border: '1.5px solid var(--brand-orange)',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 15px rgba(243, 112, 33, 0.2)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                aria-label={`Call ${BUSINESS_DATA.name} at ${BUSINESS_DATA.phone}`}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--brand-orange)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(243, 112, 33, 0.5)'
                }}>
                  <Phone size={20} />
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#FFA46B', display: 'block', fontWeight: '700', letterSpacing: '0.5px' }}>
                    Tap to Call Directly
                  </span>
                  <span style={{ fontSize: '1.05rem', fontWeight: '800', color: '#FFFFFF', display: 'block', letterSpacing: '0.3px' }}>
                    {BUSINESS_DATA.phone}
                  </span>
                </div>
              </a>

              <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '12px 14px', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94A3B8', display: 'block' }}>Email Support</span>
                <a href={`mailto:${BUSINESS_DATA.email}`} style={{ fontSize: '0.9rem', color: '#FFA46B', wordBreak: 'break-all' }}>
                  {BUSINESS_DATA.email}
                </a>
              </div>

              {/* Instagram and WhatsApp Icons Only */}
              <div className="footer-contact-social-icons">
                <a
                  href={BUSINESS_DATA.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon-btn instagram"
                  aria-label="Instagram"
                  title="Follow us on Instagram"
                >
                  <InstagramIcon size={22} color="#FFFFFF" />
                </a>
                <a
                  href={BUSINESS_DATA.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon-btn whatsapp"
                  aria-label="WhatsApp"
                  title="Chat with us on WhatsApp"
                >
                  <WhatsAppIcon size={22} color="#FFFFFF" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-container">
            <div className="footer-copyright">
              © 2026 {BUSINESS_DATA.name}. All Rights Reserved.
            </div>
            <div className="footer-legal-links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <span style={{ color: '#475569' }}>|</span>
              <Link to="/terms-and-conditions">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
