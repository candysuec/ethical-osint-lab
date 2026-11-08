# 🛡️ Sovereign Ethical OSINT Training Laboratory & Analyst Workbench
**Canonical Repository:** `https://github.com/candysuec/ethical-osint-lab`  
**Standard Reference:** `SOVEREIGN-OSINT-V2.3` | **License:** [MIT](./LICENSE)  
**Standard Authority:** Evidra Technologies LLC & CandySueC LLC  
**Author & Executive Architect:** Candy Chevalier  
**Primary Workbench URL:** `http://localhost:5180`  
**Tool Daemon & Gateway:** `http://127.0.0.1:5002`  
**Automated Reconnaissance:** `http://localhost:5001`  
**PostgreSQL Intelligence DB:** `localhost:5432` (`sovereign_osint`)  

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Platform: React 18](https://img.shields.io/badge/Platform-React_18_+_TypeScript-61dafb.svg?logo=react&logoColor=black)](./dashboard)
[![Database: PostgreSQL 16](https://img.shields.io/badge/Database-PostgreSQL_16-336791.svg?logo=postgresql&logoColor=white)](./dashboard/db/schema.sql)
[![Recon: SpiderFoot](https://img.shields.io/badge/Recon-SpiderFoot_Automated-orange.svg)](http://localhost:5001)
[![Standard: NATO STANAG 2022](https://img.shields.io/badge/Confidence-NATO_STANAG_2022_(A1--F6)-green.svg)](./templates/ADMIRALTY_CONFIDENCE_MATRIX.md)
[![Standard: ISO/IEC 27037](https://img.shields.io/badge/Forensics-ISO%2FIEC_27037_SHA--256-blueviolet.svg)](./docs/13_STUDENT_OPERATIONAL_FIELD_MANUAL.md)
[![Curriculum: 30 Cases + Capstone](https://img.shields.io/badge/Curriculum-30_Graded_Cases_+_Capstone-emerald.svg)](./cases)

---

## 🏛️ Project Mission

The **Sovereign Ethical OSINT Laboratory** is a commercial-grade defensive cybersecurity intelligence workstation designed to train aspiring analysts, career changers, and junior SOC/threat intelligence operators how to conduct **defensible, audit-ready digital footprint investigations** using strictly legal, passive open-source tradecraft.

Unlike automated scanners that produce overwhelming dumps of low-fidelity noise, this workbench trains operators in the complete **7-Phase Professional Intelligence Lifecycle**:
1. **Scope & PIRs:** Defining explicit Priority Intelligence Requirements and affirming CFAA / Computer Misuse Act boundaries.
2. **Passive Collection:** Running non-intrusive queries (`dig`, `whois`, `crt.sh`, `exiftool`, `SpiderFoot`).
3. **Chain of Custody:** Calculating ISO/IEC 27037 SHA-256 cryptographic hashes immediately upon capture.
4. **Admiralty Triangulation:** Enforcing the Two-Source Rule and rating findings via the NATO STANAG 2022 $6 \times 6$ matrix ($A1$ to $F6$).
5. **Entity Disambiguation:** Resolving multi-tenant digital identities without jumping to false assumptions.
6. **Executive & SOC Reporting:** Compiling executive BLUF briefings, verifiable audit trails, and production SIGMA detection rules.
7. **OPSEC Teardown:** Maintaining immutable session logs with Zero Private Citizen Profiling.

---

## 🏗️ System Architecture

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│               SOVEREIGN ETHICAL OSINT LABORATORY — DISTRIBUTED TOPOLOGY                │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│   [ Host System / Browser Workstation ]                                                │
│          │                                                                             │
│          ▼                                                                             │
│   ┌────────────────────────────────────────────────────────────────────────────────┐   │
│   │ Sovereign OSINT Analyst Workbench (Port :5180)                                 │   │
│   │ • React 18 + TypeScript + Vite + Tailwind CSS                                  │   │
│   │ • 16 Specialized Analyst Subsystems (Academy Hub, 3 Pillars, Graph, Vault)    │   │
│   └──────────────────────────────────────┬─────────────────────────────────────────┘   │
│                                          │ REST API & WebSocket Stream                 │
│                                          ▼                                             │
│   ┌────────────────────────────────────────────────────────────────────────────────┐   │
│   │ Sovereign Tool & REST Daemon (Port :5002 - Python 3)                           │   │
│   │ • Endpoints: /api/health, /api/cases, /api/evidence, /api/spiderfoot, /tools   │   │
│   │ • Dynamic Maltego-Style Graph & Timeline State Engine                          │   │
│   └───────────────┬───────────────────────────────┬────────────────────────────────┘   │
│                   │                               │                                    │
│                   ▼                               ▼                                    │
│   ┌───────────────────────────────┐ ┌──────────────────────────────────────────────┐   │
│   │ PostgreSQL 16 (Port :5432)    │ │ SpiderFoot 4.0 Engine (Port :5001)           │   │
│   │ • DB: sovereign_osint         │ │ • Container: osint_spiderfoot                │   │
│   │ • 11 Relational Schema Tables │ │ • Automated Passive Reconnaissance           │   │
│   │ • 31 Pre-Seeded Cases         │ │ • Live Scan Findings Bridge                  │   │
│   └───────────────────────────────┘ └──────────────────────────────────────────────┘   │
│                   │                                                                    │
│                   ▼                                                                    │
│   ┌────────────────────────────────────────────────────────────────────────────────┐   │
│   │ Linux CLI Workstation Container (osint_cli_workstation)                        │   │
│   │ • Alpine / Debian with bind-tools (dig), whois, curl, jq, openssl              │   │
│   │ • Real-time stdout capture with ISO/IEC 27037 SHA-256 integrity hashing        │   │
│   └────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚖️ Ethical & Legal Invariants: The Four Red Lines

1. **100% Passive Reconnaissance:** All collection utilizes publicly available information (authoritative DNS root zones, Certificate Transparency ledgers, SEC EDGAR filings, WHOIS registries).
2. **Zero Active Port Scanning:** Active penetration tools such as `nmap`, vulnerability exploits, and login brute-forcing are strictly banned.
3. **Zero Private Citizen Profiling:** Private living citizens are never investigated. All scenarios utilize public corporations, public infrastructure, and authorized CTF datasets.
4. **Law 5 Ground Truth Over Synthetic Coherence:** An LLM generating a fluent explanation does *not* constitute verified intelligence. Every finding must be anchored by cryptographic SHA-256 hashes and corroborated under the Two-Source Rule. Unverified claims permanently default to **NATO F6 (Truth Cannot Be Judged)**.

---

## 🗄️ Master Subsystem Directory (16 Specialized Workspaces)

| Workspace | Port / Route | Core Mission |
| :--- | :--- | :--- |
| **Academy Command Center** | `:5180` $\rightarrow$ *Academy Hub* | Browse, filter, and launch all 30 graded curriculum operations with top-down visual hierarchy. |
| **Active Case Console** | `:5180` $\rightarrow$ *Active Console* | 3-Pillar workspace: Scope & PIRs, Live Tool Execution, and ISO/IEC 27037 Chain of Custody. |
| **Guided Lifecycle** | `:5180` $\rightarrow$ *Guided Lifecycle* | 6-Stage sequential OSINT operational workflow stepper with phase checklists and validation gates. |
| **Mission Control** | `:5180` $\rightarrow$ *Mission Control* | 30 interactive case modules with command-line stdout decoders and multiple-choice quizzes. |
| **Tool Sandbox & SpiderFoot** | `:5180` $\rightarrow$ *Tools* | Run live defensive commands (`dig`, `whois`, `crt.sh`) or connect directly to SpiderFoot on `:5001`. |
| **EXIF Metadata Dropzone** | `:5180` $\rightarrow$ *EXIF Dropzone* | Browser-native drag-and-drop file analyzer. Extracts EXIF tags, calculates SHA-256 hashes, and scrubs GPS leaks. |
| **Indicator Intake** | `:5180` $\rightarrow$ *Indicator Intake* | Ingest raw indicators (Domains, IPs, Hashes). Screens against ethical red lines and normalizes formatting. |
| **Lead Queue** | `:5180` $\rightarrow$ *Lead Queue* | Triage and triage incoming intelligence leads. Promote validated leads directly to case evidence. |
| **Evidence Vault** | `:5180` $\rightarrow$ *Evidence Vault* | The central PostgreSQL 16 evidence ledger. Review verified SHA-256 hashes, viewport screenshots, and NATO ratings. |
| **Source Reliability** | `:5180` $\rightarrow$ *Source Reliability* | Interactive NATO STANAG 2022 $6 \times 6$ Admiralty Matrix ($A1$ to $F6$) evaluation workbench. |
| **Confidence Engine** | `:5180` $\rightarrow$ *Confidence Engine* | Mathematical Confidence Index ($CI = \sum(w_i \cdot s_i)$) calculator with source weightings and gap penalties. |
| **Entity Resolution** | `:5180` $\rightarrow$ *Entity Resolution* | Disambiguate identities and multi-tenant assets. Automated resolution is permanently disabled. |
| **Relationship Graph** | `:5180` $\rightarrow$ *Graph* | Interactive link analysis displaying connected nodes across 7 categories with dynamic case filtering. |
| **Timeline Analysis** | `:5180` $\rightarrow$ *Timeline Analysis* | Chronological reconstruction of infrastructure modifications, certificate issuances, and registration events. |
| **Gap Analysis** | `:5180` $\rightarrow$ *Gap Analysis* | Structured identification of missing intelligence items and uncorroborated single-source leads. |
| **Executive Reports** | `:5180` $\rightarrow$ *Executive Reports* | Generate C-suite BLUF summaries, evidence manifests, and production SIGMA detection rules. |
| **Capstone Diploma** | `:5180` $\rightarrow$ *Capstone* | Comprehensive multi-disciplinary simulation culminating in an audit-ready, printable graduation certificate. |
| **Audit Trail & Logs** | `:5180` $\rightarrow$ *Audit Trail & Logs* | Immutable audit history recording every query, promotion, and analyst resolution. |

---

## 📚 30-Case Graded Curriculum + Capstone Horizon Shield

The laboratory features a rigorous 4-tier progressive curriculum:

```
Tier 1: Beginner Fundamentals (Cases 01–10)
  01. Finding Corporate Subsidiaries in SEC EDGAR Filings (Uber Technologies)
  02. Auditing Domain Mail Spoofing via SPF & DMARC (fastly.com)
  03. Certificate Transparency Log Excavation (cloudflare.com)
  04. Wayback Machine Historical Infrastructure Drift (github.com)
  05. Robots.txt and Sitemap Exposure Auditing (nasa.gov)
  06. Document Metadata & EXIF Information Leakage (defense.gov PDF)
  07. ASN & BGP Prefix Mapping (AS54113 / fastly.com)
  08. Open-Source Code Repository Secret Footprinting (npm-registry)
  09. Executive Board & Leadership Link Analysis (aetherdynamics-global.com)
  10. Dangling Cloud Storage CNAME Takeover Auditing (aws-s3-orphans)

Tier 2: Intermediate Analysis (Cases 11–20)
  11. Maltego-Style Infrastructure Graph Pivoting (quad9.net)
  12. Historical WHOIS Pivoting & Privacy Redaction (target-holdings.org)
  13. Shared Hosting Reverse IP Infrastructure Triangulation (cloud-vps)
  14. Public API & Swagger Schema Telemetry Discovery (stripe.com)
  15. TLS Certificate Serial Number & SKI Pivoting (digicert.com)
  16. Synthetic Username Footprinting & Account Cross-Correlation
  17. Multi-Cloud Storage Namespace Enumeration (GCP/Azure)
  18. Open-Source Supply Chain Dependency Graphing (PyPI/npm)
  19. Credential Leak Telemetry & Breach Correlation (haveibeenpwned)
  20. Geolocation & Physical Facility Satellite Verification

Tier 3: Advanced Intelligence (Cases 21–30)
  21. Darknet Mention Monitoring & Threat Actor Forum Triage
  22. Brand Impersonation, Homoglyph & Typosquatting Defense
  23. Cobalt Strike C2 Infrastructure Hunting via JARM Hashes
  24. BGP Route Hijacking & ASN Anomaly Detection
  25. Passive Tor Onion Router Relay Profiling
  26. APT Infrastructure Overlap Analysis & Diamond Model
  27. Autonomous Vehicle Telemetry & IoT Fleet Exposure
  28. Ransomware Payment Tracker & Blockchain Ledger Tracing
  29. Cross-Border Sanctions & OFAC Entity Resolution
  30. Threat Intel to SOC Detection Handoff (SIGMA & YARA)

Tier 4: Enterprise Capstone Simulation
  ★ Operation Horizon Shield: Multi-Week Pre-IPO Defensive Surface Audit
    (Target: Aether Dynamics Global Corporation • Official Graduation Diploma)
```

---

## ⚡ Quickstart Guide

### Option 1: One-Click Windows Quickstart (Recommended)
Double-click `start_osint_lab.bat` in the root folder:
```cmd
start_osint_lab.bat
```
This automated orchestrator will:
1. Spin up the Docker stack (`spiderfoot` :5001, `osint_postgres` :5432, `osint_cli_workstation`).
2. Launch the Python REST & Tool Daemon on `:5002`.
3. Launch the Vite Analyst Dashboard on `:5180`.
4. Run the pre-flight verification suite and open `http://localhost:5180` in your default browser.

To stop the entire stack cleanly:
```cmd
stop_osint_lab.bat
```

### Option 2: Manual Terminal Setup
```bash
# 1. Clone repository
git clone https://github.com/candysuec/ethical-osint-lab.git
cd ethical-osint-lab

# 2. Boot Docker containers
docker compose up -d

# 3. Start Python REST & Tool Daemon (Port 5002)
python scripts/tool_daemon.py &

# 4. Start Vite Analyst Dashboard (Port 5180)
cd dashboard
npm install
npm run dev

# 5. Open http://localhost:5180 in your browser
```

---

## 🩺 System Verification & Pre-Flight Diagnostics

Run the integrated verification suite anytime to confirm end-to-end platform health:
```bash
python scripts/verify_suite.py
```
**Expected Output:**
```txt
======================================================================
   SOVEREIGN ETHICAL OSINT LABORATORY -- SYSTEM HEALTHCHECK
   Target Platform: http://localhost:5180 | Version: 2.3.1
======================================================================

1. Checking Platform Web Services & Gateways:
[+] Analyst Workbench UI                -> HTTP 200 OK (http://localhost:5180)
[+] SpiderFoot Reconnaissance Engine    -> HTTP 200 OK (http://localhost:5001)
[+] Tool & REST Daemon Gateway          -> HTTP 200 OK (http://localhost:5002/api/health)

2. Checking Daemon & Bridge Subsystems:
[+] Tool Daemon Core Status             -> ONLINE
    |-- PostgreSQL 16 Persistence       -> CONNECTED
    |-- SpiderFoot Engine Bridge        -> ONLINE
    \-- Linux CLI Workstation           -> READY

3. Checking PostgreSQL Relational Intelligence Store:
[+] PostgreSQL Case Catalog Count       -> 31 Seeding Records (Expect >= 30)

4. Checking Containerized Passive Tool Execution:
[+] Passive DNS Tool Execution Stream   -> Successfully captured TXT / DMARC payload

======================================================================
   [PASS] ALL OSINT TRAINING LAB SYSTEMS ARE 100% OPERATIONAL!
======================================================================
```

---

## 📖 Operational Documentation & Field Manuals

* **[Student & Instructor Field Manual](./docs/13_STUDENT_OPERATIONAL_FIELD_MANUAL.md):** Complete walkthrough with 4 hands-on training scenarios.
* **[7-Phase Operational Lifecycle](./docs/04_7_PHASE_WORKFLOW.md):** Rigorous methodology from scoping to OPSEC teardown.
* **[NATO STANAG 2022 Admiralty Matrix](./templates/ADMIRALTY_CONFIDENCE_MATRIX.md):** Joint Intelligence Standard $6 \times 6$ evaluation model.
* **[ISO/IEC 27037 Evidence Standards](./templates/EVIDENCE_LOG_TEMPLATE.md):** Forensic digital evidence handling protocols.
* **[Capstone Operation Horizon Shield](./docs/12_CAPSTONE_INVESTIGATION.md):** Pre-IPO enterprise audit specification and rubric.

---

## 📬 Author & Sovereign Authority

* **Architect & Curriculum Designer:** Candy Chevalier
* **Portfolio:** [candy.evidra.tech](https://candy.evidra.tech) | [GitHub Profile](https://github.com/candysuec)
* **Standard Authority:** Evidra Technologies LLC & CandySueC LLC (Vermont)
* **Focus:** Cybersecurity Governance, Defensive Threat Intelligence, Systems Architecture, and Workforce Enablement.
