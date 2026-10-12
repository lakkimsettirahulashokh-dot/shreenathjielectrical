import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Mail, Phone } from 'lucide-react';
import { BUSINESS_DATA } from '../constants/businessData';

export default function TermsConditions() {
  return (
    <main>
      {/* Breadcrumb */}
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <div className="container">
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="breadcrumb-current">Terms &amp; Conditions</span>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-surface-soft)', borderBottom: '1px solid var(--color-border)', paddingBottom: '32px' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: 0 }}>
            <span className="section-tag">Terms of Service</span>
            <h1 className="section-title">TERMS &amp; CONDITIONS</h1>
            <p className="section-subtitle">
              Please review the terms and engineering disclaimers governing the use of the SHREENATHJI ELECTRICAL website and estimation tools.
            </p>
          </div>
        </div>
      </section>

      {/* Main Terms Content */}
      <section className="section-padding">
        <div className="container">
          <article className="legal-article-card">
            <h2>1. Introduction</h2>
            <p>
              These Terms and Conditions govern your access to and use of the website operated by <strong>{BUSINESS_DATA.name}</strong>. By accessing our website, browsing services, or using our interactive tools, you agree to comply with and be bound by these Terms.
            </p>

            <h2>2. Business Information</h2>
            <p>
              <strong>{BUSINESS_DATA.name}</strong> is an electrical solutions business specializing in industrial electrical panel manufacturing, switchgear fitting, on-site installation, and electrical repairing in Rajkot, Gujarat, India, under the proprietorship of {BUSINESS_DATA.owner}.
            </p>

            <h2>3. Website Information &amp; Intellectual Property</h2>
            <p>
              All content, images, company branding, and design layouts presented on this website are the property of {BUSINESS_DATA.name} or used with proper permissions. You may not copy, reproduce, or redistribute any technical material without explicit prior written authorization.
            </p>

            {/* Prominent Electrical Calculation Disclaimer */}
            <div className="safety-notice-box" style={{ margin: '24px 0' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <AlertTriangle size={24} style={{ color: '#D97706', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>MANDATORY ELECTRICAL CALCULATION DISCLAIMER:</strong>
                  <p style={{ marginTop: '4px', fontWeight: '600' }}>
                    “The electrical calculator provides preliminary estimates only and does not constitute final engineering approval.”
                  </p>
                  <p style={{ fontSize: '0.85rem', marginTop: '6px' }}>
                    Actual current drawn, inrush currents, cable sizing, breaker breaking capacity (kA rating), busbar cross-section, thermal dissipation, and earthing design must be evaluated on-site by a qualified electrical engineer or certified supervisor before placing orders or energizing switchboards.
                  </p>
                </div>
              </div>
            </div>

            <h2>4. User-Provided Information</h2>
            <p>
              When submitting electrical requirements, machine power ratings, or contact information, you warrant that the provided specifications are accurate to the best of your knowledge. We are not liable for discrepancies arising from erroneous customer input.
            </p>

            <h2>5. WhatsApp &amp; Electronic Communication</h2>
            <p>
              By opting to submit your requirement via WhatsApp or web inquiry form, you consent to receive direct technical communication, quotation breakdowns, and service updates from {BUSINESS_DATA.name} regarding your stated inquiry.
            </p>

            <h2>6. Third-Party Services &amp; Partner References</h2>
            <p>
              References to manufacturer brands (including Delta, Siemens, Schneider Electric, Selec, Salzer, Mitsubishi, Multispan, L&T, RR Kabel, ABB, CHINT, and BCH) are for informational compatibility and switchgear sourcing purposes. All trademarks and registered marks belong to their respective corporate owners.
            </p>

            <h2>7. Website Availability</h2>
            <p>
              While we endeavor to provide uninterrupted uptime, we do not guarantee that the website or its calculator features will be available without disruption or error at all times.
            </p>

            <h2>8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms and Conditions at any time without prior notice. Continued use of the website following changes constitutes acceptance of the amended terms.
            </p>

            <h2>9. Contact Information</h2>
            <p>
              For legal inquiries or questions concerning these Terms, please contact:
            </p>
            <div style={{ background: 'var(--color-surface-soft)', padding: '16px 20px', borderRadius: '8px', marginTop: '12px' }}>
              <strong>{BUSINESS_DATA.name}</strong><br />
              Attn: {BUSINESS_DATA.owner}<br />
              Email: <a href={`mailto:${BUSINESS_DATA.email}`} style={{ color: 'var(--brand-orange)', fontWeight: '600' }}>{BUSINESS_DATA.email}</a><br />
              Phone: <a href={`tel:${BUSINESS_DATA.phone}`} style={{ color: 'var(--brand-charcoal)', fontWeight: '700' }}>{BUSINESS_DATA.phone}</a><br />
              Address: {BUSINESS_DATA.fullAddress}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
