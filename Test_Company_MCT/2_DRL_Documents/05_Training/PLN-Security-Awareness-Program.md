# Security Awareness Program Plan

**Document ID:** PLN-SA-01
**Version:** 3.2
**Effective date:** January 1, 2026
**Last reviewed:** December 18, 2025 (annual review)
**Next review:** December 2026
**Approver:** Sarah Yoon, CISO
**Owner:** Sarah Yoon, CISO (strategic); Priya Iyer, Security Analyst (operational)
**Distribution:** All employees, contractors, and authorized third parties; published on internal wiki and acknowledged annually via Workday

---

## 1. Purpose

This Security Awareness Program Plan ("Plan") establishes Meridian Care Technologies, Inc.'s ("MCT") approach to building and sustaining a workforce that recognizes, reports, and resists cybersecurity threats targeting the MeridianCare platform, the data of the patients we serve, and the corporate IT environment. It satisfies the awareness-and-training obligations of Section 3.7 of POL-001 (Information Security Policy), the HIPAA Security Rule administrative safeguard at 45 CFR §164.308(a)(5), and the NIST CSF 2.0 PR.AT category.

The Plan was last materially restructured following the March 14, 2024 "Pebble Phish" incident, which demonstrated that credential-harvesting was the highest-likelihood human-factor risk to MCT and that the pre-2024 once-yearly training cadence was insufficient as the sole intervention. The 2024 restructuring introduced quarterly phishing simulations, role-based tracks, and persistent in-channel reinforcement; the 2026 revision tunes content and adds executive briefings.

## 2. Scope

This Plan applies to:

- All MCT personnel — full-time employees, part-time employees, interns — regardless of work location or department.
- Contractors and authorized third parties whose engagement involves access to MCT systems or data for more than 30 days.
- Personnel of acquired entities (currently the Pittsburgh site) on the same cadence as Raleigh and remote staff.

Out of scope: short-engagement vendors and one-off subcontractors who do not access MCT systems; their security obligations are addressed through the Third-Party Risk Management Policy (POL-TPRM-01) and contractual provisions.

## 3. Program Objectives

The Plan pursues four objectives, each tied to a measurable outcome:

1. **Universal baseline competence.** Every member of the workforce understands MCT's core security expectations — PHI handling, password and MFA discipline, incident reporting, acceptable use, social-engineering recognition. Measured by annual training completion (target 100%).
2. **Role-appropriate depth.** Personnel in roles with elevated risk (engineering, administration, security, customer success, finance, executive) receive training calibrated to that role. Measured by role-based training completion (target 100%; Q1 2026 actual 97%).
3. **Demonstrable resistance to social engineering.** The workforce visibly improves at recognizing and reporting phishing attempts over time. Measured by quarterly simulation click rate (target <3%, Q4 2025 actual 2.4%) and report rate (target >40%, Q4 2025 actual 48%).
4. **Sustained awareness between formal training events.** Security is a topic of continuous, low-friction reinforcement rather than a once-a-year compliance event. Measured indirectly by phishing-report rate and qualitatively by Slack channel engagement metrics.

## 4. Program Components and Modalities

The Plan combines five modalities, deliberately layered so that no single failure point removes a member of the workforce from the awareness program.

### 4.1 Annual security awareness training (KnowBe4 LMS)

The foundation of the program. Delivered via KnowBe4 KCM and assigned via the Workday-KnowBe4 SCIM integration, which automatically enrolls new hires and removes leavers. Every member of the workforce completes a baseline curriculum within 30 days of hire and an annual refresh thereafter on the anniversary of their hire date (with a 60-day completion window).

The baseline curriculum covers:

