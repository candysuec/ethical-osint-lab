# 📜 Changelog - Ethical OSINT Training Laboratory & Curriculum

All notable changes to the Ethical OSINT Training Laboratory repository will be documented in this file.
This changelog strictly adheres to [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.5.0] - 2026-11-05 (Mission Control Learning Mode & 30 Guided Cases)

### Added
- **Default "Mission Control" Learning Mode (`MissionControlView.tsx`):**
  - Overhauled the dashboard default view (`http://localhost:5180`) into an intuitive, guided, mission-driven interface inspired by TryHackMe and Duolingo.
  - Students progress through real-world corporate investigation cases with zero cognitive overwhelm.
- **Interactive 30-Mission Dataset (`missionsData.ts`):**
  - Fully mapped all 30 repository curriculum case files into interactive missions across 3 tiers:
    - **Beginner (Cases 01–10):** SEC EDGAR corporate subsidiaries, DNS & mail security SPF/DMARC auditing, Certificate Transparency logs, Wayback historical drift, robots.txt leaks, document EXIF forensics, BGP ASN ranges, Git commit secrets, boardroom directorships, dangling CNAME subdomains.
    - **Intermediate (Cases 11–20):** Maltego link graphing, historical WHOIS unmasking, reverse IP co-tenancy, OpenAPI/Swagger schema discovery, X.509 SKI key fingerprinting, synthetic username correlation, S3 cloud storage audits, SBOM supply chain vulnerabilities, breach telemetry k-Anonymity, geospatial facility reconnaissance.
    - **Advanced (Cases 21–30):** APT infrastructure clustering, brand typosquatting weaponization, disinformation network attribution, BGP route hijacking detection, Tor hidden service clearnet unmasking, ransomware cryptocurrency tracing, SaaS OAuth drift governance, JARM C2 fingerprinting, M&A due diligence, SOC SIGMA detection rule generation.
- **Plain-English Visual Decoder Cards:**
  - Displays simulated terminal queries alongside highlighted findings and plain-English real-world explanations (e.g. explaining why `p=none` allows scammers to forge emails from a CEO).
  - Includes defensive remediation steps and NATO STANAG 2022 Admiralty confidence ratings (`A1` to `F6`).
- **Comprehension Knowledge Checks & XP Progression System:**
  - Interactive mini-quizzes on each case with instant instructional feedback.
  - XP progression engine with ranks from "Cadet OSINT Investigator" to "Master Cyber Intelligence Architect".
  - One-click `[ 💾 Save Evidence & Claim XP ]` bridge automatically hashing artifacts into the Evidence Vault.
- **Streamlined Executive Navigation (`Header.tsx`):**
  - 4 clean top-level tabs: **Mission Control** (Default), **Tool Academy** (Sandbox), **Analyst Studio** (14-Tab Deep Platform), and **6-Stage Guide**.
  - Live XP counter, rank badge, and curriculum completion meter.

---

## [1.4.1] - 2026-11-05 (Plain-English Onboarding Guide & Interactive Tour)

### Added
- **Beginner Onboarding & Plain English Guide (`BeginnerGuideModal.tsx`):**
  - Integrated a 3-step interactive onboarding modal accessible via the glowing **"🔰 How to Use (Start Here)"** button in the header.
  - Translates cyber-jargon into plain English real-world analogies for all 7 tools:
    - `dig` (DNS/Mail) $\rightarrow$ "The Internet Phonebook"
    - `crt.sh` (Certificates) $\rightarrow$ "The Public SSL Notary Logbook"
    - `dnstwist` (Permutations) $\rightarrow$ "The Fake Look-Alike Brand Hunter"
    - `BGPView` (Routing) $\rightarrow$ "The Internet Highway Road Map"
    - `exiftool` (Metadata) $\rightarrow$ "The Invisible Digital Fingerprint Reader"
    - `Wayback CDX` (Archive) $\rightarrow$ "The Internet Time Machine"
  - Provides a 3-click interactive walkthrough guiding junior analysts from running a passive query to locking in cryptographic evidence.

---

## [1.4.0] - 2026-11-05 (Interactive Tool Execution Studio & Tool-to-Evidence Bridge)

