import React, { useState } from 'react';
import { History, Calendar, FileText, CheckCircle, Shield, Filter } from 'lucide-react';
import { TimelineEvent } from '../types';

interface TimelineProps {
  timeline: TimelineEvent[];
}

export const TimelineView: React.FC<TimelineProps> = ({ timeline }) => {
  const [filterType, setFilterType] = useState<string>('ALL');

  const filtered = timeline.filter(t => {
    if (filterType === 'ALL') return true;
    return t.eventType === filterType;
  });

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-cyber-border pb-4">
        <div>
          <h1 className="text-xl font-bold font-mono text-slate-100 flex items-center space-x-2">
            <History className="w-5 h-5 text-cyber-cyan" />
            <span>CHRONOLOGICAL INTELLIGENCE TIMELINE</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Temporal event ordering reconstructing organizational restructuring, certificate renewals, DNS modifications, and disclosures.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-cyber-850 px-3 py-1.5 rounded border border-cyber-border text-xs font-mono">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-transparent text-slate-200 focus:outline-none"
          >
            <option value="ALL">ALL EVENT TYPES</option>
            <option value="ACQUISITION">ACQUISITIONS</option>
            <option value="CERT_ISSUED">CERTIFICATES</option>
            <option value="DNS_DRIFT">DNS DRIFT</option>
            <option value="FILING_SUBMITTED">FILINGS</option>
          </select>
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 border-l-2 border-cyber-border/80 space-y-8 my-6">
        {filtered.map((item, idx) => (
          <div key={item.id} className="relative group">
            {/* Pulsing Timeline Node */}
            <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-cyber-950 border-2 border-cyber-cyan group-hover:scale-125 transition-transform flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-cyber-cyan"></div>
            </div>

            {/* Event Card */}
            <div className="bg-cyber-900 border border-cyber-border rounded-lg p-4 space-y-2 hover:border-cyber-cyan/50 transition-colors shadow-md">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-cyber-cyan" />
                  <span className="font-bold text-slate-200">{item.eventTimestamp}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-800 text-slate-300">
                    {item.eventType}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    {item.confidenceScore}
                  </span>
                </div>
              </div>

              <h2 className="text-sm font-bold font-mono text-slate-100">{item.title}</h2>
              <p className="text-xs text-slate-300 font-mono leading-relaxed">{item.description}</p>

              {item.evidenceId && (
                <div className="pt-2 border-t border-cyber-border/40 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Linked Artifact: {item.evidenceId}</span>
                  <span className="text-emerald-400 flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Cryptographically Corroborated</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
