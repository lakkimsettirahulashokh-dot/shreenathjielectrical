import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, X, MessageSquare, ChevronLeft, ChevronRight, ShieldCheck, Zap, ArrowRight, Award } from 'lucide-react';
import { GALLERY_ITEMS } from '../constants/panelImages';
import { BUSINESS_DATA } from '../constants/businessData';

const CATEGORIES = [
  'All Works',
  'In-House Panels',
  'Power Distribution',
  'APFC & Busbar',
  'Automation & PLC'
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All Works');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Filter items
  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (selectedCategory === 'All Works') return true;
    if (selectedCategory === 'In-House Panels') {
      return item.badge && (item.badge.includes('In-House') || item.badge.includes('Custom') || item.badge.includes('Craftsmanship') || item.badge.includes('Workshop'));
    }
    if (selectedCategory === 'Power Distribution') {
      return item.category.includes('Distribution') || item.category.includes('LT');
    }
    if (selectedCategory === 'APFC & Busbar') {
      return item.category.includes('APFC') || item.category.includes('Busbar') || item.title.includes('Busbar');
    }
    if (selectedCategory === 'Automation & PLC') {
      return item.category.includes('Automation') || item.category.includes('PLC') || item.category.includes('VFD') || item.category.includes('Wiring') || item.category.includes('MCC');
    }
    return true;
  });

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  const showNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <main className="gallery-page">
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <div className="container">
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="breadcrumb-current">Gallery</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section-padding gallery-hero-section">
        <div className="container">
          <div className="section-header" style={{ marginBottom: '24px' }}>
            <span className="section-tag">Engineering Portfolio</span>
            <h1 className="section-title">ELECTRICAL PANEL GALLERY</h1>
            <p className="section-subtitle">
              Explore authentic photographs of custom-built Low Tension (LT) switchgear, automatic capacitor banks, 
              solar power distribution centers, and precision automation panels manufactured by Shreenathji Electrical.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="gallery-filter-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`gallery-filter-btn ${selectedCategory === cat ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Cards Grid */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="gallery-cards-grid">
            {filteredItems.map((item, idx) => {
              const isContainFit = 
                item.badge === 'HMI Automation' || 
                item.badge === 'Overhead Feeder Link' || 
                item.id === 'gal-delta-hmi-touchscreen' || 
                item.id === 'gal-overhead-incoming-apfc';

              return (
                <article 
                  key={item.id} 
                  className="gallery-card"
                  onClick={() => openLightbox(idx)}
                  title={`Click to view ${item.title}`}
                >
                  <div className={`gallery-card-img-wrap ${isContainFit ? 'is-contain-wrap' : ''}`}>
                    <img
                      src={item.src}
                      alt={item.alt}
                      className={`gallery-card-img ${isContainFit ? 'is-contain-fit' : ''}`}
                      loading="lazy"
                    />
                    {item.badge && <span className="gallery-card-badge">{item.badge}</span>}
                    <div className="gallery-card-hover-overlay">
                      <span className="gallery-hover-cta">
                        <Eye size={20} /> View Full Photo
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="section-padding" style={{ backgroundColor: 'var(--brand-charcoal-dark)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="badge-pill" style={{ marginBottom: '16px' }}>
            <Award size={16} className="text-orange" />
            <span>Custom Engineering &amp; Fast Delivery</span>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '14px' }}>
            Need a Custom Electrical Panel for Your Project?
          </h2>
          <p style={{ color: '#94A3B8', maxWidth: '640px', margin: '0 auto 28px auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Send us your single line diagram (SLD) or load requirements. Our Rajkot engineering team delivers precision-wired, 
            safety-tested switchboards backed by 10+ years of industrial expertise.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/power-requirement" className="btn btn-primary">
              <Zap size={18} />
              Calculate Power Requirement
            </Link>
            <a 
              href={BUSINESS_DATA.whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary"
            >
              <MessageSquare size={18} />
              WhatsApp Us: +91 98240 75278
            </a>
          </div>
        </div>
      </section>

      {/* Full-Screen Interactive Lightbox Modal */}
      {currentItem && (
        <div 
          className="gallery-lightbox-modal"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={currentItem.title}
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button" 
              className="lightbox-close-btn" 
              onClick={closeLightbox}
              aria-label="Close image viewer"
            >
              <X size={24} />
            </button>

            {/* Navigation arrows */}
            <button 
              type="button" 
              className="lightbox-nav-btn lightbox-prev" 
              onClick={showPrev}
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>
            <button 
              type="button" 
              className="lightbox-nav-btn lightbox-next" 
              onClick={showNext}
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>

            <div className="lightbox-img-wrapper">
              <img
                src={currentItem.src}
                alt={currentItem.alt}
                className="lightbox-main-img"
              />
            </div>

            <div className="lightbox-info-bar">
              <div>
                <span className="lightbox-badge">{currentItem.category}</span>
                <h3 className="lightbox-title">{currentItem.title}</h3>
                <p className="lightbox-desc">{currentItem.description}</p>
              </div>
              <a
                href={`https://wa.me/919824075278?text=${encodeURIComponent(`Hello Shreenathji Electrical, I am viewing the ${currentItem.title} in your gallery and have an inquiry.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
                style={{ flexShrink: 0, gap: '8px', whiteSpace: 'nowrap' }}
              >
                <MessageSquare size={16} />
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
