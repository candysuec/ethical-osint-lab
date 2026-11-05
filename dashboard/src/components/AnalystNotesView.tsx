import React, { useState } from 'react';
import { StickyNote, Plus, Save, Tag, Shield } from 'lucide-react';
import { AnalystNote } from '../types';

interface AnalystNotesProps {
  currentCaseId: string;
  notes: AnalystNote[];
  onSaveNote: (note: AnalystNote) => void;
}

export const AnalystNotesView: React.FC<AnalystNotesProps> = ({ currentCaseId, notes, onSaveNote }) => {
  const [selectedNote, setSelectedNote] = useState<AnalystNote>(notes[0]);
  const [editTitle, setEditTitle] = useState<string>(notes[0]?.title || '');
  const [editContent, setEditContent] = useState<string>(notes[0]?.contentMarkdown || '');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSelectNote = (n: AnalystNote) => {
    setSelectedNote(n);
    setEditTitle(n.title);
    setEditContent(n.contentMarkdown);
    setSavedSuccess(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: AnalystNote = {
      ...selectedNote,
      title: editTitle,
      contentMarkdown: editContent,
      updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
    };
    onSaveNote(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleNewNote = () => {
    const fresh: AnalystNote = {
      id: `note-${Date.now()}`,
      caseId: currentCaseId,
      author: 'Lead_Investigator_Chevalier',
      title: 'New Investigative Hypothesis',
      contentMarkdown: '### Working Hypothesis\nRecord observations and primary source links here...',
      tags: ['Working_Hypothesis'],
      isHypothesis: true,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC',
      updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
    };
    onSaveNote(fresh);
    handleSelectNote(fresh);
  };

  return (
    <div className="p-6 space-y-6 overflow-hidden h-full flex flex-col max-w-6xl mx-auto">
      <div className="flex justify-between items-center border-b border-cyber-border pb-4 shrink-0">
        <div>
          <h1 className="text-xl font-bold font-mono text-slate-100 flex items-center space-x-2">
            <StickyNote className="w-5 h-5 text-cyber-cyan" />
            <span>ANALYST SCRATCHPAD & HYPOTHESIS VAULT</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Working notes and competing hypotheses. Hypotheses remain clearly segregated from certified evidence.
          </p>
        </div>

        <button
          onClick={handleNewNote}
          className="flex items-center space-x-1.5 bg-cyber-cyan text-cyber-950 font-bold px-3 py-1.5 rounded text-xs font-mono hover:bg-cyan-400"
        >
          <Plus className="w-4 h-4" />
          <span>NEW SCRATCHPAD</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Notes List */}
        <div className="bg-cyber-900 border border-cyber-border rounded-lg p-3 overflow-y-auto space-y-2">
          {notes.map((n) => (
            <div
              key={n.id}
              onClick={() => handleSelectNote(n)}
              className={`p-3 rounded border cursor-pointer transition-colors ${
                selectedNote?.id === n.id
                  ? 'bg-cyber-850 border-cyber-cyan text-slate-100'
                  : 'bg-cyber-950 border-cyber-border/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="text-xs font-mono font-bold line-clamp-1">{n.title}</div>
              <div className="text-[10px] font-mono text-slate-500 mt-1">Author: {n.author}</div>
              <div className="flex flex-wrap gap-1 mt-2">
                {n.tags.map((t, idx) => (
                  <span key={idx} className="bg-cyber-800 text-slate-400 text-[9px] px-1.5 py-0.5 rounded">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Note Editor */}
        <form onSubmit={handleSave} className="md:col-span-2 bg-cyber-900 border border-cyber-border rounded-lg p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3 flex-1 flex flex-col">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full bg-cyber-950 border border-cyber-border rounded px-3 py-2 text-sm font-bold font-mono text-slate-100 focus:outline-none focus:border-cyber-cyan"
              required
            />

            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full flex-1 min-h-[300px] bg-cyber-950 border border-cyber-border rounded p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyber-cyan leading-relaxed"
              required
            />
          </div>

          <div className="flex justify-between items-center border-t border-cyber-border pt-3">
            <span className="text-[11px] font-mono text-slate-400">
              {savedSuccess ? (
                <span className="text-emerald-400 font-bold">&check; Saved to local encrypted storage</span>
              ) : (
                `Last edited: ${selectedNote?.updatedAt}`
              )}
            </span>

            <button
              type="submit"
              className="flex items-center space-x-1.5 bg-cyber-cyan text-cyber-950 font-bold px-4 py-1.5 rounded text-xs font-mono hover:bg-cyan-400"
            >
              <Save className="w-4 h-4" />
              <span>SAVE NOTES</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
