# 📖 Student & Instructor Operational Field Manual: Complete System Walkthrough & Training Scenarios
**Standard Reference:** `OSINT-FIELD-MANUAL-02`  
**Classification:** `PUBLIC / TLP:CLEAR`  
**Target Platform:** Sovereign OSINT Analyst Workbench (`http://localhost:5180`)  
**Backend REST & Tool Daemon:** Containerized Tool & DB Runner (`http://127.0.0.1:5002`)  
**Persistent Database:** PostgreSQL 16 (`localhost:5432`, DB: `sovereign_osint`)  
**Automated Recon Engine:** SpiderFoot (`http://localhost:5001`)  
**Standard Authority:** Evidra Technologies LLC & CandySueC LLC  
**Author:** Candy Chevalier  
**Version:** 2.3.0 Commercial Release (November 2026)

---

## 🎯 1. System Mission: What This Laboratory Actually Is

The **Sovereign Ethical OSINT Laboratory** is a commercial-grade defensive cybersecurity intelligence workstation designed to train aspiring analysts, career changers, and SOC operators how to perform **defensible, audit-ready digital footprint investigations** using strictly legal, passive open-source tradecraft.

Unlike automated scanners that produce overwhelming dumps of low-quality alerts, this system trains you in the **7-Phase Professional Intelligence Lifecycle**:
1. **Scope & PIRs:** Defining explicit Priority Intelligence Requirements and affirming CFAA / Computer Misuse Act ethical boundaries.
2. **Passive Collection:** Running non-intrusive queries (`dig`, `whois`, `crt.sh`, `exiftool`, `SpiderFoot`).
3. **Chain of Custody:** Immediately calculating ISO/IEC 27037 SHA-256 cryptographic checksums of raw evidence.
4. **Admiralty Triangulation:** Enforcing the Two-Source Rule and rating findings using the NATO STANAG 2022 $6 \times 6$ matrix ($A1$ to $F6$).
5. **Entity Disambiguation:** Resolving multi-tenant digital identities without jumping to false assumptions.
6. **Executive & SOC Reporting:** Compiling executive BLUF briefings, verifiable audit trails, and production SIGMA detection rules.
7. **OPSEC Teardown:** Maintaining immutable session logs with Zero Private Citizen Profiling.

---

## 🖥️ 2. Interface Anatomy: How to Navigate the Workbench

