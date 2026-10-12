import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Check, MessageSquare, ArrowRight, Eye, X, Image as ImageIcon } from 'lucide-react';
import { BUSINESS_DATA, PANEL_SOLUTIONS } from '../constants/businessData';

export default function Panels() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <main>
      {/* Page Breadcrumb & Header */}
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <div className="container">
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="breadcrumb-current">Panels</span>
        </div>
      </nav>

      {/* Page Hero */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-surface-soft)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: 0 }}>
            <span className="section-tag">Industrial Manufacturing</span>
            <h1 className="section-title">PANEL SOLUTIONS</h1>
            <p className="section-subtitle">
              We design, fabricate, wire, and test custom Low Tension (LT) and Industrial Electrical Control Panels built to stringent electrical safety codes. Engineered for endurance, optimum protection, and dependable service.
            </p>
          </div>
        </div>
      </section>

      {/* Workshop Gallery Quick Callout */}
      <section style={{ backgroundColor: 'var(--brand-charcoal-dark)', padding: '24px 0', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(243, 112, 33, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-orange)', flexShrink: 0 }}>
              <ImageIcon size={22} />
            </div>
            <div>
              <span style={{ color: 'var(--brand-orange)', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>
                Authentic Manufacturing Portfolio
              </span>
              <p style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: '700', margin: 0 }}>
                Looking for actual photos of our manufactured panels and workshop wiring?
              </p>
            </div>
          </div>
          <Link to="/gallery" className="btn btn-primary btn-sm" style={{ gap: '8px' }}>
            <span>Explore Workshop Gallery</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Panels Grid (AI-Generated Engineering Catalog) */}
      <section className="section-padding">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Engineering Catalog</span>
            <h2 className="section-title">ALL PANEL CATEGORIES &amp; SYSTEMS</h2>
            <p className="section-subtitle">
              Explore our full range of standardized and custom-engineered power control, motor automation, and industrial distribution systems.
            </p>
          </div>

          <div className="panels-grid">
            {PANEL_SOLUTIONS.map((panel) => (
              <article key={panel.id} className="panel-card">
                <div 
                  className="panel-card-img-wrap" 
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedImage(panel)}
                  title={`Click to view full photo of ${panel.title}`}
                >
                  <img
                    src={panel.image}
                    alt={`${panel.title} manufactured by Shreenathji Electrical`}
                    className="panel-card-img"
                  />
                  <div className="panel-badge">{panel.badge}</div>
                  <div className="panel-gallery-overlay">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '600' }}>
                      <Eye size={16} /> Click to Enlarge
                    </span>
                  </div>
                </div>
                <div className="panel-card-body">
                  <h2 className="panel-card-title">{panel.title}</h2>
                  <p className="panel-card-desc">{panel.description}</p>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: '700', color: 'var(--brand-orange)', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
                      Key Engineering Specifications
                    </span>
                    <ul className="panel-feature-list">
                      {panel.features.map((feat, idx) => (
                        <li key={idx} className="panel-feature-item">
                          <Check size={14} style={{ color: 'var(--brand-orange)', flexShrink: 0 }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginTop: 'auto', width: '100%' }}>
                    <a
                      href={`https://wa.me/919824075278?text=${encodeURIComponent(`Hello Shreenathji Electrical, I am inquiring about your ${panel.title} solutions.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-orange panel-inquire-btn"
                    >
                      <MessageSquare size={16} className="panel-inquire-btn-icon" />
                      <span className="panel-inquire-btn-text">Inquire for {panel.title}</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom Banner */}
          <div className="custom-panel-banner" style={{ marginTop: '56px' }}>
            <div>
              <h3 style={{ color: '#FFFFFF', fontSize: '1.4rem', marginBottom: '6px' }}>
                Need a Custom-Dimensioned or Specialized Panel Board?
              </h3>
              <p style={{ color: '#CBD5E1', fontSize: '0.95rem', maxWidth: '650px' }}>
                Our engineering team develops site-specific panel layouts, dual incomer ATS schemes, busbar trunking, and turnkey switchboards tailored to your exact load requirements.
              </p>
            </div>
            <div className="custom-panel-banner-btns">
              <Link to="/power-requirement" className="btn btn-primary">
                Calculate Power Load
              </Link>
              <Link to="/contact" className="btn btn-outline" style={{ color: '#FFFFFF', borderColor: '#FFFFFF' }}>
                Contact Engineering Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="gallery-modal-overlay"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="gallery-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="gallery-modal-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image modal"
            >
              <X size={20} />
            </button>
            <img 
              src={selectedImage.image} 
              alt={selectedImage.title} 
              className="gallery-modal-img" 
            />
            <div className="gallery-modal-footer">
              <div>
                <span className="panel-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '6px' }}>
                  {selectedImage.badge}
                </span>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--brand-charcoal)', margin: 0 }}>
                  {selectedImage.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', margin: '4px 0 0 0', maxWidth: '500px' }}>
                  {selectedImage.description}
                </p>
              </div>
              <a
                href={`https://wa.me/919824075278?text=${encodeURIComponent(`Hello Shreenathji Electrical, I am inquiring about your ${selectedImage.title}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
                style={{ gap: '8px' }}
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
