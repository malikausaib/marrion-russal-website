/**
 * Company Introduction Component
 * Editorial layout presenting strictly verified facts with official notice.
 */

import { COMPANY_INFO } from '../data/companyInfo.js';

export function renderCompanyIntro() {
  return `
    <section class="page-section" id="about" aria-label="Company Introduction">
      <div class="site-container">
        <div class="intro-editorial-grid">
          <!-- Editorial Text Column -->
          <div class="intro-content-col reveal-on-scroll">
            <span class="section-label">Established Corporate Identity</span>
            
            <h2 class="heading-xl" style="margin-bottom: var(--space-xs);">
              ${COMPANY_INFO.officialName}
            </h2>
            
            <div class="intro-statement">
              Serving Life. <span>Spreading Wellness.</span>
            </div>

            <p class="subheading-lead">
              Founded in 2017, Marrion Russal Remedies Pvt. Ltd. is an Indian pharmaceutical company 
              committed to delivering therapeutic excellence and accessible clinical solutions. 
              Our work is driven by scientific integrity, clinical consistency, and human wellness.
            </p>

            <div class="intro-card-fact-list">
              <div class="fact-item">
                <div class="fact-label">Official Entity</div>
                <div class="fact-value" style="font-size: 1.1rem; line-height: 1.3;">
                  ${COMPANY_INFO.officialName}
                </div>
              </div>

              <div class="fact-item wine">
                <div class="fact-label">Year of Establishment</div>
                <div class="fact-value">
                  ${COMPANY_INFO.yearEstablished}
                </div>
              </div>

              <div class="fact-item">
                <div class="fact-label">Registered Office</div>
                <div class="fact-value" style="font-size: 0.95rem; font-family: var(--font-sans); font-weight: 600; line-height: 1.4;">
                  Aurangabad, Bulandshahr, UP
                </div>
              </div>
            </div>

            <!-- Verified Information Notice -->
            <div class="intro-notice-banner">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <strong>Official Statement:</strong>
                <span>Company information will be updated here.</span>
              </div>
            </div>
          </div>

          <!-- Editorial Visual Column -->
          <div class="intro-visual-col reveal-on-scroll delay-1">
            <div class="intro-image-wrapper">
              <img src="assets/images/pharma_lab_architecture.jpg" alt="Pharmaceutical Research & Analytical Laboratory Architecture" />
              
              <div class="intro-image-badge">
                <div class="intro-image-badge-title">Scientific Precision</div>
                <div class="intro-image-badge-desc">
                  Rigorous manufacturing standards, quality control paradigms, and therapeutic compliance.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
