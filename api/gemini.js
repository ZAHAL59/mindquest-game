// api/gemini.js — Vercel serverless function
// Proxies Gemini generateContent requests, keeping the API key server-side.
// Set GEMINI_API_KEY in Vercel project → Settings → Environment Variables.

export default async function handler(req, res) {
  // CORS — allow the game to call this from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'GEMINI_API_KEY not configured on server. Add it in Vercel → Settings → Environment Variables.' });
    return;
  }

  const { model, body } = req.body;
  if (!model || !body) {
    res.status(400).json({ error: 'Missing model or body in request' });
    return;
  }

  // Only allow known Gemini generateContent models (security)
  if (!model.startsWith('gemini-')) {
    res.status(400).json({ error: 'Invalid model name' });
    return;
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  try {
    const upstream = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
