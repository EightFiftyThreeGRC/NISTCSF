# Test_Company_MCT — Calibrated Synthetic Test Corpus

This folder is a **deliberately calibrated synthetic test corpus** for validating the NIST CSF 2.0 Guided Assessment tool. It is not a real company. "Meridian Care Technologies, Inc." (MCT) is a fictional mid-market healthcare-SaaS organization invented to exercise the assessment workflow end-to-end.

## What it tests

Run the assessment tool against this corpus (Documents step → upload everything in `2_DRL_Documents/` and `1_Case_Study/`) and compare the produced scores to the targets in `4_Maturity_Profile/maturity-profile.md`. The corpus is calibrated so a working tool should land in a known, narrow band rather than producing arbitrary scores.

**Aggregate target: CMMI ~2.65** (Tier 2, approaching lower Tier 3) across 106 in-scope subcategories. Function targets are listed in the maturity profile; they range from 2.05 (Recover, the weakest function by design) to 3.10 (Govern, the strongest).

## Intentional weaknesses baked into the corpus

These are the diagnostic signals the assessment tool should surface. If the tool can't find them, something is wrong with the prompt, evidence parsing, or scoring:

- **GV.SC (Supply Chain Risk Management)** — supplier reassessment cadence is documented but operationally lapsed (~60% completion vs 90% target). A working tool should score this in the 1.75–2.25 band, not at policy-document parity (3.0+).
- **RC.RP (Recovery Plan Execution)** — one DR failover test per year, single-service scope, April 2025 test exceeded the P1 RTO. A working tool should score this in the 1.5–2.0 band.
- **ID.IM (Improvement)** — formal threat-modeling cadence is absent (FY26 priority); improvement loop is informal. A working tool should score this in the 2.0–2.5 band.

The prompt engineering iterations on this tool were validated by running this corpus and checking whether these weaknesses showed up at the expected magnitude. Score creep is the most common failure mode: the AI sees "policy exists" and scores 3.0+ even when operational evidence shows the policy isn't being followed.

## Folder layout

```
Test_Company_MCT/
  1_Case_Study/             — Background docs the AI reads first (business case, KPIs, financials, narrative)
  2_DRL_Documents/          — The 12-category Document Request List the tool ingests as evidence:
    01_Governance/          —   policies, charters, audit committee minutes
    07_Vendor/              —   third-party risk program, supplier criticality tiering
    08_Monitoring/          —   SIEM standards, detection playbooks, alert triage
    09_Vuln_Mgmt/           —   patch policy, pentest exec summary, vuln scan results
    (and the re