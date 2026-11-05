export interface CapstonePhase {
  id: number;
  title: string;
  focus: string;
  pir: string;
  tasks: {
    id: string;
    title: string;
    command: string;
    tool: string;
    output: string;
    highlight: string;
    finding: string;
    impact: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    remediation: string;
    admiralty: string;
  }[];
}

export const capstoneData: {
  target: string;
  domain: string;
  scenario: string;
  mandate: string;
  phases: CapstonePhase[];
} = {
  target: 'Aether Dynamics Global Corporation',
  domain: 'aetherdynamics-global.com',
  scenario: 'Pre-IPO External Attack Surface Audit & Threat Hunt (Operation Horizon Shield)',
  mandate: 'The Board of Directors has commissioned an independent, 100% passive external attack surface audit prior to a high-profile initial public offering. Strict zero active probing rule enforced under CFAA.',
  phases: [
    {
      id: 1,
      title: 'Phase 1: Corporate Holdings & Regulatory Discovery',
      focus: 'SEC Filings, Exhibit 21 Subsidiaries & Interlocking Directorships',
      pir: 'PIR 1: What wholly-owned subsidiary brands, international operating entities, and corporate officers exist within the enterprise umbrella?',
      tasks: [
        {
          id: 'task-1-1',
          title: 'SEC Form 10-K Exhibit 21 Subsidiary Discovery',
          tool: 'SEC EDGAR API / curl',
          command: 'curl -s "https://data.sec.gov/submissions/CIK0001948210.json" | grep -A 4 "Exhibit 21"',
          output: `[EXHIBIT 21.1 - SUBSIDIARIES OF AETHER DYNAMICS GLOBAL CORP]
1. Horizon Orbitics B.V. (Netherlands Co #849102) - Satellite Propulsion
2. Aether Defense Systems LLC (Delaware, USA) - Autonomous Avionics
3. Stratos Cloud Holdings Ltd (United Kingdom Co #09418291) - Shadow Cloud Host
4. Aether Logistics Singapore Pte. Ltd. (Singapore UEN 202109841K)`,
          highlight: 'Stratos Cloud Holdings Ltd (United Kingdom) & Horizon Orbitics B.V.',
          finding: 'Identified unmapped overseas holding entities with autonomous digital domains operating outside standard US corporate IT oversight.',
          impact: 'MEDIUM',
          remediation: 'Bring international subsidiary apex domains into enterprise asset management inventory.',
          admiralty: 'A1'
        },
        {
          id: 'task-1-2',
          title: 'Executive Board Governance & Directorship Interlocks',
          tool: 'SEC DEF 14A Proxy Statement Parser',
          command: 'grep -A 6 "Interlocking Directorship" DEF14A_proxy.txt',
          output: `DIRECTOR: Dr. Marcus Vance (Audit & Technology Oversight Committee)
Active Corporate Boards:
 - Aether Dynamics Global Corp (2020 - Present)
 - Kestrel Avionics Systems Ltd (Primary Commercial Competitor)
 - Apex Cloud Data Enclaves LLC (Subcontractor Vendor)`,
          highlight: 'Interlocking board seat with direct defense competitor Kestrel Avionics',
          finding: 'Conflict of interest discovered: Key board committee member holds concurrent board seat on primary defense competitor.',
          impact: 'HIGH',
          remediation: 'Submit conflict disclosure to corporate ethics counsel under Clayton Act Section 8 governance.',
          admiralty: 'A1'
        }
      ]
    },
    {
      id: 2,
      title: 'Phase 2: Autonomous Attack Surface & Mail Hygiene',
      focus: 'BGP Prefixes, DNS Exchangers & Email Spoofing Defense',
      pir: 'PIR 2: What are the authoritative DNS nameservers, BGP routing prefixes, mail exchangers, and email anti-spoofing enforcement levels (SPF/DMARC)?',
      tasks: [
        {
          id: 'task-2-1',
          title: 'Autonomous System Number (ASN) & IP CIDR Mapping',
          tool: 'BGPView / RIPEstat API',
          command: 'curl -s "https://api.bgpview.io/asn/394120/prefixes" | jq \'.data.ipv4_prefixes[0:2]\'',
          output: `[
  {
    "prefix": "198.51.100.0/24",
    "name": "AETHER-DYNAMICS-CORP",
    "description": "Primary Corporate Datacenter & Telemetry Fleet",
    "country": "US"
  },
  {
    "prefix": "203.0.113.0/24",
    "name": "STRATOS-CLOUD-GATEWAY",
    "description": "Autonomous Edge Infrastructure",
    "country": "GB"
  }
]`,
          highlight: 'prefix: 203.0.113.0/24 (Stratos Cloud Gateway)',
          finding: 'Mapped complete external IP perimeter: 2x /24 prefixes (512 public IP addresses) bounded across US and UK jurisdictions.',
          impact: 'LOW',
          remediation: 'Establish perimeter monitoring on both announced BGP blocks for route leaks.',
          admiralty: 'A1'
        },
        {
          id: 'task-2-2',
          title: 'Email Spoofing Defense (SPF & DMARC Audit)',
          tool: 'dig (BIND DNS)',
          command: 'dig +noall +answer TXT aetherdynamics-global.com _dmarc.aetherdynamics-global.com',
          output: `aetherdynamics-global.com.        300 IN TXT "v=spf1 include:_spf.google.com ~all"
_dmarc.aetherdynamics-global.com. 300 IN TXT "v=DMARC1; p=none; rua=mailto:dmarc-reports@aetherdynamics-global.com"`,
          highlight: 'p=none (Monitor Mode Only - Spoofing Permitted)',
          finding: 'CRITICAL EMAIL EXPOSURE: DMARC is configured in monitor-only mode (p=none). External attackers can forge emails from ceo@aetherdynamics-global.com to execute wire fraud.',
          impact: 'CRITICAL',
          remediation: 'Upgrade DMARC policy from p=none to p=quarantine, and subsequently to p=reject at the SMTP perimeter.',
          admiralty: 'A1'
        }
      ]
    },
    {
      id: 3,
      title: 'Phase 3: Cloud Storage & Shadow IT Namespace Audit',
      focus: 'Dangling CNAMEs, Unclaimed S3 Buckets & OpenAPI Schema Leaks',
      pir: 'PIR 3: Are there unmapped subdomains, development staging portals, exposed OpenAPI/Swagger specs, or dangling CNAME pointers?',
      tasks: [
        {
          id: 'task-3-1',
          title: 'Dangling CNAME Subdomain Takeover Audit',
          tool: 'dig & curl (HTTP Status Inspection)',
          command: 'dig +noall +answer CNAME beta-portal.aetherdynamics-global.com && curl -s -I https://beta-portal.aetherdynamics-global.com',
          output: `beta-portal.aetherdynamics-global.com. 300 IN CNAME aether-stage-bucket.s3-website-us-east-1.amazonaws.com.

HTTP/1.1 404 Not Found
x-amz-error-code: NoSuchBucket
x-amz-error-message: The specified bucket does not exist`,
          highlight: 'NoSuchBucket on CNAME aether-stage-bucket.s3-website-us-east-1.amazonaws.com',
          finding: 'SUBDOMAIN TAKEOVER VULNERABILITY: DNS record beta-portal points to an abandoned S3 bucket. Any internet user can register this bucket name and hijack the trusted corporate subdomain.',
          impact: 'CRITICAL',
          remediation: 'Immediately delete the orphaned DNS CNAME record or claim the S3 bucket in the corporate AWS account.',
          admiralty: 'A1'
        },
        {
          id: 'task-3-2',
          title: 'Unauthenticated OpenAPI / Swagger Schema Exposure',
          tool: 'curl (HTTP GET)',
          command: 'curl -s "https://api-gateway.aetherdynamics-global.com/v3/api-docs" | jq \'.paths | keys[0:4]\'',
          output: `[
  "/api/v1/telemetry/payload-status",
  "/api/v1/auth/exchange-token",
  "/api/v2/internal/debug-database-snapshot",
  "/api/v2/admin/override-flight-parameters"
]`,
          highlight: '/api/v2/internal/debug-database-snapshot',
          finding: 'SHADOW API BLUEPRINT LEAK: Internal administrative and database debugging endpoints are exposed in unauthenticated public OpenAPI documentation.',
          impact: 'HIGH',
          remediation: 'Disable public OpenAPI documentation generation on external-facing production API gateways.',
          admiralty: 'A1'
        }
      ]
    },
    {
      id: 4,
      title: 'Phase 4: Adversary Threat Hunting & Brand Protection',
      focus: 'Typosquatting Phishing Gateways & JARM C2 Fingerprinting',
      pir: 'PIR 4: Are there registered look-alike phishing gateways with live MX records, or Command & Control (C2) clusters mimicking the corporate brand?',
      tasks: [
        {
          id: 'task-4-1',
          title: 'dnstwist Typosquat Permutation & MX Weaponization',
          tool: 'dnstwist',
          command: 'dnstwist --registered --mx aetherdynamics-global.com | grep "Active"',
          output: `[DNSTWIST THREAT MATRIX]
Original: aetherdynamics-global.com

Domain:  aetherdynarnics-global.com (rn for m homoglyph)
IP:      194.26.29.112 (Panama City, PA)
Status:  MX Active -> mail.aetherdynarnics-global.com -> WEAPONIZED
Registrar: Porkbun LLC`,
          highlight: 'aetherdynarnics-global.com | MX Active -> WEAPONIZED',
          finding: 'ACTIVE WEAPONIZED PHISHING GATEWAY: Adversary registered a visual homoglyph domain with live MX records configured for targeted spear-phishing against employees.',
          impact: 'CRITICAL',
          remediation: 'File an emergency Uniform Domain-Name Dispute-Resolution Policy (UDRP) complaint with WIPO to seize the domain.',
          admiralty: 'A1'
        },
        {
          id: 'task-4-2',
          title: 'JARM TLS Fingerprinting against Adversary Gateway',
          tool: 'jarm.py / Censys',
          command: 'python3 jarm.py 194.26.29.112:443',
          output: `[JARM PROBING RESULT: 194.26.29.112:443]
Calculated JARM: 07d14d16d21d21d07c42d41d00041d24a458a375eef0c576d23a7bab9a9fb1

[DATABASE SIGNATURE MATCH]
MATCH: Cobalt Strike Default Team Server (Java 11 TLS Stack)
Threat Group: UNC-9418 (Advanced Ransomware Precursor Syndicate)`,
          highlight: 'MATCH: Cobalt Strike Default Team Server',
          finding: 'ADVERSARY C2 IDENTIFIED: The phishing gateway server runs a default Cobalt Strike C2 team server actively preparing for credential theft and lateral movement.',
          impact: 'CRITICAL',
          remediation: 'Push the JARM fingerprint and IP 194.26.29.112 into enterprise EDR and edge firewall blocklists.',
          admiralty: 'A1'
        }
      ]
    },
    {
      id: 5,
      title: 'Phase 5: Software Supply Chain & Code Provenance',
      focus: 'Public GitHub Commits, Hardcoded Tokens & SBOM Audits',
      pir: 'PIR 5: What open-source software libraries, CI/CD pipelines, and third-party SaaS OAuth integrations are exposed in public code repositories?',
      tasks: [
        {
          id: 'task-5-1',
          title: 'Public GitHub Commit History Credential Leak',
          tool: 'git log -p -S / TruffleHog',
          command: 'git log -p -S "xoxb-" -- ./integrations/slack_notifier.py',
          output: `commit 8b41a90128cf840291ba
Author: dev-intern <intern@aetherdynamics-global.com>
Date:   Mon Aug 17 14:10:02 2026 -0400

    Remove test slack webhook token before release

- SLACK_BOT_TOKEN="xoxb-94182901-abcdef489102"
+ SLACK_BOT_TOKEN=os.environ.get("SLACK_BOT_TOKEN")`,
          highlight: 'SLACK_BOT_TOKEN="xoxb-94182901-abcdef489102"',
          finding: 'LIVE CREDENTIAL IN GIT HISTORY: Enterprise Slack Bot OAuth token preserved in public commit history, granting read access to internal engineering chat channels.',
          impact: 'HIGH',
          remediation: 'Immediately revoke the Slack OAuth token in the Slack API console and run git-filter-repo to purge historical commits.',
          admiralty: 'A1'
        }
      ]
    },
    {
      id: 6,
      title: 'Phase 6: Executive Board Presentation & C-Suite Deliverable',
      focus: 'BLUF Briefing, Risk Matrix & Production SIGMA Rules',
      pir: 'PIR 6: Synthesize all findings into a defensible board presentation and automated SOC detection rule handoff.',
      tasks: [
        {
          id: 'task-6-1',
          title: 'Production SIGMA Detection Rule Synthesis',
          tool: 'sigma-cli / detection-engine',
          command: 'sigma-gen --rule-type dns_query --c2-domains "aetherdynarnics-global.com" --jarm "07d14d16d21d21..."',
          output: `title: Detect Outbound Connection to Aether Dynamics Typosquat C2
id: 4a2b91c0-8412-4f81-9921-a18290124810
status: production
description: Alerts on any internal corporate endpoint attempting DNS resolution or TCP connection to UNC-9418 weaponized phishing gateway.
logsource:
  category: dns_query
  product: windows
detection:
  selection:
    QueryName|contains:
      - 'aetherdynarnics-global.com'
  condition: selection
level: critical`,
          highlight: 'level: critical | condition: selection',
          finding: 'SOC HANDOFF READY: Compiled production SIGMA rule ready for direct ingestion into Splunk, Microsoft Sentinel, and Elastic SIEM.',
          impact: 'LOW',
          remediation: 'Deploy detection rule into corporate SIEM with immediate automated host isolation on alert trigger.',
          admiralty: 'A1'
        }
      ]
    }
  ]
};
