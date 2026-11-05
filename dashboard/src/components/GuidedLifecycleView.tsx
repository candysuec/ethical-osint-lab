import React, { useState } from 'react';
import { 
  Shield, CheckCircle2, ArrowRight, ArrowLeft, Terminal, 
  FileCheck, GitMerge, Network, FileText, AlertTriangle, 
  ExternalLink, Hash, Lock, Search, Sparkles, Sliders
} from 'lucide-react';
import { Case, Lead, Entity, EvidenceItem, TimelineEvent, IntelligenceReport, Source } from '../types';

interface GuidedLifecycleProps {
  currentCase: Case;
  activeStage: number;
  onSetStage: (stage: number) => void;
  leads: Lead[];
  entities: Entity[];
  evidence: EvidenceItem[];
  sources: Source[];
  timeline: TimelineEvent[];
  report: IntelligenceReport;
  onPromoteLead: (lead: Lead) => void;
  onConfirmEntity: (id: string, notes: string) => void;
  onOpenIntake: () => void;
  onSwitchToStudio: () => void;
}

export const GuidedLifecycleView: React.FC<GuidedLifecycleProps> = ({
  currentCase,
  activeStage,
  onSetStage,
  leads,
  entities,
  evidence,
  sources,
  timeline,
  report,
  onPromoteLead,
  onConfirmEntity,
  onOpenIntake,
  onSwitchToStudio
}) => {
  const [disambigNotes, setDisambigNotes] = useState<string>('');

  return (
    <div className="h-full overflow-y-auto p-4 sm:p-8 max-w-6xl mx-auto space-y-6">
      {/* Stage Header Hero */}
      <div className="bg-cyber-900 border border-cyber-border rounded-xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-cyber-cyan font-bold uppercase tracking-wider mb-1">
              <span>OSINT Operational Lifecycle</span>
              <span>•</span>
              <span>Stage {activeStage} of 6</span>
            </div>
            <h1 className="text-2xl font-bold font-mono text-slate-100">
              {activeStage === 1 && "Stage 1: Target Scoping & Rules of Engagement"}
              {activeStage === 2 && "Stage 2: Source Identification & Digital Ecosystem Mapping"}
              {activeStage === 3 && "Stage 3: Passive Collection & Cryptographic Preservation"}
              {activeStage === 4 && "Stage 4: Processing & Entity Resolution (Anti-Collisions)"}
              {activeStage === 5 && "Stage 5: Analysis, Link Graph & Timeline Correlation"}
              {activeStage === 6 && "Stage 6: Dissemination & Executive Board Briefing"}
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-1 max-w-3xl leading-relaxed">
              {activeStage === 1 && "Defines the specific parameters, operational boundaries, and rules of engagement. Establishes Priority Intelligence Requirements (PIRs) and CFAA compliance."}
              {activeStage === 2 && "Maps the digital ecosystem where target intelligence resides (DNS zones, IP blocks, BGP routing, SEC EDGAR, Git repos, and commercial registries)."}
              {activeStage === 3 && "Harvests passive telemetry into tamper-evident ISO/IEC 27037 evidence items with mandatory SHA-256 integrity checksums."}
              {activeStage === 4 && "Disambiguates homoglyphs and candidate collisions using 4-pillar verification. Auto-confirmation is permanently disabled."}
              {activeStage === 5 && "Applies NATO STANAG 2022 Admiralty Scoring, models entity link graphs across 7 property buckets, and orders chronological events."}
              {activeStage === 6 && "Compiles actionable executive briefings, C-suite BLUF summaries, master IOC ledgers, and production SIGMA detection rules."}
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            {activeStage > 1 && (
              <button
                onClick={() => onSetStage(activeStage - 1)}
                className="px-3.5 py-2 rounded-lg bg-cyber-850 hover:bg-cyber-800 text-slate-300 text-xs font-mono border border-cyber-border transition-colors flex items-center space-x-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Stage</span>
              </button>
            )}
            {activeStage < 6 ? (
              <button
                onClick={() => onSetStage(activeStage + 1)}
                className="px-4 py-2 rounded-lg bg-cyber-cyan hover:bg-cyan-400 text-cyber-950 font-bold text-xs font-mono transition-colors flex items-center space-x-1.5 shadow-md shadow-cyan-950/40"
              >
                <span>Proceed to Stage {activeStage + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onSwitchToStudio}
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-cyber-950 font-bold text-xs font-mono transition-colors flex items-center space-x-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Open Analyst Studio</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* STAGE 1: TARGET SCOPING CONTENT */}
      {activeStage === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-cyber-900 border border-cyber-border rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-bold font-mono text-slate-100 flex items-center space-x-2">
              <Shield className="w-4 h-4 text-cyber-cyan" />
              <span>ENGAGEMENT PARAMETERS & PIR MATRIX</span>
            </h2>

            <div className="space-y-3 text-xs font-mono">
              <div className="bg-cyber-950 p-3 rounded-lg border border-cyber-border">
                <span className="text-slate-500 block text-[10px] uppercase">Primary Target Entity:</span>
                <span className="text-slate-100 font-bold text-sm">{currentCase.targetEntity}</span>
                <span className="text-slate-400 block text-[11px] mt-0.5">Target Modality: {currentCase.targetType}</span>
              </div>

              <div className="bg-cyber-950 p-3 rounded-lg border border-cyber-border">
                <span className="text-slate-500 block text-[10px] uppercase mb-1">Active Priority Intelligence Requirements (PIRs):</span>
                <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                  {currentCase.pirs.map((pir, i) => (
                    <li key={i} className="text-[11px]">{pir}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-cyber-900 border border-cyber-border rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-bold font-mono text-slate-100 flex items-center space-x-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>LEGAL BOUNDARIES & OPERATIONAL COMPLIANCE</span>
            </h2>

            <div className="space-y-3 text-xs font-mono">
              <div className="bg-cyber-950 p-3 rounded-lg border border-cyber-border space-y-2">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>CFAA 18 U.S.C. § 1030 DEFENSIVE OSINT SAFE HARBOR</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {currentCase.legalNotes}
                </p>
              </div>

              <div className="bg-rose-950/20 border border-rose-500/30 p-3 rounded-lg text-rose-300 text-[11px] space-y-1">
                <span className="font-bold flex items-center space-x-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>The Bright Red Line (Constitutional Invariant):</span>
                </span>
                <p>Never investigate private citizens, neighbors, or non-public personnel. Never perform port scanning (`nmap`), vulnerability fuzzing, or unauthorized authentication.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 2: SOURCE IDENTIFICATION & INTAKE CONTENT */}
      {activeStage === 2 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-cyber-900 border border-cyber-border p-4 rounded-xl">
            <div>
              <span className="text-xs font-mono text-cyber-cyan font-bold block">
                INGESTION DESK (17 INPUT MODALITIES SUPPORTED)
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Ingest new technical indicators into the active investigation queue.
              </span>
            </div>
            <button
              onClick={onOpenIntake}
              className="px-4 py-2 bg-cyber-cyan text-cyber-950 font-bold font-mono text-xs rounded-lg hover:bg-cyan-400 transition-colors flex items-center space-x-2 shadow-md"
            >
              <Terminal className="w-4 h-4" />
              <span>+ Launch Ingestion Engine</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Active Telemetry Leads */}
            <div className="bg-cyber-900 border border-cyber-border rounded-xl p-5 space-y-3">
              <div className="flex justify-between items-center border-b border-cyber-border pb-2">
                <span className="text-xs font-mono font-bold text-slate-100">
                  ACTIVE INTAKE LEADS ({leads.length})
                </span>
                <span className="text-[10px] font-mono text-amber-400">REQUIRES HUMAN TRIAGE</span>
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {leads.map((lead) => (
                  <div key={lead.id} className="p-3 bg-cyber-950 rounded-lg border border-cyber-border flex items-center justify-between text-xs font-mono">
                    <div className="space-y-0.5 truncate pr-2">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-cyber-cyan font-bold">{lead.leadCode}</span>
                        <span className="text-slate-200 truncate">{lead.normalizedValue}</span>
                      </div>
                      <div className="text-[10px] text-slate-500">Conduit: {lead.sourceReference}</div>
                    </div>

                    {lead.status === 'QUEUED' ? (
                      <button
                        onClick={() => onPromoteLead(lead)}
                        className="px-2 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded text-[10px] hover:bg-emerald-500/30 shrink-0 font-bold"
                      >
                        PROMOTE
                      </button>
                    ) : (
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded shrink-0">
                        PROMOTED
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Vetted Passive Sources */}
            <div className="bg-cyber-900 border border-cyber-border rounded-xl p-5 space-y-3">
              <div className="flex justify-between items-center border-b border-cyber-border pb-2">
                <span className="text-xs font-mono font-bold text-slate-100">
                  VETTED PUBLIC REPOSITORIES & CONDUITS
                </span>
                <span className="text-[10px] font-mono text-emerald-400">100% PASSIVE</span>
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {sources.map((src) => (
                  <div key={src.id} className="p-3 bg-cyber-950 rounded-lg border border-cyber-border flex items-center justify-between text-xs font-mono">
                    <div>
                      <div className="text-slate-200 font-semibold">{src.name}</div>
                      <div className="text-[10px] text-slate-500">{src.baseUrl}</div>
                    </div>
                    <span className="text-xs font-mono font-bold bg-cyber-850 text-cyan-400 border border-cyber-border px-2 py-0.5 rounded">
                      {src.baselineReliability}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 3: PASSIVE COLLECTION & EVIDENCE VAULT */}
      {activeStage === 3 && (
        <div className="space-y-6">
          <div className="bg-cyber-900 border border-cyber-border rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-cyber-border pb-3">
              <div className="flex items-center space-x-2">
                <FileCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold font-mono text-slate-100">
                  EVIDENCE VAULT & SHA-256 CHAIN OF CUSTODY (ISO/IEC 27037)
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400">Total Artifacts: {evidence.length}</span>
            </div>

            <div className="space-y-3">
              {evidence.map((item) => (
                <div key={item.id} className="p-4 bg-cyber-950 rounded-lg border border-cyber-border space-y-2 text-xs font-mono">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-cyber-cyan font-bold mr-2">{item.itemNumber}</span>
                      <span className="text-slate-100 font-semibold">{item.title}</span>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded font-bold">
                      {item.admiraltyReliability}{item.admiraltyCredibility}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1">
                    <div>Source: <a href={item.sourceUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">{item.sourceUrl.slice(0, 45)}...</a></div>
                    {item.archiveUrl && (
                      <div>Wayback Mirror: <a href={item.archiveUrl} target="_blank" rel="noreferrer" className="text-purple-400 hover:underline">Persistent Snapshot ↗</a></div>
                    )}
                  </div>

                  <div className="bg-cyber-900 p-2 rounded border border-cyber-border text-[11px] font-mono text-slate-300 break-all select-all flex items-center justify-between">
                    <span>SHA-256: {item.sha256Hash}</span>
                    <span className="text-emerald-400 text-[10px] shrink-0 ml-2">✓ CRYPTO-LOCKED</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STAGE 4: PROCESSING & ENTITY RESOLUTION */}
      {activeStage === 4 && (
        <div className="space-y-6">
          <div className="bg-cyber-900 border border-cyber-border rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-cyber-border pb-3">
              <div className="flex items-center space-x-2">
                <GitMerge className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-bold font-mono text-slate-100">
                  HUMAN ENTITY DISAMBIGUATION GATEWAY (ANTI-COLLISION ENGINE)
                </span>
              </div>
              <span className="text-xs font-mono text-amber-400">AUTOMATED MERGES BARRED</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {entities.map((ent) => (
                <div key={ent.id} className="p-4 bg-cyber-950 rounded-lg border border-cyber-border space-y-3 text-xs font-mono">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-slate-100 font-bold block">{ent.canonicalName}</span>
                      <span className="text-slate-400 text-[11px]">{ent.entityType}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      ent.isConfirmed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    }`}>
                      {ent.isConfirmed ? 'CONFIRMED' : 'AWAITING VERIFICATION'}
                    </span>
                  </div>

                  <div className="bg-cyber-900 p-2.5 rounded border border-cyber-border space-y-1 text-[11px]">
                    <span className="text-slate-500 uppercase tracking-wider block text-[9px]">Verified Anchors:</span>
                    {Object.entries(ent.attributes).map(([k, v]) => (
                      <div key={k} className="flex justify-between">
                        <span className="text-slate-400">{k}:</span>
                        <span className="text-slate-200">{v}</span>
                      </div>
                    ))}
                  </div>

                  {!ent.isConfirmed && (
                    <button
                      onClick={() => onConfirmEntity(ent.id, 'Verified via primary SEC regulatory filing and DNS zone.')}
                      className="w-full py-1.5 bg-emerald-500 text-cyber-950 font-bold text-xs rounded hover:bg-emerald-400 transition-colors"
                    >
                      Confirm Entity Attribution
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STAGE 5: ANALYSIS, LINK GRAPH & TIMELINE */}
      {activeStage === 5 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quick Link Graph Summary */}
            <div className="bg-cyber-900 border border-cyber-border rounded-xl p-5 space-y-4">
              <div className="flex justify-between items-center border-b border-cyber-border pb-2">
                <span className="text-xs font-mono font-bold text-slate-100 flex items-center space-x-1.5">
                  <Network className="w-4 h-4 text-cyber-cyan" />
                  <span>RELATIONSHIP CLUSTERING (7 PROPERTY BUCKETS)</span>
                </span>
                <button 
                  onClick={onSwitchToStudio}
                  className="text-[11px] font-mono text-cyber-cyan hover:underline"
                >
                  Open Full Canvas ↗
                </button>
              </div>

              <div className="p-4 bg-cyber-950 rounded-lg border border-cyber-border space-y-2 text-xs font-mono">
                <div className="text-slate-300">
                  • <strong>Organizations Bucket:</strong> Aether Dynamics controls Horizon Avionics (Exhibit 21).
                </div>
                <div className="text-slate-300">
                  • <strong>Digital Presence Bucket:</strong> horizon-avionics.tech routes to dangling S3 bucket.
                </div>
                <div className="text-slate-300">
                  • <strong>Identity Bucket:</strong> Dr. Evelyn Vance verified CTO via DEF 14A.
                </div>
              </div>
            </div>

            {/* Quick Chronological Timeline */}
            <div className="bg-cyber-900 border border-cyber-border rounded-xl p-5 space-y-4">
              <div className="flex justify-between items-center border-b border-cyber-border pb-2">
                <span className="text-xs font-mono font-bold text-slate-100 flex items-center space-x-1.5">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  <span>TEMPORAL DRIFT & EVENT CHRONOLOGY</span>
                </span>
                <span className="text-[11px] font-mono text-slate-500">{timeline.length} Events</span>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {timeline.map((t) => (
                  <div key={t.id} className="p-2.5 bg-cyber-950 rounded border border-cyber-border text-xs font-mono flex justify-between items-start">
                    <div>
                      <span className="text-[10px] text-slate-500 block">{t.eventTimestamp}</span>
                      <span className="text-slate-200 font-semibold">{t.title}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded">
                      {t.confidenceScore}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 6: DISSEMINATION & EXECUTIVE BRIEF */}
      {activeStage === 6 && (
        <div className="space-y-6">
          <div className="bg-cyber-900 border border-cyber-border rounded-xl p-6 space-y-5">
            <div className="flex justify-between items-center border-b border-cyber-border pb-3">
              <div>
                <span className="text-xs font-mono text-cyber-cyan font-bold block">{report.reportNumber}</span>
                <h2 className="text-base font-bold font-mono text-slate-100">{report.title}</h2>
              </div>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded font-mono text-xs font-bold">
                {report.classification}
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold block">
                Executive Bottom-Line Up Front (BLUF):
              </span>
              <p className="p-4 bg-cyber-950 rounded-lg border border-cyber-border text-xs font-mono text-slate-200 leading-relaxed">
                {report.executiveSummary}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-cyber-950 p-4 rounded-lg border border-cyber-border space-y-1">
                <span className="text-emerald-400 font-bold block uppercase text-[10px]">Confidence Assessment:</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">{report.confidenceAssessment}</p>
              </div>
              <div className="bg-cyber-950 p-4 rounded-lg border border-cyber-border space-y-1">
                <span className="text-amber-400 font-bold block uppercase text-[10px]">Identified Gaps:</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">{report.informationGaps}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-cyber-border flex justify-between items-center">
              <span className="text-[11px] font-mono text-slate-500">
                Certified: NATO STANAG 2022 // CFAA Defensive Invariant Preserved
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(report.executiveSummary);
                  alert("Copied Executive BLUF to clipboard!");
                }}
                className="px-4 py-2 bg-cyber-cyan text-cyber-950 font-bold font-mono text-xs rounded-lg hover:bg-cyan-400 transition-colors"
              >
                Copy Executive BLUF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
