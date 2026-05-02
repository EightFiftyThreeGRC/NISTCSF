# SIEM and Central Logging Configuration Standard

**Document ID:** STD-LOG-01
**Version:** 2.3
**Effective date:** February 1, 2026
**Last reviewed:** January 22, 2026
**Next review:** January 2027 (annual)
**Approver:** Sarah Yoon, CISO
**Owner:** Marcus Tan, Security Engineer (Detection & Response)
**Distribution:** Information Security; Engineering; Customer Success engineering leads; auditors under NDA

---

## 1. Purpose

This Standard specifies the technical requirements for security-relevant log generation, transport, aggregation, retention, integrity protection, and pipeline observability across MCT-managed information systems. It implements the logging and continuous monitoring requirements of the Information Security Policy (POL-001 §3.11) and supports the HIPAA documentation-retention requirement under 45 CFR §164.316(b)(2).

This Standard is subordinate to POL-001 and is the authoritative technical reference for the Datadog Cloud SIEM configuration.

## 2. Scope

This Standard applies to all in-scope systems defined in POL-001 §2, including:

- The production MeridianCare platform in AWS us-east-1 and the warm DR environment in us-west-2.
- The corporate IT environment (Microsoft 365, Okta, managed endpoints).
- The legacy on-premises ETL cluster at the Raleigh HQ (partial coverage; see §6).
- Third-party SaaS sources where MCT contractually has access to audit telemetry.

## 3. Roles and Responsibilities

| Role | Responsibility |
|---|---|
| Security Engineer (Detection & Response) — M. Tan | Owns SIEM configuration, log-source onboarding, retention enforcement, pipeline health |
| Security Engineer (Cloud/AppSec) — A. Reyes | Owns log generation at the AWS/Kubernetes layer; ensures CloudTrail/EKS/Aurora pgAudit are enabled and forwarded |
| IAM Specialist — B. Olafsson | Owns Okta system log forwarding |
| Security Analyst — P. Iyer | Owns daily pipeline-canary review and alerts on log-source silence |
| GRC Manager — J. Park | Owns retention attestation and audit evidence packaging |

## 4. Log Sources and Aggregation

### 4.1 Authoritative log sources

The following sources MUST be forwarded to Datadog Cloud SIEM as the central aggregation point:

| Source | Layer | Forwarding mechanism | Owner |
|---|---|---|---|
| AWS CloudTrail (management + data events) | AWS control plane | CloudWatch Logs subscription -> Datadog Forwarder Lambda | A. Reyes |
| Aurora PostgreSQL pgAudit | Data tier | RDS log export to CloudWatch -> Datadog | A. Reyes |
| Amazon EKS audit logs | Kubernetes control plane | CloudWatch Container Insights -> Datadog | A. Reyes |
| Okta system log | Identity | Datadog Okta integration (event hook) | B. Olafsson |
| CrowdStrike Falcon detections + telemetry | Endpoint | Falcon SIEM Connector -> Datadog | M. Tan |
| Wiz CSPM findings and audit events | Cloud posture | Wiz integration to Datadog | A. Reyes |
| Snowflake ACCOUNT_USAGE views (LOGIN_HISTORY, QUERY_HISTORY, ACCESS_HISTORY) | Data warehouse | Datadog Snowflake integration with hourly pull | A. Reyes |
| ALB access logs | Edge | S3 -> Datadog Forwarder | A. Reyes |
| CloudFront access logs | Edge | S3 -> Datadog Forwarder | A. Reyes |
| AWS WAF v2 logs | Edge | Kinesis Firehose -> Datadog | A. Reyes |
| Microsoft 365 Unified Audit Log | Productivity | Datadog M365 integration | M. Tan |
| Jamf Pro and Microsoft Intune telemetry | Endpoint mgmt | Webhook -> Datadog | M. Tan |
| GitHub Enterprise audit log + GHAS alerts | Source control | Datadog GitHub integration | A. Reyes |

### 4.2 Aggregation point

Datadog Cloud SIEM is the single SIEM of record. Direct forwarding to any other SIEM, syslog server, or log analytics tool from in-scope sources is prohibited without exception approval per POL-001 §6.

## 5. Retention and Integrity

