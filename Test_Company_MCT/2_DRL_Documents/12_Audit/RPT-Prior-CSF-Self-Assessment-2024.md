# Prior NIST CSF Self-Assessment — 2024 Baseline

**Document ID:** RPT-CSF-SELFASSESS-2024
**Version:** 1.0 (final, archived)
**Assessment period:** Calendar year 2024 (point-in-time as of December 15, 2024)
**Assessment dates:** November 18 – December 15, 2024
**Report issued:** January 27, 2025
**Assessment framework:** NIST CSF 2.0 (released February 2024; this was the first MCT assessment against 2.0)
**Methodology:** Internal self-assessment. Not externally validated. Performed by the GRC team with input from control owners.
**Lead:** Jordan Park, GRC Manager
**Reviewed by:** Sarah Yoon, CISO
**Approver:** Sarah Yoon, CISO; Audit & Risk Committee endorsement at Q1 2025 meeting
**Distribution:** Audit & Risk Committee; Steering Committee; HITRUST assessor (Coalfire) for trajectory reference under NDA
**Classification:** Internal — Distribution Limited

---

## 1. Purpose

This report documents the 2024 internal self-assessment of MCT's cybersecurity program against the NIST Cybersecurity Framework 2.0. It serves as the **baseline trend reference** against which the 2026 assessment cycle will be measured. The 2024 assessment was the first time the Company applied CSF 2.0 (the new GOVERN function had been finalized in February 2024).

The 2024 assessment was performed entirely internally, by the GRC team with control-owner input. **It was not externally validated.** The 2026 assessment cycle is the Company's first attempt at a more structured assessment with external dimensions through the HITRUST validation process and the SOC 2 Type II report.

## 2. Scoring Approach

The 2024 assessment used a CMMI-style 1–5 scale per subcategory, aggregated to category and function levels:

| Score | Maturity descriptor |
|---|---|
| 1 | Initial — ad-hoc, undocumented |
| 2 | Repeatable — documented, inconsistent execution |
| 3 | Defined — documented, consistent execution, measured |
| 4 | Managed — measured and continuously improved |
| 5 | Optimizing — fully integrated and predictive |

Scoring was at the subcategory level; category and function scores are arithmetic averages of in-scope subcategories. Out-of-scope subcategories (e.g., GV.SC for direct manufacturing) are not present in MCT's profile.

## 3. Aggregate Result

**Overall aggregate maturity (2024 baseline): 2.4 (Repeatable — approaching Defined).**

Functional breakdown:

| CSF 2.0 Function | 2024 score | Notes |
|---|---|---|
| GOVERN (GV) | 2.5 | Mature in GV.OC (organizational context) and GV.PO (policy); weak in GV.SC (supply chain) and GV.OV (oversight metrics) |
| IDENTIFY (ID) | 2.4 | ID.AM acceptable; ID.RA drags from absence of formal threat-modeling cadence |
| PROTECT (PR) | 2.7 | Strongest function in 2024 — PR.AA, PR.PS, PR.DS, PR.IR all in the 2.5–3.0 range |
| DETECT (DE) | 2.0 | Weak — DE.AE coverage gaps; DE.CM tuning early-stage |
| RESPOND (RS) | 2.5 | Pebble Phish March 2024 exercised RS in production; PIR program operating but not yet quarterly tabletop cadence |
| RECOVER (RC) | 1.9 | Weakest function — RC.RP-01 1.7 driven by recovery testing scope; RC.CO not yet defined |

### 3.1 Subcategory weak spots (1.5–2.0 range)

| Subcategory | 2024 score | Why |
|---|---|---|
| GV.SC-04 | 1.8 | Vendor reassessment program centered on annual; no continuous-monitoring feeds |
| GV.SC-05 | 1.8 | No formal supplier risk taxonomy beyond Tier-1/2/3; no SLA on reassessment cadence |
| GV.SC-07 | 1.7 | Limited continuous monitoring of supplier security posture beyond Vanta-fed Tier-1 |
| ID.RA-04 | 2.0 | No formal threat-modeling cadence per release |
| DE.AE-02 | 2.0 | Composite correlation rules narrow; some scenarios manual |
| DE.AE-06 | 1.9 | Snowflake-side detection use cases incomplete |
| DE.CM-09 | 2.1 | Endpoint coverage solid; cloud-CM tuning ongoing |
| **RC.RP-01** | **1.7** | **Recovery testing depth — single-service annual scope** |
| RC.RP-04 | 1.8 | Recovery operations not yet exercised at scale |
| RC.CO-03 | 1.6 | Customer recovery communication procedures documented but not exercised |
| RS.MA-04 | 2.1 | Some IR runbooks drift |

### 3.2 Subcategory strengths (3.0+ range)

