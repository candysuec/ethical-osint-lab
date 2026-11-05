# 📂 Section 06: Master Index of 30 Graded Case Files
**Project Reference:** `OSINT-CASES-INDEX`  
**Classification:** `PUBLIC / TLP:CLEAR`  
**Governing Methodology:** 7-Phase Intelligence Lifecycle & Admiralty 6×6 Confidence Code  

---

## 🏛️ Curriculum Structure

The case files in this academy are engineered as real-world investigative scenarios progressing across three difficulty tiers. Every case adheres strictly to the **Ethical OSINT Red Line**: 100% passive collection, zero active scanning, and zero targeting of private citizens.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        30 GRADED CASE FILES                            │
├────────────────────────────────────────────────────────────────────────┤
│  🟢 Cases 01 - 10: Foundational Reconnaissance (Beginner)              │
│  🟡 Cases 11 - 20: Correlation & Entity Graphing (Intermediate)        │
│  🔴 Cases 21 - 30: Threat Intelligence & Attribution (Advanced)        │
│  ⭐ Final Capstone: Enterprise Cyber Attack Surface Audit              │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🟢 Tier 1: Beginner Cases (01 – 10)

| Case ID | Title | Core Toolsets | Investigative Focus |
| :---: | :--- | :--- | :--- |
| **01** | [Corporate Subsidiary Footprinting](./beginner/CASE_01_SEC_EDGAR_DISCLOSURE.md) | SEC EDGAR, `dig`, `curl` | SEC Form 10-K Exhibit 21 subsidiary mapping |
| **02** | [DNS Record & Mail Security Audit](./beginner/CASE_02_DNS_MAIL_SECURITY_AUDIT.md) | `dig`, `host`, DMARC | SPF, DKIM, DMARC anti-spoofing policy auditing |
| **03** | [Certificate Transparency Excavation](./beginner/CASE_03_CERT_TRANSPARENCY_LOGS.md) | `crt.sh`, `jq`, `curl` | Subdomain enumeration and shadow IT discovery |
| **04** | [Wayback Machine Historical Drift](./beginner/CASE_04_WAYBACK_HISTORICAL_DRIFT.md) | Archive.org, `cdx`, `diff` | Corporate restructuring and retired tech stacks |
| **05** | [Robots.txt & Sitemap Endpoint Discovery](./beginner/CASE_05_ROBOTS_SITEMAP_ANALYSIS.md) | `curl`, `xmllint`, `grep` | Crawl boundary analysis and administrative path leaks |
| **06** | [Document Metadata Extraction](./beginner/CASE_06_DOCUMENT_METADATA_EXTRACTION.md) | `exiftool`, `pdfinfo` | Author usernames, software versions, and local paths |
| **07** | [ASN & IP Range Mapping](./beginner/CASE_07_ASN_IP_RANGE_MAPPING.md) | BGPView, `whois`, `curl` | BGP prefix allocations and upstream transit providers |
| **08** | [Open-Source Code Repo Footprinting](./beginner/CASE_08_OPEN_SOURCE_REPO_FOOTPRINTING.md) | `git`, `curl`, `jq` | Contributor domains, commit logs, and CI/CD pipelines |
| **09** | [Executive Board & Directorship Graphing](./beginner/CASE_09_EXECUTIVE_BOARD_GRAPHING.md) | SEC DEF 14A, OpenCorporates | Interlocking directorships and governance networks |
| **10** | [Dangling CNAME & Cloud Asset Audit](./beginner/CASE_10_DANGLING_CNAME_TAKEOVER_AUDIT.md) | `dig`, `curl -I`, `jq` | Orphaned cloud bucket detection (S3/Azure/Pages) |

---

## 🟡 Tier 2: Intermediate Cases (11 – 20)

