# Quarterly Access Review — Q4 2025

**Document ID:** RPT-AR-2025-Q4
**Version:** 1.0 (final)
**Reporting period:** October 1, 2025 – December 31, 2025
**Campaign window:** January 5, 2026 – January 25, 2026 (review of Q4 2025 entitlement state as of Dec 31, 2025)
**Issued:** February 6, 2026
**Authors:** Ben Olafsson, IAM Specialist; Jordan Park, GRC Manager
**Approver:** Sarah Yoon, CISO
**Distribution:** Audit & Risk Committee; CTO; Security Steering Committee; HITRUST evidence repository (Hyperproof)

---

## 1. Executive Summary

The Q4 2025 quarterly access review covered **2,847 entitlement-to-account assignments** across 348 active workforce identities and **214 service accounts** in the 17 systems classified as Tier Critical or Tier High in INV-Software-Application-Inventory. The campaign opened January 5, 2026 with 142 manager-attestation campaigns issued through ServiceNow GRC, and closed for on-time submissions on January 19, 2026 (day 14).

**Headline metrics:**

- **On-time completion: 98.0%** (139 of 142 campaigns; KPI target ≥95%; per POL-IAM-01 §7.2).
- **Entitlements certified: 2,791** (98.0% of total).
- **Entitlements revoked at certification: 56** (2.0%) — primarily mover-event residual entitlements.
- **Exceptions raised and approved: 7** (all routed to CISO; all approved with documented compensating controls).
- **Sample-test findings (5% sample, 142 entitlements): 4 minor findings** — all coaching-level; none material.
- **Privileged-user roster reconciliation: clean** — 0 standing-privilege exceptions detected outside the documented legacy ETL exception (CRA-LegacyETL-2025).

The review confirms that Q4 2025 access controls are operating as designed and meet the Risk Appetite Statement (RAS-2025-12) thresholds. Three findings are noted for FY26 attention; none rise to risk-register level.

## 2. Scope

### 2.1 In-scope systems

The review covered all systems classified Tier Critical or Tier High in INV-Software-Application-Inventory and all workforce identities and service accounts within them:

| System | Workforce accounts | Service accounts |
|---|---|---|
| Okta Workforce IDP | 348 | n/a (IDP itself) |
| AWS IAM Identity Center (production) | 92 (Eng + Sec + IT) | 38 |
| Aurora PostgreSQL (production) | 14 (DBAs + senior engineers) | 12 |
| Snowflake (production analytics) | 28 | 9 |
| S3 (attachment buckets, prod) | via AWS IAM Identity Center | 22 |
| Datadog Cloud SIEM | 18 | 4 |
| CrowdStrike Falcon | 9 (admin + view) | 2 |
| Wiz CSPM | 11 | 3 |
| Microsoft 365 (GA + Intune admin) | 6 | 4 |
| Workday (HRIS admin) | 7 | 2 |
| ServiceNow GRC (admin) | 12 | 3 |
| GitHub Enterprise (org admin + repo admins) | 24 | 18 |
| Auth0 (workforce-admin side) | 6 | 4 |
| MeridianCare Customer Admin Console (cross-tenant support roles) | 11 | n/a |
| Jamf Pro | 4 | 2 |
| Vanta | 4 | 1 |
| Hyperproof | 5 | 1 |
| **Total in-scope** | **2,633 user-system assignments** | **125 service-system assignments** |

### 2.2 Out-of-scope (reviewed under separate cadence)

- Tier Moderate and Low applications (annual review; next due Q3 2026).
- Customer-administrative accounts (annual review with each customer via QBR; current cycle in flight).
- Patient-portal (Auth0 patient-side) — out of scope for this review per POL-IAM-01 §7.1; risk register R8 covers patient-portal MFA.
- Legacy ETL cluster local accounts — reviewed quarterly by IT Operations under CRA-LegacyETL-2025; results referenced in §6.

## 3. Methodology

Per POL-IAM-01 §7.2:

