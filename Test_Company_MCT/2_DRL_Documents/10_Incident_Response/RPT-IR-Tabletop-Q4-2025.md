# Q4 2025 Incident Response Tabletop — After-Action Report

**Document ID:** RPT-IR-TT-2025-Q4
**Version:** 1.0
**Exercise date:** November 13, 2025, 13:00–16:30 ET
**Report issued:** November 21, 2025
**Report owner:** Marcus Tan, Security Engineer (Detection & Response)
**Reviewed by:** Sarah Yoon, CISO; Marcus Holbrook, GC; Jordan Park, GRC Manager
**Distribution:** Steering Committee; Audit & Risk Committee (summary)
**Classification:** Internal — Distribution Limited

---

## 1. Purpose and Scope

This after-action report documents the Q4 2025 incident response tabletop exercise conducted under PLN-IR-01 §6.1. The exercise satisfies the quarterly tabletop requirement of POL-001 §3.12 and is the fourth IR tabletop of calendar year 2025 (prior: Q1 ransomware-on-EKS; Q2 internal-account compromise; Q3 third-party vendor breach).

The scenario was chosen to exercise the seam between MCT's detection stack and a third-party (Snowflake) where credential exposure originated outside MCT's identity perimeter — a scenario informed by the November 2024 industry threat actor activity targeting Snowflake customer accounts.

## 2. Scenario

### 2.1 Synopsis

A Snowflake account belonging to a Population Insights service user is compromised via credentials harvested from an unrelated third-party SaaS breach (the credentials were reused, in the simulation). The attacker authenticates to MCT's Snowflake account from a residential proxy IP at 02:14 ET on a Friday. Over approximately 90 minutes the attacker enumerates schemas, runs `SHOW TABLES` against the Population Insights schemas, and attempts to `COPY INTO` an external stage to exfiltrate a deidentified-but-re-identifiable cohort export. The exercise begins at the moment Snowflake access history shows the first anomalous query.

### 2.2 Inject sequence

| Inject | Time (sim) | Description |
|---|---|---|
| I1 | 02:14 | First successful authentication from `185.220.x.x` to Snowflake `MCT_PROD` — service account `svc_popinsights_etl_ro`. |
| I2 | 02:21 | Datadog SIEM "Snowflake login from new geolocation" alert fires (severity Medium). |
| I3 | 02:28 | Arctic Wolf concierge sees the alert in queue; classifies as tier-1; runbook `RB-SF-NEWGEO` directs them to validate against expected ETL schedule. |
| I4 | 02:42 | Attacker runs `SHOW SCHEMAS`, `SHOW TABLES IN POPINSIGHTS_PROD`, then a `SELECT COUNT(*)` on three patient-cohort tables. |
| I5 | 02:54 | Arctic Wolf escalates to MCT on-call (M. Tan on rotation) via PagerDuty; Tan acknowledges 02:58. |
| I6 | 03:11 | Attacker issues `COPY INTO @ext_stage_unknown FROM POPINSIGHTS_PROD.MEMBER_RISK_COHORT` — fails (no privilege on external stage); retries with a different stage — also fails. |
| I7 | 03:18 | Datadog detection `SF-COPY-INTO-EXTERNAL` fires (severity High). |
| I8 | 03:24 | M. Tan correlates I3 + I7; declares SEV-2 at 03:31. |
| I9 | 03:35 | Containment begins: rotate `svc_popinsights_etl_ro` credentials; pause Fivetran job; convene war room. |
| I10 | 04:02 | GC notified; Breach Assessment Workgroup forming. |
| I11 | 05:00 | Snowflake QUERY_HISTORY review confirms no successful exfiltration; only metadata enumeration and `SELECT COUNT(*)` (counts only, no row data egress). |

The exercise was paused at 16:30 ET on the simulated containment + breach assessment dialogue.

## 3. Participants

