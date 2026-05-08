# MCT Target Maturity Profile (CSF 2.0)

**Document purpose:** Establishes the target CMMI scores for each function and category of the NIST CSF 2.0 assessment of Meridian Care Technologies, Inc. (MCT), and provides the rationale for each. This profile is the calibration sheet for the test corpus — when the assessment tool produces scores, compare against these targets.

**Aggregate target:** **CMMI 2.65** (Tier 2 / approaching lower-Tier 3) across all 106 in-scope subcategories. This profile is calibrated to fall meaningfully below an exemplary score (~3.8, representative of a global, well-funded, mature industrial enterprise) while remaining defensibly above industry-typical mid-market healthcare SaaS performance.

---

## Function-Level Targets

| Function | Target CMMI | Tier | Aggregate impact | Score driver |
|---|---|---|---|---|
| **GV — Govern** | 3.10 | T3 | +0.07 above aggregate | HIPAA Security Rule + Board engagement after Pebble Phish forces strong governance posture; deliberate weakness in GV.SC continuous monitoring drags GV from a 3.3 to 3.1 |
| **ID — Identify** | 2.85 | T3 | +0.05 | Asset inventories solid (recent automation); deliberate weakness in ID.RA (no formal threat-modeling cadence — FY26 priority 8) drags ID from a 3.0 to 2.85 |
| **PR — Protect** | 2.80 | T3 | +0.04 | IAM, training, encryption are mature; legacy on-prem ETL cluster (decommission Q4 2026) drags PR.PS specifically; deliberate weakness in patient-portal CIAM step-up auth (R8) drags PR.AA marginally |
| **DE — Detect** | 2.30 | T2 | -0.08 | SIEM operational with all critical sources; alert tuning debt (R3, ~28% FP rate); detection use cases for legacy ETL incomplete (R4); 7 use cases in active tuning, 3 in backlog |
| **RS — Respond** | 2.70 | T2 | +0.01 | IR plan tested 4x/year via tabletop; one real incident (Pebble Phish) gives strong artifacts; service-account incident runbooks identified as Q1 2026 gap |
| **RC — Recover** | 2.05 | T2 | -0.09 | Deliberate weak spot. One full DR failover test/year, single-service scope (Aurora ToC tier only), April 2025 test exceeded P1 RTO target end-to-end (5h12m vs 4h target). Population Insights warm-DR gap (R6). |
| **Aggregate** | **~2.63** | **T2** | (target is 2.65; profile lands within ±0.05) | |

## Category-Level Targets

### GOVERN (target 3.10; range 1.5–3.75 by category)

| Category | Target CMMI | Rationale |
|---|---|---|
| GV.OC — Organizational Context | 3.50 | Mission documented and Board-engaged; HIPAA BA scope explicit; legal/regulatory landscape understood; customer-and-stakeholder needs articulated. Strong evidence in backgrounder + business case + board minutes. |
| GV.RM — Risk Management Strategy | 3.25 | Risk Appetite Statement v2.0 with quantitative thresholds; FAIR ALE methodology; Board-approved appetite; cyber risk register operational with monthly Steering Committee + quarterly Board review. |
| GV.RR — Roles, Responsibilities & Authorities | 3.50 | Charter formalizes CISO authority including halt-and-rollback; HIPAA Security Official + Privacy Officer designations explicit; dual-evaluation structure for CISO independence. |
| GV.PO — Policy | 3.25 | Policy hierarchy in place; annual review cycle; AUP acknowledged 100%; subordinate policies aligned. |
| GV.OV — Oversight | 3.00 | Quarterly Audit & Risk Committee + monthly Steering Committee; KPI-based oversight; FY26 strategy themes Board-approved. |
| GV.SC — Supply Chain Risk Management | **2.10** | **Deliberate weakness.** Annual reassessment cadence + spotty continuous monitoring (only AWS/Okta/Snowflake on Vanta feed); program redesigned Q1 2026 but expansion to Tier-2 vendors planned for Q3 2026 — still in flight at time of assessment. Change Healthcare event illustrative. |

