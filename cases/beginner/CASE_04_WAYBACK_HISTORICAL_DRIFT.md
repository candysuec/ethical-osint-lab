# 📂 Case File 04: Wayback Machine & Historical Web Drift Analysis

**Difficulty:** Beginner (Score: 2/10)  
**Standard Reference:** `CASE-BEG-004`  
**Target Entity:** Public Technology Company (e.g., historical snapshots of `fastly.com` or `cloudflare.com`)  
**Investigative Focus:** Historical Change Detection, Retired Architecture Telemetry, and M&A Brand Evolution  

---

## 🎯 Case Objective

Organizations frequently change their public websites, removing sensitive details regarding former software partners, decommissioned server addresses, historical leadership rosters, and retired product names. However, web preservation archives maintain timestamped snapshots of these pages.

The student will use the Wayback Machine (Internet Archive) API and historical crawling techniques to reconstruct changes in a target entity's public posture over a 5-year timeline, identifying retired technology stacks and unannounced organizational shifts.

---

## 🔍 Available Clues & Starting Point
1. **Target Web Entity:** Historical footprint of Fastly, Inc. (`fastly.com`).
2. **Archival Repositories:**
   * [Wayback Machine (Archive.org)](https://web.archive.org/)
   * [Wayback CDX Server API](https://github.com/internetarchive/wayback/tree/master/wayback-cdx-server)
   * [Archive.today](https://archive.today/)
3. **CLI Tools:** `curl`, `jq`, `diff`, `git` (for markdown delta tracking).

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Query the Wayback CDX Server API
1. Query the CDX API to retrieve all indexed snapshots for the target's `/about` or `/security` page:
   ```bash
   curl -s "https://web.archive.org/cdx/search/cdx?url=fastly.com/about&output=json&fl=timestamp,original,mimetype,statuscode,digest" > cdx_snapshots.json
   ```
2. Parse the timestamps of successful HTTP 200 captures over the years:
   ```bash
   jq -r '.[1:][] | select(.[3]=="200") | .[0]' cdx_snapshots.json | head -n 10
   ```

### Step 2: Retrieve Historical Snapshots Across Timelines
1. Select two representative snapshots separated by 3 to 4 years (e.g., Year 2019 vs. Year 2023).
2. Download the sanitized text content of both captures using `curl`:
   ```bash
   curl -s "https://web.archive.org/web/20190101000000id_/https://www.fastly.com/about" > about_2019.html
   curl -s "https://web.archive.org/web/20230101000000id_/https://www.fastly.com/about" > about_2023.html
   ```
3. Strip HTML markup to isolate textual intelligence (using `pandoc`, `lynx -dump`, or `sed`):
   ```bash
   sed 's/<[^>]*>/ /g' about_2019.html | tr -s ' ' > about_2019.txt
   sed 's/<[^>]*>/ /g' about_2023.html | tr -s ' ' > about_2023.txt
   ```

### Step 3: Compute Difference Telemetry & Semantic Drift
1. Run a unified diff to identify organizational shifts:
   ```bash
   diff -u about_2019.txt about_2023.txt > delta_findings.diff
   ```
2. Analyze the delta for:
   * Changes in corporate addresses (relocation of headquarters).
   * Changes in cited third-party service providers and technology partners.
   * Mergers, acquisitions, or discontinued product lines.

### Step 4: Map Historical Robots.txt Directives
1. Query historical `robots.txt` files to discover paths the organization once attempted to keep search engines from indexing:
   ```bash
   curl -s "https://web.archive.org/web/20200101000000id_/https://www.fastly.com/robots.txt" > robots_historical.txt
   ```
2. Note any administrative, staging, or confidential documentation paths referenced.

---

## 📊 Expected Findings & Deliverables
* Complete entry in `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hashes of `delta_findings.diff`.
* Chronological timeline of at least three verified organizational or technical changes detected via web archives.
* Identification of any historical paths or partner integrations no longer visible on the live web.
* Admiralty-scored assessment (**A2**) reflecting reliable public archival records.

---

## ⚖️ Ethical & Legal Boundary Invariant
* **Strict Invariant:** Do NOT test any historical administrative paths discovered in `robots.txt` on the live production server. Document them strictly as historical archival intelligence.
