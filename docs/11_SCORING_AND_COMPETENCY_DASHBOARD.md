# 📊 Section 11: Scoring, Competency Matrix & Progress Dashboard
**Standard Reference:** `OSINT-LAB-SEC-11`  
**Classification:** `PUBLIC / TLP:CLEAR`  
**Authoritative Framework:** NIST NICE Cybersecurity Workforce Framework (Specialty Area: Cyber Threat Analysis - SP-ARC-001)  

---

## 🏛️ Curriculum Evaluation Philosophy

Adult career changers and aspiring cybersecurity professionals need tangible, objective metrics that demonstrate career readiness to hiring managers. This scoring system shifts education from passive memorization to **verified, evidentiary performance**.

A student does not "pass" by taking multiple-choice quizzes; they pass by submitting cryptographically verifiable evidence logs, accurate entity relationship graphs, and executive briefings that withstand technical scrutiny.

---

## 🏆 Competency Mastery Tier Architecture

The curriculum tracks four progressive mastery tiers aligned with the 30 case files:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        COMPETENCY MASTERY TIERS                        │
├────────────────────────────────────────────────────────────────────────┤
│  TIER 4: PRINCIPAL STRATEGIST (Capstone Investigation)                 │
│          • End-to-End Enterprise Attack Surface Audit                  │
│          • Board-Level Presentation & Threat Emulation                 │
├────────────────────────────────────────────────────────────────────────┤
│  TIER 3: ADVANCED THREAT ANALYST (Cases 21 - 30)                       │
│          • Adversary Infrastructure Clustering & Diamond Modeling      │
│          • JARM / TLS Fingerprint Pivoting                             │
│          • SIGMA Detection Engineering & SOC Playbook Handoff          │
├────────────────────────────────────────────────────────────────────────┤
│  TIER 2: INTERMEDIATE RECON INVESTIGATOR (Cases 11 - 20)               │
│          • Maltego Graph Link Analysis & Visual Pivots                 │
│          • Reverse IP Co-Tenancy & OpenAPI Schema Extraction           │
│          • Supply Chain SBOM Auditing & Cloud Bucket Telemetry         │
├────────────────────────────────────────────────────────────────────────┤
│  TIER 1: FOUNDATIONAL RESEARCHER (Cases 01 - 10)                       │
│          • Regulatory Filings Mining (SEC Form 10-K / Exhibit 21)      │
│          • DNS / SPF / DMARC Mail Hygiene Auditing                     │
│          • Certificate Transparency Log Analysis (`crt.sh`)            │
│          • Cryptographic Chain-of-Custody Hashing (SHA-256)            │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Comprehensive 100-Point Case Grading Rubric

Every submitted Case File report is evaluated across four core performance dimensions:

| Evaluation Dimension | Weight | Target Criteria (High Distinction - 90-100%) | Marginal (70-89%) | Unsatisfactory (< 70%) |
| :--- | :---: | :--- | :--- | :--- |
| **1. Evidence Integrity & Chain of Custody** | **25%** | All raw artifacts captured with SHA-256 hashes, UTC timestamps, full-viewport screenshots, and immutable archive links. Zero missing hashes. | Artifacts captured but missing timestamps or full-page browser URLs. | Raw files missing, incomplete hashes, or cropped screenshots without address bars. |
| **2. Technical Accuracy & Methodology** | **30%** | Accurate passive queries, zero active probing/scanning, clean false-positive elimination, correct command usage. | Minor interpretation errors in DNS or certificate logs; no active violations. | Used active scanning tools (`nmap`/fuzzing) or fundamentally misidentified DNS records. |
| **3. Analytical Depth & Correlation** | **25%** | Correct Admiralty 6×6 scoring applied, multi-source corroboration executed, clear distinction between fact and hypothesis. | Single-source reliance without cross-verification; superficial analysis. | Fabricated findings, unverified assumptions, or illogical conclusions. |
| **4. Professional Communication & Report Quality** | **20%** | Concise Executive BLUF, clear risk matrices, clean markdown formatting, actionable defensive recommendations. | Overly technical prose with no executive summary; minor formatting errors. | Disorganized notes, unformatted terminal dumps, no actionable mitigations. |

