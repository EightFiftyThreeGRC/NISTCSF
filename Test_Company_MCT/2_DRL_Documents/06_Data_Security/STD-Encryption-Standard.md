# Encryption Standard

**Document ID:** STD-ENC-01
**Version:** 4.1
**Effective date:** January 1, 2026
**Last reviewed:** December 9, 2025 (annual review)
**Next review:** December 2026
**Approver:** Sarah Yoon, CISO
**Owner:** Alicia Reyes, Security Engineer (Cloud/AppSec); Jordan Park, GRC Manager
**Distribution:** All engineering, security, and infrastructure personnel; published on internal wiki

---

## 1. Purpose

This Encryption Standard ("Standard") sets the technical specifications for encryption at rest, encryption in transit, key management, and prohibited cryptographic practices at MCT. It implements POL-001 §3.8, supports the HIPAA Security Rule technical safeguards at 45 CFR §§164.312(a)(2)(iv) and 164.312(e)(2)(ii), and supports HITRUST controls in domain `06.f`, `06.g`, `09.s`, `10.f`, and `10.g`.

The Standard is binding on all MCT-managed environments. Where a third-party SaaS provider's controls govern (e.g., Snowflake-managed CMKs backed by AWS KMS), the provider's mechanism is acceptable provided it satisfies the requirements of this Standard and is documented in the vendor record.

## 2. Scope

This Standard applies to:

- All MCT production and non-production AWS environments.
- The Snowflake analytics environment (per-environment accounts).
- The legacy on-premises ETL cluster at the Raleigh HQ (Z5).
- All MCT-issued endpoints (macOS, Windows).
- All custodial third-party services that store or transmit MCT data subject to BAA.

## 3. Encryption at Rest

### 3.1 Default position

All MCT data at rest, in MCT-controlled storage, shall be encrypted. Encryption is enabled by default at provisioning; provisioning of an unencrypted storage resource is blocked by Wiz policy and Terraform Sentinel.

### 3.2 Algorithms and minimums

| Resource | Algorithm | Minimum key size | Notes |
|---|---|---|---|
| Aurora PostgreSQL | AES-256-GCM | 256 | KMS-CMK; rotation per §5 |
| Snowflake | AES-256 | 256 | Snowflake-managed CMK on AWS; cloud-services-tier rotation |
| S3 | AES-256-GCM | 256 | KMS-CMK; bucket policy denies non-TLS and non-KMS uploads |
| ElastiCache (Redis) | AES-256 | 256 | AWS-managed key (no PHI persisted; see §3.4) |
| EBS volumes | AES-256-XTS | 256 | KMS-CMK |
| EKS Secrets | AES-256-GCM | 256 | EKS Secrets envelope-encrypted with KMS-CMK |
| Datadog log archives in S3 | AES-256-GCM | 256 | KMS-CMK |
| Glacier archive (cold logs) | AES-256 | 256 | KMS-CMK |
| macOS endpoints | XTS-AES-128 (FileVault) | 128 effective (256 with FV2 user-key extension) | Apple FileVault, enforced by Jamf |
| Windows endpoints | XTS-AES-256 (BitLocker) | 256 | Enforced by Intune |

### 3.3 Customer-managed vs AWS-managed keys

KMS Customer-Managed Keys (CMKs) are required for all stores that hold or may hold PHI: Aurora, Snowflake, S3 (PHI buckets), EBS attached to PHI-bearing workloads, and Datadog log archives where PHI references may appear.

AWS-managed keys are acceptable only where (a) PHI is not persisted, and (b) the resource is documented in the data inventory as non-PHI. Currently this applies to ElastiCache Redis (session metadata only — see DIAG-PHI-01 §4.6).

### 3.4 ElastiCache no-PHI invariant

ElastiCache Redis is permitted to use an AWS-managed key only because no PHI is persisted to it. The platform writes only opaque session IDs and user UUIDs. Engineering must not introduce PHI payloads into session state without first reclassifying the cluster, switching to a CMK, and updating this Standard. Wiz monitors session-payload schemas and alerts on payload-size anomalies as a coarse compensating control.

### 3.5 Endpoint encryption

All MCT-issued laptops are encrypted from first boot. macOS uses FileVault (managed via Jamf Pro institutional recovery key); Windows uses BitLocker XTS-AES-256 with TPM + PIN (managed via Microsoft Intune; recovery key escrowed to Microsoft Entra ID). Endpoints failing the encryption posture check are blocked from corporate access by Cloudflare WARP device-posture rules.

## 4. Encryption in Transit

### 4.1 Default position

All MCT data in transit shall be encrypted. Plaintext (HTTP, FTP, unencrypted SMTP between MCT-controlled endpoints, unencrypted database protocols) is prohibited.

