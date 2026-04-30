// ─────────────────────────────────────────────────────────────
// config.example.js  —  COMMITTED to git (safe, no real keys)
//
// Setup instructions:
//   1. Copy this file to config.js  (already in .gitignore)
//   2. Fill in your real values in config.js
//   3. Never commit config.js
//
// EmailJS setup (free at emailjs.com):
//   - Create a service (Gmail, Outlook, etc.) → copy the Service ID
//   - Create two email templates:
//       "verification"  — must include {{verification_code}} and {{to_email}}
//       "benchmark"     — must include {{benchmark_json}} and {{to_email}}
//   - Copy the Template IDs and your Public Key
//
// Benchmark webhook (optional but recommended for reliability):
//   - Create a free Pipedream workflow at pipedream.com with an HTTP trigger
//   - Paste the generated URL into BENCHMARK_WEBHOOK
//   - Route it to a Google Sheet or email in Pipedream
// ─────────────────────────────────────────────────────────────
window.CSF_CONFIG = {
  EMAILJS_PUBLIC_KEY: 'YOUR_EMAILJS_PUBLIC_KEY',
  EMAILJS_SERVICE_ID: 'YOUR_EMAILJS_SERVICE_ID',
  EMAILJS_VERIFY_TPL: 'YOUR_VERIFY_TEMPLATE_ID',
  EMAILJS_REPORT_TPL: 'YOUR_REPORT_TEMPLATE_ID',
  BENCHMARK_EMAIL:    'you@yourdomain.com',
  BENCHMARK_WEBHOOK:  '',   // optional: Pipedream / Make.com webhook URL
};
