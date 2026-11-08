import { 
  Case, Entity, EntityRelationship, EvidenceItem, Lead, 
  Source, TimelineEvent, AnalystNote, AuditLog, GapAnalysis, IntelligenceReport 
} from '../types';

export const initialCases: Case[] = [
  {
    id: 'case-001',
    caseNumber: 'CASE-2026-0891',
    title: 'Aether Dynamics Global - External Surface & Shadow IT Audit',
    classification: 'TLP:AMBER',
    status: 'ACTIVE_INVESTIGATION',
    priority: 'CRITICAL',
    leadAnalyst: 'Lead_Investigator_Chevalier',
    targetEntity: 'Aether Dynamics Global Corporation',
    targetType: 'COMPANY_NAME',
    pirs: [
      'PIR 1: Map all wholly-owned corporate subsidiaries in SEC Exhibit 21 filings.',
      'PIR 2: Identify dangling CNAME records pointing to unclaimed S3/Azure storage buckets.',
      'PIR 3: Assess SPF/DMARC email anti-spoofing posture across root and subsidiary domains.'
    ],
    legalNotes: 'Strict defensive OSINT. Zero active port probing (nmap) or credential testing. 100% passive DNS and CT logs.',
    createdAt: '2026-11-04 14:00:00 UTC',
    updatedAt: '2026-11-04 22:30:00 UTC'
  },
  {
    id: 'case-002',
    caseNumber: 'CASE-2026-0842',
    title: 'Fastly, Inc. - Passive BGP & Infrastructure Dependency Mapping',
    classification: 'TLP:CLEAR',
    status: 'ANALYST_REVIEW',
    priority: 'HIGH',
    leadAnalyst: 'Analyst_Tier2_Recon',
    targetEntity: 'fastly.com',
    targetType: 'DOMAIN',
    pirs: [
      'PIR 1: Enumerate authoritative Name Servers and AS54113 announced IPv4 prefixes.',
      'PIR 2: Trace Anycast CDN point-of-presence redundancy.'
    ],
    legalNotes: 'Public research scenario authorized for technical training.',
    createdAt: '2026-11-01 09:15:00 UTC',
    updatedAt: '2026-11-03 18:20:00 UTC'
  },
  {
    id: 'case-003',
    caseNumber: 'CASE-2026-0775',
    title: 'Cobalt Strike C2 Hunting via Default JARM Cluster Telemetry',
    classification: 'TLP:AMBER+STRICT',
    status: 'ACTIVE_INVESTIGATION',
    priority: 'CRITICAL',
    leadAnalyst: 'Threat_Hunter_SIGMA',
    targetEntity: '07d14d16d21d21d07c42d41d00041d24a458a375eef0c576d23a7bab9a9fb1',
    targetType: 'ALIAS',
    pirs: [
      'PIR 1: Isolate adversary C2 servers sharing default Cobalt Strike JARM hashes.',
      'PIR 2: Filter out legitimate Cloudflare CDN IP collisions.',
      'PIR 3: Author production SIGMA and Suricata perimeter detection rules.'
    ],
    legalNotes: 'Threat telemetry analysis. Zero active exploitation or connection initiation.',
    createdAt: '2026-10-28 11:00:00 UTC',
    updatedAt: '2026-11-04 20:00:00 UTC'
  }
];

