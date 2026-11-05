# 🔄 The 7-Phase Ethical OSINT Investigation Lifecycle

Amateurs jump randomly between search tools and drown in open browser tabs. Professional intelligence analysts follow a structured, repeatable cycle.

```
┌────────────────────────────────────────────────────────────────────────┐
│               THE 7-PHASE INTELLIGENCE LIFECYCLE                       │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   [ Phase 1: Scoping & PIRs ]                                          │
│          │                                                             │
│          ▼                                                             │
│   [ Phase 2: Passive Collection & Harvesting ]                         │
│          │                                                             │
│          ▼                                                             │
│   [ Phase 3: Sanitization & Cryptographic Hashing ]                    │
│          │                                                             │
│          ▼                                                             │
│   [ Phase 4: Admiralty Validation & Credibility Scoring ]               │
│          │                                                             │
│          ▼                                                             │
│   [ Phase 5: Entity Correlation & Timeline Reconstruction ]            │
│          │                                                             │
│          ▼                                                             │
│   [ Phase 6: Executive Intelligence Reporting ]                        │
│          │                                                             │
│          ▼                                                             │
│   [ Phase 7: Post-Mortem & OPSEC Teardown ]                            │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Scoping & Priority Intelligence Requirements (PIRs)
* Define the exact boundary of the investigation before opening a browser.
* State explicit PIRs: *"What specific question am I answering?"* (e.g. *"What external DNS assets belong to Company X?"*).
* Confirm legal boundaries: Ensure the target is an approved public entity or synthetic dataset. Zero targeting of private individuals.

## Phase 2: Passive Collection & Harvesting
* Gather intelligence strictly through non-intrusive public mechanisms:
  * Certificate Transparency logs (`crt.sh`)
  * DNS dumpsters and WHOIS historical records
  * Search engine advanced operators (Google Dorking)
  * Internet Archive (Wayback Machine)
  * Public code repositories (GitHub, GitLab)
* Maintain non-attribution: Use dedicated research browser profiles and VPN connections.

## Phase 3: Sanitization & Cryptographic Hashing
* Save full-page screenshots showing system clock, URL bar, and TLS certificate state.
* Compute a SHA-256 hash immediately for every evidence file.
* Log item into the master `EVIDENCE_LOG_TEMPLATE.md`.

## Phase 4: Admiralty Validation & Credibility Scoring
* Score every piece of evidence using the NATO STANAG 2022 Admiralty Matrix (A1 to F6).
* Discard or flag uncorroborated single-source claims.

## Phase 5: Entity Correlation & Timeline Reconstruction
* Group related assets: link subdomains to IP blocks, autonomous system numbers (ASNs), and corporate registry records.
* Build an chronological timeline of infrastructure changes or domain modifications.

## Phase 6: Executive Intelligence Reporting
* Synthesize findings into two distinct formats:
  * The Executive 1-Pager (Risk rating and high-level business impact).
  * The Technical Intelligence Annex (Raw indicators, IOC tables, and remediation instructions).

## Phase 7: Post-Mortem & OPSEC Teardown
* Close all active investigative sessions.
* Clear temporary browser containers and cache.
* Archive evidence vault to cold storage.
