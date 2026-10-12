import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone, Mail, MessageSquare, Navigation, Building } from 'lucide-react';
import { BUSINESS_DATA } from '../constants/businessData';

export default function Store() {
  return (
    <main>
      {/* Breadcrumb */}
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <div className="container">
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="breadcrumb-current">Store</span>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-surface-soft)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: 0 }}>
            <span className="section-tag">Visit Our Facility</span>
            <h1 className="section-title">OUR STORE</h1>
            <p className="section-subtitle">
              Visit our workshop and store in Rajkot for industrial electrical panel components, switchgear consultation, fitting inquiries, and repair drop-offs.
            </p>
          </div>
        </div>
      </section>

      {/* Store Information Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="store-contact-grid">
            {/* Info Cards Stack */}
            <div className="info-cards-stack">
              <div style={{ marginBottom: '8px' }}>
                <span className="section-tag">Direct Contact</span>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--brand-charcoal)', marginBottom: '8px' }}>
                  {BUSINESS_DATA.name}
                </h2>
                <p style={{ color: 'var(--brand-orange)', fontWeight: '700', fontSize: '1.05rem' }}>
                  {BUSINESS_DATA.tagline}
                </p>
              </div>

              {/* Address Card */}
              <div className="info-card-item">
                <div className="info-icon-wrap">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="info-title">Store &amp; Workshop Address</h3>
                  <p className="info-desc">
                    {BUSINESS_DATA.addressLine1}<br />
                    {BUSINESS_DATA.addressLine2}<br />
                    {BUSINESS_DATA.addressLine3}<br />
                    <strong>{BUSINESS_DATA.addressCity}</strong>
                  </p>
                </div>
              </div>

              {/* Hours Card */}
              <div className="info-card-item">
                <div className="info-icon-wrap">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="info-title">Business Hours</h3>
                  <p className="info-desc">
                    {BUSINESS_DATA.businessHours}
                  </p>
                </div>
              </div>

              {/* Phone Card */}
              <div className="info-card-item">
                <div className="info-icon-wrap">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="info-title">Phone Number</h3>
                  <p className="info-desc">
                    <a href={`tel:${BUSINESS_DATA.phone}`} style={{ color: 'var(--brand-charcoal)', fontWeight: '700' }}>
                      {BUSINESS_DATA.phone}
                    </a>
                  </p>
                </div>
              </div>

              {/* Email Card */}
              <div className="info-card-item">
                <div className="info-icon-wrap">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="info-title">Email Address</h3>
                  <p className="info-desc">
                    <a href={`mailto:${BUSINESS_DATA.email}`} style={{ color: 'var(--brand-charcoal)', fontWeight: '600' }}>
                      {BUSINESS_DATA.email}
                    </a>
                  </p>
                </div>
              </div>

              {/* Action Buttons: CALL NOW, WHATSAPP, GET DIRECTIONS */}
              <div className="action-buttons-group">
                <a href={`tel:${BUSINESS_DATA.phone}`} className="btn btn-secondary">
                  <Phone size={18} /> CALL NOW
                </a>
                <a href={BUSINESS_DATA.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <MessageSquare size={18} /> WHATSAPP
                </a>
                <a href={BUSINESS_DATA.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  <Navigation size={18} /> GET DIRECTIONS
                </a>
              </div>
            </div>

            {/* Google Maps Container Card */}
            <div className="map-container-card">
              <div style={{ background: 'var(--brand-charcoal)', color: '#FFFFFF', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>
                  Location: Gondal Road, Near D-Mart, Rajkot
                </span>
                <a
                  href={BUSINESS_DATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--brand-orange)', fontSize: '0.85rem', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  Open in Google Maps &gt;
                </a>
              </div>

              <iframe
                title="Shreenathji Electrical Store Location"
                src={BUSINESS_DATA.googleMapsEmbed}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