### IDENTIFY (target 2.85; range 2.0–3.5 by category)

| Category | Target CMMI | Rationale |
|---|---|---|
| ID.AM — Asset Management | 3.25 | Hardware/software/data/supplier inventories maintained with automation (Jamf, Intune, Wiz, Vanta); legacy ETL cluster acknowledged as exception with compensating controls (CRA-LegacyETL-2025); decommission tracked. |
| ID.RA — Risk Assessment | **2.50** | **Deliberate weakness.** Cyber risk register and FAIR ALE operational, but no formal threat-modeling cadence per release/service-tier; first quarterly threat-modeling forum scheduled FY26. SOC 2 / HIPAA SRA done annually; pentest annual. |
| ID.IM — Improvement | 3.00 | Pebble Phish lessons-learned cycle visible; KPI improvement quarter-over-quarter; FY26 strategy themes responsive to identified gaps; first external CSF assessment is itself an improvement input. |

### PROTECT (target 2.80; range 1.75–3.5 by category)

| Category | Target CMMI | Rationale |
|---|---|---|
| PR.AA — Identity & Access Control | 3.25 | FIDO2 phishing-resistant MFA fully enforced for production-access roles since Q4 2025; SCIM provisioning from Workday with 4h SLA; PAM with JIT elevation; quarterly access reviews at 98% on-time. R8 patient-portal step-up auth (Auth0) drags PR.AA-03 specifically. |
| PR.AT — Awareness & Training | 3.00 | 100% annual completion; 97% role-based; quarterly phishing sims (click 2.4%, report 48%); KnowBe4 LMS + SANS/SecureCodeWarrior for technical roles. |
| PR.DS — Data Security | 2.75 | Encryption at rest (KMS-CMK) + in transit (TLS 1.2+ + mTLS east-west); data classification policy operational; DLP for PHI egress in design (not yet operational). |
| PR.PS — Platform Security | **2.25** | **Drag from legacy ETL.** EKS production hardened with CIS benchmarks + Wiz drift detection; legacy on-prem ETL cluster manually patched, outside central asset automation, with compensating controls only. Decommission Q4 2026. |
| PR.IR — Infrastructure Resilience | 2.75 | Multi-AZ + cross-region DR; service-tier RTO/RPO commitments documented; tested annually but at scope-limited level (R2 — see RC). |

### DETECT (target 2.30; range 2.0–2.5 by category)

| Category | Target CMMI | Rationale |
|---|---|---|
| DE.CM — Continuous Monitoring | 2.50 | All critical log sources to Datadog SIEM; CrowdStrike Falcon EDR; Wiz CSPM; 24x7 MDR via Arctic Wolf overnight (tier-1 handoff to MCT staff during business hours). Legacy ETL telemetry partial (R4). |
| DE.AE — Adverse Event Analysis | **2.10** | **Deliberate weakness.** 32 detection use cases catalogued; 22 production / 7 in active tuning / 3 in backlog. ~28% FP rate on tier-1 alerts (R3) — Q1 2026 dedicated tuning sprint planned. Composite/correlation rules underdeveloped (Q4 2025 tabletop surfaced this). |

### RESPOND (target 2.70; range 2.5–3.0 by category)

| Category | Target CMMI | Rationale |
|---|---|---|
| RS.MA — Incident Management | 3.00 | IR Plan v5.2 mature; severity matrix with concrete examples; 4 tabletops/year; 1 real incident (Pebble Phish) with full case file + lessons learned. CISO declares severity. |
| RS.AN — Incident Analysis | 2.75 | Forensic capability via CrowdStrike + Datadog; root-cause analysis structured; chain-of-custody procedures documented. Service-account incident runbooks identified as gap from Q4 2025 tabletop. |
| RS.CO — Incident Communication | 2.50 | HIPAA Breach Notification Rule §164.402 four-factor workflow; customer notification SLAs; insurer (Beazley) notification path. Runbooks for customer-by-customer notification exist but communication tooling not fully automated. |
| RS.MI — Incident Mitigation | 2.50 | Containment playbooks for credential compromise (validated by Pebble Phish), endpoint isolation via CrowdStrike, Okta session revocation. |

