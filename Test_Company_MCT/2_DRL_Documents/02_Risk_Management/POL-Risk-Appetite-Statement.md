# Cybersecurity Risk Appetite Statement

**Document ID:** RAS-2025-12
**Version:** 2.0
**Effective date:** January 1, 2026
**Approval:** Board of Directors, December 11, 2025 (resolution recorded in board minutes)
**Owner:** Sarah Yoon, CISO; co-signed by Greg Hartman, CFO; Marcus Holbrook, GC
**Distribution:** Internal — All employees in roles affecting cybersecurity risk decisions; available on internal wiki

---

## 1. Purpose

This Risk Appetite Statement ("RAS") communicates the level of cybersecurity risk the Board of Directors of Meridian Care Technologies, Inc. ("MCT") is willing to accept in pursuit of the Company's mission. It supports the Information Security Policy (POL-001) and the Enterprise Risk Management Policy (POL-ERM-01). It is the primary input to risk-acceptance decisions, treatment-vs-acceptance trade-offs, and prioritization of security investments.

This RAS is reviewed at least annually by the Audit & Risk Committee and re-approved by the Board.

## 2. Risk Capacity vs. Risk Appetite

**Risk capacity** is the maximum amount of risk the Company could absorb. For MCT, the financial capacity boundary is approximately $5M in annualized cyber loss before triggering material covenant or runway concerns; the regulatory boundary is the imposition of an HHS OCR Resolution Agreement or equivalent state regulator action, which would impair the Company's ability to operate as a HIPAA Business Associate.

**Risk appetite** is the amount of risk the Board chooses to accept inside that capacity in pursuit of strategic objectives. The Board has set risk appetite well below capacity:

## 3. Quantitative Risk Appetite Thresholds

| Dimension | Appetite | Tolerance / escalation trigger |
|---|---|---|
| **PHI confidentiality breach** | Zero tolerance for any HIPAA Breach Notification Rule trigger (>500 records). | Below the 500-record threshold: tolerance for one event per fiscal year provided contained within 24 hours and notified per §164.408. |
| **Annualized cyber loss expectancy (ALE)** | Up to $2M aggregate across all cyber risk register entries. | $2M–$3M aggregate triggers Audit & Risk Committee notification. >$3M triggers Board notification and strategic review. |
| **P1 service availability** | ≥99.5% monthly availability for clinical-coordination workflows (ToC, Referral Lifecycle). | <99.5% triggers customer-facing notification per SLA; <99.0% in any month triggers Board notification. |
| **P2 service availability** | ≥99.0% monthly. | <99.0% triggers customer notification. |
| **Regulatory action** | Zero tolerance for an HHS OCR Notice of Proposed Determination, an FTC enforcement action, or comparable state regulator action. | Any regulator inquiry triggers immediate GC and CISO notification; HHS OCR civil investigation triggers Board notification. |
| **Customer-attributable security advisory** | Tolerance for one customer-facing security advisory per fiscal year provided no PHI exposure occurred. | Two or more such advisories in a fiscal year trigger Audit & Risk Committee review of root causes. |
| **SOC 2 Type II exceptions** | Zero qualifications. | Any qualification triggers Audit & Risk Committee review. |
| **Critical or High vulnerabilities outside SLA** | ≤2 critical, ≤25 high outside SLA at any point in time. | Persistent breach of these levels for >30 days triggers escalation to Steering Committee. |

## 4. Qualitative Risk Appetite

Beyond quantitative thresholds, the Board has communicated the following qualitative posture:

**4.1 Patient safety.** Where a cybersecurity decision could affect a patient's clinical care (for example, the availability of P1 clinical-coordination workflows during a recovery scenario), MCT will err strongly on the side of caution. The Board has stated it is willing to accept higher operational cost, slower feature velocity, or reduced engineering throughput to maintain a defensible patient-safety posture.

**4.2 Trust as a competitive asset.** MCT competes on trust. The Company will not knowingly take a cybersecurity short-cut to win or retain a customer. Where a customer requests a contractual security commitment that exceeds the Company's current capability, the Company will negotiate truthfully rather than overcommit.

**4.3 Innovation tempo.** MCT operates in a competitive market and must ship product. Within the quantitative appetite thresholds, the Board accepts ordinary cybersecurity risks attendant to a healthy product-development pace. The Board does not expect zero risk; it expects informed, documented risk decisions.

**4.4 Compliance posture.** MCT pursues compliance frameworks (HIPAA Security Rule, HITRUST CSF r2, SOC 2 Type II) as evidence of program maturity and as a precondition to commercial relationships. The Board does not view "minimum compliance" as sufficient; the program is expected to operate above the floor set by any one regulatory framework.

**4.5 Supply chain.** The Board has acknowledged that the Company's supply chain (cloud providers, identity providers, clearinghouses, security tooling vendors) is a material source of risk. The Board's appetite for supplier risk is lower than its appetite for native risk by design — supplier risk-acceptance decisions face higher scrutiny.

## 5. Application of Appetite to Decisions

This RAS is the primary input to:

- Risk-acceptance decisions on the cyber risk register. Risks with residual scores within appetite may be accepted; risks above appetite require treatment.
- Investment trade-offs. Where competing investments could each address risks within appetite, prioritization considers cost-effectiveness, alignment with FY strategic priorities, and downstream maturity benefit.
- Vendor onboarding. Vendors whose risk posture would push aggregate ALE above appetite cannot be onboarded without compensating controls or risk acceptance by the Audit & Risk Committee.
- Architectural decisions. New service designs are evaluated against this RAS as part of the threat-modeling process.

## 6. Reporting

Compliance with this RAS is reported to the Audit & Risk Committee quarterly as part of the cyber risk register review. Aggregate ALE is calculated using FAIR (Factor Analysis of Information Risk) methodology by the GRC Manager; FAIR estimates are refreshed semi-annually and validated by the Steering Committee.

## 7. Document Control

| Version | Date | Approver | Change summary |
|---|---|---|---|
| 1.0 | 2024-12 | Board | Initial RAS (qualitative only) |
| **2.0** | **2025-12** | **Board** | **Quantitative thresholds added; FAIR ALE methodology adopted; PHI breach threshold aligned to HIPAA §164.408; service-tier availability targets aligned to backgrounder §6.5** |
