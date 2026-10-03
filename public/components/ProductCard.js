/**
 * Product Card Component
 * Professional pharmaceutical presentation with exact product nomenclature.
 */

export function renderProductCard(product) {
  const imageHtml = product.image ? `
        <div class="product-card-image-wrap">
          <img src="${product.image}" alt="${product.name} - ${product.productType || product.formulation}" class="product-card-thumb" loading="lazy" />
        </div>` : '';

  return `
    <article 
      class="product-card" 
      data-product-id="${product.id}" 
      data-alias-id="${product.aliasId || product.id}"
      data-family="${product.family}"
      role="button"
      tabindex="0"
      aria-label="View specifications for ${product.name}"
    >
      <div>
        ${imageHtml}
        <div class="product-card-top">
          <span class="product-family-tag">${product.family}</span>
          <span class="product-formulation-tag">${product.productType || product.formulation}</span>
        </div>

        <h3 class="product-card-name">${product.name}</h3>

        <div class="product-card-meta">
          <div class="product-division-name">${product.division}</div>
        </div>
      </div>

      <div class="product-card-action">
        <button type="button" class="btn-card-action btn-card-view" data-product-id="${product.id}" aria-label="View specifications for ${product.name}">
          <span>View Product</span>
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <button type="button" class="btn-card-action btn-card-add-basket" data-product-id="${product.id}" aria-label="Add ${product.name} to basket">
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
          </svg>
          <span>ADD TO BASKET</span>
        </button>
      </div>
    </article>
  `;
}
