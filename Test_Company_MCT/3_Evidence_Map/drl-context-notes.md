# DRL Context Notes — Paste-Ready Notes for Each Document Upload

When uploading each evidence file into the assessment tool, the tool requires a "context note" of at least 5 characters explaining what the file demonstrates. This document provides ready-to-paste notes for all 42 DRL document requests, sized at 200-400 characters each (richer than the minimum but readable).

For requests where MCT does not have the document, the "Not provided rationale" entry shows the paste-ready text for the "Mark as not provided" workflow (10+ characters required by the tool).

---

## Bucket 01 — Governance & Policy

### gov_policy — Cybersecurity / Information Security Policy
**File:** `01_Governance/POL-Information-Security-Policy.md`
**Context note:** "POL-001 v6.1, MCT's top-of-house Information Security Policy. CEO/CISO-approved, annual review cycle. Establishes policy hierarchy, named role authorities (HIPAA Security Official designation explicit at §3.4), and integrates NIST CSF 2.0 + HIPAA Security Rule + HITRUST r2 program. References the Risk Appetite Statement (RAS-2025-12), Charter (CHTR-SEC-01), and 12 subordinate domain policies."

### gov_aup — Acceptable Use Policy
**File:** `01_Governance/POL-Acceptable-Use-Policy.md`
**Context note:** "POL-AUP-01 v4.3. Defines acceptable use of MCT systems and data; mandatory annual acknowledgment via Workday with 100% completion rate Q4 2025. Includes provisions for AI tooling (POL-AI-01 reference), removable media (blocked by default), MFA requirements aligned to FIDO2 mandate, and PHI handling rules."

### gov_minutes — Board / Risk Committee / CISO Minutes
**File:** `01_Governance/MINUTES-Audit-Risk-Committee-Q4-2025.md`
**Context note:** "Q4 2025 Audit & Risk Committee minutes (cybersecurity excerpt). Documents CISO quarterly report; cyber risk register review (R1-R8); approval of supplier risk program redesign; approval of 2026 CSF assessment business case (5-0 with one abstention); HITRUST r2 status; cyber insurance renewal."

### gov_charter — Risk Committee or Security Governance Charter
**File:** `01_Governance/CHARTER-Security-Governance.md`
**Context note:** "CHTR-SEC-01 v3.0. Establishes CISO authority including escalation rights to CEO/Board, halt-and-rollback authority on production changes, dual-evaluation structure for CISO independence (CTO + Audit Committee Chair), Steering Committee membership and decision rights, and reporting cadence."

## Bucket 02 — Risk Management

### risk_register — Cyber Risk Register
**File:** `02_Risk_Management/RISK-Cyber-Risk-Register.csv`
**Context note:** "Current cyber risk register with 8 open entries (R1-R8) and 2 closed (R9-R10). FAIR ALE estimates support quantitative aggregation against Risk Appetite Statement threshold ($2M). R1 supplier monitoring and R2 recovery testing depth are the two High-severity open risks driving FY26 priorities."

### risk_appetite — Risk Appetite / Tolerance Statement
**File:** `02_Risk_Management/POL-Risk-Appetite-Statement.md`
**Context note:** "RAS-2025-12 v2.0, Board-approved Dec 11, 2025. Quantitative thresholds: zero tolerance for HIPAA Breach trigger >500 records; aggregate ALE up to $2M; P1 service availability >=99.5% monthly; zero tolerance for HHS OCR action. Qualitative posture covers patient safety priority, trust as competitive asset, supply chain scrutiny."

### risk_erm — Enterprise Risk Management Policy
**File:** `02_Risk_Management/POL-Enterprise-Risk-Management.md`
**Context note:** "POL-ERM-01 v3.2. Defines 8 risk categories with named executive owners, integrates cybersecurity risk register as a sub-ledger, FAIR ALE bridges aggregate views, and establishes risk lifecycle (Identify → Analyze → Treat → Monitor → Close). Aggregate cyber ALE Q1 2026: ~$1.62M against $2M appetite."

### risk_bia — Business Impact Analysis
**File:** `02_Risk_Management/BIA-Business-Impact-Analysis.md`
**Context note:** "BIA-2025-12 v4.0. Service tiering with target RTO/RPO (P1 4h/15m; P2 24h/4h; P3 72h/24h), per-process impact estimates at 4h/24h/72h/1wk horizons, critical dependency map (internal + external/vendor), and explicit acknowledgment of capability gaps vs. targets (R2, R6)."

