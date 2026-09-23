const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT || 3000);
const ROOT = __dirname;
const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg'
};

function sendJson(res, status, body) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(JSON.stringify(body));
}

async function mintToken(res) {
  if (!ASSEMBLYAI_API_KEY) {
    return sendJson(res, 503, { error: 'ASSEMBLYAI_API_KEY is not configured on the server.' });
  }

  try {
    const response = await fetch(
      'https://streaming.assemblyai.com/v3/token?expires_in_seconds=300',
      { headers: { Authorization: ASSEMBLYAI_API_KEY } }
    );
    const body = await response.text();

    if (!response.ok) {
      console.error('AssemblyAI token error:', response.status, body);
      return sendJson(res, 502, { error: 'Could not mint AssemblyAI streaming token.' });
    }

    const data = JSON.parse(body);
    return sendJson(res, 200, { token: data.token });
  } catch (error) {
    console.error('Token route failed:', error);
    return sendJson(res, 502, { error: 'AssemblyAI token service unavailable.' });
  }
}

function serveStatic(req, res) {
  const requested = req.url === '/' ? '/voice-intake-agent.html' : req.url.split('?')[0];
  const decoded = decodeURIComponent(requested);
  const filePath = path.resolve(ROOT, '.' + decoded);

  if (!filePath.startsWith(ROOT + path.sep) && filePath !== ROOT) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Not found');
    }
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store'
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url.startsWith('/api/assemblyai-token')) {
    return mintToken(res);
  }
  if (req.method === 'GET' && req.url.startsWith('/health')) {
    return sendJson(res, 200, { ok: true, assemblyaiConfigured: Boolean(ASSEMBLYAI_API_KEY) });
  }
  if (req.method !== 'GET') {
    res.writeHead(405, { Allow: 'GET' });
    return res.end('Method not allowed');
  }
  return serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log(`MediVoice running on http://localhost:${PORT}`);
  console.log(`AssemblyAI key configured: ${ASSEMBLYAI_API_KEY ? 'yes' : 'no'}`);
});
