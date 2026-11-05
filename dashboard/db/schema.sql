-- =====================================================================
-- 🛡️ SOVEREIGN ETHICAL OSINT ANALYST PLATFORM - POSTGRESQL SCHEMA
-- Standard Reference: OSINT-DB-V1.0
-- Security Posture: Immutable Audit Logs, Mandatory Hashing, No Auto-Merge
-- =====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enum Definitions
CREATE TYPE tlp_classification AS ENUM ('TLP:CLEAR', 'TLP:GREEN', 'TLP:AMBER', 'TLP:AMBER+STRICT', 'TLP:RED');
CREATE TYPE case_status AS ENUM ('TRIAGE', 'ACTIVE_INVESTIGATION', 'ANALYST_REVIEW', 'CLOSED_VERIFIED', 'ARCHIVED');
CREATE TYPE priority_level AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
CREATE TYPE input_type_enum AS ENUM (
    'FULL_NAME', 'PARTIAL_NAME', 'ALIAS', 'USERNAME', 'EMAIL', 'DOMAIN',
    'COMPANY_NAME', 'PHYSICAL_ADDRESS', 'CITY', 'STATE', 'COUNTRY',
    'PHONE_NUMBER', 'SOCIAL_HANDLE', 'BUSINESS_NAME', 'WEBSITE_URL',
    'IMAGE', 'ORGANIZATION'
);
CREATE TYPE source_reliability AS ENUM ('A', 'B', 'C', 'D', 'E', 'F');
CREATE TYPE info_credibility AS ENUM ('1', '2', '3', '4', '5', '6');
CREATE TYPE gap_severity AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'BLOCKING');

-- 1. Cases Table
CREATE TABLE IF NOT EXISTS cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_number VARCHAR(64) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    classification tlp_classification DEFAULT 'TLP:CLEAR',
    status case_status DEFAULT 'ACTIVE_INVESTIGATION',
    priority priority_level DEFAULT 'MEDIUM',
    lead_analyst VARCHAR(128) NOT NULL,
    target_entity VARCHAR(255) NOT NULL,
    target_type input_type_enum NOT NULL,
    pirs JSONB DEFAULT '[]'::jsonb, -- Priority Intelligence Requirements
    legal_boundary_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Entities Table (Never auto-confirmed without human validation)
CREATE TABLE IF NOT EXISTS entities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
    canonical_name VARCHAR(255) NOT NULL,
    entity_type VARCHAR(64) NOT NULL, -- e.g. Corporation, Officer, Domain, Netblock, Repository
    is_confirmed BOOLEAN DEFAULT FALSE,
    confidence_score NUMERIC(5, 4) CHECK (confidence_score >= 0.0 AND confidence_score <= 1.0),
    attributes JSONB DEFAULT '{}'::jsonb, -- Anchors: GPG, CIK, tax_id, jurisdiction, email_domain
    disambiguation_notes TEXT,
    resolved_by VARCHAR(128),
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Entity Relationships Table (Graph Edges across 7 Property Buckets)
CREATE TABLE IF NOT EXISTS entity_relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
    source_entity_id UUID REFERENCES entities(id) ON DELETE CASCADE,
    target_entity_id UUID REFERENCES entities(id) ON DELETE CASCADE,
    relationship_type VARCHAR(64) NOT NULL, -- e.g. OWNS, RESOLVES_TO, DIRECTS, ANNOUNCES, MAINTAINS
    property_bucket VARCHAR(64) NOT NULL, -- Identity, Locations, Organizations, Digital Presence, etc.
    edge_weight NUMERIC(3, 2) DEFAULT 0.50,
    admiralty_score VARCHAR(4) NOT NULL, -- e.g. A1, B2
    corroboration_count INT DEFAULT 1,
    evidence_ids JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Evidence Repository Table (ISO/IEC 27037 Standard)
