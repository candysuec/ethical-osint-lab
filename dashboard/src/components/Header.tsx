import React from 'react';
import { 
  Shield, Terminal, Layers, BookOpen, 
  HelpCircle, Sparkles, Trophy, Wrench, Gamepad2
} from 'lucide-react';
import { Case, TlpClassification } from '../types';

export type WorkbenchMode = 'MISSION_CONTROL' | 'TOOL_ACADEMY' | 'STUDIO' | 'LIFECYCLE';

interface HeaderProps {
  currentCase: Case;
  cases: Case[];
  onSelectCase: (c: Case) => void;
  activeStage: number;
  onSelectStage: (stage: number) => void;
  workbenchMode: WorkbenchMode;
  onToggleWorkbenchMode: (mode: WorkbenchMode) => void;
  onOpenQuickIntake: () => void;
  onOpenTools: () => void;
  onOpenGuide: () => void;
  onLoadDemo: () => void;
  completedMissionsCount: number;
  totalXp: number;
}

export const stages = [
  { id: 1, name: 'Target Scoping', label: '1. Scoping' },
  { id: 2, name: 'Source Identification', label: '2. Sources' },
  { id: 3, name: 'Passive Collection', label: '3. Evidence' },
  { id: 4, name: 'Entity Resolution', label: '4. Resolution' },
  { id: 5, name: 'Analysis & Graph', label: '5. Link Graph' },
  { id: 6, name: 'Dissemination', label: '6. Executive Brief' }
];

export const Header: React.FC<HeaderProps> = ({ 
  currentCase, 
  cases, 
  onSelectCase, 
  workbenchMode, 
  onToggleWorkbenchMode,
  onOpenQuickIntake,
  onOpenGuide,
  completedMissionsCount,
  totalXp
}) => {
  const getTlpBadge = (tlp: TlpClassification) => {
    switch (tlp) {
      case 'TLP:RED': return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'TLP:AMBER':
      case 'TLP:AMBER+STRICT': return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'TLP:GREEN': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'TLP:CLEAR':
      default: return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
    }
  };

  return (
    <header className="bg-cyber-900 border-b border-cyber-border text-slate-200 select-none z-30">
      {/* Top Utility Bar */}
      <div className="h-14 px-4 sm:px-6 flex items-center justify-between border-b border-cyber-border/60">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="flex items-center space-x-2 text-cyber-cyan font-bold tracking-wider">
            <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/40 flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyber-cyan" />
            </div>
            <div>
              <span className="text-sm font-mono tracking-wider font-extrabold text-slate-100 block">SOVEREIGN // OSINT LAB</span>
              <span className="text-[9px] font-mono text-cyan-400/80 -mt-1 block">CURRICULUM & TRAINING</span>
            </div>
          </div>

          <span className="text-slate-700 hidden sm:inline">|</span>

          {/* Active Case Selector */}
          <div className="hidden lg:flex items-center space-x-2">
            <select 
              value={currentCase.id}
              onChange={(e) => {
                const selected = cases.find(c => c.id === e.target.value);
                if (selected) onSelectCase(selected);
              }}
              className="bg-cyber-850 hover:bg-cyber-800 border border-cyber-border text-slate-200 text-xs rounded px-3 py-1.5 font-mono focus:outline-none focus:border-cyber-cyan transition-colors"
            >
              {cases.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.caseNumber} • {c.targetEntity.slice(0, 30)}
                </option>
              ))}
            </select>

            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getTlpBadge(currentCase.classification)}`}>
              {currentCase.classification}
            </span>
          </div>
        </div>

        {/* Center Primary Mode Switcher */}
        <div className="flex items-center bg-cyber-950 p-1 rounded-xl border border-cyber-border text-xs font-mono">
          <button
            onClick={() => onToggleWorkbenchMode('MISSION_CONTROL')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
              workbenchMode === 'MISSION_CONTROL' 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Mission Control</span>
            <span className="bg-black/30 text-[10px] px-1.5 py-0.2 rounded font-mono ml-1">
              {completedMissionsCount}/30
            </span>
          </button>

          <button
            onClick={() => onToggleWorkbenchMode('TOOL_ACADEMY')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
              workbenchMode === 'TOOL_ACADEMY' 
                ? 'bg-cyber-cyan text-cyber-950 font-extrabold shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Tool Academy</span>
          </button>

          <button
            onClick={() => onToggleWorkbenchMode('STUDIO')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
              workbenchMode === 'STUDIO' 
                ? 'bg-cyber-cyan text-cyber-950 font-extrabold shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Analyst Studio (14-Tab)</span>
          </button>

          <button
            onClick={() => onToggleWorkbenchMode('LIFECYCLE')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
              workbenchMode === 'LIFECYCLE' 
                ? 'bg-cyber-cyan text-cyber-950 font-extrabold shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>6-Stage Guide</span>
          </button>
        </div>

        {/* Right Controls: Points, Guide & Intake */}
        <div className="flex items-center space-x-3">
          {/* Points Pill */}
          <div className="hidden sm:flex items-center space-x-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold px-3 py-1.5 rounded-lg">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>{totalXp} XP</span>
          </div>

          {/* Beginner Onboarding Guide Button */}
          <button
            onClick={onOpenGuide}
            className="flex items-center space-x-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 text-xs font-mono px-3 py-1.5 rounded-lg transition-all"
            title="Open Plain English Step-by-Step Guide"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold hidden md:inline">🔰 Guide</span>
          </button>

          {/* New Ingestion Button */}
          <button
            onClick={onOpenQuickIntake}
            className="flex items-center space-x-1.5 bg-cyber-cyan hover:bg-cyan-400 text-cyber-950 font-bold text-xs font-mono px-3.5 py-1.5 rounded-lg transition-all shadow-md shadow-cyan-950/40"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>+ Ingest</span>
          </button>
        </div>
      </div>

      {/* Defensive OSINT Guarantee Bar */}
      <div className="bg-cyber-950/95 px-6 py-1.5 flex items-center justify-between border-t border-cyber-border/40 text-[11px] font-mono">
        <div className="flex items-center space-x-2 text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>CURRICULUM INVARIANT: 100% PASSIVE PUBLIC OSINT • NATO STANAG 2022 ADMIRALTY COMPLIANCE</span>
        </div>
        <div className="text-slate-500 hidden md:block">
          Target Scopes: Fortune 500 / Public Registries / RFC Standard Repositories
        </div>
      </div>
    </header>
  );
};
