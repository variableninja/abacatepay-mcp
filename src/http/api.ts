import { validateApiKey, ABACATE_PAY_API_BASE, USER_AGENT } from "../config.js";

export async function makeAbacatePayRequest<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${ABACATE_PAY_API_BASE}${endpoint}`;
  
  const headers = {
    'Authorization': `Bearer ${validateApiKey()}`,
    'Content-Type': 'application/json',
    'User-Agent': USER_AGENT,
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  return response.json();
} 