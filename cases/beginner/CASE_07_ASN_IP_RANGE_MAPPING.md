# 📂 Case File 07: Autonomous System Number (ASN) & IP Range Mapping

**Difficulty:** Beginner (Score: 3/10)  
**Standard Reference:** `CASE-BEG-007`  
**Target Entity:** Public Internet Service Provider or Cloud Provider (e.g., `Cloudflare` - AS13335, or `Fastly` - AS54113)  
**Investigative Focus:** Passive BGP Routing Telemetry, IP Prefix Allocation, and Multi-Cloud Footprinting  

---

## 🎯 Case Objective

Every organization with a significant public internet footprint routes traffic through an Autonomous System Number (ASN) governed by Regional Internet Registries (RIRs like ARIN, RIPE, APNIC). By querying BGP routing tables and public WHOIS registries, an analyst can map an enterprise's entire IP address range (CIDR blocks) without sending a single probe to their network.

In this case, the student will enumerate the registered IP address space, upstream transit providers, and peering relationships of an enterprise to determine whether their services are self-hosted or distributed across commercial cloud providers (AWS, Azure, GCP).

---

## 🔍 Available Clues & Starting Point
1. **Target Organization / ASN:** Fastly, Inc. (`AS54113`) or Cloudflare (`AS13335`).
2. **Public Routing Databases:**
   * [BGPView.io API](https://bgpview.io/)
   * [Hurricane Electric BGP Toolkit](https://bgp.he.net/)
   * [Team Cymru IP to ASN Mapping](https://www.team-cymru.com/ip-asn-mapping)
   * Regional WHOIS (ARIN REST API).
3. **CLI Tools:** `whois`, `curl`, `jq`, `prips` (or `cidr2ip` logic).

---

## 🛠️ Step-by-Step Investigative Walkthrough

### Step 1: Discover Target ASN via Domain WHOIS
1. Perform a passive DNS lookup on the target's primary domain to find its live IP address:
   ```bash
   dig +short A fastly.com | head -n 1
   ```
2. Query the IP against the Team Cymru WHOIS service to discover the authoritative ASN:
   ```bash
   whois -h whois.cymru.com "151.101.1.57"
   ```
3. Record the returned ASN (`AS54113`) and BGP prefix in your Evidence Log.

### Step 2: Query the BGPView REST API for Allocated Prefixes
1. Query the BGPView API to retrieve all IPv4 and IPv6 prefixes announced by this ASN:
   ```bash
   curl -s "https://api.bgpview.io/asn/54113/prefixes" > bgp_prefixes.json
   ```
2. Verify integrity and calculate SHA-256:
   ```bash
   sha256sum bgp_prefixes.json
   ```

### Step 3: Extract and Aggregate CIDR Blocks
1. Parse the announced IPv4 CIDR blocks using `jq`:
   ```bash
   jq -r '.data.ipv4_prefixes[].prefix' bgp_prefixes.json | sort -V > ipv4_prefixes.txt
   ```
2. Inspect the total number of announced IP blocks and estimate total public IP addresses owned:
   ```bash
   wc -l ipv4_prefixes.txt
   head -n 10 ipv4_prefixes.txt
   ```

### Step 4: Map Upstream Transit and Peering Partners
1. Query the ASN's upstream relationships to identify who provides the organization with internet connectivity:
   ```bash
   curl -s "https://api.bgpview.io/asn/54113/upstreams" > bgp_upstreams.json
   jq -r '.data.ipv4_upstreams[] | "\(.asn) - \(.name) (\(.country_code))"' bgp_upstreams.json
   ```
2. Document whether the organization relies on Tier 1 transit providers (e.g., Lumen/CenturyLink, Telia/Arelion, NTT).

---

## 📊 Expected Findings & Deliverables
* Complete entry in `EVIDENCE_LOG_TEMPLATE.md` with SHA-256 hashes of `bgp_prefixes.json`.
* Summary of total CIDR prefixes announced by the target organization.
* List of primary upstream transit providers that handle the target's internet traffic.
* Admiralty-scored assessment (**A1**) based on authoritative BGP routing registries.

---

## ⚖️ Ethical & Legal Boundary Invariant
* **Strict Invariant:** Do NOT run `nmap`, masscan, or port probes against the discovered IP ranges. Cataloging the address space is 100% legal; probing or scanning the IP addresses without explicit contract is a potential violation of the CFAA.
