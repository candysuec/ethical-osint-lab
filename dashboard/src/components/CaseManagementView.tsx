import React, { useState } from 'react';
import { FolderKanban, Plus, Filter, Shield, AlertTriangle, UserCheck, Calendar } from 'lucide-react';
import { Case, PriorityLevel, TlpClassification } from '../types';

interface CaseManagementProps {
  cases: Case[];
  currentCase: Case;
  onSelectCase: (c: Case) => void;
  onCreateCase: (newCase: Case) => void;
}

export const CaseManagementView: React.FC<CaseManagementProps> = ({ 
  cases, 
  currentCase, 
  onSelectCase, 
  onCreateCase 
}) => {
  const [filterPriority, setFilterPriority] = useState<string>('ALL');
  const [showNewModal, setShowNewModal] = useState<boolean>(false);

  // New Case Form State
  const [newTitle, setNewTitle] = useState('');
  const [newTarget, setNewTarget] = useState('');
  const [newPriority, setNewPriority] = useState<PriorityLevel>('HIGH');
  const [newTlp, setNewTlp] = useState<TlpClassification>('TLP:AMBER');
  const [newPir1, setNewPir1] = useState('');
  const [newPir2, setNewPir2] = useState('');

  const filteredCases = cases.filter(c => {
    if (filterPriority === 'ALL') return true;
    return c.priority === filterPriority;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newTarget) return;

    const created: Case = {
      id: `case-${Date.now()}`,
      caseNumber: `CASE-2026-0${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle,
      classification: newTlp,
      status: 'ACTIVE_INVESTIGATION',
      priority: newPriority,
      leadAnalyst: 'Lead_Investigator_Chevalier',
      targetEntity: newTarget,
      targetType: 'COMPANY_NAME',
      pirs: [newPir1 || 'PIR 1: Map external attack surface.', newPir2 || 'PIR 2: Verify email security posture.'],
      legalNotes: 'Strict defensive OSINT. Zero unauthorized intrusion or active scanning.',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
      updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
    };

    onCreateCase(created);
    setShowNewModal(false);
    setNewTitle('');
    setNewTarget('');
  };

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-cyber-border pb-4">
        <div>
          <h1 className="text-xl font-bold font-mono text-slate-100 flex items-center space-x-2">
            <FolderKanban className="w-5 h-5 text-cyber-cyan" />
            <span>INVESTIGATION CASE MANAGEMENT</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Enterprise case queue supporting multi-investigation tracking and Priority Intelligence Requirements (PIRs).
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-cyber-850 px-3 py-1.5 rounded border border-cyber-border text-xs font-mono">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select 
              value={filterPriority} 
              onChange={(e) => setFilterPriority(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none"
            >
              <option value="ALL">ALL PRIORITIES</option>
              <option value="CRITICAL">CRITICAL</option>
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
          </div>

          <button 
            onClick={() => setShowNewModal(true)}
            className="flex items-center space-x-1.5 bg-cyber-cyan text-cyber-950 font-bold px-3 py-1.5 rounded text-xs font-mono hover:bg-cyan-400 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>INITIALIZE CASE</span>
          </button>
        </div>
      </div>

      {/* Case Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCases.map((c) => {
          const isSelected = c.id === currentCase.id;
          return (
            <div 
              key={c.id}
              onClick={() => onSelectCase(c)}
              className={`p-4 rounded-lg border transition-all cursor-pointer ${
                isSelected 
                  ? 'bg-cyber-850 border-cyber-cyan shadow-lg shadow-cyan-950/40 ring-1 ring-cyber-cyan' 
                  : 'bg-cyber-900 border-cyber-border hover:border-slate-600'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono text-cyber-cyan font-bold">{c.caseNumber}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  c.priority === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' :
                  c.priority === 'HIGH' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
                  'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                }`}>
                  {c.priority}
                </span>
              </div>

              <h2 className="text-sm font-semibold text-slate-200 mt-2 line-clamp-1">{c.title}</h2>
              <div className="text-xs text-slate-400 font-mono mt-1">Target: {c.targetEntity}</div>

              {/* PIR Summary */}
              <div className="mt-3 pt-3 border-t border-cyber-border/60">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Active PIRs ({c.pirs.length}):
                </div>
                <div className="text-xs text-slate-400 line-clamp-2">
                  {c.pirs[0]}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span className="flex items-center space-x-1">
                  <UserCheck className="w-3 h-3" />
                  <span>{c.leadAnalyst.slice(0, 15)}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{c.createdAt.slice(0, 10)}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Case Details for Active Selection */}
      <div className="bg-cyber-900 border border-cyber-border rounded-lg p-5 mt-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-cyber-cyan" />
            <span className="font-mono font-bold text-slate-200">ACTIVE DOSSIER OVERVIEW: {currentCase.caseNumber}</span>
          </div>
          <span className="text-xs font-mono text-slate-400">{currentCase.status}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-cyber-850 p-3 rounded border border-cyber-border">
            <span className="text-slate-500 block mb-1">PRIORITY INTELLIGENCE REQUIREMENTS:</span>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              {currentCase.pirs.map((pir, i) => (
                <li key={i}>{pir}</li>
              ))}
            </ul>
          </div>
          <div className="bg-cyber-850 p-3 rounded border border-cyber-border">
            <span className="text-slate-500 block mb-1">LEGAL BOUNDARIES & ENGAGEMENT RULES:</span>
            <p className="text-slate-300 leading-relaxed">{currentCase.legalNotes}</p>
          </div>
        </div>
      </div>

      {/* Initialize Case Modal */}
      {showNewModal && (
        <div className="fixed inset-0 bg-cyber-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-cyber-900 border border-cyber-cyan rounded-lg max-w-lg w-full p-6 shadow-2xl">
            <h2 className="text-base font-bold font-mono text-slate-100 mb-4">INITIALIZE NEW OSINT INVESTIGATION</h2>
            <form onSubmit={handleCreate} className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-slate-400 block mb-1">CASE TITLE</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Acme Corporation - Supply Chain Attack Surface"
                  className="w-full bg-cyber-850 border border-cyber-border rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-cyber-cyan"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">PRIMARY TARGET ENTITY</label>
                <input 
                  type="text" 
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  placeholder="e.g. Acme Global Inc. or acme-corp.com"
                  className="w-full bg-cyber-850 border border-cyber-border rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-cyber-cyan"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 block mb-1">PRIORITY</label>
                  <select 
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as PriorityLevel)}
                    className="w-full bg-cyber-850 border border-cyber-border rounded px-3 py-2 text-slate-200"
                  >
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">TLP LEVEL</label>
                  <select 
                    value={newTlp}
                    onChange={(e) => setNewTlp(e.target.value as TlpClassification)}
                    className="w-full bg-cyber-850 border border-cyber-border rounded px-3 py-2 text-slate-200"
                  >
                    <option value="TLP:CLEAR">TLP:CLEAR</option>
                    <option value="TLP:GREEN">TLP:GREEN</option>
                    <option value="TLP:AMBER">TLP:AMBER</option>
                    <option value="TLP:RED">TLP:RED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">PIR 1 (Priority Intelligence Requirement)</label>
                <input 
                  type="text" 
                  value={newPir1}
                  onChange={(e) => setNewPir1(e.target.value)}
                  placeholder="e.g. Enumerate all external subdomains via CT logs."
                  className="w-full bg-cyber-850 border border-cyber-border rounded px-3 py-2 text-slate-200"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-cyber-border">
                <button 
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 rounded bg-cyber-850 text-slate-400 hover:text-slate-200"
                >
                  CANCEL
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded bg-cyber-cyan text-cyber-950 font-bold hover:bg-cyan-400"
                >
                  CREATE CASE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