### RECOVER (target 2.05; range 1.75–2.50 by category)

| Category | Target CMMI | Rationale |
|---|---|---|
| RC.RP — Recovery Plan Execution | **1.85** | **Deliberate weakness.** DRP exists; one full failover test/year (April 2025); database tier RTO achieved (3h47m within 4h P1 target) but end-to-end RTO exceeded target (5h12m). Single-service scope (ToC only); other P1 services not tested at full failover; Population Insights warm-DR gap (R6). |
| RC.CO — Recovery Communication | 2.50 | Customer-facing communication paths defined; status-page tooling integrated; PR/communications playbook at GC + VP CS owner level. Less mature than IR communication because exercised less often. |

## Aggregate Score Calculation

Aggregate is computed as the simple average of all 106 subcategory scores. Function and category subtotals roll up by simple average of their subcategories. The deliberate weaknesses in GV.SC (2.10), ID.RA (2.50), DE.AE (2.10), RC.RP (1.85), and PR.PS (2.25) anchor the lower bound; the strengths in GV.RR (3.50), GV.OC (3.50), and PR.AA (3.25) anchor the upper bound.

**Targeted distribution (across all 106 subcategories):**

| Score band | Approx. count | Examples |
|---|---|---|
| 1.0–1.99 | ~6 | RC.RP-04 (recovery scope), GV.SC-09 (life-cycle monitoring), DE.AE-08 (incident scope-determination at scale) |
| 2.0–2.49 | ~22 | DE.AE-* generally; PR.PS-01,03,05; GV.SC-04,07,08; RC.RP-01,02,03 |
| 2.5–2.99 | ~38 | DE.CM-*, RS.AN-*, RS.CO-*, PR.IR-*, PR.DS-* |
| 3.0–3.49 | ~32 | GV.OC-*, GV.RM-*, GV.PO-*, GV.OV-*, ID.AM-*, PR.AA-*, PR.AT-*, RS.MA-* |
| 3.5–4.0 | ~8 | GV.RR-01,02; GV.OC-01; PR.AA-01,02; ID.AM-08 |

## Comparison Anchors

- **Mature industrial-enterprise reference point:** aggregate ~3.8 — exemplar for a global, well-funded, century-old industrial company. Not the right comparator for MCT.
- **Typical mid-market healthcare SaaS:** aggregate 2.0–2.4 in self-assessment; 1.8–2.2 in independent assessment. MCT at 2.65 is above-average for segment.
- **HITRUST CSF r2-certified mid-market healthcare SaaS:** aggregate 2.7–3.1 typical. MCT is targeting r2 by Sep 2026; current aggregate aligns with the lower edge of the certified-firm distribution.
- **Prior MCT 2024 self-assessment:** aggregate 2.4 (see RPT-Prior-CSF-Self-Assessment-2024). Trajectory of +0.25 over 18 months reflects FIDO2 program, MDR adoption, supplier program redesign, and risk management formalization.

## Validation Approach

When the test tool produces actual scores, compare against this profile. Acceptable variance:

- Function-level: ±0.20
- Category-level: ±0.30
- Subcategory-level: ±0.50

Variance outside these bounds indicates either (a) a flaw in the evidence corpus, (b) a flaw in the tool's scoring logic, or (c) a defensible interpretation difference worth investigating.

## Document Control

| Field | Value |
|---|---|
| Document ID | MAT-PROFILE-MCT-2026 |
| Version | 1.0 |
| Author | Test corpus design (synthetic) |
| Status | Calibration target |
