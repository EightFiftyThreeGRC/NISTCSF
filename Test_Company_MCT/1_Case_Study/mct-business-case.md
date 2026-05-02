# Business Case: 2026 NIST CSF 2.0 Assessment

**Prepared for:** MCT Board Audit & Risk Committee
**Prepared by:** Sarah Yoon, CISO; Jordan Park, GRC Manager
**Date:** January 28, 2026
**Decision requested:** Approve scope, budget, and timeline for the 2026 enterprise NIST CSF 2.0 assessment

---

## 1. Executive Summary

The Information Security function recommends conducting a comprehensive NIST Cybersecurity Framework (CSF) 2.0 assessment in calendar year 2026, with the assessment fieldwork beginning in May and the final report delivered to the Board by August. The total estimated cost is $310,000 (external assessor fees, internal labor allocation, and tooling). The assessment will produce a baseline maturity score across all 106 in-scope subcategories, identify priority gaps, and provide the evidentiary foundation for the in-flight HITRUST r2 attestation, the FY27 cybersecurity strategy, and a planned Series D investor diligence cycle.

This is the first enterprise CSF assessment MCT has commissioned. Prior assessments have been narrower in scope (annual SOC 2 Type II, HIPAA Security Risk Assessment, and ad-hoc penetration tests).

---

## 2. Why Now

Five concurrent drivers make 2026 the right time to commission a CSF assessment:

**2.1 HITRUST r2 certification readiness.** The HITRUST CSF v11 framework crosswalks tightly to NIST CSF 2.0. A CSF assessment will produce evidence that can be reused directly in the HITRUST validated assessment workpapers, reducing duplicate effort. With our HITRUST attestation target of September 30, 2026, a CSF baseline completed by mid-2026 will allow remediation work to be sequenced ahead of the HITRUST fieldwork.

**2.2 Customer due diligence pressure.** Of the ten largest prospect opportunities currently in late-stage Sales pipeline, six request CSF maturity scores or equivalent NIST-aligned attestations as part of vendor security review. SOC 2 Type II is no longer sufficient on its own for hospital systems above approximately 1,000 beds. The 2026 assessment output (specifically the function-level heat map and the executive summary) is intended to be shareable under NDA with prospects.

**2.3 Board mandate following the March 2024 phishing incident.** The Board's Audit & Risk Committee, in its post-incident review of "Pebble Phish" (March 2024), directed Management to commission an independent enterprise cybersecurity maturity assessment by FY26. The CSF 2.0 framework was selected over alternatives (CIS v8, ISO 27001 gap assessment) because (a) it is the most widely recognized framework in the U.S. healthcare market, (b) it includes the GOVERN function which addresses several Board-level concerns about risk oversight and supplier risk, and (c) NIST CSF 2.0 was finalized in February 2024 and is now mature enough to assess against without methodology disputes.

**2.4 Series D readiness.** Aldridge Health Partners and Sequoia Capital, our Series C lead investors, have communicated their intent to support a Series D round in calendar 2027. Investor diligence on Series D rounds increasingly includes cybersecurity maturity review. A clean, recently-dated CSF assessment with a clear remediation roadmap signals operational discipline and reduces friction in diligence.

**2.5 Coverage gaps in existing attestations.** Our SOC 2 Type II covers the Trust Services Criteria, which map to a subset of CSF subcategories — primarily in PR (Protect) and DE (Detect). It does not exercise governance, supply chain risk management, recovery testing, or organizational risk strategy in the depth that CSF GOVERN and RECOVER functions require. The 2025 SOC 2 Type II report had no qualifications, but several deviations were noted in the management response that suggest coverage outside the SOC 2 boundary. CSF will surface those.

---

## 3. Scope

The assessment will cover all six CSF 2.0 functions (GOVERN, IDENTIFY, PROTECT, DETECT, RESPOND, RECOVER) and all 22 categories. Of the 106 subcategories, 106 are proposed as in-scope (no exclusions for the 2026 cycle). The assessment will cover the production MeridianCare platform (us-east-1 and us-west-2), the corporate IT environment (Okta, Microsoft 365, endpoints), the legacy on-premises ETL cluster at the Raleigh HQ, and the Pittsburgh secondary site.

