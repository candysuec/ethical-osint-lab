import React, { useState, useEffect, useCallback } from 'react';
import { 
  Play, Terminal, CheckCircle2, Shield, AlertTriangle, 
  FileText, Copy, Check, RefreshCw, 
  Sparkles, FolderOpen, ArrowRight, ShieldCheck,
  Hash, Database, Download, Command, Radio
} from 'lucide-react';
import { Mission } from '../data/missionsData';
import { EvidenceItem } from '../types';
import { calculateSha256 } from '../utils/crypto';
import { executeLiveOSINTTool } from '../utils/toolRunner';

interface InvestigationConsoleViewProps {
  currentCase: Mission;
  onOpenCaseBrowser: () => void;
  onOpenReport: () => void;
  onSaveEvidence: (item: EvidenceItem) => void;
  isCaseCompleted: boolean;
  onNextCase: () => void;
}

export const InvestigationConsoleView: React.FC<InvestigationConsoleViewProps> = ({
  currentCase,
  onOpenCaseBrowser,
  onOpenReport,
  onSaveEvidence,
  isCaseCompleted,
  onNextCase
}) => {
  const [isRunningQuery, setIsRunningQuery] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);
  const [evidenceSaved, setEvidenceSaved] = useState(isCaseCompleted);
  const [calculatedHash, setCalculatedHash] = useState<string>('');
  
  // Live output state (can update from real container daemon)
  const activeStep = currentCase.steps[0];
  const [currentOutput, setCurrentOutput] = useState<string>(activeStep.output);
  const [isLiveTelemetry, setIsLiveTelemetry] = useState<boolean>(false);

  // Interactive Two-Source Corroboration State
  const [source1Verified, setSource1Verified] = useState<boolean>(true);
  const [source2Verified, setSource2Verified] = useState<boolean>(false);
  
  // Mobile / Tablet Tab State for Pillar Navigation (< 1024px)
  const [mobilePillarTab, setMobilePillarTab] = useState<'SCOPE' | 'TOOL' | 'PROOF'>('TOOL');

  // Dynamic Cryptographic Hashing calculation using Web Crypto API
  useEffect(() => {
    let isMounted = true;
    setCurrentOutput(activeStep.output);
    setIsLiveTelemetry(false);
    calculateSha256(activeStep.output).then((hash) => {
      if (isMounted) setCalculatedHash(hash);
    });
    setEvidenceSaved(isCaseCompleted);
    setSource2Verified(isCaseCompleted);
    return () => { isMounted = false; };
  }, [currentCase, activeStep.output, isCaseCompleted]);

  const handleRunQuery = useCallback(async () => {
    setIsRunningQuery(true);
    
    // Determine tool identifier for daemon
    const toolName = activeStep.tool.toLowerCase().includes('whois') ? 'whois' 
      : activeStep.tool.toLowerCase().includes('crt.sh') ? 'crtsh' 
      : 'dig';

    const { output: freshOutput, isLive } = await executeLiveOSINTTool(
      toolName,
      currentCase.target,
      'TXT',
      activeStep.output
    );

    setCurrentOutput(freshOutput);
    setIsLiveTelemetry(isLive);
    const freshHash = await calculateSha256(freshOutput);
    setCalculatedHash(freshHash);
    setIsRunningQuery(false);
    setSource1Verified(true);
  }, [activeStep.tool, activeStep.output, currentCase.target]);

  const handleCopyHash = () => {
    navigator.clipboard.writeText(calculatedHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleCommitEvidence = useCallback(() => {
    const newEvidence: EvidenceItem = {
      id: `ev-${Date.now()}`,
      caseId: currentCase.id,
      itemNumber: `PROOF-${currentCase.caseNumber}`,
      title: `${currentCase.title} - Verified Forensic Artifact`,
      sourceUrl: currentCase.target,
      sha256Hash: calculatedHash,
      filePath: `cases/evidence/${currentCase.id}_proof.txt`,
      captureTimestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
      admiraltyReliability: 'A',
      admiraltyCredibility: source2Verified ? '1' : '2',
      fullViewportVerified: true,
      verifiedBy: 'Lead_Investigator'
    };
    onSaveEvidence(newEvidence);
    setEvidenceSaved(true);
  }, [currentCase, calculatedHash, source2Verified, onSaveEvidence]);

  // Exportable Forensic Package Download (JSON Dossier + SHA256)
  const handleExportForensicPackage = () => {
    const forensicPackage = {
      manifest_standard: 'ISO/IEC 27037:2012',
      case_reference: currentCase.caseNumber,
      case_title: currentCase.title,
      target_entity: currentCase.target,
      capture_timestamp_utc: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
      investigator: 'Lead_Investigator_Chevalier',
      priority_intelligence_requirement: currentCase.oneSentenceObjective,
      command_executed: activeStep.command,
      stdout_telemetry: activeStep.output,
      cryptographic_sha256_checksum: calculatedHash,
      two_source_corroboration: {
        source_1: { name: 'Authoritative Root DNS Zone', verified: source1Verified },
        source_2: { name: 'RFC 7489 Secondary Registry', verified: source2Verified },
        status: source2Verified ? 'CORROBORATED_FACT' : 'UNVERIFIED_SINGLE_SOURCE'
      },
      admiralty_confidence_rating: source2Verified ? 'A1 (Completely Reliable / Confirmed)' : 'A2 (Reliable / Probably True)',
      defensive_remediation: activeStep.remediation || 'Audit and lock external perimeter'
    };

    const blob = new Blob([JSON.stringify(forensicPackage, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentCase.caseNumber}_FORENSIC_PACKAGE.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Global Keyboard Shortcuts (Ctrl+Enter = Run Query, Ctrl+S = Commit Evidence, Ctrl+K = Case Browser)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      if (isCmdOrCtrl && e.key === 'Enter') {
        e.preventDefault();
        handleRunQuery();
      } else if (isCmdOrCtrl && e.key === 's') {
        e.preventDefault();
        handleCommitEvidence();
      } else if (isCmdOrCtrl && e.key === 'k') {
        e.preventDefault();
        onOpenCaseBrowser();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRunQuery, handleCommitEvidence, onOpenCaseBrowser]);

  return (
    <div className="flex-1 flex flex-col h-full bg-cyber-950 text-slate-200 overflow-y-auto font-sans p-3 sm:p-6 space-y-4 sm:space-y-5">
      {/* Platform Orientation & Purpose Hero Banner */}
      <div 
        role="region" 
        aria-label="Case Overview Banner"
        className="bg-gradient-to-r from-cyber-900 via-cyber-850 to-cyber-900 border border-cyber-border rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 flex-wrap">
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-cyber-cyan font-bold">
                DEFENSIVE CYBER INTELLIGENCE WORKBENCH
              </span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="text-[11px] sm:text-xs font-mono text-emerald-400 font-semibold flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>NATO STANAG 2022 & CFAA Compliant</span>
              </span>
            </div>
            <h1 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight">
              Case Investigation Console: <span className="text-cyber-cyan">{currentCase.title}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed">
              Every investigation follows a strict 3-pillar cadence: <strong>1) Ethical Scope & PIRs</strong>, <strong>2) Passive Tool Execution</strong>, and <strong>3) Cryptographic Proof & Chain of Custody</strong>.
            </p>
          </div>

          {/* Quick Case Switcher Pill with Shortcut Hint */}
          <div className="shrink-0 flex items-center space-x-2">
            <button
              type="button"
              onClick={onOpenCaseBrowser}
              aria-label="Browse all 30 curriculum cases (Ctrl+K)"
              className="bg-cyber-800 hover:bg-cyber-750 border border-cyber-border hover:border-cyber-cyan text-white text-xs font-mono px-3.5 py-2 rounded-xl transition-all flex items-center space-x-2 shadow-sm focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:outline-none"
            >
              <FolderOpen className="w-4 h-4 text-cyan-400" />
              <span>Browse 30 Cases</span>
              <span className="bg-black/40 text-[10px] text-slate-400 px-1.5 py-0.5 rounded border border-cyber-border font-mono hidden sm:inline">
                Ctrl+K
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Segmented Tab Bar (Visible on < 1024px) */}
      <div className="lg:hidden flex bg-cyber-900 p-1 rounded-xl border border-cyber-border text-xs font-mono shrink-0">
        <button
          type="button"
          onClick={() => setMobilePillarTab('SCOPE')}
          className={`flex-1 py-2 text-center rounded-lg font-bold transition-all ${
            mobilePillarTab === 'SCOPE' 
              ? 'bg-cyber-cyan text-cyber-950 shadow-sm' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          1. Scope & PIRs
        </button>
        <button
          type="button"
          onClick={() => setMobilePillarTab('TOOL')}
          className={`flex-1 py-2 text-center rounded-lg font-bold transition-all ${
            mobilePillarTab === 'TOOL' 
              ? 'bg-cyber-cyan text-cyber-950 shadow-sm' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          2. Tool Query
        </button>
        <button
          type="button"
          onClick={() => setMobilePillarTab('PROOF')}
          className={`flex-1 py-2 text-center rounded-lg font-bold transition-all ${
            mobilePillarTab === 'PROOF' 
              ? 'bg-cyber-cyan text-cyber-950 shadow-sm' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          3. Chain of Custody
        </button>
      </div>

      {/* 3-Column Structured Investigation Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 flex-1">
        
        {/* ======================================================== */}
        {/* PILLAR 1: Case Scope & Priority Intelligence Requirements */}
        {/* ======================================================== */}
        <div className={`lg:col-span-3 flex-col space-y-4 ${mobilePillarTab === 'SCOPE' ? 'flex' : 'hidden lg:flex'}`}>
          <div className="bg-cyber-900 border border-cyber-border rounded-xl p-4 shadow-sm space-y-3.5">
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider border-b border-cyber-border/80 pb-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Pillar 1: Scope & PIRs</span>
            </div>

            <div>
              <span className="text-[11px] font-mono text-slate-400 block mb-1">
                Priority Intelligence Requirement (PIR):
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-semibold bg-cyber-950 p-2.5 rounded-lg border border-cyber-border">
                "{currentCase.oneSentenceObjective}"
              </p>
            </div>

            <div className="space-y-2 text-xs font-mono pt-1">
              <div>
                <span className="text-slate-500 block text-[11px]">Target Entity:</span>
                <span className="text-emerald-400 font-bold bg-cyber-950 px-2 py-1 rounded border border-cyber-border block mt-0.5 truncate">
                  {currentCase.target}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Curriculum Tier:</span>
                <span className="text-slate-300 font-semibold">{currentCase.tier} ({currentCase.caseNumber})</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Analytical Category:</span>
                <span className="text-slate-300 font-semibold">{currentCase.category}</span>
              </div>
            </div>
          </div>

          {/* Ethical Red Lines Card */}
          <div className="bg-cyber-900 border border-emerald-900/50 rounded-xl p-4 shadow-sm space-y-2">
            <div className="flex items-center space-x-1.5 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Ethical Red Lines</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed font-sans">
              <li className="flex items-start space-x-1.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>100% Passive DNS / Public Record queries.</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <span className="text-amber-400 font-bold">⚓</span>
                <span>Ground Truth Over Synthetic Coherence: Enforce 2-Source Rule; zero unverified AI claims.</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Zero active port scanning (`nmap`) or fuzzing.</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Zero profiling of living private individuals.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ======================================================== */}
        {/* PILLAR 2: Live Passive Tool Execution & Findings         */}
        {/* ======================================================== */}
        <div className={`lg:col-span-5 flex-col space-y-4 ${mobilePillarTab === 'TOOL' ? 'flex' : 'hidden lg:flex'}`}>
          <div className="bg-cyber-900 border border-cyber-border rounded-xl p-4 shadow-sm flex flex-col space-y-3 flex-1">
            <div className="flex items-center justify-between border-b border-cyber-border/80 pb-2">
              <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Pillar 2: Tool Execution</span>
              </div>
              <span className="text-xs font-mono text-slate-400">Utility: {activeStep.tool}</span>
            </div>

            {/* Command bar & Execute button */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="bg-cyber-950 border border-cyber-border px-3 py-2 rounded-lg text-xs font-mono text-slate-200 flex-1 truncate">
                  <span className="text-cyan-500 font-bold select-none">$ </span>
                  <span>{activeStep.command}</span>
                </div>

                <button
                  type="button"
                  onClick={handleRunQuery}
                  disabled={isRunningQuery}
                  aria-label="Execute investigation query (Ctrl+Enter)"
                  className="bg-cyber-cyan hover:bg-cyan-400 text-cyber-950 font-bold text-xs px-4 py-2 rounded-lg transition-all flex items-center space-x-1.5 shrink-0 shadow-md shadow-cyan-950/40 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:outline-none"
                  title="Execute query (Ctrl+Enter)"
                >
                  {isRunningQuery ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Querying...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Run Query</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Live Terminal Output Window with aria-live for accessibility */}
            <div 
              role="region"
              aria-label="Terminal standard output"
              aria-live="polite"
              aria-atomic="true"
              className="bg-black/95 border border-slate-800 rounded-lg p-3.5 font-mono text-xs text-slate-300 shadow-inner overflow-x-auto flex-1 min-h-[160px]"
            >
              <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-800/80 pb-1.5 mb-2.5 select-none">
                <span className="flex items-center space-x-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isLiveTelemetry ? 'bg-cyan-400 animate-pulse' : 'bg-emerald-400'}`}></span>
                  <span>{isLiveTelemetry ? 'LIVE DOCKER CLI STREAM (PORT :5002)' : 'STDOUT TELEMETRY'}</span>
                </span>
                <span className="text-slate-400 font-bold">{isLiveTelemetry ? 'CONTAINER: osint_cli_workstation' : 'ENCLAVE: PASSIVE TELEMETRY'}</span>
              </div>
              <pre className="whitespace-pre-wrap leading-relaxed text-[11px] font-mono">
                {currentOutput}
              </pre>

              {/* Glowing Line Callout */}
              <div className="mt-3 p-2.5 bg-amber-500/10 border-l-2 border-amber-400 rounded-r text-[11px] text-amber-200">
                <span className="font-bold">🔎 DETECTED FINDING: </span>
                <span className="font-mono bg-black/60 px-1 py-0.5 rounded text-amber-300 font-bold ml-1">
                  {activeStep.highlightLine}
                </span>
              </div>
            </div>

            {/* Plain English Decoder */}
            <div className="bg-cyber-950 border border-cyber-cyan/40 rounded-xl p-3.5 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-white">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{activeStep.decoderTitle}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {activeStep.decoderExplanation}
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* PILLAR 3: Chain of Custody & Evidence Documentation      */}
        {/* ======================================================== */}
        <div className={`lg:col-span-4 flex-col space-y-4 ${mobilePillarTab === 'PROOF' ? 'flex' : 'hidden lg:flex'}`}>
          <div className="bg-cyber-900 border border-cyber-border rounded-xl p-4 shadow-sm flex flex-col justify-between space-y-4 flex-1">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider border-b border-cyber-border/80 pb-2">
                <Database className="w-4 h-4 text-cyan-400" />
                <span>Pillar 3: Chain of Custody</span>
              </div>

              {/* Cryptographic SHA-256 Hash with Live Checksum */}
              <div className="bg-cyber-950 border border-cyber-border rounded-lg p-3 space-y-1.5 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span className="flex items-center space-x-1">
                    <Hash className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Dynamic SHA-256 Checksum:</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyHash}
                    aria-label="Copy SHA-256 checksum to clipboard"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-0.5 focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:outline-none rounded px-1"
                  >
                    {copiedHash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedHash ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-[10px] text-slate-300 break-all bg-black/40 p-1.5 rounded border border-cyber-border/40 select-all">
                  {calculatedHash || 'Calculating checksum...'}
                </div>
              </div>

              {/* NATO STANAG Rating with Dynamic Elevation */}
              <div className="bg-cyber-950 border border-cyber-border rounded-lg p-3 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">NATO STANAG 2022:</span>
                  <span className={`px-2 py-0.5 rounded font-bold border ${
                    source2Verified 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}>
                    Rating: {source2Verified ? 'A1 (Confirmed Fact)' : 'A2 (Uncorroborated Lead)'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 leading-snug">
                  Source Reliability: <strong>A (Completely Reliable)</strong><br />
                  Credibility: <strong>{source2Verified ? '1 (Two Independent Sources Corroborated)' : '2 (Single Source Only)'}</strong>
                </div>
              </div>

              {/* Interactive Two-Source Corroboration Gate */}
              <div className="bg-cyber-950 border border-cyber-border rounded-lg p-3 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 font-bold text-[11px]">Two-Source Rule Verification:</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                    source2Verified ? 'text-emerald-400 bg-emerald-950/80' : 'text-amber-400 bg-amber-950/80'
                  }`}>
                    {source2Verified ? '2/2 VERIFIED' : '1/2 REQUIRED'}
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between p-1.5 rounded bg-black/40 border border-cyber-border/40 text-emerald-400">
                    <div className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Source 1: Authoritative Root DNS Zone</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold">PRIMARY</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSource2Verified(!source2Verified)}
                    className={`w-full flex items-center justify-between p-1.5 rounded border transition-all text-left ${
                      source2Verified
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                        : 'bg-cyber-900 border-amber-500/40 text-amber-300 hover:border-amber-400'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5">
                      <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] font-bold ${
                        source2Verified ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'border-amber-400'
                      }`}>
                        {source2Verified ? '✓' : ''}
                      </div>
                      <span>Source 2: RFC 7489 Secondary Registry</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">
                      {source2Verified ? 'CORROBORATED' : 'CLICK TO VERIFY'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Remediation Note */}
              {activeStep.remediation && (
                <div className="bg-cyber-950 border border-emerald-900/40 rounded-lg p-3 space-y-1 text-xs">
                  <span className="text-emerald-400 font-bold block text-[11px] font-mono uppercase tracking-wider">
                    Remediation Handoff:
                  </span>
                  <p className="text-slate-300 text-xs leading-relaxed font-sans">
                    {activeStep.remediation}
                  </p>
                </div>
              )}
            </div>

            {/* Commit Evidence & Advance Actions */}
            <div className="pt-3 border-t border-cyber-border space-y-2">
              <button
                type="button"
                onClick={handleCommitEvidence}
                disabled={evidenceSaved}
                aria-label="Commit verified forensic evidence into vault (Ctrl+S)"
                className={`w-full py-2.5 px-4 rounded-lg font-mono text-xs font-bold transition-all flex items-center justify-center space-x-2 shadow-md focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:outline-none ${
                  evidenceSaved
                    ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-300 cursor-default'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                }`}
                title="Commit evidence (Ctrl+S)"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{evidenceSaved ? '✓ Logged into Sovereign Evidence Vault' : '💾 Commit Evidence to Vault'}</span>
              </button>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleExportForensicPackage}
                  aria-label="Export complete forensic evidence package JSON"
                  className="bg-cyber-850 hover:bg-cyber-800 border border-cyber-border text-slate-300 hover:text-white text-xs font-mono py-2 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1 focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:outline-none"
                  title="Export ISO/IEC 27037 Forensic Package JSON"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Dossier JSON</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenReport}
                  aria-label="View generated case report"
                  className="flex-1 bg-cyber-850 hover:bg-cyber-800 border border-cyber-border text-slate-300 hover:text-white text-xs font-mono py-2 rounded-lg transition-colors flex items-center justify-center space-x-1 focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:outline-none"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>View Report</span>
                </button>

                <button
                  type="button"
                  onClick={onNextCase}
                  aria-label="Advance to next curriculum case"
                  className="bg-cyber-850 hover:bg-cyber-800 border border-cyber-border text-cyan-400 text-xs font-mono px-3 py-2 rounded-lg transition-colors flex items-center space-x-1 shrink-0 focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:outline-none"
                  title="Advance to next case"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
