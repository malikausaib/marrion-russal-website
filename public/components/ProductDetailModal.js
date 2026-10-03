/**
 * Product Detail Modal Component
 * Renders dedicated formulation specifications and official Purchase Section.
 * Flow: Product Detail -> Purchase This Product -> [ Buy Via Email ] / [ Buy Via WhatsApp ]
 */

export const COMPANY_PURCHASE_DEFAULTS = {
  purchaseEmail: 'marrionrussal@gmail.com',
  whatsappNumber: '919149412102',
  whatsappDisplayNumber: '+91 9149412102'
};

/**
 * Returns active company purchase settings (supports backend config or localStorage override)
 */
export function getPurchaseSettings() {
  try {
    if (typeof window !== 'undefined' && window.__COMPANY_PURCHASE_SETTINGS) {
      return Object.assign({}, COMPANY_PURCHASE_DEFAULTS, window.__COMPANY_PURCHASE_SETTINGS);
    }
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('mrr_purchase_settings');
      if (saved) {
        return Object.assign({}, COMPANY_PURCHASE_DEFAULTS, JSON.parse(saved));
      }
    }
  } catch (e) {
    // fallback safely
  }
  return Object.assign({}, COMPANY_PURCHASE_DEFAULTS);
}

/**
 * Generates official mailto link for purchasing the product
 * @param {object|string} product - Product object or product name string
 * @returns {string} Fully encoded mailto link
 */
