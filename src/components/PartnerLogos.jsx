import React from 'react';

// Official Authorized / Trusted Store Partner Logos referenced directly from official brand sources and repositories
export const PartnerLogos = {
  Delta: () => (
    <img
      src="/images/partners/delta.svg"
      alt="Delta Electronics"
      className="partner-logo-img"
      loading="lazy"
    />
  ),

  Siemens: () => (
    <img
      src="/images/partners/siemens.svg"
      alt="Siemens"
      className="partner-logo-img"
      loading="lazy"
    />
  ),

  SchneiderElectric: () => (
    <img
      src="/images/partners/schneider.svg"
      alt="Schneider Electric"
      className="partner-logo-img"
      loading="lazy"
    />
  ),

  Mitsubishi: () => (
    <img
      src="/images/partners/mitsubishi.svg"
      alt="Mitsubishi Electric"
      className="partner-logo-img"
      loading="lazy"
    />
  ),

  LT: () => (
    <img
      src="/images/partners/lt.svg"
      alt="Larsen & Toubro"
      className="partner-logo-img"
      loading="lazy"
    />
  ),

  RRKabel: () => (
    <img
      src="/images/partners/rrkabel.svg"
      alt="RR Kabel"
      className="partner-logo-img"
      loading="lazy"
    />
  ),

  ABB: () => (
    <img
      src="/images/partners/abb.svg"
      alt="ABB"
      className="partner-logo-img"
      loading="lazy"
    />
  ),

  CHINT: () => (
    <img
      src="/images/partners/chint.svg"
      alt="CHINT"
      className="partner-logo-img"
      loading="lazy"
    />
  ),

  BCH: () => (
    <img
      src="/images/partners/bch.webp"
      alt="BCH Electric Limited"
      className="partner-logo-img"
      loading="lazy"
    />
  ),

  INVT: () => (
    <img
      src="/images/partners/invt.png"
      alt="INVT Electric"
      className="partner-logo-img"
      loading="lazy"
    />
  ),

  Inovance: () => (
    <img
      src="/images/partners/inovance.svg"
      alt="Inovance Technology"
      className="partner-logo-img"
      loading="lazy"
    />
  ),

  VAGO: () => (
    <img
      src="/images/partners/vago.svg"
      alt="WAGO / VAGO"
      className="partner-logo-img"
      loading="lazy"
    />
  ),

  Multispan: () => (
    <img
      src="/images/partners/multispan.png"
      alt="Multispan Control Instruments"
      className="partner-logo-img"
      loading="lazy"
    />
  )
};

// Complete list of 13 official partners: Delta, Siemens, Schneider Electric, Mitsubishi, L&T, RR Kabel, ABB, CHINT, BCH, INVT, Inovance, VAGO, Multispan
export const PARTNERS_LIST = [
  { id: 'delta', name: 'Delta', Logo: PartnerLogos.Delta, src: '/images/partners/delta.svg' },
  { id: 'siemens', name: 'Siemens', Logo: PartnerLogos.Siemens, src: '/images/partners/siemens.svg' },
  { id: 'schneider', name: 'Schneider Electric', Logo: PartnerLogos.SchneiderElectric, src: '/images/partners/schneider.svg' },
  { id: 'mitsubishi', name: 'Mitsubishi', Logo: PartnerLogos.Mitsubishi, src: '/images/partners/mitsubishi.svg' },
  { id: 'lt', name: 'L&T', Logo: PartnerLogos.LT, src: '/images/partners/lt.svg' },
  { id: 'rrkabel', name: 'RR Kabel', Logo: PartnerLogos.RRKabel, src: '/images/partners/rrkabel.svg' },
  { id: 'abb', name: 'ABB', Logo: PartnerLogos.ABB, src: '/images/partners/abb.svg' },
  { id: 'chint', name: 'CHINT', Logo: PartnerLogos.CHINT, src: '/images/partners/chint.svg' },
  { id: 'bch', name: 'BCH', Logo: PartnerLogos.BCH, src: '/images/partners/bch.webp' },
  { id: 'invt', name: 'INVT', Logo: PartnerLogos.INVT, src: '/images/partners/invt.png' },
  { id: 'inovance', name: 'Inovance', Logo: PartnerLogos.Inovance, src: '/images/partners/inovance.svg' },
  { id: 'vago', name: 'VAGO', Logo: PartnerLogos.VAGO, src: '/images/partners/vago.svg' },
  { id: 'multispan', name: 'Multispan', Logo: PartnerLogos.Multispan, src: '/images/partners/multispan.png' }
];
