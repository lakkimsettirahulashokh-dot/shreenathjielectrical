import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  Award, 
  Briefcase, 
  Factory, 
  CheckCircle2 
} from 'lucide-react';

// Single Stat Card with smooth count-up animation
function StatCard({ icon: Icon, targetNumber, suffix, label, isTextOnly, isVisible }) {
  const [currentVal, setCurrentVal] = useState(0);
  const animRef = useRef(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isVisible) {
      // Reset when out of viewport so it replays upon scrolling back
      setCurrentVal(0);
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    if (isTextOnly) {
      return;
    }

    if (prefersReducedMotion) {
      setCurrentVal(targetNumber);
      return;
    }

    // Professional smooth 1.8-second count-up animation
    const duration = 1800;
    const startTime = performance.now();

    const animateCount = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic: smooth deceleration toward final number
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const val = Math.floor(easeOut * targetNumber);

      setCurrentVal(val);

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animateCount);
      } else {
        setCurrentVal(targetNumber);
      }
    };

    animRef.current = requestAnimationFrame(animateCount);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isVisible, targetNumber, isTextOnly]);

  const displayValue = () => {
    if (isTextOnly) {
      return targetNumber; // e.g. "Multiple"
    }
    // Format numbers with commas if >= 1000
    const formatted = currentVal.toLocaleString('en-IN');
    return `${formatted}${suffix || ''}`;
  };

  return (
    <div className={`strength-stat-card ${isVisible ? 'is-revealed' : ''}`}>
      <div className="strength-icon-box">
        <Icon size={28} className="strength-icon" />
      </div>
      <div className="strength-stat-number" aria-label={`${label}: ${displayValue()}`}>
        <span className={isTextOnly ? 'strength-text-val' : 'strength-num-val'}>
          {displayValue()}
        </span>
      </div>
      <div className="strength-stat-label">
        {label}
      </div>
    </div>
  );
}

export default function OurStrengths() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Re-triggers every time the section enters/leaves the viewport
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% visible
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const currentElem = sectionRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, []);

  const STRENGTHS_DATA = [
    {
      id: 'clients',
      icon: Users,
      targetNumber: 299,
      suffix: '+',
      label: 'Clients'
    },
    {
      id: 'experience',
      icon: Award,
      targetNumber: 10,
      suffix: '+',
      label: 'Years Experience'
    },
    {
      id: 'projects',
      icon: Briefcase,
      targetNumber: 200,
      suffix: '+',
      label: 'Projects Completed'
    },
    {
      id: 'industries',
      icon: Factory,
      targetNumber: 'Multiple',
      suffix: '',
      label: 'Industries Served',
      isTextOnly: true
    },
    {
      id: 'satisfaction',
      icon: CheckCircle2,
      targetNumber: 100,
      suffix: '%',
      label: 'Client Satisfaction'
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="our-strengths-section section-padding" 
      aria-label="Our Strengths"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="section-tag">Proven Track Record</span>
          <h2 className="section-title">OUR STRENGTHS</h2>
          <p className="section-subtitle">
            Built on Experience, Quality &amp; Customer Trust
          </p>
        </div>

        {/* 5 Statistic Cards Grid */}
        <div className="strengths-grid">
          {STRENGTHS_DATA.map((item) => (
            <StatCard
              key={item.id}
              icon={item.icon}
              targetNumber={item.targetNumber}
              suffix={item.suffix}
              label={item.label}
              isTextOnly={item.isTextOnly}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
