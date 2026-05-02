# Annual Penetration Test — Executive Summary 2025

**Document ID:** RPT-PENTEST-EXEC-2025
**Engagement period:** July 14 – August 22, 2025 (active testing); September 5, 2025 (debrief)
**Report issued:** September 18, 2025
**Tester:** Bishop Fox, LLC
**Bishop Fox engagement:** BF-MCT-2025-AnnualAssessment
**Report classification:** Internal — Distribution Limited
**Distribution:** Audit & Risk Committee; CISO; CTO; CEO; HITRUST evidence repository (Hyperproof — under NDA); SOC 2 auditor (Schellman) under reliance arrangement
**MCT owner:** Sarah Yoon, CISO
**Approver:** Sarah Yoon, CISO

> **Note on this document:** This is the executive summary only. The full Bishop Fox technical report (including reproduction steps, payloads, and screen captures) is held in escrow at Hyperproof and accessible to authorized assessors under NDA. This summary deliberately remains at executive altitude and excludes offensive technique detail.

---

## 1. Engagement Overview

Bishop Fox conducted MCT's annual third-party penetration test from July 14 through August 22, 2025. The engagement was scoped to provide independent assurance over the security of the production MeridianCare platform and the supporting corporate environment. Bishop Fox was selected following an RFP in Q2 2025, evaluated against three other firms; selection criteria included healthcare-vertical experience, prior HIPAA/HITRUST engagement work, and methodology alignment with PTES and OWASP.

This test fulfills the annual penetration testing requirement under POL-001 §3.10 and provides supporting evidence for SOC 2 Type II (CC4.1, CC7.1) and HITRUST CSF r2 control 10.m.

## 2. Scope

### 2.1 In scope

| Domain | Scope |
|---|---|
| External (internet-facing) | All MeridianCare production endpoints (CloudFront, ALB, API Gateway, Auth0 patient portal, Okta tenant); marketing site; all subdomains under `meridiancare.com` and `mct.health` |
| Internal (assumed-breach) | One workforce laptop on the corporate VPN, two AWS workforce identities (one engineer, one customer-success), one Snowflake analyst account; lateral movement and privilege-escalation paths |
| Application security (AppSec) | The MeridianCare application — Transitions of Care, Referral Lifecycle Management, Chronic Care Management, Population Insights — across web UI and FHIR R4 / REST APIs; authenticated and unauthenticated paths; multi-tenant boundary testing |
| Cloud configuration review | A targeted review of AWS IAM, S3, KMS, EKS, and edge-security configuration in the production us-east-1 account (read-only access) |

### 2.2 Out of scope

- Aurora PostgreSQL and Snowflake managed services themselves (vendor responsibility).
- Customer EHR integrations beyond MCT-owned endpoints.
- Physical security at Raleigh HQ and the Pittsburgh site.
- The legacy on-premises ETL cluster at Raleigh HQ. (The cluster is on a Q4 2026 decommission path and is covered by the quarterly internal Nessus scan and CRA-LegacyETL-2025; Bishop Fox specifically noted the exclusion in their scope statement.)
- Denial-of-service testing.
- Social engineering of MCT personnel (covered separately by quarterly phishing simulations under the security awareness program).

### 2.3 Test windows

External and AppSec testing was conducted during MCT business hours with the SOC and Arctic Wolf MDR aware of, but blind to, specific test windows (purple-team-friendly testing — detection observations were captured separately from offensive findings). Internal assumed-breach testing was conducted from a dedicated test workstation provisioned for the engagement, on a defined test segment, with rollback at completion.

## 3. Methodology

Bishop Fox followed PTES (Penetration Testing Execution Standard) for engagement structure and OWASP ASVS / API Security Top 10 / Web Security Testing Guide for application-layer technique selection. The team comprised a lead consultant, two senior consultants, and a quality-review reviewer not on the test team.

Phases:

1. **Reconnaissance** — passive enumeration of attack surface; subdomain and asset discovery.
2. **External vulnerability identification** — automated and manual evaluation of internet-facing services.
3. **AppSec testing** — authenticated and unauthenticated testing of MeridianCare across roles and tenants; multi-tenant isolation testing was an explicit deliverable.
4. **Internal assumed-breach** — simulation of an attacker with workforce-level access; lateral movement, privilege escalation, and access-to-PHI path testing.
5. **Cloud configuration review** — IAM least-privilege checks, public-resource exposure, KMS key policy review.
6. **Reporting and debrief** — written report and live debrief to MCT security and engineering leadership.

The engagement explicitly did not include offensive techniques against the legacy ETL cluster (out of scope) or social engineering of personnel.

## 4. Summary of Findings

| Severity | Count | Status as of Sep 18, 2025 (report issuance) | Status as of Apr 30, 2026 |
|---|---|---|---|
| Critical | **0** | n/a | n/a |
| High | **2** | Both in remediation; remediation plans accepted | Both **closed and verified** |
| Medium | **7** | All in remediation queue | All **closed and verified** |
| Low | **12** | Mix of closed at issuance, in queue, accepted | 10 closed; **2 accepted with compensating controls** under EX-2025-031 |

No findings rose to the level of an HHS OCR breach-notification trigger or an MCT customer notification obligation. No PHI was accessed by Bishop Fox during testing. No incident was opened.

## 5. Top Findings (Executive Summary Altitude)

The findings below are described at a deliberately high level. Reproduction details, payloads, and screenshots are in the full Bishop Fox report.

### 5.1 High-severity findings (2)

