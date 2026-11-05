# 📂 Case File 02: DNS Record Enumeration & Mail Security Auditing

**Difficulty:** Beginner (Score: 2/10)  
**Standard Reference:** `CASE-BEG-002`  
**Target Entity:** Public Enterprise Domain (e.g., `apache.org` or authorized public education domain)  
**Investigative Focus:** Passive DNS Hygiene, MX Routing, and Email Spoofing Defense Auditing (SPF/DKIM/DMARC)  

---

## 🎯 Case Objective

Investigate the external email security posture and domain name service (DNS) architecture of a major public foundation or enterprise. Without sending any unsolicited emails, testing SMTP relays, or initiating active scans, determine whether the target's email domain can be spoofed by adversaries in phishing campaigns and map all third-party transactional mail services authorized to send email on their behalf.

---

## 🔍 Available Clues & Starting Point
1. **Target Apex Domain:** `apache.org` (or student-selected Fortune 500 domain from `docs/05_SAFE_INVESTIGATION_TARGETS.md`).
2. **Public Query Tools:** `dig` (BIND utils), `host`, `nslookup`, `curl`.
3. **Public Repositories:** [dmarcian.com](https://dmarcian.com/), [MXToolbox Public Lookup](https://mxtoolbox.com/), [BGPView DNS](https://bgpview.io/).

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Query Authoritative Name Servers & Mail Exchangers
1. In your Kali or Ubuntu VM terminal, identify the authoritative Name Servers (`NS`) responsible for the zone:
   ```bash
   dig +noall +answer NS apache.org
   ```
2. Identify the designated primary and backup Mail Exchanger (`MX`) hosts and their priorities:
   ```bash
   dig +noall +answer MX apache.org
   ```
3. Record the DNS provider (e.g., UltraDNS, Cloudflare, AWS Route53) and mail gateway hosting providers in your Evidence Log.

### Step 2: Audit Sender Policy Framework (SPF) Records
1. Query the domain's TXT records to extract the SPF policy:
   ```bash
   dig +noall +answer TXT apache.org | grep "v=spf1"
   ```
2. Analyze the SPF mechanisms:
   * Identify all included authorized sender domains (`include:_spf.google.com`, `include:sendgrid.net`, etc.).
   * Check the terminal qualifier:
     * `+all` (Allow all - Catastrophic misconfiguration)
     * `?all` (Neutral - Ineffective protection)
     * `~all` (SoftFail - Messages may still reach inboxes)
     * `-all` (HardFail - Strictest enforcement; recommended)
3. Count the total DNS lookup mechanisms to verify it complies with the RFC 7208 10-lookup limit.

### Step 3: Verify Domain-based Message Authentication, Reporting, and Conformance (DMARC)
1. DMARC policies are published at the standard subdomain `_dmarc.<domain>`:
   ```bash
   dig +noall +answer TXT _dmarc.apache.org
   ```
2. Parse the DMARC tags:
   * `p=none` (Monitoring mode only; spoofed emails are delivered)
   * `p=quarantine` (Spoofed emails sent to spam/junk folders)
   * `p=reject` (Spoofed emails dropped at the perimeter)
   * `pct=100` (Percentage of messages subjected to policy)
   * `rua=mailto:...` (Aggregate reporting endpoint for forensic telemetry)

### Step 4: Passive Verification of Cryptographic DKIM Selectors
1. While DKIM selectors are not enumerable via standard wildcard DNS queries, inspect public security advisory headers or open mailing list archives to identify standard selectors:
   ```bash
   dig +noall +answer TXT 2023._domainkey.apache.org
   ```

---

## 📊 Expected Findings & Deliverables
* Complete entry in `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hashes of command terminal outputs.
* Tabular breakdown of the target's Mail Exchangers and third-party SaaS senders.
* Technical risk assessment: Is the domain vulnerable to spoofing in an executive impersonation attack?
* Admiralty-scored assessment (**A1**) based on cryptographically signed DNS responses.

---

## ⚖️ Ethical & Legal Boundary Invariant
* **Strict Invariant:** Do NOT attempt to send spoofed test emails to test deliverability. All findings must be deduced exclusively from published DNS TXT records.
