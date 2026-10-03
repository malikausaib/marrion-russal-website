/**
 * Marrion Russal Remedies Pvt. Ltd.
 * Progressive Enhancement Client Script
 * Features:
 * - Theme Switcher (Bright Mode, Dark Mode, Eye Protection Mode)
 * - Custom Branded Logo Cursor Follower with interactive hover states
 * - Ambient Molecular Canvas & Scientific Background Motion
 * - Interactive Divisions Browser
 * - Real-Time Product Search & Family Filter Pills
 * - Formulation Details Modal with Deep Link Routing (#products/:id)
 * - Copy Email Toast Notification
 * - Corporate Inquiry Form Validation
 */

(function () {
  'use strict';

  // Master Data Reference
  const PRODUCTS = [
    { id: 'gasoril-capsule', name: 'GASORIL CAPSULE', family: 'GASORIL', formulation: 'Capsule', division: 'GENERAL DIVISION 1', image: 'public/products/gasoril-capsule.webp' },
    { id: 'gasoril-mps-syrup', name: 'GASORIL MPS SYRUP', family: 'GASORIL', formulation: 'Syrup', division: 'GENERAL DIVISION 1' },
    { id: 'gasoril-dsr-capsule', name: 'GASORIL DSR CAPSULE', family: 'GASORIL', formulation: 'Capsule', division: 'GENERAL DIVISION 1' },
    { id: 'gasoril-psc-tablet', name: 'GASORIL PSC TABLET', family: 'GASORIL', formulation: 'Tablet', division: 'GENERAL DIVISION 1', image: 'public/products/gasoril-psc.webp' },
    { id: 'gasoril-p-drops-suspension', name: 'GASORIL P DROPS SUSPENSION', family: 'GASORIL', formulation: 'Drops / Suspension', division: 'GENERAL DIVISION 1' },
    { id: 'gasoril-kid-drops', name: 'GASORIL KID DROPS', family: 'GASORIL', formulation: 'Pediatric Drops', division: 'GENERAL DIVISION 1', image: 'public/products/gasoril-kid.webp' },
    { id: 'gasoril-raft-syrup', name: 'GASORIL RAFT SYRUP', family: 'GASORIL', formulation: 'Syrup', division: 'GENERAL DIVISION 1' },
    {
      id: 'nasril-s-spray-drop',
      aliasId: 'nasril-s',
      name: 'NASRIL-S',
      legacyName: 'NASRIL S SPRAY/DROP',
      productType: 'Nasal Spray',
      formulation: 'Nasal Spray',
      family: 'NASRIL',
      division: 'GENERAL DIVISION 1',
      image: 'assets/images/nasril-s.jpg',
      composition: 'Sodium Chloride Nasal Solution',
      description: 'Information to be added',
      indications: 'Information to be added',
      dosage: 'As directed by the physician.',
      packaging: 'Information to be added',
      price: null
    },
    { id: 'nasril-xp-spray-drop', name: 'NASRIL XP SPRAY/DROP', family: 'NASRIL', formulation: 'Nasal Spray / Drop', division: 'GENERAL DIVISION 1', image: 'public/products/nasril-xp.webp' },
    { id: 'nasril-x-spray-drop', name: 'NASRIL X SPRAY/DROP', family: 'NASRIL', formulation: 'Nasal Spray / Drop', division: 'GENERAL DIVISION 1', image: 'public/products/nasril-x.webp' },
    { id: 'nasril-f-spray', name: 'NASRIL F SPRAY', family: 'NASRIL', formulation: 'Nasal Spray', division: 'GENERAL DIVISION 1', image: 'public/products/nasril-f.webp' },
    { id: 'nasril-ax-syrup', name: 'NASRIL AX SYRUP', family: 'NASRIL', formulation: 'Syrup', division: 'GENERAL DIVISION 1' },
    { id: 'nasril-dx-syrup', name: 'NASRIL DX SYRUP', family: 'NASRIL', formulation: 'Syrup', division: 'GENERAL DIVISION 1' },
    { id: 'nasril-cold-tablet', name: 'NASRIL COLD TABLET', family: 'NASRIL', formulation: 'Tablet', division: 'GENERAL DIVISION 1' },
    { id: 'sucracell-o-suspension', name: 'SUCRACELL O SUSPENSION', family: 'SUCRACELL', formulation: 'Oral Suspension', division: 'GENERAL DIVISION 2ND', image: 'public/products/sucracell-o.webp' },
    { id: 'sucracell-plain-suspension', name: 'SUCRACELL PLAIN SUSPENSION', family: 'SUCRACELL', formulation: 'Oral Suspension', division: 'GENERAL DIVISION 2ND' },
    { id: 'devac-syrup', name: 'DEVAC SYRUP', family: 'DEVAC', formulation: 'Syrup', division: 'GENERAL DIVISION 2ND', image: 'public/products/devac-syrup.webp' },
    { id: 'devac-kid-syrup', name: 'DEVAC KID SYRUP', family: 'DEVAC', formulation: 'Pediatric Syrup', division: 'GENERAL DIVISION 2ND' },
    { id: 'acetos-gold-tablet', name: 'ACETOS GOLD TABLET', family: 'ACETOS', formulation: 'Tablet', division: 'GENERAL DIVISION 2ND' },
    { id: 'acetos-spas-tablet', name: 'ACETOS SPAS TABLET', family: 'ACETOS', formulation: 'Tablet', division: 'GENERAL DIVISION 2ND' },
    { id: 'clear-32-mouth-wash', name: 'CLEAR 32 MOUTH WASH', family: 'CLEAR 32', formulation: 'Oral Rinse / Mouth Wash', division: 'DENTAL DIVISION' },
    { id: 'lc-gel-ointment', name: 'LC GEL OINTMENT', family: 'LC', formulation: 'Gel / Ointment', division: 'DENTAL DIVISION' },
    { id: 'softex-moisturiser', name: 'SOFTEX MOISTURISER', family: 'SOFTEX', formulation: 'Topical Moisturiser', division: 'DERMATOLOGY DIVISION', image: 'public/products/softex-moisturiser.webp' },
    { id: 'softex-max-moisturiser', name: 'SOFTEX MAX MOISTURISER', family: 'SOFTEX', formulation: 'Advanced Moisturiser', division: 'DERMATOLOGY DIVISION' },
    { id: 'softex-moisturising-soap', name: 'SOFTEX MOISTURISING SOAP', family: 'SOFTEX', formulation: 'Cleansing Bar / Soap', division: 'DERMATOLOGY DIVISION' },
    { id: 'shadex-sunscreen', name: 'SHADEX SUNSCREEN', family: 'SHADEX', formulation: 'Photoprotective Sunscreen', division: 'DERMATOLOGY DIVISION', image: 'public/products/shadex-sunscreen.webp' },
    { id: 'ketotos-soap', name: 'KETOTOS SOAP', family: 'KETOTOS', formulation: 'Antifungal Medicated Soap', division: 'DERMATOLOGY DIVISION' },
    { id: 'ketotos-shampoo', name: 'KETOTOS SHAMPOO', family: 'KETOTOS', formulation: 'Therapeutic Scalp Shampoo', division: 'DERMATOLOGY DIVISION' },
    { id: 'permetos-ct-lotion', name: 'PERMETOS CT LOTION', family: 'PERMETOS', formulation: 'Therapeutic Medicated Lotion', division: 'DERMATOLOGY DIVISION' },
    { id: 'permetos-soap', name: 'PERMETOS SOAP', family: 'PERMETOS', formulation: 'Medicated Hygiene Soap', division: 'DERMATOLOGY DIVISION' }
  ];

  const DIVISIONS_INFO = {
    'general-1': {
      code: 'GD-01',
      name: 'GENERAL DIVISION 1',
      summary: 'Dedicated to comprehensive clinical care across primary gastroenterology, pediatric medicine, general healthcare, and ear, nose, and throat disciplines.',
      areas: [
        { code: 'GI', name: 'GASTROENTEROLOGY' },
        { code: 'PED', name: 'PEDIATRICS' },
        { code: 'GM', name: 'GENERAL MEDICINE' },
        { code: 'ENT', name: 'ENT' }
      ]
    },
    'general-2': {
      code: 'GD-02',
      name: 'GENERAL DIVISION 2ND',
      summary: 'Extending therapeutics in gastroenterology, pediatrics, general medicine, and otorhinolaryngology across specialized clinical portfolios.',
      areas: [
        { code: 'GI', name: 'GASTROENTEROLOGY' },
        { code: 'PED', name: 'PEDIATRICS' },
        { code: 'GM', name: 'GENERAL MEDICINE' },
        { code: 'ENT', name: 'ENT' }
      ]
    },
    'dental': {
      code: 'DT-03',
      name: 'DENTAL DIVISION',
      summary: 'Specialized pharmaceutical formulations developed specifically for advanced oral health, mucosal hygiene, and dental care therapies.',
      areas: []
    },
    'dermatology': {
      code: 'DM-04',
      name: 'DERMATOLOGY DIVISION',
      summary: 'Targeted dermatological remedies focused on skin health, barrier restoration, anti-fungal hygiene, and topical therapeutic care.',
      areas: []
    }
  };

  let currentFamily = 'ALL';
  let searchQuery = '';

  // Initialize
  function init() {
    // Ensure all legacy forced presentation view modes/storage are cleanly removed
    try {
      document.documentElement.classList.remove('forced-desktop-view');
      localStorage.removeItem('mrr_view_mode');
      const legacyPill = document.getElementById('desktop-return-pill');
      if (legacyPill) legacyPill.remove();
    } catch (e) {}

    initBrandRevealAnimation();
    updateDynamicProductCounts();
    initThemes();
    initBrandCursor();
    initCanvas();
    bindHeader();
    bindMobileDrawer();
    bindDivisions();
    bindCatalogue();
    bindContact();
    bindRouting();
    MRR_BASKET.init();
  }

  // =========================================================================
  // Sophisticated Sliding Brand Reveal Opening Curtain
  // =========================================================================
  function initBrandRevealAnimation() {
    const curtain = document.getElementById('brand-reveal-curtain');
    if (!curtain) return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      curtain.classList.add('instant-hide');
      curtain.style.display = 'none';
      return;
    }

    // Check if user already saw reveal in this session
    try {
      const shown = sessionStorage.getItem('mrr_brand_reveal_shown');
      if (shown) {
        curtain.classList.add('instant-hide');
        curtain.style.display = 'none';
        return;
      }
      sessionStorage.setItem('mrr_brand_reveal_shown', 'true');
    } catch (e) {}

    // Precise ~2.7s Master Pharmaceutical Brand Introduction Sequence:
    // • 0.0s - 0.6s (600ms): Branded opening background ambiance appears smoothly
    // • 0.6s - 1.4s (800ms): Official centered logo smoothly fades in & subtly reveals into exact center
    // • 1.4s - 2.0s (600ms): Centered logo & motto hold with elegant clarity
    // • 2.0s - 2.7s (700ms): Dual split curtains slide smoothly away to reveal the homepage
    // • 2.7s (2700ms): Animation complete, curtain cleanly hidden
    setTimeout(function () {
      curtain.classList.add('reveal-slide-out');
      setTimeout(function () {
        curtain.style.display = 'none';
      }, 700);
    }, 2000);
  }

  // =========================================================================
  // Dynamic Formulation & Product Count Calculator
  // =========================================================================
  function updateDynamicProductCounts() {
    const total = PRODUCTS.length;
    const heroStat = document.getElementById('hero-stat-formulations');
    if (heroStat) heroStat.textContent = `${total} Formulations`;
    const totalCountEl = document.getElementById('total-formulations-count');
    if (totalCountEl) totalCountEl.textContent = total;
    const countDisplay = document.getElementById('catalogue-count');
    if (countDisplay && !searchQuery && currentFamily === 'ALL') {
      countDisplay.textContent = total;
    }
  }

  // =========================================================================
  // Theme Switcher (Bright, Dark, Eye Protection)
  // =========================================================================
  function initThemes() {
    const savedTheme = localStorage.getItem('mrr_theme') || 'bright';
    applyTheme(savedTheme);

    const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
    toggleButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const theme = btn.getAttribute('data-theme-set');
        applyTheme(theme);
        showToast('Switched to ' + (theme === 'bright' ? 'Bright Mode' : theme === 'dark' ? 'Dark Mode' : 'Eye Protection Mode'));
      });
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mrr_theme', theme);

    const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
    toggleButtons.forEach(btn => {
      const isTarget = btn.getAttribute('data-theme-set') === theme;
      btn.classList.toggle('active', isTarget);
      btn.setAttribute('aria-checked', isTarget ? 'true' : 'false');
    });
  }

  // =========================================================================
  // Dual Circular Branded Logo Cursor (Front Logo Badge + Back Aura Follower)
  // =========================================================================
  function initBrandCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot && !ring) return;

    // Check touch devices
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      if (dot) dot.style.display = 'none';
      if (ring) ring.style.display = 'none';
      return;
    }

    let mouseX = -200;
    let mouseY = -200;
    let ringX = -200;
    let ringY = -200;
    let isVisible = false;

    window.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        if (dot) dot.style.opacity = '1';
        if (ring) ring.style.opacity = '1';
      }
      // Front circular badge snaps immediately to mouse pointer (no lag)
      if (dot) {
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
      }
    }, { passive: true });

    window.addEventListener('mouseleave', function () {
      isVisible = false;
      if (dot) dot.style.opacity = '0';
      if (ring) ring.style.opacity = '0';
    });

    // Smooth Lerp animation loop for the trailing back circular ring
    function updateCursor() {
      if (isVisible && ring) {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
      }
      requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);

    // Expand cursor over interactive elements
    const interactiveSelectors = 'a, button, input, textarea, select, [role="button"], .product-card, .filter-pill, .division-nav-btn, .nav-link, .nav-cta-btn';
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(interactiveSelectors)) {
        if (dot) dot.classList.add('cursor-hover');
        if (ring) ring.classList.add('cursor-hover');
      }
    });

    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(interactiveSelectors)) {
        if (dot) dot.classList.remove('cursor-hover');
        if (ring) ring.classList.remove('cursor-hover');
      }
    });
  }

  // =========================================================================
  // Ambient Canvas Molecular Motion with Rich Vibrant Colors
  // =========================================================================
  function initCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const colorPalette = [
      { fill: 'rgba(190, 18, 60, 0.75)', stroke: 'rgba(190, 18, 60, 0.28)' },   // Wine Ruby
      { fill: 'rgba(2, 132, 199, 0.8)', stroke: 'rgba(2, 132, 199, 0.3)' },     // Azure Sky
      { fill: 'rgba(217, 119, 6, 0.75)', stroke: 'rgba(217, 119, 6, 0.26)' },    // Warm Gold
      { fill: 'rgba(13, 148, 136, 0.75)', stroke: 'rgba(13, 148, 136, 0.28)' }, // Emerald Teal
      { fill: 'rgba(30, 58, 138, 0.7)', stroke: 'rgba(30, 58, 138, 0.24)' }     // Sapphire Navy
    ];

    function resize() {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      particles = [];
      const count = Math.min(Math.floor((width * height) / 14000), 65);
      for (let i = 0; i < count; i++) {
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          r: Math.random() * 2.6 + 1.4,
          color: color
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      const maxDist = 135;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);

            const alphaFactor = 1 - dist / maxDist;
            ctx.strokeStyle = particles[i].color.stroke;
            ctx.lineWidth = 1.1 * alphaFactor;
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color.fill;
        ctx.shadowColor = p.color.fill;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (!isReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }
      }

      if (!isReducedMotion) {
        requestAnimationFrame(draw);
      }
    }

    window.addEventListener('resize', resize);
    resize();
    draw();
  }

  // Header & Scroll
  function bindHeader() {
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', function () {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-desktop .nav-link');
    window.addEventListener('scroll', function () {
      let activeId = '';
      sections.forEach(function (sec) {
        if (window.scrollY >= sec.offsetTop - 150) {
          activeId = sec.getAttribute('id');
        }
      });
      if (activeId) {
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + activeId);
        });
      }
    }, { passive: true });
  }

  // Mobile Drawer
  function bindMobileDrawer() {
    const toggleBtn = document.getElementById('mobile-toggle-btn');
    const closeBtn = document.getElementById('mobile-close-btn');
    const drawer = document.getElementById('mobile-drawer');
    const links = document.querySelectorAll('.mobile-link');

    function open(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (!drawer) return;
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.classList.add('mobile-nav-active');
    }

    function close(e) {
      if (!drawer) return;
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('mobile-nav-active');
    }

    function toggle(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (!drawer) return;
      if (drawer.classList.contains('open')) {
        close(e);
      } else {
        open(e);
      }
    }

    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggle);
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        close(e);
      });
    }
    if (drawer) {
      drawer.addEventListener('click', function (e) {
        if (e.target === drawer) {
          e.preventDefault();
          e.stopPropagation();
          close(e);
        }
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) {
        close();
      }
    });
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        close();
      });
    });
  }

  // Division Switcher
  function bindDivisions() {
    const buttons = document.querySelectorAll('.division-nav-btn');
    const display = document.getElementById('division-content-display');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const id = btn.getAttribute('data-division-id');
        const info = DIVISIONS_INFO[id];
        if (!info || !display) return;

        buttons.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
          const icon = b.querySelector('.division-nav-toggle-icon');
          if (icon) icon.textContent = '+';
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const activeIcon = btn.querySelector('.division-nav-toggle-icon');
        if (activeIcon) activeIcon.textContent = '−';

        let areasHtml = '';
        if (info.areas && info.areas.length > 0) {
          areasHtml = `
            <div class="therapeutic-tags-grid">
              ${info.areas.map(a => {
                if (a.code === 'GI' || a.name === 'GASTROENTEROLOGY') {
                  return `
                    <div class="therapeutic-tag therapeutic-tag-gastro">
                      <span class="therapeutic-tag-code">[${a.code}]</span>
                      <span class="therapeutic-stacked-text"><span class="therapeutic-line">GASTRO</span><span class="therapeutic-line">ENTEROLOGY</span></span>
                    </div>
                  `;
                }
                return `
                  <div class="therapeutic-tag">
                    <span class="therapeutic-tag-code">[${a.code}]</span>
                    <span>${a.name}</span>
                  </div>
                `;
              }).join('')}
            </div>
          `;
        } else {
          areasHtml = `
            <div class="therapeutic-tags-grid">
              <div class="therapeutic-tag" style="background: var(--bg-tertiary); border-color: var(--border-subtle);">
                <span class="therapeutic-tag-code">[SPEC]</span>
                <span>${info.name.replace(' DIVISION', '')} SPECIALIZED FORMULATIONS</span>
              </div>
            </div>
            <p class="therapeutic-empty-notice" style="margin-top: 0.85rem;">
              No additional therapeutic areas have been provided. Specialized product portfolio details listed in the catalogue below.
            </p>
          `;
        }

        display.innerHTML = `
          <div class="division-detail-wrapper">
            <div class="division-detail-header">
              <span class="division-badge-code">${info.code} // CLASSIFICATION</span>
              <h3 class="division-detail-title">${info.name}</h3>
              <p class="division-detail-summary">${info.summary}</p>
            </div>

            <div class="division-therapeutic-block">
              <span class="therapeutic-title-label">
                ${info.areas.length > 0 ? 'Designated Therapeutic Disciplines' : 'Specialized Therapeutic Focus'}
              </span>
              ${areasHtml}
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
      });
    });
  }

  // Catalogue Filtering & Search
  function bindCatalogue() {
    const searchInput = document.getElementById('product-search-input');
    const pills = document.querySelectorAll('.filter-pill');
    const cards = document.querySelectorAll('.product-card');
    const countDisplay = document.getElementById('catalogue-count');

    function filter() {
      let visibleCount = 0;
      const q = searchQuery.toLowerCase().trim();

      cards.forEach(function (card) {
        const fam = card.getAttribute('data-family') || '';
        const name = (card.querySelector('.product-card-name') || {}).textContent || '';
        const form = (card.querySelector('.product-formulation-tag') || {}).textContent || '';

        const matchesFamily = (currentFamily === 'ALL') || (fam.toUpperCase() === currentFamily.toUpperCase());
        const matchesQuery = !q || name.toLowerCase().includes(q) || fam.toLowerCase().includes(q) || form.toLowerCase().includes(q);

        if (matchesFamily && matchesQuery) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (countDisplay) countDisplay.textContent = visibleCount;
    }

    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        searchQuery = e.target.value;
        filter();
      });
    }

    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        pills.forEach(p => {
          p.classList.remove('active');
          p.setAttribute('aria-selected', 'false');
        });
        pill.classList.add('active');
        pill.setAttribute('aria-selected', 'true');
        currentFamily = pill.getAttribute('data-family') || 'ALL';
        filter();
      });
    });

    cards.forEach(function (card) {
      const id = card.getAttribute('data-product-id');
      card.addEventListener('click', function (e) {
        const addBasketBtn = e.target.closest('.btn-card-add-basket');
        if (addBasketBtn) {
          e.stopPropagation();
          e.preventDefault();
          MRR_BASKET.add(id, 1);
          return;
        }
        openProductModal(id);
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openProductModal(id);
        }
      });
    });
  }

  // =========================================================================
  // Company Purchase & Product Enquiry Architecture (Admin / Backend Compatible)
  // =========================================================================
  const MRR_PURCHASE_CONFIG = {
    defaults: {
      purchaseEmail: 'marrionrussal@gmail.com',
      whatsappNumber: '919149412102',
      whatsappDisplayNumber: '+91 9149412102'
    },
    getSettings: function () {
      try {
        if (typeof window !== 'undefined' && window.__COMPANY_PURCHASE_SETTINGS) {
          return Object.assign({}, this.defaults, window.__COMPANY_PURCHASE_SETTINGS);
        }
        const saved = localStorage.getItem('mrr_purchase_settings');
        if (saved) {
          return Object.assign({}, this.defaults, JSON.parse(saved));
        }
      } catch (e) {
        // Safe fallback
      }
      return Object.assign({}, this.defaults);
    },
    updateSettings: function (newEmail, newWhatsApp) {
      const current = this.getSettings();
      if (newEmail && typeof newEmail === 'string') {
        current.purchaseEmail = newEmail.trim();
      }
      if (newWhatsApp && typeof newWhatsApp === 'string') {
        current.whatsappNumber = newWhatsApp.replace(/\D/g, '');
        current.whatsappDisplayNumber = newWhatsApp.trim();
      }
      try {
        localStorage.setItem('mrr_purchase_settings', JSON.stringify(current));
      } catch (e) {}
      return current;
    }
  };

  // Expose global config for future admin dashboard / runtime updates
  window.MRR_PURCHASE_CONFIG = MRR_PURCHASE_CONFIG;

  /**
   * Generates dynamic mailto purchase request link
   * @param {object|string} product - Product object or name
   * @returns {string} mailto URL
   */
  function generateEmailPurchaseLink(product) {
    const name = (typeof product === 'object' && product !== null ? product.name : product || 'Pharmaceutical Product').trim();
    const settings = MRR_PURCHASE_CONFIG.getSettings();
    const email = settings.purchaseEmail || 'marrionrussal@gmail.com';
    const subject = `Purchase Request - ${name}`;
    const body = `Hello Marrion Russal Remedies,\n\nI would like to purchase the following product:\n\nProduct: ${name}\n\nPlease provide me with the availability, quantity options, pricing and purchase details.\n\nThank you.`;

    return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  /**
   * Generates dynamic WhatsApp click-to-chat purchase link
   * @param {object|string} product - Product object or name
   * @returns {string} wa.me URL
   */
  function generateWhatsAppPurchaseLink(product) {
    const name = (typeof product === 'object' && product !== null ? product.name : product || 'Pharmaceutical Product').trim();
    const settings = MRR_PURCHASE_CONFIG.getSettings();
    const number = settings.whatsappNumber || '919149412102';
    const message = `Hello Marrion Russal Remedies,\n\nI would like to purchase the following product:\n\nProduct: ${name}\n\nPlease provide me with the availability, quantity options, pricing and purchase details.\n\nThank you.`;

    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  }

  // Alias helpers for seamless compatibility
  const generateEmailEnquiryLink = generateEmailPurchaseLink;
  const generateWhatsAppEnquiryLink = generateWhatsAppPurchaseLink;


  // =========================================================================
  // =========================================================================
  // Pharmaceutical Product Shopping Desk / Manual WhatsApp Purchase System
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
                formatted_price: p.formatted_price,
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
        const formattedPrice = live.formatted_price || (price ? '₹' + price.toFixed(2) : null);
        const salesStatus = live.sales_status || (prod && prod.sales_status) || 'REQUIRES VERIFICATION';
        const isPurchasable = (price !== null && price > 0 && salesStatus === 'AVAILABLE FOR ONLINE PURCHASE');

        return {
          productId: item.productId,
          quantity: item.quantity,
          product: prod || null,
          isAvailable: !!prod,
          price: price,
          formattedPrice: formattedPrice,
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
                <p class="basket-drawer-subtitle" id="basket-drawer-subtitle">Review selected pharmaceutical products before requesting payment details.</p>
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
              complianceBadge = `<span class="compliance-badge badge-unpriced">🔒 Price Currently Unavailable</span>`;
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
                <strong>Pharmaceutical Notice:</strong> ${unpurchasableItems.length} formulation(s) in your basket require company verification or official price configuration before checkout. Please remove them to proceed, or contact us directly.
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
                <span class="basket-summary-label" style="font-weight: 800; color: var(--navy-primary);">ESTIMATED TOTAL</span>
                <span class="basket-summary-val" style="font-size: 1.15rem; color: var(--wine-primary);">₹${totalPayable.toFixed(2)}</span>
              </div>
              <div class="basket-disclaimer">
                Direct pharmaceutical procurement. The authoritative total is calculated server-side from active database pricing.
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
      // VIEW 2: Checkout & Delivery Form (With Complete Basket & Total)
      // =======================================================================
      else if (this.currentView === 'checkout') {
        if (title) title.textContent = 'CHECKOUT & DELIVERY';
        if (subtitle) subtitle.textContent = 'Enter delivery details and review the exact amount to pay before requesting payment details.';

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
              <form class="checkout-form-grid" id="checkout-delivery-form" onsubmit="return false;">
                <div class="checkout-form-group full-width">
                  <label class="checkout-label" for="checkout-name">Full Name <span class="required-star">*</span></label>
                  <input type="text" id="checkout-name" class="checkout-input" placeholder="e.g. Dr. Rajesh Sharma / Authorized Chemist" required />
                </div>
                <div class="checkout-form-group">
                  <label class="checkout-label" for="checkout-phone">Mobile Number <span class="required-star">*</span></label>
                  <input type="tel" id="checkout-phone" class="checkout-input" placeholder="10-digit mobile number" maxlength="15" required />
                </div>
                <div class="checkout-form-group">
                  <label class="checkout-label" for="checkout-email">Email Address <span class="required-star">*</span></label>
                  <input type="email" id="checkout-email" class="checkout-input" placeholder="customer@domain.com" required />
                </div>
                <div class="checkout-form-group full-width">
                  <label class="checkout-label" for="checkout-address">Delivery Address <span class="required-star">*</span></label>
                  <textarea id="checkout-address" class="checkout-textarea" placeholder="Premises, Clinic, Hospital, Pharmacy, Street" required></textarea>
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
                <span class="checkout-total-label">TOTAL AMOUNT TO PAY</span>
                <span class="checkout-total-amount">₹${totalPayable.toFixed(2)}</span>
              </div>
              <p style="font-size: 0.76rem; color: var(--text-secondary); margin: 0.5rem 0 0 0; line-height: 1.4;">
                * The owner will receive this exact amount and send you the official company QR code, UPI ID, or bank details on WhatsApp.
              </p>
            </div>

            <div class="checkout-actions-wrap">
              <button class="btn-request-payment" id="btn-submit-request-payment">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>REQUEST PAYMENT DETAILS</span>
              </button>
              <div class="checkout-pci-badge">
                <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clip-rule="evenodd" />
                </svg>
                <span>Direct WhatsApp Payment to Owner • Zero Card/Banking Credential Storage</span>
              </div>
              <button class="btn-back-to-basket" id="btn-checkout-back-basket">
                <span>← EDIT BASKET</span>
              </button>
            </div>
          </div>
        `;

        const requestBtn = document.getElementById('btn-submit-request-payment');
        if (requestBtn) {
          requestBtn.onclick = () => self.handleCheckoutRequestPayment();
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
      // VIEW 3: Payment Details Requested Screen
      // =======================================================================
      else if (this.currentView === 'order-confirmed') {
        const order = self.lastConfirmedOrder || {};
        const items = self.lastConfirmedItems || [];

        if (title) title.textContent = 'PAYMENT DETAILS REQUESTED';
        if (subtitle) subtitle.textContent = 'Your purchase request has been submitted to Marrion Russal Remedies.';

        const itemsRows = items.map(x => `
          <div class="receipt-row">
            <span class="receipt-label">${x.product_name} × ${x.quantity}</span>
            <span class="receipt-val font-mono">${x.formatted_subtotal || ('₹' + parseFloat(x.subtotal).toFixed(2))}</span>
          </div>
        `).join('');

        const orderNum = order.orderNumber || order.order_number || 'MRR-2026-PENDING';
        const formattedTotal = order.formattedTotal || order.formatted_total || ('₹' + parseFloat(order.totalAmount || order.total_amount || 0).toFixed(2));
        const custName = (order.customer && order.customer.name) || order.customer_name || 'Valued Customer';
        const custPhone = (order.customer && order.customer.phone) || order.customer_phone || '';
        const custAddr = (order.customer && order.customer.address) || order.delivery_address || '';
        const custCity = (order.customer && order.customer.city) || order.city || '';
        const custState = (order.customer && order.customer.state) || order.state || '';
        const custPin = (order.customer && order.customer.pinCode) || order.pin_code || '';
        const waUrl = order.whatsappUrl || `https://wa.me/919149412102`;

        body.innerHTML = `
          <div class="order-confirmed-view">
            <div class="order-confirmed-icon-circle" style="background: rgba(16, 185, 129, 0.15); border-color: #10b981; color: #10b981;">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </div>
            <h2 class="order-confirmed-title">PAYMENT DETAILS REQUESTED</h2>
            <p class="order-confirmed-subtitle">The company owner has received your order request on WhatsApp.</p>

            <div class="order-confirmed-receipt">
              <div class="receipt-row">
                <span class="receipt-label">Order ID:</span>
                <span class="receipt-val order-id-highlight">#${orderNum}</span>
              </div>
              <div class="receipt-row">
                <span class="receipt-label">Payment Workflow:</span>
                <span class="receipt-val" style="color: #0f6f4c;">Direct WhatsApp Transfer (+91 9149412102)</span>
              </div>
              <div class="receipt-row">
                <span class="receipt-label">Current Status:</span>
                <span class="receipt-val" id="receipt-order-status" style="color: #2563eb; font-weight: 700;">${order.paymentStatus || order.payment_status || 'PAYMENT DETAILS REQUESTED'}</span>
              </div>
              <div class="receipt-row">
                <span class="receipt-label">Customer Name:</span>
                <span class="receipt-val">${custName}</span>
              </div>
              <div class="receipt-row">
                <span class="receipt-label">Contact Phone:</span>
                <span class="receipt-val">${custPhone}</span>
              </div>
              <div class="receipt-row">
                <span class="receipt-label">Delivery Address:</span>
                <span class="receipt-val" style="text-align: right; max-width: 60%;">${custAddr}, ${custCity}, ${custState} - ${custPin}</span>
              </div>
              <div style="margin: 0.4rem 0; border-top: 1px dashed var(--border-light); padding-top: 0.4rem;">
                ${itemsRows}
              </div>
              <div class="receipt-row" style="margin-top: 0.35rem; font-weight: 800;">
                <span class="receipt-label" style="color: var(--navy-primary); font-size: 0.95rem;">TOTAL AMOUNT TO PAY:</span>
                <span class="receipt-val" style="color: var(--wine-primary); font-size: 1.25rem;">${formattedTotal}</span>
              </div>
            </div>

            <div style="width: 100%;">
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-request-payment" style="text-decoration: none;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>OPEN WHATSAPP PURCHASE REQUEST</span>
              </a>
            </div>

            <!-- Optional Payment Proof Box -->
            <div class="proof-submission-box">
              <h4>Optional: Submit Payment Reference / UTR</h4>
              <p>Once you send payment via the QR Code, UPI ID, or Bank details provided by the owner on WhatsApp, enter your UTR / transaction reference number below for verification:</p>
              <div class="proof-input-group">
                <input type="text" id="input-payment-ref" class="proof-input" placeholder="e.g. UPI Ref / UTR / Transaction ID" />
                <button id="btn-submit-proof" class="btn-proof-submit">Submit Reference</button>
              </div>
              <div id="proof-status-msg" style="margin-top: 0.5rem; font-size: 0.78rem; font-weight: 600;"></div>
            </div>

            <div class="order-support-box">
              <span style="font-weight: 700; color: var(--navy-primary);">Need assistance or have questions?</span>
              <a href="https://wa.me/919149412102?text=Hello%20Marrion%20Russal%20Remedies,%20I%20have%20an%20inquiry%20regarding%20Order%20%23${orderNum}" target="_blank" rel="noopener noreferrer" class="btn-support-whatsapp">
                <span>Chat with Company on WhatsApp (+91 9149412102)</span>
              </a>
              <span style="font-size: 0.76rem;">Direct Email: <a href="mailto:marrionrussal@gmail.com" style="color: var(--wine-primary); font-weight: 700;">marrionrussal@gmail.com</a></span>
            </div>

            <div style="padding: 0.75rem 0;">
              <button class="btn-proceed-purchase" id="btn-confirmed-browse-more">
                CONTINUE BROWSING CATALOGUE
              </button>
            </div>
          </div>
        `;

        const submitProofBtn = document.getElementById('btn-submit-proof');
        if (submitProofBtn) {
          submitProofBtn.onclick = function () {
            const refInput = document.getElementById('input-payment-ref');
            const refVal = (refInput ? refInput.value : '').trim();
            const msgEl = document.getElementById('proof-status-msg');
            const statusEl = document.getElementById('receipt-order-status');

            if (!refVal) {
              if (msgEl) {
                msgEl.style.color = '#ef4444';
                msgEl.textContent = 'Please enter a valid reference / UTR number.';
              }
              return;
            }

            submitProofBtn.disabled = true;
            submitProofBtn.textContent = 'Submitting...';

            fetch(`/api/orders/${order.orderId || order.id || orderNum}/submit-proof`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ referenceNumber: refVal, proofNotes: 'Submitted via Shopping Desk confirmation' })
            })
            .then(res => res.json())
            .then(resData => {
              submitProofBtn.disabled = false;
              submitProofBtn.textContent = 'Submit Reference';
              if (resData.success) {
                if (msgEl) {
                  msgEl.style.color = '#059669';
                  msgEl.textContent = '✓ Reference submitted! Status: PAYMENT VERIFICATION REQUIRED. The owner will verify receipt and confirm your order.';
                }
                if (statusEl) {
                  statusEl.textContent = 'PAYMENT VERIFICATION REQUIRED';
                  statusEl.style.color = '#d97706';
                }
                showToast('✓ Payment reference submitted for owner verification.');
              } else {
                if (msgEl) {
                  msgEl.style.color = '#ef4444';
                  msgEl.textContent = resData.error || 'Submission failed.';
                }
              }
            })
            .catch(() => {
              submitProofBtn.disabled = false;
              submitProofBtn.textContent = 'Submit Reference';
              if (msgEl) {
                msgEl.style.color = '#ef4444';
                msgEl.textContent = 'Network error submitting reference.';
              }
            });
          };
        }

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
            showToast('⚠️ Please remove unverified formulations to proceed with checkout.');
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

    handleCheckoutRequestPayment: function () {
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

      const phoneClean = phone.replace(/[\s\-+]/g, '');
      if (phoneClean.length < 10 || !/^\d+$/.test(phoneClean)) {
        showToast('Please enter a valid 10-digit mobile number.');
        if (phoneInput) phoneInput.focus();
        return;
      }

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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

      if (!pincode || !/^\d{6}$/.test(pincode)) {
        showToast('Please enter a valid 6-digit postal PIN code.');
        if (pincodeInput) pincodeInput.focus();
        return;
      }

      const purchasableItems = this.getDetailedItems().filter(x => x.isPurchasable);
      if (purchasableItems.length === 0) {
        showToast('No purchasable items in basket.');
        return;
      }

      const itemsPayload = purchasableItems.map(x => ({
        productId: x.productId,
        quantity: x.quantity
      }));

      const reqBtn = document.getElementById('btn-submit-request-payment');
      if (reqBtn) {
        reqBtn.disabled = true;
        reqBtn.innerHTML = `<span>Generating WhatsApp Request...</span>`;
      }
      this.isSubmitting = true;

      fetch('/api/checkout/request-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: name,
          phone: phoneClean,
          email: email,
          deliveryAddress: address,
          city: city,
          state: state,
          pinCode: pincode,
          items: itemsPayload
        })
      })
      .then(res => res.json())
      .then(data => {
        self.isSubmitting = false;
        if (!data.success) {
          const err = data.error || 'Failed to process request.';
          showToast(err);
          if (reqBtn) {
            reqBtn.disabled = false;
            reqBtn.innerHTML = `<span>REQUEST PAYMENT DETAILS</span>`;
          }
          return;
        }

        self.lastConfirmedOrder = data;
        self.lastConfirmedItems = data.items || [];
        self.clear(); // Basket cleared from localStorage once order is created
        self.currentView = 'order-confirmed';
        self.renderDrawer();

        // Open WhatsApp in new tab with the complete pre-filled purchase request
        if (data.whatsappUrl) {
          window.open(data.whatsappUrl, '_blank');
        }

        showToast('✓ Purchase request submitted! WhatsApp opened with order details.');
      })
      .catch(err => {
        self.isSubmitting = false;
        showToast('Communication error with server. Please try again.');
        if (reqBtn) {
          reqBtn.disabled = false;
          reqBtn.innerHTML = `<span>REQUEST PAYMENT DETAILS</span>`;
        }
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

    init: function () {
      this.bindPortalTriggers();
    },

    bindPortalTriggers: function () {
      const self = this;
      const footerLink = document.getElementById('admin-portal-link');
      if (footerLink) {
        footerLink.addEventListener('click', function (e) {
          e.preventDefault();
          self.open();
        });
      }

      window.addEventListener('hashchange', function () {
        if (window.location.hash === '#admin' || window.location.hash === '#admin-portal') {
          self.open();
        }
      });
    },

    open: function () {
      const root = document.getElementById('admin-modal-root');
      if (!root) return;
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
      if (!root) return;
      root.classList.remove('open');
      root.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (window.location.hash === '#admin' || window.location.hash === '#admin-portal') {
        history.pushState(null, '', '#products');
      }
    },

    renderLogin: function () {
      const self = this;
      const root = document.getElementById('admin-modal-root');
      if (!root) return;

      root.innerHTML = `
        <div class="admin-modal-backdrop" id="admin-modal-backdrop"></div>
        <div class="admin-modal-panel" style="max-width: 440px;">
          <div class="admin-modal-header">
            <h3 class="admin-modal-title">MARRION RUSSAL ADMIN</h3>
            <button class="basket-close-btn" id="admin-modal-close" style="color: #ffffff;">✕</button>
          </div>
          <div class="admin-modal-body">
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
              Authorized company administration for manual order lifecycle management and pricing configuration.
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

            const rows = orders.map(o => {
              const proofSnippet = o.payment_proof_ref 
                ? `<div style="margin-top: 0.35rem; padding: 0.2rem 0.4rem; background: #fef3c7; border: 1px solid #f59e0b; border-radius: 4px; font-size: 0.72rem; color: #92400e; font-family: var(--font-mono);">UTR: ${o.payment_proof_ref}</div>` 
                : '';

              const canConfirm = (o.order_status !== 'PAYMENT CONFIRMED' && o.order_status !== 'DELIVERED' && o.order_status !== 'CANCELLED');
              const confirmBtn = canConfirm 
                ? `<button class="admin-btn btn-quick-confirm-payment" data-order-id="${o.id}" style="background: #059669; color: #fff; padding: 0.25rem 0.5rem; font-size: 0.72rem; margin-top: 0.35rem; display: block; width: 100%;">✓ Confirm Payment</button>`
                : '';

              return `
                <tr>
                  <td><strong>#${o.order_number}</strong><br><small style="color: var(--text-muted);">${o.created_at || ''}</small></td>
                  <td><strong>${o.customer_name}</strong><br><small>${o.customer_phone}<br>${o.customer_email}</small></td>
                  <td><small style="color: var(--text-secondary);">${o.delivery_address || ''}, ${o.city || ''}, ${o.state || ''} - ${o.pin_code || ''}</small></td>
                  <td><small>${o.items ? o.items.map(i => `${i.product_name} (${i.quantity} × ${i.formatted_price || '₹' + i.unit_price})`).join('<br>') : 'N/A'}</small></td>
                  <td style="font-family: var(--font-mono); font-weight: 700; color: var(--wine-primary); font-size: 0.95rem;">${o.formatted_total || ('₹' + parseFloat(o.total_amount).toFixed(2))}</td>
                  <td>
                    <span class="status-badge ${o.payment_status === 'PAYMENT CONFIRMED' ? 'status-paid' : 'status-pending'}">${o.payment_status}</span>
                    ${proofSnippet}
                  </td>
                  <td>
                    <select class="admin-status-dropdown" data-order-id="${o.id}" style="padding: 0.3rem 0.5rem; font-size: 0.76rem; border-radius: 4px; border: 1px solid var(--border-light); width: 100%;">
                      ${[
                        'PAYMENT DETAILS REQUESTED',
                        'PAYMENT PENDING',
                        'PAYMENT VERIFICATION REQUIRED',
                        'PAYMENT CONFIRMED',
                        'PROCESSING',
                        'SHIPPED',
                        'DELIVERED',
                        'CANCELLED'
                      ].map(st => `
                        <option value="${st}" ${o.order_status === st ? 'selected' : ''}>${st}</option>
                      `).join('')}
                    </select>
                    ${confirmBtn}
                  </td>
                </tr>
              `;
            }).join('');

            container.innerHTML = `
              <div style="overflow-x: auto;">
                <table class="admin-data-table">
                  <thead>
                    <tr>
                      <th>Order ID & Date</th>
                      <th>Customer</th>
                      <th>Delivery Address</th>
                      <th>Formulations</th>
                      <th>Total Amount</th>
                      <th>Payment Status</th>
                      <th>Lifecycle Action</th>
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
                  if (d.success) {
                    showToast(`✓ Order status updated to ${nst}`);
                    self.renderDashboard();
                  } else {
                    showToast(d.error || 'Update failed');
                  }
                });
              };
            });

            container.querySelectorAll('.btn-quick-confirm-payment').forEach(btn => {
              btn.onclick = function () {
                const oid = btn.getAttribute('data-order-id');
                btn.disabled = true;
                btn.textContent = 'Confirming...';
                fetch(`/api/admin/orders/${oid}/status`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify({ status: 'PAYMENT CONFIRMED' })
                })
                .then(r => r.json())
                .then(d => {
                  if (d.success) {
                    showToast('✓ Payment confirmed! Order updated.');
                    self.renderDashboard();
                  } else {
                    btn.disabled = false;
                    btn.textContent = '✓ Confirm Payment';
                    showToast(d.error || 'Confirmation failed');
                  }
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
                Set price and configure pharmaceutical sales status for each formulation. Products without configured prices cannot be checked out online.
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

                btn.disabled = true;
                btn.textContent = 'Saving...';

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
                  btn.disabled = false;
                  btn.textContent = 'Save';
                  if (d.success) {
                    showToast(`✓ Updated ${d.product.name}`);
                    MRR_BASKET.fetchLivePricing();
                  } else {
                    showToast(d.error || 'Update failed');
                  }
                })
                .catch(() => {
                  btn.disabled = false;
                  btn.textContent = 'Save';
                  showToast('Error communicating with server');
                });
              };
            });
          });
      } else if (self.currentTab === 'logs') {
        fetch('/api/admin/audit-logs', { headers: { 'Authorization': `Bearer ${token}` } })
          .then(res => res.json())
          .then(data => {
            if (!data.success) {
              container.innerHTML = `<div style="color: #ef4444;">${data.error || 'Failed to load audit logs'}</div>`;
              return;
            }
            const logs = data.logs || [];
            if (logs.length === 0) {
              container.innerHTML = `<div style="padding: 2rem; text-align: center; color: var(--text-muted);">No audit events recorded yet.</div>`;
              return;
            }

            const rows = logs.map(l => `
              <tr>
                <td><small style="font-family: var(--font-mono);">${l.created_at || ''}</small></td>
                <td><strong>${l.admin_username || 'System'}</strong></td>
                <td><span style="font-family: var(--font-mono); font-size: 0.74rem; background: var(--bg-secondary); padding: 0.15rem 0.4rem; border-radius: 3px;">${l.action}</span></td>
                <td>${l.entity_type} (#${l.entity_id})</td>
                <td><small>${l.details}</small></td>
              </tr>
            `).join('');

            container.innerHTML = `
              <div style="overflow-x: auto;">
                <table class="admin-data-table">
                  <thead>
                    <tr>
                      <th>Timestamp</th>
                      <th>Admin</th>
                      <th>Action</th>
                      <th>Target Entity</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>${rows}</tbody>
                </table>
              </div>
            `;
          });
      }
    }
  };

  window.MRR_ADMIN_PORTAL = MRR_ADMIN_PORTAL;

  /**
   * Renders the dedicated, visible and functional Purchase Section inside product detail
   * @param {object} product
   * @returns {string} HTML markup
   */
  function renderPurchaseSection(product) {
    if (!product) return '';
    const emailLink = generateEmailPurchaseLink(product);
    const whatsappLink = generateWhatsAppPurchaseLink(product);
    const settings = MRR_PURCHASE_CONFIG.getSettings();

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

  const renderPurchaseEnquirySection = renderPurchaseSection;

  // Product Detail Modal
  function openProductModal(productId) {
    const p = PRODUCTS.find(x => x.id === productId || x.aliasId === productId || (x.id && x.id.replace(/-/g, '') === (productId || '').replace(/-/g, '')));
    if (!p) return;

    const container = document.getElementById('modal-container');
    if (!container) return;

    container.innerHTML = `
      <div class="modal-backdrop open" id="product-modal-root" role="dialog" aria-modal="true" aria-labelledby="modal-product-title">
        <div class="product-modal-dialog">
          <div class="modal-header">
            <div class="modal-title-wrap">
              <div class="modal-badges-row">
                <span class="product-family-tag">${p.family}</span>
                <span class="product-formulation-tag">${p.productType || p.formulation}</span>
                <span class="mono-tag" style="background: rgba(14, 165, 233, 0.1); color: var(--cyan-accent); padding: 0.2rem 0.5rem; border-radius: var(--radius-xs);">
                  Status: Current
                </span>
              </div>
              <h2 class="modal-product-name" id="modal-product-title">${p.name}</h2>
              <span class="mono-tag" style="color: var(--text-muted); font-size: 0.72rem;">
                Division: ${p.division}
              </span>
            </div>

            <button class="modal-close-btn" id="modal-close-btn" aria-label="Close product details">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="modal-body">
            <!-- Product Packaging Photo or Clean Reference Placeholder -->
            <div class="modal-image-col">
              ${p.image ? `
              <div class="modal-product-photo-wrap">
                <img src="${p.image}" alt="${p.name} Packaging - Marrion Russal Remedies" class="modal-product-photo" />
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
                REF-ID: MRR-${(p.name || p.id).replace(/[^A-Z0-9]/gi, '').toUpperCase()}
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
                      ${p.composition && p.composition !== '[Information to be added]' && p.composition !== 'Information to be added'
                        ? `<div class="spec-value-content">${p.composition}</div>`
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
                      ${p.description && p.description !== '[Information to be added]' && p.description !== 'Information to be added'
                        ? `<div class="spec-value-content">${p.description}</div>`
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
                      ${p.indications && p.indications !== '[Information to be added]' && p.indications !== 'Information to be added'
                        ? `<div class="spec-value-content">${p.indications}</div>`
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
                      ${p.dosage && p.dosage !== '[Information to be added]' && p.dosage !== 'Information to be added'
                        ? `<div class="spec-value-content">${p.dosage}</div>`
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
                      ${p.packaging && p.packaging !== '[Information to be added]' && p.packaging !== 'Information to be added'
                        ? `<div class="spec-value-content">${p.packaging}</div>`
                        : `<div class="spec-value-placeholder">Information to be added</div>`}
                    </div>
                  </div>
                </details>
              </div>
            </div>

            <!-- VISIBLE, FUNCTIONAL PURCHASE SECTION ON EVERY PRODUCT DETAIL PAGE -->
            ${renderPurchaseSection(p)}
          </div>

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

    document.body.style.overflow = 'hidden';
    if (window.location.hash !== `#products/${productId}`) {
      history.pushState(null, '', `#products/${productId}`);
    }

    const backdrop = document.getElementById('product-modal-root');
    const closeBtn = document.getElementById('modal-close-btn');
    const backBtn = document.getElementById('modal-back-btn');
    const emailBuyBtn = document.getElementById('btn-buy-email');
    const waBuyBtn = document.getElementById('btn-buy-whatsapp');
    const modalAddBasketBtn = document.getElementById('modal-add-basket-btn');
    const modalViewBasketBtn = document.getElementById('modal-view-basket-btn');
    const modalContinueBtn = document.getElementById('modal-continue-shopping-btn');

    if (modalAddBasketBtn) {
      modalAddBasketBtn.addEventListener('click', function () {
        MRR_BASKET.add(p.id, 1);
      });
    }

    if (modalViewBasketBtn) {
      modalViewBasketBtn.addEventListener('click', function () {
        close();
        MRR_BASKET.openDrawer('basket');
      });
    }

    if (modalContinueBtn) {
      modalContinueBtn.addEventListener('click', function () {
        close();
      });
    }

    if (emailBuyBtn) {
      emailBuyBtn.addEventListener('click', function () {
        showToast('Launching email application for ' + p.name + ' purchase...');
      });
    }

    if (waBuyBtn) {
      waBuyBtn.addEventListener('click', function () {
        showToast('Opening WhatsApp purchase desk for ' + p.name + '...');
      });
    }

    function close() {
      container.innerHTML = '';
      document.body.style.overflow = '';
      if (window.location.hash.startsWith('#products/')) {
        history.pushState(null, '', '#products');
      }
    }

    if (closeBtn) closeBtn.addEventListener('click', close);
    if (backBtn) backBtn.addEventListener('click', close);
    if (backdrop) {
      backdrop.addEventListener('click', function (e) {
        if (e.target === backdrop) close();
      });
    }

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        close();
        window.removeEventListener('keydown', onKeyDown);
      }
    }
    window.addEventListener('keydown', onKeyDown);
  }

  // Contact Form & Copy Email
  function bindContact() {
    const copyBtn = document.getElementById('copy-email-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        const email = copyBtn.getAttribute('data-email') || 'Marrionrussal@gmail.com';
        if (navigator.clipboard) {
          navigator.clipboard.writeText(email).then(function () {
            showToast('Email copied: ' + email);
          }).catch(function () {
            showToast('Official Email: ' + email);
          });
        } else {
          showToast('Official Email: ' + email);
        }
      });
    }

    const form = document.getElementById('corporate-inquiry-form');
    const feedback = document.getElementById('form-feedback');

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = (form.querySelector('[name="name"]') || {}).value || '';
        const email = (form.querySelector('[name="email"]') || {}).value || '';
        const subject = (form.querySelector('[name="subject"]') || {}).value || '';
        const message = (form.querySelector('[name="message"]') || {}).value || '';

        if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
          if (feedback) {
            feedback.className = 'form-feedback-alert';
            feedback.style.display = 'block';
            feedback.style.background = '#fef2f2';
            feedback.style.borderColor = '#fecaca';
            feedback.style.color = '#991b1b';
            feedback.textContent = 'Please fill out all required fields before submitting your corporate inquiry.';
          }
          return;
        }

        if (feedback) {
          feedback.className = 'form-feedback-alert success';
          feedback.style.display = 'block';
          feedback.textContent = 'Thank you. Your corporate inquiry has been dispatched to Marrion Russal Remedies headquarters.';
        }
        form.reset();
        showToast('Corporate inquiry submitted successfully.');
      });
    }
  }

  function showToast(msg) {
    const t = document.getElementById('toast-notify');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(function () {
      t.classList.remove('show');
    }, 3200);
  }

  // Deep Routing
  function bindRouting() {
    function check() {
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
    }
    window.addEventListener('hashchange', check);
    const footerAdminLink = document.getElementById('footer-admin-link');
    if (footerAdminLink) {
      footerAdminLink.addEventListener('click', function (e) {
        e.preventDefault();
        MRR_ADMIN_PORTAL.open();
      });
    }
    check();
  }

  // Start on ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
