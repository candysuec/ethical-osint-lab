# 📂 Case File 12: Historical WHOIS Pivoting & Registrant Tracking

**Difficulty:** Intermediate (Score: 4/10)  
**Standard Reference:** `CASE-INT-012`  
**Target Entity:** Historical Corporate Acquisition Target (e.g., historical domain records prior to GDPR privacy redaction)  
**Investigative Focus:** Historical WHOIS Archaeology, Registrar Drift, and Organizational Footprinting  

---

## 🎯 Case Objective

Following the European Union's General Data Protection Regulation (GDPR) enforcement in May 2018, modern WHOIS records overwhelmingly redact registrant names, telephone numbers, and email addresses behind privacy services (e.g., "Withheld for Privacy", "Domains By Proxy"). However, historical WHOIS records collected prior to 2018 often contain unredacted registrant details, corporate administrative contact addresses, and legacy registrar accounts.

In this case, the student will pivot across historical WHOIS databases to trace domain ownership changes, identify the original corporate registrant of an acquired entity, and uncover legacy technical contact handles.

---

## 🔍 Available Clues & Starting Point
1. **Target Historical Domain:** A known acquired enterprise domain (e.g., `github.com` or `fastly.com`).
2. **Archival & WHOIS Services:**
   * [Whoxy.com Historical Search](https://www.whoxy.com/)
   * [ViewDNS.info WHOIS History](https://viewdns.info/)
   * [DomainTools Historical WHOIS (Free research tier / sample data)](https://www.domaintools.com/)
   * ICANN Registration Data Access Protocol (RDAP).
3. **CLI Tools:** `whois`, `curl`, `jq`.

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Query Current RDAP / WHOIS Baseline
1. Query the modern, privacy-shielded RDAP record via CLI:
   ```bash
   curl -s "https://rdap.verisign.com/com/v1/domain/fastly.com" | jq '.entities[] | {role: .roles, handle: .handle}'
   ```
2. Note how current registrar data is masked behind proxy or corporate counsel entities.

### Step 2: Query Historical WHOIS Caches
1. Access a historical WHOIS aggregation engine (e.g., Whoxy API or ViewDNS):
   ```bash
   curl -s "https://api.whoxy.com/?key=DEMO_SEARCH&history=fastly.com" > whois_history.json
   ```
2. Analyze snapshots from 2011 to 2017:
   * Identify the original registering corporate entity name.
   * Note original administrative and technical contact email addresses (e.g., `ops@domain.com`, `hostmaster@domain.com`).
   * Extract historical registrar names (e.g., GoDaddy $\rightarrow$ MarkMonitor / CSC Corporate Domains).

### Step 3: Pivot on Historical Contact Handles
1. Use the discovered historical corporate email handle to query reverse WHOIS registries:
   * How many other domains were historically registered by the exact same administrative email address or organization handle?
2. Document forgotten microsites, campaign landing pages, or legacy testing domains registered during the company's early funding rounds.

### Step 4: Map Registrar Security Migration
1. Document the migration timeline when the enterprise transitioned from retail registrars (GoDaddy, Namecheap) to enterprise brand-protection registrars (MarkMonitor, CSC Corporate Domains, Safenames).
2. Note whether DNSSEC was implemented during or after this transition.

---

## 📊 Expected Findings & Deliverables
* Complete entry in `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hash of `whois_history.json`.
* Chronological timeline of domain ownership changes and registrar transfers.
* Cluster of legacy or subsidiary domains historically tied to the same administrative contact.
* Admiralty-scored assessment (**B2**) reflecting reputable third-party historical WHOIS aggregators.

---

## ⚖️ Ethical & Legal Boundary Invariant
* **Strict Invariant:** Do NOT target personal contact details of private individuals. Target strictly the corporate administrative and operations email aliases disclosed in historical public domain records.