### 4.2 Minimums and configuration

- **TLS:** TLS 1.2 minimum; TLS 1.3 preferred and enabled wherever both endpoints support it. TLS 1.0 and 1.1 are disabled at all MCT-controlled endpoints. SSLv2 and SSLv3 are disabled.
- **Cipher suites:** AEAD-only (AES-GCM, ChaCha20-Poly1305). Static-key cipher suites are not permitted on MCT-controlled endpoints.
- **Certificates:** ECDSA preferred (P-256) where supported by clients; RSA-2048 minimum for legacy compatibility; RSA-1024 prohibited.
- **HSTS:** Enforced on customer-facing CloudFront distributions with 12-month max-age and preload.
- **Server certificate validation:** Mandatory for all client-side TLS clients in MCT services. Certificate pinning is used for Direct Trust HISP paths.

### 4.3 East-west service-to-service traffic

Service-to-service traffic inside the EKS cluster is mTLS-authenticated where supported by both endpoints. The envoy service mesh issues SPIFFE-identified workload certificates with a 24-hour TTL via cert-manager. Service-mesh authorization policies are namespaced and version-controlled.

Where mTLS is not yet supported (a small minority of legacy services and the legacy ETL bridge), an explicit exception is recorded in REG-EX-01 with an owner and target close date. The zero-trust segmentation theme (FY26 H1, see backgrounder §10 priority 3) is the umbrella program for closing these residuals.

### 4.4 Certificate management

- **Public certificates:** Issued via AWS Certificate Manager (ACM), bound to CloudFront and ALB. Auto-renewed by ACM.
- **Private certificates:** Issued via ACM Private CA and provisioned into EKS by cert-manager.
- **Workload certificates (mesh):** Issued by cert-manager via the SPIFFE/SPIRE-compatible issuer, 24-hour TTL.
- **Direct Trust certificates:** Managed via the DirectTrust Accreditation program; pinned per partner.
- **Endpoint certificates (Jamf, Intune):** Managed by the respective MDM platforms.

Certificate inventory is maintained by Wiz (cloud) and the platform team's `cert-inventory` runbook; an expiring-certificate digest is delivered to the platform on-call rotation weekly.

## 5. Key Management

### 5.1 Custodianship

AWS KMS is the cryptographic root of trust for cloud workloads. KMS keys are managed via Terraform with state stored in a hardened S3 backend; key policies are reviewed by Security at every change.

### 5.2 Rotation cadence

| Key class | Rotation cadence | Mechanism |
|---|---|---|
| KMS-CMK (data-at-rest) | Annual (automatic AWS rotation enabled) | KMS automatic rotation |
| KMS-CMK — top-tier (Aurora prod, S3 PHI prod, Snowflake prod) | Annual + emergency rotation tested quarterly | KMS rotation + manual re-encryption drill via Wiz playbook |
| Workload mTLS certificates | 24 hours | cert-manager + envoy mesh |
| ACM public certificates | ~12 months (ACM-managed) | ACM auto-renewal |
| ACM Private CA-issued certificates | 30–90 days, per workload profile | cert-manager auto-renewal |
| FIDO2 authenticators | n/a (per device) | Replacement on loss / role change |
| Endpoint disk-encryption keys | At provisioning; escrow rotation on incident only | Jamf / Intune |

### 5.3 Emergency rotation procedure

A KMS-CMK emergency rotation procedure is maintained by Alicia Reyes. The procedure is tested **quarterly** as a Wiz-driven tabletop, with a recurring calendar entry on the Security team's roadmap. The most recent test was December 2, 2025; the next is scheduled for March 2026. Test outcomes are recorded in the `kms-rotation-test` evidence repository.

The procedure exists because KMS automatic rotation alone does not satisfy a "compromised-key" recovery need (KMS automatic rotation rotates the cryptographic material but retains old material for decrypting prior ciphertexts). True compromise scenarios require a re-encryption pass with a new key and a wholesale replacement, which is what the quarterly test validates.

### 5.4 HSM-backed keys

The top-tier KMS-CMKs (Aurora production, S3 PHI production, Snowflake production root) are HSM-backed via AWS KMS (KMS uses FIPS 140-2 validated HSMs). For any future workload where a dedicated HSM custodianship is required (e.g., a customer contract requiring CloudHSM or a customer-key-management arrangement), AWS CloudHSM is the approved path; engagement of CloudHSM requires written CISO approval.

### 5.5 Separation of duties

No single individual holds standing root authority over the production KMS-CMK administrative path. Modifications to top-tier key policies require a four-eyes pull request approval (one from the Cloud/AppSec engineer, one from the IAM Specialist or CISO) and are auditable in CloudTrail.

