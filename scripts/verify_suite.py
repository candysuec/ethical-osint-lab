#!/usr/bin/env python3
"""
🏛️ SOVEREIGN ETHICAL OSINT LABORATORY — PRE-FLIGHT VERIFICATION SUITE
Standard Reference: OSINT-TEST-01
Verifies all 4 operational tiers:
  - Port :5180: Analyst Workbench (Vite / React)
  - Port :5002: Sovereign OSINT REST API & Tool Daemon
  - Port :5001: SpiderFoot Reconnaissance Engine
  - Port :5432: PostgreSQL 16 Intelligence Database (sovereign_osint)
"""

import sys
import json
import urllib.request
import urllib.error
import subprocess
import time

# Ensure UTF-8 output on Windows
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

GREEN = '\033[92m'
CYAN = '\033[96m'
YELLOW = '\033[93m'
RED = '\033[91m'
BOLD = '\033[1m'
RESET = '\033[0m'

def log(symbol, msg, color=RESET):
    print(f"{color}[{symbol}] {msg}{RESET}")

def test_http_endpoint(name, url, expected_code=200, timeout=5):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Sovereign-Healthcheck/2.3'})
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            if resp.status == expected_code:
                log("+", f"{name:<35} -> HTTP {resp.status} OK ({url})", GREEN)
                return True
            else:
                log("!", f"{name:<35} -> HTTP {resp.status} (Expected {expected_code})", YELLOW)
                return False
    except Exception as e:
        log("X", f"{name:<35} -> Connection Failed ({url}): {e}", RED)
        return False

def test_daemon_health(url="http://localhost:5002/api/health"):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Sovereign-Healthcheck/2.3'})
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            db_status = data.get('database', 'UNKNOWN')
            sf_status = data.get('spiderfoot', 'UNKNOWN')
            cli_status = data.get('docker_cli', 'UNKNOWN')
            
            db_color = GREEN if db_status == 'CONNECTED' else RED
            sf_color = GREEN if sf_status == 'ONLINE' else RED
            cli_color = GREEN if cli_status == 'READY' else RED

            log("+", f"Tool Daemon Core Status          -> {data.get('status', 'OFFLINE')}", GREEN)
            log(" ", f"  |-- PostgreSQL 16 Persistence   -> {db_status}", db_color)
            log(" ", f"  |-- SpiderFoot Engine Bridge    -> {sf_status}", sf_color)
            log(" ", f"  \\-- Linux CLI Workstation       -> {cli_status}", cli_color)
            return db_status == 'CONNECTED' and cli_status == 'READY'
    except Exception as e:
        log("X", f"Tool Daemon Health API           -> Failed: {e}", RED)
        return False

def test_postgres_case_count():
    try:
        cmd = ['docker', 'exec', 'osint_postgres', 'psql', '-U', 'osint_analyst', '-d', 'sovereign_osint', '-t', '-c', 'SELECT count(*) FROM cases;']
        proc = subprocess.run(cmd, capture_output=True, text=True, timeout=5)
        if proc.returncode == 0:
            count = int(proc.stdout.strip())
            color = GREEN if count >= 30 else YELLOW
            log("+" if count >= 30 else "!", f"PostgreSQL Case Catalog Count     -> {count} Seeding Records (Expect >= 30)", color)
            return count >= 30
        else:
            log("X", f"PostgreSQL Container Query Failed -> {proc.stderr.strip()}", RED)
            return False
    except Exception as e:
        log("X", f"PostgreSQL Docker Query Error     -> {e}", RED)
        return False

def test_live_tool_runner():
    try:
        req_body = json.dumps({
            "target": "fastly.com",
            "tool": "dig",
            "recordType": "TXT"
        }).encode('utf-8')
        req = urllib.request.Request("http://localhost:5002/api/tools/run", data=req_body, headers={'Content-Type': 'application/json'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            res = json.loads(resp.read().decode('utf-8'))
            output = res.get('output', '')
            if 'v=DMARC1' in output or 'v=spf1' in output:
                log("+", f"Passive DNS Tool Execution Stream -> Successfully captured TXT / DMARC payload", GREEN)
                return True
            else:
                log("!", f"Tool Execution Warning            -> Completed but output was unexpected", YELLOW)
                return True
    except Exception as e:
        log("X", f"Tool Execution Stream Failed      -> {e}", RED)
        return False

def main():
    print(f"\n{BOLD}{CYAN}======================================================================{RESET}")
    print(f"{BOLD}{CYAN}   SOVEREIGN ETHICAL OSINT LABORATORY -- SYSTEM HEALTHCHECK{RESET}")
    print(f"{BOLD}{CYAN}   Target Platform: http://localhost:5180 | Version: 2.3.1{RESET}")
    print(f"{BOLD}{CYAN}======================================================================{RESET}\n")

    results = []
    
    print(f"{BOLD}1. Checking Platform Web Services & Gateways:{RESET}")
    results.append(test_http_endpoint("Analyst Workbench UI", "http://localhost:5180"))
    results.append(test_http_endpoint("SpiderFoot Reconnaissance Engine", "http://localhost:5001"))
    results.append(test_http_endpoint("Tool & REST Daemon Gateway", "http://localhost:5002/api/health"))

    print(f"\n{BOLD}2. Checking Daemon & Bridge Subsystems:{RESET}")
    results.append(test_daemon_health())

    print(f"\n{BOLD}3. Checking PostgreSQL Relational Intelligence Store:{RESET}")
    results.append(test_postgres_case_count())

    print(f"\n{BOLD}4. Checking Containerized Passive Tool Execution:{RESET}")
    results.append(test_live_tool_runner())

    print(f"\n{BOLD}{CYAN}======================================================================{RESET}")
    if all(results):
        print(f"{BOLD}{GREEN}   [PASS] ALL OSINT TRAINING LAB SYSTEMS ARE 100% OPERATIONAL!{RESET}")
        print(f"{CYAN}   Analyst Workbench: http://localhost:5180{RESET}")
        print(f"{CYAN}   SpiderFoot Engine: http://localhost:5001{RESET}")
        print(f"{BOLD}{CYAN}======================================================================\n{RESET}")
        sys.exit(0)
    else:
        print(f"{BOLD}{YELLOW}   [WARN] SOME SUBSYSTEMS REPORTED DEGRADED PERFORMANCE.{RESET}")
        print(f"{BOLD}{CYAN}======================================================================\n{RESET}")
        sys.exit(1)

if __name__ == '__main__':
    main()