export const initialEntities: Entity[] = [
  {
    id: 'ent-001',
    caseId: 'case-001',
    canonicalName: 'Aether Dynamics Global Corporation',
    entityType: 'Corporation (Parent)',
    isConfirmed: true,
    confidenceScore: 0.9850,
    attributes: {
      'SEC CIK': '0001928471',
      'Incorporation State': 'Delaware',
      'HQ Location': 'Reston, VA, USA',
      'Primary Domain': 'aetherdynamics-global.com'
    },
    disambiguationNotes: 'Confirmed via SEC Form 10-K regulatory filing and registered agent records.',
    resolvedBy: 'Lead_Investigator_Chevalier',
    resolvedAt: '2026-11-04 14:30:00 UTC'
  },
  {
    id: 'ent-002',
    caseId: 'case-001',
    canonicalName: 'Horizon Avionics LLC',
    entityType: 'Subsidiary Entity',
    isConfirmed: true,
    confidenceScore: 0.9500,
    attributes: {
      'Ownership': '100% Wholly-Owned',
      'Exhibit 21 Reference': 'Item 21.1 Line 4',
      'Subsidiary Domain': 'horizon-avionics.tech'
    },
    disambiguationNotes: 'Disclosed in SEC Form 10-K Exhibit 21 as wholly owned subsidiary.',
    resolvedBy: 'Lead_Investigator_Chevalier',
    resolvedAt: '2026-11-04 15:10:00 UTC'
  },
  {
    id: 'ent-003',
    caseId: 'case-001',
    canonicalName: 'stage-api.horizon-avionics.tech',
    entityType: 'Shadow IT Staging Endpoint',
    isConfirmed: false,
    confidenceScore: 0.6500,
    attributes: {
      'DNS CNAME': 'horizon-stage.s3-website-us-east-1.amazonaws.com',
      'Cloud Status': 'Dangling Pointer (NoSuchBucket)',
      'TLS Subject': 'CN=*.horizon-avionics.tech'
    },
    disambiguationNotes: 'Requires manual verification of DNS zone file before confirmation.',
    resolvedBy: undefined,
    resolvedAt: undefined
  },
  {
    id: 'ent-004',
    caseId: 'case-001',
    canonicalName: 'Dr. Evelyn Vance (Chief Technology Officer)',
    entityType: 'Corporate Officer (Identity)',
    isConfirmed: true,
    confidenceScore: 0.9200,
    attributes: {
      'SEC DEF 14A': 'Director & Officer Nominee',
      'ORCID Record': '0000-0002-1829-9182',
      'Public GitHub': 'e-vance-aether'
    },
    disambiguationNotes: 'Disambiguated from Dr. Evelyn Vance (Cardiologist, Ohio) via CIK and tech publications.',
    resolvedBy: 'Lead_Investigator_Chevalier',
    resolvedAt: '2026-11-04 16:45:00 UTC'
  }
];

export const initialRelationships: EntityRelationship[] = [
  {
    id: 'rel-001',
    sourceEntityId: 'ent-001',
    targetEntityId: 'ent-002',
    relationshipType: 'CONTROLS_SUBSIDIARY',
    propertyBucket: 'Organizations',
    edgeWeight: 1.00,
    admiraltyScore: 'A1',
    corroborationCount: 3
  },
  {
    id: 'rel-002',
    sourceEntityId: 'ent-002',
    targetEntityId: 'ent-003',
    relationshipType: 'ROUTES_TRAFFIC_TO',
    propertyBucket: 'Digital Presence',
    edgeWeight: 0.90,
    admiraltyScore: 'A1',
    corroborationCount: 2
  },
  {
    id: 'rel-003',
    sourceEntityId: 'ent-001',
    targetEntityId: 'ent-004',
    relationshipType: 'EMPLOYS_EXECUTIVE',
    propertyBucket: 'Identity',
    edgeWeight: 0.95,
    admiraltyScore: 'A1',
    corroborationCount: 4
  }
];

export const initialEvidence: EvidenceItem[] = [
  {
    id: 'ev-001',
    caseId: 'case-001',
    itemNumber: 'ITEM-001',
    title: 'SEC Form 10-K Exhibit 21.1 Subsidiary Disclosure',
    sourceUrl: 'https://www.sec.gov/edgar/data/0001928471/exhibit21-1.htm',
    archiveUrl: 'https://web.archive.org/web/20261104142010/https://www.sec.gov/edgar/data/0001928471/exhibit21-1.htm',
    sha256Hash: 'a7b4c9e8210f9a234b6c8d7e0123456789abcdef0123456789abcdef01234567',
    filePath: 'cases/evidence_raw/CASE_001_ITEM_001_sec_exhibit21.pdf',
    captureTimestamp: '2026-11-04 14:22:15 UTC',
    admiraltyReliability: 'A',
    admiraltyCredibility: '1',
    fullViewportVerified: true,
    verifiedBy: 'Lead_Investigator_Chevalier'
  },
  {
    id: 'ev-002',
    caseId: 'case-001',
    itemNumber: 'ITEM-002',
    title: 'Certificate Transparency Log Wildcard Extraction (crt.sh)',
    sourceUrl: 'https://crt.sh/?q=%25.horizon-avionics.tech&output=json',
    archiveUrl: 'https://web.archive.org/web/20261104150500/https://crt.sh/?q=%25.horizon-avionics.tech',
    sha256Hash: '8f92b1a03e4c7d6b8a2e1f0c9b8a7d6e5f4c3b2a1e0f9d8c7b6a5e4d3c2b1a0f',
    filePath: 'cases/evidence_raw/CASE_001_ITEM_002_crtsh_dump.json',
    captureTimestamp: '2026-11-04 15:08:40 UTC',
    admiraltyReliability: 'A',
    admiraltyCredibility: '1',
    fullViewportVerified: true,
    verifiedBy: 'Lead_Investigator_Chevalier'
  },
  {
    id: 'ev-003',
    caseId: 'case-001',
    itemNumber: 'ITEM-003',
    title: 'HTTP HEAD Verification - Dangling S3 NoSuchBucket Error',
    sourceUrl: 'https://stage-api.horizon-avionics.tech/',
    archiveUrl: 'https://web.archive.org/web/20261104163012/https://stage-api.horizon-avionics.tech/',
    sha256Hash: '3c2b1a0f9e8d7c6b5a4e3f2d1c0b9a8f7e6d5c4b3a2e1f0d9c8b7a6e5f4c3b2a',
    filePath: 'cases/evidence_raw/CASE_001_ITEM_003_s3_nosuchbucket.png',
    captureTimestamp: '2026-11-04 16:32:00 UTC',
    admiraltyReliability: 'A',
    admiraltyCredibility: '1',
    fullViewportVerified: true,
    verifiedBy: 'Lead_Investigator_Chevalier'
  }
];

