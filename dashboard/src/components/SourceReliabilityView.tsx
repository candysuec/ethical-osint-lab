import React, { useState } from 'react';
import { Award, ExternalLink, ShieldCheck, HelpCircle } from 'lucide-react';
import { Source, SourceReliability, InfoCredibility } from '../types';

interface SourceReliabilityProps {
  sources: Source[];
}

export const SourceReliabilityView: React.FC<SourceReliabilityProps> = ({ sources }) => {
  const [selectedCell, setSelectedCell] = useState<{ r: SourceReliability; c: InfoCredibility }>({ r: 'A', c: '1' });

  const reliabilityDescriptions: Record<SourceReliability, { title: string; desc: string }> = {
    'A': { title: 'Completely Reliable', desc: 'Proven integrity, official legal authority, signed cryptographic data (SEC EDGAR, Root DNS).' },
    'B': { title: 'Usually Reliable', desc: 'Established CTI aggregators, major media with proven fact-checking, BGPView, Censys.' },
    'C': { title: 'Fairly Reliable', desc: 'Independent researcher writeups, community GitHub repos, unverified technical blogs.' },
    'D': { title: 'Not Usually Reliable', desc: 'Anonymous paste bins, leak channels, unvetted forums.' },
    'E': { title: 'Unreliable', desc: 'Documented disinformation channels, state-sponsored deception outlets, doppelgänger news.' },
    'F': { title: 'Reliability Cannot Be Judged', desc: 'New, untracked, or unprecedented source with zero historical baseline.' }
  };

  const credibilityDescriptions: Record<InfoCredibility, { title: string; desc: string }> = {
    '1': { title: 'Confirmed by Other Sources', desc: 'Corroborated by ≥ 2 independent disparate technical conduits (e.g. DNS + CT log).' },
    '2': { title: 'Probably True', desc: 'Logically consistent with known adversary behavior and indirect telemetry.' },
    '3': { title: 'Possibly True', desc: 'Plausible and compatible with target profile, but lacks direct technical corroboration.' },
    '4': { title: 'Doubtful', desc: 'Contradicts verified records or established networking principles.' },
    '5': { title: 'Improbable', desc: 'Factually impossible or demonstrably fabricated.' },
    '6': { title: 'Truth Cannot Be Judged', desc: 'Ambiguous claim with zero available corroborating telemetry.' }
  };

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full max-w-6xl mx-auto">
      <div>
        <h1 className="text-xl font-bold font-mono text-slate-100 flex items-center space-x-2">
          <Award className="w-5 h-5 text-amber-400" />
          <span>SOURCE RELIABILITY & ADMIRALTY 6×6 CONFIDENCE MODEL</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          NATO STANAG 2022 Joint Intelligence Standard. Every finding is evaluated across Source Reliability (A–F) and Information Credibility (1–6).
        </p>
      </div>

      {/* Ground Truth & Anti-Synthetic Reality Drift Anchor */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono space-y-2">
        <div className="flex items-center gap-2 text-amber-300 font-bold uppercase tracking-wider">
          <span className="text-sm">⚓</span>
          <span>Law 5 Invariant: Ground Truth Over Synthetic Coherence</span>
        </div>
        <p className="text-slate-300 leading-relaxed font-sans">
          <strong>Coherence is not contact.</strong> A fluent, beautifully worded AI summary does <em>not</em> constitute factual intelligence. In defensive OSINT, accepting synthetic coherence without primary-source proof causes catastrophic reality drift. 
          To reach <strong>A1 (Confirmed Fact)</strong>, a claim must be anchored by <strong>ISO/IEC 27037 SHA-256 cryptographic hashes</strong> and corroborated by at least two independent primary-source technical conduits (e.g., authoritative root DNS zone + RFC 6962 CT logbook). 
          Unverified AI claims or single uncorroborated leads permanently default to <strong>F6 (Truth Cannot Be Judged)</strong>.
        </p>
      </div>

      {/* Interactive 6x6 Matrix */}
      <div className="bg-cyber-900 border border-cyber-border rounded-lg p-5 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-mono text-cyber-cyan font-bold tracking-wider">
            INTERACTIVE NATO STANAG 2022 ADMIRALTY MATRIX
          </span>
          <span className="text-xs font-mono text-slate-400">
            Selected Score: <span className="text-amber-400 font-bold text-sm">{selectedCell.r}{selectedCell.c}</span>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs font-mono border-collapse">
            <thead>
              <tr className="bg-cyber-950 text-slate-400">
                <th className="p-2 border border-cyber-border text-left">Reliability \ Credibility</th>
                <th className="p-2 border border-cyber-border">1 (Confirmed)</th>
                <th className="p-2 border border-cyber-border">2 (Probably)</th>
                <th className="p-2 border border-cyber-border">3 (Possibly)</th>
                <th className="p-2 border border-cyber-border">4 (Doubtful)</th>
                <th className="p-2 border border-cyber-border">5 (Improbable)</th>
                <th className="p-2 border border-cyber-border">6 (Unknown)</th>
              </tr>
            </thead>
            <tbody>
              {(['A', 'B', 'C', 'D', 'E', 'F'] as SourceReliability[]).map((r) => (
                <tr key={r}>
                  <td className="p-2 border border-cyber-border text-left font-bold text-slate-300 bg-cyber-950">
                    {r} - {reliabilityDescriptions[r].title.slice(0, 18)}
                  </td>
                  {(['1', '2', '3', '4', '5', '6'] as InfoCredibility[]).map((c) => {
                    const isSelected = selectedCell.r === r && selectedCell.c === c;
                    const isHigh = (r === 'A' || r === 'B') && (c === '1' || c === '2');
                    return (
                      <td
                        key={c}
                        onClick={() => setSelectedCell({ r, c })}
                        className={`p-3 border border-cyber-border cursor-pointer transition-all font-bold ${
                          isSelected
                            ? 'bg-amber-500/30 text-amber-300 ring-2 ring-amber-400'
                            : isHigh
                            ? 'bg-emerald-950/20 text-emerald-400 hover:bg-emerald-900/40'
                            : 'text-slate-400 hover:bg-cyber-850'
                        }`}
                      >
                        {r}{c}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected Cell Detail Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-cyber-950 p-4 rounded border border-cyber-border text-xs font-mono">
          <div>
            <span className="text-slate-500 block mb-0.5">SOURCE RELIABILITY ({selectedCell.r}):</span>
            <span className="text-slate-200 font-bold">{reliabilityDescriptions[selectedCell.r].title}</span>
            <p className="text-slate-400 mt-1">{reliabilityDescriptions[selectedCell.r].desc}</p>
          </div>
          <div>
            <span className="text-slate-500 block mb-0.5">INFORMATION CREDIBILITY ({selectedCell.c}):</span>
            <span className="text-slate-200 font-bold">{credibilityDescriptions[selectedCell.c].title}</span>
            <p className="text-slate-400 mt-1">{credibilityDescriptions[selectedCell.c].desc}</p>
          </div>
        </div>
      </div>

      {/* Catalog of Vetted Active Sources */}
      <div className="bg-cyber-900 border border-cyber-border rounded-lg p-5 space-y-4">
        <span className="text-xs font-mono text-cyber-cyan font-bold tracking-wider block">
          CATALOGED REPUTABLE PASSIVE CONDUITS ({sources.length})
        </span>

        <div className="divide-y divide-cyber-border/60">
          {sources.map((src) => (
            <div key={src.id} className="py-3 flex items-start justify-between text-xs font-mono">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-slate-200 font-semibold">{src.name}</span>
                  <span className="bg-cyber-800 text-slate-400 px-2 py-0.5 rounded text-[10px]">
                    {src.category}
                  </span>
                </div>
                <div className="text-slate-500 text-[11px]">{src.baseUrl}</div>
                <div className="text-slate-400 text-[11px]">Validation: {src.validationProtocol}</div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded font-bold">
                  Baseline: {src.baselineReliability}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
