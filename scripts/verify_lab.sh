#!/usr/bin/env bash
# ==============================================================================
# Ethical OSINT Lab - Environment Sanity Checker
# ==============================================================================
set -e

echo "=== [1/4] Checking Essential CLI Utilities ==="
for cmd in curl jq dig whois git python3; do
    if command -v "$cmd" >/dev/null 2>&1; then
        echo "[OK] $cmd is installed."
    else
        echo "[MISSING] $cmd is NOT installed. Run 'sudo apt install $cmd'."
    fi
done

echo ""
echo "=== [2/4] Testing Passive DNS Resolution ==="
dig +short TXT google.com >/dev/null && echo "[OK] DNS resolution is functioning properly." || echo "[FAIL] DNS resolution failed."

echo ""
echo "=== [3/4] Testing Certificate Transparency Connectivity (crt.sh) ==="
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "https://crt.sh/?q=example.com" || echo "000")
if [ "$HTTP_CODE" = "200" ]; then
    echo "[OK] crt.sh certificate logs reachable."
else
    echo "[WARN] crt.sh returned HTTP $HTTP_CODE (may be rate-limited, normal behavior)."
fi

echo ""
echo "=== [4/4] Environment Ready for Ethical OSINT Investigation ==="
