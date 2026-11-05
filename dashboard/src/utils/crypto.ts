/**
 * Cryptographic SHA-256 Hashing Utility
 * Compliant with ISO/IEC 27037 digital evidence preservation standards.
 * Uses native Web Crypto API for secure, zero-dependency client-side hashing.
 */
export async function calculateSha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