## Bucket 03 — Asset Management

### asset_hardware — Hardware Asset Inventory
**File:** `03_Asset_Management/INV-Hardware-Asset-Inventory.csv`
**Context note:** "Aggregated hardware inventory: 380 managed laptops (macOS via Jamf for engineering/security; Windows 11 via Intune for sales/CS/finance/HR) plus 6 legacy on-premises ETL servers at Raleigh HQ (out-of-scope for central automation; manual patching; decommission Q4 2026 — see CRA-LegacyETL-2025)."

### asset_software — Software / Application Inventory
**File:** `03_Asset_Management/INV-Software-Application-Inventory.csv`
**Context note:** "39-row application inventory covering production microservices, data tier (Aurora/Snowflake/S3/ElastiCache), identity (Okta/Auth0), security tooling (CrowdStrike/Datadog/Wiz/Vanta/Hyperproof), business systems (Workday/M365/Slack), and the legacy Informatica ETL cluster. Classification by tier and PHI scope."

### asset_data — Data Inventory / Classification Inventory
**File:** `03_Asset_Management/INV-Data-Classification-Inventory.csv`
**Context note:** "25 data assets across MCT environments. Tagged Restricted (PHI), Confidential, Internal, or Public per POL-DC-01. Includes Aurora PHI tables, Snowflake analytics layers, S3 attachment buckets, Datadog SIEM logs (no PHI), training records, BAAs, and financial data. Encryption status and retention policy per asset."

### asset_supplier — Supplier Service Inventory
**File:** `03_Asset_Management/INV-Supplier-Service-Inventory.csv`
**Context note:** "19-row functional supplier-service catalog (companion to the supplier criticality tiering in bucket 07). Maps each supplier to the service category it provides, the business function it supports, the data class in scope, and the dependency tier (P1/P2/P3) of MCT services that rely on it. Backup paths noted where applicable."

## Bucket 04 — Access Control & Identity

### iam_policy — IAM Policy
**File:** `04_Access_Control/POL-Identity-Access-Management.md`
**Context note:** "POL-IAM-01 v4.2. Identity sources: Okta workforce (SCIM-from-Workday with 4h provisioning/deprovisioning SLA), Auth0 patient-facing CIAM, AWS IAM Identity Center for cloud. Authentication standards: MFA mandatory; FIDO2 mandatory and 100% enforced for production-access roles since Q4 2025."

### iam_pam — Privileged Access Management Procedure
**File:** `04_Access_Control/PROC-Privileged-Access-Management.md`
**Context note:** "PROC-PAM-01 v3.1 step-by-step PAM procedure. JIT elevation via Okta + AWS IAM Identity Center session-bound roles; six-step approval/elevation/use/termination workflow; three-sealed break-glass credentials with two-person integrity; quarterly privileged-roster review reconciled to inventory."

### iam_reviews — Access Review Records
**File:** `04_Access_Control/RPT-Quarterly-Access-Review-Q4-2025.md`
**Context note:** "RPT-AR-2025-Q4. 98.0% on-time completion, 2,847 entitlements reviewed, 7 documented exceptions with remediation. 5% sample audit yielded 4 minor findings, all remediated. Privileged-roster reconciliation clean. Demonstrates the PR.AA-05/PR.AA-06 quarterly review cadence in operation."

### iam_mfa — MFA Standard or Rollout Evidence
**File:** `04_Access_Control/STD-MFA-Standard-and-Rollout-Evidence.md`
**Context note:** "STD-MFA-01 v3.1. Workforce MFA standard (Okta Verify push baseline; FIDO2/WebAuthn mandatory for engineers, security staff, all production-access roles). Rollout history Phase 0-4: full FIDO2 enforcement Oct 14, 2025. Q1 2026 enrollment: 100% workforce, 100% privileged FIDO2, 66% patient-tenant step-up (R8 in risk register)."

## Bucket 05 — Training & Awareness

### train_plan — Security Awareness Program Plan
**File:** `05_Training/PLN-Security-Awareness-Program.md`
**Context note:** "PLN-SA-01 v3.2. Program plan covering KnowBe4 LMS quarterly modules, quarterly phishing simulations, Slack #security-tips channel, monthly newsletter, all-hands segments, and 8 role-based tracks. Operational ownership: Priya Iyer (Security Analyst); strategic ownership: CISO."

