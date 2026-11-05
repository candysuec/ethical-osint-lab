import React, { useState } from 'react';
import { 
  Shield, ShieldAlert, Clock, Terminal, Search, ChevronRight,
  Layers, Network, FileCheck, CheckCircle2, AlertTriangle, 
  HelpCircle, Sparkles, SlidersHorizontal, BookOpen
} from 'lucide-react';
import { Case, TlpClassification } from '../types';

interface HeaderProps {
  currentCase: Case;
  cases: Case[];
  onSelectCase: (c: Case) => void;
  activeStage: number;
  onSelectStage: (stage: number) => void;
  workbenchMode: 'GUIDED' | 'STUDIO';
  onToggleWorkbenchMode: (mode: 'GUIDED' | 'STUDIO') => void;
  onOpenQuickIntake: () => void;
  onOpenTools: () => void;
  onOpenGuide: () => void;
  onLoadDemo: () => void;
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
  activeStage, 
  onSelectStage,
  workbenchMode,
  onToggleWorkbenchMode,
  onOpenQuickIntake,
  onOpenTools,
  onOpenGuide,
  onLoadDemo
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
            <div className="w-8 h-8 rounded bg-cyber-cyan/10 border border-cyber-cyan/40 flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyber-cyan animate-pulse" />
            </div>
            <div>
              <span className="text-sm font-mono tracking-wider font-extrabold text-slate-100 block">SOVEREIGN//OSINT</span>
              <span className="text-[9px] font-mono text-cyan-400/80 -mt-1 block">ANALYST WORKBENCH</span>
            </div>
          </div>

          <span className="text-slate-600 hidden sm:inline">|</span>

          {/* Active Case Selector */}
          <div className="flex items-center space-x-2">
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

        {/* Center / Right Controls */}
        <div className="flex items-center space-x-3">
          {/* Beginner Onboarding Guide Button */}
          <button
            onClick={onOpenGuide}
            className="flex items-center space-x-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 text-xs font-mono px-3 py-1.5 rounded-lg transition-all animate-pulse"
            title="Open Plain English Step-by-Step Guide"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold">🔰 How to Use (Start Here)</span>
          </button>

          {/* Tool Runner Studio Button */}
          <button
            onClick={onOpenTools}
            className="flex items-center space-x-1.5 bg-cyber-850 hover:bg-cyber-800 border border-cyber-cyan/40 text-cyber-cyan text-xs font-mono px-3 py-1.5 rounded transition-colors"
            title="Launch Interactive Tool Runner"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="font-bold">Tool Runner Studio</span>
          </button>

          {/* Quick Demo Target Button */}
          <button
            onClick={onLoadDemo}
            className="hidden md:flex items-center space-x-1.5 bg-cyber-850 hover:bg-cyber-800 border border-cyber-border text-slate-300 text-xs font-mono px-3 py-1.5 rounded transition-colors"
            title="Load Pre-Configured Sample Target"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Load Demo Target</span>
          </button>

          {/* Mode Switcher */}
          <div className="flex items-center bg-cyber-950 p-1 rounded border border-cyber-border text-xs font-mono">
            <button
              onClick={() => onToggleWorkbenchMode('GUIDED')}
              className={`px-3 py-1 rounded transition-colors flex items-center space-x-1.5 ${
                workbenchMode === 'GUIDED' 
                  ? 'bg-cyber-cyan text-cyber-950 font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Lifecycle Guide</span>
            </button>
            <button
              onClick={() => onToggleWorkbenchMode('STUDIO')}
              className={`px-3 py-1 rounded transition-colors flex items-center space-x-1.5 ${
                workbenchMode === 'STUDIO' 
                  ? 'bg-cyber-cyan text-cyber-950 font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Analyst Studio</span>
            </button>
          </div>

          {/* New Ingestion Button */}
          <button
            onClick={onOpenQuickIntake}
            className="flex items-center space-x-1.5 bg-cyber-cyan hover:bg-cyan-400 text-cyber-950 font-bold text-xs font-mono px-3.5 py-1.5 rounded transition-all shadow-md shadow-cyan-950/40"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>+ Ingest Indicator</span>
          </button>
        </div>
      </div>

      {/* Six-Stage Collection Lifecycle Stepper (From Candy's Essential OSINT Guide) */}
      <div className="bg-cyber-950/90 px-4 sm:px-6 py-2 overflow-x-auto flex items-center justify-between border-t border-cyber-border/40 text-xs font-mono">
        <div className="flex items-center space-x-1 min-w-max">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 mr-2 font-bold flex items-center space-x-1">
            <span>6-Stage Lifecycle:</span>
          </span>

          {stages.map((stg, idx) => {
            const isActive = activeStage === stg.id;
            const isCompleted = activeStage > stg.id;
            return (
              <React.Fragment key={stg.id}>
                <button
                  onClick={() => onSelectStage(stg.id)}
                  className={`px-3 py-1 rounded-md transition-all flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan font-bold shadow-sm'
                      : isCompleted
                      ? 'bg-cyber-900 border border-emerald-500/40 text-emerald-400 hover:bg-cyber-850'
                      : 'text-slate-500 hover:text-slate-300 hover:bg-cyber-900'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                    isActive ? 'bg-cyber-cyan text-cyber-950' : isCompleted ? 'bg-emerald-500 text-cyber-950' : 'bg-cyber-850 text-slate-400'
                  }`}>
                    {isCompleted ? '✓' : stg.id}
                  </span>
                  <span>{stg.name}</span>
                </button>
                {idx < stages.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Operational Guardrail Status */}
        <div className="hidden lg:flex items-center space-x-2 text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-0.5 rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>100% PASSIVE RECON // ZERO PRIVATE CITIZEN DOXING</span>
        </div>
      </div>
    </header>
  );
};
