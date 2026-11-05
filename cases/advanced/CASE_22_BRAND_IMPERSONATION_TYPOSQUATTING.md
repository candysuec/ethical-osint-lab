# 📂 Case File 22: Brand Impersonation & Typosquatting Threat Matrix

**Difficulty:** Advanced (Score: 6/10)  
**Standard Reference:** `CASE-ADV-022`  
**Target Entity:** Public Enterprise Brand (e.g., `fastly.com` or `wikimedia.org`)  
**Investigative Focus:** Permutation Algorithms (Homoglyph, Bitsquatting, Omisssion), Active Phishing Triage, and Takedown Readiness  

---

## 🎯 Case Objective

Phishing adversaries frequently register domain variations of legitimate enterprise brands to deceive employees, partners, and customers. These variations exploit human perceptual limits (homoglyph/IDN attacks), keyboard layout typos (transposition/omission), or hardware bit-flips in memory (bitsquatting).

In this case, the student will deploy algorithmic permutation engines (`dnstwist`) to generate a complete typosquatting threat matrix for an enterprise brand, triage which domains are actively weaponized with mail servers or live websites, and compile an executive brand defense dossier.

---

## 🔍 Available Clues & Starting Point
1. **Target Brand Domain:** `fastly.com` or `wikimedia.org`.
2. **Analysis Tools:** `dnstwist`, `dig`, `curl`, `whois`, `python3`.
3. **Public Registries:** ICANN RDAP, Certificate Transparency logs.

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Run Algorithmic Permutation Matrix via DNSTwist
1. In your Linux VM, run `dnstwist` in registered-only mode with multi-threading:
   ```bash
   dnstwist --registered --format json fastly.com > dnstwist_registered.json
   ```
2. Verify output integrity and compute the SHA-256 hash:
   ```bash
   sha256sum dnstwist_registered.json
   ```

### Step 2: Categorize Permutation Attack Vectors
1. Parse the discovered active domains by attack algorithm:
   ```bash
   jq -r '.[] | "\(.fuzzer): \(.domain-name)"' dnstwist_registered.json | sort | uniq -c
   ```
2. Identify the specific fuzzer techniques:
   * **Homoglyphs / IDN:** Using Cyrillic or Greek characters visually identical to Latin letters (e.g., `fаstly.com` where `а` is Cyrillic `U+0430`).
   * **Bitsquatting:** Domains differing by exactly 1 binary bit (e.g., `fastlx.com`).
   * **Omission / Transposition:** Common fast-typing errors (e.g., `fatly.com`, `fsatly.com`).
   * **Combosquatting:** Appending security keywords (e.g., `fastly-sso.com`, `fastly-login.com`).

### Step 3: Triage Weaponized Infrastructure (MX & A Records)
1. Filter the registered domains to identify those with active Mail Exchanger (`MX`) records:
   ```bash
   jq -r '.[] | select(.["mx-host"] != null) | {domain: .["domain-name"], mx: .["mx-host"], ip: .["dns-a"]}' dnstwist_registered.json > weaponized_mail_domains.json
   ```
2. Domains with active MX records are prime candidates for active spearphishing campaigns (e.g., receiving replies from duped victims).

### Step 4: Formulate Defensive Response & UDRP Strategy
1. Cross-reference registrant data:
   * Are these defensive registrations owned by the target brand's corporate registrar (MarkMonitor, CSC)?
   * Or are they registered via anonymous retail registrars (Namecheap, Tucows)?
2. Draft actionable defensive countermeasures:
   * Defensive blocklisting in corporate email gateways (Proofpoint, Microsoft Defender).
   * Preparation of Uniform Domain-Name Dispute-Resolution Policy (UDRP) or registrar abuse notifications.

---

## 📊 Expected Findings & Deliverables
* Complete entry in `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hash of `dnstwist_registered.json`.
* Matrix of active typosquatting domains classified by fuzzer type.
* Prioritized alert list of domains with live MX records configured for inbound/outbound email.
* Admiralty-scored assessment (**A1**) based on live DNS resolution data.

---

## ⚖️ Ethical & Legal Boundary Invariant
* **Strict Invariant:** Do NOT send test emails, web requests, or malicious traffic to the registered typosquatted domains. All triage must rely solely on DNS resolution records provided by `dnstwist` and public RDAP.
