# Recovery Test Results — April 2025 Full Failover

**Document ID:** RPT-DR-2025-04
**Version:** 1.1
**Test execution dates:** April 23–24, 2025
**Report issued:** May 8, 2025
**Report owner:** Tomás Reyes, VP Engineering
**Reviewed by:** David Mehta, CTO; Sarah Yoon, CISO; Marcus Tan, Security Engineer (D&R); Jordan Park, GRC Manager
**Distribution:** Steering Committee; Audit & Risk Committee (summary); HITRUST assessor (Coalfire) under NDA
**Classification:** Internal — Distribution Limited

---

## 1. Purpose and Scope

This report documents the April 2025 full-failover recovery test under PLN-DRP-01. The test satisfies the annual full-failover commitment in POL-001 §3.13 and the FY25 cybersecurity strategy. The test results were briefed to the Audit & Risk Committee at its May 2025 meeting and inform the FY26 cybersecurity strategy, in particular FY26 Priority 6 (Recovery testing maturity) and risk register entry R2 (Recovery testing depth).

### 1.1 Scope

**In scope:**

- Aurora PostgreSQL cross-region promotion of the ToC primary cluster from us-east-1 to us-west-2.
- EKS workload recreation in us-west-2 for the ToC namespace only.
- S3 attachment storage failover validation (cross-region replication already in place).
- Route 53 DNS cutover for ToC subdomains.
- End-to-end customer-facing functional validation against a synthetic customer tenant (`mct-dr-test-customer`).

**Explicitly out of scope (acknowledged limitation):**

- Referral Lifecycle Management service.
- Chronic Care Management service.
- Population Insights / Snowflake.
- Legacy on-premises ETL cluster.
- Real customer traffic (synthetic tenant only).

This single-service scope is the **deliberate constraint** of the current testing program and is the central weakness captured as risk register entry **R2 (Recovery testing depth)**. The Steering Committee reviewed and accepted this scope on April 8, 2025, with the explicit understanding that scope expansion is an FY26 / FY27 commitment.

### 1.2 Objectives

1. Confirm the Aurora cross-region promotion procedure achieves the P1 RTO target of 4 hours for the database tier.
2. Confirm the warm-DR Terraform stack for EKS in us-west-2 deploys correctly and that ArgoCD reconciles services to a healthy state.
3. Confirm S3 cross-region replication is at the SLA target.
4. Confirm Route 53 DNS cutover propagates within the planned window.
5. Validate end-to-end ToC functionality against the synthetic customer tenant.
6. Surface lessons learned and feed them into the FY26 program.

## 2. Test Plan

The test was scheduled across two business days (April 23–24, 2025) with a 24-hour soak period in the failed-over state before failback was performed. Customer impact: zero (synthetic tenant only).

| Phase | Date / Time (ET) | Activity |
|---|---|---|
| T-7d | Apr 16 | Test plan finalized; customer comms drafted as a precaution; freeze on us-east-1 changes |
| T-1d | Apr 22 | Pre-test readiness review; war room ID published |
| T+0 | Apr 23, 09:00 | Test kickoff; simulated us-east-1 ToC impairment declared |
| T+0–4h | Apr 23, 09:00–13:00 | Failover steps 1–9 of PLN-DRP-01 §6 |
| T+4h–24h | Apr 23 13:00 → Apr 24 13:00 | Soak in us-west-2 active state; functional validation |
| T+24h–28h | Apr 24, 13:00–17:00 | Failback to us-east-1; post-test validation |
| T+28h+ | Apr 24, 17:00 onward | Closeout, log preservation, lessons-learned drafting |

## 3. Test Results — Timing

| Phase | Target | Actual | Variance | Status |
|---|---|---|---|---|
| Aurora cross-region promotion (database tier RTO) | <4h00m | **3h47m** | -13m vs target | **Within target** |
| End-to-end ToC restoration to functional state (incl. EKS, S3 redirect, DNS cutover) | <4h00m (P1 RTO) | **5h12m** | **+1h12m over target** | **Over target — material finding** |
| RPO observed at promotion | <15m | 47 seconds (actual replica lag at promotion moment) | Well within target | Within target |
| Functional validation pass (24h soak) | 100% of test cases | 142/144 passed (98.6%) | 2 minor cases failed | Acceptable; root cause for failures identified (test-data drift, not platform) |
| Failback timing | No formal target | 3h22m | No target | Acceptable |

**The 5h12m end-to-end result is over the P1 RTO target of 4 hours.** This was the principal finding of the test and is the basis for the lessons learned and action items below. The result was reported transparently to the Audit & Risk Committee at the May 2025 meeting; the Committee endorsed the corrective action plan.

## 4. Lessons Learned

### 4.1 Finding — DNS TTL too high (primary contributor to overage)

**Detail.** Several legacy ToC subdomain Route 53 records had TTLs of 300 seconds (5 minutes). Combined with downstream resolver caching, traffic cutover took materially longer than the planned 15-minute window. The ALB and CloudFront origin failover were healthy and ready by T+3h45m, but full traffic shift completed only by T+5h00m due to TTL drag.

**Fix applied.** Post-test, Route 53 TTLs for ToC and Referral subdomains reduced to 60 seconds. Documented in PLN-DRP-01 §6 Step 5. Will be re-validated in the next test.

**Action item:** AI-2025-DR-01 (closed Q3 2025).

### 4.2 Finding — EKS image cache cold start

