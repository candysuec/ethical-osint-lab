# 📖 Student & Instructor Operational Field Manual: Complete System Walkthrough & Training Scenarios
**Standard Reference:** `OSINT-FIELD-MANUAL-01`  
**Classification:** `PUBLIC / TLP:CLEAR`  
**Target Platform:** Sovereign OSINT Analyst Workbench (`http://localhost:5180`)  
**Associated Daemon:** Containerized Tool Runner (`http://127.0.0.1:5002`)  
**Standard Authority:** Evidra Technologies LLC & CandySueC LLC  
**Author:** Candy Chevalier  

---

## 🎯 1. System Mission: What This Laboratory Actually Is

The **Sovereign Ethical OSINT Laboratory** is a defensive cybersecurity intelligence workstation designed to train aspiring analysts, career changers, and junior SOC operators how to perform **defensible, audit-ready digital footprint investigations** using strictly legal, passive open-source tradecraft.

Unlike automated scanners that produce overwhelming dumps of low-quality alerts, this system trains you in the **7-Phase Professional Intelligence Lifecycle**:
1. **Scope & PIRs:** Defining explicit Priority Intelligence Requirements and affirming CFAA ethical boundaries.
2. **Passive Collection:** Running non-intrusive queries (`dig`, `whois`, `crt.sh`, `exiftool`, `wayback`).
3. **Chain of Custody:** Immediately calculating ISO/IEC 27037 SHA-256 cryptographic checksums of raw evidence.
4. **Admiralty Triangulation:** Enforcing the Two-Source Rule and rating findings using the NATO STANAG 2022 $6 \times 6$ matrix ($A1$ to $F6$).
5. **Entity Disambiguation:** Resolving multi-tenant digital identities without jumping to false assumptions.
6. **Executive & SOC Reporting:** Compiling executive BLUF briefings and production SIGMA detection rules.
7. **OPSEC Teardown:** Maintaining immutable session logs.

---

## 🖥️ 2. Interface Anatomy: How to Navigate the Workbench

