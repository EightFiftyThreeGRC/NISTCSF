# Meridian Care Technologies, Inc.

## Company Backgrounder

**Document classification:** Internal — Distribution Limited
**Owner:** Office of the CEO
**Last reviewed:** February 12, 2026
**Document version:** 4.2

---

## 1. Executive Summary

Meridian Care Technologies, Inc. ("MCT" or "the Company") is a privately held healthcare technology company headquartered in Raleigh, North Carolina. MCT develops and operates a cloud-based care coordination platform used by mid-sized health systems, specialty clinic networks, and accountable care organizations to coordinate transitions of care, manage referrals, and surface gaps in care for patients with chronic conditions.

As of January 31, 2026, MCT employs 348 people across two physical sites and a distributed remote workforce, generates approximately $82M in trailing-twelve-month annualized recurring revenue, and serves 47 customer organizations whose downstream patient populations together total approximately 2.4 million individuals. MCT is a HIPAA Business Associate to all of its customers and is currently pursuing HITRUST CSF r2 certification with a target attestation date of September 30, 2026.

MCT is privately held and venture-backed. Its most recent funding round (Series C, $58M, March 2024) was led by Aldridge Health Partners with participation from Sequoia Capital, Oak HC/FT, and Mayo Clinic Ventures. The Company is not currently a Sarbanes-Oxley filer.

---

## 2. Company History and Mission

MCT was founded in October 2014 by Dr. Elena Voss (then a hospitalist at UNC Health) and Marcus Chen (an early Epic implementation engineer). Their founding insight was that the operational gap between inpatient and outpatient care — long understood by clinicians as a major driver of avoidable readmissions — was not adequately addressed by the dominant EHR platforms, which optimized for documentation rather than coordination. The original product, "MeridianHandoff," was a lightweight web application that allowed discharge planners to assign post-acute follow-up tasks to community providers and track completion. The first paying customer was Cone Health (Greensboro, NC), which signed a one-system pilot in March 2015.

The Company has since broadened its scope. The current product suite — branded under the umbrella "MeridianCare" — covers transitions of care, referral management, chronic care management, and care plan adherence tracking. The platform is used by clinical care managers, social workers, discharge planners, and increasingly by automated workflows that surface care gaps directly to attending providers.

**Mission statement:**

> *"To make it impossible for a patient to fall through the cracks between care settings."*

This mission is published on the corporate website, in the employee handbook, and on the wall of every physical office. It is invoked explicitly in the cybersecurity strategy: the most cited justification for the Company's investment in availability, integrity, and confidentiality controls is that patient care decisions depend on the platform being trustworthy.

---

## 3. Products and Services

MeridianCare is delivered as a multi-tenant SaaS application, with single-tenant logical isolation in AWS for customers under a contractual data residency requirement. The platform comprises four product modules:

**1. Transitions of Care (ToC).** The original module. Used by hospital discharge teams to hand off patients to skilled nursing facilities, home health agencies, and primary care providers. Includes structured task lists, document exchange via Direct Trust, and SLA tracking.

**2. Referral Lifecycle Management.** Used by specialty clinic networks to manage incoming and outgoing referrals, capture clinical attachments, and track loop-closure (the percentage of referred patients who are seen by the receiving specialist within the clinically appropriate window).

**3. Chronic Care Management (CCM).** Used by primary care practices and ACOs to enroll Medicare-eligible patients in CMS Chronic Care Management programs, log monthly care coordination time, and generate billing-ready logs for CPT codes 99490, 99491, and 99487.

**4. Population Insights.** A cohort analytics layer on top of the operational modules. Allows clinical leadership to identify high-risk patient populations (recent ED utilizers, patients with multiple uncontrolled chronic conditions, etc.) and assign them to care management programs.

All modules share a common identity, audit, and data layer. The platform integrates with major EHRs (Epic, Cerner/Oracle Health, Meditech, athenahealth) via FHIR R4 APIs and HL7 v2 feeds, with Change Healthcare for clearinghouse services, and with Surescripts for medication history.

---

## 4. Customer Base

MCT's customers fall into three segments:

**Mid-sized health systems** (24 customers, ~62% of ARR): regional hospital systems with 2–8 acute care facilities. Examples: Cone Health (NC), Reading Hospital — Tower Health (PA), Inova Health System (Northern VA, partial deployment), Allegheny Health Network (PA, ToC module only).

