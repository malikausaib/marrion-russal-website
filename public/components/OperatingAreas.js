/**
 * Operating Areas (Our Reach) Component
 * Architectural radar & distribution grid placeholder with strictly verified facts.
 * Zero invented cities, territories, or branches.
 */

import { REACH_DATA } from '../data/operatingAreas.js';

export function renderReach() {
  return `
    <section class="page-section" id="reach" aria-label="Our Reach">
      <div class="site-container">
        <div class="reach-editorial-wrapper">
          <div class="section-header-block reveal-on-scroll">
            <span class="section-label cyan">Field Operations</span>
            <h2 class="heading-xl section-title">${REACH_DATA.title}</h2>
            <p class="section-desc">${REACH_DATA.headline}</p>
          </div>

          <div class="reach-schematic-grid reveal-on-scroll delay-1">
            <!-- Architectural Radar Schematic Placeholder -->
            <div class="reach-radar-visual">
              <div class="reach-concentric-ring ring-1"></div>
              <div class="reach-concentric-ring ring-2"></div>
              <div class="reach-concentric-ring ring-3"></div>
              
              <div class="reach-radar-center">
                <div class="radar-pulse-dot"></div>
                <span class="mono-tag" style="color: var(--navy-primary); font-weight: 700;">
                  FIELD DISTRIBUTION GRID
                </span>
                <span style="font-size: 0.72rem; color: var(--text-muted); margin-top: 0.25rem;">
                  Awaiting Territory Mapping
                </span>
              </div>
            </div>

            <!-- Official Statement & Future Schema Integration Pane -->
            <div class="reach-data-notice-pane">
              <div class="official-notice-box">
                <div class="official-notice-title">Operational Presence</div>
                <p class="official-notice-text">
                  “${REACH_DATA.notice}”
                </p>
              </div>

              <div>
                <span class="therapeutic-title-label">System Architecture Readiness</span>
                <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.6;">
                  This interface is engineered to seamlessly ingest regional distribution networks, branch hubs, and field operational zones once official territorial records are assigned:
                </p>

                <div class="reach-future-schema-list">
                  <div class="schema-node-card">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span>States & Union Territories</span>
                  </div>

                  <div class="schema-node-card">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>City Distribution Hubs</span>
                  </div>

                  <div class="schema-node-card">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <span>Operational Field Zones</span>
                  </div>

                  <div class="schema-node-card">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Regional Liaisons</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
