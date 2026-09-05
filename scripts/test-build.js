import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from './build.js';
import { buildDocs } from './build-docs.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const srcDir = path.join(rootDir, 'src');

console.log('Running comprehensive automated build test...');

// 1. Run CSS build
const { fullPath, minPath } = build();

if (!fs.existsSync(fullPath)) {
  throw new Error(`dist/readwell.css was not created!`);
}
if (!fs.existsSync(minPath)) {
  throw new Error(`dist/readwell.min.css was not created!`);
}

const fullContent = fs.readFileSync(fullPath, 'utf-8');
const minContent = fs.readFileSync(minPath, 'utf-8');

// 2. Feature presence test
const requiredFeatures = [
  '--rw-paper',
  'aria-busy',
  'data-tooltip',
  'type="range"',
  'rw-input-group',
  'rw-avatar',
  'rw-sr-only',
  'rw-table--striped',
  'rw-accordion',
  'rw-spinner',
  'rw-dropdown--right',
  'rw-dropdown--up',
  'rw-dropdown-show',
  'rw-button-group',
  'aria-disabled',
  // New features
  'data-rw-theme="dark"',
  '@media print',
  'forced-colors',
  'rw-chip',
  'rw-steps',
  'rw-code-header',
  'rw-sidenote',
  'rw-footnotes',
  // Smart Presets & Layout Archetypes
  'data-rw-layout="reading"',
  'data-rw-layout="docs"',
  'data-rw-layout="workspace"',
  'data-rw-layout="fluid"',
  'data-rw-density="comfortable"'
];

for (const feature of requiredFeatures) {
  if (!fullContent.includes(feature)) {
    throw new Error(`Feature "${feature}" missing in bundled CSS`);
  }
  if (!minContent.includes(feature)) {
    throw new Error(`Feature "${feature}" missing in minified CSS`);
  }
}

// Check sourcemap comments
if (!fullContent.includes('sourceMappingURL=readwell.css.map')) {
  throw new Error('sourceMappingURL missing in readwell.css');
}
if (!minContent.includes('sourceMappingURL=readwell.min.css.map')) {
  throw new Error('sourceMappingURL missing in readwell.min.css');
}
console.log(`  ✔ Verified ${requiredFeatures.length} core features in bundle`);

// 3. Source Map Integrity Test
const fullMapPath = path.join(distDir, 'readwell.css.map');
const minMapPath = path.join(distDir, 'readwell.min.css.map');

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
console.log(`  ✔ Verified v3 Source Maps with ${fullMapJSON.sources.length} source files`);

// 4. CSS Syntax Integrity Test (Balanced Braces)
const openBracesFull = (fullContent.match(/\{/g) || []).length;
const closeBracesFull = (fullContent.match(/\}/g) || []).length;
if (openBracesFull !== closeBracesFull) {
  throw new Error(`Syntax error: Unbalanced braces in readwell.css (${openBracesFull} { vs ${closeBracesFull} })`);
}

const openBracesMin = (minContent.match(/\{/g) || []).length;
const closeBracesMin = (minContent.match(/\}/g) || []).length;
if (openBracesMin !== closeBracesMin) {
  throw new Error(`Syntax error: Unbalanced braces in readwell.min.css (${openBracesMin} { vs ${closeBracesMin} })`);
}
console.log(`  ✔ Verified balanced CSS braces (${openBracesMin} matched pairs)`);

// 5. Size Budget Test (Max 60KB minified)
const minSizeKB = fs.statSync(minPath).size / 1024;
const MAX_BUDGET_KB = 60.0;
if (minSizeKB > MAX_BUDGET_KB) {
  throw new Error(`Size budget exceeded: ${minSizeKB.toFixed(2)} KB > ${MAX_BUDGET_KB} KB`);
}
console.log(`  ✔ Size budget check passed: ${minSizeKB.toFixed(2)} KB (budget: <= ${MAX_BUDGET_KB} KB)`);

// 6. Docs Assembly Test
const { docsIndexPath, examplesDocsPath } = buildDocs();
if (!fs.existsSync(docsIndexPath) || !fs.existsSync(examplesDocsPath)) {
  throw new Error('Docs assembly failed to create output files');
}
const docsContent = fs.readFileSync(docsIndexPath, 'utf-8');
if (!docsContent.includes('rw-chip') || !docsContent.includes('rw-steps') || !docsContent.includes('rw-sidenote')) {
  throw new Error('Documentation missing newly added component sections');
}
console.log('  ✔ Verified Docs Portal assembly and partials integrity');

console.log('\n\x1b[32m✔ All automated build & regression tests passed successfully!\x1b[0m');

