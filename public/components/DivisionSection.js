/**
 * Divisions & Therapeutic Areas Showcase Component
 * Interactive editorial browser across the four official divisions.
 */

import { DIVISIONS } from '../data/divisions.js';

export function renderDivisions() {
  return `
    <section class="page-section" id="divisions" style="background: var(--bg-secondary);" aria-label="Company Divisions">
      <div class="site-container">
        <div class="section-header-block reveal-on-scroll">
          <span class="section-label">Therapeutic Portfolio</span>
          <h2 class="heading-xl section-title">Strategic Operational Divisions</h2>
          <p class="section-desc">
            Organized across four specialized divisions to address diverse healthcare needs with clinical precision and therapeutic consistency.
          </p>
        </div>

        <div class="divisions-container reveal-on-scroll delay-1">
          <!-- Interactive Division Navigation Sidebar -->
          <div class="divisions-nav-pane" role="tablist" aria-label="Company Divisions">
            ${DIVISIONS.map((div, idx) => `
              <button 
                class="division-nav-btn ${idx === 0 ? 'active' : ''}" 
                role="tab" 
                aria-selected="${idx === 0 ? 'true' : 'false'}"
                aria-controls="panel-${div.id}" 
                id="tab-${div.id}"
                data-division-id="${div.id}"
              >
                <div class="division-nav-meta">
                  <span class="division-nav-code">${div.code}</span>
                  <span class="division-nav-number">0${idx + 1}</span>
                </div>
                <div class="division-nav-title">${div.name}</div>
              </button>
            `).join('')}
          </div>

          <!-- Active Division Content Area -->
          <div class="divisions-content-pane" id="division-content-display">
            <!-- Populated via interactive JavaScript -->
            ${renderDivisionDetail(DIVISIONS[0])}
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderDivisionDetail(division) {
  const hasAreas = division.therapeuticAreas && division.therapeuticAreas.length > 0;

  return `
    <div class="division-detail-wrapper" id="panel-${division.id}" role="tabpanel" aria-labelledby="tab-${division.id}">
      <div class="division-detail-header">
        <span class="division-badge-code">${division.code} // CLASSIFICATION</span>
        <h3 class="division-detail-title">${division.name}</h3>
        <p class="division-detail-summary">${division.summary}</p>
      </div>

      <div class="division-therapeutic-block">
        <span class="therapeutic-title-label">
          ${hasAreas ? 'Designated Therapeutic Disciplines' : 'Specialized Therapeutic Focus'}
        </span>

        ${hasAreas ? `
          <div class="therapeutic-tags-grid">
            ${division.therapeuticAreas.map(area => `
              <div class="therapeutic-tag">
                <span class="therapeutic-tag-code">[${area.tag}]</span>
                <span>${area.name}</span>
              </div>
            `).join('')}
          </div>
        ` : `
          <div class="therapeutic-tags-grid">
            <div class="therapeutic-tag" style="background: var(--bg-tertiary); border-color: var(--border-subtle);">
              <span class="therapeutic-tag-code">[SPEC]</span>
              <span>${division.name.replace(' DIVISION', '')} SPECIALIZED FORMULATIONS</span>
            </div>
          </div>
          <p class="therapeutic-empty-notice" style="margin-top: 0.85rem;">
            No additional therapeutic areas have been provided. Specialized product portfolio details listed in the catalogue below.
          </p>
        `}
      </div>

      <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px dashed var(--border-light); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        <span class="mono-tag">Portfolio Status: Active</span>
        <a href="#products" class="product-action-link" style="font-size: 0.82rem;">
          <span>Explore Division Products</span>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  `;
}
