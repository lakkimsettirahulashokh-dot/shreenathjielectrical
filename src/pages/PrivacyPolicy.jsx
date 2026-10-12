import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Phone } from 'lucide-react';
import { BUSINESS_DATA } from '../constants/businessData';

export default function PrivacyPolicy() {
  return (
    <main>
      {/* Breadcrumb */}
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <div className="container">
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="breadcrumb-current">Privacy Policy</span>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-surface-soft)', borderBottom: '1px solid var(--color-border)', paddingBottom: '32px' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: 0 }}>
            <span className="section-tag">Legal &amp; Data Protection</span>
            <h1 className="section-title">PRIVACY POLICY</h1>
            <p className="section-subtitle">
              Last updated: September 2026. How SHREENATHJI ELECTRICAL collects, protects, and respects your privacy.
            </p>
          </div>
        </div>
      </section>

      {/* Main Policy Content */}
      <section className="section-padding">
        <div className="container">
          <article className="legal-article-card">
            <p>
              Welcome to <strong>{BUSINESS_DATA.name}</strong> (“we,” “our,” or “us”). We are dedicated to maintaining the confidentiality, integrity, and security of the personal and technical information you provide when using our website and services.
            </p>

            <h2>1. Information Collected</h2>
            <p>
              When you browse our website, use our contact forms, or utilize our electrical load calculator, we may collect:
            </p>
            <ul>
              <li><strong>Contact Information:</strong> Name, phone number, email address, company name, and physical installation location.</li>
              <li><strong>Technical Browsing Data:</strong> IP address, device type, browser characteristics, and visited pages to ensure responsive performance.</li>
            </ul>

            <h2>2. Electrical Requirement Information</h2>
            <p>
              Our online Power Requirement tool collects technical parameters submitted by you, including building type, connected machine ratings, operating voltages, phase configurations, power factors, and specific switchgear requirements. This data is utilized strictly to formulate preliminary electrical calculations, switchboard quotations, and engineering recommendations.
            </p>

            <h2>3. How Information is Used</h2>
            <p>
              We process your details exclusively to:
            </p>
            <ul>
              <li>Provide accurate electrical load and current estimates.</li>
              <li>Prepare formal quotations for electrical panel solutions, fitting, or repair.</li>
              <li>Facilitate customer service communications via phone, email, and WhatsApp.</li>
              <li>Maintain operational safety and follow-up on project delivery.</li>
            </ul>

            <h2>4. Data Storage &amp; Protection</h2>
            <p>
              Your electrical load requirements and contact entries are stored securely. We do not store sensitive payment information on our servers, nor do we expose private API keys or database service-role credentials to the client interface.
            </p>

            <h2>5. WhatsApp Communication</h2>
            <p>
              Our platform offers optional direct communication via WhatsApp ({BUSINESS_DATA.whatsapp}). When you initiate a WhatsApp conversation, your message and provided technical specifications are transmitted through WhatsApp's end-to-end encrypted infrastructure in accordance with Meta's privacy policy.
            </p>

            <h2>6. Google Maps</h2>
            <p>
              We incorporate Google Maps to assist customers in locating our workshop and store near D-Mart, Gondal Road, Rajkot. The map iframe operates under Google’s Privacy Policy.
            </p>

            <h2>7. Cookies &amp; Local Storage</h2>
            <p>
              We use minimal browser local storage to preserve your calculator selections during active sessions so you do not lose your entered machinery load data if the page is reloaded. We do not use third-party tracking cookies or marketing ad trackers.
            </p>

            <h2>8. Data Security</h2>
            <p>
              We implement industry-standard technical measures, secure protocols (HTTPS), and restricted physical and digital access controls to safeguard your data against unauthorized access, loss, or alteration.
            </p>

            <h2>9. Data Sharing</h2>
            <p>
              <strong>We never sell, rent, or trade your personal or industrial data.</strong> Information is only disclosed if legally mandated by applicable laws or court orders.
            </p>

            <h2>10. User Requests &amp; Rights</h2>
            <p>
              You have the right to request a copy of the information we hold about you, request corrections, or request deletion of your contact records from our communication databases.
            </p>

            <h2>11. Policy Updates</h2>
            <p>
              We reserve the right to revise this Privacy Policy periodically. Any amendments will be reflected on this page with an updated revision date.
            </p>

            <h2>12. Contact Information</h2>
            <p>
              For inquiries regarding this Privacy Policy or your data, please contact:
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
