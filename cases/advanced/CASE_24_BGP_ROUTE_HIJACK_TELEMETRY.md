# 📂 Case File 24: BGP Route Hijacking & Prefix Anomaly Forensics

**Difficulty:** Advanced (Score: 8/10)  
**Standard Reference:** `CASE-ADV-024`  
**Target Entity:** Public Historical BGP Routing Incident (e.g., historical route leak incidents involving Amazon Route 53 or Cloudflare)  
**Investigative Focus:** Border Gateway Protocol (BGP) Forensics, RPKI Validation, Route Leak Attribution, and Man-in-the-Middle (MitM) Telemetry  

---

## 🎯 Case Objective

Border Gateway Protocol (BGP) is the fundamental routing protocol that binds the global internet together. Because standard BGP inherently trusts routing announcements from neighboring Autonomous Systems, adversaries or misconfigured networks can announce unauthorized IP prefixes (BGP Hijacking / Route Leaks). This diverts traffic destined for financial, cryptocurrency, or corporate platforms through rogue transit providers for passive wiretapping or SSL-stripping interception.

In this case, the student will investigate a famous historical BGP route leak (e.g., the 2018 Amazon Route 53 DNS hijack) using public BGP routing archive collectors (RIPE RIS, RouteViews, BGPStream) to reconstruct the rogue announcement timeline and assess RPKI route origin validation defenses.

---

## 🔍 Available Clues & Starting Point
1. **Target Incident Incident Reference:** Historical Route 53 DNS Prefix Hijack (`205.251.192.0/24` hijacked by AS10297).
2. **Public BGP Repositories:**
   * [RIPE Stat (RIPE Network Coordination Centre)](https://stat.ripe.net/)
   * [University of Oregon Route Views Project](http://www.routeviews.org/)
   * [BGPStream (Cisco ThousandEyes)](https://bgpstream.crosswork.cisco.com/)
   * [Cloudflare Radar (Routing & Anomalies)](https://radar.cloudflare.com/)
3. **CLI Tools:** `curl`, `jq`, `bgpview`.

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Query RIPE Stat Routing History API
1. Query RIPE Stat for the historical visibility of the affected prefix during the incident window:
   ```bash
   curl -s "https://stat.ripe.net/data/routing-history/data.json?resource=205.251.192.0/24&starttime=2018-04-24T00:00:00&endtime=2018-04-24T23:59:59" > bgp_routing_history.json
   ```
2. Verify file capture and calculate checksum:
   ```bash
   sha256sum bgp_routing_history.json
   ```

### Step 2: Extract Origin ASN Changes (The Hijack Pivot)
1. Inspect the recorded origin Autonomous System for the IP prefix over the timeline:
   ```bash
   jq '.data.by_origin[] | {origin: .origin, prefixes: .prefixes}' bgp_routing_history.json
   ```
2. Identify the legitimate origin ASN (e.g., `AS16509` Amazon) vs. the unauthorized announcing ASN (e.g., `AS10297` eNet, Inc.).
3. Note the exact start timestamp and end timestamp of the rogue announcement window.

### Step 3: Analyze AS-Path Propagation & Upstream Enablers
1. Query the BGP update path to determine which Tier-1 or Tier-2 transit providers accepted and propagated the rogue announcement:
   ```bash
   curl -s "https://stat.ripe.net/data/bgp-updates/data.json?resource=205.251.192.0/24&starttime=2018-04-24T06:00:00&endtime=2018-04-24T08:00:00" > bgp_updates.json
   ```
2. Trace the upstream AS sequence (e.g., `AS10297 $\rightarrow$ AS6939 (Hurricane Electric) $\rightarrow$ Global Peers`).

### Step 4: Evaluate RPKI (Resource Public Key Infrastructure) Defenses
1. Examine why the hijack succeeded:
   * Did the legitimate prefix owner have a published Route Origin Authorization (ROA) signed in the RIR database at the time?
   * Was Route Origin Validation (ROV) enforced by global upstream carriers?
2. Detail how modern RPKI invalid-drop policies prevent this class of route hijacking today.

---

## 📊 Expected Findings & Deliverables
* Complete entry in `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hash of `bgp_routing_history.json`.
* Chronological forensic timeline of the BGP hijack (Announcement $\rightarrow$ Global Propagation $\rightarrow$ Detection $\rightarrow$ Withdrawal).
* AS-Path traversal diagram detailing transit providers that failed to filter the rogue route.
* Admiralty-scored assessment (**A1**) based on immutable RIPE RIS global BGP collector archives.

---

## ⚖️ Ethical & Legal Boundary Invariant
* **Strict Invariant:** Do NOT attempt to configure, advertise, or inject rogue BGP routes onto the public internet. All investigation is conducted strictly through historical public routing archive collectors.
