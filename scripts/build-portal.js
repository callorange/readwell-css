import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const siteDir = path.join(rootDir, 'site');
const siteIndexFile = path.join(siteDir, 'index.html');
const docsDir = path.join(rootDir, 'docs');
const docsIndexFile = path.join(docsDir, 'index.html');

const readwellPkgDir = path.join(rootDir, 'packages', 'readwell-css');
const readwellDistDir = path.join(readwellPkgDir, 'dist');
const readwellExamplesDir = path.join(readwellPkgDir, 'examples');

const sumiPkgDir = path.join(rootDir, 'packages', 'sumi-css');
const sumiDistDir = path.join(sumiPkgDir, 'dist');
const sumiExamplesDir = path.join(sumiPkgDir, 'examples');
const sumiAssetsDir = path.join(sumiDistDir, 'assets');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyDirectoryContents(srcDir, destDir, options = {}) {
  if (!fs.existsSync(srcDir)) {
    return 0;
  }
  ensureDir(destDir);
  let count = 0;
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      count += copyDirectoryContents(srcPath, destPath, options);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
      count++;
    }
  }
  return count;
}

export function buildPortal() {
  const startTime = Date.now();
  console.log('Assembling monorepo portal and static site...');

  // 1. Verify site/index.html exists
  if (!fs.existsSync(siteIndexFile)) {
    throw new Error(`Portal entry not found: ${siteIndexFile}`);
  }

  // 2. Prepare target directories in site/
  const siteReadwellDir = path.join(siteDir, 'readwell');
  const siteReadwellDistDir = path.join(siteReadwellDir, 'dist');
  const siteSumiDir = path.join(siteDir, 'sumi');
  const siteSumiDistDir = path.join(siteSumiDir, 'dist');
  const siteSumiAssetsDir = path.join(siteSumiDir, 'assets');
  const siteDistDir = path.join(siteDir, 'dist');
  const siteDistAssetsDir = path.join(siteDistDir, 'assets');
  const siteAssetsDir = path.join(siteDir, 'assets');

  ensureDir(siteReadwellDir);
  ensureDir(siteSumiDir);
  ensureDir(siteDistDir);
  ensureDir(siteAssetsDir);

  let totalCopied = 0;

  // 3. Assemble Readwell CSS into site/readwell/ and site/dist/
  if (fs.existsSync(readwellExamplesDir)) {
    totalCopied += copyDirectoryContents(readwellExamplesDir, siteReadwellDir);
  }
  if (fs.existsSync(readwellDistDir)) {
    totalCopied += copyDirectoryContents(readwellDistDir, siteReadwellDistDir);
    totalCopied += copyDirectoryContents(readwellDistDir, siteDistDir);
  }

  // 4. Assemble Sumi CSS into site/sumi/ and site/dist/
  if (fs.existsSync(sumiExamplesDir)) {
    totalCopied += copyDirectoryContents(sumiExamplesDir, siteSumiDir);
  }
  if (fs.existsSync(sumiDistDir)) {
    totalCopied += copyDirectoryContents(sumiDistDir, siteSumiDistDir);
    totalCopied += copyDirectoryContents(sumiDistDir, siteDistDir);
  }
  if (fs.existsSync(sumiAssetsDir)) {
    totalCopied += copyDirectoryContents(sumiAssetsDir, siteSumiAssetsDir);
    totalCopied += copyDirectoryContents(sumiAssetsDir, siteDistAssetsDir);
    totalCopied += copyDirectoryContents(sumiAssetsDir, siteAssetsDir);
  }

  // 5. GitHub Pages synchronization: sync portal landing to docs/index.html
  ensureDir(docsDir);
  fs.copyFileSync(siteIndexFile, docsIndexFile);

  const duration = Date.now() - startTime;
  const siteIndexSize = (fs.statSync(siteIndexFile).size / 1024).toFixed(2);
  const docsIndexSize = (fs.statSync(docsIndexFile).size / 1024).toFixed(2);

  console.log(`\x1b[32m✔ Portal build complete in ${duration}ms\x1b[0m`);
  console.log(`  - site/index.html (${siteIndexSize} KB)`);
  console.log(`  - docs/index.html synchronized (${docsIndexSize} KB)`);
  console.log(`  - site/readwell/ and site/sumi/ assembled (${totalCopied} files)`);
  console.log(`  - site/dist/ unified assets synchronized`);

  return {
    siteDir,
    siteIndexFile,
    docsIndexFile,
    totalCopied,
    duration
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    buildPortal();
  } catch (err) {
    console.error('\x1b[31m✖ Portal build failed:\x1b[0m', err.message);
    process.exit(1);
  }
}
