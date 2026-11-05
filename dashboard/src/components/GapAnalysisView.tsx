import React from 'react';
import { AlertOctagon, CheckCircle2, ShieldAlert, AlertTriangle, ArrowRight } from 'lucide-react';
import { GapAnalysis } from '../types';

interface GapAnalysisProps {
  gaps: GapAnalysis[];
  onResolveGap: (id: string) => void;
}

export const GapAnalysisView: React.FC<GapAnalysisProps> = ({ gaps, onResolveGap }) => {
  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'BLOCKING':
      case 'HIGH':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/40';
      case 'MEDIUM':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      default:
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40';
    }
  };

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-cyber-border pb-4">
        <div>
          <h1 className="text-xl font-bold font-mono text-slate-100 flex items-center space-x-2">
            <AlertOctagon className="w-5 h-5 text-rose-400" />
            <span>INVESTIGATIVE GAP & BLIND SPOT ANALYSIS ENGINE</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Automated detection of single-source traps, stale telemetry, obscured origin IPs, and uncorroborated hypotheses.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-rose-950/40 border border-rose-600/40 text-rose-400 text-xs font-mono px-3 py-1.5 rounded">
          <AlertTriangle className="w-4 h-4" />
          <span>ACTIVE GAPS: {gaps.filter(g => !g.isResolved).length}</span>
        </div>
      </div>

      <div className="space-y-4">
        {gaps.map((gap) => (
          <div 
            key={gap.id}
            className={`bg-cyber-900 border rounded-lg p-5 space-y-3 transition-colors ${
              gap.isResolved ? 'border-cyber-border opacity-60' : 'border-cyber-border hover:border-slate-600'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getSeverityBadge(gap.severity)}`}>
                  {gap.severity}
                </span>
                <span className="text-xs font-mono text-slate-400 bg-cyber-800 px-2 py-0.5 rounded">
                  {gap.gapType}
                </span>
                <h2 className="text-sm font-bold font-mono text-slate-200">{gap.title}</h2>
              </div>

              {gap.isResolved ? (
                <span className="text-emerald-400 text-xs font-mono flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>RESOLVED</span>
                </span>
              ) : (
                <button
                  onClick={() => onResolveGap(gap.id)}
                  className="text-xs font-mono bg-cyber-850 hover:bg-cyber-800 text-cyber-cyan border border-cyber-cyan/40 px-3 py-1 rounded transition-colors"
                >
                  RESOLVE GAP
                </button>
              )}
            </div>

            <p className="text-xs text-slate-300 font-mono leading-relaxed bg-cyber-950 p-3 rounded border border-cyber-border">
              {gap.description}
            </p>

            <div className="flex items-start space-x-2 text-xs font-mono text-cyber-cyan bg-cyber-850 p-2.5 rounded border border-cyber-border">
              <ArrowRight className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">RECOMMENDED COLLECTION ACTION:</span>
                <span>{gap.recommendedAction}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
