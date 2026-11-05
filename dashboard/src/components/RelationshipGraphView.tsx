import React, { useState } from 'react';
import { Network, ZoomIn, ZoomOut, RefreshCw, Eye, Shield, GitFork, ArrowUpRight, Plus, ExternalLink } from 'lucide-react';
import { Entity, EntityRelationship } from '../types';

interface RelationshipGraphProps {
  entities: Entity[];
  relationships: EntityRelationship[];
  onAddEntity?: (entity: Entity) => void;
}

export const RelationshipGraphView: React.FC<RelationshipGraphProps> = ({ 
  entities: initialEntities, 
  relationships: initialRelationships,
  onAddEntity
}) => {
  const [entities, setEntities] = useState<Entity[]>(initialEntities);
  const [relationships, setRelationships] = useState<EntityRelationship[]>(initialRelationships);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(initialEntities[0] || null);
  const [activeBucket, setActiveBucket] = useState<string>('ALL');
  const [pivotNotification, setPivotNotification] = useState<string | null>(null);

  // Dynamic node positions
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({
    'ent-001': { x: 340, y: 160 },
    'ent-002': { x: 180, y: 320 },
    'ent-003': { x: 500, y: 320 },
    'ent-004': { x: 340, y: 440 }
  });

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

  // Maltego-style interactive pivot transforms
  const executePivotTransform = (transformType: 'DNS' | 'WHOIS' | 'ASN' | 'OFFICERS') => {
    if (!selectedEntity) return;

    let newEnt: Entity;
    let relType: string;
    let bucket: 'Identity' | 'Locations' | 'Organizations' | 'Digital Presence' = 'Digital Presence';

    if (transformType === 'DNS') {
      newEnt = {
        id: `ent-${Date.now()}`,
        caseId: selectedEntity.caseId,
        canonicalName: `ns1.${selectedEntity.canonicalName.toLowerCase().replace(/[^a-z0-9]/g, '')}.net`,
        entityType: 'Authoritative Name Server',
        isConfirmed: true,
        confidenceScore: 0.95,
        attributes: {
          'Zone Authority': 'BIND 9.18 Anycast',
          'IP Origin': '198.51.100.53',
          'Corroboration': 'IANA Root Zone Ledger'
        },
        disambiguationNotes: `Extracted via passive authoritative DNS pivot from ${selectedEntity.canonicalName}.`
      };
      relType = 'AUTHORITATIVE_NAMESERVER';
      bucket = 'Digital Presence';
    } else if (transformType === 'ASN') {
      newEnt = {
        id: `ent-${Date.now()}`,
        caseId: selectedEntity.caseId,
        canonicalName: 'AS54113 (Autonomous System)',
        entityType: 'BGP Routing Origin',
        isConfirmed: true,
        confidenceScore: 0.98,
        attributes: {
          'BGP Prefix': '151.101.0.0/16',
          'Announced RPKI': 'VALID (ROA Verified)',
          'Registrar': 'ARIN Public Allocation'
        },
        disambiguationNotes: `BGP routing origin discovered for ${selectedEntity.canonicalName}.`
      };
      relType = 'ROUTES_TRAFFIC_VIA';
      bucket = 'Digital Presence';
    } else if (transformType === 'WHOIS') {
      newEnt = {
        id: `ent-${Date.now()}`,
        caseId: selectedEntity.caseId,
        canonicalName: 'CSC Corporate Domains Inc.',
        entityType: 'Enterprise Registrar',
        isConfirmed: true,
        confidenceScore: 0.92,
        attributes: {
          'Registrar IANA ID': '299',
          'Abuse Contact': 'domainabuse@cscglobal.com',
          'Historical Status': 'Privacy Unmasked (2018-2026)'
        },
        disambiguationNotes: `Registrar entity extracted from historical WHOIS records.`
      };
      relType = 'REGISTERED_THROUGH';
      bucket = 'Organizations';
    } else {
      newEnt = {
        id: `ent-${Date.now()}`,
        caseId: selectedEntity.caseId,
        canonicalName: 'Eleanor Vance (Chief Security Officer)',
        entityType: 'Corporate Officer',
        isConfirmed: true,
        confidenceScore: 0.88,
        attributes: {
          'SEC CIK Match': '0001948210',
          'Public PGP Key': '0x94A18291B012',
          'Interlock Count': '2 Board Directorships'
        },
        disambiguationNotes: `Mapped corporate officer from regulatory SEC Form 10-K Exhibit 21 filings.`
      };
      relType = 'GOVERNED_BY_OFFICER';
      bucket = 'Identity';
    }

    // Calculate next node position in radial layout
    const count = entities.length;
    const angle = (count * 65 * Math.PI) / 180;
    const parentPos = nodePositions[selectedEntity.id] || { x: 340, y: 260 };
    const newX = Math.max(80, Math.min(600, Math.round(parentPos.x + 160 * Math.cos(angle))));
    const newY = Math.max(80, Math.min(480, Math.round(parentPos.y + 160 * Math.sin(angle))));

    const newRel: EntityRelationship = {
      id: `rel-${Date.now()}`,
      sourceEntityId: selectedEntity.id,
      targetEntityId: newEnt.id,
      relationshipType: relType,
      propertyBucket: bucket,
      edgeWeight: 1,
      admiraltyScore: 'A1',
      corroborationCount: 2
    };

    setEntities(prev => [...prev, newEnt]);
    setRelationships(prev => [...prev, newRel]);
    setNodePositions(prev => ({ ...prev, [newEnt.id]: { x: newX, y: newY } }));
    if (onAddEntity) onAddEntity(newEnt);

    setPivotNotification(`Executed Transform: Pivoted to ${newEnt.canonicalName} (Linked to ${selectedEntity.canonicalName})`);
    setTimeout(() => setPivotNotification(null), 3500);
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-hidden h-full flex flex-col font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-cyber-border pb-4 shrink-0">
        <div>
          <h1 className="text-lg sm:text-xl font-bold font-mono text-slate-100 flex items-center space-x-2">
            <Network className="w-5 h-5 text-cyber-cyan" />
            <span>RELATIONSHIP GRAPH (MALTEGO-STYLE VISUAL PIVOTS)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Right-click or use the Transform Palette to execute visual pivots across DNS, WHOIS, BGP ASNs, and Corporate Directorships.
          </p>
        </div>

        {/* Bucket Filters */}
        <div className="flex items-center space-x-1.5 bg-cyber-850 p-1 rounded-lg border border-cyber-border text-xs font-mono">
          {['ALL', 'Organizations', 'Digital Presence', 'Identity'].map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setActiveBucket(b)}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                activeBucket === b ? 'bg-cyber-cyan text-cyber-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Transform Notification Toast */}
      {pivotNotification && (
        <div className="bg-cyan-950/90 border border-cyan-500/60 rounded-lg p-2.5 text-xs font-mono text-cyan-200 flex items-center space-x-2 shadow-lg animate-in slide-in-from-top duration-150">
          <GitFork className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="truncate">{pivotNotification}</span>
        </div>
      )}

      {/* Main Canvas & Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 flex-1 min-h-0">
        {/* Canvas Area */}
        <div className="lg:col-span-3 bg-cyber-950 border border-cyber-border rounded-xl relative overflow-hidden flex items-center justify-center select-none shadow-inner">
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>

          <svg className="w-full h-full min-h-[480px]">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#06B6D4" />
              </marker>
            </defs>

            {/* Render Edges */}
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
                    stroke="#1e293b" 
                    strokeWidth="2" 
                    markerEnd="url(#arrow)"
                  />
                  <rect 
                    x={midX - 45} 
                    y={midY - 9} 
                    width="90" 
                    height="18" 
                    rx="4" 
                    fill="#0f172a" 
                    stroke="#334155" 
                    strokeWidth="1"
                  />
                  <text 
                    x={midX} 
                    y={midY + 3} 
                    fill="#94a3b8" 
                    fontSize="8" 
                    fontFamily="monospace" 
                    textAnchor="middle"
                  >
                    {rel.relationshipType.replace(/_/g, ' ').slice(0, 16)}
                  </text>
                </g>
              );
            })}

            {/* Render Nodes */}
            {entities.map((ent) => {
              const pos = nodePositions[ent.id] || { x: 300, y: 300 };
              const isSelected = selectedEntity?.id === ent.id;
              const color = getBucketColor(ent.entityType.includes('Server') || ent.entityType.includes('DNS') || ent.entityType.includes('BGP') ? 'Digital Presence' : ent.entityType.includes('Officer') ? 'Identity' : 'Organizations');

              return (
                <g 
                  key={ent.id} 
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onClick={() => setSelectedEntity(ent)}
                  className="cursor-pointer group"
                >
                  <circle 
                    r={isSelected ? "26" : "22"} 
                    fill="#030712" 
                    stroke={isSelected ? "#06b6d4" : color} 
                    strokeWidth={isSelected ? "3" : "2"}
                    className="transition-all group-hover:scale-105"
                  />
                  <circle 
                    r="6" 
                    fill={color} 
                  />
                  <text 
                    y={36} 
                    fill="#F1F5F9" 
                    fontSize="11" 
                    fontFamily="monospace" 
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {ent.canonicalName.slice(0, 18)}
                  </text>
                  <text 
                    y={48} 
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

          {/* Graph Controls Toolbar */}
          <div className="absolute top-4 right-4 flex items-center space-x-2 bg-cyber-900/90 border border-cyber-border rounded-lg p-1.5 backdrop-blur-sm">
            <span className="text-[10px] font-mono text-slate-400 px-2 font-bold">
              {entities.length} Nodes • {relationships.length} Edges
            </span>
          </div>

          {/* Graph Legend */}
          <div className="absolute bottom-4 left-4 bg-cyber-900/90 border border-cyber-border rounded-lg p-3 text-[10px] font-mono space-y-1 backdrop-blur-sm hidden sm:block">
            <div className="text-slate-400 font-bold mb-1">PROPERTY BUCKET LEGEND:</div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              <span className="text-slate-300">Organizations / M&A</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
              <span className="text-slate-300">Digital Presence / DNS / ASN</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="text-slate-300">Identity / Corporate Officers</span>
            </div>
          </div>
        </div>

        {/* Node Inspector & Maltego Pivot Palette Sidebar */}
        <div className="bg-cyber-900 border border-cyber-border rounded-xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
          {selectedEntity ? (
            <div className="space-y-4">
              <div className="border-b border-cyber-border pb-3">
                <span className="text-[10px] font-mono text-cyber-cyan uppercase tracking-wider block font-bold">
                  ENTITY PROPERTY INSPECTOR
                </span>
                <h2 className="text-sm font-bold font-mono text-slate-100 mt-1 truncate">
                  {selectedEntity.canonicalName}
                </h2>
                <div className="text-xs text-slate-400 font-mono">{selectedEntity.entityType}</div>
              </div>

              {/* Maltego-Style Pivot Transform Buttons */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                  Interactive Pivot Transforms:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => executePivotTransform('DNS')}
                    className="p-2 bg-cyber-850 hover:bg-cyber-800 border border-cyber-border hover:border-cyan-500/50 rounded-lg text-[11px] font-mono text-slate-200 transition-colors flex items-center space-x-1.5"
                    title="Pivot to Authoritative DNS Nameservers"
                  >
                    <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                    <span>Pivot DNS</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => executePivotTransform('ASN')}
                    className="p-2 bg-cyber-850 hover:bg-cyber-800 border border-cyber-border hover:border-cyan-500/50 rounded-lg text-[11px] font-mono text-slate-200 transition-colors flex items-center space-x-1.5"
                    title="Pivot to BGP Autonomous System Prefix"
                  >
                    <ArrowUpRight className="w-3 h-3 text-purple-400" />
                    <span>Pivot ASN</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => executePivotTransform('WHOIS')}
                    className="p-2 bg-cyber-850 hover:bg-cyber-800 border border-cyber-border hover:border-cyan-500/50 rounded-lg text-[11px] font-mono text-slate-200 transition-colors flex items-center space-x-1.5"
                    title="Pivot to Historical Registrar"
                  >
                    <ArrowUpRight className="w-3 h-3 text-amber-400" />
                    <span>Pivot WHOIS</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => executePivotTransform('OFFICERS')}
                    className="p-2 bg-cyber-850 hover:bg-cyber-800 border border-cyber-border hover:border-cyan-500/50 rounded-lg text-[11px] font-mono text-slate-200 transition-colors flex items-center space-x-1.5"
                    title="Pivot to Corporate Officers & Directorships"
                  >
                    <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                    <span>Pivot Officer</span>
                  </button>
                </div>
              </div>

              {/* Attributes */}
              <div className="bg-cyber-950 p-3 rounded-lg border border-cyber-border space-y-1 text-xs font-mono">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">
                  Corroborated Telemetry Anchors:
                </span>
                {Object.entries(selectedEntity.attributes).map(([k, v]) => (
                  <div key={k} className="border-b border-cyber-border/40 pb-1">
                    <span className="text-slate-500 block text-[10px]">{k}</span>
                    <span className="text-slate-300 break-all">{v}</span>
                  </div>
                ))}
              </div>

              <div className="text-xs font-mono text-slate-400 bg-cyber-850 p-2.5 rounded-lg border border-cyber-border">
                <span className="text-slate-500 block text-[10px] mb-0.5 font-bold">DISAMBIGUATION NOTE:</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">{selectedEntity.disambiguationNotes}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs font-mono">
              Click any node on the graph to inspect properties and execute visual transforms.
            </div>
          )}

          <div className="text-[10px] font-mono text-slate-500 border-t border-cyber-border pt-3">
            NATO STANAG 2022 Edge Confidence Enabled.
          </div>
        </div>
      </div>
    </div>
  );
};