**Detail.** When the warm-DR EKS cluster scaled up in us-west-2, several services experienced delayed pod-readiness because container images were not pre-pulled to node-level caches. Pod start times added approximately 25–35 minutes to the EKS workload restoration phase.

**Fix applied.** Pre-pull DaemonSet deployed across the warm-DR EKS cluster to maintain node-level image caches for the ToC and Referral service images. Re-validation in the next test.

**Action item:** AI-2025-DR-02 (closed Q4 2025).

### 4.3 Finding — Manual DNS cutover step

**Detail.** The Route 53 weighted-record update for the cutover was performed manually by the SRE on-call (Step 5 of the runbook). The action was successful but is a manual single point of intervention; if the SRE were unavailable or made a typo, recovery would be delayed.

**Fix planned.** Automate the cutover via a parameterized Lambda invoked from the runbook. Originally targeted Q3 2025; deferred to Q1 2026 due to competing priorities.

**Action item:** AI-2025-DR-03 (open; target Q1 2026).

### 4.4 Finding — Synthetic tenant test-data drift

**Detail.** Two of the 144 functional test cases failed because reference test data in the synthetic tenant had drifted from the production test-data catalog over the prior 11 months. The failures were data, not platform.

**Fix applied.** Quarterly synthetic-tenant data refresh process introduced; owned by SRE.

**Action item:** AI-2025-DR-04 (closed Q2 2025).

### 4.5 Finding — Single-service scope is a known limitation (R2)

**Detail.** This test exercised ToC only. Referral, CCM, and Population Insights have not been failover-tested at full-region scope. This is the principal weakness in the recovery program and is fully captured as risk register entry R2 (Recovery testing depth).

**Fix planned.** FY26 plan adds:

- One additional full-failover test (scope: Referral Lifecycle Management, target Q3 2026).
- Two recovery tabletop exercises distinct from IR tabletops (target Q2 2026 and Q4 2026).
- FY27 plan to introduce game-day-style exercises and to expand scope to include CCM and Population Insights.

**Action item:** AI-2025-DR-05 (open; FY26 program; target Dec 31 2026).

### 4.6 Observation — Identity and security telemetry behaved well

Okta, Auth0, Datadog, and CrowdStrike continued to operate cleanly throughout the test with no MCT-side intervention. This reinforces the architectural choice to rely on these multi-region SaaS platforms as resilient dependencies rather than self-hosted alternatives.

## 5. KPI Outcomes

| KPI | Target | Actual | Trend |
|---|---|---|---|
| P1 database-tier RTO | <4h | 3h47m | Within target; tight margin |
| P1 end-to-end RTO | <4h | 5h12m | **Over target** |
| P1 RPO observed | <15m | 47s | Well within target |
| Functional validation pass rate | 100% | 98.6% | Acceptable; data-only failures |
| Recovery tests per year | ≥1 (current commitment) | 1 | Met; below mature target |
| Recovery tabletops per year | 0 (current); target ≥2 in FY26 | 0 | FY26 commitment |

## 6. Action Item Tracker

| ID | Description | Owner | Target | Status |
|---|---|---|---|---|
| AI-2025-DR-01 | Reduce Route 53 TTLs for P1 subdomains to 60s | SRE on-call | Q3 2025 | Closed |
| AI-2025-DR-02 | Deploy image-cache pre-pull DaemonSet on warm-DR EKS | SRE | Q4 2025 | Closed |
| AI-2025-DR-03 | Automate Route 53 cutover via Lambda | SRE | Q1 2026 | Open |
| AI-2025-DR-04 | Quarterly synthetic-tenant data refresh | SRE | Q2 2025 | Closed |
| AI-2025-DR-05 | Expand recovery test scope per FY26 plan | T. Reyes + M. Tan | Dec 31 2026 | Open (R2) |
| AI-2025-DR-06 | Add a recovery-specific tabletop exercise distinct from IR tabletops | M. Tan + J. Park | Q2 2026 | Open |

## 7. Honest Self-Assessment

This test was a useful exercise and produced concrete improvements. It is also clearly a single-service exercise of one of several P1 services, and the end-to-end RTO was over target by more than an hour. The Company is not at the maturity it would like to be at on recovery testing depth and is not claiming otherwise. The FY26 program (R2 treatment) is the path forward; the FY27 program will extend further.

The Audit & Risk Committee and the HITRUST assessor (Coalfire) were both briefed on the test results; both endorsed the FY26 corrective program. This honest reporting posture is itself a positive control and is the basis on which the Company's recovery-testing maturity will improve over time.

## 8. Sign-Off

| Role | Name | Date |
|---|---|---|
| Test Director | Tomás Reyes, VP Engineering | 2025-05-08 |
| CTO | David Mehta | 2025-05-08 |
| CISO | Sarah Yoon | 2025-05-08 |
| GRC Manager | Jordan Park | 2025-05-08 |

## 9. Linked Documents

- PLN-DRP-01 Disaster Recovery Plan §6, §11
- BIA-2025-12 Business Impact Analysis §3
- RISK-Cyber-Risk-Register (R2, R6)
- MINUTES-Audit-Risk-Committee-Q2-2025

## 10. Document Control

| Version | Date | Author | Change summary |
|---|---|---|---|
| 0.5 | 2025-04-25 | T. Reyes | Active test notes |
| 1.0 | 2025-05-08 | T. Reyes | Final report |
| **1.1** | **2025-12-12** | **T. Reyes** | **Closure status update on action items; cross-reference to FY26 program** |
