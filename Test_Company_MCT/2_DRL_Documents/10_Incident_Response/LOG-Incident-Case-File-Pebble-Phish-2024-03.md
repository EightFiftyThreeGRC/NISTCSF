# Incident Case File — "Pebble Phish"

**Document ID:** LOG-IR-2024-03-001
**Version:** 2.1 (closure record + 2025 retrospective addendum)
**Incident date:** March 14, 2024
**Closure date:** March 22, 2024
**Last updated:** December 15, 2025 (retrospective addendum on FIDO2 program closure)
**Final severity:** SEV-2
**Owner of record:** Marcus Tan, Security Engineer (Detection & Response) — designated IC retrospectively (note: Tan joined September 2024; original IC was the prior on-call engineer M. Reilly, who left MCT in August 2024; Tan inherited the case file for closure tracking)
**Sign-off:** Sarah Yoon, CISO; Marcus Holbrook, GC
**Classification:** Internal — Distribution Limited

---

## 1. Summary

On March 14, 2024, between 10:31 EDT and 11:31 EDT, MCT experienced a targeted credential-phishing attack against nine billing clerks within the Customer Success operations group. One clerk submitted credentials to a credential-harvesting page imitating the Okta sign-in screen. The attacker attempted authentication to the user's Okta account and triggered an Okta Verify push challenge (this was prior to the Q4 2024 mandatory FIDO2 rollout for privileged users); the user did not approve the push. Three additional MFA prompts were sent over the next 14 minutes, all rejected. An Okta MFA-fatigue alert fired in Datadog at 11:07 EDT and was triaged by the on-call security engineer at 11:14 EDT. The user's Okta sessions were revoked and password reset by 11:31 EDT.

A post-incident review concluded that **no PHI was accessed**, no successful authentication to MCT systems occurred, and **no breach notification under HIPAA §164.402 was triggered**. The four-factor analysis was documented in BREACH-ASSESS-2024-03-001 and approved by the General Counsel and HIPAA Privacy Officer.

The incident produced four major program changes that constitute the Company's principal post-Pebble-Phish improvements (see §9).

## 2. Severity Declaration

| Field | Value |
|---|---|
| Initial severity (declared 11:14 EDT by on-call) | SEV-3 |
| Re-evaluated severity (11:42 EDT by CISO) | SEV-2 |
| Final severity | SEV-2 |
| Rationale | Targeted phishing campaign with credential submission; SEV-2 per PLN-IR-01 §5. SEV-2 was confirmed once the breadth of the campaign (9 recipients) was understood; initial triage classified the single user event as SEV-3. |

## 3. Timeline (Eastern Daylight Time, March 14, 2024)

