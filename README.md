# 🛡️ PrismLine — Affordable Secure Web Development Platform

> **Websites Engineered Bold. Secured by Default at Lower Cost.**

Welcome to the official production-ready website platform for **PrismLine**.

---

## 🌟 Brand Highlights & Direct Contacts

- **Company Name:** PrismLine
- **Core Specialization:** Zero-Trust Secure Website & Web Application Engineering (Frontend & Backend)
- **Direct Phone Hotline:** `+91 99529 34596`
- **Anytime Rectification Guarantee:** 100% Genuine Code Quality with Rapid Issue & Vulnerability Rectification at zero client cost.
- **WhatsApp Support:** [Chat Directly on WhatsApp](https://wa.me/919952934596)

---

## 📂 Project Structure

```
prismline/
├── index.html              # Flagship Home: Reference hero layout, stats, capabilities, guarantee, contact
├── services.html           # Full-Stack Engineering, Hardened Frontend & Zero-Trust Backend
├── process.html            # 4-Stage Secure Engineering Lifecycle (Threat Modeling, SAST/DAST, Deployment)
├── guarantee.html          # Anytime Rectification Guarantee™: Zero-cost remediation SLA
├── about.html              # Origin Story, Cybersecurity Manifesto & Studio Culture
├── contact.html            # Direct Line (+91 99529 34596), WhatsApp & Consultation Form
├── .htaccess               # GoDaddy Apache Performance & Security Headers
├── package.json
├── api/
│   ├── contact.php         # GoDaddy lead collector & mailer (supports JSON & URL-encoded)
│   ├── leads_storage.json  # Auto-generated lead data storage
│   └── README.md           # Backend developer API integration guide
├── assets/
│   ├── css/
│   │   └── style.css       # 100% Light Theme Design System (Plus Jakarta Sans, crisp 1px borders)
│   ├── js/
│   │   └── main.js         # Mobile drawer, silent red logo intro & AJAX lead submission
│   └── images/
│       ├── hero-graphic.svg # High-contrast light-mode inverted triangle & beacon graphic
│       ├── logo-emblem.svg  # Animated red winged emblem (from brand image)
│       ├── logo.png         # Brand logo
│       └── favicon.svg      # Favicon
└── README.md               # Documentation and guides
```

---

## 🚀 How to Run Locally

The site is currently running live on:
👉 **`http://localhost:8080`**

To run manually:
```bash
cd /Users/sanjay.v.s/Downloads/prismline
python3 -m http.server 8080
# Or: npx serve . -l 8080
```
Then open `http://localhost:8080` in any web browser.

---

## Deploy on Vercel

This repository includes `vercel.json` for deploying the static frontend with
security response headers.

1. Import `vssanjai/PrismLine` in Vercel.
2. Select **Other** as the framework preset.
3. Leave the build command and output directory empty.
4. Deploy from the `main` branch.

Vercel serves the HTML, CSS, JavaScript, and image assets. Vercel does not run
the PHP endpoint in `api/contact.php`; keep that endpoint on a PHP-capable host
or migrate it to a supported serverless runtime before using the contact form
in production.

---

## 🌐 How to Host on GoDaddy (cPanel)

1. Log in to your **GoDaddy cPanel Hosting Account**.
2. Open **File Manager** and navigate to `public_html/`.
3. Upload all files from `Downloads/prismline/` into `public_html/` (including the `.htaccess`, `api/`, and `assets/` folders).
4. Ensure the `api/` directory has write permissions (`chmod 755` or `chmod 775`) so `leads_storage.json` can record inbound leads.
5. In `api/contact.php`, set `$to = "admin@prismline.com"` to your preferred notification email.

---

## 🔌 Connecting to a Custom Backend

In `assets/js/main.js`, line 9:
```javascript
const BACKEND_API_ENDPOINT = 'api/contact.php';
```
Your backend team can replace `'api/contact.php'` with their custom REST API endpoint (e.g., `https://api.prismline.com/v1/leads`).
