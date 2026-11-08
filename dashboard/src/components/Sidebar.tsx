import React from 'react';
import { 
  FolderKanban, Inbox, GitMerge, Network, FileCheck,
  History, FileText, Activity, StickyNote, 
  Sparkles, AlertOctagon, Terminal, Shield, Wrench, X, Award, FileSearch,
  LayoutDashboard, Compass
} from 'lucide-react';

export type SubsystemView = 
  | 'DASHBOARD'     // Executive Academy Command Center & 30-case curriculum matrix
  | 'INVESTIGATION' // The unified case investigation console
  | 'CAPSTONE'      // Operation Horizon Shield Pre-IPO Audit Capstone
  | 'TOOLS'         // The tool sandbox
  | 'EXIF_INSPECTOR'// Drag & drop client-side EXIF & document analyzer
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
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeView, 
  onSelectView, 
  counts,
  isMobileOpen = false,
  onCloseMobile
}) => {
  const sections = [
    {
      category: 'INVESTIGATION WORKFLOW',
      items: [
        { 
          id: 'DASHBOARD' as SubsystemView, 
          label: 'Academy Hub (30 Cases)', 
          icon: LayoutDashboard, 
          badge: 'Overview',
          badgeColor: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
        },
        { 
          id: 'INVESTIGATION' as SubsystemView, 
          label: 'Active Case Console', 
          icon: Shield, 
          badge: 'Curriculum',
          badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
        },
        { 
          id: 'CAPSTONE' as SubsystemView, 
          label: 'Operation Horizon Shield', 
          icon: Award, 
          badge: 'Tier 4',
          badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
        },
        { 
          id: 'TOOLS' as SubsystemView, 
          label: 'Tool Sandbox', 
          icon: Wrench 
        },
        { 
          id: 'EXIF_INSPECTOR' as SubsystemView, 
          label: 'EXIF & Doc Ingestion', 
          icon: FileSearch, 
          badge: 'Sandbox',
          badgeColor: 'bg-emerald-500/20 text-emerald-300'
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

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between bg-cyber-900 border-r border-cyber-border select-none w-64">
      {/* Mobile Header Bar */}
      <div className="lg:hidden p-4 border-b border-cyber-border flex items-center justify-between">
        <span className="font-mono text-xs font-bold text-cyber-cyan uppercase tracking-wider">Navigation Menu</span>
        <button
          type="button"
          onClick={onCloseMobile}
          aria-label="Close navigation drawer"
          className="p-1 rounded text-slate-400 hover:text-white hover:bg-cyber-800 focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:outline-none"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

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
                    type="button"
                    onClick={() => {
                      onSelectView(item.id);
                      if (onCloseMobile) onCloseMobile();
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-colors focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:outline-none ${
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
        <span className="flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>100% Passive OSINT</span>
        </span>
        <span>v2.0.0</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Permanent Docked Sidebar */}
      <aside 
        role="navigation"
        aria-label="Sidebar Navigation"
        className="hidden lg:flex w-64 shrink-0 h-full"
      >
        {sidebarContent}
      </aside>

      {/* Mobile / Tablet Off-Canvas Drawer */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden flex"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation drawer"
        >
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Slide-out Panel */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
