# 📂 Case File 29: M&A Shadow IT Due Diligence & Attack Surface Audit

**Difficulty:** Advanced (Score: 8/10)  
**Standard Reference:** `CASE-ADV-029`  
**Target Entity:** Public Corporate Acquisition Scenario (e.g., historical M&A event, such as Cisco acquiring Splunk or Broadcom acquiring VMware)  
**Investigative Focus:** Merger & Acquisition (M&A) Due Diligence, Shadow IT Discovery, Dangling Cloud Assets, and Perimeter Risk Synthesis  

---

## 🎯 Case Objective

During corporate mergers and acquisitions (M&A), the acquiring enterprise inherits the complete digital debt, unmanaged shadow IT, legacy domains, and compromised credentials of the target company. If the acquired subsidiary has porous security controls, adversaries use it as a low-resistance stepping stone to pivot laterally into the parent company's core networks.

In this case, the student will conduct an end-to-end passive M&A due diligence audit on a real or simulated acquisition target, aggregating subsidiary DNS records, abandoned cloud environments, exposed development servers, and historical breaches to produce a pre-acquisition risk score.

---

## 🔍 Available Clues & Starting Point
1. **Target Acquisition Pair:** Parent Registrant and its recently acquired subsidiary (e.g., Cisco / Splunk or Fastly / Signal Sciences).
2. **SEC Filing:** SEC Form 8-K announcing the completed merger/acquisition transaction.
3. **Comprehensive Passive Toolset:** `curl`, `jq`, `crt.sh`, `dnstwist`, BGPView, HIBP API.

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Ingest Form 8-K Merger Disclosures
1. Locate the official SEC Form 8-K filing documenting the completed acquisition:
   ```bash
   curl -s "https://data.sec.gov/submissions/CIK0001517413.json" > sec_submissions.json
   ```
2. Verify file capture and hash:
   ```bash
   sha256sum sec_submissions.json
   ```
3. Extract the legal names of the target acquired entities and their intellectual property domains.

### Step 2: Enumerate Inherited External Attack Surface
1. Execute multi-source passive subdomain discovery across the acquired subsidiary's apex domain:
   * Certificate Transparency (`crt.sh`): Wildcard querying for all historical certs.
   * Autonomous Systems: Check if the acquired company operates independent BGP prefixes or relies on unmanaged cloud accounts.
2. Filter for high-risk assets:
   * Staging servers (`staging-*.target.com`)
   * Remote access portals (`vpn.*`, `citrix.*`, `rdp.*`)
   * Unauthenticated Jenkins / CI automation dashboards.

### Step 3: Audit Cloud Infrastructure Orphanage & Dangling DNS
1. Check for dangling CNAME pointers to abandoned AWS S3, Azure Blob, or GitHub Pages instances across the subsidiary's DNS zone files.
2. Identify email security posture:
   * Does the acquired domain enforce DMARC `p=reject`?
   * If the acquired domain uses `p=none` or lacks SPF/DKIM, attackers can trivially send phishing emails posing as the newly acquired corporate division.

### Step 4: Synthesize the Pre-Merger Cybersecurity Debt Score
1. Score the acquired entity across four threat pillars:
   * **Domain & DNS Hygiene:** (0–25 points)
   * **Shadow IT & Staging Exposure:** (0–25 points)
   * **Credential & Breach Exposure:** (0–25 points)
   * **Cloud Storage & SaaS Orphanage:** (0–25 points)
2. Total the score (0–100) and draft prioritized remediation milestones required before interconnecting corporate networks.

---

## 📊 Expected Findings & Deliverables
* Complete entry in `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hash of `sec_submissions.json`.
* Complete M&A Cyber Attack Surface Audit report.
* Pre-merger Cybersecurity Debt Scorecard with prioritized post-acquisition remediation roadmap.
* Admiralty-scored assessment (**A1/B2**) synthesizing verified public regulatory and technical records.

---

## ⚖️ Ethical & Legal Boundary Invariant
* **Strict Invariant:** Do NOT perform active network vulnerability assessments, brute-force remote desktop/VPN portals, or exploit discovered staging servers. The report must be compiled purely through non-invasive, passive intelligence.
