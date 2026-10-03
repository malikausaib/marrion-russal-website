/**
 * Corporate Footer Component
 * Strictly verified corporate records, navigation links, and legal notice.
 * Zero invented social media accounts or fake claims.
 */

import { COMPANY_INFO } from '../data/companyInfo.js';

export function renderFooter() {
  return `
    <footer class="site-footer" role="contentinfo">
      <div class="site-container">
        <div class="footer-top-grid">
          <!-- Brand Column -->
          <div class="footer-brand-col">
            <div class="footer-logo-seal">
              <img src="${COMPANY_INFO.logoPath}" alt="${COMPANY_INFO.officialName} Mark" class="footer-logo-img" />
            </div>
            <div class="footer-brand-name">${COMPANY_INFO.officialName}</div>
            <div class="footer-motto">“${COMPANY_INFO.motto}”</div>
            <p style="font-size: 0.82rem; color: var(--text-on-dark-muted); line-height: 1.6; margin-top: 0.5rem;">
              Committed to ethical pharmaceutical operations, clinical formulation quality, and human wellness since 2017.
            </p>
          </div>

          <!-- Quick Navigation -->
          <div>
            <div class="footer-col-title">Navigation</div>
            <ul class="footer-link-list">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Company</a></li>
              <li><a href="#divisions">Operational Divisions</a></li>
              <li><a href="#products">Product Catalogue</a></li>
            </ul>
          </div>

          <!-- Corporate Operations -->
          <div>
            <div class="footer-col-title">Operations</div>
            <ul class="footer-link-list">
              <li><a href="#reach">Our Reach & Territories</a></li>
              <li><a href="#basket">Shopping Desk</a></li>
              <li><a href="#contact">Direct Contact</a></li>
            </ul>
          </div>

          <!-- Corporate Headquarters Column -->
          <div>
            <div class="footer-col-title">Headquarters</div>
            <div class="footer-address-block">
              <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: var(--surface-white);">
                ${COMPANY_INFO.address.line1}
              </p>
              <p style="margin: 0 0 0.35rem 0;">
                ${COMPANY_INFO.address.street}
              </p>
              <p style="margin: 0 0 0.35rem 0;">
                ${COMPANY_INFO.address.districtState}
              </p>
              <p style="margin: 0 0 1rem 0; font-family: var(--font-mono); color: var(--gold-light);">
                PIN: ${COMPANY_INFO.address.pinCode}
              </p>
              <p style="margin: 0;">
                <a href="mailto:${COMPANY_INFO.email}" style="color: var(--surface-white); text-decoration: underline;">
                  ${COMPANY_INFO.email}
                </a>
              </p>
            </div>
          </div>
        </div>

        <!-- Footer Bottom Bar -->
        <div class="footer-bottom-bar">
          <div>
            &copy; 2017 &ndash; 2026 ${COMPANY_INFO.officialName}. All Rights Reserved.
          </div>
          <div style="display: flex; gap: 1.5rem; align-items: center;">
            <span class="mono-tag" style="color: var(--text-light);">
              ESTABLISHED ${COMPANY_INFO.yearEstablished}
            </span>
            <span class="mono-tag" style="color: var(--text-light);">
              AUTHENTICATED CORPORATE REGISTRY
            </span>
          </div>
        </div>
      </div>
    </footer>

    <!-- Toast Notification for Interactions -->
    <div class="toast-notification" id="toast-notify" role="alert" aria-live="polite"></div>
  `;
}
