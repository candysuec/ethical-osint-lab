import React, { useState } from 'react';
import { Inbox, CheckCircle, XCircle, ArrowUpRight, Filter, Search, Shield } from 'lucide-react';
import { Lead } from '../types';

interface LeadQueueProps {
  leads: Lead[];
  onPromoteLead: (lead: Lead) => void;
  onDismissLead: (id: string) => void;
}

export const LeadQueueView: React.FC<LeadQueueProps> = ({ leads, onPromoteLead, onDismissLead }) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredLeads = leads.filter(l => {
    const matchesStatus = filterStatus === 'ALL' || l.status === filterStatus;
    const matchesSearch = l.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.normalizedValue.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.leadCode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-cyber-border pb-4">
        <div>
          <h1 className="text-xl font-bold font-mono text-slate-100 flex items-center space-x-2">
            <Inbox className="w-5 h-5 text-amber-400" />
            <span>LEAD GENERATION & TRIAGE QUEUE</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Active telemetry intake buffer. All raw indicators require manual analyst inspection before promotion to verified case evidence.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search leads..."
              className="bg-cyber-850 border border-cyber-border rounded pl-8 pr-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyber-cyan"
            />
          </div>

          <div className="flex items-center space-x-2 bg-cyber-850 px-3 py-1.5 rounded border border-cyber-border text-xs font-mono">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none"
            >
              <option value="ALL">ALL STATUSES</option>
              <option value="QUEUED">QUEUED</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="PROMOTED_TO_EVIDENCE">PROMOTED</option>
              <option value="DISMISSED">DISMISSED</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-cyber-900 border border-cyber-border rounded-lg overflow-hidden">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-cyber-950/80 text-slate-400 uppercase tracking-wider border-b border-cyber-border">
            <tr>
              <th className="py-3 px-4">Lead ID</th>
              <th className="py-3 px-4">Modality</th>
              <th className="py-3 px-4">Normalized Value</th>
              <th className="py-3 px-4">Source Conduit</th>
              <th className="py-3 px-4">Priority</th>
              <th className="py-3 px-4">Confidence</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Triage Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyber-border/60 text-slate-300">
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-cyber-850/60 transition-colors">
                <td className="py-3 px-4 text-cyber-cyan font-bold">{lead.leadCode}</td>
                <td className="py-3 px-4">
                  <span className="bg-cyber-800 text-slate-300 px-2 py-0.5 rounded text-[10px]">
                    {lead.inputType}
                  </span>
                </td>
                <td className="py-3 px-4 max-w-xs truncate font-semibold text-slate-100">
                  {lead.normalizedValue}
                </td>
                <td className="py-3 px-4 text-slate-400 text-[11px] truncate max-w-[180px]">
                  {lead.sourceReference}
                </td>
                <td className="py-3 px-4">
                  <span className={`text-[10px] px-2 py-0.5 rounded border ${
                    lead.priority === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' :
                    lead.priority === 'HIGH' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
                    'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                  }`}>
                    {lead.priority}
                  </span>
                </td>
                <td className="py-3 px-4 text-emerald-400 font-mono">
                  {(lead.confidenceScore * 100).toFixed(0)}%
                </td>
                <td className="py-3 px-4">
                  <span className={`text-[10px] px-2 py-0.5 rounded ${
                    lead.status === 'PROMOTED_TO_EVIDENCE' ? 'bg-emerald-500/20 text-emerald-400' :
                    lead.status === 'DISMISSED' ? 'bg-slate-700 text-slate-400' :
                    lead.status === 'IN_PROGRESS' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-cyan-500/20 text-cyan-400'
                  }`}>
                    {lead.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right space-x-2">
                  {lead.status !== 'PROMOTED_TO_EVIDENCE' && (
                    <button
                      onClick={() => onPromoteLead(lead)}
                      title="Promote to Verified Evidence"
                      className="inline-flex items-center space-x-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 px-2.5 py-1 rounded text-[11px] transition-colors"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>PROMOTE</span>
                    </button>
                  )}
                  {lead.status !== 'DISMISSED' && (
                    <button
                      onClick={() => onDismissLead(lead.id)}
                      title="Dismiss as False Positive"
                      className="inline-flex items-center space-x-1 bg-slate-800 hover:bg-slate-700 text-slate-400 px-2 py-1 rounded text-[11px] transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>DISMISS</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-500">
                  No active leads matching the current filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