When you open **`http://localhost:5180`**, the interface provides full navigation across 16 specialized intelligence subsystems:

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [🛡️ SOVEREIGN // OSINT ACADEMY]  [Tabs: Academy Hub | Active Console | Capstone | Tools | EXIF | Graph] │
│ Target: CASE-BEG-002: fastly.com                                          DB: CONNECTED | SF: ONLINE   │
├──────────────────────────────┬─────────────────────────────────────────────────────────────────────────┤
│ SIDEBAR NAVIGATION           │ CASE INVESTIGATION CONSOLE / SPECIALIZED VIEW                           │
│                              ├──────────────────────────┬──────────────────────────────┬───────────────┤
│ ── ACADEMY WORKFLOW ──       │ PILLAR 1: SCOPE & PIRs   │ PILLAR 2: TOOL EXECUTION     │ PILLAR 3:     │
│ • Academy Command Center     │                          │                              │ CHAIN OF      │
│ • Active Case Console        │ Priority Question:       │ Live Command:                │ CUSTODY       │
│ • Guided Lifecycle (6-Stage) │ "Can attackers spoof     │ $ dig +noall +answer TXT...  │               │
│ • Mission Control (30 Cases) │  executive emails?"      │                              │ SHA-256 Hash  │
│                              │                          │ [ ⚡ Run Query (Ctrl+Enter) ] │ NATO Rating   │
│ ── WORKBENCHES ──            │ Target: fastly.com       │                              │ Two-Source    │
│ • Tool Sandbox & SpiderFoot  │                          │ Live Terminal Window:        │ Gate (2/2)    │
│ • EXIF Metadata Dropzone     │ Ethical Red Lines:       │ "v=DMARC1; p=reject;..."     │               │
│ • Indicator Intake           │ ✓ 100% Passive DNS root  │                              │ [ Commit to   │
│ • Lead Queue                 │ ✕ Zero port scanning     │ 🔎 Plain-English Decoder     │   PostgreSQL] │
│                              │ ✕ Zero citizen profiling │ Explains security impact     │               │
│ ── ASSURANCE & ANALYSIS ──   │                          │                              │ [ View Full   │
│ • Evidence Vault (PostgreSQL)│                          │                              │   Report ]    │
│ • Source Reliability (NATO)  │                          │                              │ [ Dossier JSON│
│ • Confidence Engine (Math CI)│                          │                              │   Export ]    │
│ • Entity Resolution          │                          │                              │               │
│ • Relationship Graph         │                          │                              │               │
│ • Timeline Analysis          │                          │                              │               │
│ • Gap Analysis               │                          │                              │               │
│                              │                          │                              │               │
│ ── GOVERNANCE & EXPORT ──    │                          │                              │               │
│ • Executive Reports          │                          │                              │               │
│ • Capstone Diploma View      │                          │                              │               │
│ • Audit Trail & Logs         │                          │                              │               │
└──────────────────────────────┴──────────────────────────┴──────────────────────────────┴───────────────┘
```

### Universal Keyboard Shortcuts
* **`Ctrl + Enter` (or `Cmd + Enter`):** Immediately executes the active tool query.
* **`Ctrl + S` (or `Cmd + S`):** Commits the verified finding directly into the PostgreSQL Evidence Vault.
* **`Ctrl + K` (or `Cmd + K`):** Opens the 30-case curriculum browser modal.
* **`Ctrl + P` (or `Cmd + P`):** Opens print dialog formatted with `@media print` clean layout.

---

## 🚀 3. Step-by-Step Training Scenarios

### 🔰 Scenario A (Beginner): Case 02 – Auditing Domain Mail Spoofing (SPF & DMARC)
* **Goal:** Determine if an external attacker can forge emails appearing to originate from `fastly.com` to conduct CEO fraud or wire diversion.
* **Estimated Time:** 5 Minutes

#### Step 1: Establish Scope & PIRs (Pillar 1)
1. In the top bar or sidebar, confirm you are on **Case 02: DNS Record Enumeration & Mail Security Auditing**.
2. Read the **Priority Intelligence Requirement (PIR):**
   > *"Does Fastly's DMARC policy enforce `p=reject` or `p=quarantine`, or does it use `p=none` (unprotected)?"*
3. Verify the **Ethical Red Lines:** Confirm this is a passive root DNS inquiry. No emails are sent, no SMTP servers are probed.

#### Step 2: Execute Passive Tool Query (Pillar 2)
1. Notice the command line: `$ dig +noall +answer TXT fastly.com _dmarc.fastly.com`.
2. Click **`[ ⚡ Run Query ]`** (or press **`Ctrl+Enter`**).
3. Observe the green/cyan indicator: **`LIVE DOCKER CLI STREAM (PORT :5002)`**. The system queries authoritative DNS in real time inside `osint_cli_workstation`.
4. Read the live stdout:
   ```txt
   fastly.com.        30 IN TXT "v=spf1 ... -all"
   _dmarc.fastly.com. 3520 IN TXT "v=DMARC1; p=reject; rua=mailto:mailauth-reports@fastly.com"
   ```
5. Read the **Plain-English Decoder Box:**
   * It translates `p=reject` into plain business language: *"The domain has instructed global receiving mailboxes to drop unauthenticated messages at the SMTP boundary. Attackers cannot spoof emails from this domain."*

#### Step 3: Verify Chain of Custody & Corroborate (Pillar 3)
1. Inspect the **Dynamic SHA-256 Checksum:** Cryptographic hash automatically generated from the stdout string using the Web Crypto API. Click `Copy` to save the hash to your clipboard.
2. Note the initial **NATO STANAG 2022 Rating:** Starts at `A2 (Uncorroborated Lead)` because only one source was queried.
3. Apply the **Two-Source Rule:** Click on **`Source 2: RFC 7489 Secondary Registry`**.
   * Status changes to **`2/2 VERIFIED`**, and rating elevates to **`A1 (Confirmed Fact)`**.
4. Click **`[ 💾 Commit Evidence to Vault ]`** (or press **`Ctrl+S`**).
   * The finding is permanently committed into PostgreSQL 16 `:5432` and synchronized with the frontend.
5. Click **`[ 📦 Dossier JSON ]`** to download an ISO/IEC 27037-compliant JSON evidence package.

---

### 🔍 Scenario B (Intermediate): Case 03 – Uncovering Hidden Staging Servers via Certificate Transparency
* **Goal:** Discover unlisted development gateways and shadow IT infrastructure without sending a single packet to the target server.
* **Estimated Time:** 8 Minutes

#### Step 1: Switch Case
1. Press **`Ctrl+K`** (or click **`Academy Hub`** in the top navigation).
2. Select **Case 03: Certificate Transparency Log Excavation** (`cloudflare.com`).

#### Step 2: Query the Public Cryptographic Logbook
1. Look at Pillar 2: The utility is `crt.sh` (RFC 6962 Certificate Transparency API).
2. Click **`[ ⚡ Run Query ]`**.
3. The live stream contacts the public certificate ledger and lists all SSL/TLS certificates issued to the domain:
   ```txt
   api.cloudflare.com
   dash.cloudflare.com
   dev-admin.internal-test.cloudflare.com
   staging-portal.edge.cloudflare.com
   ```
4. Read the **Plain-English Decoder:**
   * Explains why Certificate Authorities must publicly log every certificate they issue, and how security auditors use this to discover unannounced testing subdomains (`dev-admin.internal-test`).

#### Step 3: File Evidence & Corroborate
1. Verify the secondary source in the Two-Source Gate.
2. Click **`[ 💾 Commit Evidence to Vault ]`**.
3. In the left sidebar, click **Evidence Vault (SHA-256)** to view your catalog of captured artifacts, timestamps, and verifiable hashes.

---

### 🦅 Scenario C (Advanced): Case 22 – Brand Impersonation & Typosquatting Defense
* **Goal:** Detect weaponized homoglyph and bit-squatting domains used by phishing syndicates.
* **Estimated Time:** 10 Minutes

#### Step 1: Launch Case 22
1. Go to **Academy Hub**, click the **ADVANCED** tier tab, and select **Case 22: Brand Impersonation & Typosquatting Threat Matrix**.

#### Step 2: Analyze Algorithmic Permutations
1. Pillar 2 executes an algorithmic permutation analysis:
   ```txt
   Homoglyph: paypa1.com  -> MX Active (mail.paypa1.com) -> WEAPONIZED
   Bitsquat:  payqal.com  -> Parked
   Omission:  paypl.com   -> MX Active (mail.hosted-mx.net) -> WEAPONIZED
   ```
2. Read the **Plain-English Decoder:**
   * Explains that registering an MX record on a look-alike domain indicates active weaponization for email fraud rather than passive squatting.
3. Read the **Remediation Handoff:**
   * Directs the analyst to submit a UDRP (Uniform Domain-Name Dispute-Resolution Policy) complaint to WIPO.

#### Step 3: Generate the Final Executive Briefing
1. Click **`[ View Report ]`** in Pillar 3 (or click **Executive Reports** in the left sidebar).
2. Inspect the **BLUF (Bottom Line Up Front)**, **Confidence Assessment**, **Information Gaps**, and **SIGMA Detection Rules**.
3. Click **`[ 🖨️ PRINT / SAVE PDF ]`** to open the browser print dialog and generate a PDF intelligence assessment.

---

### 🎓 Scenario D (Capstone): Enterprise IPO Surface Audit & Graduation Diploma
* **Goal:** Execute an end-to-end multi-disciplinary defensive audit on `Aether Dynamics Global Corporation` (CASE-2026-0891) and earn your graduation certificate.
* **Estimated Time:** 15 Minutes

#### Step 1: Launch Capstone
1. Click **Capstone** in the top navigation or sidebar.
2. Review the mission dossier:
   * Target: `Aether Dynamics Global Corporation`
   * Classification: `TLP:AMBER`
   * Scope: SEC Exhibit 21 mapping, dangling cloud CNAMEs, shadow staging portals, and SPF/DMARC posture.

#### Step 2: Complete the 4 Technical Exercises
1. **Exercise 1 (Corporate Structure):** Analyze SEC EDGAR 10-K Exhibit 21 disclosures to map off-shore subsidiaries.
2. **Exercise 2 (DNS & Perimeter):** Query DNS TXT records to uncover dangling CNAMEs pointing to orphaned AWS S3/Azure blobs.
3. **Exercise 3 (Certificate Transparency):** Extract cryptographic subdomains from `crt.sh` to uncover shadow dev clusters.
4. **Exercise 4 (Disambiguation):** Distinguish corporate subsidiaries from unrelated entities sharing similar corporate monikers.

#### Step 3: Review Scoring Rubric & Print Diploma
1. Review your real-time score calculated against NIST SP 800-115 and ISO/IEC 27037 standards.
2. Once passing requirements are met (70%+), the **Graduation Diploma** is unlocked.
3. Click **`[ 🖨️ Print / Save Diploma ]`** to export your certificate with official validation watermark and cryptographic hash.

---

## 🗄️ 4. Master Catalog of Subsystems

| Subsystem | Location | What You Do Here |
| :--- | :--- | :--- |
| **Academy Command Center** | Top Nav $\rightarrow$ *Academy Hub* | Browse all 30 graded curriculum cases across Beginner, Intermediate, and Advanced tiers with search and 1-click launch. |
| **Active Case Console** | Top Nav $\rightarrow$ *Active Console* | The primary 3-pillar analyst workspace: Scope & PIRs, Live Tool Execution, and ISO/IEC 27037 Chain of Custody. |
| **Guided Lifecycle** | Sidebar $\rightarrow$ *Guided Lifecycle* | 6-Stage sequential OSINT operational workflow stepper with phase checklists and validation gates. |
| **Mission Control** | Sidebar $\rightarrow$ *Mission Control* | Interactive mission browser featuring command line decoders and 30 technical knowledge-check quizzes. |
| **Tool Sandbox & SpiderFoot** | Top Nav $\rightarrow$ *Tools* | Run live defensive tools (`dig`, `whois`, `crt.sh`) or connect to the live SpiderFoot reconnaissance engine on port `:5001`. |
| **EXIF Metadata Dropzone** | Top Nav $\rightarrow$ *EXIF Dropzone* | Browser-native drag-and-drop file analyzer. Extracts EXIF tags, calculates SHA-256 hashes, and scrubs sensitive GPS coordinates. |
| **Indicator Intake** | Sidebar $\rightarrow$ *Indicator Intake* | Ingest raw indicators (Domains, IPs, Hashes). Screens against ethical red lines and normalizes formatting. |
| **Lead Queue** | Sidebar $\rightarrow$ *Lead Queue* | Triage and triage incoming intelligence leads. Promote validated leads directly to case evidence. |
| **Evidence Vault** | Sidebar $\rightarrow$ *Evidence Vault* | The central PostgreSQL 16 evidence ledger. Review verified SHA-256 hashes, viewport screenshots, and NATO ratings. |
| **Source Reliability** | Sidebar $\rightarrow$ *Source Reliability* | Interactive NATO STANAG 2022 $6 \times 6$ Admiralty Matrix ($A1$ to $F6$) evaluation workbench. |
| **Confidence Engine** | Sidebar $\rightarrow$ *Confidence Engine* | Mathematical Confidence Index ($CI = \sum(w_i \cdot s_i)$) calculator with source weightings and gap penalties. |
| **Entity Resolution** | Sidebar $\rightarrow$ *Entity Resolution* | Disambiguate identities and multi-tenant assets. Automated resolution is permanently disabled to prevent false attribution. |
| **Relationship Graph** | Top Nav $\rightarrow$ *Graph* | Interactive link analysis displaying connected nodes across 7 categories with dynamic case filtering. |
| **Timeline Analysis** | Sidebar $\rightarrow$ *Timeline Analysis* | Chronological reconstruction of infrastructure modifications, certificate issuances, and registration events. |
| **Gap Analysis** | Sidebar $\rightarrow$ *Gap Analysis* | Structured identification of missing intelligence items and uncorroborated single-source leads. |
| **Executive Reports** | Sidebar $\rightarrow$ *Executive Reports* | Generate C-suite BLUF summaries, evidence manifests, and production SIGMA detection rules. |
| **Capstone Diploma** | Top Nav $\rightarrow$ *Capstone* | Comprehensive multi-disciplinary simulation culminating in an audit-ready, printable graduation certificate. |
| **Audit Trail & Logs** | Sidebar $\rightarrow$ *Audit Trail & Logs* | Immutable audit history recording every query, promotion, and analyst resolution. |

---

## 🔒 5. Ethical & Operational Boundaries

Every analyst operating this workbench must strictly observe the **Four Non-Negotiable Invariants**:
1. **100% Passive Defensive Reconnaissance:** Only query authoritative publicly available sources (DNS root servers, public Certificate Transparency logs, SEC EDGAR, WHOIS registries).
2. **Zero Active Port Probing:** Active scanning tools such as `nmap`, vulnerability exploits, and login brute-forcing are strictly banned.
3. **Zero Private Citizen Profiling:** Do not harvest personal PII, home addresses, family members, or non-corporate digital footprints.
4. **Mandatory Corroboration:** No raw lead may be cited as a factual intelligence finding without independent corroboration under the **Two-Source Rule**.

---

### Verification Checklist for Students & Instructors
* [ ] Is the dashboard responding on `http://localhost:5180`?
* [ ] Is the tool execution daemon active on `http://127.0.0.1:5002`?
* [ ] Is PostgreSQL 16 responding on port `:5432`?
* [ ] Is SpiderFoot responding on `http://localhost:5001`?
* [ ] Did you practice running a live query using `Ctrl+Enter`?
* [ ] Did you verify Source 2 in the Two-Source Gate before committing evidence?
* [ ] Did you test generating a PDF via `Print / Save PDF` in Executive Reports or Capstone?
