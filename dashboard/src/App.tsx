import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar, SubsystemView } from './components/Sidebar';
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
  const [activeView, setActiveView] = useState<SubsystemView>('CASES');
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

  // Handlers
  const handleAddLead = (newLead: Lead) => {
    setLeads([newLead, ...leads]);
    // Log audit action
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
    // Create new Evidence
    const newEv: EvidenceItem = {
      id: `ev-${Date.now()}`,
      caseId: currentCase.id,
      itemNumber: `ITEM-00${evidence.length + 1}`,
      title: lead.title,
      sourceUrl: lead.rawValue,
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
      {/* Universal Header */}
      <Header
        currentCase={currentCase}
        cases={cases}
        onSelectCase={setCurrentCase}
        openIntakeModal={() => setActiveView('INTAKE')}
      />

      {/* Main Body with Sidebar + Dynamic View */}
      <div className="flex flex-1 overflow-hidden">
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

        {/* Dynamic Subsystem Workspace */}
        <main className="flex-1 overflow-hidden bg-cyber-950 relative">
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
        </main>
      </div>
    </div>
  );
};

export default App;
