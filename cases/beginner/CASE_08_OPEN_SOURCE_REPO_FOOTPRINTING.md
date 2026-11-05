# 📂 Case File 08: Open-Source Code Repository Footprinting

**Difficulty:** Beginner (Score: 3/10)  
**Standard Reference:** `CASE-BEG-008`  
**Target Entity:** Public GitHub Organization (e.g., `apache` or `github.com/torvalds/linux`)  
**Investigative Focus:** Passive Git History Analysis, Developer Email Conventions, and CI/CD Infrastructure Discovery  

---

## 🎯 Case Objective

Modern enterprises maintain extensive public open-source software (OSS) repositories on platforms like GitHub, GitLab, and Bitbucket. Developers frequently commit code that inadvertently exposes internal naming conventions, test infrastructure URLs, developer email addresses, corporate domain variations, and CI/CD automation pipelines.

In this case, the student will inspect a public software foundation repository using native `git` CLI forensics to map internal development infrastructure, email formatting patterns, and technology dependencies without probing the company's internal networks.

---

## 🔍 Available Clues & Starting Point
1. **Target Public Repo:** An official open-source repository (e.g., `https://github.com/apache/kafka` or `https://github.com/curl/curl`).
2. **Platform APIs:** GitHub Public REST API (`https://api.github.com/orgs/apache/repos`).
3. **CLI Tools:** `git`, `curl`, `jq`, `grep`, `awk`, `sort`.

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Clone Repository Commit History (Metadata Only)
1. In your Linux VM, perform a shallow clone or metadata-only clone to conserve bandwidth:
   ```bash
   git clone --depth 100 --no-single-branch https://github.com/curl/curl.git
   cd curl
   ```
2. Verify local repository status and calculate evidence hash of the HEAD commit:
   ```bash
   git rev-parse HEAD > head_commit.sha
   cat head_commit.sha
   ```

### Step 2: Extract Developer Email Formats & Corporate Domains
1. Extract unique contributor names and email domains from the commit log:
   ```bash
   git log --pretty=format:"%an <%ae>" | sort -u | head -n 30 > contributors.txt
   ```
2. Extract unique email domains:
   ```bash
   git log --pretty=format:"%ae" | awk -F'@' '{print $2}' | sort -u > contributor_domains.txt
   ```
3. Analyze whether contributors use personal email addresses (Gmail, Proton) or corporate enterprise domains (e.g., `@haxx.se`, `@redhat.com`, `@apple.com`).

### Step 3: Passive Inspection of CI/CD Workflow Pipelines
1. Inspect public workflow definitions in `.github/workflows/`:
   ```bash
   ls -la .github/workflows/
   ```
2. Search for references to external build artifacts, cloud runners, Docker container registries, or test matrix endpoints:
   ```bash
   grep -riE "(docker\.pkg|registry|s3\.amazonaws|azure|runner)" .github/workflows/ > cicd_dependencies.txt
   ```

### Step 4: Search Commit Messages for Deprecated Infrastructure References
1. Query commit messages for terms indicating server decommissionings, URL changes, or bug reports:
   ```bash
   git log --grep="decommission" --grep="deprecated" --grep="endpoint" --oneline -n 10
   ```
2. Document any internal hostname syntax, bug tracking URLs (e.g., Jira instances), or staging endpoints mentioned in commit descriptions.

---

## 📊 Expected Findings & Deliverables
* Complete entry in `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hash of the Git HEAD commit.
* Corporate email convention analysis (e.g., `first.last@domain.com` vs. `username@domain.com`).
* Catalog of third-party CI/CD runners, container registries, and test infrastructures utilized by the project.
* Admiralty-scored assessment (**A1**) based on cryptographically signed Git commit records.

---

## ⚖️ Ethical & Legal Boundary Invariant
* **Strict Invariant:** Do NOT scrape private contact numbers, send unsolicited messages to contributors, or look for leaked API keys to test against active services. This investigation focuses strictly on understanding development workflows and external dependencies.
