# 📂 Case File 25: Passive Onion Service Infrastructure Profiling

**Difficulty:** Advanced (Score: 7/10)  
**Standard Reference:** `CASE-ADV-025`  
**Target Entity:** Public Defensive Tor Onion Mirror (e.g., The Tor Project's official onion site `2gzyxa5ihm7nsggfxnu52r2cq2g2jiqgahflbbxiiovdx3v3uzzveyd[.]onion` or *DuckDuckGo* onion mirror)  
**Investigative Focus:** Tor Directory Consensus Analysis, V3 Onion Cryptographic Addressing, and TLS Certificate Co-Tenancy  

---

## 🎯 Case Objective

Threat intelligence teams frequently need to analyze how organizations deploy privacy-enhancing onion services, or conversely, how threat actors inadvertently leak origin IP addresses when configuring dark-web extortion portals. Operational security (OPSEC) failures on onion services often arise from shared SSL certificates, timezone leaks in HTTP response headers, or misconfigured reverse proxies that respond with clear-net IP addresses.

In this case, the student will passively profile an official, benign public onion service (e.g., DuckDuckGo's official onion mirror or The Tor Project's mirror) to map its cryptographic properties and verify that its hosting infrastructure does not leak origin IP telemetry.

---

## 🔍 Available Clues & Starting Point
1. **Target Official Onion Mirror:** DuckDuckGo official V3 onion service or Tor Project official onion site.
2. **Public Tor Consensus Aggregators:**
   * [Tor Metrics (metrics.torproject.org)](https://metrics.torproject.org/)
   * [OnionScan (Historical Research Methodology)](https://github.com/s-rah/onionscan)
   * Public Onion Directory Consensus records.
3. **CLI Tools:** `torify`, `curl`, `openssl`, `python3`.

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Analyze V3 Onion Cryptographic Addressing Architecture
1. Note the anatomy of a Version 3 Onion address:
   * Length: Exactly 56 base32 characters.
   * Derivation: A direct base32 encoding of the service's 32-byte Ed25519 public key + checksum + version byte.
2. Verify that V3 onion addresses inherently authenticate the cryptographic identity of the service without relying on centralized Certificate Authorities.

### Step 2: Passive Handshake over Local SOCKS5 Tor Proxy
1. Ensure the Tor service is running within your isolated research VM (`127.0.0.1:9050`).
2. Execute a passive, non-intrusive HTTP header query via `curl` through the Tor proxy:
   ```bash
   curl --socks5-hostname 127.0.0.1:9050 -s -I "https://duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion" > onion_headers.txt
   ```
3. Verify file capture and hash:
   ```bash
   sha256sum onion_headers.txt
   cat onion_headers.txt
   ```

### Step 3: Audit for Operational Security (OPSEC) Leaks
1. Analyze the captured HTTP headers for known OPSEC leakage vectors:
   * **`Server:` Header:** Does it leak specific software builds or OS distributions (e.g., `Apache/2.4.41 (Ubuntu)`)?
   * **`Date:` Header:** Compare the server's reported GMT timestamp against UTC time to detect system clock drift or local timezone offsets.
   * **`Set-Cookie:` Attributes:** Look for session identifiers or load balancer hashes (e.g., `BIG-IP`, `AWSALB`) that indicate enterprise proxy hardware.

### Step 4: Passive TLS Certificate Co-Tenancy Check
1. If the onion service presents an SSL/TLS certificate, extract the Subject Alternative Names (SANs) via OpenSSL:
   ```bash
   echo | openssl s_client -connect duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion:443 -proxy 127.0.0.1:9050 2>/dev/null | openssl x509 -noout -text | grep -A1 "Subject Alternative Name" > onion_cert_sans.txt
   ```
2. Check whether the certificate covers both the `.onion` address and a clear-net `.com` domain:
   * If an onion service shares a certificate with a clear-net domain, the onion service's operator and origin infrastructure are trivially de-anonymized.

---

## 📊 Expected Findings & Deliverables
* Complete entry in `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hash of `onion_headers.txt`.
* OPSEC evaluation matrix detailing header hygiene and clock synchronization.
* Cryptographic certificate co-tenancy analysis.
* Admiralty-scored assessment (**A1**) based on direct cryptographic session responses.

---

## ⚖️ Ethical & Legal Boundary Invariant
* **Strict Invariant:** Do NOT browse illicit dark-web marketplaces, criminal forums, or contraband sites. All lab exercises utilize strictly verified, benign public mirrors (such as DuckDuckGo, Tor Project, or ProPublica's official news onion mirror).