export function generateEmailPurchaseLink(product) {
  const name = (typeof product === 'object' && product !== null ? product.name : product || 'Pharmaceutical Product').trim();
  const settings = getPurchaseSettings();
  const email = settings.purchaseEmail || 'marrionrussal@gmail.com';
  const subject = `Purchase Request - ${name}`;
  const body = `Hello Marrion Russal Remedies,\n\nI would like to purchase the following product:\n\nProduct: ${name}\n\nPlease provide me with the availability, quantity options, pricing and purchase details.\n\nThank you.`;

  return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Generates official WhatsApp click-to-chat link for purchasing the product
 * @param {object|string} product - Product object or product name string
 * @returns {string} Fully encoded wa.me click-to-chat link
 */
export function generateWhatsAppPurchaseLink(product) {
  const name = (typeof product === 'object' && product !== null ? product.name : product || 'Pharmaceutical Product').trim();
  const settings = getPurchaseSettings();
  const number = settings.whatsappNumber || '919149412102';
  const message = `Hello Marrion Russal Remedies,\n\nI would like to purchase the following product:\n\nProduct: ${name}\n\nPlease provide me with the availability, quantity options, pricing and purchase details.\n\nThank you.`;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Renders the dedicated, visible and functional Purchase Section
 * @param {object} product
 * @returns {string} HTML markup
 */
export function renderPurchaseSection(product) {
  if (!product) return '';
  const emailLink = generateEmailPurchaseLink(product);
  const whatsappLink = generateWhatsAppPurchaseLink(product);
  const settings = getPurchaseSettings();

  return `
    <section class="modal-purchase-card" aria-label="Purchase This Product">
      <div class="purchase-header-wrap">
        <div class="purchase-badge-row">
          <span class="purchase-badge-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            OFFICIAL PURCHASE & BASKET DESK
          </span>
          <span class="purchase-badge-direct">DIRECT PROCUREMENT DESK</span>
        </div>

        <h3 class="purchase-section-title">PURCHASE THIS PRODUCT</h3>
        <p class="purchase-section-desc">
          You can purchase one or more products by adding them to your shopping basket.
        </p>
      </div>

      <!-- Multi-Product Basket Actions -->
      <div class="purchase-basket-actions-row">
        <button type="button" class="btn-purchase-action btn-add-basket-large" id="modal-add-basket-btn" data-product-id="${product.id}">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
          </svg>
          <span class="btn-purchase-label">ADD TO BASKET</span>
        </button>

        <button type="button" class="btn-purchase-action btn-view-basket-modal" id="modal-view-basket-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span class="btn-purchase-label">VIEW BASKET</span>
        </button>

        <button type="button" class="btn-purchase-action btn-continue-shopping-modal" id="modal-continue-shopping-btn">
          <span>CONTINUE SHOPPING</span>
        </button>
      </div>

      <!-- Single-Item Direct Options -->
      <div class="purchase-direct-options-block">
        <div class="purchase-direct-divider">
          <span>Or send individual product request directly</span>
        </div>
        <div class="purchase-actions-grid">
          <!-- Buy Via Email Action -->
          <a href="${emailLink}" 
             class="btn-purchase-action btn-buy-email" 
             id="btn-buy-email"
             data-product-name="${product.name}"
             aria-label="Buy ${product.name} via Email">
            <svg class="purchase-action-icon" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span class="btn-purchase-label">BUY VIA EMAIL</span>
          </a>

          <!-- Buy Via WhatsApp Action -->
          <a href="${whatsappLink}" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="btn-purchase-action btn-buy-whatsapp" 
             id="btn-buy-whatsapp"
             data-product-name="${product.name}"
             aria-label="Buy ${product.name} via WhatsApp">
            <svg class="purchase-action-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span class="btn-purchase-label">BUY VIA WHATSAPP</span>
          </a>
        </div>
      </div>

      <div class="purchase-meta-strip">
        <div class="purchase-meta-item">
          <span class="purchase-meta-label">Purchase Desk:</span>
          <a href="mailto:${settings.purchaseEmail}" class="purchase-meta-link">${settings.purchaseEmail}</a>
        </div>
        <span class="purchase-meta-dot">•</span>
        <div class="purchase-meta-item">
          <span class="purchase-meta-label">WhatsApp:</span>
          <a href="https://wa.me/${settings.whatsappNumber}" target="_blank" rel="noopener noreferrer" class="purchase-meta-link">${settings.whatsappDisplayNumber}</a>
        </div>
        <span class="purchase-meta-dot">•</span>
        <span class="purchase-meta-note">Multi-product basket and individual purchase requests supported.</span>
      </div>
    </section>
  `;
}

export function renderProductDetailModal(product) {
  if (!product) return '';

  return `
    <div class="modal-backdrop open" id="product-modal-root" role="dialog" aria-modal="true" aria-labelledby="modal-product-title">
      <div class="product-modal-dialog">
        <!-- Modal Header -->
        <div class="modal-header">
          <div class="modal-title-wrap">
            <div class="modal-badges-row">
              <span class="product-family-tag">${product.family}</span>
              <span class="product-formulation-tag">${product.formulation}</span>
              <span class="mono-tag" style="background: rgba(14, 165, 233, 0.1); color: var(--cyan-accent); padding: 0.2rem 0.5rem; border-radius: var(--radius-xs);">
                Status: Current
              </span>
            </div>
            <h2 class="modal-product-name" id="modal-product-title">${product.name}</h2>
            <span class="mono-tag" style="color: var(--text-muted); font-size: 0.72rem;">
              Division: ${product.division}
            </span>
          </div>

          <button class="modal-close-btn" id="modal-close-btn" aria-label="Close product details">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body">
          <!-- Image Column: Official Photo if present, or Clean Reference Placeholder -->
          <div class="modal-image-col">
            ${product.image ? `
            <div class="modal-product-photo-wrap">
              <img src="${product.image}" alt="${product.name} Packaging - Marrion Russal Remedies" class="modal-product-photo" />
            </div>
            ` : `
            <div class="modal-image-placeholder">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <span class="placeholder-text">Product Image</span>
              <span style="font-size: 0.75rem; color: var(--text-light); margin-top: 0.35rem;">[Image to be added]</span>
            </div>
            `}
            <div class="mono-tag" style="text-align: center; font-size: 0.68rem; color: var(--text-muted);">
              REF-ID: MRR-${(product.name || product.id).replace(/[^A-Z0-9]/gi, '').toUpperCase()}
            </div>
          </div>

          <!-- Specifications Column with Expandable Collapsible Accordions -->
          <div class="modal-specs-col">
            <div class="modal-specs-header-row">
              <span class="therapeutic-title-label">Product Specifications</span>
              <span class="spec-accordion-hint">Clinical formulation profile</span>
            </div>

            <div class="modal-specs-accordion" id="modal-specs-accordion">
              <details class="spec-accordion-item" open>
                <summary class="spec-accordion-header">
                  <span class="spec-accordion-title">Composition</span>
                  <span class="spec-accordion-icon" aria-hidden="true">▾</span>
                </summary>
                <div class="spec-accordion-body">
                  <div class="spec-field-inner">
                    ${product.composition && product.composition !== '[Information to be added]' && product.composition !== 'Information to be added'
                      ? `<div class="spec-value-content">${product.composition}</div>`
                      : `<div class="spec-value-placeholder">Information to be added</div>`}
                  </div>
                </div>
              </details>

              <details class="spec-accordion-item" open>
                <summary class="spec-accordion-header">
                  <span class="spec-accordion-title">Description</span>
                  <span class="spec-accordion-icon" aria-hidden="true">▾</span>
                </summary>
                <div class="spec-accordion-body">
                  <div class="spec-field-inner">
                    ${product.description && product.description !== '[Information to be added]' && product.description !== 'Information to be added'
                      ? `<div class="spec-value-content">${product.description}</div>`
                      : `<div class="spec-value-placeholder">Information to be added</div>`}
                  </div>
                </div>
              </details>

              <details class="spec-accordion-item" open>
                <summary class="spec-accordion-header">
                  <span class="spec-accordion-title">Indications</span>
                  <span class="spec-accordion-icon" aria-hidden="true">▾</span>
                </summary>
                <div class="spec-accordion-body">
                  <div class="spec-field-inner">
                    ${product.indications && product.indications !== '[Information to be added]' && product.indications !== 'Information to be added'
                      ? `<div class="spec-value-content">${product.indications}</div>`
                      : `<div class="spec-value-placeholder">Information to be added</div>`}
                  </div>
                </div>
              </details>

              <details class="spec-accordion-item" open>
                <summary class="spec-accordion-header">
                  <span class="spec-accordion-title">Dosage &amp; Administration</span>
                  <span class="spec-accordion-icon" aria-hidden="true">▾</span>
                </summary>
                <div class="spec-accordion-body">
                  <div class="spec-field-inner">
                    ${product.dosage && product.dosage !== '[Information to be added]' && product.dosage !== 'Information to be added'
                      ? `<div class="spec-value-content">${product.dosage}</div>`
                      : `<div class="spec-value-placeholder">Information to be added</div>`}
                  </div>
                </div>
              </details>

              <details class="spec-accordion-item" open>
                <summary class="spec-accordion-header">
                  <span class="spec-accordion-title">Packaging</span>
                  <span class="spec-accordion-icon" aria-hidden="true">▾</span>
                </summary>
                <div class="spec-accordion-body">
                  <div class="spec-field-inner">
                    ${product.packaging && product.packaging !== '[Information to be added]' && product.packaging !== 'Information to be added'
                      ? `<div class="spec-value-content">${product.packaging}</div>`
                      : `<div class="spec-value-placeholder">Information to be added</div>`}
                  </div>
                </div>
              </details>
            </div>
          </div>

          <!-- VISIBLE, FUNCTIONAL PURCHASE SECTION ON EVERY PRODUCT DETAIL PAGE -->
          ${renderPurchaseSection(product)}
        </div>

        <!-- Modal Footer / Return to Catalogue -->
        <div class="modal-footer-bar">
          <span class="modal-footer-tag">
            DATA STATUS: VERIFIED CATALOGUE ENTRY // ARCHIVAL COMPATIBLE
          </span>
          <button class="btn-outline" id="modal-back-btn" style="padding: 0.45rem 1.15rem; font-size: 0.78rem; cursor: pointer;">
            Return to Catalogue
          </button>
        </div>
      </div>
    </div>
  `;
}
