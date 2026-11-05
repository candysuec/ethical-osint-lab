import React from 'react';
import { Shield, ShieldAlert, Clock, Terminal, AlertTriangle } from 'lucide-react';
import { Case, TlpClassification } from '../types';

interface HeaderProps {
  currentCase: Case;
  cases: Case[];
  onSelectCase: (c: Case) => void;
  openIntakeModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentCase, cases, onSelectCase, openIntakeModal }) => {
  const getTlpBadge = (tlp: TlpClassification) => {
    switch (tlp) {
      case 'TLP:RED':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/40';
      case 'TLP:AMBER':
      case 'TLP:AMBER+STRICT':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'TLP:GREEN':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'TLP:CLEAR':
      default:
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40';
    }
  };

  return (
    <header className="h-16 border-b border-cyber-border bg-cyber-900 px-6 flex items-center justify-between z-20">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-cyber-cyan font-bold tracking-wider">
          <Shield className="w-6 h-6 text-cyber-cyan animate-pulse" />
          <span className="text-lg font-mono">SOVEREIGN//OSINT</span>
        </div>
        <span className="text-slate-600">|</span>
        
        {/* Active Case Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-mono uppercase">Active Case:</span>
          <select 
            value={currentCase.id}
            onChange={(e) => {
              const selected = cases.find(c => c.id === e.target.value);
              if (selected) onSelectCase(selected);
            }}
            className="bg-cyber-850 border border-cyber-border text-slate-200 text-sm rounded px-3 py-1 font-mono focus:outline-none focus:border-cyber-cyan"
          >
            {cases.map((c) => (
              <option key={c.id} value={c.id}>
                {c.caseNumber} - {c.title.slice(0, 38)}...
              </option>
            ))}
          </select>
        </div>

        {/* TLP Badge */}
        <div className={`px-2.5 py-0.5 rounded text-xs font-mono border ${getTlpBadge(currentCase.classification)}`}>
          {currentCase.classification}
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {/* Ethical Invariant Banner */}
        <div className="hidden lg:flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded">
          <ShieldAlert className="w-4 h-4 text-emerald-400" />
          <span>PASSIVE RECON ONLY // ZERO EXPLOITATION</span>
        </div>

        {/* UTC Clock */}
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 bg-cyber-850 px-3 py-1 rounded border border-cyber-border">
          <Clock className="w-3.5 h-3.5 text-cyber-cyan" />
          <span>2026-11-04 23:10 UTC</span>
        </div>

        {/* Quick Intake Button */}
        <button 
          onClick={openIntakeModal}
          className="flex items-center space-x-2 bg-cyber-cyan/20 hover:bg-cyber-cyan/30 text-cyber-cyan border border-cyber-cyan/50 px-3 py-1.5 rounded text-xs font-mono transition-colors"
        >
          <Terminal className="w-4 h-4" />
          <span>+ NEW INTAKE</span>
        </button>
      </div>
    </header>
  );
};