export const initialLeads: Lead[] = [
  {
    id: 'lead-001',
    caseId: 'case-001',
    leadCode: 'LEAD-901',
    title: 'Potential Typosquatting Phishing Gateway (aetherdynamic-login.com)',
    inputType: 'DOMAIN',
    rawValue: 'http://aetherdynamic-login.com',
    normalizedValue: 'aetherdynamic-login.com',
    sourceReference: 'dnstwist registered scan',
    priority: 'CRITICAL',
    status: 'QUEUED',
    confidenceScore: 0.8800,
    assignedAnalyst: 'Threat_Hunter_SIGMA',
    createdAt: '2026-11-04 18:00:00 UTC'
  },
  {
    id: 'lead-002',
    caseId: 'case-001',
    leadCode: 'LEAD-902',
    title: 'Unauthenticated Public Swagger Documentation Endpoint',
    inputType: 'WEBSITE_URL',
    rawValue: 'https://api.aetherdynamics-global.com/v2/swagger.json',
    normalizedValue: 'api.aetherdynamics-global.com/v2/swagger.json',
    sourceReference: 'APIs.guru public crawl',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    confidenceScore: 0.7500,
    assignedAnalyst: 'Lead_Investigator_Chevalier',
    createdAt: '2026-11-04 19:15:00 UTC'
  },
  {
    id: 'lead-003',
    caseId: 'case-001',
    leadCode: 'LEAD-903',
    title: 'Disclosed CI/CD Outbound Slack Webhook in Commit History',
    inputType: 'WEBSITE_URL',
    rawValue: 'https://hooks.slack.com/services/T000/B000/XXXX',
    normalizedValue: 'hooks.slack.com/services/T000/B000/XXXX',
    sourceReference: 'Public GitHub repo commit delta',
    priority: 'HIGH',
    status: 'QUEUED',
    confidenceScore: 0.9200,
    assignedAnalyst: 'Analyst_Tier2_Recon',
    createdAt: '2026-11-04 20:30:00 UTC'
  }
];

export const initialSources: Source[] = [
  {
    id: 'src-001',
    name: 'SEC EDGAR System (U.S. Securities and Exchange Commission)',
    category: 'BUSINESS_INFO',
    baseUrl: 'https://data.sec.gov/',
    baselineReliability: 'A',
    validationProtocol: 'Cryptographic HTTPS certificate check; verify central index key (CIK).',
    isActive: true
  },
  {
    id: 'src-002',
    name: 'crt.sh (Certificate Transparency Log Aggregator)',
    category: 'DOMAIN_INTEL',
    baseUrl: 'https://crt.sh/',
    baselineReliability: 'A',
    validationProtocol: 'RFC 6962 append-only log verification; serial number check.',
    isActive: true
  },
  {
    id: 'src-003',
    name: 'BGPView REST Routing API',
    category: 'DOMAIN_INTEL',
    baseUrl: 'https://api.bgpview.io/',
    baselineReliability: 'A',
    validationProtocol: 'BGP origin ASN cross-referenced against RIPE RIS and RouteViews collectors.',
    isActive: true
  },
  {
    id: 'src-004',
    name: 'Internet Archive Wayback CDX Server',
    category: 'PUBLIC_SEARCH',
    baseUrl: 'https://web.archive.org/cdx/',
    baselineReliability: 'B',
    validationProtocol: 'SHA-1 payload digest verification against archived raw headers.',
    isActive: true
  }
];

