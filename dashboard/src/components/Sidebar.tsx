import React from 'react';
import { 
  FolderKanban, Inbox, GitMerge, Network, FileCheck, ListOrdered, 
  Award, History, Calculator, FileText, Activity, StickyNote, 
  Sparkles, AlertOctagon, Terminal
} from 'lucide-react';

export type SubsystemView = 
  | 'CASES'
  | 'TOOLS'
  | 'INTAKE'
  | 'LEADS'
  | 'ENTITIES'
  | 'RELATIONSHIPS'
  | 'EVIDENCE'
  | 'SOURCES'
  | 'TIMELINE'
  | 'CONFIDENCE'
  | 'REPORT'
  | 'AUDIT'
  | 'NOTES'
  | 'AI_ASSISTANT'
  | 'GAPS';

interface SidebarProps {
  activeView: SubsystemView;
  onSelectView: (view: SubsystemView) => void;
  counts: {
    cases: number;
    leads: number;
    entities: number;
    evidence: number;
    gaps: number;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onSelectView, counts }) => {
  const sections = [
    {
      category: 'COMMAND & CONTROL',
      items: [
        { id: 'CASES' as SubsystemView, label: 'Case Management', icon: FolderKanban, count: counts.cases },
        { id: 'TOOLS' as SubsystemView, label: 'Tool Runner Studio', icon: Terminal, badgeColor: 'bg-cyan-500/20 text-cyan-400' },
        { id: 'INTAKE' as SubsystemView, label: 'Investigation Intake', icon: Inbox },
        { id: 'LEADS' as SubsystemView, label: 'Lead Generation Queue', icon: Inbox, count: counts.leads, badgeColor: 'bg-amber-500/20 text-amber-400' }
      ]
    },
    {
      category: 'ANALYTICAL ENGINE',
      items: [
        { id: 'ENTITIES' as SubsystemView, label: 'Entity Resolution', icon: GitMerge, count: counts.entities },
        { id: 'RELATIONSHIPS' as SubsystemView, label: 'Relationship Graph', icon: Network },
        { id: 'TIMELINE' as SubsystemView, label: 'Timeline Analysis', icon: History },
        { id: 'CONFIDENCE' as SubsystemView, label: 'Confidence Engine', icon: Calculator }
      ]
    },
    {
      category: 'FORENSICS & EVIDENCE',
      items: [
        { id: 'EVIDENCE' as SubsystemView, label: 'Evidence Repository', icon: FileCheck, count: counts.evidence },
        { id: 'SOURCES' as SubsystemView, label: 'Source Reliability (6x6)', icon: Award },
        { id: 'GAPS' as SubsystemView, label: 'Gap Analysis Engine', icon: AlertOctagon, count: counts.gaps, badgeColor: 'bg-rose-500/20 text-rose-400' },
        { id: 'AUDIT' as SubsystemView, label: 'Immutable Audit Logs', icon: Activity }
      ]
    },
    {
      category: 'INTELLIGENCE DELIVERABLES',
      items: [
        { id: 'REPORT' as SubsystemView, label: 'Report Generator', icon: FileText },
        { id: 'NOTES' as SubsystemView, label: 'Analyst Notes', icon: StickyNote },
        { id: 'AI_ASSISTANT' as SubsystemView, label: 'AI Research Assistant', icon: Sparkles }
      ]
    }
  ];

  return (
    <aside className="w-64 border-r border-cyber-border bg-cyber-900/95 flex flex-col justify-between select-none">
      <div className="py-4 overflow-y-auto flex-1">
        {sections.map((section, idx) => (
          <div key={idx} className="mb-6">
            <div className="px-4 mb-2 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
              {section.category}
            </div>
            <div className="space-y-0.5 px-2">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectView(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-mono transition-colors ${
                      isActive 
                        ? 'bg-cyber-cyan/15 text-cyber-cyan border-l-2 border-cyber-cyan font-semibold' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-cyber-850'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-cyber-cyan' : 'text-slate-500'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.count !== undefined && (
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${item.badgeColor || 'bg-cyber-800 text-slate-400'}`}>
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Security Level Indicator */}
      <div className="p-3 border-t border-cyber-border bg-cyber-950/60 text-[10px] font-mono text-slate-500 flex items-center justify-between">
        <span>ENCLAVE: ISOLATED</span>
        <span className="text-emerald-400 flex items-center space-x-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block"></span>
          <span>ONLINE</span>
        </span>
      </div>
    </aside>
  );
};