Out of scope for this cycle: customer-managed environments (e.g., customer-side EHR integrations are the customers' control responsibility); the Caduceus Analytics legacy codebase, which is segregated and undergoing decommission alongside the legacy ETL cluster; and personal mobile devices, which have access only to Microsoft 365 with conditional access policies and do not store PHI.

---

## 4. Methodology

The assessment will follow the standard CSF assessment workflow:

1. **Document Request List (DRL)** — May 2026 (1 week). The assessor issues a structured DRL covering 12 evidence buckets (governance, risk management, asset management, IAM, training, data security, vendor, monitoring, vulnerability, IR, recovery, audit). MCT has prepared all DRL evidence as part of HITRUST workpaper development; reuse is expected to compress this phase.
2. **Document review** — May/June 2026 (3 weeks). The assessor analyzes evidence, identifies gaps and conflicts, and prepares interview questions targeted at confirming intent vs. practice.
3. **Stakeholder interviews / questionnaires** — June 2026 (2 weeks). 14 interviews planned: CEO, CTO, CFO, CISO, GRC Manager, VP Engineering, VP Customer Success, Privacy Officer (GC), CRO, two security engineers, IAM specialist, security analyst, and one customer-success-side process owner. Where appropriate, structured questionnaires will substitute for interviews to save calendar time.
4. **Findings drafting and socialization** — July 2026 (2 weeks). Draft findings reviewed with control owners; disputes resolved or escalated to the Security Steering Committee.
5. **Scoring** — July 2026 (1 week). Each in-scope subcategory scored on a CMMI-style 1.0–5.0 scale (in 0.25 increments) following the csf.tools practitioner overlay; aggregated to function-level scores; mapped to NIST CSF 2.0 Implementation Tiers (1–4) at the organizational-profile level for executive reporting. Note: per-subcategory CMMI scoring is a tool-imposed overlay and not native to NIST CSF 2.0, which natively defines Tiers only at the organizational profile level.
6. **Report drafting and Board delivery** — August 2026 (2 weeks). Executive summary (2 pages) + function-level summaries (1 page each) + per-subcategory detail. Final report delivered to the Board's Audit & Risk Committee.

---

## 5. Budget

| Line item | Amount | Notes |
|---|---|---|
| External assessor fees (lead firm) | $185,000 | Includes DRL, document review, interviews, findings, scoring, and report. Two finalists identified; selection by Feb 28, 2026. |
| Internal labor allocation | $95,000 | Approx. 480 hours across CISO, GRC Manager, IAM specialist, security engineers, GC, and control owners. Charged at fully loaded rates. |
| Tooling for evidence aggregation | $8,000 | Hyperproof + Vanta evidence collection during HITRUST already covers most needs; incremental cost is for assessor-portal access. |
| Workpaper preparation / evidence cleanup | $10,000 | Internal contractor time to standardize artifacts before assessor receipt. |
| Contingency (10%) | $30,000 | For scope creep, additional interviews, or remediation guidance. |
| **Total** | **$328,000** | $330,000 not-to-exceed approved by Board ($310k base + $20k contingency drawdown authority). |

---

## 6. Risks to the Assessment

**6.1 Resource contention with HITRUST.** The same internal staff (CISO, GRC Manager, IAM specialist) who would support the CSF assessment are simultaneously preparing HITRUST workpapers. Mitigation: sequence so that DRL assembly and document review for both efforts share workpapers; schedule interviews in a single window per stakeholder.

**6.2 Findings disclosure exposure.** The completed CSF report will document gaps. If the report is shared with prospects and a relevant gap is later exploited in a security incident, the report could become discoverable evidence. Mitigation: tier the disclosure — share executive summary and function-level scores only with prospects under NDA; retain detailed findings internally; note in the Board minutes that the Audit & Risk Committee has reviewed and approved the disclosure tiering.

**6.3 Score expectations management.** Initial Board expectations (informal) appear to anchor on Tier 3 across most functions. Internal preliminary self-assessment suggests an aggregate score in the Tier 2 / lower-Tier 3 band, with weaker performance in RECOVER and supplier monitoring (GV.SC) than the Board anticipates. Mitigation: pre-brief the Audit & Risk Committee chair on likely findings before the formal report is delivered.

---

## 7. Decision Requested

The Audit & Risk Committee is asked to:

1. **Approve** the scope (all 106 subcategories in-scope, MCT production and corporate environments only).
2. **Approve** a $330,000 not-to-exceed budget for the 2026 cycle (with $310k base authority and $20k Board-delegated contingency drawdown authority to the CISO and CFO jointly), allocated against the FY26 cybersecurity capital plan line item "Assessment & Audit."
3. **Authorize** the CISO and GRC Manager to select the lead assessor firm by February 28, 2026. Independence requirement: cannot be Schellman (current SOC 2 firm); the two finalists are Coalfire and Crowe.
4. **Authorize** the disclosure tiering described in §6.2.
5. **Acknowledge** the expected score range and the rationale for it.

---

**Document control**

| Field | Value |
|---|---|
| Title | Business Case — 2026 NIST CSF 2.0 Assessment |
| Version | 1.3 (final, approved for submission) |
| Author | Sarah Yoon, CISO |
| Reviewer | Jordan Park, GRC Manager; Marcus Holbrook, GC; Greg Hartman, CFO |
| Decision body | Audit & Risk Committee |
| Decision date | February 5, 2026 (regular committee meeting) |
| Outcome | Approved 5-0 (one abstention) |
