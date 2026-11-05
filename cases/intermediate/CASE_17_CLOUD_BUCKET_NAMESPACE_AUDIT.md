# 📂 Case File 17: Cloud Storage Bucket Enumeration & Namespace Analysis

**Difficulty:** Intermediate (Score: 5/10)  
**Standard Reference:** `CASE-INT-017`  
**Target Entity:** Public Foundation or Enterprise (e.g., public release mirrors of `wikimedia` or `apache`)  
**Investigative Focus:** Passive Object Storage Namespace Mapping, Cloud Provider Signature Analysis, and Access Policy Verification  

---

## 🎯 Case Objective

Cloud object storage (Amazon AWS S3, Google Cloud Storage, Microsoft Azure Blob Storage) is ubiquitous in modern application architecture. Organizations frequently name cloud buckets after internal project codes, corporate brands, and staging environments (e.g., `company-backup`, `company-dev`, `company-assets`). 

In this case, the student will passively deduce and verify public cloud storage bucket naming conventions used by a target foundation using public DNS records, website source code assets, and public cloud URL structure patterns without downloading private data or brute-forcing unauthorized repositories.

---

## 🔍 Available Clues & Starting Point
1. **Target Organization:** Wikimedia Foundation or Apache Software Foundation.
2. **Canonical Cloud Storage Patterns:**
   * AWS S3: `https://[bucket-name].s3.amazonaws.com/` or `https://s3.[region].amazonaws.com/[bucket-name]/`
   * Google Cloud Storage: `https://storage.googleapis.com/[bucket-name]/`
   * Azure Blob: `https://[account-name].blob.core.windows.net/[container-name]/`
3. **CLI Tools:** `curl`, `jq`, `grep`, `openssl`.

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Passive Mining of Public Web Assets for Storage References
1. In your Linux VM, inspect the target's public website HTML source code for media assets or download links hosted on cloud object storage:
   ```bash
   curl -s -L "https://www.wikimedia.org" | grep -oEi 'https://[a-zA-Z0-9_\-\.]+\.(s3\.amazonaws\.com|storage\.googleapis\.com|blob\.core\.windows\.net)[^"'\'' ]*' | sort -u > discovered_cloud_assets.txt
   ```
2. Parse the root bucket or container names from the discovered URLs:
   ```bash
   awk -F'/' '{print $3}' discovered_cloud_assets.txt | sort -u > bucket_hostnames.txt
   cat bucket_hostnames.txt
   ```

### Step 2: Deducing Organizational Bucket Naming Conventions
1. Analyze the pattern observed in legitimate public buckets:
   * Do they use brand prefixes (e.g., `org-wikimedia-*`, `apache-downloads-*`)?
   * Do they append environmental identifiers (`-prod`, `-static`, `-media`)?
2. Document the naming scheme in your evidence notes.

### Step 3: Passive Evaluation of Bucket Permissions via HTTP HEAD
1. Issue a non-intrusive HTTP `HEAD` or unauthenticated `GET` request to inspect bucket ACL policies:
   ```bash
   curl -s -I "https://storage.googleapis.com/wikimediacommons-releases" > bucket_headers.txt
   head -n 15 bucket_headers.txt
   ```
2. Interpret the response code:
   * **`404 Not Found`:** Bucket does not exist or namespace is unclaimed.
   * **`403 Forbidden`:** Bucket exists and is properly locked down (Access Denied / Private).
   * **`200 OK` (with XML Directory Listing):** Publicly readable bucket; all object keys are enumerable.
   * **`200 OK` (Direct File only):** Single public asset readable, but root listing is restricted.

### Step 4: Map Multi-Cloud Redundancy
1. Check if the organization utilizes multi-cloud object replication across both AWS and Google Cloud:
   * Identify matching bucket prefixes on alternate cloud provider domains.

---

## 📊 Expected Findings & Deliverables
* Complete entry in `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hash of `discovered_cloud_assets.txt`.
* Documented Cloud Storage Naming Taxonomy for the organization.
* Policy evaluation report verifying whether public buckets enforce proper restrictive ACLs or leak directory listings.
* Admiralty-scored assessment (**A1**) based on server HTTP headers.

---

## ⚖️ Ethical & Legal Boundary Invariant
* **Strict Invariant:** Do NOT download, exfiltrate, or inspect private internal files if a bucket is accidentally left world-readable. If sensitive data is discovered, immediately cease collection, log the URL, and follow coordinated vulnerability disclosure rules.
