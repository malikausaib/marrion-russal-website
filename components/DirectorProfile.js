/**
 * Management Section Component
 * Executive leadership presented with prestigious editorial typography and monogram seals.
 * Zero invented biographies or credentials.
 */

import { DIRECTORS } from '../data/directors.js';

export function renderManagement() {
  return `
    <section class="page-section section-dark" id="management" aria-label="Company Leadership">
      <div class="site-container">
        <div class="section-header-block centered reveal-on-scroll">
          <span class="section-label dark">Executive Leadership</span>
          <h2 class="heading-xl section-title">Board of Directors</h2>
          <p class="section-desc">
            Guided by corporate stewardship and scientific commitment to advance pharmaceutical accessibility and healthcare trust.
          </p>
        </div>

        <div class="directors-editorial-grid">
          ${DIRECTORS.map((director, idx) => `
            <div class="director-card reveal-on-scroll delay-${idx + 1}">
              <div class="director-monogram-seal">
                <span>${director.initials}</span>
              </div>

              <span class="director-role-tag">${director.role}</span>
              <h3 class="director-name">${director.name}</h3>
              <p class="director-company-sub">${director.company}</p>

              <div class="director-card-divider"></div>

              <div class="director-designation-badge">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>${director.designationNotice}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
