import React from 'react';
import { 
  Shield, Layers, HelpCircle, Wrench, Terminal, Plus, FolderOpen, CheckCircle
} from 'lucide-react';
import { Mission } from '../data/missionsData';

export type WorkbenchMode = 'CONSOLE' | 'TOOL_SANDBOX' | 'STUDIO';

interface HeaderProps {
  currentCase: Mission;
  onOpenCaseBrowser: () => void;
  workbenchMode: WorkbenchMode;
  onToggleWorkbenchMode: (mode: WorkbenchMode) => void;
  onOpenQuickIntake: () => void;
  onOpenGuide: () => void;
  completedCount: number;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentCase,
  onOpenCaseBrowser,
  workbenchMode, 
  onToggleWorkbenchMode,
  onOpenQuickIntake,
  onOpenGuide,
  completedCount
}) => {
  return (
    <header className="h-14 bg-cyber-900 border-b border-cyber-border px-4 sm:px-6 flex items-center justify-between text-slate-200 select-none z-30 shrink-0">
      {/* Left: Branding & Case Quick Selector */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/40 flex items-center justify-center text-cyber-cyan shadow-sm">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold font-mono tracking-wide text-white">OSINT LAB</span>
              <span className="text-[10px] font-mono bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 px-1.5 py-0.2 rounded font-semibold hidden sm:inline">
                100% PASSIVE RECON
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 -mt-0.5">
              Ethical Intelligence Framework
            </div>
          </div>
        </div>

        <span className="text-slate-700 hidden md:inline">|</span>

        {/* Case Quick Browser Button */}
        <button
          onClick={onOpenCaseBrowser}
          className="hidden md:flex items-center space-x-2 bg-cyber-950 hover:bg-cyber-850 border border-cyber-border hover:border-cyan-500/50 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-mono transition-colors"
          title="Browse all 30 curriculum cases"
        >
          <FolderOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-cyan-400 font-bold">{currentCase.caseNumber}:</span>
          <span className="max-w-[180px] truncate text-slate-200">{currentCase.title}</span>
          <span className="text-[10px] bg-cyber-800 text-slate-400 px-1.5 py-0.2 rounded">
            Change
          </span>
        </button>
      </div>

      {/* Center: Primary 3 Workspaces */}
      <nav className="flex items-center bg-cyber-950 p-1 rounded-lg border border-cyber-border text-xs font-mono">
        <button
          onClick={() => onToggleWorkbenchMode('CONSOLE')}
          className={`px-3.5 py-1.5 rounded-md transition-all flex items-center space-x-1.5 ${
            workbenchMode === 'CONSOLE' 
              ? 'bg-cyber-cyan text-cyber-950 font-extrabold shadow-sm' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Case Investigation</span>
        </button>

        <button
          onClick={() => onToggleWorkbenchMode('TOOL_SANDBOX')}
          className={`px-3.5 py-1.5 rounded-md transition-all flex items-center space-x-1.5 ${
            workbenchMode === 'TOOL_SANDBOX' 
              ? 'bg-cyber-cyan text-cyber-950 font-extrabold shadow-sm' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Tool Sandbox</span>
        </button>

        <button
          onClick={() => onToggleWorkbenchMode('STUDIO')}
          className={`px-3.5 py-1.5 rounded-md transition-all flex items-center space-x-1.5 ${
            workbenchMode === 'STUDIO' 
              ? 'bg-cyber-cyan text-cyber-950 font-extrabold shadow-sm' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Analyst Studio (14-Tab)</span>
        </button>
      </nav>

      {/* Right Controls */}
      <div className="flex items-center space-x-2.5">
        <div className="hidden lg:flex items-center space-x-1.5 text-xs font-mono bg-cyber-950 px-2.5 py-1 rounded-md border border-cyber-border text-slate-300">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>{completedCount} / 30 Cases Solved</span>
        </div>

        <button
          onClick={onOpenGuide}
          className="flex items-center space-x-1 text-slate-300 hover:text-white bg-cyber-850 hover:bg-cyber-800 border border-cyber-border text-xs font-mono px-2.5 py-1 rounded-md transition-colors"
          title="Investigation Guide & Plain-English Tour"
        >
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Guide</span>
        </button>

        <button
          onClick={onOpenQuickIntake}
          className="flex items-center space-x-1 bg-cyber-cyan hover:bg-cyan-400 text-cyber-950 font-bold text-xs font-mono px-3 py-1 rounded-md transition-all shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ingest Lead</span>
        </button>
      </div>
    </header>
  );
};
