# 📂 Case File 28: Malware C2 Tracking via JARM Fingerprint Pivoting

**Difficulty:** Advanced (Score: 8/10)  
**Standard Reference:** `CASE-ADV-028`  
**Target Entity:** Public Threat Intelligence Telemetry & Synthetic C2 Fingerprint Datasets (e.g., Cobalt Strike, Mythic, or Sliver JARM signatures)  
**Investigative Focus:** Active/Passive TLS Fingerprinting (JARM), Command and Control (C2) Hunting, and Shodan/Censys Search Pivoting  

---

## 🎯 Case Objective

When adversaries deploy Command and Control (C2) frameworks such as Cobalt Strike, Sliver, or Metasploit on cloud servers, the underlying TLS stack generates a highly distinctive signature. **JARM** is an active TLS server fingerprinting tool developed by Salesforce that sends 10 customized TLS Client Hello packets to a target server and analyzes the specific cryptographic parameters returned, hashing them into a unique 62-character string.

Because standard C2 server distributions default to identical Java or Go cryptographic libraries, their JARM hashes are unique and easily trackable across the internet. In this case, the student will use known, declassified C2 JARM fingerprints to hunt for adversary infrastructure clusters across public search engines without connecting to the C2 endpoints.

---

## 🔍 Available Clues & Starting Point
1. **Target JARM Fingerprint Signature:** Known default Cobalt Strike or Metasploit JARM signature:
   * Cobalt Strike (Default): `07d14d16d21d21d07c42d41d00041d24a458a375eef0c576d23a7bab9a9fb1`
   * Metasploit (Default): `28d28d28d00028d00042d42d000000a944510b64d396ecf7b4ea47bc954f21`
2. **Search Aggregators:**
   * [Shodan.io (`ssl.jarm:...`)](https://www.shodan.io/)
   * [Censys Search (`services.jarm.fingerprint:...`)](https://search.censys.io/)
   * [ThreatFox (Abuse.ch)](https://threatfox.abuse.ch/)
3. **CLI Tools:** `curl`, `jq`, `python3`.

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Query ThreatFox for Confirmed Malicious JARM Associations
1. In your Linux VM, query the ThreatFox API for active C2 indicators associated with known C2 frameworks:
   ```bash
   curl -s -X POST -d '{"query":"tag_info","tag":"CobaltStrike"}' "https://threatfox-api.abuse.ch/api/v1/" > threatfox_cs.json
   ```
2. Verify integrity and compute hash:
   ```bash
   sha256sum threatfox_cs.json
   ```

### Step 2: Correlate JARM Hashes with ASNs and Bulletproof Hosters
1. Extract the IP addresses and port numbers from ThreatFox:
   ```bash
   jq '.data[] | {ioc: .ioc, mal_type: .malware_printable, first_seen: .first_seen}' threatfox_cs.json | head -n 15
   ```
2. In Censys or Shodan, execute a query filtering by the specific JARM hash and an ASN known for bulletproof hosting or cheap cloud VPS providers:
   ```text
   services.jarm.fingerprint: "07d14d16d21d21d07c42d41d00041d24a458a375eef0c576d23a7bab9a9fb1" AND location.country_code: "RU"
   ```

### Step 3: Filter Out Legitimate Cloud CDN Collisions
1. It is critical to recognize that popular multi-tenant services (e.g., Cloudflare, AWS CloudFront) share single JARM hashes across millions of benign domains.
2. Formulate filtering heuristics:
   * Discard any JARM match that resides on major CDN ASNs (e.g., AS13335 Cloudflare).
   * Focus exclusively on independent `/24` subnets hosted on offshore or unmanaged VPS providers.

### Step 4: Construct Snort / Suricata Defensive Signatures
1. Translate the identified C2 IP cluster into defensive network signatures:
   ```text
   alert tls any any -> [DISCOVERED_C2_IPS] 443 (msg:"POTENTIAL COBALT STRIKE C2 CONNECTION DETECTED"; flow:to_server,established; classtype:trojan-activity; sid:1000001; rev:1;)
   ```

---

## 📊 Expected Findings & Deliverables
* Complete entry in `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hash of `threatfox_cs.json`.
* Cluster of correlated C2 server IPs sharing the target JARM fingerprint.
* False-positive filtration analysis eliminating CDN collisions.
* Admiralty-scored assessment (**B2**) based on threat intelligence repository telemetry.

---

## ⚖️ Ethical & Legal Boundary Invariant
* **Strict Invariant:** Do NOT send exploit beacons, reverse-shell connections, or interactive probes to the identified C2 IPs. All data collection must occur passively through threat intelligence feeds and index queries.