- HIPAA basics for the healthcare technology workforce (PHI definition, minimum-necessary, BAA obligations).
- Password and MFA hygiene; phishing-resistant MFA expectations for production-access roles.
- Recognition and reporting of social-engineering attempts (phishing, vishing, smishing, MFA-fatigue prompts).
- Acceptable use of MCT-issued and -authorized systems.
- Data-handling expectations (classification levels, sharing rules, PHI in non-production environments).
- Incident reporting channels and SLA expectations.

### 4.2 Role-based tracks

Detailed in PLN-Role-Based-Training-Catalog (PLN-RBT-01). Required modules vary by role; completion is enforced at the role-attribute level in KnowBe4 (synchronized from Workday job profiles).

### 4.3 Quarterly phishing simulations (KnowBe4 PhishER + KnowBe4 platform)

Introduced Q3 2024 in direct response to Pebble Phish. Every quarter, 100% of the workforce receives at least one simulated phishing lure designed to mirror a current, realistic threat scenario. Recent scenarios have included Okta-impersonation credential harvesting (the Pebble Phish vector), Microsoft 365 storage-quota lures, vendor-impersonation invoice fraud, and AI-generated executive-impersonation requests.

Outcomes are tracked at the individual, team, and department level. Click events trigger a "just-in-time" 5-minute training module assignment. Personnel with two click events in a rolling 12-month window are escalated to Priya Iyer for a 1:1 coaching session and an additional 30-minute KnowBe4 module. A third event in the same window triggers a manager conversation and is logged for HR.

Reporting via the "Phish Alert" Outlook button is encouraged; reports — true positives, simulated, and false positives — are routed to the SOC mailbox and acknowledged within 4 business hours.

### 4.4 In-channel reinforcement (Slack, internal newsletter, all-hands)

- **Slack `#security-tips`.** Priya Iyer publishes 1–2 short security tips per week — typical recent topics include macOS Gatekeeper warnings, Slack file-sharing pitfalls, and recognizing AI-generated voice scams. Open to comment and discussion.
- **Monthly newsletter.** "MeridianSec Monthly," distributed via Microsoft 365 to all personnel on the first business day of each month. Sections: "What we saw this month" (high-level, non-attributable summary of internal incidents and near-misses), "What's new in the threat landscape," "Spotlight" (a deeper dive on one topic), "What we're asking of you" (any concrete behavioral asks for the month).
- **Quarterly all-hands security segment.** A 5–7 minute segment delivered by the CISO (Sarah Yoon) or Priya Iyer at the quarterly company all-hands. Focus on quarterly metrics (phishing simulation results, training completion), program changes, and recognition of personnel who reported real or simulated phishing attempts.

### 4.5 Targeted briefings

Delivered ad hoc when threat intelligence, an incident, or a regulatory change warrants it. Recent examples: a December 2025 briefing for the Customer Success leadership on AI-voice-cloning vendor-impersonation attacks, and a February 2026 briefing for Finance on the resurgence of vendor-banking-detail-change BEC patterns.

## 5. Annual Calendar and Cadence

| Cadence | Activity | Owner | Notes |
|---|---|---|---|
| At hire (within 30 days) | KnowBe4 baseline curriculum | Priya Iyer / People Ops | Auto-enrolled via Workday SCIM |
| At hire (within 30 days) | Role-based modules per PLN-RBT-01 | Priya Iyer / Engineering Manager / People Ops | Role-specific |
| Annual (hire anniversary) | KnowBe4 refresh curriculum | Priya Iyer | 60-day completion window |
| Quarterly | Phishing simulation campaign | Priya Iyer | Scenario approved by CISO |
| Quarterly | All-hands security segment | Sarah Yoon / Priya Iyer | Q1, Q2, Q3, Q4 |
| Quarterly | Role-based content review | Priya Iyer + role leads | Update content where threat landscape moved |
| Monthly | "MeridianSec Monthly" newsletter | Priya Iyer | First business day |
| Weekly (1–2x) | Slack `#security-tips` post | Priya Iyer | Conversational |
| Ad hoc | Targeted briefings | Sarah Yoon, Priya Iyer, GC | As warranted by threat or incident |

