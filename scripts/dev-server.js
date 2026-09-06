import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build as buildReadwell } from '../packages/readwell-css/scripts/build.js';
import { build as buildSumi } from '../packages/sumi-css/scripts/build.js';
import { buildPortal } from './build-portal.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const PORT = parseInt(process.env.PORT || '3000', 10);

const readwellPkgDir = path.join(rootDir, 'packages', 'readwell-css');
const readwellSrcDir = path.join(readwellPkgDir, 'src');
const readwellDistDir = path.join(readwellPkgDir, 'dist');
const readwellExamplesDir = path.join(readwellPkgDir, 'examples');

const sumiPkgDir = path.join(rootDir, 'packages', 'sumi-css');
const sumiSrcDir = path.join(sumiPkgDir, 'src');
const sumiDistDir = path.join(sumiPkgDir, 'dist');
const sumiExamplesDir = path.join(sumiPkgDir, 'examples');
const sumiAssetsDir = path.join(sumiDistDir, 'assets');

const siteDir = path.join(rootDir, 'site');
const siteIndexFile = path.join(siteDir, 'index.html');
const docsIndexFile = path.join(rootDir, 'docs', 'index.html');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf'
};

function resolveFilePath(reqUrl) {
  const parsed = new URL(reqUrl, `http://localhost:${PORT}`);
  let pathname = decodeURIComponent(parsed.pathname);

  // Root portal
  if (pathname === '/' || pathname === '/index.html') {
    return siteIndexFile;
  }

  // Prevent directory traversal
  const normalized = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');

  // Readwell namespace: /readwell/*
  if (pathname.startsWith('/readwell')) {
    const sub = pathname.slice('/readwell'.length).replace(/^\/+/, '');
    if (!sub || sub === 'index.html') {
      return path.join(readwellExamplesDir, 'index.html');
    }

    const candidates = [
      path.join(readwellExamplesDir, sub),
      path.join(readwellDistDir, sub.replace(/^dist\/+/, '')),
      path.join(readwellDistDir, sub),
      path.join(siteDir, 'readwell', sub)
    ];

    for (const candidate of candidates) {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        return candidate;
      }
    }
  }

  // Sumi namespace: /sumi/*
  if (pathname.startsWith('/sumi')) {
    const sub = pathname.slice('/sumi'.length).replace(/^\/+/, '');
    if (!sub || sub === 'index.html') {
      return path.join(sumiExamplesDir, 'index.html');
    }

    const candidates = [
      path.join(sumiExamplesDir, sub),
      path.join(sumiDistDir, sub.replace(/^dist\/+/, '')),
      path.join(sumiAssetsDir, sub.replace(/^(dist\/)?assets\/+/, '')),
      path.join(sumiDistDir, sub),
      path.join(siteDir, 'sumi', sub)
    ];

    for (const candidate of candidates) {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        return candidate;
      }
    }
  }

  // Unified /dist/* routing
  if (pathname.startsWith('/dist/')) {
    const sub = pathname.slice('/dist/'.length);
    const candidates = [
      path.join(readwellDistDir, sub),
      path.join(sumiDistDir, sub),
      path.join(siteDir, 'dist', sub)
    ];
    for (const candidate of candidates) {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        return candidate;
      }
    }
  }

  // Unified /assets/* routing
  if (pathname.startsWith('/assets/')) {
    const sub = pathname.slice('/assets/'.length);
    const candidates = [
      path.join(sumiAssetsDir, sub),
      path.join(siteDir, 'assets', sub),
      path.join(siteDir, 'dist', 'assets', sub)
    ];
    for (const candidate of candidates) {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        return candidate;
      }
    }
  }

  // General site fallback
  const siteCandidate = path.join(siteDir, normalized);
  if (fs.existsSync(siteCandidate) && fs.statSync(siteCandidate).isFile()) {
    return siteCandidate;
  }

  return null;
}

