"""
MARRION RUSSAL REMEDIES PVT. LTD.
Enterprise Commerce Backend Server - Manual WhatsApp Payment Workflow

Architecture:
PRODUCTS -> SHOPPING DESK -> CHECKOUT -> CUSTOMER DETAILS -> SERVER-SIDE AUTHORITATIVE TOTAL
-> REQUEST PAYMENT DETAILS -> WHATSAPP OWNER (+91 9149412102) -> OWNER SENDS QR/UPI/BANK DETAILS
-> CUSTOMER PAYS DIRECTLY -> OWNER MANUALLY VERIFIES -> OWNER CONFIRMS ORDER

Security & Compliance:
- ZERO payment gateway, banking API, or card-entry forms.
- ZERO storage or handling of card numbers, CVVs, UPI PINs, or banking passwords.
- Authoritative server-side price recalculation using python Decimal (exact precision up to ₹10,00,000+).
- Never trust frontend totals.
- Unpriced products strictly blocked with: "Price currently unavailable. Please contact us for purchase details."
- Owner manually verifies and confirms payments.
"""

import os
import re
import json
import secrets
import smtplib
import urllib.parse
from decimal import Decimal, ROUND_HALF_UP
from datetime import datetime, timedelta
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from flask import Flask, request, jsonify, send_from_directory, render_template_string
import config
from config import (
    PORT, HOST, DEBUG, ADMIN_SECRET_KEY, DATABASE_PATH,
    COMPANY_NAME, COMPANY_EMAIL, COMPANY_WHATSAPP, COMPANY_WHATSAPP_RAW,
    SMTP_SERVER, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_USE_TLS
)
from database import get_db, hash_password, verify_password, init_db, seed_database

app = Flask(__name__, static_folder='.', static_url_path='')

# Initialize and seed database
init_db()
seed_database()

# In-memory rate limiting tracker: {ip: [timestamps]}
RATE_LIMIT_STORE = {}

def check_rate_limit(key: str, max_requests: int = 60, window_seconds: int = 60) -> bool:
    """Sliding window rate limiter to protect authentication and order creation."""
    now = datetime.now()
    cutoff = now - timedelta(seconds=window_seconds)
    timestamps = RATE_LIMIT_STORE.get(key, [])
    timestamps = [ts for ts in timestamps if ts > cutoff]
    if len(timestamps) >= max_requests:
        RATE_LIMIT_STORE[key] = timestamps
        return False
    timestamps.append(now)
    RATE_LIMIT_STORE[key] = timestamps
    return True

# ==============================================================================
# Currency & Decimal Formatting (Indian Rupee Notation, up to ₹10,00,000+)
# ==============================================================================
def format_inr(val_dec: Decimal) -> str:
    """
    Formats a Decimal into standard Indian Rupee notation (e.g. ₹48,750.00 or ₹10,00,000.00).
    Ensures safe precision for enterprise pharmaceutical orders up to ₹10,00,000+ without float drift.
    """
    val_dec = val_dec.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
    s = f"{val_dec:.2f}"
    parts = s.split('.')
    int_part = parts[0]
    dec_part = parts[1]

    if len(int_part) <= 3:
        return f"₹{int_part}.{dec_part}"

    last3 = int_part[-3:]
    rest = int_part[:-3]
    groups = []
    while len(rest) > 2:
        groups.insert(0, rest[-2:])
        rest = rest[:-2]
    if rest:
        groups.insert(0, rest)
    groups.append(last3)
    return f"₹{','.join(groups)}.{dec_part}"

# ==============================================================================
# Security Headers Middleware
# ==============================================================================
@app.after_request
def add_security_headers(response):
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    if request.path.startswith('/api/'):
        response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, private'
    return response

# ==============================================================================
# Admin Token Authentication (HMAC Signed)
# ==============================================================================
def generate_admin_token(username: str, role: str) -> str:
    """Generates an HMAC-signed bearer token with 24-hour validity."""
    expires_at = int((datetime.now() + timedelta(hours=24)).timestamp())
    payload = f"{username}|{role}|{expires_at}"
    import hmac, hashlib, base64
    signature = hmac.new(ADMIN_SECRET_KEY.encode(), payload.encode(), hashlib.sha256).hexdigest()
    token_data = base64.urlsafe_b64encode(f"{payload}:{signature}".encode()).decode()
    return token_data

