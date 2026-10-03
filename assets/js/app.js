/**
 * MARRION RUSSAL REMEDIES PVT. LTD.
 * Main Application Coordinator
 */

import { COMPANY_INFO } from '../data/companyInfo.js';
import { DIVISIONS } from '../data/divisions.js';
import { PRODUCTS, getProductById, filterProducts } from '../data/products.js';

import { renderNavigation } from '../components/Navigation.js';
import { renderHero } from '../components/Hero.js';
import { renderCompanyIntro } from '../components/CompanyIntro.js';
import { renderDivisions, renderDivisionDetail } from '../components/DivisionSection.js';
import { renderProductCatalogue } from '../components/ProductCatalogue.js';
import { renderProductDetailModal } from '../components/ProductDetailModal.js';
import { renderReach } from '../components/OperatingAreas.js';
import { renderContact } from '../components/ContactSection.js';
import { renderFooter } from '../components/Footer.js';

import { initMolecularCanvas } from './canvas-molecular.js';

// Application State
const state = {
  currentFamily: "ALL",
  searchQuery: "",
  selectedProduct: null,
  activeDivisionId: DIVISIONS[0].id
};

/**
 * Initialize Application
 */
function init() {
  const appContainer = document.getElementById("app");
  if (!appContainer) return;

  // Mount components
  appContainer.innerHTML = `
    ${renderNavigation()}
    <main id="main-content">
      ${renderHero()}
      ${renderCompanyIntro()}
      ${renderDivisions()}
      ${renderProductCatalogue(PRODUCTS, state.currentFamily, state.searchQuery)}
      ${renderReach()}
      ${renderContact()}
    </main>
    ${renderFooter()}
    <div id="modal-container"></div>
  `;

  // Initialize micro-systems
  initMolecularCanvas();
  bindHeaderEvents();
  bindMobileDrawerEvents();
  bindDivisionEvents();
  bindCatalogueEvents();
  bindContactEvents();
  bindScrollObserver();
  handleInitialRoute();

  // Listen to hash changes for deep linking
  window.addEventListener("hashchange", handleHashChange);
}

/**
 * Header Scroll & Sticky Behavior
 */
function bindHeaderEvents() {
  const header = document.getElementById("main-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, { passive: true });
}

/**
 * Mobile Navigation Drawer Controls
 */
function bindMobileDrawerEvents() {
  const toggleBtn = document.getElementById("mobile-toggle-btn");
  const closeBtn = document.getElementById("mobile-close-btn");
  const drawer = document.getElementById("mobile-drawer");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  function openDrawer() {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    toggleBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    toggleBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (toggleBtn) toggleBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  
  if (drawer) {
    drawer.addEventListener("click", (e) => {
      if (e.target === drawer) closeDrawer();
    });
  }

  mobileLinks.forEach(link => {
    link.addEventListener("click", closeDrawer);
  });
}

/**
 * Interactive Division Selector
 */
function bindDivisionEvents() {
  const navButtons = document.querySelectorAll(".division-nav-btn");
  const contentPane = document.getElementById("division-content-display");

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const divisionId = btn.getAttribute("data-division-id");
      const targetDivision = DIVISIONS.find(d => d.id === divisionId);
      if (!targetDivision || !contentPane) return;

      navButtons.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });

      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      contentPane.innerHTML = renderDivisionDetail(targetDivision);
    });
  });
}

/**
 * Product Catalogue Filtering, Search & Modal
 */
function bindCatalogueEvents() {
  const catalogueContainer = document.getElementById("products");
  if (!catalogueContainer) return;

  // Search input handler with debounce
  let searchTimeout = null;
  catalogueContainer.addEventListener("input", (e) => {
    if (e.target && e.target.id === "product-search-input") {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        state.searchQuery = e.target.value.trim();
        updateCatalogueDisplay();
      }, 150);
    }
  });

  // Family pills filter
  catalogueContainer.addEventListener("click", (e) => {
    const pill = e.target.closest(".filter-pill");
    if (pill) {
      const family = pill.getAttribute("data-family");
      state.currentFamily = family;
      updateCatalogueDisplay();
      return;
    }

    // Reset button in empty state
    if (e.target && e.target.id === "reset-catalogue-btn") {
      state.currentFamily = "ALL";
      state.searchQuery = "";
      const searchInput = document.getElementById("product-search-input");
      if (searchInput) searchInput.value = "";
      updateCatalogueDisplay();
      return;
    }

    // Product Card Click -> Open Detail Modal
    const card = e.target.closest(".product-card");
    if (card) {
      const productId = card.getAttribute("data-product-id");
      openProductModal(productId);
    }
  });

  // Keyboard accessibility on product cards (Enter or Space)
  catalogueContainer.addEventListener("keydown", (e) => {
    const card = e.target.closest(".product-card");
    if (card && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      const productId = card.getAttribute("data-product-id");
      openProductModal(productId);
    }
  });
}

/**
 * Update Catalogue Grid & Filter Pills
 */