### Added
- **Interactive Tool Execution Studio (`ToolWorkbenchView.tsx`):**
  - Integrated 7 live passive query presets: DNS & Perimeter Mail Security (`dig` RFC 7208), Certificate Transparency Log Miner (`crt.sh` RFC 6962), Typosquatting Threat Matrix (`dnstwist`), Autonomous BGP Routing & Netblocks (BGPView/RIPE), Document Metadata & EXIF Forensics (`exiftool`), Web Preservation Semantic Drift Diff (Wayback CDX), and Local SpiderFoot Manager (`:5001`).
- **Automated "Tool-to-Evidence" Bridge:**
  - One-click transformation: Tool Output $\rightarrow$ Browser SHA-256 Checksum Calculation $\rightarrow$ Admiralty Confidence Scoring $\rightarrow$ Evidence Repository Registration.
- **"Tool-to-Graph" Entity Extraction:**
  - Automatically parses discovered subdomains, IP blocks, and author identities from raw stdout/JSON and injects them onto the interactive Relationship Graph.
- **Triage Lead Generation Bridge:**
  - One-click queuing of anomalous indicators directly into the Lead Generation Queue.
- **Direct Navigation & UI Controls:**
  - Added dedicated "Tool Runner Studio" button in the executive header and command sidebar.

---

## [1.3.0] - 2026-11-04 (Professional OSINT Analyst Dashboard & PostgreSQL Stack)

### Added
- **Full-Stack OSINT Analyst Dashboard (`dashboard/`):**
  - **Technology Stack:** React 18, TypeScript, Vite, TailwindCSS (Dark Cyber Intelligence theme inspired by Palantir, Maltego, and MISP), and PostgreSQL 16.
  - **14 Core Subsystems Implemented:**
    1. **Investigation Intake System:** Normalization and validation across all 17 public input modalities with live ethics gate screening.
    2. **Case Management:** Multi-investigation portfolio queue, active PIR tracking, and TLP classification badges.
    3. **Entity Resolution Engine:** Side-by-side homoglyph comparison, Jaccard attribute vector distance, and mandatory human-in-the-loop merge/split gates (Zero auto-confirmation).
    4. **Relationship Graph Visualization:** Interactive SVG node-link link analysis across 7 property buckets with directed weighted edges and Admiralty confidence badges.
    5. **Evidence Repository:** ISO/IEC 27037 compliant ledger with cryptographic SHA-256 verification sandbox, full-viewport screenshot tags, and Wayback snapshots.
    6. **Lead Generation Queue:** Active telemetry triage queue supporting promotion to evidence or dismissal.
    7. **Source Reliability Scoring:** Interactive NATO STANAG 2022 Admiralty 6×6 matrix with catalog of vetted passive sources.
    8. **Timeline Analysis:** Chronological event stream tracking acquisitions, certificate issuances, and DNS drift.
    9. **Confidence Scoring Engine:** Mathematical Confidence Index sandbox calculating $CI = (W_S \times S) + (W_C \times C) + (W_K \times K) - P_{\text{staleness}}$.
    10. **Report Generator:** One-click markdown, JSON, and PDF export of Executive BLUF briefings, IOC ledgers, and SIGMA detection rules.
    11. **Immutable Audit Logs:** Tamper-evident ledger tracking analyst IDs, client IPs, timestamps, and entity state deltas.
    12. **Analyst Notes & Scratchpad:** Markdown working space for competing hypotheses with tag filtering.
    13. **AI Research Assistant:** Local LLM workflow sandbox with specialized prompt templates for normalization, timeline extraction, and BLUF drafting with strict human-verification banners.
    14. **Gap Analysis Engine:** Automated blind-spot detection for uncorroborated single-source claims, stale records (>24 months), and dangling pointers.
- **Database Architecture (`dashboard/db/schema.sql`):**
  - Production PostgreSQL schema with 11 relational tables, UUID primary keys, ENUM types, and query optimization indexes.
- **Docker Compose Orchestration (`docker-compose.yml`):**
  - Integrated `osint-db` (Postgres 16 Alpine on port `:5432` with auto-init schema).
  - Integrated `osint-dashboard` (Vite preview web server on port `:5180`).

---

## [1.2.0] - 2026-11-04 (Complete 30-Case Curriculum, Standardized Forensics & Capstone)

