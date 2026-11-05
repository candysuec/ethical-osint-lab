import React, { useState } from 'react';
import { FileText, Download, Copy, CheckCircle, ShieldCheck, Terminal, AlertCircle, Printer } from 'lucide-react';
import { IntelligenceReport, Case } from '../types';

interface ReportGeneratorProps {
  currentCase: Case;
  report: IntelligenceReport;
}

export const ReportGeneratorView: React.FC<ReportGeneratorProps> = ({ currentCase, report }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'PREVIEW' | 'SIGMA' | 'IOCS'>('PREVIEW');

  const fullMarkdownReport = `# 🛡️ CYBER THREAT INTELLIGENCE ASSESSMENT
**Report Reference:** ${report.reportNumber}  
**Classification:** ${report.classification} // DEFENSIVE USE ONLY  
**Target Organization:** ${currentCase.targetEntity}  
**Date of Issue:** ${report.generatedAt}  
**Confidence Score:** ADMIRALTY A1 (HIGH CONFIDENCE)  

---

## 1. Executive Summary & Board Briefing (BLUF)
${report.executiveSummary}

---

## 2. Confidence Assessment
${report.confidenceAssessment}

---

## 3. Information Gaps & Blind Spots
${report.informationGaps}

---

## 4. Production SIGMA Detection Rule
\`\`\`yaml
${report.sigmaRuleYaml}
\`\`\`

---

## 5. Defensive Sign-Off
I certify that all evidence was acquired strictly through passive, legal open-source intelligence methods under the Computer Fraud and Abuse Act (CFAA). Zero unauthorized probing was conducted.
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullMarkdownReport);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([fullMarkdownReport], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.reportNumber}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 overflow-y-auto h-full max-w-5xl mx-auto print:p-0 print:max-w-none">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-cyber-border pb-4 print:hidden">
        <div>
          <h1 className="text-xl font-bold font-mono text-slate-100 flex items-center space-x-2">
            <FileText className="w-5 h-5 text-cyber-cyan" />
            <span>AUDIT-READY INTELLIGENCE REPORT GENERATOR</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Compiles findings, cryptographic hashes, risk matrices, and SIGMA rules into C-suite deliverables and SOC handoffs.
          </p>
        </div>

        <div className="flex items-center space-x-2.5 flex-wrap">
          <button
            type="button"
            onClick={handlePrintPdf}
            aria-label="Print or save report as PDF"
            className="flex items-center space-x-1.5 bg-cyber-850 hover:bg-cyber-800 text-slate-200 border border-cyber-border px-3 py-1.5 rounded-lg text-xs font-mono transition-colors focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:outline-none"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>PRINT / SAVE PDF</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy markdown report to clipboard"
            className="flex items-center space-x-1.5 bg-cyber-850 hover:bg-cyber-800 text-slate-200 border border-cyber-border px-3 py-1.5 rounded-lg text-xs font-mono transition-colors focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:outline-none"
          >
            {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'COPIED' : 'COPY .MD'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            aria-label="Export report dossier as markdown file"
            className="flex items-center space-x-1.5 bg-cyber-cyan text-cyber-950 font-bold px-3 py-1.5 rounded-lg text-xs font-mono hover:bg-cyan-400 transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-cyber-cyan focus-visible:outline-none"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT DOSSIER</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-cyber-border">
        <button
          onClick={() => setActiveTab('PREVIEW')}
          className={`px-4 py-2 text-xs font-mono transition-colors ${
            activeTab === 'PREVIEW' ? 'border-b-2 border-cyber-cyan text-cyber-cyan font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          EXECUTIVE PREVIEW
        </button>
        <button
          onClick={() => setActiveTab('SIGMA')}
          className={`px-4 py-2 text-xs font-mono transition-colors ${
            activeTab === 'SIGMA' ? 'border-b-2 border-cyber-cyan text-cyber-cyan font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          SIGMA DETECTION LOGIC
        </button>
        <button
          onClick={() => setActiveTab('IOCS')}
          className={`px-4 py-2 text-xs font-mono transition-colors ${
            activeTab === 'IOCS' ? 'border-b-2 border-cyber-cyan text-cyber-cyan font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          INDICATORS (IOC LEDGER)
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'PREVIEW' && (
        <div className="bg-cyber-900 border border-cyber-border rounded-lg p-6 space-y-6 text-xs font-mono">
          <div className="flex justify-between items-center border-b border-cyber-border pb-4">
            <div>
              <span className="text-cyber-cyan font-bold text-sm block">{report.reportNumber}</span>
              <span className="text-slate-400">{report.title}</span>
            </div>
            <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2.5 py-1 rounded text-xs">
              {report.classification}
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-slate-400 uppercase tracking-wider font-bold block text-[11px]">
              1. BOTTOM-LINE UP FRONT (EXECUTIVE BLUF)
            </span>
            <p className="text-slate-200 leading-relaxed bg-cyber-950 p-4 rounded border border-cyber-border">
              {report.executiveSummary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-cyber-950 p-4 rounded border border-cyber-border space-y-1">
              <span className="text-emerald-400 uppercase tracking-wider font-bold block text-[10px]">
                2. CONFIDENCE & ADMIRALTY EVALUATION
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px]">{report.confidenceAssessment}</p>
            </div>

            <div className="bg-cyber-950 p-4 rounded border border-cyber-border space-y-1">
              <span className="text-amber-400 uppercase tracking-wider font-bold block text-[10px]">
                3. DOCUMENTED INFORMATION GAPS
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px]">{report.informationGaps}</p>
            </div>
          </div>

          <div className="border-t border-cyber-border pt-4 flex justify-between items-center text-slate-500 text-[10px]">
            <span>LEGAL CHARTER: CFAA 18 U.S.C. § 1030 DEFENSIVE RESEARCH</span>
            <span>GENERATED AT: {report.generatedAt}</span>
          </div>
        </div>
      )}

      {activeTab === 'SIGMA' && (
        <div className="bg-cyber-900 border border-cyber-border rounded-lg p-5 space-y-3">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-200">
            <Terminal className="w-4 h-4 text-cyber-cyan" />
            <span className="font-bold">PRODUCTION SIEM DETECTION RULE (SIGMA STANDARD)</span>
          </div>
          <pre className="bg-cyber-950 p-4 rounded border border-cyber-border text-emerald-400 text-xs font-mono overflow-x-auto leading-relaxed">
            {report.sigmaRuleYaml}
          </pre>
        </div>
      )}

      {activeTab === 'IOCS' && (
        <div className="bg-cyber-900 border border-cyber-border rounded-lg p-5 space-y-4">
          <span className="text-xs font-mono text-cyber-cyan font-bold block">
            MASTER INDICATORS OF COMPROMISE (IOC LEDGER)
          </span>
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-cyber-950 text-slate-400 border-b border-cyber-border">
              <tr>
                <th className="p-2">Type</th>
                <th className="p-2">Indicator Value</th>
                <th className="p-2">Confidence</th>
                <th className="p-2">Recommended Defensive Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border/60 text-slate-300">
              <tr>
                <td className="p-2 text-cyber-cyan">DOMAIN</td>
                <td className="p-2 font-bold">aetherdynamic-login.com</td>
                <td className="p-2 text-emerald-400">A1</td>
                <td className="p-2">Deploy DNS sinkhole & corporate email perimeter block</td>
              </tr>
              <tr>
                <td className="p-2 text-purple-400">JARM</td>
                <td className="p-2 font-mono text-[10px]">07d14d16d21d21d07c42d41d00041d24a458a375eef0c576d23a7bab9a9fb1</td>
                <td className="p-2 text-emerald-400">A1</td>
                <td className="p-2">Alert on internal client outbound TLS connections</td>
              </tr>
              <tr>
                <td className="p-2 text-amber-400">CNAME</td>
                <td className="p-2">horizon-stage.s3-website-us-east-1.amazonaws.com</td>
                <td className="p-2 text-emerald-400">A1</td>
                <td className="p-2">Immediate Route53 DNS CNAME record deletion</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
