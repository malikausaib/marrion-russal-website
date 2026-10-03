"""
MARRION RUSSAL REMEDIES PVT. LTD.
Enterprise Relational Database Module (SQLite)

Tables:
- users
- admin_users
- product_families
- products
- orders
- order_items
- payments
- directors
- divisions
- operating_areas
- medical_representatives
- audit_logs
"""

import sqlite3
import hashlib
import secrets
import os
import json
import re
from datetime import datetime
from config import DATABASE_PATH

def get_db():
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn

def hash_password(password: str) -> str:
    """Secure PBKDF2-HMAC-SHA256 password hashing with random salt."""
    salt = secrets.token_hex(16)
    key = hashlib.pbkdf2_hmac(
        'sha256',
        password.encode('utf-8'),
        salt.encode('utf-8'),
        100000
    )
    return f"pbkdf2:sha256:100000${salt}${key.hex()}"

def verify_password(stored_hash: str, password_attempt: str) -> bool:
    """Verifies a password against stored PBKDF2 hash with constant-time comparison."""
    try:
        method, salt, key_hex = stored_hash.split('$')
        computed_key = hashlib.pbkdf2_hmac(
            'sha256',
            password_attempt.encode('utf-8'),
            salt.encode('utf-8'),
            100000
        )
        return secrets.compare_digest(computed_key.hex(), key_hex)
    except Exception:
        return False