| Time | Event | Source |
|---|---|---|
| 10:24 | Phishing email delivered to nine billing-clerk recipients. Subject: "URGENT: Health-plan portal access expiration — action required". Sender: spoofed `noreply@oktasso-mct[.]com` (lookalike domain registered 2024-03-12). | Microsoft 365 quarantine logs (post-hoc) |
| 10:29 | First three recipients report the email via the in-product "Report Phish" button. | Microsoft Defender + `security@meridiancare.com` |
| 10:31 | User-A clicks the link, navigates to credential-harvesting page hosted at `https://oktasso-mct[.]com/login`. | Microsoft Defender SafeLinks click telemetry |
| 10:33 | User-A submits username and password. | Reconstructed from server-side telemetry (post-hoc, with Mandiant retainer support) |
| 10:42 | Attacker authenticates to MCT Okta using the stolen credentials from IP `45.155.x.x` (later attributed to a known credential-harvesting infrastructure cluster). Okta returns MFA challenge. | Okta system log |
| 10:42 | Push notification sent to User-A's Okta Verify on iOS device. User does not approve. | Okta system log |
| 10:48, 10:53, 10:56 | Three additional push notifications sent. All rejected by User-A. | Okta system log |
| 11:02 | User-A sends Slack message to her team lead saying "okta keeps pushing me, weird". Team lead advises forwarding to security. | Slack `#cs-billing-team` (audit-exported) |
| 11:04 | User-A forwards the original email to `security@meridiancare.com`. | Microsoft 365 |
| 11:07 | **Datadog SIEM alert fires:** Okta MFA fatigue rule (≥3 push challenges denied within 15 minutes from a new IP). | Datadog `okta_mfa_fatigue` rule |
| 11:14 | On-call security engineer (M. Reilly) acknowledges the alert. | PagerDuty |
| 11:18 | Reilly reviews Okta system log; identifies attacker IP and confirms no successful authentication. Begins containment. | Okta + IR runbook `RB-PHISH-CRED-001` v1.0 |
| 11:22 | Reilly contacts User-A by phone to confirm she did not approve any pushes. Confirmed. | Phone call (logged in IR ticket) |
| 11:23 | Reilly initiates Okta session revocation for User-A; password reset triggered; MFA factors marked for re-enrollment. | Okta admin action log |
| 11:25 | Reilly opens Jira ticket `SEC-IR-2024-014`; severity SEV-3; pages CISO. | Jira |
| 11:31 | Containment complete: User-A's Okta password reset, sessions revoked, MFA factors re-enrolled (FIDO2 not yet available for this role; Okta Verify re-enrolled). | Okta admin action log |
| 11:42 | CISO (S. Yoon) re-evaluates severity to SEV-2 on confirming the campaign reached nine recipients. | Jira ticket update |
| 11:50 | GC (M. Holbrook) engaged. Breach Assessment Workgroup convened. | Email + Zoom |
| 12:15 | Email sweep across the recipient cohort: all nine emails identified, four already reported, five quarantined retroactively. | Microsoft 365 Defender |
| 12:30 | M365 mail flow rule applied to block the lookalike domain across the tenant. | Microsoft 365 admin |
| 12:45 | CrowdStrike scan initiated on User-A's laptop and the eight other recipient endpoints. No malicious artifacts found on any device. | CrowdStrike Falcon |
| 14:00 | Beazley insurer notified by GC as a precaution (within the 72-hour window of suspected covered event). | Email log |
| 16:30 | First written status report delivered to Steering Committee. | Email |
| Mar 15 | Continued forensic review: Aurora pgAudit for User-A's identifier returns no production reads in the relevant window (User-A is a billing clerk and does not have direct production data access; this was confirmed). | pgAudit + Okta application access |
| Mar 18 | Breach Assessment Workgroup meets to formalize §164.402 four-factor analysis. | BREACH-ASSESS-2024-03-001 |
| Mar 19 | Determination: no breach per §164.402; no notification required. | BREACH-ASSESS-2024-03-001, signed by GC |
| Mar 22 | Incident closed; PIR scheduled for Mar 28. | Jira closure |

## 4. Root Cause

**Primary technical root cause:** The phishing email reached User-A's inbox because the lookalike domain `oktasso-mct[.]com` had been registered 36 hours earlier and was not yet present in Microsoft Defender's URL reputation feed. SafeLinks rewrote the URL but did not block it. This is a known limitation of pre-emptive reputation-based filtering against freshly registered domains.

**Identity factor:** The Customer Success billing-clerk role at the time of the incident used Okta Verify push as the second factor, not FIDO2/WebAuthn. While this control resisted the attack (the user did not approve the push), Okta Verify push is vulnerable to MFA fatigue and social engineering in adjacent scenarios. **The role had not been included in the FIDO2 rollout because the rollout had been scoped to engineers, security staff, and production-access administrators only.** The billing clerk role was not classified as production-access at the time. This scoping decision, made in 2023, was the principal organizational root cause.

**Human factor:** User-A acted correctly: she did not approve the push, escalated to her team lead and to security, and provided full forensic cooperation. The user's response was a positive control. However, the time between credential submission (10:33) and user awareness of trouble (11:02) was 29 minutes — the MFA-fatigue prompts were the user's first signal that something was wrong, not the credential submission itself. A user-side detection signal earlier would have been preferable.

**Five-whys:**

1. Why did this incident happen? — A user submitted credentials to a phishing page.
2. Why was that possible? — The lookalike domain bypassed reputation filtering.
3. Why did the credential submission not lead to compromise? — MFA stopped it; the user did not approve push.
4. Why was MFA the only barrier? — The role was not on FIDO2 because FIDO2 scope was limited to production-access roles.
5. Why was FIDO2 scope limited? — Phased rollout strategy in 2023 prioritized highest-risk roles. The PIR concluded this prioritization was reasonable at the time but the scope should be expanded.

