# ⚖️ Source Validation & Information Credibility Rubric
**Standard Reference:** `OSINT-TMPL-VAL-01`  
**Standard Authority:** NATO STANAG 2022 / Joint Military Intelligence Doctrine  
**Classification:** `PUBLIC / TLP:CLEAR`  

---

## 🏛️ Purpose & Tradecraft Framework

An open-source intelligence finding is only as trustworthy as the sources that corroborate it. Amateur investigators frequently fall into the **Single-Source Trap**—accepting an unverified blog post, unauthenticated paste site, or scraped WHOIS database as indisputable truth.

Professional intelligence operations mandate rigorous source evaluation using the **Admiralty 6×6 System** paired with the **Rule of Independent Corroboration**.

---

## 📐 The Admiralty 6×6 Evaluation Framework

Every piece of collected information is graded across two independent axes: **Source Reliability** (Alphabetical A–F) and **Information Credibility** (Numerical 1–6).

```
                 SOURCE RELIABILITY                INFORMATION CREDIBILITY
       ┌─────────────────────────────────┐   ┌─────────────────────────────────┐
       │ A = Completely Reliable         │   │ 1 = Confirmed by other sources  │
       │ B = Usually Reliable            │   │ 2 = Probably True               │
       │ C = Fairly Reliable             │   │ 3 = Possibly True               │
       │ D = Not Usually Reliable        │   │ 4 = Doubtful                    │
       │ E = Unreliable                  │   │ 5 = Improbable                  │
       │ F = Reliability Cannot Be Judged│   │ 6 = Truth Cannot Be Judged      │
       └─────────────────────────────────┘   └─────────────────────────────────┘
```

---

## 🔍 Detailed Scoring Criteria

### Axis 1: Source Reliability (The Conduit)

| Grade | Classification | Practical OSINT Definition | Concrete Examples |
| :---: | :--- | :--- | :--- |
| **A** | **Completely Reliable** | Proven integrity, official legal authority, cryptographically signed records, or direct first-party primary repositories. | SEC EDGAR Form 10-K filings, Authoritative Root DNS servers, Signed Git commits, CT Logs (`crt.sh`). |
| **B** | **Usually Reliable** | Established industry threat intelligence feeds, vetted commercial data aggregators, or major media with proven fact-checking. | VirusTotal Enterprise, Censys, Shodan, BGPView, CISA Advisories, Recorded Future public blogs. |
| **C** | **Fairly Reliable** | Independent security researcher blogs, historical WHOIS aggregators, community-maintained repositories. | Personal security researcher writeups, Reddit `/r/netsec`, GitHub community repos without signed tags. |
| **D** | **Not Usually Reliable** | Unverified public paste bins, anonymous leak boards, forums with known bias or financial incentive. | Pastebin, Telegram public leak channels, unvetted Dark Web forums. |
| **E** | **Unreliable** | Entities with a documented track record of deception, paid sock-puppet networks, or state-sponsored disinformation outlets. | Doppelgänger fake news domains, known influence operation channels. |
| **F** | **Cannot Be Judged** | New, unprecedented, or untracked source with no prior historical reliability baseline. | First-time anonymous tipster, newly registered anonymous domain. |

---

### Axis 2: Information Credibility (The Claim)

| Grade | Classification | Corroboration Standard |
| :---: | :--- | :--- |
| **1** | **Confirmed** | Corroborated by at least two independent, technically disparate sources (e.g., DNS record + CT Log + BGP route). |
| **2** | **Probably True** | Logically consistent with known adversary behavior and supported by indirect technical evidence. |
| **3** | **Possibly True** | Plausible and compatible with general target profile, but lacks direct technical corroboration. |
| **4** | **Doubtful** | Contradicts verified historical records or defies established networking/cryptographic principles. |
| **5** | **Improbable** | Factually impossible or demonstrably fabricated upon technical analysis. |
| **6** | **Truth Cannot Be Judged** | Ambiguous claim with zero available corroborating or refuting telemetry. |

---

## 🛡️ The 3 Non-Negotiable Corroboration Rules

1. **The Circular Reporting Trap:**
   * Never count two media articles or blog posts as independent sources if both cite the exact same underlying tweet, press release, or third-party feed. Always trace the claim back to the primary technical root.
2. **The "Two-Source" Rule for Critical Impact Findings:**
   * Any finding that asserts a high-severity vulnerability, shadow IT exposure, or threat attribution must be verified across at least two disparate technical conduits before being reported to executive leadership (e.g., Passive DNS corroborated by SSL SAN certificate data).
3. **Transparent Uncertainty Disclosures:**
   * If a finding is evaluated as `C3` or `B3`, the analyst must state clearly in the Executive Briefing: *"This finding is assessed with Moderate Confidence (B3) pending direct telemetry confirmation from enterprise system logs."*
