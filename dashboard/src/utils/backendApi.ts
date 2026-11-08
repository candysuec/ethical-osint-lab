/**
 * Sovereign OSINT REST API Client
 * Connects frontend to the Python Daemon on :5002 (PostgreSQL + SpiderFoot + Container CLI)
 */

const API_BASE = 'http://localhost:5002';

export interface BackendHealth {
  status: string;
  daemon: string;
  version: string;
  database: 'CONNECTED' | 'OFFLINE';
  spiderfoot: 'ONLINE' | 'OFFLINE';
  docker_cli: 'READY' | 'OFFLINE';
}

export async function checkBackendHealth(): Promise<BackendHealth | null> {
  try {
    const res = await fetch(`${API_BASE}/api/health`, { method: 'GET' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchSpiderFootScans(): Promise<any[]> {
  try {
    const res = await fetch(`${API_BASE}/api/spiderfoot/scans`, { method: 'GET' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.scans || [];
  } catch {
    return [];
  }
}

export async function fetchSpiderFootSummary(scanId: string): Promise<any[]> {
  try {
    const res = await fetch(`${API_BASE}/api/spiderfoot/summary?id=${encodeURIComponent(scanId)}`, { method: 'GET' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.summary || [];
  } catch {
    return [];
  }
}

export async function startSpiderFootScan(target: string, scanName: string): Promise<{ status: string; result?: any }> {
  try {
    const res = await fetch(`${API_BASE}/api/spiderfoot/scans/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target, scanName })
    });
    return await res.json();
  } catch (err: any) {
    return { status: 'ERROR', result: err.message };
  }
}

export async function saveEvidenceToPostgres(evidenceItem: any): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/evidence`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(evidenceItem)
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function saveEntityToPostgres(entity: any): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/entities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entity)
    });
    return res.ok;
  } catch {
    return false;
  }
}
