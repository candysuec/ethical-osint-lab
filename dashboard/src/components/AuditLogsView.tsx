import React, { useState } from 'react';
import { Activity, ShieldCheck, Search, Filter, Lock } from 'lucide-react';
import { AuditLog } from '../types';

interface AuditLogsProps {
  logs: AuditLog[];
}

export const AuditLogsView: React.FC<AuditLogsProps> = ({ logs }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filtered = logs.filter(l => 
    l.actionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.deltaSummary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-cyber-border pb-4">
        <div>
          <h1 className="text-xl font-bold font-mono text-slate-100 flex items-center space-x-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <span>IMMUTABLE AUDIT LOG & COMPLIANCE LEDGER</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tamper-evident record of all analyst actions, entity confirmations, evidence verifications, and report exports.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-emerald-950/40 border border-emerald-600/40 text-emerald-400 text-xs font-mono px-3 py-1.5 rounded">
          <Lock className="w-3.5 h-3.5" />
          <span>WORM LOG ARCHIVE (WRITE ONCE, READ MANY)</span>
        </div>
      </div>

      <div className="relative">
        <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter audit actions, analyst IDs, or delta descriptions..."
          className="w-full bg-cyber-900 border border-cyber-border rounded pl-9 pr-4 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyber-cyan"
        />
      </div>

      {/* Log Feed */}
      <div className="bg-cyber-900 border border-cyber-border rounded-lg overflow-hidden divide-y divide-cyber-border/60">
        {filtered.map((log) => (
          <div key={log.id} className="p-4 hover:bg-cyber-850/60 transition-colors flex items-start justify-between text-xs font-mono">
            <div className="space-y-1 pr-4">
              <div className="flex items-center space-x-2">
                <span className="bg-cyber-800 text-cyber-cyan font-bold px-2 py-0.5 rounded text-[10px]">
                  {log.actionType}
                </span>
                <span className="text-slate-200 font-semibold">{log.deltaSummary}</span>
              </div>
              <div className="text-[11px] text-slate-500 flex items-center space-x-4 pt-1">
                <span>User: <span className="text-slate-400">{log.userId}</span></span>
                <span>Target: <span className="text-slate-400">{log.targetTable}</span></span>
                <span>Client IP: <span className="text-slate-400">{log.clientIp}</span></span>
              </div>
            </div>

            <div className="text-[10px] text-slate-500 shrink-0 font-mono">
              {log.timestamp}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="p-8 text-center text-slate-500 text-xs font-mono">
            No audit records matching search criteria.
          </div>
        )}
      </div>
    </div>
  );
};
