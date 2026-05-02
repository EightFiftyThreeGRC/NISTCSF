# Privileged Access Management Procedure

**Document ID:** PROC-PAM-01
**Version:** 3.1
**Effective date:** January 1, 2026
**Last reviewed:** December 11, 2025
**Next review:** December 2026
**Approver:** Sarah Yoon, CISO
**Owner:** Ben Olafsson, IAM Specialist
**Distribution:** Engineering, Information Security, IT Operations; published on internal wiki and acknowledged annually by privileged users

---

## 1. Purpose

This Procedure operationalizes the privileged-access requirements set out in POL-IAM-01 §4.3, and provides the step-by-step controls for granting, using, monitoring, and reviewing privileged access at Meridian Care Technologies, Inc. ("MCT"). It applies the principle of least privilege via just-in-time (JIT) elevation, eliminating standing administrative entitlements wherever technically feasible.

## 2. Scope

This Procedure applies to all privileged access to in-scope systems, including:

- AWS production accounts (us-east-1, us-west-2) — all administrative IAM roles.
- Production Aurora PostgreSQL clusters and Snowflake production accounts.
- Okta super-admin and Okta administrative roles.
- AWS IAM Identity Center administrative roles.
- Datadog Cloud SIEM administrative roles, CrowdStrike Falcon administrative roles, Wiz administrative roles.
- Microsoft 365 Global Administrator and Intune administrative roles.
- Customer-tenant cross-boundary support roles in the MeridianCare admin console.
- Legacy ETL cluster (Raleigh HQ) administrative SSH; covered as a documented exception per CRA-LegacyETL-2025.

## 3. Definitions

| Term | Definition |
|---|---|
| Privileged role | Any entitlement that allows configuration change, data export, secret access, or audit-log modification on an in-scope system. |
| JIT elevation | Time-bound, reason-tagged grant of an administrative role via Okta Access Requests + AWS IAM Identity Center session. |
| Standing privilege | Persistent administrative entitlement attached to a daily-use identity. **Prohibited** for in-scope systems. |
| Privileged identity | A user-suffix `.adm` Okta account distinct from the daily-use account. |
| Break-glass account | An emergency local IAM account, credentials sealed and stored offline, usable only when Okta is unavailable. |

## 4. Who is Privileged

The following populations require privileged identities. Assignment is approved by the CISO (Sarah Yoon) and operationally administered by the IAM Specialist (Ben Olafsson):

| Population | Approximate count | Privileged scope |
|---|---|---|
| Engineers with production access | ~38 (subset of Eng & Product) | Production AWS, Aurora, Snowflake, EKS via JIT roles |
| SREs / production on-call | ~12 (subset of Eng & Product) | Same as above + incident-response break-glass |
| Information Security team | 6 | SIEM admin, EDR admin, IDP admin, Wiz admin |
| IAM admin | 1 (Ben Olafsson) | Okta super-admin (separate `.adm` identity) |
| IT admin | ~4 (IT Operations within G&A) | M365 GA, Intune, Jamf, Workday admin |
| Database admin (DBA) | 2 | Aurora and Snowflake admin |
| Legacy ETL admin | 2 (Tomás Reyes + 1 senior engineer) | Local Linux root on legacy ETL nodes (exception) |

A consolidated privileged-user roster is maintained in ServiceNow GRC and reconciled monthly.

## 5. JIT Elevation Workflow (Daily Path)

**Step 1 — Request.** From the Okta dashboard, the requester opens "Access Requests" and selects the desired AWS IAM Identity Center permission set or application admin role. The requester provides:

- Business justification (free text, minimum 20 characters).
- Optional ticket reference (Jira / ServiceNow change number).
- Requested duration (default 1 hour; maximum 4 hours).

**Step 2 — Approval.** Approval routing depends on role criticality:

