# Case Study: Meridian Care Technologies, Inc. (MCT)

Meridian Care Technologies is a 348-person Series C healthcare SaaS company headquartered in Raleigh, North Carolina, specializing in care coordination software for mid-sized hospitals and specialty clinics. Founded in 2014, MCT has grown to ~$82M ARR and serves 47 health systems and clinic networks, processing data on approximately 2.4 million patients.

## Files

| File | Description |
|---|---|
| `mct-backgrounder.md` | Company history, mission, products, leadership, security org, tech stack, regulatory profile, incident history, strategic priorities |
| `mct-business-case.md` | Business justification for the 2026 NIST CSF 2.0 assessment |
| `mct-controls.csv` | Master control implementation data per in-scope subcategory (will be populated in Phase 5) |
| `mct-assessments.csv` | Quarterly assessment scores, observations, and test procedures (will be populated in Phase 5) |
| `mct-kpi-trends.csv` | Security KPI trends Q1 2024 — Q1 2026 (TTD, TTI, MTTR, phishing click rate, patch SLA, training completion, vuln backlog) |
| `mct-financials-q1-2026.csv` | Simplified income statement for Q1 2026 (financial context for risk discussions) |

## Key context for assessment authors

- **Industry:** B2B healthcare SaaS — care coordination platform
- **HQ:** Raleigh, NC; ~30% workforce remote; one secondary site in Pittsburgh, PA (acquired 2022)
- **Infrastructure:** AWS (multi-region: us-east-1 primary, us-west-2 DR) running EKS Kubernetes; Snowflake data warehouse; one legacy on-prem ETL cluster at HQ pending decommission Q4 2026
- **Security team:** 6 people — CISO Sarah Yoon (reports to CTO David Mehta); GRC Manager Jordan Park; Security Engineers Alicia Reyes & Marcus Tan; Security Analyst Priya Iyer; IAM Specialist Ben Olafsson
- **Major risks (from current cyber risk register):** R1 supplier continuous-monitoring gaps (clearinghouse, Snowflake, Arctic Wolf), R2 limited DR test depth (annual, single-service scope), R3 alert tuning debt and false-positive rate, R4 PHI flow visibility into legacy ETL, R5 third-party access reviews, R6 warm-DR readiness for Population Insights
- **Active programs:** HITRUST CSF r2 certification (target: Sep 2026), legacy ETL decommission (Q4 2026), zero-trust network segmentation (FY26 H1), expanded MDR coverage (in negotiation), DLP rollout for PHI egress (in design)
- **Assessment period:** 2026 annual CSF 2.0 assessment with quarterly score tracking (Q1–Q4 2026)
- **Most recent incident:** Phishing-driven credential theft against a billing clerk (Mar 14, 2024). Contained within 4h via MFA challenge failure and Okta session revocation. No PHI exposed. Triggered the May 2024 Arctic Wolf MDR contract, the FIDO2 phishing-resistant MFA program (policy Q4 2024, full enforcement Q4 2025), and the in-design DLP investment.
- **Concurrent third-party event:** Change Healthcare ALPHV/BlackCat ransomware event Feb–Mar 2024 — no MCT data exposure (production CHC integration was in pilot only); catalyst for FY26 supplier continuous-monitoring expansion (R1).

All test procedures, control descriptions, observations, and artifacts in this corpus are grounded in this case study context.
