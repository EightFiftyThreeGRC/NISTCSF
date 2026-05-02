# NIST CSF 2.0 Guided Assessment

An AI-powered, single-file web tool that walks an organization through a complete NIST Cybersecurity Framework 2.0 evaluation — from raw evidence documents to a scored, board-ready report. Built as a working prototype to explore what an AI-assisted GRC tool could look like end-to-end.

> **Status:** Working prototype. The end-to-end flow runs; calibration of the AI scoring against a known test corpus is the active iteration target. See [Known limitations](#known-limitations) and [Roadmap](#roadmap) below for honest scope.

---

## What it does

Replicates the core workflow of a professional CSF assessment:

1. **Document Upload** — drag-and-drop policies, risk registers, asset inventories, IR plans, etc. across 12 evidence categories.
2. **AI Analysis** — Claude reads each document and maps it to CSF 2.0 subcategories with an evidence-quality rating (`strong` / `adequate` / `weak` / `missing`).
3. **Targeted Questionnaire** — the AI generates a gap-aware question set covering every in-scope subcategory; depth scales to evidence strength (probe weak/missing, verify adequate, confirm strong). Answers can be Likert, yes/no, multi-choice, or free text.
4. **Findings Generation** — chunked by CSF function; each finding gets CMMI 1–5, CSF Tier, likelihood × impact, level of effort, recommendation.
5. **Findings Review** — human-in-the-loop. Approve, dispute, or re-analyze any finding with your additional context.
6. **Report** — function-score radar, heat-map by category, top-gaps table, 30/60/90-day priority roadmap, full subcategory detail. Print or export JSON.

Each step produces durable state (auto-saved to `localStorage`) so you can close the tab mid-assessment and come back.

## Why it exists

GRC assessments are expensive and time-consuming, and the bottleneck is rarely "what do the documents say?" — it's the human time to read them, map them to a framework, and produce a report. This is a working bet on what becomes possible when the document-reading and framework-mapping steps are AI-assisted but the scoring and final framing stay human-supervised.

It's not trying to replace consultants. It's trying to compress the parts of an assessment that are mechanical (reading, mapping, drafting) so the human time goes to the parts that need judgment (calibration, dispute resolution, executive framing).

## Quick start

**Requirements:** an Anthropic API key (the only supported provider). Get one at [console.anthropic.com](https://console.anthropic.com). Pay-as-you-go; a full assessment of ~100 documents costs roughly $5–15 in API credit depending on model choice.

**Run locally:**

```bash
git clone https://github.com/EightFiftyThreeGRC/NISTCSF.git
cd NISTCSF
python3 serve.py    # or any static server on port 8000
# then open http://localhost:8000/nist-csf-assessment.html
```

You can also just open `nist-csf-assessment.html` in a browser via `file://`, but a few features (drag-and-drop file upload, certain network behaviors) work better when served over HTTP.

**On the Welcome screen:**
- Paste your Anthropic API key
- Pick a model: **Sonnet 4.6** (recommended), **Haiku 4.5** (cheap/fast), or **Opus 4.6** (highest quality)
- Click **Start New Assessment**

Or skip the API key entirely and click **Demo: synthetic data → Analysis** on the Documents step to see the rest of the flow with placeholder evidence (the questionnaire and findings stages still call the real API; demo mode just bypasses document analysis).

## Demo path with the included test corpus

The repo includes [`Test_Company_MCT/`](Test_Company_MCT/) — a deliberately calibrated synthetic test corpus for a fictional mid-market healthcare-SaaS company. It has:

- A self-consistent body of evidence (policies, charters, IR plans, vuln scans, etc.)
- A maturity-profile **answer key** at `Test_Company_MCT/4_Maturity_Profile/maturity-profile.md` showing the expected scores
- Three intentional weaknesses baked in (GV.SC, RC.RP, ID.IM) that a working assessment tool should surface

Used during development to validate that prompt iterations actually moved scores in the right direction. See [`Test_Company_MCT/README.md`](Test_Company_MCT/README.md) for details.

## Architecture

Single HTML file (`nist-csf-assessment.html`), no build step, no backend. Everything else is on a CDN:

- **PDF.js** for PDF text extraction
- **mammoth.js** for `.docx` text extraction
- **Anthropic Messages API** for all AI calls (direct from the browser, no proxy)

Notable engineering bits:

- **Two-pool concurrency limiter** — short calls (doc analysis) run 4-at-a-time; long calls (findings, narratives, exec summary) run 2-at-a-time. Both go through the same retry-with-backoff wrapper that honors `retry-after` headers on 429s.
- **Tolerant JSON parsing** — strips markdown code fences, falls back to a partial-recovery walk that extracts complete top-level entries when the model truncates mid-response.
- **CMMI score capping** — a critic pass enforces a ceiling per subcategory based on the evidence quality observed during analysis (strong → CMMI 5 ceiling, missing → 1.5 ceiling, etc.) so the model can't score a 4 on a subcategory with no document support.
- **Localstorage session persistence** — every state mutation auto-saves; the Welcome screen detects the saved session and offers Resume vs Clear.

## File layout

```
.
├── nist-csf-assessment.html    Main app — wizard, AI orchestration, scoring, report
├── tests.html                  20 browser-runnable assertions on parseJSON, recovery, scoring rollup, signature stability
├── serve.py                    Tiny static server for local development
├── Test_Company_MCT/           Calibrated synthetic test corpus (see its README)
├── PROJECT-TODO.md             Original scope / design doc
├── LICENSE                     MIT
└── README.md
```

## Tests

Open `tests.html` in a browser. ~20 assertions on the pure functions: `parseJSON` (happy path + truncation recovery + brace-in-string handling), the scoring rollup math (subcategory → category → function → overall, with subcat-count weighting and equal-function weighting), and a stable findings-signature hash for cache invalidation logic.

No test framework, no CI — open the file, see the green/red.

## Known limitations

- **Score creep is an active calibration target.** AI scoring tends to drift higher than the design target on the included MCT test corpus. The critic pass caps egregious cases, but a CISO running a real assessment may still see inflated aggregates. The dispute-and-re-analyze workflow is the human safety net; it's not optional.
- **No batch mode.** Each assessment is a single-tab session in `localStorage`. There's no multi-tenant model, no multi-user collaboration, no shared backend.
- **API key lives in the browser.** It's stored in `localStorage` and sent only to `api.anthropic.com` directly. Fine for solo or trusted use; not appropriate for a production multi-user deployment.
- **Anthropic-only.** Earlier exploratory versions had Gemini and OpenAI options; they were removed because they hadn't been tested end-to-end. Re-adding either is a small change to the dispatch in `_callAIDispatch`.
- **No automated benchmarking corpus.** Industry "peer comparison" is intentionally a "not enough data" notice — until enough anonymized assessments exist to build a real distribution, fabricated quartiles would be misleading.

## Roadmap

Active development items, in rough priority order:

1. **Live demo on GitHub Pages** so visitors can click through demo mode without an API key.
2. **Year-over-year trajectory** — the test corpus includes a 2024 prior-assessment file showing aggregate 2.4; the report should display "2.4 → today's score" prominently.
3. **AI-flagged "needs review" findings** with a focused review surface (review only the small set the AI itself is uncertain about, bulk-approve the rest).
4. **Auto-generated executive summary** at the top of the report (board-language, no subcategory IDs, dispute-aware).
5. **Strengths and weaknesses called out by function** in the report's executive section, not just aggregate scores.
6. **Documents-analyzed and questionnaire-answers appendices** in the report so reviewers can audit the AI's evidence-to-finding chain.
7. **Score recalibration via test corpus regression** — a lightweight harness that runs the MCT corpus and asserts function scores stay within ±0.25 of the maturity-profile targets. Would catch prompt drift before it ships.
8. **Better mobile layout** — the report and findings-review pages assume desktop width.

## License

MIT. See [`LICENSE`](LICENSE).
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     