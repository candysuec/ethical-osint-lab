# 🛠️ Section 03: Tool Installation & Environment Verification

**Standard Reference:** `OSINT-LAB-SEC-03`  
**Classification:** `PUBLIC / TLP:CLEAR`  

---

## 📦 Tool Suite Inventory

| Category | Tool | License | Target VM / Host | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Link Analysis** | **Maltego Community Edition** | Free Account | Ubuntu / Host | Visual entity linking, DNS transform graphing. |
| **OSINT Framework** | **SpiderFoot** | MIT (Open Source) | Kali / Ubuntu | Automated OSINT collection against domains & IPs. |
| **Username OSINT** | **Sherlock** | MIT (Open Source) | Kali Linux | Searching usernames across 400+ public platforms. |
| **Deep Profile OSINT**| **Maigret** | MIT (Open Source) | Kali Linux | Enhanced username profiling, recursive dossiers. |
| **Recon Framework** | **Recon-ng** | Free / Open Source | Kali Linux | Modular reconnaissance framework with SQLite DB. |
| **Domain Harvesting**| **TheHarvester** | GPL-2.0 | Kali Linux | Passive email, subdomain, and employee enumeration. |
| **Knowledge Vault** | **Obsidian** | Free / Community | Windows 11 Host | Markdown knowledge base, evidence ledger, graph view. |
| **Sandboxed Web** | **Firefox Multi-Account** | MPL-2.0 | Ubuntu VM | Isolated browser containers for separate research scopes.|

---

## 🚀 Step-by-Step Installation Commands

### 1. Update Linux Package Repositories
Run inside both Kali and Ubuntu VMs:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git python3 python3-pip python3-venv curl jq whois dnsutils
```

### 2. Install SpiderFoot (Automated Reconnaissance)
```bash
cd ~
git clone https://github.com/smicallef/spiderfoot.git
cd spiderfoot
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# Launch web interface on port 5001:
python3 sf.py -l 127.0.0.1:5001
```
*Access SpiderFoot in VM browser at: `http://127.0.0.1:5001`*

### 3. Install Sherlock (Username Enumeration)
```bash
cd ~
git clone https://github.com/sherlock-project/sherlock.git
cd sherlock
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 sherlock --help
```

### 4. Install Maigret
```bash
cd ~
python3 -m pip install --user maigret
# Or via git:
git clone https://github.com/soxoj/maigret.git
cd maigret
pip install -r requirements.txt
```

### 5. Verify Kali Built-in Recon Tools
Kali Linux includes `theHarvester` and `recon-ng` out of the box:
```bash
theHarvester -h
recon-ng --help
```

---

## 🧪 Tool Verification Exercise (Sanity Check)

To ensure tools are functioning without touching protected private assets, run passive validation against an authorized public foundation:

```bash
# Query certificate transparency for Wikimedia
theHarvester -d wikimedia.org -b crtsh,certspotter -l 50

# Check public DNS records using dig
dig +short MX wikimedia.org
dig +short TXT wikimedia.org
```

If subdomains and DNS records return cleanly, your network isolation and passive OSINT toolchain are ready.
