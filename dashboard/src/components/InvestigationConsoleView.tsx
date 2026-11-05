import React, { useState } from 'react';
import { 
  Play, Terminal, CheckCircle2, Shield, AlertTriangle, 
  FileText, Copy, Check, ExternalLink, RefreshCw, 
  Sparkles, FolderOpen, ArrowRight, ShieldCheck,
  Hash, Database, Info, ExternalLink as LinkIcon
} from 'lucide-react';
import { Mission } from '../data/missionsData';
import { EvidenceItem } from '../types';

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

  const activeStep = currentCase.steps[0];
  const sha256 = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

  const handleRunQuery = () => {
    setIsRunningQuery(true);
    setTimeout(() => {
      setIsRunningQuery(false);
    }, 400);
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(sha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleCommitEvidence = () => {
    const newEvidence: EvidenceItem = {
      id: `ev-${Date.now()}`,
      caseId: currentCase.id,
      itemNumber: `PROOF-${currentCase.caseNumber}`,
      title: `${currentCase.title} - Verified Forensic Artifact`,
      sourceUrl: currentCase.target,
      sha256Hash: sha256,
      filePath: `cases/evidence/${currentCase.id}_proof.txt`,
      captureTimestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
      admiraltyReliability: 'A',
      admiraltyCredibility: '1',
      fullViewportVerified: true,
      verifiedBy: 'Lead_Investigator'
    };
    onSaveEvidence(newEvidence);
    setEvidenceSaved(true);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-cyber-950 text-slate-200 overflow-y-auto font-sans p-6 space-y-5">
      {/* Platform Orientation & Purpose Hero Banner */}
      <div className="bg-gradient-to-r from-cyber-900 via-cyber-850 to-cyber-900 border border-cyber-border rounded-2xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyber-cyan font-bold">
                DEFENSIVE CYBER INTELLIGENCE WORKBENCH
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>NATO STANAG 2022 & CFAA Compliant</span>
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
              Case Investigation Console: <span className="text-cyber-cyan">{currentCase.title}</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-4xl leading-relaxed">
              This workbench trains analysts in defensible, audit-ready digital footprint investigations. Every investigation follows a strict 3-pillar cadence: <strong>1) Ethical Scope & PIRs</strong>, <strong>2) Passive Tool Execution</strong>, and <strong>3) Cryptographic Proof & Chain of Custody</strong>.
            </p>
          </div>

          {/* Quick Case Switcher Pill */}
          <div className="shrink-0 flex items-center space-x-2">
            <button
              onClick={onOpenCaseBrowser}
              className="bg-cyber-800 hover:bg-cyber-750 border border-cyber-border hover:border-cyber-cyan text-white text-xs font-mono px-3.5 py-2 rounded-xl transition-all flex items-center space-x-2 shadow-sm"
            >
              <FolderOpen className="w-4 h-4 text-cyan-400" />
              <span>Browse All 30 Cases</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3-Column Structured Investigation Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1">
        
        {/* ======================================================== */}
        {/* PILLAR 1: Case Scope & Priority Intelligence Requirements */}
        {/* ======================================================== */}
        <div className="lg:col-span-3 flex flex-col space-y-4">
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
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="bg-cyber-900 border border-cyber-border rounded-xl p-4 shadow-sm flex flex-col space-y-3 flex-1">
            <div className="flex items-center justify-between border-b border-cyber-border/80 pb-2">
              <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Pillar 2: Tool Execution</span>
              </div>
              <span className="text-xs font-mono text-slate-400">Utility: {activeStep.tool}</span>
            </div>

            {/* Command bar & Execute button */}
            <div className="flex items-center space-x-2">
              <div className="bg-cyber-950 border border-cyber-border px-3 py-2 rounded-lg text-xs font-mono text-slate-200 flex-1 truncate">
                <span className="text-cyan-500 font-bold select-none">$ </span>
                <span>{activeStep.command}</span>
              </div>

              <button
                onClick={handleRunQuery}
                disabled={isRunningQuery}
                className="bg-cyber-cyan hover:bg-cyan-400 text-cyber-950 font-bold text-xs px-4 py-2 rounded-lg transition-all flex items-center space-x-1.5 shrink-0 shadow-md shadow-cyan-950/40 disabled:opacity-50"
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

            {/* Live Terminal Output Window */}
            <div className="bg-black/95 border border-slate-800 rounded-lg p-3.5 font-mono text-xs text-slate-300 shadow-inner overflow-x-auto flex-1 min-h-[160px]">
              <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-800/80 pb-1.5 mb-2.5 select-none">
                <span>STDOUT OUTPUT</span>
                <span>ENCLAVE: PASSIVE TELEMETRY</span>
              </div>
              <pre className="whitespace-pre-wrap leading-relaxed text-[11px] font-mono">
                {activeStep.output}
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
        <div className="lg:col-span-4 flex flex-col space-y-4">
          <div className="bg-cyber-900 border border-cyber-border rounded-xl p-4 shadow-sm flex flex-col justify-between space-y-4 flex-1">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider border-b border-cyber-border/80 pb-2">
                <Database className="w-4 h-4 text-cyan-400" />
                <span>Pillar 3: Chain of Custody</span>
              </div>

              {/* Cryptographic SHA-256 Hash */}
              <div className="bg-cyber-950 border border-cyber-border rounded-lg p-3 space-y-1.5 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span className="flex items-center space-x-1">
                    <Hash className="w-3.5 h-3.5 text-cyan-400" />
                    <span>SHA-256 Checksum:</span>
                  </span>
                  <button
                    onClick={handleCopyHash}
                    className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-0.5"
                  >
                    {copiedHash ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedHash ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-[10px] text-slate-300 break-all bg-black/40 p-1.5 rounded border border-cyber-border/40 select-all">
                  {sha256}
                </div>
              </div>

              {/* NATO STANAG Rating */}
              <div className="bg-cyber-950 border border-cyber-border rounded-lg p-3 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">NATO STANAG 2022:</span>
                  <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded font-bold">
                    Rating: {activeStep.admiraltyScore}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 leading-snug">
                  Source Reliability: <strong>A (Completely Reliable)</strong><br />
                  Information Credibility: <strong>1 (Confirmed by Authoritative Zone)</strong>
                </div>
              </div>

              {/* Two-Source Corroboration */}
              <div className="bg-cyber-950 border border-cyber-border rounded-lg p-3 space-y-1.5 text-xs font-mono">
                <span className="text-slate-400 text-[11px] block">Two-Source Corroboration:</span>
                <div className="space-y-1 text-[11px]">
                  <div className="flex items-center space-x-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Primary: Authoritative Root DNS Zone</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Secondary: RFC 7489 Public DMARC Registry</span>
                  </div>
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
                onClick={handleCommitEvidence}
                disabled={evidenceSaved}
                className={`w-full py-2.5 px-4 rounded-lg font-mono text-xs font-bold transition-all flex items-center justify-center space-x-2 shadow-md ${
                  evidenceSaved
                    ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-300 cursor-default'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{evidenceSaved ? '✓ Logged into Sovereign Evidence Vault' : '💾 Commit Evidence to Vault'}</span>
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={onOpenReport}
                  className="flex-1 bg-cyber-850 hover:bg-cyber-800 border border-cyber-border text-slate-300 text-xs font-mono py-2 rounded-lg transition-colors flex items-center justify-center space-x-1"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>View Full Report</span>
                </button>

                <button
                  onClick={onNextCase}
                  className="bg-cyber-850 hover:bg-cyber-800 border border-cyber-border text-cyan-400 text-xs font-mono px-3.5 py-2 rounded-lg transition-colors flex items-center space-x-1 shrink-0"
                  title="Advance to next case"
                >
                  <span>Next Case</span>
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
