/**
 * Medical Representatives Directory Component
 * Structured registry placeholder with exact official notice.
 * Zero fabricated employees or credentials.
 */

import { REPRESENTATIVES_DATA } from '../data/medicalRepresentatives.js';

export function renderRepresentatives() {
  return `
    <section class="page-section" id="reps" style="background: var(--bg-secondary);" aria-label="Medical Representatives Directory">
      <div class="site-container">
        <div class="section-header-block reveal-on-scroll">
          <span class="section-label">Field Force Interface</span>
          <h2 class="heading-xl section-title">${REPRESENTATIVES_DATA.title}</h2>
          <p class="section-desc">${REPRESENTATIVES_DATA.subtitle}</p>
        </div>

        <div class="reps-registry-container reveal-on-scroll delay-1">
          <div class="reps-registry-header">
            <div>
              <h3 style="margin-bottom: 0.25rem;">Medical Representative Liaison Registry</h3>
              <p style="font-size: 0.82rem; color: var(--text-on-dark-muted); margin: 0;">
                Directory schema configured for Name, Division, Territory, Contact, and Field Status
              </p>
            </div>
            <span class="mono-tag" style="background: rgba(255, 255, 255, 0.15); color: var(--gold-light); padding: 0.35rem 0.75rem; border-radius: var(--radius-xs);">
              ROSTER PENDING OFFICIAL DEPLOYMENT
            </span>
          </div>

          <!-- Official Notice Strip -->
          <div class="reps-notice-strip">
            <div style="max-width: 600px; margin: 0 auto;">
              <svg style="width: 2.5rem; height: 2.5rem; color: var(--wine-primary); margin-bottom: 0.75rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h4 class="heading-md" style="margin-bottom: 0.5rem; color: var(--navy-primary);">
                “${REPRESENTATIVES_DATA.notice}”
              </h4>
              <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">
                For immediate medical queries, healthcare professional coordination, or therapeutic product inquiries, please connect directly through our corporate headquarters.
              </p>
              <div style="margin-top: 1.25rem;">
                <a href="#contact" class="btn-primary" style="font-size: 0.8rem; padding: 0.65rem 1.4rem;">
                  <span>Contact Headquarters</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Architectural Schema Structure Preview -->
          <div class="reps-schema-table-preview">
            <span class="mono-tag" style="display: block; margin-bottom: 0.75rem; font-weight: 600;">
              DIRECTORY SCHEMA BLUEPRINT (AWAITING DATA INJECTION)
            </span>
            <table class="schema-preview-table" aria-label="Field Force Schema Preview">
              <thead>
                <tr>
                  ${REPRESENTATIVES_DATA.meta.schemaFields.map(f => `
                    <th>${f.label}</th>
                  `).join('')}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>[Awaiting Roster]</td>
                  <td>[Assigned Division]</td>
                  <td>[Assigned Territory]</td>
                  <td>[Official Coordination]</td>
                  <td>[Official Portrait]</td>
                  <td><span class="mono-tag">[Pending Sync]</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `;
}
