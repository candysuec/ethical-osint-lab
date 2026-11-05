# 📂 Case File 23: Disinformation Campaign Attribution & Narrative Graphing

**Difficulty:** Advanced (Score: 7/10)  
**Standard Reference:** `CASE-ADV-023`  
**Target Entity:** Public Disinformation Dataset or Declassified Attribution Report (e.g., Stanford Internet Observatory, EUvsDisinfo, or Graphika reports)  
**Investigative Focus:** DISARM Framework, Cross-Platform Narrative Amplification, and Synthetic Media Fingerprinting  

---

## 🎯 Case Objective

Modern threat actors and state-sponsored influence operations deploy coordinated, inauthentic networks of synthetic personas, cloned news websites ("doppelgänger" domains), and automated amplification bots to manipulate public sentiment, corporate brand value, or geopolitical stability.

In this case, the student will study a declassified public influence operation dataset (e.g., EUvsDisinfo or Stanford Internet Observatory public case studies) to map the narrative propagation lifecycle, cluster inauthentic media mirrors, and classify threat actor tradecraft using the DISARM (Disinformation Analysis and Risk Management) Framework.

---

## 🔍 Available Clues & Starting Point
1. **Public Research Repositories:**
   * [EUvsDisinfo Database](https://euvsdisinfo.eu/)
   * [Stanford Internet Observatory Research Archive](https://cyber.fsi.stanford.edu/io)
   * [DFRLab (Digital Forensic Research Lab)](https://dfrlab.org/)
2. **Framework Reference:** [DISARM Framework (DISARM Foundation)](https://www.disarm.foundation/).
3. **Analysis Tools:** Obsidian / Mermaid.js, Python networkx, `jq`, `curl`.

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Ingest Declassified Narrative Case Telemetry
1. In your Linux VM, download the public metadata dataset or report summary from EUvsDisinfo:
   ```bash
   curl -s "https://euvsdisinfo.eu/api/v1/disinformation-cases?query=cyber" > disinfo_cases.json
   ```
2. Verify integrity and compute evidence hash:
   ```bash
   sha256sum disinfo_cases.json
   ```

### Step 2: Map Cloned News Portals & Doppelgänger Infrastructure
1. Many operations clone legitimate news websites (e.g., *Le Monde*, *Der Spiegel*, *The Guardian*) using typosquatted domains.
2. Analyze the domain registration, CMS themes, and tracking IDs:
   * **Google AdSense / Analytics IDs:** Did multiple disparate "news" sites embed identical `UA-XXXXX` or `G-XXXXX` tags?
   * **Yandex Metrika IDs:** Trace analytics IDs across international mirrors.
   * **Shared IP Hosting:** Were multilingual propaganda portals co-located on the same bulletproof ASN?

### Step 3: Classify Techniques using DISARM Framework
1. Map observed adversary behaviors to DISARM Technique IDs:
   * `T0018` (Create Inauthentic News Websites)
   * `T0043` (Target Specific Cultural/Corporate Faultlines)
   * `T0088` (Amplify with Automated Bot Networks)
   * `T0103` (Micro-Target Public Audiences)
2. Document the coordination timeline: Seed Release $\rightarrow$ Bot Amplification $\rightarrow$ Mainstream Amplification.

### Step 4: Construct Narrative Flow Graph
1. Model the narrative propagation flow in Mermaid:
   ```mermaid
   flowchart LR
       Actor["Threat Actor Syndicate"] -->|"Registers Clone"| CloneSite["Doppelgänger Media Portal (Fake News)"]
       CloneSite -->|"Publishes Fabricated Report"| Article["Viral Propaganda Narrative"]
       Actor -->|"Deploys Bot Farms"| Botnet["Coordinated Inauthentic Accounts"]
       Botnet -->|"Amplifies Hashtag"| SocialPlatform["Mainstream Social Feeds"]
       SocialPlatform -->|"Triggers Stock Volatility"| MarketImpact["Corporate Harm"]
   ```

---

## 📊 Expected Findings & Deliverables
* Complete entry in `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hash of `disinfo_cases.json`.
* Technical dossier linking cloned news portals via shared analytics tracking IDs and hosting infrastructure.
* DISARM matrix mapping observed influence tactics.
* Admiralty-scored assessment (**B2**) based on public academic forensic research.

---

## ⚖️ Ethical & Legal Boundary Invariant
* **Strict Invariant:** Do NOT create automated social media accounts, engage with live propaganda operatives, or distribute deceptive narratives. Analysis is conducted strictly on historical archival records and declassified researcher databases.
