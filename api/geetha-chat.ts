// Vercel serverless endpoint for Geetha. Keep provider credentials in server-side env vars only.
const MAX_MESSAGES = 12;
const MAX_CONTENT_LENGTH = 4000;
const SYSTEM_PROMPT = `You are Geetha AI (கீதா AI), an accessible assistant for the SAMAM AI platform supporting Tamil Nadu citizens.
Be warm, helpful, clear, and respectful. Support English, Tamil, and Tanglish, matching the user's language.
Help with scholarships, Tamil Nadu government schemes, TNEA counselling, education, careers, jobs, digital services, and accessibility.
For changing deadlines, eligibility, or official rules, avoid guessing; direct users to official sources for verification.
Keep answers concise, actionable, and practical. Never request passwords, OTPs, Aadhaar numbers, or bank details.`;

export default async function handler(req: any, res: any) {
  const allowedOrigin = process.env.SAMAM_ALLOWED_ORIGIN;
  const requestOrigin = req.headers.origin;
  const isLocalOrigin = typeof requestOrigin === 'string' && (
    requestOrigin === 'http://localhost' || requestOrigin.startsWith('http://localhost:') ||
    requestOrigin === 'http://127.0.0.1' || requestOrigin.startsWith('http://127.0.0.1:') ||
    requestOrigin === 'https://localhost' || requestOrigin.startsWith('https://localhost:') ||
    requestOrigin === 'https://127.0.0.1' || requestOrigin.startsWith('https://127.0.0.1:')
  );
  if (requestOrigin && allowedOrigin && requestOrigin !== allowedOrigin && !isLocalOrigin) {
    return res.status(403).json({ error: 'Origin not allowed' });
  }
  if (requestOrigin && !allowedOrigin && !isLocalOrigin) {
    return res.status(403).json({ error: 'Set SAMAM_ALLOWED_ORIGIN before enabling this endpoint' });
  }
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin || (isLocalOrigin ? requestOrigin : '*'));
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const geminiApiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  const ollamaApiKey = process.env.OLLAMA_API_KEY;

  if (!geminiApiKey && !ollamaApiKey) {
    return res.status(503).json({ error: 'AI service is not configured. Set GEMINI_API_KEY or OLLAMA_API_KEY.' });
  }

  const input = Array.isArray(req.body?.messages) ? req.body.messages : [];
  if (!input.length || input.length > MAX_MESSAGES) {
    return res.status(400).json({ error: 'Send between 1 and 12 messages' });
  }
  const messages = input
    .filter((m: any) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m: any) => ({ role: m.role, content: m.content.slice(0, MAX_CONTENT_LENGTH) }));
  if (!messages.length || messages.some((m: any) => !m.content.trim())) {
    return res.status(400).json({ error: 'Invalid messages' });
  }

  // 1. Prefer Google Gemini API if configured
  if (geminiApiKey) {
    try {
      const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(geminiApiKey)}`;
      
      const contents = messages.map((m: any) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

      const upstream = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { temperature: 0.7, maxOutputTokens: 800 },
        }),
      });

      if (upstream.ok) {
        const data = await upstream.json();
        const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (typeof answer === 'string' && answer.trim()) {
          return res.status(200).json({ answer: answer.trim() });
        }
      }
    } catch {
      // Fall through to Ollama if configured
    }
  }

  // 2. Ollama / DeepSeek fallback
  if (ollamaApiKey) {
    try {
      const upstream = await fetch('https://ollama.com/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${ollamaApiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: process.env.OLLAMA_MODEL || 'deepseek-v4.1-flash',
          messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
          stream: false,
        }),
      });
      if (!upstream.ok) {
        return res.status(502).json({ error: 'AI provider returned an error' });
      }
      const data = await upstream.json();
      const answer = data?.choices?.[0]?.message?.content;
      if (typeof answer !== 'string' || !answer.trim()) {
        return res.status(502).json({ error: 'AI provider returned an empty answer' });
      }
      return res.status(200).json({ answer: answer.trim() });
    } catch {
      return res.status(502).json({ error: 'Could not reach the AI provider' });
    }
  }

  return res.status(502).json({ error: 'Could not reach AI provider' });
}
