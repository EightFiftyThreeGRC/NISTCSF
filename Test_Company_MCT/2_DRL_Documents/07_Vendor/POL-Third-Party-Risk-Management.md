# Third-Party Risk Management Policy

**Document ID:** POL-TPRM-01
**Version:** 5.0
**Effective date:** February 1, 2026 (current version reflects Q1 2026 redesign approved by Audit & Risk Committee Dec 11, 2025)
**Approver:** Sarah Yoon, CISO; Marcus Holbrook, GC; Greg Hartman, CFO
**Owner:** Jordan Park, GRC Manager
**Distribution:** Procurement, Engineering, Legal, Customer Success leadership; available on internal wiki

---

## 1. Purpose

This Third-Party Risk Management ("TPRM") Policy establishes Meridian Care Technologies, Inc.'s ("MCT") approach to identifying, assessing, treating, and monitoring cybersecurity risks arising from relationships with suppliers, vendors, partners, and other third parties that access MCT data or systems, or operate on MCT's behalf. The Policy supports the Information Security Policy (POL-001) and the Risk Appetite Statement (RAS-2025-12).

This v5.0 reflects the Q1 2026 redesign of the supplier program, motivated by the Change Healthcare/ALPHV ransomware event of February-March 2024 and increasing customer-due-diligence pressure for continuous-monitoring evidence.

## 2. Scope

This Policy applies to:

- **All current and prospective third parties** that will access MCT data, MCT systems, or operate on MCT's behalf — regardless of contract value.
- Vendors of cybersecurity tooling, infrastructure, software, professional services, clinical-content services, and outsourced operations.
- Subcontractors of any of the above where MCT data or system access is in scope (downstream supplier risk).

## 3. Supplier Tiering

Suppliers are tiered based on the sensitivity of access granted, the criticality of the service to MCT operations, and the regulatory exposure created by the relationship. Tiering is documented in the Supplier Criticality Tiering inventory (INV-Supplier-Tiering).

| Tier | Definition | Examples | TPRM treatment |
|---|---|---|---|
| **Tier 1 — Critical** | Hosts, transmits, or processes PHI on behalf of MCT; or a single-source dependency for P1 services; or any breach of which would materially impact MCT customer service. | AWS, Okta, Snowflake, Surescripts, Change Healthcare (when production-active) | Annual reassessment + continuous attestation feed via Vanta where supported; mandatory BAA; mandatory contractual security clauses; quarterly status review with Procurement and CISO |
| **Tier 2 — High** | Hosts MCT operational data, has elevated system access, or supports an FY revenue-critical workflow. | Datadog, CrowdStrike, Arctic Wolf, Microsoft, Wiz, Vanta, Hyperproof, Auth0 | Annual reassessment; continuous-monitoring expansion in flight (target Q3 2026); BAA required where PHI is in scope |
| **Tier 3 — Moderate** | Limited system access, or supports non-critical workflows. | GitHub, Slack, Zoom, Figma, Google Workspace, Notion (non-production) | Annual lightweight reassessment; security questionnaire only; BAA only if PHI in scope |
| **Tier 4 — Low** | No production system access; operates on public data only. | Marketing platforms, recruitment tools, some internal SaaS | Onboarding-only review; reassessment on contract renewal |

A vendor's tier is set at onboarding by the GRC Manager and CISO and is reviewed at each reassessment cycle. Tier changes require GRC Manager approval and re-execution of any tier-specific contractual provisions.

## 4. Lifecycle

### 4.1 Pre-engagement (planning and due diligence)

Before contracting with any new vendor in Tier 1 or Tier 2:

1. **Need validation.** The requesting team submits a TPRM intake to GRC. Need is validated against existing tooling (no duplicate spend) and architecture fit.
2. **Tier determination.** GRC Manager assigns the candidate tier based on §3.
3. **Security questionnaire.** Vendor completes the MCT Security Questionnaire (the SIG-Lite for Tier 3; the full SIG for Tier 2; a custom MCT-Critical-Vendor questionnaire for Tier 1, which extends SIG with HIPAA-specific items).
4. **Evidence review.** GRC reviews the vendor's most recent SOC 2 Type II (required for Tier 1 and Tier 2), HITRUST certification (preferred for Tier 1), penetration test executive summary, and any relevant ISO 27001 certificate.
5. **Risk scoring.** GRC produces a risk score and remediation expectations.
6. **Legal review and contracting.** The GC reviews the data-handling and security clauses; BAA executed where PHI is in scope; contractual security commitments locked in.
7. **Steering Committee review.** Tier 1 vendors are reviewed by the Security Steering Committee before contract execution.

### 4.2 Operations (continuous monitoring and reassessment)