### train_completion — Training Completion Records
**File:** `05_Training/RPT-Training-Completion-Q4-2025.md`
**Context note:** "Q4 2025 completion report. 100% (348/348) annual security awareness completion within deadline. 96% role-based training completion with 8 outstanding (7 since closed; 1 active). Comparison to Q3 2025 trend, corrective actions documented for outstanding cases."

### train_role — Role-Based Security Training
**File:** `05_Training/PLN-Role-Based-Training-Catalog.md`
**Context note:** "PLN-RBT-01 v2.3. 8 role-based tracks: Engineering (SecureCodeWarrior 4hr/yr), Admin (Pluralsight), Security (SANS/conferences), Customer Success (HIPAA refresher), Implementation, Finance (BEC awareness), Executive briefings, Clinical Operations. Cross-track role mapping ensures hybrid roles complete all relevant content."

### train_phish — Phishing Simulation Results
**File:** `05_Training/RPT-Phishing-Simulation-Q4-2025.md`
**Context note:** "Q4 2025 simulation 'QuotaWarn-O365' (M365 quota lure). 348 recipients; click rate 2.4% (target <3%); report rate 48% (target >40%); zero credentials submitted. Departmental breakdown shows continued improvement against the Q1 2024 baseline of 7.2% click pre-Pebble-Phish."

## Bucket 06 — Data Security & Architecture

### data_network — Network / Architecture Diagram
**File:** `06_Data_Security/DIAG-Network-Architecture.md`
**Context note:** "DIAG-NET-01 v4.0. Network/architecture description with Mermaid diagram. Five trust zones (Z0-Z5); customer/EHR/workforce ingress paths; egress controls; explicit Z5 acknowledgment of legacy ETL cluster as a known partial exception with compensating controls."

### data_flow — Data Flow Diagram
**File:** `06_Data_Security/DIAG-PHI-Data-Flow.md`
**Context note:** "DIAG-PHI-01 v3.1. PHI data flow with Mermaid diagram. Inbound: FHIR R4 from EHRs, HL7 v2, Direct Trust messaging. Internal: Aurora → Snowflake (de-identified by default; identifiable per BAA permission) → S3. Outbound: Surescripts, Change Healthcare pilot, Direct Trust. Encryption boundaries and BAA register annotated."

### data_encrypt — Encryption Standard / Policy
**File:** `06_Data_Security/STD-Encryption-Standard.md`
**Context note:** "STD-ENC-01 v4.1. AES-256/KMS-CMK at rest for Aurora/Snowflake/S3; AWS-managed for ElastiCache (no PHI persisted); FileVault/BitLocker on endpoints. TLS 1.2+ in transit; mTLS east-west service mesh. Key management table with annual rotation cadence and quarterly emergency-rotation tabletop. Eight prohibited practices."

### data_backup — Backup / Recovery Policy
**File:** `06_Data_Security/POL-Backup-and-Recovery.md`
**Context note:** "POL-BR-01 v3.2. Aurora PITR continuous + 35-day snapshot retention + cross-region replication. S3 versioning + cross-region replication. Snowflake Time Travel + Fail-safe. Validation methodology including restore checksum verification. Honest acknowledgment of R2 weakness (annual scope-limited DR test)."

## Bucket 07 — Vendor & Supply Chain

### vendor_assess — Vendor Risk Assessment(s)
**File:** `07_Vendor/EVD-Snowflake-Vendor-Risk-Assessment-2025.md`
**Context note:** "Sample Tier-1 vendor risk assessment for Snowflake Inc. (Sept 18, 2025 annual cycle). Reviews SOC 2 Type II, ISO 27001, HITRUST r2, FedRAMP Moderate, pentest summary, custom MCT-Critical-Vendor questionnaire. Risk dimensions scored; concentration risk acknowledged; recommendation Continue at Tier 1. Equivalent files exist for AWS, Okta, Surescripts, Change Healthcare in TPRM repository (not all attached for brevity)."

