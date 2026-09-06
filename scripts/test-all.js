import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { buildPortal } from './build-portal.js';
import { createDevServer } from './dev-server.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const siteDir = path.join(rootDir, 'site');
const siteIndexFile = path.join(siteDir, 'index.html');
const docsIndexFile = path.join(rootDir, 'docs', 'index.html');

console.log('\x1b[1m\x1b[36m=== Starting Readwell Monorepo Comprehensive Integrity Validation ===\x1b[0m\n');

// 1. Run tests for readwell-css
console.log('\x1b[34m[1/5] Testing package: readwell-css...\x1b[0m');
const readwellTestScript = path.join(rootDir, 'packages', 'readwell-css', 'scripts', 'test.js');
try {
  execFileSync(process.execPath, [readwellTestScript], { stdio: 'inherit', cwd: path.join(rootDir, 'packages', 'readwell-css') });
  console.log('\x1b[32m✔ readwell-css tests passed.\x1b[0m\n');
} catch (err) {
  console.error('\x1b[31m✖ readwell-css tests failed!\x1b[0m');
  process.exit(1);
}

// 2. Run tests for sumi-css
console.log('\x1b[34m[2/5] Testing package: sumi-css...\x1b[0m');
const sumiTestScript = path.join(rootDir, 'packages', 'sumi-css', 'scripts', 'test.js');
try {
  execFileSync(process.execPath, [sumiTestScript], { stdio: 'inherit', cwd: path.join(rootDir, 'packages', 'sumi-css') });
  console.log('\x1b[32m✔ sumi-css tests passed.\x1b[0m\n');
} catch (err) {
  console.error('\x1b[31m✖ sumi-css tests failed!\x1b[0m');
  process.exit(1);
}

// 3. Assemble Portal static site
console.log('\x1b[34m[3/5] Testing portal build & synchronization...\x1b[0m');
try {
  buildPortal();
} catch (err) {
  console.error('\x1b[31m✖ buildPortal() failed:\x1b[0m', err.message);
  process.exit(1);
}

// 4. Validate Portal static file integrity & content
console.log('\n\x1b[34m[4/5] Validating portal structure & asset integrity...\x1b[0m');

// 4.1 Check site/index.html & docs/index.html
if (!fs.existsSync(siteIndexFile) || fs.statSync(siteIndexFile).size === 0) {
  throw new Error('site/index.html is missing or empty!');
}
if (!fs.existsSync(docsIndexFile) || fs.statSync(docsIndexFile).size === 0) {
  throw new Error('docs/index.html is missing or empty!');
}

const siteContent = fs.readFileSync(siteIndexFile, 'utf-8');
const docsContent = fs.readFileSync(docsIndexFile, 'utf-8');

if (siteContent !== docsContent) {
  throw new Error('docs/index.html is not synchronized with site/index.html!');
}

const requiredPortalKeywords = [
  '저자극·자연주의',
  '타이포그래피',
  'Readwell CSS',
  'Sumi CSS',
  'npm i readwell-css',
  'npm i sumi-css',
  'readwell/docs.html',
  'readwell/components.html',
  'readwell/reading.html',
  'readwell/workspace.html',
  'sumi/index.html',
  '백상지',
  '크림지',
  '야간지'
];

for (const kw of requiredPortalKeywords) {
  if (!siteContent.includes(kw)) {
    throw new Error(`Portal index missing expected keyword/link: "${kw}"`);
  }
}
console.log('  ✔ Verified site/index.html and docs/index.html synchronization & keywords');

// 4.2 Check site/readwell files
const requiredReadwellFiles = [
  'index.html',
  'docs.html',
  'components.html',
  'reading.html',
  'workspace.html',
  'switcher.css',
  'switcher.js',
  'dist/readwell.css',
  'dist/readwell.min.css'
];

for (const rel of requiredReadwellFiles) {
  const p = path.join(siteDir, 'readwell', rel);
  if (!fs.existsSync(p) || fs.statSync(p).size === 0) {
    throw new Error(`site/readwell/${rel} is missing or empty!`);
  }
}
console.log(`  ✔ Verified site/readwell/ static assets (${requiredReadwellFiles.length} key files checked)`);

// 4.3 Check site/sumi files
const requiredSumiFiles = [
  'index.html',
  'dist/sumi.css',
  'dist/sumi.min.css'
];

for (const rel of requiredSumiFiles) {
  const p = path.join(siteDir, 'sumi', rel);
  if (!fs.existsSync(p) || fs.statSync(p).size === 0) {
    throw new Error(`site/sumi/${rel} is missing or empty!`);
  }
}

const sumiAssetsDir = path.join(siteDir, 'sumi', 'assets');
if (!fs.existsSync(sumiAssetsDir)) {
  throw new Error('site/sumi/assets directory missing!');
}
const sumiAssetCount = fs.readdirSync(sumiAssetsDir).length;
if (sumiAssetCount < 60) {
  throw new Error(`site/sumi/assets contains only ${sumiAssetCount} files (expected at least 60)`);
}
console.log(`  ✔ Verified site/sumi/ static assets (including ${sumiAssetCount} visual assets)`);