## 6. Prohibited Practices

The following practices are **prohibited**. Each is a material policy violation and triggers a security incident workflow if observed in production.

1. **Plaintext PHI in application logs.** Application code shall not emit PHI payloads (names, MRNs, demographics, clinical content) into Datadog, application logs, or stdout. PHI **identifiers** (UUIDs, customer-tenant IDs) are permitted for traceability. Pre-merge static analysis (Snyk + custom rules) blocks known PHI-emitting patterns; runtime sampling via Datadog is reviewed monthly.
2. **Plaintext PHI in queues or message brokers.** Queue payloads use opaque references to Aurora-stored records; the body of the queue message is not the carrier of PHI.
3. **Plaintext PHI in non-production environments.** Development, staging, and load-testing environments use de-identified data only. Restoring a production Aurora snapshot into a non-production environment is prohibited; PROC-DEID-01 governs the de-identification path used for non-production data.
4. **Long-lived plaintext credentials.** Static AWS access keys, database passwords, or API tokens checked into source control or stored in plaintext in CI/CD environments are prohibited. AWS Secrets Manager and EKS-native secrets envelope-encrypted with KMS are the approved paths. GitHub Advanced Security secret-scanning is enabled.
5. **Self-signed certificates in production.** Self-signed certificates are not permitted on production endpoints, including internal-only endpoints. ACM Private CA covers internal use cases.
6. **Disabled or downgraded TLS.** Disabling TLS validation in client code, accepting expired certificates, or reverting to TLS 1.0/1.1 is prohibited; security review is required for any exception (none are currently approved).
7. **Hashing PHI for "de-identification" purposes.** Cryptographic hashing of identifiers is not de-identification under HIPAA; any de-identification path must follow PROC-DEID-01.
8. **Custom cryptographic primitives.** Engineers shall not implement custom cryptography. Approved libraries (libsodium, AWS SDK encryption SDK, Go's `crypto/*`) are the only sanctioned implementations.

## 7. Roles and Responsibilities

| Role | Responsibility |
|---|---|
| CISO | Approves this Standard; arbitrates exceptions; approves CloudHSM engagements. |
| Security Engineer (Cloud/AppSec) | Owns the technical implementation; runs the quarterly emergency rotation test; reviews key-policy changes. |
| IAM Specialist | Co-reviewer on key-policy changes; manages workforce identity components of TLS access. |
| Engineering | Builds to this Standard; ensures no prohibited practice is introduced; reviews automated findings. |
| GRC | Audits compliance; maintains exception register; produces evidence for SOC 2 / HITRUST / HIPAA SRA. |

## 8. Compliance Verification

Compliance with this Standard is verified through:

- Continuous Wiz scanning (cloud configuration; encryption enforcement).
- Continuous Snyk and GitHub Advanced Security scanning (source-code anti-patterns; secret-scanning).
- Quarterly KMS emergency-rotation tabletops.
- Annual penetration test (TLS configuration; certificate validation).
- Annual SOC 2 Type II audit.
- Pre-HITRUST CSF r2 control testing (in flight; target attestation September 30, 2026).

## 9. Exceptions

Exceptions are requested via the GRC team, evaluated for risk, and approved by the CISO. Exceptions are time-bounded and tracked in REG-EX-01. Open exceptions as of December 2025 include three legacy mTLS gaps (target close Q2 2026 under the zero-trust theme) and the legacy ETL cluster's residual cleartext-on-host residuals (target close Q4 2026 with decommission).

## 10. Related Documents

- POL-001 Information Security Policy (§3.8)
- POL-DC-01 Data Classification Policy
- DIAG-NET-01 Network Architecture
- DIAG-PHI-01 PHI Data Flow
- PROC-DEID-01 De-identification Procedure
- POL-BR-01 Backup and Recovery Policy
- REG-EX-01 Exceptions Register

## 11. Document Control

| Version | Date | Author | Change summary |
|---|---|---|---|
| 1.0 | 2022-11 | A. Reyes (predecessor) | Initial standard |
| 2.0 | 2023-09 | A. Reyes | KMS-CMK mandatory; ElastiCache invariant introduced |
| 3.0 | 2024-08 | A. Reyes | Added east-west mTLS via envoy mesh; certificate inventory; pre-merge PHI-in-log scanning |
| 4.0 | 2025-08 | A. Reyes | Quarterly emergency-rotation test; HSM-backed top-tier classification; expanded prohibited practices |
| **4.1** | **2025-12** | **A. Reyes** | **Annual review; refreshed cipher minimums; explicit identifier-vs-payload distinction in §6.1; updated rotation table** |
