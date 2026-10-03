"""
Script to update client.js with:
1. Enhanced MRR_BASKET supporting Shopping Desk, Checkout, Razorpay Payment, and Order Confirmation
2. MRR_ADMIN_PORTAL managing Orders, Pricing & Sales Status, and Audit Logs
3. Routing updates for #checkout and #admin
"""

with open('assets/js/client.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Marker to find start of MRR_BASKET
start_marker = "  // =========================================================================\n  // Pharmaceutical Product Shopping Desk / Basket System\n  // ========================================================================="
end_marker = "  window.MRR_BASKET = MRR_BASKET;"

assert start_marker in content, "start_marker not found"
assert end_marker in content, "end_marker not found"

new_basket_and_admin_code = """  // =========================================================================
  // Pharmaceutical Product Shopping Desk / Secure Online Purchase System
  // =========================================================================
  const MRR_BASKET = {
    storageKey: 'mrr_shopping_basket',
    items: [],
    pricingCatalog: {},
    currentView: 'basket', // 'basket', 'checkout', 'order-confirmed'
    isSubmitting: false,
    lastConfirmedOrder: null,
    lastConfirmedItems: [],

    init: function () {
      this.load();
      this.updateUI();
      this.bindTriggers();
      this.fetchLivePricing();
    },

    fetchLivePricing: function () {
      const self = this;
      fetch('/api/products')
        .then(res => res.json())
        .then(data => {
          if (data && data.success && Array.isArray(data.products)) {
            data.products.forEach(p => {
              self.pricingCatalog[p.id] = {
                price: p.price,
                sales_status: p.sales_status,
                prescription_required: p.prescription_required,
                is_purchasable: p.is_purchasable
              };
            });
            const root = document.getElementById('basket-drawer-root');
            if (root && root.classList.contains('open') && self.currentView === 'basket') {
              self.renderDrawer();
            }
          }
        })
        .catch(err => {
          // Graceful offline fallback
        });
    },

    bindTriggers: function () {
      const self = this;
      const floatingBtn = document.getElementById('floating-basket-btn');
      if (floatingBtn) {
        floatingBtn.addEventListener('click', function (e) {
          e.preventDefault();
          self.openDrawer('basket');
        });
      }

      const navBtn = document.getElementById('nav-basket-link');
      if (navBtn) {
        navBtn.addEventListener('click', function (e) {
          e.preventDefault();
          self.openDrawer('basket');
        });
      }

      const mobileBtn = document.getElementById('mobile-basket-link');
      if (mobileBtn) {
        mobileBtn.addEventListener('click', function (e) {
          e.preventDefault();
          const mobileDrawer = document.getElementById('mobile-drawer');
          if (mobileDrawer) mobileDrawer.classList.remove('open');
          self.openDrawer('basket');
        });
      }

      window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          const drawerRoot = document.getElementById('basket-drawer-root');
          if (drawerRoot && drawerRoot.classList.contains('open')) {
            self.closeDrawer();
          }
        }
      });
    },

    load: function () {
      try {
        const raw = localStorage.getItem(this.storageKey);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            this.items = parsed.filter(item => item && item.productId && typeof item.quantity === 'number' && item.quantity > 0);
          }
        }
      } catch (e) {
        this.items = [];
      }
    },

    save: function () {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(this.items));
      } catch (e) {}
    },

    getDetailedItems: function () {
      const self = this;
      return this.items.map(item => {
        const prod = PRODUCTS.find(p => p.id === item.productId);
        const live = self.pricingCatalog[item.productId] || {};
        const price = (typeof live.price === 'number') ? live.price : (prod && typeof prod.price === 'number' ? prod.price : null);
        const salesStatus = live.sales_status || (prod && prod.sales_status) || 'REQUIRES VERIFICATION';
        const isPurchasable = (price !== null && price > 0 && salesStatus === 'AVAILABLE FOR ONLINE PURCHASE');

        return {
          productId: item.productId,
          quantity: item.quantity,
          product: prod || null,
          isAvailable: !!prod,
          price: price,
          salesStatus: salesStatus,
          isPurchasable: isPurchasable,
          subtotal: price ? Math.round(price * item.quantity * 100) / 100 : 0
        };
      });
    },

    add: function (productId, qty = 1) {
      const prod = PRODUCTS.find(p => p.id === productId);
      const prodName = prod ? prod.name : 'Pharmaceutical Product';
      const existing = this.items.find(x => x.productId === productId);

      if (existing) {
        existing.quantity += qty;
      } else {
        this.items.push({ productId: productId, quantity: qty });
      }

      this.save();
      this.updateUI();
      this.animateBadge();
      showToast('✓ ' + prodName + ' added to your basket');

      const drawerRoot = document.getElementById('basket-drawer-root');
      if (drawerRoot && drawerRoot.classList.contains('open')) {
        this.renderDrawer();
      }
    },

    updateQuantity: function (productId, newQty) {
      const idx = this.items.findIndex(x => x.productId === productId);
      if (idx === -1) return;

      if (newQty <= 0) {
        this.remove(productId);
        return;
      }

      this.items[idx].quantity = newQty;
      this.save();
      this.updateUI();
      this.renderDrawer();
    },

    remove: function (productId) {
      const prod = PRODUCTS.find(p => p.id === productId);
      const prodName = prod ? prod.name : 'Product';
      this.items = this.items.filter(x => x.productId !== productId);
      this.save();
      this.updateUI();
      this.renderDrawer();
      showToast('Removed ' + prodName + ' from basket');
    },

    clear: function () {
      this.items = [];
      this.save();
      this.updateUI();
      this.renderDrawer();
    },

    getTotalProducts: function () {
      return this.items.length;
    },

    getTotalQuantity: function () {
      return this.items.reduce((sum, item) => sum + item.quantity, 0);
    },

    generateEmailPurchaseLink: function () {
      const detailed = this.getDetailedItems().filter(x => x.isAvailable);
      const settings = MRR_PURCHASE_CONFIG.getSettings();
      const email = settings.purchaseEmail || 'marrionrussal@gmail.com';
      const totalDiff = detailed.length;
      const totalQty = detailed.reduce((sum, x) => sum + x.quantity, 0);

      const itemsText = detailed.map((item, index) => {
        return `${index + 1}. ${item.product.name}\\n   Quantity: ${item.quantity}`;
      }).join('\\n\\n');

      const subject = 'Purchase Request - Marrion Russal Remedies';
      const body = `Hello Marrion Russal Remedies,\\n\\nI would like to purchase the following products:\\n\\n${itemsText}\\n\\nTotal different products: ${totalDiff}\\nTotal quantity: ${totalQty}\\n\\nPlease provide me with the availability, pricing and purchase details.\\n\\nThank you.`;

      return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    },

    generateWhatsAppPurchaseLink: function () {
      const detailed = this.getDetailedItems().filter(x => x.isAvailable);
      const settings = MRR_PURCHASE_CONFIG.getSettings();
      const number = settings.whatsappNumber || '919149412102';
      const totalDiff = detailed.length;
      const totalQty = detailed.reduce((sum, x) => sum + x.quantity, 0);

      const itemsText = detailed.map((item, index) => {
        return `${index + 1}. ${item.product.name}\\nQuantity: ${item.quantity}`;
      }).join('\\n\\n');

      const message = `Hello Marrion Russal Remedies,\\n\\nI would like to purchase the following products:\\n\\n${itemsText}\\n\\nTotal different products: ${totalDiff}\\nTotal quantity: ${totalQty}\\n\\nPlease provide me with the availability, pricing and purchase details.\\n\\nThank you.`;

      return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    },

    updateUI: function () {
      const totalProducts = this.getTotalProducts();
      const floatingBadge = document.getElementById('basket-badge-count');
      const floatingSubtitle = document.getElementById('floating-basket-subtitle');
      const navBadge = document.getElementById('nav-basket-badge');
      const mobileBadge = document.getElementById('mobile-basket-badge');

      if (floatingBadge) floatingBadge.textContent = totalProducts;
      if (navBadge) navBadge.textContent = totalProducts;
      if (mobileBadge) mobileBadge.textContent = totalProducts;

      if (floatingSubtitle) {
        floatingSubtitle.textContent = totalProducts === 1 ? '1 PRODUCT' : totalProducts + ' PRODUCTS';
      }

      const floatingWrap = document.getElementById('floating-basket-wrap');
      if (floatingWrap) {
        if (totalProducts > 0) {
          floatingWrap.classList.add('has-items');
        } else {
          floatingWrap.classList.remove('has-items');
        }
      }
    },

    animateBadge: function () {
      const badges = [
        document.getElementById('basket-badge-count'),
        document.getElementById('nav-basket-badge'),
        document.getElementById('mobile-basket-badge')
      ];
      badges.forEach(b => {
        if (b) {
          b.classList.remove('badge-pop');
          void b.offsetWidth;
          b.classList.add('badge-pop');
        }
      });
    },

    openDrawer: function (view) {
      this.currentView = view || 'basket';
      let root = document.getElementById('basket-drawer-root');
      if (!root) {
        root = document.createElement('div');
        root.id = 'basket-drawer-root';
        root.className = 'basket-drawer-root';
        document.body.appendChild(root);
      }

      root.innerHTML = `
        <div class="basket-drawer-backdrop" id="basket-drawer-backdrop">
          <div class="basket-drawer-panel" id="basket-drawer-panel" role="dialog" aria-modal="true" aria-labelledby="basket-drawer-title">
            <div class="basket-drawer-header">
              <div class="basket-header-info">
                <div class="basket-brand-tag">
                  <span class="basket-tag-dot"></span>
                  MARRION RUSSAL REMEDIES
                </div>
                <h2 class="basket-drawer-title" id="basket-drawer-title">YOUR SHOPPING DESK</h2>
                <p class="basket-drawer-subtitle" id="basket-drawer-subtitle">Review the products you are interested in purchasing before proceeding.</p>
              </div>
              <button class="basket-close-btn" id="basket-close-btn" aria-label="Close Shopping Desk">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="basket-drawer-body" id="basket-drawer-body"></div>
          </div>
        </div>
      `;

      root.classList.add('open');
      root.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      const floatingBtn = document.getElementById('floating-basket-btn');
      if (floatingBtn) floatingBtn.setAttribute('aria-expanded', 'true');

      this.renderDrawer();
    },

    closeDrawer: function () {
      const root = document.getElementById('basket-drawer-root');
      if (!root) return;
      root.classList.remove('open');
      root.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      const floatingBtn = document.getElementById('floating-basket-btn');
      if (floatingBtn) floatingBtn.setAttribute('aria-expanded', 'false');

      if (window.location.hash === '#basket' || window.location.hash === '#shopping-desk' || window.location.hash === '#checkout') {
        history.pushState(null, '', '#products');
      }
      this.currentView = 'basket';
    },

    renderDrawer: function () {
      const self = this;
      const body = document.getElementById('basket-drawer-body');
      const title = document.getElementById('basket-drawer-title');
      const subtitle = document.getElementById('basket-drawer-subtitle');
      if (!body) return;

      const detailed = this.getDetailedItems();
      const totalProducts = detailed.length;
      const totalQty = detailed.reduce((sum, x) => sum + x.quantity, 0);
      const totalPayable = detailed.filter(x => x.isPurchasable).reduce((sum, x) => sum + x.subtotal, 0);
      const unpurchasableItems = detailed.filter(x => !x.isPurchasable);
      const allPurchasable = (totalProducts > 0 && unpurchasableItems.length === 0);

      // =======================================================================
      // VIEW 1: Shopping Desk Basket
      // =======================================================================
      if (this.currentView === 'basket') {
        if (title) title.textContent = 'YOUR SHOPPING DESK';
        if (subtitle) subtitle.textContent = 'Review selected pharmaceutical formulations before proceeding to checkout.';

        if (totalProducts === 0) {
          body.innerHTML = `
            <div class="basket-empty-state">
              <svg class="basket-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h3 class="basket-empty-title">YOUR SHOPPING BASKET IS EMPTY</h3>
              <p class="basket-empty-text">Explore our official product catalogue and add formulations to your basket.</p>
              <a href="#products" class="btn-explore-catalogue" id="basket-empty-explore-btn">
                <span>EXPLORE PRODUCTS</span>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          `;

          const exploreBtn = document.getElementById('basket-empty-explore-btn');
          if (exploreBtn) {
            exploreBtn.addEventListener('click', function () {
              self.closeDrawer();
            });
          }
        } else {
          const itemsHtml = detailed.map(item => {
            const p = item.product || { name: 'Formulation', family: 'MRR', formulation: 'Dosage', division: 'GENERAL' };
            let complianceBadge = '';
            let priceSnippet = '';

            if (item.isPurchasable) {
              complianceBadge = `<span class="compliance-badge badge-available">✓ Available for Online Purchase</span>`;
              priceSnippet = `
                <div class="basket-item-price-row">
                  <span class="basket-item-price">₹${item.price.toFixed(2)} / unit</span>
                  <span class="basket-item-subtotal">₹${item.subtotal.toFixed(2)}</span>
                </div>
              `;
            } else if (item.salesStatus === 'REQUIRES VERIFICATION') {
              complianceBadge = `<span class="compliance-badge badge-verification">⚠️ Requires Verification</span>`;
              priceSnippet = `
                <div class="basket-item-price-row">
                  <span class="basket-item-price" style="color: #92400e;">Quotation Upon Verification</span>
                </div>
              `;
            } else {
              complianceBadge = `<span class="compliance-badge badge-unpriced">🔒 Price Pending Configuration</span>`;
              priceSnippet = `
                <div class="basket-item-price-row">
                  <span class="basket-item-price" style="color: #64748b;">Awaiting Admin Price</span>
                </div>
              `;
            }

            return `
              <div class="basket-item-card" data-basket-id="${item.productId}">
                <div class="basket-item-thumb">
                  <img src="assets/images/logo_square.png" alt="${p.name}" />
                </div>
                <div class="basket-item-content">
                  <div class="basket-item-tags">
                    <span class="product-family-tag">${p.family}</span>
                    <span class="product-formulation-tag">${p.formulation}</span>
                  </div>
                  <h4 class="basket-item-name">${p.name}</h4>
                  <span class="basket-item-division">${p.division}</span>
                  <div>${complianceBadge}</div>
                  ${priceSnippet}
                  <div class="basket-item-controls">
                    <div class="basket-qty-stepper" role="group" aria-label="Quantity for ${p.name}">
                      <button class="basket-stepper-btn btn-stepper-minus" data-step-id="${item.productId}" aria-label="Decrease quantity of ${p.name}">−</button>
                      <span class="basket-qty-val" aria-live="polite">${item.quantity}</span>
                      <button class="basket-stepper-btn btn-stepper-plus" data-step-id="${item.productId}" aria-label="Increase quantity of ${p.name}">+</button>
                    </div>
                    <button class="basket-item-remove-btn" data-remove-id="${item.productId}" aria-label="Remove ${p.name} from basket">
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            `;
          }).join('');

          let warningNotice = '';
          if (unpurchasableItems.length > 0) {
            warningNotice = `
              <div class="compliance-warning-box">
                <strong>Pharmaceutical Notice:</strong> ${unpurchasableItems.length} formulation(s) in your basket require company verification or official price configuration before online payment. Please remove them to proceed with checkout, or use the direct inquiry buttons below.
              </div>
            `;
          }

          body.innerHTML = `
            <div class="basket-items-list">
              ${itemsHtml}
            </div>

            ${warningNotice}

            <div class="basket-summary-card">
              <div class="basket-summary-row">
                <span class="basket-summary-label">TOTAL PRODUCTS</span>
                <span class="basket-summary-val">${totalProducts}</span>
              </div>
              <div class="basket-summary-row">
                <span class="basket-summary-label">TOTAL QUANTITY</span>
                <span class="basket-summary-val">${totalQty}</span>
              </div>
              <div class="basket-summary-row" style="margin-top: 0.35rem; padding-top: 0.5rem; border-top: 1px dashed var(--border-light);">
                <span class="basket-summary-label" style="font-weight: 800; color: var(--navy-primary);">TOTAL PAYABLE</span>
                <span class="basket-summary-val" style="font-size: 1.15rem; color: var(--wine-primary);">₹${totalPayable.toFixed(2)}</span>
              </div>
              <div class="basket-disclaimer">
                Direct pharmaceutical procurement. Pricing, availability, and batch dispatch details are verified directly on our enterprise servers.
              </div>
            </div>

            <div class="basket-drawer-footer">
              <button class="btn-proceed-purchase" id="basket-proceed-btn" ${!allPurchasable ? 'style="opacity: 0.85;"' : ''}>
                <span>${allPurchasable ? 'PROCEED TO CHECKOUT →' : 'PROCEED TO CHECKOUT'}</span>
              </button>
              <button class="btn-continue-shopping-drawer" id="basket-continue-btn">
                CONTINUE SHOPPING
              </button>
            </div>
          `;
        }
      }

      // =======================================================================
      // VIEW 2: Checkout & Delivery Form
      // =======================================================================
      else if (this.currentView === 'checkout') {
        if (title) title.textContent = 'CHECKOUT & DELIVERY';
        if (subtitle) subtitle.textContent = 'Provide delivery address and contact information for official pharmaceutical order dispatch.';

        const summaryRows = detailed.filter(x => x.isPurchasable).map(x => `
          <tr>
            <td style="font-weight: 700; color: var(--navy-primary);">${x.product.name}</td>
            <td style="font-family: var(--font-mono);">${x.quantity}</td>
            <td style="font-family: var(--font-mono);">₹${x.price.toFixed(2)}</td>
            <td class="col-subtotal" style="color: var(--wine-primary);">₹${x.subtotal.toFixed(2)}</td>
          </tr>
        `).join('');

        body.innerHTML = `
          <div class="checkout-view">
            <div class="checkout-section-box">
              <div class="checkout-section-header">
                <svg class="checkout-section-icon" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 class="checkout-section-title">DELIVERY INFORMATION</h3>
              </div>
              <form id="checkout-customer-form" class="checkout-form-grid" onsubmit="return false;">
                <div class="checkout-form-group full-width">
                  <label class="checkout-label" for="checkout-name">Full Name <span class="required-star">*</span></label>
                  <input type="text" id="checkout-name" class="checkout-input" placeholder="e.g. Dr. Ramesh Kumar" required />
                </div>
                <div class="checkout-form-group">
                  <label class="checkout-label" for="checkout-phone">Mobile Number <span class="required-star">*</span></label>
                  <input type="tel" id="checkout-phone" class="checkout-input" placeholder="10-digit mobile" maxlength="10" required />
                </div>
                <div class="checkout-form-group">
                  <label class="checkout-label" for="checkout-email">Email Address <span class="required-star">*</span></label>
                  <input type="email" id="checkout-email" class="checkout-input" placeholder="name@domain.com" required />
                </div>
                <div class="checkout-form-group full-width">
                  <label class="checkout-label" for="checkout-address">Delivery Address <span class="required-star">*</span></label>
                  <textarea id="checkout-address" class="checkout-textarea" placeholder="Premises, Clinical Center, Street, Landmark" required></textarea>
                </div>
                <div class="checkout-form-group">
                  <label class="checkout-label" for="checkout-city">City <span class="required-star">*</span></label>
                  <input type="text" id="checkout-city" class="checkout-input" placeholder="City" required />
                </div>
                <div class="checkout-form-group">
                  <label class="checkout-label" for="checkout-state">State <span class="required-star">*</span></label>
                  <input type="text" id="checkout-state" class="checkout-input" placeholder="State" value="Uttar Pradesh" required />
                </div>
                <div class="checkout-form-group full-width">
                  <label class="checkout-label" for="checkout-pincode">PIN Code <span class="required-star">*</span></label>
                  <input type="text" id="checkout-pincode" class="checkout-input" placeholder="6-digit postal PIN" maxlength="6" required />
                </div>
              </form>
            </div>

            <div class="checkout-section-box">
              <div class="checkout-section-header">
                <svg class="checkout-section-icon" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 class="checkout-section-title">ORDER SUMMARY</h3>
              </div>
              <table class="checkout-summary-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th style="text-align: right;">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${summaryRows}
                </tbody>
              </table>
              <div class="checkout-total-row">
                <span class="checkout-total-label">TOTAL AMOUNT</span>
                <span class="checkout-total-amount">₹${totalPayable.toFixed(2)}</span>
              </div>
            </div>

            <div class="checkout-actions-wrap">
              <button class="btn-pay-now" id="btn-submit-pay-now">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>PAY NOW • ₹${totalPayable.toFixed(2)}</span>
              </button>
              <div class="checkout-pci-badge">
                <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clip-rule="evenodd" />
                </svg>
                <span>100% PCI-DSS Compliant • Encrypted Provider-Controlled Payment Gateway</span>
              </div>
              <button class="btn-back-to-basket" id="btn-checkout-back-basket">
                <span>← EDIT BASKET</span>
              </button>
            </div>
          </div>
        `;

        const payBtn = document.getElementById('btn-submit-pay-now');
        if (payBtn) {
          payBtn.onclick = () => self.handleCheckoutPayNow();
        }

        const backBtn = document.getElementById('btn-checkout-back-basket');
        if (backBtn) {
          backBtn.onclick = () => {
            self.currentView = 'basket';
            self.renderDrawer();
          };
        }
      }

      // =======================================================================
      // VIEW 3: Order Confirmed Screen
      // =======================================================================
      else if (this.currentView === 'order-confirmed') {
        if (title) title.textContent = 'ORDER CONFIRMED';
        if (subtitle) subtitle.textContent = 'Thank you for your purchase.';

        const order = self.lastConfirmedOrder || {};
        const items = self.lastConfirmedItems || [];

        const itemsRows = items.map(x => `
          <div class="receipt-row">
            <span class="receipt-label">${x.product_name} × ${x.quantity}</span>
            <span class="receipt-val font-mono">₹${parseFloat(x.subtotal).toFixed(2)}</span>
          </div>
        `).join('');

        body.innerHTML = `
          <div class="order-confirmed-view">
            <div class="order-confirmed-icon-circle">
              <svg width="34" height="34" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 class="order-confirmed-title">ORDER CONFIRMED</h2>
            <p class="order-confirmed-subtitle">Thank you for your purchase.</p>

            <div class="order-confirmed-receipt">
              <div class="receipt-row">
                <span class="receipt-label">Order ID:</span>
                <span class="receipt-val order-id-highlight">#${order.order_number || 'MRR-CONFIRMED'}</span>
              </div>
              <div class="receipt-row">
                <span class="receipt-label">Payment:</span>
                <span class="receipt-val" style="color: #065f46;">Successful (${order.gateway_name || 'Razorpay'})</span>
              </div>
              <div class="receipt-row">
                <span class="receipt-label">Transaction ID:</span>
                <span class="receipt-val font-mono" style="font-size: 0.78rem;">${order.gateway_payment_id || 'pay_verified'}</span>
              </div>
              <div class="receipt-row">
                <span class="receipt-label">Customer Name:</span>
                <span class="receipt-val">${order.customer_name || 'Valued Customer'}</span>
              </div>
              <div class="receipt-row">
                <span class="receipt-label">Contact Mobile:</span>
                <span class="receipt-val">${order.customer_phone || ''}</span>
              </div>
              <div class="receipt-row">
                <span class="receipt-label">Delivery Address:</span>
                <span class="receipt-val" style="text-align: right; max-width: 60%;">${order.delivery_address || ''}, ${order.city || ''}, ${order.state || ''} - ${order.pin_code || ''}</span>
              </div>
              <div style="margin: 0.4rem 0; border-top: 1px dashed var(--border-light); padding-top: 0.4rem;">
                ${itemsRows}
              </div>
              <div class="receipt-row" style="margin-top: 0.35rem; font-weight: 800;">
                <span class="receipt-label" style="color: var(--navy-primary); font-size: 0.95rem;">TOTAL PAID:</span>
                <span class="receipt-val" style="color: var(--wine-primary); font-size: 1.15rem;">₹${parseFloat(order.total_amount || 0).toFixed(2)}</span>
              </div>
            </div>

            <div style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.45; text-align: center;">
              We have received your order. An official confirmation email has been dispatched to <strong>${order.customer_email || 'your email'}</strong>.
            </div>

            <div class="order-support-box">
              <span style="font-weight: 700; color: var(--navy-primary);">Need help with your order?</span>
              <a href="https://wa.me/919149412102?text=Hello%20Marrion%20Russal%20Remedies,%20I%20need%20assistance%20with%20Order%20%23${order.order_number}" target="_blank" rel="noopener noreferrer" class="btn-support-whatsapp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>Contact us on WhatsApp</span>
              </a>
              <span style="font-size: 0.76rem;">Direct Email: <a href="mailto:marrionrussal@gmail.com" style="color: var(--wine-primary); font-weight: 700;">marrionrussal@gmail.com</a></span>
            </div>

            <div style="padding: 1rem 0;">
              <button class="btn-proceed-purchase" id="btn-confirmed-browse-more">
                CONTINUE BROWSING CATALOGUE
              </button>
            </div>
          </div>
        `;

        const browseMoreBtn = document.getElementById('btn-confirmed-browse-more');
        if (browseMoreBtn) {
          browseMoreBtn.onclick = () => self.closeDrawer();
        }
      }

      // Attach common drawer listeners
      const closeBtn = document.getElementById('basket-close-btn');
      if (closeBtn) closeBtn.onclick = () => self.closeDrawer();

      const backdrop = document.getElementById('basket-drawer-backdrop');
      if (backdrop) {
        backdrop.onclick = function (e) {
          if (e.target === backdrop) self.closeDrawer();
        };
      }

      const proceedBtn = document.getElementById('basket-proceed-btn');
      if (proceedBtn) {
        proceedBtn.onclick = function () {
          if (!allPurchasable) {
            showToast('⚠️ Please remove unverified formulations to proceed with online purchase.');
            return;
          }
          self.currentView = 'checkout';
          self.renderDrawer();
        };
      }

      const continueBtn = document.getElementById('basket-continue-btn');
      if (continueBtn) {
        continueBtn.onclick = () => self.closeDrawer();
      }

      // Stepper Plus and Minus listeners
      body.querySelectorAll('.btn-stepper-plus').forEach(btn => {
        btn.onclick = function (e) {
          e.stopPropagation();
          const pid = btn.getAttribute('data-step-id');
          const item = self.items.find(x => x.productId === pid);
          if (item) self.updateQuantity(pid, item.quantity + 1);
        };
      });

      body.querySelectorAll('.btn-stepper-minus').forEach(btn => {
        btn.onclick = function (e) {
          e.stopPropagation();
          const pid = btn.getAttribute('data-step-id');
          const item = self.items.find(x => x.productId === pid);
          if (item) self.updateQuantity(pid, item.quantity - 1);
        };
      });

      body.querySelectorAll('.basket-item-remove-btn').forEach(btn => {
        btn.onclick = function (e) {
          e.stopPropagation();
          const pid = btn.getAttribute('data-remove-id');
          if (pid) self.remove(pid);
        };
      });
    },

    handleCheckoutPayNow: function () {
      const self = this;
      if (this.isSubmitting) return;

      const nameInput = document.getElementById('checkout-name');
      const phoneInput = document.getElementById('checkout-phone');
      const emailInput = document.getElementById('checkout-email');
      const addressInput = document.getElementById('checkout-address');
      const cityInput = document.getElementById('checkout-city');
      const stateInput = document.getElementById('checkout-state');
      const pincodeInput = document.getElementById('checkout-pincode');

      const name = (nameInput ? nameInput.value : '').trim();
      const phone = (phoneInput ? phoneInput.value : '').trim();
      const email = (emailInput ? emailInput.value : '').trim();
      const address = (addressInput ? addressInput.value : '').trim();
      const city = (cityInput ? cityInput.value : '').trim();
      const state = (stateInput ? stateInput.value : '').trim();
      const pincode = (pincodeInput ? pincodeInput.value : '').trim();

      if (!name || name.length < 2) {
        showToast('Please enter your full name.');
        if (nameInput) nameInput.focus();
        return;
      }

      const phoneClean = phone.replace(/[\\s\\-+]/g, '');
      if (phoneClean.length < 10 || !/^\\d+$/.test(phoneClean)) {
        showToast('Please enter a valid 10-digit mobile number.');
        if (phoneInput) phoneInput.focus();
        return;
      }

      if (!email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
        showToast('Please enter a valid email address.');
        if (emailInput) emailInput.focus();
        return;
      }

      if (!address || address.length < 5) {
        showToast('Please enter your complete delivery address.');
        if (addressInput) addressInput.focus();
        return;
      }

      if (!city) {
        showToast('Please enter delivery city.');
        if (cityInput) cityInput.focus();
        return;
      }

      if (!state) {
        showToast('Please enter delivery state.');
        if (stateInput) stateInput.focus();
        return;
      }

      if (!pincode || !/^\\d{6}$/.test(pincode)) {
        showToast('Please enter a valid 6-digit postal PIN code.');
        if (pincodeInput) pincodeInput.focus();
        return;
      }

      const purchasableItems = this.getDetailedItems().filter(x => x.isPurchasable);
      if (purchasableItems.length === 0) {
        showToast('No purchasable items in basket.');
        return;
      }

      const customerPayload = {
        name: name,
        phone: phoneClean,
        email: email,
        address: address,
        city: city,
        state: state,
        pin_code: pincode
      };

      const itemsPayload = purchasableItems.map(x => ({
        productId: x.productId,
        quantity: x.quantity
      }));

      const payBtn = document.getElementById('btn-submit-pay-now');
      if (payBtn) {
        payBtn.disabled = true;
        payBtn.innerHTML = `<span>Processing Order Request...</span>`;
      }
      this.isSubmitting = true;

      fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: customerPayload,
          items: itemsPayload
        })
      })
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          self.isSubmitting = false;
          showToast(data.error || 'Failed to create order.');
          if (payBtn) {
            payBtn.disabled = false;
            payBtn.innerHTML = `<span>PAY NOW</span>`;
          }
          return;
        }

        // Check if gateway credentials are live on server
        if (data.gatewayConfigured && data.gatewayOrderId && window.Razorpay) {
          const options = {
            key: data.keyId,
            amount: Math.round(data.totalAmount * 100),
            currency: 'INR',
            name: 'MARRION RUSSAL REMEDIES',
            description: 'Order #' + data.orderNumber,
            image: 'assets/images/logo_square.png',
            order_id: data.gatewayOrderId,
            prefill: {
              name: customerPayload.name,
              email: customerPayload.email,
              contact: customerPayload.phone
            },
            theme: {
              color: '#7b182b'
            },
            handler: function (rzpResponse) {
              self.verifyPaymentOnServer(data.orderId, rzpResponse);
            },
            modal: {
              ondismiss: function () {
                self.isSubmitting = false;
                showToast('Payment window closed. You can retry payment when ready.');
                self.renderDrawer();
              }
            }
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          // Architecture demonstration mode when gateway keys are pending
          self.isSubmitting = false;
          showToast(`Order #${data.orderNumber} created. Gateway live credentials pending deployment.`);
          alert(`ORDER REGISTERED: #${data.orderNumber}\\n\\nArchitecture Notice: The server is operating with payment gateway configuration awaiting live API credentials in .env.\\n\\nPlease contact marrionrussal@gmail.com or +91 9149412102 to complete payment and dispatch coordination.`);
          if (payBtn) {
            payBtn.disabled = false;
            payBtn.innerHTML = `<span>PAY NOW</span>`;
          }
        }
      })
      .catch(err => {
        self.isSubmitting = false;
        showToast('Communication error with server. Please try again.');
        if (payBtn) {
          payBtn.disabled = false;
          payBtn.innerHTML = `<span>PAY NOW</span>`;
        }
      });
    },

    verifyPaymentOnServer: function (orderId, rzpResponse) {
      const self = this;
      showToast('Verifying payment cryptographically on server...');

      fetch('/api/checkout/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderId,
          razorpay_order_id: rzpResponse.razorpay_order_id,
          razorpay_payment_id: rzpResponse.razorpay_payment_id,
          razorpay_signature: rzpResponse.razorpay_signature
        })
      })
      .then(res => res.json())
      .then(data => {
        self.isSubmitting = false;
        if (data.success) {
          self.lastConfirmedOrder = data.order;
          self.lastConfirmedItems = data.items || [];
          self.clear(); // Basket cleared from localStorage
          self.currentView = 'order-confirmed';
          self.renderDrawer();
          showToast('✓ Payment verified! Order #' + data.order.order_number + ' confirmed.');
        } else {
          showToast('Payment verification failed: ' + (data.error || 'Invalid signature'));
          self.renderDrawer();
        }
      })
      .catch(err => {
        self.isSubmitting = false;
        showToast('Verification communication error. Please contact company with your transaction ID.');
      });
    }
  };

  window.MRR_BASKET = MRR_BASKET;

  // =========================================================================
  // Administrative Portal Engine (Orders, Pricing & Audit Logs)
  // =========================================================================
  const MRR_ADMIN_PORTAL = {
    tokenKey: 'mrr_admin_token',
    currentTab: 'orders',

    open: function () {
      let root = document.getElementById('admin-modal-root');
      if (!root) {
        root = document.createElement('div');
        root.id = 'admin-modal-root';
        root.className = 'admin-modal-root';
        document.body.appendChild(root);
      }
      root.classList.add('open');
      root.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      const token = sessionStorage.getItem(this.tokenKey);
      if (token) {
        this.renderDashboard();
      } else {
        this.renderLogin();
      }
    },

    close: function () {
      const root = document.getElementById('admin-modal-root');
      if (root) {
        root.classList.remove('open');
        root.setAttribute('aria-hidden', 'true');
      }
      document.body.style.overflow = '';
      if (window.location.hash === '#admin') {
        history.pushState(null, '', '#products');
      }
    },

    renderLogin: function () {
      const self = this;
      const root = document.getElementById('admin-modal-root');
      if (!root) return;

      root.innerHTML = `
        <div class="admin-modal-backdrop" id="admin-modal-backdrop"></div>
        <div class="admin-modal-panel" style="max-width: 460px;">
          <div class="admin-modal-header">
            <h3 class="admin-modal-title">STAFF / ADMIN DESK</h3>
            <button class="basket-close-btn" id="admin-modal-close" style="color: #ffffff;">✕</button>
          </div>
          <div class="admin-modal-body" style="padding: 2rem 1.75rem;">
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0 0 1.25rem 0;">
              Authorized pharmaceutical administration and order management access.
            </p>
            <form id="admin-login-form" onsubmit="return false;">
              <div style="margin-bottom: 1rem;">
                <label class="checkout-label">Username</label>
                <input type="text" id="admin-username" class="checkout-input" placeholder="admin" required />
              </div>
              <div style="margin-bottom: 1.5rem;">
                <label class="checkout-label">Password</label>
                <input type="password" id="admin-password" class="checkout-input" placeholder="••••••••••••" required />
              </div>
              <button type="submit" class="btn-proceed-purchase" id="btn-admin-submit-login">
                SECURE LOGIN
              </button>
            </form>
          </div>
        </div>
      `;

      document.getElementById('admin-modal-close').onclick = () => self.close();
      document.getElementById('admin-modal-backdrop').onclick = () => self.close();

      document.getElementById('admin-login-form').onsubmit = function (e) {
        e.preventDefault();
        const u = document.getElementById('admin-username').value.trim();
        const p = document.getElementById('admin-password').value.trim();
        if (!u || !p) return;

        fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: u, password: p })
        })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.token) {
            sessionStorage.setItem(self.tokenKey, data.token);
            showToast('✓ Admin authentication successful.');
            self.renderDashboard();
          } else {
            showToast(data.error || 'Authentication failed.');
          }
        })
        .catch(() => showToast('Server communication error.'));
      };
    },

    renderDashboard: function () {
      const self = this;
      const root = document.getElementById('admin-modal-root');
      if (!root) return;

      root.innerHTML = `
        <div class="admin-modal-backdrop" id="admin-modal-backdrop"></div>
        <div class="admin-modal-panel">
          <div class="admin-modal-header">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="font-family: var(--font-mono); font-size: 0.76rem; background: var(--wine-primary); padding: 0.2rem 0.5rem; border-radius: 4px;">OFFICIAL PORTAL</span>
              <h3 class="admin-modal-title">MARRION RUSSAL REMEDIES — ADMIN DESK</h3>
            </div>
            <div style="display: flex; align-items: center; gap: 1rem;">
              <button id="admin-btn-logout" class="admin-btn" style="background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid #ef4444;">Logout</button>
              <button class="basket-close-btn" id="admin-modal-close" style="color: #ffffff;">✕</button>
            </div>
          </div>
          <div class="admin-modal-body">
            <div class="admin-tabs">
              <button class="admin-tab-btn ${self.currentTab === 'orders' ? 'active' : ''}" id="tab-btn-orders">Customer Orders</button>
              <button class="admin-tab-btn ${self.currentTab === 'products' ? 'active' : ''}" id="tab-btn-products">Products & Pricing</button>
              <button class="admin-tab-btn ${self.currentTab === 'logs' ? 'active' : ''}" id="tab-btn-logs">Security Audit Logs</button>
            </div>
            <div id="admin-tab-content">Loading...</div>
          </div>
        </div>
      `;

      document.getElementById('admin-modal-close').onclick = () => self.close();
      document.getElementById('admin-modal-backdrop').onclick = () => self.close();
      document.getElementById('admin-btn-logout').onclick = () => {
        sessionStorage.removeItem(self.tokenKey);
        showToast('Logged out of admin desk.');
        self.renderLogin();
      };

      document.getElementById('tab-btn-orders').onclick = () => {
        self.currentTab = 'orders';
        self.renderDashboard();
      };
      document.getElementById('tab-btn-products').onclick = () => {
        self.currentTab = 'products';
        self.renderDashboard();
      };
      document.getElementById('tab-btn-logs').onclick = () => {
        self.currentTab = 'logs';
        self.renderDashboard();
      };

      const container = document.getElementById('admin-tab-content');
      const token = sessionStorage.getItem(this.tokenKey);

      if (self.currentTab === 'orders') {
        fetch('/api/admin/orders', { headers: { 'Authorization': `Bearer ${token}` } })
          .then(res => res.json())
          .then(data => {
            if (!data.success) {
              container.innerHTML = `<div style="color: #ef4444;">${data.error || 'Failed to load orders'}</div>`;
              return;
            }
            const orders = data.orders || [];
            if (orders.length === 0) {
              container.innerHTML = `<div style="padding: 2rem; text-align: center; color: var(--text-muted);">No orders recorded yet. Orders will appear here upon customer checkout.</div>`;
              return;
            }

            const rows = orders.map(o => `
              <tr>
                <td><strong>#${o.order_number}</strong><br><small style="color: var(--text-muted);">${o.created_at || ''}</small></td>
                <td><strong>${o.customer_name}</strong><br><small>${o.customer_phone} • ${o.customer_email}</small></td>
                <td><small>${o.items ? o.items.map(i => `${i.product_name} (${i.quantity})`).join(', ') : 'N/A'}</small></td>
                <td style="font-family: var(--font-mono); font-weight: 700;">₹${parseFloat(o.total_amount).toFixed(2)}</td>
                <td><span class="status-badge ${o.payment_status === 'PAID' ? 'status-paid' : 'status-pending'}">${o.payment_status}</span></td>
                <td>
                  <select class="admin-status-dropdown" data-order-id="${o.id}" style="padding: 0.3rem 0.5rem; font-size: 0.76rem; border-radius: 4px; border: 1px solid var(--border-light);">
                    ${['PENDING PAYMENT', 'PAID', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map(st => `
                      <option value="${st}" ${o.order_status === st ? 'selected' : ''}>${st}</option>
                    `).join('')}
                  </select>
                </td>
              </tr>
            `).join('');

            container.innerHTML = `
              <div style="overflow-x: auto;">
                <table class="admin-data-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer Details</th>
                      <th>Formulations</th>
                      <th>Total</th>
                      <th>Payment</th>
                      <th>Lifecycle Status</th>
                    </tr>
                  </thead>
                  <tbody>${rows}</tbody>
                </table>
              </div>
            `;

            container.querySelectorAll('.admin-status-dropdown').forEach(sel => {
              sel.onchange = function () {
                const oid = sel.getAttribute('data-order-id');
                const nst = sel.value;
                fetch(`/api/admin/orders/${oid}/status`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify({ status: nst })
                })
                .then(r => r.json())
                .then(d => {
                  if (d.success) showToast(`✓ Order status updated to ${nst}`);
                  else showToast(d.error || 'Update failed');
                });
              };
            });
          });
      } else if (self.currentTab === 'products') {
        fetch('/api/admin/products', { headers: { 'Authorization': `Bearer ${token}` } })
          .then(res => res.json())
          .then(data => {
            if (!data.success) {
              container.innerHTML = `<div style="color: #ef4444;">${data.error || 'Failed to load products'}</div>`;
              return;
            }
            const prods = data.products || [];

            const rows = prods.map(p => `
              <tr>
                <td><strong>${p.name}</strong><br><small style="color: var(--text-muted);">${p.division} • ${p.formulation}</small></td>
                <td>
                  ₹ <input type="number" step="0.5" class="admin-input-small" id="price-input-${p.id}" value="${p.price !== null ? p.price : ''}" placeholder="Not set" />
                </td>
                <td>
                  <select id="status-select-${p.id}" style="padding: 0.3rem 0.5rem; font-size: 0.76rem; border-radius: 4px; border: 1px solid var(--border-light);">
                    <option value="REQUIRES VERIFICATION" ${p.sales_status === 'REQUIRES VERIFICATION' ? 'selected' : ''}>REQUIRES VERIFICATION</option>
                    <option value="AVAILABLE FOR ONLINE PURCHASE" ${p.sales_status === 'AVAILABLE FOR ONLINE PURCHASE' ? 'selected' : ''}>AVAILABLE FOR ONLINE PURCHASE</option>
                    <option value="NOT AVAILABLE FOR ONLINE PURCHASE" ${p.sales_status === 'NOT AVAILABLE FOR ONLINE PURCHASE' ? 'selected' : ''}>NOT AVAILABLE FOR ONLINE PURCHASE</option>
                  </select>
                </td>
                <td>
                  <button class="admin-btn btn-save-product" data-product-id="${p.id}">Save</button>
                </td>
              </tr>
            `).join('');

            container.innerHTML = `
              <div style="margin-bottom: 0.85rem; font-size: 0.8rem; color: var(--text-secondary);">
                Set price and configure pharmaceutical sales status for each of the 30 formulations. Products without configured prices cannot be checked out online.
              </div>
              <div style="overflow-x: auto;">
                <table class="admin-data-table">
                  <thead>
                    <tr>
                      <th>Formulation</th>
                      <th>Configured Price (INR)</th>
                      <th>Pharmaceutical Sales Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>${rows}</tbody>
                </table>
              </div>
            `;

            container.querySelectorAll('.btn-save-product').forEach(btn => {
              btn.onclick = function () {
                const pid = btn.getAttribute('data-product-id');
                const priceVal = document.getElementById(`price-input-${pid}`).value.trim();
                const statusVal = document.getElementById(`status-select-${pid}`).value;

                fetch(`/api/admin/products/${pid}`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify({
                    price: priceVal !== '' ? parseFloat(priceVal) : null,
                    sales_status: statusVal
                  })
                })
                .then(r => r.json())
                .then(d => {
                  if (d.success) {
                    showToast(`✓ Updated ${pid}`);
                    MRR_BASKET.fetchLivePricing();
                  } else {
                    showToast(d.error || 'Failed to update product');
                  }
                });
              };
            });
          });
      } else if (self.currentTab === 'logs') {
        fetch('/api/admin/audit-logs', { headers: { 'Authorization': `Bearer ${token}` } })
          .then(res => res.json())
          .then(data => {
            const logs = (data && data.logs) || [];
            const rows = logs.map(l => `
              <tr>
                <td><small style="font-family: var(--font-mono);">${l.timestamp}</small></td>
                <td><strong>${l.action}</strong></td>
                <td>${l.admin_username}</td>
                <td><small>${l.details || ''}</small></td>
                <td><small style="font-family: var(--font-mono);">${l.ip_address || ''}</small></td>
              </tr>
            `).join('');

            container.innerHTML = `
              <div style="overflow-x: auto;">
                <table class="admin-data-table">
                  <thead>
                    <tr>
                      <th>Timestamp</th>
                      <th>Action</th>
                      <th>Administrator</th>
                      <th>Details</th>
                      <th>IP</th>
                    </tr>
                  </thead>
                  <tbody>${rows || '<tr><td colspan="5">No logs found</td></tr>'}</tbody>
                </table>
              </div>
            `;
          });
      }
    }
  };

  window.MRR_ADMIN_PORTAL = MRR_ADMIN_PORTAL;"""

# Replace in content
start_idx = content.find(start_marker)
end_idx = content.find(end_marker) + len(end_marker)

updated_content = content[:start_idx] + new_basket_and_admin_code + content[end_idx:]

# Update routing to handle #checkout and #admin
old_routing = """    function check() {
      const hash = window.location.hash;
      if (hash === '#basket' || hash === '#shopping-desk') {
        MRR_BASKET.openDrawer('basket');
      } else if (hash.startsWith('#products/')) {
        const id = hash.replace('#products/', '');
        openProductModal(id);
      }
    }"""

new_routing = """    function check() {
      const hash = window.location.hash;
      if (hash === '#basket' || hash === '#shopping-desk') {
        MRR_BASKET.openDrawer('basket');
      } else if (hash === '#checkout') {
        MRR_BASKET.openDrawer('checkout');
      } else if (hash === '#admin') {
        MRR_ADMIN_PORTAL.open();
      } else if (hash.startsWith('#products/')) {
        const id = hash.replace('#products/', '');
        openProductModal(id);
      }
    }"""

assert old_routing in updated_content, "old_routing not found"
updated_content = updated_content.replace(old_routing, new_routing)

# Also bind footer admin link if present
footer_binding_needle = "window.addEventListener('hashchange', check);"
footer_binding_repl = """window.addEventListener('hashchange', check);
    const footerAdminLink = document.getElementById('footer-admin-link');
    if (footerAdminLink) {
      footerAdminLink.addEventListener('click', function (e) {
        e.preventDefault();
        MRR_ADMIN_PORTAL.open();
      });
    }"""

updated_content = updated_content.replace(footer_binding_needle, footer_binding_repl, 1)

with open('assets/js/client.js', 'w', encoding='utf-8') as f:
    f.write(updated_content)

print("[SUCCESS] client.js successfully upgraded with Secure Online Purchase System & Admin Portal!")
