import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Calculator } from 'lucide-react';
import { BUSINESS_DATA } from '../constants/businessData';
import { ALL_SERVICES } from '../components/ServicesSection';
import OffsetPrintingSpecialization from '../components/OffsetPrintingSpecialization';

export default function Services() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    const elem = sectionRef.current;
    if (elem) observer.observe(elem);

    return () => {
      if (elem) observer.unobserve(elem);
    };
  }, []);

  return (
    <main>
      {/* Breadcrumb */}
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <div className="container">
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="breadcrumb-current">Services</span>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-surface-soft)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: 0 }}>
            <span className="section-tag">Engineering Capabilities</span>
            <h1 className="section-title">INDUSTRIAL SERVICES</h1>
            <p className="section-subtitle" style={{ marginBottom: '24px' }}>
              Precision electrical control panel fabrication, PLC/VFD automation, on-site commissioning, and swift breakdown maintenance built on 10+ years of technical trust.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={BUSINESS_DATA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <MessageSquare size={18} />
                SEND REQUIREMENT
              </a>
              <Link to="/power-requirement" className="btn btn-secondary">
                <Calculator size={18} />
                CALCULATE POWER REQUIREMENT
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Specialization: Offset Printing Machine Repairing & Installation */}
      <OffsetPrintingSpecialization />

      {/* Services Grid with Scroll-Reveal Animation */}
      <section ref={sectionRef} className="section-padding" aria-label="Services List">
        <div className="container">
          <div className="industrial-services-grid">
            {ALL_SERVICES.map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={srv.id}
                  className={`industrial-service-card ${isVisible ? 'is-revealed' : ''}`}
                  style={{
                    transitionDelay: `${Math.min(idx * 45, 450)}ms`
                  }}
                >
                  <div className="service-card-top">
                    <div className="service-card-icon-box">
                      <IconComp size={24} className="service-card-icon" />
                    </div>
                    <span className="service-card-number">0{idx + 1}</span>
                  </div>

                  <h2 className="service-card-title">{srv.title}</h2>
                  <p className="service-card-desc">{srv.desc}</p>

                  <div className="service-card-tags">
                    {srv.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="service-mini-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="service-card-action">
                    <a
                      href={`https://wa.me/919824075278?text=${encodeURIComponent(`Hello Shreenathji Electrical, I am inquiring regarding your service: ${srv.title}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="service-inquire-link"
                      title={`Book inquiry for ${srv.title}`}
                    >
                      <MessageSquare size={15} />
                      <span>Book Service Inquiry</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick CTA */}
          <div style={{ marginTop: '56px', textAlign: 'center', background: 'var(--color-surface-soft)', padding: '40px 24px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
              Have an Urgent Electrical Breakdown or New Plant Project?
            </h3>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '650px', margin: '0 auto 24px auto' }}>
              Speak directly with <strong>{BUSINESS_DATA.owner}</strong> to discuss your exact requirement, get technical advice, or request an on-site inspection.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <a
                href={BUSINESS_DATA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <MessageSquare size={18} />
                SEND REQUIREMENT
              </a>
              <Link to="/power-requirement" className="btn btn-secondary">
                <Calculator size={18} />
                CALCULATE POWER REQUIREMENT
              </Link>
              <a href={`tel:${BUSINESS_DATA.phone}`} className="btn btn-outline" style={{ background: '#FFFFFF' }}>
                CALL {BUSINESS_DATA.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
