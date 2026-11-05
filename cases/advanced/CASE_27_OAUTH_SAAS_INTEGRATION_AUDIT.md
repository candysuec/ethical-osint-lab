# 📂 Case File 27: Third-Party SaaS & OAuth Integration Drift Audit

**Difficulty:** Advanced (Score: 7/10)  
**Standard Reference:** `CASE-ADV-027`  
**Target Entity:** Public Open-Source Organization or Enterprise GitHub / Google Workspace Marketplace App Footprint  
**Investigative Focus:** SaaS Supply Chain Exposure, OAuth Scope Over-Privileging, and Abandoned Third-Party App Integrations  

---

## 🎯 Case Objective

Modern enterprises connect dozens of third-party Software-as-a-Service (SaaS) applications to their core identity providers (Google Workspace, Microsoft Entra ID, GitHub Organizations) via OAuth 2.0. These third-party apps frequently request broad, read/write permissions (such as `repo:full`, `mail.read`, `files.readwrite`). When third-party vendors are acquired, neglected, or compromised, their lingering OAuth tokens represent a silent, persistent backdoor into the enterprise.

In this case, the student will passively audit the public third-party integrations, GitHub marketplace apps, and webhook endpoints exposed by a major public open-source organization to evaluate its OAuth attack surface.

---

## 🔍 Available Clues & Starting Point
1. **Target Public Organization:** Official GitHub Organization (e.g., `github.com/apache` or `github.com/kubernetes`).
2. **Public Platform APIs:**
   * GitHub Public API (`/orgs/{org}/installations`, `/repos/{org}/{repo}/events`)
   * Public SaaS Marketplace listings (Google Workspace Marketplace, Slack App Directory).
3. **CLI Tools:** `curl`, `jq`.

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Enumerate Publicly Declared GitHub Integrations
1. Query public repository event streams to detect automated actions performed by third-party bot integrations:
   ```bash
   curl -s "https://api.github.com/repos/apache/kafka/issues/comments?per_page=100" > recent_comments.json
   ```
2. Verify integrity and compute evidence hash:
   ```bash
   sha256sum recent_comments.json
   ```

### Step 2: Extract Integrated SaaS Bots and Service Accounts
1. Filter the comments for automated bot accounts (e.g., `codecov[bot]`, `sonarqube-bot`, `jira-bot`, `cla-assistant`):
   ```bash
   jq -r '.[] | select(.user.type=="Bot") | .user.login' recent_comments.json | sort -u > integrated_bots.txt
   cat integrated_bots.txt
   ```
2. For each discovered bot, identify the underlying third-party SaaS vendor.

### Step 3: Assess Scope Over-Privileging Risks
1. Review the standard installation scopes required by each third-party app:
   * **Codecov / SonarQube:** Does it request read-only repository access or write/commit permissions?
   * **CLA Assistants:** Does it require administrative access to pull requests and webhooks?
2. Note whether any integrated service has suffered a public breach or supply chain compromise in past security disclosures (e.g., the 2021 Codecov Bash Uploader incident).

### Step 4: Map Webhook Payload Destinations
1. Check repository configuration documentation and CI scripts for outbound webhook URLs:
   ```bash
   grep -riE "(hooks\.slack\.com|discord\.com/api/webhooks|office\.com/webhook)" .github/ > exposed_webhooks.txt
   ```
2. Document whether webhook endpoints are exposed in plaintext configuration files.

---

## 📊 Expected Findings & Deliverables
* Complete entry in `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hash of `recent_comments.json`.
* Master inventory of third-party SaaS bots and external services integrated into the development pipeline.
* OAuth Risk Matrix classifying integrations by permission severity (Read vs. Write vs. Admin).
* Admiralty-scored assessment (**A1**) based on official platform API event data.

---

## ⚖️ Ethical & Legal Boundary Invariant
* **Strict Invariant:** Do NOT attempt to invoke discovered webhooks, hijack OAuth callback URLs, or modify repository configurations. The analysis is strictly focused on passive inventory and risk modeling.
