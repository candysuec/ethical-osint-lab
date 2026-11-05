# 📋 OSINT Evidence Log & Chain of Custody Template

**Case Reference ID:** `CASE-2026-XXXX`  
**Target Identifier:** `[Entity Name / Domain / Asset]`  
**Investigator Name:** `[Your Name / Call-Sign]`  
**Date Initiated:** `YYYY-MM-DD`  
**Classification:** `PUBLIC / TLP:CLEAR`  

---

## 🔒 Master Evidence Ledger

| Item # | Timestamp (UTC) | Source URL / Asset Identifier | SHA-256 Checksum | Screenshot / Artifact Path | Admiralty Score | Summary of Finding |
| :---: | :---: | :--- | :--- | :--- | :---: | :--- |
| **001** | `2026-11-04 14:22:10` | `https://crt.sh/?q=%.target.com` | `a3f8b...41e` | `evidence/001_crtsh_subdomains.png` | **A1** | Discovered 14 wildcard subdomains; identified staging server on port 8443. |
| **002** | `2026-11-04 14:45:00` | `https://web.archive.org/...` | `9b21c...88f` | `evidence/002_wayback_contacts.png` | **B2** | Historical about page lists former cloud infrastructure partner. |
| **003** | `2026-11-04 15:10:32` | `https://github.com/target-org` | `c418e...90a` | `evidence/003_github_commit.png` | **A1** | Public commit log contains decommissioned staging endpoint. |

---

## 📸 Forensic Screenshot Standards

To ensure evidence remains audit-ready and tamper-evident:
1. **Full Viewport Capture:** Capture the full browser window including the address bar, HTTPS security padlock, and the operating system taskbar clock.
2. **Archival Mirror:** Whenever legally permissible, submit the live URL to the Wayback Machine (`web.archive.org`) or `archive.today` and log the persistent snapshot URL.
3. **Cryptographic Hashing:** Generate a cryptographic SHA-256 hash immediately upon saving any raw artifact:
   ```powershell
   Get-FileHash -Algorithm SHA256 ./evidence/001_crtsh_subdomains.png
   ```
