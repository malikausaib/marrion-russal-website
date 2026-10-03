/**
 * Navigation Component (Desktop Header & Mobile Drawer)
 */

import { COMPANY_INFO } from '../data/companyInfo.js';

export function renderNavigation() {
  return `
    <header class="site-header" id="main-header" role="banner">
      <div class="header-inner">
        <a href="#home" class="brand-link" aria-label="${COMPANY_INFO.brandName} Homepage">
          <div class="brand-logo-frame">
            <img src="${COMPANY_INFO.logoPath}" alt="${COMPANY_INFO.brandName} Official Brand Mark" class="brand-logo-img" />
          </div>
          <div class="brand-title-wrap">
            <span class="brand-name">${COMPANY_INFO.brandName}</span>
            <span class="brand-motto-sub">${COMPANY_INFO.motto}</span>
          </div>
        </a>

        <div class="header-right-actions">
          <!-- 3-Way Theme Switcher (Bright, Dark, Eye Care) -->
          <div class="theme-switcher-group" role="radiogroup" aria-label="Visual Theme">
            <button class="theme-toggle-btn active" data-theme-set="bright" title="Bright Mode" aria-label="Bright Mode">
              <span class="theme-icon">☀️</span><span class="theme-btn-label"> Bright</span>
            </button>
            <button class="theme-toggle-btn" data-theme-set="dark" title="Dark Mode" aria-label="Dark Mode">
              <span class="theme-icon">🌙</span><span class="theme-btn-label"> Dark</span>
            </button>
            <button class="theme-toggle-btn" data-theme-set="eye-care" title="Eye Protection Mode" aria-label="Eye Protection Mode">
              <span class="theme-icon">🛡️</span><span class="theme-btn-label"> Eye Care</span>
            </button>
          </div>

          <!-- Desktop Navigation -->
          <nav class="nav-desktop" aria-label="Main Navigation">
            <a href="#home" class="nav-link active">Home</a>
            <a href="#about" class="nav-link">About</a>
            <a href="#divisions" class="nav-link">Divisions</a>
            <a href="#products" class="nav-link">Products</a>
            <a href="#reach" class="nav-link">Our Reach</a>
            <a href="#basket" id="nav-basket-link" class="nav-link nav-basket-link" aria-label="Shopping Desk Basket">
              Shopping Desk <span class="nav-basket-badge" id="nav-basket-badge">0</span>
            </a>
            <a href="#contact" class="nav-cta-btn">Contact</a>
          </nav>

          <!-- Mobile Navigation Hamburger Button -->
          <button class="mobile-nav-toggle" id="mobile-toggle-btn" type="button" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="mobile-drawer">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Drawer Overlay -->
    <div class="mobile-drawer" id="mobile-drawer" aria-hidden="true">
      <div class="mobile-drawer-panel">
        <div class="mobile-drawer-header">
          <div class="brand-link" style="gap: 0.65rem;">
            <div class="brand-logo-frame" style="height: 2.5rem; width: 2.5rem;">
              <img src="${COMPANY_INFO.logoPath}" alt="${COMPANY_INFO.brandName} Official Brand Mark" class="brand-logo-img" />
            </div>
            <div class="brand-title-wrap">
              <span class="brand-name" style="font-size: 0.94rem;">${COMPANY_INFO.brandName}</span>
              <span class="brand-motto-sub" style="font-size: 0.62rem;">${COMPANY_INFO.motto}</span>
            </div>
          </div>
          <button class="modal-close-btn" id="mobile-close-btn" aria-label="Close mobile navigation menu">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ul class="mobile-nav-list">
          <li class="mobile-nav-item"><a href="#home" class="mobile-link"><span>🏠</span> HOME</a></li>
          <li class="mobile-nav-item"><a href="#about" class="mobile-link"><span>🏢</span> ABOUT</a></li>
          <li class="mobile-nav-item"><a href="#divisions" class="mobile-link"><span>🧪</span> DIVISIONS</a></li>
          <li class="mobile-nav-item"><a href="#products" class="mobile-link"><span>💊</span> PRODUCTS</a></li>
          <li class="mobile-nav-item"><a href="#reach" class="mobile-link"><span>🗺️</span> OUR REACH</a></li>
          <li class="mobile-nav-item"><a href="#basket" class="mobile-link" id="mobile-basket-link"><span>🛒</span> SHOPPING DESK (<span id="mobile-basket-badge">0</span>)</a></li>
          <li class="mobile-nav-item"><a href="#contact" class="mobile-link"><span>📞</span> CONTACT</a></li>
        </ul>

        <div class="mobile-drawer-footer">
          <span class="mono-tag">Est. ${COMPANY_INFO.yearEstablished}</span>
          <p style="font-size: 0.74rem; color: var(--text-muted); margin-top: 0.25rem;">
            ${COMPANY_INFO.address.inline}
          </p>
        </div>
      </div>
    </div>
  `;
}
