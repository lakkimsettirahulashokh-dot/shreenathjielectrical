import React, { useState, useEffect } from 'react';
import { 
  X, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  Building, 
  User, 
  Phone
} from 'lucide-react';
import { BUSINESS_DATA } from '../constants/businessData';

export default function OffsetPrintingSpecialization({ isHomePage = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    serviceType: 'Offset Press Electrical Fitting & Breakdown',
    issue: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleOpenModal = () => {
    setSubmitSuccess(false);
    setSubmitError('');
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSubmitSuccess(false);
    setSubmitError('');
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Please enter your full name.';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Please enter your phone number.';
    } else if (!/^[0-9+\-\s]{8,15}$/.test(formData.phone.trim())) {
      errors.phone = 'Please enter a valid phone number.';
    }
    if (!formData.issue.trim()) {
      errors.issue = 'Please describe the machine issue or requirement.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');

    // Pre-populate WhatsApp message
    const waMessage = `OFFSET PRINTING MACHINE SPECIALIZATION INQUIRY — SHREENATHJI ELECTRICAL

Customer Name: ${formData.name.trim()}
Phone Number: ${formData.phone.trim()}
Company Name: ${formData.company.trim() || 'Not Provided'}
Service Type: ${formData.serviceType}
Machine Issue / Requirements:
${formData.issue.trim()}

Source: ${isHomePage ? 'Home Page' : 'Services Page'} Specialization Card`;

    const waUrl = `https://wa.me/919824075278?text=${encodeURIComponent(waMessage)}`;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.phone.trim() + '@enquiry.shreenathjielectrical.in',
          subject: `Offset Printing Specialization Inquiry — ${formData.name.trim()}`,
          message: `Company: ${formData.company.trim() || 'N/A'}\nService Type: ${formData.serviceType}\nMachine Issue: ${formData.issue.trim()}`
        })
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSubmitSuccess(true);
        window.open(waUrl, '_blank');
        setFormData({
          name: '',
          phone: '',
          company: '',
          serviceType: 'Offset Press Electrical Fitting & Breakdown',
          issue: ''
        });
      } else {
        window.open(waUrl, '_blank');
        setSubmitSuccess(true);
      }
    } catch (err) {
      console.warn('API submission fallback to WhatsApp:', err.message);
      window.open(waUrl, '_blank');
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Container wrapper maintaining unchanged light background of the page */}
      <section 
        className={`offset-card-wrapper ${isHomePage ? 'offset-home-wrapper' : 'offset-services-wrapper'}`} 
        aria-label="Offset Printing Machine Specialization"
      >
        <div className="container">
          {/* Home Page small section header */}
          {isHomePage && (
            <div className="section-header" style={{ marginBottom: '24px', textAlign: 'center' }}>
              <span className="section-tag">OUR SPECIALIZATION</span>
              <p className="section-subtitle" style={{ margin: '8px auto 0 auto', maxWidth: '680px', fontSize: '1.05rem', color: 'var(--color-text-muted)' }}>
                Specialized Offset Printing Machine Repairing &amp; Installation.
              </p>
            </div>
          )}

          {/* Premium Dark Charcoal Grey (#26313D) Horizontal Card */}
          <div className="offset-horizontal-card">
            {/* LEFT SIDE: Badge, Heading, Description, 3 Feature Tags */}
            <div className="offset-card-left">
              <div className="offset-card-badge">
                <span className="offset-badge-dot" />
                OUR SPECIALIZATION
              </div>

              <h3 className="offset-card-title">
                Offset Printing Machine Repairing &amp; <span className="text-highlight-orange">Installation</span>
              </h3>

              <p className="offset-card-desc">
                Specialized electrical installation, motor rewinding, AC/DC drive tuning, sensor troubleshooting, and breakdown repairs for industrial offset printing presses.
              </p>

              {/* Three Compact Feature Tags */}
              <div className="offset-card-tags">
                <span className="offset-feature-tag">Press Electrical Fitting</span>
                <span className="offset-feature-tag">Drive &amp; VFD Calibration</span>
                <span className="offset-feature-tag">Sensor &amp; Motor Repair</span>
              </div>
            </div>

            {/* RIGHT SIDE: Machine Image & Book Specialization Inquiry Button */}
            <div className="offset-card-right">
              <div className="offset-machine-img-box">
                <img
                  src="/images/offset-printing-machine.jpg"
                  alt="Industrial Offset Printing Machine"
                  className="offset-machine-img"
                  loading="eager"
                  onError={(e) => {
                    if (!e.target.dataset.fallback) {
                      e.target.dataset.fallback = 'true';
                      e.target.src = '/images/offset-printing-machine.png';
                    }
                  }}
                />
              </div>

              <button
                type="button"
                className="offset-card-btn"
                onClick={handleOpenModal}
                aria-label="Book Specialization Inquiry"
              >
                <MessageSquare size={16} />
                <span>BOOK SPECIALIZATION INQUIRY</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Modal Dialog */}
      {isModalOpen && (
        <div className="spec-modal-overlay" onClick={handleCloseModal}>
          <div 
            className="spec-modal-dialog" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="offset-modal-title"
          >
            {/* Modal Header */}
            <div className="spec-modal-header">
              <div>
                <span className="spec-modal-tag">SPECIALIZATION INQUIRY</span>
                <h3 id="offset-modal-title" className="spec-modal-title">
                  Book Offset Machine Service
                </h3>
              </div>
              <button 
                type="button" 
                className="spec-modal-close" 
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="spec-modal-body">
              {submitSuccess ? (
                <div className="spec-modal-success">
                  <CheckCircle2 size={56} style={{ color: '#22C55E', marginBottom: '14px' }} />
                  <h4>Inquiry Successfully Prepared!</h4>
                  <p>
                    Thank you, <strong>{formData.name}</strong>. Your requirement has been received and WhatsApp has opened with your populated details.
                  </p>
                  <p style={{ fontSize: '0.88rem', color: '#CBD5E1', marginTop: '8px' }}>
                    Kamlesh Bhai &amp; the technical team will respond promptly.
                  </p>
                  <button 
                    type="button" 
                    className="btn btn-primary" 
                    style={{ marginTop: '20px', width: '100%', background: '#FF6B1A', borderColor: '#FF6B1A' }}
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {submitError && (
                    <div className="spec-modal-error-banner">
                      <AlertCircle size={18} />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="spec-form-group">
                    <label htmlFor="spec-name">
                      Customer / Contact Name <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <div className="spec-input-wrap">
                      <User size={18} className="spec-input-icon" />
                      <input
                        id="spec-name"
                        type="text"
                        placeholder="e.g. Ramesh Patel"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                        }}
                        className={formErrors.name ? 'is-invalid' : ''}
                      />
                    </div>
                    {formErrors.name && <span className="spec-field-error">{formErrors.name}</span>}
                  </div>

                  <div className="spec-form-row">
                    <div className="spec-form-group">
                      <label htmlFor="spec-phone">
                        Phone Number <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <div className="spec-input-wrap">
                        <Phone size={18} className="spec-input-icon" />
                        <input
                          id="spec-phone"
                          type="tel"
                          placeholder="e.g. 98240 75278"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                          }}
                          className={formErrors.phone ? 'is-invalid' : ''}
                        />
                      </div>
                      {formErrors.phone && <span className="spec-field-error">{formErrors.phone}</span>}
                    </div>

                    <div className="spec-form-group">
                      <label htmlFor="spec-company">
                        Company Name <span style={{ color: '#94A3B8', fontSize: '0.8rem' }}>(Optional)</span>
                      </label>
                      <div className="spec-input-wrap">
                        <Building size={18} className="spec-input-icon" />
                        <input
                          id="spec-company"
                          type="text"
                          placeholder="e.g. Gujarat Print Pack"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="spec-form-group">
                    <label htmlFor="spec-service-type">Service Required</label>
                    <select
                      id="spec-service-type"
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="spec-select"
                    >
                      <option value="Press Electrical Fitting">Press Electrical Fitting</option>
                      <option value="Drive & VFD Calibration">Drive &amp; VFD Calibration</option>
                      <option value="Sensor & Motor Repair">Sensor &amp; Motor Repair</option>
                      <option value="Emergency Breakdown Repairing">Emergency Breakdown Repairing</option>
                      <option value="Complete Machine Installation">Complete Machine Installation</option>
                    </select>
                  </div>

                  <div className="spec-form-group">
                    <label htmlFor="spec-issue">
                      Machine Issue &amp; Requirements <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <textarea
                      id="spec-issue"
                      rows={3}
                      placeholder="Please describe machine brand/model (e.g. Heidelberg, Komori, Roland, Adast), observed electrical symptoms, or requirements..."
                      value={formData.issue}
                      onChange={(e) => {
                        setFormData({ ...formData, issue: e.target.value });
                        if (formErrors.issue) setFormErrors({ ...formErrors, issue: '' });
                      }}
                      className={formErrors.issue ? 'is-invalid' : ''}
                    />
                    {formErrors.issue && <span className="spec-field-error">{formErrors.issue}</span>}
                  </div>

                  <div className="spec-modal-footer">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary"
                      style={{ width: '100%', gap: '8px', padding: '13px', fontSize: '0.96rem', background: '#FF6B1A', borderColor: '#FF6B1A' }}
                    >
                      {isSubmitting ? (
                        'Submitting...'
                      ) : (
                        <>
                          <MessageSquare size={17} />
                          SUBMIT &amp; OPEN ON WHATSAPP
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
