import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const distDir = path.join(rootDir, 'dist');
const entryFile = path.join(srcDir, 'index.css');

const BANNER = `/*!
 * Readwell CSS v0.1.0
 * https://github.com/callorange/readwell-css
 * (c) 2026 Readwell Team
 * Released under the MIT License.
 */\n`;

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function resolveImports(filePath, seen = new Set()) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  const realPath = fs.realpathSync(filePath);
  if (seen.has(realPath)) {
    return '';
  }
  seen.add(realPath);

  const content = fs.readFileSync(filePath, 'utf-8');
  const dir = path.dirname(filePath);

  // Match @import "./foo.css"; or @import "foo.css";
  const importRegex = /@import\s+['"]([^'"]+)['"]\s*;/g;

  return content.replace(importRegex, (match, importPath) => {
    const resolvedPath = path.resolve(dir, importPath);
    return resolveImports(resolvedPath, seen);
  });
}

function minifyCSS(css) {
  return css
    // Remove multi-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove single-line comments
    .replace(/\/\/.*/g, '')
    // Collapse whitespace
    .replace(/\s+/g, ' ')
    // Remove whitespace around symbols
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    // Remove trailing semicolons before closing brace
    .replace(/;}/g, '}')
    .trim();
}

export function build() {
  const startTime = Date.now();
  ensureDir(distDir);

  if (!fs.existsSync(entryFile)) {
    throw new Error(`Entry file not found: ${entryFile}`);
  }

  const bundledCSS = resolveImports(entryFile);
  const fullCSS = BANNER + bundledCSS;
  const minifiedCSS = BANNER + minifyCSS(bundledCSS);

  const fullPath = path.join(distDir, 'readwell.css');
  const minPath = path.join(distDir, 'readwell.min.css');

  fs.writeFileSync(fullPath, fullCSS, 'utf-8');
  fs.writeFileSync(minPath, minifiedCSS, 'utf-8');

  const fullSize = (fs.statSync(fullPath).size / 1024).toFixed(2);
  const minSize = (fs.statSync(minPath).size / 1024).toFixed(2);
  const duration = Date.now() - startTime;

  console.log(`\x1b[32m✔ Build complete in ${duration}ms\x1b[0m`);
  console.log(`  - dist/readwell.css (${fullSize} KB)`);
  console.log(`  - dist/readwell.min.css (${minSize} KB)`);

  return { fullPath, minPath, fullSize, minSize };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    build();
  } catch (err) {
    console.error('\x1b[31m✖ Build failed:\x1b[0m', err.message);
    process.exit(1);
  }
}
