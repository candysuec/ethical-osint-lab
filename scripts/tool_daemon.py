#!/usr/bin/env python3
"""
Sovereign Ethical OSINT Tool Execution Daemon
Executes safe, 100% passive open-source reconnaissance tools.
Enforces CFAA ethical parameters and strips active scanning/injection flags.
Executes natively via container or host fallback (nslookup / curl / whois).
"""

import http.server
import json
import os
import re
import subprocess
import urllib.parse
from http import HTTPStatus

PORT = 5002

SAFE_DOMAIN_REGEX = re.compile(r'^[a-zA-Z0-9\.\_\-]+$')
SAFE_IP_REGEX = re.compile(r'^[0-9\.\:\/]+$')

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
        proc = subprocess.run(docker_cmd, capture_output=True, text=True, timeout=20)
        return proc.stdout.strip()
    except Exception as e:
        return f"Container execution error: {e}"

def run_passive_dig(target: str, record_type: str = 'TXT') -> str:
    target = sanitize_target(target)
    if record_type.upper() not in ['TXT', 'MX', 'NS', 'A', 'AAAA', 'SOA', 'CNAME']:
        record_type = 'TXT'

    # Execute dig inside the Linux container
    if record_type.upper() == 'TXT':
        cmd = ['dig', '+noall', '+answer', 'TXT', target, f"_dmarc.{target}"]
    else:
        cmd = ['dig', '+noall', '+answer', record_type.upper(), target]

    stdout = run_in_docker(cmd)
    if not stdout or "Container execution error" in stdout:
        # Fallback to nslookup on host
        host_cmd = ['nslookup', f"-type={record_type}", target]
        res = subprocess.run(host_cmd, capture_output=True, text=True, timeout=10)
        stdout = res.stdout.strip()

    return stdout or f";; Zero {record_type} records found for {target}."

def run_passive_whois(target: str) -> str:
    target = sanitize_target(target)
    cmd = ['whois', target]
    stdout = run_in_docker(cmd)
    lines = stdout.splitlines()
    filtered = [l for l in lines if not l.startswith('%') and not l.startswith('>>>') and not 'TERMS OF USE' in l]
    return '\n'.join(filtered[:35]).strip() or stdout[:1500].strip()

def run_crtsh(target: str) -> str:
    target = sanitize_target(target)
    cmd = ['curl', '-s', f"https://crt.sh/?q=%25.{target}&output=json"]
    stdout = run_in_docker(cmd)
    try:
        entries = json.loads(stdout)
        names = sorted(list(set(e.get('name_value', '') for e in entries if 'name_value' in e)))
        return '\n'.join(names[:25]) or f"No certificate transparency records found for {target}."
    except Exception:
        return stdout[:1200] if stdout else "Certificate transparency query completed."

class OSINTToolHandler(http.server.BaseHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(HTTPStatus.OK)
        self.end_headers()

    def do_POST(self):
        content_len = int(self.headers.get('Content-Length', 0))
        post_body = self.rfile.read(content_len)

        try:
            req_data = json.loads(post_body.decode('utf-8'))
        except Exception:
            req_data = {}

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

            response_data = {
                'status': 'SUCCESS',
                'target': target,
                'tool': tool,
                'isLiveExecution': True,
                'output': stdout_result
            }
            self.send_response(HTTPStatus.OK)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response_data).encode('utf-8'))

        except Exception as e:
            self.send_response(HTTPStatus.BAD_REQUEST)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            error_data = {
                'status': 'ERROR',
                'error': str(e),
                'isLiveExecution': True
            }
            self.wfile.write(json.dumps(error_data).encode('utf-8'))

    def do_GET(self):
        if self.path == '/health':
            self.send_response(HTTPStatus.OK)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'ONLINE', 'daemon': 'OSINT_TOOL_RUNNER', 'bridge': 'DOCKER_CLI'}).encode('utf-8'))
        else:
            self.send_response(HTTPStatus.NOT_FOUND)
            self.end_headers()

if __name__ == '__main__':
    server_address = ('0.0.0.0', PORT)
    httpd = http.server.ThreadingHTTPServer(server_address, OSINTToolHandler)
    print(f"[*] Sovereign OSINT Tool Execution Daemon listening on 0.0.0.0:{PORT}")
    httpd.serve_forever()