| Case ID | Title | Core Toolsets | Investigative Focus |
| :---: | :--- | :--- | :--- |
| **11** | [Maltego Entity Graphing & Pivoting](./intermediate/CASE_11_MALTEGO_INFRASTRUCTURE_GRAPHING.md) | Maltego CE, Transforms | Visual link analysis and infrastructure clustering |
| **12** | [Historical WHOIS Pivoting](./intermediate/CASE_12_HISTORICAL_WHOIS_PIVOTING.md) | Whoxy, ViewDNS, RDAP | Historical registrant email handles and domain drift |
| **13** | [Reverse IP & Shared Hosting Discovery](./intermediate/CASE_13_REVERSE_IP_SHARED_HOSTING.md) | HackerTarget, SecurityTrails | Virtual host co-tenancy and collateral neighbor risk |
| **14** | [Passive OpenAPI / Swagger Telemetry](./intermediate/CASE_14_OPEN_API_SWAGGER_TELEMETRY.md) | APIs.guru, `curl`, `jq` | API taxonomy, schema structures, and auth scopes |
| **15** | [Certificate Pivoting via SKI & Serial](./intermediate/CASE_15_CERT_SERIAL_SKI_PIVOTING.md) | `openssl`, Censys, `crt.sh` | Cryptographic public key and SKI cross-domain mapping |
| **16** | [Technical Username Footprinting](./intermediate/CASE_16_SYNTHETIC_USERNAME_FOOTPRINTING.md) | `sherlock`, `maigret`, `jq` | Multi-platform correlation and false-positive elimination |
| **17** | [Cloud Storage Bucket Namespace Audit](./intermediate/CASE_17_CLOUD_BUCKET_NAMESPACE_AUDIT.md) | `curl -I`, `grep`, `jq` | S3/GCS/Azure naming conventions and public ACL checks |
| **18** | [Supply Chain Dependency Auditing](./intermediate/CASE_18_SUPPLY_CHAIN_DEPENDENCY_AUDIT.md) | PyPI API, OpenSSF Scorecard | SBOM extraction, package maintainers, and provenance |
| **19** | [Public Breach Telemetry & Domain Exposure](./intermediate/CASE_19_BREACH_TELEMETRY_DOMAIN_AUDIT.md) | HIBP API, SEC Form 8-K | Domain-level breach statistics and credential hygiene |
| **20** | [Physical Facility Geospatial Verification](./intermediate/CASE_20_PHYSICAL_FACILITY_GEO_VERIFICATION.md) | OpenStreetMap, Overpass QL | Satellite imagery, campus perimeters, and power feeds |

---

## 🔴 Tier 3: Advanced Threat Intelligence Cases (21 – 30)

| Case ID | Title | Core Toolsets | Investigative Focus |
| :---: | :--- | :--- | :--- |
| **21** | [Adversary Infrastructure Clustering](./advanced/CASE_21_ADVERSARY_INFRASTRUCTURE_CLUSTERING.md) | AlienVault OTX, Diamond Model | Passive DNS pivoting and threat actor cluster mapping |
| **22** | [Brand Impersonation & Typosquatting](./advanced/CASE_22_BRAND_IMPERSONATION_TYPOSQUATTING.md) | `dnstwist`, RDAP, `dig` | Homoglyph, bitsquatting, and active MX weaponization |
| **23** | [Disinformation Narrative Mapping](./advanced/CASE_23_DISINFORMATION_NARRATIVE_MAPPING.md) | DISARM Framework, Mermaid | Doppelgänger news clone tracking and bot networks |
| **24** | [BGP Route Hijack & Anomaly Forensics](./advanced/CASE_24_BGP_ROUTE_HIJACK_TELEMETRY.md) | RIPE Stat, RouteViews | BGP route leak attribution and RPKI origin validation |
| **25** | [Passive Onion Infrastructure Profiling](./advanced/CASE_25_PASSIVE_TOR_INFRASTRUCTURE_PROFILING.md) | Tor, `openssl`, `curl` | V3 onion addressing, OPSEC headers, and TLS SAN co-tenancy |
| **26** | [Ransomware Financial Telemetry](./advanced/CASE_26_RANSOMWARE_LEAK_SITE_FINANCIAL_OSINT.md) | Blockstream API, `jq` | Bitcoin blockchain tracing, peeling chains, and KYC hops |
| **27** | [SaaS OAuth Integration Drift Audit](./advanced/CASE_27_OAUTH_SAAS_INTEGRATION_AUDIT.md) | GitHub API, `jq` | Third-party bot accounts and webhook exposure |
| **28** | [Malware C2 JARM Fingerprint Pivoting](./advanced/CASE_28_JARM_C2_FINGERPRINT_PIVOTING.md) | ThreatFox, Censys, Shodan | TLS JARM hashing, Cobalt Strike C2 hunting, and IDS rules |
| **29** | [M&A Shadow IT Due Diligence Audit](./advanced/CASE_29_MA_SHADOW_IT_AUDIT.md) | SEC 8-K, `crt.sh`, BGPView | Post-acquisition external attack surface debt scoring |
| **30** | [Threat Intel to SOC Handoff](./advanced/CASE_30_THREAT_INTEL_SOC_DETECTION_HANDOFF.md) | SIGMA, Suricata, ATT&CK | Translating OSINT findings into SIEM rules and IR playbooks |

---

## ⭐ Capstone Investigation
* **[Operation Horizon Shield (Enterprise Attack Surface Audit & Board Presentation)](../docs/12_CAPSTONE_INVESTIGATION.md)**: A simulated 20-30 hour comprehensive incident simulating an enterprise attack surface discovery and defensive handoff.
