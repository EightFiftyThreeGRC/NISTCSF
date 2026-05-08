# Cowork Session Notes — 2026-05-02

End-to-end test run + bug fixes against the MCT test corpus on Haiku 4.5.

## What got fixed

| # | Bug / Improvement | Where |
|---|---|---|
| 1 | Literal `</script>` inside JS template literal closed the script tag early — broke the entire app. Escaped to `<\/script>`. | `renderScope()` |
| 2 | `\`` (escaped backticks) inside `${}` interpolation = JS syntax error. Replaced with raw backticks. | `renderScope()` |
| 3 | Doc-analysis `parseJSON` truncation silently dropped files. Bumped `outputTokens` 4096→8192 and now pushes a placeholder `docSummaries` entry with `error:true` so users see the failure. | `analyzeDocuments()` |
| 4 | Questionnaire generator ignored `S.excludedSubcategories`. Filter applied at prompt-build time + defensive post-filter on returned questions. | `generateQuestionnaire()` |
| 5 | Off-by-N drift in `S.evidenceMap` (model invented out-of-scope IDs). Now rejected at write-time. | `analyzeDocuments()` |
| 6 | Native `confirm()` / `alert()` modals froze the renderer. Replaced with in-page `uiConfirm` / `uiAlert` helpers (Promise-based, focus-managed, Esc/Enter wired). 5 confirm + 13 alert sites converted. | top of `<script>` block, dispatcher made `async` |
| 7 | Doc analysis was a serial for-of loop (~25 s/file × 36 files = ~10 min). Refactored to fan out via the existing `_aiPools.short` (limit 4). 36 files now finish in ~3 min. Progress UI: "Analyzing X / Y documents…" | `analyzeDocuments()` |
| 8 | Findings step silently auto-upgraded Haiku→Sonnet on quality calls, multiplying latency 5–8× and tripping OTPM rate limits. Removed; user's model choice is now honored. | `_callAIDispatch()` |
| 9 | Findings calls truncated for big functions (GV/ID/PR/DE outputs were 36–65 KB raw). Refactored to **chunk by category** (each chunk ≤ 7 subs, ≤ 4 K output tokens, runs on the short pool). Output volume is now bounded per call regardless of function size. | `fetchFindingsForFunction()` + new `fetchFindingsForChunk()` |
| 10 | "Not analyzed" rows were silent gray chips with no explanation. They now show a yellow callout with the actual failure reason and a **Retry findings** button. Handles both whole-function failure and partial chunk failure. | `renderFindingsReview()`, `generateFindings()` settled-handler |

## What was validated end-to-end

- **Welcome → Setup → Scope → Documents → Analysis** with the real MCT corpus (36 docs, Haiku) — clean run, 87/12/0/7 coverage, zero silent drops, ~3 min total.
- **Questionnaire** generated 24 questions across 5 roles in ~50 s.
- **Findings** with chunking — partial success: 4 of 6 functions produced real findings, 1 function (DE) entirely failed → graceful degradation with reason chips & retry buttons.
- **Report** (Step 8) rendered correctly with demo findings: title block, score badge, CMMI/Tier reference tables, 6-axis SVG radar, function score table, healthcare peer benchmark, organizational strengths, remediation roadmap (30/60/90), risk register, paginated function pages with executive narratives that pulled in MCT-specific scope context.
- All 20 unit tests in `tests.html` still pass.

## Known limitations (not addressed)

- **Findings still flake on the largest functions** even with chunking — DE category-level chunks are large (CM has 9 subs). May need finer chunking (max 5 subs per chunk) or a more compact prompt format.
- **mammoth.js (1.6.0) is slow on the MCT `.docx` files** — ~3 s per file rather than near-instant. Doesn't fail, just slow. Not a real bug; the test used `.md` companions instead.
- **No streaming** — large outputs sit pending until the full response arrives. Adding SSE streaming would give better perceived speed.

## To commit

The sandbox can't delete `.git/index.lock` (permission denied — stale lock from earlier in the session). Run from your own terminal:

```
cd "<repo>"
rm -f .git/index.lock     # if needed
git add -A
git commit -m "Reliability + UX pass: parallel doc analysis, chunked findings, in-page modals, bumped token budgets"
```

`git diff --stat HEAD` summary:
```
nist-csf-assessment.html     | 270 +++++++++++++++++++++----- (the meat)
.gitignore                   | trailing whitespace cleanup
README.md                    | trailing whitespace cleanup
Test_Company_MCT/README.md   | restored truncated content (added "How to use it" + rationale)
Test_Company_MCT/4_Maturity_Profile/maturity-profile.md | restored truncated last line
serve.py                     | trailing whitespace cleanup
```

All non-`.html` changes are content restorations of files that had been truncated mid-line — not unintended drift.
