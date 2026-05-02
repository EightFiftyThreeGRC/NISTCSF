# Role-Based Training Catalog

**Document ID:** PLN-RBT-01
**Version:** 2.3
**Effective date:** January 1, 2026
**Last reviewed:** December 19, 2025
**Next review:** December 2026
**Approver:** Sarah Yoon, CISO
**Owner:** Priya Iyer, Security Analyst (operational); Jordan Park, GRC Manager (governance)
**Distribution:** All managers; all in-role personnel; published on internal wiki

---

## 1. Purpose

This Catalog defines the role-based training requirements that supplement the universal annual security awareness curriculum described in PLN-SA-01. It enumerates each in-scope role attribute, the required content, the cadence, the platform of record, and the named curriculum owner. It satisfies the role-based-training requirement of POL-001 §3.7 and supports HIPAA workforce-training obligations under 45 CFR §164.308(a)(5)(i).

## 2. Scope

All MCT personnel whose Workday job profile carries one or more of the role attributes listed in §4. Contractors with the same effective access are treated identically.

Role attributes are sourced from Workday and synchronized into KnowBe4 via the SCIM integration daily. A role-attribute change (for example, when a Customer Success Manager moves into an Implementation role with broader PHI exposure) automatically reassigns the relevant track within 24 hours.

## 3. Track Selection Principles

A role is assigned a track if any of the following apply:

- The role has direct or indirect access to PHI in production at any time during a typical day's work.
- The role has access to production infrastructure, source code that runs in production, or the CI/CD pipeline that deploys to production.
- The role has the authority to authorize wires, change vendor banking details, or direct material payments.
- The role represents MCT to customers or to the public on security or privacy topics.
- The role has organizational authority to direct material spend or set strategy that affects the cyber risk posture.

Tracks are intentionally non-overlapping in their core content but reuse common content where appropriate; an engineer in a security on-call rotation, for instance, completes both the Engineering track and a security-track delta module rather than the full Security track.

## 4. Track Catalog

### 4.1 Engineering — Secure Coding (SecureCodeWarrior)

| Attribute | Detail |
|---|---|
| Audience | All Engineering & Product personnel (148 FTE) |
| Platform | SecureCodeWarrior (browser + IDE plugin) |
| Required hours | 4 hours / year minimum, divided across language tracks (TypeScript/Node.js, Python, Go) per primary stack |
| Required modules | OWASP Top 10 (current); Healthcare-specific anti-patterns (PHI in logs, unsafe FHIR parsing, HL7 v2 message injection); Authentication and authorization patterns (OAuth/OIDC, JWT pitfalls); Cryptographic API misuse; Container and Kubernetes hardening basics |
| Cadence | Continuous; quarterly progress reviewed by Engineering Manager; annual minimum enforced |
| Curriculum owner | Alicia Reyes (Security Engineer, Cloud/AppSec) — content review with VP Engineering Tomás Reyes (no relation) |
| Q1 2026 completion | 96% |

Engineers on the security on-call rotation additionally complete the SecureCodeWarrior "Tournament" mode quarterly (≈90 min) and a Datadog SIEM query primer (≈45 min).

### 4.2 Administrators — Platform & Identity (Pluralsight)

| Attribute | Detail |
|---|---|
| Audience | Personnel with administrative privileges in Okta, AWS production, Microsoft 365, Snowflake, or Datadog (30 FTE total, with overlap to engineering) |
| Platform | Pluralsight (curated learning paths) + KnowBe4 admin-specific module |
| Required modules | "AWS IAM Deep Dive" (Pluralsight path, ~6 hours); "Okta Administrator Essentials" (~4 hours); "Securing Microsoft 365" (~4 hours); MCT-specific PAM procedure walkthrough (PROC-PAM-01) — recorded module via KnowBe4 (~30 min) |
| Cadence | Annual; new admin-attribute holders complete within 60 days of role change |
| Curriculum owner | Ben Olafsson (IAM Specialist) |
| Q1 2026 completion | 93% |

### 4.3 Security Team — Specialty (SANS / conferences / vendor)

| Attribute | Detail |
|---|---|
| Audience | All Information Security personnel (6 FTE) |
| Platform | Mixed — SANS (one course / analyst / year), industry conferences (RSA, BSidesRDU, KubeCon), vendor training (Datadog, CrowdStrike, Wiz, Okta) |
| Required content | Each analyst maintains an annual development plan approved by the CISO. Plan must include at least one structured course or certification track (SANS, ISC2, ISACA, or comparable) and one conference per year. CISSP / CISM / GIAC maintenance is supported. |
| Cadence | Annual development plan; continuous credit accumulation |
| Curriculum owner | Sarah Yoon (CISO) |
| Q1 2026 completion | 100% |

### 4.4 Customer Success — HIPAA Handling Refresher

| Attribute | Detail |
|---|---|
| Audience | All Customer Success personnel (62 FTE), including Implementation Consultants, CSMs, and Support Engineers |
| Platform | KnowBe4 (custom MCT-authored module) + live workshop (annual) led by Marcus Holbrook (GC / HIPAA Privacy Officer) |
| Required content | HIPAA minimum-necessary refresher with healthcare-SaaS examples; safe handling of PHI in support tickets (including the firm rule against pasting PHI into Zendesk); BAA scope — what activities require BAA coverage; recognizing and escalating customer-reported privacy concerns |
| Cadence | Annual; new CS hires within 30 days |
| Curriculum owner | Priya Iyer (operational); Marcus Holbrook (content) |
| Q1 2026 completion | 97% |

