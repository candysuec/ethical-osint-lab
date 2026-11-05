import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar, SubsystemView } from './components/Sidebar';
import { InvestigationConsoleView } from './components/InvestigationConsoleView';
import { CaseBrowserModal } from './components/CaseBrowserModal';
import { ToolWorkbenchView } from './components/ToolWorkbenchView';
import { BeginnerGuideModal } from './components/BeginnerGuideModal';
import { CaseManagementView } from './components/CaseManagementView';
import { IntakeView } from './components/IntakeView';
import { LeadQueueView } from './components/LeadQueueView';
import { EntityResolutionView } from './components/EntityResolutionView';
import { RelationshipGraphView } from './components/RelationshipGraphView';
import { EvidenceRepositoryView } from './components/EvidenceRepositoryView';
import { TimelineView } from './components/TimelineView';
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

import { missionsData, Mission } from './data/missionsData';
import { Case, Lead, Entity, EvidenceItem, AnalystNote, GapAnalysis } from './types';
import { loadStoredData, saveStoredData } from './utils/storage';

export const App: React.FC = () => {
  // Active Navigation View - Defaults to the unified 'INVESTIGATION' console!
  const [activeView, setActiveView] = useState<SubsystemView>('INVESTIGATION');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Active Curriculum Case (Defaults to Case 02: Fastly Mail Spoofing Audit)
  const [selectedCurriculumCase, setSelectedCurriculumCase] = useState<Mission>(() => {
    const savedId = loadStoredData<string>('active_case_id', missionsData[1].id);
    return missionsData.find(m => m.id === savedId) || missionsData[1];
  });

  const [completedCaseIds, setCompletedCaseIds] = useState<string[]>(() => {
    return loadStoredData<string[]>('completed_case_ids', ['mission-01']);
  });

  const [showCaseBrowser, setShowCaseBrowser] = useState<boolean>(false);

  // Core Data State with Local Storage Persistence
  const [cases, setCases] = useState<Case[]>(() => loadStoredData<Case[]>('cases', initialCases));
  const [currentCase, setCurrentCase] = useState<Case>(cases[0] || initialCases[0]);
  const [leads, setLeads] = useState<Lead[]>(() => loadStoredData<Lead[]>('leads', initialLeads));
  const [entities, setEntities] = useState<Entity[]>(() => loadStoredData<Entity[]>('entities', initialEntities));
  const [relationships] = useState(initialRelationships);
  const [evidence, setEvidence] = useState<EvidenceItem[]>(() => loadStoredData<EvidenceItem[]>('evidence', initialEvidence));
  const [sources] = useState(initialSources);
  const [timeline] = useState(initialTimeline);
  const [notes, setNotes] = useState<AnalystNote[]>(() => loadStoredData<AnalystNote[]>('notes', initialNotes));
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);
  const [gaps, setGaps] = useState<GapAnalysis[]>(() => loadStoredData<GapAnalysis[]>('gaps', initialGaps));
  const [report] = useState(initialReport);

  // Modals
  const [showQuickIntakeModal, setShowQuickIntakeModal] = useState<boolean>(false);
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);

  // Automatically persist state changes to localStorage
  useEffect(() => {
    saveStoredData('active_case_id', selectedCurriculumCase.id);
  }, [selectedCurriculumCase]);

  useEffect(() => {
    saveStoredData('completed_case_ids', completedCaseIds);
  }, [completedCaseIds]);

  useEffect(() => {
    saveStoredData('evidence', evidence);
  }, [evidence]);

  useEffect(() => {
    saveStoredData('leads', leads);
  }, [leads]);

  useEffect(() => {
    saveStoredData('notes', notes);
  }, [notes]);

  useEffect(() => {
    saveStoredData('gaps', gaps);
  }, [gaps]);

  // Handlers
  const handleSaveEvidenceFromConsole = (newEv: EvidenceItem) => {
    handleAddEvidence(newEv);
    if (!completedCaseIds.includes(selectedCurriculumCase.id)) {
      setCompletedCaseIds([...completedCaseIds, selectedCurriculumCase.id]);
    }
  };

  const handleNextCurriculumCase = () => {
    const currentIndex = missionsData.findIndex(m => m.id === selectedCurriculumCase.id);
    if (currentIndex >= 0 && currentIndex < missionsData.length - 1) {
      setSelectedCurriculumCase(missionsData[currentIndex + 1]);
    }
  };

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

  const handleAddEvidence = (item: EvidenceItem) => {
    setEvidence([item, ...evidence]);
    const newLog = {
      id: `aud-${Date.now()}`,
      caseId: currentCase.id,
      userId: 'Lead_Investigator_Chevalier',
      actionType: 'EVIDENCE_ADDED',
      targetTable: 'evidence_items',
      deltaSummary: `Registered new evidence artifact ${item.itemNumber} (${item.title}) with SHA-256 ${item.sha256Hash.slice(0, 16)}...`,
      clientIp: '127.0.0.1 (Enclave)',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

  const handleAddEntity = (ent: Entity) => {
    setEntities([ent, ...entities]);
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

  return (
    <div className="flex flex-col h-screen w-screen bg-cyber-950 text-slate-200 overflow-hidden font-sans">
      {/* 1. Permanent Universal Executive Header (Always Stable) */}
      <Header
        currentCase={selectedCurriculumCase}
        onOpenCaseBrowser={() => setShowCaseBrowser(true)}
        onOpenQuickIntake={() => setShowQuickIntakeModal(true)}
        onOpenGuide={() => setShowGuideModal(true)}
        completedCount={completedCaseIds.length}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* 2. Permanent Layout Frame: Always-Visible Sidebar (or Drawer on Mobile) + Main Subsystem */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Unified Sidebar with Mobile Drawer support */}
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
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Dynamic Subsystem Workspace with Identical Visual Framing */}
        <main 
          role="main"
          className="flex-1 overflow-hidden bg-cyber-950 relative flex flex-col min-w-0"
        >
          {activeView === 'INVESTIGATION' && (
            <InvestigationConsoleView
              currentCase={selectedCurriculumCase}
              onOpenCaseBrowser={() => setShowCaseBrowser(true)}
              onOpenReport={() => setActiveView('REPORT')}
              onSaveEvidence={handleSaveEvidenceFromConsole}
              isCaseCompleted={completedCaseIds.includes(selectedCurriculumCase.id)}
              onNextCase={handleNextCurriculumCase}
            />
          )}

          {activeView === 'TOOLS' && (
            <ToolWorkbenchView
              currentCase={currentCase}
              onAddEvidence={handleAddEvidence}
              onAddEntity={handleAddEntity}
              onAddLead={handleAddLead}
            />
          )}

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

          {activeView === 'TIMELINE' && (
            <TimelineView
              timeline={timeline.filter(t => t.caseId === currentCase.id || t.caseId === 'case-001')}
            />
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
        </main>
      </div>

      {/* Case Browser Modal */}
      <CaseBrowserModal
        isOpen={showCaseBrowser}
        onClose={() => setShowCaseBrowser(false)}
        currentCaseId={selectedCurriculumCase.id}
        onSelectCase={(m) => {
          setSelectedCurriculumCase(m);
          setActiveView('INVESTIGATION');
        }}
        completedCaseIds={completedCaseIds}
      />

      {/* Plain English Guide Modal */}
      <BeginnerGuideModal
        isOpen={showGuideModal}
        onClose={() => setShowGuideModal(false)}
        onSelectToolAndRun={(_tool) => {
          setActiveView('TOOLS');
        }}
      />

      {/* Quick Intake Modal */}
      {showQuickIntakeModal && (
        <div className="fixed inset-0 bg-cyber-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-cyber-900 border border-cyber-cyan rounded-xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowQuickIntakeModal(false)}
              aria-label="Close intake dialog"
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-mono text-sm p-1 rounded hover:bg-cyber-800"
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