export const initialTimeline: TimelineEvent[] = [
  {
    id: 'tl-001',
    caseId: 'case-001',
    eventTimestamp: '2024-03-15 00:00:00 UTC',
    title: 'Acquisition of Horizon Avionics Finalized',
    description: 'Aether Dynamics acquires 100% equity stake in Horizon Avionics LLC via Form 8-K disclosure.',
    eventType: 'ACQUISITION',
    confidenceScore: 'A1',
    evidenceId: 'ev-001'
  },
  {
    id: 'tl-002',
    caseId: 'case-001',
    eventTimestamp: '2025-06-20 11:42:00 UTC',
    title: 'Wildcard SSL Certificate Issued for Horizon Domain',
    description: 'Let’s Encrypt issues 90-day wildcard certificate covering *.horizon-avionics.tech.',
    eventType: 'CERT_ISSUED',
    confidenceScore: 'A1',
    evidenceId: 'ev-002'
  },
  {
    id: 'tl-003',
    caseId: 'case-001',
    eventTimestamp: '2026-11-04 16:32:00 UTC',
    title: 'Dangling CNAME Verified on Stage Endpoint',
    description: 'Stage subdomain confirmed resolving to orphaned AWS S3 bucket with NoSuchBucket error.',
    eventType: 'DNS_DRIFT',
    confidenceScore: 'A1',
    evidenceId: 'ev-003'
  }
];

export const initialNotes: AnalystNote[] = [
  {
    id: 'note-001',
    caseId: 'case-001',
    author: 'Lead_Investigator_Chevalier',
    title: 'Hypothesis: Acquired Subsidiary DNS Zones Lack Automated Pruning',
    contentMarkdown: `### Investigation Working Hypothesis
When Aether Dynamics completed the acquisition of Horizon Avionics, the cloud infrastructure was partially migrated to Azure, but legacy AWS S3 pointers were left active in Route53. 

**Immediate Risk:**
Any external threat actor who registers the bucket name \`horizon-stage\` in \`us-east-1\` can immediately serve arbitrary malicious JavaScript on \`stage-api.horizon-avionics.tech\`.

**Recommended Board Action:**
Instruct DNS operations to prune this CNAME immediately before the IPO filing date.`,
    tags: ['DNS_Takeover', 'M&A_Risk', 'Cloud_S3', 'High_Severity'],
    isHypothesis: true,
    createdAt: '2026-11-04 17:15:00 UTC',
    updatedAt: '2026-11-04 17:45:00 UTC'
  }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: 'aud-001',
    caseId: 'case-001',
    userId: 'Lead_Investigator_Chevalier',
    actionType: 'CASE_INITIALIZED',
    targetTable: 'cases',
    deltaSummary: 'Initialized CASE-2026-0891 with TLP:AMBER classification and 3 PIRs.',
    clientIp: '127.0.0.1 (Isolated Enclave)',
    timestamp: '2026-11-04 14:00:00 UTC'
  },
  {
    id: 'aud-002',
    caseId: 'case-001',
    userId: 'Lead_Investigator_Chevalier',
    actionType: 'EVIDENCE_HASH_VERIFIED',
    targetTable: 'evidence_items',
    deltaSummary: 'Cryptographically verified SHA-256 for ITEM-001 (sec_exhibit21.pdf).',
    clientIp: '127.0.0.1 (Isolated Enclave)',
    timestamp: '2026-11-04 14:25:00 UTC'
  },
  {
    id: 'aud-003',
    caseId: 'case-001',
    userId: 'Lead_Investigator_Chevalier',
    actionType: 'HUMAN_ENTITY_VALIDATION',
    targetTable: 'entities',
    deltaSummary: 'Human analyst explicitly approved entity resolution for Dr. Evelyn Vance (CTO).',
    clientIp: '127.0.0.1 (Isolated Enclave)',
    timestamp: '2026-11-04 16:45:00 UTC'
  }
];

