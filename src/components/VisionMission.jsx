import React from 'react';
import { Eye, Target } from 'lucide-react';

export default function VisionMission({ isGreyBg = true }) {
  return (
    <section className={`section-padding ${isGreyBg ? 'vision-mission-section' : ''}`}>
      <div className="container">
        <div className="vision-mission-grid">
          {/* Our Vision Card */}
          <div className="vm-card vision">
            <div className="vm-icon-wrap">
              <Eye size={32} />
            </div>
            <h3 className="vm-title">OUR VISION</h3>
            <p className="vm-text">
              “To be a trusted provider of reliable electrical panel and industrial electrical solutions by delivering quality products, professional service and dependable support.”
            </p>
          </div>

          {/* Our Mission Card */}
          <div className="vm-card mission">
            <div className="vm-icon-wrap">
              <Target size={32} />
            </div>
            <h3 className="vm-title">OUR MISSION</h3>
            <p className="vm-text">
              “To provide reliable and practical electrical solutions using our experience and technical knowledge while meeting customer requirements with quality, safety and professional service.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