## 5. Containment Actions Taken

1. Okta sessions revoked for User-A (11:23 EDT).
2. Okta password reset; MFA factors marked for re-enrollment (11:23 EDT).
3. Mail flow rule applied to block lookalike domain across the tenant (12:30 EDT).
4. Email sweep across recipient cohort; quarantine of all nine emails (12:15 EDT).
5. CrowdStrike scan of all nine recipient endpoints; no malware found (12:45 EDT and rolling).
6. Datadog detection rule reviewed and validated (no tuning change required; rule fired correctly).
7. Lookalike domain reported to Cloudflare (registrar) for takedown; takedown confirmed Mar 16.

## 6. Evidence Collected

| Artifact | Source | Hash (SHA-256) | Storage |
|---|---|---|---|
| Original phishing email (`.eml` × 9) | Microsoft 365 | (per-file manifest in evidence bucket) | `s3://mct-ir-evidence/2024-03-001/email/` |
| Okta system log export (Mar 14, 09:00–18:00 EDT) | Okta | `0e3a…` | `s3://mct-ir-evidence/2024-03-001/okta/` |
| Datadog SIEM alert export | Datadog | `7b41…` | `s3://mct-ir-evidence/2024-03-001/datadog/` |
| User-A endpoint EDR snapshot | CrowdStrike Falcon RTR | `a228…` | `s3://mct-ir-evidence/2024-03-001/edr/` |
| Aurora pgAudit query for User-A's identifier | RDS | `d41a…` | `s3://mct-ir-evidence/2024-03-001/pgaudit/` |
| BREACH-ASSESS-2024-03-001 (signed PDF) | Workgroup | `9c77…` | `s3://mct-ir-evidence/2024-03-001/breach-assess/` |
| Mandiant retainer engagement summary | Mandiant | `b504…` | `s3://mct-ir-evidence/2024-03-001/external/` |

Chain of custody recorded in Jira `SEC-IR-2024-014`. Evidence bucket configuration: KMS-encrypted, MFA-delete enabled (added Mar 19, mid-incident, in response to a finding from this case), S3 Object Lock applied retroactively at closure.

Retention until: March 22, 2031 (7-year HIPAA documentation retention).

## 7. BAA / Breach Assessment Outcome

**Reference:** BREACH-ASSESS-2024-03-001 (signed PDF, GC + CISO + Privacy Workgroup, March 19, 2024).

The Breach Assessment Workgroup performed the four-factor analysis under 45 CFR §164.402(2):

1. **Nature and extent of PHI involved.** No PHI was identified as having been accessed. User-A's role does not provide direct database access to PHI; her access is limited to billing-related tooling that surfaces only billing identifiers, not clinical detail. Even had the attacker successfully authenticated, the access vector did not provide PHI.
2. **Unauthorized recipient.** External attacker, IP attributed to a known credential-harvesting infrastructure operator. No evidence of nation-state attribution.
3. **Whether PHI was actually acquired or viewed.** Forensic evidence (Okta system log, Aurora pgAudit, Microsoft 365 audit log) confirms no successful authentication to any MCT system other than the unsuccessful Okta sign-in attempts (which never passed MFA). No PHI was acquired or viewed.
4. **Extent to which the risk has been mitigated.** Credentials rotated; sessions revoked; lookalike domain blocked at the gateway; CrowdStrike sweep clean.

**Determination:** The §164.402 presumption is **rebutted** by the documented absence of PHI acquisition or viewing. **No breach notification under HIPAA Breach Notification Rule is required.** No customer notification is required. Customers were notified informally as part of routine quarterly security update communications (October 2024) once the post-incident program improvements were in flight, but this was a courtesy posture, not a notification obligation.

GC sign-off: Marcus Holbrook, March 19, 2024.
CISO concurrence: Sarah Yoon, March 19, 2024.

## 8. Customer and Regulator Notifications

| Audience | Notified? | Rationale |
|---|---|---|
| HHS OCR | No | No §164.402 breach. |
| State AGs | No | No state-level notification trigger absent a federal breach. |
| Customers (BAA partners) | No formal notification | No §164.402 breach. Informal advisory posture in routine quarterly update Oct 2024. |
| Beazley insurer | Yes — precautionary 14:00 EDT March 14 | Within 72-hour notice window; case closed by Beazley as no claim. |
| Audit & Risk Committee | Yes — written brief Mar 28 | Standing escalation. |
| Board | Yes — summary in Q1 2024 CISO report | Standing reporting cadence. |

