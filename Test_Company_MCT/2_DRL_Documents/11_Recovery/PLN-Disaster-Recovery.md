# Disaster Recovery Plan

**Document ID:** PLN-DRP-01
**Version:** 4.0
**Effective date:** January 1, 2026
**Last reviewed:** December 12, 2025 (annual review)
**Next review:** December 2026
**Approver:** David Mehta, CTO; Sarah Yoon, CISO
**Owner:** Tomás Reyes, VP Engineering (technical recovery); Marcus Tan, Security Engineer (D&R) (security-driven recovery scenarios); GRC liaison: Jordan Park
**Distribution:** Engineering, SRE, Security, GRC; published on internal wiki; redacted version available to customers under NDA on request

---

## 1. Purpose

This Disaster Recovery Plan ("DRP" or "Plan") establishes the technical procedures, responsibilities, and recovery objectives by which the MeridianCare platform is restored after a disruptive event affecting its underlying infrastructure. It is the technical companion to the Business Continuity Plan (PLN-BCP-01) and the operational expression of POL-001 §3.13.

This Plan honors the service tiering and target RTO/RPO commitments established in BIA-2025-12 §3 and the Company Backgrounder §6.5.

## 2. Scope

This Plan applies to:

- The production MeridianCare platform in AWS us-east-1 (primary) and us-west-2 (warm DR).
- Aurora PostgreSQL transactional databases.
- Amazon S3 (KMS-encrypted) document and attachment storage.
- Amazon EKS workloads.
- Snowflake analytical workloads (Population Insights — P2).
- Route 53 DNS and AWS CloudFront / WAF v2.
- Okta and Auth0 (workforce and patient-facing identity).
- Datadog, CrowdStrike (security telemetry — recovery requirements).

**Out of scope (for tier-aligned recovery objectives):** the legacy on-premises ETL cluster at the Raleigh HQ, which is scheduled for decommission in Q4 2026 and operates under a manual restoration regime with extended RTO. The cluster's recovery procedure is documented separately as RUNBOOK-LegacyETL-DR and is not subject to the P1/P2 RTO/RPO commitments below.

## 3. Service Tiering and Recovery Objectives

Inherited from BIA-2025-12 §3 (authoritative).

| Tier | Services | Target RTO | Target RPO | Underpinning architecture |
|---|---|---|---|---|
| **P1** | Transitions of Care; Referral Lifecycle Management | 4 hours | 15 minutes | Aurora PostgreSQL multi-AZ + cross-region read replica in us-west-2; S3 cross-region replication; EKS multi-AZ in us-east-1; warm EKS in us-west-2 with cluster bootstrapping automation |
| **P2** | Chronic Care Management; Population Insights | 24 hours | 4 hours | Aurora multi-AZ (CCM); Snowflake replication async (Population Insights — warm-DR not pre-provisioned in us-west-2 — see R6) |
| **P3** | Internal reporting; corporate IT (Microsoft 365 — provider-resilient); marketing site | 72 hours | 24 hours | Best-effort restoration |

**Honest acknowledgment of capability vs. target.** These targets are documented commitments. Capability today does not fully meet them in all dimensions. Specifically:

- Aurora cross-region promotion has been tested to **3h47m** (April 2025 test, single service). The remaining buffer to the 4h target is small.
- End-to-end ToC restoration including ingress, EKS, Route 53 cutover was tested to **5h12m** (April 2025) — over the 4h P1 target.
- Population Insights warm-DR is async-replicated only; warm-standby compute is not pre-provisioned in us-west-2. This is captured as **risk register entry R6** and is on the FY27 backlog.
- Recovery test depth across services is limited; only ToC has been failover-tested at the full-region scope. This is captured as **risk register entry R2**.

## 4. Authorities

| Authority | Holder | Notes |
|---|---|---|
| DR activation | CTO (David Mehta); designated alternate: VP Engineering (Tomás Reyes) | Activation declared in writing in `#dr-activation` Slack channel. |
| Incident Commander (technical) | Engineering on-call SRE lead | Operates the recovery runbook. |
| Customer communications | VP Customer Success (Lauren Pham) per PLN-IR-01 §8 | Authorized by CEO during DR. |
| Severity declaration (when DR is triggered by a security event) | CISO per PLN-IR-01 §4 | Coordinated with CTO. |

## 5. DR Activation Triggers

DR is activated when **one or more** of the following are observed:

- AWS service-health dashboard or AWS support indicates a us-east-1 regional impairment lasting or expected to last beyond 1 hour for any P1-supporting service (Aurora, EKS, S3, ELB, Route 53, IAM, KMS).
- Internal monitoring (Datadog) shows >50% degradation of P1 SLIs sustained beyond 30 minutes with no in-region remediation path.
- A security incident (per PLN-IR-01) requires evacuation from us-east-1 (e.g., suspected production-account compromise).
- An MCT-internal change-induced outage where in-place recovery is infeasible.