## 6. Roles and Responsibilities

| Role | Responsibility |
|---|---|
| CISO (Sarah Yoon) | Strategic owner of the program. Approves curriculum direction, simulation scenarios, and annual budget. Reports program metrics to the Audit & Risk Committee quarterly. |
| Security Analyst (Priya Iyer) | Operational owner. Runs the LMS, builds simulation campaigns, writes the newsletter, posts in `#security-tips`, conducts coaching sessions, and produces quarterly metrics. |
| GRC Manager (Jordan Park) | Maintains policy alignment, tracks training as a control evidence input for SOC 2 and HITRUST, and chairs the annual program review. |
| Chief People Officer (Linda Chao) | Ensures Workday integration with KnowBe4 is current, manages new-hire enrollment, and supports HR-facing escalations. |
| General Counsel (Marcus Holbrook) | Reviews PHI-handling content for HIPAA accuracy; approves any communications referencing actual incidents. |
| Engineering Manager / Department Head | Confirms direct-report completion; supports manager-level escalations. |
| All personnel | Complete assigned training within deadline; report suspected security events; cooperate with simulation follow-ups. |

## 7. Metrics and Reporting

The program reports the following metrics to the Security Steering Committee monthly and to the Audit & Risk Committee quarterly:

| Metric | Target | Source |
|---|---|---|
| Annual training completion | 100% within deadline | KnowBe4 |
| Role-based training completion | 100% within deadline | KnowBe4 |
| Phishing click rate (simulation) | <3% | KnowBe4 |
| Phishing report rate (simulation) | >40% | KnowBe4 / Phish Alert |
| Repeat-clicker rate (2+ in 12 months) | <2% | KnowBe4 |
| Mean time to report a simulated phish (from delivery) | <60 minutes | KnowBe4 |
| Newsletter open rate | >60% | Microsoft 365 |

Q4 2025 actuals: annual completion 100%, role-based 96% (97% as of Q1 2026), click rate 2.4%, report rate 48%. See RPT-Phishing-Simulation-Q4-2025 and RPT-Training-Completion-Q4-2025 for detail.

## 8. Content Governance

Curriculum content is reviewed at least annually by Priya Iyer and approved by the CISO. Content additions or changes triggered by threat-intelligence updates, regulatory changes, post-incident lessons learned, or audit feedback are made on a rolling basis and logged in the `awareness-content-changelog` repository. PHI-handling content is co-reviewed by the GC and the HIPAA Privacy Officer.

## 9. Exceptions

Exceptions to assigned training (e.g., an employee on extended medical leave) are requested via the GRC team, approved by the CISO, and documented in the Exceptions Register (REG-EX-01). Exceptions do not extend to the on-hire baseline; system access is gated on baseline completion.

## 10. Related Documents

- POL-001 Information Security Policy (Section 3.7)
- POL-AT-01 Awareness and Training Policy
- PLN-RBT-01 Role-Based Training Catalog
- RPT-Training-Completion-Q4-2025
- RPT-Phishing-Simulation-Q4-2025
- RAS-2025-12 Risk Appetite Statement

## 11. Document Control

| Version | Date | Author | Change summary |
|---|---|---|---|
| 1.0 | 2022-06 | S. Yoon (predecessor) | Initial program plan |
| 2.0 | 2024-05 | S. Yoon | Post-Pebble Phish rewrite; introduced quarterly phishing sims, role-based tracks |
| 3.0 | 2025-02 | P. Iyer, S. Yoon | First plan under Iyer; added Slack channel, newsletter cadence |
| 3.1 | 2025-08 | P. Iyer | NIST CSF 2.0 PR.AT alignment; metric refresh |
| **3.2** | **2025-12** | **P. Iyer** | **Annual review; added executive briefing track; refined repeat-clicker escalation; added MeridianSec Monthly format** |