### 4.5 Implementation — PHI Data Handling

| Attribute | Detail |
|---|---|
| Audience | Implementation Consultants and Solution Architects who configure customer environments and handle PHI samples during go-live testing (76 FTE; substantial overlap with CS) |
| Platform | KnowBe4 (custom module) + hands-on lab in non-production environment |
| Required content | De-identification procedures for test data (Safe Harbor and Expert Determination methods, MCT-supported tooling); separation of production and non-production environments; rules for screen-share and recorded sessions involving customer environments; FHIR R4 / HL7 v2 message handling that avoids leaking PHI to logs |
| Cadence | Annual |
| Curriculum owner | Priya Iyer (operational); Lauren Pham (VP Customer Success) |
| Q1 2026 completion | 95% |

### 4.6 Finance — Business Email Compromise (BEC) Awareness

| Attribute | Detail |
|---|---|
| Audience | All Finance personnel with payment-authorization, vendor-master, or treasury duties (16 FTE) |
| Platform | KnowBe4 (custom MCT-authored BEC track) + simulated invoice-fraud and vendor-banking-change phishing tests (run separately from the universal quarterly simulation) |
| Required content | Recognition of vendor-impersonation invoice fraud and CEO/CFO-impersonation wire requests; the MCT dual-control standard for vendor-banking-detail changes (PROC-FIN-VND-01); voice-clone and AI-impersonation patterns observed in 2025; the documented call-back protocol for any payment-direction change |
| Cadence | Annual + targeted briefings as warranted |
| Curriculum owner | Priya Iyer (operational); Greg Hartman (CFO) |
| Q1 2026 completion | 100% |

### 4.7 Executive — Cyber-Strategy Briefings

| Attribute | Detail |
|---|---|
| Audience | Executive Leadership Team (12 personnel — CEO, CTO, CMO, CFO, CRO, CPO, GC, CISO, VP Engineering, VP Customer Success, plus the Executive Chair and one rotating Board member) |
| Platform | Live, facilitated briefings; complemented by quarterly written CISO report |
| Required content | Quarterly briefings (60–90 min) on the threat landscape, peer benchmarks, regulatory developments (HIPAA, state privacy), and the MCT cyber risk register. Annual tabletop participation in at least one IR exercise. Annual review of RAS-2025-12. |
| Cadence | Quarterly briefings; annual exercise; annual policy acknowledgement |
| Curriculum owner | Sarah Yoon (CISO) with support from external advisor (Aldridge Health Partners cyber operating partner) |
| Q1 2026 completion | 100% |

### 4.8 Clinical Operations — PHI Stewardship for Clinicians

| Attribute | Detail |
|---|---|
| Audience | Clinically licensed staff (RN, MD, MSW) embedded in Clinical Operations (36 FTE) |
| Platform | KnowBe4 custom module |
| Required content | Customer-facing PHI handling expectations (workshops, screen-share, recorded sessions); the boundary between MCT advisory work and customer treatment workflows; minimum-necessary in advisory contexts |
| Cadence | Annual |
| Curriculum owner | Priya Iyer (operational); Dr. Aisha Bello (CMO) |
| Q1 2026 completion | 100% |

## 5. Cross-Track Mapping (Role to Required Tracks)

| Job profile (Workday) | Eng | Admin | Security | CS | Impl | Finance | Exec | Clin |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Software Engineer | x | | | | | | | |
| Senior / Staff Engineer | x | | | | | | | |
| Engineering Manager | x | | | | | | | |
| Site Reliability Engineer | x | x | | | | | | |
| Security Engineer | x | x | x | | | | | |
| Security Analyst | | | x | | | | | |
| GRC Manager / IAM Specialist | | x | x | | | | | |
| IT Admin | | x | | | | | | |
| Customer Success Manager | | | | x | | | | |
| Implementation Consultant | | | | x | x | | | |
| Solution Architect | x | | | | x | | | |
| Support Engineer | | | | x | | | | |
| Finance / AP / Treasury | | | | | | x | | |
| RN / MD / MSW (Clin Ops) | | | | | | | | x |
| Executive (ELT) | | | | | | | x | |

## 6. Curriculum Refresh

Each curriculum owner reviews their track quarterly for relevance. Material updates require CISO approval. The full Catalog is reviewed annually. Out-of-cycle additions triggered by post-incident lessons learned, threat-intelligence shifts, or regulatory changes are logged in the `awareness-content-changelog` repository and announced in MeridianSec Monthly.

## 7. Related Documents

- POL-001 Information Security Policy (§3.7)
- PLN-SA-01 Security Awareness Program Plan
- POL-AT-01 Awareness and Training Policy
- PROC-PAM-01 Privileged Access Management Procedure
- PROC-FIN-VND-01 Vendor Banking Change Procedure (Finance)
- RPT-Training-Completion-Q4-2025

## 8. Document Control

| Version | Date | Author | Change summary |
|---|---|---|---|
| 1.0 | 2024-06 | S. Yoon | Initial catalog post-Pebble Phish |
| 2.0 | 2025-02 | P. Iyer | First catalog under Iyer; added Implementation track; added Pluralsight admin path |
| 2.1 | 2025-08 | P. Iyer | Added Clinical Operations track |
| 2.2 | 2025-10 | P. Iyer | Refreshed Engineering content for FHIR/HL7 anti-patterns |
| **2.3** | **2025-12** | **P. Iyer** | **Annual review; added executive cyber-strategy briefing cadence; refined cross-track mapping; added BEC voice-clone content** |
