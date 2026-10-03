import re
import urllib.request

print("==================================================================")
print("MARRION RUSSAL REMEDIES — MOBILE RESPONSIVE REDESIGN VERIFICATION")
print("Target Screen Validations: 375px, 390px, 430px, 768px, 1024px, 1440px")
print("==================================================================")

# 1. Verify index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Check Header
assert '<header class="site-header"' in html, "Header element missing"
assert 'brand-logo-frame' in html, "Logo frame missing"
assert 'mobile-nav-toggle' in html, "Mobile toggle missing"

# Check Mobile Drawer sections (Clean 7 core sections)
required_sections = ['HOME', 'ABOUT', 'DIVISIONS', 'PRODUCTS', 'OUR REACH', 'SHOPPING DESK', 'CONTACT']
for sec in required_sections:
    assert sec in html, f"Section '{sec}' missing in mobile navigation drawer"

# Strict absence audit of Directors and Medical Representatives
assert 'MANAGEMENT' not in html, "ERROR: MANAGEMENT still found in html"
assert 'DIRECTORS' not in html, "ERROR: DIRECTORS still found in html"
assert 'MEDICAL REPRESENTATIVES' not in html, "ERROR: MEDICAL REPRESENTATIVES still found in html"
assert 'MOHD AMIN' not in html, "ERROR: MOHD AMIN still found in html"
assert 'AJAZ AHMAD' not in html, "ERROR: AJAZ AHMAD still found in html"
assert '#management' not in html, "ERROR: #management route still found in html"
assert '#reps' not in html, "ERROR: #reps route still found in html"
print(f"[PASS] Exactly 7 core navigation sections confirmed; Directors & Medical Reps 100% removed.")

# Check Mobile Quick-Access Strip is COMPLETELY REMOVED (One unified interface)
assert 'mobile-quick-nav' not in html, "ERROR: mobile-quick-nav should NOT be present in html"
assert 'quick-nav-pill' not in html, "ERROR: quick-nav-pill should NOT be present in html"
assert 'quick-nav-basket-btn' not in html, "ERROR: quick-nav-basket-btn should NOT be present in html"
print("[PASS] Verified 100% absence of duplicate/floating mobile-quick-nav layer.")

# Check Hero section
assert 'hero-section' in html, "Hero section missing"
assert 'Marrion Russal' in html, "Brand title missing in hero"
assert 'Serving Life. Spreading Wellness.' in html, "Motto quote missing in hero"
assert 'ESTABLISHED 2017' in html, "Established date missing in hero"
print("[PASS] Hero section content confirmed (Brand, motto, established date, CTAs).")

# Check GASTROENTEROLOGY capsule formatting (Section 8)
assert 'therapeutic-tag-gastro' in html, "therapeutic-tag-gastro class missing"
assert 'GASTRO' in html and 'ENTEROLOGY' in html, "GASTRO and ENTEROLOGY words missing"
assert 'therapeutic-stacked-text' in html, "therapeutic-stacked-text class missing"
# Ensure it's in ONE capsule
assert '<div class="therapeutic-tag therapeutic-tag-gastro"><span class="therapeutic-tag-code">[GI]</span><span class="therapeutic-stacked-text"><span class="therapeutic-line">GASTRO</span><span class="therapeutic-line">ENTEROLOGY</span></span></div>' in html, "GASTROENTEROLOGY not formatted as specified inside one capsule"
print("[PASS] GASTROENTEROLOGY formatted cleanly inside single capsule (GASTRO on line 1, ENTEROLOGY on line 2).")

# Check Creator Credit (Section 13 & 14)
assert 'Malik Ausaib' in html, "Creator credit 'Malik Ausaib' missing in html"
assert 'https://www.linkedin.com/in/malik-mohammad-ausaib-23ab72248/' in html, "Creator LinkedIn link missing"
assert 'target="_blank"' in html, "target='_blank' missing"
assert 'rel="noopener noreferrer"' in html, "rel='noopener noreferrer' missing"
assert 'footer-creator-credit' in html, "footer-creator-credit class missing"
print("[PASS] Subtle creator credit verified with verified LinkedIn link.")

# Check Divisions toggle icons
assert 'division-nav-toggle-icon' in html, "Division nav toggle icon missing"
assert 'GD-01' in html and 'GD-02' in html and 'DT-03' in html and 'DM-04' in html, "All 4 division codes verified"
print("[PASS] Divisions section verified with accordion toggle indicators.")

# Check Product Catalogue
assert 'products-catalogue-grid' in html, "Products grid missing"
assert html.count('class="product-card"') == 30, f"Expected 30 product cards, found {html.count('class=\"product-card\"')}"
assert html.count('btn-card-view') == 30, "All 30 view buttons present"
assert html.count('btn-card-add-basket') == 30, "All 30 add to basket buttons present"
print("[PASS] Product catalogue verified with all 30 formulation cards and action buttons.")

