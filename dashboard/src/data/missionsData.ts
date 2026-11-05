export interface MissionStep {
  name: string;
  tool: string;
  command: string;
  output: string;
  highlightLine: string;
  decoderTitle: string;
  decoderExplanation: string;
  remediation?: string;
  admiraltyScore: string;
}

export interface MissionQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Mission {
  id: string;
  caseNumber: string;
  tier: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  title: string;
  officialCaseFile: string;
  target: string;
  difficulty: number;
  xp: number;
  category: string;
  oneSentenceObjective: string;
  safeTargetDescription: string;
  steps: MissionStep[];
  quiz: MissionQuestion;
  badgeEarned: string;
}

export const missionsData: Mission[] = [
  // ==========================================
  // BEGINNER TIER (CASES 01 - 10)
  // ==========================================
  {
    id: 'mission-01',
    caseNumber: 'CASE-BEG-001',
    tier: 'BEGINNER',
    title: 'Finding Corporate Subsidiaries in SEC EDGAR Filings',
    officialCaseFile: 'cases/beginner/CASE_01_SEC_EDGAR_DISCLOSURES.md',
    target: 'Uber Technologies, Inc. (CIK: 0001543151)',
    difficulty: 2,
    xp: 100,
    category: 'Corporate Due Diligence',
    oneSentenceObjective: 'Discover all legally registered global child companies and shell entities filed under SEC Exhibit 21.',
    safeTargetDescription: '100% public regulatory disclosures mandated by US Federal Securities laws.',
    steps: [
      {
        name: 'Query SEC EDGAR Form 10-K Exhibit 21',
        tool: 'SEC EDGAR Public API / curl',
        command: 'curl -s -A "StudentResearch/1.0" "https://data.sec.gov/submissions/CIK0001543151.json" | grep -A 5 "Exhibit 21"',
        output: `[EXHIBIT 21.1 - SUBSIDIARIES OF UBER TECHNOLOGIES, INC.]
1. Rasier, LLC (Delaware, USA) - Rideshare Operations
2. Uber Portier B.V. (Amsterdam, Netherlands) - Uber Eats EMEA Operations
3. JUMP Bicycles LLC (Delaware, USA) - Micro-mobility Entity
4. Careem Networks FZ-LLC (Dubai, UAE) - Middle East Operations
5. Apparate USA LLC (Delaware, USA) - Advanced Technologies Group HoldCo`,
        highlightLine: 'Uber Portier B.V. (Amsterdam, Netherlands) - Uber Eats EMEA Operations',
        decoderTitle: '💡 Corporate Shell Pivot Found',
        decoderExplanation: 'Public corporations file Exhibit 21 every year listing all legal subsidiaries. Uber Portier B.V. is a Dutch entity used for international billing and tax routing, providing a fresh legal jurisdiction to investigate.',
        remediation: 'Regulatory disclosure required by law; verify that all intellectual property and local data privacy registrations in the Netherlands match this entity.',
        admiraltyScore: 'A1'
      }
    ],
    quiz: {
      question: 'Which SEC annual filing exhibit specifically mandates the disclosure of all corporate subsidiaries?',
      options: ['Exhibit 10 (Material Contracts)', 'Exhibit 21 (Subsidiaries of the Registrant)', 'Exhibit 99 (Press Releases)', 'Exhibit 31 (CEO Certification)'],
      correctIndex: 1,
      explanation: 'Item 601(b)(21) of Regulation S-K requires Form 10-K filers to attach Exhibit 21 listing all significant subsidiaries and their state/country of incorporation.'
    },
    badgeEarned: '🏛️ Corporate Structure Auditor'
  },
  {
    id: 'mission-02',
    caseNumber: 'CASE-BEG-002',
    tier: 'BEGINNER',
    title: 'Can Scammers Spoof This CEO\'s Email? (SPF & DMARC)',
    officialCaseFile: 'cases/beginner/CASE_02_DNS_MAIL_SECURITY_AUDIT.md',
    target: 'fastly.com',
    difficulty: 2,
    xp: 100,
    category: 'DNS & Mail Hygiene',
    oneSentenceObjective: 'Determine if an attacker can forge emails from this domain to commit Executive Impersonation or Wire Fraud.',
    safeTargetDescription: 'Passive DNS TXT queries over open internet root servers.',
    steps: [
      {
        name: 'Query Authoritative SPF & DMARC Records',
        tool: 'dig (BIND DNS)',
        command: 'dig +noall +answer TXT fastly.com _dmarc.fastly.com',
        output: `fastly.com.        300 IN TXT "v=spf1 include:_spf.google.com include:sendgrid.net ~all"
_dmarc.fastly.com. 300 IN TXT "v=DMARC1; p=none; rua=mailto:dmarc-reports@fastly.com"`,
        highlightLine: 'v=DMARC1; p=none; rua=mailto:dmarc-reports@fastly.com',
        decoderTitle: '🚨 Critical Weakness: Policy Set to "p=none" (Monitor Only)',
        decoderExplanation: 'The tag "p=none" means the domain tells receiving mail servers: "If an email fails SPF/DKIM verification, deliver it anyway and just send us an email report." Criminals can send emails claiming to be CEO@fastly.com and recipient mailboxes will not reject them!',
        remediation: 'Upgrade the DMARC policy from "p=none" to "p=quarantine" (spam folder) and eventually "p=reject" (block outright).',
        admiraltyScore: 'A1'
      }
    ],
    quiz: {
      question: 'What DMARC policy parameter instruction tells mail servers to immediately reject and block fraudulent spoofed emails?',
      options: ['p=none', 'p=monitor', 'p=quarantine', 'p=reject'],
      correctIndex: 3,
      explanation: 'p=reject is the strictest DMARC policy. Receiving servers will drop unauthenticated emails at the SMTP boundary.'
    },
    badgeEarned: '🛡️ Mail Spoofing Auditor'
  },
  {
    id: 'mission-03',
    caseNumber: 'CASE-BEG-003',
    tier: 'BEGINNER',
    title: 'Uncovering Secret Subdomains via Certificate Transparency',
    officialCaseFile: 'cases/beginner/CASE_03_CERT_TRANSPARENCY_LOGS.md',
    target: 'cloudflare.com',
    difficulty: 3,
    xp: 110,
    category: 'SSL/TLS Intelligence',
    oneSentenceObjective: 'Detect unannounced dev portals and staging servers using public immutable TLS certificate logs.',
    safeTargetDescription: 'CT logs are cryptographic public ledgers maintained by Google, Cloudflare, and DigiCert.',
    steps: [
      {
        name: 'Query crt.sh Certificate Transparency Database',
        tool: 'crt.sh Public API',
        command: 'curl -s "https://crt.sh/?q=%25.cloudflare.com&output=json" | jq -r \'.[].name_value\' | sort -u | head -n 6',
        output: `api.cloudflare.com
dash.cloudflare.com
dev-admin.internal-test.cloudflare.com
staging-portal.edge.cloudflare.com
workers.dev
vpn-us-west.staging.cloudflare.com`,
        highlightLine: 'dev-admin.internal-test.cloudflare.com',
        decoderTitle: '💡 Hidden Staging Infrastructure Discovered',
        decoderExplanation: 'Whenever engineers create a new SSL/TLS certificate (even for an internal staging server), Certificate Authorities must publish it to public CT logs. Attackers use this to find forgotten test environments.',
        remediation: 'Use wildcard certificates (*.corp.example.com) so specific staging hostnames are not leaked into public transparency logs.',
        admiraltyScore: 'A1'
      }
    ],
    quiz: {
      question: 'Why do staging and internal subdomains appear in public Certificate Transparency logs?',
      options: [
        'Because Google indexes private company intranets',
        'Because Certificate Authorities are cryptographically required to log every issued TLS certificate publicly',
        'Because DNS servers broadcast their cache to the dark web',
        'Because engineers accidentally publish their source code to GitHub'
      ],
      correctIndex: 1,
      explanation: 'RFC 6962 requires CAs to submit all issued certificates to append-only public CT logs to prevent rogue certificate issuance.'
    },
    badgeEarned: '🔍 Certificate Hunter'
  },
  {
    id: 'mission-04',
    caseNumber: 'CASE-BEG-004',
    tier: 'BEGINNER',
    title: 'Wayback Machine: Recovering Scrubbed Corporate Leaks',
    officialCaseFile: 'cases/beginner/CASE_04_WAYBACK_HISTORICAL_DRIFT.md',
    target: 'archive.org / WayBack Machine',
    difficulty: 3,
    xp: 110,
    category: 'Historical Web Archives',
    oneSentenceObjective: 'Extract deleted executive team bios and former engineering vendor credentials archived 5 years ago.',
    safeTargetDescription: 'Open historical internet archives managed by the Internet Archive non-profit.',
    steps: [
      {
        name: 'Query CDX API for Deleted Security Advisory',
        tool: 'Wayback Machine CDX API',
        command: 'curl -s "https://web.archive.org/cdx/search/cdx?url=target-corp.com/security/*&output=json" | head -n 4',
        output: `[["urlkey","timestamp","original","mimetype","statuscode","digest","length"],
["com,target-corp)/security/2021-incident-notes.pdf","20210415123000","https://target-corp.com/security/2021-incident-notes.pdf","application/pdf","200","SHA256:7a9f...","14209"],
["com,target-corp)/security/internal-vpn-guide.html","20220110091522","https://target-corp.com/security/internal-vpn-guide.html","text/html","200","SHA256:88bc...","8432"]]`,
        highlightLine: 'https://target-corp.com/security/internal-vpn-guide.html',
        decoderTitle: '💡 Scrubbed Internal Documentation Retrieved',
        decoderExplanation: 'Companies often delete embarrassing or sensitive documentation from their live website, but web crawlers archived it years earlier. This internal VPN guide reveals legacy login gateways and multi-factor instructions.',
        remediation: 'Submit removal requests to archive.org or ensure sensitive URLs were never exposed to anonymous indexing in the first place.',
        admiraltyScore: 'B1'
      }
    ],
    quiz: {
      question: 'Which API provided by the Internet Archive allows automated searching of historical snapshot timestamps and MIME types?',
      options: ['REST Crawler API', 'Wayback CDX Server API', 'Internet Archive S3 Gateway', 'Archive.org Tor Scraper'],
      correctIndex: 1,
      explanation: 'The Wayback Machine CDX Server API provides index-level queries for historical snapshots without needing to load full web pages.'
    },
    badgeEarned: '⏳ Time Machine Investigator'
  },
  {
    id: 'mission-05',
    caseNumber: 'CASE-BEG-005',
    tier: 'BEGINNER',
    title: 'Robots.txt & Sitemap: The Accidental Secret Map',
    officialCaseFile: 'cases/beginner/CASE_05_ROBOTS_SITEMAP_ANALYSIS.md',
    target: 'reddit.com',
    difficulty: 2,
    xp: 100,
    category: 'Web Metadata',
    oneSentenceObjective: 'Inspect instructions given to search crawlers to reveal hidden admin panels and unlisted endpoints.',
    safeTargetDescription: 'Public root robots.txt file designed specifically for web spiders.',
    steps: [
      {
        name: 'Fetch and Parse Root robots.txt',
        tool: 'curl (HTTP GET)',
        command: 'curl -s -L "https://www.reddit.com/robots.txt" | grep -i "Disallow:" | head -n 6',
        output: `User-agent: *
Disallow: /admin/
Disallow: /experiments/
Disallow: /internal_canary/
Disallow: /api/v2/private_alpha/
Disallow: /login/debug/`,
        highlightLine: 'Disallow: /internal_canary/',
        decoderTitle: '💡 Disallow Rules Function as an Attack Surface Map',
        decoderExplanation: 'Web administrators tell Google "Please do not look at /internal_canary/". But robots.txt is completely public! By reading this, security auditors instantly know where unlisted features are hosted.',
        remediation: 'Do not use robots.txt as an access control mechanism. Place admin panels behind VPNs or Zero-Trust authentication instead.',
        admiraltyScore: 'A1'
      }
    ],
    quiz: {
      question: 'What is the primary security flaw with using robots.txt Disallow directives to hide sensitive portals?',
      options: [
        'Robots.txt causes web servers to crash',
        'Robots.txt is world-readable, providing an index of sensitive paths to all adversaries',
        'Robots.txt encrypts your DNS records',
        'Search engines delete websites that have robots.txt'
      ],
      correctIndex: 1,
      explanation: 'Robots.txt is an advisory protocol for ethical web crawlers. Any human or malicious actor can read it to find hidden directories.'
    },
    badgeEarned: '🤖 Crawler Sleuth'
  },
  {
    id: 'mission-06',
    caseNumber: 'CASE-BEG-006',
    tier: 'BEGINNER',
    title: 'Document EXIF & Creator Metadata Extraction',
    officialCaseFile: 'cases/beginner/CASE_06_DOCUMENT_METADATA_EXTRACTION.md',
    target: 'Public Corporate PDF Whitepaper',
    difficulty: 2,
    xp: 100,
    category: 'Forensic Metadata',
    oneSentenceObjective: 'Extract author usernames, local operating systems, and file paths embedded inside public corporate brochures.',
    safeTargetDescription: 'Passive inspection of publicly hosted marketing assets.',
    steps: [
      {
        name: 'Run Exiftool Metadata Audit',
        tool: 'exiftool forensic parser',
        command: 'exiftool -Creator -Author -Producer -Software -CreateDate corporate_quarterly_report.pdf',
        output: `File Name                       : corporate_quarterly_report.pdf
File Size                       : 2.4 MB
Author                          : jsmith
Creator                         : Microsoft Word for Microsoft 365
Producer                        : macOS Version 14.5 (Build 23F79) Quartz PDFContext
Create Date                     : 2026:09:14 14:22:08-04:00
Source File Path                : /Users/jsmith/Documents/HR_Restructuring/confidential_draft.docx`,
        highlightLine: 'Author : jsmith | /Users/jsmith/Documents/HR_Restructuring/',
        decoderTitle: '💡 Internal Username & Directory Structure Leaked',
        decoderExplanation: 'When staff convert documents to PDF, default office suites embed the operating system username ("jsmith") and original file path. This provides threat actors with internal usernames for password-spraying attacks.',
        remediation: 'Enforce automated metadata stripping pipelines before publishing public documents.',
        admiraltyScore: 'A1'
      }
    ],
    quiz: {
      question: 'Which tool is the industry standard open-source utility for reading and writing embedded EXIF metadata in documents and images?',
      options: ['nmap', 'exiftool', 'john the ripper', 'aircrack-ng'],
      correctIndex: 1,
      explanation: 'ExifTool by Phil Harvey is the premier digital forensics standard for inspecting metadata across hundreds of file formats.'
    },
    badgeEarned: '📄 Document Forensics Specialist'
  },
  {
    id: 'mission-07',
    caseNumber: 'CASE-BEG-007',
    tier: 'BEGINNER',
    title: 'Mapping Autonomous System Numbers (ASN) & IP Ranges',
    officialCaseFile: 'cases/beginner/CASE_07_ASN_IP_RANGE_MAPPING.md',
    target: 'Fastly Inc. (AS54113)',
    difficulty: 3,
    xp: 120,
    category: 'Network Infrastructure',
    oneSentenceObjective: 'Identify every single public IP range owned by an enterprise through BGP routing tables.',
    safeTargetDescription: 'Global public Border Gateway Protocol (BGP) routing announcements.',
    steps: [
      {
        name: 'Query BGPView API for Announced IPv4 Prefixes',
        tool: 'bgpview.io API / whois',
        command: 'curl -s "https://api.bgpview.io/asn/54113/prefixes" | jq \'.data.ipv4_prefixes[0:3]\'',
        output: `[
  {
    "prefix": "151.101.0.0/16",
    "name": "FASTLY - Fastly",
    "description": "Fastly Global Content Delivery Network",
    "country_code": "US"
  },
  {
    "prefix": "199.232.0.0/16",
    "name": "FASTLY - Fastly",
    "description": "Anycast Edge Fleet",
    "country_code": "US"
  }
]`,
        highlightLine: 'prefix: 151.101.0.0/16 (65,536 Addresses)',
        decoderTitle: '💡 Complete Network Perimeter Identified',
        decoderExplanation: 'An Autonomous System Number (ASN) controls how internet traffic reaches a company. AS54113 owns entire /16 blocks (65k IPs each). Knowing the ASN bounds the legal scope of defensive OSINT.',
        remediation: 'Regularly audit route announcements to detect anomalous BGP leaks or rogue prefixes.',
        admiraltyScore: 'A1'
      }
    ],
    quiz: {
      question: 'What protocol governs how Autonomous Systems (ASNs) exchange routing and reachability information across the internet?',
      options: ['DNS (Domain Name System)', 'BGP (Border Gateway Protocol)', 'SMTP (Simple Mail Transfer Protocol)', 'DHCP (Dynamic Host Configuration Protocol)'],
      correctIndex: 1,
      explanation: 'BGP is the routing backbone of the internet, directing packets between autonomous network networks.'
    },
    badgeEarned: '🌐 BGP Cartographer'
  },
  {
    id: 'mission-08',
    caseNumber: 'CASE-BEG-008',
    tier: 'BEGINNER',
    title: 'Detecting Leaked API Keys in Git Commit Histories',
    officialCaseFile: 'cases/beginner/CASE_08_OPEN_SOURCE_REPO_MINING.md',
    target: 'GitHub Public Repositories',
    difficulty: 3,
    xp: 120,
    category: 'Source Code Intelligence',
    oneSentenceObjective: 'Identify credentials that developers deleted in a later commit but left preserved in Git history.',
    safeTargetDescription: 'Public open-source repository commit hashes.',
    steps: [
      {
        name: 'Analyze Deleted Commits via Git Log Diff',
        tool: 'git log / TruffleHog',
        command: 'git log -p -S "AKIA" -- ./config/',
        output: `commit 4d8e12f6a10bc39e1a90f84501
Author: dev-intern <intern@corp.org>
Date:   Wed Jun 12 11:20:19 2026 -0400

    Remove accidental AWS secret key before production deploy

diff --git a/config/aws.env b/config/aws.env
- AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"
- AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
+ AWS_ACCESS_KEY_ID=""`,
        highlightLine: 'AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"',
        decoderTitle: '🚨 High Severity: Live Credential in Git History',
        decoderExplanation: 'Deleting a secret file with "git rm" or pushing a new commit does NOT remove it from Git history! Every historical version is preserved. Attackers clone public repos and parse commit logs.',
        remediation: 'Immediately revoke the leaked key in the cloud IAM console and run BFG Repo-Cleaner or git-filter-repo.',
        admiraltyScore: 'A1'
      }
    ],
    quiz: {
      question: 'Why does pushing a new commit that deletes an API key fail to protect against credential harvesting?',
      options: [
        'Because GitHub notifies hackers automatically',
        'Because Git stores the entire commit history and diffs indefinitely unless explicitly purged and force-pushed',
        'Because API keys can never be revoked once created',
        'Because the terminal saves your clipboard history'
      ],
      correctIndex: 1,
      explanation: 'Git is an immutable version control graph. Unless historical commits are rewritten with tools like git-filter-repo, past commits retain the secrets.'
    },
    badgeEarned: '🔑 Secret Exposure Hunter'
  },
  {
    id: 'mission-09',
    caseNumber: 'CASE-BEG-009',
    tier: 'BEGINNER',
    title: 'Boardroom Cross-Directorships & Conflict of Interest',
    officialCaseFile: 'cases/beginner/CASE_09_EXECUTIVE_BOARD_GOVERNANCE.md',
    target: 'SEC Form DEF 14A Proxy Statement',
    difficulty: 3,
    xp: 120,
    category: 'Executive Governance',
    oneSentenceObjective: 'Map overlapping board seats between competing defense suppliers using public investor proxy filings.',
    safeTargetDescription: 'Mandatory SEC corporate governance proxy disclosures.',
    steps: [
      {
        name: 'Parse Board Governance Disclosures',
        tool: 'SEC EDGAR DEF 14A',
        command: 'grep -A 8 "Board of Directors" DEF14A_proxy_filing.txt',
        output: `DIRECTOR PROFILE: Dr. Eleanor Vance, Age 58
Independent Director since 2019
Committees: Audit Committee (Chair), Cyber Risk Oversight
Other Public Company Directorships:
 - Apex Satellite Systems, Inc. (2018 - Present)
 - CyberShield Technologies Corp. (2021 - Present)
Stock Ownership: 42,500 Shares`,
        highlightLine: 'Apex Satellite Systems, Inc. & CyberShield Technologies Corp.',
        decoderTitle: '💡 Interlocking Directorship Discovered',
        decoderExplanation: 'When one individual serves on the board of multiple companies in the same sector, this is an "interlocking directorship". OSINT analysts track this to detect supply-chain conflicts and M&A insider movements.',
        remediation: 'Ensure board ethics disclosures comply with antitrust interlocking directorate regulations (Clayton Act Section 8).',
        admiraltyScore: 'A1'
      }
    ],
    quiz: {
      question: 'Which SEC disclosure statement provides shareholder information regarding executive compensation, board elections, and committee roles?',
      options: ['Form 8-K', 'Form 10-Q', 'Form DEF 14A (Definitive Proxy Statement)', 'Schedule 13D'],
      correctIndex: 2,
      explanation: 'Form DEF 14A is filed prior to the annual shareholder meeting and provides complete profiles of board members and executive pay.'
    },
    badgeEarned: '👔 Boardroom Cartographer'
  },
  {
    id: 'mission-10',
    caseNumber: 'CASE-BEG-010',
    tier: 'BEGINNER',
    title: 'Dangling CNAME DNS Records & Subdomain Takeover',
    officialCaseFile: 'cases/beginner/CASE_10_DANGLING_CNAME_TAKEOVER.md',
    target: 'legacy-blog.target-enterprise.com',
    difficulty: 4,
    xp: 130,
    category: 'DNS Vulnerabilities',
    oneSentenceObjective: 'Detect DNS CNAME pointers that point to abandoned third-party services (S3, GitHub Pages, Heroku).',
    safeTargetDescription: 'Passive DNS resolution queries against public name servers.',
    steps: [
      {
        name: 'Query DNS CNAME Pointer & HTTP Response',
        tool: 'dig & curl',
        command: 'dig +noall +answer CNAME blog.target-enterprise.com && curl -s -I https://blog.target-enterprise.com',
        output: `blog.target-enterprise.com. 300 IN CNAME customer-portal-abc.herokuapp.com.

HTTP/1.1 404 Not Found
Server: Cowboy
Connection: keep-alive
Content-Type: text/html
X-Heroku-Warning: There is no app configured at that hostname. Perhaps the app owner has renamed it?`,
        highlightLine: 'X-Heroku-Warning: There is no app configured at that hostname.',
        decoderTitle: '🚨 Critical Risk: Subdomain Takeover Vulnerability',
        decoderExplanation: 'The domain "blog.target-enterprise.com" still points to Heroku via a CNAME record, but the Heroku app was deleted! An attacker can register "customer-portal-abc" on Heroku and claim full ownership of the target company\'s subdomain!',
        remediation: 'Delete the orphaned CNAME DNS record immediately or re-register the backend resource.',
        admiraltyScore: 'A1'
      }
    ],
    quiz: {
      question: 'What condition allows an adversary to execute a Subdomain Takeover attack?',
      options: [
        'The target server has an outdated SSL certificate',
        'A DNS record points to a decommissioned external cloud service whose name is now available for anyone to register',
        'The firewall blocks incoming UDP port 53 packets',
        'The company uses Gmail for corporate mail'
      ],
      correctIndex: 1,
      explanation: 'When a DNS CNAME points to an unclaimed cloud resource (e.g. AWS S3 bucket, GitHub Page, Heroku app), an attacker can claim that resource name and serve content under the trusted domain.'
    },
    badgeEarned: '🎯 Subdomain Guardian'
  },

  // ==========================================
  // INTERMEDIATE TIER (CASES 11 - 20)
  // ==========================================
  {
    id: 'mission-11',
    caseNumber: 'CASE-INT-011',
    tier: 'INTERMEDIATE',
    title: 'Multi-Tier Infrastructure Graphing (Maltego Style)',
    officialCaseFile: 'cases/intermediate/CASE_11_MALTEGO_INFRASTRUCTURE_PIVOT.md',
    target: 'apex-holding-corp.com',
    difficulty: 5,
    xp: 150,
    category: 'Link Analysis',
    oneSentenceObjective: 'Map 4 degrees of separation from domain to MX, Name Servers, IP subnets, and corporate registration.',
    safeTargetDescription: 'Passive graph correlation of public WHOIS and DNS records.',
    steps: [
      {
        name: 'Resolve Entity Links via Graph Transform Engine',
        tool: 'OSINT Graph Transform API',
        command: 'pivot --domain apex-holding-corp.com --depth 2 --types NS,MX,IP,ORG',
        output: `[ENTITY GRAPH EXPANSION: apex-holding-corp.com]
[NODE] Domain: apex-holding-corp.com
  ├── [EDGE: MX_RECORD] ──> mail.apex-holding-corp.com (198.51.100.22)
  ├── [EDGE: NS_RECORD] ──> ns1.apex-nameservers.net (Shared with 14 other domains)
  └── [EDGE: REGISTRANT_ORG] ──> Apex International Logistics Ltd (UK Co #09412852)
        └── [EDGE: CO_OFFICER] ──> Richard Vance (Director)`,
        highlightLine: 'Shared with 14 other domains | Apex International Logistics Ltd',
        decoderTitle: '💡 Shared Infrastructure & Sister Companies Identified',
        decoderExplanation: 'By pivoting from NS records and corporate registration numbers, we uncover 14 sister companies hosted on the exact same private nameserver that share the same corporate director.',
        remediation: 'Isolate mission-critical production infrastructure from legacy subsidiaries.',
        admiraltyScore: 'A2'
      }
    ],
    quiz: {
      question: 'In visual intelligence graphing, what does a "Transform" represent?',
      options: [
        'A database corruption error',
        'A function that takes an input entity (e.g. Domain) and queries an OSINT source to return related entities (e.g. IPs, MX records)',
        'An encryption algorithm',
        'A method to wipe hard drives'
      ],
      correctIndex: 1,
      explanation: 'In tools like Maltego, Transforms are API queries that expand a node into connected nodes (e.g. DNS transforms, IP transforms, social transforms).'
    },
    badgeEarned: '🕸️ Link Analysis Master'
  },
  {
    id: 'mission-12',
    caseNumber: 'CASE-INT-012',
    tier: 'INTERMEDIATE',
    title: 'Historical WHOIS: Unmasking Privacy-Shielded Owners',
    officialCaseFile: 'cases/intermediate/CASE_12_HISTORICAL_WHOIS_UNMASKING.md',
    target: 'suspicious-financial-login.com',
    difficulty: 5,
    xp: 160,
    category: 'Domain Intelligence',
    oneSentenceObjective: 'Find the real owner of a domain whose current WHOIS is hidden behind "Privacy Protect LLC".',
    safeTargetDescription: 'Historical WHOIS archives recorded before privacy services were enabled.',
    steps: [
      {
        name: 'Query Historical WHOIS Database (2018-2022)',
        tool: 'WhoisXML Historical API',
        command: 'curl -s "https://historical-whois.osint.local/api?domain=suspicious-financial-login.com&year=2021"',
        output: `[HISTORICAL SNAPSHOT: 2021-03-12]
Domain Name: suspicious-financial-login.com
Registrant Name: Mark Lindqvist
Registrant Organization: Lindqvist Security Consulting
Registrant Street: Vesterbrogade 44
Registrant City: Copenhagen, Denmark
Registrant Email: mark.lindqvist@privatemail-dk.net
Current Status (2026): REDACTED FOR PRIVACY / Withheld by GDPR`,
        highlightLine: 'Registrant Name: Mark Lindqvist | Copenhagen, Denmark',
        decoderTitle: '💡 True Registrant Identity Recovered from Pre-GDPR Snapshot',
        decoderExplanation: 'When domain owners buy privacy protection, they often do so years AFTER initial registration. Historical WHOIS databases index earlier unmasked records, piercing the anonymity shield.',
        remediation: 'Ensure privacy protection is enabled at the exact second of initial domain registration.',
        admiraltyScore: 'A1'
      }
    ],
    quiz: {
      question: 'Why are historical WHOIS databases able to reveal identities that are currently masked by privacy services or GDPR?',
      options: [
        'Because they hack into domain registrar servers',
        'Because they maintain immutable time-stamped copies of WHOIS records created before privacy was purchased',
        'Because registrars are forced to email user passwords to ICANN',
        'Because GDPR was repealed in 2024'
      ],
      correctIndex: 1,
      explanation: 'Historical WHOIS archives continuously snapshot WHOIS records. If a domain was registered without privacy for even one day, that snapshot remains in historical archives forever.'
    },
    badgeEarned: '🕵️ Historic WHOIS Hunter'
  },
  {
    id: 'mission-13',
    caseNumber: 'CASE-INT-013',
    tier: 'INTERMEDIATE',
    title: 'Reverse IP Co-Tenancy & Shared Server Neighbors',
    officialCaseFile: 'cases/intermediate/CASE_13_REVERSE_IP_SHARED_HOSTING.md',
    target: '203.0.113.88',
    difficulty: 5,
    xp: 150,
    category: 'Server Intelligence',
    oneSentenceObjective: 'Determine every other website sharing the same web server IP address as your investigation target.',
    safeTargetDescription: 'Passive reverse DNS and HTTP Server Name Indication (SNI) telemetry.',
    steps: [
      {
        name: 'Execute Reverse IP Multi-Tenancy Lookup',
        tool: 'HackerTarget / ViewDNS API',
        command: 'curl -s "https://api.hackertarget.com/reverseiplookup/?q=203.0.113.88"',
        output: `[REVERSE IP RESOLUTION FOR 203.0.113.88]
Total Hosts Found: 4
1. corporate-primary-portal.com (Target)
2. dev-crypto-exchange.io (High Risk)
3. vance-personal-portfolio.net (Executive Personal Site)
4. old-backup-server-2022.com (Legacy Unpatched Apache)`,
        highlightLine: 'vance-personal-portfolio.net & old-backup-server-2022.com',
        decoderTitle: '💡 Critical Neighboring Asset Vulnerability',
        decoderExplanation: 'A company may think their primary portal is secure, but it shares the same server and IP with an abandoned legacy backup server and an executive personal site! If the neighbor is compromised, the primary target is at risk.',
        remediation: 'Migrate mission-critical production services to dedicated VPC instances or isolated IP space.',
        admiraltyScore: 'A1'
      }
    ],
    quiz: {
      question: 'What is the primary risk of "bad neighborhood" co-tenancy on shared web hosting IP addresses?',
      options: [
        'Your internet speed becomes 10x faster',
        'A security vulnerability on a neighboring site sharing the same server or IP reputation can compromise or blacklist your organization',
        'DNS queries will fail globally',
        'SSL certificates become free of charge'
      ],
      correctIndex: 1,
      explanation: 'Co-tenancy means other domains share the same physical server or IP address. If a neighboring domain sends spam or gets hacked, your IP reputation is destroyed.'
    },
    badgeEarned: '🏢 Co-Tenancy Investigator'
  },
  {
    id: 'mission-14',
    caseNumber: 'CASE-INT-014',
    tier: 'INTERMEDIATE',
    title: 'OpenAPI & Swagger Schema Leaks: The API Blueprint',
    officialCaseFile: 'cases/intermediate/CASE_14_OPEN_API_SWAGGER_LEAKS.md',
    target: 'api.target-fintech.com',
    difficulty: 6,
    xp: 170,
    category: 'API Surface Auditing',
    oneSentenceObjective: 'Discover public OpenAPI/Swagger JSON specifications left unauthenticated on production API gateways.',
    safeTargetDescription: 'Standard HTTP GET requests to standard documentation endpoints.',
    steps: [
      {
        name: 'Check Standard Swagger UI Endpoints',
        tool: 'curl (HTTP GET)',
        command: 'curl -s "https://api.target-fintech.com/v3/api-docs" | jq \'.paths | keys[0:5]\'',
        output: `[
  "/api/v1/auth/token",
  "/api/v1/users/profile",
  "/api/v2/internal/debug-dump-database",
  "/api/v2/admin/override-kyc-status",
  "/api/v3/webhooks/payment-callback"
]`,
        highlightLine: '/api/v2/internal/debug-dump-database',
        decoderTitle: '🚨 High Risk: Internal Administrative Endpoints Exposed in Schema',
        decoderExplanation: 'Swagger and OpenAPI documentation lists every endpoint, required parameter, and error code. Finding an unauthenticated "/debug-dump-database" endpoint is a goldmine for attackers.',
        remediation: 'Disable Swagger UI and public OpenAPI schema rendering on production servers.',
        admiraltyScore: 'A1'
      }
    ],
    quiz: {
      question: 'Why should public access to Swagger UI and OpenAPI documentation endpoints (/v3/api-docs) be restricted in production?',
      options: [
        'Because OpenAPI files consume too much hard drive space',
        'Because they provide attackers with an exact blueprint of internal endpoints, authentication flows, and hidden parameters',
        'Because Swagger requires a paid enterprise subscription',
        'Because OpenAPI breaks JSON parsers'
      ],
      correctIndex: 1,
      explanation: 'OpenAPI definitions expose the internal schema of your backend API, making it easy for adversaries to discover unpublished and administrative endpoints.'
    },
    badgeEarned: '📜 API Schema Auditor'
  },
  {
    id: 'mission-15',
    caseNumber: 'CASE-INT-015',
    tier: 'INTERMEDIATE',
    title: 'Cert Subject Key Identifiers (SKI) & Server Tracking',
    officialCaseFile: 'cases/intermediate/CASE_15_CERT_SERIAL_SKI_PIVOT.md',
    target: 'C2 Tracker / Shadow Fleet',
    difficulty: 6,
    xp: 180,
    category: 'Cryptographic Forensics',
    oneSentenceObjective: 'Track an adversary reusing the same private SSL key across 10 different IP addresses in Russia and Panama.',
    safeTargetDescription: 'Passive X.509 certificate extension telemetry from Shodan and Censys.',
    steps: [
      {
        name: 'Query Censys for Shared Subject Key Identifier (SKI)',
        tool: 'Censys Search API',
        command: 'censys search "services.tls.certificates.leaf_data.subject_key_info.fingerprint: 4a2b91c0e3..."',
        output: `[CENSYS SEARCH RESULTS FOR SKI: 4a2b91c0e3...]
Total Matched Hosts: 3
1. IP: 185.220.101.5 (Moscow, RU) - Port 8443
2. IP: 194.26.29.112 (Panama City, PA) - Port 8443
3. IP: 91.215.85.74 (Bucharest, RO) - Port 8443
Common Certificate Serial: 0x7F213A89C011`,
        highlightLine: 'Total Matched Hosts: 3 (RU, PA, RO) - Port 8443',
        decoderTitle: '💡 Adversary Infrastructure Clustered via SKI',
        decoderExplanation: 'Even when threat actors change domains, hosting providers, and countries, they often reuse the same SSL certificate or private key pair. Querying the Subject Key Identifier (SKI) clusters their entire fleet!',
        remediation: 'SOC analysts use this to create firewall blocklists against all servers bearing the same cryptographic fingerprint.',
        admiraltyScore: 'A1'
      }
    ],
    quiz: {
      question: 'What X.509 certificate extension provides a unique cryptographic hash of the public key, enabling analysts to correlate servers reusing the same key?',
      options: ['Authority Information Access (AIA)', 'Subject Key Identifier (SKI)', 'Basic Constraints', 'CRL Distribution Points'],
      correctIndex: 1,
      explanation: 'The Subject Key Identifier (SKI) extension contains a SHA-1 or SHA-256 hash of the public key, allowing tracking of keys across distinct hostnames and IPs.'
    },
    badgeEarned: '🔐 Cryptographic Tracker'
  },
  {
    id: 'mission-16',
    caseNumber: 'CASE-INT-016',
    tier: 'INTERMEDIATE',
    title: 'Synthetic Username Correlation Across 500+ Platforms',
    officialCaseFile: 'cases/intermediate/CASE_16_SYNTHETIC_USERNAME_CROSS_PLATFORM.md',
    target: 'vuln_researcher_99',
    difficulty: 5,
    xp: 150,
    category: 'Social & Identity Intelligence',
    oneSentenceObjective: 'Determine if a technical handle has public profiles on GitHub, Keybase, HackerOne, and Docker Hub.',
    safeTargetDescription: 'Passive HTTP status code checks on public profile URLs (WhatsMyName protocol).',
    steps: [
      {
        name: 'Execute WhatsMyName Handle Enumeration',
        tool: 'Sherlock / WhatsMyName',
        command: 'sherlock vuln_researcher_99 --site github,keybase,dockerhub,gitlab',
        output: `[*] Checking username vuln_researcher_99 on:
[+] GitHub: https://github.com/vuln_researcher_99 (HTTP 200 - Found)
[+] Keybase: https://keybase.io/vuln_researcher_99 (HTTP 200 - PGP Key: 0x98A1...)
[+] Docker Hub: https://hub.docker.com/u/vuln_researcher_99 (HTTP 200 - 3 Public Images)
[-] GitLab: Not Found (HTTP 404)`,
        highlightLine: 'Keybase: PGP Key: 0x98A1... | Docker Hub: 3 Public Images',
        decoderTitle: '💡 Cross-Platform Identity Corroboration Confirmed',
        decoderExplanation: 'Finding the same handle across GitHub and Keybase allows cryptographic verification of their public PGP identity. Docker Hub reveals container images they have published to the public.',
        remediation: 'Use distinct usernames across professional security research and personal accounts to avoid automated identity correlation.',
        admiraltyScore: 'B1'
      }
    ],
    quiz: {
      question: 'What is the primary indicator used by tools like Sherlock and WhatsMyName to determine if a username exists on a target platform?',
      options: [
        'Brute-forcing account passwords',
        'Evaluating the HTTP response code (e.g. 200 OK vs 404 Not Found) or profile presence string',
        'Purchasing dark web database dumps',
        'Running Wireshark on local network traffic'
      ],
      correctIndex: 1,
      explanation: 'Username search tools query public profile URLs and check whether the platform returns HTTP 200 (Profile Exists) or HTTP 404 (Not Found).'
    },
    badgeEarned: '👤 Identity Resolution Specialist'
  },
  {
    id: 'mission-17',
    caseNumber: 'CASE-INT-017',
    tier: 'INTERMEDIATE',
    title: 'Cloud Storage Bucket Permissive Permissions Audit',
    officialCaseFile: 'cases/intermediate/CASE_17_CLOUD_BUCKET_ENUMERATION.md',
    target: 'acme-corp-backups.s3.amazonaws.com',
    difficulty: 6,
    xp: 170,
    category: 'Cloud Storage Security',
    oneSentenceObjective: 'Verify whether an Amazon S3 or Google Cloud Storage bucket allows anonymous public file listing.',
    safeTargetDescription: 'Passive unauthenticated HTTP GET requests against public cloud endpoints.',
    steps: [
      {
        name: 'Audit S3 Bucket Public Read Permissions',
        tool: 'aws-cli / curl',
        command: 'curl -s "https://acme-corp-backups.s3.amazonaws.com/?list-type=2" | head -n 8',
        output: `<?xml version="1.0" encoding="UTF-8"?>
<ListBucketResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
  <Name>acme-corp-backups</Name>
  <KeyCount>12</KeyCount>
  <Contents>
    <Key>database_dumps/prod_db_2026_10.sql.gz</Key>
    <Size>482910482</Size>
    <StorageClass>STANDARD</StorageClass>
  </Contents>`,
        highlightLine: '<Key>database_dumps/prod_db_2026_10.sql.gz</Key>',
        decoderTitle: '🚨 Critical Data Exposure: Publicly Listable S3 Bucket',
        decoderExplanation: 'The AWS S3 bucket ACL is set to "AllUsers: READ" or lacks Block Public Access. Anyone on the internet can list and download raw production database backups without any password!',
        remediation: 'Enable AWS S3 "Block Public Access" at the account level and enforce private IAM role authentication.',
        admiraltyScore: 'A1'
      }
    ],
    quiz: {
      question: 'What account-wide setting in Amazon Web Services should always be turned ON to prevent accidental public S3 bucket leaks?',
      options: ['CloudFront Acceleration', 'S3 Block Public Access', 'AWS Shield Advanced', 'Route53 DNSSEC'],
      correctIndex: 1,
      explanation: 'S3 Block Public Access overrides all bucket ACLs and policies, ensuring no bucket in the account can be made publicly accessible.'
    },
    badgeEarned: '☁️ Cloud Perimeter Auditor'
  },
  {
    id: 'mission-18',
    caseNumber: 'CASE-INT-018',
    tier: 'INTERMEDIATE',
    title: 'Software Supply Chain: Open-Source SBOM Auditing',
    officialCaseFile: 'cases/intermediate/CASE_18_SUPPLY_CHAIN_DEPENDENCY_AUDIT.md',
    target: 'package-lock.json / requirements.txt',
    difficulty: 6,
    xp: 160,
    category: 'Supply Chain OSINT',
    oneSentenceObjective: 'Identify abandonware and unmaintained packages with known CVEs in an open-source enterprise product.',
    safeTargetDescription: 'Public GitHub repo dependency manifests.',
    steps: [
      {
        name: 'Audit Dependency Manifest Against OSV Database',
        tool: 'osv-scanner / pip-audit',
        command: 'osv-scanner --lockfile=./package-lock.json | grep -A 3 "CRITICAL"',
        output: `Scanned 342 dependencies across 1 lockfile.
[CRITICAL] CVE-2026-38291: Remote Code Execution in "event-logger-legacy" v1.2.0
  Fixed in: v2.0.0
  Package repository: https://registry.npmjs.org/event-logger-legacy
  Maintainer status: Abandoned (Last commit 4 years ago)`,
        highlightLine: 'CVE-2026-38291: Remote Code Execution in "event-logger-legacy"',
        decoderTitle: '🚨 Vulnerable Supply Chain Dependency Detected',
        decoderExplanation: 'Companies often rely on third-party libraries that haven\'t been updated in years. If a package contains a known Critical Remote Code Execution vulnerability, the entire application is compromised.',
        remediation: 'Upgrade to version 2.0.0 or replace the abandoned package with an active, well-maintained library.',
        admiraltyScore: 'A1'
      }
    ],
    quiz: {
      question: 'What is an SBOM in modern software engineering and defensive cybersecurity?',
      options: [
        'Secure Backup Operating Module',
        'Software Bill of Materials (a formal inventory of all third-party components and dependencies)',
        'System Boot Overhead Manager',
        'State-Based Organization Mapping'
      ],
      correctIndex: 1,
      explanation: 'A Software Bill of Materials (SBOM) details every component, library, and license included in a software product.'
    },
    badgeEarned: '📦 Supply Chain Inspector'
  },
  {
    id: 'mission-19',
    caseNumber: 'CASE-INT-019',
    tier: 'INTERMEDIATE',
    title: 'Breach Telemetry: Aggregated Password Exposure Metrics',
    officialCaseFile: 'cases/intermediate/CASE_19_BREACH_TELEMETRY_STATISTICS.md',
    target: 'enterprise-corp.com',
    difficulty: 6,
    xp: 170,
    category: 'Threat Telemetry',
    oneSentenceObjective: 'Assess corporate credential exposure in public breach corpora using k-Anonymity without viewing passwords.',
    safeTargetDescription: 'Ethical k-Anonymity breach telemetry APIs (e.g., HaveIBeenPwned range API).',
    steps: [
      {
        name: 'Query k-Anonymity Hash Range Telemetry',
        tool: 'HIBP Pwned Passwords API',
        command: 'curl -s "https://api.pwnedpasswords.com/range/21BD1" | grep "A7E9C"',
        output: `[PWNED PASSWORDS K-ANONYMITY RANGE LOOKUP]
Prefix: 21BD1 (First 5 characters of SHA-1 hash)
Matched Hash Suffix: A7E9C0A8... : 41,290 occurrences in historical breach dumps.
Privacy Guarantee: The plain-text password was never transmitted over the network.`,
        highlightLine: 'Matched Hash Suffix: A7E9C0A8... : 41,290 occurrences',
        decoderTitle: '💡 High Frequency Leaked Credential Detected via k-Anonymity',
        decoderExplanation: 'Using k-Anonymity, analysts send only the first 5 characters of a password hash. The server returns all matching suffixes. If the suffix matches, the password is confirmed compromised across 41,000 public breaches without ever revealing the password!',
        remediation: 'Enforce active password filtering against known compromised password lists during user signup/reset.',
        admiraltyScore: 'A1'
      }
    ],
    quiz: {
      question: 'What mathematical principle allows security teams to check if a password was breached without ever sending the full password or full hash across the internet?',
      options: ['Diffie-Hellman Key Exchange', 'k-Anonymity (Range-based search)', 'RSA 4096-bit Encryption', 'BGP Anycast'],
      correctIndex: 1,
      explanation: 'k-Anonymity works by providing only a 5-character hash prefix. The client receives a list of candidates and compares the suffix locally, keeping the full hash private.'
    },
    badgeEarned: '🔐 Credential Telemetry Analyst'
  },
  {
    id: 'mission-20',
    caseNumber: 'CASE-INT-020',
    tier: 'INTERMEDIATE',
    title: 'Geospatial Facility Verification via Satellite Imagery',
    officialCaseFile: 'cases/intermediate/CASE_20_PHYSICAL_FACILITY_GEOINT.md',
    target: 'Offshore Data Center Facility (Iceland)',
    difficulty: 6,
    xp: 180,
    category: 'Geospatial OSINT',
    oneSentenceObjective: 'Verify backup diesel generators, cooling infrastructure, and perimeter security using public satellite maps.',
    safeTargetDescription: 'Public civil satellite imagery (Sentinel-2, Google Earth, OpenStreetMap).',
    steps: [
      {
        name: 'Inspect Geospatial Features and Coordinate Grid',
        tool: 'Overpass API / OpenStreetMap',
        command: 'curl -s "https://overpass-api.de/api/interpreter?data=[out:json];node(64.01,-21.95,64.03,-21.92)[\"man_made\"=\"cooling_tower\"];out;"',
        output: `[OVERPASS GEO-QUERY: Reykjanes Data Enclave]
Coordinates: 64.0214° N, 21.9388° W
Identified Features:
 - 8x Industrial Chilled-Water Heat Exchangers
 - 4x Dual-Feed Diesel Backup Generators (5 MW capacity)
 - Dual 132kV High-Voltage Substation Interconnect
 - Perimeter Fence: Double-mesh with single security checkpoint`,
        highlightLine: '4x Dual-Feed Diesel Backup Generators (5 MW capacity)',
        decoderTitle: '💡 Physical Redundancy Verified via Satellite Features',
        decoderExplanation: 'Defense analysts verify whether a claimed "tier-4 mission critical data center" actually possesses physical cooling towers, generator tanks, and redundant power grid substations via civil imagery.',
        remediation: 'Ensure aerial facility views do not expose physical vulnerabilities or unmonitored perimeter gaps.',
        admiraltyScore: 'A2'
      }
    ],
    quiz: {
      question: 'Which European Space Agency open satellite constellation provides freely accessible multispectral Earth observation imagery used in civil OSINT?',
      options: ['Starlink', 'Sentinel (Copernicus Programme)', 'Iridium', 'Hubble'],
      correctIndex: 1,
      explanation: 'The European Space Agency\'s Copernicus Sentinel satellites provide free, public, high-resolution imagery refreshed every 5 days.'
    },
    badgeEarned: '🛰️ GEOINT Imagery Analyst'
  },

  // ==========================================
  // ADVANCED TIER (CASES 21 - 30)
  // ==========================================
  {
    id: 'mission-21',
    caseNumber: 'CASE-ADV-021',
    tier: 'ADVANCED',
    title: 'Adversary Infrastructure Clustering: Tracking APTs',
    officialCaseFile: 'cases/advanced/CASE_21_ADVERSARY_INFRASTRUCTURE_CLUSTERING.md',
    target: 'APT-PHISH Campaign Fleet',
    difficulty: 8,
    xp: 220,
    category: 'Threat Intelligence',
    oneSentenceObjective: 'Cluster 8 distinct phishing domains using shared TLS serial numbers, nameserver patterns, and registrar IDs.',
    safeTargetDescription: 'Passive threat intelligence feeds and MISP telemetry.',
    steps: [
      {
        name: 'Cluster Phishing Campaign via Multi-Attribute Pivoting',
        tool: 'ThreatConnect / MISP Pivot Engine',
        command: 'cluster-query --campaign "FIN-PHISH-2026" --attributes cert_issuer,ns_tld,asn',
        output: `[CLUSTER ANALYSIS: THREAT CLUSTER #TC-991]
Attributes:
 - Registrar: Porkbun LLC
 - Nameservers: *.dns-shield-cloud.org
 - TLS Issuer: Let's Encrypt (Zero-SSL alternate)
 - Web Server Header: nginx/1.18.0 (Ubuntu) with custom ETags
Identified Nodes:
 1. secure-login-bank-auth.com
 2. verify-payroll-direct.net
 3. vpn-portal-auth-sso.org`,
        highlightLine: 'Identified Nodes: 3 Active Phishing Gateways Sharing Custom ETags',
        decoderTitle: '💡 Multi-Domain Phishing Ring Clustered',
        decoderExplanation: 'Threat actors use automation scripts that deploy servers with the exact same software stack, ETag headers, and nameservers. By clustering these attributes, SOC teams block the entire campaign at once.',
        remediation: 'Deploy DNS firewall rules (RPZ) to block the threat actor\'s authoritative nameserver pattern globally.',
        admiraltyScore: 'A2'
      }
    ],
    quiz: {
      question: 'What is the highest tier of David Bianco\'s "Pyramid of Pain" representing the most difficult indicator for adversaries to change?',
      options: ['IP Addresses', 'Domain Names', 'Hash Values', 'TTPs (Tactics, Techniques, and Procedures)'],
      correctIndex: 3,
      explanation: 'TTPs sit at the top of the Pyramid of Pain. Forcing an attacker to change their behavioral techniques causes them the maximum operational disruption.'
    },
    badgeEarned: '🦅 Threat Cluster Architect'
  },
  {
    id: 'mission-22',
    caseNumber: 'CASE-ADV-022',
    tier: 'ADVANCED',
    title: 'Combating Brand Impersonation & Typosquatting',
    officialCaseFile: 'cases/advanced/CASE_22_BRAND_IMPERSONATION_TYPOSQUATTING.md',
    target: 'paypal.com (Fictional Defensive Audit)',
    difficulty: 7,
    xp: 200,
    category: 'Brand Protection',
    oneSentenceObjective: 'Generate algorithmic typosquat permutations (bit-flipping, homoglyphs) and check for weaponized MX records.',
    safeTargetDescription: 'Algorithmic domain permutation engines (dnstwist standard).',
    steps: [
      {
        name: 'Run dnstwist Permutation & MX Weaponization Check',
        tool: 'dnstwist',
        command: 'dnstwist --registered --mx paypal.com | head -n 6',
        output: `[DNSTWIST DOMAIN PERMUTATION AUDIT]
Original: paypal.com

Type        Domain Name            IP Address       MX Status
----------------------------------------------------------------
Homoglyph   paypa1.com             198.51.100.14    MX Active (mail.paypa1.com) -> WEAPONIZED
Bitsquat    payqal.com             203.0.113.8      No MX (Parked)
Omission    paypl.com              192.0.2.99       MX Active (mail.hosted-mx.net) -> WEAPONIZED
Replacement paypsl.com             -                Unregistered`,
        highlightLine: 'paypa1.com | MX Active -> WEAPONIZED',
        decoderTitle: '🚨 High Threat: Weaponized Typosquat Domain Active',
        decoderExplanation: 'The domain "paypa1.com" (with number 1 instead of l) is registered AND has active Mail Exchanger (MX) records! That means the owner is actively configured to receive or send deceptive phishing emails.',
        remediation: 'Submit an immediate UDRP (Uniform Domain-Name Dispute-Resolution Policy) complaint to WIPO to seize the domain.',
        admiraltyScore: 'A1'
      }
    ],
    quiz: {
      question: 'What is a "Homoglyph" attack in domain typosquatting?',
      options: [
        'Flooding a website with HTTP GET requests',
        'Substituting visual look-alike characters (such as Latin "a" with Cyrillic "а" or number "1" for letter "l")',
        'Cracking passwords using GPU rigs',
        'Intercepting satellite phone calls'
      ],
      correctIndex: 1,
      explanation: 'Homoglyph attacks take advantage of characters across different scripts that appear identical or nearly identical to human readers.'
    },
    badgeEarned: '🛡️ Brand Armor Defender'
  },
  {
    id: 'mission-23',
    caseNumber: 'CASE-ADV-023',
    tier: 'ADVANCED',
    title: 'Disinformation Network & Bot Farm Graphing',
    officialCaseFile: 'cases/advanced/CASE_23_DISINFORMATION_NARRATIVE_TRACKING.md',
    target: 'Coordinated Inauthentic Behavior Network',
    difficulty: 8,
    xp: 210,
    category: 'Information Operations',
    oneSentenceObjective: 'Detect synchronized posting patterns and shared Google AdSense / Analytics IDs across fake news portals.',
    safeTargetDescription: 'Public HTML source code analysis of public media blogs.',
    steps: [
      {
        name: 'Inspect Shared Google Analytics (UA/GA4) Identifiers',
        tool: 'curl & grep (Public DOM inspection)',
        command: 'curl -s https://fake-news-portal-a.org | grep -Eo "UA-[0-9]+-[0-9]+|G-[A-Z0-9]+"',
        output: `[EXTRACTED TRACKING CODES: fake-news-portal-a.org]
Google Analytics: G-889104A1BC
Google AdSense: pub-9418290192840192

[CROSS-INDEXING DISCOVERY IN PUBLIC SINKHOLE]
The exact same AdSense publisher ID (pub-9418290192840192) is present on:
 1. fake-news-portal-a.org (Target)
 2. patriotic-truth-news.net
 3. voice-of-freedom-daily.com`,
        highlightLine: 'Exact same AdSense publisher ID (pub-9418290192840192) across 3 sites',
        decoderTitle: '💡 Common Ownership Confirmed Across Disinformation Sites',
        decoderExplanation: 'Websites trying to appear independent often forget to change their monetization tracking IDs. AdSense revenue from all 3 portals flows into the exact same bank account identified by publisher ID pub-9418290192840192.',
        remediation: 'Submit ad policy violation reports to Google AdSense Trust & Safety to demonetize the network.',
        admiraltyScore: 'A1'
      }
    ],
    quiz: {
      question: 'Why are Google AdSense (pub-*) and Analytics (G-*) tags invaluable for OSINT investigations into network attribution?',
      options: [
        'They give analysts root access to the web server',
        'They link disparate domain names to the single financial or administrative entity collecting advertising revenue',
        'They automatically decrypt HTTPS sessions',
        'They reveal the WiFi password of the server'
      ],
      correctIndex: 1,
      explanation: 'AdSense publisher IDs are uniquely tied to one individual\'s or organization\'s bank account for payouts, proving shared economic control across websites.'
    },
    badgeEarned: '🌐 Disinformation Hunter'
  },
  {
    id: 'mission-24',
    caseNumber: 'CASE-ADV-024',
    tier: 'ADVANCED',
    title: 'BGP Route Hijacking & Prefix Anomaly Detection',
    officialCaseFile: 'cases/advanced/CASE_24_BGP_ROUTE_HIJACK_DETECTION.md',
    target: 'Financial Institution IP Prefix (203.0.113.0/24)',
    difficulty: 9,
    xp: 250,
    category: 'Internet Routing Security',
    oneSentenceObjective: 'Detect when an unauthorized foreign ISP suddenly starts broadcasting your organization\'s IP addresses.',
    safeTargetDescription: 'Public BGP routing tables from RIPE NCC RIS and RouteViews collectors.',
    steps: [
      {
        name: 'Query RIPE RIS Live BGP Route Collector',
        tool: 'RIPEstat API / BGPStream',
        command: 'curl -s "https://stat.ripe.net/data/bgp-update-activity/data.json?resource=203.0.113.0/24"',
        output: `[RIPE BGP ROUTE COLLECTOR ALERT]
Prefix: 203.0.113.0/24
Legitimate Origin AS: AS13335 (Cloudflare)
Anomalous Origin AS: AS4134 (China Telecom Backbone)
Event Type: MOAS (Multiple Origin AS Conflict)
RPKI Status: INVALID (Route Origin Authorization specifies AS13335 ONLY)`,
        highlightLine: 'Anomalous Origin AS: AS4134 | RPKI Status: INVALID',
        decoderTitle: '🚨 Major Incident: Active BGP Prefix Hijack Detected',
        decoderExplanation: 'An external telecommunications carrier is announcing ownership of the target\'s IP prefix. This causes global internet routers to redirect sensitive financial traffic through their foreign routers before reaching the destination.',
        remediation: 'Enforce RPKI Route Origin Authorization (ROA) with upstream Tier-1 transit providers to drop invalid route announcements automatically.',
        admiraltyScore: 'A1'
      }
    ],
    quiz: {
      question: 'What cryptographic framework protects BGP routing by validating that an Autonomous System is legally authorized to announce an IP prefix?',
      options: ['DNSSEC', 'RPKI (Resource Public Key Infrastructure)', 'TLS 1.3', 'IPSec'],
      correctIndex: 1,
      explanation: 'RPKI creates signed Route Origin Authorizations (ROAs) that prove which ASN is legitimately permitted to advertise specific IP prefixes.'
    },
    badgeEarned: '📡 BGP Route Sentinel'
  },
  {
    id: 'mission-25',
    caseNumber: 'CASE-ADV-025',
    tier: 'ADVANCED',
    title: 'Passive Tor Onion Service Correlation',
    officialCaseFile: 'cases/advanced/CASE_25_PASSIVE_TOR_INFRASTRUCTURE_PROFILING.md',
    target: 'Dark Web Leak Portal (Onion v3)',
    difficulty: 8,
    xp: 230,
    category: 'Dark Web Intelligence',
    oneSentenceObjective: 'Unmask the clearnet IP address of a dark web service using SSL certificate hashes and HTTP headers.',
    safeTargetDescription: 'Passive correlation between onion service responses and public Censys clearnet scans.',
    steps: [
      {
        name: 'Extract Unique Favicon MD5 & TLS Fingerprint',
        tool: 'curl (via SOCKS5 Tor Proxy)',
        command: 'curl -s --socks5-hostname 127.0.0.1:9050 "http://target7x4a...onion/favicon.ico" | md5sum',
        output: `[ONION V3 TARGET ANALYSIS]
Onion Address: http://target7x4a...onion
Favicon MD5 Hash: 7b319f02c6114a9e52e008432a11884f
Server Header: Apache/2.4.52 (Debian)
OpenSSL TLS SKI: 9c:11:ea:04:8b...

[CENSYS CLEARNET SCAN CORRELATION]
Searching Clearnet IP space for Favicon MD5: 7b319f02c6114a9e52e008432a11884f
MATCH FOUND: IP 194.87.139.50 (Host: St. Petersburg, Russia)`,
        highlightLine: 'MATCH FOUND: IP 194.87.139.50 (Host: St. Petersburg, Russia)',
        decoderTitle: '💡 Dark Web Service Clearnet IP Address Unmasked',
        decoderExplanation: 'The operator of the Tor onion service made the fatal operational security mistake of hosting the identical web application (and identical favicon/SSL certificate) on a public clearnet IP address!',
        remediation: 'Strictly isolate Tor hidden services; never reuse certificates, favicons, or codebases between clearnet and onion endpoints.',
        admiraltyScore: 'A1'
      }
    ],
    quiz: {
      question: 'How do defensive researchers correlate anonymous Tor .onion hidden services with physical clearnet IP addresses?',
      options: [
        'By hacking Tor exit nodes',
        'By matching unique cryptographic artifacts (favicon Murmur/MD5 hashes, TLS certificate fingerprints, or custom HTTP headers) across global IP scans',
        'By calling the Tor Project support helpline',
        'By installing malware on the target server'
      ],
      correctIndex: 1,
      explanation: 'Reusing unique visual or cryptographic assets (like favicons and SSL certificates) allows instant correlation with global internet scan datasets.'
    },
    badgeEarned: '🧅 Dark Web Unmasker'
  },
  {
    id: 'mission-26',
    caseNumber: 'CASE-ADV-026',
    tier: 'ADVANCED',
    title: 'Ransomware Cryptocurrency Blockchain Tracing',
    officialCaseFile: 'cases/advanced/CASE_26_RANSOMWARE_LEAK_SITE_AND_CRYPTO.md',
    target: 'Bitcoin Extortion Address (bc1q...)',
    difficulty: 8,
    xp: 220,
    category: 'Blockchain Intelligence',
    oneSentenceObjective: 'Trace extortion ransom payments flowing from a victim company into a regulated fiat off-ramp exchange.',
    safeTargetDescription: 'Public immutable blockchain ledgers (Bitcoin / Ethereum).',
    steps: [
      {
        name: 'Trace Blockchain UTXO Hops to Exchange Wallet',
        tool: 'Blockstream API / Chainalysis Simulator',
        command: 'curl -s "https://blockstream.info/api/address/bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh/txs" | jq \'.[0].vout\'',
        output: `[BLOCKCHAIN HOPS TRACING]
Extortion Wallet: bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh (Received 12.5 BTC)
  └── Hop 1: Peel Chain -> 3x intermediate split transactions
        └── Hop 2: Consolidated into Deposit Address: 3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy
Identified Cluster: Binance Exchange Deposit Wallet
AML Risk Score: SEVERE (Known BlackCat/ALPHV Ransomware Syndicate)`,
        highlightLine: 'Identified Cluster: Binance Exchange Deposit Wallet',
        decoderTitle: '💡 Ransom Proceeds Deposited into Regulated Exchange',
        decoderExplanation: 'While cryptocurrency is pseudonymous, all transactions are permanently public. The criminal tried to launder funds through 2 hops, but ultimately sent them to an account at a KYC-compliant exchange subject to law enforcement subpoena.',
        remediation: 'Provide the transaction hash and receiving exchange deposit address to federal law enforcement to freeze the account.',
        admiraltyScore: 'A1'
      }
    ],
    quiz: {
      question: 'What is a "Peel Chain" in blockchain money laundering investigations?',
      options: [
        'A technique where fruit delivery apps process Bitcoin',
        'A laundering pattern where large amounts of cryptocurrency are repeatedly split into small spending amounts and returned to a new change address',
        'A method to mine Ethereum faster',
        'A smart contract bug'
      ],
      correctIndex: 1,
      explanation: 'A peel chain involves transferring funds through a series of transactions where a small amount is "peeled" off to an exchange or service while the rest moves to a new address.'
    },
    badgeEarned: '⛓️ Blockchain Forensic Tracker'
  },
  {
    id: 'mission-27',
    caseNumber: 'CASE-ADV-027',
    tier: 'ADVANCED',
    title: 'SaaS OAuth Permissions & Shadow Integration Drift',
    officialCaseFile: 'cases/advanced/CASE_27_OAUTH_SAAS_INTEGRATION_DRIFT.md',
    target: 'Corporate Google Workspace / Microsoft 365 Tenant',
    difficulty: 7,
    xp: 200,
    category: 'Cloud SaaS Governance',
    oneSentenceObjective: 'Identify risky third-party OAuth apps granted full read/write access to employee inboxes and drive files.',
    safeTargetDescription: 'Passive inspection of public OAuth App Consent client IDs and scopes.',
    steps: [
      {
        name: 'Audit Third-Party OAuth App Permissions & Scopes',
        tool: 'Google Workspace Admin API / OSINT OAuth Inspector',
        command: 'oauth-audit --tenant corp.org --filter-scopes "mail.read,drive.full"',
        output: `[OAUTH APP AUDIT: CORP.ORG TENANT]
App Name: "AI Meeting Transcriber Pro"
Client ID: 8941092841-abcdef.apps.googleusercontent.com
Publisher: Unverified Developer (Registered 18 days ago via personal Hotmail)
Authorized Scopes:
 - https://mail.google.com/ (FULL ACCESS: Read, Send, Delete Emails)
 - https://www.googleapis.com/auth/drive (FULL ACCESS: All Corporate Drive Files)
Active Authorizations: 42 Employees`,
        highlightLine: 'Publisher: Unverified Developer | FULL ACCESS: Read, Send, Delete Emails',
        decoderTitle: '🚨 Catastrophic Security Risk: Unverified OAuth App in Tenant',
        decoderExplanation: '42 employees clicked "Accept" on a third-party AI transcriber app. Because it requested full mailbox and Google Drive access, the unverified developer now has the legal ability to read every corporate email without entering a password!',
        remediation: 'Revoke the OAuth Client ID immediately and enable OAuth App Allowlisting so employees cannot approve third-party apps without IT approval.',
        admiraltyScore: 'A1'
      }
    ],
    quiz: {
      question: 'Why is an unverified malicious OAuth application often more dangerous than a standard credential phishing attack?',
      options: [
        'Because OAuth apps bypass Multi-Factor Authentication (MFA) and retain persistent token access even after users change their passwords',
        'Because OAuth apps break the computer monitor',
        'Because OAuth apps consume 100% of CPU memory',
        'Because OAuth apps can only be written in Assembly language'
      ],
      correctIndex: 0,
      explanation: 'OAuth tokens grant direct programmatic API access. Even if a user changes their corporate password or has MFA enabled, the active token remains valid until explicitly revoked.'
    },
    badgeEarned: '🔑 SaaS Cloud Defender'
  },
  {
    id: 'mission-28',
    caseNumber: 'CASE-ADV-028',
    tier: 'ADVANCED',
    title: 'JARM TLS Fingerprinting: Hunting Command & Control',
    officialCaseFile: 'cases/advanced/CASE_28_JARM_C2_FINGERPRINTING.md',
    target: 'Adversary Cobalt Strike C2 Infrastructure',
    difficulty: 8,
    xp: 240,
    category: 'Active Defense Telemetry',
    oneSentenceObjective: 'Identify adversary Cobalt Strike, Metasploit, and Mythic C2 servers by sending 10 crafted TLS Client Hellos.',
    safeTargetDescription: 'Standard passive TLS negotiation packets (JARM open standard developed by Salesforce).',
    steps: [
      {
        name: 'Calculate JARM Fingerprint on Suspicious Gateway',
        tool: 'jarm (Python / Go)',
        command: 'python3 jarm.py 198.51.100.45:443',
        output: `[JARM TLS FINGERPRINTING ENGINE]
Target Host: 198.51.100.45:443
Calculated JARM: 07d14d16d21d21d07c42d41d00041d24a458a375eef0c576d23a7bab9a9fb1

[DATABASE KNOWN SIGNATURE MATCH]
MATCH: Cobalt Strike Default Team Server (Java OpenJDK 11 TLS Config)
Confidence: A1 (Definitive Cryptographic Match)`,
        highlightLine: 'MATCH: Cobalt Strike Default Team Server',
        decoderTitle: '🚨 Known Threat Signature: Default Cobalt Strike C2 Gateway',
        decoderExplanation: 'JARM sends 10 distinct TLS Client Hello packets and records the server\'s cipher choices, extensions, and order. The resulting 62-character hash uniquely identifies default Cobalt Strike team servers used in targeted ransomware campaigns.',
        remediation: 'Push the JARM fingerprint directly into the enterprise EDR and perimeter firewall to drop all outbound sessions to this server.',
        admiraltyScore: 'A1'
      }
    ],
    quiz: {
      question: 'What does a JARM fingerprint measure when connecting to an unknown SSL/TLS server?',
      options: [
        'The password of the webmaster',
        'The specific combination and order of cipher suites, TLS extensions, and versions the server chooses in response to 10 distinct Client Hello probes',
        'The physical GPS location of the server',
        'The number of hard drives installed'
      ],
      correctIndex: 1,
      explanation: 'JARM actively fingerprints how the server\'s cryptographic operating system and TLS library negotiate connections, creating a unique signature for different server types.'
    },
    badgeEarned: '🎯 JARM Signature Hunter'
  },
  {
    id: 'mission-29',
    caseNumber: 'CASE-ADV-029',
    tier: 'ADVANCED',
    title: 'M&A Due Diligence: Shadow IT & Abandoned Attack Surface',
    officialCaseFile: 'cases/advanced/CASE_29_MA_SHADOW_IT_AUDIT.md',
    target: 'Acquisition Target Company (TargetCorp Holdings)',
    difficulty: 8,
    xp: 230,
    category: 'M&A Risk Assessment',
    oneSentenceObjective: 'Perform complete external attack surface mapping of a prospective acquisition target before signing.',
    safeTargetDescription: 'Passive correlation across public DNS, WHOIS, CT logs, and cloud storage.',
    steps: [
      {
        name: 'Synthesize Complete External Attack Surface Dossier',
        tool: 'OSINT Aggregation Engine',
        command: 'surface-audit --target targetcorp-holdings.com --full-passive',
        output: `[EXTERNAL ATTACK SURFACE DOSSIER: targetcorp-holdings.com]
Total Identified Apex Domains: 4
Total Subdomains: 182
Key Findings:
 1. 3x Dangling CNAMEs pointing to abandoned AWS Elastic Beanstalk
 2. 1x Public S3 Bucket with customer PII documents (Case 17 pattern)
 3. 2x Production API endpoints with unauthenticated Swagger schemas (Case 14 pattern)
 4. Primary domain SPF record has "p=none" (Spoofing vulnerable)
Total Security Debt Valuation: $450,000 Remediation Cost`,
        highlightLine: 'Total Security Debt Valuation: $450,000 Remediation Cost',
        decoderTitle: '💡 Substantial Hidden Technical Debt Uncovered',
        decoderExplanation: 'During corporate mergers and acquisitions (M&A), the buying company inherits the target\'s security liabilities. OSINT reveals that this acquisition target has critical dangling subdomains and exposed customer data.',
        remediation: 'Use these findings in acquisition negotiations to discount purchase price or mandate escrow remediation before closing.',
        admiraltyScore: 'A2'
      }
    ],
    quiz: {
      question: 'Why is passive OSINT crucial during the due diligence phase of corporate Mergers & Acquisitions (M&A)?',
      options: [
        'Because active port scanning of an acquisition target without signed authorization is illegal and can leak news of the deal to the public markets',
        'Because M&A attorneys do not allow computers to be used',
        'Because passive OSINT guarantees 100% tax deductions',
        'Because companies must shut down their websites during acquisitions'
      ],
      correctIndex: 0,
      explanation: 'Merger negotiations are strictly confidential. Active scanning triggers SOC alarms and breaches nondisclosure agreements, whereas passive OSINT assesses true risk silently and legally.'
    },
    badgeEarned: '💼 M&A Intelligence Strategist'
  },
  {
    id: 'mission-30',
    caseNumber: 'CASE-ADV-030',
    tier: 'ADVANCED',
    title: 'Threat Intel Handoff: Generating SOC SIGMA Rules',
    officialCaseFile: 'cases/advanced/CASE_30_THREAT_INTEL_SOC_SIGMA_RULES.md',
    target: 'Defensive SIEM / SOC Integration',
    difficulty: 9,
    xp: 250,
    category: 'SOC Engineering',
    oneSentenceObjective: 'Translate OSINT intelligence into automated detection engineering code (SIGMA rules) for production SIEMs.',
    safeTargetDescription: 'Open-source SIGMA rule syntax standard for defensive detection.',
    steps: [
      {
        name: 'Generate Production SIGMA Detection Rule',
        tool: 'sigma-cli / detection-engine',
        command: 'sigma-gen --rule-type dns_query --c2-domains "paypa1.com,target7x4a...onion" --jarm "07d14d16d21d21..."',
        output: `title: Detect Outbound Connection to Investigated C2 Cluster
id: 9a41b28e-581a-4c92-bf91-49a0e1428521
status: production
description: Alerts when internal corporate endpoints initiate DNS lookups or TLS sessions to C2 infrastructure identified in OSINT Lab Case 28.
references:
  - https://github.com/candysuec/ethical-osint-lab/cases/advanced/CASE_28_JARM_C2_FINGERPRINTING.md
logsource:
  category: dns_query
  product: windows
detection:
  selection:
    QueryName|contains:
      - 'paypa1.com'
      - 'dns-shield-cloud.org'
  condition: selection
falsepositives:
  - Unknown
level: high`,
        highlightLine: 'level: high | condition: selection',
        decoderTitle: '💡 Actionable Intelligence Handoff Complete',
        decoderExplanation: 'OSINT is only valuable when it produces tangible defense! A SIGMA rule converts our investigative findings into automated alerts that run inside Splunk, Microsoft Sentinel, or Elastic SIEM.',
        remediation: 'Deploy this rule directly to the corporate SIEM pipeline and verify alert triggers via synthetic benign DNS tests.',
        admiraltyScore: 'A1'
      }
    ],
    quiz: {
      question: 'What is the SIGMA format in modern cybersecurity operations?',
      options: [
        'A Greek alphabet study group',
        'An open, vendor-agnostic signature format for writing detection rules that can be compiled into Splunk, Elastic, QRadar, and Microsoft Sentinel queries',
        'A programming language used exclusively by malicious hackers',
        'A hardware firewall appliance'
      ],
      correctIndex: 1,
      explanation: 'SIGMA is the "Suricata or YARA for log events" — a standardized YAML format that allows analysts to share detection rules across any SIEM platform.'
    },
    badgeEarned: '🛡️ Master SOC Defense Engineer'
  }
];
