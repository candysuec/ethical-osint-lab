#!/usr/bin/env python3
"""
🏛️ SOVEREIGN DEFENSIVE OSINT BACKEND & REST API DAEMON
Standard Reference: OSINT-API-V2.0
Ports:
  - Tool & Database Daemon: :5002
  - PostgreSQL Database: :5432 (sovereign_osint)
  - SpiderFoot Engine: :5001 (osint_spiderfoot)
  - Linux CLI Workstation: osint_cli_workstation container
"""

import http.server
import json
import os
import re
import subprocess
import time
import urllib.parse
import urllib.request
from http import HTTPStatus
import psycopg2
from psycopg2.extras import RealDictCursor

PORT = 5002
PG_HOST = os.environ.get('PG_HOST', 'localhost')
PG_PORT = int(os.environ.get('PG_PORT', 5432))
PG_DB = os.environ.get('PG_DB', 'sovereign_osint')
PG_USER = os.environ.get('PG_USER', 'osint_analyst')
PG_PASS = os.environ.get('PG_PASS', 'osint_secure_password_2026')
SPIDERFOOT_URL = os.environ.get('SPIDERFOOT_URL', 'http://localhost:5001')

SAFE_DOMAIN_REGEX = re.compile(r'^[a-zA-Z0-9\.\_\-]+$')
SAFE_IP_REGEX = re.compile(r'^[0-9\.\:\/]+$')

def get_db_connection():
    try:
        return psycopg2.connect(
            dbname=PG_DB,
            user=PG_USER,
            password=PG_PASS,
            host=PG_HOST,
            port=PG_PORT,
            cursor_factory=RealDictCursor,
            connect_timeout=3
        )
    except Exception as e:
        print(f"[!] PostgreSQL connection warning: {e}")
        return None

def sanitize_target(target: str) -> str:
    target = target.strip()
    if '://' in target:
        target = target.split('://', 1)[1]
    target = target.split('/')[0].split(':')[0]
    if not (SAFE_DOMAIN_REGEX.match(target) or SAFE_IP_REGEX.match(target)):
        raise ValueError(f"Invalid target characters: {target}")
    return target

def run_in_docker(command_list: list) -> str:
    """Execute command inside the osint_cli_workstation container."""
    try:
        docker_cmd = ['docker', 'exec', 'osint_cli_workstation'] + command_list
        proc = subprocess.run(docker_cmd, capture_output=True, text=True, timeout=25)
        return proc.stdout.strip() if proc.stdout else proc.stderr.strip()
    except Exception as e:
        return f"Container execution error: {e}"

def run_passive_dig(target: str, record_type: str = 'TXT') -> str:
    target = sanitize_target(target)
    if record_type.upper() not in ['TXT', 'MX', 'NS', 'A', 'AAAA', 'SOA', 'CNAME']:
        record_type = 'TXT'
    if record_type.upper() == 'TXT':
        cmd = ['dig', '+noall', '+answer', 'TXT', target, f"_dmarc.{target}"]
    else:
        cmd = ['dig', '+noall', '+answer', record_type.upper(), target]
    output = run_in_docker(cmd)
    if not output:
        # Fallback to nslookup if container dig is empty
        proc = subprocess.run(['nslookup', f'-type={record_type}', target], capture_output=True, text=True)
        output = proc.stdout.strip()
    return output

def run_passive_whois(target: str) -> str:
    target = sanitize_target(target)
    cmd = ['whois', target]
    return run_in_docker(cmd)

def run_crtsh(target: str) -> str:
    target = sanitize_target(target)
    url = f"https://crt.sh/?q=%.{target}&output=json"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Sovereign-OSINT/2.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            names = sorted(list(set(item.get('name_value', '') for item in data if 'name_value' in item)))
            out = f"[+] crt.sh RFC 6962 Certificate Transparency Query: {target}\n"
            out += f"[+] Discovered {len(names)} Subdomain Certificates:\n\n"
            for idx, n in enumerate(names[:30], 1):
                out += f"  {idx:2d}. {n}\n"
            if len(names) > 30:
                out += f"\n  ... and {len(names) - 30} additional subdomains recorded."
            return out
    except Exception as e:
        return f"crt.sh query error: {e}"

def query_spiderfoot_api(path: str, post_data: bytes = None):
    url = f"{SPIDERFOOT_URL}/{path.lstrip('/')}"
    try:
        req = urllib.request.Request(url, data=post_data)
        with urllib.request.urlopen(req, timeout=5) as resp:
            return json.loads(resp.read().decode('utf-8'))
    except Exception as e:
        return {'error': str(e), 'url': url}