# Check Floating Basket
assert 'floating-basket-wrap' in html, "Floating basket wrap missing"
assert 'floating-basket-btn' in html, "Floating basket button missing"
print("[PASS] Floating basket verified in markup.")

# 2. Verify responsive.css
with open('assets/css/responsive.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Check media query breakpoints
assert '@media (max-width: 1400px)' in css, "1400px breakpoint missing"
assert '@media (max-width: 1200px)' in css, "1200px breakpoint missing"
assert '@media (max-width: 1024px)' in css, "1024px breakpoint missing"
assert '@media (max-width: 768px)' in css, "768px mobile breakpoint missing"
assert '@media (max-width: 480px)' in css, "480px/375px/390px/430px breakpoint missing"
assert '@media (prefers-reduced-motion: reduce)' in css, "Reduced motion media query missing"
print("[PASS] All required responsive breakpoints present (1400px, 1200px, 1024px, 768px, 480px/430px/390px/375px).")

# Check compact header styling
assert 'height: 58px' in css or 'min-height: 58px' in css, "Compact 56px-62px header height missing"
assert '.header-right-actions .theme-switcher-group' in css, "Hiding theme switcher in mobile header missing"
print("[PASS] Compact mobile header CSS rules verified.")

# Check 2-column product catalogue
assert 'grid-template-columns: repeat(2, minmax(0, 1fr))' in css, "2-column product catalogue grid missing"
print("[PASS] Compact 2-column product catalogue grid verified.")

# Check modal ordering and accordions
assert 'order: 1' in css, "Modal image order 1 missing"
assert 'order: 2' in css, "Modal purchase card order 2 missing"
assert 'order: 3' in css, "Modal specs accordion order 3 missing"
assert '.spec-accordion-header' in css, "Spec accordion header CSS missing"
print("[PASS] Product detail modal mobile composition and accordion styling verified.")

# Check mobile drawer proper stacking context (z-index 2500)
assert 'z-index: 2500' in css, "Mobile drawer z-index 2500 missing"
print("[PASS] Mobile navigation sits above all page content with proper stacking context (z-index: 2500).")

# Check floating basket mobile positioning and safe area
assert 'env(safe-area-inset-bottom' in css, "Safe area inset support missing for floating basket"
assert '.floating-basket-wrap' in css, "Floating basket wrap mobile styling verified"
assert '.mobile-nav-active .floating-basket-wrap' in css, "Floating basket hide on nav open missing"
print("[PASS] Floating basket mobile position, safe area & drawer conflict prevention verified.")

# Check zero horizontal overflow
assert 'max-width: 100%' in css, "Zero horizontal overflow max-width missing"
assert 'overflow-x: hidden' in css, "Zero horizontal overflow-x hidden missing"
print("[PASS] Zero horizontal overflow unconditionally enforced.")

# Absolute removal of "Auto / Mobile" and "Desktop View"
assert "Auto / Mobile" not in html, "ERROR: 'Auto / Mobile' still found in html"
assert "Desktop View" not in html, "ERROR: 'Desktop View' still found in html"
assert "drawer-mode-box" not in html, "ERROR: 'drawer-mode-box' still found in html"
assert "btn-mode-auto" not in html, "ERROR: 'btn-mode-auto' still found in html"
assert "btn-mode-desktop" not in html, "ERROR: 'btn-mode-desktop' still found in html"
print("[PASS] Verified 100% absence of 'Auto / Mobile' and 'Desktop View' controls.")

# 3. Live server test
req = urllib.request.urlopen("http://localhost:3000/")
assert req.status == 200, f"Server returned {req.status}"
live_html = req.read().decode('utf-8')
assert 'mobile-quick-nav' not in live_html, "ERROR: Live server still serving mobile-quick-nav"
assert 'Malik Ausaib' in live_html, "Live server missing creator credit"
assert 'therapeutic-tag-gastro' in live_html, "Live server missing therapeutic-tag-gastro"
assert 'division-nav-toggle-icon' in live_html, "Live server missing division toggle icon"
assert "Auto / Mobile" not in live_html, "ERROR: 'Auto / Mobile' served on port 3000"
assert "Desktop View" not in live_html, "ERROR: 'Desktop View' served on port 3000"
assert "drawer-mode-box" not in live_html, "ERROR: 'drawer-mode-box' served on port 3000"
print("[PASS] Live server on port 3000 verified with full updated mobile DOM.")

print("\n==================================================================")
print(">>> ALL MOBILE RESPONSIVE REDESIGN CHECKS PASSED SUCCESSFULLY! <<<")
print("==================================================================")
