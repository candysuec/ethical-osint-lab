# 📂 Case File 01: Corporate Subsidiary & Domain Footprinting

**Difficulty:** Beginner (Score: 2/10)  
**Standard Reference:** `CASE-BEG-001`  
**Target Entity:** Public S&P 500 Corporation (e.g., Fastly, Inc. - CIK `0001517413`)  
**Investigative Focus:** Passive Corporate Reconnaissance & Subsidiary Infrastructure Mapping  

---

## 🎯 Case Objective

Map the external internet footprint of an acquired subsidiary without sending any active network packets to the target. Identify the subsidiary's primary name servers, mail exchangers, and exposed cloud storage buckets using only public regulatory filings and passive DNS records.

---

## 🔍 Available Clues & Starting Point
1. **Target Corporate CIK:** Fastly, Inc. (`0001517413`).
2. **SEC Filing Resource:** [U.S. Securities and Exchange Commission (EDGAR)](https://www.sec.gov/edgar/searchedgar/companysearch).
3. **Public Toolsets:** `dig`, `curl`, `crt.sh`, [HackerTarget DNS Lookup](https://hackertarget.com/).

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Query SEC Form 10-K (Exhibit 21)
1. Navigate to SEC EDGAR search and look up the target CIK.
2. Open the most recent **Annual Report (Form 10-K)**.
3. Search for **Exhibit 21.1** ("Subsidiaries of the Registrant").
4. Record the legal names and jurisdictions of all wholly-owned subsidiaries in your Evidence Log.

### Step 2: Passive Domain Discovery
1. For each discovered subsidiary, identify its canonical website domain name.
2. Query certificate transparency logs to find active subdomains:
   ```bash
   curl -s "https://crt.sh/?q=%.subsidiary.com&output=json" | jq -r '.[].name_value' | sort -u
   ```

### Step 3: DNS Infrastructure Enumeration
1. Query the authoritative Name Servers (`NS`) and Mail Exchangers (`MX`):
   ```bash
   dig +short NS subsidiary.com
   dig +short MX subsidiary.com
   dig +short TXT subsidiary.com
   ```
2. Verify if the domain implements SPF and DMARC anti-spoofing policies:
   * Look for `v=spf1 ...` in the TXT output.
   * Look for `v=DMARC1; p=reject; ...` in `_dmarc.subsidiary.com`.

---

## 📊 Expected Findings & Deliverables
* Complete entry in your `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hashes of the downloaded SEC Exhibit 21.
* List of discovered external domains and their authoritative DNS providers.
* An Admiralty-scored assessment (**A1**) linking the subsidiary to the parent registrant.
