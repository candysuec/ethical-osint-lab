-- Seed 30 Curriculum Cases into sovereign_osint
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-BEG-001', 'Finding Corporate Subsidiaries in SEC EDGAR Filings', 'TLP:CLEAR', 'ACTIVE_INVESTIGATION', 'MEDIUM', 'Lead_Investigator_Chevalier', 'Uber Technologies, Inc. (CIK: 0001543151)', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: BEGINNER.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-BEG-002', 'Can Scammers Spoof This CEO''s Email? (SPF & DMARC)', 'TLP:CLEAR', 'ACTIVE_INVESTIGATION', 'MEDIUM', 'Lead_Investigator_Chevalier', 'fastly.com', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: BEGINNER.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-BEG-003', 'Uncovering Secret Subdomains via Certificate Transparency', 'TLP:CLEAR', 'ACTIVE_INVESTIGATION', 'MEDIUM', 'Lead_Investigator_Chevalier', 'cloudflare.com', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: BEGINNER.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-BEG-004', 'Wayback Machine: Recovering Scrubbed Corporate Leaks', 'TLP:CLEAR', 'ACTIVE_INVESTIGATION', 'MEDIUM', 'Lead_Investigator_Chevalier', 'archive.org / WayBack Machine', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: BEGINNER.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-BEG-005', 'Robots.txt & Sitemap: The Accidental Secret Map', 'TLP:CLEAR', 'ACTIVE_INVESTIGATION', 'MEDIUM', 'Lead_Investigator_Chevalier', 'reddit.com', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: BEGINNER.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-BEG-006', 'Document EXIF & Creator Metadata Extraction', 'TLP:CLEAR', 'ACTIVE_INVESTIGATION', 'MEDIUM', 'Lead_Investigator_Chevalier', 'Public Corporate PDF Whitepaper', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: BEGINNER.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-BEG-007', 'Mapping Autonomous System Numbers (ASN) & IP Ranges', 'TLP:CLEAR', 'ACTIVE_INVESTIGATION', 'MEDIUM', 'Lead_Investigator_Chevalier', 'Fastly Inc. (AS54113)', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: BEGINNER.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-BEG-008', 'Detecting Leaked API Keys in Git Commit Histories', 'TLP:CLEAR', 'ACTIVE_INVESTIGATION', 'MEDIUM', 'Lead_Investigator_Chevalier', 'GitHub Public Repositories', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: BEGINNER.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-BEG-009', 'Boardroom Cross-Directorships & Conflict of Interest', 'TLP:CLEAR', 'ACTIVE_INVESTIGATION', 'MEDIUM', 'Lead_Investigator_Chevalier', 'SEC Form DEF 14A Proxy Statement', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: BEGINNER.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-BEG-010', 'Dangling CNAME DNS Records & Subdomain Takeover', 'TLP:CLEAR', 'ACTIVE_INVESTIGATION', 'MEDIUM', 'Lead_Investigator_Chevalier', 'legacy-blog.target-enterprise.com', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: BEGINNER.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-INT-011', 'Multi-Tier Infrastructure Graphing (Maltego Style)', 'TLP:GREEN', 'ACTIVE_INVESTIGATION', 'HIGH', 'Lead_Investigator_Chevalier', 'apex-holding-corp.com', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: INTERMEDIATE.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-INT-012', 'Historical WHOIS: Unmasking Privacy-Shielded Owners', 'TLP:GREEN', 'ACTIVE_INVESTIGATION', 'HIGH', 'Lead_Investigator_Chevalier', 'suspicious-financial-login.com', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: INTERMEDIATE.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-INT-013', 'Reverse IP Co-Tenancy & Shared Server Neighbors', 'TLP:GREEN', 'ACTIVE_INVESTIGATION', 'HIGH', 'Lead_Investigator_Chevalier', '203.0.113.88', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: INTERMEDIATE.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-INT-014', 'OpenAPI & Swagger Schema Leaks: The API Blueprint', 'TLP:GREEN', 'ACTIVE_INVESTIGATION', 'HIGH', 'Lead_Investigator_Chevalier', 'api.target-fintech.com', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: INTERMEDIATE.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-INT-015', 'Cert Subject Key Identifiers (SKI) & Server Tracking', 'TLP:GREEN', 'ACTIVE_INVESTIGATION', 'HIGH', 'Lead_Investigator_Chevalier', 'C2 Tracker / Shadow Fleet', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: INTERMEDIATE.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-INT-016', 'Synthetic Username Correlation Across 500+ Platforms', 'TLP:GREEN', 'ACTIVE_INVESTIGATION', 'HIGH', 'Lead_Investigator_Chevalier', 'vuln_researcher_99', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: INTERMEDIATE.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-INT-017', 'Cloud Storage Bucket Permissive Permissions Audit', 'TLP:GREEN', 'ACTIVE_INVESTIGATION', 'HIGH', 'Lead_Investigator_Chevalier', 'acme-corp-backups.s3.amazonaws.com', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: INTERMEDIATE.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-INT-018', 'Software Supply Chain: Open-Source SBOM Auditing', 'TLP:GREEN', 'ACTIVE_INVESTIGATION', 'HIGH', 'Lead_Investigator_Chevalier', 'package-lock.json / requirements.txt', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: INTERMEDIATE.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-INT-019', 'Breach Telemetry: Aggregated Password Exposure Metrics', 'TLP:GREEN', 'ACTIVE_INVESTIGATION', 'HIGH', 'Lead_Investigator_Chevalier', 'enterprise-corp.com', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: INTERMEDIATE.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-INT-020', 'Geospatial Facility Verification via Satellite Imagery', 'TLP:GREEN', 'ACTIVE_INVESTIGATION', 'HIGH', 'Lead_Investigator_Chevalier', 'Offshore Data Center Facility (Iceland)', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: INTERMEDIATE.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-ADV-021', 'Adversary Infrastructure Clustering: Tracking APTs', 'TLP:AMBER', 'ACTIVE_INVESTIGATION', 'CRITICAL', 'Lead_Investigator_Chevalier', 'APT-PHISH Campaign Fleet', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: ADVANCED.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-ADV-022', 'Combating Brand Impersonation & Typosquatting', 'TLP:AMBER', 'ACTIVE_INVESTIGATION', 'CRITICAL', 'Lead_Investigator_Chevalier', 'paypal.com (Fictional Defensive Audit)', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: ADVANCED.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-ADV-023', 'Disinformation Network & Bot Farm Graphing', 'TLP:AMBER', 'ACTIVE_INVESTIGATION', 'CRITICAL', 'Lead_Investigator_Chevalier', 'Coordinated Inauthentic Behavior Network', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: ADVANCED.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-ADV-024', 'BGP Route Hijacking & Prefix Anomaly Detection', 'TLP:AMBER', 'ACTIVE_INVESTIGATION', 'CRITICAL', 'Lead_Investigator_Chevalier', 'Financial Institution IP Prefix (203.0.113.0/24)', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: ADVANCED.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-ADV-025', 'Passive Tor Onion Service Correlation', 'TLP:AMBER', 'ACTIVE_INVESTIGATION', 'CRITICAL', 'Lead_Investigator_Chevalier', 'Dark Web Leak Portal (Onion v3)', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: ADVANCED.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-ADV-026', 'Ransomware Cryptocurrency Blockchain Tracing', 'TLP:AMBER', 'ACTIVE_INVESTIGATION', 'CRITICAL', 'Lead_Investigator_Chevalier', 'Bitcoin Extortion Address (bc1q...)', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: ADVANCED.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-ADV-027', 'SaaS OAuth Permissions & Shadow Integration Drift', 'TLP:AMBER', 'ACTIVE_INVESTIGATION', 'CRITICAL', 'Lead_Investigator_Chevalier', 'Corporate Google Workspace / Microsoft 365 Tenant', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: ADVANCED.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-ADV-028', 'JARM TLS Fingerprinting: Hunting Command & Control', 'TLP:AMBER', 'ACTIVE_INVESTIGATION', 'CRITICAL', 'Lead_Investigator_Chevalier', 'Adversary Cobalt Strike C2 Infrastructure', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: ADVANCED.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-ADV-029', 'M&A Due Diligence: Shadow IT & Abandoned Attack Surface', 'TLP:AMBER', 'ACTIVE_INVESTIGATION', 'CRITICAL', 'Lead_Investigator_Chevalier', 'Acquisition Target Company (TargetCorp Holdings)', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: ADVANCED.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
INSERT INTO cases (case_number, title, classification, status, priority, lead_analyst, target_entity, target_type, legal_boundary_notes)
VALUES ('CASE-ADV-030', 'Threat Intel Handoff: Generating SOC SIGMA Rules', 'TLP:AMBER', 'ACTIVE_INVESTIGATION', 'CRITICAL', 'Lead_Investigator_Chevalier', 'Defensive SIEM / SOC Integration', 'ORGANIZATION', 'Strict defensive OSINT. 100% passive verification. Curriculum tier: ADVANCED.')
ON CONFLICT (case_number) DO UPDATE SET title = EXCLUDED.title, target_entity = EXCLUDED.target_entity;
