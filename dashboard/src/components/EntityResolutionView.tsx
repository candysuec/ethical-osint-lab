import React, { useState } from 'react';
import { GitMerge, Split, ShieldCheck, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';
import { Entity } from '../types';

interface EntityResolutionProps {
  entities: Entity[];
  onConfirmEntity: (id: string, notes: string) => void;
}

export const EntityResolutionView: React.FC<EntityResolutionProps> = ({ entities, onConfirmEntity }) => {
  const [selectedEntityId, setSelectedEntityId] = useState<string>(entities[2]?.id || entities[0]?.id);
  const [disambiguationInput, setDisambiguationInput] = useState<string>('');

  const activeEntity = entities.find(e => e.id === selectedEntityId) || entities[0];

  // Simulated candidate collision for demonstration
  const collisionCandidate = {
    name: activeEntity.canonicalName,
    entityType: 'Disambiguation Collision Candidate',
    attributes: {
      'Corporate Registry': 'Unregistered / Personal Project',
      'Geographic Anchor': 'Unknown / Residential IP',
      'Cryptographic Anchor': 'No GPG Key or Signed DNS match'
    },
    jaccardDistance: 0.12 // Extreme low overlap
  };

  const handleResolve = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmEntity(activeEntity.id, disambiguationInput || 'Confirmed by human analyst inspection of primary anchors.');
    setDisambiguationInput('');
  };

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full max-w-6xl mx-auto">
      <div>
        <h1 className="text-xl font-bold font-mono text-slate-100 flex items-center space-x-2">
          <GitMerge className="w-5 h-5 text-purple-400" />
          <span>ENTITY RESOLUTION & HOMOGLYPH DISAMBIGUATION</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Strict Human-in-the-Loop Gate. Identities are NEVER auto-merged. Analysts must verify secondary anchors (CIK, GPG, BGP) to distinguish collisions.
        </p>
      </div>

      {/* Entity Selector Tabs */}
      <div className="flex space-x-2 border-b border-cyber-border pb-2 overflow-x-auto">
        {entities.map((ent) => (
          <button
            key={ent.id}
            onClick={() => setSelectedEntityId(ent.id)}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-colors shrink-0 flex items-center space-x-2 ${
              selectedEntityId === ent.id
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 bg-cyber-850'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${ent.isConfirmed ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
            <span>{ent.canonicalName}</span>
          </button>
        ))}
      </div>

      {/* Side-by-Side Disambiguation Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Candidate A (Target Under Investigation) */}
        <div className="bg-cyber-900 border border-cyber-cyan/50 rounded-lg p-5 space-y-4 shadow-lg shadow-cyan-950/20">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono text-cyber-cyan font-bold tracking-wider">
              TARGET CANDIDATE A (ACTIVE DOSSIER)
            </span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
              activeEntity.isConfirmed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
            }`}>
              {activeEntity.isConfirmed ? 'HUMAN CONFIRMED' : 'PENDING VALIDATION'}
            </span>
          </div>

          <div>
            <h2 className="text-base font-bold font-mono text-slate-100">{activeEntity.canonicalName}</h2>
            <div className="text-xs text-slate-400 font-mono mt-0.5">{activeEntity.entityType}</div>
          </div>

          <div className="bg-cyber-950 p-4 rounded border border-cyber-border space-y-2">
            <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
              Verified Technical Anchors:
            </div>
            {Object.entries(activeEntity.attributes).map(([key, val]) => (
              <div key={key} className="flex justify-between text-xs font-mono border-b border-cyber-border/40 pb-1">
                <span className="text-slate-400">{key}:</span>
                <span className="text-slate-200 font-semibold">{val}</span>
              </div>
            ))}
          </div>

          <div className="text-xs font-mono text-slate-400 bg-cyber-850 p-3 rounded border border-cyber-border">
            <span className="text-slate-500 block mb-0.5">DISAMBIGUATION RECORD:</span>
            <p className="text-slate-300">{activeEntity.disambiguationNotes}</p>
          </div>
        </div>

        {/* Candidate B (Potential Homoglyph / Colliding Profile) */}
        <div className="bg-cyber-900 border border-cyber-border rounded-lg p-5 space-y-4 opacity-90">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono text-amber-400 font-bold tracking-wider">
              COLLISION CANDIDATE B (FALSE POSITIVE CANDIDATE)
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-400">
              VECTOR MISMATCH
            </span>
          </div>

          <div>
            <h2 className="text-base font-bold font-mono text-slate-300">{collisionCandidate.name}</h2>
            <div className="text-xs text-slate-500 font-mono mt-0.5">{collisionCandidate.entityType}</div>
          </div>

          <div className="bg-cyber-950 p-4 rounded border border-cyber-border space-y-2">
            <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
              Observed External Anchors:
            </div>
            {Object.entries(collisionCandidate.attributes).map(([key, val]) => (
              <div key={key} className="flex justify-between text-xs font-mono border-b border-cyber-border/40 pb-1">
                <span className="text-slate-400">{key}:</span>
                <span className="text-slate-400">{val}</span>
              </div>
            ))}
          </div>

          <div className="bg-cyber-950 p-3 rounded border border-cyber-border text-xs font-mono flex items-center justify-between text-rose-400">
            <span>Jaccard Attribute Similarity Index:</span>
            <span className="font-bold">{(collisionCandidate.jaccardDistance * 100).toFixed(0)}% (NO CORRELATION)</span>
          </div>
        </div>
      </div>

      {/* Human Validation Sign-Off Form */}
      <div className="bg-cyber-850 border border-cyber-border rounded-lg p-5 space-y-4">
        <div className="flex items-center space-x-2 text-slate-200 font-mono text-sm font-bold">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>HUMAN ANALYST RESOLUTION GATEWAY</span>
        </div>

        <form onSubmit={handleResolve} className="space-y-3">
          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">
              DISAMBIGUATION REASONING & PRIMARY SOURCE CITATION
            </label>
            <textarea
              value={disambiguationInput}
              onChange={(e) => setDisambiguationInput(e.target.value)}
              placeholder="Record exact evidence verifying why this entity is distinct (e.g. CIK 0001928471 matched in SEC filing; distinct from Ohio candidate)."
              className="w-full bg-cyber-900 border border-cyber-border rounded p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyber-cyan"
              rows={3}
              required
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-[11px] font-mono text-slate-400 flex items-center space-x-1">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Automated merging is permanently disabled by system directive.</span>
            </span>

            <div className="space-x-3">
              <button
                type="button"
                className="px-4 py-2 rounded bg-cyber-900 border border-cyber-border text-slate-400 hover:text-white text-xs font-mono"
              >
                SPLIT ENTITIES
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-emerald-500 text-cyber-950 font-bold hover:bg-emerald-400 text-xs font-mono transition-colors"
              >
                CONFIRM ENTITY ATTRIBUTION
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
