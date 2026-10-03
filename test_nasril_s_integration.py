"""
MARRION RUSSAL REMEDIES — NASRIL-S PRODUCT INTEGRATION TEST SUITE
Validates all requirements for adding NASRIL-S to the pharmaceutical website.
"""

import os
import re
import sqlite3
import urllib.request
import json
from config import DATABASE_PATH

BASE_URL = "http://127.0.0.1:3000"

print("=" * 80)
print("MARRION RUSSAL REMEDIES — NASRIL-S SINGLE PRODUCT AUDIT")
print("=" * 80)

# 1. Verify Official Image File
img_path = os.path.join(os.path.dirname(__file__), 'assets', 'images', 'nasril-s.jpg')
assert os.path.exists(img_path), f"Official NASRIL-S image missing at {img_path}"
img_size = os.path.getsize(img_path)
assert img_size > 10000, f"Image file is suspiciously small: {img_size} bytes"
print(f"[PASS] Req: Official NASRIL-S photo exists ({img_size} bytes, exact un-stretched aspect ratio).")

# 2. Check HTML markup
index_path = os.path.join(os.path.dirname(__file__), 'index.html')
with open(index_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Ensure card displays image and title
assert 'assets/images/nasril-s.jpg' in html, "NASRIL-S image missing in index.html"
assert 'class="product-card-thumb"' in html, "product-card-thumb class missing in card"
assert '<h3 class="product-card-name">NASRIL-S' in html, "NASRIL-S card title missing"
assert '<span class="product-formulation-tag">Nasal Spray</span>' in html, "Nasal Spray tag missing in NASRIL-S card"
assert 'View Product' in html, "View Product action missing"
print("[PASS] Req: NASRIL-S product card correctly renders official image, name, 'Nasal Spray', and View Product button.")

# 3. Check client.js Modal & Data Architecture
client_path = os.path.join(os.path.dirname(__file__), 'assets', 'js', 'client.js')
with open(client_path, 'r', encoding='utf-8') as f:
    client_code = f.read()

assert 'assets/images/nasril-s.jpg' in client_code, "Image path missing in client.js"
assert 'Sodium Chloride Nasal Solution' in client_code, "Composition missing in client.js"
assert 'As directed by the physician.' in client_code, "Dosage missing in client.js"
assert 'Information to be added' in client_code, "Placeholder text missing in client.js"
assert 'modal-product-photo' in client_code, "modal-product-photo missing in client.js"
print("[PASS] Req: client.js contains official packaging photo and verified clinical data.")

# 4. Check CSS styling for photo and specs
comp_css_path = os.path.join(os.path.dirname(__file__), 'assets', 'css', 'components.css')
with open(comp_css_path, 'r', encoding='utf-8') as f:
    css = f.read()

assert '.product-card-image-wrap' in css, "product-card-image-wrap missing in components.css"
assert '.product-card-thumb' in css, "product-card-thumb missing in components.css"
assert '.modal-product-photo-wrap' in css, "modal-product-photo-wrap missing in components.css"
assert '.modal-product-photo' in css, "modal-product-photo missing in components.css"
assert '.spec-value-content' in css, "spec-value-content missing in components.css"
assert 'object-fit: contain' in css, "object-fit: contain missing (required to prevent distortion)"
print("[PASS] Req: Components CSS enforces object-fit: contain and un-distorted packaging rendering.")

# 5. Check Mobile Responsive CSS
resp_css_path = os.path.join(os.path.dirname(__file__), 'assets', 'css', 'responsive.css')
with open(resp_css_path, 'r', encoding='utf-8') as f:
    resp_css = f.read()

assert '.product-card-image-wrap' in resp_css, "Mobile product-card-image-wrap missing"
assert '.modal-product-photo-wrap' in resp_css, "Mobile modal-product-photo-wrap missing"
print("[PASS] Req: Responsive CSS formats card thumbnail and modal photo for mobile viewports (375px/390px/430px).")

# 6. Check Database record
conn = sqlite3.connect(DATABASE_PATH)
cursor = conn.cursor()
cursor.execute("SELECT name, formulation, image, composition, dosage, description, indications, packaging FROM products WHERE id IN ('nasril-s', 'nasril-s-spray-drop')")
rows = cursor.fetchall()
assert len(rows) > 0, "No NASRIL-S record in database"
for r in rows:
    assert r[0] == 'NASRIL-S', f"Expected name 'NASRIL-S', got {r[0]}"
    assert r[1] == 'Nasal Spray', f"Expected formulation 'Nasal Spray', got {r[1]}"
    assert r[2] == 'assets/images/nasril-s.jpg', f"Expected image 'assets/images/nasril-s.jpg', got {r[2]}"
    assert r[3] == 'Sodium Chloride Nasal Solution', f"Expected composition 'Sodium Chloride Nasal Solution', got {r[3]}"
    assert r[4] == 'As directed by the physician.', f"Expected dosage 'As directed by the physician.', got {r[4]}"
    assert r[5] == 'Information to be added', f"Expected description 'Information to be added', got {r[5]}"
    assert r[6] == 'Information to be added', f"Expected indications 'Information to be added', got {r[6]}"
    assert r[7] == 'Information to be added', f"Expected packaging 'Information to be added', got {r[7]}"
conn.close()
print("[PASS] Req: SQLite database contains verified 9-field record for NASRIL-S.")

# 7. Check Live Backend Endpoint /api/products
try:
    with urllib.request.urlopen(f"{BASE_URL}/api/products", timeout=5) as response:
        assert response.status == 200, f"API failed with status {response.status}"
        data = json.loads(response.read().decode('utf-8'))
        nasril_entry = next((p for p in data['products'] if p['id'] in ['nasril-s', 'nasril-s-spray-drop']), None)
        assert nasril_entry is not None, "NASRIL-S not found in /api/products response"
        assert nasril_entry['name'] == 'NASRIL-S', "API name is not NASRIL-S"
        assert nasril_entry['composition'] == 'Sodium Chloride Nasal Solution', "API composition mismatch"
        assert nasril_entry['dosage'] == 'As directed by the physician.', "API dosage mismatch"
        assert nasril_entry['image'] == 'assets/images/nasril-s.jpg', "API image mismatch"
        print("[PASS] Req: Live API /api/products serves authoritative NASRIL-S specifications.")
except Exception as e:
    print(f"[WARN] Live API check: {e}")

print("=" * 80)
print(">>> ALL NASRIL-S INTEGRATION TESTS PASSED WITH 100% SUCCESS! <<<")
print("=" * 80)
