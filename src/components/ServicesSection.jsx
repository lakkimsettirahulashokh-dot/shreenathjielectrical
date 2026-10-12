import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Sliders,
  Cpu,
  Zap,
  Gauge,
  ArrowRight,
  MessageSquare,
  Wrench,
  ShieldAlert
} from 'lucide-react';
import { BUSINESS_DATA } from '../constants/businessData';

export const ALL_SERVICES = [
  {
    id: 'panel-manufacturing',
    title: 'Electrical Panel Manufacturing',
    icon: Sliders,
    desc: 'Custom CAD design, precision copper busbars, and assembly of certified Low Tension (LT) power distribution and control panels.',
    tags: ['In-House Fabrication', 'CRCA Enclosures', 'IS/IEC Standards']
  },
  {
    id: 'electrical-fitting',
    title: 'Electrical Fitting & Installation',
    icon: Wrench,
    desc: 'Precision on-site panel alignment, foundation mounting, busway trunking, glanding, and high-torque cable termination.',
    tags: ['Busbar Coupling', 'Cable Termination', 'Torque Verification']
  },
  {
    id: 'electrical-repairing',
    title: 'Electrical Repairing & Diagnostics',
    icon: ShieldAlert,
    desc: 'Rapid breakdown response, multimeter troubleshooting, circuit breaker replacements, and burnt contactor overhauls.',
    tags: ['Emergency Breakdown', 'Breaker Repair', 'Diagnostic Testing']
  },
  {
    id: 'industrial-automation',
    title: 'PLC & Industrial Automation',
    icon: Cpu,
    desc: 'End-to-end automation engineering including Siemens/Delta PLC programming, touch HMI screens, SCADA telemetry, and VFD drives.',
    tags: ['Siemens / Delta PLC', 'VFD Modulation', 'Touch HMI Integration']
  },
  {
    id: 'apfc-optimization',
    title: 'Power Factor & APFC Optimization',
    icon: Zap,
    desc: 'Automatic Power Factor Correction servicing, capacitor bank step tuning, and utility penalty elimination for high-demand loads.',
    tags: ['Capacitor Bank Service', 'Microprocessor Relay', 'Zero kVA Penalty']
  }
];

export default function ServicesSection({ isHomePage = true }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Re-trigger scroll-reveal animation every time the user scrolls to/away from the section
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    const elem = sectionRef.current;
    if (elem) observer.observe(elem);

    return () => {
      if (elem) observer.unobserve(elem);
    };
  }, []);

  const displayedServices = isHomePage ? ALL_SERVICES.slice(0, 3) : ALL_SERVICES;

  return (
    <section 
      ref={sectionRef} 
      className="services-section section-padding" 
      aria-label="Our Electrical & Automation Services"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="section-tag">End-To-End Industrial Engineering</span>
          <h2 className="section-title">OUR SERVICES</h2>
          <p className="section-subtitle">
            Comprehensive electrical control panel manufacturing, automation engineering, on-site fitting, and swift breakdown repairing.
          </p>
        </div>

        {/* Services Grid with Scroll-Reveal Animation */}
        <div className="industrial-services-grid">
          {displayedServices.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className={`industrial-service-card ${isVisible ? 'is-revealed' : ''}`}
                style={{
                  transitionDelay: `${Math.min(idx * 50, 450)}ms`
                }}
              >
                <div className="service-card-top">
                  <div className="service-card-icon-box">
                    <IconComponent size={24} className="service-card-icon" />
                  </div>
                  <span className="service-card-number">0{idx + 1}</span>
                </div>

                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.desc}</p>

                <div className="service-card-tags">
                  {service.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="service-mini-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="service-card-action">
                  <a
                    href={`https://wa.me/919824075278?text=${encodeURIComponent(`Hello Shreenathji Electrical, I am inquiring regarding your service: ${service.title}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="service-inquire-link"
                    title={`Inquire about ${service.title}`}
                  >
                    <span>Inquire Now</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Home Page View More Option -> Redirects to /services */}
        {isHomePage && (
          <div style={{ textAlign: 'center', marginTop: '44px' }}>
            <Link to="/services" className="btn btn-primary" style={{ gap: '10px', padding: '14px 32px' }}>
              <span>VIEW MORE SERVICES</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
