"""
MARRION RUSSAL REMEDIES PVT. LTD.
Secure Server Configuration & Environment Variables
"""

import os
from pathlib import Path

# Load .env file if present
BASE_DIR = Path(__file__).resolve().parent
ENV_FILE = BASE_DIR / '.env'

if ENV_FILE.exists():
    with open(ENV_FILE, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                key, val = line.split('=', 1)
                key = key.strip()
                val = val.strip().strip('"').strip("'")
                if key and key not in os.environ:
                    os.environ[key] = val

# Server settings
PORT = int(os.environ.get('PORT', 3000))
HOST = os.environ.get('HOST', '0.0.0.0')
DEBUG = os.environ.get('DEBUG', 'False').lower() in ('true', '1')

# Security Keys
ADMIN_SECRET_KEY = os.environ.get('ADMIN_SECRET_KEY', 'mrr_sec_2026_super_secure_key_pharmaceutical_compliance_9149412102')
DATABASE_PATH = os.environ.get('DATABASE_PATH', str(BASE_DIR / 'marrion_russal.db'))

# Payment Architecture: Manual WhatsApp Owner Workflow (+91 9149412102)
# Zero online payment gateway, banking API, or card storage.

# Company Contact Information
COMPANY_NAME = "Marrion Russal Remedies Pvt. Ltd."
COMPANY_EMAIL = "marrionrussal@gmail.com"
COMPANY_WHATSAPP = "+91 9149412102"
COMPANY_WHATSAPP_RAW = "919149412102"

# SMTP Email Dispatch Settings (Optional)
SMTP_SERVER = os.environ.get('SMTP_SERVER', '')
SMTP_PORT = int(os.environ.get('SMTP_PORT', 587))
SMTP_USER = os.environ.get('SMTP_USER', '')
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD', '')
SMTP_USE_TLS = os.environ.get('SMTP_USE_TLS', 'True').lower() in ('true', '1')
