import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PARTNERS_LIST } from './PartnerLogos';

export default function PartnerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(5);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);
  const isDraggingRef = useRef(false);

  // Responsive items count calculation
  const updateItemsPerView = useCallback(() => {
    const width = window.innerWidth;
    if (width < 560) {
      setItemsPerView(2); // 2 logos on mobile phones
    } else if (width < 850) {
      setItemsPerView(3); // 3 on tablets / large phones
    } else if (width < 1100) {
      setItemsPerView(4); // 4 on smaller laptops
    } else {
      setItemsPerView(5); // 5 on standard desktop
    }
  }, []);

  useEffect(() => {
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, [updateItemsPerView]);

  const maxIndex = Math.max(0, PARTNERS_LIST.length - itemsPerView);

  // Ensure currentIndex stays within bounds when resizing
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [itemsPerView, maxIndex, currentIndex]);

  // Smooth automatic scrolling loop
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 2800);

    return () => clearInterval(timer);
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Touch swipe support for mobile devices
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = e.touches[0].clientX;
    isDraggingRef.current = true;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return;
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsPaused(false);
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <section className="partners-section" aria-label="Our Store Partners">
      <div className="container" style={{ overflow: 'hidden' }}>
        <div className="section-header text-center" style={{ marginBottom: '28px' }}>
          <span className="section-tag">Authorized Distribution &amp; Trust</span>
          <h2 className="section-title">OUR STORE PARTNERS</h2>
          <p className="section-subtitle">
            Trusted Brands for Reliable Electrical &amp; Automation Solutions
          </p>
        </div>

        <div
          className="carousel-outer-wrap"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Arrow (Desktop / Tablet) */}
          <button
            type="button"
            className="carousel-arrow left"
            onClick={handlePrev}
            aria-label="Previous partner logos"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Carousel Track Container */}
          <div
            className="carousel-track-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                transition: 'transform 0.45s ease-in-out'
              }}
            >
              {PARTNERS_LIST.map((partner) => {
                const LogoComponent = partner.Logo;
                return (
                  <div
                    key={partner.id}
                    className="partner-logo-item-wrap"
                    style={{
                      flex: `0 0 ${100 / itemsPerView}%`,
                      maxWidth: `${100 / itemsPerView}%`
                    }}
                  >
                    <div className="partner-logo-card" title={partner.name}>
                      <LogoComponent />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Arrow (Desktop / Tablet) */}
          <button
            type="button"
            className="carousel-arrow right"
            onClick={handleNext}
            aria-label="Next partner logos"
          >
            <ChevronRight size={20} />
          </button>

          {/* Pagination Dots */}
          <div className="carousel-dots" role="tablist" aria-label="Partner carousel pagination">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`carousel-dot ${currentIndex === idx ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                aria-selected={currentIndex === idx}
                role="tab"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
