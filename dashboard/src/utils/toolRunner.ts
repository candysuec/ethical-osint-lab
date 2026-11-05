/**
 * Live Containerized Tool Execution Client
 * Queries the local tool daemon bridge running on http://127.0.0.1:5002
 * Executes authentic Linux CLI commands inside osint_cli_workstation
 * (dig, whois, crtsh) with seamless offline fallback to curriculum presets.
 */

export interface ToolExecutionResponse {
  status: 'SUCCESS' | 'ERROR';
  target: string;
  tool: string;
  isLiveExecution: boolean;
  output: string;
  error?: string;
}

const TOOL_DAEMON_URL = 'http://127.0.0.1:5002';

export async function checkToolDaemonHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${TOOL_DAEMON_URL}/health`, { signal: AbortSignal.timeout(1500) });
    return res.ok;
  } catch {
    return false;
  }
}

export async function executeLiveOSINTTool(
  tool: string,
  target: string,
  recordType: string = 'TXT',
  fallbackOutput: string
): Promise<{ output: string; isLive: boolean }> {
  try {
    const response = await fetch(`${TOOL_DAEMON_URL}/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tool, target, recordType }),
      signal: AbortSignal.timeout(12000)
    });

    if (response.ok) {
      const data: ToolExecutionResponse = await response.json();
      if (data.status === 'SUCCESS' && data.output) {
        return { output: data.output, isLive: true };
      }
    }
  } catch (err) {
    console.info('[LiveToolRunner] Daemon unavailable, utilizing verified curriculum telemetry:', err);
  }

  // Graceful fallback to verified curriculum standard
  return { output: fallbackOutput, isLive: false };
}