### vendor_contract — Contract Security Clauses / DPA
**File:** `07_Vendor/POL-Third-Party-Risk-Management.md`
**Context note:** "POL-TPRM-01 v5.0 §6 documents required contractual provisions for Tier-1 and Tier-2 vendors: BAA where PHI in scope, right to audit annual, 72h incident notification, sub-processor approval/notification, data return/destruction at termination, insurance minimums ($5M Tier-1 / $2M Tier-2), specific security-control commitments, and customer-mediated audit cooperation. MSA-2025 and BAA-2025 templates referenced."

### vendor_tiering — Supplier Criticality Ranking
**File:** `07_Vendor/INV-Supplier-Criticality-Tiering.csv`
**Context note:** "23-row supplier inventory tiered as Tier-1 Critical (5 vendors including AWS, Okta, Snowflake, Surescripts, Change Healthcare-pilot), Tier-2 High (8 vendors), Tier-3 Moderate (10 vendors). BAA status, latest SOC 2 + pentest dates, continuous attestation feed status (operational for AWS/Okta/Snowflake; planned Q3 2026 for Tier-2)."

## Bucket 08 — Monitoring & Detection

### monitor_siem — SIEM / Central Logging Configuration
**File:** `08_Monitoring/STD-SIEM-and-Logging-Configuration.md`
**Context note:** "STD-SIEM-01. 13 log sources to Datadog Cloud SIEM; retention 90d hot / 7y cold (S3 with Object Lock and Glacier transition at 365d); HIPAA §164.316(b)(2) compliance documented. Coverage matrix by service tier. Daily canary events validate the log pipeline. Explicit acknowledgment of legacy ETL coverage gap (R4)."

### monitor_usecases — Detection Use Cases / Alert Rules
**File:** `08_Monitoring/PLAYBOOK-Detection-Use-Cases.md`
**Context note:** "PLAYBOOK-DET-01. 32 detection use cases organized by MITRE ATT&CK tactic. State distribution: 22 Production / 7 in Tuning / 3 in Backlog. Pebble Phish lineage explicitly annotated on credential-access detections (IA-02/IA-05). Gap analysis ties to R3 (alert tuning debt) and R4 (legacy ETL telemetry)."

### monitor_process — Alert Triage Procedure
**File:** `08_Monitoring/PROC-Alert-Triage.md`
**Context note:** "PROC-AT-01. T1/T2/T3 tier definitions with 5min/30min/next-day SLAs. Iyer → Tan → Yoon escalation chain. Q1 2026 KPIs: TTD 8min (target <10), TTI 1.6h (target <2), false-positive rate ~28% (acknowledged debt — R3). Q1 2026 dedicated tuning sprint plan."

## Bucket 09 — Vulnerability Management

### vuln_scans — Vulnerability Scan Reports
**File:** `09_Vuln_Mgmt/RPT-Vulnerability-Scan-Summary-Q1-2026.md`
**Context note:** "Q1 2026 vulnerability summary. 466 open findings; 97% critical SLA compliance, 92% high SLA. Top 10 unresolved findings by age. Wiz (cloud), Snyk (dependencies), GHAS (SAST + secrets), manual quarterly for legacy ETL. Legacy findings reported separately under R4. Root cause for high-SLA miss: upstream base-image lag in two Go services."

### vuln_patch — Patch Management Policy/Records
**File:** `09_Vuln_Mgmt/POL-Patch-Management.md`
**Context note:** "POL-PM-01. Patch SLAs: 14d critical / 30d high / 90d medium / 180d low; KEV uplift to critical regardless of CVSS. Automation via Wiz/Snyk/GHAS/Renovate; vendor-managed for Aurora and Snowflake. Explicit §7 covers legacy ETL manual patching with documented exception EX-2024-007."

### vuln_pt — Penetration Test Results
**File:** `09_Vuln_Mgmt/RPT-Annual-Penetration-Test-Executive-Summary-2025.md`
**Context note:** "Bishop Fox engagement BF-MCT-2025 executive summary. Scope: external + internal + AppSec on production MeridianCare. Findings: 0 critical, 2 high, 7 medium, 12 low. All closed except 2 low accepted under EX-2025-031. Purple-team detection observations: 26/41 attack steps detected. Strengths and improvement areas identified."

## Bucket 10 — Incident Response

