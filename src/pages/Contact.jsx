import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Navigation, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { BUSINESS_DATA } from '../constants/businessData';

// Official WhatsApp SVG Icon
function WhatsAppIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill={color} 
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.201.3-.778.978-.954 1.179-.176.2-.351.226-.652.075s-1.272-.469-2.424-1.496c-.896-.799-1.501-1.786-1.677-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.201-.301.301-.502.101-.2.05-.376-.025-.527-.075-.15-.678-1.633-.929-2.237-.245-.588-.493-.508-.678-.518-.176-.009-.376-.011-.577-.011-.201 0-.527.075-.803.376s-1.054 1.029-1.054 2.509 1.079 2.911 1.229 3.112c.15.201 2.124 3.243 5.145 4.549.718.311 1.279.497 1.716.636.722.23 1.379.197 1.9.119.58-.088 1.78-.727 2.031-1.429.251-.702.251-1.304.176-1.43-.075-.125-.276-.201-.577-.351zM12.04 2C6.516 2 2.028 6.488 2.028 12.012c0 1.839.497 3.565 1.364 5.062L2 22l5.067-1.328a9.96 9.96 0 0 0 4.973 1.34h.004c5.524 0 10.012-4.488 10.012-10.012A9.97 9.97 0 0 0 12.04 2zm0 18.288h-.003a8.27 8.27 0 0 1-4.218-1.157l-.302-.18-3.136.822.837-3.057-.197-.314a8.267 8.267 0 0 1-1.267-4.39c0-4.57 3.719-8.289 8.289-8.289a8.26 8.26 0 0 1 5.861 2.428 8.26 8.26 0 0 1 2.428 5.861c0 4.571-3.719 8.289-8.289 8.289z" />
    </svg>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isReady, setIsReady] = useState(false);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState('');

  // Validate form fields (Required: Full Name, Phone Number, Message)
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Full Name is required.';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone Number is required.';
    } else if (!/^[0-9+() -]{7,15}$/.test(formData.phone.trim())) {
      errors.phone = 'Please enter a valid phone number.';
    }

    // Email is optional, but if entered, validate format
    if (formData.email.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        errors.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Format WhatsApp message exactly as requested
    const formattedMessage = `NEW ENQUIRY — SHREENATHJI ELECTRICAL

Customer Name:
${formData.name.trim()}

Phone Number:
${formData.phone.trim()}

Email:
${formData.email.trim() || 'Not Provided'}

Subject:
${formData.subject.trim() || 'General Enquiry'}

Message:
${formData.message.trim()}

Submitted From:
SHREENATHJI ELECTRICAL WEBSITE`;

    const encodedText = encodeURIComponent(formattedMessage);
    const waUrl = `https://wa.me/919824075278?text=${encodedText}`;

    setLastWhatsAppUrl(waUrl);
    setIsReady(true);

    // Open WhatsApp (app on mobile, web on desktop)
    window.open(waUrl, '_blank');
  };

  return (
    <main>
      {/* Breadcrumb */}
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <div className="container">
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="breadcrumb-current">Contact</span>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-surface-soft)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: 0 }}>
            <span className="section-tag">Direct WhatsApp Enquiry</span>
            <h1 className="section-title">CONTACT US</h1>
            <p className="section-subtitle">
              Reach out directly to Kamlesh Bhai and the Shreenathji Electrical team. Submitting this form prepares your complete enquiry and opens WhatsApp instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="section-padding">
        <div className="container">
          <div className="store-contact-grid">
            {/* Left: Contact Information Cards with 3px solid border */}
            <div className="info-cards-stack">
              {/* Store & Workshop Address */}
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

              {/* Business Hours */}
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

              {/* Phone Number */}
              <div className="info-card-item">
                <div className="info-icon-wrap">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="info-title">Phone Number</h3>
                  <p className="info-desc">
                    <a href={`tel:${BUSINESS_DATA.phone}`} style={{ color: 'var(--brand-charcoal)', fontWeight: '700', fontSize: '1.1rem' }}>
                      {BUSINESS_DATA.phone}
                    </a>
                  </p>
                </div>
              </div>

              {/* Email Address */}
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

              {/* Action Buttons: CALL NOW, WHATSAPP, EMAIL US, GET DIRECTIONS */}
              <div className="action-buttons-group">
                <a href={`tel:${BUSINESS_DATA.phone}`} className="btn btn-secondary">
                  <Phone size={18} /> CALL NOW
                </a>
                <a href={BUSINESS_DATA.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ gap: '8px' }}>
                  <WhatsAppIcon size={18} color="#FFFFFF" /> WHATSAPP
                </a>
                <a href={`mailto:${BUSINESS_DATA.email}`} className="btn btn-outline">
                  <Mail size={18} /> EMAIL US
                </a>
                <a href={BUSINESS_DATA.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  <Navigation size={18} /> GET DIRECTIONS
                </a>
              </div>
            </div>

            {/* Right: Contact Form Card with 3px solid border */}
            <div className="contact-form-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ background: '#DCF8C6', color: '#16A34A', padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <WhatsAppIcon size={24} color="#16A34A" />
                </div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--brand-charcoal)', margin: 0 }}>
                  Send Enquiry on WhatsApp
                </h3>
              </div>
              
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '22px' }}>
                Fill in the details below. Clicking <strong>SEND ON WHATSAPP</strong> opens WhatsApp with your complete message ready to send to <strong>{BUSINESS_DATA.phone}</strong>.
              </p>

              {/* Ready Indicator Banner */}
              {isReady && (
                <div 
                  role="status"
                  style={{
                    background: '#DCF8C6',
                    border: '1.5px solid #86EFAC',
                    color: '#15803D',
                    padding: '16px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    fontSize: '0.95rem',
                    lineHeight: '1.5'
                  }}
                >
                  <CheckCircle2 size={22} style={{ flexShrink: 0, marginTop: '2px', color: '#16A34A' }} />
                  <div>
                    <strong style={{ color: '#166534', display: 'block', fontSize: '1rem', marginBottom: '4px' }}>
                      Your enquiry is ready to send on WhatsApp.
                    </strong>
                    <div style={{ fontSize: '0.88rem', color: '#14532D' }}>
                      WhatsApp should have opened in a new tab/app. If it didn’t open automatically,{' '}
                      <a 
                        href={lastWhatsAppUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ color: '#16A34A', fontWeight: '800', textDecoration: 'underline' }}
                      >
                        click here to open WhatsApp directly
                      </a>.
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Full Name (Required) */}
                <div>
                  <label htmlFor="fullName" style={{ fontSize: '0.88rem', fontWeight: '700', display: 'block', marginBottom: '6px', color: 'var(--brand-charcoal)' }}>
                    Full Name <span style={{ color: '#E11D48' }}>*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    className="equipment-input"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (validationErrors.name) setValidationErrors({ ...validationErrors, name: null });
                    }}
                    placeholder="Enter your full name"
                    style={{ borderColor: validationErrors.name ? '#E11D48' : undefined }}
                  />
                  {validationErrors.name && (
                    <span style={{ color: '#E11D48', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                      {validationErrors.name}
                    </span>
                  )}
                </div>

                {/* Phone Number (Required) */}
                <div>
                  <label htmlFor="phoneNumber" style={{ fontSize: '0.88rem', fontWeight: '700', display: 'block', marginBottom: '6px', color: 'var(--brand-charcoal)' }}>
                    Phone Number <span style={{ color: '#E11D48' }}>*</span>
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    className="equipment-input"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (validationErrors.phone) setValidationErrors({ ...validationErrors, phone: null });
                    }}
                    placeholder="e.g. 9824075278"
                    style={{ borderColor: validationErrors.phone ? '#E11D48' : undefined }}
                  />
                  {validationErrors.phone && (
                    <span style={{ color: '#E11D48', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                      {validationErrors.phone}
                    </span>
                  )}
                </div>

                {/* Email Address (Optional) */}
                <div>
                  <label htmlFor="emailAddress" style={{ fontSize: '0.88rem', fontWeight: '700', display: 'block', marginBottom: '6px', color: 'var(--brand-charcoal)' }}>
                    Email Address <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '500' }}>(Optional)</span>
                  </label>
                  <input
                    id="emailAddress"
                    type="email"
                    className="equipment-input"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (validationErrors.email) setValidationErrors({ ...validationErrors, email: null });
                    }}
                    placeholder="e.g. yourname@domain.com"
                    style={{ borderColor: validationErrors.email ? '#E11D48' : undefined }}
                  />
                  {validationErrors.email && (
                    <span style={{ color: '#E11D48', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                      {validationErrors.email}
                    </span>
                  )}
                </div>

                {/* Subject (Optional) */}
                <div>
                  <label htmlFor="subject" style={{ fontSize: '0.88rem', fontWeight: '700', display: 'block', marginBottom: '6px', color: 'var(--brand-charcoal)' }}>
                    Subject <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '500' }}>(Optional)</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className="equipment-input"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Inquiry for APFC Panel / MCC / Maintenance"
                  />
                </div>

                {/* Message (Required) */}
                <div>
                  <label htmlFor="message" style={{ fontSize: '0.88rem', fontWeight: '700', display: 'block', marginBottom: '6px', color: 'var(--brand-charcoal)' }}>
                    Message <span style={{ color: '#E11D48' }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="equipment-input"
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (validationErrors.message) setValidationErrors({ ...validationErrors, message: null });
                    }}
                    placeholder="Describe your machinery, electrical requirements, or plant site..."
                    style={{ borderColor: validationErrors.message ? '#E11D48' : undefined }}
                  />
                  {validationErrors.message && (
                    <span style={{ color: '#E11D48', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                      {validationErrors.message}
                    </span>
                  )}
                </div>

                {/* Button Text: SEND ON WHATSAPP with WhatsApp Icon */}
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ 
                    width: '100%', 
                    gap: '10px', 
                    marginTop: '8px',
                    backgroundColor: '#25D366',
                    borderColor: '#25D366',
                    fontSize: '1rem',
                    boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#20BA5A'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#25D366'}
                >
                  <WhatsAppIcon size={20} color="#FFFFFF" />
                  SEND ON WHATSAPP
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
