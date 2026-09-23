module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ASSEMBLYAI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'ASSEMBLYAI_API_KEY is not configured.' });
  }

  try {
    const response = await fetch(
      'https://streaming.assemblyai.com/v3/token?expires_in_seconds=300',
      { headers: { Authorization: apiKey } }
    );

    const body = await response.text();
    if (!response.ok) {
      console.error('AssemblyAI token error:', response.status, body);
      return res.status(502).json({ error: 'Could not mint AssemblyAI streaming token.' });
    }

    const data = JSON.parse(body);
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ token: data.token });
  } catch (error) {
    console.error('Token route failed:', error);
    return res.status(502).json({ error: 'AssemblyAI token service unavailable.' });
  }
};
