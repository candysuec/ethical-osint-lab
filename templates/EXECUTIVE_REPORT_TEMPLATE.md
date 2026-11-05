# 🛡️ Executive Intelligence Briefing Template

**Report Reference:** `INTEL-REP-2026-XXXX`  
**Target Organization:** `[Target Company / Project Name]`  
**Date:** `YYYY-MM-DD`  
**Classification:** `TLP:CLEAR // PUBLIC`  
**Lead Investigator:** `[Your Name / Title]`  

---

## 1. Executive Summary
Provide a concise, 3-paragraph summary written for C-suite executives and board members:
* **The Bottom Line:** What did this passive OSINT assessment discover?
* **Primary Exposure:** What is the most critical digital footprint or configuration risk identified?
* **Recommended Next Steps:** The top 2–3 actions the organization must take immediately.

---

## 2. Risk Assessment Matrix

| Finding Category | Severity | Exposure Level | Business Impact | Remediation Effort |
| :--- | :---: | :---: | :--- | :---: |
| **Shadow IT / Unmapped Subdomains** | High | External | Exposure of unhardened staging environments | Low (DNS cleanup) |
| **Public Metadata Leakage** | Medium | Public Documents | Internal usernames & software versions exposed | Low (Scrubber policy) |
| **Third-Party Dependency Drift** | Critical | Cloud Supply Chain | Outdated library with known CVE exposure | Medium (Patching) |

---

## 3. Key Intelligence Findings & Evidence
For each finding, provide:
1. **Finding Title & Admiralty Score:** (e.g. *"Unmanaged Staging Server Discovered via Certificate Transparency Logs [A1]"*)
2. **Technical Details:** The raw passive evidence, domain names, certificate serial numbers, or public repository links.
3. **Evidence Citation:** Reference to Item # in the Evidence Log.
4. **Actionable Remediation:** Exactly what engineers need to change to eliminate the exposure.

---

## 4. Methodology & Legal Boundaries Statement
> *"All information contained in this report was gathered solely through non-invasive, passive open-source intelligence (OSINT) methodologies. No systems were scanned, probed, accessed, or altered without authorization, adhering strictly to the Computer Fraud and Abuse Act (CFAA) and relevant ethical guidelines."*
