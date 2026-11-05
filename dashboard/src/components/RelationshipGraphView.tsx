import React, { useState } from 'react';
import { Network, ZoomIn, ZoomOut, RefreshCw, Eye, Shield } from 'lucide-react';
import { Entity, EntityRelationship } from '../types';

interface RelationshipGraphProps {
  entities: Entity[];
  relationships: EntityRelationship[];
}

export const RelationshipGraphView: React.FC<RelationshipGraphProps> = ({ entities, relationships }) => {
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(entities[0] || null);
  const [activeBucket, setActiveBucket] = useState<string>('ALL');

  // Coordinates for mock visual nodes
  const nodePositions: Record<string, { x: number; y: number }> = {
    'ent-001': { x: 340, y: 160 },
    'ent-002': { x: 180, y: 320 },
    'ent-003': { x: 500, y: 320 },
    'ent-004': { x: 340, y: 440 }
  };

  const getBucketColor = (bucket: string) => {
    switch (bucket) {
      case 'Organizations': return '#06B6D4'; // cyan
      case 'Digital Presence': return '#A855F7'; // purple
      case 'Identity': return '#10B981'; // emerald
      case 'Locations': return '#F59E0B'; // amber
      default: return '#94A3B8';
    }
  };

  const filteredRelationships = relationships.filter(r => {
    if (activeBucket === 'ALL') return true;
    return r.propertyBucket === activeBucket;
  });

  return (
    <div className="p-6 space-y-6 overflow-hidden h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-cyber-border pb-4 shrink-0">
        <div>
          <h1 className="text-xl font-bold font-mono text-slate-100 flex items-center space-x-2">
            <Network className="w-5 h-5 text-cyber-cyan" />
            <span>RELATIONSHIP GRAPH VISUALIZATION (LINK ANALYSIS)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Visual topology modeling entity relationships across the 7 canonical property buckets with Admiralty confidence weights.
          </p>
        </div>

        {/* Bucket Filters */}
        <div className="flex items-center space-x-2 bg-cyber-850 p-1 rounded border border-cyber-border text-xs font-mono">
          {['ALL', 'Organizations', 'Digital Presence', 'Identity'].map((b) => (
            <button
              key={b}
              onClick={() => setActiveBucket(b)}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeBucket === b ? 'bg-cyber-cyan text-cyber-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Main Canvas & Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        {/* Canvas Area */}
        <div className="lg:col-span-3 bg-cyber-950 border border-cyber-border rounded-lg relative overflow-hidden flex items-center justify-center select-none">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>

          <svg className="w-full h-full min-h-[500px]">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#06B6D4" />
              </marker>
            </defs>

            {/* Edges */}
            {filteredRelationships.map((rel) => {
              const src = nodePositions[rel.sourceEntityId] || { x: 200, y: 200 };
              const tgt = nodePositions[rel.targetEntityId] || { x: 400, y: 400 };
              const midX = (src.x + tgt.x) / 2;
              const midY = (src.y + tgt.y) / 2;
              return (
                <g key={rel.id} className="transition-all">
                  <line 
                    x1={src.x} 
                    y1={src.y} 
                    x2={tgt.x} 
                    y2={tgt.y} 
                    stroke={getBucketColor(rel.propertyBucket)}
                    strokeWidth={Math.max(2, rel.edgeWeight * 3)}
                    strokeDasharray={rel.edgeWeight < 0.8 ? "4 4" : undefined}
                    opacity={0.8}
                    markerEnd="url(#arrow)"
                  />
                  <rect 
                    x={midX - 45} 
                    y={midY - 12} 
                    width="90" 
                    height="20" 
                    rx="4" 
                    fill="#0F172A" 
                    stroke="#1E2D4F" 
                  />
                  <text 
                    x={midX} 
                    y={midY + 2} 
                    fill="#94A3B8" 
                    fontSize="9" 
                    fontFamily="monospace" 
                    textAnchor="middle"
                  >
                    {rel.admiraltyScore} // {rel.relationshipType.slice(0, 8)}
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {entities.map((ent) => {
              const pos = nodePositions[ent.id] || { x: 300, y: 300 };
              const isSelected = selectedEntity?.id === ent.id;
              return (
                <g 
                  key={ent.id} 
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onClick={() => setSelectedEntity(ent)}
                  className="cursor-pointer group"
                >
                  <circle 
                    r={isSelected ? 26 : 22} 
                    fill="#0B111E" 
                    stroke={isSelected ? '#06B6D4' : '#1E2D4F'}
                    strokeWidth={isSelected ? 3 : 2}
                    className="transition-all group-hover:stroke-cyber-cyan"
                  />
                  <circle 
                    r={8} 
                    fill={ent.isConfirmed ? '#10B981' : '#F59E0B'} 
                  />
                  <text 
                    y={38} 
                    fill="#E2E8F0" 
                    fontSize="11" 
                    fontFamily="monospace" 
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {ent.canonicalName.slice(0, 18)}
                  </text>
                  <text 
                    y={50} 
                    fill="#64748B" 
                    fontSize="9" 
                    fontFamily="monospace" 
                    textAnchor="middle"
                  >
                    {ent.entityType.slice(0, 20)}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Graph Legend */}
          <div className="absolute bottom-4 left-4 bg-cyber-900/90 border border-cyber-border rounded p-3 text-[10px] font-mono space-y-1 backdrop-blur-sm">
            <div className="text-slate-400 font-bold mb-1">PROPERTY BUCKET LEGEND:</div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block"></span>
              <span className="text-slate-300">Organizations / M&A</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400 inline-block"></span>
              <span className="text-slate-300">Digital Presence / DNS</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
              <span className="text-slate-300">Identity / Corporate Officers</span>
            </div>
          </div>
        </div>

        {/* Node Inspector Sidebar */}
        <div className="bg-cyber-900 border border-cyber-border rounded-lg p-5 flex flex-col justify-between">
          {selectedEntity ? (
            <div className="space-y-4">
              <div className="border-b border-cyber-border pb-3">
                <span className="text-[10px] font-mono text-cyber-cyan uppercase tracking-wider block">
                  ENTITY PROPERTY INSPECTOR
                </span>
                <h2 className="text-sm font-bold font-mono text-slate-100 mt-1">
                  {selectedEntity.canonicalName}
                </h2>
                <div className="text-xs text-slate-400 font-mono">{selectedEntity.entityType}</div>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Validation Status:</span>
                  <span className={selectedEntity.isConfirmed ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                    {selectedEntity.isConfirmed ? "CONFIRMED" : "UNCONFIRMED"}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Confidence Score:</span>
                  <span className="text-cyber-cyan font-bold">{(selectedEntity.confidenceScore * 100).toFixed(1)}%</span>
                </div>
              </div>

              <div className="bg-cyber-950 p-3 rounded border border-cyber-border space-y-1.5 text-xs font-mono">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">
                  Primary Telemetry Anchors:
                </span>
                {Object.entries(selectedEntity.attributes).map(([k, v]) => (
                  <div key={k} className="border-b border-cyber-border/40 pb-1">
                    <span className="text-slate-500 block text-[10px]">{k}</span>
                    <span className="text-slate-300 break-all">{v}</span>
                  </div>
                ))}
              </div>

              <div className="text-xs font-mono text-slate-400 bg-cyber-850 p-3 rounded border border-cyber-border">
                <span className="text-slate-500 block text-[10px] mb-0.5">DISAMBIGUATION NOTE:</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">{selectedEntity.disambiguationNotes}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs font-mono">
              Click any node on the graph to inspect properties and corroboration proofs.
            </div>
          )}

          <div className="text-[10px] font-mono text-slate-500 border-t border-cyber-border pt-3">
            ISO/IEC 27037 Tamper-Proof Audit Enabled.
          </div>
        </div>
      </div>
    </div>
  );
};
