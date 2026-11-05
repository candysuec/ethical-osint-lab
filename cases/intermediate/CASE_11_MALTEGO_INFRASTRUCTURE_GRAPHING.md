# 📂 Case File 11: Maltego Entity Graphing & Visual Infrastructure Pivoting

**Difficulty:** Intermediate (Score: 4/10)  
**Standard Reference:** `CASE-INT-011`  
**Target Entity:** Public Enterprise Domain (e.g., `fastly.com` or `wikimedia.org`)  
**Investigative Focus:** Visual Link Analysis, Recursive DNS Transforms, and Autonomous Infrastructure Clustering  

---

## 🎯 Case Objective

Link analysis is an essential capability for threat intelligence and SOC analysts. Modern IT infrastructures are too vast and interconnected to analyze solely through text terminals. Using Maltego Community Edition (CE), the analyst will visually model an enterprise's external footprint by executing directed transforms that pivot from an apex domain entity to its authoritative DNS servers, MX gateways, IP address netblocks, and related ASNs.

---

## 🔍 Available Clues & Starting Point
1. **Target Apex Entity:** Enterprise Domain `fastly.com`.
2. **Analysis Environment:** Ubuntu LTS Workstation VM running Maltego CE.
3. **Seed Entities:** Domain Entity (`fastly.com`).
4. **Transform Hubs:** Maltego Standard Transforms, CT Log Transforms, Shodan Transforms (API key free tier).

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Initialize New Investigation Graph
1. Launch Maltego CE in your Ubuntu VM.
2. Create a new graph (`Ctrl + N`).
3. From the Entity Palette on the left, drag an **IPv4 Address** or **Domain** entity onto the central workspace canvas.
4. Rename the entity to `fastly.com`.

### Step 2: Execute Authoritative DNS Transforms
1. Right-click the `fastly.com` domain node.
2. Run Transform: **DNS from Domain $\rightarrow$ To DNS Name - NS (Name Server)**.
3. Observe the child nodes generated (e.g., `ns1.fastly.net`, `ns2.fastly.net`).
4. Run Transform: **DNS from Domain $\rightarrow$ To DNS Name - MX (Mail Server)**.
5. Note how Maltego automatically draws directed edges indicating functional relationships.

### Step 3: Resolve Name Servers to Netblocks and ASNs
1. Select all generated Name Server entities.
2. Run Transform: **To IP Address [DNS]**.
3. Select the resulting IP address nodes and run: **To Netblock [Routing]** followed by **To AS Number**.
4. Observe whether the Name Servers share an identical Autonomous System or are diversified across disparate geographic routing zones for redundancy.

### Step 4: Cluster Subdomains via Certificate Transparency Transforms
1. Return to the apex domain node `fastly.com`.
2. Run Transform: **Passive DNS / Certificate Transparency $\rightarrow$ To Subdomains**.
3. Group the resulting cluster into organic clusters using the **Ball-and-Stick** or **Organic** layout mode.
4. Identify outlier subdomains that do not follow corporate naming conventions.

---

## 📊 Expected Findings & Deliverables
* Exported Maltego Graph file (`.mtgx`) and high-resolution PNG render (`graph_export.png`).
* Complete entry in `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hash of the `.mtgx` file.
* Analysis of infrastructure resiliency (evaluating multi-region DNS provider redundancy).
* Admiralty-scored assessment (**A1**) based on visual transform telemetry.

---

## ⚖️ Ethical & Legal Boundary Invariant
* **Strict Invariant:** Do NOT execute any active port-scanning transforms or invasive web server transforms that send payload traffic to the target. Rely strictly on passive DNS and routing transforms.
