import React, { useState } from 'react';
import { 
  Shield, CheckCircle2, Play, Terminal, AlertTriangle, 
  FileText, Copy, Check, Download, ArrowRight, Printer, 
  Award, Sparkles, RefreshCw, ChevronRight, Lock
} from 'lucide-react';
import { capstoneData, CapstonePhase } from '../data/capstoneData';
import { calculateSha256 } from '../utils/crypto';

interface CapstoneInvestigationViewProps {
  onOpenReport: () => void;
}

export const CapstoneInvestigationView: React.FC<CapstoneInvestigationViewProps> = ({ onOpenReport }) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const [activeTaskIndex, setActiveTaskIndex] = useState<number>(0);
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>(['task-1-1']);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [taskHashes, setTaskHashes] = useState<Record<string, string>>({});

  const currentPhase = capstoneData.phases[activePhaseIndex];
  const currentTask = currentPhase.tasks[activeTaskIndex] || currentPhase.tasks[0];

  const totalTasks = capstoneData.phases.reduce((acc, p) => acc + p.tasks.length, 0);
  const totalCompleted = completedTaskIds.length;
  const progressPercent = Math.round((totalCompleted / totalTasks) * 100);

  const handleRunTaskQuery = async () => {
    setIsExecuting(true);
    setTimeout(async () => {
      const hash = await calculateSha256(currentTask.output);
      setTaskHashes(prev => ({ ...prev, [currentTask.id]: hash }));
      if (!completedTaskIds.includes(currentTask.id)) {
        setCompletedTaskIds(prev => [...prev, currentTask.id]);
      }
      setIsExecuting(false);
    }, 400);
  };

  const handleDownloadCapstoneDossier = () => {
    const dossier = {
      scenario: capstoneData.scenario,
      target_entity: capstoneData.target,
      primary_domain: capstoneData.domain,
      board_mandate: capstoneData.mandate,
      completed_at_utc: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
      lead_cti_investigator: 'Lead_Investigator_Chevalier',
      mastery_tier: 'TIER 4: PRINCIPAL STRATEGIST (NIST NICE SP-ARC-001 COMPLIANT)',
      completed_phases: capstoneData.phases.map(p => ({
        phase_id: p.id,
        phase_title: p.title,
        tasks: p.tasks.map(t => ({
          task_id: t.id,
          title: t.title,
          tool: t.tool,
          command: t.command,
          finding: t.finding,
          impact: t.impact,
          remediation: t.remediation,
          sha256_checksum: taskHashes[t.id] || '7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b'
        }))
      }))
    };

    const blob = new Blob([JSON.stringify(dossier, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `OPERATION_HORIZON_SHIELD_CAPSTONE_DOSSIER.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-cyber-950 text-slate-200 overflow-y-auto font-sans p-4 sm:p-6 space-y-5">
      {/* Capstone Executive Scenario Header */}
      <div className="bg-gradient-to-r from-cyber-900 via-cyber-850 to-cyber-900 border border-cyber-border rounded-2xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
                TIER 4 CAPSTONE INVESTIGATION
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono text-cyan-400 font-semibold">
                NIST SP 800-115 / MITRE ATT&CK Standard
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Operation Horizon Shield: <span className="text-cyber-cyan">{capstoneData.target}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed">
              {capstoneData.mandate}
            </p>
          </div>

          {/* Progress & Portfolio Certificate Trigger */}
          <div className="shrink-0 flex items-center space-x-3">
            <div className="text-right hidden sm:block font-mono">
              <div className="text-xs text-slate-400">Audit Completion</div>
              <div className="text-sm font-bold text-emerald-400">{totalCompleted} / {totalTasks} Tasks ({progressPercent}%)</div>
            </div>

            <button
              type="button"
              onClick={() => setShowCertificate(true)}
              className="bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 text-xs font-mono px-3.5 py-2 rounded-xl transition-all flex items-center space-x-2 shadow-sm"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Portfolio Certificate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Phase Navigation Tabs */}
      <div className="flex bg-cyber-900 p-1.5 rounded-xl border border-cyber-border overflow-x-auto text-xs font-mono gap-1 shrink-0">
        {capstoneData.phases.map((phase, idx) => {
          const isActive = idx === activePhaseIndex;
          const isPhaseDone = phase.tasks.every(t => completedTaskIds.includes(t.id));

          return (
            <button
              key={phase.id}
              type="button"
              onClick={() => {
                setActivePhaseIndex(idx);
                setActiveTaskIndex(0);
              }}
              className={`px-3 py-2 rounded-lg font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
                isActive 
                  ? 'bg-cyber-cyan text-cyber-950 shadow-sm' 
                  : isPhaseDone 
                  ? 'bg-emerald-950/40 text-emerald-300 hover:bg-cyber-850' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                isActive ? 'bg-cyber-950 text-cyber-cyan' : isPhaseDone ? 'bg-emerald-500 text-slate-950' : 'bg-cyber-800 text-slate-400'
              }`}>
                {isPhaseDone ? '✓' : phase.id}
              </span>
              <span>{phase.title.split(':')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Main Capstone Split Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1">
        
        {/* Left Column: Tasks in this Phase (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col space-y-3">
          <div className="bg-cyber-900 border border-cyber-border rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-cyber-border pb-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                {currentPhase.title}
              </span>
            </div>

            <p className="text-xs text-slate-300 font-mono leading-relaxed bg-cyber-950 p-2.5 rounded-lg border border-cyber-border">
              {currentPhase.pir}
            </p>

            {/* Task List */}
            <div className="space-y-2 pt-1">
              {currentPhase.tasks.map((task, idx) => {
                const isSelected = idx === activeTaskIndex;
                const isDone = completedTaskIds.includes(task.id);

                return (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => setActiveTaskIndex(idx)}
                    className={`w-full text-left p-3 rounded-lg border transition-all flex items-start space-x-2.5 ${
                      isSelected 
                        ? 'bg-cyber-850 border-cyber-cyan shadow-md text-white' 
                        : 'bg-cyber-950/70 border-cyber-border text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-600 text-[10px] font-mono flex items-center justify-center text-slate-500">
                          {idx + 1}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold leading-snug">{task.title}</div>
                      <div className="flex items-center space-x-2 mt-1 text-[10px] font-mono">
                        <span className="text-slate-400">{task.tool}</span>
                        <span className={`px-1.5 py-0.2 rounded font-bold ${
                          task.impact === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300' :
                          task.impact === 'HIGH' ? 'bg-amber-500/20 text-amber-300' : 'bg-cyan-500/20 text-cyan-300'
                        }`}>
                          {task.impact}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Active Task Execution & Evidence (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          <div className="bg-cyber-900 border border-cyber-border rounded-xl p-4 sm:p-5 shadow-sm space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-cyber-border pb-2">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">Active Task Audit</span>
                  <h2 className="text-base font-bold text-white leading-tight">{currentTask.title}</h2>
                </div>
                <span className="text-xs font-mono text-slate-400">Utility: {currentTask.tool}</span>
              </div>

              {/* Command bar & Run button */}
              <div className="flex items-center space-x-2">
                <div className="bg-cyber-950 border border-cyber-border px-3 py-2 rounded-lg text-xs font-mono text-slate-200 flex-1 truncate">
                  <span className="text-cyan-500 font-bold select-none">$ </span>
                  <span>{currentTask.command}</span>
                </div>

                <button
                  type="button"
                  onClick={handleRunTaskQuery}
                  disabled={isExecuting}
                  className="bg-cyber-cyan hover:bg-cyan-400 text-cyber-950 font-bold text-xs px-4 py-2 rounded-lg transition-all flex items-center space-x-1.5 shrink-0 shadow-md shadow-cyan-950/40 disabled:opacity-50"
                >
                  {isExecuting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Auditing...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Audit Telemetry</span>
                    </>
                  )}
                </button>
              </div>

              {/* Monospace Output Window */}
              <div className="bg-black/95 border border-slate-800 rounded-lg p-3.5 font-mono text-xs text-slate-300 shadow-inner overflow-x-auto min-h-[140px]">
                <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-800/80 pb-1.5 mb-2 select-none">
                  <span>CAPSTONE ENCLAVE OUTPUT</span>
                  <span>NATO CONFIDENCE: {currentTask.admiralty}</span>
                </div>
                <pre className="whitespace-pre-wrap leading-relaxed text-[11px] font-mono">
                  {currentTask.output}
                </pre>

                <div className="mt-2.5 p-2 bg-amber-500/10 border-l-2 border-amber-400 rounded-r text-[11px] text-amber-200">
                  <span className="font-bold">🔎 ARTIFACT: </span>
                  <span className="font-mono bg-black/60 px-1 py-0.5 rounded text-amber-300 ml-1">
                    {currentTask.highlight}
                  </span>
                </div>
              </div>

              {/* CTI Finding & C-Suite Business Impact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                <div className="bg-cyber-950 p-3 rounded-lg border border-cyber-border space-y-1">
                  <span className="text-xs font-mono font-bold text-rose-400 uppercase block">Discovered Vulnerability</span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{currentTask.finding}</p>
                </div>
                <div className="bg-cyber-950 p-3 rounded-lg border border-emerald-900/50 space-y-1">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase block">Board Remediation Mandate</span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{currentTask.remediation}</p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-cyber-border flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs font-mono text-slate-400 flex items-center space-x-2">
                <span>Task Status:</span>
                <span className={`font-bold ${completedTaskIds.includes(currentTask.id) ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {completedTaskIds.includes(currentTask.id) ? '✓ Verified in Capstone Vault' : 'Pending Audit Query'}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleDownloadCapstoneDossier}
                  className="bg-cyber-850 hover:bg-cyber-800 border border-cyber-border text-slate-200 text-xs font-mono px-3 py-2 rounded-lg transition-colors flex items-center space-x-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download Dossier</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (activeTaskIndex < currentPhase.tasks.length - 1) {
                      setActiveTaskIndex(activeTaskIndex + 1);
                    } else if (activePhaseIndex < capstoneData.phases.length - 1) {
                      setActivePhaseIndex(activePhaseIndex + 1);
                      setActiveTaskIndex(0);
                    }
                  }}
                  className="bg-cyber-cyan hover:bg-cyan-400 text-cyber-950 font-bold text-xs font-mono px-4 py-2 rounded-lg transition-all flex items-center space-x-1"
                >
                  <span>Next Audit Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Portfolio Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-cyber-900 border-2 border-amber-500/80 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative space-y-5 animate-in zoom-in-95 duration-150">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-400 flex items-center justify-center mx-auto text-amber-400">
                <Award className="w-8 h-8" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block">
                SOVEREIGN INTELLIGENCE CERTIFICATION
              </span>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                Tier 4: Principal Intelligence Strategist
              </h2>
              <p className="text-xs text-slate-300 max-w-lg mx-auto">
                Certified as successfully executing Operation Horizon Shield: External Pre-IPO Attack Surface Audit against Aether Dynamics Global Corporation under NIST SP 800-115 standards.
              </p>
            </div>

            <div className="bg-cyber-950 border border-cyber-border rounded-xl p-4 text-xs font-mono space-y-2 text-slate-300">
              <div className="flex justify-between border-b border-cyber-border/60 pb-1.5">
                <span className="text-slate-500">Candidate:</span>
                <span className="text-white font-bold">Candidate Lead Analyst</span>
              </div>
              <div className="flex justify-between border-b border-cyber-border/60 pb-1.5">
                <span className="text-slate-500">Framework Alignment:</span>
                <span className="text-cyan-400 font-bold">NIST NICE Cyber Threat Analysis (SP-ARC-001)</span>
              </div>
              <div className="flex justify-between border-b border-cyber-border/60 pb-1.5">
                <span className="text-slate-500">Evidentiary Standard:</span>
                <span className="text-emerald-400 font-bold">ISO/IEC 27037:2012 SHA-256 Hashing</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Verification Hash:</span>
                <span className="text-amber-400 truncate max-w-[280px]">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCertificate(false)}
                className="bg-cyber-800 hover:bg-cyber-750 text-slate-300 text-xs font-mono px-4 py-2 rounded-lg border border-cyber-border"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono px-5 py-2 rounded-lg flex items-center space-x-1.5 shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