- **Step 1 (preparation, Jan 2–4):** ServiceNow GRC pulled the entitlement snapshot as of Dec 31, 2025 23:59 ET from Okta, AWS IAM Identity Center, and the application admin APIs of in-scope systems.
- **Step 2 (campaign launch, Jan 5):** 142 attestation campaigns were issued — one per manager with at least one direct report holding an in-scope entitlement.
- **Step 3 (manager attestation, Jan 5–19):** Managers reviewed each direct report's entitlements and chose Certify, Revoke, or Escalate. Automated nudges issued to non-completers on days 7, 10, 12, 13.
- **Step 4 (escalation, Jan 19–25):** Three campaigns missed the day-14 deadline; auto-escalated to manager's manager. Two completed by day 17; one revoked by day 21 with no manager response and accounts auto-removed pending re-justification.
- **Step 5 (sample testing, Jan 22–28):** 5% sample (142 entitlements across 17 systems) tested by GRC for evidentiary integrity (manager actually inspected entitlements vs. rubber-stamping; revocation actually executed in target system).
- **Step 6 (privileged-user roster reconciliation, Jan 12 and Jan 26):** IAM Specialist ran the reconciliation script comparing privileged-user roster (ServiceNow GRC) to actual entitlements in Okta + AWS IAM Identity Center.
- **Step 7 (reporting, Jan 28 – Feb 6):** Findings consolidated; this report drafted and reviewed by CISO.

## 4. Results

### 4.1 Campaign completion

| Metric | Q4 2025 result | KPI target | Q3 2025 prior |
|---|---|---|---|
| Campaigns issued | 142 | n/a | 138 |
| Campaigns completed on time (≤ day 14) | 139 (97.9%) | ≥95% | 132 (95.7%) |
| Campaigns completed by day 21 (with escalation) | 141 (99.3%) | n/a | 137 (99.3%) |
| Campaigns auto-revoked at day 21 | 1 (0.7%) | n/a | 1 (0.7%) |
| Average completion day | 9.4 | n/a | 10.1 |

### 4.2 Entitlement disposition

| Disposition | Count | % |
|---|---|---|
| Certified (kept) | 2,791 | 98.0 |
| Revoked at certification (no longer required) | 56 | 2.0 |
| Escalated to CISO (exception requested) | 7 | 0.2 (subset of certified-with-exception) |
| Auto-revoked at day 21 (campaign abandoned) | 6 | 0.2 |

### 4.3 Notable revocations

- **41 entitlements** revoked at certification were tied to **mover events** in Q3/Q4 2025 (employees who changed roles but retained legacy entitlements). This is below the Q3 2025 number (52) and reflects improved mover-event handling after the Oct 2025 SCIM mover-rule tightening.
- **9 entitlements** revoked were for service accounts no longer in use (deprecated ETL pipeline service principals; properly retired).
- **6 entitlements** revoked were former contractors whose contract end-dates had passed without Workday status update — flagged separately to People Ops.

### 4.4 Exceptions raised (7)

| # | System | Population | Exception requested | Approval | Compensating control |
|---|---|---|---|---|---|
| 1 | Aurora PostgreSQL prod (read) | 1 senior engineer | Continued read access for ad-hoc data investigation during HITRUST audit prep | CISO approved (90 days) | Read-only role; activity logged; reviewed monthly |
| 2 | Snowflake prod (admin) | 2 Pittsburgh analytics engineers | Deferral of admin-to-developer migration pending warm-DR work (R6) | CISO approved (180 days, A&R notified) | JIT-only; quarterly review |
| 3 | GitHub org owner | 1 SRE | Continued org-owner role for emergency repo restoration | CISO approved (90 days) | Two-person integrity for any org-level change |
| 4 | Datadog admin | 1 contractor (vendor onboarding) | New admin for SIEM tuning project | CISO approved (project-scoped, 60 days) | Contractor BAA in place; activity logged |
| 5 | Legacy ETL bastion | 1 senior engineer (decommission lead) | Continued root SSH for migration cutover work | CISO approved (per CRA-LegacyETL-2025) | Bastion-only ingress; MFA at bastion; logged |
| 6 | M365 GA | 1 IT admin | Continued GA for tenant migration project | CISO approved (90 days) | JIT for non-routine tasks; quarterly review |
| 7 | Customer Admin (cross-tenant) | 2 Customer Success leads | Continued cross-tenant view for 2 strategic accounts | CISO approved (annual, with customer letter on file) | Customer-authorized; logged with PHI markers |

### 4.5 Sample-test findings (5% / 142 entitlements)

