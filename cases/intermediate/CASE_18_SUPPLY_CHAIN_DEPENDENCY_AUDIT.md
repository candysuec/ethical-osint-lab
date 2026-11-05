# 📂 Case File 18: Open-Source Supply Chain Dependency Auditing

**Difficulty:** Intermediate (Score: 5/10)  
**Standard Reference:** `CASE-INT-018`  
**Target Entity:** Public Open-Source Package Ecosystem (e.g., PyPI or npm public packages)  
**Investigative Focus:** Software Bill of Materials (SBOM) Mining, Dependency Provenance, and Maintainer Hijacking Risks  

---

## 🎯 Case Objective

Software supply chain attacks represent one of the most critical threats in modern enterprise cybersecurity. Threat actors exploit open-source package repositories by hijacking abandoned maintainer accounts, typosquatting popular package names, or committing malicious code to unmaintained dependencies.

In this case, the student will conduct an OSINT supply chain audit on a popular open-source software project (e.g., `requests` on PyPI or `express` on npm) to construct its Software Bill of Materials (SBOM), evaluate maintainer account hygiene, and trace upstream dependency provenance without downloading or executing untrusted payloads.

---

## 🔍 Available Clues & Starting Point
1. **Target Package:** Canonical open-source library on PyPI (e.g., `https://pypi.org/pypi/requests/json`).
2. **Public Package Repositories:**
   * PyPI JSON API (`https://pypi.org/pypi/<package>/json`)
   * Open Source Insights ([deps.dev](https://deps.dev/))
   * OpenSSF Scorecard ([securityscorecards.dev](https://securityscorecards.dev/))
3. **CLI Tools:** `curl`, `jq`, `syft` (or python package parsers).

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Query the PyPI Metadata API
1. Query the target package's official metadata endpoint via CLI:
   ```bash
   curl -s "https://pypi.org/pypi/requests/json" > package_metadata.json
   ```
2. Verify integrity and compute hash:
   ```bash
   sha256sum package_metadata.json
   ```

### Step 2: Extract Maintainer Accounts & GPG / Sigstore Signatures
1. Inspect the author and maintainer fields:
   ```bash
   jq '{name: .info.name, version: .info.version, author: .info.author, author_email: .info.author_email, project_urls: .info.project_urls}' package_metadata.json
   ```
2. Check if the published release wheels include cryptographic signatures or Sigstore provenance attestations:
   ```bash
   jq '.urls[] | {filename: .filename, upload_time: .upload_time_iso_8601, has_sig: .has_sig}' package_metadata.json | head -n 10
   ```

### Step 3: Analyze Direct and Transitive Dependencies
1. Parse the declared runtime dependencies:
   ```bash
   jq -r '.info.requires_dist[]' package_metadata.json | sort -u > runtime_dependencies.txt
   cat runtime_dependencies.txt
   ```
2. For each dependency (e.g., `certifi`, `urllib3`, `idna`, `charset-normalizer`), identify whether any dependency is governed by a single solo maintainer or an established foundation.

### Step 4: Query OpenSSF Scorecard Metrics
1. Use the OpenSSF Scorecard API to evaluate the package's security health:
   ```bash
   curl -s "https://api.securityscorecards.dev/projects/github.com/psf/requests" > scorecard.json
   ```
2. Review automated security hygiene scores:
   * Branch-Protection enforcement.
   * Pinned-Dependencies compliance.
   * Binary-Artifacts hygiene.
   * Vulnerability scanning in CI.

---

## 📊 Expected Findings & Deliverables
* Complete entry in `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hash of `package_metadata.json`.
* Complete Software Bill of Materials (SBOM) for the target package.
* OpenSSF Security Scorecard summary highlighting supply chain resilience.
* Admiralty-scored assessment (**A1**) based on cryptographically signed registry metadata.

---

## ⚖️ Ethical & Legal Boundary Invariant
* **Strict Invariant:** Do NOT install untrusted or unverified third-party packages onto your host system. All package inspection must occur strictly through static JSON APIs or within the isolated research VM.
