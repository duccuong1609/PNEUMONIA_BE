import fetch from 'node-fetch';

// Polyfill fetch for tfjs
if (!globalThis.fetch) {
  globalThis.fetch = fetch as any;
}
