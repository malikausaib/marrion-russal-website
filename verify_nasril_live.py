import urllib.request
import re

url = 'http://127.0.0.1:3000/'
with urllib.request.urlopen(url) as res:
    html = res.read().decode('utf-8')

# 1. Image serving
img_url = 'http://127.0.0.1:3000/assets/images/nasril-s.jpg'
with urllib.request.urlopen(img_url) as res:
    assert res.status == 200
    img_data = res.read()
    assert len(img_data) == 129568
    print(f'1. Image served successfully: {len(img_data)} bytes')

# 2. Card in live HTML
card_match = re.search(r'<article class="product-card"[^>]*data-alias-id="nasril-s"[^>]*>(.*?)</article>', html, re.DOTALL)
assert card_match, 'Card with data-alias-id="nasril-s" not found in live HTML'
card_body = card_match.group(1)

assert 'assets/images/nasril-s.jpg' in card_body, 'Image path missing in card'
assert 'product-card-thumb' in card_body, 'product-card-thumb missing in card'
assert 'NASRIL-S' in card_body, 'NASRIL-S missing in card'
assert 'Nasal Spray' in card_body, 'Nasal Spray formulation tag missing in card'
assert 'View Product' in card_body, 'View Product button missing in card'
print('2. NASRIL-S Card in live HTML matches all specifications')

# 3. Check image dimensions and aspect ratio handling
assert 'object-fit: contain' in open('assets/css/components.css', 'r', encoding='utf-8').read()
assert 'product-card-image-wrap' in open('assets/css/responsive.css', 'r', encoding='utf-8').read()
print('3. Object-fit and responsive mobile rules verified')

print('All live server audits passed cleanly!')
