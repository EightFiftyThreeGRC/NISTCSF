# Business Impact Analysis

**Document ID:** BIA-2025-12
**Version:** 4.0
**Effective date:** January 1, 2026
**Last refresh:** December 8, 2025 (annual)
**Next refresh:** December 2026
**Approver:** David Mehta, CTO; Sarah Yoon, CISO; Greg Hartman, CFO; reviewed by Audit & Risk Committee
**Owner:** Jordan Park, GRC Manager (process); Tomás Reyes, VP Engineering (P1 service inputs); Lauren Pham, VP Customer Success (customer impact)

---

## 1. Purpose

This Business Impact Analysis ("BIA") identifies the business processes and systems on which Meridian Care Technologies, Inc. ("MCT") depends; quantifies the operational, financial, regulatory, and customer-facing consequences of disruption to each; and establishes recovery time and recovery point objectives that inform the Disaster Recovery Plan, the Business Continuity Plan, and the cyber risk register.

This BIA is the authoritative source for service tiering, RTO/RPO commitments, and customer-facing availability SLAs.

## 2. Methodology

The BIA was conducted through structured workshops with each functional group plus representatives from a sample of customer organizations. For each business process and supporting system, the team estimated:

- **Operational impact** at 4 hours, 24 hours, 72 hours, and 1 week of disruption (minor / moderate / major / severe).
- **Financial impact** at the same time horizons (revenue impact, recovery cost, contractual penalty exposure).
- **Regulatory impact** (HIPAA Breach Notification triggers, BAA breach triggers, CMS reporting impact).
- **Customer impact** (number of customers affected, clinical impact on downstream patients, reputational impact).
- **Workforce impact** (number of employees unable to perform core duties).

Outputs were validated against historical incident data (the September 2024 Population Insights availability event, the August 2023 multi-hour Aurora failover event), against customer SLAs, and against the Risk Appetite Statement availability thresholds.

## 3. Service Tiering and RTO/RPO Targets

| Tier | Services | Target RTO | Target RPO | Rationale |
|---|---|---|---|---|
| **P1** | Transitions of Care; Referral Lifecycle Management | 4 hours | 15 minutes | Care decisions in flight depend on platform availability. Disruption beyond 4 hours can defer post-acute care actions and elevate readmission risk. RPO 15m reflects synchronous Aurora replication. |
| **P2** | Chronic Care Management; Population Insights | 24 hours | 4 hours | Operational and analytical workloads. Downtime impacts billable workflows (CCM time logging) and analytical refreshes but does not block care decisions. |
| **P3** | Internal reporting; corporate IT (Microsoft 365 access not required for clinical workflows); marketing site | 72 hours | 24 hours | Best-effort restoration. Supports internal operations but is not customer-facing for clinical purposes. |

These targets are documented commitments but capability does not currently meet target in all dimensions. Specifically:

- P1 RTO of 4 hours is achievable today for the database tier (Aurora multi-AZ + cross-region replica) but is not exercised at scale; the most recent full-failover test (April 2025) achieved 3h 47m RTO for the database tier only. End-to-end application failover including ingress, EKS workload re-spin, and customer-facing DNS has not been tested at full production scale. **Captured as risk register entry R2.**
- P1 RPO of 15 minutes is achievable for Aurora; for S3 attachment storage the cross-region replication SLA is 15 minutes typical / 60 minutes max — within target but tighter monitoring is required.
- P2 RTO of 24 hours is achievable for the Snowflake-based Population Insights module but requires a manual reconfiguration step that adds 2-4h; **captured as R6.**

## 4. Critical Business Processes — Impact at Time Horizons

### 4.1 Care coordination workflow ingestion (P1)

