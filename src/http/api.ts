import { apiKey, ABACATE_PAY_API_BASE, USER_AGENT } from "../config.js";

export async function makeAbacatePayRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = {
    "User-Agent": USER_AGENT,
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`
  };

  const url = `${ABACATE_PAY_API_BASE}/${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: { ...headers, ...options.headers }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return await response.json() as T;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
} 