| Role criticality | Approver | Approval SLA |
|---|---|---|
| AWS read-only / break-fix | Direct manager | 15 min |
| AWS write / production database | Direct manager + on-call senior engineer | 30 min |
| Okta super-admin / IAM admin | CISO (or delegate: GRC Manager) | 30 min |
| Cross-tenant support role | VP Customer Success + Security Engineer (D&R) | 30 min |
| SIEM / EDR admin | CISO | 30 min |

Approvers receive Slack DM + email notification. Approval is one-click in Okta with required justification field.

**Step 3 — Elevation.** Upon approval, Okta provisions a session-bound assertion to AWS IAM Identity Center (or to the target SaaS admin console). The session is bound to:

- A single AWS account or SaaS tenant.
- A single permission set / role.
- The approved duration (auto-revoked at end).
- The requester's `.adm` Okta identity (FIDO2-authenticated within the prior 5 minutes).

**Step 4 — Use.** The privileged user performs the work. All actions are logged to:

- AWS CloudTrail (for AWS).
- Okta system log (for the elevation event itself).
- The target system's native admin log (e.g., Datadog admin log, Okta admin log).
- Datadog Cloud SIEM (aggregated).

**Step 5 — Termination.** The session terminates automatically at the requested expiry. Manual early termination is encouraged when work is complete. Re-elevation requires a new request.

**Step 6 — Reconciliation.** Daily, the IAM Specialist runs an automated reconciliation that compares (a) approved elevations, (b) actual sessions in CloudTrail / Okta, and (c) any standing entitlement not authorized by the privileged-user roster. Any discrepancy is investigated within one business day.

## 6. Break-Glass Account Procedure

### 6.1 Purpose

Break-glass accounts exist solely to recover access when Okta or AWS IAM Identity Center is unavailable. Their existence is a known, accepted residual risk required for Okta concentration risk (per the Risk Appetite Statement RAS-2025-12 and supplier review of Okta).

### 6.2 Standard

MCT maintains exactly **three** sealed break-glass credentials per critical system (AWS Organization root, AWS production member account root, Okta org-admin local account):

- Each credential is a complex randomized 64-character password plus a FIDO2 hardware key (YubiKey 5 Nano).
- The password is printed on tamper-evident sealed paper inside an opaque tamper-evident envelope.
- The YubiKey is stored in a separate envelope.
- Both envelopes are stored in a UL-listed Class TL-15 safe at the Raleigh HQ secure room, with a duplicate set in a separate fireproof safe at the Pittsburgh secondary site.
- Custodians: CISO (Sarah Yoon), CTO (David Mehta), and IAM Specialist (Ben Olafsson). At least two custodians must be present to access a credential ("two-person integrity").

### 6.3 Activation

Break-glass activation is permitted only when:

- Okta or AWS IAM Identity Center is confirmed unavailable for >30 minutes during a SEV-1 or SEV-2 incident.
- The CISO (or CISO delegate, in CISO unavailability) authorizes activation.
- Two custodians are present and document the activation in the IR runbook.

### 6.4 Logging and post-use

- Use is recorded in the IR runbook including timestamp, custodians present, business justification, and end-of-use timestamp.
- The credential is invalidated within 24 hours of use (password reset and re-sealed; YubiKey rotated).
- A post-use report is filed with the Audit & Risk Committee within 72 hours.

### 6.5 Quarterly verification

The IAM Specialist verifies the integrity of the sealed envelopes quarterly (envelope intact; YubiKey present in matching envelope; record of last verification signed by two custodians).

## 7. Logging and Monitoring

All privileged sessions, approval events, and break-glass activations feed Datadog Cloud SIEM with the following alerts:

