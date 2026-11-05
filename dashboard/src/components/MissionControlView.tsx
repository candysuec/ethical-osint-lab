import React, { useState } from 'react';
import { 
  Trophy, CheckCircle2, Play, Terminal, HelpCircle, 
  Sparkles, Award, ExternalLink, ChevronRight, AlertCircle,
  FileText, ShieldCheck, ArrowRight, RefreshCw, Star, Info
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
  const [selectedMission, setSelectedMission] = useState<Mission>(missionsData[1]); // Default to Case 02 (Mail Security) - high impact & approachable
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [hasExecuted, setHasExecuted] = useState<boolean>(false);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter missions based on tier and search
  const filteredMissions = missionsData.filter(m => {
    const matchesTier = m.tier === selectedTier;
    const matchesSearch = searchQuery === '' || 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  const activeStep = selectedMission.steps[activeStepIndex] || selectedMission.steps[0];
  const isMissionSolved = completedMissionIds.includes(selectedMission.id);

  // Experience calculation
  const totalCompleted = completedMissionIds.length;
  const totalXp = completedMissionIds.reduce((sum, id) => {
    const m = missionsData.find(item => item.id === id);
    return sum + (m ? m.xp : 0);
  }, 0);

  const getRank = (xp: number) => {
    if (xp >= 3000) return { title: 'Master Cyber Intelligence Architect', badge: '🎖️ Tier IV' };
    if (xp >= 1500) return { title: 'Senior OSINT Investigator', badge: '⚡ Tier III' };
    if (xp >= 500) return { title: 'Junior Intelligence Analyst', badge: '🛡️ Tier II' };
    return { title: 'Cadet OSINT Investigator', badge: '🔰 Tier I' };
  };

  const rank = getRank(totalXp);

  // Execution simulation
  const handleExecute = () => {
    setIsExecuting(true);
    setHasExecuted(false);
    setTimeout(() => {
      setIsExecuting(false);
      setHasExecuted(true);
    }, 700);
  };

  // Switch mission
  const handleSelectMission = (mission: Mission) => {
    setSelectedMission(mission);
    setActiveStepIndex(0);
    setHasExecuted(false);
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
    <div className="flex flex-col h-full bg-cyber-950 text-slate-200 overflow-hidden font-sans">
      {/* Top Learning Progress Banner */}
      <div className="bg-gradient-to-r from-cyber-900 via-cyber-850 to-cyber-900 border-b border-cyber-border px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center text-cyber-cyan shadow-sm">
            <Trophy className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold text-white tracking-wide">{rank.title}</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded font-mono font-bold">
                {rank.badge}
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono mt-0.5">
              {totalCompleted} of 30 Cases Solved • <span className="text-amber-400 font-bold">{totalXp} XP</span> Earned
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
            <span>Curriculum Mastery Progress</span>
            <span className="text-cyan-400 font-bold">{Math.round((totalCompleted / 30) * 100)}% Complete</span>
          </div>
          <div className="w-full h-2.5 bg-cyber-950 rounded-full border border-cyber-border overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-amber-400 transition-all duration-700 ease-out"
              style={{ width: `${Math.max(4, (totalCompleted / 30) * 100)}%` }}
            />
          </div>
        </div>

        {/* Quick Guide Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenGuide}
            className="flex items-center space-x-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs px-3 py-1.5 rounded-lg transition-colors font-mono"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Need Help?</span>
          </button>
          <button
            onClick={onOpenStudio}
            className="flex items-center space-x-1.5 bg-cyber-800 hover:bg-cyber-750 border border-cyber-border text-slate-300 text-xs px-3 py-1.5 rounded-lg transition-colors font-mono"
            title="Open Advanced 14-Tab Analyst Studio"
          >
            <span>Analyst Studio</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Main Split Interface */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Pane: 30 Mission Syllabus Selector */}
        <div className="w-80 md:w-96 bg-cyber-900 border-r border-cyber-border flex flex-col overflow-hidden">
          {/* Tier Switcher Tabs */}
          <div className="p-3 border-b border-cyber-border bg-cyber-950/60">
            <div className="grid grid-cols-3 gap-1 bg-cyber-950 p-1 rounded-lg border border-cyber-border text-xs font-mono">
              <button
                onClick={() => setSelectedTier('BEGINNER')}
                className={`py-1.5 px-2 rounded font-bold transition-all text-center ${
                  selectedTier === 'BEGINNER' 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Beginner
              </button>
              <button
                onClick={() => setSelectedTier('INTERMEDIATE')}
                className={`py-1.5 px-2 rounded font-bold transition-all text-center ${
                  selectedTier === 'INTERMEDIATE' 
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Intermediate
              </button>
              <button
                onClick={() => setSelectedTier('ADVANCED')}
                className={`py-1.5 px-2 rounded font-bold transition-all text-center ${
                  selectedTier === 'ADVANCED' 
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Advanced
              </button>
            </div>

            {/* Quick Search */}
            <input
              type="text"
              placeholder="Search 30 cases by title or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mt-2 w-full bg-cyber-950 border border-cyber-border text-slate-200 text-xs px-3 py-1.5 rounded focus:outline-none focus:border-cyber-cyan font-mono"
            />
          </div>

          {/* Mission List */}
          <div className="flex-1 overflow-y-auto divide-y divide-cyber-border/40 p-2 space-y-1">
            {filteredMissions.map((m) => {
              const isSelected = selectedMission.id === m.id;
              const isSolved = completedMissionIds.includes(m.id);

              return (
                <button
                  key={m.id}
                  onClick={() => handleSelectMission(m)}
                  className={`w-full text-left p-3 rounded-lg transition-all flex items-start space-x-3 ${
                    isSelected
                      ? 'bg-cyber-850 border border-cyber-cyan text-white shadow-md'
                      : 'hover:bg-cyber-850/60 text-slate-300'
                  }`}
                >
                  <div className="mt-0.5">
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
                      <span className="text-slate-400 font-bold">{m.caseNumber}</span>
                      <span className="text-amber-400 font-bold">+{m.xp} XP</span>
                    </div>
                    <div className="text-xs font-semibold truncate leading-tight">
                      {m.title}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5 font-mono">
                      Target: {m.target}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Pane: Active Mission Console */}
        <div className="flex-1 overflow-y-auto bg-cyber-950 p-6 flex flex-col space-y-6">
          {/* Mission Header Card */}
          <div className="bg-cyber-900 border border-cyber-border rounded-xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center space-x-2">
                <span className="bg-cyber-cyan/10 border border-cyber-cyan/40 text-cyber-cyan text-xs font-mono font-bold px-2.5 py-1 rounded">
                  {selectedMission.caseNumber}
                </span>
                <span className="bg-cyber-800 text-slate-300 text-xs font-mono px-2.5 py-1 rounded border border-cyber-border">
                  {selectedMission.category}
                </span>
                <span className="bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold px-2.5 py-1 rounded flex items-center space-x-1">
                  <Star className="w-3 h-3 text-amber-400" />
                  <span>+{selectedMission.xp} XP</span>
                </span>
              </div>

              {isMissionSolved && (
                <div className="flex items-center space-x-1.5 text-emerald-400 bg-emerald-950/60 border border-emerald-500/50 px-3 py-1 rounded text-xs font-mono font-bold animate-pulse">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>CASE COMPLETED & LOGGED</span>
                </div>
              )}
            </div>

            <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
              {selectedMission.title}
            </h1>

            {/* Plain English Mission Objective */}
            <div className="mt-3 bg-cyber-950/80 border border-cyber-border rounded-lg p-3 text-sm text-slate-200 flex items-start space-x-3">
              <Info className="w-5 h-5 text-cyber-cyan shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-cyber-cyan block mb-0.5 text-xs font-mono uppercase tracking-wider">
                  Plain-English Mission Objective:
                </span>
                <span>{selectedMission.oneSentenceObjective}</span>
              </div>
            </div>

            {/* Safe Target Scope */}
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
              <div>
                <span className="text-slate-500">Target Entity: </span>
                <span className="text-emerald-400 font-bold bg-cyber-950 px-2 py-0.5 rounded border border-cyber-border">
                  {selectedMission.target}
                </span>
              </div>
              <div>
                <span className="text-slate-500">Legal Guardrail: </span>
                <span className="text-slate-300">{selectedMission.safeTargetDescription}</span>
              </div>
            </div>
          </div>

          {/* Interactive Tool Execution Arena */}
          <div className="bg-cyber-900 border border-cyber-border rounded-xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-cyber-border/60 pb-3">
              <div className="flex items-center space-x-2">
                <Terminal className="w-5 h-5 text-cyber-cyan" />
                <span className="text-sm font-bold text-white tracking-wide">
                  Step 1 of {selectedMission.steps.length}: {activeStep.name}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Utility: <strong className="text-slate-200">{activeStep.tool}</strong>
              </span>
            </div>

            {/* The 1-Click Action Button */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleExecute}
                disabled={isExecuting}
                className="flex items-center space-x-2 bg-cyber-cyan hover:bg-cyan-400 text-cyber-950 font-bold text-sm px-5 py-2.5 rounded-lg transition-all shadow-md shadow-cyan-950/40 disabled:opacity-50"
              >
                {isExecuting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Executing Query...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>⚡ Run Investigation Query</span>
                  </>
                )}
              </button>

              <div className="bg-cyber-950 border border-cyber-border px-3 py-2 rounded text-xs font-mono text-slate-300 flex-1 truncate">
                <span className="text-slate-500 select-none">$ </span>
                <span>{activeStep.command}</span>
              </div>
            </div>

            {/* Simulated Live Output Console */}
            {(hasExecuted || isMissionSolved) && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="bg-black/90 border border-slate-700/80 rounded-lg p-4 font-mono text-xs text-slate-200 shadow-inner overflow-x-auto relative">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-800 pb-2 mb-2 select-none">
                    <span>LIVE TERMINAL OUTPUT</span>
                    <span>NATO STANAG CONFIDENCE: {activeStep.admiraltyScore}</span>
                  </div>
                  <pre className="whitespace-pre-wrap leading-relaxed">
                    {activeStep.output}
                  </pre>
                  {/* Glowing Highlight Box on Key Line */}
                  <div className="mt-2 p-2 bg-amber-500/10 border-l-4 border-amber-400 text-amber-200 text-xs">
                    <span className="font-bold">🔎 KEY FINDING DETECTED: </span>
                    <span className="font-mono bg-black/40 px-1 py-0.5 rounded text-amber-300">
                      {activeStep.highlightLine}
                    </span>
                  </div>
                </div>

                {/* Plain-English Decoder Box */}
                <div className="bg-gradient-to-r from-cyber-850 to-cyber-900 border-2 border-cyber-cyan/60 rounded-xl p-5 shadow-xl relative">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <h3 className="text-base font-bold text-white">
                      {activeStep.decoderTitle}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {activeStep.decoderExplanation}
                  </p>

                  {activeStep.remediation && (
                    <div className="mt-3 pt-3 border-t border-cyber-border/80 text-xs text-slate-300 flex items-start space-x-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-emerald-400">Defensive Remediation: </strong>
                        <span>{activeStep.remediation}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Knowledge Check Mini-Quiz */}
                <div className="bg-cyber-950 border border-cyber-border rounded-xl p-5 space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
                    <HelpCircle className="w-4 h-4 text-cyber-cyan" />
                    <span className="font-bold text-slate-200 uppercase tracking-wider">
                      Analyst Comprehension Check
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-white">
                    {selectedMission.quiz.question}
                  </p>

                  <div className="space-y-2 mt-2">
                    {selectedMission.quiz.options.map((opt, idx) => {
                      const isSelected = selectedQuizOption === idx;
                      const isCorrect = idx === selectedMission.quiz.correctIndex;

                      let btnStyle = 'bg-cyber-900 border-cyber-border text-slate-300 hover:border-slate-500';
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
                          className={`w-full text-left p-3 rounded-lg border text-xs md:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
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
                      className="mt-2 bg-cyber-800 hover:bg-cyber-700 text-slate-200 font-mono text-xs px-4 py-2 rounded border border-cyber-border disabled:opacity-40 transition-colors"
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <div className="mt-3 p-3 bg-cyber-900 border border-cyber-border rounded-lg text-xs text-slate-300">
                      <span className="font-bold text-cyber-cyan block mb-1">
                        {selectedQuizOption === selectedMission.quiz.correctIndex ? '✅ Correct!' : '💡 Takeaway:'}
                      </span>
                      <span>{selectedMission.quiz.explanation}</span>
                    </div>
                  )}
                </div>

                {/* Final Action: Save as Evidence & Claim XP */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-cyber-border">
                  <div className="text-xs font-mono text-slate-400">
                    Badge Reward: <strong className="text-amber-400">{selectedMission.badgeEarned}</strong>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleSaveAndComplete}
                      disabled={isMissionSolved}
                      className={`flex items-center space-x-2 font-mono text-xs px-5 py-2.5 rounded-lg transition-all shadow-md ${
                        isMissionSolved
                          ? 'bg-emerald-900/60 border border-emerald-500/50 text-emerald-300 cursor-default'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-emerald-950/40'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isMissionSolved ? 'Evidence Archived in Vault' : `💾 Save Evidence & Claim +${selectedMission.xp} XP`}</span>
                    </button>

                    <button
                      onClick={handleNextMission}
                      className="flex items-center space-x-1.5 bg-cyber-850 hover:bg-cyber-800 border border-cyber-border text-slate-300 font-mono text-xs px-4 py-2.5 rounded-lg transition-colors"
                    >
                      <span>Next Case</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Completion Toast / Modal */}
      {showCelebration && (
        <div className="fixed inset-0 bg-cyber-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-cyber-900 border-2 border-emerald-500/80 rounded-2xl max-w-md w-full p-6 shadow-2xl text-center space-y-4 relative">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                MISSION ACCOMPLISHED!
              </span>
              <h2 className="text-xl font-extrabold text-white mt-1">
                +{selectedMission.xp} XP Earned
              </h2>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Your findings for <strong>{selectedMission.target}</strong> have been cryptographically hashed (SHA-256) and recorded in the sovereign Evidence Vault.
            </p>

            <div className="bg-cyber-950 border border-cyber-border rounded-lg p-3 text-xs font-mono text-amber-300 flex items-center justify-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Badge Unlocked: <strong>{selectedMission.badgeEarned}</strong></span>
            </div>

            <div className="pt-2 flex items-center justify-center space-x-3">
              <button
                onClick={() => setShowCelebration(false)}
                className="bg-cyber-800 hover:bg-cyber-750 text-slate-300 text-xs font-mono px-4 py-2 rounded-lg border border-cyber-border transition-colors"
              >
                Stay on Case
              </button>
              <button
                onClick={() => {
                  setShowCelebration(false);
                  handleNextMission();
                }}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono px-5 py-2 rounded-lg transition-colors flex items-center space-x-1.5 shadow-md"
              >
                <span>Proceed to Next Case</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
