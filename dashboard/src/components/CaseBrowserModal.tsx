import React, { useState } from 'react';
import { Search, X, CheckCircle, ChevronRight, Shield, Database, Lock } from 'lucide-react';
import { missionsData, Mission } from '../data/missionsData';

interface CaseBrowserModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCaseId: string;
  onSelectCase: (mission: Mission) => void;
  completedCaseIds: string[];
}

export const CaseBrowserModal: React.FC<CaseBrowserModalProps> = ({
  isOpen,
  onClose,
  currentCaseId,
  onSelectCase,
  completedCaseIds
}) => {
  const [activeTier, setActiveTier] = useState<'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'>('BEGINNER');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredCases = missionsData.filter(c => {
    const matchesTier = c.tier === activeTier;
    const matchesSearch = searchTerm === '' || 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTier && matchesSearch;
  });

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-cyber-900 border border-cyber-border rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-cyber-border flex items-center justify-between bg-cyber-950/70">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <Shield className="w-5 h-5 text-cyber-cyan" />
              <span>30 Graded Curriculum Investigation Cases</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select a standardized real-world case file to begin ethical digital footprint investigation.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-cyber-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tier Selector & Search */}
        <div className="px-6 py-3 border-b border-cyber-border bg-cyber-950/40 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-1 bg-cyber-950 p-1 rounded-lg border border-cyber-border text-xs font-mono">
            <button
              onClick={() => setActiveTier('BEGINNER')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                activeTier === 'BEGINNER'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tier 1: Foundational (Cases 01–10)
            </button>
            <button
              onClick={() => setActiveTier('INTERMEDIATE')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                activeTier === 'INTERMEDIATE'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tier 2: Intermediate (Cases 11–20)
            </button>
            <button
              onClick={() => setActiveTier('ADVANCED')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                activeTier === 'ADVANCED'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tier 3: Advanced (Cases 21–30)
            </button>
          </div>

          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search 30 cases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-cyber-950 border border-cyber-border text-slate-200 text-xs pl-9 pr-3 py-1.5 rounded-lg focus:outline-none focus:border-cyber-cyan"
            />
          </div>
        </div>

        {/* Case Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredCases.map((c) => {
            const isSelected = c.id === currentCaseId;
            const isCompleted = completedCaseIds.includes(c.id);

            return (
              <button
                key={c.id}
                onClick={() => {
                  onSelectCase(c);
                  onClose();
                }}
                className={`text-left p-4 rounded-xl border transition-all flex items-start space-x-3.5 group relative ${
                  isSelected
                    ? 'bg-cyber-850 border-cyber-cyan shadow-lg'
                    : 'bg-cyber-950/80 border-cyber-border hover:border-slate-600 hover:bg-cyber-850/50'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center text-[10px] font-mono font-bold ${
                      isSelected ? 'border-cyber-cyan text-cyber-cyan' : 'border-slate-600 text-slate-400'
                    }`}>
                      {c.caseNumber.split('-')[2]}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-cyan-400 font-bold">{c.caseNumber}</span>
                    <span className="text-slate-500 text-[11px]">{c.category}</span>
                  </div>

                  <h3 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {c.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {c.oneSentenceObjective}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-cyber-border/40">
                    <span>Target: <strong className="text-slate-300">{c.target}</strong></span>
                    <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform flex items-center space-x-0.5">
                      <span>Launch Case</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
