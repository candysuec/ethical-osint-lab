import React from 'react';
import { 
  FolderKanban, Inbox, GitMerge, Network, FileCheck,
  History, FileText, Activity, StickyNote, 
  Sparkles, AlertOctagon, Terminal, Shield, Wrench
} from 'lucide-react';

export type SubsystemView = 
  | 'INVESTIGATION' // The unified case investigation console
  | 'TOOLS'         // The tool sandbox
  | 'CASES'         // Multi-case portfolio manager
  | 'INTAKE'        // Ingest new indicator
  | 'LEADS'         // Lead queue
  | 'ENTITIES'      // Entity resolution
  | 'RELATIONSHIPS' // Link graph
  | 'EVIDENCE'      // Evidence vault
  | 'TIMELINE'      // Timeline analysis
  | 'GAPS'          // Gap analysis
  | 'REPORT'        // Executive report generator
  | 'AUDIT'         // Audit logs
  | 'NOTES'         // Notes
  | 'AI_ASSISTANT'; // AI Assistant

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
      category: 'INVESTIGATION WORKFLOW',
      items: [
        { 
          id: 'INVESTIGATION' as SubsystemView, 
          label: 'Active Case Console', 
          icon: Shield, 
          badge: 'Curriculum',
          badgeColor: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
        },
        { 
          id: 'TOOLS' as SubsystemView, 
          label: 'Tool Sandbox', 
          icon: Wrench 
        },
        { 
          id: 'CASES' as SubsystemView, 
          label: 'Case Portfolio', 
          icon: FolderKanban, 
          count: counts.cases 
        },
        { 
          id: 'INTAKE' as SubsystemView, 
          label: 'Indicator Intake', 
          icon: Inbox 
        },
        { 
          id: 'LEADS' as SubsystemView, 
          label: 'Lead Queue', 
          icon: Terminal, 
          count: counts.leads, 
          badgeColor: 'bg-amber-500/20 text-amber-300' 
        }
      ]
    },
    {
      category: 'EVIDENCE & CORRELATION',
      items: [
        { 
          id: 'EVIDENCE' as SubsystemView, 
          label: 'Evidence Vault (SHA-256)', 
          icon: FileCheck, 
          count: counts.evidence,
          badgeColor: 'bg-emerald-500/20 text-emerald-300' 
        },
        { 
          id: 'ENTITIES' as SubsystemView, 
          label: 'Entity Resolution', 
          icon: GitMerge, 
          count: counts.entities 
        },
        { 
          id: 'RELATIONSHIPS' as SubsystemView, 
          label: 'Relationship Graph', 
          icon: Network 
        },
        { 
          id: 'TIMELINE' as SubsystemView, 
          label: 'Timeline Analysis', 
          icon: History 
        },
        { 
          id: 'GAPS' as SubsystemView, 
          label: 'Gap Analysis', 
          icon: AlertOctagon, 
          count: counts.gaps, 
          badgeColor: 'bg-rose-500/20 text-rose-300' 
        }
      ]
    },
    {
      category: 'INTELLIGENCE DELIVERABLES',
      items: [
        { 
          id: 'REPORT' as SubsystemView, 
          label: 'Executive Reports', 
          icon: FileText 
        },
        { 
          id: 'AUDIT' as SubsystemView, 
          label: 'Audit Trail & Logs', 
          icon: Activity 
        },
        { 
          id: 'NOTES' as SubsystemView, 
          label: 'Analyst Notes', 
          icon: StickyNote 
        },
        { 
          id: 'AI_ASSISTANT' as SubsystemView, 
          label: 'AI Research Assistant', 
          icon: Sparkles 
        }
      ]
    }
  ];

  return (
    <aside className="w-64 border-r border-cyber-border bg-cyber-900/95 flex flex-col justify-between select-none shrink-0">
      <div className="py-4 overflow-y-auto flex-1">
        {sections.map((section, idx) => (
          <div key={idx} className="mb-5">
            <div className="px-4 mb-2 text-[10px] font-mono tracking-widest text-slate-500 uppercase font-bold">
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
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-colors ${
                      isActive 
                        ? 'bg-cyber-cyan/15 text-cyber-cyan border-l-2 border-cyber-cyan font-semibold' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-cyber-850'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyber-cyan' : 'text-slate-500'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${item.badgeColor || 'bg-cyber-800 text-slate-400'}`}>
                        {item.badge}
                      </span>
                    )}

                    {item.count !== undefined && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${item.badgeColor || 'bg-cyber-800 text-slate-400'}`}>
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

      {/* Footer Info */}
      <div className="p-3 border-t border-cyber-border bg-cyber-950/60 text-[10px] font-mono text-slate-500 flex items-center justify-between">
        <span className="flex items-center space-x-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>100% Passive OSINT</span>
        </span>
        <span>v1.5.0</span>
      </div>
    </aside>
  );
};
