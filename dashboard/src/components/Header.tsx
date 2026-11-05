import React from 'react';
import { 
  Shield, Layers, HelpCircle, Trophy, Wrench, Gamepad2, Plus
} from 'lucide-react';
import { Case } from '../types';

export type WorkbenchMode = 'MISSION_CONTROL' | 'TOOL_ACADEMY' | 'STUDIO' | 'LIFECYCLE';

interface HeaderProps {
  currentCase: Case;
  cases: Case[];
  onSelectCase: (c: Case) => void;
  activeStage?: number;
  onSelectStage?: (stage: number) => void;
  workbenchMode: WorkbenchMode;
  onToggleWorkbenchMode: (mode: WorkbenchMode) => void;
  onOpenQuickIntake: () => void;
  onOpenTools?: () => void;
  onOpenGuide: () => void;
  onLoadDemo?: () => void;
  completedMissionsCount: number;
  totalXp: number;
}

export const Header: React.FC<HeaderProps> = ({ 
  workbenchMode, 
  onToggleWorkbenchMode,
  onOpenQuickIntake,
  onOpenGuide,
  completedMissionsCount,
  totalXp
}) => {
  return (
    <header className="h-14 bg-cyber-900 border-b border-cyber-border px-4 sm:px-6 flex items-center justify-between text-slate-200 select-none z-30 shrink-0">
      {/* Left: Branding & Quick Progress */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/40 flex items-center justify-center text-cyber-cyan shadow-sm">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold font-mono tracking-wide text-white">OSINT LAB</span>
              <span className="text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 px-1.5 py-0.2 rounded font-semibold">
                TRAINING
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 -mt-0.5">
              Defensive Cyber Intelligence
            </div>
          </div>
        </div>

        <span className="text-slate-700 hidden sm:inline">|</span>

        {/* Progress Pill */}
        <div className="hidden md:flex items-center space-x-2 bg-cyber-950 px-2.5 py-1 rounded-md border border-cyber-border text-xs font-mono">
          <span className="text-slate-400">Progress:</span>
          <span className="text-cyan-400 font-bold">{completedMissionsCount} / 30 Cases</span>
          <div className="w-16 h-1.5 bg-cyber-850 rounded-full overflow-hidden">
            <div 
              className="h-full bg-cyan-400 transition-all duration-500" 
              style={{ width: `${Math.max(5, (completedMissionsCount / 30) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Center: Primary 3-Mode Segmented Switch */}
      <nav className="flex items-center bg-cyber-950 p-1 rounded-lg border border-cyber-border text-xs font-mono">
        <button
          onClick={() => onToggleWorkbenchMode('MISSION_CONTROL')}
          className={`px-3.5 py-1.5 rounded-md transition-all flex items-center space-x-2 ${
            workbenchMode === 'MISSION_CONTROL' 
              ? 'bg-cyber-cyan text-cyber-950 font-extrabold shadow-sm' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>Missions (30)</span>
        </button>

        <button
          onClick={() => onToggleWorkbenchMode('TOOL_ACADEMY')}
          className={`px-3.5 py-1.5 rounded-md transition-all flex items-center space-x-2 ${
            workbenchMode === 'TOOL_ACADEMY' 
              ? 'bg-cyber-cyan text-cyber-950 font-extrabold shadow-sm' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Tool Sandbox</span>
        </button>

        <button
          onClick={() => onToggleWorkbenchMode('STUDIO')}
          className={`px-3.5 py-1.5 rounded-md transition-all flex items-center space-x-2 ${
            workbenchMode === 'STUDIO' 
              ? 'bg-cyber-cyan text-cyber-950 font-extrabold shadow-sm' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Analyst Studio</span>
        </button>
      </nav>

      {/* Right: XP, Quick Guide & Intake */}
      <div className="flex items-center space-x-2.5">
        <div className="flex items-center space-x-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold px-2.5 py-1 rounded-md">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>{totalXp} XP</span>
        </div>

        <button
          onClick={onOpenGuide}
          className="flex items-center space-x-1 text-slate-300 hover:text-white bg-cyber-850 hover:bg-cyber-800 border border-cyber-border text-xs font-mono px-2.5 py-1 rounded-md transition-colors"
          title="How it Works"
        >
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Guide</span>
        </button>

        <button
          onClick={onOpenQuickIntake}
          className="flex items-center space-x-1 bg-cyber-cyan hover:bg-cyan-400 text-cyber-950 font-bold text-xs font-mono px-3 py-1 rounded-md transition-all shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ingest</span>
        </button>
      </div>
    </header>
  );
};