**Specialty clinic networks** (15 customers, ~26% of ARR): multi-site cardiology, oncology, orthopedics, and behavioral health groups. Largest: Carolina Cardiology Associates (12 sites, NC and SC).

**ACOs and primary care groups** (8 customers, ~12% of ARR): physician-led accountable care organizations participating in MSSP and ACO REACH.

The largest single customer represents 8.4% of ARR. The top five customers collectively represent 31% of ARR. No customer is on a month-to-month contract; standard term is three years with annual renewal options.

Approximately 2.4 million unique patient records are processed by the platform across all customers. Patient records include demographics, problem lists, medication lists, allergies, recent encounter summaries, care plan attachments, and structured tasks. The platform does not store full longitudinal medical records — it acts as a coordination layer that references records held in customer EHRs.

---

## 5. Leadership and Organizational Structure

The MCT Board of Directors consists of seven members: Dr. Elena Voss (Co-founder, Executive Chair), Marcus Chen (Co-founder, on Board but no operating role since 2022), Helena Park (CEO), three investor-appointed directors (Aldridge Health Partners, Sequoia Capital, Mayo Clinic Innovation Fund), and one independent director (Dr. James Okonkwo, former CMIO of a top-20 health system).

**Executive leadership team (as of February 2026):**

| Role | Name | Tenure |
|---|---|---|
| Chief Executive Officer | Helena Park | Joined 2021 (from Optum Health) |
| Chief Technology Officer | David Mehta | Joined 2018 |
| Chief Medical Officer | Dr. Aisha Bello, MD | Joined 2020 |
| Chief Financial Officer | Greg Hartman | Joined 2023 |
| Chief Revenue Officer | Sara Whitfield | Joined 2022 |
| Chief People Officer | Linda Chao | Joined 2023 |
| General Counsel; designated HIPAA Privacy Officer (§164.530(a)(1)) | Marcus Holbrook, JD | Joined 2022 |
| Chief Information Security Officer (and HIPAA Security Official, §164.308(a)(2)) | Sarah Yoon, CISSP, CISM | Joined 2023 (from Cerner) |
| VP, Engineering | Tomás Reyes | Joined 2017 |
| VP, Customer Success | Lauren Pham | Joined 2019 |

The Company is organized into seven functional groups: Engineering & Product (148 FTE), Customer Success & Implementation (62 FTE), Sales & Marketing (54 FTE), Clinical Operations (36 FTE — clinically licensed staff who advise customers on workflow design), G&A (36 FTE — Finance, Legal, HR, Facilities), Information Security (6 FTE), and Office of the CEO / Executive Leadership (6 FTE — CEO, CTO, CMO, CFO, CRO, CPO; the GC is counted in G&A and the CISO in Information Security). Total: 348 FTE.

Approximately 30% of the workforce is fully remote. The remaining workforce is split between the Raleigh HQ (210 FTE on-site or hybrid) and the Pittsburgh site (38 FTE), which was acquired in October 2022 along with the Population Insights analytics technology from a former competitor, Caduceus Analytics.

---

## 6. Security Organization

The Information Security function consists of six full-time employees, all reporting to the CISO. Sarah Yoon, the CISO, also serves as MCT's designated HIPAA Security Official under 45 CFR §164.308(a)(2).

| Role | Name | Joined | Notes |
|---|---|---|---|
| Chief Information Security Officer | Sarah Yoon | Jan 2023 | Reports to CTO David Mehta with dotted line to CEO and quarterly Board reporting |
| GRC Manager | Jordan Park | Mar 2023 | Owns policy framework, audit liaison, HITRUST program, vendor risk |
| Security Engineer (Cloud/AppSec) | Alicia Reyes | Jul 2023 | Owns AWS security, IaC scanning, AppSec reviews |
| Security Engineer (Detection & Response) | Marcus Tan | Sep 2024 | Owns SIEM tuning, EDR, IR runbooks |
| Security Analyst | Priya Iyer | Feb 2025 | Triage, phishing response, awareness program ops |
| IAM Specialist | Ben Olafsson | May 2024 | Owns Okta, access reviews, PAM |

