# 🛡️ Ethical OSINT Training Laboratory & Curriculum
**Canonical Repository:** `https://github.com/candysuec/ethical-osint-lab`  
**Standard Authority:** Candy Chevalier / CandySueC LLC  
**License:** [MIT](./LICENSE)  
**Target Audience:** Aspiring Cybersecurity Professionals, Career Changers, Junior SOC & Threat Intel Analysts  

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Windows_11_%2B_VMs-0078d4.svg?logo=windows11&logoColor=white)](#section-2---lab-architecture)
[![OSINT Framework](https://img.shields.io/badge/Methodology-7--Phase_Lifecycle-success.svg)](./docs/04_7_PHASE_WORKFLOW.md)
[![Standard](https://img.shields.io/badge/Confidence_Scoring-Admiralty_Matrix-orange.svg)](./templates/ADMIRALTY_CONFIDENCE_MATRIX.md)
[![Ethics](https://img.shields.io/badge/Ethics-100%25_Passive_%26_Legal-critical.svg)](#-ethical--legal-boundaries-the-bright-red-line)

---

## 🏛️ Project Mission

This repository contains the architecture, tooling, investigative methodologies, and case files for a **complete, professional-grade Ethical OSINT Training Laboratory**.

Designed to run locally on a single Windows 11 computer with virtualized research environments (Kali Linux / Ubuntu), this curriculum trains individuals how to conduct **defensible, legal, and audit-ready open-source intelligence investigations** for career transition into cybersecurity.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        LAB ARCHITECTURE                                │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   [ Host System: Windows 11 (Hardened Baseline) ]                      │
│          │                                                             │
│          ├──► Obsidian (Markdown Knowledge Graph & Evidence Vault)     │
│          └──► Hypervisor (VMware Workstation Player / VirtualBox)      │
│                     │                                                  │
│                     ├────► VM 1: Kali Linux (OSINT CLI Tools)          │
│                     │      (SpiderFoot, Sherlock, TheHarvester, etc.)  │
│                     │                                                  │
│                     └────► VM 2: Ubuntu LTS (Research Workstation)     │
│                            (Container Tabs, Maltego, Sanitized Browsers)│
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ Quickstart: Launch with Docker in 60 Seconds

For users who want immediate access without configuring a hypervisor or downloading 10GB virtual machine images, a full **Docker Compose** environment is included:

```bash
# 1. Clone the repository
git clone https://github.com/candysuec/ethical-osint-lab.git
cd ethical-osint-lab

# 2. Spin up SpiderFoot and the CLI Workstation
docker compose up -d

# 3. Access SpiderFoot Web UI in your browser:
# http://localhost:5001

# 4. Jump into the interactive OSINT CLI terminal:
docker exec -it osint_cli_workstation bash
```

Once inside the container, `sherlock`, `dig`, `whois`, `curl`, and `jq` are immediately ready. Your local `./cases` directory is mounted live at `/workspace/cases` for real-time evidence capture.

---

## ⚖️ Ethical & Legal Boundaries: The Bright Red Line

The hallmark of a professional analyst is knowing where legal research ends and unlawful intrusion begins:

* **100% Passive Reconnaissance:** All collection utilizes publicly available information (DNS records, certificate transparency logs, public company disclosures, search engine indexing, and open code repositories).
* **Zero Unauthorized Testing:** Students **NEVER** perform active port scanning (`nmap -A`), vulnerability probing, brute-forcing, or system exploitation without written authorization (CFAA compliance).
* **Zero Targeting of Private Citizens:** No living private citizens, neighbors, or individuals are ever investigated. All scenarios utilize public corporations, public infrastructure, open-source projects, and CTF datasets.

---

## 🧭 The 12 Canonical Curriculum Sections

| Section | Title | Overview |
| :---: | :--- | :--- |
| **01** | [Lab Overview](./docs/01_LAB_OVERVIEW.md) | Mission, safety rules, legal boundaries, hardware/software prerequisites. |
| **02** | [Lab Architecture](./docs/02_LAB_ARCHITECTURE.md) | Windows 11 host setup, Kali/Ubuntu VM provisioning, network isolation. |
| **03** | Tool Installation Plan | Step-by-step setup for Maltego, SpiderFoot, Sherlock, Recon-ng, Obsidian. |
| **04** | [7-Phase Investigation Workflow](./docs/04_7_PHASE_WORKFLOW.md) | Scope $\rightarrow$ Collect $\rightarrow$ Sanitize $\rightarrow$ Validate $\rightarrow$ Correlate $\rightarrow$ Report $\rightarrow$ Review. |
| **05** | Safe Investigation Targets | 25 vetted legal targets (SEC EDGAR, open-source codebases, historical CTFs). |
| **06** | 30 Graded Case Files | 10 Beginner, 10 Intermediate, and 10 Advanced real-world investigative scenarios. |
| **07** | [Evidence Management](./templates/EVIDENCE_LOG_TEMPLATE.md) | Chain of custody logging, cryptographic SHA-256 hashing, and screenshot standards. |
| **08** | [Report Writing](./templates/EXECUTIVE_REPORT_TEMPLATE.md) | Executive 1-pagers, Technical Intelligence Annexes, and risk scoring. |
| **09** | 6-Month Career Roadmap | Month-by-month progression from beginner to junior threat intel/SOC analyst. |
| **10** | AI Automation in OSINT | Human-in-the-loop workflows for log cleaning, timeline ordering, and report drafts. |
| **11** | Scoring & Competency | Admiralty 6x6 Confidence Matrix and skill mastery tracking dashboards. |
| **12** | Capstone Investigation | Full-scale simulated corporate digital footprint audit and board presentation. |

---

## 👥 The 8-Expert Advisory Council Persona

The curriculum is synthesized from eight multidisciplinary cybersecurity viewpoints:
1. **Senior OSINT Investigator (15+ Years):** Open-source tradecraft, deep web research, digital footprint mapping.
2. **Cybersecurity Training Director:** Adult learning scaffolding and competency gating.
3. **SOC Manager:** Triage discipline, evidence handling, alerting pipelines, incident escalation.
4. **Threat Intelligence Analyst:** Adversary profiling, infrastructure pivoting, IOC correlation.
5. **Ethical Hacker:** Perimeter defense auditing, passive attack surface evaluation.
6. **Digital Forensics Examiner:** Chain of custody, metadata verification, SHA-256 integrity.
7. **Adult Learning Specialist:** Cognitive load reduction, progressive hands-on challenge loops.
8. **Lab Environment Architect:** Hypervisor design, network isolation, host-guest security firewalls.

---

## 🚀 Quickstart: Staging the Lab

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/candysuec/ethical-osint-lab.git
   cd ethical-osint-lab
   ```
2. **Review the Workflow & Evidence Templates:**
   * Review [The 7-Phase Workflow](./docs/04_7_PHASE_WORKFLOW.md).
   * Open the [Admiralty Confidence Matrix](./templates/ADMIRALTY_CONFIDENCE_MATRIX.md).
   * Copy [The Evidence Log Template](./templates/EVIDENCE_LOG_TEMPLATE.md) into your research vault.

---

## 📬 Author & Executive Sponsor
* **Curriculum Designer:** Candy Chevalier
* **Portfolio:** [candy.evidra.tech](https://candy.evidra.tech) | [GitHub Profile](https://github.com/candysuec)
* **Organization:** CandySueC LLC (Vermont)
* **Focus:** Cybersecurity Governance, Digital Literacy, Systems Architecture, and Workforce Enablement.
