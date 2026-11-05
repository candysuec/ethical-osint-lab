export type TlpClassification = 'TLP:CLEAR' | 'TLP:GREEN' | 'TLP:AMBER' | 'TLP:AMBER+STRICT' | 'TLP:RED';
export type CaseStatus = 'TRIAGE' | 'ACTIVE_INVESTIGATION' | 'ANALYST_REVIEW' | 'CLOSED_VERIFIED' | 'ARCHIVED';
export type PriorityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type InputType = 
  | 'FULL_NAME'
  | 'PARTIAL_NAME'
  | 'ALIAS'
  | 'USERNAME'
  | 'EMAIL'
  | 'DOMAIN'
  | 'COMPANY_NAME'
  | 'PHYSICAL_ADDRESS'
  | 'CITY'
  | 'STATE'
  | 'COUNTRY'
  | 'PHONE_NUMBER'
  | 'SOCIAL_HANDLE'
  | 'BUSINESS_NAME'
  | 'WEBSITE_URL'
  | 'IMAGE'
  | 'ORGANIZATION';

export type SourceReliability = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
export type InfoCredibility = '1' | '2' | '3' | '4' | '5' | '6';
export type GapSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'BLOCKING';

export interface Case {
  id: string;
  caseNumber: string;
  title: string;
  classification: TlpClassification;
  status: CaseStatus;
  priority: PriorityLevel;
  leadAnalyst: string;
  targetEntity: string;
  targetType: InputType;
  pirs: string[];
  legalNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Entity {
  id: string;
  caseId: string;
  canonicalName: string;
  entityType: string;
  isConfirmed: boolean;
  confidenceScore: number;
  attributes: Record<string, string>;
  disambiguationNotes: string;
  resolvedBy?: string;
  resolvedAt?: string;
}

export interface EntityRelationship {
  id: string;
  sourceEntityId: string;
  targetEntityId: string;
  relationshipType: string;
  propertyBucket: 'Identity' | 'Locations' | 'Organizations' | 'Digital Presence' | 'Public Mentions' | 'Published Content' | 'Public Business Records';
  edgeWeight: number;
  admiraltyScore: string;
  corroborationCount: number;
}

export interface EvidenceItem {
  id: string;
  caseId: string;
  itemNumber: string;
  title: string;
  sourceUrl: string;
  archiveUrl?: string;
  sha256Hash: string;
  filePath: string;
  captureTimestamp: string;
  admiraltyReliability: SourceReliability;
  admiraltyCredibility: InfoCredibility;
  fullViewportVerified: boolean;
  verifiedBy: string;
}

export interface Lead {
  id: string;
  caseId: string;
  leadCode: string;
  title: string;
  inputType: InputType;
  rawValue: string;
  normalizedValue: string;
  sourceReference: string;
  priority: PriorityLevel;
  status: 'QUEUED' | 'IN_PROGRESS' | 'PROMOTED_TO_EVIDENCE' | 'DISMISSED';
  confidenceScore: number;
  assignedAnalyst: string;
  createdAt: string;
}

export interface Source {
  id: string;
  name: string;
  category: 'PUBLIC_SEARCH' | 'BUSINESS_INFO' | 'DOMAIN_INTEL' | 'IMAGE_INTEL' | 'SOCIAL_PRESENCE' | 'NEWS_AND_MEDIA' | 'OPEN_DATA';
  baseUrl: string;
  baselineReliability: SourceReliability;
  validationProtocol: string;
  isActive: boolean;
}

export interface TimelineEvent {
  id: string;
  caseId: string;
  eventTimestamp: string;
  title: string;
  description: string;
  eventType: 'CERT_ISSUED' | 'FILING_SUBMITTED' | 'DNS_DRIFT' | 'ACQUISITION' | 'BREACH_DISCLOSURE' | 'INFRASTRUCTURE_REGISTERED';
  confidenceScore: string;
  evidenceId?: string;
}

export interface AnalystNote {
  id: string;
  caseId: string;
  author: string;
  title: string;
  contentMarkdown: string;
  tags: string[];
  isHypothesis: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  caseId: string;
  userId: string;
  actionType: string;
  targetTable: string;
  deltaSummary: string;
  clientIp: string;
  timestamp: string;
}

export interface GapAnalysis {
  id: string;
  caseId: string;
  title: string;
  gapType: 'UNCORROBORATED_CLAIM' | 'STALE_RECORD' | 'MISSING_ORIGIN' | 'DANGLING_POINTER' | 'UNVERIFIED_COLLISION';
  severity: GapSeverity;
  description: string;
  recommendedAction: string;
  isResolved: boolean;
}

export interface IntelligenceReport {
  id: string;
  caseId: string;
  reportNumber: string;
  title: string;
  classification: TlpClassification;
  executiveSummary: string;
  confidenceAssessment: string;
  informationGaps: string;
  sigmaRuleYaml: string;
  status: 'DRAFT' | 'APPROVED' | 'DISSEMINATED';
  approvedBy?: string;
  generatedAt: string;
}
