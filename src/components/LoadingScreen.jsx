import React, { useState, useEffect } from 'react';

export default function LoadingScreen({ onLoaded, minDisplayTime = 1600 }) {
  const [fadeout, setFadeout] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Keep loader visible for minDisplayTime for smooth visual delight
    const timer = setTimeout(() => {
      setFadeout(true);
      const removeTimer = setTimeout(() => {
        setRemoved(true);
        if (onLoaded) onLoaded();
      }, 500); // 500ms fade transition
      return () => clearTimeout(removeTimer);
    }, minDisplayTime);

    return () => clearTimeout(timer);
  }, [minDisplayTime, onLoaded]);

  if (removed) return null;

  // Helper to generate dots along concentric rings
  const generateDots = (count, radius, dotSize, className) => {
    const dots = [];
    for (let i = 0; i < count; i++) {
      const angle = (i * 2 * Math.PI) / count;
      const cx = 200 + radius * Math.cos(angle);
      const cy = 200 + radius * Math.sin(angle);
      dots.push(
        <circle
          key={`dot-${radius}-${i}`}
          cx={cx}
          cy={cy}
          r={dotSize}
          className={`loader-dot ${className || ''}`}
        />
      );
    }
    return dots;
  };

  return (
    <div 
      className={`preloader-overlay ${fadeout ? 'is-fading' : ''}`}
      role="status"
      aria-label="Loading Shreenathji Electrical"
    >
      <div className="preloader-container">
        {/* Animated Radial Concentric SVG */}
        <div className="preloader-svg-wrap">
          <svg 
            viewBox="0 0 400 400" 
            className="preloader-svg"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Radial gradient glow for electrical pulse */}
              <radialGradient id="electricGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F37021" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#F37021" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Subtle background pulse field */}
            <circle cx="200" cy="200" r="185" fill="url(#electricGlow)" className="preloader-aura" />

            {/* Ring 4 (Outer ring - 40 small dots) */}
            <g className="ring-group ring-4">
              {generateDots(40, 180, 3.2, 'dot-outer')}
            </g>

            {/* Ring 3 (32 medium dots) */}
            <g className="ring-group ring-3">
              {generateDots(32, 145, 4.2, 'dot-mid-outer')}
            </g>

            {/* Ring 2 (24 large dots) */}
            <g className="ring-group ring-2">
              {generateDots(24, 110, 5, 'dot-mid-inner')}
            </g>

            {/* Ring 1 (Inner ring - 16 bold dots) */}
            <g className="ring-group ring-1">
              {generateDots(16, 75, 4.5, 'dot-inner')}
            </g>

            {/* Central Electric Lightning Bolt */}
            <polygon 
              points="212,85 142,208 198,208 154,315 258,192 202,192" 
              className="preloader-bolt" 
            />
          </svg>

          {/* Faint Reflection below graphic (matches the reference image) */}
          <div className="preloader-reflection">
            <svg 
              viewBox="0 0 400 200" 
              className="preloader-svg-reflection"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g className="ring-group ring-3">
                {generateDots(32, 145, 4.2, 'dot-reflection')}
              </g>
              <g className="ring-group ring-4">
                {generateDots(40, 180, 3.2, 'dot-reflection')}
              </g>
            </svg>
          </div>
        </div>

        {/* Branding & Loading Status */}
        <div className="preloader-brand">
          <span className="preloader-brand-title">
            SHREENATHJI <span className="text-orange">ELECTRICAL</span>
          </span>
          <div className="preloader-bar-track">
            <div className="preloader-bar-fill" />
          </div>
          <span className="preloader-status-text">Powering Every Connection...</span>
        </div>
      </div>
    </div>
  );
}