| Subcategory | 2024 score | Why |
|---|---|---|
| GV.PO-01, GV.PO-02 | 3.2 | Mature policy hierarchy with annual review |
| GV.RR-02, GV.RR-03 | 3.0 | Roles documented; Steering Committee operating |
| PR.AA-01 | 3.0 | Okta IDP mature; quarterly access reviews 98% completion |
| PR.AA-04 | 3.0 | MFA universal for human accounts; FIDO2 phased rollout in flight |
| PR.PS-04 | 3.1 | Vulnerability scanning mature (Wiz, Snyk, GHAS) |
| PR.IR-01 | 3.0 | AWS network architecture mature |
| RS.CO-02 | 3.0 | Pebble Phish demonstrated effective stakeholder communication |

## 4. 2024 Trajectory and Commitments

The 2024 self-assessment surfaced the same triad that the 2026 assessment is expected to confirm as residual weaknesses: **GV.SC, DE, and RC**. The Company committed at the time to a multi-year program to address these:

| Weak area | 2024 commitment | 2025–2026 progress |
|---|---|---|
| GV.SC | Redesign vendor program with continuous-monitoring expectations; expand Vanta feeds | Vanta Tier-1 feeds expanded 2025; Tier-2 expansion FY26 (R1 funded) |
| ID.RA-04 | Introduce quarterly threat-modeling forum | Forum charter drafted Q4 2025; first session Q1 2026 |
| DE.AE / DE.CM | Alert tuning sprint; expand DE.AE coverage | Q1 2026 dedicated sprint funded (R3) |
| RC.RP-01 | Add recovery test scope and cadence | April 2025 ToC test executed (RPT-Recovery-Test-Results-2025); FY26 adds 1 additional + 2 tabletops (R2) |
| RS.MA-04 | Quarterly IR tabletop cadence | Achieved 2025 — 4 tabletops |

## 5. Limitations of the 2024 Self-Assessment

This assessment was internally performed without independent validation. Acknowledged limitations:

1. **Self-scoring bias.** Internal scoring may overstate maturity. The 2026 cycle will be cross-referenced against external inputs (SOC 2 Type II, HITRUST validated assessment when complete, internal audit findings).
2. **Subjective interpretation of CSF 2.0 subcategory text.** Where multiple reasonable interpretations existed, the GRC team documented the chosen interpretation in the assessment workpaper.
3. **Evidence sampling.** Sampling depth was limited by GRC capacity at the time (3 FTE in GRC role; the GRC Manager performed the assessment with input from other staff).
4. **CSF 2.0 was new.** This was the first cycle with the GOVERN function as a separate scoring construct. Some category interpretations were refined for the 2026 cycle.

## 6. Trajectory to 2026

The 2024 baseline of 2.4 aggregate, with weaker GV.SC (~1.8), RC.RP (~1.7), and DE (~2.0), establishes the trajectory against which the 2026 cycle should be measured. The 2026 target aggregate (working assumption based on the FY25–FY26 program) is approximately **2.65**, with continued deliberate weakness in:

- **RC (~2.05)** — recovery testing depth remains below program aspiration; FY26 / FY27 are the path forward (R2; R6).
- **RS (~2.70)** — incident response is mature in the after-action sense (Pebble Phish was handled well; quarterly tabletops operating) but maturity in sub-areas (RS.MA runbook hygiene; RS.AN forensic depth) is uneven.
- **GV.SC** — supplier continuous monitoring is funded for FY26 but not yet at target (R1).
- **DE.AE / DE.CM** — Q1 2026 alert-tuning sprint will improve scores but not to peer-leading by mid-2026 (R3).

The trajectory is **honestly upward** in most dimensions, with explicit, board-acknowledged trailing edges that are tracked in the cyber risk register and funded for FY26.

## 7. Sign-Off

| Role | Name | Date |
|---|---|---|
| Lead assessor | Jordan Park, GRC Manager | 2025-01-27 |
| CISO | Sarah Yoon | 2025-01-27 |
| Audit & Risk Committee endorsement | Chair: K. Chen | 2025-02-12 (Q1 meeting) |

## 8. Linked Documents

- POL-001 Information Security Policy
- RISK-Cyber-Risk-Register
- RPT-Internal-Audit-Cybersecurity-2025
- RPT-Recovery-Test-Results-2025
- RPT-IR-Tabletop-Q4-2025
- LOG-Incident-Case-File-Pebble-Phish-2024-03

## 9. Document Control

| Version | Date | Author | Change summary |
|---|---|---|---|
| 0.5 | 2025-01-08 | J. Park | Draft scoring sheet |
| 0.9 | 2025-01-20 | J. Park | Control-owner review incorporated |
| **1.0** | **2025-01-27** | **J. Park** | **Final issue; baseline archived for trajectory reference** |
