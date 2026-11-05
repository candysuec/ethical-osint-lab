# 📂 Case File 21: Adversary Threat Group Infrastructure Clustering

**Difficulty:** Advanced (Score: 7/10)  
**Standard Reference:** `CASE-ADV-021`  
**Target Entity:** Public Threat Intelligence Telemetry & Synthetic Adversary Dataset (e.g., CISA Cybersecurity Advisory / MITRE ATT&CK Group G0096)  
**Investigative Focus:** Diamond Model Threat Attribution, Passive IOC Clustering, and Infrastructure Pivoting  

---

## 🎯 Case Objective

Advanced Threat Intelligence analysts do not merely document individual Indicators of Compromise (IOCs); they cluster disparate infrastructure components into unified adversary campaign models. By applying the Diamond Model of Intrusion Analysis (Adversary, Capability, Infrastructure, Victim) and analyzing passive DNS, registrar patterns, and shared hosting nodes, analysts can identify attacker staging environments before phishing emails or malware payloads are launched.

In this case, the student will take a seed set of declassified IOCs from a public government advisory (e.g., CISA, FBI, or CERT-EU) and execute multi-variable pivots across passive threat telemetry to uncover an adversary's unreleased infrastructure cluster.

---

## 🔍 Available Clues & Starting Point
1. **Seed Advisory:** CISA Alert / Cybersecurity Advisory (e.g., AA23-347A) or public MITRE ATT&CK threat group profile.
2. **Initial Seed IOCs:**
   * Malicious Domain: `secure-corporate-auth[.]com` (synthetic or decommissioned)
   * Seed IP: `198.51.100.42`
   * SHA-256 Hash of Staging Binary.
3. **Public Threat Intel Platforms:**
   * [AlienVault OTX (Open Threat Exchange)](https://otx.alienvault.com/)
   * [URLhaus (Abuse.ch)](https://urlhaus.abuse.ch/)
   * [ThreatMiner](https://www.threatminer.org/)
   * [VirusTotal (Free Research Tier / Public Comments)](https://www.virustotal.com/)
4. **CLI Tools:** `curl`, `jq`, `python3`.

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Ingest and Validate Seed Indicators
1. Create a structured JSON file containing the seed indicators:
   ```json
   {
     "campaign": "Operation PhishShield",
     "seed_domain": "secure-corporate-auth.com",
     "seed_ip": "198.51.100.42"
   }
   ```
2. Compute the cryptographic hash:
   ```bash
   sha256sum seed_indicators.json
   ```

### Step 2: Passive DNS Temporal Expansion
1. Query historical passive DNS (pDNS) repositories to discover all domains that historically resolved to `198.51.100.42` within a 60-day window of the campaign launch:
   ```bash
   curl -s "https://otx.alienvault.com/api/v1/indicators/IPv4/198.51.100.42/passive_dns" > pdns_results.json
   jq '.passive_dns[] | {hostname: .hostname, first: .first, last: .last}' pdns_results.json
   ```
2. Identify naming convention themes (e.g., brand typos, Okta/SSO login lures, HR portal lures).

### Step 3: Pivot Across Registrar and SSL/TLS Fingerprints
1. Extract the SSL certificate serial number or JARM hash historically active on the seed host:
   * Query Censys or Shodan historical records for matching TLS configurations.
2. Note any domains sharing the same cheap bulletproof hosting ASN, identical name server pairs, or specific Fast-Flux TTL configurations (e.g., 60-second TTLs).

### Step 4: Map Findings to Diamond Model & MITRE ATT&CK
1. Construct the Diamond Model:
   * **Adversary:** Unattributed Cluster / Suspected Nation-State or E-Crime Syndicate.
   * **Capability:** Credential Harvester / Reverse Proxy Phishing (Evilginx2).
   * **Infrastructure:** 14 clustered domains, 3 hosting providers, Fast-Flux DNS.
   * **Victim:** Global technology enterprise workforce.
2. Map to MITRE ATT&CK Techniques:
   * `T1584.004` (Compromise Infrastructure: Server)
   * `T1583.001` (Acquire Infrastructure: Domains)
   * `T1566.002` (Phishing: Spearphishing Link)

---

## 📊 Expected Findings & Deliverables
* Complete entry in `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hash of `pdns_results.json`.
* Diamond Model Intrusion Diagram and infrastructure correlation matrix.
* High-confidence IOC ledger (Domains, IPs, Hashes) ready for ingestion into SIEM/MISP rules.
* Admiralty-scored assessment (**B2**) reflecting vetted threat intelligence telemetry.

---

## ⚖️ Ethical & Legal Boundary Invariant
* **Strict Invariant:** Do NOT interact with live command-and-control servers or click active malicious phishing links. All data collection must occur through passive third-party intelligence feeds and quarantined sandbox records.
