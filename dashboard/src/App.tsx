import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar, SubsystemView } from './components/Sidebar';
import { GuidedLifecycleView } from './components/GuidedLifecycleView';
import { CaseManagementView } from './components/CaseManagementView';
import { IntakeView } from './components/IntakeView';
import { LeadQueueView } from './components/LeadQueueView';
import { EntityResolutionView } from './components/EntityResolutionView';
import { RelationshipGraphView } from './components/RelationshipGraphView';
import { EvidenceRepositoryView } from './components/EvidenceRepositoryView';
import { SourceReliabilityView } from './components/SourceReliabilityView';
import { TimelineView } from './components/TimelineView';
import { ConfidenceEngineView } from './components/ConfidenceEngineView';
import { ReportGeneratorView } from './components/ReportGeneratorView';
import { AuditLogsView } from './components/AuditLogsView';
import { AnalystNotesView } from './components/AnalystNotesView';
import { AIAssistantView } from './components/AIAssistantView';
import { GapAnalysisView } from './components/GapAnalysisView';

import { 
  initialCases, initialEntities, initialRelationships, 
  initialEvidence, initialLeads, initialSources, 
  initialTimeline, initialNotes, initialAuditLogs, 
  initialGaps, initialReport 
} from './data/mockData';

import { Case, Lead, Entity, EvidenceItem, AnalystNote, GapAnalysis } from './types';

