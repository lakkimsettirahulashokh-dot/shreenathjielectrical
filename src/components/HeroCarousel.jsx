import React, { useState, useEffect, useRef } from 'react';
import { HERO_AI_PANELS } from '../constants/panelImages';

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);

  const totalOriginalSlides = HERO_AI_PANELS.length;
  // Clone first slide at the end for seamless infinite loop (total 21 slides)
  const slides = [...HERO_AI_PANELS, HERO_AI_PANELS[0]];

  // Exact 3-second display pause between slide transitions (never paused by passive mouse hover)
  useEffect(() => {
    // If we reached the cloned slide, wait for 750ms slide animation to complete, then snap to 0
    if (currentIndex === totalOriginalSlides) {
      const resetTimer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 750);

      return () => clearTimeout(resetTimer);
    }

    // Normal slide: hold for exactly 3 seconds, then advance
    const slideTimer = setTimeout(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 3000);

    return () => clearTimeout(slideTimer);
  }, [currentIndex, totalOriginalSlides]);

  // Re-enable transition after resetting to index 0
  useEffect(() => {
    if (!isTransitioning) {
      const anim = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
      return () => cancelAnimationFrame(anim);
    }
  }, [isTransitioning]);

  // Touch and mouse drag handlers for manual swiping
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const endX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX) || 0;
    const diff = startXRef.current - endX;

    // Swipe left (next)
    if (diff > 50) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev < totalOriginalSlides ? prev + 1 : 0));
    } 
    // Swipe right (prev)
    else if (diff < -50) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalOriginalSlides - 1));
    }
  };

  const currentPanel = HERO_AI_PANELS[currentIndex % totalOriginalSlides];

  return (
    <div
      ref={containerRef}
      className="hero-image-card hero-carousel-wrapper"
      aria-label="Shreenathji Electrical Industrial Control Panels Showcase"
      role="region"
      aria-roledescription="carousel"
      onMouseDown={handlePointerDown}
      onMouseUp={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchEnd={handlePointerUp}
      style={{ cursor: 'grab', userSelect: 'none' }}
    >
      {/* Top subtle badge showing active category and title */}
      <div className="hero-carousel-top-chip" aria-hidden="true">
        <span className="live-indicator-dot" />
        <span className="chip-text">
          {currentPanel?.title}
        </span>
      </div>

      {/* 3-Second Visual Progress Bar */}
      <div className="hero-carousel-progress-track" aria-hidden="true">
        <div 
          key={currentIndex} 
          className="hero-carousel-progress-bar" 
        />
      </div>

      {/* Stepped Auto-Sliding Track with AI Industrial Electrical Panels */}
      <div 
        className="hero-carousel-track"
        style={{
          transform: `translate3d(-${currentIndex * 100}%, 0, 0)`,
          transition: isTransitioning 
            ? 'transform 0.75s cubic-bezier(0.25, 1, 0.5, 1)' 
            : 'none',
          willChange: 'transform'
        }}
      >
        {slides.map((panel, idx) => {
          const isPriority = idx < 2;

          return (
            <div 
              key={`hero-slide-${idx}`} 
              className="hero-carousel-slide"
              aria-hidden={idx >= totalOriginalSlides ? 'true' : undefined}
            >
              <img
                src={panel.src}
                alt={panel.alt}
                className="hero-carousel-img"
                loading={isPriority ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={isPriority ? 'high' : 'low'}
                draggable="false"
              />
              <div className="hero-carousel-gradient-scrim" />
            </div>
          );
        })}
      </div>

      {/* Permanent Fixed 10+ Years of Excellence Ribbon */}
      <div className="hero-experience-ribbon" aria-label="10+ Years of Excellence">
        <div className="experience-number">10+</div>
        <div className="experience-text">
          Years of<br />Excellence
        </div>
      </div>
    </div>
  );
}