The CISO has authority to escalate any cybersecurity matter directly to the CEO and the Board's Audit & Risk Committee. The CISO presents to the Board's Audit & Risk Committee quarterly and provides a written report to the full Board annually. A Security Steering Committee (CTO, CISO, GC, VP Engineering, VP Customer Success) meets monthly to review the cyber risk register, prioritization, and remediation progress.

The Information Security budget for FY26 is approximately $4.1M (5.0% of ARR). Approximately 60% of that is personnel; 40% is tooling, third-party services (24x7 MDR, annual penetration testing, annual SOC 2 audit), and HITRUST certification costs.

External security partners include: Datadog (SIEM, observability), CrowdStrike (EDR), Okta (IDP/SSO/MFA), Wiz (CSPM and IaC scanning), Vanta (compliance automation, used for SOC 2), Hyperproof (HITRUST control evidence repository), and Arctic Wolf (24x7 MDR, contracted May 2024 in direct response to the March 2024 phishing incident; expansion under negotiation as of February 2026).

---

## 6.5 Service Tiers, RTO/RPO Targets, and Risk Appetite

**Service tiering (Board-approved Dec 2025):**

| Tier | Services | Target RTO | Target RPO | Notes |
|---|---|---|---|---|
| P1 | Transitions of Care, Referral Lifecycle Management (clinical-coordination workflows where downtime can defer patient care actions) | 4 hours | 15 minutes | Aurora multi-AZ + cross-region read replica |
| P2 | Chronic Care Management, Population Insights | 24 hours | 4 hours | Snowflake replication; relaxed because the data is analytical, not operational |
| P3 | Internal reporting, marketing site, non-customer-facing internal tools | 72 hours | 24 hours | Best-effort restoration |

These targets are documented commitments, not measured current capability. Capability gaps relative to target are tracked in the cyber risk register (R2: recovery testing depth; R6: warm-DR readiness for Population Insights).

**Risk appetite (Board-approved Dec 2025):**

| Dimension | Threshold | Notes |
|---|---|---|
| PHI confidentiality | Zero tolerance for any breach affecting >500 records (HIPAA Breach Notification Rule trigger). Tolerance for <500 records contained within 24 hours, reportable per 45 CFR §164.408. | Hard limit. |
| Annualized cyber loss expectancy | Up to $2M aggregate across all cyber risk register entries. | Quantified using FAIR methodology, refreshed semi-annually. |
| P1 service availability | ≥99.5% monthly availability for clinical-coordination workflows. Below 99.0% triggers Board notification. | |
| Regulatory action | Zero tolerance for an HHS OCR Notice of Proposed Determination or comparable state regulator action. | |
| Customer-attributable security event | Tolerance for one customer-facing security advisory per fiscal year provided no PHI exposure occurred. | |

The Risk Appetite Statement document (RAS-2025-12) is referenced in subsequent governance and risk-management evidence.

## 7. Technology Stack and Infrastructure

The MeridianCare platform is AWS-native and operates primarily out of the AWS us-east-1 region (N. Virginia), with a warm DR environment in us-west-2 (Oregon). Customers under EU residency requirements (none currently in production; one in negotiation) would be served from eu-central-1.

**Application architecture:** Polyglot microservices (Node.js, Python, Go) running on Amazon EKS (Kubernetes 1.28). Services communicate via internal API gateway (AWS API Gateway + custom envoy mesh). All public-facing traffic terminates at AWS CloudFront with AWS WAF v2 in front of an Application Load Balancer. Mobile and desktop clients communicate with the platform via authenticated REST and FHIR R4 APIs.

**Data tier:** Amazon Aurora PostgreSQL (multi-AZ, encrypted with AWS KMS customer-managed keys) for transactional data. Snowflake (separate accounts per environment) for analytical workloads, with data ingested via Fivetran from Aurora. Amazon S3 (KMS-encrypted) for document and attachment storage. Amazon ElastiCache (Redis) for session state — encryption-at-rest with AWS-managed keys, encryption-in-transit via TLS, no PHI persisted in session payload (only opaque session IDs and user UUIDs). All east-west and north-south application traffic is mTLS or TLS 1.2+.

**Audit logging:** AWS CloudTrail, Okta system log, Aurora pgAudit, and Datadog security events are aggregated to Datadog Cloud SIEM. Logs are retained 90 days hot in Datadog and 7 years cold in S3 (Glacier transition at 365 days), satisfying the HIPAA documentation-retention requirement under 45 CFR §164.316(b)(2).

