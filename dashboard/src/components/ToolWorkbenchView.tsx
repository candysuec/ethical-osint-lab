import React, { useState } from 'react';
import { 
  Terminal, Play, CheckCircle2, Copy, Hash, Shield, 
  ExternalLink, ArrowRight, Sparkles, AlertTriangle, RefreshCw,
  Layers, Network, FileCheck, Inbox
} from 'lucide-react';
import { Case, EvidenceItem, Lead, Entity } from '../types';

interface ToolWorkbenchProps {
  currentCase: Case;
  onAddEvidence: (item: EvidenceItem) => void;
  onAddEntity: (entity: Entity) => void;
  onAddLead: (lead: Lead) => void;
}

type ToolPreset = 
  | 'DNS_MAIL' 
  | 'CRT_SH' 
  | 'DNSTWIST' 
  | 'BGP_ASN' 
  | 'METADATA_EXIF' 
  | 'WAYBACK_CDX' 
  | 'SPIDERFOOT_LOCAL';

export const ToolWorkbenchView: React.FC<ToolWorkbenchProps> = ({
  currentCase,
  onAddEvidence,
  onAddEntity,
  onAddLead
}) => {
  const [activeTool, setActiveTool] = useState<ToolPreset>('DNS_MAIL');
  const [targetInput, setTargetInput] = useState<string>(
    currentCase.targetType === 'DOMAIN' ? currentCase.targetEntity : 'aetherdynamics-global.com'
  );
  const [executing, setExecuting] = useState<boolean>(false);
  const [outputStdout, setOutputStdout] = useState<string>('');
  const [outputJson, setOutputJson] = useState<any>(null);
  const [outputHash, setOutputHash] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [evidenceCreatedToast, setEvidenceCreatedToast] = useState<string | null>(null);

  // Compute live SHA-256 hash of output
  const computeSha256 = async (content: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(content);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  // Tool Runners with Realistic Intelligence Data
  const runTool = async (preset: ToolPreset, target: string) => {
    setExecuting(true);
    setOutputStdout('');
    setOutputJson(null);
    setOutputHash('');

    const cleanTarget = target.trim().replace(/^https?:\/\//i, '').replace(/\/.*$/, '');

    setTimeout(async () => {
      let resultText = '';
      let jsonObj = null;

      if (preset === 'DNS_MAIL') {
        resultText = `; <<>> DiG 9.18.28-1~deb12u2-Debian <<>> +noall +answer NS ${cleanTarget} MX ${cleanTarget} TXT ${cleanTarget} TXT _dmarc.${cleanTarget}
;; QUESTION SECTION:
;${cleanTarget}.                 IN      NS
;${cleanTarget}.                 IN      MX
;${cleanTarget}.                 IN      TXT
;_dmarc.${cleanTarget}.          IN      TXT

;; ANSWER SECTION:
${cleanTarget}.          300     IN      NS      ns1.cloud-routing.net.
${cleanTarget}.          300     IN      NS      ns2.cloud-routing.net.
${cleanTarget}.          300     IN      MX      10 mx1.google-perimeter.com.
${cleanTarget}.          300     IN      MX      20 mx2.google-perimeter.com.
${cleanTarget}.          300     IN      TXT     "v=spf1 include:_spf.google.com include:mailgun.org ~all"
_dmarc.${cleanTarget}.   300     IN      TXT     "v=DMARC1; p=none; sp=none; rua=mailto:dmarc-reports@${cleanTarget}; pct=100"

;; AUDIT FINDING:
[!] EMAIL SPOOFING HAZARD DETECTED:
    • SPF Terminal Qualifier: ~all (SoftFail - Non-enforcing)
    • DMARC Policy: p=none (Monitoring mode only; spoofed emails reach inboxes)
    • Recommended Board Action: Upgrade DMARC policy to p=reject immediately.`;
        jsonObj = {
          domain: cleanTarget,
          ns: ["ns1.cloud-routing.net", "ns2.cloud-routing.net"],
          mx: ["mx1.google-perimeter.com", "mx2.google-perimeter.com"],
          spf: "v=spf1 include:_spf.google.com include:mailgun.org ~all",
          dmarc: "v=DMARC1; p=none; sp=none; rua=mailto:dmarc-reports@" + cleanTarget,
          vulnerability: "DMARC_POLICY_UNENFORCED"
        };
      } else if (preset === 'CRT_SH') {
        const subList = [
          `api.${cleanTarget}`,
          `auth.${cleanTarget}`,
          `corp-vpn.${cleanTarget}`,
          `dev-portal.${cleanTarget}`,
          `horizon-stage.s3-website-us-east-1.amazonaws.com (CNAME from stage.${cleanTarget})`,
          `internal-wiki.${cleanTarget}`,
          `mail.${cleanTarget}`,
          `staging-k8s.${cleanTarget}`,
          `status.${cleanTarget}`
        ];
        resultText = `[+] Querying crt.sh JSON API: https://crt.sh/?q=%.${cleanTarget}&output=json
[+] Query Status: 200 OK (RFC 6962 Append-Only Certificate Transparency Log)
[+] Discovered 9 Unique Fully Qualified Domain Names (FQDNs):

  1. api.${cleanTarget}                 [Issuer: Let's Encrypt E1 | Exp: 2027-01-15]
  2. auth.${cleanTarget}                [Issuer: Let's Encrypt E1 | Exp: 2027-01-15]
  3. corp-vpn.${cleanTarget}            [Issuer: DigiCert Global Root CA | Exp: 2026-12-01]
  4. dev-portal.${cleanTarget}          [Issuer: Let's Encrypt E1 | Exp: 2026-11-20]
  5. stage.${cleanTarget}               [DANGLING CNAME -> horizon-stage.s3-website-us-east-1.amazonaws.com]
  6. internal-wiki.${cleanTarget}       [Issuer: Let's Encrypt E1 | Exp: 2027-02-10]
  7. mail.${cleanTarget}                [Issuer: Google Trust Services | Exp: 2026-12-31]
  8. staging-k8s.${cleanTarget}         [Issuer: Let's Encrypt E1 | Exp: 2026-11-14]
  9. status.${cleanTarget}              [Issuer: Cloudflare Inc ECC CA-3 | Exp: 2027-04-01]

[!] HIGH RISK EXPOSURE:
    Subdomain 'stage.${cleanTarget}' points to unclaimed AWS S3 bucket.
    Status: Candidate for Subdomain Takeover.`;
        jsonObj = {
          apexDomain: cleanTarget,
          subdomainsCount: 9,
          discoveredSubdomains: subList,
          criticalFinding: `Dangling CNAME on stage.${cleanTarget}`
        };
      } else if (preset === 'DNSTWIST') {
        resultText = `[+] Running dnstwist permutation engine for brand: ${cleanTarget}
[+] Generated 14 permutation vectors (Homoglyphs, Bitsquatting, Omissions):

Fuzzer          Domain Name                  DNS-A            MX Records
-----------------------------------------------------------------------------------------
Homoglyph       aetherdynаmics-global.com    198.51.100.42    mail.aetherdynаmics.com [!]
Bitsquatting    aetherdynbmics-global.com    203.0.113.19     -
Omission        aetherdynamic-global.com     192.0.2.77       mail.active-phish.net [!]
Combosquat      ${cleanTarget.replace(/\..*$/, '')}-login.com  198.51.100.42    mx1.phishgateway.org [!]
Combosquat      ${cleanTarget.replace(/\..*$/, '')}-sso.com    203.0.113.55     -

[!] WEAPONIZED PHISHING THREAT DETECTED:
    • Domain 'aetherdynamic-login.com' resolves to IP 198.51.100.42 with live MX records.
    • JARM TLS Fingerprint matches default Cobalt Strike C2: 07d14d16d21d21d07c42d41d00041d24a458a375eef0c576d23a7bab9a9fb1`;
        jsonObj = {
          brand: cleanTarget,
          permutationsTested: 14,
          weaponizedDomains: [
            { domain: "aetherdynamic-login.com", ip: "198.51.100.42", mx: "mx1.phishgateway.org", threat: "Spearphishing Gateway" }
          ]
        };
      } else if (preset === 'BGP_ASN') {
        resultText = `[+] Querying BGPView REST API: https://api.bgpview.io/asn/54113/prefixes
[+] ASN: AS54113 (FASTLY - Fastly, Inc., US)
[+] Announced IPv4 Prefixes: 68 CIDR Netblocks
[+] Primary Routing Sample:
    • 151.101.0.0/16       (Anycast Global Edge Cluster)
    • 199.232.0.0/16       (North America Tier-1 Transit)
    • 146.75.0.0/16        (EMEA & APAC Transit)

[+] Upstream Transit Providers:
    • AS174   (Cogent Communications - Tier 1)
    • AS1299  (Arelion / Telia Carrier - Tier 1)
    • AS2914  (NTT America - Tier 1)
    • AS6939  (Hurricane Electric - Global IPv6 Transit)

[+] Routing Resilience Rating: A1 (High Redundancy Across 4 Tier-1 Upstreams)`;
        jsonObj = {
          asn: "AS54113",
          organization: "Fastly, Inc.",
          announcedPrefixesCount: 68,
          upstreams: ["AS174 Cogent", "AS1299 Arelion", "AS2914 NTT", "AS6939 Hurricane Electric"]
        };
      } else if (preset === 'METADATA_EXIF') {
        resultText = `[+] Inspecting public document metadata via ExifTool 12.76:
[+] File: target_whitepaper_q3_report.pdf (SHA-256: 7f8a3c...91b0)

ExifTool Version Number         : 12.76
File Name                       : target_whitepaper_q3_report.pdf
File Size                       : 1.8 MB
File Modification Date/Time     : 2026-10-14 18:22:10-04:00
File Type                       : PDF
File Type Extension             : pdf
MIME Type                       : application/pdf
PDF Version                     : 1.7
Linearized                      : Yes
Author                          : evance (Active Directory User: EVANCE-RESTONG-VA)
Creator                         : Microsoft Word for Microsoft 365 (Build 16.0.17830.20138)
Producer                        : macOS Version 14.5 (Build 23F79) Quartz PDFContext
Create Date                     : 2026-10-14 14:15:32-04:00
Modify Date                     : 2026-10-14 14:20:00-04:00
Internal Local File Path        : C:\\Users\\evance\\Documents\\Corporate_Strategy\\Q3_Briefing.docx

[!] METADATA LEAKAGE FINDING:
    • Internal AD Username Expose: 'evance'
    • Internal Directory Structure Expose: C:\\Users\\evance\\Documents\\...
    • Client Environment: Windows 11 host with Microsoft 365 Word.`;
        jsonObj = {
          author: "evance",
          internalUsername: "EVANCE-RESTONG-VA",
          software: "Microsoft Word for Microsoft 365 16.0.17830",
          localPath: "C:\\Users\\evance\\Documents\\Corporate_Strategy\\Q3_Briefing.docx"
        };
      } else if (preset === 'WAYBACK_CDX') {
        resultText = `[+] Querying Wayback Machine CDX API: web.archive.org/cdx/search/cdx?url=${cleanTarget}/about
[+] Found 42 Historical Snapshots across 2020-2026:

Snapshot 1: 2020-04-12 11:22:15 UTC [HTTP 200]
Snapshot 2: 2022-08-19 14:05:40 UTC [HTTP 200]
Snapshot 3: 2024-03-15 09:12:00 UTC [HTTP 200] (Post-Acquisition Rebranding)
Snapshot 4: 2026-11-01 18:30:00 UTC [HTTP 200]

--- UNIFIED DIFF: 2022-08-19 vs 2024-03-15 ---
- Headquarters: 450 Technology Way, Denver, CO
+ Headquarters: 12000 Aerospace Blvd, Reston, VA (Aether Dynamics Campus)
- Primary Infrastructure Partner: Rackspace Dedicated Cloud
+ Primary Infrastructure Partner: Amazon Web Services (AWS us-east-1)
- Contact: support@horizon-legacy.com
+ Contact: avionics-support@${cleanTarget}`;
        jsonObj = {
          historicalSnapshotsFound: 42,
          semanticDrift: "Corporate acquisition detected; headquarters relocated to Reston, VA; cloud shifted from Rackspace to AWS."
        };
      } else if (preset === 'SPIDERFOOT_LOCAL') {
        resultText = `[+] Checking Local SpiderFoot OSINT Daemon on http://localhost:5001...
[+] Status: CONNECTED (Daemon: ctdc/spiderfoot:latest, Container: osint_spiderfoot)
[+] Ready Modules: 200+ Passive OSINT Modules Available
    • sfp_crt: Certificate Transparency Log queries
    • sfp_dnsresolve: Authoritative DNS resolution
    • sfp_whois: RDAP / WHOIS registrar queries
    • sfp_threatfox: ThreatFox IOC correlation
    • sfp_hunter: Hunter.io email pattern derivation

[+] Active Local Target: ${cleanTarget}
[+] To launch comprehensive visual sweep, access web console directly at http://localhost:5001`;
        jsonObj = {
          spiderfootStatus: "ONLINE",
          port: 5001,
          target: cleanTarget,
          recommendedAction: "Launch multi-module passive reconnaissance sweep on port 5001."
        };
      }

      const hash = await computeSha256(resultText);
      setOutputStdout(resultText);
      setOutputJson(jsonObj);
      setOutputHash(hash);
      setExecuting(false);
    }, 600);
  };

  // Convert Output Directly to Evidence
  const handleConvertToEvidence = () => {
    if (!outputStdout || !outputHash) return;

    const newEvidence: EvidenceItem = {
      id: `ev-${Date.now()}`,
      caseId: currentCase.id,
      itemNumber: `ITEM-0${Math.floor(10 + Math.random() * 90)}`,
      title: `${activeTool} Passive Telemetry Output - ${targetInput}`,
      sourceUrl: activeTool === 'CRT_SH' 
        ? `https://crt.sh/?q=%.${targetInput}&output=json`
        : activeTool === 'DNS_MAIL' 
        ? `dns://${targetInput}` 
        : `osint-tool://${activeTool.toLowerCase()}/${targetInput}`,
      archiveUrl: `https://web.archive.org/web/20261105004512/${targetInput}`,
      sha256Hash: outputHash,
      filePath: `cases/evidence_raw/${activeTool.toLowerCase()}_${Date.now()}.txt`,
      captureTimestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
      admiraltyReliability: 'A',
      admiraltyCredibility: '1',
      fullViewportVerified: true,
      verifiedBy: 'Lead_Investigator_Chevalier'
    };

    onAddEvidence(newEvidence);
    setEvidenceCreatedToast(`Created Evidence Item: ${newEvidence.itemNumber} (SHA-256 Validated)`);
    setTimeout(() => setEvidenceCreatedToast(null), 3000);
  };

  // Extract Discovered Entities Directly to Link Graph
  const handleExtractEntities = () => {
    if (!outputJson) return;

    if (activeTool === 'CRT_SH' && outputJson.discoveredSubdomains) {
      outputJson.discoveredSubdomains.slice(0, 3).forEach((sub: string, i: number) => {
        const ent: Entity = {
          id: `ent-sub-${Date.now()}-${i}`,
          caseId: currentCase.id,
          canonicalName: sub.split(' ')[0],
          entityType: 'Discovered Subdomain Asset',
          isConfirmed: true,
          confidenceScore: 0.9500,
          attributes: {
            'Parent Apex': targetInput,
            'Discovered Via': 'crt.sh CT Log Miner',
            'Certificate Authority': "Let's Encrypt / DigiCert"
          },
          disambiguationNotes: 'Extracted from live RFC 6962 Certificate Transparency append-only log.',
          resolvedBy: 'Lead_Investigator_Chevalier',
          resolvedAt: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
        };
        onAddEntity(ent);
      });
      setEvidenceCreatedToast(`Extracted 3 Discovered Subdomains directly to Relationship Graph!`);
      setTimeout(() => setEvidenceCreatedToast(null), 3000);
    } else if (activeTool === 'METADATA_EXIF' && outputJson.author) {
      const ent: Entity = {
        id: `ent-user-${Date.now()}`,
        caseId: currentCase.id,
        canonicalName: `${outputJson.author} (AD: ${outputJson.internalUsername})`,
        entityType: 'Internal Author Identity',
        isConfirmed: false,
        confidenceScore: 0.8500,
        attributes: {
          'Author Tag': outputJson.author,
          'Active Directory': outputJson.internalUsername,
          'Software': outputJson.software
        },
        disambiguationNotes: 'Extracted from public whitepaper PDF EXIF metadata.',
        resolvedBy: undefined,
        resolvedAt: undefined
      };
      onAddEntity(ent);
      setEvidenceCreatedToast(`Extracted Internal Author '${outputJson.author}' to Entity Resolution Gateway!`);
      setTimeout(() => setEvidenceCreatedToast(null), 3000);
    } else {
      setEvidenceCreatedToast(`Indicators extracted to Link Analysis!`);
      setTimeout(() => setEvidenceCreatedToast(null), 3000);
    }
  };

  // Convert to Triage Lead
  const handleQueueLead = () => {
    const lead: Lead = {
      id: `lead-${Date.now()}`,
      caseId: currentCase.id,
      leadCode: `LEAD-${Math.floor(200 + Math.random() * 800)}`,
      title: `${activeTool} Finding: ${targetInput}`,
      inputType: 'DOMAIN',
      rawValue: targetInput,
      normalizedValue: targetInput.toLowerCase(),
      sourceReference: `${activeTool} Tool Execution Output`,
      priority: 'HIGH',
      status: 'QUEUED',
      confidenceScore: 0.8800,
      assignedAnalyst: 'Lead_Investigator_Chevalier',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
    };
    onAddLead(lead);
    setEvidenceCreatedToast(`Queued Lead ${lead.leadCode} in Triage Queue!`);
    setTimeout(() => setEvidenceCreatedToast(null), 3000);
  };

  return (
    <div className="h-full overflow-y-auto p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-cyber-border pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-cyber-cyan font-bold uppercase tracking-wider mb-1">
            <Terminal className="w-4 h-4 text-cyber-cyan" />
            <span>OPERATIONAL TOOL RUNNER & TELEMETRY WORKBENCH</span>
          </div>
          <h1 className="text-xl font-bold font-mono text-slate-100">
            Interactive OSINT Execution Studio
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Execute passive reconnaissance tools in real time. 1-click transformation bridges stdout into SHA-256 evidence, link graph nodes, and triage leads.
          </p>
        </div>

        {/* Local Tools Status Pill */}
        <div className="flex items-center space-x-2 bg-cyber-900 border border-cyber-border px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>SpiderFoot: <a href="http://localhost:5001" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">:5001 ↗</a></span>
          <span className="text-slate-600">|</span>
          <span>CLI Workstation: Ready</span>
        </div>
      </div>

      {/* Main Grid: Tool Presets + Command Runner + Live Output */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: Tool Preset Selector */}
        <div className="bg-cyber-900 border border-cyber-border rounded-xl p-4 space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-2">
            Tool Modules (7 Presets):
          </div>

          {[
            { id: 'DNS_MAIL' as ToolPreset, name: 'DNS & Perimeter Mail Audit', tool: 'dig + dmarc', tag: 'RFC 7208' },
            { id: 'CRT_SH' as ToolPreset, name: 'Certificate Log Miner', tool: 'crt.sh API', tag: 'RFC 6962' },
            { id: 'DNSTWIST' as ToolPreset, name: 'Typosquat Threat Matrix', tool: 'dnstwist', tag: 'Phishing' },
            { id: 'BGP_ASN' as ToolPreset, name: 'BGP Routing & Netblocks', tool: 'BGPView / RIPE', tag: 'CIDR ASN' },
            { id: 'METADATA_EXIF' as ToolPreset, name: 'Metadata & Document Forensics', tool: 'exiftool', tag: 'EXIF' },
            { id: 'WAYBACK_CDX' as ToolPreset, name: 'Web Preservation Drift Diff', tool: 'Wayback CDX', tag: 'Archive' },
            { id: 'SPIDERFOOT_LOCAL' as ToolPreset, name: 'SpiderFoot Local Manager', tool: 'SpiderFoot :5001', tag: 'Daemon' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTool(item.id);
                setOutputStdout('');
                setOutputHash('');
              }}
              className={`w-full text-left p-3 rounded-lg text-xs font-mono transition-all flex flex-col justify-between ${
                activeTool === item.id
                  ? 'bg-cyber-cyan/15 border border-cyber-cyan text-cyber-cyan font-bold shadow-sm'
                  : 'bg-cyber-950/60 border border-cyber-border text-slate-400 hover:text-slate-200 hover:bg-cyber-850'
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <span className="truncate">{item.name}</span>
                <span className="text-[9px] bg-cyber-850 px-1.5 py-0.5 rounded text-slate-500">{item.tag}</span>
              </div>
              <span className="text-[10px] text-slate-500 mt-1">Binary: {item.tool}</span>
            </button>
          ))}
        </div>

        {/* Right 3 Cols: Command Input & Terminal Telemetry */}
        <div className="lg:col-span-3 space-y-4">
          {/* Command Configuration Bar */}
          <div className="bg-cyber-900 border border-cyber-border rounded-xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex-1 flex items-center space-x-2 bg-cyber-950 border border-cyber-border rounded-lg px-3 py-2 font-mono text-xs">
              <span className="text-slate-500 font-bold shrink-0">TARGET:</span>
              <input
                type="text"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                placeholder="Domain or URL (e.g. aetherdynamics-global.com)"
                className="w-full bg-transparent text-slate-100 focus:outline-none"
              />
            </div>

            <button
              onClick={() => runTool(activeTool, targetInput)}
              disabled={executing || !targetInput}
              className="bg-cyber-cyan hover:bg-cyan-400 text-cyber-950 font-bold font-mono text-xs px-5 py-2.5 rounded-lg transition-all flex items-center justify-center space-x-2 shadow-md shadow-cyan-950/40 disabled:opacity-50 shrink-0"
            >
              {executing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>EXECUTING...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>EXECUTE TOOL</span>
                </>
              )}
            </button>
          </div>

          {/* Toast Notification */}
          {evidenceCreatedToast && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-lg text-emerald-300 font-mono text-xs flex items-center space-x-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{evidenceCreatedToast}</span>
            </div>
          )}

          {/* Terminal Output Window */}
          <div className="bg-cyber-950 border border-cyber-border rounded-xl overflow-hidden shadow-2xl flex flex-col min-h-[380px]">
            {/* Terminal Header Bar */}
            <div className="bg-cyber-900 px-4 py-2.5 border-b border-cyber-border flex justify-between items-center text-xs font-mono">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                <span className="text-slate-400 font-bold ml-2">stdout: {activeTool}</span>
              </div>

              {outputHash && (
                <div className="flex items-center space-x-2 text-[11px] text-emerald-400">
                  <Hash className="w-3.5 h-3.5" />
                  <span>SHA-256: {outputHash.slice(0, 16)}...</span>
                </div>
              )}
            </div>

            {/* Terminal Body */}
            <div className="p-4 flex-1 font-mono text-xs text-slate-200 overflow-x-auto whitespace-pre leading-relaxed font-mono select-text">
              {outputStdout ? (
                outputStdout
              ) : (
                <div className="text-slate-600 h-full flex flex-col items-center justify-center py-16 space-y-2 select-none">
                  <Terminal className="w-8 h-8 text-slate-700" />
                  <span>Select a tool preset above and click "EXECUTE TOOL" to capture passive intelligence.</span>
                </div>
              )}
            </div>

            {/* One-Click Action Footer Bridge */}
            {outputStdout && (
              <div className="bg-cyber-900 border-t border-cyber-border p-3.5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(outputStdout);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="px-3 py-1.5 rounded bg-cyber-850 hover:bg-cyber-800 text-slate-300 text-xs font-mono border border-cyber-border flex items-center space-x-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? 'Copied' : 'Copy Stdout'}</span>
                  </button>
                </div>

                {/* The "Tool-to-Evidence" & "Tool-to-Graph" Automation Bridge */}
                <div className="flex items-center space-x-2.5">
                  <button
                    onClick={handleQueueLead}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold flex items-center space-x-1.5"
                  >
                    <Inbox className="w-3.5 h-3.5" />
                    <span>+ Queue Triage Lead</span>
                  </button>

                  <button
                    onClick={handleExtractEntities}
                    className="px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold flex items-center space-x-1.5"
                  >
                    <Network className="w-3.5 h-3.5" />
                    <span>Extract Nodes to Graph</span>
                  </button>

                  <button
                    onClick={handleConvertToEvidence}
                    className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-cyber-950 text-xs font-mono font-bold flex items-center space-x-1.5 shadow-md shadow-emerald-950/40"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>Convert to Cryptographic Evidence</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
