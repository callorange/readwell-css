import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from './build.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const srcDir = path.join(rootDir, 'src');

console.log('Running automated build test...');

// Create temporary src/index.css if not present for test
let isTemp = false;
if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir, { recursive: true });
}
const entryFile = path.join(srcDir, 'index.css');
if (!fs.existsSync(entryFile)) {
  isTemp = true;
  fs.writeFileSync(entryFile, '@layer tokens;\n:root { --rw-paper: #f5f2ea; }\n', 'utf-8');
}

const { fullPath, minPath } = build();

if (!fs.existsSync(fullPath)) {
  throw new Error(`dist/readwell.css was not created!`);
}
if (!fs.existsSync(minPath)) {
  throw new Error(`dist/readwell.min.css was not created!`);
}

const fullContent = fs.readFileSync(fullPath, 'utf-8');
const minContent = fs.readFileSync(minPath, 'utf-8');

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
  'rw-dropdown-show',
  'rw-button-group',
  'aria-disabled'
];

for (const feature of requiredFeatures) {
  if (!fullContent.includes(feature)) {
    throw new Error(`Feature "${feature}" missing in bundled CSS`);
  }
  if (!minContent.includes(feature)) {
    throw new Error(`Feature "${feature}" missing in minified CSS`);
  }
}

if (isTemp) {
  fs.rmSync(entryFile, { force: true });
}

console.log('\x1b[32m✔ All build tests passed successfully!\x1b[0m');
