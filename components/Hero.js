/**
 * Hero Section Component
 * Striking editorial showcase with official logo mark, canvas motion, and motto.
 */

import { COMPANY_INFO } from '../data/companyInfo.js';

export function renderHero() {
  return `
    <section class="hero-section" id="home" aria-label="Hero Section">
      <canvas id="hero-canvas"></canvas>
      <div class="hero-backdrop-layer"></div>

      <div class="site-container hero-grid">
        <div class="hero-content reveal-on-scroll">
          <div class="hero-meta-strip">
            <span class="hero-badge-year">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ESTABLISHED ${COMPANY_INFO.yearEstablished}
            </span>
            <span class="section-label">Pharmaceutical Formulations</span>
          </div>

          <h1 class="heading-display hero-title">
            Marrion Russal
            <span class="highlight-line">Remedies</span>
          </h1>

          <div class="hero-motto-quote">
            “${COMPANY_INFO.motto}”
          </div>

          <p class="hero-lead-text">
            Dedicated to pharmaceutical precision and healthcare wellness since 2017. 
            Delivering quality formulations across General, Dental, and Dermatology disciplines 
            with unwavering scientific responsibility.
          </p>

          <div class="hero-cta-group">
            <a href="#products" class="btn-primary">
              <span>View Product Catalogue</span>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#about" class="btn-outline">
              <span>Corporate Profile</span>
            </a>
          </div>
        </div>

        <!-- Official Seal / Visual Showcase Card -->
        <div class="hero-visual-card reveal-on-scroll delay-1">
          <div class="hero-seal-container">
            <div class="hero-logo-frame">
              <img src="${COMPANY_INFO.logoPath}" alt="${COMPANY_INFO.officialName} Corporate Identity" class="hero-logo-img" />
            </div>

            <div class="hero-seal-divider"></div>

            <div class="hero-seal-meta">
              <div class="hero-seal-stat">
                <span class="hero-seal-stat-label">Inception</span>
                <span class="hero-seal-stat-val">${COMPANY_INFO.yearEstablished}</span>
              </div>
              <div class="hero-seal-stat">
                <span class="hero-seal-stat-label">Divisions</span>
                <span class="hero-seal-stat-val">04 Units</span>
              </div>
              <div class="hero-seal-stat">
                <span class="hero-seal-stat-label">Portfolio</span>
                <span class="hero-seal-stat-val">30 Formulations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ECG Motif Divider Strip -->
    <div class="ecg-strip" aria-hidden="true">
      <svg class="ecg-svg ecg-animated" viewBox="0 0 1200 40" preserveAspectRatio="none">
        <path d="M0,20 L150,20 L165,8 L175,32 L185,5 L195,35 L205,20 L400,20 L415,8 L425,32 L435,5 L445,35 L455,20 L700,20 L715,8 L725,32 L735,5 L745,35 L755,20 L980,20 L995,8 L1005,32 L1015,5 L1025,35 L1035,20 L1200,20" />
      </svg>
    </div>
  `;
}