### Added
- **Ethical AI-Powered OSINT Investigation Framework Specification (`docs/ETHICAL_AI_OSINT_FRAMEWORK_SPECIFICATION.md`):**
  - Synthesized across 8 multidisciplinary expert roles (Senior OSINT Investigator, Threat Intel Analyst, Digital Forensics Examiner, Cybersecurity Architect, Data Scientist, AI Systems Architect, Privacy Attorney, Compliance Officer).
  - Codified Section 1 (17 Input Types and passive recon methodologies).
  - Codified Section 2 (Investigation Decision Tree, lifecycle workflows, and pseudocode).
  - Codified Section 3 (7-Category Source Catalog with reliability scores and validation protocols).
  - Codified Section 4 (Source Confidence Model based on NATO STANAG 2022 Admiralty 6×6 System with formulaic Confidence Index).
  - Codified Section 5 (Entity Resolution & 4-pillar disambiguation engine).
  - Codified Section 6 (AI Correlation Engine across 7 property buckets with edge weighting).
  - Codified Section 7 (7-part audit-ready report generator).
  - Codified Section 8 (Ethics Engine with 5-filter compliance gate and automated PII/residential redacting).
  - Codified Section 9 (Training Mode simulation suite with synthetic corporations and historical CTF scenarios).
  - Codified Section 10 (Analyst Dashboard architecture with 8 core workbench modules).
- **Complete 30 Graded Case Files Suite (`cases/`):**
  - **Tier 1: Beginner Cases (01–10):** Corporate subsidiaries (`CASE-BEG-001`), DNS SPF/DMARC mail defense (`CASE-BEG-002`), Certificate Transparency logs (`CASE-BEG-003`), Wayback Machine historical drift (`CASE-BEG-004`), Robots.txt/sitemap taxonomy (`CASE-BEG-005`), PDF/EXIF document metadata forensics (`CASE-BEG-006`), BGP ASN/IP prefix mapping (`CASE-BEG-007`), Git commit & CI/CD footprinting (`CASE-BEG-008`), SEC DEF 14A directorship graphing (`CASE-BEG-009`), and Dangling CNAME takeover audits (`CASE-BEG-010`).
  - **Tier 2: Intermediate Cases (11–20):** Maltego entity graph pivots (`CASE-INT-011`), Pre-GDPR historical WHOIS archeology (`CASE-INT-012`), Reverse IP co-tenancy & neighbor risk (`CASE-INT-013`), OpenAPI/Swagger schema mining (`CASE-INT-014`), X.509 SKI & serial number pivots (`CASE-INT-015`), Open-source bot username correlation with false-positive filtering (`CASE-INT-016`), Cloud bucket namespace discovery (`CASE-INT-017`), PyPI/npm SBOM & OpenSSF supply chain audits (`CASE-INT-018`), Domain breach telemetry & SEC Item 1.05 disclosures (`CASE-INT-019`), and OpenStreetMap geospatial campus verification (`CASE-INT-020`).
  - **Tier 3: Advanced Cases (21–30):** Adversary Diamond Model infrastructure clustering (`CASE-ADV-021`), `dnstwist` brand impersonation & MX triage (`CASE-ADV-022`), Doppelgänger media & DISARM narrative mapping (`CASE-ADV-023`), BGP route leak forensics & RPKI validation (`CASE-ADV-024`), V3 Onion cryptography & OPSEC headers (`CASE-ADV-025`), Bitcoin blockchain ransomware transaction forensics (`CASE-ADV-026`), Third-party SaaS OAuth permission drift (`CASE-ADV-027`), JARM C2 fingerprint hunting & Snort/Suricata rules (`CASE-ADV-028`), M&A pre-acquisition attack surface debt scoring (`CASE-ADV-029`), and Threat Intel to SOC Detection handoff with production SIGMA rules (`CASE-ADV-030`).
  - **Master Case Directory (`cases/README.md`):** Complete navigational syllabus linking all 30 case files with required toolsets and investigative focus.
- **Forensic Evidence & Validation Templates (`templates/`):**
  - **Forensic Screenshot Standard (`templates/SCREENSHOT_HANDOFF_TEMPLATE.md`):** Mandates ISO/IEC 27037 compliance, uncut browser address bar with SSL padlock, visible OS taskbar clock, dual Wayback/Archive.is mirrors, and immediate SHA-256 checksums.
  - **Source Validation Rubric (`templates/SOURCE_VALIDATION_RUBRIC.md`):** Codified NATO STANAG 2022 Admiralty 6×6 Matrix (Source Reliability A–F $\times$ Information Credibility 1–6) with strict anti-circular reporting rules and the Two-Source Rule.
  - **Comprehensive Intelligence Assessment Report (`templates/FINAL_INTELLIGENCE_REPORT_TEMPLATE.md`):** Complete deliverable framework containing the 1-Page Executive BLUF, external attack surface architecture graph, in-depth technical findings, master IOC ledger, and production SIGMA detection rules.
