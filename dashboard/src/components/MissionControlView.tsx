import React, { useState } from 'react';
import { 
  CheckCircle2, Play, Terminal, HelpCircle, 
  Sparkles, Award, ExternalLink, ChevronRight,
  ShieldCheck, ArrowRight, RefreshCw, Star, Info,
  Search, ShieldAlert, Check
} from 'lucide-react';
import { missionsData, Mission } from '../data/missionsData';
import { EvidenceItem } from '../types';

interface MissionControlViewProps {
  completedMissionIds: string[];
  onCompleteMission: (missionId: string, earnedXp: number, evidenceItem: EvidenceItem) => void;
  onOpenStudio: () => void;
  onOpenGuide: () => void;
}

export const MissionControlView: React.FC<MissionControlViewProps> = ({
  completedMissionIds,
  onCompleteMission,
  onOpenStudio,
  onOpenGuide
}) => {
  const [selectedTier, setSelectedTier] = useState<'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'>('BEGINNER');
  const [selectedMission, setSelectedMission] = useState<Mission>(missionsData[1]); // Default to Case 02 (Mail Security)
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [hasExecuted, setHasExecuted] = useState<boolean>(true); // Default to true so terminal & findings are immediately visible! No empty black void!
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter missions by tier and search
  const filteredMissions = missionsData.filter(m => {
    const matchesTier = m.tier === selectedTier;
    const matchesSearch = searchQuery === '' || 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  const activeStep = selectedMission.steps[0];
  const isMissionSolved = completedMissionIds.includes(selectedMission.id);

  // Execution simulation (re-runs with animated spinner)
  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setHasExecuted(true);
    }, 400);
  };

  // Switch mission
  const handleSelectMission = (mission: Mission) => {
    setSelectedMission(mission);
    setHasExecuted(true); // Keep content visible immediately
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    setShowCelebration(false);
  };

  // Submit Mission & Save Evidence
  const handleSaveAndComplete = () => {
    const evidenceItem: EvidenceItem = {
      id: `ev-${Date.now()}`,
      caseId: 'case-001',
      itemNumber: `PROOF-${selectedMission.caseNumber}`,
      title: `${selectedMission.title} - Verified Artifact`,
      sourceUrl: selectedMission.target,
      sha256Hash: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      filePath: `cases/evidence/${selectedMission.id}_proof.txt`,
      captureTimestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
      admiraltyReliability: 'A',
      admiraltyCredibility: '1',
      fullViewportVerified: true,
      verifiedBy: 'Student_Analyst'
    };

    onCompleteMission(selectedMission.id, selectedMission.xp, evidenceItem);
    setShowCelebration(true);
  };

  // Advance to next mission
  const handleNextMission = () => {
    const currentIndex = missionsData.findIndex(m => m.id === selectedMission.id);
    if (currentIndex >= 0 && currentIndex < missionsData.length - 1) {
      handleSelectMission(missionsData[currentIndex + 1]);
    }
  };

  return (
    <div className="flex h-full w-full bg-cyber-950 text-slate-200 overflow-hidden font-sans">
      {/* Left Column: 30-Mission Syllabus Navigator (310px width) */}
      <aside className="w-80 bg-cyber-900 border-r border-cyber-border flex flex-col shrink-0">
        {/* Tier Selector Tabs */}
        <div className="p-3 border-b border-cyber-border bg-cyber-950/70">
          <div className="grid grid-cols-3 gap-1 bg-cyber-950 p-1 rounded-lg border border-cyber-border text-xs font-mono">
            <button
              onClick={() => setSelectedTier('BEGINNER')}
              className={`py-1.5 px-1 rounded font-bold transition-all text-center truncate ${
                selectedTier === 'BEGINNER' 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Beginner
            </button>
            <button
              onClick={() => setSelectedTier('INTERMEDIATE')}
              className={`py-1.5 px-1 rounded font-bold transition-all text-center truncate ${
                selectedTier === 'INTERMEDIATE' 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Interm.
            </button>
            <button
              onClick={() => setSelectedTier('ADVANCED')}
              className={`py-1.5 px-1 rounded font-bold transition-all text-center truncate ${
                selectedTier === 'ADVANCED' 
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Advanced
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative mt-2.5">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-cyber-950 border border-cyber-border text-slate-200 text-xs pl-8 pr-3 py-1.5 rounded focus:outline-none focus:border-cyber-cyan font-mono"
            />
          </div>
        </div>

        {/* Mission List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
          {filteredMissions.map((m) => {
            const isSelected = selectedMission.id === m.id;
            const isSolved = completedMissionIds.includes(m.id);

            return (
              <button
                key={m.id}
                onClick={() => handleSelectMission(m)}
                className={`w-full text-left p-2.5 rounded-lg transition-all flex items-start space-x-2.5 ${
                  isSelected
                    ? 'bg-cyber-850 border border-cyber-cyan text-white shadow-md'
                    : 'hover:bg-cyber-850/50 text-slate-300 border border-transparent'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isSolved ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center text-[9px] font-mono font-bold ${
                      isSelected ? 'border-cyber-cyan text-cyber-cyan' : 'border-slate-600 text-slate-500'
                    }`}>
                      {m.caseNumber.split('-')[2]}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[10px] font-mono mb-0.5">
                    <span className="text-slate-400">{m.caseNumber}</span>
                    <span className="text-amber-400 font-bold">+{m.xp} XP</span>
                  </div>
                  <div className="text-xs font-semibold truncate leading-tight">
                    {m.title}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate mt-0.5 font-mono">
                    {m.target}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Right Column: Complete Mission Workspace (Fills all remaining space) */}
      <main className="flex-1 overflow-y-auto flex flex-col p-5 space-y-4">
        {/* Mission Briefing Header Banner */}
        <div className="bg-cyber-900 border border-cyber-border rounded-xl p-4 shadow-sm shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex items-center space-x-2">
              <span className="bg-cyber-cyan/15 border border-cyber-cyan/40 text-cyber-cyan text-xs font-mono font-bold px-2 py-0.5 rounded">
                {selectedMission.caseNumber}
              </span>
              <span className="bg-cyber-800 text-slate-300 text-xs font-mono px-2 py-0.5 rounded border border-cyber-border">
                {selectedMission.category}
              </span>
              <span className="bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold px-2 py-0.5 rounded flex items-center space-x-1">
                <Star className="w-3 h-3 text-amber-400" />
                <span>+{selectedMission.xp} XP</span>
              </span>
            </div>

            {isMissionSolved ? (
              <div className="flex items-center space-x-1.5 text-emerald-400 bg-emerald-950/60 border border-emerald-500/50 px-2.5 py-0.5 rounded text-xs font-mono font-bold">
                <Check className="w-3.5 h-3.5" />
                <span>CASE SOLVED & LOGGED</span>
              </div>
            ) : (
              <span className="text-xs font-mono text-slate-400">
                Target: <strong className="text-emerald-400">{selectedMission.target}</strong>
              </span>
            )}
          </div>

          <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">
            {selectedMission.title}
          </h1>

          {/* 1-Sentence Objective */}
          <p className="mt-1.5 text-xs md:text-sm text-slate-300 leading-relaxed">
            <strong className="text-cyan-400 font-mono text-xs uppercase tracking-wider mr-1.5">Scenario Briefing:</strong>
            {selectedMission.oneSentenceObjective}
          </p>
        </div>

        {/* Two-Column Balanced Workspace: Console & Findings (Left) + Challenge & Proof (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
          {/* Column A: Investigation Terminal & Plain-English Decoder (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-3">
            {/* Terminal Query Runner Box */}
            <div className="bg-cyber-900 border border-cyber-border rounded-xl p-3.5 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center space-x-1.5 text-slate-300">
                  <Terminal className="w-4 h-4 text-cyber-cyan" />
                  <span className="font-bold">Investigation Query</span>
                </div>
                <span className="text-[11px] text-slate-400">Tool: {activeStep.tool}</span>
              </div>

              {/* Command bar & run button */}
              <div className="flex items-center space-x-2">
                <div className="bg-cyber-950 border border-cyber-border px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 flex-1 truncate">
                  <span className="text-cyan-500 font-bold select-none">$ </span>
                  <span>{activeStep.command}</span>
                </div>

                <button
                  onClick={handleExecute}
                  disabled={isExecuting}
                  className="bg-cyber-cyan hover:bg-cyan-400 text-cyber-950 font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 shrink-0 shadow-sm disabled:opacity-50"
                >
                  {isExecuting ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current" />
                  )}
                  <span>{isExecuting ? 'Querying...' : 'Re-Run'}</span>
                </button>
              </div>

              {/* Live Terminal Output Window */}
              <div className="bg-black/90 border border-slate-800 rounded-lg p-3 font-mono text-xs text-slate-300 overflow-x-auto relative">
                <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-800/80 pb-1.5 mb-2 select-none">
                  <span>STDOUT OUTPUT</span>
                  <span>NATO STANAG CONFIDENCE: {activeStep.admiraltyScore}</span>
                </div>
                <pre className="whitespace-pre-wrap leading-relaxed text-[11px]">
                  {activeStep.output}
                </pre>
                {/* Visual Highlight Callout */}
                <div className="mt-2.5 p-2 bg-amber-500/10 border-l-2 border-amber-400 rounded-r text-[11px] text-amber-200">
                  <span className="font-bold">🔎 KEY ARTIFACT DETECTED: </span>
                  <span className="font-mono bg-black/50 px-1 py-0.5 rounded text-amber-300 ml-1">
                    {activeStep.highlightLine}
                  </span>
                </div>
              </div>
            </div>

            {/* Plain-English Decoder Box */}
            <div className="bg-gradient-to-r from-cyber-900 to-cyber-850 border border-cyber-cyan/50 rounded-xl p-4 shadow-sm space-y-2">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">
                  {activeStep.decoderTitle}
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeStep.decoderExplanation}
              </p>

              {activeStep.remediation && (
                <div className="pt-2 border-t border-cyber-border text-[11px] text-slate-300 flex items-start space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-400">Security Recommendation: </strong>
                    <span>{activeStep.remediation}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Column B: Interactive Challenge & Evidence Vault Filing (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            {/* Knowledge Check Card */}
            <div className="bg-cyber-900 border border-cyber-border rounded-xl p-4 shadow-sm flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center space-x-1.5 text-xs font-mono text-cyan-400 mb-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span className="font-bold uppercase tracking-wider">Investigative Challenge</span>
                </div>

                <p className="text-xs md:text-sm font-semibold text-white leading-snug">
                  {selectedMission.quiz.question}
                </p>

                {/* Option Cards */}
                <div className="space-y-2 mt-3">
                  {selectedMission.quiz.options.map((opt, idx) => {
                    const isSelected = selectedQuizOption === idx;
                    const isCorrect = idx === selectedMission.quiz.correctIndex;

                    let btnStyle = 'bg-cyber-950 border-cyber-border text-slate-300 hover:border-slate-500';
                    if (quizSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan font-bold';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          if (!quizSubmitted) {
                            setSelectedQuizOption(idx);
                          }
                        }}
                        className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && isCorrect && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {!quizSubmitted ? (
                  <button
                    onClick={() => {
                      if (selectedQuizOption !== null) {
                        setQuizSubmitted(true);
                      }
                    }}
                    disabled={selectedQuizOption === null}
                    className="mt-3 w-full bg-cyber-800 hover:bg-cyber-750 text-slate-200 font-mono text-xs py-2 rounded-lg border border-cyber-border disabled:opacity-40 transition-colors"
                  >
                    Check Answer
                  </button>
                ) : (
                  <div className="mt-3 p-2.5 bg-cyber-950 border border-cyber-border rounded-lg text-xs text-slate-300">
                    <span className="font-bold text-cyber-cyan block mb-0.5">
                      {selectedQuizOption === selectedMission.quiz.correctIndex ? '✅ Correct Conclusion!' : '💡 Key Lesson:'}
                    </span>
                    <span>{selectedMission.quiz.explanation}</span>
                  </div>
                )}
              </div>

              {/* Evidence Log & XP Action */}
              <div className="pt-3 border-t border-cyber-border space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Badge Unlock:</span>
                  <strong className="text-amber-400">{selectedMission.badgeEarned}</strong>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleSaveAndComplete}
                    disabled={isMissionSolved}
                    className={`flex-1 flex items-center justify-center space-x-1.5 font-mono text-xs py-2.5 rounded-lg transition-all shadow-sm ${
                      isMissionSolved
                        ? 'bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 cursor-default'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isMissionSolved ? 'Proof Logged in Vault' : `Save Proof & Claim +${selectedMission.xp} XP`}</span>
                  </button>

                  <button
                    onClick={handleNextMission}
                    className="flex items-center space-x-1 bg-cyber-850 hover:bg-cyber-800 border border-cyber-border text-slate-300 font-mono text-xs px-3 py-2.5 rounded-lg transition-colors shrink-0"
                    title="Advance to next mission"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Link to Deep Analyst Studio */}
            <div className="bg-cyber-950 border border-cyber-border rounded-xl p-3 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Need deep multi-entity link graphs?</span>
              <button
                onClick={onOpenStudio}
                className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
              >
                <span>Open Studio</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Completion Modal */}
      {showCelebration && (
        <div className="fixed inset-0 bg-cyber-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-cyber-900 border-2 border-emerald-500/80 rounded-2xl max-w-sm w-full p-5 shadow-2xl text-center space-y-3.5 relative">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
              <Award className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                MISSION COMPLETED
              </span>
              <h2 className="text-lg font-bold text-white mt-0.5">
                +{selectedMission.xp} XP Awarded
              </h2>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Cryptographic evidence hash (SHA-256) registered to <strong>{selectedMission.target}</strong>.
            </p>

            <div className="bg-cyber-950 border border-cyber-border rounded-lg p-2.5 text-xs font-mono text-amber-300 flex items-center justify-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Badge: <strong>{selectedMission.badgeEarned}</strong></span>
            </div>

            <div className="pt-2 flex items-center justify-center space-x-2">
              <button
                onClick={() => setShowCelebration(false)}
                className="bg-cyber-800 hover:bg-cyber-750 text-slate-300 text-xs font-mono px-3 py-1.5 rounded-lg border border-cyber-border"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowCelebration(false);
                  handleNextMission();
                }}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono px-4 py-1.5 rounded-lg flex items-center space-x-1"
              >
                <span>Next Case</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