**Identity:** Okta is the single source of identity for both employees and customer-facing administrative users. Patient-facing portals (where deployed) use Auth0. MFA is mandatory for all employees and all customer admin accounts; phishing-resistant MFA (FIDO2/WebAuthn) is mandatory for engineers, security staff, and any administrator with production access.

**Endpoints:** Approximately 380 managed endpoints (laptops only; no desktops or BYOD). Apple macOS (Apple silicon) is the standard for engineering and security; Windows 11 is the standard for sales, customer success, finance, and HR. All endpoints are managed via Jamf Pro (macOS) or Microsoft Intune (Windows) and run CrowdStrike Falcon. Mobile devices are not managed unless they are issued by IT; personal mobile devices may access only Microsoft 365 with conditional access policies (Intune compliance, MFA, no jailbreak/root). Phishing-resistant MFA (FIDO2/WebAuthn) is mandatory for engineers, security staff, and any administrator with production access; full enforcement was achieved Q4 2025.

**Legacy:** A legacy on-premises ETL cluster at the Raleigh HQ continues to support a deprecating EHR integration for two long-tenured customers. The cluster is scheduled for decommission in Q4 2026 once those customers complete migration to the modern integration. The cluster is included in the in-scope environment for assessments and is the source of multiple known control gaps (e.g., it is not in the central asset inventory automation, and patching is manual).

---

## 8. Regulatory and Compliance Profile

MCT is a HIPAA Business Associate to all of its customers and signs a Business Associate Agreement (BAA) with each. The Company is contractually obligated to comply with the HIPAA Privacy Rule, Security Rule, and Breach Notification Rule, plus state-level privacy laws as applicable to customers located in California, Colorado, Connecticut, Texas, Virginia, and New York.

**Current attestations and certifications:**

- **SOC 2 Type II** — Annual report covering all five Trust Services Criteria; most recent report covers calendar year 2025 (issued February 2026 by Schellman & Co.).
- **HITRUST CSF r2** — Self-assessment completed Q4 2025; validated assessment in flight; target r2 (2-year) certification September 30, 2026. (An i1 certification was considered as a stepping-stone in Q3 2025 and rejected in favor of going straight to r2 to satisfy customer due-diligence requests.)
- **HIPAA Security Risk Assessment (SRA)** — Annual; most recent completed January 2026.

**Insurance:** A $20M cyber insurance policy is held with Beazley plc, with $5M for breach response, $10M for liability, $5M for business interruption. The policy was last renewed January 1, 2026.

**Other:** MCT is not subject to PCI DSS (does not process payment cards directly; payments are tokenized via Stripe). MCT is not currently subject to FedRAMP (no federal customers). MCT is not a public company and is not subject to Sarbanes-Oxley.

---

## 9. Recent Security Incidents and Lessons Learned

**Reportable incidents (past 24 months):**

**Mar 14, 2024 — "Pebble Phish."** A targeted phishing email was delivered to nine billing clerks in the Customer Success operations group. One clerk submitted credentials to a credential-harvesting page that imitated the Okta sign-in screen. The attacker attempted authentication to Okta within 11 minutes of credential submission. The MFA challenge was Okta Verify push (this was prior to the Q4 2024 mandatory FIDO2 rollout for privileged users); the user did not approve the push. Three additional MFA prompts were sent to the user over the next 14 minutes, all rejected. Detection: an MFA-fatigue alert in Okta fired at 11:07 EDT and was triaged by the on-call security engineer at 11:14 EDT. Containment: Okta sessions for the affected user were revoked, and the user's Okta password was reset, by 11:31 EDT. Post-incident: PHI was not accessed; the user's email and the affected SaaS apps were reviewed for evidence of access (none found). Outcome: no PHI exposed, no breach notification required, no regulator notification triggered.

The incident produced four major program changes: (1) FIDO2/WebAuthn policy was adopted Q4 2024 for all production-access roles, with phased enrollment rolling out through 2025 and full enforcement achieved Q4 2025; (2) Arctic Wolf 24x7 MDR was contracted in May 2024 to provide overnight monitoring; (3) the security awareness program added quarterly phishing simulations targeting credential-harvesting scenarios specifically; (4) the DLP project was approved and is currently in design.