| Alert | Condition | Action |
|---|---|---|
| Elevation outside approved window | Session active beyond approved expiry | P2 page to on-call security |
| Break-glass credential touched | Any auth event from break-glass identity | P1 page to CISO + on-call security |
| Privileged role assumed without prior approval | Session for `.adm` identity without matching Okta approval | P1 page; auto-revoke session |
| Privileged action outside business hours, no on-call ticket | Heuristic: weekend or 22:00–06:00 ET, no Jira / IR ticket linked | P3 ticket to Sec Eng (D&R) |
| Unusual command (`AssumeRole` to non-prod from prod role; `DropDatabase`; `CreateUser` in IAM) | Pre-defined high-risk command list | P2 page |

Logs are retained 90 days hot in Datadog and 7 years cold in S3 (Glacier transition at 365 days), per HIPAA §164.316(b)(2) and POL-001 §3.11.

## 8. Quarterly Review

### 8.1 Scope

Each quarter, the IAM Specialist (Ben Olafsson) and the GRC Manager (Jordan Park) review:

- The privileged-user roster (still privileged? still in role? still required?).
- Break-glass envelope integrity.
- Standing entitlements (target = 0; any > 0 require documented exception).
- Elevation patterns (duration, reason quality, approver responsiveness).
- Sample-test 10% of approvals for justification adequacy and reasonableness.

### 8.2 Output

A Quarterly Privileged Access Review memo to the CISO (and, for Q4, the Audit & Risk Committee). Sample memo: see RPT-Quarterly-Access-Review-Q4-2025 §5.

### 8.3 Findings

Findings are tracked in ServiceNow GRC and remediated within timelines proportional to severity:

- Standing entitlement detected: 14 days to remediate or formally except.
- Approval-quality finding (poor justification, batched rubber-stamping): coaching memo + re-test next quarter.
- Break-glass anomaly: immediate remediation; CISO-led investigation.

## 9. Exceptions

Exceptions require CISO approval and are logged in REG-EX-01. Standing exceptions:

- Legacy ETL cluster local Linux root (CRA-LegacyETL-2025) — out of central PAM automation; compensating controls = bastion-only SSH access + MFA at bastion + quarterly local-account review by IT Operations + decommission Q4 2026.
- AWS root account (per AWS best practice, used only for break-glass billing or account-recovery scenarios; covered by §6).

## 10. Roles and Responsibilities

| Role | PAM responsibilities |
|---|---|
| CISO (Sarah Yoon) | Approves privileged-user roster; authorizes break-glass activation; receives quarterly review memo |
| IAM Specialist (Ben Olafsson) | Operates Okta + AWS IAM Identity Center; runs daily reconciliation; quarterly review |
| GRC Manager (Jordan Park) | Co-runs quarterly review; tracks findings in ServiceNow GRC; reports to A&R Committee |
| Security Engineer (D&R) (Marcus Tan) | Tunes SIEM detections for §7 alerts; investigates anomalies |
| CTO (David Mehta) | Break-glass custodian; sponsor of standing-privilege elimination program |
| Privileged users | Comply with this Procedure; do not share credentials; report compromise immediately |

## 11. Related Documents

- POL-001 Information Security Policy
- POL-IAM-01 Identity and Access Management Policy
- STD-MFA-01 MFA Standard and Rollout Evidence
- STD-ENC-01 Cryptographic Key Management Standard
- PLN-IR-01 Incident Response Plan
- RPT-Quarterly-Access-Review-Q4-2025
- CRA-LegacyETL-2025
- RAS-2025-12 Risk Appetite Statement

## 12. Document Control

| Version | Date | Author | Change summary |
|---|---|---|---|
| 1.0 | 2022-04 | Prior IAM lead | Initial PAM procedure (pre-Okta) |
| 2.0 | 2023-10 | S. Yoon | Rewrite on Okta + AWS IAM Identity Center adoption |
| 3.0 | 2024-11 | B. Olafsson | Post-Pebble Phish; introduced session-bound JIT and FIDO2 gating |
| **3.1** | **2025-12** | **B. Olafsson, J. Park** | **Annual review; clarified break-glass two-person integrity; added Datadog alert table; aligned with NIST CSF 2.0 PR.AA** |