def init_db():
    """Initializes all database tables with strict relational integrity."""
    conn = get_db()
    cursor = conn.cursor()

    # 1. Users / Customers
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        full_name TEXT NOT NULL,
        phone TEXT,
        role TEXT DEFAULT 'customer',
        password_hash TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # 2. Admin Users (Role-based access, audit trails)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS admin_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT DEFAULT 'admin',
        is_active INTEGER DEFAULT 1,
        mfa_secret TEXT,
        last_login TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # 3. Product Families
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS product_families (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT,
        description TEXT
    );
    """)

    # 4. Products
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        family TEXT NOT NULL,
        formulation TEXT NOT NULL,
        status TEXT DEFAULT 'current',
        division TEXT NOT NULL,
        description TEXT,
        composition TEXT,
        indications TEXT,
        dosage TEXT,
        packaging TEXT,
        image TEXT,
        price REAL,
        sales_status TEXT DEFAULT 'REQUIRES VERIFICATION',
        prescription_required INTEGER DEFAULT 0,
        is_active INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # 5. Orders (Manual WhatsApp Payment Workflow)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        order_number TEXT UNIQUE NOT NULL,
        customer_id TEXT,
        customer_name TEXT NOT NULL,
        customer_email TEXT NOT NULL,
        customer_phone TEXT NOT NULL,
        delivery_address TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        pin_code TEXT NOT NULL,
        subtotal TEXT NOT NULL,
        total_amount TEXT NOT NULL,
        currency TEXT DEFAULT 'INR',
        payment_status TEXT DEFAULT 'PAYMENT DETAILS REQUESTED',
        order_status TEXT DEFAULT 'PAYMENT DETAILS REQUESTED',
        payment_method TEXT DEFAULT 'WHATSAPP_MANUAL',
        payment_proof_ref TEXT,
        payment_proof_notes TEXT,
        payment_proof_submitted_at TIMESTAMP,
        confirmed_by_admin TEXT,
        confirmed_at TIMESTAMP,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # Dynamic migrations for orders table columns
    order_columns = [row[1] for row in cursor.execute("PRAGMA table_info(orders);").fetchall()]
    for col_def in [
        ("payment_method", "TEXT DEFAULT 'WHATSAPP_MANUAL'"),
        ("payment_proof_ref", "TEXT"),
        ("payment_proof_notes", "TEXT"),
        ("payment_proof_submitted_at", "TIMESTAMP"),
        ("confirmed_by_admin", "TEXT"),
        ("confirmed_at", "TIMESTAMP")
    ]:
        col_name, col_type = col_def
        if col_name not in order_columns:
            cursor.execute(f"ALTER TABLE orders ADD COLUMN {col_name} {col_type};")

    # 6. Order Items
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        product_name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        unit_price TEXT NOT NULL,
        subtotal TEXT NOT NULL,
        FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY(product_id) REFERENCES products(id)
    );
    """)

    # 7. Payments (Manual Verification & Audit Log)
    cursor.execute("PRAGMA table_info(payments);")
    existing_p_cols = [row[1] for row in cursor.fetchall()]
    if 'gateway_name' in existing_p_cols:
        cursor.execute("DROP TABLE payments;")

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id TEXT NOT NULL,
        payment_method TEXT DEFAULT 'WHATSAPP_MANUAL',
        amount TEXT NOT NULL,
        currency TEXT DEFAULT 'INR',
        reference_number TEXT,
        proof_notes TEXT,
        status TEXT NOT NULL DEFAULT 'PAYMENT DETAILS REQUESTED',
        verified_by_admin TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(order_id) REFERENCES orders(id)
    );
    """)


    # 8. Directors
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS directors (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        company TEXT NOT NULL,
        designation_notice TEXT,
        initials TEXT,
        display_order INTEGER DEFAULT 0
    );
    """)

    # 9. Divisions
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS divisions (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        code TEXT NOT NULL,
        summary TEXT,
        accent_color TEXT,
        display_order INTEGER DEFAULT 0
    );
    """)

    # 10. Operating Areas
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS operating_areas (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        state TEXT,
        headquarters TEXT,
        status TEXT,
        coverage_area TEXT,
        display_order INTEGER DEFAULT 0
    );
    """)

    # 11. Medical Representatives
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS medical_representatives (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        designation TEXT,
        area_id TEXT,
        phone TEXT,
        email TEXT,
        status TEXT,
        display_order INTEGER DEFAULT 0
    );
    """)

    # 12. Audit Logs
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS audit_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        admin_username TEXT NOT NULL,
        action TEXT NOT NULL,
        entity_type TEXT NOT NULL,
        entity_id TEXT,
        details TEXT,
        ip_address TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    conn.commit()
    conn.close()

def seed_database():
    """Seeds official company data (products, families, divisions, directors, default admin)."""
    conn = get_db()
    cursor = conn.cursor()

    # 1. Seed Default Admin User if none exists
    cursor.execute("SELECT COUNT(*) as count FROM admin_users")
    if cursor.fetchone()['count'] == 0:
        default_admin_pass = "MarrionAdmin@2026!"
        cursor.execute("""
        INSERT INTO admin_users (username, email, password_hash, role, is_active)
        VALUES (?, ?, ?, ?, ?)
        """, (
            "admin",
            "marrionrussal@gmail.com",
            hash_password(default_admin_pass),
            "superadmin",
            1
        ))

    # 2. Seed Directors
    directors_data = [
        ("mohd-amin", "MOHD AMIN", "Director", "Marrion Russal Remedies Pvt. Ltd.", "Official Board of Directors", "MA", 1),
        ("ajaz-ahmad", "AJAZ AHMAD", "Director", "Marrion Russal Remedies Pvt. Ltd.", "Official Board of Directors", "AA", 2)
    ]
    for d in directors_data:
        cursor.execute("""
        INSERT OR IGNORE INTO directors (id, name, role, company, designation_notice, initials, display_order)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """, d)

    # 3. Seed Divisions
    divisions_data = [
        ("general-1", "GENERAL DIVISION 1", "GD-01", "Dedicated to comprehensive clinical care across primary gastroenterology, pediatric medicine, general healthcare, and ENT disciplines.", "var(--navy-primary)", 1),
        ("general-2", "GENERAL DIVISION 2ND", "GD-02", "Extending therapeutics in gastroenterology, pediatrics, general medicine, and otorhinolaryngology across specialized clinical portfolios.", "var(--wine-primary)", 2),
        ("dental", "DENTAL DIVISION", "DT-03", "Specialized pharmaceutical formulations developed specifically for advanced oral health, mucosal hygiene, and dental care therapies.", "var(--cyan-accent)", 3),
        ("dermatology", "DERMATOLOGY DIVISION", "DM-04", "Targeted dermatological remedies focused on skin health, barrier restoration, anti-fungal hygiene, and topical therapeutic care.", "var(--bronze-accent)", 4)
    ]
    for div in divisions_data:
        cursor.execute("""
        INSERT OR IGNORE INTO divisions (id, name, code, summary, accent_color, display_order)
        VALUES (?, ?, ?, ?, ?, ?)
        """, div)

    # 4. Seed Product Families
    families = [
        "GASORIL", "NASRIL", "SUCRACELL", "DEVAC", "ACETOS",
        "CLEAR 32", "LC", "SOFTEX", "SHADEX", "KETOTOS", "PERMETOS"
    ]
    for fam in families:
        cursor.execute("""
        INSERT OR IGNORE INTO product_families (id, name, category, description)
        VALUES (?, ?, ?, ?)
        """, (fam, fam, "Pharmaceutical Formulation Family", f"Marrion Russal Remedies {fam} Therapeutics"))

    # 5. Seed all 30 official formulations from products.js
    products_js_path = os.path.join(os.path.dirname(__file__), 'data', 'products.js')
    if os.path.exists(products_js_path):
        with open(products_js_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Parse PRODUCTS array objects using regex
        prod_matches = re.findall(r'\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*family:\s*"([^"]+)",\s*formulation:\s*"([^"]+)",\s*status:\s*"([^"]+)",\s*division:\s*"([^"]+)"', content)
        for p_id, p_name, p_family, p_form, p_status, p_div in prod_matches:
            cursor.execute("""
            INSERT OR IGNORE INTO products (
                id, name, family, formulation, status, division, 
                price, sales_status, prescription_required, is_active
            ) VALUES (?, ?, ?, ?, ?, ?, NULL, 'REQUIRES VERIFICATION', 0, 1)
            """, (p_id, p_name, p_family, p_form, p_status, p_div))

        # Synchronize official NASRIL-S product specifications
        cursor.execute("""
        UPDATE products 
        SET name = 'NASRIL-S',
            formulation = 'Nasal Spray',
            image = 'assets/images/nasril-s.jpg',
            composition = 'Sodium Chloride Nasal Solution',
            description = 'Information to be added',
            indications = 'Information to be added',
            dosage = 'As directed by the physician.',
            packaging = 'Information to be added'
        WHERE id = 'nasril-s-spray-drop' OR id = 'nasril-s';
        """)

        # Synchronize official pharmaceutical product images
        product_images = {
            'gasoril-capsule': 'public/products/gasoril-capsule.webp',
            'gasoril-psc-tablet': 'public/products/gasoril-psc.webp',
            'gasoril-kid-drops': 'public/products/gasoril-kid.webp',
            'nasril-xp-spray-drop': 'public/products/nasril-xp.webp',
            'nasril-x-spray-drop': 'public/products/nasril-x.webp',
            'nasril-f-spray': 'public/products/nasril-f.webp',
            'sucracell-o-suspension': 'public/products/sucracell-o.webp',
            'devac-syrup': 'public/products/devac-syrup.webp',
            'softex-moisturiser': 'public/products/softex-moisturiser.webp',
            'shadex-sunscreen': 'public/products/shadex-sunscreen.webp',
        }
        for pid, img_path in product_images.items():
            cursor.execute("UPDATE products SET image = ? WHERE id = ?;", (img_path, pid))

    conn.commit()
    conn.close()

if __name__ == '__main__':
    print("Initializing Database schema...")
    init_db()
    print("Seeding Company Data...")
    seed_database()
    print("Database ready!")