CREATE TABLE IF NOT EXISTS evidence_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
    entity_id UUID REFERENCES entities(id) ON DELETE SET NULL,
    item_number VARCHAR(32) NOT NULL,
    title VARCHAR(255) NOT NULL,
    source_url TEXT NOT NULL,
    archive_url TEXT, -- Wayback or Archive.today persistent snapshot
    sha256_hash CHAR(64) NOT NULL, -- Cryptographic integrity hash
    file_path TEXT NOT NULL,
    mime_type VARCHAR(64) DEFAULT 'application/octet-stream',
    capture_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    admiralty_reliability source_reliability DEFAULT 'B',
    admiralty_credibility info_credibility DEFAULT '2',
    full_viewport_verified BOOLEAN DEFAULT FALSE,
    metadata JSONB DEFAULT '{}'::jsonb,
    verified_by VARCHAR(128) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Leads Table (Lead Generation Queue)
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
    lead_code VARCHAR(32) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    input_type input_type_enum NOT NULL,
    raw_value TEXT NOT NULL,
    normalized_value TEXT NOT NULL,
    source_reference TEXT,
    priority priority_level DEFAULT 'MEDIUM',
    status VARCHAR(32) DEFAULT 'QUEUED', -- QUEUED, IN_PROGRESS, PROMOTED_TO_EVIDENCE, DISMISSED
    confidence_score NUMERIC(5, 4) DEFAULT 0.5000,
    assigned_analyst VARCHAR(128),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Sources Catalog Table
CREATE TABLE IF NOT EXISTS sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(128) NOT NULL,
    category VARCHAR(64) NOT NULL, -- PUBLIC_SEARCH, BUSINESS_INFO, DOMAIN_INTEL, etc.
    base_url TEXT NOT NULL,
    baseline_reliability source_reliability DEFAULT 'B',
    validation_protocol TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Timeline Events Table
CREATE TABLE IF NOT EXISTS timeline_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
    entity_id UUID REFERENCES entities(id) ON DELETE SET NULL,
    event_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_type VARCHAR(64) NOT NULL, -- CERT_ISSUED, FILING_SUBMITTED, DNS_DRIFT, ACQUISITION
    confidence_score VARCHAR(4) DEFAULT 'B2',
    evidence_id UUID REFERENCES evidence_items(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Analyst Notes Table
CREATE TABLE IF NOT EXISTS analyst_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
    author VARCHAR(128) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content_markdown TEXT NOT NULL,
    tags JSONB DEFAULT '[]'::jsonb,
    is_hypothesis BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Immutable Audit Logs Table (Tamper-Evident Ledger)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
    user_id VARCHAR(128) NOT NULL,
    action_type VARCHAR(64) NOT NULL, -- ENTITY_MERGED, EVIDENCE_ADDED, CONFIDENCE_ALTERED, REPORT_GENERATED
    target_table VARCHAR(64) NOT NULL,
    target_id UUID,
    delta_json JSONB NOT NULL,
    client_ip VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Gap Analyses Table
CREATE TABLE IF NOT EXISTS gap_analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    gap_type VARCHAR(64) NOT NULL, -- UNCORROBORATED_CLAIM, STALE_RECORD, MISSING_ORIGIN, DANGLING_POINTER
    severity gap_severity DEFAULT 'HIGH',
    description TEXT NOT NULL,
    recommended_action TEXT NOT NULL,
    is_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Intelligence Reports Table
CREATE TABLE IF NOT EXISTS intelligence_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
    report_number VARCHAR(64) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    classification tlp_classification DEFAULT 'TLP:CLEAR',
    executive_summary TEXT NOT NULL,
    findings_json JSONB DEFAULT '[]'::jsonb,
    ioc_ledger_json JSONB DEFAULT '[]'::jsonb,
    sigma_rules TEXT,
    confidence_assessment TEXT NOT NULL,
    information_gaps TEXT NOT NULL,
    approved_by VARCHAR(128),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for High Performance Queries across hundreds of investigations
CREATE INDEX IF NOT EXISTS idx_cases_status ON cases(status);
CREATE INDEX IF NOT EXISTS idx_cases_priority ON cases(priority);
CREATE INDEX IF NOT EXISTS idx_entities_case ON entities(case_id);
CREATE INDEX IF NOT EXISTS idx_evidence_case ON evidence_items(case_id);
CREATE INDEX IF NOT EXISTS idx_evidence_hash ON evidence_items(sha256_hash);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_timeline_timestamp ON timeline_events(event_timestamp);
CREATE INDEX IF NOT EXISTS idx_audit_case ON audit_logs(case_id);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at);
