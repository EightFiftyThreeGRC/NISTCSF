# Backup and Recovery Policy

**Document ID:** POL-BR-01
**Version:** 3.2
**Effective date:** January 1, 2026
**Last reviewed:** December 11, 2025 (annual review)
**Next review:** December 2026
**Approver:** Helena Park, CEO; Sarah Yoon, CISO
**Owner:** Sarah Yoon, CISO (delegated operationally to Tomás Reyes, VP Engineering)
**Distribution:** All engineering, security, and infrastructure personnel; published on internal wiki

---

## 1. Purpose

This Backup and Recovery Policy ("Policy") establishes MCT's approach to backing up, retaining, and recovering the data and services that support the MeridianCare platform and the corporate IT environment. It implements POL-001 §3.13, satisfies the contingency-plan requirements of the HIPAA Security Rule at 45 CFR §164.308(a)(7), supports the recovery-time and recovery-point commitments documented in the Company Backgrounder §6.5, and aligns with the NIST CSF 2.0 PR.IR and RC functions.

This Policy is binding. Subordinate operational detail is documented in PROC-BR-01 (Backup and Recovery Procedure) and the per-service runbooks in the `runbooks` repository.

## 2. Scope

This Policy applies to:

- The MeridianCare production platform (AWS us-east-1) and its DR environment (us-west-2).
- All MCT-managed customer-facing data — including but not limited to Aurora PostgreSQL, Snowflake, S3 attachment buckets — referred to in this Policy as "platform data."
- The corporate IT environment, principally Microsoft 365 (Exchange Online, SharePoint Online, OneDrive) and Workday.
- The legacy on-premises ETL cluster at the Raleigh HQ (Z5).

Out of scope: customer-side EHR data residing in customer-controlled systems; this remains the customer's responsibility.

## 3. Service Tiering and Recovery Commitments

Service tiers, RTOs, and RPOs are defined in the Company Backgrounder §6.5 and are reproduced here for convenience. These are documented commitments, not measured current capability; capability gaps are tracked in the cyber risk register (R2).

| Tier | Services | Target RTO | Target RPO | Notes |
|---|---|---|---|---|
| P1 | Transitions of Care, Referral Lifecycle Management | 4 hours | 15 minutes | Aurora multi-AZ + cross-region read replica |
| P2 | Chronic Care Management, Population Insights | 24 hours | 4 hours | Snowflake replication; analytical, not operational |
| P3 | Internal reporting, marketing site, non-customer-facing internal tools | 72 hours | 24 hours | Best-effort restoration |
| Corp | Microsoft 365, Workday | 24 hours | 4 hours | Vendor-native protections |

## 4. Policy Statements

### 4.1 Backup is mandatory; backup configurations are version-controlled

All in-scope systems shall be backed up. Backup configurations are codified in Terraform and reviewed at every change; manual configuration of backups in production is prohibited.

### 4.2 Encryption and access

Backups inherit the encryption posture of their source. Aurora snapshots, S3 backups, and Snowflake clones are encrypted with KMS-CMKs (see STD-ENC-01). Cross-region replicated copies use a destination-region CMK; the cross-region key relationship is documented in the KMS inventory.

Access to backup data follows the least-privilege standard for production data; restoration to a non-production environment is permitted only via the de-identification pipeline (PROC-DEID-01).

### 4.3 Tiered cadence

| Tier / system | Backup mechanism | Cadence | Retention |
|---|---|---|---|
| P1 — Aurora (Transitions, Referrals) | Aurora PITR + automated daily snapshots + cross-region snapshot copy | PITR continuous (1-second granularity); daily snapshot at 04:00 UTC; cross-region copy on success | PITR 35 days; daily snapshot 35 days; cross-region snapshot 35 days |
| P1 — S3 attachments | Versioning + Cross-Region Replication (CRR) to us-west-2 + S3 Object Lock (governance mode) | Continuous (per-object) | Versioning indefinite (governed by lifecycle); CRR 35 days governance lock |
| P2 — Snowflake | Snowflake Time Travel + Fail-safe + replication to DR account | Continuous (Time Travel); 7-day Fail-safe; replication daily | Time Travel 14 days (production); Fail-safe 7 days |
| P2 — S3 analytics | Versioning + CRR | Continuous | Versioning indefinite |
| P3 — Internal tools / reporting | EBS snapshots + per-tool native backups | Daily | 30 days |
| Corp — Microsoft 365 | Native M365 retention + AvePoint third-party SaaS backup | Continuous (M365); daily (AvePoint) | M365 retention per data type; AvePoint 365 days |
| Z5 — Legacy ETL | Filesystem snapshot to NAS + replicated to AWS S3 nightly | Daily (22:00 ET) | 30 days local; 90 days S3 |

### 4.4 Cross-region replication

Aurora cross-region snapshots and Snowflake replication target us-west-2. S3 cross-region replication targets us-west-2 with KMS re-encryption. Cross-region replication health is monitored via Datadog; replication-lag SLAs (Aurora <5 min; S3 <15 min; Snowflake <24 hours) are tracked.

### 4.5 Restoration testing

Restoration testing is the verification step that distinguishes a real backup from a presumptive backup. The tests required by this Policy are:

| Test | Frequency | Scope | Verification |
|---|---|---|---|
| Aurora point-in-time restore (sample) | Quarterly | Restore production-equivalent Aurora cluster from a snapshot to a non-production VPC | Row-count and checksum comparison of a defined verification set; sample-query returns expected outputs |
| S3 attachment restore (sample) | Quarterly | Restore a defined sample of attachments from CRR target | Object integrity (ETag / KMS-decrypt verification) |
| Snowflake Time Travel / clone | Quarterly | Clone a production schema as of T-24h to a verification database | Row-count and aggregate-checksum comparison |
| M365 restore (sample) | Quarterly | Restore a sample mailbox and a sample SharePoint site via AvePoint | Item-count and content-comparison |
| **Full DR failover test (P1, region-level)** | **Annual** | **Failover P1 services to us-west-2 and run a defined regression suite** | **Functional verification of P1 services in us-west-2** |
| Recovery tabletop (separate from IR tabletop) | Twice per year (FY26 plan) | Scenario walk-through; no live failover | Decision-record + lessons learned |