| Time horizon | Operational impact | Financial impact | Regulatory impact | Customer impact |
|---|---|---|---|---|
| 4h | Moderate — incoming care plans queue; backlog clears within 1h of restoration | <$50K (estimated CCM workflow loss) | None | All 47 customers affected; clinical staff workarounds required |
| 24h | Major — backlog risk to discharge planning; manual workarounds required | $200K-$400K | Potential BAA notification trigger if PHI access disrupted | All 47 customers; clinical impact escalating |
| 72h | Severe — significant care-action deferral risk; post-acute follow-ups missed | $1.0M-$2.0M revenue impact + customer credit exposure | BAA notification trigger; customer-mediated regulator notification possible | All 47 customers; reputational impact |
| 1 week | Catastrophic — material customer churn risk | >$5M | Multiple BAA breach notifications | Existential to customer relationships |

### 4.2 Referral loop closure (P1)

| Time horizon | Operational impact | Financial impact | Customer impact |
|---|---|---|---|
| 4h | Minor | <$30K | 15 specialty-clinic customers most affected |
| 24h | Moderate | $100K-$200K | Specialty clinic customers; outgoing referrals queue |
| 72h | Major | $500K-$1M | Loop-closure SLA exposure; reputational |

### 4.3 Chronic Care Management billing-time log (P2)

| Time horizon | Operational impact | Financial impact | Customer impact |
|---|---|---|---|
| 24h | Minor (logs can be reconstructed) | <$50K customer revenue impact | 8 ACO/PCP customers; manual logging fallback documented |
| 72h | Moderate | $100K-$300K | Risk of CMS-reportable CCM time billing impact |

### 4.4 Population Insights analytics refresh (P2)

| Time horizon | Operational impact | Financial impact | Customer impact |
|---|---|---|---|
| 24h | Minor | None directly | 12 customers using analytics; refreshes resume at restoration |
| 72h | Moderate | <$100K | Analytic dashboards stale |

## 5. Critical Dependencies

**Internal:**
- Aurora PostgreSQL (us-east-1 primary; us-west-2 replica): backbone of P1 transactional workflows.
- Okta (workforce identity): no Okta = no engineer access to remediate any incident.
- Datadog (observability + SIEM): blind spot if Datadog itself is down.
- Snowflake: Population Insights module backbone.
- AWS S3 + CloudFront: attachment storage and CDN.

**External (third-party):**
- AWS (us-east-1 outage = potential MCT outage; us-west-2 is cross-region failover).
- Okta (Okta outage prevents workforce login; impact to clinical workflows depends on session validity at the time of outage).
- Snowflake (P2 dependency).
- Change Healthcare (clearinghouse — pilot only currently; backup Waystar planned).
- Surescripts (medication history dependency for some workflows).
- Direct Trust (HIPAA-compliant Direct Secure Messaging).

## 6. Workforce Impact

In the event of a major incident, the following workforce roles are critical for response and recovery:

| Role | Minimum count required | Backup |
|---|---|---|
| Incident Commander (CISO or designated SecEng) | 1 | Tan, Reyes, Park (cross-trained) |
| Engineering on-call | 2 | Engineering on-call schedule (4 SREs + 8 backend engineers in rotation) |
| Customer Communication lead | 1 | VP CS, CISO, GC (joint comm authority) |
| GC for breach evaluation | 1 | Holbrook + outside counsel (Crowell & Moring on retainer) |

A full-site loss of the Raleigh HQ would not block production response (no production systems run at Raleigh; legacy ETL is not P1) but would block in-person all-hands. Pittsburgh site is a viable secondary; remote workforce is fully equipped for distributed response.

## 7. Linked Documents

- POL-001 Information Security Policy
- PLN-IR-01 Incident Response Plan
- PLN-BCP-01 Business Continuity Plan
- PLN-DRP-01 Disaster Recovery Plan
- RAS-2025-12 Risk Appetite Statement
- RISK-Cyber-Risk-Register (entries R2, R6 specifically)

## 8. Document Control

| Version | Date | Author | Change summary |
|---|---|---|---|
| 3.0 | 2024-12 | J. Park | Service-tier framework introduced |
| 4.0 | 2025-12 | J. Park | Aligned to RAS v2.0 quantitative thresholds; updated dependency list to reflect Change Healthcare-pilot status; added Pittsburgh secondary site analysis |
