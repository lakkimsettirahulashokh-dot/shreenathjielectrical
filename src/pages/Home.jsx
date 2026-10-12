import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Award,
  Zap
} from 'lucide-react';
import { BUSINESS_DATA, PANEL_SOLUTIONS } from '../constants/businessData';
import PartnerCarousel from '../components/PartnerCarousel';
import OffsetPrintingSpecialization from '../components/OffsetPrintingSpecialization';
import OurStrengths from '../components/OurStrengths';
import ServicesSection from '../components/ServicesSection';
import VisionMission from '../components/VisionMission';
import CompetenceSection from '../components/CompetenceSection';
import HeroCarousel from '../components/HeroCarousel';

export default function Home() {
  // Preview panels for home - limit to 3 only
  const homePanels = PANEL_SOLUTIONS.slice(0, 3);

  return (
    <main>
      {/* 1. HERO SECTION */}
      <section className="hero-section" aria-label="Hero Overview">
        <div
          className="hero-bg-overlay"
          style={{ backgroundImage: `url('/images/hero-panel.jpg')` }}
        />
        <div className="hero-gradient-overlay" />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-content-wrap">
            <div className="hero-text-block">
              <div className="hero-badge">
                <ShieldCheck size={16} />
                <span>10+ Years Industrial Experience</span>
              </div>

              <h1 className="hero-title">
                {BUSINESS_DATA.brandNameFirst}
                <span className="text-orange">{BUSINESS_DATA.brandNameSecond}</span>
              </h1>

              <div className="hero-subheading">
                {BUSINESS_DATA.tagline}
              </div>

              <p className="hero-description">
                Professional Electrical Panel Manufacturing, Electrical Fitting &amp; Repairing Solutions.
              </p>

            </div>

            {/* Premium Horizontal Auto-Scrolling Hero Carousel */}
            <div className="hero-carousel-block">
              <HeroCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR STORE PARTNERS (13 Official Brands) */}
      <PartnerCarousel />

      {/* 3. OUR SPECIALIZATION (Offset Printing Machine Repairing & Installation) */}
      <OffsetPrintingSpecialization isHomePage={true} />

      {/* 4. OUR STRENGTHS SECTION (Animated numerical stats with viewport re-trigger) */}
      <OurStrengths />

      {/* 4. SERVICES SECTION (Industrial automation & panels with scroll-reveal) */}
      <ServicesSection isHomePage={true} />

      {/* 5. ABOUT US PREVIEW */}
      <section className="section-padding about-preview-section" aria-label="About Us Preview">
        <div className="container">
          <div className="about-preview-grid">
            <div className="about-image-wrapper">
              <img
                src="/images/about-panel.jpg"
                alt="Electrical Engineer Wiring Industrial Control Panel"
                className="about-panel-img"
              />
              <div className="experience-tag-floating">
                10+ YEARS OF EXPERIENCE
              </div>
            </div>

            <div className="about-content-block">
              <span className="section-tag">Who We Are</span>
              <h2 className="section-title">ABOUT US</h2>

              <blockquote className="about-lead-quote">
                “SHREENATHJI ELECTRICAL is a professional electrical solutions business with 10+ years of experience in electrical panel manufacturing, electrical fitting, repairing and industrial electrical solutions.”
              </blockquote>

              <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>
                Under the dedicated leadership of <strong>{BUSINESS_DATA.owner}</strong>, we have earned a premier reputation across Rajkot and Gujarat for uncompromising engineering standards, robust electrical panels, and responsive technical support.
              </p>

              <div className="about-highlights-list">
                <div className="highlight-pill">
                  <CheckCircle2 className="check-icon" size={18} />
                  <span>Custom Panel Manufacturing</span>
                </div>
                <div className="highlight-pill">
                  <CheckCircle2 className="check-icon" size={18} />
                  <span>Expert Electrical Fitting</span>
                </div>
                <div className="highlight-pill">
                  <CheckCircle2 className="check-icon" size={18} />
                  <span>Speedy Repairing Services</span>
                </div>
                <div className="highlight-pill">
                  <CheckCircle2 className="check-icon" size={18} />
                  <span>Safety-Tested Switchboards</span>
                </div>
              </div>

              <Link to="/about-us" className="btn btn-secondary">
                READ MORE ABOUT US
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUR VISION & OUR MISSION */}
      <VisionMission isGreyBg={true} />

      {/* 7. OUR PANEL SOLUTIONS (REAL ELECTRICAL PANEL IMAGES) */}
      <section className="section-padding" aria-label="Our Panel Solutions">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Engineered Switchgear</span>
            <h2 className="section-title">OUR PANEL SOLUTIONS</h2>
            <p className="section-subtitle">
              Reliable, custom-fabricated Low Tension (LT) power control and automation switchboards built with certified safety standards.
            </p>
          </div>

          <div className="panels-grid">
            {homePanels.map((panel) => (
              <div key={panel.id} className="panel-card">
                <div className="panel-card-img-wrap">
                  <img
                    src={panel.image}
                    alt={panel.title}
                    className="panel-card-img"
                  />
                  <div className="panel-badge">{panel.badge}</div>
                </div>
                <div className="panel-card-body">
                  <h3 className="panel-card-title">{panel.title}</h3>
                  <p className="panel-card-desc">{panel.description}</p>
                  <ul className="panel-feature-list">
                    {panel.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="panel-feature-item">
                        <span className="dot" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/panels" className="panel-cta-btn">
                    <span>View Specifications</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '44px' }}>
            <Link to="/products" className="btn btn-primary" style={{ gap: '10px', padding: '14px 32px' }}>
              <span>VIEW MORE PANELS</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. OUR COMPETENCE */}
      <CompetenceSection />
    </main>
  );
}