The CTO has authority to declare DR activation; in the CTO's absence, the VP Engineering. Activation is communicated in `#dr-activation`, in `#sec-ir-cmd` if security-driven, and to the Steering Committee within 30 minutes.

## 6. Runbook — Region Failure to us-west-2 (P1 Services)

The following runbook is the authoritative procedure for promoting us-west-2 to active for the ToC and Referral Lifecycle Management services. The runbook is maintained in the `dr-runbooks` Git repo and is exercised at least annually (most recently April 2025; see RPT-Recovery-Test-Results-2025).

### Step 1 — Confirm and declare (T+0 → T+15m)

1. SRE on-call confirms us-east-1 impairment via AWS service health, Datadog, and synthetic monitoring.
2. CTO declares DR activation in `#dr-activation`.
3. War room opened (Zoom standing room).
4. Customer Success notified; comms lead drafts initial customer advisory.

### Step 2 — Aurora cross-region promotion (T+15m → T+1h)

1. SRE invokes the Aurora promotion script (`dr-scripts/promote-aurora.sh`) which:
   a. Confirms replica lag < 60 seconds (RPO check).
   b. Runs `aws rds promote-read-replica-db-cluster` for the ToC and Referral clusters.
   c. Updates the Secrets Manager entries with the new endpoints.
   d. Validates promotion via `pg_is_in_recovery()` returning false.
2. Verification: SRE runs the post-promotion smoke test suite (~50 read/write checks against representative tables).
3. If replica lag exceeded 60 seconds at promotion, document the actual RPO observed and notify the IC immediately.

### Step 3 — EKS workload recreation (T+30m → T+3h, parallel with Step 2)

1. SRE applies the warm-DR Terraform stack for `meridiancare-prod-usw2` (`terraform apply -var env=prod -var region=us-west-2`).
2. Cluster bootstrapping pulls EKS images from the cross-region ECR replica (replication enabled FY24).
3. Service deployments applied via ArgoCD; ArgoCD points at the same Git source of truth.
4. Validate pod-readiness for ToC and Referral namespaces; address any image-cache or secret-mount issues (see RPT-Recovery-Test-Results-2025 §4 for the EKS image-cache lesson learned).

### Step 4 — S3 (no action required)

1. S3 cross-region replication is already in place (KMS replication; replication metric monitored).
2. Application configuration update points the S3 client at the us-west-2 bucket.

### Step 5 — DNS cutover via Route 53 (T+3h → T+4h)

1. SRE updates Route 53 weighted records for the ToC and Referral hostnames to direct 100% of traffic to the us-west-2 ALB.
2. CloudFront origin failover (configured) automatically prefers the healthy origin once the ALB health check passes.
3. **Known issue:** legacy DNS TTLs on some ToC subdomains were 300 seconds at the April 2025 test, which delayed full traffic cutover. TTLs were reduced to 60 seconds post-test for the ToC and Referral subdomains. To be revalidated in the next test.

### Step 6 — Identity (Okta, Auth0)

1. Okta is multi-region by Okta's own architecture; no MCT action required for workforce identity.
2. Auth0 is multi-region by Auth0's architecture; no MCT action required for patient-facing identity.

### Step 7 — Security telemetry (Datadog, CrowdStrike)

1. Datadog continues to receive logs from us-west-2 (region-agnostic ingest).
2. CrowdStrike endpoint coverage is region-agnostic.
3. WAF v2 rules are deployed via Terraform to both regions; no manual action.

### Step 8 — Customer communication (T+1h → continuous)

1. Customer advisory drafted by VP CS, cleared by CISO and GC, sent at the earliest moment a meaningful status can be shared.
2. Customer status page (`status.meridiancare.com`) updated.
3. Status updates every 60 minutes during active recovery; at least every 4 hours thereafter.

### Step 9 — Failback

Failback to us-east-1 is performed only after the cause is fully resolved and a maintenance window is scheduled with customers. Failback uses the inverse procedure with replication direction reversed. Failback is **not** time-pressured; preference is to take time to validate over rushing.

## 7. Population Insights (P2) — Recovery Procedure

Population Insights is delivered out of Snowflake and is currently a **P2 service** with target RTO 24h and RPO 4h. The service has weaker DR posture than P1 services:

- Snowflake replication is configured account-to-account but is **asynchronous** with 2–4 hour typical lag.
- Warm-standby Snowflake compute is **not pre-provisioned** in us-west-2; activation requires manual provisioning and Fivetran reconfiguration to a secondary endpoint.
- Estimated total RTO: 8–18 hours depending on Fivetran re-keying and customer-data validation.

