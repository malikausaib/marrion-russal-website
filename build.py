import os

products = [
  {"id": "gasoril-capsule", "name": "GASORIL CAPSULE", "family": "GASORIL", "formulation": "Capsule", "division": "GENERAL DIVISION 1", "image": "products/gasoril-capsule.webp"},
  {"id": "gasoril-mps-syrup", "name": "GASORIL MPS SYRUP", "family": "GASORIL", "formulation": "Syrup", "division": "GENERAL DIVISION 1"},
  {"id": "gasoril-dsr-capsule", "name": "GASORIL DSR CAPSULE", "family": "GASORIL", "formulation": "Capsule", "division": "GENERAL DIVISION 1"},
  {"id": "gasoril-psc-tablet", "name": "GASORIL PSC TABLET", "family": "GASORIL", "formulation": "Tablet", "division": "GENERAL DIVISION 1", "image": "products/gasoril-psc.webp"},
  {"id": "gasoril-p-drops-suspension", "name": "GASORIL P DROPS SUSPENSION", "family": "GASORIL", "formulation": "Drops / Suspension", "division": "GENERAL DIVISION 1"},
  {"id": "gasoril-kid-drops", "name": "GASORIL KID DROPS", "family": "GASORIL", "formulation": "Pediatric Drops", "division": "GENERAL DIVISION 1", "image": "products/gasoril-kid.webp"},
  {"id": "gasoril-raft-syrup", "name": "GASORIL RAFT SYRUP", "family": "GASORIL", "formulation": "Syrup", "division": "GENERAL DIVISION 1"},
  {
    "id": "nasril-s-spray-drop",
    "alias_id": "nasril-s",
    "name": "NASRIL-S",
    "legacy_name": "NASRIL S SPRAY/DROP",
    "productType": "Nasal Spray",
    "formulation": "Nasal Spray",
    "family": "NASRIL",
    "division": "GENERAL DIVISION 1",
    "image": "assets/images/nasril-s.jpg",
    "composition": "Sodium Chloride Nasal Solution",
    "description": "Information to be added",
    "indications": "Information to be added",
    "dosage": "As directed by the physician.",
    "packaging": "Information to be added",
    "price": None
  },
  {"id": "nasril-xp-spray-drop", "name": "NASRIL XP SPRAY/DROP", "family": "NASRIL", "formulation": "Nasal Spray / Drop", "division": "GENERAL DIVISION 1", "image": "products/nasril-xp.webp"},
  {"id": "nasril-x-spray-drop", "name": "NASRIL X SPRAY/DROP", "family": "NASRIL", "formulation": "Nasal Spray / Drop", "division": "GENERAL DIVISION 1", "image": "products/nasril-x.webp"},
  {"id": "nasril-f-spray", "name": "NASRIL F SPRAY", "family": "NASRIL", "formulation": "Nasal Spray", "division": "GENERAL DIVISION 1", "image": "products/nasril-f.webp"},
  {"id": "nasril-ax-syrup", "name": "NASRIL AX SYRUP", "family": "NASRIL", "formulation": "Syrup", "division": "GENERAL DIVISION 1"},
  {"id": "nasril-dx-syrup", "name": "NASRIL DX SYRUP", "family": "NASRIL", "formulation": "Syrup", "division": "GENERAL DIVISION 1"},
  {"id": "nasril-cold-tablet", "name": "NASRIL COLD TABLET", "family": "NASRIL", "formulation": "Tablet", "division": "GENERAL DIVISION 1"},
  {"id": "sucracell-o-suspension", "name": "SUCRACELL O SUSPENSION", "family": "SUCRACELL", "formulation": "Oral Suspension", "division": "GENERAL DIVISION 2ND", "image": "products/sucracell-o.webp"},
  {"id": "sucracell-plain-suspension", "name": "SUCRACELL PLAIN SUSPENSION", "family": "SUCRACELL", "formulation": "Oral Suspension", "division": "GENERAL DIVISION 2ND"},
  {"id": "devac-syrup", "name": "DEVAC SYRUP", "family": "DEVAC", "formulation": "Syrup", "division": "GENERAL DIVISION 2ND", "image": "products/devac-syrup.webp"},
  {"id": "devac-kid-syrup", "name": "DEVAC KID SYRUP", "family": "DEVAC", "formulation": "Pediatric Syrup", "division": "GENERAL DIVISION 2ND"},
  {"id": "acetos-gold-tablet", "name": "ACETOS GOLD TABLET", "family": "ACETOS", "formulation": "Tablet", "division": "GENERAL DIVISION 2ND"},
  {"id": "acetos-spas-tablet", "name": "ACETOS SPAS TABLET", "family": "ACETOS", "formulation": "Tablet", "division": "GENERAL DIVISION 2ND"},
  {"id": "clear-32-mouth-wash", "name": "CLEAR 32 MOUTH WASH", "family": "CLEAR 32", "formulation": "Oral Rinse / Mouth Wash", "division": "DENTAL DIVISION"},
  {"id": "lc-gel-ointment", "name": "LC GEL OINTMENT", "family": "LC", "formulation": "Gel / Ointment", "division": "DENTAL DIVISION"},
  {"id": "softex-moisturiser", "name": "SOFTEX MOISTURISER", "family": "SOFTEX", "formulation": "Topical Moisturiser", "division": "DERMATOLOGY DIVISION", "image": "products/softex-moisturiser.webp"},
  {"id": "softex-max-moisturiser", "name": "SOFTEX MAX MOISTURISER", "family": "SOFTEX", "formulation": "Advanced Moisturiser", "division": "DERMATOLOGY DIVISION"},
  {"id": "softex-moisturising-soap", "name": "SOFTEX MOISTURISING SOAP", "family": "SOFTEX", "formulation": "Cleansing Bar / Soap", "division": "DERMATOLOGY DIVISION"},
  {"id": "shadex-sunscreen", "name": "SHADEX SUNSCREEN", "family": "SHADEX", "formulation": "Photoprotective Sunscreen", "division": "DERMATOLOGY DIVISION", "image": "products/shadex-sunscreen.webp"},
  {"id": "ketotos-soap", "name": "KETOTOS SOAP", "family": "KETOTOS", "formulation": "Antifungal Medicated Soap", "division": "DERMATOLOGY DIVISION"},
  {"id": "ketotos-shampoo", "name": "KETOTOS SHAMPOO", "family": "KETOTOS", "formulation": "Therapeutic Scalp Shampoo", "division": "DERMATOLOGY DIVISION"},
  {"id": "permetos-ct-lotion", "name": "PERMETOS CT LOTION", "family": "PERMETOS", "formulation": "Therapeutic Medicated Lotion", "division": "DERMATOLOGY DIVISION"},
  {"id": "permetos-soap", "name": "PERMETOS SOAP", "family": "PERMETOS", "formulation": "Medicated Hygiene Soap", "division": "DERMATOLOGY DIVISION"}
]

