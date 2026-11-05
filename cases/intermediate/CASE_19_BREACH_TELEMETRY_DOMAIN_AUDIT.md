# 📂 Case File 19: Public Breach Telemetry & Corporate Domain Exposure

**Difficulty:** Intermediate (Score: 5/10)  
**Standard Reference:** `CASE-INT-019`  
**Target Entity:** Public Enterprise Domain Exposure Telemetry (e.g., historical breach disclosures of major public entities)  
**Investigative Focus:** Passive Breach Statistics, Historical Exposure Timelines, and Identity Hygiene Assessment  

---

## 🎯 Case Objective

When third-party services suffer security breaches, corporate email addresses registered by employees are frequently compromised. Defensive threat intelligence teams monitor aggregate breach telemetry to evaluate credential reuse risks, assess password complexity policies, and mandate credential rotations across affected business units.

In this case, the student will analyze public, aggregate breach telemetry and historical security breach notifications regarding a public entity using defensible services (such as Have I Been Pwned public domain summaries and SEC Item 1.05 cybersecurity disclosures) without accessing or handling illicit credential dumps.

---

## 🔍 Available Clues & Starting Point
1. **Target Organization:** A public corporate entity with historical public disclosures (e.g., Dropbox, LinkedIn, or Fastly).
2. **Public Breach Telemetry Services:**
   * [Have I Been Pwned - Public Breaches Directory](https://haveibeenpwned.com/PwnedWebsites)
   * [SEC EDGAR Form 8-K Item 1.05 (Material Cybersecurity Incidents)](https://www.sec.gov/edgar/searchedgar/companysearch)
   * [Privacy Rights Clearinghouse Chronology of Data Breaches](https://privacyrights.org/data-breaches)
3. **CLI Tools:** `curl`, `jq`.

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Query HIBP Public Breach Metadata API
1. Query the public list of all documented historical data breaches via the HIBP API:
   ```bash
   curl -s "https://haveibeenpwned.com/api/v3/breaches" > all_breaches.json
   ```
2. Verify integrity and compute evidence hash:
   ```bash
   sha256sum all_breaches.json
   ```

### Step 2: Filter for Specific Industry Sectors or Corporate Breaches
1. Search the breach database for historical incidents affecting the target organization or its major SaaS vendors:
   ```bash
   jq '.[] | select(.Domain=="dropbox.com" or .Domain=="linkedin.com") | {Name: .Name, Title: .Title, BreachDate: .BreachDate, PwnCount: .PwnCount, DataClasses: .DataClasses}' all_breaches.json
   ```
2. Parse the compromised `DataClasses`:
   * Are passwords hashed with legacy, breakable algorithms (e.g., plain MD5/SHA-1) or modern adaptive functions (bcrypt/Argon2)?
   * Were secondary attributes exposed (e.g., IP addresses, phone numbers, password hints)?

### Step 3: Analyze SEC Form 8-K Item 1.05 Filings
1. In December 2023, the SEC mandated that public companies disclose material cybersecurity incidents on Form 8-K under Item 1.05 within four business days.
2. Query EDGAR for recent Item 1.05 disclosures:
   * Document the nature of the incident, affected systems, and corporate impact stated under penalty of securities fraud.

### Step 4: Synthesize Credential Hygiene Recommendations
1. Formulate risk mitigation strategies based strictly on the telemetry:
   * Phishing-resistant MFA (FIDO2 / WebAuthn / Passkeys).
   * Passwordless enterprise authentication rollout.
   * Single Sign-On (SSO) session timeout hardening.

---

## 📊 Expected Findings & Deliverables
* Complete entry in `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hash of `all_breaches.json`.
* Chronological breach exposure timeline detailing affected data classes and cryptographic hashing standards.
* Analysis of public corporate disclosures vs. external breach telemetry.
* Admiralty-scored assessment (**A1**) based on verified first-party and aggregator disclosures.

---

## ⚖️ Ethical & Legal Boundary Invariant
* **Strict Invariant:** Do NOT purchase, trade, or download raw credential dumps, combo lists, or stolen database files from dark web forums or Telegram channels. All analysis must rely exclusively on sanitized, high-level public breach metadata.
