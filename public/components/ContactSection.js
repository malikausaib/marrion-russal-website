/**
 * Contact Section Component
 * Verified headquarters information, copy-email interaction, accessible message form.
 * Zero invented phone numbers or secondary channels.
 */

import { COMPANY_INFO } from '../data/companyInfo.js';

export function renderContact() {
  return `
    <section class="page-section" id="contact" aria-label="Contact Section">
      <div class="site-container">
        <div class="section-header-block reveal-on-scroll">
          <span class="section-label">Direct Communication</span>
          <h2 class="heading-xl section-title">Connect with Headquarters</h2>
          <p class="section-desc">
            Reach out to Marrion Russal Remedies Pvt. Ltd. for professional inquiries, institutional partnerships, or corporate communications.
          </p>
        </div>

        <div class="contact-editorial-grid">
          <!-- Corporate Contact Information Panel -->
          <div class="contact-info-panel reveal-on-scroll">
            <div>
              <h3 class="contact-company-title">${COMPANY_INFO.officialName}</h3>
              <div class="contact-motto-line">“${COMPANY_INFO.motto}”</div>

              <div class="contact-block-list">
                <!-- Registered Corporate Address -->
                <div class="contact-detail-block">
                  <div class="contact-icon-bubble">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div class="contact-text-wrap">
                    <span class="contact-detail-label">Headquarters & Registered Address</span>
                    <div class="contact-detail-content" style="white-space: pre-line;">
                      ${COMPANY_INFO.address.formatted}
                    </div>
                  </div>
                </div>

                <!-- Official Email Address with Copy Interaction -->
                <div class="contact-detail-block">
                  <div class="contact-icon-bubble">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div class="contact-text-wrap">
                    <span class="contact-detail-label">Official Corporate Correspondence</span>
                    <div class="contact-detail-content">
                      <a href="mailto:${COMPANY_INFO.email}" style="color: var(--surface-white); text-decoration: underline; font-weight: 600;">
                        ${COMPANY_INFO.email}
                      </a>
                    </div>
                    <div class="contact-email-action-row">
                      <button class="copy-email-btn" id="copy-email-btn" data-email="${COMPANY_INFO.email}">
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Copy Email Address</span>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Establishment Notice -->
                <div class="contact-detail-block">
                  <div class="contact-icon-bubble">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div class="contact-text-wrap">
                    <span class="contact-detail-label">Year of Establishment</span>
                    <div class="contact-detail-content font-mono">
                      ${COMPANY_INFO.yearEstablished} // Registered Entity
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Geographic Note -->
            <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <span class="mono-tag" style="color: var(--gold-light);">REGIONAL POSTAL CODE: 431001</span>
              <p style="font-size: 0.78rem; color: var(--text-on-dark-muted); margin-top: 0.35rem; line-height: 1.5;">
                Aurangabad, District Bullandshahar, Uttar Pradesh.
              </p>
            </div>
          </div>

          <!-- Interactive Corporate Inquiry Form Panel -->
          <div class="contact-form-panel reveal-on-scroll delay-1">
            <h3 class="form-title">Send a Formal Inquiry</h3>
            <p class="form-subtitle">
              Submit your inquiry to our corporate office. All messages are dispatched directly to our official correspondence desk.
            </p>

            <form class="inquiry-form" id="corporate-inquiry-form" novalidate>
              <div class="form-group">
                <label for="contact-name" class="form-label">Full Name / Organization *</label>
                <input type="text" id="contact-name" name="name" class="form-control" placeholder="e.g., Dr. Rajesh Sharma / Healthcare Entity" required />
              </div>

              <div class="form-group">
                <label for="contact-email" class="form-label">Your Email Address *</label>
                <input type="email" id="contact-email" name="email" class="form-control" placeholder="e.g., contact@organization.com" required />
              </div>

              <div class="form-group">
                <label for="contact-subject" class="form-label">Inquiry Classification *</label>
                <select id="contact-subject" name="subject" class="form-control" required>
                  <option value="">Select subject category...</option>
                  <option value="general-inquiry">General Corporate Inquiry</option>
                  <option value="product-portfolio">Formulation & Product Portfolio Inquiry</option>
                  <option value="distribution">Distribution / Operating Area Coordination</option>
                  <option value="medical-liaison">Medical Representative Query</option>
                  <option value="institutional">Institutional Partnership</option>
                </select>
              </div>

              <div class="form-group">
                <label for="contact-message" class="form-label">Your Message *</label>
                <textarea id="contact-message" name="message" class="form-control" placeholder="Specify details regarding your inquiry..." required></textarea>
              </div>

              <div class="form-feedback-alert" id="form-feedback"></div>

              <button type="submit" class="form-submit-btn">
                <span>Submit Corporate Inquiry</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
}