Tier 1 vendors:
- **Annual full reassessment.** Refresh of all evidence; on-site (virtual) assessor session for top-3 vendors (AWS, Okta, Snowflake) where the vendor permits.
- **Continuous attestation feeds.** Vanta-integrated where supported (AWS, Okta, Snowflake operational as of Q4 2025; expansion to Surescripts and Change Healthcare in flight, target Q3 2026).
- **Quarterly status review** with Procurement and CISO covering status, incidents, control changes, and renewal posture.
- **Sub-processor change notification** required from the vendor under contract.

Tier 2 vendors:
- **Annual reassessment** with refreshed SIG, SOC 2, and pentest.
- **Continuous-monitoring expansion** to all Tier 2 vendors targeted Q3 2026 — Datadog and Arctic Wolf are highest priority.
- **Incident notification** required within 72 hours of vendor-side incident.

Tier 3 / Tier 4: lightweight annual or contract-renewal cycle.

### 4.3 Termination

When a vendor relationship ends:
- Data return or destruction confirmed via BAA-required certification.
- Access revocation across MCT systems within 72 hours of contract end.
- Sub-processor relationships terminated (where MCT was the sub-processor).
- Records retained per Document Retention Schedule (REG-RR-01).

## 5. Continuous-Monitoring Expectations (Q1 2026 redesign)

The redesigned program expands continuous monitoring beyond the historical annual-reassessment cadence:

- **Real-time attestation feed (Vanta).** AWS, Okta, Snowflake feeds are operational as of Q4 2025. Surescripts, Change Healthcare, and Datadog target Q3 2026.
- **Public threat intelligence ingestion.** Vendor security advisories ingested via subscription feeds (Truesec, KrebsOnSecurity, vendor RSS); material advisories trigger an out-of-cycle review.
- **Annual concentration risk review.** GRC + CFO assess whether reliance on any single vendor exceeds appetite (e.g., >$500K annualized loss exposure single-vendor).
- **Incident-driven reviews.** Any vendor security event affecting MCT (whether or not a BAA notification was triggered) prompts an out-of-cycle status review and an updated risk score.

The Change Healthcare event of February-March 2024 is recognized as the catalyzing event for this expansion. CHC was at the time of the event in pilot integration only, and no MCT data was exposed; nonetheless the event surfaced gaps in MCT's continuous monitoring of clearinghouse providers and is the primary illustration cited in the redesign rationale.

## 6. Required Contractual Provisions

For Tier 1 and Tier 2 vendors, the following contractual provisions are required (Tier 3 simplified, Tier 4 minimal):

- Business Associate Agreement (BAA) where PHI is in scope.
- Right to audit (annual; cost borne by MCT for non-trigger audits, by vendor for cause-based audits).
- Incident notification within 72 hours of vendor's awareness; quicker for confirmed compromises.
- Sub-processor approval and notification requirements.
- Data return / destruction at termination.
- Insurance minimums (vendor cyber liability minimum $5M per claim for Tier 1; $2M for Tier 2).
- Specific security-control commitments (encryption at rest and in transit, MFA for vendor personnel accessing MCT data, 24x7 detection capability).
- Cooperation in MCT customer-mediated audits where MCT customer demands diligence on the vendor.

The Master Services Agreement template (MSA-2025) and the BAA template (BAA-2025) reflect these provisions. Older contracts are being amended on a renewal-by-renewal basis; the legacy translation services vendor (referenced in the backgrounder) is one such case.

## 7. Roles and Responsibilities

| Role | Responsibility |
|---|---|
| GRC Manager (Jordan Park) | Owns the TPRM program; assigns tiers; reviews evidence; maintains the supplier inventory |
| CISO (Sarah Yoon) | Approves Tier 1 onboarding; chairs Steering Committee review |
| GC (Marcus Holbrook) | Reviews and approves contract security clauses; manages BAA lifecycle |
| CFO (Greg Hartman) | Joint owner of supplier risk register with CISO; approves financial concentration |
| Procurement | Tactical ownership of contract execution; quarterly status reviews with CISO |
| Engineering / requesting team | Identifies need; supports technical due diligence; consumes vendor service post-onboarding |

## 8. Document Control

| Version | Date | Change summary |
|---|---|---|
| 4.0 | 2024-09 | Post-Pebble Phish update; added 72h incident notification requirement; expanded Tier 1 |
| 4.1 | 2025-04 | Auth0 added to Tier 2; Okta moved to Tier 1 (was Tier 2); reflected acquisition |
| **5.0** | **2026-01** | **Q1 2026 program redesign: continuous-monitoring expectations introduced; Vanta integration formalized; Tier 1 quarterly status review introduced; incident-driven review process formalized; Change Healthcare event cited as catalyst** |
