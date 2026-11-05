# 📂 Case File 06: Public Document Metadata Extraction & Forensics

**Difficulty:** Beginner (Score: 3/10)  
**Standard Reference:** `CASE-BEG-006`  
**Target Entity:** Public Governmental or Intergovernmental Body (e.g., United Nations, SEC, or municipal publications)  
**Investigative Focus:** Passive Document Metadata Extraction, Internal Author Telemetry, and Software Version Profiling  

---

## 🎯 Case Objective

Organizations routinely publish press releases, annual reports, whitepapers, and budget proposals in Portable Document Format (`.pdf`), Microsoft Word (`.docx`), or spreadsheet formats. During document generation, desktop software frequently embeds invisible metadata, including the author's internal username, local file system paths, printer driver details, operating system versions, and precise software build numbers.

In this case, the student will locate publicly available documents from an official public entity, safely download them, and perform passive metadata forensics to construct an internal technology profile of the target's workstation environment without contacting their internal network.

---

## 🔍 Available Clues & Starting Point
1. **Target Repository:** Publicly available reports hosted on official domains (e.g., `sec.gov`, `un.org`, or `worldbank.org`).
2. **Search Modifiers (Google Dorking):** `site:target.org filetype:pdf "annual report"`.
3. **Forensic Tools:** `exiftool`, `pdfinfo`, `strings`, `sha256sum`.

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Passive Discovery of Public Documents via Search Operators
1. Use a standard search engine with non-invasive dorking syntax to discover indexed PDF documents:
   ```text
   site:sec.gov filetype:pdf "strategic plan"
   ```
2. Identify a single public document (e.g., `strategic_plan.pdf`) and copy its canonical URL.

### Step 2: Safe Ingestion & Cryptographic Hashing
1. Download the document inside your isolated Linux research VM using `curl`:
   ```bash
   curl -s -L "https://www.sec.gov/files/strategic-plan-2022-2026.pdf" -o target_document.pdf
   ```
2. Immediately calculate the SHA-256 hash to establish chain of custody:
   ```bash
   sha256sum target_document.pdf > target_document.sha256
   cat target_document.sha256
   ```

### Step 3: Extract Metadata with ExifTool
1. Run `exiftool` to dump all embedded Exchangeable Image File (EXIF) and XMP metadata:
   ```bash
   exiftool -a -u -g1 target_document.pdf > metadata_dump.txt
   ```
2. Inspect the output for key forensic attributes:
   * **`Author` / `Creator`:** Does it expose an employee name or an internal Active Directory username (e.g., `jdoe`, `ADMINISTRATOR`)?
   * **`Producer` / `Software`:** Which exact application created the document (e.g., `macOS Version 12.4 Quartz PDFContext`, `Microsoft Word for Office 365 16.0.14326.20404`, `Adobe InDesign 17.0`)?
   * **`Create Date` / `Modify Date`:** Compare creation timestamps to deduce working hours and timezones of internal staff.
   * **`Source Modified` / `File Paths`:** Look for local directory paths (e.g., `C:\Users\jsmith\Documents\Q4_Reports\`).

### Step 4: Cross-Check with pdfinfo and Strings
1. Cross-validate the findings using `pdfinfo`:
   ```bash
   pdfinfo target_document.pdf
   ```
2. Scan for embedded font names or internal server references within uncompressed strings:
   ```bash
   strings target_document.pdf | grep -iE "(c:\\\\|/users/|prn:)" | head -n 10
   ```

---

## 📊 Expected Findings & Deliverables
* Complete entry in `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hash of the downloaded PDF.
* Workstation Profile: Inferred client operating system (Windows vs. macOS), desktop office suite versions, and internal file path conventions.
* An evaluation of the organization's Document Sanitization Policy (whether metadata scrubbing is enforced prior to public release).
* Admiralty-scored assessment (**A1**) based on cryptographically preserved file artifacts.

---

## ⚖️ Ethical & Legal Boundary Invariant
* **Strict Invariant:** Do NOT attempt to use discovered usernames to execute brute-force login attempts or password spraying on the organization's portals. The data is cataloged strictly for attack surface and information-leakage analysis.