def make_card(p):
    img_html = ""
    if p.get("image"):
        img_html = f"""
              <div class="product-card-image-wrap">
                <img src="{p['image']}" alt="{p['name']} - {p.get('productType', p['formulation'])}" class="product-card-thumb" loading="lazy" />
              </div>"""

    legacy_tag = f' <span class="sr-only">({p["legacy_name"]})</span>' if p.get("legacy_name") else ""
    legacy_attr = f' data-legacy-name="{p["legacy_name"]}"' if p.get("legacy_name") else ""
    alias_attr = f' data-alias-id="{p["alias_id"]}"' if p.get("alias_id") else ""

    return f"""
          <article class="product-card" data-product-id="{p['id']}"{alias_attr}{legacy_attr} data-family="{p['family']}" role="button" tabindex="0" aria-label="View specifications for {p['name']}">
            <div>
              {img_html}
              <div class="product-card-top">
                <span class="product-family-tag">{p['family']}</span>
                <span class="product-formulation-tag">{p.get('productType', p['formulation'])}</span>
              </div>
              <h3 class="product-card-name">{p['name']}{legacy_tag}</h3>
              <div class="product-card-meta">
                <div class="product-division-name">{p['division']}</div>
              </div>
            </div>
            <div class="product-card-action">
              <button type="button" class="btn-card-action btn-card-view" data-product-id="{p['id']}" aria-label="View specifications for {p['name']}">
                <span>View Product</span>
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button type="button" class="btn-card-action btn-card-add-basket" data-product-id="{p['id']}" aria-label="Add {p['name']} to basket">
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                </svg>
                <span>ADD TO BASKET</span>
              </button>
            </div>
          </article>"""

cards_html = "\n".join([make_card(p) for p in products])

