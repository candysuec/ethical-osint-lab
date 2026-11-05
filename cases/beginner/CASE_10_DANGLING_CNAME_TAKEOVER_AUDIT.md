# 📂 Case File 10: Dangling CNAME & Expiring Cloud Asset Audit

**Difficulty:** Beginner (Score: 3/10)  
**Standard Reference:** `CASE-BEG-010`  
**Target Entity:** Public Foundation or Enterprise (e.g., historical records of `wikimedia.org` or synthetic practice datasets)  
**Investigative Focus:** Passive DNS Canonical Name (CNAME) Verification, Orphaned Cloud Services, and Attack Surface Exposure  

---

## 🎯 Case Objective

When organizations decommission cloud services (such as AWS S3 buckets, GitHub Pages, Heroku dynos, Zendesk support portals, or Azure web apps), administrators frequently delete the underlying cloud resource but forget to remove the pointing DNS `CNAME` record. This creates a "Dangling CNAME" or Subdomain Takeover vulnerability, where an adversary could claim the abandoned cloud bucket and host arbitrary phishing content on the organization's legitimate subdomain.

In this case, the student will passively audit a target organization's DNS CNAME records to detect orphaned third-party pointers using passive DNS verification without claiming or altering any cloud resource.

---

## 🔍 Available Clues & Starting Point
1. **Target Subdomain List:** Subdomain roster compiled in `CASE-BEG-003` (Certificate Transparency logs).
2. **Third-Party Signature Patterns:**
   * AWS S3: `*.s3.amazonaws.com` or `*.s3-website-*.amazonaws.com`
   * GitHub Pages: `*.github.io`
   * Heroku: `*.herokuapp.com`
   * Azure: `*.azurewebsites.net`
   * Zendesk: `*.zendesk.com`
3. **CLI Tools:** `dig`, `host`, `curl -I`, `jq`.

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Filter Subdomains for CNAME Records
1. From your extracted subdomain list (e.g., `subdomains_extracted.txt`), run a passive batch query to identify records with `CNAME` aliases:
   ```bash
   while read -r sub; do
       res=$(dig +noall +answer CNAME "$sub")
       if [ -n "$res" ]; then
           echo "$res" >> cname_records.txt
       fi
   done < high_value_targets.txt
   ```
2. Inspect `cname_records.txt` to identify which subdomains point to third-party cloud SaaS providers.

### Step 2: Query Authoritative Resolution of Cloud Endpoints
1. For each identified CNAME, check if the destination hostname resolves to an active IP address (`A` or `AAAA` record):
   ```bash
   dig +short A target-subdomain.s3-website-us-east-1.amazonaws.com
   ```
2. If the destination cloud hostname returns `NXDOMAIN` (Non-Existent Domain) or fails to resolve while the parent domain's CNAME still points to it, flag the asset as a **Potential Dangling Pointer**.

### Step 3: Passive HTTP Header Inspection
1. Send a passive, non-intrusive `HEAD` request to observe the server's HTTP response code and canonical error headers:
   ```bash
   curl -s -I -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) OSINT-Audit/1.0" "https://subdomain.target.org" | head -n 15 > http_header_response.txt
   ```
2. Check for signature error messages from known SaaS providers:
   * **AWS S3:** `NoSuchBucket` (The specified bucket does not exist)
   * **GitHub Pages:** `There isn't a GitHub Pages site here.` (404)
   * **Heroku:** `No such app` (Heroku error page)
   * **Zendesk:** `Help Center Closed`

### Step 4: Classify Risk and Formulate Defensive Remediation
1. Formulate the technical remediation guidance:
   * **Action 1 (Immediate):** Remove the dangling CNAME record from authoritative DNS zone files.
   * **Action 2 (Preventative):** Enforce infrastructure-as-code (Terraform/CloudFormation) lifecycle policies where DNS records are automatically destroyed alongside cloud resource termination.

---

## 📊 Expected Findings & Deliverables
* Complete entry in `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hash of `cname_records.txt` and `http_header_response.txt`.
* Table of identified CNAME aliases mapped against third-party SaaS cloud endpoints.
* Defensive report identifying any orphaned or dangling pointers.
* Admiralty-scored assessment (**A1**) based on verifiable DNS query outputs.

---

## ⚖️ Ethical & Legal Boundary Invariant
* **Strict Invariant:** Do NOT attempt to register, purchase, or claim the abandoned bucket, app name, or cloud instance. Registering third-party resources under an organization's domain without explicit written authorization crosses from passive auditing into unauthorized exploitation.