const siteRootAssetsDir = path.join(siteDir, 'assets');
if (!fs.existsSync(siteRootAssetsDir)) {
  throw new Error('site/assets directory missing!');
}
const siteRootAssetCount = fs.readdirSync(siteRootAssetsDir).length;
if (siteRootAssetCount < 60) {
  throw new Error(`site/assets contains only ${siteRootAssetCount} files (expected at least 60)`);
}
console.log(`  ✔ Verified site/assets/ static assets (including ${siteRootAssetCount} visual assets)`);

// 4.4 Check site/dist unified distribution
const requiredUnifiedDist = [
  'readwell.css',
  'readwell.min.css',
  'sumi.css',
  'sumi.min.css'
];
for (const distFile of requiredUnifiedDist) {
  const siteDistP = path.join(siteDir, 'dist', distFile);
  if (!fs.existsSync(siteDistP)) {
    throw new Error(`Unified distribution file ${distFile} missing from site/dist`);
  }
}
console.log('  ✔ Verified site/dist/ unified distribution files');

// 5. Dev server HTTP routing smoke test
console.log('\n\x1b[34m[5/5] Testing dev-server HTTP endpoints & MIME routing...\x1b[0m');

async function testHttpEndpoint(server, testPort, reqPath, expectedStatus, expectedMime, expectedSubstring) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:${testPort}${reqPath}`, (res) => {
      let data = '';
      res.setEncoding('utf-8');
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          if (res.statusCode !== expectedStatus) {
            return reject(new Error(`Endpoint ${reqPath} returned status ${res.statusCode}, expected ${expectedStatus}`));
          }
          if (expectedMime) {
            const contentType = res.headers['content-type'] || '';
            if (!contentType.includes(expectedMime)) {
              return reject(new Error(`Endpoint ${reqPath} returned content-type "${contentType}", expected to contain "${expectedMime}"`));
            }
          }
          if (expectedSubstring && !data.includes(expectedSubstring)) {
            return reject(new Error(`Endpoint ${reqPath} body missing expected text: "${expectedSubstring}"`));
          }
          resolve();
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

const TEST_PORT = 3199;
const server = createDevServer();

server.listen(TEST_PORT, async () => {
  try {
    // 5.1 Test Portal Root /
    await testHttpEndpoint(server, TEST_PORT, '/', 200, 'text/html', 'Readwell Typography Ecosystem');
    console.log('  ✔ GET / -> 200 OK (Portal index)');

    // 5.2 Test Readwell Hub /readwell/
    await testHttpEndpoint(server, TEST_PORT, '/readwell/', 200, 'text/html', 'Readwell CSS');
    console.log('  ✔ GET /readwell/ -> 200 OK (Readwell hub)');

    // 5.3 Test Readwell Docs /readwell/docs.html
    await testHttpEndpoint(server, TEST_PORT, '/readwell/docs.html', 200, 'text/html', 'Readwell CSS Documentation');
    console.log('  ✔ GET /readwell/docs.html -> 200 OK (Readwell docs)');

    // 5.4 Test Sumi Showcase /sumi/
    await testHttpEndpoint(server, TEST_PORT, '/sumi/', 200, 'text/html', 'Sumi-e & Calligraphy');
    console.log('  ✔ GET /sumi/ -> 200 OK (Sumi showcase)');

    // 5.5 Test Unified CSS /dist/readwell.min.css & /dist/sumi.min.css
    await testHttpEndpoint(server, TEST_PORT, '/dist/readwell.min.css', 200, 'text/css', '--rw-');
    await testHttpEndpoint(server, TEST_PORT, '/dist/sumi.min.css', 200, 'text/css', '--sumi-');
    console.log('  ✔ GET /dist/readwell.min.css & /dist/sumi.min.css -> 200 OK (CSS MIME verified)');

    // 5.6 Test Sumi Asset /assets/hanji-bg.webp
    await testHttpEndpoint(server, TEST_PORT, '/assets/hanji-bg.webp', 200, 'image/webp');
    console.log('  ✔ GET /assets/hanji-bg.webp -> 200 OK (WebP MIME verified)');

    // 5.7 Test 404 Route
    await testHttpEndpoint(server, TEST_PORT, '/unknown-page-route', 404, 'text/html', '404 Not Found');
    console.log('  ✔ GET /unknown-page-route -> 404 Not Found (Handled gracefully)');

    server.close(() => {
      console.log('\n\x1b[32m\x1b[1m✔ ALL MONOREPO CHECKS PASSED (100% SUCCESS)\x1b[0m\n');
      process.exit(0);
    });
  } catch (err) {
    server.close(() => {
      console.error('\n\x1b[31mDev server smoke test failed:\x1b[0m', err.message);
      process.exit(1);
    });
  }
});
