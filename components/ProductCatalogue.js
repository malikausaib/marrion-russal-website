/**
 * Product Catalogue Component
 * Corporate pharmaceutical index with live search, family filtering, and zero ecommerce tropes.
 */

import { PRODUCTS, PRODUCT_FAMILIES } from '../data/products.js';
import { renderProductCard } from './ProductCard.js';

export function renderProductCatalogue(filteredProducts = PRODUCTS, activeFamily = "ALL", searchQuery = "") {
  return `
    <section class="page-section" id="products" aria-label="Product Catalogue">
      <div class="site-container">
        <div class="section-header-block reveal-on-scroll">
          <span class="section-label">Formulation Portfolio</span>
          <h2 class="heading-xl section-title">Pharmaceutical Formulations</h2>
          <p class="section-desc">
            Explore our portfolio of 30 specialized pharmaceutical products spanning gastrointestinal, respiratory, pediatric, analgesic, oral care, and dermatological healthcare therapies.
          </p>
        </div>

        <!-- Filter & Search Controls Bar -->
        <div class="catalogue-controls-bar reveal-on-scroll delay-1">
          <div class="catalogue-search-row">
            <div class="search-input-wrap">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="search" 
                id="product-search-input" 
                class="product-search-input" 
                placeholder="Search by formulation or family (e.g., Gasoril, Nasril, Softex)..." 
                value="${searchQuery}"
                aria-label="Search pharmaceutical products"
              />
            </div>

            <div class="catalogue-status-badge">
              <span>Showing:</span>
              <span class="count-num" id="catalogue-count">${filteredProducts.length}</span>
              <span>of ${PRODUCTS.length} Formulations</span>
            </div>
          </div>

          <!-- Product Family Pills -->
          <div class="catalogue-filter-pills" role="tablist" aria-label="Filter by Product Family">
            ${PRODUCT_FAMILIES.map(family => `
              <button 
                class="filter-pill ${activeFamily === family ? 'active' : ''}" 
                data-family="${family}"
                role="tab"
                aria-selected="${activeFamily === family ? 'true' : 'false'}"
              >
                ${family}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Products Grid Container -->
        <div class="products-catalogue-grid" id="products-grid">
          ${filteredProducts.length > 0 
            ? filteredProducts.map(renderProductCard).join('') 
            : renderEmptyCatalogue()
          }
        </div>
      </div>
    </section>
  `;
}

function renderEmptyCatalogue() {
  return `
    <div class="catalogue-empty-state">
      <svg class="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="heading-md" style="margin-bottom: 0.5rem; color: var(--navy-primary);">No Formulations Found</h3>
      <p style="color: var(--text-muted); font-size: 0.9rem; max-width: 45ch; margin: 0 auto 1.5rem auto;">
        No pharmaceutical formulations match your search criteria. Please reset the filter or search term.
      </p>
      <button class="btn-outline" id="reset-catalogue-btn" style="cursor: pointer;">
        Reset Catalogue Filters
      </button>
    </div>
  `;
}
