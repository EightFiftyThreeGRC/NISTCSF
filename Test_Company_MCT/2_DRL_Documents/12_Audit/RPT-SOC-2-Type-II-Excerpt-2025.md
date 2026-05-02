# SOC 2 Type II Report — Excerpt (Executive Summary)

**Document ID:** RPT-SOC2-2025-EXCERPT
**Version:** 1.0
**Source report:** Schellman & Co., LLC — Independent Service Auditor's Report on Meridian Care Technologies, Inc.'s MeridianCare Platform — SOC 2 Type II
**Source report date:** February 14, 2026
**Excerpt prepared by:** Jordan Park, GRC Manager
**Excerpt date:** February 18, 2026
**Reviewed by:** Sarah Yoon, CISO; Marcus Holbrook, GC
**Distribution:** Audit & Risk Committee; sales/customer success on customer due-diligence requests under NDA; HITRUST assessor (Coalfire) under NDA
**Classification:** Internal — Distribution Limited until customer-facing release. The full SOC 2 report is available to customers under NDA via the Trust Center.

---

## 1. Purpose of This Excerpt

The full SOC 2 Type II report is approximately 90 pages. This excerpt summarizes the **scope, opinion, exceptions, and management responses** for internal stakeholders and for re-use in the NIST CSF assessment evidence file. **It does not reproduce the full attestation, the system description, or the detailed control descriptions, which are reserved for the full report under NDA.**

## 2. Engagement Overview

| Field | Value |
|---|---|
| Service auditor | Schellman & Co., LLC (CPA firm — AICPA SOC 2 attestation engagement) |
| Lead engagement partner | (Schellman engagement partner of record) |
| Type | SOC 2 Type II |
| Trust Services Criteria in scope | All five — Security (Common Criteria), Availability, Processing Integrity, Confidentiality, Privacy |
| Examination period | January 1, 2025 – December 31, 2025 (calendar year) |
| Subservice organizations carved out | AWS (cloud infrastructure); Okta (workforce identity); Snowflake (analytical warehouse) — all carved out using the carve-out method, with complementary user-entity controls and complementary subservice organization controls disclosed |
| Issuance date | February 14, 2026 |
| Prior report | SOC 2 Type II for calendar year 2024 (issued February 2025; clean opinion, 0 exceptions) |

## 3. Service Auditor's Opinion

**Unqualified ("clean") opinion.**

The service auditor's opinion concludes that, in all material respects, throughout the period January 1, 2025 to December 31, 2025:

- The system description fairly presents the MeridianCare platform as designed and implemented;
- The controls were suitably designed to provide reasonable assurance that the service commitments and system requirements would be achieved if the controls operated effectively; and
- The controls operated effectively to provide reasonable assurance that service commitments and system requirements were achieved based on the applicable trust services criteria, **subject to the one exception described in §4 below.**

## 4. Exception Identified

A **single exception** was identified. The auditor's opinion remains unqualified because the matter does not, in the auditor's judgment, prevent the controls from operating effectively in the aggregate during the period.

### 4.1 Exception detail

**Control:** Quarterly access certification (CC6.3 — logical access; PR.AA-05 in the MCT–CSF mapping).

**Description.** MCT operates a quarterly access certification process under POL-IAM-01 §5. Under the process, application owners review the access list for their applications each quarter and either confirm or revoke each user's access; the process is tracked in Vanta. The Q3 2025 certification was scheduled to complete by September 30, 2025. **One certification batch (the Q3 2025 batch covering the Workday HRIS application) completed on October 6, 2025 — six (6) calendar days late.**

**Root cause.** The Workday application owner (a manager in HR) was on personal leave during the final week of September; the backup owner was not designated in Vanta at the start of the cycle. Upon the application owner's return, the certification was completed within one business day.

**Impact assessment by the auditor.** No inappropriate access was identified during the certification once it was performed. No user retained access beyond business need during the 6-day delay. The exception is operational (a missed deadline) rather than a control-design failure. Schellman concluded the matter does not constitute a material weakness or warrant a qualified opinion.

**Management response.**

1. The Q4 2025 access certification cycle was completed on time (December 2025).
2. Vanta certification workflows were updated to require a designated backup owner at cycle initiation; the workflow blocks cycle start until the backup is designated.
3. The IAM Specialist (Ben Olafsson) added a calendar-week-21 / week-34 / week-47 reminder for cycle owners to confirm coverage planning before each cycle.
4. The exception was reported to the Audit & Risk Committee at its Q4 2025 meeting (MINUTES-Audit-Risk-Committee-Q4-2025).

**Status:** Remediation complete; Q4 2025 cycle on time; Q1 2026 cycle on track.

## 5. Areas of Strength Noted by the Service Auditor

While exceptions are the report's most consequential output, the auditor noted (in the Section 5 management commentary) several areas as design strengths:

- The transition to phishing-resistant MFA (FIDO2/WebAuthn) for production-access roles, with full enforcement achieved in Q4 2025, was identified as ahead of typical mid-market healthcare SaaS posture.
- The 24x7 MDR partnership with Arctic Wolf, layered on the in-house D&R team, was noted as a mature operational construct.
- The post-Pebble-Phish program changes (FIDO2 expansion, MDR contract, quarterly phishing simulations, DLP project) were noted as a coherent integrated response to a credential-phishing event.
- The cybersecurity policy hierarchy and the cyber risk register were identified as well-documented and operating consistently.

## 6. Subservice Organizations and CUEC

Subservice organizations carved out are AWS, Okta, and Snowflake. Customers ("user entities") are reminded that the SOC 2 controls associated with the carved-out subservices are addressed by the subservice organizations' own SOC 2 reports, which MCT obtains and reviews annually. The Complementary User-Entity Controls (CUEC) listed in the report include:

- Customer access provisioning and deprovisioning to MeridianCare;
- Customer-side patient consent and HIPAA workflow accuracy;
- Customer-side network and endpoint security relevant to portal access.

## 7. Linked Documents

- POL-001 Information Security Policy
- POL-IAM-01 Identity and Access Management Policy
- MINUTES-Audit-Risk-Committee-Q4-2025
- RPT-Internal-Audit-Cybersecurity-2025
- (Full SOC 2 Type II report — under NDA via Trust Center)

## 8. Document Control

| Version | Date | Author | Change summary |
|---|---|---|---|
| **1.0** | **2026-02-18** | **J. Park** | **Initial excerpt prepared from Schellman issued report dated 2026-02-14** |
