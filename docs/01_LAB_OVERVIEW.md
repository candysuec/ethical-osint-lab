# 🧭 Section 01: Laboratory Overview & Ethical Charter

**Standard Reference:** `OSINT-LAB-SEC-01`  
**Classification:** `PUBLIC / TLP:CLEAR`  
**Audience:** Career Changers, Junior Security Analysts, Threat Intelligence Students  

---

## 🎯 1. Lab Mission & Purpose

The **Ethical OSINT Training Laboratory** bridges academic cybersecurity theory and hands-on, defensible investigative practice. 

The lab is designed to train aspiring analysts in the end-to-end open-source intelligence lifecycle—from planning and collection through technical validation, timeline correlation, and professional intelligence reporting—using only **100% legal, passive, and ethical techniques**.

---

## 🎓 2. Core Learning Objectives

By completing this curriculum, the student will master:
1. **Passive Information Harvesting:** Extracting infrastructure, domain, certificate, and organizational data without triggering security alerts or scanning targets.
2. **Metadata & Cryptographic Verification:** Extracting, analyzing, and hashing EXIF, PDF, and image metadata to preserve evidentiary chain of custody.
3. **Information Validation & Admiralty Scoring:** Applying the NATO STANAG 2022 Admiralty Code ($6 \times 6$ matrix) to eliminate disinformation and false positives.
4. **Adversary Attribution & Infrastructure Pivoting:** Connecting disparate infrastructure artifacts (WHOIS history, certificate transparency, MX/TXT records) into structured threat models.
5. **Defensible Intelligence Reporting:** Authoring executive-ready briefings, confidence-weighted risk analyses, and actionable remediation guidance.

---

## ⚖️ 3. The Ethical & Legal Red Line

In cybersecurity, methodology and intent define the boundary between an intelligence professional and an unauthorized actor:

| Permitted (Ethical OSINT) | Prohibited (Unauthorized & Illegal) |
| :--- | :--- |
| Querying public DNS records (`dig`, `nslookup`) | Port scanning or vulnerability probing (`nmap`, `masscan`) |
| Searching public certificate logs (`crt.sh`) | Intercepting, MITM, or capturing target traffic |
| Analyzing public corporate SEC filings (EDGAR) | Attempting unauthorized login or credential stuffing |
| Reviewing open-source code repositories (GitHub) | Reverse-engineering proprietary binaries without permission |
| Indexing public news, press, and patent filings | Researching, doxxing, or profiling private citizens |
| Hashing public images and documents (SHA-256) | Circumventing authentication, paywalls, or access controls |

> [!CAUTION]
> **Strict Operational Rule:** Students must NEVER investigate living private citizens, neighbors, friends, or colleagues. All investigative exercises must target publicly traded corporations, open-source software foundations, or synthetic CTF datasets.

---

## 💻 4. Hardware & Software Requirements

### Hardware Requirements
* **Computer:** Single Windows 11 PC (Pro, Enterprise, or Home).
* **Processor:** 4+ Cores (64-bit x86/AMD64 with VT-x/AMD-V virtualization enabled in BIOS/UEFI).
* **Memory (RAM):** 16 GB minimum (32 GB recommended).
  * Host Allocation: 8 GB
  * Kali Linux VM: 4 GB
  * Ubuntu Research VM: 4 GB
* **Storage:** 80 GB free SSD storage space.

### Software Requirements
* **Hypervisor:** VMware Workstation Player 17+ or Oracle VirtualBox 7.0+ (Free for personal/educational use).
* **Host Documentation Hub:** Obsidian (Free, local markdown knowledge graph).
* **Virtual Machine Images:**
  * Kali Linux (Pre-built VMware/VirtualBox VM image from `kali.org`).
  * Ubuntu Desktop LTS (from `releases.ubuntu.com`).
