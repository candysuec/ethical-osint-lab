import React, { useState } from 'react';
import { 
  Shield, Award, Terminal, Wrench, Network, FileCheck, 
  Search, ArrowRight, Play, CheckCircle2, AlertTriangle, 
  ExternalLink, Layers, Sparkles, Filter, Lock, BookOpen,
  FolderKanban, Activity, Compass, Database, Check, Calculator, CheckSquare
} from 'lucide-react';
import { missionsData, Mission } from '../data/missionsData';
import { SubsystemView } from './Sidebar';

interface AcademyDashboardViewProps {
  completedCaseIds: string[];
  currentCaseId: string;
  onSelectCase: (mission: Mission) => void;
  onNavigateToView: (view: SubsystemView) => void;
  evidenceCount: number;
  leadsCount: number;
  entitiesCount: number;
}

export const AcademyDashboardView: React.FC<AcademyDashboardViewProps> = ({
  completedCaseIds,
  currentCaseId,
  onSelectCase,
  onNavigateToView,
  evidenceCount,
  leadsCount,
  entitiesCount
}) => {
  const [selectedTierFilter, setSelectedTierFilter] = useState<'ALL' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'CAPSTONE'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const totalCases = missionsData.length;
  const completedCount = completedCaseIds.length;
  const totalXp = missionsData.reduce((acc, m) => acc + m.xp, 0);
  const earnedXp = missionsData
    .filter(m => completedCaseIds.includes(m.id))
    .reduce((acc, m) => acc + m.xp, 0);
  const progressPercent = Math.round((completedCount / totalCases) * 100);

  // Active mission object
  const activeMission = missionsData.find(m => m.id === currentCaseId) || missionsData[0];

  // Filtered missions
  const filteredMissions = missionsData.filter(m => {
    if (selectedTierFilter !== 'ALL' && selectedTierFilter !== 'CAPSTONE' && m.tier !== selectedTierFilter) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = m.title.toLowerCase().includes(q);
      const matchNumber = m.caseNumber.toLowerCase().includes(q);
      const matchTarget = m.target.toLowerCase().includes(q);
      const matchCat = m.category.toLowerCase().includes(q);
      const matchObj = m.oneSentenceObjective.toLowerCase().includes(q);
      if (!matchTitle && !matchNumber && !matchTarget && !matchCat && !matchObj) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Executive Academy Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyber-900 via-cyber-950 to-slate-950 border border-cyber-border shadow-2xl p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono font-bold text-cyber-cyan tracking-wider uppercase">
              <Shield className="w-3.5 h-3.5" />
              Sovereign Defensive Intelligence Enclave
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400">
              <Lock className="w-3.5 h-3.5" />
              100% Passive Reconnaissance • CFAA Compliant
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-300">
              <Sparkles className="w-3.5 h-3.5" />
              30 Graded Operations + Capstone
            </span>
          </div>

          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono text-white tracking-tight">
              Ethical OSINT Training Laboratory <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-teal-300 to-purple-400">
                & Cyber Intelligence Workbench
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Master the 7-phase ethical open-source intelligence lifecycle across 30 real-world operations. 
              Enforces <span className="text-cyber-cyan font-mono font-semibold">ISO/IEC 27037:2012</span> SHA-256 digital evidence preservation, 
              <span className="text-emerald-400 font-mono font-semibold">NATO STANAG 2022</span> Admiralty evaluation (A1–F6), and strictly passive defensive analysis.
            </p>
          </div>

          {/* Quick CTA Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateToView('INVESTIGATION')}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-cyber-950 font-mono text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:outline-none"
            >
              <Play className="w-4 h-4 fill-current" />
              Resume Active Investigation: {activeMission.caseNumber}
            </button>

            <button
              type="button"
              onClick={() => onNavigateToView('CAPSTONE')}
              className="px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
            >
              <Award className="w-4 h-4 text-amber-400" />
              Operation Horizon Shield (Capstone)
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30">Tier 4</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateToView('TOOLS')}
              className="px-4 py-2.5 rounded-xl bg-cyber-850 hover:bg-cyber-800 text-slate-200 border border-cyber-border font-mono text-xs sm:text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <Wrench className="w-4 h-4 text-slate-400" />
              Tool Sandbox (7 Tools)
            </button>

            <button
              type="button"
              onClick={() => onNavigateToView('EXIF_INSPECTOR')}
              className="px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-xs sm:text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <FileCheck className="w-4 h-4 text-emerald-400" />
              Client-Side EXIF Dropzone
            </button>
          </div>
        </div>
      </div>

      {/* 2. Executive Metrics & Operational Readiness Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-cyber-900 border border-cyber-border rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-cyber-cyan" />
              Curriculum Progress
            </span>
            <span className="text-xs font-mono font-bold text-cyber-cyan">{progressPercent}%</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-white">{completedCount}</span>
            <span className="text-xs font-mono text-slate-400">/ {totalCases} Cases</span>
          </div>
          <div className="w-full h-1.5 bg-cyber-950 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyber-cyan to-teal-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-cyber-900 border border-cyber-border rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Investigator Mastery XP
            </span>
            <span className="text-xs font-mono font-bold text-amber-400">Level 1</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-white">{earnedXp}</span>
            <span className="text-xs font-mono text-slate-400">/ {totalXp} XP</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 block truncate">
            {totalCases - completedCount} cases remaining for Tier 4 Diploma
          </span>
        </div>

        {/* Metric 3 */}
        <div className="bg-cyber-900 border border-cyber-border rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
              Evidence Integrity
            </span>
            <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">
              ISO 27037
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-emerald-400">{evidenceCount}</span>
            <span className="text-xs font-mono text-slate-400">Artifacts Anchored</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 block truncate">
            100% SHA-256 Checksums Validated
          </span>
        </div>

        {/* Metric 4 */}
        <div className="bg-cyber-900 border border-cyber-border rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5 text-purple-400" />
              Correlated Entities
            </span>
            <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded">
              STANAG A1
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-purple-400">{entitiesCount}</span>
            <span className="text-xs font-mono text-slate-400">Resolved Nodes</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 block truncate">
            {leadsCount} Leads in Verification Queue
          </span>
        </div>
      </div>

      {/* 3. Primary Subsystems & Analyst Workspaces (Interactive Launchpad) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold font-mono text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyber-cyan" />
              Investigative Subsystems & Workbenches
            </h2>
            <p className="text-xs text-slate-400">
              Direct access to all 8 specialized intelligence suites. Click any card to launch that workspace.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Workspace 1: Active Case Console */}
          <div 
            onClick={() => onNavigateToView('INVESTIGATION')}
            className="group cursor-pointer bg-cyber-900 hover:bg-cyber-850 border border-cyber-border hover:border-cyan-500/50 rounded-xl p-5 transition-all duration-200 shadow-sm hover:shadow-cyan-500/10 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 group-hover:scale-110 transition-transform">
                <Terminal className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Primary Console
              </span>
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                Active Case Console
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                The 3-pillar terminal console: Scope & PIRs, Passive Tool Execution, and Cryptographic Proof.
              </p>
            </div>
            <div className="pt-2 border-t border-cyber-border/60 text-[11px] font-mono text-cyan-400/90 flex items-center gap-1">
              Currently: {activeMission.caseNumber}
            </div>
          </div>

          {/* Workspace 2: Operation Horizon Shield (Capstone) */}
          <div 
            onClick={() => onNavigateToView('CAPSTONE')}
            className="group cursor-pointer bg-cyber-900 hover:bg-cyber-850 border border-amber-500/30 hover:border-amber-400 rounded-xl p-5 transition-all duration-200 shadow-sm hover:shadow-amber-500/10 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Tier 4 Capstone
              </span>
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
                Operation Horizon Shield
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Culminating Pre-IPO Attack Surface & Executive Risk Audit against Aether Dynamics (6 phases + diploma).
              </p>
            </div>
            <div className="pt-2 border-t border-cyber-border/60 text-[11px] font-mono text-amber-400 flex items-center gap-1">
              NIST NICE SP-ARC-001 Aligned
            </div>
          </div>

          {/* Workspace 3: Tool Sandbox */}
          <div 
            onClick={() => onNavigateToView('TOOLS')}
            className="group cursor-pointer bg-cyber-900 hover:bg-cyber-850 border border-cyber-border hover:border-cyan-500/50 rounded-xl p-5 transition-all duration-200 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-cyber-800 text-slate-300 border border-cyber-border group-hover:scale-110 transition-transform">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyber-800 text-slate-300 border border-cyber-border">
                Port :5002 Daemon
              </span>
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                OSINT Tool Sandbox
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Free-form query workbench: DiG DNS/DMARC, crt.sh CT logs, dnstwist, BGPView ASN, Wayback CDX.
              </p>
            </div>
            <div className="pt-2 border-t border-cyber-border/60 text-[11px] font-mono text-slate-400 flex items-center gap-1">
              7 Containerized Tool Presets
            </div>
          </div>

          {/* Workspace 4: EXIF & Document Ingestion */}
          <div 
            onClick={() => onNavigateToView('EXIF_INSPECTOR')}
            className="group cursor-pointer bg-cyber-900 hover:bg-cyber-850 border border-cyber-border hover:border-emerald-500/50 rounded-xl p-5 transition-all duration-200 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 group-hover:scale-110 transition-transform">
                <FileCheck className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                100% Client-Side
              </span>
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center justify-between">
                EXIF & Document Ingestion
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Drag-and-drop media & PDF analyzer. Extracts GPS coordinates, camera serials, AD usernames, and scrubs OPSEC leaks.
              </p>
            </div>
            <div className="pt-2 border-t border-cyber-border/60 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              SHA-256 + Geolocation Redaction
            </div>
          </div>

          {/* Workspace 5: Relationship Graph */}
          <div 
            onClick={() => onNavigateToView('RELATIONSHIPS')}
            className="group cursor-pointer bg-cyber-900 hover:bg-cyber-850 border border-cyber-border hover:border-purple-500/50 rounded-xl p-5 transition-all duration-200 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/30 group-hover:scale-110 transition-transform">
                <Network className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Maltego Pivots
              </span>
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-white group-hover:text-purple-300 transition-colors flex items-center justify-between">
                Relationship Graph
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Interactive visual node graph with live pivot transforms: Pivot DNS, Pivot WHOIS, Pivot ASN, and Pivot Officers.
              </p>
            </div>
            <div className="pt-2 border-t border-cyber-border/60 text-[11px] font-mono text-purple-300 flex items-center gap-1">
              Interactive SVG Canvas
            </div>
          </div>

          {/* Workspace 6: Evidence Repository */}
          <div 
            onClick={() => onNavigateToView('EVIDENCE')}
            className="group cursor-pointer bg-cyber-900 hover:bg-cyber-850 border border-cyber-border hover:border-cyan-500/50 rounded-xl p-5 transition-all duration-200 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-cyber-800 text-slate-300 border border-cyber-border group-hover:scale-110 transition-transform">
                <Database className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyber-800 text-slate-300 border border-cyber-border">
                {evidenceCount} Records
              </span>
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                Evidence Repository
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                ISO/IEC 27037 chain-of-custody ledger with cryptographic SHA-256 verifier, archive links, and exportable JSON dossiers.
              </p>
            </div>
            <div className="pt-2 border-t border-cyber-border/60 text-[11px] font-mono text-slate-400 flex items-center gap-1">
              Admiralty A1-F6 Confidence Ratings
            </div>
          </div>

          {/* Workspace 7: Executive Reports */}
          <div 
            onClick={() => onNavigateToView('REPORT')}
            className="group cursor-pointer bg-cyber-900 hover:bg-cyber-850 border border-cyber-border hover:border-cyan-500/50 rounded-xl p-5 transition-all duration-200 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-cyber-800 text-slate-300 border border-cyber-border group-hover:scale-110 transition-transform">
                <FileCheck className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Print / PDF
              </span>
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                Executive Deliverables
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Generate board-level defensive intelligence briefings with executive summaries, technical findings, and remediation steps.
              </p>
            </div>
            <div className="pt-2 border-t border-cyber-border/60 text-[11px] font-mono text-slate-400 flex items-center gap-1">
              One-Click PDF / Print Export
            </div>
          </div>

          {/* Workspace 8: Case Management & Portfolio */}
          <div 
            onClick={() => onNavigateToView('CASES')}
            className="group cursor-pointer bg-cyber-900 hover:bg-cyber-850 border border-cyber-border hover:border-cyan-500/50 rounded-xl p-5 transition-all duration-200 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-cyber-800 text-slate-300 border border-cyber-border group-hover:scale-110 transition-transform">
                <FolderKanban className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyber-800 text-slate-300 border border-cyber-border">
                Portfolio
              </span>
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                Case Portfolio Manager
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Manage simultaneous investigations, define Priority Intelligence Requirements (PIRs), and track TLP classifications.
              </p>
            </div>
            <div className="pt-2 border-t border-cyber-border/60 text-[11px] font-mono text-slate-400 flex items-center gap-1">
              TLP:CLEAR to TLP:AMBER Enclaves
            </div>
          </div>

          {/* Workspace 9: 6-Stage Operational Stepper */}
          <div 
            onClick={() => onNavigateToView('LIFECYCLE')}
            className="group cursor-pointer bg-cyber-900 hover:bg-cyber-850 border border-purple-500/30 hover:border-purple-400 rounded-xl p-5 transition-all duration-200 shadow-sm hover:shadow-purple-500/10 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/30 group-hover:scale-110 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                6 Stages
              </span>
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-white group-hover:text-purple-300 transition-colors flex items-center justify-between">
                6-Stage Lifecycle Stepper
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Step-by-step walkthrough across Target Scoping, Digital Mapping, Passive Collection, Entity Resolution, Correlation & Dissemination.
              </p>
            </div>
            <div className="pt-2 border-t border-cyber-border/60 text-[11px] font-mono text-purple-300 flex items-center gap-1">
              Full Intelligence Lifecycle
            </div>
          </div>

          {/* Workspace 10: Missions & Knowledge Checks */}
          <div 
            onClick={() => onNavigateToView('MISSION_CONTROL')}
            className="group cursor-pointer bg-cyber-900 hover:bg-cyber-850 border border-cyan-500/30 hover:border-cyan-400 rounded-xl p-5 transition-all duration-200 shadow-sm hover:shadow-cyan-500/10 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 group-hover:scale-110 transition-transform">
                <CheckSquare className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Interactive Quizzes
              </span>
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                Missions & Knowledge Checks
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Hands-on scenario training with step-by-step stdout decoders, interactive multiple-choice verification quizzes, and badge rewards.
              </p>
            </div>
            <div className="pt-2 border-t border-cyber-border/60 text-[11px] font-mono text-cyan-400 flex items-center gap-1">
              30 Case Quizzes + XP Engine
            </div>
          </div>

          {/* Workspace 11: NATO STANAG 6×6 Matrix */}
          <div 
            onClick={() => onNavigateToView('ADMIRALTY_MATRIX')}
            className="group cursor-pointer bg-cyber-900 hover:bg-cyber-850 border border-amber-500/30 hover:border-amber-400 rounded-xl p-5 transition-all duration-200 shadow-sm hover:shadow-amber-500/10 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                STANAG 2022
              </span>
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
                NATO STANAG 6×6 Matrix
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Interactive Admiralty evaluation matrix mapping Source Reliability (A–F) and Information Credibility (1–6) across all intelligence.
              </p>
            </div>
            <div className="pt-2 border-t border-cyber-border/60 text-[11px] font-mono text-amber-300 flex items-center gap-1">
              Interactive 6×6 Matrix Explorer
            </div>
          </div>

          {/* Workspace 12: Mathematical Confidence Scoring Engine */}
          <div 
            onClick={() => onNavigateToView('CONFIDENCE_ENGINE')}
            className="group cursor-pointer bg-cyber-900 hover:bg-cyber-850 border border-cyber-border hover:border-cyan-500/50 rounded-xl p-5 transition-all duration-200 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-cyber-800 text-slate-300 border border-cyber-border group-hover:scale-110 transition-transform">
                <Calculator className="w-5 h-5" />
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Formula Engine
              </span>
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                Confidence Scoring Engine
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Algorithmic scoring avoiding cognitive bias. Computes Confidence Index (CI) with dynamic weights, corroboration factor, and staleness penalties.
              </p>
            </div>
            <div className="pt-2 border-t border-cyber-border/60 text-[11px] font-mono text-slate-400 flex items-center gap-1">
              Objective Algorithmic Index
            </div>
          </div>
        </div>
      </div>

      {/* 4. Complete 30-Case Curriculum Catalog Grid */}
      <div className="space-y-4 pt-4 border-t border-cyber-border/80">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <BookOpen className="w-4 h-4" />
              </span>
              <h2 className="text-xl font-bold font-mono text-white">
                30 Graded Real-World Operations Curriculum
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Browse, filter, and launch any operation. Each case teaches a distinct intelligence discipline with authentic passive telemetry.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 30 cases by domain, tool, or PIR..."
              className="w-full pl-9 pr-3 py-1.5 bg-cyber-900 border border-cyber-border rounded-lg text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyber-cyan"
            />
          </div>
        </div>

        {/* Tier Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedTierFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-colors flex items-center gap-1.5 ${
              selectedTierFilter === 'ALL'
                ? 'bg-cyan-500 text-cyber-950 font-bold'
                : 'bg-cyber-900 text-slate-300 hover:text-white border border-cyber-border'
            }`}
          >
            All Operations ({missionsData.length})
          </button>

          <button
            type="button"
            onClick={() => setSelectedTierFilter('BEGINNER')}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-colors flex items-center gap-1.5 ${
              selectedTierFilter === 'BEGINNER'
                ? 'bg-emerald-500 text-cyber-950 font-bold'
                : 'bg-cyber-900 text-slate-300 hover:text-emerald-400 border border-cyber-border'
            }`}
          >
            Tier 1: Beginner Fundamentals (Cases 01–10)
          </button>

          <button
            type="button"
            onClick={() => setSelectedTierFilter('INTERMEDIATE')}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-colors flex items-center gap-1.5 ${
              selectedTierFilter === 'INTERMEDIATE'
                ? 'bg-cyan-500 text-cyber-950 font-bold'
                : 'bg-cyber-900 text-slate-300 hover:text-cyan-300 border border-cyber-border'
            }`}
          >
            Tier 2: Intermediate Analysis (Cases 11–20)
          </button>

          <button
            type="button"
            onClick={() => setSelectedTierFilter('ADVANCED')}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-colors flex items-center gap-1.5 ${
              selectedTierFilter === 'ADVANCED'
                ? 'bg-purple-500 text-white font-bold'
                : 'bg-cyber-900 text-slate-300 hover:text-purple-300 border border-cyber-border'
            }`}
          >
            Tier 3: Advanced Intelligence (Cases 21–30)
          </button>

          <button
            type="button"
            onClick={() => onNavigateToView('CAPSTONE')}
            className="px-3 py-1.5 rounded-lg font-mono text-xs bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 transition-colors flex items-center gap-1.5 ml-auto"
          >
            <Award className="w-3.5 h-3.5" />
            Tier 4: Capstone Pre-IPO Audit →
          </button>
        </div>

        {/* 30 Cases Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMissions.map((mission) => {
            const isCompleted = completedCaseIds.includes(mission.id);
            const isActive = currentCaseId === mission.id;

            const getTierColor = (tier: string) => {
              switch (tier) {
                case 'BEGINNER': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
                case 'INTERMEDIATE': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
                case 'ADVANCED': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
                default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
              }
            };

            return (
              <div
                key={mission.id}
                className={`flex flex-col justify-between rounded-xl border p-5 transition-all ${
                  isActive 
                    ? 'bg-cyber-900 border-cyber-cyan shadow-lg shadow-cyan-500/10 ring-1 ring-cyber-cyan' 
                    : isCompleted
                      ? 'bg-cyber-900/90 border-emerald-500/40 hover:border-emerald-500'
                      : 'bg-cyber-900 border-cyber-border hover:border-slate-500'
                }`}
              >
                <div className="space-y-3">
                  {/* Top Bar: Case Number & Status Badges */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-white">
                        {mission.caseNumber}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${getTierColor(mission.tier)}`}>
                        {mission.tier}
                      </span>
                    </div>

                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <Check className="w-3 h-3" />
                        Verified
                      </span>
                    ) : isActive ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/30 animate-pulse">
                        ● Active
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-slate-500">
                        {mission.xp} XP
                      </span>
                    )}
                  </div>

                  {/* Title & Category */}
                  <div>
                    <h3 className="font-mono text-sm font-bold text-white line-clamp-1">
                      {mission.title}
                    </h3>
                    <span className="text-[11px] font-mono text-cyber-cyan block mt-0.5">
                      Target: {mission.target} • {mission.category}
                    </span>
                  </div>

                  {/* Objective */}
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {mission.oneSentenceObjective}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-4 mt-4 border-t border-cyber-border/60 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                    <span>Tool:</span>
                    <span className="text-slate-300">{mission.steps[0]?.tool || 'dig / curl'}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectCase(mission);
                      onNavigateToView('INVESTIGATION');
                    }}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold flex items-center gap-1.5 transition-all ${
                      isActive
                        ? 'bg-cyan-500 text-cyber-950 hover:bg-cyan-400'
                        : 'bg-cyber-800 hover:bg-cyber-700 text-cyan-300 border border-cyber-border'
                    }`}
                  >
                    {isActive ? 'Continue Case' : 'Investigate'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