| Name | Role | Function in exercise |
|---|---|---|
| Sarah Yoon | CISO | Observer; severity confirmation |
| Marcus Tan | Security Engineer (D&R) | Incident Commander |
| Priya Iyer | Security Analyst | Triage, log review (Datadog, Snowflake) |
| Alicia Reyes | Security Engineer (Cloud/AppSec) | Snowflake configuration & containment |
| Ben Olafsson | IAM Specialist | Identity / credential rotation |
| Jordan Park | GRC Manager | Breach assessment scribe |
| Marcus Holbrook | GC | Breach assessment lead |
| David Mehta | CTO | Executive escalation simulation |
| Lauren Pham | VP CS | Customer comms simulation |
| Tomás Reyes | VP Engineering | Engineering containment authorization |
| (Facilitator) | External — Mandiant retained advisor | Inject delivery + observation |
| (Observer) | Coalfire — HITRUST assessor advisor | Compliance perspective (note-taking only) |

12 participants plus 2 observers.

## 4. Decisions and Discussion

### 4.1 Triage and severity

The Datadog alert at 02:21 (I2) was correctly classified as Medium by Arctic Wolf and routed through `RB-SF-NEWGEO`. The runbook step "validate against expected ETL schedule" took longer than expected: the on-call engineer had to consult two separate sources (Snowflake task scheduler and Fivetran sync history) before concluding the activity was anomalous. This delay (approximately 6 minutes between Arctic Wolf classification at 02:28 and AW escalation at 02:54) was identified as a top finding (see §5).

The escalation from Medium to SEV-2 happened on the second alert (I7, `COPY INTO`), which the IC correlated to the earlier login event manually. Group consensus: the correlation **should** have been automatic. The Datadog correlation rule pack does not currently include a Snowflake "new geolocation login + sensitive query within 60 minutes" composite. This is an alert-tuning gap mapping directly to risk register entry **R3 (Detection alert tuning debt)**.

### 4.2 Containment

Credential rotation for `svc_popinsights_etl_ro` was discussed in detail. The team correctly identified that rotating the credential would also break the Fivetran replication job; the chosen sequence (pause Fivetran first, then rotate, then re-key Fivetran) was the right one but took 14 minutes of real-time discussion to reach. A documented runbook for Snowflake service-account compromise would have shortened this materially. The runbook does not currently exist; the IR runbook for "Snowflake credential compromise" is on the Q1 2026 backlog and was elevated to a hard FY26 deliverable as a result of this tabletop.

### 4.3 Breach assessment

The Breach Assessment Workgroup was convened at 04:02 and walked through the four-factor §164.402 analysis with the following findings:

- **Factor 1 (nature of PHI):** The `MEMBER_RISK_COHORT` table contains member identifiers (HASHED), risk scores, and condition flags — re-identification risk would depend on key compromise. Underlying patient-level PHI is in linked tables only joined at query time.
- **Factor 2 (recipient):** External actor, unidentifiable, residential proxy.
- **Factor 3 (acquisition or viewing):** Snowflake `QUERY_HISTORY` shows `SELECT COUNT(*)` only — no data row egress occurred per query plan and no successful `COPY INTO`. Group conclusion: row contents were not viewed; counts only were observed.
- **Factor 4 (mitigation):** Credential rotated; external stage policy reviewed; behavioral baseline updated.

Group conclusion: the simulated event would **not** trigger §164.402 notification — the §164.402 presumption is rebutted by the documented absence of acquisition/viewing. GC noted that even in the simulation he would document the determination formally in BREACH-ASSESS-{sim} per the playbook.

### 4.4 Customer communication

VP CS asked whether a proactive customer advisory was warranted given that the metadata enumeration touched cohort tables. The group debated and concluded: **no proactive advisory** — but a brief customer-friendly summary would be drafted and held in reserve in case the picture changed during eradication. This is consistent with PLN-IR-01 §8.2 (advisory reserved for SEV-1 or §164.402 finding).

### 4.5 Insurer

GC simulated the Beazley breach-coach call at 04:30. Group felt the 72-hour notice obligation was easily met and confirmed the contact card location in the IR Quick-Reference card was current.