html = f"""<!DOCTYPE html>
<html lang="en" data-theme="bright">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />

  <title>Marrion Russal Remedies Pvt. Ltd. | Serving Life. Spreading Wellness.</title>
  <meta name="title" content="Marrion Russal Remedies Pvt. Ltd. | Serving Life. Spreading Wellness." />
  <meta name="description" content="Official corporate website of Marrion Russal Remedies Pvt. Ltd., established in 2017. Delivering pharmaceutical formulation excellence across General, Dental, and Dermatology divisions." />
  <meta name="author" content="Marrion Russal Remedies Pvt. Ltd." />
  <meta name="robots" content="index, follow" />

  <meta property="og:type" content="website" />
  <meta property="og:title" content="Marrion Russal Remedies Pvt. Ltd. | Serving Life. Spreading Wellness." />
  <meta property="og:description" content="Dedicated to pharmaceutical precision and healthcare wellness since 2017. Serving Life. Spreading Wellness." />
  <meta property="og:image" content="assets/images/logo_square.png" />

  <link rel="icon" type="image/png" href="assets/images/logo_cursor_28.png" />
  <link rel="apple-touch-icon" href="assets/images/logo_square.png" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />

  <link rel="stylesheet" href="assets/css/variables.css" />
  <link rel="stylesheet" href="assets/css/typography.css" />
  <link rel="stylesheet" href="assets/css/layout.css" />
  <link rel="stylesheet" href="assets/css/components.css" />
  <link rel="stylesheet" href="assets/css/animations.css" />
  <link rel="stylesheet" href="assets/css/responsive.css" />
</head>
<body>
  <!-- Sophisticated Sliding Brand Reveal Opening Curtain -->
  <div id="brand-reveal-curtain" class="brand-reveal-curtain" aria-hidden="true">
    <div class="reveal-curtain-top"></div>
    <div class="reveal-curtain-bottom"></div>
    <div class="reveal-center-stage">
      <div class="reveal-logo-wrapper">
        <img src="assets/images/logo_square.png" alt="MARRION RUSSAL REMEDIES Official Logo" class="reveal-centered-logo" />
      </div>
      <div class="reveal-motto-sub">&ldquo;Serving Life. Spreading Wellness.&rdquo;</div>
      <div class="reveal-scanline-beam"></div>
    </div>
  </div>

  <!-- Coordinated Dual Circular Branded Logo Cursor (Small, Sleek, No Square Box!) -->
  <div id="cursor-dot" aria-hidden="true">
    <img src="assets/images/logo_cursor_circle_128.png" alt="" />
  </div>
  <div id="cursor-ring" aria-hidden="true"></div>

  <!-- Ambient Vibrant Multi-Colored Animated Background Orbs -->
  <div class="bg-ambient-orb orb-wine" aria-hidden="true"></div>
  <div class="bg-ambient-orb orb-azure" aria-hidden="true"></div>
  <div class="bg-ambient-orb orb-gold" aria-hidden="true"></div>
  <div class="bg-ambient-orb orb-navy" aria-hidden="true"></div>
  <div class="bg-ambient-orb orb-teal" aria-hidden="true"></div>

  <a href="#main-content" class="sr-only" style="position: absolute; left: -9999px; top: 1rem; padding: 0.5rem 1rem; background: var(--wine-primary); color: #fff; z-index: 9999; border-radius: 4px; text-decoration: none;" onfocus="this.style.left='1rem'">
    Skip to main content
  </a>

  <!-- Header & Navigation -->
  <header class="site-header" id="main-header" role="banner">
    <div class="header-inner">
      <!-- Unclipped, Full-Width Brand Link -->
      <a href="#home" class="brand-link" aria-label="MARRION RUSSAL REMEDIES Homepage">
        <div class="brand-logo-frame">
          <img src="assets/images/logo_square.png" alt="MARRION RUSSAL REMEDIES Official Brand Mark" class="brand-logo-img" />
        </div>
        <div class="brand-title-wrap">
          <span class="brand-name">MARRION RUSSAL REMEDIES</span>
          <span class="brand-motto-sub">Serving Life. Spreading Wellness.</span>
        </div>
      </a>

      <div class="header-right-actions">
        <!-- 3-Way Theme Switcher (Bright, Dark, Eye Care) -->
        <div class="theme-switcher-group" role="radiogroup" aria-label="Visual Theme">
          <button class="theme-toggle-btn active" data-theme-set="bright" title="Bright Mode" aria-label="Bright Mode">
            <span class="theme-icon">☀️</span><span class="theme-btn-label"> Bright</span>
          </button>
          <button class="theme-toggle-btn" data-theme-set="dark" title="Dark Mode" aria-label="Dark Mode">
            <span class="theme-icon">🌙</span><span class="theme-btn-label"> Dark</span>
          </button>
          <button class="theme-toggle-btn" data-theme-set="eye-care" title="Eye Protection Mode" aria-label="Eye Protection Mode">
            <span class="theme-icon">🛡️</span><span class="theme-btn-label"> Eye Care</span>
          </button>
        </div>

        <nav class="nav-desktop" aria-label="Main Navigation">
          <a href="#home" class="nav-link active">Home</a>
          <a href="#about" class="nav-link">About</a>
          <a href="#divisions" class="nav-link">Divisions</a>
          <a href="#products" class="nav-link">Products</a>
          <a href="#reach" class="nav-link">Our Reach</a>
          <a href="#basket" id="nav-basket-link" class="nav-link nav-basket-link" aria-label="Shopping Desk Basket">
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="vertical-align: -2px; margin-right: 3px;">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Shopping Desk <span class="nav-basket-badge" id="nav-basket-badge">0</span>
          </a>
          <a href="#contact" class="nav-cta-btn">Contact</a>
        </nav>

        <button class="mobile-nav-toggle" id="mobile-toggle-btn" type="button" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="mobile-drawer">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Drawer Overlay (Direct child of body to guarantee clean stacking context) -->
  <div class="mobile-drawer" id="mobile-drawer" aria-hidden="true">
    <div class="mobile-drawer-panel">
      <div class="mobile-drawer-header">
        <div class="brand-link" style="gap: 0.65rem;">
          <div class="brand-logo-frame" style="height: 2.5rem; width: 2.5rem;">
            <img src="assets/images/logo_square.png" alt="MARRION RUSSAL REMEDIES Official Brand Mark" class="brand-logo-img" />
          </div>
          <div class="brand-title-wrap">
            <span class="brand-name" style="font-size: 0.94rem;">MARRION RUSSAL REMEDIES</span>
            <span class="brand-motto-sub" style="font-size: 0.62rem;">Serving Life. Spreading Wellness.</span>
          </div>
        </div>
        <button class="modal-close-btn" id="mobile-close-btn" type="button" aria-label="Close mobile navigation menu">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation Links (Clean 7 core sections: HOME, ABOUT, DIVISIONS, PRODUCTS, OUR REACH, SHOPPING DESK, CONTACT) -->
      <ul class="mobile-nav-list" style="margin: 0.75rem 0 1rem 0;">
        <li class="mobile-nav-item"><a href="#home" class="mobile-link"><span>🏠</span> HOME</a></li>
        <li class="mobile-nav-item"><a href="#about" class="mobile-link"><span>🏢</span> ABOUT</a></li>
        <li class="mobile-nav-item"><a href="#divisions" class="mobile-link"><span>🧪</span> DIVISIONS</a></li>
        <li class="mobile-nav-item"><a href="#products" class="mobile-link"><span>💊</span> PRODUCTS</a></li>
        <li class="mobile-nav-item"><a href="#reach" class="mobile-link"><span>🗺️</span> OUR REACH</a></li>
        <li class="mobile-nav-item"><a href="#basket" class="mobile-link" id="mobile-basket-link"><span>🛒</span> SHOPPING DESK (<span id="mobile-basket-badge">0</span>)</a></li>
        <li class="mobile-nav-item"><a href="#contact" class="mobile-link"><span>📞</span> CONTACT</a></li>
      </ul>

      <!-- Mobile Quick Contact Strip -->
      <div style="margin: 0.5rem 0 0.5rem 0; padding: 0.65rem 0.85rem; background: rgba(123, 24, 43, 0.06); border: 1px dashed rgba(123, 24, 43, 0.3); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: space-between;">
        <div>
          <span style="font-size: 0.65rem; font-weight: 700; color: var(--wine-primary); display: block; letter-spacing: 0.05em;">PURCHASE ENQUIRY</span>
          <a href="mailto:marrionrussal@gmail.com" style="font-size: 0.78rem; color: var(--navy-primary); text-decoration: underline; font-weight: 600;">marrionrussal@gmail.com</a>
        </div>
        <div style="display: flex; gap: 0.35rem;">
          <a href="mailto:marrionrussal@gmail.com" class="nav-cta-btn" style="padding: 0.28rem 0.55rem; font-size: 0.68rem;">EMAIL</a>
          <a href="https://wa.me/919149412102" target="_blank" rel="noopener noreferrer" class="nav-cta-btn" style="padding: 0.28rem 0.55rem; font-size: 0.68rem; background: #0f6f4c;">WHATSAPP</a>
        </div>
      </div>

      <!-- Mobile Visual Theme Mode Switcher -->
      <div style="margin: 0.5rem 0;">
        <span class="mono-tag" style="display: block; margin-bottom: 0.35rem; font-size: 0.62rem;">Visual Theme Mode</span>
        <div class="theme-switcher-group" style="width: 100%; justify-content: space-between; padding: 0.2rem;">
          <button class="theme-toggle-btn active" data-theme-set="bright" style="flex: 1; justify-content: center; padding: 0.38rem 0.2rem;">
            <span>☀️</span> Bright
          </button>
          <button class="theme-toggle-btn" data-theme-set="dark" style="flex: 1; justify-content: center; padding: 0.38rem 0.2rem;">
            <span>🌙</span> Dark
          </button>
          <button class="theme-toggle-btn" data-theme-set="eye-care" style="flex: 1; justify-content: center; padding: 0.38rem 0.2rem;">
            <span>🛡️</span> Eye Care
          </button>
        </div>
      </div>

      <div class="mobile-drawer-footer" style="margin-top: 0.75rem; border-top: 1px solid var(--border-light); padding-top: 0.75rem;">
        <span class="mono-tag">Established 2017 &bull; Aurangabad, UP</span>
        <p style="font-size: 0.74rem; color: var(--text-muted); margin-top: 0.35rem; line-height: 1.4;">
          MARRION RUSSAL REMEDIES, SIANA ROAD, AURANGABAD. DIST: BULLANDSHAHAR-UP.431001
        </p>
      </div>
    </div>
  </div>

  <main id="main-content">
    <!-- Hero Section -->
    <section class="hero-section" id="home" aria-label="Hero Section">
      <canvas id="hero-canvas"></canvas>
      <div class="hero-backdrop-layer"></div>

      <div class="site-container hero-grid">
        <div class="hero-content">
          <div class="hero-meta-strip">
            <span class="hero-badge-year">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ESTABLISHED 2017
            </span>
            <span class="section-label">Pharmaceutical Formulations</span>
          </div>

          <h1 class="heading-display hero-title">
            Marrion Russal
            <span class="highlight-line">Remedies</span>
          </h1>

          <div class="hero-motto-quote">
            “Serving Life. Spreading Wellness.”
          </div>

          <p class="hero-lead-text">
            Dedicated to pharmaceutical precision and healthcare wellness since 2017. 
            Delivering quality formulations across General, Dental, and Dermatology disciplines 
            with unwavering scientific responsibility.
          </p>

          <div class="hero-cta-group">
            <a href="#products" class="btn-primary">
              <span>View Product Catalogue</span>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#about" class="btn-outline">
              <span>Corporate Profile</span>
            </a>
          </div>
        </div>

        <!-- CROPPED SQUARE LOGO SEAL (Actual Image In Square) -->
        <div class="hero-visual-card">
          <div style="display: flex; flex-direction: column; align-items: center;">
            <div class="hero-seal-square float-subtle">
              <img src="assets/images/logo_square.png" alt="MARRION RUSSAL REMEDIES Official Logo" class="hero-logo-square-img" />
            </div>

            <div class="hero-seal-stats-bar">
              <div class="hero-seal-stat">
                <span class="hero-seal-stat-label">Inception</span>
                <span class="hero-seal-stat-val">2017</span>
              </div>
              <div class="hero-seal-stat">
                <span class="hero-seal-stat-label">Divisions</span>
                <span class="hero-seal-stat-val">04 Units</span>
              </div>
              <div class="hero-seal-stat">
                <span class="hero-seal-stat-label">Portfolio</span>
                <span class="hero-seal-stat-val" id="hero-stat-formulations">{len(products)} Formulations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ECG Divider Strip -->
    <div class="ecg-strip" aria-hidden="true">
      <svg class="ecg-svg ecg-animated" viewBox="0 0 1200 40" preserveAspectRatio="none">
        <path d="M0,20 L150,20 L165,8 L175,32 L185,5 L195,35 L205,20 L400,20 L415,8 L425,32 L435,5 L445,35 L455,20 L700,20 L715,8 L725,32 L735,5 L745,35 L755,20 L980,20 L995,8 L1005,32 L1015,5 L1025,35 L1035,20 L1200,20" />
      </svg>
    </div>

    <!-- Company Introduction Section -->
    <section class="page-section" id="about" aria-label="Company Introduction">
      <div class="site-container">
        <div class="intro-editorial-grid">
          <div class="intro-content-col">
            <span class="section-label">Established Corporate Identity</span>
            
            <h2 class="heading-xl" style="margin-bottom: var(--space-xs);">
              Marrion Russal Remedies Pvt. Ltd.
            </h2>
            
            <div class="intro-statement">
              Serving Life. <span>Spreading Wellness.</span>
            </div>

            <p class="subheading-lead">
              Founded in 2017, Marrion Russal Remedies Pvt. Ltd. is an Indian pharmaceutical company 
              committed to delivering therapeutic excellence and accessible clinical solutions. 
              Our work is driven by scientific integrity, clinical consistency, and human wellness.
            </p>

            <div class="intro-card-fact-list">
              <div class="fact-item">
                <div class="fact-label">Official Entity</div>
                <div class="fact-value" style="font-size: 1.1rem; line-height: 1.3;">
                  Marrion Russal Remedies Pvt. Ltd.
                </div>
              </div>

              <div class="fact-item wine">
                <div class="fact-label">Year of Establishment</div>
                <div class="fact-value">
                  2017
                </div>
              </div>

              <div class="fact-item">
                <div class="fact-label">Registered Office</div>
                <div class="fact-value" style="font-size: 0.95rem; font-family: var(--font-sans); font-weight: 600; line-height: 1.4;">
                  Aurangabad, Bulandshahr, UP
                </div>
              </div>
            </div>

            <div class="intro-notice-banner">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <strong>Official Statement:</strong>
                <span>Company information will be updated here.</span>
              </div>
            </div>
          </div>

          <div class="intro-visual-col">
            <div class="intro-image-wrapper">
              <img src="assets/images/pharma_lab_architecture.jpg" alt="Pharmaceutical Research & Analytical Laboratory Architecture" />
              
              <div class="intro-image-badge">
                <div class="intro-image-badge-title">Scientific Precision</div>
                <div class="intro-image-badge-desc">
                  Rigorous manufacturing standards, quality control paradigms, and therapeutic compliance.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Operational Divisions Section -->
    <section class="page-section" id="divisions" style="background: var(--bg-secondary);" aria-label="Company Divisions">
      <div class="site-container">
        <div class="section-header-block">
          <span class="section-label">Therapeutic Portfolio</span>
          <h2 class="heading-xl section-title">Strategic Operational Divisions</h2>
          <p class="section-desc">
            Organized across four specialized divisions to address diverse healthcare needs with clinical precision and therapeutic consistency.
          </p>
        </div>

        <div class="divisions-container">
          <div class="divisions-nav-pane" role="tablist" aria-label="Company Divisions">
            <button class="division-nav-btn active" role="tab" aria-selected="true" id="tab-general-1" data-division-id="general-1">
              <div class="division-nav-meta">
                <span class="division-nav-code">GD-01</span>
                <span class="division-nav-number">01</span>
              </div>
              <div class="division-nav-title">GENERAL DIVISION 1</div>
              <span class="division-nav-toggle-icon" aria-hidden="true">−</span>
            </button>
            <button class="division-nav-btn" role="tab" aria-selected="false" id="tab-general-2" data-division-id="general-2">
              <div class="division-nav-meta">
                <span class="division-nav-code">GD-02</span>
                <span class="division-nav-number">02</span>
              </div>
              <div class="division-nav-title">GENERAL DIVISION 2ND</div>
              <span class="division-nav-toggle-icon" aria-hidden="true">+</span>
            </button>
            <button class="division-nav-btn" role="tab" aria-selected="false" id="tab-dental" data-division-id="dental">
              <div class="division-nav-meta">
                <span class="division-nav-code">DT-03</span>
                <span class="division-nav-number">03</span>
              </div>
              <div class="division-nav-title">DENTAL DIVISION</div>
              <span class="division-nav-toggle-icon" aria-hidden="true">+</span>
            </button>
            <button class="division-nav-btn" role="tab" aria-selected="false" id="tab-dermatology" data-division-id="dermatology">
              <div class="division-nav-meta">
                <span class="division-nav-code">DM-04</span>
                <span class="division-nav-number">04</span>
              </div>
              <div class="division-nav-title">DERMATOLOGY DIVISION</div>
              <span class="division-nav-toggle-icon" aria-hidden="true">+</span>
            </button>
          </div>

          <div class="divisions-content-pane" id="division-content-display">
            <div class="division-detail-wrapper">
              <div class="division-detail-header">
                <span class="division-badge-code">GD-01 // CLASSIFICATION</span>
                <h3 class="division-detail-title">GENERAL DIVISION 1</h3>
                <p class="division-detail-summary">
                  Dedicated to comprehensive clinical care across primary gastroenterology, pediatric medicine, general healthcare, and ear, nose, and throat disciplines.
                </p>
              </div>

              <div class="division-therapeutic-block">
                <span class="therapeutic-title-label">Designated Therapeutic Disciplines</span>
                <div class="therapeutic-tags-grid">
                  <div class="therapeutic-tag therapeutic-tag-gastro"><span class="therapeutic-tag-code">[GI]</span><span class="therapeutic-stacked-text"><span class="therapeutic-line">GASTRO</span><span class="therapeutic-line">ENTEROLOGY</span></span></div>
                  <div class="therapeutic-tag"><span class="therapeutic-tag-code">[PED]</span><span>PEDIATRICS</span></div>
                  <div class="therapeutic-tag"><span class="therapeutic-tag-code">[GM]</span><span>GENERAL MEDICINE</span></div>
                  <div class="therapeutic-tag"><span class="therapeutic-tag-code">[ENT]</span><span>ENT</span></div>
                </div>
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
          </div>
        </div>
      </div>
    </section>

    <!-- Product Catalogue Section -->
    <section class="page-section" id="products" aria-label="Product Catalogue">
      <div class="site-container">
        <div class="section-header-block">
          <span class="section-label">Formulation Portfolio</span>
          <h2 class="heading-xl section-title">Pharmaceutical Formulations</h2>
          <p class="section-desc">
            Explore our portfolio of 30 specialized pharmaceutical products spanning gastrointestinal, respiratory, pediatric, analgesic, oral care, and dermatological healthcare therapies.
          </p>
        </div>

        <div class="catalogue-controls-bar">
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
                aria-label="Search pharmaceutical products"
              />
            </div>

            <div class="catalogue-status-badge">
              <span>Showing:</span>
              <span class="count-num" id="catalogue-count">{len(products)}</span>
              <span>of <span id="total-formulations-count">{len(products)}</span> Formulations</span>
            </div>
          </div>

          <div class="catalogue-filter-pills" role="tablist" aria-label="Filter by Product Family">
            <button class="filter-pill active" data-family="ALL" role="tab" aria-selected="true">ALL</button>
            <button class="filter-pill" data-family="GASORIL" role="tab" aria-selected="false">GASORIL</button>
            <button class="filter-pill" data-family="NASRIL" role="tab" aria-selected="false">NASRIL</button>
            <button class="filter-pill" data-family="SUCRACELL" role="tab" aria-selected="false">SUCRACELL</button>
            <button class="filter-pill" data-family="DEVAC" role="tab" aria-selected="false">DEVAC</button>
            <button class="filter-pill" data-family="ACETOS" role="tab" aria-selected="false">ACETOS</button>
            <button class="filter-pill" data-family="CLEAR 32" role="tab" aria-selected="false">CLEAR 32</button>
            <button class="filter-pill" data-family="LC" role="tab" aria-selected="false">LC</button>
            <button class="filter-pill" data-family="SOFTEX" role="tab" aria-selected="false">SOFTEX</button>
            <button class="filter-pill" data-family="SHADEX" role="tab" aria-selected="false">SHADEX</button>
            <button class="filter-pill" data-family="KETOTOS" role="tab" aria-selected="false">KETOTOS</button>
            <button class="filter-pill" data-family="PERMETOS" role="tab" aria-selected="false">PERMETOS</button>
          </div>
        </div>

        <div class="products-catalogue-grid" id="products-grid">
{cards_html}
        </div>
      </div>
    </section>

    <!-- Our Reach Section -->
    <section class="page-section" id="reach" aria-label="Our Reach">
      <div class="site-container">
        <div class="reach-editorial-wrapper">
          <div class="section-header-block">
            <span class="section-label cyan">Field Operations</span>
            <h2 class="heading-xl section-title">OUR REACH</h2>
            <p class="section-desc">Expanding Healthcare Horizons with Dedicated Field Presence</p>
          </div>

          <div class="reach-schematic-grid">
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

            <div class="reach-data-notice-pane">
              <div class="official-notice-box">
                <div class="official-notice-title">Operational Presence</div>
                <p class="official-notice-text">
                  “Information about our operating areas and field presence will be available here.”
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

    <!-- Contact Section -->
    <section class="page-section" id="contact" aria-label="Contact Section">
      <div class="site-container">
        <div class="section-header-block">
          <span class="section-label">Direct Communication</span>
          <h2 class="heading-xl section-title">Connect with Headquarters</h2>
          <p class="section-desc">
            Reach out to Marrion Russal Remedies Pvt. Ltd. for professional inquiries, institutional partnerships, or corporate communications.
          </p>
        </div>

        <div class="contact-editorial-grid">
          <div class="contact-info-panel">
            <div>
              <h3 class="contact-company-title">Marrion Russal Remedies Pvt. Ltd.</h3>
              <div class="contact-motto-line">“Serving Life. Spreading Wellness.”</div>

              <div class="contact-block-list">
                <div class="contact-detail-block">
                  <div class="contact-icon-bubble">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div class="contact-text-wrap">
                    <span class="contact-detail-label">Headquarters & Registered Address</span>
                    <div class="contact-detail-content">
                      MARRION RUSSAL REMEDIES, SIANA ROAD, AURANGABAD. DIST: BULLANDSHAHAR-UP.431001
                    </div>
                  </div>
                </div>

                <div class="contact-detail-block">
                  <div class="contact-icon-bubble">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div class="contact-text-wrap">
                    <span class="contact-detail-label">Official Purchase & Product Correspondence</span>
                    <div class="contact-detail-content">
                      <a href="mailto:marrionrussal@gmail.com" style="color: var(--surface-white); text-decoration: underline; font-weight: 600;">
                        marrionrussal@gmail.com
                      </a>
                    </div>
                    <div class="contact-email-action-row">
                      <button class="copy-email-btn" id="copy-email-btn" data-email="marrionrussal@gmail.com">
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Copy Email Address</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="contact-detail-block">
                  <div class="contact-icon-bubble">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div class="contact-text-wrap">
                    <span class="contact-detail-label">WhatsApp Business Purchase Desk</span>
                    <div class="contact-detail-content">
                      <a href="https://wa.me/919149412102" target="_blank" rel="noopener noreferrer" style="color: var(--surface-white); text-decoration: underline; font-weight: 600;">
                        +91 9149412102
                      </a>
                    </div>
                  </div>
                </div>

                <div class="contact-detail-block">
                  <div class="contact-icon-bubble">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div class="contact-text-wrap">
                    <span class="contact-detail-label">Year of Establishment</span>
                    <div class="contact-detail-content font-mono">
                      2017 // Registered Entity
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(255, 255, 255, 0.1);">
              <span class="mono-tag" style="color: var(--gold-light);">REGIONAL POSTAL CODE: 431001</span>
              <p style="font-size: 0.78rem; color: var(--text-on-dark-muted); margin-top: 0.35rem; line-height: 1.5;">
                Aurangabad, District Bullandshahar, Uttar Pradesh.
              </p>
            </div>
          </div>

          <div class="contact-form-panel">
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
                  <option value="order-support">Shopping Desk / Purchase Inquiry</option>
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
  </main>

  <!-- Corporate Footer -->
  <footer class="site-footer" role="contentinfo">
    <div class="site-container">
      <div class="footer-top-grid">
        <div class="footer-brand-col">
          <div class="footer-logo-seal">
            <img src="assets/images/logo_square.png" alt="Marrion Russal Remedies Pvt. Ltd. Mark" class="footer-logo-img" />
          </div>
          <div class="footer-brand-name">Marrion Russal Remedies Pvt. Ltd.</div>
          <div class="footer-motto">“Serving Life. Spreading Wellness.”</div>
          <p style="font-size: 0.82rem; color: var(--text-on-dark-muted); line-height: 1.6; margin-top: 0.5rem;">
            Committed to ethical pharmaceutical operations, clinical formulation quality, and human wellness since 2017.
          </p>
        </div>

        <div>
          <div class="footer-col-title">Navigation</div>
          <ul class="footer-link-list">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Company</a></li>
            <li><a href="#divisions">Operational Divisions</a></li>
            <li><a href="#products">Product Catalogue</a></li>
          </ul>
        </div>

        <div>
          <div class="footer-col-title">Operations</div>
          <ul class="footer-link-list">
            <li><a href="#reach">Our Reach & Territories</a></li>
            <li><a href="#basket">Shopping Desk</a></li>
            <li><a href="#contact">Direct Contact</a></li>
          </ul>
        </div>

        <div>
          <div class="footer-col-title">Headquarters</div>
          <div class="footer-address-block">
            <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: #ffffff;">
              MARRION RUSSAL REMEDIES
            </p>
            <p style="margin: 0 0 0.35rem 0;">
              SIANA ROAD, AURANGABAD. DIST: BULLANDSHAHAR-UP.431001
            </p>
            <p style="margin: 0 0 0.35rem 0;">
              <a href="mailto:marrionrussal@gmail.com" style="color: #ffffff; text-decoration: underline;">
                marrionrussal@gmail.com
              </a>
            </p>
            <p style="margin: 0;">
              <a href="https://wa.me/919149412102" target="_blank" rel="noopener noreferrer" style="color: var(--gold-light); text-decoration: none; font-family: var(--font-mono); font-size: 0.82rem;">
                WhatsApp: +91 9149412102
              </a>
            </p>
          </div>
        </div>
      </div>

      <div class="footer-bottom-bar">
        <div>
          &copy; 2017 &ndash; 2026 Marrion Russal Remedies Pvt. Ltd. All Rights Reserved.
        </div>
        <div class="footer-creator-credit">
          Website crafted by <a href="https://www.linkedin.com/in/malik-mohammad-ausaib-23ab72248/" target="_blank" rel="noopener noreferrer" class="creator-credit-link">Malik Ausaib <span class="creator-credit-arrow" aria-hidden="true">&nearr;</span></a>
        </div>
        <div style="display: flex; gap: 1.5rem; align-items: center;">
          <span class="mono-tag" style="color: var(--text-light);">
            ESTABLISHED 2017
          </span>
          <span class="mono-tag" style="color: var(--text-light);">
            AUTHENTICATED CORPORATE REGISTRY
          </span>
          <a href="#admin" id="footer-admin-link" class="footer-admin-link" style="color: var(--text-light); opacity: 0.6; font-size: 0.72rem; text-decoration: none; font-family: var(--font-mono); transition: opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.6'">
            ADMIN PORTAL
          </a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Floating Shopping Desk Basket Indicator -->
  <aside id="floating-basket-wrap" class="floating-basket-wrap" aria-label="Shopping Desk Basket">
    <button id="floating-basket-btn" class="floating-basket-btn" aria-label="Open Shopping Basket, 0 products" aria-expanded="false" aria-controls="basket-drawer-panel">
      <div class="floating-basket-icon-wrap">
        <svg class="floating-basket-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span class="basket-badge-count" id="basket-badge-count">0</span>
      </div>
      <div class="floating-basket-text-wrap">
        <span class="floating-basket-title">BASKET</span>
        <span class="floating-basket-subtitle" id="floating-basket-subtitle">0 PRODUCTS</span>
      </div>
    </button>
  </aside>

  <!-- Dedicated Shopping Desk / Basket Drawer Root Container -->
  <div id="basket-drawer-root" class="basket-drawer-root" aria-hidden="true"></div>

  <!-- Dedicated Admin Portal Modal Container -->
  <div id="admin-modal-root" class="admin-modal-root" aria-hidden="true"></div>

  <!-- Modal Container for Formulation Details -->
  <div id="modal-container"></div>

  <!-- Toast Notification -->
  <div class="toast-notification" id="toast-notify" role="alert" aria-live="polite"></div>

  <!-- Progressive Enhancement Client Script -->
  <script src="assets/js/client.js"></script>
</body>
</html>
"""

with open('d:/Marrion Russal/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Generated upgraded index.html with unclipped header, rich colored background & circular cursor!")
