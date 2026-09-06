import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from './build.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const distAssetsDir = path.join(distDir, 'assets');

console.log('Running sumi-css automated build and integrity test...\n');

// 1. Run CSS build
const { fullPath, minPath, fullMapPath, minMapPath, assetCount } = build();

// Verification 1: Artifact existence and size > 0 KB
if (!fs.existsSync(fullPath) || fs.statSync(fullPath).size === 0) {
  throw new Error('dist/sumi.css was not created or is empty!');
}
if (!fs.existsSync(minPath) || fs.statSync(minPath).size === 0) {
  throw new Error('dist/sumi.min.css was not created or is empty!');
}

const fullSizeKB = (fs.statSync(fullPath).size / 1024).toFixed(2);
const minSizeKB = (fs.statSync(minPath).size / 1024).toFixed(2);
console.log(`  ✔ Verified distribution artifacts: sumi.css (${fullSizeKB} KB), sumi.min.css (${minSizeKB} KB)`);

const fullContent = fs.readFileSync(fullPath, 'utf-8');
const minContent = fs.readFileSync(minPath, 'utf-8');

// Verification 2: Source Map Integrity
if (!fs.existsSync(fullMapPath) || !fs.existsSync(minMapPath)) {
  throw new Error('Source maps (.css.map) were not generated properly!');
}

const fullMapJSON = JSON.parse(fs.readFileSync(fullMapPath, 'utf-8'));
const minMapJSON = JSON.parse(fs.readFileSync(minMapPath, 'utf-8'));

if (fullMapJSON.version !== 3 || minMapJSON.version !== 3) {
  throw new Error('Invalid Source Map version (expected v3)');
}
if (!Array.isArray(fullMapJSON.sources) || fullMapJSON.sources.length === 0) {
  throw new Error('Source map has empty sources array');
}
if (!fullContent.includes('sourceMappingURL=sumi.css.map')) {
  throw new Error('sourceMappingURL missing in sumi.css');
}
if (!minContent.includes('sourceMappingURL=sumi.min.css.map')) {
  throw new Error('sourceMappingURL missing in sumi.min.css');
}
console.log(`  ✔ Verified v3 Source Maps with ${fullMapJSON.sources.length} mapped source files`);

// Verification 3: Asset synchronization integrity (at least 60 files & key assets)
if (!fs.existsSync(distAssetsDir) || !fs.statSync(distAssetsDir).isDirectory()) {
  throw new Error('dist/assets directory does not exist or is not a directory!');
}

const copiedFiles = fs.readdirSync(distAssetsDir);
if (copiedFiles.length < 60) {
  throw new Error(`Insufficient assets copied to dist/assets: found ${copiedFiles.length}, expected >= 60`);
}

const keyAssets = [
  'hanji-bg.webp',
  'callout-frame-clean.webp',
  'sumi-spinner-brush-mask.webp',
  'hanji-bg.jpg',
  'sumi-stroke-fill.webp',
  'callout-frame-brush.webp'
];

for (const keyAsset of keyAssets) {
  const assetPath = path.join(distAssetsDir, keyAsset);
  if (!fs.existsSync(assetPath)) {
    throw new Error(`Key asset "${keyAsset}" missing in dist/assets!`);
  }
}
console.log(`  ✔ Verified ${copiedFiles.length} assets in dist/assets/ (all key assets verified)`);

// Verification 4: Dead link check for url(...) references in CSS
const urlRegex = /url\(\s*['"]?([^'")]+)['"]?\s*\)/g;
const deadLinks = [];
let matchedAssetUrls = 0;
let urlMatch;

while ((urlMatch = urlRegex.exec(fullContent)) !== null) {
  const rawUrl = urlMatch[1].trim();

  // Skip SVG filters (#id) and data URLs (data:...)
  if (rawUrl.startsWith('#') || rawUrl.startsWith('data:')) {
    continue;
  }

  // Check if it's an asset reference
  const assetMatch = rawUrl.match(/(?:\.\/|\.\.\/)?assets\/(.+)$/);
  if (assetMatch) {
    matchedAssetUrls++;
    const assetSubPath = assetMatch[1].split(/[?#]/)[0];
    const resolvedAsset = path.resolve(distAssetsDir, assetSubPath);
    if (!fs.existsSync(resolvedAsset)) {
      deadLinks.push({ url: rawUrl, resolved: resolvedAsset });
    }
  }
}

if (deadLinks.length > 0) {
  const details = deadLinks.map(d => `  - ${d.url} -> ${d.resolved}`).join('\n');
  throw new Error(`Found ${deadLinks.length} dead asset reference(s) in CSS:\n${details}`);
}
console.log(`  ✔ Verified 0 dead links across ${matchedAssetUrls} asset url() references in sumi.css`);

// Verification 5: Balanced CSS braces
const openBracesFull = (fullContent.match(/\{/g) || []).length;
const closeBracesFull = (fullContent.match(/\}/g) || []).length;
if (openBracesFull !== closeBracesFull) {
  throw new Error(`Syntax error: Unbalanced braces in sumi.css (${openBracesFull} { vs ${closeBracesFull} })`);
}

const openBracesMin = (minContent.match(/\{/g) || []).length;
const closeBracesMin = (minContent.match(/\}/g) || []).length;
if (openBracesMin !== closeBracesMin) {
  throw new Error(`Syntax error: Unbalanced braces in sumi.min.css (${openBracesMin} { vs ${closeBracesMin} })`);
}
console.log(`  ✔ Verified balanced CSS braces (${openBracesMin} matched pairs in minified bundle)`);

// Verification 6: Core tokens & selectors presence
const requiredTokens = [
  '--sumi-ink',
  '--sumi-paper',
  '.sumi-layout',
  '.sumi-callout',
  '.sumi-spinner'
];

for (const token of requiredTokens) {
  if (!fullContent.includes(token)) {
    throw new Error(`Token/Selector "${token}" missing in sumi.css`);
  }
  if (!minContent.includes(token)) {
    throw new Error(`Token/Selector "${token}" missing in sumi.min.css`);
  }
}
console.log(`  ✔ Verified all ${requiredTokens.length} core tokens and selectors in bundle`);

console.log('\n\x1b[32m✔ All sumi-css automated build & integrity tests passed successfully!\x1b[0m');
