# 📂 Case File 03: Certificate Transparency Log Excavation

**Difficulty:** Beginner (Score: 3/10)  
**Standard Reference:** `CASE-BEG-003`  
**Target Entity:** Public Research Entity or Non-Profit (e.g., `wikimedia.org` or `archive.org`)  
**Investigative Focus:** Passive Subdomain Enumeration, Shadow IT Detection, and Multi-Certificate Provenance  

---

## 🎯 Case Objective

Certificate Transparency (CT) is an open cryptographic auditing framework created by RFC 6962 to detect mistakenly or maliciously issued SSL/TLS certificates. Because Certificate Authorities (CAs) publicly log every certificate they issue, CT logs serve as an indisputable, 100% passive source for mapping an organization's digital attack surface without interacting with target servers.

The investigator's objective is to reconstruct the subdomains, hidden staging environments, internal portal names, and cryptographic certificate authorities used by the target organization over the past 3 years.

---

## 🔍 Available Clues & Starting Point
1. **Target Apex Domain:** `wikimedia.org`.
2. **Public Log Aggregators:**
   * [crt.sh](https://crt.sh/) (Sectigo Certificate Search)
   * [Censys Search](https://search.censys.io/) (Certificates dataset)
   * [Certspotter](https://sslmate.com/certspotter/)
3. **CLI Tools:** `curl`, `jq`, `openssl`, `sed`.

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Query the crt.sh JSON API
1. In your Linux VM (Kali or Ubuntu), execute a wild-carded query against `crt.sh` and parse the output with `jq`:
   ```bash
   curl -s "https://crt.sh/?q=%.wikimedia.org&output=json" > crtsh_raw.json
   ```
2. Verify file integrity and calculate the evidence hash:
   ```bash
   sha256sum crtsh_raw.json
   ```

### Step 2: Extract and Deduplicate Fully Qualified Domain Names (FQDNs)
1. Extract the `name_value` field (Subject Alternative Names) and clean wildcards:
   ```bash
   jq -r '.[].name_value' crtsh_raw.json \
     | sed 's/\*\.//g' \
     | tr '[:upper:]' '[:lower:]' \
     | sort -u > subdomains_extracted.txt
   ```
2. Count the total unique subdomains discovered:
   ```bash
   wc -l subdomains_extracted.txt
   ```

### Step 3: Filter for High-Value Operational Indicators
1. Filter the discovered names for patterns indicating non-production, staging, administrative, or cloud assets:
   ```bash
   grep -E "(stage|dev|test|vpn|internal|admin|api|corp|auth)" subdomains_extracted.txt > high_value_targets.txt
   ```
2. Document whether any certificates were issued to legacy or internal domains (e.g., `.local`, `.corp`, `.lan`).

### Step 4: Examine Certificate Authority Provenance & Validity Periods
1. Identify the issuing CAs (e.g., Let's Encrypt, DigiCert, Sectigo, Amazon Trust Services):
   ```bash
   jq -r '.[].issuer_name' crtsh_raw.json | sort | uniq -c | sort -nr
   ```
2. Identify expired certificates vs. active certificates to understand the organization's certificate lifecycle management and automated renewal patterns.

---

## 📊 Expected Findings & Deliverables
* Complete entry in `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hash of `crtsh_raw.json`.
* Master list of validated subdomains categorized into Production, Development/Staging, and Administrative portals.
* Analysis of certificate renewal automation (e.g., presence of short-lived Let's Encrypt certificates vs. multi-year enterprise certificates).
* Admiralty-scored assessment (**A1**) based on immutable, append-only CT logs.

---

## ⚖️ Ethical & Legal Boundary Invariant
* **Strict Invariant:** Do NOT attempt to visit, browse, or send HTTP requests to discovered staging or administrative subdomains. Your analysis stops at cataloging and categorizing the names recorded in the CT logs.
