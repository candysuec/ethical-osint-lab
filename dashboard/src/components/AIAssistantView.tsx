import React, { useState } from 'react';
import { Sparkles, Terminal, AlertTriangle, Send, CheckCircle, ShieldAlert } from 'lucide-react';

export const AIAssistantView: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [selectedTask, setSelectedTask] = useState<string>('NORMALIZE');
  const [responseOutput, setResponseOutput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const templates: Record<string, { label: string; template: string; sampleOutput: string }> = {
    'NORMALIZE': {
      label: 'Subdomain & DNS Normalizer',
      template: 'Parse the following raw list of 15 subdomains, extract apex domains, and categorize by functional role (api, dev, stage, vpn):',
      sampleOutput: `| Subdomain | Functional Role | Category |
| :--- | :--- | :--- |
| \`api.aetherdynamics-global.com\` | Public REST API Gateway | Production |
| \`stage-api.horizon-avionics.tech\` | Staging Backend | Non-Production (High Risk) |
| \`vpn-east.aetherdynamics-global.com\` | Remote Access Portal | Infrastructure |`
    },
    'TIMELINE': {
      label: 'Timestamp to Event Timeline',
      template: 'Extract and sort the following timestamps into a Markdown timeline with elapsed delta hours:',
      sampleOutput: `* **2024-03-15 00:00 UTC:** Form 8-K Merger disclosure finalized.
* **2025-06-20 11:42 UTC (+462 days):** Wildcard SSL certificate issued by Let's Encrypt.
* **2026-11-04 16:32 UTC (+502 days):** Dangling CNAME pointer detected on AWS S3.`
    },
    'BLUF': {
      label: 'Executive BLUF Drafter',
      template: 'Using only the verified findings in the evidence ledger, draft a 3-paragraph executive briefing for the Chief Information Security Officer:',
      sampleOutput: `**Bottom-Line Up Front (BLUF):**
Aether Dynamics Global Corporation retains significant external perimeter risk resulting from inherited digital debt from the Horizon Avionics acquisition. A dangling CNAME record pointing to an unclaimed AWS S3 bucket was confirmed on a high-value staging subdomain, creating an immediate risk of domain takeover.

**Strategic Impact:**
Because subsidiary domains lack DMARC email enforcement, adversaries can pair look-alike phishing gateways with hijacked staging subdomains to target defense partners ahead of the upcoming IPO.

**Immediate Remediation:**
1. Instruct cloud operations to delete the dangling Route53 CNAME immediately.
2. Elevate DMARC enforcement to p=reject on all corporate subsidiaries.`
    }
  };

  const handleRun = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseOutput('');

    setTimeout(() => {
      setLoading(false);
      setResponseOutput(templates[selectedTask].sampleOutput);
    }, 800);
  };

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full max-w-5xl mx-auto">
      <div>
        <h1 className="text-xl font-bold font-mono text-slate-100 flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-cyber-cyan" />
          <span>HUMAN-IN-THE-LOOP AI RESEARCH ASSISTANT</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Accelerates data parsing, timeline sorting, and report drafting. Strict Invariant: Zero synthetic hallucinations permitted in final deliverables.
        </p>
      </div>

      {/* Mandatory Human Gate Banner */}
      <div className="bg-amber-950/40 border border-amber-500/50 p-4 rounded-lg flex items-start space-x-3 text-xs font-mono text-amber-300">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block uppercase tracking-wider">MANDATORY HUMAN VERIFICATION GATE:</span>
          <span>
            AI language models must NEVER be used as ungrounded search engines for facts. All AI-generated text, entity suggestions, or timelines must be personally verified against primary cryptographic evidence before inclusion in any report.
          </span>
        </div>
      </div>

      {/* Workflow Sandbox */}
      <div className="bg-cyber-900 border border-cyber-border rounded-lg p-5 space-y-4">
        <div className="flex flex-wrap gap-2">
          {Object.entries(templates).map(([key, t]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedTask(key);
                setPrompt(t.template);
                setResponseOutput('');
              }}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                selectedTask === key
                  ? 'bg-cyber-cyan text-cyber-950 font-bold'
                  : 'bg-cyber-850 text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleRun} className="space-y-3">
          <textarea
            value={prompt || templates[selectedTask].template}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full bg-cyber-950 border border-cyber-border rounded p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyber-cyan min-h-[100px]"
            placeholder="Enter research data or instruction..."
          />

          <div className="flex justify-between items-center">
            <span className="text-[11px] font-mono text-slate-500">
              Model: Sovereign Ollama / Local Enclave (Zero Data Retention)
            </span>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-1.5 bg-cyber-cyan text-cyber-950 font-bold px-4 py-2 rounded text-xs font-mono hover:bg-cyan-400 transition-colors disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{loading ? 'PROCESSING...' : 'RUN ASSISTANT'}</span>
            </button>
          </div>
        </form>

        {responseOutput && (
          <div className="mt-4 pt-4 border-t border-cyber-border space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-emerald-400 font-bold flex items-center space-x-1">
                <CheckCircle className="w-4 h-4" />
                <span>AI SYNTHESIS COMPLETE (AWAITING ANALYST SIGN-OFF)</span>
              </span>
              <button
                onClick={() => navigator.clipboard.writeText(responseOutput)}
                className="text-[10px] font-mono text-slate-400 hover:text-white"
              >
                Copy to Scratchpad
              </button>
            </div>
            <div className="bg-cyber-950 p-4 rounded border border-cyber-border text-xs font-mono text-slate-200 leading-relaxed whitespace-pre-wrap">
              {responseOutput}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