## 5. Findings and Action Items

| ID | Finding | Severity | Owner | Target date | Status |
|---|---|---|---|---|---|
| TT-Q4-2025-01 | Composite correlation rule "Snowflake new-geo login + sensitive query within 60 min" missing from Datadog rule pack; delayed correlation by ~50 min in exercise. Maps to risk register **R3**. | Medium | M. Tan | 2026-02-28 | Open — added to Q1 2026 alert-tuning sprint backlog |
| TT-Q4-2025-02 | No documented runbook for Snowflake service-account credential compromise; team improvised the pause-Fivetran-first sequence. | Medium | M. Tan + A. Reyes | 2026-01-31 | Open — runbook draft assigned to A. Reyes |
| TT-Q4-2025-03 | Arctic Wolf runbook `RB-SF-NEWGEO` step "validate against expected ETL schedule" requires consulting two sources; consolidate into a single dashboard. | Low | A. Reyes + Arctic Wolf concierge | 2026-03-31 | Open |
| TT-Q4-2025-04 | Snowflake `QUERY_HISTORY` retention configured at 90 days; for forensic depth in a real event, 365 days would be preferable. Snowflake Enterprise Edition required for extended retention — pricing under review. | Low | A. Reyes | 2026-Q2 | Open — ROI analysis underway |
| TT-Q4-2025-05 | Breach Assessment Workgroup facilitation works but the four-factor template is not in a fillable form; GC drafting a Workgroup template document. | Low | M. Holbrook | 2026-01-15 | Open |
| TT-Q4-2025-06 | One participant noted the on-call PagerDuty escalation went to a stale schedule (had not been updated for Q4 rotation). Verified post-exercise: correct in production schedule; was a stale exercise input. No production action required. | Informational | M. Tan | Closed | Closed |

## 6. What Worked Well

- IC ownership was clear from severity declaration through containment; no role ambiguity during the active phase.
- GC engagement at 04:02 was within the SLA; the four-factor breach analysis ran efficiently.
- IAM (B. Olafsson) executed the credential rotation cleanly with the correct Fivetran sequencing once decided.
- Customer comms restraint (no proactive advisory) was the right call and the discussion was structured.
- The new evidence bucket workflow (S3 with Object Lock) was used in the exercise without friction.

## 7. What Didn't Work

- Manual correlation of the two related alerts cost us ~50 minutes — the most material finding.
- Containment sequencing for the service-account scenario took longer than it should have due to no runbook.
- Snowflake `QUERY_HISTORY` review surfaced a retention question we hadn't previously discussed.

## 8. KPI Updates

| KPI | Target | Q4 2025 actual | Trend |
|---|---|---|---|
| Time to severity declaration (sim) | <30 min | 17 min from first AW escalation | Within target |
| Time to containment initiation (sim) | <60 min | 41 min from severity | Within target |
| GC engagement (sim, where indicated) | <2h | 31 min | Within target |
| Documented action items per tabletop | 3–6 | 6 | Healthy |

## 9. Linked Documents

- PLN-IR-01 Incident Response Plan §6, §8, §10
- RISK-Cyber-Risk-Register (R3 — Detection alert tuning debt)
- LOG-Incident-Case-File-Pebble-Phish-2024-03 (referenced for §164.402 workflow precedent)
- EVD-Snowflake-Vendor-Risk-Assessment-2025

## 10. Sign-Off

| Role | Name | Date |
|---|---|---|
| Exercise IC | Marcus Tan | 2025-11-21 |
| CISO | Sarah Yoon | 2025-11-21 |
| GC | Marcus Holbrook | 2025-11-21 |
| GRC Manager | Jordan Park | 2025-11-21 |

## 11. Document Control

| Version | Date | Author | Change summary |
|---|---|---|---|
| 0.1 | 2025-11-14 | M. Tan | Draft after-action notes |
| 1.0 | 2025-11-21 | M. Tan | Finalized after Steering Committee review |
