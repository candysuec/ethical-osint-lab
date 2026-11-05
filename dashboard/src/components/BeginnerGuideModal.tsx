import React, { useState } from 'react';
import { 
  HelpCircle, Play, CheckCircle2, ArrowRight, Shield, 
  Terminal, AlertTriangle, BookOpen, Lightbulb, Compass
} from 'lucide-react';

interface BeginnerGuideProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectToolAndRun: (tool: string) => void;
}

export const BeginnerGuideModal: React.FC<BeginnerGuideProps> = ({ isOpen, onClose, onSelectToolAndRun }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-cyber-950/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in select-none">
      <div className="bg-cyber-900 border-2 border-cyber-cyan/60 rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl shadow-cyan-950/60 relative max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white font-mono text-xs bg-cyber-850 border border-cyber-border px-2.5 py-1 rounded"
        >
          ✕ Close Guide
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-cyber-cyan/20 border border-cyber-cyan/50 flex items-center justify-center">
            <Compass className="w-6 h-6 text-cyber-cyan" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-mono text-slate-100">
              🔰 Plain English Guide: How to Actually Use This Lab
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Zero jargon. A 3-minute explanation of what you are doing, why you are doing it, and what buttons to click.
            </p>
          </div>
        </div>

        {/* Step Indicator Tabs */}
        <div className="grid grid-cols-3 gap-2 mb-6 text-xs font-mono">
          <button
            onClick={() => setActiveStep(1)}
            className={`p-3 rounded-lg border text-left transition-all ${
              activeStep === 1 
                ? 'bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan font-bold' 
                : 'bg-cyber-950 border-cyber-border text-slate-400 hover:bg-cyber-850'
            }`}
          >
            <div className="text-[10px] text-slate-500">STEP 1</div>
            <div>The Big Picture (Why?)</div>
          </button>

          <button
            onClick={() => setActiveStep(2)}
            className={`p-3 rounded-lg border text-left transition-all ${
              activeStep === 2 
                ? 'bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan font-bold' 
                : 'bg-cyber-950 border-cyber-border text-slate-400 hover:bg-cyber-850'
            }`}
          >
            <div className="text-[10px] text-slate-500">STEP 2</div>
            <div>What the 7 Tools Do</div>
          </button>

          <button
            onClick={() => setActiveStep(3)}
            className={`p-3 rounded-lg border text-left transition-all ${
              activeStep === 3 
                ? 'bg-cyber-cyan/20 border-cyber-cyan text-cyber-cyan font-bold' 
                : 'bg-cyber-950 border-cyber-border text-slate-400 hover:bg-cyber-850'
            }`}
          >
            <div className="text-[10px] text-slate-500">STEP 3</div>
            <div>Your 3-Click Walkthrough</div>
          </button>
        </div>

        {/* STEP 1: THE BIG PICTURE */}
        {activeStep === 1 && (
          <div className="space-y-4 text-xs font-mono leading-relaxed text-slate-300">
            <div className="bg-cyber-950 p-4 rounded-xl border border-cyber-border space-y-2">
              <span className="text-cyber-cyan font-bold text-sm block flex items-center space-x-1.5">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>What is your role here?</span>
              </span>
              <p>
                Imagine a company (like <strong>Aether Dynamics Global</strong>) is preparing to go public or hire you as their security consultant. The CEO comes to you and asks:
              </p>
              <blockquote className="border-l-2 border-cyber-cyan pl-3 py-1 italic text-slate-200 bg-cyber-900/60 rounded">
                "What can a hacker find out about our company from the outside without breaking in? Can they spoof our email? Are any of our test servers exposed? Are there fake phishing websites pretending to be us?"
              </blockquote>
              <p>
                <strong>Your job is to answer those questions using 100% public information (OSINT).</strong> You never hack in, you never guess passwords, and you never touch private individuals. You inspect the public internet records the company forgot they left online.
              </p>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 p-4 rounded-xl text-emerald-300 space-y-1">
              <span className="font-bold block text-sm">The 3 Things You Will Create:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li><strong>Evidence Items:</strong> Proof of public security flaws with timestamps and SHA-256 hashes.</li>
                <li><strong>Relationship Graph:</strong> A visual map of their servers, domains, and subsidiaries.</li>
                <li><strong>Executive Briefing:</strong> A 1-page report telling the CEO exactly what to fix before they get hacked.</li>
              </ul>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveStep(2)}
                className="px-4 py-2 bg-cyber-cyan text-cyber-950 font-bold rounded-lg hover:bg-cyan-400 flex items-center space-x-1.5 transition-colors"
              >
                <span>Next: Learn what the tools do &rarr;</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: WHAT THE TOOLS DO IN PLAIN ENGLISH */}
        {activeStep === 2 && (
          <div className="space-y-3 text-xs font-mono text-slate-300">
            <p className="text-slate-400 mb-2">
              Every tool in the workbench has one specific job. Here is what they actually do in plain English:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
              <div className="bg-cyber-950 p-3 rounded-lg border border-cyber-border space-y-1">
                <span className="text-cyber-cyan font-bold block">1. DNS & Perimeter Mail Audit (`dig`)</span>
                <span className="text-[10px] text-slate-500 block uppercase">The Internet Phonebook</span>
                <p className="text-slate-400 text-[11px]">
                  Checks who delivers their email. Tells you if a criminal can send fake phishing emails pretending to be the CEO because their <strong>DMARC policy is set to `p=none`</strong>.
                </p>
              </div>

              <div className="bg-cyber-950 p-3 rounded-lg border border-cyber-border space-y-1">
                <span className="text-cyber-cyan font-bold block">2. Certificate Log Miner (`crt.sh`)</span>
                <span className="text-[10px] text-slate-500 block uppercase">The Public SSL Notary Book</span>
                <p className="text-slate-400 text-[11px]">
                  Every time someone makes an HTTPS website, it gets registered in an un-deletable public log. This tool finds forgotten test servers like <code>stage.company.com</code>.
                </p>
              </div>

              <div className="bg-cyber-950 p-3 rounded-lg border border-cyber-border space-y-1">
                <span className="text-cyber-cyan font-bold block">3. Typosquat Threat Matrix (`dnstwist`)</span>
                <span className="text-[10px] text-slate-500 block uppercase">The Look-Alike Domain Hunter</span>
                <p className="text-slate-400 text-[11px]">
                  Finds fake websites criminals registered that look like the company (e.g. <code>aetherdynamic-login.com</code>) to steal employee passwords.
                </p>
              </div>

              <div className="bg-cyber-950 p-3 rounded-lg border border-cyber-border space-y-1">
                <span className="text-cyber-cyan font-bold block">4. BGP Routing & Netblocks (BGPView)</span>
                <span className="text-[10px] text-slate-500 block uppercase">The Internet Highway Map</span>
                <p className="text-slate-400 text-[11px]">
                  Tells you which cloud providers (Amazon, Google, Cloudflare) physically host their servers and what IP ranges they own.
                </p>
              </div>

              <div className="bg-cyber-950 p-3 rounded-lg border border-cyber-border space-y-1">
                <span className="text-cyber-cyan font-bold block">5. Document Metadata Forensics (`exiftool`)</span>
                <span className="text-[10px] text-slate-500 block uppercase">The Digital Fingerprint Reader</span>
                <p className="text-slate-400 text-[11px]">
                  Inspects public PDFs to reveal the author's internal username (e.g. <code>evance</code>), computer operating system, and local folder paths.
                </p>
              </div>

              <div className="bg-cyber-950 p-3 rounded-lg border border-cyber-border space-y-1">
                <span className="text-cyber-cyan font-bold block">6. Web Preservation Drift (Wayback CDX)</span>
                <span className="text-[10px] text-slate-500 block uppercase">The Internet Time Machine</span>
                <p className="text-slate-400 text-[11px]">
                  Compares their website from 3 years ago vs today to uncover old office addresses, former technology partners, and acquisitions.
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-cyber-border">
              <button
                onClick={() => setActiveStep(1)}
                className="text-slate-400 hover:text-white"
              >
                &larr; Back
              </button>
              <button
                onClick={() => setActiveStep(3)}
                className="px-4 py-2 bg-cyber-cyan text-cyber-950 font-bold rounded-lg hover:bg-cyan-400 flex items-center space-x-1.5 transition-colors"
              >
                <span>Next: 3-Click Walkthrough &rarr;</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: THE 3-CLICK WALKTHROUGH */}
        {activeStep === 3 && (
          <div className="space-y-4 text-xs font-mono text-slate-300">
            <div className="bg-cyber-950 p-4 rounded-xl border border-cyber-border space-y-3">
              <span className="text-emerald-400 font-bold text-sm block">
                Try It Right Now (3 Steps):
              </span>

              <div className="space-y-3 text-[11px]">
                <div className="flex items-start space-x-3 p-3 bg-cyber-900 rounded-lg border border-cyber-border">
                  <span className="w-6 h-6 rounded-full bg-cyber-cyan text-cyber-950 font-bold flex items-center justify-center shrink-0">1</span>
                  <div>
                    <span className="font-bold text-slate-100 block">Click "Tool Runner Studio"</span>
                    <span className="text-slate-400">Click the button in the top bar to open your terminal runner.</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-cyber-900 rounded-lg border border-cyber-border">
                  <span className="w-6 h-6 rounded-full bg-cyber-cyan text-cyber-950 font-bold flex items-center justify-center shrink-0">2</span>
                  <div>
                    <span className="font-bold text-slate-100 block">Select "DNS & Perimeter Mail Audit" & Click "EXECUTE TOOL"</span>
                    <span className="text-slate-400">Watch the terminal query their live mail records. Look at the bottom where it says <em>"EMAIL SPOOFING HAZARD DETECTED"</em>.</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-cyber-900 rounded-lg border border-cyber-border">
                  <span className="w-6 h-6 rounded-full bg-cyber-cyan text-cyber-950 font-bold flex items-center justify-center shrink-0">3</span>
                  <div>
                    <span className="font-bold text-slate-100 block">Click the Green Button: "Convert to Cryptographic Evidence"</span>
                    <span className="text-slate-400">The workbench instantly calculates the SHA-256 hash and locks it into your official Evidence Repository. Congratulations—you just completed your first professional OSINT finding!</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setActiveStep(2)}
                className="text-slate-400 hover:text-white"
              >
                &larr; Back
              </button>
              <button
                onClick={() => {
                  onClose();
                  onSelectToolAndRun('DNS_MAIL');
                }}
                className="px-5 py-2.5 bg-emerald-500 text-cyber-950 font-bold rounded-lg hover:bg-emerald-400 flex items-center space-x-2 transition-all shadow-lg shadow-emerald-950/40"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Launch Tool Studio & Run Step 1 Now</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
