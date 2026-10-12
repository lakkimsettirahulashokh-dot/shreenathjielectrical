import React from 'react';
import { 
  CheckCircle2, 
  Layers, 
  Zap, 
  Activity, 
  Wrench, 
  PenTool, 
  Cpu, 
  Building, 
  Factory 
} from 'lucide-react';
import { BUSINESS_DATA, COMPETENCE_LEFT } from '../constants/businessData';

export default function CompetenceSection() {
  const categoryIcons = {
    'Industrial Panels': <Layers size={18} />,
    'Power Distribution': <Zap size={18} />,
    'Motor Control': <Activity size={18} />,
    'Electrical Fitting': <Wrench size={18} />,
    'Electrical Repairing': <PenTool size={18} />,
    'Automation': <Cpu size={18} />,
    'Commercial Buildings': <Building size={18} />,
    'Industrial Buildings': <Factory size={18} />
  };

  const categories = [
    'Industrial Panels',
    'Power Distribution',
    'Motor Control',
    'Electrical Fitting',
    'Electrical Repairing',
    'Automation',
    'Commercial Buildings',
    'Industrial Buildings'
  ];

  return (
    <section className="section-padding competence-section" aria-label="Our Competence">
      <div className="container">
        <div className="competence-grid">
          {/* Left Side: Competence Strengths */}
          <div className="competence-left">
            <span className="section-tag">Core Capabilities</span>
            <h2 className="competence-title">OUR COMPETENCE</h2>
            <p className="section-subtitle" style={{ marginBottom: '24px' }}>
              Backed by over a decade of hands-on field expertise and engineering precision, we deliver trustworthy electrical switchboards and installation services.
            </p>

            <div className="competence-list">
              {COMPETENCE_LEFT.map((item, index) => (
                <div key={index} className="competence-item">
                  <CheckCircle2 className="check-icon" size={20} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Professional Electrical Industry Visual (SHREENATHJI ELECTRICAL Layout) */}
          <div className="competence-right-visual">
            {/* Center Branding */}
            <div className="competence-center-badge">
              <span className="comp-brand-shreenathji">{BUSINESS_DATA.brandNameFirst}</span>
              <span className="comp-brand-electrical">{BUSINESS_DATA.brandNameSecond}</span>
              <div style={{ fontSize: '0.8rem', color: '#CBD5E1', marginTop: '4px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Engineering & Power Solutions
              </div>
            </div>

            {/* 8 Categories Grid */}
            <div className="competence-categories-grid">
              {categories.map((cat, idx) => (
                <div key={idx} className="comp-category-card">
                  <div className="comp-cat-icon">
                    {categoryIcons[cat]}
                  </div>
                  <span className="comp-cat-label">{cat}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.82rem', color: '#94A3B8' }}>
              Comprehensive Low-Tension & Industrial Switchgear Solutions
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
