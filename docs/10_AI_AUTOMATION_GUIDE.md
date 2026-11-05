# 🤖 Section 10: AI Automation & Human Verification Principles

**Standard Reference:** `OSINT-LAB-SEC-10`  
**Classification:** `PUBLIC / TLP:CLEAR`  

---

## ⚖️ The Core Principle: AI Assists, The Human Verifies

In open-source intelligence and cybersecurity analysis, **hallucinations and unverified claims are catastrophic**. 

AI language models can accelerate repetitive tasks by 10x, but an analyst's signature on a report certifies that every claim has been cryptographically or empirically corroborated.

```
┌────────────────────────┐      ┌────────────────────────┐      ┌────────────────────────┐
│     AI ACCELERATION    │      │  MANDATORY HUMAN GATE  │      │   DEFENSIBLE OUTPUT    │
│                        │      │                        │      │                        │
│ • Data Normalization   │─────►│ • Primary Source Check │─────►│ • Executive Briefing   │
│ • Entity Extraction    │      │ • Hash Verification    │      │ • Admiralty Scored IOCs│
│ • Timeline Sorting     │      │ • Admiralty Scoring    │      │ • Signed Chain of Cust │
└────────────────────────┘      └────────────────────────┘      └────────────────────────┘
```

---

## 🛠️ Permitted AI Use Cases

### 1. Data Normalization & Formatting
* **Scenario:** You have extracted 500 subdomains from `crt.sh` and need them parsed into CIDR blocks or sorted by domain depth.
* **Prompt Engineering:**
  > *"Given the attached raw list of subdomains, extract the unique second-level domains and output them in a markdown table grouped by common naming conventions (e.g., api, staging, mail, dev)."*

### 2. Timeline Reconstruction
* **Scenario:** You have 30 timestamps from press releases, DNS modification records, and SEC disclosures.
* **Prompt Engineering:**
  > *"Organize these 30 timestamped events into a chronological Markdown timeline. Calculate the elapsed time between event 1 and event 15. Do not add any events not present in the input."*

### 3. Report Drafting & Executive Summaries
* **Scenario:** You have an evidence ledger with 12 validated technical findings and need an executive summary suitable for a CISO.
* **Prompt Engineering:**
  > *"Using only the verified findings in the attached evidence log, draft a 3-paragraph Executive Summary focusing on business risk, external exposure, and recommended defensive remediations. Maintain a professional, objective tone."*

---

## 🚫 Strictly Prohibited AI Practices

1. **Never Ask AI to "Find Information About a Target" Without Sources:**  
   * Large Language Models hallucinate domains, breach records, and email addresses. Never rely on an LLM as a search engine for facts unless paired with direct citations and live tool grounding.
2. **Never Submit Unsanitized Private or Confidential Data to Public AI Services:**  
   * If working with sensitive proprietary data, use only local offline LLMs (via Ollama) or approved enterprise instances with zero data retention.
3. **Never Accept an AI Attribution Without Primary Evidence:**  
   * If an AI suggests a domain is owned by a specific entity, the analyst MUST verify the WHOIS record, SSL certificate, or DNS SOA serial number personally.
