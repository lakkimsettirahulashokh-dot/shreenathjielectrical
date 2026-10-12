import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, User, CheckCircle2, Phone, MessageSquare } from 'lucide-react';
import { BUSINESS_DATA } from '../constants/businessData';
import VisionMission from '../components/VisionMission';
import CompetenceSection from '../components/CompetenceSection';

export default function AboutUs() {
  return (
    <main>
      {/* Breadcrumb: Home > About Us */}
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <div className="container">
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="breadcrumb-current">About Us</span>
        </div>
      </nav>

      {/* Hero Header with Professional Electrical Panel Photo */}
      <section className="hero-section" style={{ padding: '60px 0' }} aria-label="About Us Hero">
        <div 
          className="hero-bg-overlay"
          style={{ backgroundImage: `url('/images/about-panel.jpg')` }}
        />
        <div className="hero-gradient-overlay" />
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '800px' }}>
            <div className="hero-badge">
              <Award size={16} />
              <span>10+ Years of Proven Trust</span>
            </div>
            <h1 className="hero-title">
              ABOUT US
            </h1>
            <p className="hero-subheading" style={{ color: '#FFA46B' }}>
              {BUSINESS_DATA.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Section: ABOUT SHREENATHJI ELECTRICAL */}
      <section className="section-padding" aria-label="About Shreenathji Electrical">
        <div className="container">
          <div className="about-preview-grid">
            <div className="about-image-wrapper">
              <img
                src="/images/panel-board-manufacturing.jpg"
                alt="Shreenathji Electrical workshop panel manufacturing"
                className="about-panel-img"
              />
              <div className="experience-tag-floating">
                10+ YEARS OF EXPERIENCE
              </div>
            </div>

            <div className="about-content-block">
              <span className="section-tag">Established Engineering</span>
              <h2 className="section-title">ABOUT SHREENATHJI ELECTRICAL</h2>
              
              <p style={{ fontSize: '1.05rem', color: 'var(--brand-charcoal)', lineHeight: '1.7', marginBottom: '18px', fontWeight: '500' }}>
                Founded and steered by <strong>{BUSINESS_DATA.owner}</strong>, <strong>SHREENATHJI ELECTRICAL</strong> has proudly served industrial clients, commercial complexes, and manufacturing facilities across Rajkot and Gujarat for over a decade.
              </p>

              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.65', marginBottom: '22px' }}>
                We specialize in comprehensive <strong>electrical panel manufacturing</strong>, precision <strong>electrical fitting</strong>, rapid <strong>electrical repairing</strong>, and turnkey <strong>industrial electrical solutions</strong>. From custom low-tension distribution boards to high-power motor control centers, every project is engineered with strict adherence to electrical safety, durability, and customer-focused service.
              </p>

              <div style={{ background: 'var(--color-surface-soft)', padding: '18px 20px', borderRadius: '8px', borderLeft: '4px solid var(--brand-orange)', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <User size={18} style={{ color: 'var(--brand-orange)' }} />
                  <span style={{ fontWeight: '800', color: 'var(--brand-charcoal)' }}>Proprietor &amp; Chief Engineer:</span>
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: '900', color: 'var(--brand-charcoal)' }}>
                  {BUSINESS_DATA.owner}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  10+ Years of Hands-on Industrial Electrical Switchgear Experience
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <a href={`tel:${BUSINESS_DATA.phone}`} className="btn btn-secondary">
                  <Phone size={16} /> Call {BUSINESS_DATA.phone}
                </a>
                <a href={BUSINESS_DATA.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <MessageSquare size={16} /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop & Manufacturing Facility Gallery */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-surface-soft)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Manufacturing Facility</span>
            <h2 className="section-title">WORKSHOP &amp; SWITCHGEAR ASSEMBLY</h2>
            <p className="section-subtitle">
              Photographs of actual switchboards, motor control centers, and low-tension panels engineered and assembled in our Rajkot facility under strict quality testing.
            </p>
          </div>

          <div className="gallery-grid">
            <div className="panel-gallery-card">
              <div className="panel-gallery-img-wrap">
                <img src="/images/automation-control-panel.jpg" alt="Automation & Control Panel" className="panel-gallery-img" />
                <div className="panel-gallery-badge">PLC &amp; Automation</div>
              </div>
              <div className="panel-gallery-caption">
                <h4>Automation &amp; Control Panels</h4>
                <p>Intelligent process automation with PLC controllers, touch HMIs, and SCADA connectivity.</p>
              </div>
            </div>

            <div className="panel-gallery-card">
              <div className="panel-gallery-img-wrap">
                <img src="/images/industrial-electrical-panel.jpg" alt="Multi-Tier Industrial Electrical Panels" className="panel-gallery-img" />
                <div className="panel-gallery-badge">Switchgear Room</div>
              </div>
              <div className="panel-gallery-caption">
                <h4>Industrial Electrical Panels</h4>
                <p>Heavy-duty multi-bay switchboards with MCCBs, digital meters, and safety interlocks.</p>
              </div>
            </div>

            <div className="panel-gallery-card">
              <div className="panel-gallery-img-wrap">
                <img src="/images/power-distribution-panel.jpg" alt="Power Distribution Panel" className="panel-gallery-img" />
                <div className="panel-gallery-badge">LT Distribution</div>
              </div>
              <div className="panel-gallery-caption">
                <h4>Power Distribution Panels</h4>
                <p>Electrolytic copper busbar distribution systems with comprehensive short-circuit protection.</p>
              </div>
            </div>

            <div className="panel-gallery-card">
              <div className="panel-gallery-img-wrap">
                <img src="/images/motor-control-panel.jpg" alt="Motor Control Panel" className="panel-gallery-img" />
                <div className="panel-gallery-badge">MCC &amp; VFD</div>
              </div>
              <div className="panel-gallery-caption">
                <h4>Motor Control Panels</h4>
                <p>Compartmentalized motor starter feeders, variable frequency drives, and soft starters.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Then: OUR VISION & OUR MISSION */}
      <VisionMission isGreyBg={false} />

      {/* Then: OUR COMPETENCE */}
      <CompetenceSection />
    </main>
  );
}