def verify_admin_token(token: str):
    """Verifies HMAC signature and expiration of an admin bearer token."""
    try:
        import hmac, hashlib, base64
        raw = base64.urlsafe_b64decode(token.encode()).decode()
        payload, signature = raw.split(':', 1)
        expected_sig = hmac.new(ADMIN_SECRET_KEY.encode(), payload.encode(), hashlib.sha256).hexdigest()
        if not secrets.compare_digest(expected_sig, signature):
            return None
        username, role, expires_at = payload.split('|')
        if int(expires_at) < int(datetime.now().timestamp()):
            return None
        return {"username": username, "role": role}
    except Exception:
        return None

def require_admin(f):
    """Decorator to enforce admin authentication on API routes."""
    from functools import wraps
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return jsonify({"success": False, "error": "Unauthorized. Bearer token required."}), 401
        token = auth_header.split('Bearer ', 1)[1].strip()
        admin_data = verify_admin_token(token)
        if not admin_data:
            return jsonify({"success": False, "error": "Invalid or expired session token."}), 401
        request.admin = admin_data
        return f(*args, **kwargs)
    return decorated_function

# ==============================================================================
# Audit Logging Helper
# ==============================================================================
def record_audit_log(admin_username: str, action: str, entity_type: str, entity_id: str, details: str):
    """Appends an event to the persistent security audit trail."""
    try:
        db = get_db()
        cursor = db.cursor()
        cursor.execute("""
        INSERT INTO audit_logs (admin_username, action, entity_type, entity_id, details, ip_address)
        VALUES (?, ?, ?, ?, ?, ?)
        """, (
            admin_username,
            action,
            entity_type,
            str(entity_id),
            details,
            request.remote_addr or '127.0.0.1'
        ))
        db.commit()
        db.close()
    except Exception as e:
        print(f"[AUDIT LOG ERROR] Failed to record audit log: {e}")

# ==============================================================================
# Input Sanitization Helpers
# ==============================================================================
def sanitize_input(val: str, max_len: int = 255) -> str:
    """Sanitizes user input to prevent injection attacks."""
    if not val:
        return ""
    val = str(val).strip()
    val = re.sub(r'[<>&"\'`]', '', val)
    return val[:max_len]

