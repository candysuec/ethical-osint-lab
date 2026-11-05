# 📂 Case File 13: Reverse IP & Shared Hosting Infrastructure Discovery

**Difficulty:** Intermediate (Score: 4/10)  
**Standard Reference:** `CASE-INT-013`  
**Target Entity:** Public Shared Infrastructure Host or Multi-Tenant Web Cluster  
**Investigative Focus:** Passive Reverse IP Lookups, Virtual Host Co-Tenancy, and Lateral Neighbor Risk  

---

## 🎯 Case Objective

Modern web applications frequently operate on multi-tenant cloud hosting environments or Content Delivery Networks (CDNs) where hundreds of unrelated domains resolve to the exact same physical IP address. Conversely, specialized dedicated servers host only domains belonging to a single parent corporation.

In this case, the student will perform passive reverse IP lookups to determine whether an enterprise's external web servers are deployed on dedicated, sovereign infrastructure or hosted on shared, multi-tenant third-party clusters, evaluating the collateral risk of neighboring co-hosted domains.

---

## 🔍 Available Clues & Starting Point
1. **Target IP Address:** Discovered IP address of an enterprise auxiliary service or subsidiary website.
2. **Passive Reverse IP Repositories:**
   * [HackerTarget Reverse IP Lookup](https://hackertarget.com/reverse-ip-lookup/)
   * [ViewDNS.info Reverse IP](https://viewdns.info/reverseip/)
   * [AlienVault OTX (Open Threat Exchange)](https://otx.alienvault.com/)
3. **CLI Tools:** `dig`, `curl`, `jq`, `sort`.

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Resolve Target Domain to IPv4 Address
1. Resolve the target domain to its live A record:
   ```bash
   dig +short A target-subsidiary.org
   ```
2. Verify whether the IP belongs to a major CDN (e.g., Cloudflare, Akamai, CloudFront) or a traditional hosting provider (e.g., DigitalOcean, Linode/Akamai, Hetzner, AWS EC2).

### Step 2: Query Passive Reverse IP Aggregators
1. Using HackerTarget's free API, retrieve domains sharing the target IP:
   ```bash
   curl -s "https://api.hackertarget.com/reverseiplookup/?q=TARGET_IP" > shared_domains.txt
   ```
2. Count the total co-hosted domains:
   ```bash
   wc -l shared_domains.txt
   head -n 20 shared_domains.txt
   ```

### Step 3: Analyze Co-Tenancy Architecture
1. **Scenario A (Dedicated Server):** All discovered domains belong to the target entity or its direct subsidiaries (e.g., `brand-marketing.com`, `careers-brand.com`, `brand-portal.com`). This indicates a dedicated cloud instance managed by the corporate IT team.
2. **Scenario B (Shared / Virtual Host Multi-Tenant):** Discovered domains belong to disparate third-party entities (e.g., restaurants, local businesses, blogs). This indicates a low-cost or unmanaged shared hosting plan, exposing the corporate brand to reputation or IP-blacklisting risks caused by malicious neighbors.
3. **Scenario C (Global Anycast CDN):** Thousands of unrelated domains resolve to the same IP. This confirms the presence of an Anycast CDN layer (e.g., Cloudflare or Fastly) shielding the origin server.

### Step 4: Verify Origin Server Exposure
1. Query historical DNS records to determine if the target domain previously resolved to an unshielded origin IP prior to the CDN deployment:
   ```bash
   curl -s "https://api.securitytrails.com/v1/history/target-subsidiary.org/dns/a" > historical_a_records.json
   ```
2. Document whether the origin server was ever directly exposed to the internet.

---

## 📊 Expected Findings & Deliverables
* Complete entry in `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hash of `shared_domains.txt`.
* Architectural classification: Dedicated Host vs. Multi-Tenant Shared Server vs. Anycast CDN.
* Lateral risk assessment summarizing whether neighboring domains pose reputation or reputation-blocklist hazards.
* Admiralty-scored assessment (**B2**) reflecting reliable public aggregation sources.

---

## ⚖️ Ethical & Legal Boundary Invariant
* **Strict Invariant:** Do NOT scan, ping, or initiate network connections to any third-party "neighbor" domains discovered during reverse IP lookups. The inquiry is limited to classifying infrastructure tenancy.
