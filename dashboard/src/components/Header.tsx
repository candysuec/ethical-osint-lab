import React from 'react';
import { 
  Shield, HelpCircle, Plus, FolderOpen, Menu, X, 
  LayoutDashboard, Terminal, Award, Wrench, Network, FileCheck
} from 'lucide-react';
import { Mission } from '../data/missionsData';
import { SubsystemView } from './Sidebar';

interface HeaderProps {
  currentCase: Mission;
  activeView: SubsystemView;
  onSelectView: (view: SubsystemView) => void;
  onOpenCaseBrowser: () => void;
  onOpenQuickIntake: () => void;
  onOpenGuide: () => void;
  completedCount: number;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentCase,
  activeView,
  onSelectView,
  onOpenCaseBrowser,
  onOpenQuickIntake,
  onOpenGuide,
  completedCount,
  isMobileMenuOpen,
  onToggleMobileMenu
}) => {
  return (
    <header 
      role="banner"
      className="h-14 bg-cyber-900 border-b border-cyber-border px-3 sm:px-6 flex items-center justify-between text-slate-200 select-none z-30 shrink-0 gap-3"
    >
      {/* Left: Mobile Hamburger + Branding */}
      <div className="flex items-center space-x-3 shrink-0">
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={onToggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-cyber-850 focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:outline-none"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div 
          onClick={() => onSelectView('DASHBOARD')}
          className="flex items-center space-x-2.5 cursor-pointer group"
          title="Return to Academy Command Center"
        >
          <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/40 flex items-center justify-center text-cyber-cyan shadow-sm shrink-0 group-hover:border-cyber-cyan transition-colors">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold font-mono tracking-wide text-white group-hover:text-cyan-300 transition-colors">
                SOVEREIGN // OSINT
              </span>
              <span className="text-[10px] font-mono bg-emerald-950/90 text-emerald-300 border border-emerald-800/60 px-1.5 py-0.2 rounded font-semibold hidden sm:inline">
                ETHICAL LAB
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 -mt-0.5 hidden xs:block">
              Defensive Cyber Intelligence Academy
            </div>
          </div>
        </div>
      </div>

      {/* Center: Top Quick-Switch Workspace Navigation Tabs */}
      <nav aria-label="Top Workspaces" className="hidden xl:flex items-center space-x-1 font-mono text-xs">
        <button
          type="button"
          onClick={() => onSelectView('DASHBOARD')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
            activeView === 'DASHBOARD'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-cyber-850'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          Academy Hub (30)
        </button>

        <button
          type="button"
          onClick={() => onSelectView('INVESTIGATION')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
            activeView === 'INVESTIGATION'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-cyber-850'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          Active Console
        </button>

        <button
          type="button"
          onClick={() => onSelectView('CAPSTONE')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
            activeView === 'CAPSTONE'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
              : 'text-slate-400 hover:text-amber-300 hover:bg-cyber-850'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-amber-400" />
          Capstone
        </button>

        <button
          type="button"
          onClick={() => onSelectView('TOOLS')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
            activeView === 'TOOLS'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-cyber-850'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          Tools
        </button>

        <button
          type="button"
          onClick={() => onSelectView('EXIF_INSPECTOR')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
            activeView === 'EXIF_INSPECTOR'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
              : 'text-slate-400 hover:text-emerald-300 hover:bg-cyber-850'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5" />
          EXIF Dropzone
        </button>

        <button
          type="button"
          onClick={() => onSelectView('RELATIONSHIPS')}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
            activeView === 'RELATIONSHIPS'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
              : 'text-slate-400 hover:text-purple-300 hover:bg-cyber-850'
          }`}
        >
          <Network className="w-3.5 h-3.5" />
          Graph
        </button>
      </nav>

      {/* Center/Right: Active Investigation Case Context */}
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={onOpenCaseBrowser}
          aria-label={`Current case: ${currentCase.caseNumber}. Click to switch case.`}
          className="flex items-center space-x-2 bg-cyber-950 hover:bg-cyber-850 border border-cyber-border hover:border-cyan-500/50 text-slate-300 hover:text-white px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:outline-none"
          title="Browse all 30 curriculum cases"
        >
          <FolderOpen className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="text-cyan-400 font-bold">{currentCase.caseNumber}:</span>
          <span className="max-w-[100px] sm:max-w-[160px] truncate text-slate-100 font-semibold">{currentCase.title}</span>
          <span className="text-[10px] bg-cyber-800 text-slate-300 px-1.5 py-0.2 rounded font-mono border border-cyber-border hidden sm:inline">
            Switch
          </span>
        </button>
      </div>

      {/* Right: Actions & Guide */}
      <div className="flex items-center space-x-2 shrink-0">
        <div className="hidden 2xl:flex items-center space-x-1.5 text-xs font-mono bg-cyber-950 px-2.5 py-1 rounded-md border border-cyber-border text-slate-300">
          <span className="text-slate-500">Progress:</span>
          <span className="text-emerald-400 font-bold">{completedCount} / 30 Cases</span>
        </div>

        <button
          type="button"
          onClick={onOpenGuide}
          aria-label="Open investigation guide"
          className="flex items-center space-x-1 text-slate-300 hover:text-white bg-cyber-850 hover:bg-cyber-800 border border-cyber-border text-xs font-mono px-2.5 py-1.5 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:outline-none"
          title="Investigation Guide & Plain-English Tour"
        >
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden md:inline">How to Use</span>
        </button>

        <button
          type="button"
          onClick={onOpenQuickIntake}
          aria-label="Ingest new indicator lead"
          className="flex items-center space-x-1 bg-cyber-cyan hover:bg-cyan-400 text-cyber-950 font-bold text-xs font-mono px-2.5 sm:px-3 py-1.5 rounded-lg transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:outline-none"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ingest Lead</span>
        </button>
      </div>
    </header>
  );
};