export function createDevServer() {
  const server = http.createServer((req, res) => {
    const reqPath = req.url;
    const resolvedPath = resolveFilePath(reqPath);

    if (resolvedPath && fs.existsSync(resolvedPath)) {
      const ext = path.extname(resolvedPath).toLowerCase();
      const mimeType = MIME_TYPES[ext] || 'application/octet-stream';

      try {
        const stat = fs.statSync(resolvedPath);
        res.writeHead(200, {
          'Content-Type': mimeType,
          'Content-Length': stat.size,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Access-Control-Allow-Origin': '*'
        });

        const readStream = fs.createReadStream(resolvedPath);
        readStream.pipe(res);
        return;
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`500 Internal Server Error: ${err.message}`);
        return;
      }
    }

    // 404 Not Found
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="utf-8">
        <title>404 Not Found - Readwell Dev Server</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 3rem; background: #fdfcf9; color: #1a1a1a; }
          h1 { font-size: 2rem; margin-bottom: 0.5rem; }
          p { color: #666; margin-bottom: 1.5rem; }
          ul { line-height: 2; }
          a { color: #1e3a8a; text-decoration: none; font-weight: 600; }
          a:hover { text-decoration: underline; }
          code { background: #eee; padding: 0.2rem 0.4rem; border-radius: 4px; font-size: 0.9em; }
        </style>
      </head>
      <body>
        <h1>404 Not Found</h1>
        <p>요청하신 경로(<code>${reqPath}</code>)를 찾을 수 없습니다.</p>
        <p>다음 허브 링크를 이용해주세요:</p>
        <ul>
          <li><a href="/">통합 포털 대문 (Portal)</a></li>
          <li><a href="/readwell/">Readwell CSS 예제 허브</a></li>
          <li><a href="/readwell/docs.html">Readwell CSS 공식 문서</a></li>
          <li><a href="/sumi/">Sumi CSS 수묵 쇼케이스</a></li>
        </ul>
      </body>
      </html>
    `);
  });

  return server;
}

export function startDevServer(port = PORT) {
  // 1. Initial workspace rebuild & portal sync
  console.log('\n\x1b[36m--- Starting Readwell Monorepo Dev Server ---\x1b[0m');
  try {
    console.log('Running initial package builds...');
    buildReadwell();
    buildSumi();
    buildPortal();
  } catch (err) {
    console.warn('\x1b[33mInitial build warning:\x1b[0m', err.message);
  }

  const server = createDevServer();

  // 2. Start HTTP server
  server.listen(port, () => {
    console.log(`\n\x1b[32m✔ Local Dev Server is listening on http://localhost:${port}\x1b[0m`);
    console.log(`  - Portal Home:        \x1b[34mhttp://localhost:${port}/\x1b[0m`);
    console.log(`  - Readwell CSS Hub:   \x1b[34mhttp://localhost:${port}/readwell/\x1b[0m`);
    console.log(`  - Readwell Docs:      \x1b[34mhttp://localhost:${port}/readwell/docs.html\x1b[0m`);
    console.log(`  - Sumi CSS Showcase:  \x1b[34mhttp://localhost:${port}/sumi/\x1b[0m`);
    console.log('\n\x1b[90mWatching for source changes in packages/... (Press Ctrl+C to exit)\x1b[0m');
  });

  // 3. Hot-rebuild file watcher for packages/readwell-css/src/
  let readwellDebounce;
  if (fs.existsSync(readwellSrcDir)) {
    fs.watch(readwellSrcDir, { recursive: true }, (eventType, filename) => {
      if (filename && filename.endsWith('.css')) {
        clearTimeout(readwellDebounce);
        readwellDebounce = setTimeout(() => {
          console.log(`\n\x1b[36m[watch]\x1b[0m Readwell source changed: ${filename}, rebuilding...`);
          try {
            buildReadwell();
            buildPortal();
          } catch (err) {
            console.error('\x1b[31mReadwell rebuild failed:\x1b[0m', err.message);
          }
        }, 100);
      }
    });
  }

  // 4. Hot-rebuild file watcher for packages/sumi-css/src/
  let sumiDebounce;
  if (fs.existsSync(sumiSrcDir)) {
    fs.watch(sumiSrcDir, { recursive: true }, (eventType, filename) => {
      if (filename && filename.endsWith('.css')) {
        clearTimeout(sumiDebounce);
        sumiDebounce = setTimeout(() => {
          console.log(`\n\x1b[36m[watch]\x1b[0m Sumi source changed: ${filename}, rebuilding...`);
          try {
            buildSumi();
            buildPortal();
          } catch (err) {
            console.error('\x1b[31mSumi rebuild failed:\x1b[0m', err.message);
          }
        }, 100);
      }
    });
  }

  // 5. Watch site/index.html and sync to docs/index.html
  let siteDebounce;
  if (fs.existsSync(siteIndexFile)) {
    fs.watch(siteIndexFile, () => {
      clearTimeout(siteDebounce);
      siteDebounce = setTimeout(() => {
        console.log(`\n\x1b[36m[watch]\x1b[0m Portal index changed, syncing to docs/index.html...`);
        try {
          fs.copyFileSync(siteIndexFile, docsIndexFile);
        } catch (err) {
          console.error('\x1b[31mPortal sync failed:\x1b[0m', err.message);
        }
      }, 100);
    });
  }

  return server;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  startDevServer();
}