### ir_plan — Incident Response Plan
**File:** `10_Incident_Response/PLN-Incident-Response.md`
**Context note:** "PLN-IR-01 v5.2. NIST SP 800-61r3 phase model. Severity matrix (SEV-1 through SEV-4) with concrete examples (Pebble Phish anchored as SEV-2). Roles, RACI, communication tree, HIPAA §164.402 four-factor breach workflow, evidence handling, integration with Arctic Wolf MDR, post-incident review process."

### ir_tabletop — Tabletop Exercise Record
**File:** `10_Incident_Response/RPT-IR-Tabletop-Q4-2025.md`
**Context note:** "Q4 2025 IR tabletop after-action. Scenario: Snowflake-side credential exposure leading to attempted PHI exfiltration (echoes Nov 2024 industry event). Participants, timeline, key decisions, gaps surfaced (composite correlation rule missing → R3 input; service-account runbook missing). 6 action items tracked."

### ir_tickets — Incident Log / Case Records
**File:** `10_Incident_Response/LOG-Incident-Case-File-Pebble-Phish-2024-03.md`
**Context note:** "Full case file for the March 14, 2024 Pebble Phish incident. Timeline: phish 09:54 EDT → credential submit 10:03 EDT → MFA challenge fail 10:14 EDT → MFA-fatigue alert 11:07 EDT → triage 11:14 EDT → contained 11:31 EDT. SEV-2; root cause; HIPAA four-factor breach determination (no breach); four post-incident program changes."

## Bucket 11 — Business Continuity & Recovery

### rc_bcp — Business Continuity Plan (BCP)
**File:** `11_Recovery/PLN-Business-Continuity.md`
**Context note:** "PLN-BCP-01 v3.1. Site-loss continuity (Pittsburgh secondary; remote-first workforce); supplier continuity (AWS multi-region, Okta, Snowflake); workforce continuity; critical role coverage. Honest gap section calls out annual continuity-exercise cadence and GC succession planning."

### rc_drp — Disaster Recovery Plan (DRP)
**File:** `11_Recovery/PLN-Disaster-Recovery.md`
**Context note:** "PLN-DRP-01 v4.0. Tier-aligned recovery objectives (P1 4h/15m). Aurora cross-region promotion runbook; EKS recreation in us-west-2; S3 already replicated; DNS cutover via Route 53. Population Insights warm-DR limitation documented (R6). Legacy ETL DR explicitly out of scope. Honest acknowledgment that capability does not fully meet 4h P1 target end-to-end."

### rc_tests — Recovery Test Results
**File:** `11_Recovery/RPT-Recovery-Test-Results-2025.md`
**Context note:** "April 2025 full failover test report. Database tier RTO achieved (3h47m within 4h P1 target). End-to-end RTO exceeded target (5h12m). Lessons: DNS TTL too high; EKS image cache issue; manual DNS cutover step. Self-criticism: single-service scope (ToC only) — explicitly flagged as R2 weakness. One full failover test in trailing 12 months."

## Bucket 12 — Audit & Assessment

### audit_internal — Internal Cyber Audit Reports
**File:** `12_Audit/RPT-Internal-Audit-Cybersecurity-2025.md`
**Context note:** "Annual internal audit report. 3 medium findings (R1 vendor cadence, R2 recovery depth, R3 alert tuning) + 5 low + 2 informational. Hartwell Cohen LLP independence sample on 5 controls. Management response with target closure dates aligned to risk register treatment plans."

### audit_external — Third-Party Assessment Reports
**File:** `12_Audit/RPT-SOC-2-Type-II-Excerpt-2025.md`
**Context note:** "SOC 2 Type II excerpt. Schellman & Co.; calendar year 2025; all 5 Trust Services Criteria; clean (unqualified) opinion. One exception: Q3 2025 Workday access-certification batch ran 6 days late. Independence: Schellman is excluded from CSF assessor selection in 2026 (Coalfire and Crowe are finalists)."

### audit_prior — Previous CSF / Security Assessments
**File:** `12_Audit/RPT-Prior-CSF-Self-Assessment-2024.md`
**Context note:** "2024 internal CSF 2.0 self-assessment. Aggregate 2.4. Weakest functions: GV.SC ~1.8, RC.RP ~1.7, DE ~2.0. Establishes the trajectory of improvement to the FY26 target ~2.65, with deliberate trailing maintained in RC (~2.05) and RS (~2.70). Demonstrates ID.IM improvement-loop function in operation."
