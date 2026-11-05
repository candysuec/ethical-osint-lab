/**
 * Cryptographic SHA-256 Hashing Utility
 * Compliant with ISO/IEC 27037 digital evidence preservation standards.
 * Uses native Web Crypto API for secure, zero-dependency client-side hashing.
 */
export async function calculateSha256(input: string | ArrayBuffer | Uint8Array): Promise<string> {
  let bufferToDigest: ArrayBuffer;
  if (typeof input === 'string') {
    const encoded = new TextEncoder().encode(input);
    bufferToDigest = encoded.buffer as ArrayBuffer;
  } else if (input instanceof Uint8Array) {
    bufferToDigest = input.buffer as ArrayBuffer;
  } else {
    bufferToDigest = input;
  }
  const hashBuffer = await crypto.subtle.digest('SHA-256', bufferToDigest);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