export const initialGaps: GapAnalysis[] = [
  {
    id: 'gap-001',
    caseId: 'case-001',
    title: 'Uncorroborated Autonomous System Origin for Frankfurt Data Center',
    gapType: 'UNCORROBORATED_CLAIM',
    severity: 'HIGH',
    description: 'Public press release cites a redundant cloud node in Frankfurt, but BGP routing tables only show Ashburn and Dublin IP prefixes announced by AS54113.',
    recommendedAction: 'Query RIPE NCC database directly and check secondary German IX peering looking glass.',
    isResolved: false
  },
  {
    id: 'gap-002',
    caseId: 'case-001',
    title: 'Stale WHOIS Contact from 2021 on Legacy Corporate Portal',
    gapType: 'STALE_RECORD',
    severity: 'MEDIUM',
    description: 'Technical contact email hostmaster@aether-legacy.com has not been updated since corporate rebranding in 2022.',
    recommendedAction: 'Verify whether aether-legacy.com domain is enrolled in registrar auto-renew.',
    isResolved: false
  }
];

export const initialReport: IntelligenceReport = {
  id: 'rep-001',
  caseId: 'case-001',
  reportNumber: 'CTI-REP-2026-0891-FINAL',
  title: 'Operation Horizon Shield: Pre-IPO External Attack Surface Intelligence Assessment',
  classification: 'TLP:AMBER',
  executiveSummary: `Aether Dynamics Global Corporation retains critical external attack surface exposures resulting from unmanaged digital debt inherited during the Horizon Avionics acquisition. A passive audit uncovered an active dangling DNS CNAME pointing to an abandoned AWS S3 bucket on a high-value staging subdomain, exposing the company to client-side subdomain takeover. Email authentication on subsidiary domains lacks DMARC enforcement (p=none), leaving the corporate brand vulnerable to executive impersonation phishing campaigns ahead of the planned public listing.`,
  confidenceAssessment: `Overall assessment is evaluated at HIGH CONFIDENCE (Admiralty A1) based on multi-source corroboration across official SEC regulatory filings, immutable Certificate Transparency logs, and direct authoritative DNS queries.`,
  informationGaps: `Origin IP addresses for the primary marketing web server remain shielded behind Cloudflare Anycast CDN and were not unmasked passivly without active probing (which is strictly prohibited under our ethical charter).`,
  sigmaRuleYaml: `title: Outbound Request to Known Impersonation Typosquat Domain
id: a7c2d1e0-8b4f-4a3e-9123-c0a801012345
status: stable
description: Detects internal workstation DNS queries resolving to discovered brand typosquatting domain aetherdynamic-login.com.
author: Lead_Investigator_Chevalier
date: 2026-11-04
logsource:
    category: dns
    product: windows
detection:
    selection:
        QueryName|endswith: 'aetherdynamic-login.com'
    condition: selection
level: critical`,
  status: 'DRAFT',
  approvedBy: undefined,
  generatedAt: '2026-11-04 21:00:00 UTC'
};

