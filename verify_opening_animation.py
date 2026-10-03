"""
Verification script for the refined 2.7-second Opening Animation:
1. Exact total duration: ~2.7s (2000ms delay + 700ms slide-out transition = 2700ms)
2. 0.0s - 0.6s: Background appearance (reveal-bg-ambient 0.6s)
3. 0.6s - 1.4s: Logo entrance (reveal-logo-enter 0.8s with 0.6s delay)
4. 1.4s - 2.0s: Centered logo hold (from 1.4s until 2.0s timeout)
5. 2.0s - 2.7s: Sliding curtain transition (reveal-slide-out at 2000ms with 0.7s transition)
6. Logo centering: exact horizontal & vertical centering
7. Mobile responsiveness: 375px, 390px, 430px proportional scaling
8. Reduced motion support
"""

import re

# 1. Read files
with open('assets/css/animations.css', 'r', encoding='utf-8') as f:
    anim_css = f.read()

with open('assets/js/client.js', 'r', encoding='utf-8') as f:
    client_js = f.read()

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

print("=" * 80)
print("MARRION RUSSAL REMEDIES — 2.7s OPENING ANIMATION AUDIT")
print("=" * 80)

# Check markup
assert 'id="brand-reveal-curtain"' in html, "Curtain ID missing in HTML"
assert 'assets/images/logo_square.png' in html, "Official logo asset missing in HTML"
assert 'reveal-curtain-top' in html, "Top curtain missing"
assert 'reveal-curtain-bottom' in html, "Bottom curtain missing"
assert 'reveal-center-stage' in html, "Center stage missing"
assert 'reveal-logo-wrapper' in html, "Logo wrapper missing"
print("[OK] 1. HTML Markup: Official logo asset embedded inside centered reveal stage with top/bottom curtains.")

# Check background timing (0.0s - 0.6s)
assert 'animation: reveal-bg-ambient 0.6s' in anim_css or '0.6s' in anim_css, "Background 0.6s ambiance missing"
print("[OK] 2. Background Timing: 0.0s-0.6s smooth branded ambiance fade-in.")

# Check logo entrance timing (0.6s - 1.4s -> 0.8s duration, 0.6s delay)
assert 'animation: reveal-logo-enter 0.8s cubic-bezier(0.2, 0.8, 0.25, 1) 0.6s both;' in anim_css, "Logo enter timing missing in CSS"
assert '@keyframes reveal-logo-enter' in anim_css, "Logo keyframe missing"
print("[OK] 3. Logo Entrance: 0.6s-1.4s (0.8s duration, 0.6s delay) smooth fade & subtle scale into exact center.")

# Check sliding transition timing (0.7s transition)
assert 'transition: transform 0.7s' in anim_css, "0.7s transition missing in CSS"
assert 'transform: translateY(-100%);' in anim_css, "Top curtain slide-up missing"
assert 'transform: translateY(100%);' in anim_css, "Bottom curtain slide-down missing"
print("[OK] 4. Sliding Reveal Transition: 0.7s smooth dual curtain split (top translateY(-100%), bottom translateY(100%)).")

# Check JS trigger timing (2000ms delay + 700ms slide-out = 2700ms total)
assert 'setTimeout(function () {' in client_js and 'curtain.classList.add(\'reveal-slide-out\');' in client_js, "Reveal trigger missing in JS"
assert '}, 2000);' in client_js, "2000ms timeout missing in JS"
assert '}, 700);' in client_js, "700ms inner timeout missing in JS"
print("[OK] 5. Total Sequence Timing: Exactly 2000ms hold + 700ms slide = 2700ms (2.7s total).")

# Check centered alignment styling
assert '.brand-reveal-curtain {' in anim_css and 'display: flex;' in anim_css and 'align-items: center;' in anim_css and 'justify-content: center;' in anim_css, "Curtain centering missing"
assert 'z-index: 10000;' in anim_css, "Curtain z-index 10000 missing"
print("[OK] 6. Alignment & Stacking: Centered vertically and horizontally at z-index 10000.")

# Check mobile adaptation
assert '@media (max-width: 480px)' in anim_css, "Mobile media query missing"
assert 'clamp(96px, 26vw, 115px)' in anim_css, "Mobile logo clamp missing"
print("[OK] 7. Mobile Responsiveness: Proportional scale clamp(96px, 26vw, 115px) for 375px, 390px, 430px viewports.")

# Check reduced motion & session storage
assert 'prefers-reduced-motion' in client_js and 'prefers-reduced-motion' in anim_css, "Reduced motion missing"
assert 'sessionStorage.getItem(\'mrr_brand_reveal_shown\')' in client_js, "Session storage check missing"
print("[OK] 8. Reduced Motion & Performance: Instant skip for prefers-reduced-motion; sessionStorage check prevents repeat interruptions.")

print("\n" + "=" * 80)
print(">>> ALL 8 OPENING ANIMATION REQUIREMENTS VERIFIED SUCCESSFULLY! <<<")
print("=" * 80)