| # | Severity | Finding | Remediation |
|---|---|---|---|
| 1 | Low | Manager certified 18 entitlements within 90 seconds; pattern suggests insufficient inspection | Coaching memo to manager; re-test next quarter |
| 2 | Low | Snowflake `sysadmin` role still attached to one user despite revocation event in ServiceNow GRC — drift between GRC and target system | Drift remediated within 4 hours; root cause = SCIM connector lag; engineering ticket opened |
| 3 | Low | Two service accounts in GitHub had not been used in >180 days but were certified as still required | Owner re-justified with 90-day plan to retire; if not used by Q1 2026 review, will be auto-disabled |
| 4 | Low | One contractor entitlement re-certified despite contract end-date in 14 days | Removed at end-date; coaching memo to manager on contract-end alignment |

No moderate or high findings.

### 4.6 Privileged-user roster reconciliation

The Jan 12 and Jan 26 reconciliation runs found:

- **0 standing privileges** outside the privileged-user roster (target).
- **0 unauthorized assumptions** of privileged AWS roles.
- **3 elevation events** with sub-standard justification (single-word reason text); coaching delivered; will be re-checked in Q1 2026 sample.
- **0 break-glass envelope anomalies** at the quarterly verification (Jan 14, 2026; signed by CISO + IAM Specialist).

## 5. Findings and Action Items

| ID | Finding | Severity | Owner | Target close |
|---|---|---|---|---|
| AR-Q4-25-001 | SCIM connector lag between ServiceNow GRC revocation and Snowflake target system (sample-test #2) — 4-hour drift not aligned with leaver SLA | Low | Ben Olafsson (IAM) | Q1 2026 (engineering ticket SEC-1842) |
| AR-Q4-25-002 | One manager exhibited rubber-stamp pattern (sample-test #1) | Low | Manager + skip-level | Q1 2026 (coaching delivered; re-test in next sample) |
| AR-Q4-25-003 | Contractor entitlement re-certified despite imminent contract end (sample-test #4) | Low | People Ops + IAM | Q1 2026 (Workday rule added to flag contractors with <30 day end-date in certification view) |
| AR-Q4-25-004 | 3 elevation events with poor justification quality (privileged reconciliation) | Low | Ben Olafsson | Q1 2026 (coaching + minimum justification length now enforced at 20 chars) |
| AR-Q4-25-005 | Two GitHub service accounts unused >180 days (sample-test #3) | Low | Service-account owner | Q1 2026 (retire by Q1 2026 review or auto-disable) |

No findings rise to medium or high severity. No findings require risk-register addition.

## 6. Cross-references

- Legacy ETL local-account review (CRA-LegacyETL-2025): completed by IT Operations Jan 9, 2026; clean — 5 active accounts on legacy bastion + ETL hosts; all matched to currently-employed senior engineers; no orphans. Decommission remains Q4 2026.
- Customer-administrative review: in flight under Customer Success QBR cycle; results reported separately each quarter.
- Patient-portal MFA (R8): out of scope for this review; covered in cyber risk register.

## 7. Conclusion

The Q4 2025 access review completed with **98.0% on-time** completion against a 95% KPI, materially in line with the steady-state operating cadence of the IAM program established post-Pebble Phish. Privileged access remains under JIT control with zero unauthorized standing privileges. Exception volume is within historical norms (7 vs. Q3 2025: 6) and all exceptions are time-bound with documented compensating controls. Sample-testing surfaced no material findings.

The IAM program is operating within the Risk Appetite Statement (RAS-2025-12) thresholds for access control. The findings table will be carried into the Q1 2026 review for verification.

## 8. Approvals

| Role | Name | Signature | Date |
|---|---|---|---|
| Author (IAM) | Ben Olafsson | (e-signed in ServiceNow GRC) | 2026-02-04 |
| Author (GRC) | Jordan Park | (e-signed in ServiceNow GRC) | 2026-02-05 |
| Approver | Sarah Yoon, CISO | (e-signed in ServiceNow GRC) | 2026-02-06 |

## 9. Document Control

| Version | Date | Author | Change summary |
|---|---|---|---|
| 0.1 | 2026-01-29 | B. Olafsson | Initial draft |
| 0.2 | 2026-02-02 | J. Park | GRC review; methodology and finding tables refined |
| **1.0** | **2026-02-06** | **B. Olafsson, J. Park** | **Final; approved by CISO; published to Audit & Risk Committee and Hyperproof** |
