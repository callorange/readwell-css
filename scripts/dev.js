import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from './build.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// 1. Initial build if src/index.css exists
if (fs.existsSync(path.join(srcDir, 'index.css'))) {
  try {
    build();
  } catch (e) {
    console.error('Initial build warning:', e.message);
  }
}

// 2. Watch src/ directory
if (fs.existsSync(srcDir)) {
  let debounceTimer;
  fs.watch(srcDir, { recursive: true }, (eventType, filename) => {
    if (filename && filename.endsWith('.css')) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        console.log(`\n\x1b[36m[watch]\x1b[0m File changed: ${filename}, rebuilding...`);
        try {
          build();
        } catch (err) {
          console.error('\x1b[31mRebuild error:\x1b[0m', err.message);
        }
      }, 100);
    }
  });
}

// 3. Static server
const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') {
    reqPath = '/examples/index.html';
  }

  const filePath = path.join(rootDir, reqPath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`404 Not Found: ${reqPath}`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`\n\x1b[32m🚀 Readwell Dev Server running at http://localhost:${PORT}\x1b[0m`);
  console.log(`  - Examples: http://localhost:${PORT}/examples/`);
  console.log(`  - Watching for changes in src/...\n`);
});
