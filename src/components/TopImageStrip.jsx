import React, { useRef, useEffect } from 'react';
import { PANEL_IMAGES } from '../constants/panelImages';

export default function TopImageStrip({ activeIndex, onSelectImage }) {
  const trackRef = useRef(null);
  const isHoveredRef = useRef(false);
  const offsetRef = useRef(0);
  const animFrameRef = useRef(null);
  const halfWidthRef = useRef(0);

  // Duplicate for seamless infinite loop
  const duplicatedImages = [...PANEL_IMAGES, ...PANEL_IMAGES];

  // Measure half-width of track
  useEffect(() => {
    const updateWidth = () => {
      if (trackRef.current) {
        halfWidthRef.current = trackRef.current.scrollWidth / 2;
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Continuous auto-scroll loop (pauses on hover so user can easily click)
  useEffect(() => {
    let lastTime = performance.now();

    const tick = (now) => {
      const delta = Math.min((now - lastTime) / 16.666, 2.5);
      lastTime = now;

      if (!isHoveredRef.current && halfWidthRef.current > 0) {
        offsetRef.current += 0.55 * delta; // Smooth stately movement
        if (offsetRef.current >= halfWidthRef.current) {
          offsetRef.current -= halfWidthRef.current;
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
        }
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div 
      className="top-panel-strip"
      aria-label="Panel gallery quick selection strip"
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
    >
      <div className="top-panel-strip-header">
        <span className="strip-title-badge">GALLERY</span>
        <span className="strip-hint">Click any panel to view in hero</span>
      </div>

      <div className="top-panel-strip-viewport">
        <div 
          ref={trackRef} 
          className="top-panel-strip-track"
          style={{ willChange: 'transform' }}
        >
          {duplicatedImages.map((panel, idx) => {
            const originalIdx = idx % PANEL_IMAGES.length;
            const isActive = activeIndex === originalIdx;

            return (
              <button
                key={`strip-${idx}`}
                type="button"
                className={`top-panel-thumb ${isActive ? 'is-active' : ''}`}
                onClick={() => onSelectImage(originalIdx)}
                title={`View ${panel.title}`}
                aria-label={`Select ${panel.title}`}
              >
                <img
                  src={panel.src}
                  alt={panel.alt}
                  className="top-panel-thumb-img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="top-panel-thumb-overlay">
                  <span className="top-panel-thumb-title">{panel.title}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
