# 📂 Case File 05: Robots.txt, Sitemap.xml & Passive Endpoint Discovery

**Difficulty:** Beginner (Score: 2/10)  
**Standard Reference:** `CASE-BEG-005`  
**Target Entity:** Public Open-Source Foundation (e.g., `linuxfoundation.org` or `python.org`)  
**Investigative Focus:** Passive Directory Footprinting, Crawl Frontier Analysis, and Information Leakage  

---

## 🎯 Case Objective

Web servers publish standard metadata files—namely `robots.txt` (RFC 9309) and `sitemap.xml`—to guide search engine web crawlers. Webmasters frequently add sensitive administrative paths, test directories, or internal document repositories to `Disallow` directives in the mistaken belief that this hides them from the public.

In this case, the student will passively extract and analyze these standard navigation manifests to map the content taxonomy and uncover unlinked or sensitive directory paths without executing a directory brute-force attack (e.g., avoiding `gobuster` or `dirbuster`).

---

## 🔍 Available Clues & Starting Point
1. **Target Organization Domain:** `python.org` (or authorized foundation from `docs/05_SAFE_INVESTIGATION_TARGETS.md`).
2. **Public Files:** `/robots.txt`, `/sitemap.xml`, `/sitemap_index.xml`, `/.well-known/security.txt`.
3. **CLI Tools:** `curl`, `xmllint`, `grep`, `sort`, `awk`.

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Passive Retrieval of robots.txt
1. Retrieve the target's live `robots.txt` file using `curl`:
   ```bash
   curl -s -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) OSINT-Research-Lab/1.0" "https://www.python.org/robots.txt" > robots.txt
   ```
2. Verify file capture and hash:
   ```bash
   sha256sum robots.txt
   ```

### Step 2: Parse and Categorize Disallowed Directives
1. Extract all `Disallow:` directives from the file:
   ```bash
   grep -i "^Disallow:" robots.txt | awk '{print $2}' | sort -u > disallowed_paths.txt
   ```
2. Group the discovered paths into categories:
   * Administrative & Login Interfaces (e.g., `/admin`, `/login`, `/portal`)
   * Search & Query Endpoints (e.g., `/search/`, `/query/`)
   * Internal / Temporary Caches (e.g., `/tmp/`, `/cache/`, `/staging/`)
   * Private Data Directories (e.g., `/downloads/internal/`, `/reports/`)

### Step 3: Inspect Sitemap XML Indexes
1. Search `robots.txt` for `Sitemap:` declarations:
   ```bash
   grep -i "^Sitemap:" robots.txt
   ```
2. If declared, download and inspect the primary sitemap index:
   ```bash
   curl -s "https://www.python.org/sitemap.xml" > sitemap.xml
   ```
3. Extract URL endpoints listed in the XML document:
   ```bash
   grep -oPm1 "(?<=<loc>)[^<]+" sitemap.xml | head -n 25 > indexed_urls.txt
   ```

### Step 4: Check for RFC 9116 security.txt
1. The modern standard for vulnerability disclosure reporting is published at `/.well-known/security.txt`:
   ```bash
   curl -s "https://www.python.org/.well-known/security.txt" > security.txt
   ```
2. Extract the security contact email, PGP public key, and canonical disclosure policy URL.

---

## 📊 Expected Findings & Deliverables
* Complete entry in `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hashes of `robots.txt` and `security.txt`.
* Catalog of disallowed paths demonstrating potential information leakage (e.g., paths that reveal internal server technologies or unpublished features).
* Contact information and cryptographic PGP verification fingerprint for the organization's security team.
* Admiralty-scored assessment (**A1**) based on first-party published files.

---

## ⚖️ Ethical & Legal Boundary Invariant
* **Strict Invariant:** Do NOT perform active HTTP fuzzing or automated directory wordlist attacks against the paths discovered in `robots.txt`. Do NOT attempt unauthorized authentication or file requests on restricted endpoints.
