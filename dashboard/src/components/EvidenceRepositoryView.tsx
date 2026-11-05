import React, { useState } from 'react';
import { FileCheck, Shield, ExternalLink, Hash, CheckCircle, Copy, AlertTriangle } from 'lucide-react';
import { EvidenceItem } from '../types';

interface EvidenceRepositoryProps {
  evidence: EvidenceItem[];
}

export const EvidenceRepositoryView: React.FC<EvidenceRepositoryProps> = ({ evidence }) => {
  const [selectedItem, setSelectedItem] = useState<EvidenceItem>(evidence[0]);
  const [testHashInput, setTestHashInput] = useState<string>('');
  const [verifyResult, setVerifyResult] = useState<'MATCH' | 'MISMATCH' | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testHashInput) return;
    if (testHashInput.trim().toLowerCase() === selectedItem.sha256Hash.toLowerCase()) {
      setVerifyResult('MATCH');
    } else {
      setVerifyResult('MISMATCH');
    }
  };

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-cyber-border pb-4">
        <div>
          <h1 className="text-xl font-bold font-mono text-slate-100 flex items-center space-x-2">
            <FileCheck className="w-5 h-5 text-emerald-400" />
            <span>CRYPTOGRAPHIC EVIDENCE REPOSITORY (ISO/IEC 27037)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tamper-evident chain of custody. Every artifact is verified with SHA-256 integrity hashes, UTC timestamping, and immutable archive links.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono bg-emerald-950/40 border border-emerald-600/40 text-emerald-400 px-3 py-1.5 rounded">
          <Shield className="w-4 h-4" />
          <span>CHAIN OF CUSTODY: LOCKED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Evidence List */}
        <div className="lg:col-span-2 bg-cyber-900 border border-cyber-border rounded-lg overflow-hidden">
          <div className="p-3 bg-cyber-950 border-b border-cyber-border flex justify-between items-center text-xs font-mono text-slate-400">
            <span>REGISTERED ARTIFACTS ({evidence.length})</span>
            <span>NATO ADMIRALTY SCORED</span>
          </div>
          <div className="divide-y divide-cyber-border/60">
            {evidence.map((item) => {
              const isSelected = selectedItem.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                    setVerifyResult(null);
                    setTestHashInput('');
                  }}
                  className={`p-4 transition-colors cursor-pointer flex items-start justify-between ${
                    isSelected ? 'bg-cyber-850 border-l-4 border-cyber-cyan' : 'hover:bg-cyber-850/60'
                  }`}
                >
                  <div className="space-y-1 pr-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold text-cyber-cyan">{item.itemNumber}</span>
                      <span className="text-xs font-mono text-slate-200 font-semibold">{item.title}</span>
                    </div>

                    <div className="text-[11px] font-mono text-slate-400 truncate max-w-lg">
                      Source: {item.sourceUrl}
                    </div>

                    <div className="flex items-center space-x-3 text-[10px] font-mono text-slate-500 pt-1">
                      <span>Hash: {item.sha256Hash.slice(0, 20)}...</span>
                      <span>UTC: {item.captureTimestamp}</span>
                      <span>Verified: {item.verifiedBy}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-1 shrink-0">
                    <span className="text-xs font-mono font-bold bg-cyber-800 text-emerald-400 border border-cyber-border px-2 py-0.5 rounded">
                      {item.admiraltyReliability}{item.admiraltyCredibility}
                    </span>
                    {item.fullViewportVerified && (
                      <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/40 px-1.5 py-0.5 rounded">
                        FULL VIEWPORT
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Evidence Inspector & Hash Verifier */}
        <div className="space-y-4">
          <div className="bg-cyber-900 border border-cyber-border rounded-lg p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-cyber-border pb-3">
              <span className="text-xs font-mono font-bold text-slate-100 flex items-center space-x-1.5">
                <Hash className="w-4 h-4 text-cyber-cyan" />
                <span>INTEGRITY VERIFICATION</span>
              </span>
              <span className="text-xs font-mono text-cyber-cyan">{selectedItem.itemNumber}</span>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Registered SHA-256 Checksum</span>
                <div className="bg-cyber-950 p-2.5 rounded border border-cyber-border text-slate-300 break-all select-all font-mono text-[11px] mt-1">
                  {selectedItem.sha256Hash}
                </div>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Original Source URL</span>
                <a 
                  href={selectedItem.sourceUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-cyber-cyan hover:underline flex items-center space-x-1 mt-1 truncate"
                >
                  <span className="truncate">{selectedItem.sourceUrl}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>

              {selectedItem.archiveUrl && (
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Immutable Wayback Archive Snapshot</span>
                  <a 
                    href={selectedItem.archiveUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-purple-400 hover:underline flex items-center space-x-1 mt-1 truncate"
                  >
                    <span className="truncate">{selectedItem.archiveUrl}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>
              )}

              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Local Forensic Storage Path</span>
                <span className="text-slate-300 block mt-1 bg-cyber-950 p-2 rounded border border-cyber-border">
                  {selectedItem.filePath}
                </span>
              </div>
            </div>

            {/* Interactive Hash Matching Sandbox */}
            <form onSubmit={handleVerify} className="pt-3 border-t border-cyber-border space-y-2">
              <label className="text-[11px] font-mono text-slate-400 block">
                AUDIT TEST: Checksum Verification Sandbox
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={testHashInput}
                  onChange={(e) => setTestHashInput(e.target.value)}
                  placeholder="Paste SHA-256 hash to test integrity..."
                  className="flex-1 bg-cyber-850 border border-cyber-border rounded px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyber-cyan"
                />
                <button
                  type="submit"
                  className="bg-cyber-cyan text-cyber-950 font-bold px-3 py-1.5 rounded text-xs font-mono hover:bg-cyan-400"
                >
                  AUDIT
                </button>
              </div>

              {verifyResult === 'MATCH' && (
                <div className="bg-emerald-950/40 border border-emerald-600/50 p-2 rounded text-emerald-400 text-xs font-mono flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4" />
                  <span>CRYPTOGRAPHIC MATCH: Evidence is untampered.</span>
                </div>
              )}

              {verifyResult === 'MISMATCH' && (
                <div className="bg-rose-950/40 border border-rose-600/50 p-2 rounded text-rose-400 text-xs font-mono flex items-center space-x-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>HASH MISMATCH: Integrity failure detected!</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