class OSINTBackendHandler(http.server.BaseHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(HTTPStatus.OK)
        self.end_headers()

    def send_json(self, data, status=HTTPStatus.OK):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data, default=str).encode('utf-8'))

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        params = urllib.parse.parse_qs(parsed.query)

        # Health endpoint
        if path == '/health' or path == '/api/health':
            conn = get_db_connection()
            db_status = "CONNECTED" if conn else "OFFLINE"
            if conn:
                conn.close()

            # Test SpiderFoot
            sf_status = "ONLINE"
            try:
                urllib.request.urlopen(f"{SPIDERFOOT_URL}", timeout=2)
            except Exception:
                sf_status = "OFFLINE"

            self.send_json({
                'status': 'ONLINE',
                'daemon': 'SOVEREIGN_OSINT_REST_API',
                'version': '2.2.0',
                'database': db_status,
                'spiderfoot': sf_status,
                'docker_cli': 'READY'
            })
            return

        # SpiderFoot proxy endpoints
        if path == '/api/spiderfoot/scans':
            scans = query_spiderfoot_api('/scanlist')
            self.send_json({'scans': scans})
            return

        if path == '/api/spiderfoot/summary':
            scan_id = params.get('id', [''])[0]
            if not scan_id:
                self.send_json({'error': 'Missing scan id'}, HTTPStatus.BAD_REQUEST)
                return
            summary = query_spiderfoot_api(f'/scansummary?id={scan_id}&by=type')
            self.send_json({'scan_id': scan_id, 'summary': summary})
            return

        # PostgreSQL REST endpoints
        conn = get_db_connection()
        if not conn:
            # Fallback response if database container is offline
            self.send_json({'error': 'PostgreSQL unavailable', 'fallback': True}, HTTPStatus.SERVICE_UNAVAILABLE)
            return

        try:
            cur = conn.cursor()

            if path == '/api/cases':
                cur.execute('SELECT * FROM cases ORDER BY created_at DESC')
                rows = cur.fetchall()
                self.send_json({'cases': rows})
                return

            if path == '/api/evidence':
                case_id = params.get('case_id', [None])[0]
                if case_id:
                    cur.execute('SELECT * FROM evidence_items WHERE case_id = %s ORDER BY created_at DESC', (case_id,))
                else:
                    cur.execute('SELECT * FROM evidence_items ORDER BY created_at DESC LIMIT 100')
                rows = cur.fetchall()
                self.send_json({'evidence': rows})
                return

            if path == '/api/entities':
                case_id = params.get('case_id', [None])[0]
                if case_id:
                    cur.execute('SELECT * FROM entities WHERE case_id = %s ORDER BY created_at DESC', (case_id,))
                else:
                    cur.execute('SELECT * FROM entities ORDER BY created_at DESC LIMIT 100')
                rows = cur.fetchall()
                self.send_json({'entities': rows})
                return

            if path == '/api/relationships':
                case_id = params.get('case_id', [None])[0]
                if case_id:
                    cur.execute('SELECT * FROM entity_relationships WHERE case_id = %s', (case_id,))
                else:
                    cur.execute('SELECT * FROM entity_relationships LIMIT 100')
                rows = cur.fetchall()
                self.send_json({'relationships': rows})
                return

            if path == '/api/timeline':
                case_id = params.get('case_id', [None])[0]
                if case_id:
                    cur.execute('SELECT * FROM timeline_events WHERE case_id = %s ORDER BY event_timestamp ASC', (case_id,))
                else:
                    cur.execute('SELECT * FROM timeline_events ORDER BY event_timestamp ASC LIMIT 100')
                rows = cur.fetchall()
                self.send_json({'timeline': rows})
                return

            if path == '/api/leads':
                cur.execute('SELECT * FROM leads ORDER BY created_at DESC LIMIT 100')
                rows = cur.fetchall()
                self.send_json({'leads': rows})
                return

            # Default 404
            self.send_json({'error': f"Endpoint not found: {path}"}, HTTPStatus.NOT_FOUND)

        except Exception as e:
            self.send_json({'error': str(e)}, HTTPStatus.INTERNAL_SERVER_ERROR)
        finally:
            conn.close()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        content_len = int(self.headers.get('Content-Length', 0))
        post_body = self.rfile.read(content_len) if content_len > 0 else b'{}'
        try:
            req_data = json.loads(post_body.decode('utf-8'))
        except Exception:
            req_data = {}

        # 1. Passive Tool Execution Endpoint
        if path == '/api/tools/run' or path == '/':
            target = req_data.get('target', 'fastly.com')
            tool = req_data.get('tool', 'dig').lower()
            record_type = req_data.get('recordType', 'TXT')

            try:
                target = sanitize_target(target)
                if tool == 'dig':
                    stdout_result = run_passive_dig(target, record_type)
                elif tool == 'whois':
                    stdout_result = run_passive_whois(target)
                elif tool == 'crtsh':
                    stdout_result = run_crtsh(target)
                else:
                    stdout_result = run_passive_dig(target, 'TXT')

                self.send_json({
                    'status': 'SUCCESS',
                    'target': target,
                    'tool': tool,
                    'isLiveExecution': True,
                    'output': stdout_result
                })
            except Exception as e:
                self.send_json({'status': 'ERROR', 'error': str(e)}, HTTPStatus.BAD_REQUEST)
            return

        # 2. SpiderFoot Start Scan Bridge
        if path == '/api/spiderfoot/scans/start':
            target = req_data.get('target', 'aetherdynamics-global.com')
            scan_name = req_data.get('scanName', f"Audit_{target}_{int(time.time())}")
            # SpiderFoot startscan expects form encoded data
            post_payload = urllib.parse.urlencode({
                'scanname': scan_name,
                'scantarget': target,
                'usecase': 'all',
                'modulelist': '',
                'typelist': ''
            }).encode('utf-8')

            try:
                sf_res = query_spiderfoot_api('/startscan', post_payload)
                self.send_json({'status': 'STARTED', 'result': sf_res})
            except Exception as e:
                self.send_json({'status': 'ERROR', 'error': str(e)}, HTTPStatus.BAD_GATEWAY)
            return

        # 3. Database Ingestion Endpoints (PostgreSQL)
        conn = get_db_connection()
        if not conn:
            self.send_json({'error': 'PostgreSQL unavailable', 'fallback': True}, HTTPStatus.SERVICE_UNAVAILABLE)
            return

        try:
            cur = conn.cursor()

            if path == '/api/evidence':
                cur.execute('''
                    INSERT INTO evidence_items (
                        id, case_id, item_number, title, source_url, sha256_hash, 
                        file_path, capture_timestamp, admiralty_reliability, admiralty_credibility, 
                        full_viewport_verified, verified_by
                    ) VALUES (
                        gen_random_uuid(), %s, %s, %s, %s, %s, %s, CURRENT_TIMESTAMP, %s, %s, %s, %s
                    ) RETURNING *
                ''', (
                    req_data.get('caseId', '00000000-0000-0000-0000-000000000001'),
                    req_data.get('itemNumber', 'PROOF-MANUAL'),
                    req_data.get('title', 'Verified Evidence Artifact'),
                    req_data.get('sourceUrl', 'osint://manual-entry'),
                    req_data.get('sha256Hash', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'),
                    req_data.get('filePath', 'cases/evidence/artifact.txt'),
                    req_data.get('admiraltyReliability', 'A'),
                    req_data.get('admiraltyCredibility', '1'),
                    True,
                    req_data.get('verifiedBy', 'Lead_Investigator_Chevalier')
                ))
                conn.commit()
                row = cur.fetchone()
                self.send_json({'status': 'CREATED', 'evidence': row}, HTTPStatus.CREATED)
                return

            if path == '/api/entities':
                cur.execute('''
                    INSERT INTO entities (
                        id, case_id, canonical_name, entity_type, is_confirmed, 
                        confidence_score, disambiguation_notes, resolved_by, resolved_at
                    ) VALUES (
                        gen_random_uuid(), %s, %s, %s, %s, %s, %s, %s, CURRENT_TIMESTAMP
                    ) RETURNING *
                ''', (
                    req_data.get('caseId', '00000000-0000-0000-0000-000000000001'),
                    req_data.get('canonicalName', 'New Correlated Entity'),
                    req_data.get('entityType', 'Digital Presence'),
                    req_data.get('isConfirmed', True),
                    req_data.get('confidenceScore', 0.95),
                    req_data.get('disambiguationNotes', 'Discovered via OSINT Workbench'),
                    req_data.get('resolvedBy', 'Lead_Investigator_Chevalier')
                ))
                conn.commit()
                row = cur.fetchone()
                self.send_json({'status': 'CREATED', 'entity': row}, HTTPStatus.CREATED)
                return

            self.send_json({'error': f"Endpoint not supported: {path}"}, HTTPStatus.NOT_FOUND)

        except Exception as e:
            conn.rollback()
            self.send_json({'error': str(e)}, HTTPStatus.INTERNAL_SERVER_ERROR)
        finally:
            conn.close()

def seed_database_if_empty():
    conn = get_db_connection()
    if not conn:
        return
    try:
        cur = conn.cursor()
        cur.execute("SELECT count(*) FROM cases")
        count = cur.fetchone()['count']
        if count == 0:
            print("[+] Seeding initial cases into PostgreSQL...")
            cur.execute("""
                INSERT INTO cases (
                    id, case_number, title, classification, status, priority, 
                    lead_analyst, target_entity, target_type, legal_boundary_notes
                ) VALUES (
                    '00000000-0000-0000-0000-000000000001',
                    'CASE-2026-0891',
                    'Aether Dynamics Global - External Surface & Shadow IT Audit',
                    'TLP:AMBER',
                    'ACTIVE_INVESTIGATION',
                    'CRITICAL',
                    'Lead_Investigator_Chevalier',
                    'Aether Dynamics Global Corporation',
                    'COMPANY_NAME',
                    'Strict defensive OSINT. Zero active probing.'
                )
            """)
            conn.commit()
            print("[+] Initial cases successfully seeded.")
    except Exception as e:
        print(f"[!] Database seed warning: {e}")
    finally:
        conn.close()

if __name__ == '__main__':
    seed_database_if_empty()
    server_address = ('', PORT)
    httpd = http.server.ThreadingHTTPServer(server_address, OSINTBackendHandler)
    print(f"[*] Sovereign Ethical OSINT REST API & Tool Daemon active on port {PORT}")
    print(f"[*] Bound to PostgreSQL on port {PG_PORT} and SpiderFoot on {SPIDERFOOT_URL}")
    httpd.serve_forever()
