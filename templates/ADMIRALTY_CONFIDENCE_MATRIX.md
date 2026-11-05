# 🎯 Admiralty System Confidence Matrix (NATO STANAG 2022 Standard)

The Admiralty Code is the global defense and intelligence standard for evaluating open-source information. Investigators must score every piece of collected evidence using this two-character matrix before drawing analytic conclusions.

---

## 📊 Matrix Overview: Source Reliability vs. Information Credibility

| Score | Source Reliability (Who reported it?) | Information Credibility (Is it true?) |
| :---: | :--- | :--- |
| **A / 1** | **Completely Reliable:** Verified history of authenticity, official government registry, signed public filing. | **Confirmed by Other Sources:** Corroborated by independent, unrelated sources or direct cryptographic proof. |
| **B / 2** | **Usually Reliable:** Established news organization, verified technical blog, reputable security vendor. | **Probably True:** Consistent with known facts, not fully corroborated but logical and uncontradicted. |
| **C / 3** | **Fairly Reliable:** Individual analyst, social media disclosure with technical details, third-party database. | **Possibly True:** Plausible, but unverified and subject to error or misinterpretation. |
| **D / 4** | **Not Usually Reliable:** Anonymous forum post, unverified paste site, uncorroborated leak channel. | **Doubtful:** Contradicted by other known facts, unlikely, or suspect authenticity. |
| **E / 5** | **Unreliable:** Known disinformation vector, compromised account, deliberate honeypot. | **Improbable:** Factually disproven, technically impossible, or fabricated. |
| **F / 6** | **Reliability Cannot Be Judged:** First-time source, unknown entity, obscured provenance. | **Truth Cannot Be Judged:** Insufficient data exists to evaluate truthfulness. |

---

## 🔍 How to Apply in OSINT Investigations

1. **Every Fact Gets an Admiralty Score:**  
   * *Example:* Finding an AWS S3 bucket name in an SEC 10-K filing $\rightarrow$ **Score: A1** (Government filing + primary disclosure).
   * *Example:* A claim on a Telegram channel alleging a company data breach without sample data $\rightarrow$ **Score: D4** (Anonymous forum + doubtful).
2. **Attribution Threshold:**  
   * **Never draw an attribution conclusion on anything below B2.**
   * Any finding scored **C3 or lower** requires secondary corroboration before entering an executive intelligence briefing.
