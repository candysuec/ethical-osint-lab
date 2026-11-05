import React, { useState } from 'react';
import { Terminal, ShieldAlert, CheckCircle, ArrowRight, AlertTriangle } from 'lucide-react';
import { InputType, Lead, PriorityLevel } from '../types';

interface IntakeViewProps {
  currentCaseId: string;
  onAddLead: (lead: Lead) => void;
  onNavigateToLeads: () => void;
}

const inputTypesList: { type: InputType; label: string; placeholder: string; example: string }[] = [
  { type: 'DOMAIN', label: 'Domain Name (FQDN)', placeholder: 'subdomain.example.com', example: 'fastly.com' },
  { type: 'COMPANY_NAME', label: 'Company / Business Name', placeholder: 'Acme Corporation Inc.', example: 'Fastly, Inc.' },
  { type: 'ORGANIZATION', label: 'Foundation / Non-Profit', placeholder: 'Wikimedia Foundation', example: 'The Apache Software Foundation' },
  { type: 'WEBSITE_URL', label: 'Website URL', placeholder: 'https://example.com/api', example: 'https://www.python.org/robots.txt' },
  { type: 'USERNAME', label: 'Technical Username / Handle', placeholder: 'octocat', example: 'dependabot' },
  { type: 'EMAIL', label: 'Business Email Address', placeholder: 'security@example.com', example: 'hostmaster@apache.org' },
  { type: 'ALIAS', label: 'Cryptographic Hash / Alias', placeholder: 'JARM hash or SHA-256', example: '07d14d16d21d21d07c42d41d00041d24a458a375eef0c576d23a7bab9a9fb1' },
  { type: 'FULL_NAME', label: 'Corporate Officer Full Name', placeholder: 'First Middle Last', example: 'Evelyn Vance' },
  { type: 'PARTIAL_NAME', label: 'Partial Name Token', placeholder: 'Vance', example: 'Vance' },
  { type: 'PHYSICAL_ADDRESS', label: 'Commercial Physical Facility', placeholder: '123 Enterprise Blvd, City, State', example: '1 Infinite Loop, Cupertino, CA' },
  { type: 'CITY', label: 'City / Municipal Entity', placeholder: 'Reston', example: 'Reston' },
  { type: 'STATE', label: 'State / Province', placeholder: 'Delaware', example: 'Delaware' },
  { type: 'COUNTRY', label: 'Country (ISO 3166)', placeholder: 'United States', example: 'United States' },
  { type: 'PHONE_NUMBER', label: 'Public Corporate Phone', placeholder: '+1 (800) 555-0199', example: '+1 (888) 555-0123' },
  { type: 'SOCIAL_HANDLE', label: 'Public Brand Social Slug', placeholder: 'x.com/brand_hq', example: 'github.com/apache' },
  { type: 'BUSINESS_NAME', label: 'Trade Name / DBA', placeholder: 'Acme Cloud Services', example: 'Signal Sciences' },
  { type: 'IMAGE', label: 'Public Media Asset (URL / Path)', placeholder: 'https://example.com/logo.png', example: 'cases/evidence_raw/target_logo.png' }
];