function updateCatalogueDisplay() {
  const filtered = filterProducts({
    family: state.currentFamily,
    query: state.searchQuery
  });

  // Update pills active states
  const pills = document.querySelectorAll(".filter-pill");
  pills.forEach(p => {
    const fam = p.getAttribute("data-family");
    const isActive = fam === state.currentFamily;
    p.classList.toggle("active", isActive);
    p.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  // Update counter
  const counter = document.getElementById("catalogue-count");
  if (counter) counter.textContent = filtered.length;

  // Re-render grid
  const grid = document.getElementById("products-grid");
  if (grid) {
    if (filtered.length > 0) {
      grid.innerHTML = filtered.map(p => {
        const { renderProductCard } = requireComponent();
        return renderProductCard(p);
      }).join('');
    } else {
      grid.innerHTML = `
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
  }
}

function requireComponent() {
  // Direct helper for dynamic render
  return {
    renderProductCard: (product) => `
      <article 
        class="product-card" 
        data-product-id="${product.id}" 
        data-family="${product.family}"
        role="button"
        tabindex="0"
        aria-label="View specifications for ${product.name}"
      >
        <div>
          <div class="product-card-top">
            <span class="product-family-tag">${product.family}</span>
            <span class="product-formulation-tag">${product.formulation}</span>
          </div>

          <h3 class="product-card-name">${product.name}</h3>

          <div class="product-card-meta">
            <div class="product-division-name">${product.division}</div>
          </div>
        </div>

        <div class="product-card-action">
          <span class="mono-tag">Status: Current</span>
          <span class="product-action-link">
            <span>Formulation Specs</span>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="14" height="14">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </article>
    `
  };
}

/**
 * Open Product Detail Modal
 */
export function openProductModal(productId) {
  const product = getProductById(productId);
  if (!product) return;

  state.selectedProduct = product;
  const modalContainer = document.getElementById("modal-container");
  if (!modalContainer) return;

  modalContainer.innerHTML = renderProductDetailModal(product);
  document.body.style.overflow = "hidden";

  // Update URL hash without breaking history
  if (window.location.hash !== `#products/${productId}`) {
    history.pushState(null, "", `#products/${productId}`);
  }

  // Bind close buttons
  const backdrop = document.getElementById("product-modal-root");
  const closeBtn = document.getElementById("modal-close-btn");
  const backBtn = document.getElementById("modal-back-btn");

  function closeModal() {
    state.selectedProduct = null;
    modalContainer.innerHTML = "";
    document.body.style.overflow = "";
    if (window.location.hash.startsWith("#products/")) {
      history.pushState(null, "", "#products");
    }
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backBtn) backBtn.addEventListener("click", closeModal);
  
  if (backdrop) {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal();
    });
  }

  const emailBuyBtn = document.getElementById("btn-buy-email") || document.getElementById("btn-enquire-email");
  const waBuyBtn = document.getElementById("btn-buy-whatsapp") || document.getElementById("btn-enquire-whatsapp");

  if (emailBuyBtn) {
    emailBuyBtn.addEventListener("click", () => {
      showToast(`Launching email application for ${product.name} purchase...`);
    });
  }

  if (waBuyBtn) {
    waBuyBtn.addEventListener("click", () => {
      showToast(`Opening WhatsApp purchase desk for ${product.name}...`);
    });
  }

  // Escape key handler
  const handleKeydown = (e) => {
    if (e.key === "Escape") {
      closeModal();
      window.removeEventListener("keydown", handleKeydown);
    }
  };
  window.addEventListener("keydown", handleKeydown);
}

/**
 * Contact Form & Copy Email Handlers
 */
function bindContactEvents() {
  // Copy Email Button
  const copyBtn = document.getElementById("copy-email-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const email = copyBtn.getAttribute("data-email") || COMPANY_INFO.email;
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Official Email copied: ${email}`);
      }).catch(() => {
        showToast(`Official Email: ${email}`);
      });
    });
  }

  // Corporate Inquiry Form Validation
  const form = document.getElementById("corporate-inquiry-form");
  const feedback = document.getElementById("form-feedback");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="name"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const subject = form.querySelector('[name="subject"]').value.trim();
      const message = form.querySelector('[name="message"]').value.trim();

      if (!name || !email || !subject || !message) {
        if (feedback) {
          feedback.className = "form-feedback-alert";
          feedback.style.display = "block";
          feedback.style.background = "#fef2f2";
          feedback.style.borderColor = "#fecaca";
          feedback.style.color = "#991b1b";
          feedback.textContent = "Please fill out all required fields before submitting your corporate inquiry.";
        }
        return;
      }

      // Success feedback
      if (feedback) {
        feedback.className = "form-feedback-alert success";
        feedback.style.display = "block";
        feedback.textContent = "Thank you. Your corporate inquiry has been dispatched to Marrion Russal Remedies headquarters.";
      }

      form.reset();
      showToast("Corporate inquiry submitted successfully.");
    });
  }
}

/**
 * Toast Notification Helper
 */
function showToast(message) {
  const toast = document.getElementById("toast-notify");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

/**
 * Intersection Observer for Smooth Section Reveals
 */
function bindScrollObserver() {
  const elements = document.querySelectorAll(".reveal-on-scroll");
  if (!("IntersectionObserver" in window)) {
    elements.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: "0px 0px -40px 0px"
  });

  elements.forEach(el => observer.observe(el));

  // Navigation active link highlighter on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-desktop .nav-link");

  window.addEventListener("scroll", () => {
    let currentId = "";
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) {
        currentId = sec.getAttribute("id");
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        const href = link.getAttribute("href");
        link.classList.toggle("active", href === `#${currentId}`);
      });
    }
  }, { passive: true });
}

/**
 * Handle Initial Route / Deep Linking
 */
function handleInitialRoute() {
  handleHashChange();
}

function handleHashChange() {
  const hash = window.location.hash;
  if (hash.startsWith("#products/")) {
    const productId = hash.replace("#products/", "");
    openProductModal(productId);
  }
}

// Bootstrap on DOM Ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
