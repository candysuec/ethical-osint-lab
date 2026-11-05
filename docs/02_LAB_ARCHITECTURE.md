# 🏗️ Section 02: Laboratory Architecture & VM Deployment

**Standard Reference:** `OSINT-LAB-SEC-02`  
**Classification:** `PUBLIC / TLP:CLEAR`  

---

## 🏛️ Architecture Overview

The lab isolates collection activity from the analyst's personal host operating system using a dual-virtual-machine architecture hosted on Windows 11.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        WINDOWS 11 HOST SYSTEM                          │
│                                                                        │
│   ┌───────────────────────┐             ┌─────────────────────────┐   │
│   │   Host Windows 11     │             │     Obsidian Vault      │   │
│   │   (Hardened Desktop)  │◄────────────┤  (Final Reports & Logs) │   │
│   └───────────┬───────────┘             └─────────────────────────┘   │
│               │                                                        │
│               ▼                                                        │
│   ┌───────────────────────────────────────────────────────────────┐   │
│   │              Type-2 Hypervisor (VMware / VirtualBox)          │   │
│   ├───────────────────────────────┬───────────────────────────────┤   │
│   │                               │                               │   │
│   │   VM 1: Kali Linux            │   VM 2: Ubuntu LTS            │   │
│   │   (OSINT CLI Automation)      │   (Sanitized Research Desktop)│   │
│   │   • SpiderFoot                │   • Maltego CE                │   │
│   │   • Sherlock / Maigret        │   • Multi-Account Firefox     │   │
│   │   • Recon-ng                  │   • LibreOffice Suite         │   │
│   │   • TheHarvester              │   • Hashing & Evidence Vault  │   │
│   │   [RAM: 4 GB | Disk: 30 GB]   │   [RAM: 4 GB | Disk: 40 GB]   │   │
│   └───────────────┬───────────────┴───────────────┬───────────────┘   │
│                   │                               │                   │
│                   └───────────────┬───────────────┘                   │
│                                   │                                   │
│                                   ▼                                   │
│                     ┌───────────────────────────┐                     │
│                     │ Isolated NAT Network /    │                     │
│                     │ Optional Commercial VPN   │                     │
│                     └───────────────────────────┘                     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 💻 Host System Hardening (Windows 11)

1. **Enable Hyper-V / Virtualization:**
   * Open UEFI/BIOS $\rightarrow$ Enable `Intel Virtualization Technology (VT-x)` or `AMD SVM`.
   * In Windows 11, run PowerShell as Administrator:
     ```powershell
     Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
     ```
2. **Install Core Management Software:**
   * Install [VMware Workstation Player](https://www.vmware.com/products/workstation-player.html) or [VirtualBox](https://www.virtualbox.org/).
   * Install [Obsidian](https://obsidian.md/) on Windows 11 to act as your primary evidence ledger and note vault.

---

## 🐧 Virtual Machine Configurations

### VM 1: Kali Linux (OSINT Engine)
* **Purpose:** Command-line reconnaissance, automation scripts, bulk dataset scraping.
* **vCPUs:** 2 Cores.
* **RAM:** 4,096 MB (4 GB).
* **Storage:** 30 GB dynamically allocated.
* **Network Adapter:** NAT (Network Address Translation).
* **Pre-installed tools utilized:** `theHarvester`, `recon-ng`, `whois`, `dig`, `curl`, `git`, `python3-pip`.

### VM 2: Ubuntu Desktop LTS (Analyst Workstation)
* **Purpose:** Graphical analysis, sandboxed web research, visual link analysis (Maltego), document handling.
* **vCPUs:** 2 Cores.
* **RAM:** 4,096 MB (4 GB).
* **Storage:** 40 GB dynamically allocated.
* **Network Adapter:** NAT with distinct MAC address.
* **Workstation Software:** Firefox with Multi-Account Containers, LibreOffice, Visual Studio Code.

---

## 🔒 Isolation & OpSec Requirements

1. **Disable Guest-Host Clipboard for Untrusted Sites:**
   * When investigating suspicious public infrastructure or malware-adjacent links, disable bidirectional clipboard sharing in VM settings to prevent accidental host clipboard injection.
2. **Dedicated Persona / Sock Puppet Hygiene:**
   * Never log into personal Google, Apple, Microsoft, or social accounts inside the research VMs.
   * VM browsers must use fresh research personas with no personal identity correlation.
3. **Evidence Handoff via Shared Read-Only Folders:**
   * Transfer finalized reports and SHA-256 evidence logs to the Windows host Obsidian vault through a designated staging folder.
