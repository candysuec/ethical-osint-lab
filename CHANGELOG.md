# 📜 Changelog - Ethical OSINT Training Laboratory & Curriculum

All notable changes to the Ethical OSINT Training Laboratory repository will be documented in this file.
This changelog strictly adheres to [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