This is captured as **risk register entry R6 (Warm-DR readiness for Population Insights)**. The current posture is within the 24h RTO commitment but with limited margin. The FY27 plan introduces a hot-standby Snowflake account in us-west-2.

## 8. Legacy ETL Cluster — Out of Scope for Tier-Aligned RTO

The legacy on-premises ETL cluster at the Raleigh HQ is **out of scope** for the P1/P2 RTO/RPO commitments. Recovery of this cluster is governed by RUNBOOK-LegacyETL-DR, which is a manual restoration procedure with the following characteristics:

- Restore from off-site backup tape rotation; estimated RTO 5–10 days.
- Two long-tenured customer integrations are dependent; both are mid-migration to the modern integration (60% complete as of Q4 2025) and both customers have signed acknowledgment of the extended-RTO posture.
- Decommission target Q4 2026.
- Risk register entry R4 (PHI flow visibility) tracks this asset's unique posture.

## 9. Call Tree

| Tier | Role | Primary | Backup | Method |
|---|---|---|---|---|
| 1 | SRE on-call | Engineering on-call rotation (4 SREs) | Backup on-call | PagerDuty |
| 1 | Security on-call | M. Tan / P. Iyer rotation | A. Reyes; B. Olafsson | PagerDuty |
| 2 | VP Engineering | Tomás Reyes | Engineering Director (rotating) | Phone + Slack |
| 2 | CISO | Sarah Yoon | M. Tan | Phone + Slack |
| 3 | CTO | David Mehta | VP Eng | Phone |
| 3 | VP Customer Success | Lauren Pham | Director of CS | Phone |
| 3 | GC | Marcus Holbrook | Outside counsel | Phone |
| 4 | CEO | Helena Park | CTO | Phone |

PagerDuty schedule is the source of truth for tier-1 contact rotations.

## 10. Customer Notification Commitments

- **First proactive notification:** within 60 minutes of DR activation, even if the recovery picture is still forming.
- **Status cadence:** every 60 minutes during active recovery; every 4 hours thereafter through resolution.
- **Resolution notice:** within 4 hours of full restoration.
- **Post-event report:** delivered to affected customers within 10 business days.

These commitments are reflected in standard customer contracts and BAAs.

## 11. Testing Cadence and Honest Acknowledgment

The Company commits to recovery testing as follows:

| Cadence | Test type | Scope |
|---|---|---|
| **Annual (current)** | Full-failover test, single service | One critical service at a time. Most recent: April 2025 — ToC service (RPT-Recovery-Test-Results-2025). |
| **Annual (planned, FY26)** | One additional full-failover test | Scope to be selected in Q1 2026 — likely Referral Lifecycle Management. |
| **Quarterly (planned, FY26)** | Recovery tabletop, separate from IR tabletop | Scenario-based, no production change. |
| **Continuous** | Backup integrity tests | Automated; daily |

**This is honestly less mature than the rest of the security program.** The current state — one full failover per year, scope-limited to one service — is captured as risk register entry R2 (Recovery testing depth) and is acknowledged as a known weakness in the Audit & Risk Committee's December 2025 minutes. The FY26 plan adds incremental cadence; full coverage of all P1 services in a single calendar year remains an FY27 aspiration.

The April 2025 test (RPT-Recovery-Test-Results-2025) demonstrates honest reporting of test results: the database tier achieved 3h47m (within the 4h P1 RTO target), but end-to-end ToC restoration achieved 5h12m (over the 4h target). The over-target result is documented and is not papered over.

## 12. Plan Maintenance

This Plan is reviewed at least annually and after any DR activation or material architecture change. Reviews are coordinated by the VP Engineering and approved by the CTO and CISO.

## 13. Linked Documents

- POL-001 Information Security Policy
- BIA-2025-12 Business Impact Analysis
- PLN-BCP-01 Business Continuity Plan
- PLN-IR-01 Incident Response Plan
- RPT-Recovery-Test-Results-2025
- RUNBOOK-LegacyETL-DR
- RISK-Cyber-Risk-Register (R2, R4, R6)

## 14. Document Control

| Version | Date | Author | Change summary |
|---|---|---|---|
| 1.0 | 2021-04 | (predecessor) | Initial DR plan |
| 2.0 | 2023-09 | T. Reyes | Multi-region architecture rewrite |
| 3.0 | 2024-12 | T. Reyes, M. Tan | Tier-aligned RTO/RPO; explicit R2 acknowledgment |
| **4.0** | **2025-12** | **T. Reyes, M. Tan** | **Annual review; absorbed April 2025 test lessons (DNS TTL, EKS image cache); added Population Insights P2 procedure detail; explicit out-of-scope for legacy ETL** |