When you open **`http://localhost:5180`**, the interface is organized into a permanent, predictable layout:

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [🛡️ SOVEREIGN // OSINT]  [📂 Case 02: DNS & Mail Security (fastly.com) - Switch Case]  [Progress 2/30] │
├──────────────────────────────┬─────────────────────────────────────────────────────────────────────────┤
│ SIDEBAR NAVIGATION           │ CASE INVESTIGATION CONSOLE                                              │
│                              ├──────────────────────────┬──────────────────────────────┬───────────────┤
│ ── WORKFLOW ──               │ PILLAR 1: SCOPE & PIRs   │ PILLAR 2: TOOL EXECUTION     │ PILLAR 3:     │
│ • Active Case Console (Here) │                          │                              │ CHAIN OF      │
│ • Tool Sandbox               │ Priority Question:       │ Live Command:                │ CUSTODY       │
│ • Case Portfolio             │ "Can attackers spoof     │ $ dig +noall +answer TXT...  │               │
│ • Indicator Intake           │  executive emails?"      │                              │ SHA-256 Hash  │
│ • Lead Queue                 │                          │ [ ⚡ Run Query (Ctrl+Enter) ] │ NATO Rating   │
│                              │ Target: fastly.com       │                              │ Two-Source    │
│ ── EVIDENCE & ANALYSIS ──    │                          │ Live Terminal Window:        │ Gate (2/2)    │
│ • Evidence Vault (SHA-256)   │ Ethical Red Lines:       │ "v=DMARC1; p=reject;..."     │               │
│ • Entity Resolution          │ ✓ 100% Passive DNS root  │                              │ [ Commit to   │
│ • Relationship Graph         │ ✕ Zero port scanning     │ 🔎 Plain-English Decoder     │   Vault ]     │
│ • Timeline Analysis          │ ✕ Zero citizen profiling │ Explains security impact     │               │
│ • Gap Analysis               │                          │                              │ [ View Full   │
│                              │                          │                              │   Report ]    │
│ ── DELIVERABLES ──           │                          │                              │ [ Dossier JSON│
│ • Executive Reports          │                          │                              │   Export ]    │
│ • Audit Trail & Logs         │                          │                              │               │
└──────────────────────────────┴──────────────────────────┴──────────────────────────────┴───────────────┘
```

### Universal Keyboard Shortcuts
* **`Ctrl + Enter` (or `Cmd + Enter`):** Immediately executes the active tool query.
* **`Ctrl + S` (or `Cmd + S`):** Commits the verified finding directly into the Sovereign Evidence Vault.
* **`Ctrl + K` (or `Cmd + K`):** Opens the 30-case curriculum browser modal.

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
1. Inspect the **Dynamic SHA-256 Checksum:** Notice the cryptographic hash automatically generated from the stdout string using the Web Crypto API. Click `Copy` to save the hash to your clipboard.
2. Note the initial **NATO STANAG 2022 Rating:** It starts at `A2 (Uncorroborated Lead)` because only one source was queried.
3. Apply the **Two-Source Rule:** Click on **`Source 2: RFC 7489 Secondary Registry`**.
   * The status changes to **`2/2 VERIFIED`**, and the rating elevates to **`A1 (Confirmed Fact)`**.
4. Click **`[ 💾 Commit Evidence to Vault ]`** (or press **`Ctrl+S`**).
   * The finding is permanently committed into the local database and stored in `localStorage`.
5. Click **`[ 📦 Dossier JSON ]`** to download an ISO/IEC 27037-compliant JSON evidence package.

---

### 🔍 Scenario B (Intermediate): Case 03 – Uncovering Hidden Staging Servers via Certificate Transparency
* **Goal:** Discover unlisted development gateways and shadow IT infrastructure without sending a single packet to the target server.
* **Estimated Time:** 8 Minutes

#### Step 1: Switch Case
1. Press **`Ctrl+K`** (or click **`Browse 30 Cases`** in the header).
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
1. Press **`Ctrl+K`**, click the **Tier 3: Advanced** tab, and select **Case 22: Brand Impersonation & Typosquatting Threat Matrix**.

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

## 🗄️ 4. Overview of the Other Subsystems

| Subsystem | Location | What You Do Here |
| :--- | :--- | :--- |
| **Tool Sandbox** | Sidebar $\rightarrow$ *Tool Sandbox* | Test queries freely with `dig`, `whois`, `crt.sh`, `robots.txt`, `exiftool`, `wayback`, and `BGPView` without being tied to a specific case. |
| **Indicator Intake** | Sidebar $\rightarrow$ *Indicator Intake* | Ingest a raw lead (Domain, IP, Hash, Email, or Organization). The system screens it against ethical boundaries and normalizes the format. |
| **Lead Queue** | Sidebar $\rightarrow$ *Lead Queue* | Triage incoming indicators. Promote verified leads into official case evidence or dismiss irrelevant false positives. |
| **Evidence Vault** | Sidebar $\rightarrow$ *Evidence Vault* | The master ISO/IEC 27037 ledger. Inspect raw artifact paths, UTC timestamps, verified viewport tags, and SHA-256 hashes. |
| **Entity Resolution** | Sidebar $\rightarrow$ *Entity Resolution* | Disambiguate homoglyphs and candidate collisions (e.g. John Smith Company A vs John Smith Company B). Auto-confirmation is permanently disabled. |
| **Relationship Graph** | Sidebar $\rightarrow$ *Relationship Graph* | Interactive link analysis displaying connected entities across 7 property buckets with NATO Admiralty edge weights. |
| **Timeline Analysis** | Sidebar $\rightarrow$ *Timeline Analysis* | Chronological event reconstruction showing how infrastructure changed over time. |
| **Executive Reports** | Sidebar $\rightarrow$ *Executive Reports* | Export standardized Markdown dossiers, SIGMA detection rules, and print-ready PDFs. |
| **Audit Trail & Logs** | Sidebar $\rightarrow$ *Audit Trail & Logs* | Immutable audit history recording every query, promotion, and analyst resolution. |

---

## 📋 5. What Remains on the Product Roadmap

While the core training environment and live execution engine are complete, the following roadmap enhancements are scheduled for upcoming development waves:

1. **Option 2: Capstone Operation Horizon Shield (`docs/12_CAPSTONE_INVESTIGATION.md`)**:
   * An end-to-end multi-week enterprise simulation auditing `Aether Dynamics Global Corporation` prior to an IPO.
2. **Interactive Relationship Graph Transforms**:
   * Right-click node expansion (Maltego-style) allowing analysts to pivot directly from an IP node to its associated ASN and DNS records on the visual canvas.
3. **Multi-Modal Image & EXIF Drag-and-Drop Ingestion**:
   * A frontend drag-and-drop dropzone in the Tool Sandbox to extract and hash metadata from local PDF and image files in the browser.
4. **PostgreSQL Production Sync**:
   * A backend sync daemon that bridges client `localStorage` changes directly into the PostgreSQL container (`osint_postgres` on port `:5432`) for multi-analyst collaboration.

---

### Quick Verification Checklist for Students
* [ ] Is the dashboard responding on `http://localhost:5180`?
* [ ] Is the tool execution daemon active on `http://127.0.0.1:5002`?
* [ ] Did you practice using `Ctrl+Enter` to run a live query?
* [ ] Did you verify Source 2 in the Two-Source Gate before committing evidence?
* [ ] Did you test generating a PDF via `Print / Save PDF` in the Executive Report view?
