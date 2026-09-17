# PrismLine Backend Integration Guide (GoDaddy / cPanel / Node.js)

This document is prepared for the **PrismLine Backend Engineering Team** to collect, store, and process client inquiries from the website.

---

## 📬 Form Submission Endpoints

The website frontend submits consultation and audit requests via `POST` to:
- **Default Endpoint:** `/api/contact.php` (for standard GoDaddy Apache/cPanel shared hosting)
- **Content-Type:** Supports both `application/json` (modern `fetch()`) and `application/x-www-form-urlencoded` (standard HTML `<form>`)

---

## 📋 Field Specification & Schema

| Field Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `fullName` | String | **Yes** | Client's full name |
| `phone` | String | **Yes** | Client's direct phone number (e.g. `9952934596`) |
| `email` | String | No | Business email address |
| `service` | String | No | Service category (e.g. `Full-Stack Web`, `Frontend Hardening`, `Zero-Trust Backend`, `Security Audit`) |
| `timeline` | String | No | Target project timeframe (`Urgent`, `1-2 Weeks`, `Flexible`) |
| `message` | String | No | Project description or security requirements |
| `source` | String | No | Identifying origin page (e.g. `Hero Quick Form`, `Contact Page`, `Rectification Claim`) |

---

## 🛡️ Response Format

### Success (HTTP 200)
```json
{
  "success": true,
  "message": "Thank you! Your inquiry has been secured. A PrismLine senior engineer will contact you shortly.",
  "leadId": "lead_66f123abc456"
}
```

### Error (HTTP 400 / 500)
```json
{
  "success": false,
  "error": "Name and phone number are required."
}
```

---

## ⚙️ How to Deploy on GoDaddy
1. Upload the entire `prismline` directory to your GoDaddy cPanel `public_html/` folder.
2. In `api/contact.php`, update `$to = "contact@prismline.tech";` with your preferred inbox.
3. Every submission is automatically backed up in `api/leads_storage.json`.

---

&copy; 2026 PrismLine Technologies.
