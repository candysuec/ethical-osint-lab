# 📸 Forensic Screenshot Handoff & Visual Evidence Standard
**Standard Reference:** `OSINT-TMPL-SCREENSHOT-01`  
**Classification:** `PUBLIC / TLP:CLEAR`  
**Governing Standard:** ISO/IEC 27037 (Digital Evidence Handling Guidelines)  

---

## 🏛️ Purpose & Forensic Rationale

In professional OSINT investigations, a raw URL or casual crop is legally and forensically insufficient. Web content changes dynamically, domains expire, and adversaries delete evidence once detected. To maintain court-defensible and executive-grade integrity, all visual evidence must adhere to this **Tamper-Evident Screenshot Standard**.

---

## 🔒 The 5-Point Forensic Capture Mandate

Every visual artifact submitted in an investigation case file must satisfy five mandatory criteria:

```
┌────────────────────────────────────────────────────────────────────────┐
│                  FULL VIEWPORT FORENSIC SCREENSHOT                     │
├────────────────────────────────────────────────────────────────────────┤
│  [🔒 https://subdomain.target.com/admin/login.php                    ] │ ◄── 1. Full Uncut URL & SSL Padlock
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│                                                                        │
│                        TARGET WEB PAGE CONTENT                         │
│                                                                        │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│  [Windows / Linux Taskbar: 2026-11-04 22:50 UTC | IP: 198.51.100.42 ] │ ◄── 2. System Clock & Network State
└────────────────────────────────────────────────────────────────────────┘
```

1. **Uncut Viewport with Canonical Address Bar:**
   * Never crop out the browser URL bar, HTTPS padlock, or port numbers.
   * The complete URI scheme (`https://...`) must be clearly readable.
2. **Synchronized System Clock & Date Stamp:**
   * The host or guest operating system taskbar must remain visible at the bottom of the screenshot, displaying the local time and UTC offset.
3. **Dual Archival Mirror URLs:**
   * Every live web page captured must simultaneously be submitted to an immutable public web archive:
     * Primary: [Wayback Machine (web.archive.org)](https://web.archive.org/save/)
     * Secondary: [Archive.today (archive.is)](https://archive.today/)
   * Both persistent archive snapshot URLs must be recorded alongside the local screenshot.
4. **Immediate Cryptographic SHA-256 Checksum:**
   * Within 60 seconds of saving the PNG/JPEG file, compute and log its SHA-256 hash.
   * Once hashed, the original image file must be marked read-only and never edited, resized, or re-compressed.
5. **Standardized Evidence Filename Convention:**
   * Format: `CASE_ID-ITEM_NUM-YYYYMMDD-HHMMSS-TARGET_SLUG.png`
   * Example: `CASE_ADV_021-ITEM_004-20261104-143022-c2_jarm_cluster.png`

---

## 📋 Screenshot Handoff Ledger Entry Template

When transferring visual evidence into the case folder or handing off to another analyst, append this record to `cases/evidence_raw/`:

```markdown
### 🖼️ Evidence Item: [ITEM_NUMBER]
* **Case ID:** `[CASE-REFERENCE-ID]`
* **File Name:** `[CASE_ID-ITEM_NUM-YYYYMMDD-HHMMSS-TARGET_SLUG.png]`
* **Original Live URL:** `https://target.com/example/path`
* **Wayback Archive Snapshot:** `https://web.archive.org/web/YYYYMMDDHHMMSS/https://target.com/example/path`
* **Capture Timestamp:** `YYYY-MM-DD HH:MM:SS UTC`
* **Investigator Call-Sign:** `[Analyst Name / ID]`
* **Cryptographic SHA-256 Hash:**
  `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
* **Investigative Significance:**
  [1-2 sentences explaining why this screenshot proves the PIR or finding.]
* **Admiralty Confidence Score:** `[A1 / B2 / C3]`
```

---

## 🛠️ Verification Command Reference

### PowerShell (Windows 11 Host)
```powershell
Get-FileHash -Algorithm SHA256 .\evidence\CASE_ADV_021-ITEM_004-*.png | Format-List
```

### Bash (Linux Research VM)
```bash
sha256sum ./evidence/CASE_ADV_021-ITEM_004-*.png | tee -a evidence_hashes.sha256
```
