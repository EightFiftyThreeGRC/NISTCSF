// ─────────────────────────────────────────────────────────────
// config.example.js  —  COMMITTED to git (safe, no real keys)
//
// Setup instructions:
//   1. Copy this file to config.js  (already in .gitignore)
//   2. Fill in your real EmailJS values in config.js
//   3. Never commit config.js
//
// EmailJS setup (free at emailjs.com):
//   - Create a service (Gmail, Outlook, etc.) → copy the Service ID
//   - Create two email templates:
//       "verification"  — must include {{verification_code}} and {{to_email}}
//       "benchmark"     — must include {{benchmark_json}} (sent on report generation)
//   - Copy the Template IDs and your Public Key
//
// Once configured:
//   - Verification codes are emailed to each user when they register
//   - Benchmark data (industry, size, scores) is automatically emailed
//     to the hardcoded address on report generation
// ─────────────────────────────────────────────────────────────
window.CSF_CONFIG = {
  EMAILJS_PUBLIC_KEY: 'YOUR_EMAILJS_PUBLIC_KEY',
  EMAILJS_SERVICE_ID: 'YOUR_EMAILJS_SERVICE_ID',
  EMAILJS_VERIFY_TPL: 'YOUR_VERIFY_TEMPLATE_ID',
  EMAILJS_REPORT_TPL: 'YOUR_REPORT_TEMPLATE_ID',
};