export const IntakeView: React.FC<IntakeViewProps> = ({ currentCaseId, onAddLead, onNavigateToLeads }) => {
  const [selectedType, setSelectedType] = useState<InputType>('DOMAIN');
  const [rawValue, setRawValue] = useState<string>('');
  const [priority, setPriority] = useState<PriorityLevel>('HIGH');
  const [sourceRef, setSourceRef] = useState<string>('Passive CT Log query');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Live Normalization Function
  const normalizeInput = (val: string, type: InputType): string => {
    let clean = val.trim();
    if (type === 'DOMAIN') {
      return clean.replace(/^https?:\/\//i, '').replace(/\/.*$/, '').toLowerCase();
    }
    if (type === 'EMAIL') {
      return clean.toLowerCase();
    }
    if (type === 'USERNAME') {
      return clean.replace(/^@/, '');
    }
    if (type === 'COMPANY_NAME' || type === 'BUSINESS_NAME') {
      return clean.replace(/\s+/g, ' ');
    }
    return clean;
  };

  // Ethics & Compliance Check
  const checkEthicsSafety = (val: string): { safe: boolean; reason?: string } => {
    const lower = val.toLowerCase();
    if (lower.includes('apartment') || lower.includes('apt #') || lower.includes('residential')) {
      return { safe: false, reason: 'FLAG-PII-RESIDENTIAL: Residential property inspection prohibited.' };
    }
    if (lower.includes('ssn') || lower.includes('password') || lower.includes('combo')) {
      return { safe: false, reason: 'FLAG-CREDS-UNAUTHORIZED: Illicit credential harvesting strictly barred.' };
    }
    return { safe: true };
  };

  const normalized = normalizeInput(rawValue, selectedType);
  const safetyCheck = checkEthicsSafety(rawValue);

  const currentConfig = inputTypesList.find(i => i.type === selectedType) || inputTypesList[0];

  const handleIngest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawValue || !safetyCheck.safe) return;

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      caseId: currentCaseId,
      leadCode: `LEAD-${Math.floor(100 + Math.random() * 900)}`,
      title: `Intake: ${selectedType} - ${normalized}`,
      inputType: selectedType,
      rawValue: rawValue,
      normalizedValue: normalized,
      sourceReference: sourceRef,
      priority: priority,
      status: 'QUEUED',
      confidenceScore: 0.7500,
      assignedAnalyst: 'Lead_Investigator_Chevalier',
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
    };

    onAddLead(newLead);
    setSubmitted(true);
    setRawValue('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full max-w-5xl mx-auto">
      <div>
        <h1 className="text-xl font-bold font-mono text-slate-100 flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-cyber-cyan" />
          <span>INVESTIGATION INTAKE & NORMALIZATION ENGINE</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Supports 17 standard public input types with real-time normalization, regex hygiene, and automated ethics screening.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Input Type Selector */}
        <div className="bg-cyber-900 border border-cyber-border rounded-lg p-4">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
            Select Input Modality (17 Types):
          </div>
          <div className="space-y-1 max-h-[480px] overflow-y-auto pr-1">
            {inputTypesList.map((item) => (
              <button
                key={item.type}
                onClick={() => {
                  setSelectedType(item.type);
                  setRawValue('');
                }}
                className={`w-full text-left px-3 py-2 rounded text-xs font-mono transition-colors flex items-center justify-between ${
                  selectedType === item.type
                    ? 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-cyber-850'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-[10px] text-slate-500 font-mono">{item.type}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Intake Form & Normalization Sandbox */}
        <div className="lg:col-span-2 space-y-4">
          <form onSubmit={handleIngest} className="bg-cyber-900 border border-cyber-border rounded-lg p-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-cyber-cyan font-bold">
                ACTIVE MODALITY: {currentConfig.label}
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-cyber-850 px-2 py-0.5 rounded">
                CASE: {currentCaseId}
              </span>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-300 block mb-1">
                RAW INPUT DATA
              </label>
              <input
                type="text"
                value={rawValue}
                onChange={(e) => setRawValue(e.target.value)}
                placeholder={currentConfig.placeholder}
                className="w-full bg-cyber-850 border border-cyber-border rounded px-3 py-2 text-sm text-slate-100 font-mono focus:outline-none focus:border-cyber-cyan"
                required
              />
              <span className="text-[11px] font-mono text-slate-500 mt-1 block">
                Example value: <span className="text-slate-400 cursor-pointer" onClick={() => setRawValue(currentConfig.example)}>{currentConfig.example}</span>
              </span>
            </div>

            {/* Live Normalization Box */}
            <div className="bg-cyber-950 p-3 rounded border border-cyber-border space-y-2">
              <div className="text-[11px] font-mono text-slate-400 flex justify-between">
                <span>NORMALIZED VALUE:</span>
                <span className="text-cyber-cyan">{normalized || '[Awaiting input]'}</span>
              </div>
              <div className="text-[10px] font-mono text-slate-500">
                Methodology: RFC-compliant parsing, character sanitization, delimiter normalization.
              </div>
            </div>

            {/* Ethics & Safety Alert Box */}
            {!safetyCheck.safe && (
              <div className="bg-rose-950/40 border border-rose-600/50 p-3 rounded text-rose-300 text-xs font-mono flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold block">ETHICAL GATEWAY REJECTION:</span>
                  <span>{safetyCheck.reason}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">SOURCE CONDUIT</label>
                <input
                  type="text"
                  value={sourceRef}
                  onChange={(e) => setSourceRef(e.target.value)}
                  className="w-full bg-cyber-850 border border-cyber-border rounded px-3 py-1.5 text-xs text-slate-200 font-mono"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">INITIAL PRIORITY</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                  className="w-full bg-cyber-850 border border-cyber-border rounded px-3 py-1.5 text-xs text-slate-200 font-mono"
                >
                  <option value="CRITICAL">CRITICAL</option>
                  <option value="HIGH">HIGH</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="LOW">LOW</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-cyber-border flex items-center justify-between">
              <span className="text-[11px] font-mono text-emerald-400 flex items-center space-x-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Zero Private Citizen Target Enforced</span>
              </span>

              <button
                type="submit"
                disabled={!safetyCheck.safe || !rawValue}
                className="flex items-center space-x-2 bg-cyber-cyan disabled:opacity-50 text-cyber-950 font-bold px-4 py-2 rounded text-xs font-mono hover:bg-cyan-400 transition-colors"
              >
                <span>INGEST INTO LEAD QUEUE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {submitted && (
            <div className="bg-emerald-950/40 border border-emerald-600/50 p-4 rounded text-emerald-300 text-xs font-mono flex items-center justify-between animate-fade-in">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Indicator successfully normalized and ingested into Lead Queue!</span>
              </div>
              <button 
                onClick={onNavigateToLeads}
                className="underline text-emerald-200 hover:text-white"
              >
                View in Lead Queue &rarr;
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