### 5.1 Retention tiers

| Tier | Storage | Duration | Purpose |
|---|---|---|---|
| Hot | Datadog Cloud SIEM indexed | 90 days | Investigation, detection, dashboards |
| Cold archive | Amazon S3 (`mct-prod-siem-archive`) Standard -> Glacier Deep Archive transition at 365 days | 7 years total | HIPAA §164.316(b)(2); legal hold; DFIR |

The 90-day hot / 7-year cold split is fixed and may not be reduced without CISO approval. Extensions for specific investigations are permitted via Datadog's Flex Logs feature for up to 15 months in addition to the default hot tier.

### 5.2 Integrity protection

The cold archive bucket MUST be protected by:

- **AWS S3 Object Lock** in Compliance mode with a 7-year retention period. Object Lock prevents deletion or modification by any principal — including the AWS root user and CISO — for the duration of the retention period.
- **Server-side encryption** with AWS KMS customer-managed keys (`alias/mct-siem-archive-kms`).
- **Bucket policy** denying `s3:DeleteObject`, `s3:DeleteObjectVersion`, and `s3:PutBucketLifecycleConfiguration` to all principals except the Object Lock retention sweep job.
- **Cross-region replication** to `us-west-2` with replication of Object Lock state.
- **AWS CloudTrail data events** enabled on the bucket and forwarded to Datadog (recursive logging — the SIEM logs accesses to its own archive).

### 5.3 Hot-tier integrity

Datadog tenant access is restricted to Information Security and named platform engineers. Datadog audit logs (who-viewed-what, who-edited-rules) are themselves forwarded to the cold archive on a 24-hour delay so that an attacker who compromised the SIEM cannot remove their own footprint from the immutable copy.

## 6. Telemetry Coverage Matrix

Coverage is tracked by service tier (POL-001 §6.5 / Backgrounder §6.5). Coverage means: relevant security log sources are forwarded, parsed correctly, and at least one production detection rule is evaluating the source.

| Tier | Services in tier | Identity | Network/edge | Compute | Data tier | Endpoint | Coverage status |
|---|---|---|---|---|---|---|---|
| **P1** | Transitions of Care; Referral Lifecycle Management | Okta, AWS IAM | CloudFront, ALB, WAF | EKS audit, container runtime | Aurora pgAudit, S3 access | CrowdStrike on bastion only | **Full** |
| **P2** | Chronic Care Mgmt; Population Insights | Okta, AWS IAM | CloudFront, ALB, WAF | EKS audit, Snowflake compute | Snowflake ACCOUNT_USAGE | n/a | **Full** |
| **P3** | Internal reporting, marketing site, internal tools | Okta, AWS IAM | ALB | EKS audit | Aurora pgAudit (subset) | n/a | **Partial** — query-level audit not enabled on internal-only Aurora reader |
| **Corporate IT** | Microsoft 365, Okta workforce, endpoint fleet | Okta, Entra ID | n/a | n/a | M365 audit | Jamf, Intune, CrowdStrike Falcon | **Full** |
| **Legacy ETL** | Raleigh on-prem ETL cluster | Local AD (federated to Okta) | Raleigh edge firewall | Host syslog (partial) | DB local audit (manual) | CrowdStrike Falcon installed | **Partial** — see §6.1 |

### 6.1 Known coverage gaps

The following gaps are documented, accepted, and tracked in the cyber risk register:

1. **Legacy on-premises ETL cluster, Raleigh HQ (RISK-Cyber-Risk-Register R4).** Host-level syslog is forwarded via a single rsyslog -> Datadog Agent path; database-level audit logging is partial; no application-layer audit. The cluster is excluded from automated PHI flow inventory. Compensating controls: CrowdStrike Falcon on hosts; network egress from the cluster is constrained to a small allowlist enforced at the Raleigh edge firewall and logged; the cluster is scheduled for decommission Q4 2026.
2. **Internal-only Aurora reader replica (P3).** Query-level pgAudit is not enabled because of performance overhead on the internal analytics workload. Connection-level events are logged. Treated as accepted residual risk pending move of internal reporting to Snowflake (FY26 H2).
3. **Detection rule coverage for legacy ETL is incomplete.** Tracked under R3 (alert tuning debt) and listed in the Detection Use Case Catalog (PLAYBOOK-Detection-Use-Cases) as backlog.