def validate_email(email: str) -> bool:
    """Validates email format."""
    return bool(re.match(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$', email))

def validate_phone(phone: str) -> bool:
    """Validates 10-15 digit phone numbers."""
    cleaned = re.sub(r'[\s\-\+\(\)]', '', phone)
    return bool(re.match(r'^\d{10,15}$', cleaned))

# ==============================================================================
# Email Notification Dispatcher (Optional SMTP)
# ==============================================================================
def send_purchase_request_notification(order_dict: dict, items: list):
    """Sends order purchase notification email to company and customer if SMTP is configured."""
    if not SMTP_SERVER or not SMTP_USER:
        print(f"[EMAIL NOTICE] SMTP not configured. Purchase request notification logged for #{order_dict['order_number']}.")
        return

    try:
        msg = MIMEMultipart()
        msg['From'] = f"Marrion Russal Remedies <{SMTP_USER}>"
        msg['To'] = order_dict['customer_email']
        msg['Cc'] = COMPANY_EMAIL
        msg['Subject'] = f"Purchase Request Received - #{order_dict['order_number']} - Marrion Russal Remedies"

        items_html = "".join([
            f"<tr><td style='padding:8px;border-bottom:1px solid #eee;'>{it['product_name']}</td>"
            f"<td style='padding:8px;border-bottom:1px solid #eee;'>{it['quantity']}</td>"
            f"<td style='padding:8px;border-bottom:1px solid #eee;'>{it.get('formatted_price', f'₹{it['unit_price']}')}</td>"
            f"<td style='padding:8px;border-bottom:1px solid #eee;'>{it.get('formatted_subtotal', f'₹{it['subtotal']}')}</td></tr>"
            for it in items
        ])

        html_content = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="color: #1e3a8a; margin: 0;">MARRION RUSSAL REMEDIES</h2>
                <p style="color: #64748b; font-size: 13px;">Serving Life. Spreading Wellness.</p>
            </div>
            <div style="background: #f8fafc; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <h3 style="color: #0f172a; margin-top: 0;">PURCHASE REQUEST CONFIRMATION</h3>
                <p><strong>Order ID:</strong> #{order_dict['order_number']}</p>
                <p><strong>Customer:</strong> {order_dict['customer_name']} ({order_dict['customer_phone']})</p>
                <p><strong>Delivery Address:</strong> {order_dict['delivery_address']}, {order_dict['city']}, {order_dict['state']} - {order_dict['pin_code']}</p>
                <p><strong>Payment Status:</strong> {order_dict['payment_status']}</p>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                    <tr style="background: #f1f5f9; text-align: left;">
                        <th style="padding: 8px;">Product</th>
                        <th style="padding: 8px;">Qty</th>
                        <th style="padding: 8px;">Price</th>
                        <th style="padding: 8px;">Subtotal</th>
                    </tr>
                </thead>
                <tbody>{items_html}</tbody>
            </table>
            <div style="text-align: right; margin-bottom: 20px;">
                <span style="font-size: 16px; font-weight: bold; color: #7b182b;">TOTAL AMOUNT: {order_dict.get('formatted_total', f'₹{order_dict['total_amount']}')}</span>
            </div>
            <div style="background: #ecfdf5; border: 1px solid #a7f3d0; padding: 12px; border-radius: 6px; font-size: 13px; color: #065f46;">
                <strong>Next Step:</strong> The company will provide the official payment QR code, UPI ID, or bank details via WhatsApp ({COMPANY_WHATSAPP}). Once payment is verified, your order will move to PROCESSING.
            </div>
        </div>
        """
        msg.attach(MIMEText(html_content, 'html'))

        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            if SMTP_USE_TLS:
                server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            recipients = [order_dict['customer_email'], COMPANY_EMAIL]
            server.sendmail(SMTP_USER, recipients, msg.as_string())
            print(f"[EMAIL SUCCESS] Purchase request notification sent for #{order_dict['order_number']}.")
    except Exception as e:
        print(f"[EMAIL ERROR] Failed to send email: {e}")

# ==============================================================================
# Products & Catalogue API (With Pricing & Pharmaceutical Compliance)
# ==============================================================================
@app.route('/api/products', methods=['GET'])
def get_products():
    """Returns the pharmaceutical catalog with prices and sales compliance statuses."""
    db = get_db()
    cursor = db.cursor()
    cursor.execute("""
    SELECT id, name, family, formulation, status, division, description,
           composition, indications, dosage, packaging, image, price,
           sales_status, prescription_required, is_active
    FROM products
    WHERE is_active = 1
    ORDER BY name ASC
    """)
    rows = cursor.fetchall()
    db.close()

    products = []
    for r in rows:
        d = dict(r)
        price_val = d['price']
        if price_val is not None:
            dec = Decimal(str(price_val)).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
            d['price'] = float(dec)
            d['formatted_price'] = format_inr(dec)
        else:
            d['price'] = None
            d['formatted_price'] = None

        # Purchasable only if price is configured and sales_status is AVAILABLE FOR ONLINE PURCHASE
        d['is_purchasable'] = bool(
            d['price'] is not None and 
            d['price'] > 0 and 
            d['sales_status'] == 'AVAILABLE FOR ONLINE PURCHASE'
        )
        products.append(d)

    return jsonify({"success": True, "count": len(products), "products": products})

# ==============================================================================
# Checkout & Manual Payment Request API (Calculates Authoritative Server Total)
# ==============================================================================
@app.route('/api/checkout/request-payment', methods=['POST'])
@app.route('/api/checkout/create-order', methods=['POST'])
def checkout_request_payment():
    """
    Authoritative Server-side Order Processing & WhatsApp Payment Request Generation.

    Rules:
    - Never trust frontend totals or unit prices.
    - Recalculates: quantity * current valid price using Decimal (exact to 2 decimals).
    - Supports orders up to ₹10,00,000 without artificial caps or float drift.
    - If any product has no configured price, blocks checkout with:
      'Price currently unavailable for <Product>. Please contact us for purchase details.'
    - Sets initial status: 'PAYMENT DETAILS REQUESTED'.
    - Generates pre-filled WhatsApp message with exact order details and total for +91 9149412102.
    """
    ip = request.remote_addr or '127.0.0.1'
    if not check_rate_limit(f"checkout_{ip}", max_requests=25, window_seconds=60):
        return jsonify({"success": False, "error": "Too many requests. Please wait a moment."}), 429

    data = request.get_json(silent=True) or {}

    # 1. Input Validation
    full_name = sanitize_input(data.get('fullName', ''))
    mobile = sanitize_input(data.get('phone', ''))
    email = sanitize_input(data.get('email', ''))
    address = sanitize_input(data.get('deliveryAddress', ''))
    city = sanitize_input(data.get('city', ''))
    state = sanitize_input(data.get('state', ''))
    pin_code = sanitize_input(data.get('pinCode', ''))
    items = data.get('items', [])

    if len(full_name) < 2:
        return jsonify({"success": False, "error": "Please provide a valid full name."}), 400
    if not validate_phone(mobile):
        return jsonify({"success": False, "error": "Please provide a valid mobile number (10-15 digits)."}), 400
    if not validate_email(email):
        return jsonify({"success": False, "error": "Please provide a valid email address."}), 400
    if len(address) < 5:
        return jsonify({"success": False, "error": "Please provide a complete delivery address."}), 400
    if len(city) < 2 or len(state) < 2:
        return jsonify({"success": False, "error": "Please provide city and state."}), 400
    if not re.match(r'^\d{6}$', pin_code):
        return jsonify({"success": False, "error": "Please provide a valid 6-digit Indian PIN code."}), 400
    if not items or not isinstance(items, list):
        return jsonify({"success": False, "error": "Shopping basket is empty."}), 400

    # 2. Server-side Product Verification & Authoritative Pricing (Using Decimal)
    db = get_db()
    cursor = db.cursor()

    order_items_data = []
    authoritative_total = Decimal('0.00')

    for item in items:
        prod_id = item.get('productId')
        qty = item.get('quantity', 1)

        try:
            qty = int(qty)
            if qty < 1:
                db.close()
                return jsonify({"success": False, "error": "Item quantity must be at least 1."}), 400
        except (ValueError, TypeError):
            db.close()
            return jsonify({"success": False, "error": "Invalid item quantity."}), 400

        cursor.execute("SELECT * FROM products WHERE id = ?", (prod_id,))
        prod = cursor.fetchone()

        if not prod:
            db.close()
            return jsonify({"success": False, "error": f"Product '{prod_id}' not found in catalogue."}), 400

        # Pharmaceutical Price Check: Must have admin-configured price
        if prod['price'] is None or float(prod['price']) <= 0:
            db.close()
            return jsonify({
                "success": False, 
                "error": f"Price currently unavailable for {prod['name']}. Please contact us for purchase details."
            }), 400

        # Compliance Check: Sales Status
        if prod['sales_status'] != 'AVAILABLE FOR ONLINE PURCHASE':
            db.close()
            return jsonify({
                "success": False, 
                "error": f"Product '{prod['name']}' requires pharmaceutical verification before purchase. Please contact our coordination team."
            }), 400

        unit_price = Decimal(str(prod['price'])).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
        item_subtotal = (unit_price * Decimal(qty)).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
        authoritative_total += item_subtotal

        order_items_data.append({
            "product_id": prod['id'],
            "product_name": prod['name'],
            "quantity": qty,
            "unit_price": str(unit_price),
            "formatted_price": format_inr(unit_price),
            "subtotal": str(item_subtotal),
            "formatted_subtotal": format_inr(item_subtotal)
        })

    authoritative_total = authoritative_total.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)

    # 3. Create Unique Order Record
    current_year = datetime.now().strftime("%Y")
    random_num = secrets.randbelow(90000) + 10000
    order_number = f"MRR-{current_year}-{random_num:04d}"
    order_id = f"ord_{secrets.token_urlsafe(16)}"

    cursor.execute("""
    INSERT INTO orders (
        id, order_number, customer_name, customer_email, customer_phone,
        delivery_address, city, state, pin_code, subtotal, total_amount,
        currency, payment_status, order_status, payment_method
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'INR', 'PAYMENT DETAILS REQUESTED', 'PAYMENT DETAILS REQUESTED', 'WHATSAPP_MANUAL')
    """, (
        order_id, order_number, full_name, email, mobile,
        address, city, state, pin_code, str(authoritative_total), str(authoritative_total)
    ))

    # Insert itemized order records
    for oi in order_items_data:
        cursor.execute("""
        INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal)
        VALUES (?, ?, ?, ?, ?, ?)
        """, (order_id, oi['product_id'], oi['product_name'], oi['quantity'], oi['unit_price'], oi['subtotal']))

    db.commit()
    db.close()

    # 4. Construct Exact WhatsApp Purchase Request Message
    product_lines = []
    for idx, oi in enumerate(order_items_data, 1):
        product_lines.append(
            f"{idx}. {oi['product_name']}\n"
            f"Quantity: {oi['quantity']}\n"
            f"Price: {oi['formatted_price']}\n"
            f"Subtotal: {oi['formatted_subtotal']}"
        )
    products_block = "\n\n".join(product_lines)

    formatted_total_str = format_inr(authoritative_total)

    whatsapp_message = (
        f"NEW PURCHASE REQUEST\n\n"
        f"Order ID: {order_number}\n\n"
        f"Customer:\n"
        f"{full_name}\n"
        f"Phone: {mobile}\n"
        f"Email: {email}\n\n"
        f"Delivery Address:\n"
        f"{address}\n"
        f"{city}, {state} - {pin_code}\n\n"
        f"Products:\n\n"
        f"{products_block}\n\n"
        f"TOTAL AMOUNT: {formatted_total_str}\n\n"
        f"Please provide the appropriate payment QR code, UPI ID, or bank payment details to the customer for this exact amount."
    )

    whatsapp_url = f"https://wa.me/{COMPANY_WHATSAPP_RAW}?text={urllib.parse.quote(whatsapp_message)}"

    # 5. Dispatch Notification Email
    order_dict = {
        "id": order_id,
        "order_number": order_number,
        "customer_name": full_name,
        "customer_email": email,
        "customer_phone": mobile,
        "delivery_address": address,
        "city": city,
        "state": state,
        "pin_code": pin_code,
        "total_amount": str(authoritative_total),
        "formatted_total": formatted_total_str,
        "payment_status": "PAYMENT DETAILS REQUESTED"
    }
    send_purchase_request_notification(order_dict, order_items_data)

    return jsonify({
        "success": True,
        "orderId": order_id,
        "orderNumber": order_number,
        "customer": {
            "name": full_name,
            "email": email,
            "phone": mobile,
            "address": address,
            "city": city,
            "state": state,
            "pinCode": pin_code
        },
        "items": order_items_data,
        "totalAmount": str(authoritative_total),
        "formattedTotal": formatted_total_str,
        "whatsappUrl": whatsapp_url,
        "whatsappMessage": whatsapp_message,
        "paymentStatus": "PAYMENT DETAILS REQUESTED",
        "orderStatus": "PAYMENT DETAILS REQUESTED"
    })

# ==============================================================================
# Optional Payment Proof Submission API
# ==============================================================================
@app.route('/api/orders/<order_id>/submit-proof', methods=['POST'])
def submit_payment_proof(order_id):
    """
    Allows customer to optionally submit a payment reference / UTR number or transaction note.
    IMPORTANT: A customer-submitted proof does NOT automatically mark the order as paid!
    It updates the status to: 'PAYMENT VERIFICATION REQUIRED' until the owner confirms receipt.
    """
    data = request.get_json(silent=True) or {}
    ref_no = sanitize_input(data.get('referenceNumber', ''))
    notes = sanitize_input(data.get('proofNotes', ''))

    if not ref_no:
        return jsonify({"success": False, "error": "Please provide a transaction reference, UTR, or payment note."}), 400

    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM orders WHERE id = ? OR order_number = ?", (order_id, order_id))
    order = cursor.fetchone()

    if not order:
        db.close()
        return jsonify({"success": False, "error": "Order not found."}), 404

    order_dict = dict(order)

    # Set status to PAYMENT VERIFICATION REQUIRED
    cursor.execute("""
    UPDATE orders
    SET payment_proof_ref = ?,
        payment_proof_notes = ?,
        payment_proof_submitted_at = CURRENT_TIMESTAMP,
        payment_status = 'PAYMENT VERIFICATION REQUIRED',
        order_status = 'PAYMENT VERIFICATION REQUIRED',
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
    """, (ref_no, notes, order_dict['id']))

    # Record in payments table for audit
    cursor.execute("""
    INSERT INTO payments (
        order_id, payment_method, amount, currency, reference_number, proof_notes, status
    ) VALUES (?, 'WHATSAPP_MANUAL', ?, 'INR', ?, ?, 'PAYMENT VERIFICATION REQUIRED')
    """, (order_dict['id'], order_dict['total_amount'], ref_no, notes))

    db.commit()
    db.close()

    record_audit_log(
        order_dict.get('customer_email', 'Customer'),
        'SUBMIT_PAYMENT_PROOF',
        'ORDER',
        order_dict['order_number'],
        f"Submitted payment reference UTR: {ref_no}"
    )

    return jsonify({
        "success": True,
        "orderNumber": order_dict['order_number'],
        "paymentStatus": "PAYMENT VERIFICATION REQUIRED",
        "orderStatus": "PAYMENT VERIFICATION REQUIRED",
        "message": "Payment reference submitted successfully. Our team will verify and confirm your order."
    })

# ==============================================================================
# Order Lookup API
# ==============================================================================
@app.route('/api/orders/<order_id>', methods=['GET'])
def get_order_details(order_id):
    """Fetches non-sensitive order summary for customer receipt."""
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM orders WHERE id = ? OR order_number = ?", (order_id, order_id))
    order = cursor.fetchone()

    if not order:
        db.close()
        return jsonify({"success": False, "error": "Order not found."}), 404

    order_dict = dict(order)
    total_dec = Decimal(str(order_dict['total_amount'])).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
    order_dict['formatted_total'] = format_inr(total_dec)

    cursor.execute("SELECT * FROM order_items WHERE order_id = ?", (order_dict['id'],))
    items = []
    for x in cursor.fetchall():
        item_dict = dict(x)
        unit_dec = Decimal(str(item_dict['unit_price'])).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
        sub_dec = Decimal(str(item_dict['subtotal'])).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
        item_dict['formatted_price'] = format_inr(unit_dec)
        item_dict['formatted_subtotal'] = format_inr(sub_dec)
        items.append(item_dict)

    db.close()
    return jsonify({"success": True, "order": order_dict, "items": items})

# ==============================================================================
# Admin Authentication & Management APIs
# ==============================================================================
@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    """Authenticates administrator credentials using PBKDF2-SHA256."""
    ip = request.remote_addr or '127.0.0.1'
    if not check_rate_limit(f"login_{ip}", max_requests=10, window_seconds=60):
        return jsonify({"success": False, "error": "Too many login attempts. Please wait 1 minute."}), 429

    data = request.get_json(silent=True) or {}
    username = sanitize_input(data.get('username', ''))
    password = data.get('password', '')

    if not username or not password:
        return jsonify({"success": False, "error": "Username and password are required."}), 400

    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM admin_users WHERE username = ? AND is_active = 1", (username,))
    admin = cursor.fetchone()
    db.close()

    if not admin or not verify_password(admin['password_hash'], password):
        record_audit_log(username, 'LOGIN_FAILED', 'ADMIN_USER', username, 'Failed login attempt')
        return jsonify({"success": False, "error": "Invalid administrative credentials."}), 401

    token = generate_admin_token(admin['username'], admin['role'])
    record_audit_log(admin['username'], 'LOGIN_SUCCESS', 'ADMIN_USER', str(admin['id']), 'Admin successfully authenticated')

    return jsonify({
        "success": True,
        "token": token,
        "user": {
            "username": admin['username'],
            "email": admin['email'],
            "role": admin['role']
        }
    })

@app.route('/api/admin/orders', methods=['GET'])
@require_admin
def admin_list_orders():
    """Returns all customer orders with customer details, items, payment proof, and statuses."""
    db = get_db()
    cursor = db.cursor()

    status_filter = request.args.get('status')
    if status_filter and status_filter != 'ALL':
        cursor.execute("SELECT * FROM orders WHERE order_status = ? ORDER BY created_at DESC", (status_filter,))
    else:
        cursor.execute("SELECT * FROM orders ORDER BY created_at DESC")

    orders = []
    for x in cursor.fetchall():
        o = dict(x)
        tot_dec = Decimal(str(o['total_amount'])).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
        o['formatted_total'] = format_inr(tot_dec)
        cursor.execute("SELECT * FROM order_items WHERE order_id = ?", (o['id'],))
        order_items = []
        for it in cursor.fetchall():
            it_dict = dict(it)
            up_dec = Decimal(str(it_dict['unit_price'])).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
            sb_dec = Decimal(str(it_dict['subtotal'])).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
            it_dict['formatted_price'] = format_inr(up_dec)
            it_dict['formatted_subtotal'] = format_inr(sb_dec)
            order_items.append(it_dict)
        o['items'] = order_items
        orders.append(o)

    db.close()
    return jsonify({"success": True, "orders": orders})

@app.route('/api/admin/orders/<order_id>/status', methods=['PATCH'])
@require_admin
def admin_update_order_status(order_id):
    """
    Allows authorized owner/administrator to manually update order progression status.
    Key transition: PAYMENT PENDING / VERIFICATION REQUIRED -> PAYMENT CONFIRMED -> PROCESSING -> SHIPPED.
    """
    data = request.get_json(silent=True) or {}
    new_status = data.get('status')

    valid_statuses = [
        'PAYMENT DETAILS REQUESTED',
        'PAYMENT PENDING',
        'PAYMENT VERIFICATION REQUIRED',
        'PAYMENT CONFIRMED',
        'PROCESSING',
        'SHIPPED',
        'DELIVERED',
        'CANCELLED'
    ]

    if new_status not in valid_statuses:
        return jsonify({"success": False, "error": f"Invalid status. Must be one of: {', '.join(valid_statuses)}"}), 400

    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM orders WHERE id = ? OR order_number = ?", (order_id, order_id))
    order = cursor.fetchone()

    if not order:
        db.close()
        return jsonify({"success": False, "error": "Order not found."}), 404

    old_status = order['order_status']
    admin_user = request.admin['username']

    if new_status == 'PAYMENT CONFIRMED':
        cursor.execute("""
        UPDATE orders 
        SET order_status = ?, 
            payment_status = 'PAYMENT CONFIRMED',
            confirmed_by_admin = ?,
            confirmed_at = CURRENT_TIMESTAMP,
            updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
        """, (new_status, admin_user, order['id']))

        # Log confirmation in payments table
        cursor.execute("""
        INSERT INTO payments (
            order_id, payment_method, amount, currency, status, verified_by_admin
        ) VALUES (?, 'WHATSAPP_MANUAL', ?, 'INR', 'PAYMENT CONFIRMED', ?)
        """, (order['id'], order['total_amount'], admin_user))
    else:
        cursor.execute("""
        UPDATE orders SET order_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
        """, (new_status, order['id']))

    db.commit()
    db.close()

    record_audit_log(
        admin_user,
        'UPDATE_ORDER_STATUS',
        'ORDER',
        order['order_number'],
        f"Status manually updated from '{old_status}' to '{new_status}'"
    )

    return jsonify({
        "success": True,
        "orderNumber": order['order_number'],
        "oldStatus": old_status,
        "newStatus": new_status,
        "confirmedBy": admin_user if new_status == 'PAYMENT CONFIRMED' else order['confirmed_by_admin']
    })

@app.route('/api/admin/products', methods=['GET'])
@require_admin
def admin_list_products():
    """Lists all products for administrator pricing and pharmaceutical sales status management."""
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM products ORDER BY name ASC")
    products = []
    for x in cursor.fetchall():
        p = dict(x)
        if p['price'] is not None:
            p['price'] = float(Decimal(str(p['price'])).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP))
        products.append(p)
    db.close()
    return jsonify({"success": True, "products": products})

@app.route('/api/admin/products/<product_id>', methods=['PATCH'])
@require_admin
def admin_update_product(product_id):
    """
    Configures price and pharmaceutical sales status for a product.
    Strictly adheres to: 'Do NOT invent prices. Create price fields in backend/admin.'
    """
    data = request.get_json(silent=True) or {}
    price = data.get('price')
    sales_status = data.get('sales_status')
    prescription_required = data.get('prescription_required')

    valid_statuses = [
        'AVAILABLE FOR ONLINE PURCHASE',
        'REQUIRES VERIFICATION',
        'NOT AVAILABLE FOR ONLINE PURCHASE'
    ]

    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM products WHERE id = ?", (product_id,))
    prod = cursor.fetchone()

    if not prod:
        db.close()
        return jsonify({"success": False, "error": "Product not found."}), 404

    updates = []
    params = []

    if price is not None:
        try:
            if price == "" or price is False:
                updates.append("price = NULL")
            else:
                price_dec = Decimal(str(price)).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
                if price_dec < 0:
                    db.close()
                    return jsonify({"success": False, "error": "Price must be non-negative."}), 400
                updates.append("price = ?")
                params.append(float(price_dec))
        except Exception:
            db.close()
            return jsonify({"success": False, "error": "Invalid price format."}), 400

    if sales_status is not None:
        if sales_status not in valid_statuses:
            db.close()
            return jsonify({"success": False, "error": f"Invalid sales status. Must be one of: {', '.join(valid_statuses)}"}), 400
        updates.append("sales_status = ?")
        params.append(sales_status)

    if prescription_required is not None:
        updates.append("prescription_required = ?")
        params.append(1 if prescription_required else 0)

    if not updates:
        db.close()
        return jsonify({"success": False, "error": "No updates specified."}), 400

    updates.append("updated_at = CURRENT_TIMESTAMP")
    params.append(product_id)

    sql = f"UPDATE products SET {', '.join(updates)} WHERE id = ?"
    cursor.execute(sql, params)
    db.commit()

    cursor.execute("SELECT * FROM products WHERE id = ?", (product_id,))
    updated_prod = dict(cursor.fetchone())
    db.close()

    record_audit_log(
        request.admin['username'],
        'UPDATE_PRODUCT_PRICING',
        'PRODUCT',
        prod['name'],
        f"Price: {updated_prod['price']}, Status: {updated_prod['sales_status']}"
    )

    return jsonify({"success": True, "product": updated_prod})

@app.route('/api/admin/audit-logs', methods=['GET'])
@require_admin
def admin_audit_logs():
    """Returns administrative audit trails for compliance."""
    limit = min(int(request.args.get('limit', 50)), 200)
    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT ?", (limit,))
    logs = [dict(x) for x in cursor.fetchall()]
    db.close()
    return jsonify({"success": True, "logs": logs})

# ==============================================================================
# Static File & Single Page Application Serving
# ==============================================================================
@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('.', filename)

# ==============================================================================
# Main Entry Point
# ==============================================================================
if __name__ == '__main__':
    print(f"================================================================================")
    print(f"MARRION RUSSAL REMEDIES PVT. LTD. — ENTERPRISE COMMERCE SERVER")
    print(f"Server starting on http://{HOST}:{PORT}")
    print(f"Workflow: WhatsApp Manual Payment Request (Owner: {COMPANY_WHATSAPP})")
    print(f"================================================================================")
    app.run(host=HOST, port=PORT, debug=DEBUG)