- **Section 11: Competency Matrix & Progress Dashboard (`docs/11_SCORING_AND_COMPETENCY_DASHBOARD.md`):**
  - 4 Progressive Competency Tiers aligned with the NIST NICE Cybersecurity Workforce Framework (SP-ARC-001).
  - 100-Point Objective Case Grading Rubric (Evidence Integrity 25%, Technical Accuracy 30%, Analytical Depth 25%, Professional Communication 20%).
  - Four verifiable career portfolio badges: CDOS, CCIA, CCTIH, and Principal OSINT Strategist.
- **Section 12: Capstone Investigation (`docs/12_CAPSTONE_INVESTIGATION.md`):**
  - "Operation Horizon Shield" — 20-30 hour simulated comprehensive pre-IPO attack surface audit of *Aether Dynamics Global Corporation*.
  - 6-phase roadmap covering regulatory filings, perimeter DNS, shadow IT cloud audit, adversary threat hunting, SBOM provenance, board presentation deck, and SOC IR playbooks.

### Changed
- Updated `README.md` canonical table of contents to provide active links across all 12 curriculum modules and templates.

---

## [1.1.0] - 2026-11-04 (Initial Full Academy Curriculum & Docker Runtime)

### Added
- **Docker Compose Stack:** 
  - Integrated `ctdc/spiderfoot:latest` running on web port `http://localhost:5001`.
  - Created hardened Python 3.11 CLI Workstation container (`Dockerfile`) pre-loaded with `sherlock-project`, `dnsutils` (`dig`, `nslookup`), `whois`, `curl`, and `jq`.
  - Configured persistent data volume `spiderfoot_data` and real-time live mount `./cases:/workspace/cases`.
- **30 Graded Case Files:**
  - 10 Beginner Cases (`cases/beginner/CASE_01` to `CASE_10`): SEC Form 10-K disclosures, DNS SPF/DMARC audits, Certificate Transparency logs, Wayback Machine drift, robots.txt, document EXIF/metadata, ASN ranges, Git commit forensics, board disclosures, dangling CNAME takeovers.
  - 10 Intermediate Cases (`cases/intermediate/`): Maltego transform graphs, WHOIS historical pivots, cross-platform username correlation, code repository secrets discovery.
  - 10 Advanced Cases (`cases/advanced/`): Threat actor campaign tracking, supply chain provenance, evasive infrastructure clustering.
- **Methodology & Evidence Standards:**
  - Codified the 7-Phase Intelligence Lifecycle (`docs/04_7_PHASE_WORKFLOW.md`).
  - Added NATO STANAG 2022 Admiralty System Confidence Matrix (`templates/ADMIRALTY_CONFIDENCE_MATRIX.md`).
  - Added Cryptographic Evidence Log with SHA-256 integrity hashing (`templates/EVIDENCE_LOG_TEMPLATE.md`).
  - Added C-Suite ready Executive Intelligence Report template (`templates/EXECUTIVE_REPORT_TEMPLATE.md`).
- **Curriculum & Career Guides:**
  - Lab Overview & Ethical Boundaries Charter (`docs/01_LAB_OVERVIEW.md`).
  - Windows 11 + Kali/Ubuntu VM Architecture Guide (`docs/02_LAB_ARCHITECTURE.md`).
  - Tool Suite Installation & Verification Plan (`docs/03_TOOL_INSTALLATION_PLAN.md`).
  - 25 Vetted Legal & Ethical Target Scenarios (`docs/05_SAFE_INVESTIGATION_TARGETS.md`).
  - 6-Month Beginner to Junior Analyst Roadmap (`docs/09_CAREER_DEVELOPMENT_ROADMAP.md`).
  - AI Automation & Mandatory Human Verification Principles (`docs/10_AI_AUTOMATION_GUIDE.md`).
  - Automated Environment Sanity Checker script (`scripts/verify_lab.sh`).

### Governance & Ethics
- Enforced strict 100% passive reconnaissance invariant: Zero active port scanning, zero exploitation, zero targeting of living private citizens.
- Canonical GitHub Remote: `https://github.com/candysuec/ethical-osint-lab.git` (Branch: `main`).
