import React, { useState } from 'react';
import { Calculator, Shield, Sliders, CheckCircle, AlertTriangle } from 'lucide-react';
import { SourceReliability, InfoCredibility } from '../types';

export const ConfidenceEngineView: React.FC = () => {
  const [sourceReliability, setSourceReliability] = useState<SourceReliability>('A');
  const [infoCredibility, setInfoCredibility] = useState<InfoCredibility>('1');
  const [corroborationCount, setCorroborationCount] = useState<number>(3);
  const [monthsOld, setMonthsOld] = useState<number>(4);

  // Weight Parameters
  const [weightSource, setWeightSource] = useState<number>(0.45);
  const [weightCredibility, setWeightCredibility] = useState<number>(0.35);
  const [weightCorroboration, setWeightCorroboration] = useState<number>(0.20);

  // Normalized values
  const getSourceVal = (r: SourceReliability): number => {
    switch (r) {
      case 'A': return 1.0;
      case 'B': return 0.8;
      case 'C': return 0.6;
      case 'D': return 0.4;
      case 'E': return 0.2;
      case 'F': return 0.0;
    }
  };

  const getCredibilityVal = (c: InfoCredibility): number => {
    switch (c) {
      case '1': return 1.0;
      case '2': return 0.8;
      case '3': return 0.6;
      case '4': return 0.4;
      case '5': return 0.2;
      case '6': return 0.0;
    }
  };

  const S = getSourceVal(sourceReliability);
  const C = getCredibilityVal(infoCredibility);
  const K = Math.min(1.0, corroborationCount * 0.33);
  const stalenessPenalty = monthsOld > 24 ? Math.min(0.3, (monthsOld - 24) * 0.015) : 0.0;

  // Confidence Index Formula
  const rawCI = (weightSource * S) + (weightCredibility * C) + (weightCorroboration * K) - stalenessPenalty;
  const CI = Math.max(0.0, Math.min(1.0, rawCI));

  const getConfidenceTier = (score: number) => {
    if (score >= 0.85) return { label: 'HIGH CONFIDENCE (A1/A2 Grade)', color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-500/50' };
    if (score >= 0.60) return { label: 'MEDIUM CONFIDENCE (B2/C2 Grade)', color: 'text-amber-400', bg: 'bg-amber-950/40 border-amber-500/50' };
    return { label: 'LOW CONFIDENCE (Uncorroborated Lead)', color: 'text-rose-400', bg: 'bg-rose-950/40 border-rose-500/50' };
  };

  const tier = getConfidenceTier(CI);

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full max-w-5xl mx-auto">
      <div>
        <h1 className="text-xl font-bold font-mono text-slate-100 flex items-center space-x-2">
          <Calculator className="w-5 h-5 text-cyber-cyan" />
          <span>MATHEMATICAL CONFIDENCE SCORING ENGINE</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Objective algorithmic scoring preventing human cognitive bias. Calculates Confidence Index (CI) using NATO STANAG 2022 inputs, corroboration factors, and temporal staleness penalties.
        </p>
      </div>

      {/* Formula Display Banner */}
      <div className="bg-cyber-950 p-4 rounded-lg border border-cyber-border font-mono text-xs text-slate-300 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-slate-500 block text-[10px] uppercase">Active Scoring Algorithm:</span>
          <span className="text-cyber-cyan font-bold text-sm">
            CI = (W_S × S) + (W_C × C) + (W_K × K) - P_staleness
          </span>
        </div>
        <div className="text-[11px] text-slate-400">
          Normalized Output: <span className="text-slate-100 font-bold">0.0000 to 1.0000</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Parameters Box */}
        <div className="bg-cyber-900 border border-cyber-border rounded-lg p-5 space-y-4">
          <div className="flex items-center space-x-2 border-b border-cyber-border pb-3">
            <Sliders className="w-4 h-4 text-cyber-cyan" />
            <span className="text-xs font-mono font-bold text-slate-200">INVESTIGATIVE VARIABLES</span>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Source Reliability (S):</span>
                <span className="text-cyber-cyan font-bold">{sourceReliability} ({(S * 100).toFixed(0)}%)</span>
              </div>
              <select
                value={sourceReliability}
                onChange={(e) => setSourceReliability(e.target.value as SourceReliability)}
                className="w-full bg-cyber-850 border border-cyber-border rounded px-3 py-2 text-slate-200 focus:outline-none"
              >
                <option value="A">A - Completely Reliable (Official Regulatory / Root DNS)</option>
                <option value="B">B - Usually Reliable (Major CTI Feed / Verified Media)</option>
                <option value="C">C - Fairly Reliable (Independent Researcher Blog)</option>
                <option value="D">D - Not Usually Reliable (Unverified Pastebin)</option>
                <option value="E">E - Unreliable (Known Disinformation Outlet)</option>
                <option value="F">F - Reliability Cannot Be Judged (Unknown Source)</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Information Credibility (C):</span>
                <span className="text-cyber-cyan font-bold">{infoCredibility} ({(C * 100).toFixed(0)}%)</span>
              </div>
              <select
                value={infoCredibility}
                onChange={(e) => setInfoCredibility(e.target.value as InfoCredibility)}
                className="w-full bg-cyber-850 border border-cyber-border rounded px-3 py-2 text-slate-200 focus:outline-none"
              >
                <option value="1">1 - Confirmed by Other Sources</option>
                <option value="2">2 - Probably True (Indirect Technical Telemetry)</option>
                <option value="3">3 - Possibly True (Plausible Profile)</option>
                <option value="4">4 - Doubtful (Contradicts DNS / Records)</option>
                <option value="5">5 - Improbable (Technically Impossible)</option>
                <option value="6">6 - Truth Cannot Be Judged</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Independent Technical Corroborations (K):</span>
                <span className="text-cyber-cyan font-bold">{corroborationCount} Sources ({(K * 100).toFixed(0)}%)</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={corroborationCount}
                onChange={(e) => setCorroborationCount(parseInt(e.target.value))}
                className="w-full accent-cyber-cyan cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Record Age / Staleness:</span>
                <span className="text-slate-200 font-bold">{monthsOld} Months {monthsOld > 24 && <span className="text-rose-400 font-normal">(-{(stalenessPenalty * 100).toFixed(1)}% penalty)</span>}</span>
              </div>
              <input
                type="range"
                min="1"
                max="48"
                value={monthsOld}
                onChange={(e) => setMonthsOld(parseInt(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Engine Output & Governance Recommendation */}
        <div className="bg-cyber-900 border border-cyber-border rounded-lg p-5 space-y-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              COMPUTED CONFIDENCE SCORE
            </div>

            <div className={`p-5 rounded-lg border text-center space-y-2 ${tier.bg}`}>
              <div className="text-4xl font-extrabold font-mono text-slate-100">
                {(CI * 100).toFixed(1)}%
              </div>
              <div className={`text-xs font-mono font-bold ${tier.color}`}>
                {tier.label}
              </div>
            </div>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="text-slate-400 font-bold border-b border-cyber-border pb-1">
              OPERATIONAL REPORTING ACTION:
            </div>
            {CI >= 0.85 ? (
              <div className="text-emerald-400 space-y-1">
                <div className="flex items-center space-x-1 font-bold">
                  <CheckCircle className="w-4 h-4" />
                  <span>Approved for Executive Briefing Inclusion</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Meets NATO STANAG high-confidence threshold. Supported by multi-source cryptographic or official regulatory filings.
                </p>
              </div>
            ) : CI >= 0.60 ? (
              <div className="text-amber-400 space-y-1">
                <div className="flex items-center space-x-1 font-bold">
                  <Shield className="w-4 h-4" />
                  <span>Requires Secondary Corroboration</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Permitted in Technical Annexes with clear uncertainty disclosure. Secondary DNS or CT log proof recommended.
                </p>
              </div>
            ) : (
              <div className="text-rose-400 space-y-1">
                <div className="flex items-center space-x-1 font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Quarantined: Internal Lead Only</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Below defensibility threshold. Prohibited from C-suite deliverables to prevent false alarms.
                </p>
              </div>
            )}
          </div>

          <div className="text-[10px] font-mono text-slate-500 border-t border-cyber-border pt-3">
            Advisory Council Directive: Subjective inflation of scores is permanently audited.
          </div>
        </div>
      </div>
    </div>
  );
};
