# 📂 Case File 15: Certificate Pivoting via Serial Numbers & SKI

**Difficulty:** Intermediate (Score: 5/10)  
**Standard Reference:** `CASE-INT-015`  
**Target Entity:** Public Enterprise Multi-Domain Network (e.g., `wikimedia.org` or `archive.org`)  
**Investigative Focus:** Cryptographic Fingerprinting, Subject Key Identifier (SKI) Pivoting, and Cross-Domain Attribution  

---

## 🎯 Case Objective

When advanced security teams or threat actors configure digital infrastructure, standard domain names and IP addresses can easily be changed or hidden behind reverse proxies. However, cryptographic keys and SSL/TLS certificate attributes—such as the **Subject Key Identifier (SKI)**, **Public Key SHA-256 fingerprint**, and **Certificate Serial Number**—frequently persist across multiple servers and domains.

In this case, the student will extract unique cryptographic identifiers from a target's TLS certificate and execute passive pivots across Certificate Transparency search engines to uncover hidden or unlinked domain properties belonging to the same entity.

---

## 🔍 Available Clues & Starting Point
1. **Target Web Entity:** Primary web endpoint of `wikimedia.org`.
2. **Cryptographic Search Platforms:**
   * [crt.sh](https://crt.sh/)
   * [Censys Search (Certificates Index)](https://search.censys.io/certificates)
   * [Shodan SSL search (ssl.cert.serial)](https://www.shodan.io/)
3. **CLI Tools:** `openssl`, `curl`, `jq`, `sed`.

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Extract TLS Certificate Chain via OpenSSL
1. In your Linux VM, initiate a passive TLS handshake with the target server and extract the leaf certificate:
   ```bash
   openssl s_client -connect www.wikimedia.org:443 -servername www.wikimedia.org -showcerts </dev/null 2>/dev/null | openssl x509 -outform PEM > target_leaf_cert.pem
   ```
2. Verify certificate capture and compute evidence hash:
   ```bash
   sha256sum target_leaf_cert.pem
   ```

### Step 2: Extract Unique Cryptographic Identifiers
1. Parse the Certificate Serial Number:
   ```bash
   openssl x509 -in target_leaf_cert.pem -noout -serial | awk -F'=' '{print $2}' > cert_serial.txt
   cat cert_serial.txt
   ```
2. Extract the Subject Key Identifier (SKI):
   ```bash
   openssl x509 -in target_leaf_cert.pem -noout -text | grep -A1 "X509v3 Subject Key Identifier" | tail -n 1 | tr -d ' ' > cert_ski.txt
   cat cert_ski.txt
   ```
3. Extract the SHA-256 Fingerprint of the Public Key:
   ```bash
   openssl x509 -in target_leaf_cert.pem -noout -pubkey | openssl pkey -pubin -outform DER | openssl dgst -sha256 | awk '{print $2}' > pubkey_sha256.txt
   cat pubkey_sha256.txt
   ```

### Step 3: Execute Passive Pivot on crt.sh and Censys
1. Use the extracted Certificate Serial Number or SKI to query the `crt.sh` database:
   ```bash
   curl -s "https://crt.sh/?serial=$(cat cert_serial.txt)&output=json" > crtsh_serial_pivot.json
   ```
2. In Censys Search, execute a query using the SHA-256 public key hash:
   ```text
   parsed.extension.subject_key_id: "XX:XX:XX..." OR cert.sha256: "..."
   ```
3. Document any newly discovered domains or subdomains covered by the identical cryptographic key that were missing from initial DNS records.

### Step 4: Analyze Multi-Domain Subject Alternative Name (SAN) Clustering
1. Extract all DNS Subject Alternative Names embedded in the certificate:
   ```bash
   openssl x509 -in target_leaf_cert.pem -noout -text | grep -A1 "X509v3 Subject Alternative Name" | tail -n 1 | tr ',' '\n' | sed 's/DNS://g' | sort -u > san_cluster.txt
   ```
2. Identify cross-brand or multi-project domain associations (e.g., `wikipedia.org`, `wiktionary.org`, `wikiquote.org`) sharing the single cryptographic entity.

---

## 📊 Expected Findings & Deliverables
* Complete entry in `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hash of `target_leaf_cert.pem`.
* Cryptographic dossier containing Serial Number, SKI, and Public Key SHA-256.
* Inventory of linked domains discovered strictly via cryptographic certificate pivoting.
* Admiralty-scored assessment (**A1**) based on mathematically verifiable X.509 certificate signatures.

---

## ⚖️ Ethical & Legal Boundary Invariant
* **Strict Invariant:** Do NOT perform active SSL/TLS vulnerability testing (e.g., no `testssl.sh`, Heartbleed scripts, or cipher suite fuzzing). The objective is cryptographic identity mapping, not vulnerability scanning.
