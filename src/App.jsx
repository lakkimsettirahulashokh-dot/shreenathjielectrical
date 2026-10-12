import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import LoadingScreen from './components/LoadingScreen';

// Pages
import Home from './pages/Home';
import Panels from './pages/Panels';
import Services from './pages/Services';
import PowerRequirement from './pages/PowerRequirement';
import AboutUs from './pages/AboutUs';
import Store from './pages/Store';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';

// Helper to auto-scroll to top on route navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <div className="site-wrapper">
      {/* Animated Charging Preloader Matching User Spec */}
      <LoadingScreen />
      <ScrollToTop />
      {/* Consistent Header on every page */}
      <Header />

      {/* Real Separate Page Routes */}
      <div className="site-main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/panels" element={<Panels />} />
          <Route path="/products" element={<Panels />} />
          <Route path="/product" element={<Panels />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/services" element={<Services />} />
          <Route path="/power-requirement" element={<PowerRequirement />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/store" element={<Store />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          {/* Fallback to Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>

      {/* Consistent Footer on every page */}
      <Footer />

      {/* Floating WhatsApp on every page at bottom-left */}
      <FloatingWhatsApp />
    </div>
  );
}