export const App: React.FC = () => {
  // Navigation & Lifecycle State
  const [workbenchMode, setWorkbenchMode] = useState<'GUIDED' | 'STUDIO'>('GUIDED');
  const [activeStage, setActiveStage] = useState<number>(1);
  const [activeView, setActiveView] = useState<SubsystemView>('CASES');

  // Core Data State
  const [cases, setCases] = useState<Case[]>(initialCases);
  const [currentCase, setCurrentCase] = useState<Case>(initialCases[0]);
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [entities, setEntities] = useState<Entity[]>(initialEntities);
  const [relationships] = useState(initialRelationships);
  const [evidence, setEvidence] = useState<EvidenceItem[]>(initialEvidence);
  const [sources] = useState(initialSources);
  const [timeline] = useState(initialTimeline);
  const [notes, setNotes] = useState<AnalystNote[]>(initialNotes);
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);
  const [gaps, setGaps] = useState<GapAnalysis[]>(initialGaps);
  const [report] = useState(initialReport);

  // Quick Ingestion Modal
  const [showQuickIntakeModal, setShowQuickIntakeModal] = useState<boolean>(false);

  // Handlers
  const handleAddLead = (newLead: Lead) => {
    setLeads([newLead, ...leads]);
    const newLog = {
      id: `aud-${Date.now()}`,
      caseId: currentCase.id,
      userId: 'Lead_Investigator_Chevalier',
      actionType: 'LEAD_INGESTED',
      targetTable: 'leads',
      deltaSummary: `Ingested new lead ${newLead.leadCode} (${newLead.inputType}: ${newLead.normalizedValue})`,
      clientIp: '127.0.0.1 (Enclave)',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

  const handlePromoteLead = (lead: Lead) => {
    setLeads(leads.map(l => l.id === lead.id ? { ...l, status: 'PROMOTED_TO_EVIDENCE' } : l));
    const newEv: EvidenceItem = {
      id: `ev-${Date.now()}`,
      caseId: currentCase.id,
      itemNumber: `ITEM-00${evidence.length + 1}`,
      title: lead.title,
      sourceUrl: lead.rawValue,
      archiveUrl: `https://web.archive.org/web/20261104163012/${lead.rawValue}`,
      sha256Hash: Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join(''),
      filePath: `cases/evidence_raw/${lead.leadCode.toLowerCase()}_artifact.txt`,
      captureTimestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
      admiraltyReliability: 'B',
      admiraltyCredibility: '2',
      fullViewportVerified: true,
      verifiedBy: 'Lead_Investigator_Chevalier'
    };
    setEvidence([newEv, ...evidence]);
  };

  const handleDismissLead = (id: string) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status: 'DISMISSED' } : l));
  };

  const handleConfirmEntity = (id: string, notesText: string) => {
    setEntities(entities.map(e => e.id === id ? {
      ...e,
      isConfirmed: true,
      disambiguationNotes: notesText,
      resolvedBy: 'Lead_Investigator_Chevalier',
      resolvedAt: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
    } : e));
  };

  const handleSaveNote = (updatedNote: AnalystNote) => {
    const exists = notes.some(n => n.id === updatedNote.id);
    if (exists) {
      setNotes(notes.map(n => n.id === updatedNote.id ? updatedNote : n));
    } else {
      setNotes([updatedNote, ...notes]);
    }
  };

  const handleResolveGap = (id: string) => {
    setGaps(gaps.map(g => g.id === id ? { ...g, isResolved: true } : g));
  };

  const handleCreateCase = (newCase: Case) => {
    setCases([newCase, ...cases]);
    setCurrentCase(newCase);
  };

  const handleLoadDemo = () => {
    // Cycle between existing cases
    const nextCase = cases.find(c => c.id !== currentCase.id) || cases[0];
    setCurrentCase(nextCase);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-cyber-950 text-slate-200 overflow-hidden font-sans">
      {/* Universal Executive Header */}
      <Header
        currentCase={currentCase}
        cases={cases}
        onSelectCase={setCurrentCase}
        activeStage={activeStage}
        onSelectStage={(stg) => {
          setActiveStage(stg);
          setWorkbenchMode('GUIDED');
        }}
        workbenchMode={workbenchMode}
        onToggleWorkbenchMode={setWorkbenchMode}
        onOpenQuickIntake={() => setShowQuickIntakeModal(true)}
        onLoadDemo={handleLoadDemo}
      />

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar visible only in Studio Mode for deep inspection */}
        {workbenchMode === 'STUDIO' && (
          <Sidebar
            activeView={activeView}
            onSelectView={setActiveView}
            counts={{
              cases: cases.length,
              leads: leads.filter(l => l.status === 'QUEUED').length,
              entities: entities.length,
              evidence: evidence.length,
              gaps: gaps.filter(g => !g.isResolved).length
            }}
          />
        )}

        {/* Dynamic Subsystem Workspace */}
        <main className="flex-1 overflow-hidden bg-cyber-950 relative">
          {workbenchMode === 'GUIDED' ? (
            <GuidedLifecycleView
              currentCase={currentCase}
              activeStage={activeStage}
              onSetStage={setActiveStage}
              leads={leads.filter(l => l.caseId === currentCase.id || l.caseId === 'case-001')}
              entities={entities.filter(e => e.caseId === currentCase.id || e.caseId === 'case-001')}
              evidence={evidence.filter(ev => ev.caseId === currentCase.id || ev.caseId === 'case-001')}
              sources={sources}
              timeline={timeline.filter(t => t.caseId === currentCase.id || t.caseId === 'case-001')}
              report={report}
              onPromoteLead={handlePromoteLead}
              onConfirmEntity={handleConfirmEntity}
              onOpenIntake={() => setShowQuickIntakeModal(true)}
              onSwitchToStudio={() => setWorkbenchMode('STUDIO')}
            />
          ) : (
            <>
              {activeView === 'CASES' && (
                <CaseManagementView
                  cases={cases}
                  currentCase={currentCase}
                  onSelectCase={setCurrentCase}
                  onCreateCase={handleCreateCase}
                />
              )}

              {activeView === 'INTAKE' && (
                <IntakeView
                  currentCaseId={currentCase.id}
                  onAddLead={handleAddLead}
                  onNavigateToLeads={() => setActiveView('LEADS')}
                />
              )}

              {activeView === 'LEADS' && (
                <LeadQueueView
                  leads={leads.filter(l => l.caseId === currentCase.id || l.caseId === 'case-001')}
                  onPromoteLead={handlePromoteLead}
                  onDismissLead={handleDismissLead}
                />
              )}

              {activeView === 'ENTITIES' && (
                <EntityResolutionView
                  entities={entities.filter(e => e.caseId === currentCase.id || e.caseId === 'case-001')}
                  onConfirmEntity={handleConfirmEntity}
                />
              )}

              {activeView === 'RELATIONSHIPS' && (
                <RelationshipGraphView
                  entities={entities.filter(e => e.caseId === currentCase.id || e.caseId === 'case-001')}
                  relationships={relationships}
                />
              )}

              {activeView === 'EVIDENCE' && (
                <EvidenceRepositoryView
                  evidence={evidence.filter(ev => ev.caseId === currentCase.id || ev.caseId === 'case-001')}
                />
              )}

              {activeView === 'SOURCES' && (
                <SourceReliabilityView
                  sources={sources}
                />
              )}

              {activeView === 'TIMELINE' && (
                <TimelineView
                  timeline={timeline.filter(t => t.caseId === currentCase.id || t.caseId === 'case-001')}
                />
              )}

              {activeView === 'CONFIDENCE' && (
                <ConfidenceEngineView />
              )}

              {activeView === 'REPORT' && (
                <ReportGeneratorView
                  currentCase={currentCase}
                  report={report}
                />
              )}

              {activeView === 'AUDIT' && (
                <AuditLogsView
                  logs={auditLogs}
                />
              )}

              {activeView === 'NOTES' && (
                <AnalystNotesView
                  currentCaseId={currentCase.id}
                  notes={notes}
                  onSaveNote={handleSaveNote}
                />
              )}

              {activeView === 'AI_ASSISTANT' && (
                <AIAssistantView />
              )}

              {activeView === 'GAPS' && (
                <GapAnalysisView
                  gaps={gaps.filter(g => g.caseId === currentCase.id || g.caseId === 'case-001')}
                  onResolveGap={handleResolveGap}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Quick Intake Modal */}
      {showQuickIntakeModal && (
        <div className="fixed inset-0 bg-cyber-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-cyber-900 border border-cyber-cyan rounded-xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowQuickIntakeModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-mono text-sm"
            >
              ✕ CLOSE
            </button>
            <IntakeView
              currentCaseId={currentCase.id}
              onAddLead={(lead) => {
                handleAddLead(lead);
                setShowQuickIntakeModal(false);
              }}
              onNavigateToLeads={() => {
                setShowQuickIntakeModal(false);
                setWorkbenchMode('STUDIO');
                setActiveView('LEADS');
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