- **PT-2025-H-01 — Multi-tenant authorization gap on a legacy reporting endpoint.** A legacy reporting API endpoint, intended to serve only a customer's own population data, did not consistently enforce tenant scoping for one specific role. Bishop Fox demonstrated the ability — under controlled test conditions — to retrieve summary metadata (counts, not patient detail) belonging to a different tenant when authenticated under that role. The endpoint had been retained from an earlier API version. **Remediation:** endpoint deprecated and re-implemented with explicit tenant scoping enforcement and added unit/integration tests for cross-tenant attempts. **Closed and verified Oct 2025.**
- **PT-2025-H-02 — Insufficient session-lifetime controls on the Auth0-backed patient portal for legacy customer configurations.** Session lifetime in two legacy customer configurations exceeded the workforce session policy and lacked idle timeout. While not a direct PHI exposure on its own, it amplified the impact of a stolen-session scenario. **Remediation:** patient portal session lifetime tightened across all configurations; idle timeout enforced; risk-based step-up evaluation added. **Closed and verified Nov 2025.**

### 5.2 Medium-severity findings (7) — categories only

The seven medium findings were distributed across the following categories. All seven are closed and verified as of December 2025.

- **Authorization (3):** edge cases in role-permission matrix; closed via permission-matrix simplification.
- **Logging (2):** specific application events not consistently captured in pgAudit — addressed via audit-rule additions.
- **Cloud configuration (1):** an over-permissive IAM role used by a non-prod CI process; remediated by least-privilege rewrite.
- **AppSec hygiene (1):** missing security headers on one administrative subdomain; remediated by edge-policy update.

### 5.3 Low-severity findings (12)

Of 12 low-severity findings: 10 are closed; 2 are accepted under exception EX-2025-031 with documented compensating controls and a closure date no later than the legacy ETL decommission. (Both accepted-low findings affect components touching the legacy integration path; full remediation is gated on the broader decommission and is not believed to expose PHI.)

## 6. Detection Observations

Bishop Fox shared with MCT (purple-team style) a separate observation log of which test activities were detected by Datadog Cloud SIEM, CrowdStrike Falcon, or Arctic Wolf. Of 41 observable testing actions:

- 26 generated a detection (production rule fired and was triaged).
- 9 generated telemetry but no current rule (gap recorded as input to the Detection Use Case Catalog).
- 6 generated no telemetry (gap recorded; some affected the legacy ETL adjacency and were already known under R4).

Findings from the detection observation log were folded into the Q4 2025 update to PLAYBOOK-Detection-Use-Cases (notably contributing to additional Snowflake and EKS-source rules).

## 7. Remediation Status (as of report issuance, with refresh)

- **At issuance (Sep 18, 2025):** all critical and high remediation plans approved by CISO; all medium and most low findings in queue with assigned owners.
- **Refresh (Apr 30, 2026):** 0 critical, 0 open high, 0 open medium, 2 open low (accepted with compensating controls under EX-2025-031).

A retest of the two high-severity findings was performed by Bishop Fox in November 2025 under a separate small engagement (BF-MCT-2025-Retest); both were verified closed.

## 8. Notable Strengths Observed

Bishop Fox specifically called out:

- The mandatory FIDO2/WebAuthn enforcement for production-access roles (achieved Q4 2025) materially constrained the assumed-breach test path and made several prepared techniques infeasible.
- The Wiz CSPM continuous-evaluation regime had eliminated several common cloud-misconfiguration classes that Bishop Fox typically finds in similar engagements.
- The CrowdStrike Falcon coverage on managed endpoints was effective and consistent.
- The detection observation log produced a healthy 26-of-41 detection rate at MCT's current MDR maturity, which Bishop Fox noted is in line with peer organizations of comparable size and tenure.

## 9. Areas for Improvement

In addition to the specific findings, Bishop Fox flagged the following programmatic observations:

- **Tier-1 alert false-positive rate** (independently observed by the testers as ~25-30%) is consistent with MCT's own measurement (R3) and limits the value of detection at scale.
- **Legacy ETL cluster** — although out of scope, the testers noted it represents an asymmetric risk relative to the rest of the modern platform. MCT's Q4 2026 decommission plan is the appropriate response.
- **Threat modeling cadence** (a known program gap captured in Backgrounder §10 priority 8 and ID.RA risk drag) was noted again. Implementing the planned quarterly threat-modeling forum will close this.

## 10. Conclusion

The 2025 annual penetration test produced no critical findings, two high findings now closed and verified, and a total inventory consistent with — or modestly better than — MCT's own assessment of program maturity. Open findings are limited to two accepted-low items with compensating controls. The engagement provides supporting third-party assurance for SOC 2 Type II and HITRUST CSF r2 controls and contributes detection-engineering content into the FY26 detection roadmap.

The next annual test is scheduled for Q3 2026 with Bishop Fox under a multi-year statement of work option exercise (subject to vendor risk re-attestation), with scope expanded to include validation of the FY26 zero-trust service mesh once deployed and a final pre-decommission look at the legacy ETL cluster.

## 11. References

- POL-001 Information Security Policy
- POL-PM-01 Patch Management Policy
- RISK-Cyber-Risk-Register (R3, R4)
- PLAYBOOK-Detection-Use-Cases
- REG-EX-01 Exceptions Register (EX-2025-031)
- Bishop Fox Statement of Work BF-MCT-2025-AnnualAssessment (vendor file)
- Bishop Fox Retest engagement BF-MCT-2025-Retest (vendor file)

## 12. Document Control

| Version | Date | Author | Change summary |
|---|---|---|---|
| 1.0 | 2025-09-18 | S. Yoon | Initial executive summary on receipt of Bishop Fox final report |
| 1.1 | 2025-12-15 | S. Yoon | Refresh post-retest: high-severity remediation verified |
| **1.2** | **2026-04-15** | **S. Yoon** | **Status refresh as of April 30, 2026; reconfirmed accepted-low items under EX-2025-031** |