---

## 📈 Student Progress & Case Completion Dashboard

Track your progress through the 30 Graded Case Files and Capstone by checking off each milestone:

### Tier 1: Foundational Cases (Beginner)
- [ ] **Case 01:** [Corporate Subsidiary & Domain Footprinting](../cases/beginner/CASE_01_SEC_EDGAR_DISCLOSURE.md) `[Score: ___/100]`
- [ ] **Case 02:** [DNS Record Enumeration & Mail Security Auditing](../cases/beginner/CASE_02_DNS_MAIL_SECURITY_AUDIT.md) `[Score: ___/100]`
- [ ] **Case 03:** [Certificate Transparency Log Excavation](../cases/beginner/CASE_03_CERT_TRANSPARENCY_LOGS.md) `[Score: ___/100]`
- [ ] **Case 04:** [Wayback Machine & Historical Web Drift Analysis](../cases/beginner/CASE_04_WAYBACK_HISTORICAL_DRIFT.md) `[Score: ___/100]`
- [ ] **Case 05:** [Robots.txt, Sitemap.xml & Passive Endpoint Discovery](../cases/beginner/CASE_05_ROBOTS_SITEMAP_ANALYSIS.md) `[Score: ___/100]`
- [ ] **Case 06:** [Public Document Metadata Extraction & Forensics](../cases/beginner/CASE_06_DOCUMENT_METADATA_EXTRACTION.md) `[Score: ___/100]`
- [ ] **Case 07:** [Autonomous System Number (ASN) & IP Range Mapping](../cases/beginner/CASE_07_ASN_IP_RANGE_MAPPING.md) `[Score: ___/100]`
- [ ] **Case 08:** [Open-Source Code Repository Footprinting](../cases/beginner/CASE_08_OPEN_SOURCE_REPO_FOOTPRINTING.md) `[Score: ___/100]`
- [ ] **Case 09:** [Corporate Executive Board & Directorship Graphing](../cases/beginner/CASE_09_EXECUTIVE_BOARD_GRAPHING.md) `[Score: ___/100]`
- [ ] **Case 10:** [Dangling CNAME & Expiring Cloud Asset Audit](../cases/beginner/CASE_10_DANGLING_CNAME_TAKEOVER_AUDIT.md) `[Score: ___/100]`

### Tier 2: Intermediate Cases
- [ ] **Case 11:** [Maltego Entity Graphing & Visual Infrastructure Pivoting](../cases/intermediate/CASE_11_MALTEGO_INFRASTRUCTURE_GRAPHING.md) `[Score: ___/100]`
- [ ] **Case 12:** [Historical WHOIS Pivoting & Registrant Tracking](../cases/intermediate/CASE_12_HISTORICAL_WHOIS_PIVOTING.md) `[Score: ___/100]`
- [ ] **Case 13:** [Reverse IP & Shared Hosting Infrastructure Discovery](../cases/intermediate/CASE_13_REVERSE_IP_SHARED_HOSTING.md) `[Score: ___/100]`
- [ ] **Case 14:** [Passive API Enumeration & OpenAPI / Swagger Telemetry](../cases/intermediate/CASE_14_OPEN_API_SWAGGER_TELEMETRY.md) `[Score: ___/100]`
- [ ] **Case 15:** [Certificate Pivoting via Serial Numbers & SKI](../cases/intermediate/CASE_15_CERT_SERIAL_SKI_PIVOTING.md) `[Score: ___/100]`
- [ ] **Case 16:** [Technical Username Footprinting & Persona Correlation](../cases/intermediate/CASE_16_SYNTHETIC_USERNAME_FOOTPRINTING.md) `[Score: ___/100]`
- [ ] **Case 17:** [Cloud Storage Bucket Enumeration & Namespace Analysis](../cases/intermediate/CASE_17_CLOUD_BUCKET_NAMESPACE_AUDIT.md) `[Score: ___/100]`
- [ ] **Case 18:** [Open-Source Supply Chain Dependency Auditing](../cases/intermediate/CASE_18_SUPPLY_CHAIN_DEPENDENCY_AUDIT.md) `[Score: ___/100]`
- [ ] **Case 19:** [Public Breach Telemetry & Corporate Domain Exposure](../cases/intermediate/CASE_19_BREACH_TELEMETRY_DOMAIN_AUDIT.md) `[Score: ___/100]`
- [ ] **Case 20:** [Physical Facility Verification via Open Geospatial Data](../cases/intermediate/CASE_20_PHYSICAL_FACILITY_GEO_VERIFICATION.md) `[Score: ___/100]`

