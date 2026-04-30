# NIST CSF 2.0 Guided Assessment Tool — Project To-Do

## What This Tool Is

An AI-powered, wizard-guided NIST CSF 2.0 assessment tool. It is **not** a pure self-assessment (users don't just click scores). Instead, it replicates the professional consulting process:

1. Users upload real evidence documents (the DRL)
2. AI analyzes the documents and maps them to CSF 2.0 subcategories
3. AI generates a targeted questionnaire (replacing consultant interviews) to fill evidence gaps
4. User answers the questionnaire
5. AI generates draft findings per subcategory (score + rationale + recommendation)
6. User reviews and vets each finding (approve or dispute)
7. AI generates a final executive and technical report

Backed by the **Claude API** — user provides their own API key (or the tool can be deployed with a shared key).

---

## Architecture Decision: Single HTML File

- Pure HTML + vanilla JS, no build step, no server needed
- PDF.js (CDN) for PDF text extraction
- mammoth.js (CDN) for Word document text extraction
- Fetch API for Claude API calls
- LocalStorage for session persistence and API key
- Print CSS + JSON export for report output

---

## 8-Step Wizard Flow

| Step | Name | Description |
|------|------|-------------|
| 1 | Welcome | Intro, API key input, model selector |
| 2 | Setup | Org info, industry, scope, scoring method, functions to include |
| 3 | DRL Upload | Upload documents across 12 evidence categories |
| 4 | AI Analysis | AI maps documents to subcategories, shows evidence coverage + gaps |
| 5 | Questionnaire | AI generates 25–35 targeted questions; user answers by role |
| 6 | Findings Gen | AI generates per-subcategory findings (CMMI + Tier score, rationale, recommendation) |
| 7 | Findings Review | User approves or disputes each finding; disputes trigger AI re-analysis |
| 8 | Report | Executive summary, heat map, radar chart, full subcategory table, export |

---

## To-Do List

### Phase 1 — Core Structure

- [ ] **HTML skeleton** — app shell, loading overlay, step container, event delegation setup
- [ ] **CSS** — wizard progress bar, card layout, CMMI score badges (color-coded), function color scheme, print stylesheet
- [ ] **CSF 2.0 Data** — all 106 subcategories in JS data structure (organized by function → category → subcategory)
- [ ] **DRL Category Data** — 12 document categories, each with: name, description, expected document examples, relevant CSF functions
- [ ] **State management** — global state object + localStorage save/load + session restore on reload

### Phase 2 — Step Renderers

- [ ] **Step 1: Welcome** — hero copy, API key input (masked), model selector (haiku vs. sonnet), start/load buttons
- [ ] **Step 2: Setup** — org name, industry dropdown, scope textarea, date, scoring method radio (CMMI / Tiers / Both), function checkboxes
- [ ] **Step 3: DRL Upload** — 12 category cards, each with: expected docs list, drag-and-drop upload zone, uploaded files list with remove, skip toggle; overall progress indicator; "Analyze Documents" button
- [ ] **Step 5: Questionnaire** — role tabs (CISO, IT Lead, Risk Manager, HR, Legal, Vendor, BC Lead, SOC), question cards with appropriate input type (likert / yes-no / multi-choice / free text), progress tracker, "Submit" button
- [ ] **Step 7: Findings Review** — function tabs, subcategory finding cards (score badge, rationale, recommendation, approve/dispute buttons), dispute modal with free-text + re-analyze, status summary bar (X approved / Y disputed / Z pending), "Generate Report" button
- [ ] **Step 8: Report** — executive summary, overall score card, function scores heat map table, SVG radar/spider chart (6 functions), top-10 gaps table, 30/60/90-day priority roadmap, full subcategory detail table (collapsible by function), print button, JSON export button

### Phase 3 — AI Integration (Claude API)

- [ ] **API client** — `callClaude(messages, system)` with error handling, retry logic, JSON extraction helper (strips markdown code fences)
- [ ] **Document analysis prompt** — per-document call; returns `{ document_type, document_summary, mappings: { subcategoryId: { evidence_quality, excerpt, notes } } }`
- [ ] **Evidence aggregation** — after all documents analyzed, build per-subcategory evidence map; classify each subcategory as Strong / Adequate / Weak / Missing
- [ ] **Gap detection** — identify subcategories with Missing or Weak evidence → pass to questionnaire generator
- [ ] **Questionnaire generation prompt** — takes gap list + confirmed evidence + org context; returns role-grouped questions mapped to subcategory IDs
- [ ] **Findings generation prompt** — runs per function (6 calls); takes document evidence + questionnaire answers; returns per-subcategory `{ current_state, gaps, cmmi_score, tier_score, rationale, recommendation, priority, evidence_used }`
- [ ] **Dispute re-analysis prompt** — takes original finding + user's dispute explanation + any new context; returns revised finding or confirms original with explanation

### Phase 4 — Scoring & Visualization

- [ ] **Score rollup logic** — subcategory → category average → function average → overall composite (CMMI and Tier)
- [ ] **Heat map table** — category scores with color coding: 1–1.9 red, 2–2.9 orange, 3–3.4 yellow, 3.5–4.4 light green, 4.5–5 green
- [ ] **SVG radar chart** — 6-axis spider chart for function scores, rendered in pure SVG (no library needed)
- [ ] **Score distribution histogram** — how many subcategories at each CMMI level
- [ ] **Priority matrix** — top gaps ranked by severity and estimated remediation effort

### Phase 5 — Report & Export

- [ ] **Report HTML** — structured as: Executive Summary → Function Summaries → Category Detail → Full Subcategory Table → Appendix
- [ ] **Print stylesheet** — clean A4/Letter layout, page breaks between sections, no buttons visible
- [ ] **JSON export** — full assessment state (org info, evidence map, questionnaire responses, findings, scores) for archive or future re-import
- [ ] **Session resume** — on load, detect saved session in localStorage and offer to resume

---

## DRL Categories (12)

| # | Category | Relevant Functions |
|---|----------|--------------------|
| 1 | Governance & Policy | GV |
| 2 | Risk Management | GV, ID |
| 3 | Asset Management | ID |
| 4 | Access Control & Identity | PR |
| 5 | Training & Awareness | PR |
| 6 | Data Security & Architecture | PR |
| 7 | Vendor & Supply Chain | GV, ID |
| 8 | Monitoring & Detection | DE |
| 9 | Vulnerability Management | ID, PR |
| 10 | Incident Response | RS |
| 11 | Business Continuity & Recovery | RC |
| 12 | Audit & Assessment | GV, ID |

---

## Scoring Options (User Chooses at Setup)

| Option | Description |
|--------|-------------|
| CMMI 1–5 | Finer granularity; best for executive/board audiences |
| CSF Tiers 1–4 | NIST-native; best for framework purists |
| Both (recommended) | Show both side by side with CMMI primary |

CMMI ↔ Tier approximate mapping: 1→T1, 2→T1-2, 3→T3, 4→T3-4, 5→T4

---

## Key Claude API Prompts to Build

### 1. Document Analysis
**Goal**: Map a single document to CSF 2.0 subcategories with evidence quality ratings.
**Model**: haiku (fast, cheap, runs per-document)
**Output**: `{ document_type, document_summary, mappings: { [subcategoryId]: { evidence_quality, excerpt, notes } } }`

### 2. Questionnaire Generation
**Goal**: Generate 25–35 targeted questions based on evidence gaps, grouped by role.
**Model**: sonnet (quality matters here)
**Output**: `{ roles: [ { role, description, questions: [ { id, text, type, options?, subcategories, guidance } ] } ] }`

### 3. Findings Generation (per function)
**Goal**: Generate per-subcategory findings with scores and recommendations.
**Model**: sonnet (6 calls, one per function)
**Output**: `{ [subcategoryId]: { current_state, gaps, cmmi_score, tier_score, rationale, recommendation, priority, evidence_used } }`

### 4. Dispute Re-Analysis
**Goal**: Reconsider a finding given the user's objection or additional context.
**Model**: sonnet
**Output**: Same finding schema as above, plus `dispute_resolution` field

---

## Key Design Principles (from NIST CSF Advisor skill)

- Questions should reveal **"paper vs. practice"** gaps — don't ask what documents already confirm
- Each questionnaire question maps to 1–3 subcategory IDs in the backend (users never see IDs)
- Findings should be framed around **risk exposure**, not compliance language
- Executive summary leads with **strengths first**, then gaps
- Recommendations must be **specific and actionable** (not "implement monitoring")
- Disputed findings: if user provides new evidence → adjust score; if no new evidence → note owner position in report but maintain score

---

## File to Create

**Filename**: `nist-csf-assessment.html`
**Location**: This folder (`NIST CSF assessment tool/`)
**Dependencies (CDN)**:
- PDF.js: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js`
- PDF.js worker: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`
- mammoth.js: `https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js`

---

## Session Notes

- Framework version: **CSF 2.0** (Feb 2024) — 6 functions, 22 categories, 106 subcategories
- The GOVERN function is new to 2.0; it sits above the other 5 and covers org context, risk strategy, roles, policy, oversight, supply chain
- CSF numbering has intentional gaps (e.g., ID.AM-06 was removed, DE.CM skips numbers) — data should reflect the actual published subcategory IDs, not fill in gaps
- This tool was designed using the `nist-csf-advisor` skill installed in Cowork — re-invoke it in future sessions for deep CSF methodology guidance