## 9. Lessons Learned — Four Major Program Changes

The PIR was held March 28, 2024. Four major program changes were endorsed by the Steering Committee and approved by the Board's Audit & Risk Committee at its April 2024 meeting:

1. **FIDO2 / WebAuthn scope expansion.** The Q4 2024 FIDO2 mandate was expanded beyond engineers and production-access administrators to include all production-access roles, security personnel, and engineers in the first phase, with phased enrollment of remaining workforce continuing through 2025. Full enforcement was achieved Q4 2025. Status: **closed; FIDO2 fully enforced for in-scope roles per POL-IAM-01.**

2. **Arctic Wolf 24x7 MDR contracted (May 2024).** The contract with Arctic Wolf was signed May 2024 to provide overnight (18:00–06:00 ET) and weekend tier-1 monitoring of Datadog SIEM and CrowdStrike alerts. Rationale: the on-call security engineer model was viable but stretched, and Pebble Phish underscored the need for human eyes on alerts continuously. Expansion to full tier-1 handoff under negotiation as of February 2026 (FY26 Priority 4). Status: **closed; Arctic Wolf operational since May 2024.**

3. **Quarterly phishing simulations targeting credential-harvesting scenarios.** The security awareness program added quarterly phishing simulations specifically targeting credential-harvesting and lookalike-domain scenarios, with targeted retraining for users who fail. The Q1 2024 baseline click rate (7.2%) has been driven down to 2.4% as of Q4 2025; report rate is 48%. Risk register entry R10 (Workforce phishing susceptibility) was closed Q3 2025 against this control. Status: **closed; program ongoing.**

4. **DLP project approved.** Microsoft Purview DLP (for Microsoft 365) and Netskope CASB (for sanctioned-SaaS DLP) and Wiz DSPM (for cloud data flow visibility) were approved in mid-2024 and entered design phase in 2025. Target deployment Q3 2026. Status: **in progress; FY26 priority 5.**

Action items 1–3 are closed; action item 4 is in progress and tracked in the FY26 strategic plan.

## 10. Retrospective Addendum (December 2025)

A retrospective review of the case file was performed in December 2025 ahead of HITRUST validation. Findings:

- The four major program changes are demonstrably in place or progressing as documented above.
- The Q4 2025 IR tabletop on Snowflake credential exposure (RPT-IR-Tabletop-Q4-2025) referenced the four-factor §164.402 workflow used here as the procedural precedent.
- Risk register entry R10 (Workforce phishing susceptibility) was closed Q3 2025 with the click-rate KPI sustained below target.
- No further updates required; case file retained until March 22, 2031.

## 11. Sign-Off

| Role | Name | Date |
|---|---|---|
| Incident Commander (original) | M. Reilly | 2024-03-22 (departed Aug 2024) |
| Incident Commander of record (closure) | Marcus Tan | 2024-09-30 (file inheritance) |
| CISO | Sarah Yoon | 2024-03-22 (closure); 2025-12-15 (retrospective) |
| General Counsel | Marcus Holbrook | 2024-03-22 (closure); 2025-12-15 (retrospective) |

## 12. Linked Documents

- PLN-IR-01 Incident Response Plan §10
- BREACH-ASSESS-2024-03-001 (signed PDF in evidence bucket)
- POL-IAM-01 Identity and Access Management Policy (FIDO2 scope)
- PLN-SA-01 Security Awareness Program Plan
- RISK-Cyber-Risk-Register R10 (closed)
- MINUTES-Audit-Risk-Committee-Q2-2024 (program changes endorsement)

## 13. Document Control

| Version | Date | Author | Change summary |
|---|---|---|---|
| 0.5 | 2024-03-19 | M. Reilly | Active incident notes |
| 1.0 | 2024-03-22 | M. Reilly | Closure record; PIR endorsed |
| 2.0 | 2024-09-30 | M. Tan | File inheritance; structure cleanup |
| **2.1** | **2025-12-15** | **M. Tan** | **December 2025 retrospective addendum (§10)** |