export function getCaseEntities(caseId: string, missionTarget?: string, missionTitle?: string): Entity[] {
  if (caseId === 'case-001') {
    return initialEntities;
  }
  const target = missionTarget || 'target-entity.com';
  const cleanTarget = target.replace(/^https?:\/\//i, '').replace(/\/.*$/, '');
  const title = missionTitle || 'Case Investigation Target';

  return [
    {
      id: `ent-${caseId}-01`,
      caseId: caseId,
      canonicalName: title.split(':')[0].trim() || cleanTarget,
      entityType: 'Target Organization / Apex Domain',
      isConfirmed: true,
      confidenceScore: 0.98,
      attributes: {
        'Target Primary Identifier': cleanTarget,
        'Investigation Status': 'Active Defensive Scope',
        'CFAA Audit Boundary': 'Passive Telemetry Only'
      },
      disambiguationNotes: 'Primary verified target entity under investigation.',
      resolvedBy: 'Lead_Investigator_Chevalier',
      resolvedAt: '2026-11-05 10:00:00 UTC'
    },
    {
      id: `ent-${caseId}-02`,
      caseId: caseId,
      canonicalName: `ns1.${cleanTarget.toLowerCase().replace(/[^a-z0-9]/g, '')}.net`,
      entityType: 'Authoritative Name Server',
      isConfirmed: true,
      confidenceScore: 0.95,
      attributes: {
        'DNS Authority': 'Primary Root Zone Delegation',
        'DNSSEC Status': 'Active Validating Resolver'
      },
      disambiguationNotes: 'Corroborated via authoritative SOA and NS records.',
      resolvedBy: 'Lead_Investigator_Chevalier',
      resolvedAt: '2026-11-05 10:15:00 UTC'
    },
    {
      id: `ent-${caseId}-03`,
      caseId: caseId,
      canonicalName: `AS54113 (Global Anycast Transit)`,
      entityType: 'Autonomous System Number',
      isConfirmed: true,
      confidenceScore: 0.92,
      attributes: {
        'BGP Prefixes': '68 Announced CIDRs',
        'Tier-1 Upstream': 'Cogent, Arelion, NTT'
      },
      disambiguationNotes: 'Extracted via BGPView REST looking-glass telemetry.',
      resolvedBy: 'Lead_Investigator_Chevalier',
      resolvedAt: '2026-11-05 10:30:00 UTC'
    },
    {
      id: `ent-${caseId}-04`,
      caseId: caseId,
      canonicalName: `mail-inbound.${cleanTarget}`,
      entityType: 'Mail Exchange Perimeter',
      isConfirmed: false,
      confidenceScore: 0.70,
      attributes: {
        'SPF Status': '~all (SoftFail)',
        'DMARC Enforcement': 'p=none (Monitoring Mode)'
      },
      disambiguationNotes: 'Uncorroborated mail routing configuration requiring SPF/DMARC hardening.',
      resolvedBy: undefined,
      resolvedAt: undefined
    }
  ];
}

export function getCaseRelationships(caseId: string, entities: Entity[]): EntityRelationship[] {
  if (caseId === 'case-001') {
    return initialRelationships;
  }
  if (entities.length < 2) return [];

  return [
    {
      id: `rel-${caseId}-01`,
      sourceEntityId: entities[0].id,
      targetEntityId: entities[1].id,
      relationshipType: 'DELEGATES_DNS_AUTHORITY',
      propertyBucket: 'Digital Presence',
      edgeWeight: 0.95,
      admiraltyScore: 'A1',
      corroborationCount: 2
    },
    {
      id: `rel-${caseId}-02`,
      sourceEntityId: entities[0].id,
      targetEntityId: entities[2] ? entities[2].id : entities[1].id,
      relationshipType: 'ROUTES_TRAFFIC_VIA_ASN',
      propertyBucket: 'Organizations',
      edgeWeight: 0.90,
      admiraltyScore: 'A1',
      corroborationCount: 3
    },
    {
      id: `rel-${caseId}-03`,
      sourceEntityId: entities[0].id,
      targetEntityId: entities[3] ? entities[3].id : entities[1].id,
      relationshipType: 'MAINTAINS_MAIL_EXCHANGE',
      propertyBucket: 'Digital Presence',
      edgeWeight: 0.75,
      admiraltyScore: 'B2',
      corroborationCount: 1
    }
  ];
}

export function getCaseTimeline(caseId: string, targetName: string): TimelineEvent[] {
  if (caseId === 'case-001') {
    return initialTimeline;
  }
  return [
    {
      id: `tl-${caseId}-01`,
      caseId: caseId,
      eventTimestamp: '2020-04-12 11:22:15 UTC',
      title: 'Initial Domain Registration & Apex DNS Setup',
      description: `Target entity registered domain ${targetName} under ICANN accredited registrar.`,
      eventType: 'INFRASTRUCTURE_REGISTERED',
      confidenceScore: '0.95'
    },
    {
      id: `tl-${caseId}-02`,
      caseId: caseId,
      eventTimestamp: '2024-03-15 09:12:00 UTC',
      title: 'Wildcard Certificate Transparency Log Entry',
      description: `Let's Encrypt issued TLS certificate covering *.${targetName} recorded in public append-only RFC 6962 ledger.`,
      eventType: 'CERT_ISSUED',
      confidenceScore: '0.99'
    },
    {
      id: `tl-${caseId}-03`,
      caseId: caseId,
      eventTimestamp: '2026-11-01 14:00:00 UTC',
      title: 'Defensive Attack Surface Reconnaissance Initiated',
      description: `Passive reconnaissance sweep launched against ${targetName} using Sovereign OSINT Workbench.`,
      eventType: 'DNS_DRIFT',
      confidenceScore: '0.90'
    }
  ];
}