These gaps are reviewed quarterly by the Security Steering Committee.

## 7. Log-Pipeline Observability

### 7.1 Canary events

Each authoritative log source MUST emit a benign canary event at least once every 24 hours. Canaries are generated by:

- A scheduled Lambda function that performs a logged no-op IAM action (CloudTrail).
- A scheduled CronJob in EKS that writes a canary line to a watched namespace (EKS audit).
- A service account login from a designated jump host (Okta).
- A scheduled `SELECT 1` from a dedicated audit role (Aurora pgAudit, Snowflake QUERY_HISTORY).
- A synthetic detection event from a Falcon test host (CrowdStrike).

Canaries are tagged `mct.canary:true` and excluded from production detections. A monitor in Datadog alerts the Security Analyst if any expected canary fails to arrive within its source's expected window plus a tolerance buffer (typically 2x the normal cadence).

### 7.2 Volume monitoring

Datadog log-volume monitors are configured per source with an exponentially weighted moving average baseline. A drop greater than 50% versus baseline for any P1-relevant source pages on-call within 15 minutes. A drop on a P2/P3 or corporate source pages on-call within 1 hour.

### 7.3 Daily pipeline review

The Security Analyst reviews the SIEM Pipeline Health dashboard each business morning. The review confirms:

1. All canaries received in the last 24 hours.
2. No source is more than 1 standard deviation below volume baseline.
3. Datadog ingestion errors are zero or within normal range.
4. Cold-archive replication lag to us-west-2 is under 1 hour.

The review is logged as a Datadog incident note tagged `pipeline-health-review`.

## 8. Access Controls on Log Data

- Datadog tenant: SSO via Okta; role-based access; only Information Security has full read; named platform engineers have read access scoped to their service.
- Cold archive: Object Lock prevents modification; read access is granted just-in-time via PIM (PROC-PAM-01) for incident investigation only.
- Arctic Wolf MDR: scoped read access via Datadog API key with a service-account role and IP allowlist; key rotated quarterly.
- All access to logs is itself logged.

## 9. Compliance and Reporting

- Quarterly attestation by the Security Engineer (D&R) that retention is enforced and Object Lock is intact.
- Annual SOC 2 Type II evidence package: archive bucket policy, Object Lock state, retention proof, sample log integrity verification.
- HITRUST CSF r2 control evidence: this Standard plus generated reports are mapped to controls 09.aa, 09.ab, 09.ac, 09.ad.
- Quarterly KPI to the Security Steering Committee:
  - Source coverage percentage by tier.
  - Canary success rate.
  - Mean ingestion lag.
  - Open coverage gaps (count and aging).

## 10. Exceptions

Exceptions are governed by POL-001 §6 and recorded in REG-EX-01. The legacy ETL coverage gap is documented under exception EX-2024-007 with R4 as the linked risk and Q4 2026 closure.

## 11. References

- POL-001 Information Security Policy
- POL-002 Enterprise Risk Management Policy
- RAS-2025-12 Risk Appetite Statement
- RISK-Cyber-Risk-Register (R3, R4)
- PLAYBOOK-Detection-Use-Cases
- PROC-Alert-Triage
- PROC-PAM-01 Privileged Access Management Procedure
- 45 CFR §164.316(b)(2) HIPAA documentation retention

## 12. Document Control

| Version | Date | Author | Change summary |
|---|---|---|---|
| 1.0 | 2023-03 | M. Tan (predecessor) | Initial standard upon Datadog SIEM adoption |
| 2.0 | 2024-09 | M. Tan | Post-Pebble Phish rewrite; added Okta forwarding, MDR scope, canary requirement |
| 2.1 | 2025-04 | M. Tan | Added Snowflake ACCOUNT_USAGE; clarified P2 coverage |
| 2.2 | 2025-09 | M. Tan | Added Object Lock Compliance mode requirement |
| **2.3** | **2026-01** | **M. Tan** | **Annual review; coverage matrix refresh; explicit legacy ETL gap call-out under R4; Datadog audit-log feedback loop added** |
