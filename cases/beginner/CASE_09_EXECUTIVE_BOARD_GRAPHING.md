# 📂 Case File 09: Corporate Executive Board & Directorship Graphing

**Difficulty:** Beginner (Score: 3/10)  
**Standard Reference:** `CASE-BEG-009`  
**Target Entity:** Publicly Traded Enterprise (e.g., Apple Inc., Microsoft Corporation, or Fastly, Inc.)  
**Investigative Focus:** SEC Form DEF 14A Proxy Filings, Cross-Directorship Mapping, and Supply Chain Influence  

---

## 🎯 Case Objective

Adversaries and corporate threat intelligence teams study executive leadership networks to understand corporate influence, shared vendor relationships, and potential conflict-of-interest vectors. When board members serve simultaneously across multiple corporate boards (interlocking directorships), companies often share common cybersecurity insurance underwriters, cloud providers, and legal audit partners.

In this case, the student will analyze public regulatory filings (SEC Form DEF 14A) and public registry databases to construct a directorship connection graph for a target enterprise's board of directors without investigating any personal private lives.

---

## 🔍 Available Clues & Starting Point
1. **Target Organization:** Public enterprise CIK (e.g., Apple Inc. CIK `0000320193` or Fastly CIK `0001517413`).
2. **Regulatory Repositories:**
   * [SEC EDGAR Form DEF 14A (Definitive Proxy Statement)](https://www.sec.gov/edgar/searchedgar/companysearch)
   * [OpenCorporates](https://opencorporates.com/)
   * [Wikidata Query Service](https://query.wikidata.org/)
3. **Graphing & Analysis Tools:** Obsidian (Markdown graph view), Maltego Community Edition, or Mermaid.js.

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Locate the Most Recent SEC Form DEF 14A
1. Navigate to the SEC EDGAR company search interface.
2. Filter filings by Form **DEF 14A** (Annual Proxy Statement).
3. Open the document and navigate to the section titled **"Proposal 1: Election of Directors"** or **"Board of Directors and Corporate Governance"**.

### Step 2: Extract Board of Directors Biographical Data
1. For each nominated director, extract their verified public professional roles:
   * Full legal/business name.
   * Primary executive role (e.g., CEO, Lead Independent Director).
   * Committee assignments (e.g., Audit Committee, Risk & Cybersecurity Committee).
   * **Other Public Company Directorships:** SEC rules require directors to disclose all other public company boards they have served on during the past five years.
2. Record these disclosures in a structured table.

### Step 3: Map Interlocking Directorships on OpenCorporates
1. Search the names of the outside independent directors on OpenCorporates to cross-reference registered corporate officer positions.
2. Note any shared subsidiary entities, non-profit foundations, or venture capital partnerships where board members share common governance roles.

### Step 4: Construct a Mermaid.js Entity Relationship Graph
1. In your Obsidian vault or research notebook, draft an entity relationship graph:
   ```mermaid
   graph TD
       Target["Target Enterprise (Fastly, Inc.)"]
       BoardMemberA["Director A (Audit Chair)"]
       BoardMemberB["Director B (Tech Committee)"]
       ExternalCorp1["External Enterprise X (Fintech)"]
       ExternalCorp2["External Enterprise Y (Cloud Infrastructure)"]

       Target -->|"Board Member"| BoardMemberA
       Target -->|"Board Member"| BoardMemberB
       BoardMemberA -->|"Audit Committee"| ExternalCorp1
       BoardMemberB -->|"Director"| ExternalCorp2
   ```
2. Document potential shared supply chain or compliance dependencies between the linked entities.

---

## 📊 Expected Findings & Deliverables
* Complete entry in `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hash of the downloaded SEC Form DEF 14A.
* Structured matrix of Board Directors, Audit Committee members, and outside corporate boards.
* Visual Mermaid graph illustrating the cross-corporate directorship network.
* Admiralty-scored assessment (**A1**) based on official sworn regulatory filings.

---

## ⚖️ Ethical & Legal Boundary Invariant
* **Strict Invariant:** Do NOT research the home addresses, personal phone numbers, family members, or personal social media accounts of any board member. The scope is strictly limited to public corporate governance relationships disclosed in regulatory filings.
