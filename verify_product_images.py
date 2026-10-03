import os
import urllib.request
import json
from PIL import Image

print('=' * 80)
print('MARRION RUSSAL REMEDIES - PRODUCT IMAGE VERIFICATION AUDIT')
print('=' * 80)

EXPECTED_MAPPING = {
    'gasoril-capsule': ('GASORIL CAPSULE', 'public/products/gasoril-capsule.webp'),
    'gasoril-psc-tablet': ('GASORIL PSC TABLET', 'public/products/gasoril-psc.webp'),
    'gasoril-kid-drops': ('GASORIL KID DROPS', 'public/products/gasoril-kid.webp'),
    'nasril-xp-spray-drop': ('NASRIL XP SPRAY/DROP', 'public/products/nasril-xp.webp'),
    'nasril-x-spray-drop': ('NASRIL X SPRAY/DROP', 'public/products/nasril-x.webp'),
    'nasril-f-spray': ('NASRIL F SPRAY', 'public/products/nasril-f.webp'),
    'sucracell-o-suspension': ('SUCRACELL O SUSPENSION', 'public/products/sucracell-o.webp'),
    'devac-syrup': ('DEVAC SYRUP', 'public/products/devac-syrup.webp'),
    'softex-moisturiser': ('SOFTEX MOISTURISER', 'public/products/softex-moisturiser.webp'),
    'shadex-sunscreen': ('SHADEX SUNSCREEN', 'public/products/shadex-sunscreen.webp'),
    'nasril-s': ('NASRIL-S', 'assets/images/nasril-s.jpg'),
}

# 1. Check local files
for pid, (pname, img_path) in EXPECTED_MAPPING.items():
    assert os.path.exists(img_path), f'Local file missing: {img_path}'
    with Image.open(img_path) as im:
        w, h = im.size
        assert w > 0 and h > 0, f'Invalid image dimensions for {img_path}'
        print(f'[PASS] Local asset: {img_path:38s} | {im.format:4s} | {w}x{h} px')

# 2. Check HTTP status from server
base_url = 'http://127.0.0.1:3000/'
for pid, (pname, img_path) in EXPECTED_MAPPING.items():
    url = base_url + img_path
    req = urllib.request.urlopen(url)
    assert req.status == 200, f'HTTP status error for {url}: {req.status}'
    data = req.read()
    assert len(data) > 1000, f'Data too small for {url}: {len(data)}'
    print(f'[PASS] Live HTTP 200: {url:46s} | {len(data)} bytes')

# 3. Check index.html markup
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

for pid, (pname, img_path) in EXPECTED_MAPPING.items():
    assert img_path in html, f'Image {img_path} not found in index.html'
    assert f'data-product-id="{pid}"' in html or (pid == 'nasril-s' and 'data-alias-id="nasril-s"' in html), f'Product {pid} not found in index.html'

print('[PASS] index.html correctly renders all 11 product thumbnails in product cards.')

# 4. Check API response
api_res = urllib.request.urlopen(base_url + 'api/products')
assert api_res.status == 200, 'API endpoint failed'
api_data = json.loads(api_res.read().decode('utf-8'))
api_products = {p['id']: p for p in api_data.get('products', [])}

for pid, (pname, img_path) in EXPECTED_MAPPING.items():
    target_id = 'nasril-s-spray-drop' if pid == 'nasril-s' else pid
    prod = api_products.get(target_id)
    assert prod is not None, f'Product {target_id} not found in API'
    assert prod['image'] == img_path, f'API image mismatch for {target_id}: expected {img_path}, got {prod["image"]}'
    print(f'[PASS] API authoritative product: {prod["name"]:26s} -> {prod["image"]}')

print('=' * 80)
print('>>> ALL 11 PHARMACEUTICAL PRODUCT IMAGES VERIFIED WITH 100% COMPLIANCE! <<<')
print('=' * 80)