### 4.6 Validation methodology

Restoration tests are not considered passed unless verification evidence is produced. The minimum verification set is:

1. **Object / row counts** in the restored target are within 0.1% of the source-of-truth at the snapshot time.
2. **Checksum / content-hash** comparison of a representative sample (≥1,000 rows or objects, sampled deterministically by partition key) matches.
3. **Sample-query verification** — a defined set of read queries returning expected outputs (canary records inserted by the test harness).
4. **Application sanity checks** — for full failover tests only, a regression suite of P1 functional tests passes against the recovered environment.

Test results, evidence, and any deviations are stored in the `recovery-tests` evidence repository and referenced from Hyperproof.

### 4.7 Honest acknowledgement — recovery testing weakness (R2)

The Board has acknowledged that current recovery-testing depth is below expectations. The current state is:

- **Aurora PITR:** Quarterly sample restores run consistently since Q3 2024; passing.
- **S3 attachment restore:** Quarterly samples run consistently since Q1 2025; passing.
- **Snowflake clone tests:** Run quarterly since Q2 2025; passing.
- **Full DR failover (P1):** **Annual cadence, scope-limited to a single P1 service.** As of December 2025, the most recent full failover test was conducted in October 2025 and exercised the Transitions of Care service in us-west-2 for a 2-hour window. The Referral Lifecycle Management service — also P1 — has not yet been exercised at full failover. This is the substance of risk register entry **R2**.
- **Recovery tabletops (separate from IR tabletops):** New for FY26. Two are planned for 2026 (Q2 and Q4); the Q3 2025 trailing-12-month count was 1, below the >=2 KPI target.

The FY26 plan progresses R2 by (a) extending the annual full failover to cover Referral Lifecycle Management as well as Transitions of Care, (b) adding two recovery tabletops separate from IR tabletops, and (c) building an automated post-restore verification harness so quarterly partial-restore tests can be expanded to additional services without proportional human cost.

This Policy does not paper over R2. Until the FY26 plan is delivered, the Board treats P1 RTO of 4 hours and P2 RTO of 24 hours as documented commitments and not measured capability.

## 5. Roles and Responsibilities

| Role | Responsibility |
|---|---|
| CISO (Sarah Yoon) | Owns this Policy; reports recovery posture to the Audit & Risk Committee quarterly; arbitrates exceptions. |
| VP Engineering (Tomás Reyes) | Operationally accountable for backup execution and recovery test orchestration. |
| Security Engineer (Cloud/AppSec) | Reviews backup encryption posture, KMS key usage, and cross-region replication configurations. |
| Site Reliability lead (Engineering) | Runs quarterly partial-restore tests; coordinates the annual full failover test with on-call rotations. |
| GRC Manager (Jordan Park) | Maintains evidence packets; maps recovery tests to SOC 2 and HITRUST control evidence. |
| Customer Success Leadership | Coordinates customer-facing communications during a full failover test. |
| All engineering | Builds services that are recoverable per this Policy; participates in recovery exercises as scheduled. |

## 6. Recovery Decisions

In a real recovery scenario, the CTO or designate has authority to invoke a regional failover for P1 services. The CISO is consulted on any recovery action that may have security implications (e.g., declining to restore a particular dataset because of suspected compromise). The General Counsel is engaged on any recovery action with privacy or breach-notification implications.

The Incident Response Plan (PLN-IR-01) provides the wrapper for incidents that necessitate recovery action; this Policy provides the recovery substrate.

## 7. Exceptions

Exceptions to this Policy are requested via the GRC team and approved by the CISO. The legacy on-premises ETL cluster (Z5) is the principal in-force exception, with retention and replication minimums met but without the same restore-test cadence as cloud workloads; mitigations are documented in CRA-LegacyETL-2025 and the cluster is targeted for decommission Q4 2026.

## 8. Related Documents

- POL-001 Information Security Policy (§3.13)
- STD-ENC-01 Encryption Standard
- DIAG-NET-01 Network Architecture
- DIAG-PHI-01 PHI Data Flow
- PROC-BR-01 Backup and Recovery Procedure
- PROC-DEID-01 De-identification Procedure
- PLN-IR-01 Incident Response Plan
- PLN-BCP-01 Business Continuity Plan
- PLN-DRP-01 Disaster Recovery Plan
- BIA-2025-12 Business Impact Analysis
- RAS-2025-12 Risk Appetite Statement
- CRA-LegacyETL-2025 Compensating Controls — Legacy ETL

## 9. Document Control

| Version | Date | Author | Change summary |
|---|---|---|---|
| 1.0 | 2022-12 | M. Chen (former CTO) | Initial policy |
| 2.0 | 2023-08 | S. Yoon | Refresh on CISO appointment; introduced tiered cadence |
| 3.0 | 2024-09 | S. Yoon, T. Reyes | RTO/RPO alignment to Board service tiering; added quarterly partial-restore tests |
| 3.1 | 2025-08 | T. Reyes | NIST CSF 2.0 alignment; added validation methodology section |
| **3.2** | **2025-12** | **T. Reyes, S. Yoon** | **Annual review; explicit acknowledgement of R2 weakness; added recovery-tabletop cadence; refreshed retention table; clarified Z5 exception scope** |