### Tier 3: Advanced Threat Intelligence Cases
- [ ] **Case 21:** [Adversary Threat Group Infrastructure Clustering](../cases/advanced/CASE_21_ADVERSARY_INFRASTRUCTURE_CLUSTERING.md) `[Score: ___/100]`
- [ ] **Case 22:** [Brand Impersonation & Typosquatting Threat Matrix](../cases/advanced/CASE_22_BRAND_IMPERSONATION_TYPOSQUATTING.md) `[Score: ___/100]`
- [ ] **Case 23:** [Disinformation Campaign Attribution & Narrative Graphing](../cases/advanced/CASE_23_DISINFORMATION_NARRATIVE_MAPPING.md) `[Score: ___/100]`
- [ ] **Case 24:** [BGP Route Hijacking & Prefix Anomaly Forensics](../cases/advanced/CASE_24_BGP_ROUTE_HIJACK_TELEMETRY.md) `[Score: ___/100]`
- [ ] **Case 25:** [Passive Onion Service Infrastructure Profiling](../cases/advanced/CASE_25_PASSIVE_TOR_INFRASTRUCTURE_PROFILING.md) `[Score: ___/100]`
- [ ] **Case 26:** [Ransomware Extortion & Blockchain Financial Telemetry](../cases/advanced/CASE_26_RANSOMWARE_LEAK_SITE_FINANCIAL_OSINT.md) `[Score: ___/100]`
- [ ] **Case 27:** [Third-Party SaaS & OAuth Integration Drift Audit](../cases/advanced/CASE_27_OAUTH_SAAS_INTEGRATION_AUDIT.md) `[Score: ___/100]`
- [ ] **Case 28:** [Malware C2 Tracking via JARM Fingerprint Pivoting](../cases/advanced/CASE_28_JARM_C2_FINGERPRINT_PIVOTING.md) `[Score: ___/100]`
- [ ] **Case 29:** [M&A Shadow IT Due Diligence & Attack Surface Audit](../cases/advanced/CASE_29_MA_SHADOW_IT_AUDIT.md) `[Score: ___/100]`
- [ ] **Case 30:** [Threat Intel to SOC Detection Engineering Handoff](../cases/advanced/CASE_30_THREAT_INTEL_SOC_DETECTION_HANDOFF.md) `[Score: ___/100]`

### Tier 4: Final Capstone
- [ ] **Capstone:** [Comprehensive Enterprise Cyber Attack Surface Audit & Board Presentation](./12_CAPSTONE_INVESTIGATION.md) `[Score: ___/100]`

---

## 🎖️ Verifiable Career Portfolio Badges

Upon completing each tier, the student exports their sanitized reports, evidence logs, and diagrams into a public GitHub repository titled `ethical-osint-portfolio` to demonstrate competency to hiring managers:

1. **Badge 1: Certified Defensive OSINT Specialist (CDOS)**  
   * *Prerequisite:* Completion of Tier 1 (Cases 01–10) with an average score of $\ge 85\%$.
2. **Badge 2: Certified Cyber Infrastructure Analyst (CCIA)**  
   * *Prerequisite:* Completion of Tier 2 (Cases 11–20) with an average score of $\ge 85\%$.
3. **Badge 3: Certified Cyber Threat Intelligence Hunter (CCTIH)**  
   * *Prerequisite:* Completion of Tier 3 (Cases 21–30) with an average score of $\ge 85\%$.
4. **Badge 4: Principal OSINT Strategist (Master Certification)**  
   * *Prerequisite:* Completion of Capstone Investigation with defense before senior reviewers.