**Minor incidents (not reportable; included for completeness):**

- **Feb–Mar 2024 (third-party event, no direct MCT impact):** Change Healthcare ALPHV/BlackCat ransomware event. MCT had completed contracting and integration test for production CHC clearinghouse use but had not yet activated production billing flows; pilot only. No MCT data was exposed. The event triggered an emergency vendor risk review of CHC and the addition of a backup clearinghouse path (Waystar) to the FY26 roadmap. Documented in vendor file CHC-2024 and is the catalyst for the FY26 expansion of supplier continuous monitoring (see §10 priority 7 below).
- **Sep 2024:** Two-hour partial availability incident for the Population Insights module caused by a misconfigured Snowflake virtual warehouse auto-scaling rule. No security impact. Lessons learned fed into the FY26 Q1 chaos engineering charter.
- **Jul 2025:** A subcontractor of one of MCT's vendors (a translation services provider used by Customer Success for Spanish-language patient education materials) was breached. MCT was notified by the vendor; review confirmed the subcontractor had no access to MCT systems and no MCT data was exposed. Documented in vendor file; no further action required.

---

## 10. Current Strategic Priorities (Cybersecurity)

**FY26 cybersecurity strategy themes (Board-approved Dec 2025):**

1. **HITRUST CSF r2 attestation by September 30, 2026.** Driven by customer due diligence requests; three of MCT's top ten prospects in 2026 require HITRUST as a precondition to contract.

2. **Legacy ETL decommission, Q4 2026.** Eliminates a known control gap in PR.PS and reduces in-scope footprint for HITRUST and SOC 2.

3. **Zero-trust network segmentation, FY26 H1.** Migration of internal east-west traffic to mTLS-authenticated service mesh; deprecation of legacy IP-allowlist-only controls. Lead: VP Engineering and Security Engineer (Cloud/AppSec).

4. **Expanded MDR coverage and tier-1 alert handoff.** Currently, Arctic Wolf provides 24x7 alert escalation to MCT; MCT staff handle tier-1 triage. Under the proposed expansion, Arctic Wolf would handle tier-1, allowing the internal team to focus on tier-2/tier-3 and proactive engineering. Decision expected Q2 2026.

5. **DLP for PHI egress.** Microsoft Purview DLP rollout for Microsoft 365; Netskope CASB for sanctioned-SaaS DLP; Wiz DSPM for cloud data flow visibility. Design phase, target deployment Q3 2026.

6. **Recovery testing maturity.** A Board-acknowledged weakness. The current DR test program is annual and scope-limited (a single critical service). The FY26 plan adds two additional tabletop-style recovery exercises (separate from IR tabletops) and one full-failover test, but remains less mature than the rest of the program. This is captured as risk register entry R2.

7. **Supplier continuous monitoring expansion.** Driven directly by the Feb–Mar 2024 Change Healthcare event and ongoing customer-due-diligence pressure on third-party risk. The current vendor program is centered on annual reassessments; FY26 expansion will (a) implement continuous attestation feeds via Vanta for top-tier vendors (AWS, Okta, Snowflake — already feeding), (b) extend continuous monitoring to Tier-2 vendors (Change Healthcare, Surescripts, Arctic Wolf, Datadog) by Q3 2026, and (c) revise the supplier risk taxonomy and reassessment SLAs. Captured as risk register entry R1; current state is below FY26 targets and is the deliberate weakness called out for GV.SC in the assessment scope.

8. **Formal threat modeling cadence.** A known program gap: while the cyber risk register is reviewed monthly by the Security Steering Committee, the Company does not yet run a structured threat-modeling exercise (STRIDE or PASTA) per major release or per critical service tier. The FY26 plan introduces a quarterly threat-modeling forum led by the Security Engineer (Cloud/AppSec). This gap is the source of the Identify-Risk-Assessment (ID.RA) maturity drag in the assessment.

---

## 11. Document Information

| Field | Value |
|---|---|
| Document title | Meridian Care Technologies — Company Backgrounder |
| Version | 4.2 |
| Owner | Helena Park, CEO (delegated to Marcus Holbrook, GC) |
| Distribution | Internal — limited |
| Last reviewed | February 12, 2026 |
| Next review | February 2027 (annual) |
| Source of truth | `corp-backgrounder` repository in MCT internal wiki |
