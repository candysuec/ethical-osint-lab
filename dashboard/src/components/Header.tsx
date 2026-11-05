import React from 'react';
import { 
  Shield, HelpCircle, Plus, FolderOpen, BookOpen
} from 'lucide-react';
import { Mission } from '../data/missionsData';

interface HeaderProps {
  currentCase: Mission;
  onOpenCaseBrowser: () => void;
  onOpenQuickIntake: () => void;
  onOpenGuide: () => void;
  completedCount: number;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentCase,
  onOpenCaseBrowser,
  onOpenQuickIntake,
  onOpenGuide,
  completedCount
}) => {
  return (
    <header className="h-14 bg-cyber-900 border-b border-cyber-border px-4 sm:px-6 flex items-center justify-between text-slate-200 select-none z-30 shrink-0">
      {/* Left: Branding & Tagline */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/40 flex items-center justify-center text-cyber-cyan shadow-sm">
          <Shield className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-bold font-mono tracking-wide text-white">SOVEREIGN // OSINT</span>
            <span className="text-[10px] font-mono bg-emerald-950/90 text-emerald-300 border border-emerald-800/60 px-1.5 py-0.2 rounded font-semibold">
              ETHICAL LAB
            </span>
          </div>
          <div className="text-[10px] font-mono text-slate-400 -mt-0.5">
            Defensive Digital Footprint Analysis
          </div>
        </div>
      </div>

      {/* Center: Active Investigation Case Context */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onOpenCaseBrowser}
          className="flex items-center space-x-2 bg-cyber-950 hover:bg-cyber-850 border border-cyber-border hover:border-cyan-500/50 text-slate-300 hover:text-white px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors shadow-sm"
          title="Browse all 30 curriculum cases"
        >
          <FolderOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-cyan-400 font-bold">{currentCase.caseNumber}:</span>
          <span className="max-w-[240px] truncate text-slate-100 font-semibold">{currentCase.title}</span>
          <span className="text-[10px] bg-cyber-800 text-slate-300 px-1.5 py-0.2 rounded font-mono border border-cyber-border">
            Switch Case
          </span>
        </button>
      </div>

      {/* Right: Actions & Guide */}
      <div className="flex items-center space-x-2.5">
        <div className="hidden lg:flex items-center space-x-1.5 text-xs font-mono bg-cyber-950 px-2.5 py-1 rounded-md border border-cyber-border text-slate-300">
          <span className="text-slate-500">Curriculum:</span>
          <span className="text-emerald-400 font-bold">{completedCount} / 30 Cases</span>
        </div>

        <button
          onClick={onOpenGuide}
          className="flex items-center space-x-1 text-slate-300 hover:text-white bg-cyber-850 hover:bg-cyber-800 border border-cyber-border text-xs font-mono px-2.5 py-1.5 rounded-lg transition-colors"
          title="Investigation Guide & Plain-English Tour"
        >
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">How to Use</span>
        </button>

        <button
          onClick={onOpenQuickIntake}
          className="flex items-center space-x-1 bg-cyber-cyan hover:bg-cyan-400 text-cyber-950 font-bold text-xs font-mono px-3 py-1.5 rounded-lg transition-all shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ingest Indicator</span>
        </button>
      </div>
    </header>
  );
};
