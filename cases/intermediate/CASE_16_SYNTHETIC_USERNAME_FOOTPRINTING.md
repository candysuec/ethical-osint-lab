# 📂 Case File 16: Technical Username Footprinting & Persona Correlation

**Difficulty:** Intermediate (Score: 4/10)  
**Standard Reference:** `CASE-INT-016`  
**Target Entity:** Public Open-Source Bot / CTF Synthetic Handle (e.g., `dependabot`, `ossf-bot`, or synthetic CTF profile `cyberdefender-recon-01`)  
**Investigative Focus:** Passive Cross-Platform Username Correlation, Identity Triangulation, and False Positive Elimination  

---

## 🎯 Case Objective

In cybersecurity threat intelligence, tracking technical handles (such as maintainer handles, automation bots, and synthetic CTF adversary profiles) across multiple platforms is a core investigative skill. Analysts must determine whether identical usernames across disparate services (GitHub, Docker Hub, Keybase, HackerOne, PyPI) represent the same underlying entity or are merely coincidence (homoglyph/impersonation collisions).

In this case, the student will use tools like `sherlock` and `maigret` against a designated public software foundation bot or synthetic CTF handle, executing strict verification criteria to filter out false-positive profile matches.

---

## 🔍 Available Clues & Starting Point
1. **Target Handle:** Public Open-Source Project Automation Bot (`dependabot[bot]` / `ossf-bot`) or synthetic training handle.
2. **Investigation Platforms:** GitHub, Docker Hub, PyPI, GitLab, Keybase.
3. **CLI Tools:** `sherlock`, `maigret`, `curl`, `jq`.

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Run Multi-Platform Username Enumeration via Sherlock
1. In your Kali Linux VM, run `sherlock` with timeout controls to search across public platforms:
   ```bash
   sherlock dependabot --timeout 10 --folderoutput ./sherlock_results/ --print-found
   ```
2. Save the output and compute the evidence checksum:
   ```bash
   sha256sum ./sherlock_results/dependabot.txt
   ```

### Step 2: Corroborate Matches with Maigret
1. Execute `maigret` to extract rich metadata (bio, creation date, avatars) from high-confidence matches:
   ```bash
   maigret dependabot --site "GitHub,Docker Hub,GitLab" --json ./maigret_results.json
   ```
2. Verify file capture in `EVIDENCE_LOG_TEMPLATE.md`.

### Step 3: Implement the 3-Point Attribution Verification Rule
Never assume two accounts with the same username belong to the same entity. Apply the **Advisory Council's 3-Point Corroboration Framework**:
1. **Bio / PGP Key Fingerprint:** Do the profiles publish an identical PGP public key or link to an identical official corporate website?
2. **Creation Timestamp Correlation:** Were the accounts registered during the same project rollout window?
3. **Content / Repository Alignment:** Are the repositories, commits, and packages published across the profiles functionally linked (e.g., automated dependency updates)?

### Step 4: Discard False Positives & Document Confidence
1. Flag any account where the profile belongs to an unrelated third party or private citizen who happened to choose the same handle.
2. Assign individual confidence ratings using the Admiralty Code:
   * **Verified Official Bot Profile:** **A1** (First-party verified integration).
   * **Uncorrelated Name Collision:** **E4** (Discarded; non-attributable).

---

## 📊 Expected Findings & Deliverables
* Complete entry in `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hash of `sherlock_results/dependabot.txt`.
* Master matrix of discovered platform URLs, verified statuses, and corroborating evidence points.
* Comprehensive False-Positive Analysis explaining why specific returned accounts were rejected from the attribution cluster.
* Admiralty-scored assessment.

---

## ⚖️ Ethical & Legal Boundary Invariant
* **Strict Invariant:** Zero targeting of private individuals, friends, colleagues, or living private citizens. All exercises must run exclusively against public open-source project bots, foundation service accounts, or instructor-provided synthetic CTF profiles.
