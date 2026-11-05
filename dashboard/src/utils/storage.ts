/**
 * Local Storage State Persistence Utility
 * Preserves evidence ledgers, case completion states, and analyst notes
 * across browser reloads and sessions.
 */

const STORAGE_PREFIX = 'sovereign_osint_';

export function loadStoredData<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn(`[Storage] Failed to read ${key} from localStorage:`, err);
  }
  return defaultValue;
}

export function saveStoredData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(data));
  } catch (err) {
    console.warn(`[Storage] Failed to save ${key} to localStorage:`, err);
  }
}
